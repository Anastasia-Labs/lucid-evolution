use aiken/collection/dict
use aiken/collection/list
use cardano/assets
use cardano/script_context
use cardano/transaction

const expected_pub_key_hash =
  #"11111111111111111111111111111111111111111111111111111111"

const expected_script_hash =
  #"22222222222222222222222222222222222222222222222222222222"

const expected_tx_id =
  #"3333333333333333333333333333333333333333333333333333333333333333"

const expected_ref_tx_id =
  #"4444444444444444444444444444444444444444444444444444444444444444"

const expected_datum_hash =
  #"5555555555555555555555555555555555555555555555555555555555555555"

const expected_policy_id =
  #"66666666666666666666666666666666666666666666666666666666"

const expected_token_name = #"536368656d61546f6b656e"

const minted_token_name = #"536372697074436f6e74657874"

pub type PubKeyHash =
  ByteArray

pub type ScriptHash =
  ByteArray

pub type DatumHash =
  ByteArray

pub type Datum =
  Data

pub type Redeemer =
  Data

pub type ChangedParameters =
  Data

pub type TxId =
  ByteArray

pub type CurrencySymbol =
  ByteArray

pub type TokenName =
  ByteArray

pub type Lovelace =
  Int

pub type POSIXTime =
  Int

pub type Rational {
  numerator: Int,
  denominator: Int,
}

pub type Value =
  Pairs<CurrencySymbol, Pairs<TokenName, Int>>

pub type MintValue =
  Value

pub type Credential {
  PubKeyCredential(PubKeyHash)
  ScriptCredential(ScriptHash)
}

pub type StakingCredential {
  StakingHash(Credential)
  StakingPtr(Int, Int, Int)
}

pub type Address {
  address_credential: Credential,
  address_staking_credential: Option<StakingCredential>,
}

pub type OutputDatum {
  NoOutputDatum
  OutputDatumHash(DatumHash)
  OutputDatum(Datum)
}

pub type TxOutRef {
  tx_out_ref_id: TxId,
  tx_out_ref_idx: Int,
}

pub type TxOut {
  tx_out_address: Address,
  tx_out_value: Value,
  tx_out_datum: OutputDatum,
  tx_out_reference_script: Option<ScriptHash>,
}

pub type ExtendedPOSIXTime {
  NegInf
  Finite(POSIXTime)
  PosInf
}

pub type LowerBoundPOSIXTime {
  lower_bound_limit: ExtendedPOSIXTime,
  lower_bound_closed: Bool,
}

pub type UpperBoundPOSIXTime {
  upper_bound_limit: ExtendedPOSIXTime,
  upper_bound_closed: Bool,
}

pub type POSIXTimeRange {
  iv_from: LowerBoundPOSIXTime,
  iv_to: UpperBoundPOSIXTime,
}

pub type DRep {
  DRep(DRepCredential)
  DRepAlwaysAbstain
  DRepAlwaysNoConfidence
}

pub type Delegatee {
  DelegStake(PubKeyHash)
  DelegVote(DRep)
  DelegStakeVote(PubKeyHash, DRep)
}

pub type TxCert {
  TxCertRegStaking(Credential, Option<Lovelace>)
  TxCertUnRegStaking(Credential, Option<Lovelace>)
  TxCertDelegStaking(Credential, Delegatee)
  TxCertRegDeleg(Credential, Delegatee, Lovelace)
  TxCertRegDRep(DRepCredential, Lovelace)
  TxCertUpdateDRep(DRepCredential)
  TxCertUnRegDRep(DRepCredential, Lovelace)
  TxCertPoolRegister(PubKeyHash, PubKeyHash)
  TxCertPoolRetire(PubKeyHash, Int)
  TxCertAuthHotCommittee(ColdCommitteeCredential, HotCommitteeCredential)
  TxCertResignColdCommittee(ColdCommitteeCredential)
}

pub type ColdCommitteeCredential =
  Credential

pub type HotCommitteeCredential =
  Credential

pub type DRepCredential =
  Credential

pub type Voter {
  CommitteeVoter(HotCommitteeCredential)
  DRepVoter(DRepCredential)
  StakePoolVoter(PubKeyHash)
}

pub type Vote {
  VoteNo
  VoteYes
  Abstain
}

pub type GovernanceActionId {
  gaid_tx_id: TxId,
  gaid_gov_action_ix: Int,
}

pub type Constitution {
  constitution_script: Option<ScriptHash>,
}

pub type ProtocolVersion {
  pv_major: Int,
  pv_minor: Int,
}

pub type GovernanceAction {
  ParameterChange(
    Option<GovernanceActionId>,
    ChangedParameters,
    Option<ScriptHash>,
  )
  HardForkInitiation(Option<GovernanceActionId>, ProtocolVersion)
  TreasuryWithdrawals(Pairs<Credential, Lovelace>, Option<ScriptHash>)
  NoConfidence(Option<GovernanceActionId>)
  UpdateCommittee(
    Option<GovernanceActionId>,
    List<ColdCommitteeCredential>,
    Pairs<ColdCommitteeCredential, Int>,
    Rational,
  )
  NewConstitution(Option<GovernanceActionId>, Constitution)
  InfoAction
}

