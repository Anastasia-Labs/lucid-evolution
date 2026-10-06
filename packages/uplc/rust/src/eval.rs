//! Phase-two evaluation with per-transaction context sharing.
//!
//! This mirrors `uplc::tx::eval_phase_two_raw_with_protocol` (uplc 1.1.24,
//! `run_phase_one = false`, no script overrides) step for step, with the same
//! validation order, errors, budgets and result encoding. The differences are
//! purely about work avoided:
//!
//! - The `TxInfo` of each Plutus language (and its `PlutusData` encoding) is
//!   built once per transaction instead of once per redeemer; each redeemer only
//!   assembles its own `ScriptContext` around the shared encoding.
//! - The sorted, resolved spend inputs used for script lookup are computed once
//!   per transaction instead of once per spend redeemer.
//! - Decoded scripts are kept in a small bounded cache across calls.

use std::cell::RefCell;
use std::collections::HashMap;

use pallas_addresses::{Address, StakePayload};
use pallas_codec::utils::Nullable;
use pallas_crypto::hash::Hash;
use pallas_primitives::{
    conway::{
        Certificate, CostModels, DatumHash, DatumOption, ExUnits, GovAction, Language, MintedTx,
        PseudoScript, Redeemer, RedeemerTag, ScriptHash, StakeCredential, TransactionInput,
        TransactionOutput, Voter,
    },
    Fragment,
};
use pallas_traverse::{ComputeHash, Era, MultiEraTx, OriginalHash};
use uplc::{
    ast::{FakeNamedDeBruijn, NamedDeBruijn, Program},
    machine::cost_model::ExBudget,
    tx::{
        error::Error,
        iter_redeemers, redeemer_tag_to_string,
        script_context::{
            get_certificates_info, get_mint_info, get_proposal_procedures_info, get_tx_in_info_v1,
            get_tx_in_info_v2, get_votes_info, get_withdrawals_info, output_address, ResolvedInput,
            ScriptContext, ScriptPurpose, SlotConfig, TimeRange, TxInInfo, TxInfo, TxInfoV1,
            TxInfoV2, TxInfoV3,
        },
        to_plutus_data::{MintValue, ToPlutusData},
    },
    KeyValuePairs, MaybeIndefArray, PlutusData,
};

/// Same contract as `uplc::tx::eval_phase_two_raw_with_protocol(.., Some(cost_mdls_bytes),
/// .., run_phase_one = false, |_| ())`, returning the encoded redeemers only.
pub fn eval_phase_two_raw(
    tx_bytes: &[u8],
    utxos_bytes: &[(Vec<u8>, Vec<u8>)],
    cost_mdls_bytes: &[u8],
    initial_budget: (u64, u64),
    slot_config: (u64, u64, u32),
    protocol_major_version: u16,
) -> Result<Vec<Vec<u8>>, Error> {
    let multi_era_tx = MultiEraTx::decode_for_era(Era::Conway, tx_bytes)
        .or_else(|e| MultiEraTx::decode_for_era(Era::Babbage, tx_bytes).map_err(|_| e))
        .or_else(|e| MultiEraTx::decode_for_era(Era::Alonzo, tx_bytes).map_err(|_| e))?;

    let cost_mdls = CostModels::decode_fragment(cost_mdls_bytes)?;

    let budget = ExBudget {
        cpu: initial_budget.0 as i64,
        mem: initial_budget.1 as i64,
    };

    let mut utxos = Vec::new();

    for (input, output) in utxos_bytes {
        utxos.push(ResolvedInput {
            input: TransactionInput::decode_fragment(input)?,
            output: TransactionOutput::decode_fragment(output)?,
        });
    }

    let sc = SlotConfig {
        zero_time: slot_config.0,
        zero_slot: slot_config.1,
        slot_length: slot_config.2,
    };

    match multi_era_tx {
        MultiEraTx::Conway(tx) => {
            let redeemers =
                eval_phase_two(&tx, &utxos, &cost_mdls, budget, &sc, protocol_major_version)?;
            Ok(redeemers
                .into_iter()
                .map(|r| r.encode_fragment().unwrap())
                .collect())
        }
        _ => unimplemented!(
            r#"The transaction is serialized in an old era format. Because we're slightly lazy to
maintain backward compatibility with every possible transaction format AND, because
those formats are mostly forward-compatible, you are kindly expected to provide a
transaction in a format suitable for the Conway era."#
        ),
    }
}

