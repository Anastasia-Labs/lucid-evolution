# @lucid-evolution/scalus-uplc

## 0.2.1

### Patch Changes

- [#750](https://github.com/Anastasia-Labs/lucid-evolution/pull/750) [`b95feb8`](https://github.com/Anastasia-Labs/lucid-evolution/commit/b95feb819f9860e7bf8da61118e52db738f4c8e0) Thanks [@colll78](https://github.com/colll78)! - Add an optional `EvaluatorAdapter.evaluateBytes`, the same evaluation as `evaluate` with the transaction as CBOR bytes. Lucid calls it when an adapter has it, skipping the hex round trip. The built-in Aiken evaluator now exposes its bytes path this way instead of through a private symbol.

  The Scalus evaluator implements `evaluateBytes`, keeps the Scalus `Utxo` of each resolved UTxO of its latest request, and returns its last successful result again when the next request is the same, as the built-in evaluator does. A delayed-redeemer completion no longer runs Scalus twice on its repeated final request.

- Updated dependencies [[`b95feb8`](https://github.com/Anastasia-Labs/lucid-evolution/commit/b95feb819f9860e7bf8da61118e52db738f4c8e0), [`636661e`](https://github.com/Anastasia-Labs/lucid-evolution/commit/636661ec7fd9c42d9f9f5be393f961cb1ebf080f)]:
  - @lucid-evolution/core-types@0.4.0

## 0.2.0

### Minor Changes

- [#737](https://github.com/Anastasia-Labs/lucid-evolution/pull/737) [`19c9abd`](https://github.com/Anastasia-Labs/lucid-evolution/commit/19c9abd0055534ebb6521b579b19b09d58b22ad1) Thanks [@nau](https://github.com/nau)! - Move to Scalus 1.3.0 and evaluate through its CBOR-first API.

  Scalus now takes UTxOs as handles and a transaction as hex, so the adapter no longer builds the
  CBOR UTxO map itself. That removes the hand-rolled CBOR map writer, the byte comparator, the
  double-CBOR script encoder and the asset-to-CML-value conversion, and with them the dependencies on
  `@anastasia-labs/cardano-multiplatform-lib-{nodejs,browser}` and `cbor-x`. The adapter is 325 lines
  down to 100, and the `browser` field that swapped the two CML builds is no longer needed.

  Scalus 1.x is ESM-only, so the adapter loads it with `import()` on the first evaluation. That keeps
  the CommonJS build working on every Node version the repository supports, Node 18 included.

## 0.1.5

### Patch Changes

- [#735](https://github.com/Anastasia-Labs/lucid-evolution/pull/735) [`d347f31`](https://github.com/Anastasia-Labs/lucid-evolution/commit/d347f310cc1e8943363d86a409c8d998c687279b) Thanks [@nau](https://github.com/nau)! - Free the CML wasm objects that `buildUtxoMapCbor` creates for every UTxO on every evaluation instead of leaving them to the wasm-bindgen finalizer. The Scalus evaluator no longer slows down as a long-running process or test file evaluates more transactions: on a Midgard fault-proof suite file with about 53,000 evaluations, the file now runs in 960 s instead of timing out after 3,983 s. The encoded UTxO map is byte-identical.

## 0.1.4

### Patch Changes

- Updated dependencies [[`225af02`](https://github.com/Anastasia-Labs/lucid-evolution/commit/225af02091fb92b3cab5b8885160c50c2c1b8ee0)]:
  - @lucid-evolution/core-utils@0.1.17

## 0.1.3

### Patch Changes

- Updated dependencies [[`0354017`](https://github.com/Anastasia-Labs/lucid-evolution/commit/03540179acf391dc1bae7fb098a16ace472bc19e)]:
  - @lucid-evolution/core-types@0.3.0

## 0.1.2

### Patch Changes

- [#712](https://github.com/Anastasia-Labs/lucid-evolution/pull/712) [`0365cc5`](https://github.com/Anastasia-Labs/lucid-evolution/commit/0365cc5ef6e683863aa80306fc5ee5fa2407b00f) Thanks [@colll78](https://github.com/colll78)! - Update Scalus to 0.18.1 for PV11-aware evaluator behavior.

- Updated dependencies [[`0365cc5`](https://github.com/Anastasia-Labs/lucid-evolution/commit/0365cc5ef6e683863aa80306fc5ee5fa2407b00f)]:
  - @lucid-evolution/core-types@0.2.2

## 0.1.1

### Patch Changes

- [#710](https://github.com/Anastasia-Labs/lucid-evolution/pull/710) [`cf9ffe0`](https://github.com/Anastasia-Labs/lucid-evolution/commit/cf9ffe046a39fdd6fd331b2ffd1f83b48a0934e6) Thanks [@colll78](https://github.com/colll78)! - Update the bundled Aiken UPLC evaluator to uplc 1.1.22, expose protocol version metadata from Blockfrost protocol parameters, and pass protocol major version through the Scalus evaluator adapter when available.

- Updated dependencies [[`cf9ffe0`](https://github.com/Anastasia-Labs/lucid-evolution/commit/cf9ffe046a39fdd6fd331b2ffd1f83b48a0934e6)]:
  - @lucid-evolution/core-types@0.2.1

## 0.1.0

### Minor Changes

- [#695](https://github.com/Anastasia-Labs/lucid-evolution/pull/695) [`2b1557f`](https://github.com/Anastasia-Labs/lucid-evolution/commit/2b1557f3e1df1172da1f4472b92a73249071bd38) Thanks [@colll78](https://github.com/colll78)! - Add pluggable local evaluator adapters for transaction evaluation, keep the built-in Aiken/WASM evaluator as the default local evaluator, and introduce a Scalus-backed evaluator package.

### Patch Changes

- Updated dependencies [[`2b1557f`](https://github.com/Anastasia-Labs/lucid-evolution/commit/2b1557f3e1df1172da1f4472b92a73249071bd38), [`2b1557f`](https://github.com/Anastasia-Labs/lucid-evolution/commit/2b1557f3e1df1172da1f4472b92a73249071bd38)]:
  - @lucid-evolution/core-types@0.2.0
