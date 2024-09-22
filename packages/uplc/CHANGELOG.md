# @lucid-evolution/uplc

## 0.2.16

### Patch Changes

- [#340](https://github.com/Anastasia-Labs/lucid-evolution/pull/340) [`33135ed`](https://github.com/Anastasia-Labs/lucid-evolution/commit/33135ed8532a3140025751cbc7e1b7efae74545d) Thanks [@hadelive](https://github.com/hadelive)! - optimize uplc wasm size

## 0.2.15

### Patch Changes

- [#337](https://github.com/Anastasia-Labs/lucid-evolution/pull/337) [`ad4e56f`](https://github.com/Anastasia-Labs/lucid-evolution/commit/ad4e56f9556e99b6b534dd476ca5fc38f6fcd3d6) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - update aiken uplc to 1.1.3; add redeemer utils; update redeemer types

## 0.2.14

### Patch Changes

- [#335](https://github.com/Anastasia-Labs/lucid-evolution/pull/335) [`2e25677`](https://github.com/Anastasia-Labs/lucid-evolution/commit/2e256779181e0f79ccbf0f1eaaae432795d4315d) Thanks [@hadelive](https://github.com/hadelive)! - bump uplc 1.1.3

## 0.2.13

### Patch Changes

- [#327](https://github.com/Anastasia-Labs/lucid-evolution/pull/327) [`95e9d98`](https://github.com/Anastasia-Labs/lucid-evolution/commit/95e9d983692e15ac114c2b4cf3496f6854d23bed) Thanks [@hadelive](https://github.com/hadelive)! - bump uplc 1.1.2

## 0.2.12

### Patch Changes

- [#302](https://github.com/Anastasia-Labs/lucid-evolution/pull/302) [`156c054`](https://github.com/Anastasia-Labs/lucid-evolution/commit/156c0546b15c8ea8d8a8c7c3eb1ba5d78ed60fc1) Thanks [@hadelive](https://github.com/hadelive)! - enable plutusV3

## 0.2.11

### Patch Changes

- [#216](https://github.com/Anastasia-Labs/lucid-evolution/pull/216) [`c96eda2`](https://github.com/Anastasia-Labs/lucid-evolution/commit/c96eda240092a640f0884a8e3071fc5a31b89fcf) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - remove sideEffects from package.json

## 0.2.10

### Patch Changes

- [#211](https://github.com/Anastasia-Labs/lucid-evolution/pull/211) [`dc8dc0c`](https://github.com/Anastasia-Labs/lucid-evolution/commit/dc8dc0c76cf2f9666f7e4c6a2452911f4ea6b007) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - make uplc browser bundler compatible

## 0.2.9

### Patch Changes

- [#183](https://github.com/Anastasia-Labs/lucid-evolution/pull/183) [`8ab1875`](https://github.com/Anastasia-Labs/lucid-evolution/commit/8ab187531e496bd764651328088e99fc09304ca3) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - cleanup tsconfig.json files, use base.json from typescript-config package as extends property

## 0.2.8

### Patch Changes

- [#168](https://github.com/Anastasia-Labs/lucid-evolution/pull/168) [`26dc344`](https://github.com/Anastasia-Labs/lucid-evolution/commit/26dc34466e74a8af6b6952dcd705d6f67f9660d0) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - Changes

  - Add kupos and ogmios schemas
  - Support jsonrpc v2
  - Effectful http request
  - Remove websocket from ogmios, use http post instead.
  - Support for ogmios v6
  - Support for kupo 2.8.0

## 0.2.7

### Patch Changes

- [#144](https://github.com/Anastasia-Labs/lucid-evolution/pull/144) [`ed554c4`](https://github.com/Anastasia-Labs/lucid-evolution/commit/ed554c45ed4664568af31a6c1cecb2eb5464cab5) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - add metadata endpoint

## 0.2.6

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

## 0.2.5

### Patch Changes

- [#102](https://github.com/Anastasia-Labs/lucid-evolution/pull/102) [`3a8121c`](https://github.com/Anastasia-Labs/lucid-evolution/commit/3a8121cdd768970a68447019701520c2b2ab2b1e) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - bump version

## 0.2.4

### Patch Changes

- [#100](https://github.com/Anastasia-Labs/lucid-evolution/pull/100) [`4aa0a2f`](https://github.com/Anastasia-Labs/lucid-evolution/commit/4aa0a2f87c35998348c5313ebb562ff262365653) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - load wasm-build package into dist

## 0.2.4

### Patch Changes

- [#97](https://github.com/Anastasia-Labs/lucid-evolution/pull/97) [`9066018`](https://github.com/Anastasia-Labs/lucid-evolution/commit/90660185c2ce1ddd30b63c2e126e8e689b419deb) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - use polyfillNode

## 0.2.3

### Patch Changes

- [#95](https://github.com/Anastasia-Labs/lucid-evolution/pull/95) [`53e5c64`](https://github.com/Anastasia-Labs/lucid-evolution/commit/53e5c64ce67a8345d949bdad93065b5750615c36) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - add browser support

## 0.2.2

### Patch Changes

- [#89](https://github.com/Anastasia-Labs/lucid-evolution/pull/89) [`4c8c0d4`](https://github.com/Anastasia-Labs/lucid-evolution/commit/4c8c0d406d66770b1c6104f590b92cf0849b5ad5) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - uplc package supports node/browser

## 0.2.1

### Patch Changes

- [#72](https://github.com/Anastasia-Labs/lucid-evolution/pull/72) [`459df3e`](https://github.com/Anastasia-Labs/lucid-evolution/commit/459df3e95fd55ccdf48fc9cd63e850c053d2f470) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - bump all packages

## 0.2.0

### Minor Changes

- [#36](https://github.com/Anastasia-Labs/lucid-evolution/pull/36) [`fea08c4`](https://github.com/Anastasia-Labs/lucid-evolution/commit/fea08c44cdc52e58ed7a20ab4dc2566e708e8a21) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - fix building
