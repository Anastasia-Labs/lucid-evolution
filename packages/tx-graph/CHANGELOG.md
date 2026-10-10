# @lucid-evolution/tx-graph

## 0.1.0

### Minor Changes

- [#752](https://github.com/Anastasia-Labs/lucid-evolution/pull/752) [`544ae00`](https://github.com/Anastasia-Labs/lucid-evolution/commit/544ae00309186ec335500c308078254594f4bcc0) Thanks [@colll78](https://github.com/colll78)! - Vendor cardano-multiplatform-lib as `@lucid-evolution/cml` and depend on it instead of `@anastasia-labs/cardano-multiplatform-lib-nodejs` and `-browser`. The API is unchanged. The Node build's wasm shadow stack is raised to 16 MiB so deeply nested Plutus data decodes; the browser build keeps the 1 MiB stack. Import CML from `@lucid-evolution/lucid` (or `@lucid-evolution/cml`): objects created by a separately installed `@anastasia-labs` CML belong to another wasm instance and cannot be passed to Lucid.

### Patch Changes

- Updated dependencies [[`544ae00`](https://github.com/Anastasia-Labs/lucid-evolution/commit/544ae00309186ec335500c308078254594f4bcc0), [`544ae00`](https://github.com/Anastasia-Labs/lucid-evolution/commit/544ae00309186ec335500c308078254594f4bcc0)]:
  - @lucid-evolution/cml@0.1.0
  - @lucid-evolution/utils@0.2.0
  - @lucid-evolution/core-types@0.5.0
  - @lucid-evolution/core-utils@0.2.0

## 0.0.8

### Patch Changes

- Updated dependencies [[`9e2a10a`](https://github.com/Anastasia-Labs/lucid-evolution/commit/9e2a10af3ba1570af3a7890b154cb12646cac705), [`5ca7f92`](https://github.com/Anastasia-Labs/lucid-evolution/commit/5ca7f925136d9c8054fe2986b612a8a269f77fa5), [`b95feb8`](https://github.com/Anastasia-Labs/lucid-evolution/commit/b95feb819f9860e7bf8da61118e52db738f4c8e0), [`636661e`](https://github.com/Anastasia-Labs/lucid-evolution/commit/636661ec7fd9c42d9f9f5be393f961cb1ebf080f)]:
  - @lucid-evolution/utils@0.1.76
  - @lucid-evolution/core-types@0.4.0

## 0.0.7

### Patch Changes

- Updated dependencies []:
  - @lucid-evolution/utils@0.1.75

## 0.0.6

### Patch Changes

- Updated dependencies [[`225af02`](https://github.com/Anastasia-Labs/lucid-evolution/commit/225af02091fb92b3cab5b8885160c50c2c1b8ee0)]:
  - @lucid-evolution/core-utils@0.1.17
  - @lucid-evolution/utils@0.1.74

## 0.0.5

### Patch Changes

- Updated dependencies []:
  - @lucid-evolution/utils@0.1.73

## 0.0.4

### Patch Changes

- Updated dependencies [[`0354017`](https://github.com/Anastasia-Labs/lucid-evolution/commit/03540179acf391dc1bae7fb098a16ace472bc19e)]:
  - @lucid-evolution/core-types@0.3.0
  - @lucid-evolution/utils@0.1.72

## 0.0.3

### Patch Changes

- Updated dependencies [[`0365cc5`](https://github.com/Anastasia-Labs/lucid-evolution/commit/0365cc5ef6e683863aa80306fc5ee5fa2407b00f)]:
  - @lucid-evolution/core-types@0.2.2
  - @lucid-evolution/utils@0.1.71

## 0.0.2

### Patch Changes

- Updated dependencies [[`cf9ffe0`](https://github.com/Anastasia-Labs/lucid-evolution/commit/cf9ffe046a39fdd6fd331b2ffd1f83b48a0934e6)]:
  - @lucid-evolution/core-types@0.2.1
  - @lucid-evolution/utils@0.1.70

## 0.0.1

### Patch Changes

- Updated dependencies [[`2b1557f`](https://github.com/Anastasia-Labs/lucid-evolution/commit/2b1557f3e1df1172da1f4472b92a73249071bd38), [`2b1557f`](https://github.com/Anastasia-Labs/lucid-evolution/commit/2b1557f3e1df1172da1f4472b92a73249071bd38)]:
  - @lucid-evolution/core-types@0.2.0
  - @lucid-evolution/utils@0.1.69
