---
"@lucid-evolution/scalus-uplc": patch
---

Free the CML wasm objects that `buildUtxoMapCbor` creates for every UTxO on every evaluation instead of leaving them to the wasm-bindgen finalizer. The Scalus evaluator no longer slows down as a long-running process or test file evaluates more transactions: on a Midgard fault-proof suite file with about 53,000 evaluations, the file now runs in 960 s instead of timing out after 3,983 s. The encoded UTxO map is byte-identical.
