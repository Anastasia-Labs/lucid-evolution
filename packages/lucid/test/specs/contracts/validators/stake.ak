use aiken/cbor
use aiken/list
use aiken/pairs
use aiken/transaction.{ScriptContext, Spend, WithdrawFrom, Output}
use aiken/transaction/credential.{Inline}

type Redeemer {
  input_indices: List<Int>,
}

validator {
  fn spend(_datum: Data, redeemer: Int, ctx: ScriptContext) -> Bool {
    expect ScriptContext { transaction, purpose: Spend(out_ref) } = ctx
    expect Some(input) = list.at(transaction.inputs, redeemer)
    and {
      input.output_reference == out_ref,
      pairs.has_key(
        transaction.withdrawals,
        Inline(input.output.address.payment_credential),
      ),
    }
  }

  fn stake(redeemer: Redeemer, ctx: ScriptContext) -> Bool {
    expect ScriptContext {
      transaction,
      purpose: WithdrawFrom(Inline(own_credential)),
    } = ctx

    let at_script =
      fn(output: Output, acc: Int) {
        if output.address.payment_credential == own_credential {
          acc + 1
        } else {
          acc
        }
      }

    let input_count =
      list.foldl(
        transaction.inputs,
        0,
        fn(input, acc) { at_script(input.output, acc) },
      )

    let output_count = list.foldl(transaction.outputs, 0, at_script)

    trace cbor.diagnostic(input_count)
    trace cbor.diagnostic(output_count)
    and {
      (input_count == output_count)?,
      (input_count == list.length(redeemer.input_indices))?,
    }
  }
}
