use aiken/builtin
use aiken/primitive/bytearray
use aiken/primitive/string
use cardano/script_context

validator data_serialise_echo {
  else(actual: script_context.ScriptContext) {
    trace string.concat(
      @"LUCID_BUILTIN_SERIALISE_DATA:",
      bytearray.to_hex(builtin.serialise_data(actual)),
    )
    fail @"LUCID_BUILTIN_SERIALISE_DATA_ECHO"
  }
}
