---
"@lucid-evolution/scalus-uplc": minor
---

Move to Scalus 1.5.0. The evaluator keeps one Scalus `TxEvaluator`, which prepares the cost
models once, and builds a new one only when the parameters change. Its evaluators share one
`ScriptCache`, so each script is hashed and decoded once.

The evaluator now passes the transaction's execution budget (`maxTxExMem`, `maxTxExSteps`) to
Scalus. A transaction whose scripts exceed it fails at evaluation, as it does with the Aiken
evaluator, and not on submission.
