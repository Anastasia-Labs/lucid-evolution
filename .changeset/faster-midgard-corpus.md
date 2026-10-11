---
"@lucid-evolution/cml": patch
"@lucid-evolution/core-utils": patch
"@lucid-evolution/lucid": patch
"@lucid-evolution/plutus": patch
"@lucid-evolution/provider": patch
"@lucid-evolution/utils": patch
"@lucid-evolution/wallet": patch
---

Speed up importing Lucid, building transactions and running the emulator without changing the transactions built. Effect modules are imported by path, and DRep ids are parsed without loading `@cardano-sdk/core`, so importing Lucid takes about 430 ms instead of about 515 ms. Canonicalising a transaction is a single CML call (`Transaction.to_canonical_keeping_plutus_data`), about four times faster. Plutus schemas are built without cloning nested schemas. On Node, the emulator verifies vkey witnesses with the native Ed25519 (about three times faster), seed wallets derive their root key with the native PBKDF2, and hex is encoded and decoded with the native codec; other runtimes keep the existing code. In a benchmark of 24 transaction shapes, the geometric mean time to build a transaction fell by about a quarter (2.9 to 2.1 ms). Most of that is for wallets that hold many tokens, which take about 39% less time, and where simple payments and mints build about twice as fast; for an ada-only wallet the gain is about 12%. CML sizes packed change and output fees without rebuilding the transaction, hashes the keys of its maps (policy ids, asset names and the like) with foldhash instead of SipHash, and has a new `TransactionBuilder.has_redeemers`, so Lucid no longer builds a draft just to check for redeemers.

`@lucid-evolution/utils` now depends on `@scure/base` for bech32, and `@cardano-sdk/core` is only a development dependency, used by its tests.
