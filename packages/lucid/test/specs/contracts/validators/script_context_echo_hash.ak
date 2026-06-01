use aiken/builtin
use aiken/crypto.{blake2b_256}
use aiken/primitive/bytearray
use aiken/primitive/string
use cardano/script_context

pub type EchoRedeemer {
  Echo
  Pass
}

fn trace_context(actual: script_context.ScriptContext) -> Bool {
  let serialized = builtin.serialise_data(actual)
  let hash = blake2b_256(serialized)
  trace @"ScriptContext": actual
  trace string.concat(
    @"LUCID_SCRIPT_CONTEXT_CBOR:",
    bytearray.to_hex(serialized),
  )
  trace string.concat(@"LUCID_SCRIPT_CONTEXT_HASH:", bytearray.to_hex(hash))
  fail @"LUCID_SCRIPT_CONTEXT_ECHO"
}

validator script_context_echo_hash {
  else(actual: script_context.ScriptContext) {
    expect redeemer: EchoRedeemer = actual.redeemer
    when redeemer is {
      Echo -> trace_context(actual)
      Pass -> True
    }
  }
}
