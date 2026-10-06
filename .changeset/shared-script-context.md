---
"@lucid-evolution/uplc": patch
---

Build each transaction's script context once per Plutus version instead of once per redeemer, and keep recently decoded scripts in a small bounded cache. Evaluating transactions with many script inputs or large datums is markedly faster (about 2.3x for 16 script inputs with 1,500-integer inline datums). Results, ex-units and error messages are unchanged.
