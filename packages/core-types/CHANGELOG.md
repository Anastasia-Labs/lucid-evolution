# @lucid-evolution/core-types

## 0.1.19

### Patch Changes

- [#315](https://github.com/Anastasia-Labs/lucid-evolution/pull/315) [`93e4784`](https://github.com/Anastasia-Labs/lucid-evolution/commit/93e4784b3397a13b197b04c4de897c455ae62088) Thanks [@hadelive](https://github.com/hadelive)! - bump core-types

## 0.1.18

### Patch Changes

- [#308](https://github.com/Anastasia-Labs/lucid-evolution/pull/308) [`2afc548`](https://github.com/Anastasia-Labs/lucid-evolution/commit/2afc5485d65c7811a66339daa4c90493026cf51e) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - add governance modules

## 0.1.17

### Patch Changes

- [#298](https://github.com/Anastasia-Labs/lucid-evolution/pull/298) [`22a9c9c`](https://github.com/Anastasia-Labs/lucid-evolution/commit/22a9c9ceda21cad992727e3f46ae5dea89a0fe7e) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - update datum serialization to cardano_node_format() (indefinite length notation)

## 0.1.16

### Patch Changes

- [#285](https://github.com/Anastasia-Labs/lucid-evolution/pull/285) [`59a15c8`](https://github.com/Anastasia-Labs/lucid-evolution/commit/59a15c83e16c1bf22a44e1e05ff7480ef39cb631) Thanks [@hadelive](https://github.com/hadelive)! - bump cml to 6.0.1-2

## 0.1.15

### Patch Changes

- [#268](https://github.com/Anastasia-Labs/lucid-evolution/pull/268) [`f8f905a`](https://github.com/Anastasia-Labs/lucid-evolution/commit/f8f905aeda20b30a03ba69e4b062a80a7a5be7de) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - update providers structure and improve side effects

## 0.1.14

### Patch Changes

- [#258](https://github.com/Anastasia-Labs/lucid-evolution/pull/258) [`8372b50`](https://github.com/Anastasia-Labs/lucid-evolution/commit/8372b50972bd99d5cfe122ebb0bfb98908484e0d) Thanks [@hadelive](https://github.com/hadelive)! - fix emulator submitTx function

## 0.1.13

### Patch Changes

- [#190](https://github.com/Anastasia-Labs/lucid-evolution/pull/190) [`aec1ccd`](https://github.com/Anastasia-Labs/lucid-evolution/commit/aec1ccd7659e17c07b677f1649977590b830c6bc) Thanks [@hadelive](https://github.com/hadelive)! - add evaludateTx function

## 0.1.12

### Patch Changes

- [#195](https://github.com/Anastasia-Labs/lucid-evolution/pull/195) [`e281b5b`](https://github.com/Anastasia-Labs/lucid-evolution/commit/e281b5bfe5da9a02e3cda35668c3a3eb18f20092) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - add refscript fee to preview

## 0.1.11

### Patch Changes

- [#183](https://github.com/Anastasia-Labs/lucid-evolution/pull/183) [`8ab1875`](https://github.com/Anastasia-Labs/lucid-evolution/commit/8ab187531e496bd764651328088e99fc09304ca3) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - cleanup tsconfig.json files, use base.json from typescript-config package as extends property

## 0.1.10

### Patch Changes

- [#169](https://github.com/Anastasia-Labs/lucid-evolution/pull/169) [`6282481`](https://github.com/Anastasia-Labs/lucid-evolution/commit/6282481a2183cfa1a3deec025552d7432cb35869) Thanks [@nikhils9](https://github.com/nikhils9)! - Auto populate input indices

## 0.1.9

### Patch Changes

- [#164](https://github.com/Anastasia-Labs/lucid-evolution/pull/164) [`7a8956f`](https://github.com/Anastasia-Labs/lucid-evolution/commit/7a8956f95a4ae08e520a8a5f0b0ea4a3eabe869a) Thanks [@itsmestale](https://github.com/itsmestale)! - -
  - remove nativeFromJson and nativeJSFromJSon, use scriptFromNative instead
  - add scriptFromCMLNative for CML Native type
  - add parseCMLNative
  - remove native.ts from lucid package
  - reallocate native.test.ts file to utils package

## 0.1.8

### Patch Changes

- [#144](https://github.com/Anastasia-Labs/lucid-evolution/pull/144) [`ed554c4`](https://github.com/Anastasia-Labs/lucid-evolution/commit/ed554c45ed4664568af31a6c1cecb2eb5464cab5) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - add metadata endpoint

## 0.1.7

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

## 0.1.6

### Patch Changes

- [#91](https://github.com/Anastasia-Labs/lucid-evolution/pull/91) [`05a492f`](https://github.com/Anastasia-Labs/lucid-evolution/commit/05a492ff90199758088bcc6536cc62f5f85040a8) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - add browser support

## 0.1.5

### Patch Changes

- [#84](https://github.com/Anastasia-Labs/lucid-evolution/pull/84) [`2fb5635`](https://github.com/Anastasia-Labs/lucid-evolution/commit/2fb56356fbdfc41c5dc7328456559c8aaf8dbf15) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - - refactor: fetch wallet utxos only once
  - refactor: change code structure
  - refactor: move CML to core file
  - refactor: set core file for CML lib
  - build(upgrade): bump packages version

## 0.1.4

### Patch Changes

- [#72](https://github.com/Anastasia-Labs/lucid-evolution/pull/72) [`459df3e`](https://github.com/Anastasia-Labs/lucid-evolution/commit/459df3e95fd55ccdf48fc9cd63e850c053d2f470) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - bump all packages

## 0.1.3

### Patch Changes

- [#49](https://github.com/Anastasia-Labs/lucid-evolution/pull/49) [`484a3c6`](https://github.com/Anastasia-Labs/lucid-evolution/commit/484a3c6bf273cedc0aa914eccebb4d78d633bdf4) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - - bump CMl version 5.2
  - remove toCMLTransactionHash , use CML.hash_transaction which is the fixed function from CML 5.2

## 0.1.2

### Patch Changes

- [#47](https://github.com/Anastasia-Labs/lucid-evolution/pull/47) [`67b178b`](https://github.com/Anastasia-Labs/lucid-evolution/commit/67b178be520f53fe6901cac2c8573170408f861a) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - move key packages to dependencies

## 0.1.1

### Patch Changes

- [#45](https://github.com/Anastasia-Labs/lucid-evolution/pull/45) [`0f2e140`](https://github.com/Anastasia-Labs/lucid-evolution/commit/0f2e1404e4a476b5003f2937c01943ffd536fbd4) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - add dual export

## 0.1.0

### Minor Changes

- [#36](https://github.com/Anastasia-Labs/lucid-evolution/pull/36) [`fea08c4`](https://github.com/Anastasia-Labs/lucid-evolution/commit/fea08c44cdc52e58ed7a20ab4dc2566e708e8a21) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - fix building
