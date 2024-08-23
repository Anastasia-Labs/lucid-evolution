use aiken/cbor
use aiken/dict
use aiken/list
use aiken/transaction.{Mint, Output, ScriptContext, Spend}
use aiken/transaction/credential.{ScriptCredential}
use aiken/transaction/value

type Redeemer {
  input_indices: List<Int>,
}

validator {
  fn spend(_datum: Data, redeemer: Redeemer, ctx: ScriptContext) -> Bool {
    expect ScriptContext { transaction, purpose: Spend(out_ref) } = ctx
    expect Some(input) = transaction.find_input(transaction.inputs, out_ref)
    expect ScriptCredential(script_hash) =
      input.output.address.payment_credential
    let empty_mint =
      transaction.mint
        |> value.from_minted_value
        |> value.tokens(script_hash)
        |> dict.is_empty

    let own_index_count =
      list.filter(
        redeemer.input_indices,
        fn(index) {
          expect Some(input) = list.at(transaction.inputs, index)
          input.output_reference == out_ref
        },
      )
        |> list.length

    !empty_mint? && (own_index_count == 1)?
  }

  fn mint(redeemer: Redeemer, context: ScriptContext) -> Bool {
    expect ScriptContext { transaction, purpose: Mint(policy) } = context
    let quantities =
      transaction.mint
        |> value.from_minted_value
        |> value.tokens(policy)
        |> dict.values

    let at_script =
      fn(output: Output, acc: Int) {
        if output.address.payment_credential == ScriptCredential(policy) {
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
      1 == 1, // to change script hash,
      or {
        list.all(quantities, fn(quantity) { quantity > 0 })?,
        list.all(quantities, fn(quantity) { quantity < 0 })?,
      },
      input_count == output_count,
      (input_count == list.length(redeemer.input_indices))?,
    }
  }
}