fn eval_phase_two(
    tx: &MintedTx,
    utxos: &[ResolvedInput],
    cost_mdls: &CostModels,
    initial_budget: ExBudget,
    slot_config: &SlotConfig,
    protocol_major_version: u16,
) -> Result<Vec<Redeemer>, Error> {
    let redeemers = match tx.transaction_witness_set.redeemer.as_ref() {
        Some(rs) => rs,
        None => return Ok(vec![]),
    };

    let mut ctx = TxEvalContext {
        tx,
        utxos,
        slot_config,
        lookup: LookupTable::from_transaction(tx, utxos),
        spend_inputs: None,
        tx_infos: [None, None, None],
    };

    let mut collected = vec![];
    let mut remaining_budget = initial_budget;

    for (key, data, ex_units) in iter_redeemers(redeemers) {
        let redeemer = Redeemer {
            tag: key.tag,
            index: key.index,
            data: data.clone(),
            ex_units,
        };

        let redeemer = ctx.eval_redeemer(
            &redeemer,
            cost_mdls,
            &remaining_budget,
            protocol_major_version,
        )?;

        // The subtraction is safe here because ex units are checked during evaluation.
        // Redeemer would fail already if budget was negative.
        remaining_budget.cpu -= redeemer.ex_units.steps as i64;
        remaining_budget.mem -= redeemer.ex_units.mem as i64;

        collected.push(redeemer);
    }

    Ok(collected)
}

/// A transaction's `TxInfo` for one Plutus language, together with its encoding.
struct SharedTxInfo {
    tx_info: TxInfo,
    data: PlutusData,
}

struct TxEvalContext<'a> {
    tx: &'a MintedTx<'a>,
    utxos: &'a [ResolvedInput],
    slot_config: &'a SlotConfig,
    lookup: LookupTable<'a>,
    /// Sorted, resolved transaction inputs as seen by spend-script lookup; built
    /// on the first spend redeemer.
    spend_inputs: Option<Vec<TxInInfo>>,
    /// Indexed by `language_index`; built on the first redeemer of that language.
    tx_infos: [Option<SharedTxInfo>; 3],
}

#[derive(Clone, Copy)]
enum ScriptLanguage {
    V1,
    V2,
    V3,
}

impl ScriptLanguage {
    fn index(self) -> usize {
        match self {
            ScriptLanguage::V1 => 0,
            ScriptLanguage::V2 => 1,
            ScriptLanguage::V3 => 2,
        }
    }

    fn language(self) -> Language {
        match self {
            ScriptLanguage::V1 => Language::PlutusV1,
            ScriptLanguage::V2 => Language::PlutusV2,
            ScriptLanguage::V3 => Language::PlutusV3,
        }
    }
}

/// A Plutus script found in the transaction witnesses or in a reference script.
#[derive(Clone, Copy)]
struct FoundScript<'a> {
    hash: ScriptHash,
    language: ScriptLanguage,
    bytes: &'a [u8],
}

