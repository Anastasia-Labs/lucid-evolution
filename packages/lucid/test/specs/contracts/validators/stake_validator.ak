use aiken/list
use aiken/pairs
use aiken/transaction.{ScriptContext, Spend, WithdrawFrom}
use aiken/transaction/credential.{Inline}
use aiken/cbor

validator {
  fn spend(_datum: Data, _redeemer: Int, ctx: ScriptContext) -> Bool {
    expect ScriptContext { transaction, purpose: Spend(out_ref) } = ctx
    // expect Some(input) = list.at(transaction.inputs, redeemer)
    expect Some(input) = transaction.find_input(transaction.inputs, out_ref)
    and {
      input.output_reference == out_ref,
      pairs.has_key(
        transaction.withdrawals,
        Inline(input.output.address.payment_credential),
      ),
    }
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
    trace cbor.diagnostic(input_count)
    trace cbor.diagnostic(output_count)
    (input_count == output_count)?
  }
}
