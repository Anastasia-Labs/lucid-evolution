---
"@lucid-evolution/uplc": minor
---

Support protocol version 11 (van Rossem) in the Aiken evaluator: the Plutus V3 array builtins and constants, the new Value and BLS builtins, `case` on built-in types, and the builtins that become available to Plutus V1 and V2. Evaluation follows the Haskell evaluator, plutus-core 1.71: builtins unlift their arguments before they are costed, integers and bytestrings passed to builtins are bounded as on chain, and costing saturates like Plutus. Transactions are evaluated at protocol version 11 only when `eval_phase_two_raw` is given that version; omitting it keeps protocol version 10.

Add `eval_program_raw`, which evaluates a flat-encoded UPLC program applied to CBOR `Data` arguments outside of any transaction and returns whether it succeeded, why not, its cost and its traces, and `uplc_build_info`, which describes the build: the uplc crate it was built from, each Plutus version's cost model length, and a self-test of its semantics.
