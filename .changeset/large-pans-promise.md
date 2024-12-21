---
"@lucid-evolution/lucid": patch
"@lucid-evolution/utils": patch
---

UTXO handling to normalize entries containing both a `datum` and `datumHash`.
The `datum` field is now removed when a `datumHash` is present to ensure consistency and avoid errors during transaction evaluation.
