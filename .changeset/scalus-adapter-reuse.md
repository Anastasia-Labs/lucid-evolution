---
"@lucid-evolution/core-types": patch
"@lucid-evolution/lucid": patch
"@lucid-evolution/scalus-uplc": patch
---

Add an optional `EvaluatorAdapter.evaluateBytes`, the same evaluation as `evaluate` with the transaction as CBOR bytes. Lucid calls it when an adapter has it, skipping the hex round trip. The built-in Aiken evaluator now exposes its bytes path this way instead of through a private symbol.

The Scalus evaluator implements `evaluateBytes`, keeps the Scalus `Utxo` of each resolved UTxO of its latest request, and returns its last successful result again when the next request is the same, as the built-in evaluator does. A delayed-redeemer completion no longer runs Scalus twice on its repeated final request.