impl<'a> TxEvalContext<'a> {
    /// Mirrors `uplc::tx::eval::eval_redeemer_with_protocol` (1.1.24): script and
    /// datum lookup, then the cost model, then the `TxInfo`, then script decoding,
    /// each failing with the crate's unwrapped error; machine failures are wrapped
    /// in `Error::RedeemerError`.
    fn eval_redeemer(
        &mut self,
        redeemer: &Redeemer,
        cost_mdls: &CostModels,
        initial_budget: &ExBudget,
        protocol_major_version: u16,
    ) -> Result<Redeemer, Error> {
        let (script, datum) = self.find_script(redeemer)?;

        let costs = match script.language {
            // The crate reports PlutusV2 for a missing PlutusV1 cost model; kept as is.
            ScriptLanguage::V1 => cost_mdls
                .plutus_v1
                .as_ref()
                .ok_or(Error::CostModelNotFound(Language::PlutusV2))?,
            ScriptLanguage::V2 => cost_mdls
                .plutus_v2
                .as_ref()
                .ok_or(Error::CostModelNotFound(Language::PlutusV2))?,
            ScriptLanguage::V3 => cost_mdls
                .plutus_v3
                .as_ref()
                .ok_or(Error::CostModelNotFound(Language::PlutusV3))?,
        };

        self.ensure_tx_info(script.language)?;

        let program = decode_program(&script)?;

        let shared = self.tx_infos[script.language.index()]
            .as_ref()
            .expect("tx info built above");

        let language = script.language.language();

        do_eval_redeemer(
            costs,
            initial_budget,
            &language,
            protocol_major_version,
            datum,
            redeemer,
            shared,
            program,
        )
        .map_err(|err| Error::RedeemerError {
            tag: redeemer_tag_to_string(&redeemer.tag),
            index: redeemer.index,
            err: Box::new(err),
        })
    }

    fn ensure_tx_info(&mut self, language: ScriptLanguage) -> Result<(), Error> {
        let slot = &mut self.tx_infos[language.index()];
        if slot.is_none() {
            let tx_info = match language {
                ScriptLanguage::V1 => {
                    TxInfoV1::from_transaction(self.tx, self.utxos, self.slot_config)?
                }
                ScriptLanguage::V2 => {
                    TxInfoV2::from_transaction(self.tx, self.utxos, self.slot_config)?
                }
                ScriptLanguage::V3 => {
                    TxInfoV3::from_transaction(self.tx, self.utxos, self.slot_config)?
                }
            };
            let data = tx_info.to_plutus_data();
            *slot = Some(SharedTxInfo { tx_info, data });
        }
        Ok(())
    }

