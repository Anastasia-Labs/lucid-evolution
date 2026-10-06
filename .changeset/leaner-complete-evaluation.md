---
"@lucid-evolution/lucid": patch
---

Make `complete()` faster for script transactions. The collateral-free draft is now evaluated once for every completion (with or without coin selection, and in each delayed-redeemer attempt), since its ex-units only feed the fee estimate used for coin selection and collateral; the final transaction is still evaluated to a fixed point. A plain script spend now runs two evaluations instead of three, and a delayed-redeemer spend two instead of three. With `coinSelection: false`, the final-collateral check now applies to custom evaluators as well, and it measures the collateral that was actually selected (so an exact-amount collateral UTxO without a collateral return is accepted).

Each evaluation also does less work: governance redeemer normalization is skipped when the transaction registered no vote or proposal witnesses, the script data hash finds the used Plutus languages without re-resolving every input, the built-in evaluator receives the transaction as bytes and reuses the CBOR encoding of UTxOs it has already seen, the fixed-point check compares bytes instead of building hex strings, redundant `min_fee` calculations are skipped, and input bookkeeping uses out-ref sets instead of repeated linear scans. Custom evaluators still receive every request in hex as before.
