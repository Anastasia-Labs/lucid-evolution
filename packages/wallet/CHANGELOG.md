# @lucid-evolution/wallet

## 0.1.24

### Patch Changes

- Updated dependencies [[`7a8956f`](https://github.com/Anastasia-Labs/lucid-evolution/commit/7a8956f95a4ae08e520a8a5f0b0ea4a3eabe869a)]:
  - @lucid-evolution/core-types@0.1.9
  - @lucid-evolution/utils@0.1.22
  - @lucid-evolution/sign_data@0.1.9

## 0.1.23

### Patch Changes

- Updated dependencies [[`e63c233`](https://github.com/Anastasia-Labs/lucid-evolution/commit/e63c2334a86a50c3ff9e95a142a9299ed76059a3)]:
  - @lucid-evolution/utils@0.1.21

## 0.1.22

### Patch Changes

- [#144](https://github.com/Anastasia-Labs/lucid-evolution/pull/144) [`ed554c4`](https://github.com/Anastasia-Labs/lucid-evolution/commit/ed554c45ed4664568af31a6c1cecb2eb5464cab5) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - add metadata endpoint

- Updated dependencies [[`ed554c4`](https://github.com/Anastasia-Labs/lucid-evolution/commit/ed554c45ed4664568af31a6c1cecb2eb5464cab5)]:
  - @lucid-evolution/core-types@0.1.8
  - @lucid-evolution/core-utils@0.1.7
  - @lucid-evolution/sign_data@0.1.8
  - @lucid-evolution/utils@0.1.20
  - @lucid-evolution/bip39@0.2.8

## 0.1.21

### Patch Changes

- Updated dependencies [[`5760851`](https://github.com/Anastasia-Labs/lucid-evolution/commit/57608517cd86e8e72b577fc34f5ae0d3d37f9a74)]:
  - @lucid-evolution/utils@0.1.19

## 0.1.20

### Patch Changes

- [#141](https://github.com/Anastasia-Labs/lucid-evolution/pull/141) [`eef3d42`](https://github.com/Anastasia-Labs/lucid-evolution/commit/eef3d421b4cdf12638169ece49e4c00fce6e3356) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - Transaction chaining is a feature that allows to chain multiple transactions in one block , the endpoint chain() allows to accomplish this by returning a tuple with three elements:

  1. **newWalletInputs**: This includes all UTXOs that were not spent in the transaction and the new wallet UTXOs derived from the output transaction.
  2. **derivedOutputs**: The derived outputs extracted from the completed transaction.
  3. **tx**: The new transaction that is ready to be submitted.

  ```
    const [newWalletInputs, derivedOutputs, tx] = await user
      .newTx()
      .pay.ToAddressWithData(
        contractAddress,
        {
          kind: "inline",
          value: datum,
        },
        { lovelace: 10_000_000n }
      )
      .chain();

      const signed = await tx.sign.withWallet().complete();
      const txHash = await signed.submit();
  ```

  To construct a new transaction using tx chaining, the UTXOs belonging to the wallet must be overridden. This is necessary because these UTXOs are not yet recorded on the blockchain.

  ```
  user.overrideUTxOs(newWalletInputs);
  ```

  This function updates the wallet's UTXOs to set the new ones, ensuring the next transaction chaining can be constructed correctly.

- Updated dependencies [[`eef3d42`](https://github.com/Anastasia-Labs/lucid-evolution/commit/eef3d421b4cdf12638169ece49e4c00fce6e3356)]:
  - @lucid-evolution/core-types@0.1.7
  - @lucid-evolution/sign_data@0.1.7
  - @lucid-evolution/utils@0.1.18

## 0.1.19

### Patch Changes

- [#136](https://github.com/Anastasia-Labs/lucid-evolution/pull/136) [`c35f159`](https://github.com/Anastasia-Labs/lucid-evolution/commit/c35f159e0446b53fb6f91494b4c0da6587dcf32b) Thanks [@nikhils9](https://github.com/nikhils9)! - Coin selection fixes and few updates

- Updated dependencies [[`c35f159`](https://github.com/Anastasia-Labs/lucid-evolution/commit/c35f159e0446b53fb6f91494b4c0da6587dcf32b)]:
  - @lucid-evolution/utils@0.1.17

## 0.1.18

### Patch Changes

- Updated dependencies [[`aeb4bba`](https://github.com/Anastasia-Labs/lucid-evolution/commit/aeb4bba266fdeab1e47d3911413f30e749bfe564)]:
  - @lucid-evolution/utils@0.1.16

## 0.1.17

### Patch Changes

- [#131](https://github.com/Anastasia-Labs/lucid-evolution/pull/131) [`ac31f57`](https://github.com/Anastasia-Labs/lucid-evolution/commit/ac31f579721b1b26b01ad863e03f90032fc2cb6a) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - add selectWallet.fromAddress

## 0.1.16

### Patch Changes

- [#128](https://github.com/Anastasia-Labs/lucid-evolution/pull/128) [`1e73c40`](https://github.com/Anastasia-Labs/lucid-evolution/commit/1e73c4098eb0b38f597c9b772f1470333e9dc011) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - add Koios provider

## 0.1.15

### Patch Changes

- Updated dependencies [[`11eb043`](https://github.com/Anastasia-Labs/lucid-evolution/commit/11eb043bb7ecf2b0913c6edc1642c7b50808cab5)]:
  - @lucid-evolution/utils@0.1.15

## 0.1.14

### Patch Changes

- Updated dependencies [[`25b0416`](https://github.com/Anastasia-Labs/lucid-evolution/commit/25b0416e597edb44bf160c1d3086041b7b4117ff)]:
  - @lucid-evolution/utils@0.1.14

## 0.1.13

### Patch Changes

- Updated dependencies [[`a84ac5f`](https://github.com/Anastasia-Labs/lucid-evolution/commit/a84ac5f8dcaf699fa5e19ec55b9716a881d649bd)]:
  - @lucid-evolution/utils@0.1.13

## 0.1.12

### Patch Changes

- Updated dependencies [[`d0446f2`](https://github.com/Anastasia-Labs/lucid-evolution/commit/d0446f2e2ce9d91e6e514cba97c9ba101c83b66b)]:
  - @lucid-evolution/utils@0.1.12

## 0.1.11

### Patch Changes

- Updated dependencies [[`a5cfe27`](https://github.com/Anastasia-Labs/lucid-evolution/commit/a5cfe27dce663f84d07cd0e18ff7f011612e0d59)]:
  - @lucid-evolution/utils@0.1.11

## 0.1.10

### Patch Changes

- Updated dependencies [[`d3268d5`](https://github.com/Anastasia-Labs/lucid-evolution/commit/d3268d5886cae2c5619ed409ec53458b1fbd426f)]:
  - @lucid-evolution/utils@0.1.10

## 0.1.9

### Patch Changes

- [#91](https://github.com/Anastasia-Labs/lucid-evolution/pull/91) [`05a492f`](https://github.com/Anastasia-Labs/lucid-evolution/commit/05a492ff90199758088bcc6536cc62f5f85040a8) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - add browser support

- Updated dependencies [[`05a492f`](https://github.com/Anastasia-Labs/lucid-evolution/commit/05a492ff90199758088bcc6536cc62f5f85040a8)]:
  - @lucid-evolution/core-types@0.1.6
  - @lucid-evolution/core-utils@0.1.6
  - @lucid-evolution/sign_data@0.1.6
  - @lucid-evolution/bip39@0.2.7
  - @lucid-evolution/utils@0.1.9

## 0.1.8

### Patch Changes

- [#86](https://github.com/Anastasia-Labs/lucid-evolution/pull/86) [`6eacab5`](https://github.com/Anastasia-Labs/lucid-evolution/commit/6eacab5c108485877879a2deffd2f8a1369ac172) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - - fix: use TransactionOutputBuilder.() instead of TransactionOutput.new()

  - test: enable all preprod tests
  - test: update test
  - refactor: code structure
  - test: add hello contract test using retry implementation

- [#86](https://github.com/Anastasia-Labs/lucid-evolution/pull/86) [`9799ffd`](https://github.com/Anastasia-Labs/lucid-evolution/commit/9799ffd90bbbf393bcf91c95733a1486367650e2) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - refactor code

- Updated dependencies [[`6eacab5`](https://github.com/Anastasia-Labs/lucid-evolution/commit/6eacab5c108485877879a2deffd2f8a1369ac172), [`a8abb5d`](https://github.com/Anastasia-Labs/lucid-evolution/commit/a8abb5df4b6d233e314a36f0948c95ab15f784bb)]:
  - @lucid-evolution/utils@0.1.8

## 0.1.7

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
  - @lucid-evolution/bip39@0.2.6
  - @lucid-evolution/utils@0.1.7

## 0.1.6

### Patch Changes

- [#76](https://github.com/Anastasia-Labs/lucid-evolution/pull/76) [`ed27a6f`](https://github.com/Anastasia-Labs/lucid-evolution/commit/ed27a6fe707767dfc9332e242a8af939fc286db2) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - bump versions

- Updated dependencies [[`ed27a6f`](https://github.com/Anastasia-Labs/lucid-evolution/commit/ed27a6fe707767dfc9332e242a8af939fc286db2)]:
  - @lucid-evolution/utils@0.1.6

## 0.1.5

### Patch Changes

- [#72](https://github.com/Anastasia-Labs/lucid-evolution/pull/72) [`459df3e`](https://github.com/Anastasia-Labs/lucid-evolution/commit/459df3e95fd55ccdf48fc9cd63e850c053d2f470) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - bump all packages

- Updated dependencies [[`459df3e`](https://github.com/Anastasia-Labs/lucid-evolution/commit/459df3e95fd55ccdf48fc9cd63e850c053d2f470)]:
  - @lucid-evolution/bip39@0.2.5
  - @lucid-evolution/core-types@0.1.4
  - @lucid-evolution/core-utils@0.1.4
  - @lucid-evolution/sign_data@0.1.4
  - @lucid-evolution/utils@0.1.5

## 0.1.4

### Patch Changes

- [#63](https://github.com/Anastasia-Labs/lucid-evolution/pull/63) [`70a5b80`](https://github.com/Anastasia-Labs/lucid-evolution/commit/70a5b809903f1e0dbef96ff6e5d32d8507ed442d) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - move wallet creation to wallet package

- [#71](https://github.com/Anastasia-Labs/lucid-evolution/pull/71) [`aa1aab8`](https://github.com/Anastasia-Labs/lucid-evolution/commit/aa1aab867b4c6335f1307264d448dcdcddaa7906) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - add withdraw module

- [#67](https://github.com/Anastasia-Labs/lucid-evolution/pull/67) [`8522fa7`](https://github.com/Anastasia-Labs/lucid-evolution/commit/8522fa7a09cdec0cdd240fd76230b3dd0ce1b2a6) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - fix missing certificate builder for Plutus V1 and V2

- Updated dependencies [[`bcda3fc`](https://github.com/Anastasia-Labs/lucid-evolution/commit/bcda3fc3ca9dc13e93ef95929af2fe6fd0937e60), [`70a5b80`](https://github.com/Anastasia-Labs/lucid-evolution/commit/70a5b809903f1e0dbef96ff6e5d32d8507ed442d), [`8522fa7`](https://github.com/Anastasia-Labs/lucid-evolution/commit/8522fa7a09cdec0cdd240fd76230b3dd0ce1b2a6)]:
  - @lucid-evolution/utils@0.1.4
  - @lucid-evolution/bip39@0.2.4

## 0.1.3

### Patch Changes

- [#49](https://github.com/Anastasia-Labs/lucid-evolution/pull/49) [`484a3c6`](https://github.com/Anastasia-Labs/lucid-evolution/commit/484a3c6bf273cedc0aa914eccebb4d78d633bdf4) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - - bump CMl version 5.2
  - remove toCMLTransactionHash , use CML.hash_transaction which is the fixed function from CML 5.2
- Updated dependencies [[`484a3c6`](https://github.com/Anastasia-Labs/lucid-evolution/commit/484a3c6bf273cedc0aa914eccebb4d78d633bdf4)]:
  - @lucid-evolution/core-types@0.1.3
  - @lucid-evolution/core-utils@0.1.3
  - @lucid-evolution/sign_data@0.1.3
  - @lucid-evolution/bip39@0.2.3
  - @lucid-evolution/utils@0.1.3

## 0.1.2

### Patch Changes

- [#47](https://github.com/Anastasia-Labs/lucid-evolution/pull/47) [`67b178b`](https://github.com/Anastasia-Labs/lucid-evolution/commit/67b178be520f53fe6901cac2c8573170408f861a) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - move key packages to dependencies

- Updated dependencies [[`67b178b`](https://github.com/Anastasia-Labs/lucid-evolution/commit/67b178be520f53fe6901cac2c8573170408f861a)]:
  - @lucid-evolution/core-types@0.1.2
  - @lucid-evolution/core-utils@0.1.2
  - @lucid-evolution/bip39@0.2.2
  - @lucid-evolution/utils@0.1.2

## 0.1.1

### Patch Changes

- [#45](https://github.com/Anastasia-Labs/lucid-evolution/pull/45) [`0f2e140`](https://github.com/Anastasia-Labs/lucid-evolution/commit/0f2e1404e4a476b5003f2937c01943ffd536fbd4) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - add dual export

## 0.1.0

### Minor Changes

- [#36](https://github.com/Anastasia-Labs/lucid-evolution/pull/36) [`fea08c4`](https://github.com/Anastasia-Labs/lucid-evolution/commit/fea08c44cdc52e58ed7a20ab4dc2566e708e8a21) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - fix building

## 0.1.0-alpha.0

### Minor Changes

- add wallet_selection utils
