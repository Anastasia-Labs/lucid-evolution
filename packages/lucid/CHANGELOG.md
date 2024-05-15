# @lucid-evolution/lucid

## 0.2.18

### Patch Changes

- Updated dependencies [[`4c8c0d4`](https://github.com/Anastasia-Labs/lucid-evolution/commit/4c8c0d406d66770b1c6104f590b92cf0849b5ad5)]:
  - @lucid-evolution/uplc@0.2.2

## 0.2.17

### Patch Changes

- [#86](https://github.com/Anastasia-Labs/lucid-evolution/pull/86) [`6eacab5`](https://github.com/Anastasia-Labs/lucid-evolution/commit/6eacab5c108485877879a2deffd2f8a1369ac172) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - - fix: use TransactionOutputBuilder.() instead of TransactionOutput.new()

  - test: enable all preprod tests
  - test: update test
  - refactor: code structure
  - test: add hello contract test using retry implementation

- [#86](https://github.com/Anastasia-Labs/lucid-evolution/pull/86) [`23220d3`](https://github.com/Anastasia-Labs/lucid-evolution/commit/23220d3da741d0e413dc89d8380129bee5fa79f6) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - refactor code

- Updated dependencies [[`6eacab5`](https://github.com/Anastasia-Labs/lucid-evolution/commit/6eacab5c108485877879a2deffd2f8a1369ac172), [`9799ffd`](https://github.com/Anastasia-Labs/lucid-evolution/commit/9799ffd90bbbf393bcf91c95733a1486367650e2), [`a8abb5d`](https://github.com/Anastasia-Labs/lucid-evolution/commit/a8abb5df4b6d233e314a36f0948c95ab15f784bb)]:
  - @lucid-evolution/provider@0.1.10
  - @lucid-evolution/wallet@0.1.8
  - @lucid-evolution/utils@0.1.8

## 0.2.16

### Patch Changes

- [#84](https://github.com/Anastasia-Labs/lucid-evolution/pull/84) [`2fb5635`](https://github.com/Anastasia-Labs/lucid-evolution/commit/2fb56356fbdfc41c5dc7328456559c8aaf8dbf15) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - - refactor: fetch wallet utxos only once
  - refactor: change code structure
  - refactor: move CML to core file
  - refactor: set core file for CML lib
  - build(upgrade): bump packages version
- Updated dependencies [[`2fb5635`](https://github.com/Anastasia-Labs/lucid-evolution/commit/2fb56356fbdfc41c5dc7328456559c8aaf8dbf15)]:
  - @lucid-evolution/core-types@0.1.5
  - @lucid-evolution/core-utils@0.1.5
  - @lucid-evolution/sign_data@0.1.5
  - @lucid-evolution/provider@0.1.9
  - @lucid-evolution/plutus@0.1.8
  - @lucid-evolution/wallet@0.1.7
  - @lucid-evolution/bip39@0.2.6
  - @lucid-evolution/utils@0.1.7

## 0.2.15

### Patch Changes

- Updated dependencies [[`30cec9b`](https://github.com/Anastasia-Labs/lucid-evolution/commit/30cec9b9f07ef8fbe478d67ef8d42b2aa841efb3)]:
  - @lucid-evolution/provider@0.1.8

## 0.2.14

### Patch Changes

- [`5cd6e9c`](https://github.com/Anastasia-Labs/lucid-evolution/commit/5cd6e9c673789499585c321e3d7569bbfae8b8e9) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - - fix: interval now returns effect, payToContract yield the effect
  - feat: add pool module
  - refactor: cleanup use new syntax
  - fix: payToContract checks for empty datum
  - refactor: rename addressFromWithNetworkCheck to toCMLAddress, and reuse validateAddressDetails
  - refactor: cleanup stake module
  - fix: export Errors
  - fix: add proper tag name to TxSignerError

## 0.2.13

### Patch Changes

- Updated dependencies [[`73f7090`](https://github.com/Anastasia-Labs/lucid-evolution/commit/73f7090bf7571f595ce202d11552b62dac0c3028)]:
  - @lucid-evolution/provider@0.1.7

## 0.2.12

### Patch Changes

- Updated dependencies [[`ed27a6f`](https://github.com/Anastasia-Labs/lucid-evolution/commit/ed27a6fe707767dfc9332e242a8af939fc286db2)]:
  - @lucid-evolution/provider@0.1.6
  - @lucid-evolution/utils@0.1.6
  - @lucid-evolution/wallet@0.1.6

## 0.2.11

### Patch Changes

- [#74](https://github.com/Anastasia-Labs/lucid-evolution/pull/74) [`c97d83d`](https://github.com/Anastasia-Labs/lucid-evolution/commit/c97d83de7c43477aeb3a0cc2ef5de71697a1262c) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - bump lucid

## 0.2.9

### Patch Changes

- [#72](https://github.com/Anastasia-Labs/lucid-evolution/pull/72) [`459df3e`](https://github.com/Anastasia-Labs/lucid-evolution/commit/459df3e95fd55ccdf48fc9cd63e850c053d2f470) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - bump all packages

- Updated dependencies [[`459df3e`](https://github.com/Anastasia-Labs/lucid-evolution/commit/459df3e95fd55ccdf48fc9cd63e850c053d2f470)]:
  - @lucid-evolution/bip39@0.2.5
  - @lucid-evolution/core-types@0.1.4
  - @lucid-evolution/core-utils@0.1.4
  - @lucid-evolution/plutus@0.1.7
  - @lucid-evolution/provider@0.1.5
  - @lucid-evolution/sign_data@0.1.4
  - @lucid-evolution/uplc@0.2.1
  - @lucid-evolution/utils@0.1.5
  - @lucid-evolution/wallet@0.1.5

## 0.2.8

### Patch Changes

- [#51](https://github.com/Anastasia-Labs/lucid-evolution/pull/51) [`bcda3fc`](https://github.com/Anastasia-Labs/lucid-evolution/commit/bcda3fc3ca9dc13e93ef95929af2fe6fd0937e60) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - Introduced a new function, applyDoubleCborEncoding, which offers double bytestring encoding capability to scripts.
  Notably, this function was previously dependent on `lucid-cardano`, but now our package is completely detached from it.

- [#54](https://github.com/Anastasia-Labs/lucid-evolution/pull/54) [`327bed5`](https://github.com/Anastasia-Labs/lucid-evolution/commit/327bed54586d65675003bfcfb15f364aee4dec14) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - update transaction builder utils

- [#65](https://github.com/Anastasia-Labs/lucid-evolution/pull/65) [`4e86d3b`](https://github.com/Anastasia-Labs/lucid-evolution/commit/4e86d3b43398654dc67e6bcafe13502908511870) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - refactor to use one async call when fetching protocol parameters

- [#53](https://github.com/Anastasia-Labs/lucid-evolution/pull/53) [`bedcbd0`](https://github.com/Anastasia-Labs/lucid-evolution/commit/bedcbd0d5405b05a651ef228dce5aaf24ead96ae) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - improve errors

- [#63](https://github.com/Anastasia-Labs/lucid-evolution/pull/63) [`70a5b80`](https://github.com/Anastasia-Labs/lucid-evolution/commit/70a5b809903f1e0dbef96ff6e5d32d8507ed442d) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - add stake modules

- [#71](https://github.com/Anastasia-Labs/lucid-evolution/pull/71) [`aa1aab8`](https://github.com/Anastasia-Labs/lucid-evolution/commit/aa1aab867b4c6335f1307264d448dcdcddaa7906) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - add withdraw module

- [#67](https://github.com/Anastasia-Labs/lucid-evolution/pull/67) [`8522fa7`](https://github.com/Anastasia-Labs/lucid-evolution/commit/8522fa7a09cdec0cdd240fd76230b3dd0ce1b2a6) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - fix missing certificate builder for Plutus V1 and V2

- [#54](https://github.com/Anastasia-Labs/lucid-evolution/pull/54) [`4c6470b`](https://github.com/Anastasia-Labs/lucid-evolution/commit/4c6470bc9f7387f7a5060ce6b6d4c595ed18af37) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - update error structure

- Updated dependencies [[`bcda3fc`](https://github.com/Anastasia-Labs/lucid-evolution/commit/bcda3fc3ca9dc13e93ef95929af2fe6fd0937e60), [`70a5b80`](https://github.com/Anastasia-Labs/lucid-evolution/commit/70a5b809903f1e0dbef96ff6e5d32d8507ed442d), [`70a5b80`](https://github.com/Anastasia-Labs/lucid-evolution/commit/70a5b809903f1e0dbef96ff6e5d32d8507ed442d), [`aa1aab8`](https://github.com/Anastasia-Labs/lucid-evolution/commit/aa1aab867b4c6335f1307264d448dcdcddaa7906), [`8522fa7`](https://github.com/Anastasia-Labs/lucid-evolution/commit/8522fa7a09cdec0cdd240fd76230b3dd0ce1b2a6)]:
  - @lucid-evolution/utils@0.1.4
  - @lucid-evolution/wallet@0.1.4
  - @lucid-evolution/bip39@0.2.4
  - @lucid-evolution/provider@0.1.4

## 0.2.7

### Patch Changes

- [#49](https://github.com/Anastasia-Labs/lucid-evolution/pull/49) [`484a3c6`](https://github.com/Anastasia-Labs/lucid-evolution/commit/484a3c6bf273cedc0aa914eccebb4d78d633bdf4) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - - bump CMl version 5.2
  - remove toCMLTransactionHash , use CML.hash_transaction which is the fixed function from CML 5.2
- Updated dependencies [[`484a3c6`](https://github.com/Anastasia-Labs/lucid-evolution/commit/484a3c6bf273cedc0aa914eccebb4d78d633bdf4)]:
  - @lucid-evolution/core-types@0.1.3
  - @lucid-evolution/core-utils@0.1.3
  - @lucid-evolution/sign_data@0.1.3
  - @lucid-evolution/provider@0.1.3
  - @lucid-evolution/plutus@0.1.6
  - @lucid-evolution/wallet@0.1.3
  - @lucid-evolution/bip39@0.2.3
  - @lucid-evolution/utils@0.1.3

## 0.2.6

### Patch Changes

- Updated dependencies [[`67b178b`](https://github.com/Anastasia-Labs/lucid-evolution/commit/67b178be520f53fe6901cac2c8573170408f861a)]:
  - @lucid-evolution/core-types@0.1.2
  - @lucid-evolution/core-utils@0.1.2
  - @lucid-evolution/sign_data@0.1.2
  - @lucid-evolution/provider@0.1.2
  - @lucid-evolution/plutus@0.1.5
  - @lucid-evolution/wallet@0.1.2
  - @lucid-evolution/bip39@0.2.2
  - @lucid-evolution/utils@0.1.2

## 0.2.5

### Patch Changes

- [#45](https://github.com/Anastasia-Labs/lucid-evolution/pull/45) [`0f2e140`](https://github.com/Anastasia-Labs/lucid-evolution/commit/0f2e1404e4a476b5003f2937c01943ffd536fbd4) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - add dual export

- Updated dependencies [[`0f2e140`](https://github.com/Anastasia-Labs/lucid-evolution/commit/0f2e1404e4a476b5003f2937c01943ffd536fbd4)]:
  - @lucid-evolution/core-types@0.1.1
  - @lucid-evolution/core-utils@0.1.1
  - @lucid-evolution/sign_data@0.1.1
  - @lucid-evolution/provider@0.1.1
  - @lucid-evolution/plutus@0.1.4
  - @lucid-evolution/wallet@0.1.1
  - @lucid-evolution/bip39@0.2.1
  - @lucid-evolution/utils@0.1.1

## 0.2.4

### Patch Changes

- [#43](https://github.com/Anastasia-Labs/lucid-evolution/pull/43) [`5c1b342`](https://github.com/Anastasia-Labs/lucid-evolution/commit/5c1b3420e5eab81fea7500671587e5a19bb083d9) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - improve typebox import

- Updated dependencies [[`5c1b342`](https://github.com/Anastasia-Labs/lucid-evolution/commit/5c1b3420e5eab81fea7500671587e5a19bb083d9)]:
  - @lucid-evolution/plutus@0.1.3
  - @lucid-evolution/utils@0.1.0

## 0.2.3

### Patch Changes

- Updated dependencies [[`6b90b68`](https://github.com/Anastasia-Labs/lucid-evolution/commit/6b90b682cc86a14c09b62a7f21b304ad2b741d6c)]:
  - @lucid-evolution/plutus@0.1.2
  - @lucid-evolution/utils@0.1.0

## 0.2.2

### Patch Changes

- [#39](https://github.com/Anastasia-Labs/lucid-evolution/pull/39) [`fd57517`](https://github.com/Anastasia-Labs/lucid-evolution/commit/fd57517a5baac5fcd8c4bd86bd06b5a03311a890) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - add proper dependencies

- Updated dependencies [[`fd57517`](https://github.com/Anastasia-Labs/lucid-evolution/commit/fd57517a5baac5fcd8c4bd86bd06b5a03311a890)]:
  - @lucid-evolution/plutus@0.1.1
  - @lucid-evolution/utils@0.1.0

## 0.2.1

### Patch Changes

- [#37](https://github.com/Anastasia-Labs/lucid-evolution/pull/37) [`958725c`](https://github.com/Anastasia-Labs/lucid-evolution/commit/958725ce9e8854503f6d88b686d02ffb2506b0ae) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - add lucid-cardano as temp dependency

## 0.2.0

### Minor Changes

- [#36](https://github.com/Anastasia-Labs/lucid-evolution/pull/36) [`fea08c4`](https://github.com/Anastasia-Labs/lucid-evolution/commit/fea08c44cdc52e58ed7a20ab4dc2566e708e8a21) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - fix building

### Patch Changes

- [#34](https://github.com/Anastasia-Labs/lucid-evolution/pull/34) [`eec471b`](https://github.com/Anastasia-Labs/lucid-evolution/commit/eec471b6b577bb194a93015a54abca88803e08b5) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - update package.json info

- Updated dependencies [[`fea08c4`](https://github.com/Anastasia-Labs/lucid-evolution/commit/fea08c44cdc52e58ed7a20ab4dc2566e708e8a21)]:
  - @lucid-evolution/bip39@0.2.0
  - @lucid-evolution/core-types@0.1.0
  - @lucid-evolution/core-utils@0.1.0
  - @lucid-evolution/plutus@0.1.0
  - @lucid-evolution/provider@0.1.0
  - @lucid-evolution/sign_data@0.1.0
  - @lucid-evolution/uplc@0.2.0
  - @lucid-evolution/utils@0.1.0
  - @lucid-evolution/wallet@0.1.0

## 0.1.0

### Minor Changes

- [#32](https://github.com/Anastasia-Labs/lucid-evolution/pull/32) [`bb295f2`](https://github.com/Anastasia-Labs/lucid-evolution/commit/bb295f204f91c4beec9a284bb7abff15e0e675b3) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - set the following packages to dependencies

  - @dcspark/cardano-multiplatform-lib-nodejs
  - @emurgo/cardano-message-signing-nodejs

## 0.0.2

### Patch Changes

- Updated dependencies [[`4b81479`](https://github.com/Anastasia-Labs/lucid-evolution/commit/4b814794404f0ea5e64fa5f0840a2791e3fc17a0)]:
  - @lucid-evolution/bip39@0.1.0
  - @lucid-evolution/utils@0.1.0-alpha.0
  - @lucid-evolution/wallet@0.1.0-alpha.0

## 0.0.2-alpha.1

### Patch Changes

- Updated dependencies
- Updated dependencies
  - @lucid-evolution/wallet@0.1.0-alpha.0
  - @lucid-evolution/utils@0.1.0-alpha.0
  - @lucid-evolution/provider@0.0.1

## 0.0.2-alpha.0

### Patch Changes

- Updated dependencies
  - @lucid-evolution/sign_data@0.1.0-alpha.0