    /// Mirrors `uplc::tx::script_context::find_script` (1.1.24).
    fn find_script(
        &mut self,
        redeemer: &Redeemer,
    ) -> Result<(FoundScript<'a>, Option<PlutusData>), Error> {
        let tx = self.tx;
        let lookup = &self.lookup;

        let lookup_script = |script_hash: &ScriptHash| match lookup.get_script(script_hash) {
            Some(s) => Ok(s),
            None => Err(Error::MissingRequiredScript {
                hash: script_hash.to_string(),
            }),
        };

        match redeemer.tag {
            RedeemerTag::Mint => get_mint_info(&tx.transaction_body.mint)
                .mint_value
                .get(redeemer.index as usize)
                .ok_or(Error::MissingScriptForRedeemer)
                .and_then(|(policy_id, _)| {
                    let policy_id_array: [u8; 28] = policy_id.to_vec().try_into().unwrap();
                    let hash = Hash::from(policy_id_array);
                    lookup_script(&hash)
                })
                .map(|s| (s, None)),

            RedeemerTag::Reward => get_withdrawals_info(&tx.transaction_body.withdrawals)
                .get(redeemer.index as usize)
                .ok_or(Error::MissingScriptForRedeemer)
                .and_then(|(addr, _)| {
                    let stake_addr = if let Address::Stake(stake_addr) = addr {
                        stake_addr
                    } else {
                        unreachable!("withdrawal always contains stake addresses")
                    };

                    if let StakePayload::Script(hash) = stake_addr.payload() {
                        lookup_script(hash)
                    } else {
                        Err(Error::NonScriptWithdrawal)
                    }
                })
                .map(|s| (s, None)),

            RedeemerTag::Cert => get_certificates_info(&tx.transaction_body.certificates)
                .get(redeemer.index as usize)
                .ok_or(Error::MissingScriptForRedeemer)
                .and_then(|cert| match cert {
                    Certificate::StakeDeregistration(stake_credential)
                    | Certificate::Reg(stake_credential, _)
                    | Certificate::UnReg(stake_credential, _)
                    | Certificate::VoteDeleg(stake_credential, _)
                    | Certificate::VoteRegDeleg(stake_credential, _, _)
                    | Certificate::StakeVoteDeleg(stake_credential, _, _)
                    | Certificate::StakeRegDeleg(stake_credential, _, _)
                    | Certificate::StakeVoteRegDeleg(stake_credential, _, _, _)
                    | Certificate::RegDRepCert(stake_credential, _, _)
                    | Certificate::UnRegDRepCert(stake_credential, _)
                    | Certificate::UpdateDRepCert(stake_credential, _)
                    | Certificate::AuthCommitteeHot(stake_credential, _)
                    | Certificate::ResignCommitteeCold(stake_credential, _)
                    | Certificate::StakeDelegation(stake_credential, _) => match stake_credential {
                        StakeCredential::ScriptHash(hash) => Ok(*hash),
                        _ => Err(Error::NonScriptStakeCredential),
                    },
                    Certificate::StakeRegistration { .. }
                    | Certificate::PoolRetirement { .. }
                    | Certificate::PoolRegistration { .. } => {
                        Err(Error::UnsupportedCertificateType)
                    }
                })
                .and_then(|hash| lookup_script(&hash))
                .map(|s| (s, None)),

            RedeemerTag::Spend => {
                if self.spend_inputs.is_none() {
                    let inputs = get_tx_in_info_v2(&tx.transaction_body.inputs, self.utxos)
                        .or_else(|err| {
                            if matches!(err, Error::ByronAddressNotAllowed) {
                                get_tx_in_info_v1(&tx.transaction_body.inputs, self.utxos)
                            } else {
                                Err(err)
                            }
                        })?;
                    self.spend_inputs = Some(inputs);
                }

                let lookup = &self.lookup;
                let inputs = self
                    .spend_inputs
                    .as_ref()
                    .expect("spend inputs built above");

                inputs
                    .get(redeemer.index as usize)
                    .ok_or(Error::MissingScriptForRedeemer)
                    .and_then(|input| match output_address(&input.resolved) {
                        Address::Shelley(shelley_address) => {
                            let hash = shelley_address.payment().as_hash();
                            let script = match lookup.get_script(hash) {
                                Some(s) => s,
                                None => {
                                    return Err(Error::MissingRequiredScript {
                                        hash: hash.to_string(),
                                    })
                                }
                            };
                            let datum = lookup.resolve_datum(&input.resolved)?;

                            if datum.is_none()
                                && matches!(
                                    script.language,
                                    ScriptLanguage::V1 | ScriptLanguage::V2
                                )
                            {
                                return Err(Error::MissingRequiredInlineDatumOrHash);
                            }

                            Ok((script, datum))
                        }
                        _ => Err(Error::NonScriptStakeCredential),
                    })
            }

            RedeemerTag::Vote => get_votes_info(&tx.transaction_body.voting_procedures)
                .get(redeemer.index as usize)
                .ok_or(Error::MissingScriptForRedeemer)
                .and_then(|(voter, _)| match voter {
                    Voter::ConstitutionalCommitteeScript(hash) => Ok(*hash),
                    Voter::ConstitutionalCommitteeKey(..) => Err(Error::NonScriptStakeCredential),
                    Voter::DRepScript(hash) => Ok(*hash),
                    Voter::DRepKey(..) => Err(Error::NonScriptStakeCredential),
                    Voter::StakePoolKey(..) => Err(Error::NonScriptStakeCredential),
                })
                .and_then(|hash| lookup_script(&hash))
                .map(|s| (s, None)),

            RedeemerTag::Propose => {
                get_proposal_procedures_info(&tx.transaction_body.proposal_procedures)
                    .get(redeemer.index as usize)
                    .ok_or(Error::MissingScriptForRedeemer)
                    .and_then(|procedure| match procedure.gov_action {
                        GovAction::ParameterChange(_, _, Nullable::Some(ref hash)) => Ok(*hash),
                        GovAction::TreasuryWithdrawals(_, Nullable::Some(ref hash)) => Ok(*hash),
                        GovAction::HardForkInitiation(..)
                        | GovAction::Information
                        | GovAction::NewConstitution(..)
                        | GovAction::TreasuryWithdrawals(..)
                        | GovAction::ParameterChange(..)
                        | GovAction::NoConfidence(..)
                        | GovAction::UpdateCommittee(..) => {
                            Err(Error::NoGuardrailScriptForProcedure)
                        }
                    })
                    .and_then(|hash| lookup_script(&hash))
                    .map(|s| (s, None))
            }
        }
    }
}

