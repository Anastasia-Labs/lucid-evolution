---
"@lucid-evolution/core-utils": patch
"@lucid-evolution/utils": patch
"@lucid-evolution/plutus": patch
"@lucid-evolution/lucid": patch
"@lucid-evolution/provider": patch
"@lucid-evolution/wallet": patch
---

Free the CML wasm objects that transaction building, signing, UTxO conversion, Plutus data serialization, seed-wallet derivation and the emulator create internally instead of leaving them to the wasm-bindgen finalizer. Long-running processes that build many transactions no longer grow the CML wasm memory by hundreds of megabytes before a major GC happens to run the finalizers. Adds `withCMLScope` and `freeCML` to `@lucid-evolution/core-utils`. The emulator's `evaluateTx` now reads the redeemer index with `key.index()` instead of `Number(key.index)`.
