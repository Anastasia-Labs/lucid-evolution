# @lucid-evolution/cml

## 0.1.0

### Minor Changes

- [#752](https://github.com/Anastasia-Labs/lucid-evolution/pull/752) [`544ae00`](https://github.com/Anastasia-Labs/lucid-evolution/commit/544ae00309186ec335500c308078254594f4bcc0) Thanks [@colll78](https://github.com/colll78)! - Vendor cardano-multiplatform-lib as `@lucid-evolution/cml` and depend on it instead of `@anastasia-labs/cardano-multiplatform-lib-nodejs` and `-browser`. The API is unchanged. The Node build's wasm shadow stack is raised to 16 MiB so deeply nested Plutus data decodes; the browser build keeps the 1 MiB stack. Import CML from `@lucid-evolution/lucid` (or `@lucid-evolution/cml`): objects created by a separately installed `@anastasia-labs` CML belong to another wasm instance and cannot be passed to Lucid.

### Patch Changes

- [#752](https://github.com/Anastasia-Labs/lucid-evolution/pull/752) [`544ae00`](https://github.com/Anastasia-Labs/lucid-evolution/commit/544ae00309186ec335500c308078254594f4bcc0) Thanks [@colll78](https://github.com/colll78)! - Make `complete()` faster for script transactions without changing the transactions it builds: CML no longer deep-copies the transaction builder to estimate fees, UTxO outputs are converted once per completion, coin selection builds its errors only on failure, and the Node build of CML is compiled for speed. A transaction spending 16 script UTxOs with 7.5 KB inline datums completes in about 16 ms instead of about 59 ms, and one with 300-integer datums in about 7 ms instead of about 17 ms.
