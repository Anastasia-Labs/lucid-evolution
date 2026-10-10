---
"@lucid-evolution/cml": patch
"@lucid-evolution/utils": patch
"@lucid-evolution/lucid": patch
---

Make `complete()` faster for script transactions without changing the transactions it builds: CML no longer deep-copies the transaction builder to estimate fees, UTxO outputs are converted once per completion, coin selection builds its errors only on failure, and the Node build of CML is compiled for speed. A transaction spending 16 script UTxOs with 7.5 KB inline datums completes in about 16 ms instead of about 59 ms, and one with 300-integer datums in about 7 ms instead of about 17 ms.