/// Mirrors the inner `do_eval_redeemer` of `uplc::tx::eval` (1.1.24), with the
/// script context assembled around the shared `TxInfo` encoding.
#[allow(clippy::too_many_arguments)]
fn do_eval_redeemer(
    costs: &[i64],
    initial_budget: &ExBudget,
    lang: &Language,
    protocol_major_version: u16,
    datum: Option<PlutusData>,
    redeemer: &Redeemer,
    shared: &SharedTxInfo,
    program: Program<NamedDeBruijn>,
) -> Result<Redeemer, Error> {
    let script_context = script_context_data(shared, redeemer, datum.as_ref())
        .expect("couldn't create script context from transaction?");

    let program = match shared.tx_info {
        TxInfo::V1(..) | TxInfo::V2(..) => if let Some(datum) = datum {
            program.apply_data(datum)
        } else {
            program
        }
        .apply_data(redeemer.data.clone())
        .apply_data(script_context),

        TxInfo::V3(..) => program.apply_data(script_context),
    };

    let eval_result =
        program.eval_as_with_protocol(lang, protocol_major_version, costs, Some(initial_budget));

    let cost = eval_result.cost();

    if let Err(err) = eval_result.result() {
        return Err(Error::Machine(err, cost, eval_result.traces()));
    }

    Ok(Redeemer {
        tag: redeemer.tag,
        index: redeemer.index,
        data: redeemer.data.clone(),
        ex_units: ExUnits {
            mem: cost.mem as u64,
            steps: cost.cpu as u64,
        },
    })
}

/// Produces exactly `tx_info.clone().into_script_context(redeemer, datum)?.to_plutus_data()`
/// without re-encoding the `TxInfo`: the purpose / script info is encoded by the
/// crate around a placeholder `TxInfo`, whose encoding (always the first field of
/// the context) is then replaced by the shared one.
fn script_context_data(
    shared: &SharedTxInfo,
    redeemer: &Redeemer,
    datum: Option<&PlutusData>,
) -> Option<PlutusData> {
    // Same lookup as `TxInfo::into_script_context`.
    let redeemers = match &shared.tx_info {
        TxInfo::V1(info) => &info.redeemers,
        TxInfo::V2(info) => &info.redeemers,
        TxInfo::V3(info) => &info.redeemers,
    };
    let purpose: ScriptPurpose = redeemers.iter().find_map(|(purpose, some_redeemer)| {
        if redeemer.tag == some_redeemer.tag && redeemer.index == some_redeemer.index {
            Some(purpose.clone())
        } else {
            None
        }
    })?;

    let context = match shared.tx_info {
        TxInfo::V1(..) | TxInfo::V2(..) => ScriptContext::V1V2 {
            tx_info: Box::new(placeholder_tx_info()),
            purpose: Box::new(purpose),
        },
        TxInfo::V3(..) => ScriptContext::V3 {
            tx_info: Box::new(placeholder_tx_info()),
            redeemer: redeemer.data.clone(),
            purpose: Box::new(purpose.into_script_info(datum.cloned())),
        },
    };

    let mut data = context.to_plutus_data();
    match &mut data {
        PlutusData::Constr(constr) => match &mut constr.fields {
            MaybeIndefArray::Def(fields) | MaybeIndefArray::Indef(fields) => {
                fields[0] = shared.data.clone();
            }
        },
        _ => unreachable!("script contexts are encoded as constructors"),
    }
    Some(data)
}

