---
"@lucid-evolution/lucid": patch
---

Avoid repeated UPLC evaluations during `complete()` with the built-in evaluator. Each completion now uses one evaluator that returns its last result again for a byte-identical request, so the fee, collateral and delayed-redeemer passes no longer re-run the same evaluation. With `coinSelection: false`, the collateral-free draft is evaluated once (only its fee is used to size collateral) and the final transaction is still evaluated to a fixed point; if the selected collateral does not cover the final fee, `complete()` now fails with a clear error instead of returning a transaction the ledger would reject. Custom and Lucid-configured evaluators are called for every request as before.