pub type ProposalProcedure {
  pp_deposit: Lovelace,
  pp_return_addr: Credential,
  pp_governance_action: GovernanceAction,
}

pub type ScriptPurpose {
  Minting(CurrencySymbol)
  Spending(TxOutRef)
  Rewarding(Credential)
  Certifying(Int, TxCert)
  Voting(Voter)
  Proposing(Int, ProposalProcedure)
}

pub type ScriptInfo {
  MintingScript(CurrencySymbol)
  SpendingScript(TxOutRef, Option<Datum>)
  RewardingScript(Credential)
  CertifyingScript(Int, TxCert)
  VotingScript(Voter)
  ProposingScript(Int, ProposalProcedure)
}

pub type TxInInfo {
  tx_in_info_out_ref: TxOutRef,
  tx_in_info_resolved: TxOut,
}

pub type TxInfo {
  tx_info_inputs: List<TxInInfo>,
  tx_info_reference_inputs: List<TxInInfo>,
  tx_info_outputs: List<TxOut>,
  tx_info_fee: Lovelace,
  tx_info_mint: MintValue,
  tx_info_tx_certs: List<TxCert>,
  tx_info_wdrl: Pairs<Credential, Lovelace>,
  tx_info_valid_range: POSIXTimeRange,
  tx_info_signatories: List<PubKeyHash>,
  tx_info_redeemers: Pairs<ScriptPurpose, Redeemer>,
  tx_info_data: Pairs<DatumHash, Datum>,
  tx_info_id: TxId,
  tx_info_votes: Pairs<Voter, Pairs<GovernanceActionId, Vote>>,
  tx_info_proposal_procedures: List<ProposalProcedure>,
  tx_info_current_treasury_amount: Option<Lovelace>,
  tx_info_treasury_donation: Option<Lovelace>,
}

pub type ScriptContext {
  script_context_tx_info: TxInfo,
  script_context_redeemer: Redeemer,
  script_context_script_info: ScriptInfo,
}

fn check_expected_output(output: TxOut) -> Bool {
  let TxOut {
    tx_out_address,
    tx_out_value,
    tx_out_datum,
    tx_out_reference_script,
  } = output
  let Address { address_credential, address_staking_credential } =
    tx_out_address
  expect ScriptCredential(script_hash) = address_credential
  expect Some(StakingHash(PubKeyCredential(stake_hash))) =
    address_staking_credential
  let output_value = assets.from_asset_list(tx_out_value)
  expect [(policy_id, token_name, quantity)] = assets.flatten(output_value)
  expect OutputDatum(inline_datum) = tx_out_datum
  expect datum_int: Int = inline_datum
  expect Some(reference_script) = tx_out_reference_script

  and {
    (script_hash == expected_script_hash)?,
    (stake_hash == expected_pub_key_hash)?,
    (policy_id == expected_policy_id)?,
    (token_name == expected_token_name)?,
    (quantity == 3)?,
    (datum_int == 88)?,
    (reference_script == expected_script_hash)?,
  }
}

fn check_expected_input(
  input: TxInInfo,
  tx_id: ByteArray,
  output_index: Int,
) -> Bool {
  let TxInInfo { tx_in_info_out_ref, tx_in_info_resolved } = input
  let TxOutRef { tx_out_ref_id, tx_out_ref_idx } = tx_in_info_out_ref

  and {
    (tx_out_ref_id == tx_id)?,
    (tx_out_ref_idx == output_index)?,
    check_expected_output(tx_in_info_resolved)?,
  }
}

fn check_expected_range(range: POSIXTimeRange) -> Bool {
  let POSIXTimeRange { iv_from, iv_to } = range
  let LowerBoundPOSIXTime { lower_bound_limit, lower_bound_closed } = iv_from
  let UpperBoundPOSIXTime { upper_bound_limit, upper_bound_closed } = iv_to
  expect Finite(lower_bound) = lower_bound_limit
  expect PosInf = upper_bound_limit

  and {
    (lower_bound == 1234)?,
    lower_bound_closed?,
    upper_bound_closed?,
  }
}

fn check_expected_proposal(proposal: ProposalProcedure) -> Bool {
  let ProposalProcedure { pp_deposit, pp_return_addr, pp_governance_action } =
    proposal
  expect PubKeyCredential(return_hash) = pp_return_addr
  expect HardForkInitiation(Some(action_id), version) = pp_governance_action
  let GovernanceActionId { gaid_tx_id, gaid_gov_action_ix } = action_id
  let ProtocolVersion { pv_major, pv_minor } = version

  and {
    (pp_deposit == 5_000_000)?,
    (return_hash == expected_pub_key_hash)?,
    (gaid_tx_id == expected_tx_id)?,
    (gaid_gov_action_ix == 7)?,
    (pv_major == 10)?,
    (pv_minor == 1)?,
  }
}

