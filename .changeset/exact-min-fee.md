---
"@lucid-evolution/lucid": patch
---

`setMinFee(fee)` now sets the fee to exactly `fee` when completion adds a change output, as long as `fee` is at least the ledger fee; the change output pays the difference. Before, the change output's own fee (about 2,860 lovelace for an ada-only change output) was added on top, so the fee came out higher than requested. Scripts that check the transaction fee see the same fee during evaluation. When `fee` is below the ledger fee, the ledger fee is charged, as before.
