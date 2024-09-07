use aiken/collection/list
use aiken/crypto.{Blake2b_224, Hash, VerificationKey}
use cardano/transaction.{OutputReference, Transaction}

pub type Redeemer {
  msg: ByteArray,
}

validator hello_world_params(
  owner: Hash<Blake2b_224, VerificationKey>,
  msg: ByteArray,
) {
  //"Hello, World!"
  spend(
    _datum,
    redeemer: Redeemer,
    _own_ref: OutputReference,
    self: Transaction,
  ) {
    let must_say_hello = redeemer.msg == msg
    let must_be_signed = list.has(self.extra_signatories, owner)
    must_say_hello? && must_be_signed?
  }

  else(_) {
    fail
  }
}
