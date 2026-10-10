---
"@lucid-evolution/cml": patch
"@lucid-evolution/core-utils": patch
"@lucid-evolution/lucid": patch
"@lucid-evolution/plutus": patch
"@lucid-evolution/provider": patch
"@lucid-evolution/utils": patch
"@lucid-evolution/wallet": patch
---

Speed up importing Lucid, building transactions and running the emulator without changing the transactions built. Effect modules are imported by path, and DRep ids are parsed without loading `@cardano-sdk/core`, so importing Lucid takes about 430 ms instead of about 515 ms. Canonicalising a transaction is a single CML call (`Transaction.to_canonical_keeping_plutus_data`), about four times faster. Plutus schemas are built without cloning nested schemas. On Node, the emulator verifies vkey witnesses with the native Ed25519 (about three times faster), seed wallets derive their root key with the native PBKDF2, and hex is encoded and decoded with the native codec; other runtimes keep the existing code. Building a transaction is about 30% faster across a range of transaction shapes, and about twice as fast for wallets that hold many tokens. CML sizes packed change and output fees without rebuilding the transaction, hashes asset names with foldhash instead of SipHash, and has a new `TransactionBuilder.has_redeemers`, so Lucid no longer builds a draft just to check for redeemers.
