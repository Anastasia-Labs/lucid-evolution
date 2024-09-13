use aiken/collection/list
use aiken/crypto.{Blake2b_224, Hash, VerificationKey}
use cardano/governance.{Voter}
use cardano/transaction.{OutputReference, Transaction}

validator always_yes {
  vote(_redeemer: Data, _voter: Voter, _self: Transaction) {
    True
  }

  else(_) {
    True
  }
}
