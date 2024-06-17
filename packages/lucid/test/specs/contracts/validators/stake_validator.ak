use aiken/pairs
use aiken/transaction.{ScriptContext, Spend, find_input, WithdrawFrom}
use aiken/transaction/credential.{Inline}
use aiken/list

validator {
  fn spend(_datum: Data, _redeemer: Data, ctx: ScriptContext) -> Bool {
    expect ScriptContext { transaction, purpose: Spend(out_ref) } = ctx
    expect Some(input) = find_input(transaction.inputs, out_ref)
    pairs.has_key(
      transaction.withdrawals,
      Inline(input.output.address.payment_credential),
    )
  }

  fn stake(_redeemer: Data, ctx: ScriptContext) -> Bool {
    expect ScriptContext {
      transaction,
      purpose: WithdrawFrom(Inline(own_credential)),
    } = ctx

    let input_count =
      list.foldl(
        transaction.inputs,
        0,
        fn(input, acc) {
          if input.output.address.payment_credential == own_credential {
            acc + 1
          } else {
            acc
          }
        },
      )

    let output_count =
      list.foldl(
        transaction.outputs,
        0,
        fn(output, acc) {
          if output.address.payment_credential == own_credential {
            acc + 1
          } else {
            acc
          }
        },
      )
    input_count == output_count
  }
}