/// The cheapest `TxInfo` to encode; its encoding is discarded.
fn placeholder_tx_info() -> TxInfo {
    TxInfo::V1(TxInfoV1 {
        inputs: vec![],
        outputs: vec![],
        fee: pallas_primitives::conway::Value::Coin(0),
        mint: MintValue {
            mint_value: pallas_codec::utils::NonEmptyKeyValuePairs::Indef(vec![]),
        },
        certificates: vec![],
        withdrawals: vec![],
        valid_range: TimeRange {
            lower_bound: None,
            upper_bound: None,
        },
        signatories: vec![],
        data: vec![],
        redeemers: KeyValuePairs::from(vec![]),
        id: Hash::from([0u8; 32]),
    })
}

/// Scripts and datums available to a transaction, borrowed from it and its
/// resolved inputs. Mirrors `uplc::tx::script_context::DataLookupTable::from_transaction`
/// (1.1.24) without copying the witnesses.
struct LookupTable<'a> {
    datum: HashMap<DatumHash, &'a PlutusData>,
    scripts: HashMap<ScriptHash, FoundScript<'a>>,
}

impl<'a> LookupTable<'a> {
    fn from_transaction(tx: &'a MintedTx<'a>, utxos: &'a [ResolvedInput]) -> LookupTable<'a> {
        let mut datum = HashMap::new();
        let mut scripts = HashMap::new();

        let ws = &tx.transaction_witness_set;

        if let Some(plutus_data) = ws.plutus_data.as_ref() {
            for d in plutus_data.iter() {
                datum.insert(d.original_hash(), &**d);
            }
        }

        let mut insert = |hash: ScriptHash, language: ScriptLanguage, bytes: &'a [u8]| {
            scripts.insert(
                hash,
                FoundScript {
                    hash,
                    language,
                    bytes,
                },
            );
        };

        if let Some(s) = ws.plutus_v1_script.as_ref() {
            for script in s.iter() {
                insert(script.compute_hash(), ScriptLanguage::V1, script.as_ref());
            }
        }
        if let Some(s) = ws.plutus_v2_script.as_ref() {
            for script in s.iter() {
                insert(script.compute_hash(), ScriptLanguage::V2, script.as_ref());
            }
        }
        if let Some(s) = ws.plutus_v3_script.as_ref() {
            for script in s.iter() {
                insert(script.compute_hash(), ScriptLanguage::V3, script.as_ref());
            }
        }

        for utxo in utxos.iter() {
            if let TransactionOutput::PostAlonzo(output) = &utxo.output {
                if let Some(script) = &output.script_ref {
                    match &script.0 {
                        PseudoScript::PlutusV1Script(v1) => {
                            insert(v1.compute_hash(), ScriptLanguage::V1, v1.as_ref())
                        }
                        PseudoScript::PlutusV2Script(v2) => {
                            insert(v2.compute_hash(), ScriptLanguage::V2, v2.as_ref())
                        }
                        PseudoScript::PlutusV3Script(v3) => {
                            insert(v3.compute_hash(), ScriptLanguage::V3, v3.as_ref())
                        }
                        PseudoScript::NativeScript(_) => {}
                    }
                }
            }
        }

        LookupTable { datum, scripts }
    }

