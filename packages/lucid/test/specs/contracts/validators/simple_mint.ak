use cardano/address.{Credential}
use cardano/transaction.{Transaction}

pub type MintRedeemer {
  idx: Int,
}

pub type WithdrawRedeemer {
  msg: ByteArray,
}

validator mint_policy {
  withdraw(redeemer: WithdrawRedeemer, _account: Credential, _self: Transaction) {
    redeemer.msg == "1"
  }

  mint(redeemer: MintRedeemer, _policy_id: ByteArray, _self: Transaction) {
    redeemer.idx == 1
  }

  else(_) {
    fail @"unsupported purpose"
  }
}
