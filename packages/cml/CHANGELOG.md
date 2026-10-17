# @lucid-evolution/cml

## 0.1.2

### Patch Changes

- [#761](https://github.com/Anastasia-Labs/lucid-evolution/pull/761) [`b1c15de`](https://github.com/Anastasia-Labs/lucid-evolution/commit/b1c15dea1c18e45ba2c6a10d4f3117552d6671e5) Thanks [@colll78](https://github.com/colll78)! - Handle deeply nested Plutus data with iterative CBOR and ownership operations in the Node and browser CML builds and in Data.from/Data.to. Shallow data keeps a recursive fast path, and Data.from/Data.to now decode and encode common datums without crossing into WASM. Preserve encoding choices, map ordering and duplicate-key behavior, with public API coverage at depth 10,000.

## 0.1.1

### Patch Changes

- [#755](https://github.com/Anastasia-Labs/lucid-evolution/pull/755) [`ebb5f33`](https://github.com/Anastasia-Labs/lucid-evolution/commit/ebb5f3391335e0c91e2d46b4978738eb333293bc) Thanks [@colll78](https://github.com/colll78)! - Speed up importing Lucid, building transactions and running the emulator without changing the transactions built. Effect modules are imported by path, and DRep ids are parsed without loading `@cardano-sdk/core`, so importing Lucid takes about 430 ms instead of about 515 ms. Canonicalising a transaction is a single CML call (`Transaction.to_canonical_keeping_plutus_data`), about four times faster. Plutus schemas are built without cloning nested schemas. On Node, the emulator verifies vkey witnesses with the native Ed25519 (about three times faster), seed wallets derive their root key with the native PBKDF2, and hex is encoded and decoded with the native codec; other runtimes keep the existing code. In a benchmark of 24 transaction shapes, the geometric mean time to build a transaction fell by about a quarter (2.9 to 2.1 ms). Most of that is for wallets that hold many tokens, which take about 39% less time, and where simple payments and mints build about twice as fast; for an ada-only wallet the gain is about 12%. CML sizes packed change and output fees without rebuilding the transaction, hashes the keys of its maps (policy ids, asset names and the like) with foldhash instead of SipHash, and has a new `TransactionBuilder.has_redeemers`, so Lucid no longer builds a draft just to check for redeemers.

  `@lucid-evolution/utils` now depends on `@scure/base` for bech32, and `@cardano-sdk/core` is only a development dependency, used by its tests.

## 0.1.0

### Minor Changes

- [#752](https://github.com/Anastasia-Labs/lucid-evolution/pull/752) [`544ae00`](https://github.com/Anastasia-Labs/lucid-evolution/commit/544ae00309186ec335500c308078254594f4bcc0) Thanks [@colll78](https://github.com/colll78)! - Vendor cardano-multiplatform-lib as `@lucid-evolution/cml` and depend on it instead of `@anastasia-labs/cardano-multiplatform-lib-nodejs` and `-browser`. The API is unchanged. The Node build's wasm shadow stack is raised to 16 MiB so deeply nested Plutus data decodes; the browser build keeps the 1 MiB stack. Import CML from `@lucid-evolution/lucid` (or `@lucid-evolution/cml`): objects created by a separately installed `@anastasia-labs` CML belong to another wasm instance and cannot be passed to Lucid.

### Patch Changes

- [#752](https://github.com/Anastasia-Labs/lucid-evolution/pull/752) [`544ae00`](https://github.com/Anastasia-Labs/lucid-evolution/commit/544ae00309186ec335500c308078254594f4bcc0) Thanks [@colll78](https://github.com/colll78)! - Make `complete()` faster for script transactions without changing the transactions it builds: CML no longer deep-copies the transaction builder to estimate fees, UTxO outputs are converted once per completion, coin selection builds its errors only on failure, and the Node build of CML is compiled for speed. A transaction spending 16 script UTxOs with 7.5 KB inline datums completes in about 16 ms instead of about 59 ms, and one with 300-integer datums in about 7 ms instead of about 17 ms.
