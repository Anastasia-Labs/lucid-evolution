use aiken/collection/dict
use aiken/collection/list
use cardano/assets
use cardano/script_context
use cardano/transaction
use script_context_schema

const builder_token_name = #"4d696e745769746864726177"

const checker_token_name = #"536372697074436f6e74657874"

pub type MintRedeemer {
  idx: Int,
}

fn check_expected_context(expected: script_context_schema.ScriptContext) -> Bool {
  let script_context_schema.ScriptContext {
    script_context_tx_info,
    script_context_redeemer,
    script_context_script_info,
  } = expected
  expect MintRedeemer { idx: expected_redeemer } = script_context_redeemer
  expect script_context_schema.MintingScript(policy_id) =
    script_context_script_info
  let script_context_schema.TxInfo {
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
    tx_info_id: _tx_info_id,
    tx_info_votes,
    tx_info_proposal_procedures,
    tx_info_current_treasury_amount,
    tx_info_treasury_donation,
  } = script_context_tx_info
  let script_context_schema.POSIXTimeRange { iv_from: _iv_from, iv_to: _iv_to } =
    tx_info_valid_range
  expect [first_input, ..] = tx_info_inputs
  let script_context_schema.TxInInfo { tx_in_info_out_ref, tx_in_info_resolved } =
    first_input
  let script_context_schema.TxOutRef {
    tx_out_ref_id: _input_tx_id,
    tx_out_ref_idx: input_output_index,
  } = tx_in_info_out_ref
  let script_context_schema.TxOut {
    tx_out_address: input_address,
    tx_out_value: input_value,
    tx_out_datum: input_datum,
    tx_out_reference_script: input_reference_script,
  } = tx_in_info_resolved
  let script_context_schema.Address {
    address_credential: _input_payment_credential,
    address_staking_credential: _input_stake_credential,
  } = input_address
  let input_assets = assets.flatten(assets.from_asset_list(input_value))
  expect script_context_schema.NoOutputDatum = input_datum
  expect None = input_reference_script
  expect [first_output, ..] = tx_info_outputs
  let script_context_schema.TxOut {
    tx_out_address: output_address,
    tx_out_value: output_value,
    tx_out_datum: output_datum,
    tx_out_reference_script: output_reference_script,
  } = first_output
  let script_context_schema.Address {
    address_credential: _output_payment_credential,
    address_staking_credential: _output_stake_credential,
  } = output_address
  let output_assets = assets.flatten(assets.from_asset_list(output_value))
  expect script_context_schema.NoOutputDatum = output_datum
  expect None = output_reference_script
  expect [(mint_policy, mint_token, mint_quantity)] =
    assets.flatten(assets.from_asset_list(tx_info_mint))
  expect [Pair(script_context_schema.Minting(redeemer_policy), redeemer_data)] =
    tx_info_redeemers
  expect MintRedeemer { idx: redeemer_idx } = redeemer_data

  and {
    (expected_redeemer == 1)?,
    (policy_id == mint_policy)?,
    (policy_id == redeemer_policy)?,
    (mint_token == builder_token_name)?,
    (mint_quantity == 1)?,
    (redeemer_idx == 1)?,
    (input_output_index >= 0)?,
    (list.length(input_assets) > 0)?,
    (list.length(tx_info_reference_inputs) == 0)?,
    (list.length(tx_info_outputs) > 0)?,
    (list.length(output_assets) > 0)?,
    (tx_info_fee > 0)?,
    (list.length(tx_info_tx_certs) == 0)?,
    (list.length(tx_info_wdrl) == 0)?,
    (list.length(tx_info_signatories) == 0)?,
    (list.length(tx_info_data) == 0)?,
    (list.length(tx_info_votes) == 0)?,
    (list.length(tx_info_proposal_procedures) == 0)?,
    (tx_info_current_treasury_amount == None)?,
    (tx_info_treasury_donation == None)?,
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
    (assets.quantity_of(mint, policy_id, checker_token_name) == 1)?,
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

validator script_context_from_builder(
  expected: script_context_schema.ScriptContext,
) {
  else(actual: script_context.ScriptContext) {
    and {
      check_expected_context(expected)?,
      check_actual_context(actual)?,
    }
  }
}