fn check_expected_context(expected: ScriptContext) -> Bool {
  let ScriptContext {
    script_context_tx_info,
    script_context_redeemer,
    script_context_script_info,
  } = expected
  expect expected_redeemer: Int = script_context_redeemer
  expect MintingScript(info_policy) = script_context_script_info
  let TxInfo {
    tx_info_inputs,
    tx_info_reference_inputs,
    tx_info_outputs,
    tx_info_fee,
    tx_info_mint,
    tx_info_tx_certs,
    tx_info_wdrl,
    tx_info_valid_range,
    tx_info_signatories,
    tx_info_redeemers,
    tx_info_data,
    tx_info_id,
    tx_info_votes,
    tx_info_proposal_procedures,
    tx_info_current_treasury_amount,
    tx_info_treasury_donation,
  } = script_context_tx_info

  expect [input] = tx_info_inputs
  expect [reference_input] = tx_info_reference_inputs
  expect [output] = tx_info_outputs
  let mint_value = assets.from_asset_list(tx_info_mint)
  expect [(mint_policy, mint_token, mint_quantity)] = assets.flatten(mint_value)
  expect [TxCertRegDRep(ScriptCredential(cert_hash), cert_deposit)] =
    tx_info_tx_certs
  expect [Pair(ScriptCredential(withdrawal_hash), withdrawal_amount)] =
    tx_info_wdrl
  expect [signatory] = tx_info_signatories
  expect [Pair(Minting(redeemer_policy), redeemer_data)] = tx_info_redeemers
  expect decoded_redeemer: Int = redeemer_data
  expect [Pair(datum_hash, datum_value)] = tx_info_data
  expect decoded_datum: Int = datum_value
  expect [Pair(DRepVoter(PubKeyCredential(voter_hash)), action_votes)] =
    tx_info_votes
  expect [Pair(action_id, VoteYes)] = action_votes
  let GovernanceActionId { gaid_tx_id: vote_tx_id, gaid_gov_action_ix } =
    action_id
  expect [proposal] = tx_info_proposal_procedures
  expect Some(current_treasury_amount) = tx_info_current_treasury_amount
  expect None = tx_info_treasury_donation

  and {
    (expected_redeemer == 42)?,
    (info_policy == expected_policy_id)?,
    check_expected_input(input, expected_tx_id, 0)?,
    check_expected_input(reference_input, expected_ref_tx_id, 1)?,
    check_expected_output(output)?,
    (tx_info_fee == 2_000_000)?,
    (mint_policy == expected_policy_id)?,
    (mint_token == expected_token_name)?,
    (mint_quantity == 3)?,
    (cert_hash == expected_script_hash)?,
    (cert_deposit == 4_000_000)?,
    (withdrawal_hash == expected_script_hash)?,
    (withdrawal_amount == 9_000_000)?,
    check_expected_range(tx_info_valid_range)?,
    (signatory == expected_pub_key_hash)?,
    (redeemer_policy == expected_policy_id)?,
    (decoded_redeemer == 42)?,
    (datum_hash == expected_datum_hash)?,
    (decoded_datum == 99)?,
    (tx_info_id == expected_tx_id)?,
    (voter_hash == expected_pub_key_hash)?,
    (vote_tx_id == expected_tx_id)?,
    (gaid_gov_action_ix == 7)?,
    check_expected_proposal(proposal)?,
    (current_treasury_amount == 12_000_000)?,
  }
}

fn check_actual_context(actual: script_context.ScriptContext) -> Bool {
  let script_context.ScriptContext { transaction, redeemer, info } = actual
  expect actual_redeemer: Int = redeemer
  expect script_context.Minting(policy_id) = info
  let transaction.Transaction {
    inputs,
    reference_inputs,
    outputs,
    fee,
    mint,
    certificates,
    withdrawals,
    validity_range: _validity_range,
    extra_signatories,
    redeemers,
    datums,
    id: _id,
    votes,
    proposal_procedures,
    current_treasury_amount,
    treasury_donation,
  } = transaction
  expect [Pair(transaction.Mint(redeemer_policy), redeemer_data)] = redeemers
  expect actual_redeemer_from_map: Int = redeemer_data

  and {
    (actual_redeemer == 42)?,
    (redeemer_policy == policy_id)?,
    (actual_redeemer_from_map == 42)?,
    (list.length(inputs) > 0)?,
    (list.length(reference_inputs) == 0)?,
    (list.length(outputs) > 0)?,
    (fee > 0)?,
    (assets.quantity_of(mint, policy_id, minted_token_name) == 1)?,
    (list.length(certificates) == 0)?,
    (list.length(withdrawals) == 0)?,
    (list.length(extra_signatories) == 0)?,
    dict.is_empty(datums)?,
    (list.length(votes) == 0)?,
    (list.length(proposal_procedures) == 0)?,
    (current_treasury_amount == None)?,
    (treasury_donation == None)?,
  }
}

validator script_context_schema(expected: ScriptContext) {
  else(actual: script_context.ScriptContext) {
    and {
      check_expected_context(expected)?,
      check_actual_context(actual)?,
    }
  }
}
