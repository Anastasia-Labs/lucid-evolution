use aiken/cbor
use aiken/collection/list
use aiken/collection/pairs
use cardano/address.{Credential}
use cardano/transaction.{Output, OutputReference, Transaction}

pub type Redeemer {
  input_indices: List<Int>,
}

validator stake_multivalidator {
  spend(_datum, redeemer: Int, own_ref: OutputReference, self: Transaction) {
    expect Some(input) = list.at(self.inputs, redeemer)
    and {
      (input.output_reference == own_ref)?,
      pairs.has_key(self.withdrawals, input.output.address.payment_credential),
    }
  }

  withdraw(redeemer: Redeemer, own_credential: Credential, self: Transaction) {
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
        self.inputs,
        0,
        fn(input, acc) { at_script(input.output, acc) },
      )

    let output_count = list.foldl(self.outputs, 0, at_script)

    trace cbor.diagnostic(input_count)
    trace cbor.diagnostic(output_count)
    and {
      1 == 1,
      // to change script hash
      (input_count == output_count)?,
      (input_count == list.length(redeemer.input_indices))?,
    }
  }

  else(_) {
    fail
  }
}
