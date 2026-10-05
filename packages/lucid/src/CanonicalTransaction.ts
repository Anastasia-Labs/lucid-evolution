import { withCMLScope, type CMLOwn } from "@lucid-evolution/core-utils";
import { CML } from "./core.js";

const copyOptional = <T>(
  value: T | undefined,
  set: (value: T) => void,
): void => {
  if (value !== undefined) set(value);
};

// Puts the original datum back on a canonical output. Datum hashes and
// inline datums are bound to the exact datum bytes.
const restoreOutputDatum = (
  own: CMLOwn,
  canonical: CML.TransactionOutput,
  original: CML.TransactionOutput,
): CML.TransactionOutput => {
  const conway = own(canonical.as_conway_format_tx_out());
  const datum = own(original.datum());
  if (!conway || !datum) return canonical;
  conway.set_datum_option(datum);
  return own(CML.TransactionOutput.new_conway_format_tx_out(conway));
};

const copyCanonicalBody = (
  own: CMLOwn,
  original: CML.TransactionBody,
  canonical: CML.TransactionBody,
): CML.TransactionBody => {
  const originalOutputs = own(original.outputs());
  const canonicalOutputs = own(canonical.outputs());
  const outputs = own(CML.TransactionOutputList.new());
  for (let index = 0; index < canonicalOutputs.len(); index++) {
    outputs.add(
      restoreOutputDatum(
        own,
        own(canonicalOutputs.get(index)),
        own(originalOutputs.get(index)),
      ),
    );
  }
  const body = own(
    CML.TransactionBody.new(own(canonical.inputs()), outputs, canonical.fee()),
  );
  copyOptional(own(canonical.auxiliary_data_hash()), (value) =>
    body.set_auxiliary_data_hash(value),
  );
  copyOptional(own(canonical.certs()), (value) => body.set_certs(value));
  copyOptional(own(canonical.collateral_inputs()), (value) =>
    body.set_collateral_inputs(value),
  );
  const canonicalCollateralReturn = own(canonical.collateral_return());
  const originalCollateralReturn = own(original.collateral_return());
  if (canonicalCollateralReturn && originalCollateralReturn) {
    body.set_collateral_return(
      restoreOutputDatum(
        own,
        canonicalCollateralReturn,
        originalCollateralReturn,
      ),
    );
  }
  copyOptional(canonical.current_treasury_value(), (value) =>
    body.set_current_treasury_value(value),
  );
  copyOptional(canonical.donation(), (value) => body.set_donation(value));
  copyOptional(own(canonical.mint()), (value) => body.set_mint(value));
  copyOptional(own(canonical.network_id()), (value) =>
    body.set_network_id(value),
  );
  copyOptional(own(canonical.proposal_procedures()), (value) =>
    body.set_proposal_procedures(value),
  );
  copyOptional(own(canonical.reference_inputs()), (value) =>
    body.set_reference_inputs(value),
  );
  copyOptional(own(canonical.required_signers()), (value) =>
    body.set_required_signers(value),
  );
  copyOptional(own(canonical.script_data_hash()), (value) =>
    body.set_script_data_hash(value),
  );
  copyOptional(canonical.total_collateral(), (value) =>
    body.set_total_collateral(value),
  );
  copyOptional(canonical.ttl(), (value) => body.set_ttl(value));
  copyOptional(canonical.validity_interval_start(), (value) =>
    body.set_validity_interval_start(value),
  );
  copyOptional(own(canonical.voting_procedures()), (value) =>
    body.set_voting_procedures(value),
  );
  copyOptional(own(canonical.withdrawals()), (value) =>
    body.set_withdrawals(value),
  );
  return body;
};

// CML's JSON keeps map entry order and exact integers, so equal JSON means
// the same ordered Plutus value.
const samePlutusValue = (
  own: CMLOwn,
  left: CML.PlutusData,
  right: CML.PlutusData,
): boolean => own(left).to_json() === own(right).to_json();

const restoreRedeemerData = (
  own: CMLOwn,
  original: CML.Redeemers,
  canonical: CML.Redeemers,
): CML.Redeemers | undefined => {
  const originalMap = own(original.as_map_redeemer_key_to_redeemer_val());
  const canonicalMap = own(canonical.as_map_redeemer_key_to_redeemer_val());
  if (originalMap && canonicalMap) {
    const restored = own(CML.MapRedeemerKeyToRedeemerVal.new());
    const keys = own(canonicalMap.keys());
    for (let index = 0; index < keys.len(); index++) {
      const key = own(keys.get(index));
      const canonicalValue = own(canonicalMap.get(key))!;
      const originalValue = own(originalMap.get(key));
      restored.insert(
        key,
        originalValue &&
          !samePlutusValue(own, originalValue.data(), canonicalValue.data())
          ? originalValue
          : canonicalValue,
      );
    }
    return CML.Redeemers.new_map_redeemer_key_to_redeemer_val(restored);
  }
  // Legacy redeemers are a list, and canonical encoding keeps its order.
  const originalList = own(original.as_arr_legacy_redeemer());
  const canonicalList = own(canonical.as_arr_legacy_redeemer());
  if (!originalList || !canonicalList) return undefined;
  const restored = own(CML.LegacyRedeemerList.new());
  for (let index = 0; index < canonicalList.len(); index++) {
    const canonicalRedeemer = own(canonicalList.get(index));
    const originalRedeemer = own(originalList.get(index));
    restored.add(
      samePlutusValue(own, originalRedeemer.data(), canonicalRedeemer.data())
        ? canonicalRedeemer
        : originalRedeemer,
    );
  }
  return CML.Redeemers.new_arr_legacy_redeemer(restored);
};

/**
 * Returns a copy of `tx` whose ledger containers use canonical CBOR while its
 * Plutus data keeps the original encoding.
 *
 * `to_canonical_cbor_bytes` also re-encodes Plutus data, sorting every Plutus
 * map by key. A Plutus map is an ordered list of pairs, so sorting it changes
 * the value that scripts see and the hash of a datum. Inline datums and
 * witness datums are copied from `tx` unchanged. A redeemer keeps its
 * canonical encoding only when its Plutus value is unchanged; otherwise the
 * original redeemer data is kept.
 *
 * The caller owns the returned transaction.
 */
export const canonicalTransaction = (tx: CML.Transaction): CML.Transaction =>
  withCMLScope((own) => {
    const canonical = own(
      CML.Transaction.from_cbor_bytes(tx.to_canonical_cbor_bytes()),
    );
    const body = copyCanonicalBody(own, own(tx.body()), own(canonical.body()));
    const witnesses = own(canonical.witness_set());
    const originalWitnesses = own(tx.witness_set());
    const datums = own(originalWitnesses.plutus_datums());
    if (datums) witnesses.set_plutus_datums(datums);
    const originalRedeemers = own(originalWitnesses.redeemers());
    const canonicalRedeemers = own(witnesses.redeemers());
    const redeemers =
      originalRedeemers && canonicalRedeemers
        ? own(restoreRedeemerData(own, originalRedeemers, canonicalRedeemers))
        : undefined;
    if (redeemers) witnesses.set_redeemers(redeemers);
    return CML.Transaction.new(
      body,
      witnesses,
      canonical.is_valid(),
      // Transaction.new takes ownership of the auxiliary data.
      canonical.auxiliary_data(),
    );
  });

/** Canonical CBOR hex of `tx`; see {@link canonicalTransaction}. */
export const canonicalTransactionHex = (tx: CML.Transaction): string =>
  withCMLScope((own) => own(canonicalTransaction(tx)).to_cbor_hex());
