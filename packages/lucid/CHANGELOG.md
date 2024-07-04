# @lucid-evolution/lucid

## 0.2.46

### Patch Changes

- [#164](https://github.com/Anastasia-Labs/lucid-evolution/pull/164) [`7a8956f`](https://github.com/Anastasia-Labs/lucid-evolution/commit/7a8956f95a4ae08e520a8a5f0b0ea4a3eabe869a) Thanks [@itsmestale](https://github.com/itsmestale)! - -

  - remove nativeFromJson and nativeJSFromJSon, use scriptFromNative instead
  - add scriptFromCMLNative for CML Native type
  - add parseCMLNative
  - remove native.ts from lucid package
  - reallocate native.test.ts file to utils package

- [#165](https://github.com/Anastasia-Labs/lucid-evolution/pull/165) [`193dd6e`](https://github.com/Anastasia-Labs/lucid-evolution/commit/193dd6ec5f9f8b75bec3fa1318779b6822f34112) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - apply applyDoubleCborEncoding to attached scripts

- Updated dependencies [[`7a8956f`](https://github.com/Anastasia-Labs/lucid-evolution/commit/7a8956f95a4ae08e520a8a5f0b0ea4a3eabe869a)]:
  - @lucid-evolution/core-types@0.1.9
  - @lucid-evolution/utils@0.1.22
  - @lucid-evolution/plutus@0.1.12
  - @lucid-evolution/provider@0.1.29
  - @lucid-evolution/sign_data@0.1.9
  - @lucid-evolution/wallet@0.1.24

## 0.2.45

### Patch Changes

- Updated dependencies [[`e63c233`](https://github.com/Anastasia-Labs/lucid-evolution/commit/e63c2334a86a50c3ff9e95a142a9299ed76059a3)]:
  - @lucid-evolution/utils@0.1.21
  - @lucid-evolution/provider@0.1.28
  - @lucid-evolution/wallet@0.1.23

## 0.2.44

### Patch Changes

- [#156](https://github.com/Anastasia-Labs/lucid-evolution/pull/156) [`8b65e91`](https://github.com/Anastasia-Labs/lucid-evolution/commit/8b65e91d8b2f18d0b2e3a9914b424fbc22b96cbc) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - increase fee estimation

## 0.2.43

### Patch Changes

- [#153](https://github.com/Anastasia-Labs/lucid-evolution/pull/153) [`050bfdc`](https://github.com/Anastasia-Labs/lucid-evolution/commit/050bfdc3a85a04c1cc338faa419aa4ac39b1cf49) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - Ensure change address receives minimum required ADA

- [#144](https://github.com/Anastasia-Labs/lucid-evolution/pull/144) [`ed554c4`](https://github.com/Anastasia-Labs/lucid-evolution/commit/ed554c45ed4664568af31a6c1cecb2eb5464cab5) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - add metadata endpoint

- Updated dependencies [[`ed554c4`](https://github.com/Anastasia-Labs/lucid-evolution/commit/ed554c45ed4664568af31a6c1cecb2eb5464cab5)]:
  - @lucid-evolution/core-types@0.1.8
  - @lucid-evolution/core-utils@0.1.7
  - @lucid-evolution/sign_data@0.1.8
  - @lucid-evolution/provider@0.1.27
  - @lucid-evolution/plutus@0.1.11
  - @lucid-evolution/wallet@0.1.22
  - @lucid-evolution/utils@0.1.20
  - @lucid-evolution/bip39@0.2.8
  - @lucid-evolution/uplc@0.2.7

## 0.2.42

### Patch Changes

- [#151](https://github.com/Anastasia-Labs/lucid-evolution/pull/151) [`5760851`](https://github.com/Anastasia-Labs/lucid-evolution/commit/57608517cd86e8e72b577fc34f5ae0d3d37f9a74) Thanks [@nikhils9](https://github.com/nikhils9)! - Fixes to support UTF-8 incompatible asset names

- Updated dependencies [[`5760851`](https://github.com/Anastasia-Labs/lucid-evolution/commit/57608517cd86e8e72b577fc34f5ae0d3d37f9a74)]:
  - @lucid-evolution/utils@0.1.19
  - @lucid-evolution/provider@0.1.26
  - @lucid-evolution/wallet@0.1.21

## 0.2.41

### Patch Changes

- [#145](https://github.com/Anastasia-Labs/lucid-evolution/pull/145) [`df9a386`](https://github.com/Anastasia-Labs/lucid-evolution/commit/df9a3868b7091dc0f3636f0f1561b61e1ec1468b) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - fix recording of config.totalOutputAssets , pay module was not recording lovelace asset

## 0.2.40

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
  - @lucid-evolution/provider@0.1.25
  - @lucid-evolution/wallet@0.1.20
  - @lucid-evolution/uplc@0.2.6
  - @lucid-evolution/plutus@0.1.10
  - @lucid-evolution/sign_data@0.1.7
  - @lucid-evolution/utils@0.1.18

## 0.2.39

### Patch Changes

- [#136](https://github.com/Anastasia-Labs/lucid-evolution/pull/136) [`c35f159`](https://github.com/Anastasia-Labs/lucid-evolution/commit/c35f159e0446b53fb6f91494b4c0da6587dcf32b) Thanks [@nikhils9](https://github.com/nikhils9)! - Coin selection fixes and few updates

- Updated dependencies [[`c35f159`](https://github.com/Anastasia-Labs/lucid-evolution/commit/c35f159e0446b53fb6f91494b4c0da6587dcf32b)]:
  - @lucid-evolution/provider@0.1.24
  - @lucid-evolution/wallet@0.1.19
  - @lucid-evolution/utils@0.1.17

## 0.2.38

### Patch Changes

- [#137](https://github.com/Anastasia-Labs/lucid-evolution/pull/137) [`aeb4bba`](https://github.com/Anastasia-Labs/lucid-evolution/commit/aeb4bba266fdeab1e47d3911413f30e749bfe564) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - add collateral coin selection

- Updated dependencies [[`aeb4bba`](https://github.com/Anastasia-Labs/lucid-evolution/commit/aeb4bba266fdeab1e47d3911413f30e749bfe564)]:
  - @lucid-evolution/utils@0.1.16
  - @lucid-evolution/provider@0.1.23
  - @lucid-evolution/wallet@0.1.18

## 0.2.37

### Patch Changes

- [#134](https://github.com/Anastasia-Labs/lucid-evolution/pull/134) [`e1d5aca`](https://github.com/Anastasia-Labs/lucid-evolution/commit/e1d5aca2c92d6da0bc5bb11776eec7677a56d03a) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - fix koios schema, improve code structure

- Updated dependencies [[`e1d5aca`](https://github.com/Anastasia-Labs/lucid-evolution/commit/e1d5aca2c92d6da0bc5bb11776eec7677a56d03a)]:
  - @lucid-evolution/provider@0.1.22

## 0.2.36

### Patch Changes

- [#131](https://github.com/Anastasia-Labs/lucid-evolution/pull/131) [`ac31f57`](https://github.com/Anastasia-Labs/lucid-evolution/commit/ac31f579721b1b26b01ad863e03f90032fc2cb6a) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - add selectWallet.fromAddress

- Updated dependencies [[`47ca9e2`](https://github.com/Anastasia-Labs/lucid-evolution/commit/47ca9e2227d33b572a011917a3178c8b520a8f98), [`ac31f57`](https://github.com/Anastasia-Labs/lucid-evolution/commit/ac31f579721b1b26b01ad863e03f90032fc2cb6a)]:
  - @lucid-evolution/provider@0.1.21
  - @lucid-evolution/wallet@0.1.17

## 0.2.35

### Patch Changes

- [#128](https://github.com/Anastasia-Labs/lucid-evolution/pull/128) [`1e73c40`](https://github.com/Anastasia-Labs/lucid-evolution/commit/1e73c4098eb0b38f597c9b772f1470333e9dc011) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - add Koios provider

- Updated dependencies [[`1e73c40`](https://github.com/Anastasia-Labs/lucid-evolution/commit/1e73c4098eb0b38f597c9b772f1470333e9dc011)]:
  - @lucid-evolution/provider@0.1.20
  - @lucid-evolution/wallet@0.1.16

## 0.2.34

### Patch Changes

- [#126](https://github.com/Anastasia-Labs/lucid-evolution/pull/126) [`11eb043`](https://github.com/Anastasia-Labs/lucid-evolution/commit/11eb043bb7ecf2b0913c6edc1642c7b50808cab5) Thanks [@nikhils9](https://github.com/nikhils9)! - Fix assetsToValue to support non UTF-8 Asset Names

- Updated dependencies [[`11eb043`](https://github.com/Anastasia-Labs/lucid-evolution/commit/11eb043bb7ecf2b0913c6edc1642c7b50808cab5)]:
  - @lucid-evolution/utils@0.1.15
  - @lucid-evolution/provider@0.1.19
  - @lucid-evolution/wallet@0.1.15

## 0.2.33

### Patch Changes

- Updated dependencies [[`25b0416`](https://github.com/Anastasia-Labs/lucid-evolution/commit/25b0416e597edb44bf160c1d3086041b7b4117ff)]:
  - @lucid-evolution/utils@0.1.14
  - @lucid-evolution/provider@0.1.18
  - @lucid-evolution/wallet@0.1.14

## 0.2.32

### Patch Changes

- [#121](https://github.com/Anastasia-Labs/lucid-evolution/pull/121) [`0973c38`](https://github.com/Anastasia-Labs/lucid-evolution/commit/0973c381b00b83679110848cebef7f47a45c5c5b) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - improve code structure

- [#121](https://github.com/Anastasia-Labs/lucid-evolution/pull/121) [`0069b6b`](https://github.com/Anastasia-Labs/lucid-evolution/commit/0069b6be467f86c480b39e30ccd14722a66055e6) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - refactor tx signer

- [#121](https://github.com/Anastasia-Labs/lucid-evolution/pull/121) [`57b281f`](https://github.com/Anastasia-Labs/lucid-evolution/commit/57b281f4cf0fd17b3f2ce5326bad2168659d8f5c) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - implement CompleteOptions

- [#121](https://github.com/Anastasia-Labs/lucid-evolution/pull/121) [`a84ac5f`](https://github.com/Anastasia-Labs/lucid-evolution/commit/a84ac5f8dcaf699fa5e19ec55b9716a881d649bd) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - selecting utxos can be done to ordered/unordered list

- Updated dependencies [[`a84ac5f`](https://github.com/Anastasia-Labs/lucid-evolution/commit/a84ac5f8dcaf699fa5e19ec55b9716a881d649bd)]:
  - @lucid-evolution/utils@0.1.13
  - @lucid-evolution/provider@0.1.17
  - @lucid-evolution/wallet@0.1.13

## 0.2.31

### Patch Changes

- [#119](https://github.com/Anastasia-Labs/lucid-evolution/pull/119) [`d0446f2`](https://github.com/Anastasia-Labs/lucid-evolution/commit/d0446f2e2ce9d91e6e514cba97c9ba101c83b66b) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - add coin selection algorithm, input selection is done in descending order

- Updated dependencies [[`d0446f2`](https://github.com/Anastasia-Labs/lucid-evolution/commit/d0446f2e2ce9d91e6e514cba97c9ba101c83b66b)]:
  - @lucid-evolution/utils@0.1.12
  - @lucid-evolution/provider@0.1.16
  - @lucid-evolution/wallet@0.1.12

## 0.2.30

### Patch Changes

- [#117](https://github.com/Anastasia-Labs/lucid-evolution/pull/117) [`a5cfe27`](https://github.com/Anastasia-Labs/lucid-evolution/commit/a5cfe27dce663f84d07cd0e18ff7f011612e0d59) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - add applyParamsToScript; add contract specs using aiken

- Updated dependencies [[`a5cfe27`](https://github.com/Anastasia-Labs/lucid-evolution/commit/a5cfe27dce663f84d07cd0e18ff7f011612e0d59)]:
  - @lucid-evolution/utils@0.1.11
  - @lucid-evolution/provider@0.1.15
  - @lucid-evolution/wallet@0.1.11

## 0.2.29

### Patch Changes

- [#114](https://github.com/Anastasia-Labs/lucid-evolution/pull/114) [`5c6afe7`](https://github.com/Anastasia-Labs/lucid-evolution/commit/5c6afe70f514727a58cc45799500e0c4666c2f62) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - fix readFrom

- [#116](https://github.com/Anastasia-Labs/lucid-evolution/pull/116) [`ffedcfe`](https://github.com/Anastasia-Labs/lucid-evolution/commit/ffedcfe03e5b88271ed056f8ecdf75e64f8ed1f6) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - enable completeSafe()

## 0.2.28

### Patch Changes

- [#112](https://github.com/Anastasia-Labs/lucid-evolution/pull/112) [`f5e1aa4`](https://github.com/Anastasia-Labs/lucid-evolution/commit/f5e1aa43b00e6969b5a4ea23a07c4743c17e074e) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - bring back `complete` endpoint

## 0.2.27

### Patch Changes

- [#110](https://github.com/Anastasia-Labs/lucid-evolution/pull/110) [`d3268d5`](https://github.com/Anastasia-Labs/lucid-evolution/commit/d3268d5886cae2c5619ed409ec53458b1fbd426f) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - improve pay module when dealing with Assets

- Updated dependencies [[`d3268d5`](https://github.com/Anastasia-Labs/lucid-evolution/commit/d3268d5886cae2c5619ed409ec53458b1fbd426f)]:
  - @lucid-evolution/utils@0.1.10
  - @lucid-evolution/provider@0.1.14
  - @lucid-evolution/wallet@0.1.10

## 0.2.26

### Patch Changes

- Updated dependencies [[`042a0c0`](https://github.com/Anastasia-Labs/lucid-evolution/commit/042a0c0fa1cbea24b3410b2bd319d6e54cfb449f)]:
  - @lucid-evolution/provider@0.1.13

## 0.2.25

### Patch Changes

- [#107](https://github.com/Anastasia-Labs/lucid-evolution/pull/107) [`e883791`](https://github.com/Anastasia-Labs/lucid-evolution/commit/e883791d6262cce816f6831a725391f2c922c934) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - The readFrom module now works with reference scripts. This module now attaches the script from the UTXO.

## 0.2.24

### Patch Changes

- Updated dependencies [[`3a8121c`](https://github.com/Anastasia-Labs/lucid-evolution/commit/3a8121cdd768970a68447019701520c2b2ab2b1e)]:
  - @lucid-evolution/uplc@0.2.5

## 0.2.23

### Patch Changes

- Updated dependencies [[`4aa0a2f`](https://github.com/Anastasia-Labs/lucid-evolution/commit/4aa0a2f87c35998348c5313ebb562ff262365653)]:
  - @lucid-evolution/uplc@0.2.4

## 0.2.22

### Patch Changes

- Updated dependencies [[`1f4f989`](https://github.com/Anastasia-Labs/lucid-evolution/commit/1f4f9896b0d27520ea8892b2e9925bd7b0311425)]:
  - @lucid-evolution/provider@0.1.12

## 0.2.21

### Patch Changes

- Updated dependencies [[`9066018`](https://github.com/Anastasia-Labs/lucid-evolution/commit/90660185c2ce1ddd30b63c2e126e8e689b419deb)]:
  - @lucid-evolution/uplc@0.2.4

## 0.2.20

### Patch Changes

- Updated dependencies [[`53e5c64`](https://github.com/Anastasia-Labs/lucid-evolution/commit/53e5c64ce67a8345d949bdad93065b5750615c36)]:
  - @lucid-evolution/uplc@0.2.3

## 0.2.19

### Patch Changes

- [#91](https://github.com/Anastasia-Labs/lucid-evolution/pull/91) [`05a492f`](https://github.com/Anastasia-Labs/lucid-evolution/commit/05a492ff90199758088bcc6536cc62f5f85040a8) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - add browser support

- Updated dependencies [[`05a492f`](https://github.com/Anastasia-Labs/lucid-evolution/commit/05a492ff90199758088bcc6536cc62f5f85040a8)]:
  - @lucid-evolution/core-types@0.1.6
  - @lucid-evolution/core-utils@0.1.6
  - @lucid-evolution/sign_data@0.1.6
  - @lucid-evolution/provider@0.1.11
  - @lucid-evolution/plutus@0.1.9
  - @lucid-evolution/wallet@0.1.9
  - @lucid-evolution/bip39@0.2.7
  - @lucid-evolution/utils@0.1.9

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

  - @anastasia-labs/cardano-multiplatform-lib-nodejs
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
