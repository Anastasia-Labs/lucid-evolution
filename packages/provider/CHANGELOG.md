# @evolution-sdk/provider

## 2.0.0

### Major Changes

- [#667](https://github.com/no-witness-labs/evolution-sdk/pull/667) [`93b87f6`](https://github.com/no-witness-labs/evolution-sdk/commit/93b87f6105da464cb129b56a4029a9d8068311bc) Thanks [@hadelive](https://github.com/hadelive)! - Library ownership and entity transferred to No Witness Labs.

  This major release reflects the transition of the Evolution SDK library to No Witness Labs, including:

  - Updated maintainer and organization details
  - Revised package ownership and publishing rights
  - Continued development under new entity management
  - All packages updated to reflect the organizational change

### Patch Changes

- [#667](https://github.com/no-witness-labs/evolution-sdk/pull/667) [`93b87f6`](https://github.com/no-witness-labs/evolution-sdk/commit/93b87f6105da464cb129b56a4029a9d8068311bc) Thanks [@hadelive](https://github.com/hadelive)! - evolution-sdk

- Updated dependencies [[`93b87f6`](https://github.com/no-witness-labs/evolution-sdk/commit/93b87f6105da464cb129b56a4029a9d8068311bc), [`93b87f6`](https://github.com/no-witness-labs/evolution-sdk/commit/93b87f6105da464cb129b56a4029a9d8068311bc)]:
  - @evolution-sdk/core-types@2.0.0
  - @evolution-sdk/core-utils@2.0.0
  - @evolution-sdk/utils@2.0.0
  - @evolution-sdk/wallet@2.0.0

## 1.0.0

### Major Changes

- [#663](https://github.com/no-witness-labs/evolution-sdk/pull/663) [`12aaf90`](https://github.com/no-witness-labs/evolution-sdk/commit/12aaf904d753d9765872c18ad141feee29418a9d) Thanks [@hadelive](https://github.com/hadelive)! - Library ownership and entity transferred to No Witness Labs.

  This major release reflects the transition of the Evolution SDK library to No Witness Labs, including:

  - Updated maintainer and organization details
  - Revised package ownership and publishing rights
  - Continued development under new entity management
  - All packages updated to reflect the organizational change

- [#664](https://github.com/no-witness-labs/evolution-sdk/pull/664) [`6231d0a`](https://github.com/no-witness-labs/evolution-sdk/commit/6231d0a0cd066e85d97da2ba44cca2c86b6e3b8a) Thanks [@hadelive](https://github.com/hadelive)! - Evolution-sdk

### Patch Changes

- Updated dependencies [[`12aaf90`](https://github.com/no-witness-labs/evolution-sdk/commit/12aaf904d753d9765872c18ad141feee29418a9d), [`6231d0a`](https://github.com/no-witness-labs/evolution-sdk/commit/6231d0a0cd066e85d97da2ba44cca2c86b6e3b8a)]:
  - @evolution-sdk/core-types@1.0.0
  - @evolution-sdk/core-utils@1.0.0
  - @evolution-sdk/utils@1.0.0
  - @evolution-sdk/wallet@1.0.0

## 0.1.90

### Patch Changes

- [#631](https://github.com/Anastasia-Labs/evolution-sdk/pull/631) [`35e9a99`](https://github.com/Anastasia-Labs/evolution-sdk/commit/35e9a99550cda2a47b482c325aaa397dcb0e9b0f) Thanks [@hadelive](https://github.com/hadelive)! - blockfrost provider returns only unspent utxo by outref

- Updated dependencies []:
  - @evolution-sdk/utils@0.1.66
  - @evolution-sdk/wallet@0.1.72

## 0.1.89

### Patch Changes

- [#576](https://github.com/Anastasia-Labs/evolution-sdk/pull/576) [`dc6ab2e`](https://github.com/Anastasia-Labs/evolution-sdk/commit/dc6ab2e2be80f4774f621a2cc5f7b99e4b4d46de) Thanks [@hadelive](https://github.com/hadelive)! - update awaitTx

## 0.1.88

### Patch Changes

- Updated dependencies [[`9503425`](https://github.com/Anastasia-Labs/evolution-sdk/commit/95034257fb3edda5605a76054fdfc70d51640441)]:
  - @evolution-sdk/utils@0.1.65
  - @evolution-sdk/wallet@0.1.71

## 0.1.87

### Patch Changes

- [#478](https://github.com/Anastasia-Labs/evolution-sdk/pull/478) [`d7bed7f`](https://github.com/Anastasia-Labs/evolution-sdk/commit/d7bed7fa15939e852811f5abc7ab928c7c303718) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - improve emulator test structure; update emulator provider; upgrade effect dependency at lucid package

## 0.1.86

### Patch Changes

- Updated dependencies [[`2335ef1`](https://github.com/Anastasia-Labs/evolution-sdk/commit/2335ef101f8a5d2a92324c7fd8536d5d8927531e)]:
  - @evolution-sdk/core-types@0.1.22
  - @evolution-sdk/utils@0.1.64
  - @evolution-sdk/wallet@0.1.70

## 0.1.85

### Patch Changes

- Updated dependencies [[`0342519`](https://github.com/Anastasia-Labs/evolution-sdk/commit/0342519266ca6ff9e96c1e646f7150b78ba095a8)]:
  - @evolution-sdk/utils@0.1.63
  - @evolution-sdk/wallet@0.1.69

## 0.1.84

### Patch Changes

- Updated dependencies [[`59b51f9`](https://github.com/Anastasia-Labs/evolution-sdk/commit/59b51f96f4201d464b91ec44467963789f7b9983)]:
  - @evolution-sdk/utils@0.1.62
  - @evolution-sdk/wallet@0.1.68

## 0.1.83

### Patch Changes

- [#455](https://github.com/Anastasia-Labs/evolution-sdk/pull/455) [`855cc2a`](https://github.com/Anastasia-Labs/evolution-sdk/commit/855cc2a55f4789571cdfa1adaa25948fa49ece30) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - Upgrade kupmios and koios provider

  # Koios

  Before

  ```ts
  const koios = new KoiosProvider("<api-url>");
  ```

  After

  ```ts
  const koios = new KoiosProvider("<koios-api-url>");
  ```

  or

  ```ts
  const koios = new KoiosProvider("<koios-api-url>", "<koios-bearer-token>");
  ```

  # Kupmios

  Before

  ```ts
  const kupmios = new Kupmios("<kupo-api-url>", "<ogmios-api-url>");
  ```

  After

  ```ts
  const kupmios = new Kupmios("<kupo-api-url>", "<ogmios-api-url>", {
    kupoHeader: { "dmtr-api-key": "<kupo-api-key>" },
    ogmiosHeader: { "dmtr-api-key": "<ogmios-api-key>" },
  });
  ```

## 0.1.82

### Patch Changes

- Updated dependencies [[`9e8cfc6`](https://github.com/Anastasia-Labs/evolution-sdk/commit/9e8cfc6c47fb3d6e45f397f944321c2fe5cf610a)]:
  - @evolution-sdk/utils@0.1.61
  - @evolution-sdk/wallet@0.1.67

## 0.1.81

### Patch Changes

- Updated dependencies [[`8622e93`](https://github.com/Anastasia-Labs/evolution-sdk/commit/8622e93a002c4e9bc797d9e2e5d6804f573d1261), [`dd3bd77`](https://github.com/Anastasia-Labs/evolution-sdk/commit/dd3bd772f59fc774c32b140e1e06314df2c69e4b)]:
  - @evolution-sdk/wallet@0.1.66
  - @evolution-sdk/utils@0.1.60

## 0.1.80

### Patch Changes

- [#436](https://github.com/Anastasia-Labs/evolution-sdk/pull/436) [`6844e1e`](https://github.com/Anastasia-Labs/evolution-sdk/commit/6844e1ebc5f2bdb2ef7987d67e926cb8f4d8d427) Thanks [@hadelive](https://github.com/hadelive)! - minimum fee used in collateral calc

## 0.1.79

### Patch Changes

- [#433](https://github.com/Anastasia-Labs/evolution-sdk/pull/433) [`4e01e51`](https://github.com/Anastasia-Labs/evolution-sdk/commit/4e01e51b2afba34d3ef1d089722a1294c7f253bc) Thanks [@kozer](https://github.com/kozer)! - fix koios submit tx

## 0.1.78

### Patch Changes

- [#431](https://github.com/Anastasia-Labs/evolution-sdk/pull/431) [`87dbc3a`](https://github.com/Anastasia-Labs/evolution-sdk/commit/87dbc3a93c2181ec26f984ac6e5bb73b6e1553c5) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - koios error message; upgrade pnpm to version 9

## 0.1.77

### Patch Changes

- [#423](https://github.com/Anastasia-Labs/evolution-sdk/pull/423) [`d51efd2`](https://github.com/Anastasia-Labs/evolution-sdk/commit/d51efd29f9b8637b9ec05e4ee8556451727a3442) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - enforce single encoding for tx evaluation in providerrs; fix blockfrost redeemer labels

- Updated dependencies [[`d51efd2`](https://github.com/Anastasia-Labs/evolution-sdk/commit/d51efd29f9b8637b9ec05e4ee8556451727a3442)]:
  - @evolution-sdk/utils@0.1.59
  - @evolution-sdk/wallet@0.1.65

## 0.1.76

### Patch Changes

- [#420](https://github.com/Anastasia-Labs/evolution-sdk/pull/420) [`f8bf954`](https://github.com/Anastasia-Labs/evolution-sdk/commit/f8bf954959518f3dd96837a619cd96c6d3048944) Thanks [@hadelive](https://github.com/hadelive)! - fix double cbor encoding

- Updated dependencies [[`f8bf954`](https://github.com/Anastasia-Labs/evolution-sdk/commit/f8bf954959518f3dd96837a619cd96c6d3048944)]:
  - @evolution-sdk/utils@0.1.58
  - @evolution-sdk/wallet@0.1.64

## 0.1.75

### Patch Changes

- [#418](https://github.com/Anastasia-Labs/evolution-sdk/pull/418) [`45a541f`](https://github.com/Anastasia-Labs/evolution-sdk/commit/45a541ff10fd8ddf21036848c7b67e380e36518f) Thanks [@hadelive](https://github.com/hadelive)! - double cbor encoding

- Updated dependencies [[`45a541f`](https://github.com/Anastasia-Labs/evolution-sdk/commit/45a541ff10fd8ddf21036848c7b67e380e36518f)]:
  - @evolution-sdk/utils@0.1.57
  - @evolution-sdk/wallet@0.1.63

## 0.1.74

### Patch Changes

- [#410](https://github.com/Anastasia-Labs/evolution-sdk/pull/410) [`2ef5e3c`](https://github.com/Anastasia-Labs/evolution-sdk/commit/2ef5e3c166799e3d7eeeb642205a33a27ab2c324) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - supports single and double cbor encoding

- Updated dependencies [[`7857343`](https://github.com/Anastasia-Labs/evolution-sdk/commit/785734347e5b4d99a20866f715884f5c7e9a2d0c), [`2ef5e3c`](https://github.com/Anastasia-Labs/evolution-sdk/commit/2ef5e3c166799e3d7eeeb642205a33a27ab2c324)]:
  - @evolution-sdk/utils@0.1.56
  - @evolution-sdk/wallet@0.1.62

## 0.1.73

### Patch Changes

- Updated dependencies [[`18c3c4d`](https://github.com/Anastasia-Labs/evolution-sdk/commit/18c3c4d3676fa12d631b177116d93c35896ecea4)]:
  - @evolution-sdk/utils@0.1.55
  - @evolution-sdk/wallet@0.1.61

## 0.1.72

### Patch Changes

- [#402](https://github.com/Anastasia-Labs/evolution-sdk/pull/402) [`f304a79`](https://github.com/Anastasia-Labs/evolution-sdk/commit/f304a798fbc0b48e5005867bea103ce4046608d6) Thanks [@hadelive](https://github.com/hadelive)! - cjs compatible

- Updated dependencies [[`f304a79`](https://github.com/Anastasia-Labs/evolution-sdk/commit/f304a798fbc0b48e5005867bea103ce4046608d6)]:
  - @evolution-sdk/utils@0.1.54
  - @evolution-sdk/wallet@0.1.60

## 0.1.71

### Patch Changes

- [#383](https://github.com/Anastasia-Labs/evolution-sdk/pull/383) [`0baf07f`](https://github.com/Anastasia-Labs/evolution-sdk/commit/0baf07fa5c0affadabdc7b8b581d3e4c6260960f) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - Make I/O-bound computations optional by allowing preset protocol parameters during Lucid initialization and preset wallet UTXOs during transaction building. Updated Effect library to the latest version.

- Updated dependencies [[`0baf07f`](https://github.com/Anastasia-Labs/evolution-sdk/commit/0baf07fa5c0affadabdc7b8b581d3e4c6260960f)]:
  - @evolution-sdk/utils@0.1.53
  - @evolution-sdk/wallet@0.1.59

## 0.1.70

### Patch Changes

- Updated dependencies [[`ca75789`](https://github.com/Anastasia-Labs/evolution-sdk/commit/ca75789d60316387b08404d25d6181921e3b9c9a)]:
  - @evolution-sdk/utils@0.1.52
  - @evolution-sdk/wallet@0.1.58

## 0.1.69

### Patch Changes

- [#378](https://github.com/Anastasia-Labs/evolution-sdk/pull/378) [`fbb2404`](https://github.com/Anastasia-Labs/evolution-sdk/commit/fbb2404465673d71488a86594640eb5e4246a57d) Thanks [@hadelive](https://github.com/hadelive)! - support map redeemer

## 0.1.68

### Patch Changes

- [#373](https://github.com/Anastasia-Labs/evolution-sdk/pull/373) [`bcea535`](https://github.com/Anastasia-Labs/evolution-sdk/commit/bcea535356fa72e6582d02a4c8aea2cd0e614e42) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - expose CML.Transaction; set constitutionalCommitteeMinSize as optional type schema

## 0.1.67

### Patch Changes

- [#369](https://github.com/Anastasia-Labs/evolution-sdk/pull/369) [`d60c249`](https://github.com/Anastasia-Labs/evolution-sdk/commit/d60c24906fa0133b993185d86d3834a159c79a27) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - add retry mechanism to getDatumEffect and getScriptEffect

## 0.1.66

### Patch Changes

- Updated dependencies []:
  - @evolution-sdk/utils@0.1.51
  - @evolution-sdk/wallet@0.1.57

## 0.1.65

### Patch Changes

- Updated dependencies []:
  - @evolution-sdk/utils@0.1.50
  - @evolution-sdk/wallet@0.1.56

## 0.1.64

### Patch Changes

- Updated dependencies []:
  - @evolution-sdk/utils@0.1.49
  - @evolution-sdk/wallet@0.1.55

## 0.1.63

### Patch Changes

- [#337](https://github.com/Anastasia-Labs/evolution-sdk/pull/337) [`ad4e56f`](https://github.com/Anastasia-Labs/evolution-sdk/commit/ad4e56f9556e99b6b534dd476ca5fc38f6fcd3d6) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - update aiken uplc to 1.1.3; add redeemer utils; update redeemer types

- Updated dependencies [[`ad4e56f`](https://github.com/Anastasia-Labs/evolution-sdk/commit/ad4e56f9556e99b6b534dd476ca5fc38f6fcd3d6)]:
  - @evolution-sdk/core-types@0.1.21
  - @evolution-sdk/utils@0.1.48
  - @evolution-sdk/wallet@0.1.54

## 0.1.62

### Patch Changes

- Updated dependencies []:
  - @evolution-sdk/utils@0.1.47
  - @evolution-sdk/wallet@0.1.53

## 0.1.61

### Patch Changes

- [#330](https://github.com/Anastasia-Labs/evolution-sdk/pull/330) [`876fee9`](https://github.com/Anastasia-Labs/evolution-sdk/commit/876fee988089ec56355a68f0279899c1d299b9cc) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - fix toOgmiosAssets

- Updated dependencies [[`d0ae360`](https://github.com/Anastasia-Labs/evolution-sdk/commit/d0ae360e432822796f8db9e985a894f17bf385b9)]:
  - @evolution-sdk/utils@0.1.46
  - @evolution-sdk/wallet@0.1.52

## 0.1.60

### Patch Changes

- Updated dependencies []:
  - @evolution-sdk/utils@0.1.45
  - @evolution-sdk/wallet@0.1.51

## 0.1.59

### Patch Changes

- [#325](https://github.com/Anastasia-Labs/evolution-sdk/pull/325) [`a85ae4d`](https://github.com/Anastasia-Labs/evolution-sdk/commit/a85ae4d386287359c734b8342f50a5082ecf1625) Thanks [@hadelive](https://github.com/hadelive)! - handle new blockfrost response

## 0.1.58

### Patch Changes

- [#321](https://github.com/Anastasia-Labs/evolution-sdk/pull/321) [`5869fe7`](https://github.com/Anastasia-Labs/evolution-sdk/commit/5869fe7e5f99892988f7f372beae004035e31179) Thanks [@hadelive](https://github.com/hadelive)! - fix register drep required wits

- Updated dependencies [[`5869fe7`](https://github.com/Anastasia-Labs/evolution-sdk/commit/5869fe7e5f99892988f7f372beae004035e31179)]:
  - @evolution-sdk/core-types@0.1.20
  - @evolution-sdk/core-utils@0.1.16
  - @evolution-sdk/wallet@0.1.50
  - @evolution-sdk/utils@0.1.44

## 0.1.57

### Patch Changes

- Updated dependencies [[`93e4784`](https://github.com/Anastasia-Labs/evolution-sdk/commit/93e4784b3397a13b197b04c4de897c455ae62088)]:
  - @evolution-sdk/core-types@0.1.19
  - @evolution-sdk/utils@0.1.43
  - @evolution-sdk/wallet@0.1.49

## 0.1.56

### Patch Changes

- Updated dependencies [[`76af78f`](https://github.com/Anastasia-Labs/evolution-sdk/commit/76af78fedb6a41400bb1204596e0ef39953ce82c)]:
  - @evolution-sdk/wallet@0.1.48

## 0.1.55

### Patch Changes

- [#308](https://github.com/Anastasia-Labs/evolution-sdk/pull/308) [`2afc548`](https://github.com/Anastasia-Labs/evolution-sdk/commit/2afc5485d65c7811a66339daa4c90493026cf51e) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - add governance modules

- Updated dependencies [[`2afc548`](https://github.com/Anastasia-Labs/evolution-sdk/commit/2afc5485d65c7811a66339daa4c90493026cf51e)]:
  - @evolution-sdk/core-types@0.1.18
  - @evolution-sdk/wallet@0.1.47
  - @evolution-sdk/utils@0.1.42

## 0.1.54

### Patch Changes

- Updated dependencies [[`8ddb8c0`](https://github.com/Anastasia-Labs/evolution-sdk/commit/8ddb8c0381eb4e0a63715a6abd4aeb77bbd3c162), [`020ba4f`](https://github.com/Anastasia-Labs/evolution-sdk/commit/020ba4fc869a8b41480241ced40ff827e837ab31)]:
  - @evolution-sdk/utils@0.1.41
  - @evolution-sdk/wallet@0.1.46

## 0.1.53

### Patch Changes

- [#302](https://github.com/Anastasia-Labs/evolution-sdk/pull/302) [`156c054`](https://github.com/Anastasia-Labs/evolution-sdk/commit/156c0546b15c8ea8d8a8c7c3eb1ba5d78ed60fc1) Thanks [@hadelive](https://github.com/hadelive)! - enable plutusV3

- Updated dependencies [[`156c054`](https://github.com/Anastasia-Labs/evolution-sdk/commit/156c0546b15c8ea8d8a8c7c3eb1ba5d78ed60fc1)]:
  - @evolution-sdk/utils@0.1.40
  - @evolution-sdk/wallet@0.1.45

## 0.1.52

### Patch Changes

- [#298](https://github.com/Anastasia-Labs/evolution-sdk/pull/298) [`22a9c9c`](https://github.com/Anastasia-Labs/evolution-sdk/commit/22a9c9ceda21cad992727e3f46ae5dea89a0fe7e) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - update datum serialization to cardano_node_format() (indefinite length notation)

- Updated dependencies [[`22a9c9c`](https://github.com/Anastasia-Labs/evolution-sdk/commit/22a9c9ceda21cad992727e3f46ae5dea89a0fe7e), [`083f991`](https://github.com/Anastasia-Labs/evolution-sdk/commit/083f991af49b1dcfe51267bf186db5100136de1d)]:
  - @evolution-sdk/core-types@0.1.17
  - @evolution-sdk/core-utils@0.1.15
  - @evolution-sdk/wallet@0.1.44
  - @evolution-sdk/utils@0.1.39

## 0.1.51

### Patch Changes

- [#293](https://github.com/Anastasia-Labs/evolution-sdk/pull/293) [`9a4f765`](https://github.com/Anastasia-Labs/evolution-sdk/commit/9a4f7656c4f172ce0487a2c7b453a56cb9883921) Thanks [@hadelive](https://github.com/hadelive)! - feat: support reference native script

## 0.1.50

### Patch Changes

- [#291](https://github.com/Anastasia-Labs/evolution-sdk/pull/291) [`6225208`](https://github.com/Anastasia-Labs/evolution-sdk/commit/62252086fb6d2adbecf56ec94da8b6d7c8a63e08) Thanks [@hadelive](https://github.com/hadelive)! - fix maestro protocol params

## 0.1.49

### Patch Changes

- [#282](https://github.com/Anastasia-Labs/evolution-sdk/pull/282) [`8c76538`](https://github.com/Anastasia-Labs/evolution-sdk/commit/8c76538d3d64fc2698d858b1d6c5beaaeb594162) Thanks [@hadelive](https://github.com/hadelive)! - fix maestro plutus v3 cost models

## 0.1.48

### Patch Changes

- [#285](https://github.com/Anastasia-Labs/evolution-sdk/pull/285) [`59a15c8`](https://github.com/Anastasia-Labs/evolution-sdk/commit/59a15c83e16c1bf22a44e1e05ff7480ef39cb631) Thanks [@hadelive](https://github.com/hadelive)! - bump cml to 6.0.1-2

- Updated dependencies [[`59a15c8`](https://github.com/Anastasia-Labs/evolution-sdk/commit/59a15c83e16c1bf22a44e1e05ff7480ef39cb631)]:
  - @evolution-sdk/core-types@0.1.16
  - @evolution-sdk/core-utils@0.1.14
  - @evolution-sdk/wallet@0.1.43
  - @evolution-sdk/utils@0.1.38

## 0.1.47

### Patch Changes

- [#273](https://github.com/Anastasia-Labs/evolution-sdk/pull/273) [`f119e2f`](https://github.com/Anastasia-Labs/evolution-sdk/commit/f119e2f64c3d5869f9a2b44832f267c45a6567e0) Thanks [@hadelive](https://github.com/hadelive)! - fix sellect wallet from private key

- Updated dependencies [[`f119e2f`](https://github.com/Anastasia-Labs/evolution-sdk/commit/f119e2f64c3d5869f9a2b44832f267c45a6567e0)]:
  - @evolution-sdk/wallet@0.1.42

## 0.1.46

### Patch Changes

- [#268](https://github.com/Anastasia-Labs/evolution-sdk/pull/268) [`f8f905a`](https://github.com/Anastasia-Labs/evolution-sdk/commit/f8f905aeda20b30a03ba69e4b062a80a7a5be7de) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - update providers structure and improve side effects

- Updated dependencies [[`f8f905a`](https://github.com/Anastasia-Labs/evolution-sdk/commit/f8f905aeda20b30a03ba69e4b062a80a7a5be7de)]:
  - @evolution-sdk/core-types@0.1.15
  - @evolution-sdk/utils@0.1.37
  - @evolution-sdk/wallet@0.1.41

## 0.1.45

### Patch Changes

- [#258](https://github.com/Anastasia-Labs/evolution-sdk/pull/258) [`8372b50`](https://github.com/Anastasia-Labs/evolution-sdk/commit/8372b50972bd99d5cfe122ebb0bfb98908484e0d) Thanks [@hadelive](https://github.com/hadelive)! - fix emulator submitTx function

- Updated dependencies [[`8372b50`](https://github.com/Anastasia-Labs/evolution-sdk/commit/8372b50972bd99d5cfe122ebb0bfb98908484e0d)]:
  - @evolution-sdk/core-types@0.1.14
  - @evolution-sdk/utils@0.1.36
  - @evolution-sdk/wallet@0.1.40

## 0.1.44

### Patch Changes

- [#226](https://github.com/Anastasia-Labs/evolution-sdk/pull/226) [`344b8cb`](https://github.com/Anastasia-Labs/evolution-sdk/commit/344b8cbf376d59fd1b6fbf9a17ab892559bf325f) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - fix applyParamsToScript; normalize providers test; fix evaluateTx for spent transacions; fix kupmios awaitTx

- Updated dependencies [[`344b8cb`](https://github.com/Anastasia-Labs/evolution-sdk/commit/344b8cbf376d59fd1b6fbf9a17ab892559bf325f)]:
  - @evolution-sdk/utils@0.1.35
  - @evolution-sdk/wallet@0.1.39

## 0.1.43

### Patch Changes

- Updated dependencies [[`803086b`](https://github.com/Anastasia-Labs/evolution-sdk/commit/803086be99793f334b8c82eb2edd739b3e57ba37)]:
  - @evolution-sdk/utils@0.1.34
  - @evolution-sdk/wallet@0.1.38

## 0.1.42

### Patch Changes

- [#225](https://github.com/Anastasia-Labs/evolution-sdk/pull/225) [`7c25501`](https://github.com/Anastasia-Labs/evolution-sdk/commit/7c25501e5f11af8d4a1b2e36d3430bf638cb1eed) Thanks [@hadelive](https://github.com/hadelive)! - support conway un_reg cert

- Updated dependencies [[`7c25501`](https://github.com/Anastasia-Labs/evolution-sdk/commit/7c25501e5f11af8d4a1b2e36d3430bf638cb1eed)]:
  - @evolution-sdk/core-utils@0.1.13
  - @evolution-sdk/wallet@0.1.37
  - @evolution-sdk/utils@0.1.33

## 0.1.41

### Patch Changes

- [#190](https://github.com/Anastasia-Labs/evolution-sdk/pull/190) [`aec1ccd`](https://github.com/Anastasia-Labs/evolution-sdk/commit/aec1ccd7659e17c07b677f1649977590b830c6bc) Thanks [@hadelive](https://github.com/hadelive)! - add evaludateTx function

- Updated dependencies [[`aec1ccd`](https://github.com/Anastasia-Labs/evolution-sdk/commit/aec1ccd7659e17c07b677f1649977590b830c6bc), [`3fa5522`](https://github.com/Anastasia-Labs/evolution-sdk/commit/3fa55226d7dc182a1515cb034744a3b4343c3c33), [`18dea56`](https://github.com/Anastasia-Labs/evolution-sdk/commit/18dea561759ad569e02af252a89c774e53b74dd7)]:
  - @evolution-sdk/core-types@0.1.13
  - @evolution-sdk/wallet@0.1.36
  - @evolution-sdk/core-utils@0.1.12
  - @evolution-sdk/utils@0.1.32

## 0.1.40

### Patch Changes

- Updated dependencies []:
  - @evolution-sdk/utils@0.1.31
  - @evolution-sdk/wallet@0.1.35

## 0.1.39

### Patch Changes

- Updated dependencies [[`f99d031`](https://github.com/Anastasia-Labs/evolution-sdk/commit/f99d031bd6ccbeffddd01e3ebf869a04978ba4e6)]:
  - @evolution-sdk/core-utils@0.1.11
  - @evolution-sdk/utils@0.1.30
  - @evolution-sdk/wallet@0.1.34

## 0.1.38

### Patch Changes

- Updated dependencies [[`10d9f80`](https://github.com/Anastasia-Labs/evolution-sdk/commit/10d9f80695928675061fc15b9b18b1c93fb9bb4f), [`bf2341f`](https://github.com/Anastasia-Labs/evolution-sdk/commit/bf2341f5a5d541fe2ca468fa512e009ab32a1346)]:
  - @evolution-sdk/wallet@0.1.33
  - @evolution-sdk/utils@0.1.29
  - @evolution-sdk/core-utils@0.1.10

## 0.1.37

### Patch Changes

- Updated dependencies [[`b4d379c`](https://github.com/Anastasia-Labs/evolution-sdk/commit/b4d379c3429c85468c5137b0d828da0b16fe331f)]:
  - @evolution-sdk/wallet@0.1.32

## 0.1.36

### Patch Changes

- [#195](https://github.com/Anastasia-Labs/evolution-sdk/pull/195) [`e281b5b`](https://github.com/Anastasia-Labs/evolution-sdk/commit/e281b5bfe5da9a02e3cda35668c3a3eb18f20092) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - add refscript fee to preview

- Updated dependencies [[`e281b5b`](https://github.com/Anastasia-Labs/evolution-sdk/commit/e281b5bfe5da9a02e3cda35668c3a3eb18f20092)]:
  - @evolution-sdk/core-types@0.1.12
  - @evolution-sdk/core-utils@0.1.9
  - @evolution-sdk/wallet@0.1.31
  - @evolution-sdk/utils@0.1.28

## 0.1.35

### Patch Changes

- [#155](https://github.com/Anastasia-Labs/evolution-sdk/pull/155) [`5933bce`](https://github.com/Anastasia-Labs/evolution-sdk/commit/5933bced0cc75cb4330439d8a4f8f46ae7a04a50) Thanks [@hadelive](https://github.com/hadelive)! - Add emulator provider

- Updated dependencies [[`5933bce`](https://github.com/Anastasia-Labs/evolution-sdk/commit/5933bced0cc75cb4330439d8a4f8f46ae7a04a50)]:
  - @evolution-sdk/wallet@0.1.30

## 0.1.34

### Patch Changes

- [#183](https://github.com/Anastasia-Labs/evolution-sdk/pull/183) [`8ab1875`](https://github.com/Anastasia-Labs/evolution-sdk/commit/8ab187531e496bd764651328088e99fc09304ca3) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - cleanup tsconfig.json files, use base.json from typescript-config package as extends property

- Updated dependencies [[`8ab1875`](https://github.com/Anastasia-Labs/evolution-sdk/commit/8ab187531e496bd764651328088e99fc09304ca3)]:
  - @evolution-sdk/core-types@0.1.11
  - @evolution-sdk/core-utils@0.1.8
  - @evolution-sdk/utils@0.1.27

## 0.1.33

### Patch Changes

- Updated dependencies [[`6282481`](https://github.com/Anastasia-Labs/evolution-sdk/commit/6282481a2183cfa1a3deec025552d7432cb35869)]:
  - @evolution-sdk/core-types@0.1.10
  - @evolution-sdk/utils@0.1.26

## 0.1.32

### Patch Changes

- Updated dependencies []:
  - @evolution-sdk/utils@0.1.25

## 0.1.31

### Patch Changes

- [#174](https://github.com/Anastasia-Labs/evolution-sdk/pull/174) [`f86b74a`](https://github.com/Anastasia-Labs/evolution-sdk/commit/f86b74a7a5489012e717b1247771b527f21be424) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - refactor error messages and constructor

- Updated dependencies [[`f794a5b`](https://github.com/Anastasia-Labs/evolution-sdk/commit/f794a5bbec7d1ae39135495827ccca91e9ac9da6)]:
  - @evolution-sdk/utils@0.1.24

## 0.1.30

### Patch Changes

- [#168](https://github.com/Anastasia-Labs/evolution-sdk/pull/168) [`26dc344`](https://github.com/Anastasia-Labs/evolution-sdk/commit/26dc34466e74a8af6b6952dcd705d6f67f9660d0) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - Changes

  - Add kupos and ogmios schemas
  - Support jsonrpc v2
  - Effectful http request
  - Remove websocket from ogmios, use http post instead.
  - Support for ogmios v6
  - Support for kupo 2.8.0

- Updated dependencies []:
  - @evolution-sdk/utils@0.1.23

## 0.1.29

### Patch Changes

- Updated dependencies [[`7a8956f`](https://github.com/Anastasia-Labs/evolution-sdk/commit/7a8956f95a4ae08e520a8a5f0b0ea4a3eabe869a)]:
  - @evolution-sdk/core-types@0.1.9
  - @evolution-sdk/utils@0.1.22

## 0.1.28

### Patch Changes

- Updated dependencies [[`e63c233`](https://github.com/Anastasia-Labs/evolution-sdk/commit/e63c2334a86a50c3ff9e95a142a9299ed76059a3)]:
  - @evolution-sdk/utils@0.1.21

## 0.1.27

### Patch Changes

- [#144](https://github.com/Anastasia-Labs/evolution-sdk/pull/144) [`ed554c4`](https://github.com/Anastasia-Labs/evolution-sdk/commit/ed554c45ed4664568af31a6c1cecb2eb5464cab5) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - add metadata endpoint

- Updated dependencies [[`ed554c4`](https://github.com/Anastasia-Labs/evolution-sdk/commit/ed554c45ed4664568af31a6c1cecb2eb5464cab5)]:
  - @evolution-sdk/core-types@0.1.8
  - @evolution-sdk/core-utils@0.1.7
  - @evolution-sdk/utils@0.1.20

## 0.1.26

### Patch Changes

- Updated dependencies [[`5760851`](https://github.com/Anastasia-Labs/evolution-sdk/commit/57608517cd86e8e72b577fc34f5ae0d3d37f9a74)]:
  - @evolution-sdk/utils@0.1.19

## 0.1.25

### Patch Changes

- [#141](https://github.com/Anastasia-Labs/evolution-sdk/pull/141) [`eef3d42`](https://github.com/Anastasia-Labs/evolution-sdk/commit/eef3d421b4cdf12638169ece49e4c00fce6e3356) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - Transaction chaining is a feature that allows to chain multiple transactions in one block , the endpoint chain() allows to accomplish this by returning a tuple with three elements:

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

- Updated dependencies [[`eef3d42`](https://github.com/Anastasia-Labs/evolution-sdk/commit/eef3d421b4cdf12638169ece49e4c00fce6e3356)]:
  - @evolution-sdk/core-types@0.1.7
  - @evolution-sdk/utils@0.1.18

## 0.1.24

### Patch Changes

- [#136](https://github.com/Anastasia-Labs/evolution-sdk/pull/136) [`c35f159`](https://github.com/Anastasia-Labs/evolution-sdk/commit/c35f159e0446b53fb6f91494b4c0da6587dcf32b) Thanks [@nikhils9](https://github.com/nikhils9)! - Coin selection fixes and few updates

- Updated dependencies [[`c35f159`](https://github.com/Anastasia-Labs/evolution-sdk/commit/c35f159e0446b53fb6f91494b4c0da6587dcf32b)]:
  - @evolution-sdk/utils@0.1.17

## 0.1.23

### Patch Changes

- Updated dependencies [[`aeb4bba`](https://github.com/Anastasia-Labs/evolution-sdk/commit/aeb4bba266fdeab1e47d3911413f30e749bfe564)]:
  - @evolution-sdk/utils@0.1.16

## 0.1.22

### Patch Changes

- [#134](https://github.com/Anastasia-Labs/evolution-sdk/pull/134) [`e1d5aca`](https://github.com/Anastasia-Labs/evolution-sdk/commit/e1d5aca2c92d6da0bc5bb11776eec7677a56d03a) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - fix koios schema, improve code structure

## 0.1.21

### Patch Changes

- [#131](https://github.com/Anastasia-Labs/evolution-sdk/pull/131) [`47ca9e2`](https://github.com/Anastasia-Labs/evolution-sdk/commit/47ca9e2227d33b572a011917a3178c8b520a8f98) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - fix provider schema

## 0.1.20

### Patch Changes

- [#128](https://github.com/Anastasia-Labs/evolution-sdk/pull/128) [`1e73c40`](https://github.com/Anastasia-Labs/evolution-sdk/commit/1e73c4098eb0b38f597c9b772f1470333e9dc011) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - add Koios provider

## 0.1.19

### Patch Changes

- Updated dependencies [[`11eb043`](https://github.com/Anastasia-Labs/evolution-sdk/commit/11eb043bb7ecf2b0913c6edc1642c7b50808cab5)]:
  - @evolution-sdk/utils@0.1.15

## 0.1.18

### Patch Changes

- Updated dependencies [[`25b0416`](https://github.com/Anastasia-Labs/evolution-sdk/commit/25b0416e597edb44bf160c1d3086041b7b4117ff)]:
  - @evolution-sdk/utils@0.1.14

## 0.1.17

### Patch Changes

- Updated dependencies [[`a84ac5f`](https://github.com/Anastasia-Labs/evolution-sdk/commit/a84ac5f8dcaf699fa5e19ec55b9716a881d649bd)]:
  - @evolution-sdk/utils@0.1.13

## 0.1.16

### Patch Changes

- Updated dependencies [[`d0446f2`](https://github.com/Anastasia-Labs/evolution-sdk/commit/d0446f2e2ce9d91e6e514cba97c9ba101c83b66b)]:
  - @evolution-sdk/utils@0.1.12

## 0.1.15

### Patch Changes

- Updated dependencies [[`a5cfe27`](https://github.com/Anastasia-Labs/evolution-sdk/commit/a5cfe27dce663f84d07cd0e18ff7f011612e0d59)]:
  - @evolution-sdk/utils@0.1.11

## 0.1.14

### Patch Changes

- Updated dependencies [[`d3268d5`](https://github.com/Anastasia-Labs/evolution-sdk/commit/d3268d5886cae2c5619ed409ec53458b1fbd426f)]:
  - @evolution-sdk/utils@0.1.10

## 0.1.13

### Patch Changes

- [#105](https://github.com/Anastasia-Labs/evolution-sdk/pull/105) [`042a0c0`](https://github.com/Anastasia-Labs/evolution-sdk/commit/042a0c0fa1cbea24b3410b2bd319d6e54cfb449f) Thanks [@caike](https://github.com/caike)! - Fix submitTx call to Ogmios

## 0.1.12

### Patch Changes

- [#94](https://github.com/Anastasia-Labs/evolution-sdk/pull/94) [`1f4f989`](https://github.com/Anastasia-Labs/evolution-sdk/commit/1f4f9896b0d27520ea8892b2e9925bd7b0311425) Thanks [@caike](https://github.com/caike)! - Fix Ogmios protocol params

## 0.1.11

### Patch Changes

- [#91](https://github.com/Anastasia-Labs/evolution-sdk/pull/91) [`05a492f`](https://github.com/Anastasia-Labs/evolution-sdk/commit/05a492ff90199758088bcc6536cc62f5f85040a8) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - add browser support

- Updated dependencies [[`05a492f`](https://github.com/Anastasia-Labs/evolution-sdk/commit/05a492ff90199758088bcc6536cc62f5f85040a8)]:
  - @evolution-sdk/core-types@0.1.6
  - @evolution-sdk/core-utils@0.1.6
  - @evolution-sdk/utils@0.1.9

## 0.1.10

### Patch Changes

- [#86](https://github.com/Anastasia-Labs/evolution-sdk/pull/86) [`6eacab5`](https://github.com/Anastasia-Labs/evolution-sdk/commit/6eacab5c108485877879a2deffd2f8a1369ac172) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - - fix: use TransactionOutputBuilder.() instead of TransactionOutput.new()
  - test: enable all preprod tests
  - test: update test
  - refactor: code structure
  - test: add hello contract test using retry implementation
- Updated dependencies [[`6eacab5`](https://github.com/Anastasia-Labs/evolution-sdk/commit/6eacab5c108485877879a2deffd2f8a1369ac172), [`a8abb5d`](https://github.com/Anastasia-Labs/evolution-sdk/commit/a8abb5df4b6d233e314a36f0948c95ab15f784bb)]:
  - @evolution-sdk/utils@0.1.8

## 0.1.9

### Patch Changes

- [#84](https://github.com/Anastasia-Labs/evolution-sdk/pull/84) [`2fb5635`](https://github.com/Anastasia-Labs/evolution-sdk/commit/2fb56356fbdfc41c5dc7328456559c8aaf8dbf15) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - - refactor: fetch wallet utxos only once
  - refactor: change code structure
  - refactor: move CML to core file
  - refactor: set core file for CML lib
  - build(upgrade): bump packages version
- Updated dependencies [[`2fb5635`](https://github.com/Anastasia-Labs/evolution-sdk/commit/2fb56356fbdfc41c5dc7328456559c8aaf8dbf15)]:
  - @evolution-sdk/core-types@0.1.5
  - @evolution-sdk/core-utils@0.1.5
  - @evolution-sdk/utils@0.1.7

## 0.1.8

### Patch Changes

- [#82](https://github.com/Anastasia-Labs/evolution-sdk/pull/82) [`30cec9b`](https://github.com/Anastasia-Labs/evolution-sdk/commit/30cec9b9f07ef8fbe478d67ef8d42b2aa841efb3) Thanks [@caike](https://github.com/caike)! - Fix Kupmios getDelegation call to Ogmios

## 0.1.7

### Patch Changes

- [#78](https://github.com/Anastasia-Labs/evolution-sdk/pull/78) [`73f7090`](https://github.com/Anastasia-Labs/evolution-sdk/commit/73f7090bf7571f595ce202d11552b62dac0c3028) Thanks [@caike](https://github.com/caike)! - Fix Kupmios provider errors on protocol params

## 0.1.6

### Patch Changes

- [#76](https://github.com/Anastasia-Labs/evolution-sdk/pull/76) [`ed27a6f`](https://github.com/Anastasia-Labs/evolution-sdk/commit/ed27a6fe707767dfc9332e242a8af939fc286db2) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - bump versions

- Updated dependencies [[`ed27a6f`](https://github.com/Anastasia-Labs/evolution-sdk/commit/ed27a6fe707767dfc9332e242a8af939fc286db2)]:
  - @evolution-sdk/utils@0.1.6

## 0.1.5

### Patch Changes

- [#72](https://github.com/Anastasia-Labs/evolution-sdk/pull/72) [`459df3e`](https://github.com/Anastasia-Labs/evolution-sdk/commit/459df3e95fd55ccdf48fc9cd63e850c053d2f470) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - bump all packages

- Updated dependencies [[`459df3e`](https://github.com/Anastasia-Labs/evolution-sdk/commit/459df3e95fd55ccdf48fc9cd63e850c053d2f470)]:
  - @evolution-sdk/core-types@0.1.4
  - @evolution-sdk/core-utils@0.1.4
  - @evolution-sdk/utils@0.1.5

## 0.1.4

### Patch Changes

- Updated dependencies [[`bcda3fc`](https://github.com/Anastasia-Labs/evolution-sdk/commit/bcda3fc3ca9dc13e93ef95929af2fe6fd0937e60)]:
  - @evolution-sdk/utils@0.1.4

## 0.1.3

### Patch Changes

- [#49](https://github.com/Anastasia-Labs/evolution-sdk/pull/49) [`484a3c6`](https://github.com/Anastasia-Labs/evolution-sdk/commit/484a3c6bf273cedc0aa914eccebb4d78d633bdf4) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - - bump CMl version 5.2
  - remove toCMLTransactionHash , use CML.hash_transaction which is the fixed function from CML 5.2
- Updated dependencies [[`484a3c6`](https://github.com/Anastasia-Labs/evolution-sdk/commit/484a3c6bf273cedc0aa914eccebb4d78d633bdf4)]:
  - @evolution-sdk/core-types@0.1.3
  - @evolution-sdk/core-utils@0.1.3
  - @evolution-sdk/utils@0.1.3

## 0.1.2

### Patch Changes

- [#47](https://github.com/Anastasia-Labs/evolution-sdk/pull/47) [`67b178b`](https://github.com/Anastasia-Labs/evolution-sdk/commit/67b178be520f53fe6901cac2c8573170408f861a) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - move key packages to dependencies

- Updated dependencies [[`67b178b`](https://github.com/Anastasia-Labs/evolution-sdk/commit/67b178be520f53fe6901cac2c8573170408f861a)]:
  - @evolution-sdk/core-types@0.1.2
  - @evolution-sdk/core-utils@0.1.2
  - @evolution-sdk/utils@0.1.2

## 0.1.1

### Patch Changes

- [#45](https://github.com/Anastasia-Labs/evolution-sdk/pull/45) [`0f2e140`](https://github.com/Anastasia-Labs/evolution-sdk/commit/0f2e1404e4a476b5003f2937c01943ffd536fbd4) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - add dual export

## 0.1.0

### Minor Changes

- [#36](https://github.com/Anastasia-Labs/evolution-sdk/pull/36) [`fea08c4`](https://github.com/Anastasia-Labs/evolution-sdk/commit/fea08c44cdc52e58ed7a20ab4dc2566e708e8a21) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - fix building
