use aiken/collection/list
use cardano/address.{Credential, Script}
use cardano/assets
use cardano/transaction.{OutputReference, Transaction, find_input}

pub type StressRedeemer {
  input_checks: List<InputIndexCheck>,
  redeemer_checks: List<RedeemerIndexCheck>,
  mint_checks: List<MintIndexCheck>,
  withdrawal_checks: List<WithdrawalIndexCheck>,
}

pub type AssetCheck {
  policy_id: ByteArray,
  token_name: ByteArray,
  min_quantity: Int,
}

pub type InputIndexCheck {
  at: Int,
  expected_ref: Option<OutputReference>,
  expected_payment_credential: Option<Credential>,
  must_contain: AssetCheck,
}

pub type MintIndexCheck {
  at: Int,
  expected_policy_id: ByteArray,
  expected_assets: List<AssetCheck>,
}

pub type WithdrawalIndexCheck {
  at: Int,
  expected_credential: Credential,
  expected_amount: Int,
}

pub type RedeemerIndexCheck {
  at: Int,
  expected_purpose: ExpectedRedeemerPurpose,
}

pub type ExpectedRedeemerPurpose {
  ExpectedSpend { input_ref: OutputReference, expected_script_hash: ByteArray }
  ExpectedMint { policy_id: ByteArray }
  ExpectedWithdraw { credential: Credential }
}

fn check_input_index(tx: Transaction, check: InputIndexCheck) -> Bool {
  expect Some(input) = list.at(tx.inputs, check.at)

  let has_expected_ref =
    when check.expected_ref is {
      None -> True
      Some(ref) -> input.output_reference == ref
    }

  let has_expected_credential =
    when check.expected_payment_credential is {
      None -> True
      Some(credential) -> input.output.address.payment_credential == credential
    }

  let token_quantity =
    assets.quantity_of(
      input.output.value,
      check.must_contain.policy_id,
      check.must_contain.token_name,
    )

  and {
    has_expected_ref?,
    has_expected_credential?,
    (token_quantity >= check.must_contain.min_quantity)?,
  }
}

fn check_mint_index(tx: Transaction, check: MintIndexCheck) -> Bool {
  let policy_ids = assets.policies(tx.mint)
  expect Some(policy_id) = list.at(policy_ids, check.at)

  let assets_ok =
    list.all(
      check.expected_assets,
      fn(asset) {
        assets.quantity_of(tx.mint, asset.policy_id, asset.token_name) >= asset.min_quantity
      },
    )

  and {
    (policy_id == check.expected_policy_id)?,
    assets_ok?,
  }
}

fn check_withdrawal_index(tx: Transaction, check: WithdrawalIndexCheck) -> Bool {
  expect Some(Pair(credential, amount)) = list.at(tx.withdrawals, check.at)

  and {
    (credential == check.expected_credential)?,
    (amount == check.expected_amount)?,
  }
}

fn check_redeemer_index(tx: Transaction, check: RedeemerIndexCheck) -> Bool {
  expect Some(Pair(purpose, _redeemer_data)) = list.at(tx.redeemers, check.at)

  when check.expected_purpose is {
    ExpectedSpend { input_ref, expected_script_hash } -> {
      expect transaction.Spend(actual_ref) = purpose
      expect Some(input) = find_input(tx.inputs, actual_ref)
      expect Script(actual_script_hash) =
        input.output.address.payment_credential

      and {
        (actual_ref == input_ref)?,
        (actual_script_hash == expected_script_hash)?,
      }
    }

    ExpectedMint { policy_id } -> {
      expect transaction.Mint(actual_policy_id) = purpose
      actual_policy_id == policy_id
    }

    ExpectedWithdraw { credential } -> {
      expect transaction.Withdraw(actual_credential) = purpose
      actual_credential == credential
    }
  }
}

fn stress_checks_pass(tx: Transaction, redeemer: StressRedeemer) -> Bool {
  and {
    list.all(redeemer.input_checks, fn(check) { check_input_index(tx, check) })?,
    list.all(redeemer.mint_checks, fn(check) { check_mint_index(tx, check) })?,
    list.all(
      redeemer.withdrawal_checks,
      fn(check) { check_withdrawal_index(tx, check) },
    )?,
    list.all(
      redeemer.redeemer_checks,
      fn(check) { check_redeemer_index(tx, check) },
    )?,
  }
}

validator build_tx_with_stress {
  spend(
    _datum,
    redeemer: StressRedeemer,
    _own_ref: OutputReference,
    tx: Transaction,
  ) {
    stress_checks_pass(tx, redeemer)?
  }

  mint(redeemer: StressRedeemer, policy_id: ByteArray, tx: Transaction) {
    and {
      list.any(
        redeemer.mint_checks,
        fn(check) { check.expected_policy_id == policy_id },
      )?,
      stress_checks_pass(tx, redeemer)?,
    }
  }

  withdraw(redeemer: StressRedeemer, credential: Credential, tx: Transaction) {
    and {
      list.any(
        redeemer.withdrawal_checks,
        fn(check) { check.expected_credential == credential },
      )?,
      stress_checks_pass(tx, redeemer)?,
    }
  }

  else(_) {
    fail
  }
}
