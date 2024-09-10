use aiken/cbor
use aiken/collection/dict
use aiken/collection/list
use cardano/address.{Script}
use cardano/assets
use cardano/transaction.{Output, OutputReference, Transaction, find_input}

pub type Redeemer {
  input_indices: List<Int>,
}

validator mint_multi_validator {
  spend(_datum, redeemer: Redeemer, own_ref: OutputReference, self: Transaction) {
    expect Some(input) = find_input(self.inputs, own_ref)
    expect Script(script_hash) = input.output.address.payment_credential
    let empty_mint =
      self.mint
        |> assets.tokens(script_hash)
        |> dict.is_empty

    let own_index_count =
      list.filter(
        redeemer.input_indices,
        fn(index) {
          expect Some(input) = list.at(self.inputs, index)
          input.output_reference == own_ref
        },
      )
        |> list.length

    !empty_mint? && (own_index_count == 1)?
  }

  mint(redeemer: Redeemer, policy_id: ByteArray, self: Transaction) {
    let quantities =
      self.mint
        |> assets.tokens(policy_id)
        |> dict.values

    let at_script =
      fn(output: Output, acc: Int) {
        if output.address.payment_credential == Script(policy_id) {
          acc + 1
        } else {
          acc
        }
      }

    let input_count =
      list.foldl(
        self.inputs,
        0,
        fn(input, acc) { at_script(input.output, acc) },
      )

    let output_count = list.foldl(self.outputs, 0, at_script)
    trace cbor.diagnostic(input_count)
    trace cbor.diagnostic(output_count)
    and {
      1 == 1,
      // to change script hash,
      or {
        list.all(quantities, fn(quantity) { quantity > 0 })?,
        list.all(quantities, fn(quantity) { quantity < 0 })?,
      },
      input_count == output_count,
      (input_count == list.length(redeemer.input_indices))?,
    }
  }

  else(_) {
    fail
  }
}
