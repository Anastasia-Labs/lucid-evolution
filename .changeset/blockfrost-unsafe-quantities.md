---
"@lucid-evolution/provider": patch
---

Blockfrost: `evaluateTx` rejects additional UTxO quantities above `Number.MAX_SAFE_INTEGER` with the same error as Kupmios, instead of rounding them into a script failure that points at the validator.