    fn get_script(&self, hash: &ScriptHash) -> Option<FoundScript<'a>> {
        self.scripts.get(hash).copied()
    }

    /// Same as `lookup_datum(output_datum(output))` in `find_script`.
    fn resolve_datum(&self, output: &TransactionOutput) -> Result<Option<PlutusData>, Error> {
        let by_hash = |hash: &DatumHash| match self.datum.get(hash) {
            Some(d) => Ok(Some((*d).clone())),
            None => Err(Error::MissingRequiredDatum {
                hash: hash.to_string(),
            }),
        };
        match output {
            TransactionOutput::Legacy(x) => match &x.datum_hash {
                Some(hash) => by_hash(hash),
                None => Ok(None),
            },
            TransactionOutput::PostAlonzo(x) => match &x.datum_option {
                Some(DatumOption::Hash(hash)) => by_hash(hash),
                Some(DatumOption::Data(data)) => Ok(Some(data.0.clone())),
                None => Ok(None),
            },
        }
    }
}

// ---------------------------------------------------------------- script cache

/// Upper bound on cached scripts.
const SCRIPT_CACHE_MAX_ENTRIES: usize = 64;
/// Upper bound on the estimated memory held by cached decoded scripts.
const SCRIPT_CACHE_MAX_BYTES: usize = 64 * 1024 * 1024;
/// Conservative estimate of decoded program size per byte of serialised script.
const DECODED_BYTES_PER_SCRIPT_BYTE: usize = 128;

struct CachedProgram {
    program: Program<NamedDeBruijn>,
    cost: usize,
    last_used: u64,
}

#[derive(Default)]
struct ScriptCache {
    entries: HashMap<ScriptHash, CachedProgram>,
    total_cost: usize,
    clock: u64,
}

impl ScriptCache {
    fn get(&mut self, hash: &ScriptHash) -> Option<Program<NamedDeBruijn>> {
        self.clock += 1;
        let clock = self.clock;
        self.entries.get_mut(hash).map(|entry| {
            entry.last_used = clock;
            entry.program.clone()
        })
    }

    fn insert(&mut self, hash: ScriptHash, program: &Program<NamedDeBruijn>, script_len: usize) {
        let cost = script_len.saturating_mul(DECODED_BYTES_PER_SCRIPT_BYTE);
        if cost > SCRIPT_CACHE_MAX_BYTES {
            return;
        }
        while !self.entries.is_empty()
            && (self.entries.len() >= SCRIPT_CACHE_MAX_ENTRIES
                || self.total_cost + cost > SCRIPT_CACHE_MAX_BYTES)
        {
            let oldest = *self
                .entries
                .iter()
                .min_by_key(|(_, entry)| entry.last_used)
                .map(|(hash, _)| hash)
                .expect("non-empty cache");
            if let Some(evicted) = self.entries.remove(&oldest) {
                self.total_cost -= evicted.cost;
            }
        }
        self.clock += 1;
        self.total_cost += cost;
        self.entries.insert(
            hash,
            CachedProgram {
                program: program.clone(),
                cost,
                last_used: self.clock,
            },
        );
    }
}

thread_local! {
    static SCRIPT_CACHE: RefCell<ScriptCache> = RefCell::new(ScriptCache::default());
}

/// Decodes a script the way `uplc::tx::eval` does, reusing a previous decoding of
/// the same script when available. Cached programs are shared immutably: applying
/// arguments wraps the root term without touching the cached nodes.
fn decode_program(script: &FoundScript) -> Result<Program<NamedDeBruijn>, Error> {
    if let Some(program) = SCRIPT_CACHE.with(|cache| cache.borrow_mut().get(&script.hash)) {
        return Ok(program);
    }

    let mut buffer = Vec::new();
    let program: Program<NamedDeBruijn> =
        Program::<FakeNamedDeBruijn>::from_cbor(script.bytes, &mut buffer)?.into();

    SCRIPT_CACHE.with(|cache| {
        cache
            .borrow_mut()
            .insert(script.hash, &program, script.bytes.len())
    });

    Ok(program)
}
