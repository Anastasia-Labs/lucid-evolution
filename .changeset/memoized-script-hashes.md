---
"@lucid-evolution/utils": patch
"@lucid-evolution/lucid": patch
"@lucid-evolution/provider": patch
---

Stop deserializing and hashing the same script over and over. `validatorToScriptHash` (and with it `mintingPolicyToId`, `validatorToAddress` and `validatorToRewardAddress`), `toScriptRef` and `applyDoubleCborEncoding` remember their results for up to 4096 distinct scripts (64 MiB at most), so `readFrom` with reference scripts, `attach.*` and the actions that delayed completion replays reuse one hash and one decoded copy of each script instead of decoding it from hex on every call. `applyDoubleCborEncoding` now reads the CBOR headers to tell raw, single and double encoded scripts apart rather than trial-decoding the whole script with cbor-x, and returns byte-identical results. A `complete()` that reads six 10 KB PlutusV3 reference scripts and spends one input locked by each is about 35% faster, and about 30% faster when a RedeemerBuilder makes completion replay the actions.

The new `scriptCborBytes(script)` returns the CBOR bytes CML reads for a script, and `ScriptCache` is the bounded table behind these caches. The emulator uses it for its reference script hashes, which used to be an unbounded `Map` keyed by script text: V8 hashes strings longer than 16383 characters by their length only, so a lookup among many same-length scripts compared each of them in full.
