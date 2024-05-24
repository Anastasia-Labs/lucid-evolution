use aiken/hash.{Blake2b_224, Hash}
use aiken/list
use aiken/transaction.{ScriptContext}
use aiken/transaction/credential.{VerificationKey}

type Redeemer {
  msg: ByteArray,
}

validator(
    owner: Hash<Blake2b_224, VerificationKey>,
      msg: ByteArray, //"Hello, World!"
) {
  fn spend(
    _datum: Data,
    redeemer: Redeemer,
    context: ScriptContext,
  ) -> Bool {
    let must_say_hello = redeemer.msg == msg
    let must_be_signed =
      list.has(context.transaction.extra_signatories, owner)
    must_say_hello? && must_be_signed?
  }
}
