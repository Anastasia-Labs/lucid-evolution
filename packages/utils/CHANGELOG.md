# @evolution-sdk/utils

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
  - @evolution-sdk/crc8@2.0.0
  - @evolution-sdk/plutus@2.0.0
  - @evolution-sdk/uplc@2.0.0

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
  - @evolution-sdk/crc8@1.0.0
  - @evolution-sdk/plutus@1.0.0
  - @evolution-sdk/uplc@1.0.0

## 0.1.66

### Patch Changes

- Updated dependencies [[`0afcc62`](https://github.com/Anastasia-Labs/evolution-sdk/commit/0afcc62228428beb3d47b66f63fa9d8becb07f10)]:
  - @evolution-sdk/uplc@0.2.20

## 0.1.65

### Patch Changes

- [#538](https://github.com/Anastasia-Labs/evolution-sdk/pull/538) [`9503425`](https://github.com/Anastasia-Labs/evolution-sdk/commit/95034257fb3edda5605a76054fdfc70d51640441) Thanks [@hadelive](https://github.com/hadelive)! - expose drepIDToCredential

## 0.1.64

### Patch Changes

- Updated dependencies [[`2335ef1`](https://github.com/Anastasia-Labs/evolution-sdk/commit/2335ef101f8a5d2a92324c7fd8536d5d8927531e), [`09a41ae`](https://github.com/Anastasia-Labs/evolution-sdk/commit/09a41ae8b7030dd3f4e04d6721e1d9fa77e02b12)]:
  - @evolution-sdk/core-types@0.1.22
  - @evolution-sdk/uplc@0.2.19
  - @evolution-sdk/plutus@0.1.29

## 0.1.63

### Patch Changes

- [#472](https://github.com/Anastasia-Labs/evolution-sdk/pull/472) [`0342519`](https://github.com/Anastasia-Labs/evolution-sdk/commit/0342519266ca6ff9e96c1e646f7150b78ba095a8) Thanks [@hadelive](https://github.com/hadelive)! - support esd,cjs

## 0.1.62

### Patch Changes

- [#459](https://github.com/Anastasia-Labs/evolution-sdk/pull/459) [`59b51f9`](https://github.com/Anastasia-Labs/evolution-sdk/commit/59b51f96f4201d464b91ec44467963789f7b9983) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - UTXO handling to normalize entries containing both a `datum` and `datumHash`.
  The `datum` field is now removed when a `datumHash` is present to ensure consistency and avoid errors during transaction evaluation.

## 0.1.61

### Patch Changes

- [#452](https://github.com/Anastasia-Labs/evolution-sdk/pull/452) [`9e8cfc6`](https://github.com/Anastasia-Labs/evolution-sdk/commit/9e8cfc6c47fb3d6e45f397f944321c2fe5cf610a) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - use addressFromHexOrBech32 in getAddressDetails

## 0.1.60

### Patch Changes

- [#443](https://github.com/Anastasia-Labs/evolution-sdk/pull/443) [`dd3bd77`](https://github.com/Anastasia-Labs/evolution-sdk/commit/dd3bd772f59fc774c32b140e1e06314df2c69e4b) Thanks [@nikhils9](https://github.com/nikhils9)! - Fix `unixTimeToSlot` for Custom network

- Updated dependencies [[`a375179`](https://github.com/Anastasia-Labs/evolution-sdk/commit/a375179960e0d17a17d97474c53b9f285c9d5ad0)]:
  - @evolution-sdk/uplc@0.2.18

## 0.1.59

### Patch Changes

- [#423](https://github.com/Anastasia-Labs/evolution-sdk/pull/423) [`d51efd2`](https://github.com/Anastasia-Labs/evolution-sdk/commit/d51efd29f9b8637b9ec05e4ee8556451727a3442) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - enforce single encoding for tx evaluation in providerrs; fix blockfrost redeemer labels

## 0.1.58

### Patch Changes

- [#420](https://github.com/Anastasia-Labs/evolution-sdk/pull/420) [`f8bf954`](https://github.com/Anastasia-Labs/evolution-sdk/commit/f8bf954959518f3dd96837a619cd96c6d3048944) Thanks [@hadelive](https://github.com/hadelive)! - fix double cbor encoding

## 0.1.57

### Patch Changes

- [#418](https://github.com/Anastasia-Labs/evolution-sdk/pull/418) [`45a541f`](https://github.com/Anastasia-Labs/evolution-sdk/commit/45a541ff10fd8ddf21036848c7b67e380e36518f) Thanks [@hadelive](https://github.com/hadelive)! - double cbor encoding

## 0.1.56

### Patch Changes

- [#407](https://github.com/Anastasia-Labs/evolution-sdk/pull/407) [`7857343`](https://github.com/Anastasia-Labs/evolution-sdk/commit/785734347e5b4d99a20866f715884f5c7e9a2d0c) Thanks [@fabianbormann](https://github.com/fabianbormann)! - ensure lovelace amounts use BigInt type

- [#410](https://github.com/Anastasia-Labs/evolution-sdk/pull/410) [`2ef5e3c`](https://github.com/Anastasia-Labs/evolution-sdk/commit/2ef5e3c166799e3d7eeeb642205a33a27ab2c324) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - supports single and double cbor encoding

## 0.1.55

### Patch Changes

- [#406](https://github.com/Anastasia-Labs/evolution-sdk/pull/406) [`18c3c4d`](https://github.com/Anastasia-Labs/evolution-sdk/commit/18c3c4d3676fa12d631b177116d93c35896ecea4) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - fix cbor encoding/decoding in browser, installed cbor-x

## 0.1.54

### Patch Changes

- [#402](https://github.com/Anastasia-Labs/evolution-sdk/pull/402) [`f304a79`](https://github.com/Anastasia-Labs/evolution-sdk/commit/f304a798fbc0b48e5005867bea103ce4046608d6) Thanks [@hadelive](https://github.com/hadelive)! - cjs compatible

## 0.1.53

### Patch Changes

- [#383](https://github.com/Anastasia-Labs/evolution-sdk/pull/383) [`0baf07f`](https://github.com/Anastasia-Labs/evolution-sdk/commit/0baf07fa5c0affadabdc7b8b581d3e4c6260960f) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - Make I/O-bound computations optional by allowing preset protocol parameters during Lucid initialization and preset wallet UTXOs during transaction building. Updated Effect library to the latest version.

## 0.1.52

### Patch Changes

- [#380](https://github.com/Anastasia-Labs/evolution-sdk/pull/380) [`ca75789`](https://github.com/Anastasia-Labs/evolution-sdk/commit/ca75789d60316387b08404d25d6181921e3b9c9a) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - add applyDoubleCborEncoding to applyParamsToScript

## 0.1.51

### Patch Changes

- Updated dependencies [[`974c5ef`](https://github.com/Anastasia-Labs/evolution-sdk/commit/974c5efb56db592ed4bc3c84ca3b5a4659182a51)]:
  - @evolution-sdk/plutus@0.1.28

## 0.1.50

### Patch Changes

- Updated dependencies [[`310559c`](https://github.com/Anastasia-Labs/evolution-sdk/commit/310559c2241c3fd4564b33db8f46fd2fc1d5e936)]:
  - @evolution-sdk/uplc@0.2.17

## 0.1.49

### Patch Changes

- Updated dependencies [[`33135ed`](https://github.com/Anastasia-Labs/evolution-sdk/commit/33135ed8532a3140025751cbc7e1b7efae74545d)]:
  - @evolution-sdk/uplc@0.2.16

## 0.1.48

### Patch Changes

- [#337](https://github.com/Anastasia-Labs/evolution-sdk/pull/337) [`ad4e56f`](https://github.com/Anastasia-Labs/evolution-sdk/commit/ad4e56f9556e99b6b534dd476ca5fc38f6fcd3d6) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - update aiken uplc to 1.1.3; add redeemer utils; update redeemer types

- Updated dependencies [[`ad4e56f`](https://github.com/Anastasia-Labs/evolution-sdk/commit/ad4e56f9556e99b6b534dd476ca5fc38f6fcd3d6)]:
  - @evolution-sdk/core-types@0.1.21
  - @evolution-sdk/uplc@0.2.15
  - @evolution-sdk/plutus@0.1.27

## 0.1.47

### Patch Changes

- Updated dependencies [[`2e25677`](https://github.com/Anastasia-Labs/evolution-sdk/commit/2e256779181e0f79ccbf0f1eaaae432795d4315d)]:
  - @evolution-sdk/uplc@0.2.14

## 0.1.46

### Patch Changes

- [#333](https://github.com/Anastasia-Labs/evolution-sdk/pull/333) [`d0ae360`](https://github.com/Anastasia-Labs/evolution-sdk/commit/d0ae360e432822796f8db9e985a894f17bf385b9) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - add canonical format

## 0.1.45

### Patch Changes

- Updated dependencies [[`95e9d98`](https://github.com/Anastasia-Labs/evolution-sdk/commit/95e9d983692e15ac114c2b4cf3496f6854d23bed)]:
  - @evolution-sdk/uplc@0.2.13

## 0.1.44

### Patch Changes

- [#321](https://github.com/Anastasia-Labs/evolution-sdk/pull/321) [`5869fe7`](https://github.com/Anastasia-Labs/evolution-sdk/commit/5869fe7e5f99892988f7f372beae004035e31179) Thanks [@hadelive](https://github.com/hadelive)! - fix register drep required wits

- Updated dependencies [[`5869fe7`](https://github.com/Anastasia-Labs/evolution-sdk/commit/5869fe7e5f99892988f7f372beae004035e31179)]:
  - @evolution-sdk/core-types@0.1.20
  - @evolution-sdk/core-utils@0.1.16
  - @evolution-sdk/plutus@0.1.26

## 0.1.43

### Patch Changes

- Updated dependencies [[`93e4784`](https://github.com/Anastasia-Labs/evolution-sdk/commit/93e4784b3397a13b197b04c4de897c455ae62088)]:
  - @evolution-sdk/core-types@0.1.19
  - @evolution-sdk/plutus@0.1.25

## 0.1.42

### Patch Changes

- [#308](https://github.com/Anastasia-Labs/evolution-sdk/pull/308) [`2afc548`](https://github.com/Anastasia-Labs/evolution-sdk/commit/2afc5485d65c7811a66339daa4c90493026cf51e) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - add governance modules

- Updated dependencies [[`2afc548`](https://github.com/Anastasia-Labs/evolution-sdk/commit/2afc5485d65c7811a66339daa4c90493026cf51e)]:
  - @evolution-sdk/core-types@0.1.18
  - @evolution-sdk/plutus@0.1.24

## 0.1.41

### Patch Changes

- [#309](https://github.com/Anastasia-Labs/evolution-sdk/pull/309) [`8ddb8c0`](https://github.com/Anastasia-Labs/evolution-sdk/commit/8ddb8c0381eb4e0a63715a6abd4aeb77bbd3c162) Thanks [@hadelive](https://github.com/hadelive)! - remove CSL dependency

- [#303](https://github.com/Anastasia-Labs/evolution-sdk/pull/303) [`020ba4f`](https://github.com/Anastasia-Labs/evolution-sdk/commit/020ba4fc869a8b41480241ced40ff827e837ab31) Thanks [@keyan-m](https://github.com/keyan-m)! - removal of asset units with 0 quantity affter `addAssets`

## 0.1.40

### Patch Changes

- [#302](https://github.com/Anastasia-Labs/evolution-sdk/pull/302) [`156c054`](https://github.com/Anastasia-Labs/evolution-sdk/commit/156c0546b15c8ea8d8a8c7c3eb1ba5d78ed60fc1) Thanks [@hadelive](https://github.com/hadelive)! - enable plutusV3

- Updated dependencies [[`156c054`](https://github.com/Anastasia-Labs/evolution-sdk/commit/156c0546b15c8ea8d8a8c7c3eb1ba5d78ed60fc1)]:
  - @evolution-sdk/uplc@0.2.12

## 0.1.39

### Patch Changes

- [#298](https://github.com/Anastasia-Labs/evolution-sdk/pull/298) [`22a9c9c`](https://github.com/Anastasia-Labs/evolution-sdk/commit/22a9c9ceda21cad992727e3f46ae5dea89a0fe7e) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - update datum serialization to cardano_node_format() (indefinite length notation)

- [#299](https://github.com/Anastasia-Labs/evolution-sdk/pull/299) [`083f991`](https://github.com/Anastasia-Labs/evolution-sdk/commit/083f991af49b1dcfe51267bf186db5100136de1d) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - fix validatorToScriptHash

- Updated dependencies [[`22a9c9c`](https://github.com/Anastasia-Labs/evolution-sdk/commit/22a9c9ceda21cad992727e3f46ae5dea89a0fe7e)]:
  - @evolution-sdk/core-types@0.1.17
  - @evolution-sdk/core-utils@0.1.15
  - @evolution-sdk/plutus@0.1.23

## 0.1.38

### Patch Changes

- [#285](https://github.com/Anastasia-Labs/evolution-sdk/pull/285) [`59a15c8`](https://github.com/Anastasia-Labs/evolution-sdk/commit/59a15c83e16c1bf22a44e1e05ff7480ef39cb631) Thanks [@hadelive](https://github.com/hadelive)! - bump cml to 6.0.1-2

- Updated dependencies [[`59a15c8`](https://github.com/Anastasia-Labs/evolution-sdk/commit/59a15c83e16c1bf22a44e1e05ff7480ef39cb631)]:
  - @evolution-sdk/core-types@0.1.16
  - @evolution-sdk/core-utils@0.1.14
  - @evolution-sdk/plutus@0.1.22

## 0.1.37

### Patch Changes

- [#268](https://github.com/Anastasia-Labs/evolution-sdk/pull/268) [`f8f905a`](https://github.com/Anastasia-Labs/evolution-sdk/commit/f8f905aeda20b30a03ba69e4b062a80a7a5be7de) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - update providers structure and improve side effects

- Updated dependencies [[`f8f905a`](https://github.com/Anastasia-Labs/evolution-sdk/commit/f8f905aeda20b30a03ba69e4b062a80a7a5be7de)]:
  - @evolution-sdk/core-types@0.1.15
  - @evolution-sdk/plutus@0.1.21

## 0.1.36

### Patch Changes

- [#258](https://github.com/Anastasia-Labs/evolution-sdk/pull/258) [`8372b50`](https://github.com/Anastasia-Labs/evolution-sdk/commit/8372b50972bd99d5cfe122ebb0bfb98908484e0d) Thanks [@hadelive](https://github.com/hadelive)! - fix emulator submitTx function

- Updated dependencies [[`8372b50`](https://github.com/Anastasia-Labs/evolution-sdk/commit/8372b50972bd99d5cfe122ebb0bfb98908484e0d)]:
  - @evolution-sdk/core-types@0.1.14
  - @evolution-sdk/plutus@0.1.20

## 0.1.35

### Patch Changes

- [#226](https://github.com/Anastasia-Labs/evolution-sdk/pull/226) [`344b8cb`](https://github.com/Anastasia-Labs/evolution-sdk/commit/344b8cbf376d59fd1b6fbf9a17ab892559bf325f) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - fix applyParamsToScript; normalize providers test; fix evaluateTx for spent transacions; fix kupmios awaitTx

## 0.1.34

### Patch Changes

- [#233](https://github.com/Anastasia-Labs/evolution-sdk/pull/233) [`803086b`](https://github.com/Anastasia-Labs/evolution-sdk/commit/803086be99793f334b8c82eb2edd739b3e57ba37) Thanks [@nikhils9](https://github.com/nikhils9)! - Fix reference script fee issues with coin selection

## 0.1.33

### Patch Changes

- Updated dependencies [[`7c25501`](https://github.com/Anastasia-Labs/evolution-sdk/commit/7c25501e5f11af8d4a1b2e36d3430bf638cb1eed)]:
  - @evolution-sdk/core-utils@0.1.13
  - @evolution-sdk/plutus@0.1.19

## 0.1.32

### Patch Changes

- Updated dependencies [[`aec1ccd`](https://github.com/Anastasia-Labs/evolution-sdk/commit/aec1ccd7659e17c07b677f1649977590b830c6bc), [`18dea56`](https://github.com/Anastasia-Labs/evolution-sdk/commit/18dea561759ad569e02af252a89c774e53b74dd7)]:
  - @evolution-sdk/core-types@0.1.13
  - @evolution-sdk/core-utils@0.1.12
  - @evolution-sdk/plutus@0.1.18

## 0.1.31

### Patch Changes

- Updated dependencies [[`c96eda2`](https://github.com/Anastasia-Labs/evolution-sdk/commit/c96eda240092a640f0884a8e3071fc5a31b89fcf)]:
  - @evolution-sdk/uplc@0.2.11

## 0.1.30

### Patch Changes

- Updated dependencies [[`f99d031`](https://github.com/Anastasia-Labs/evolution-sdk/commit/f99d031bd6ccbeffddd01e3ebf869a04978ba4e6)]:
  - @evolution-sdk/core-utils@0.1.11
  - @evolution-sdk/plutus@0.1.17

## 0.1.29

### Patch Changes

- [#208](https://github.com/Anastasia-Labs/evolution-sdk/pull/208) [`10d9f80`](https://github.com/Anastasia-Labs/evolution-sdk/commit/10d9f80695928675061fc15b9b18b1c93fb9bb4f) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - deprecate @evolution-sdk/bip39, use bip39 package instead (browser/node compatible)

- Updated dependencies [[`bf2341f`](https://github.com/Anastasia-Labs/evolution-sdk/commit/bf2341f5a5d541fe2ca468fa512e009ab32a1346), [`dc8dc0c`](https://github.com/Anastasia-Labs/evolution-sdk/commit/dc8dc0c76cf2f9666f7e4c6a2452911f4ea6b007)]:
  - @evolution-sdk/core-utils@0.1.10
  - @evolution-sdk/uplc@0.2.10
  - @evolution-sdk/plutus@0.1.16

## 0.1.28

### Patch Changes

- [#195](https://github.com/Anastasia-Labs/evolution-sdk/pull/195) [`e281b5b`](https://github.com/Anastasia-Labs/evolution-sdk/commit/e281b5bfe5da9a02e3cda35668c3a3eb18f20092) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - add refscript fee to preview

- Updated dependencies [[`e281b5b`](https://github.com/Anastasia-Labs/evolution-sdk/commit/e281b5bfe5da9a02e3cda35668c3a3eb18f20092)]:
  - @evolution-sdk/core-types@0.1.12
  - @evolution-sdk/core-utils@0.1.9
  - @evolution-sdk/plutus@0.1.15
  - @evolution-sdk/bip39@0.2.11

## 0.1.27

### Patch Changes

- [#183](https://github.com/Anastasia-Labs/evolution-sdk/pull/183) [`8ab1875`](https://github.com/Anastasia-Labs/evolution-sdk/commit/8ab187531e496bd764651328088e99fc09304ca3) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - cleanup tsconfig.json files, use base.json from typescript-config package as extends property

- Updated dependencies [[`8ab1875`](https://github.com/Anastasia-Labs/evolution-sdk/commit/8ab187531e496bd764651328088e99fc09304ca3)]:
  - @evolution-sdk/core-types@0.1.11
  - @evolution-sdk/core-utils@0.1.8
  - @evolution-sdk/plutus@0.1.14
  - @evolution-sdk/bip39@0.2.10
  - @evolution-sdk/crc8@0.1.8
  - @evolution-sdk/uplc@0.2.9

## 0.1.26

### Patch Changes

- [#169](https://github.com/Anastasia-Labs/evolution-sdk/pull/169) [`6282481`](https://github.com/Anastasia-Labs/evolution-sdk/commit/6282481a2183cfa1a3deec025552d7432cb35869) Thanks [@nikhils9](https://github.com/nikhils9)! - Auto populate input indices

- Updated dependencies [[`6282481`](https://github.com/Anastasia-Labs/evolution-sdk/commit/6282481a2183cfa1a3deec025552d7432cb35869)]:
  - @evolution-sdk/core-types@0.1.10
  - @evolution-sdk/plutus@0.1.13

## 0.1.25

### Patch Changes

- Updated dependencies [[`def34e8`](https://github.com/Anastasia-Labs/evolution-sdk/commit/def34e800af761abcd7b85ba4c6b7c65219d1891)]:
  - @evolution-sdk/bip39@0.2.9

## 0.1.24

### Patch Changes

- [#177](https://github.com/Anastasia-Labs/evolution-sdk/pull/177) [`f794a5b`](https://github.com/Anastasia-Labs/evolution-sdk/commit/f794a5bbec7d1ae39135495827ccca91e9ac9da6) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - add calculateMinLovelaceFromUTxO

## 0.1.23

### Patch Changes

- Updated dependencies [[`26dc344`](https://github.com/Anastasia-Labs/evolution-sdk/commit/26dc34466e74a8af6b6952dcd705d6f67f9660d0)]:
  - @evolution-sdk/uplc@0.2.8

## 0.1.22

### Patch Changes

- [#164](https://github.com/Anastasia-Labs/evolution-sdk/pull/164) [`7a8956f`](https://github.com/Anastasia-Labs/evolution-sdk/commit/7a8956f95a4ae08e520a8a5f0b0ea4a3eabe869a) Thanks [@itsmestale](https://github.com/itsmestale)! - -
  - remove nativeFromJson and nativeJSFromJSon, use scriptFromNative instead
  - add scriptFromCMLNative for CML Native type
  - add parseCMLNative
  - remove native.ts from lucid package
  - reallocate native.test.ts file to utils package
- Updated dependencies [[`7a8956f`](https://github.com/Anastasia-Labs/evolution-sdk/commit/7a8956f95a4ae08e520a8a5f0b0ea4a3eabe869a)]:
  - @evolution-sdk/core-types@0.1.9
  - @evolution-sdk/plutus@0.1.12

## 0.1.21

### Patch Changes

- [#158](https://github.com/Anastasia-Labs/evolution-sdk/pull/158) [`e63c233`](https://github.com/Anastasia-Labs/evolution-sdk/commit/e63c2334a86a50c3ff9e95a142a9299ed76059a3) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - fix coreToUtxo

## 0.1.20

### Patch Changes

- [#144](https://github.com/Anastasia-Labs/evolution-sdk/pull/144) [`ed554c4`](https://github.com/Anastasia-Labs/evolution-sdk/commit/ed554c45ed4664568af31a6c1cecb2eb5464cab5) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - add metadata endpoint

- Updated dependencies [[`ed554c4`](https://github.com/Anastasia-Labs/evolution-sdk/commit/ed554c45ed4664568af31a6c1cecb2eb5464cab5)]:
  - @evolution-sdk/core-types@0.1.8
  - @evolution-sdk/core-utils@0.1.7
  - @evolution-sdk/plutus@0.1.11
  - @evolution-sdk/bip39@0.2.8
  - @evolution-sdk/crc8@0.1.7
  - @evolution-sdk/uplc@0.2.7

## 0.1.19

### Patch Changes

- [#151](https://github.com/Anastasia-Labs/evolution-sdk/pull/151) [`5760851`](https://github.com/Anastasia-Labs/evolution-sdk/commit/57608517cd86e8e72b577fc34f5ae0d3d37f9a74) Thanks [@nikhils9](https://github.com/nikhils9)! - Fixes to support UTF-8 incompatible asset names

## 0.1.18

### Patch Changes

- Updated dependencies [[`eef3d42`](https://github.com/Anastasia-Labs/evolution-sdk/commit/eef3d421b4cdf12638169ece49e4c00fce6e3356)]:
  - @evolution-sdk/core-types@0.1.7
  - @evolution-sdk/uplc@0.2.6
  - @evolution-sdk/plutus@0.1.10

## 0.1.17

### Patch Changes

- [#136](https://github.com/Anastasia-Labs/evolution-sdk/pull/136) [`c35f159`](https://github.com/Anastasia-Labs/evolution-sdk/commit/c35f159e0446b53fb6f91494b4c0da6587dcf32b) Thanks [@nikhils9](https://github.com/nikhils9)! - Coin selection fixes and few updates

## 0.1.16

### Patch Changes

- [#137](https://github.com/Anastasia-Labs/evolution-sdk/pull/137) [`aeb4bba`](https://github.com/Anastasia-Labs/evolution-sdk/commit/aeb4bba266fdeab1e47d3911413f30e749bfe564) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - add collateral coin selection

## 0.1.15

### Patch Changes

- [#126](https://github.com/Anastasia-Labs/evolution-sdk/pull/126) [`11eb043`](https://github.com/Anastasia-Labs/evolution-sdk/commit/11eb043bb7ecf2b0913c6edc1642c7b50808cab5) Thanks [@nikhils9](https://github.com/nikhils9)! - Fix assetsToValue to support non UTF-8 Asset Names

## 0.1.14

### Patch Changes

- [#124](https://github.com/Anastasia-Labs/evolution-sdk/pull/124) [`25b0416`](https://github.com/Anastasia-Labs/evolution-sdk/commit/25b0416e597edb44bf160c1d3086041b7b4117ff) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - remove toSorted function, use normal sort

## 0.1.13

### Patch Changes

- [#121](https://github.com/Anastasia-Labs/evolution-sdk/pull/121) [`a84ac5f`](https://github.com/Anastasia-Labs/evolution-sdk/commit/a84ac5f8dcaf699fa5e19ec55b9716a881d649bd) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - selecting utxos can be done to ordered/unordered list

## 0.1.12

### Patch Changes

- [#119](https://github.com/Anastasia-Labs/evolution-sdk/pull/119) [`d0446f2`](https://github.com/Anastasia-Labs/evolution-sdk/commit/d0446f2e2ce9d91e6e514cba97c9ba101c83b66b) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - add coin selection algorithm, input selection is done in descending order

## 0.1.11

### Patch Changes

- [#117](https://github.com/Anastasia-Labs/evolution-sdk/pull/117) [`a5cfe27`](https://github.com/Anastasia-Labs/evolution-sdk/commit/a5cfe27dce663f84d07cd0e18ff7f011612e0d59) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - add applyParamsToScript; add contract specs using aiken

## 0.1.10

### Patch Changes

- [#110](https://github.com/Anastasia-Labs/evolution-sdk/pull/110) [`d3268d5`](https://github.com/Anastasia-Labs/evolution-sdk/commit/d3268d5886cae2c5619ed409ec53458b1fbd426f) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - improve pay module when dealing with Assets

## 0.1.9

### Patch Changes

- [#91](https://github.com/Anastasia-Labs/evolution-sdk/pull/91) [`05a492f`](https://github.com/Anastasia-Labs/evolution-sdk/commit/05a492ff90199758088bcc6536cc62f5f85040a8) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - add browser support

- Updated dependencies [[`05a492f`](https://github.com/Anastasia-Labs/evolution-sdk/commit/05a492ff90199758088bcc6536cc62f5f85040a8)]:
  - @evolution-sdk/core-types@0.1.6
  - @evolution-sdk/core-utils@0.1.6
  - @evolution-sdk/plutus@0.1.9
  - @evolution-sdk/bip39@0.2.7
  - @evolution-sdk/crc8@0.1.6

## 0.1.8

### Patch Changes

- [#86](https://github.com/Anastasia-Labs/evolution-sdk/pull/86) [`6eacab5`](https://github.com/Anastasia-Labs/evolution-sdk/commit/6eacab5c108485877879a2deffd2f8a1369ac172) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - - fix: use TransactionOutputBuilder.() instead of TransactionOutput.new()

  - test: enable all preprod tests
  - test: update test
  - refactor: code structure
  - test: add hello contract test using retry implementation

- [#86](https://github.com/Anastasia-Labs/evolution-sdk/pull/86) [`a8abb5d`](https://github.com/Anastasia-Labs/evolution-sdk/commit/a8abb5df4b6d233e314a36f0948c95ab15f784bb) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - refactor code

## 0.1.7

### Patch Changes

- [#84](https://github.com/Anastasia-Labs/evolution-sdk/pull/84) [`2fb5635`](https://github.com/Anastasia-Labs/evolution-sdk/commit/2fb56356fbdfc41c5dc7328456559c8aaf8dbf15) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - - refactor: fetch wallet utxos only once
  - refactor: change code structure
  - refactor: move CML to core file
  - refactor: set core file for CML lib
  - build(upgrade): bump packages version
- Updated dependencies [[`2fb5635`](https://github.com/Anastasia-Labs/evolution-sdk/commit/2fb56356fbdfc41c5dc7328456559c8aaf8dbf15)]:
  - @evolution-sdk/core-types@0.1.5
  - @evolution-sdk/core-utils@0.1.5
  - @evolution-sdk/plutus@0.1.8
  - @evolution-sdk/bip39@0.2.6
  - @evolution-sdk/crc8@0.1.5

## 0.1.6

### Patch Changes

- [#76](https://github.com/Anastasia-Labs/evolution-sdk/pull/76) [`ed27a6f`](https://github.com/Anastasia-Labs/evolution-sdk/commit/ed27a6fe707767dfc9332e242a8af939fc286db2) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - bump versions

## 0.1.5

### Patch Changes

- [#72](https://github.com/Anastasia-Labs/evolution-sdk/pull/72) [`459df3e`](https://github.com/Anastasia-Labs/evolution-sdk/commit/459df3e95fd55ccdf48fc9cd63e850c053d2f470) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - bump all packages

- Updated dependencies [[`459df3e`](https://github.com/Anastasia-Labs/evolution-sdk/commit/459df3e95fd55ccdf48fc9cd63e850c053d2f470)]:
  - @evolution-sdk/bip39@0.2.5
  - @evolution-sdk/core-types@0.1.4
  - @evolution-sdk/core-utils@0.1.4
  - @evolution-sdk/crc8@0.1.4
  - @evolution-sdk/plutus@0.1.7

## 0.1.4

### Patch Changes

- [#51](https://github.com/Anastasia-Labs/evolution-sdk/pull/51) [`bcda3fc`](https://github.com/Anastasia-Labs/evolution-sdk/commit/bcda3fc3ca9dc13e93ef95929af2fe6fd0937e60) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - Introduced a new function, applyDoubleCborEncoding, which offers double bytestring encoding capability to scripts.
  Notably, this function was previously dependent on `lucid-cardano`, but now our package is completely detached from it.
- Updated dependencies [[`70a5b80`](https://github.com/Anastasia-Labs/evolution-sdk/commit/70a5b809903f1e0dbef96ff6e5d32d8507ed442d), [`8522fa7`](https://github.com/Anastasia-Labs/evolution-sdk/commit/8522fa7a09cdec0cdd240fd76230b3dd0ce1b2a6)]:
  - @evolution-sdk/bip39@0.2.4

## 0.1.3

### Patch Changes

- [#49](https://github.com/Anastasia-Labs/evolution-sdk/pull/49) [`484a3c6`](https://github.com/Anastasia-Labs/evolution-sdk/commit/484a3c6bf273cedc0aa914eccebb4d78d633bdf4) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - - bump CMl version 5.2
  - remove toCMLTransactionHash , use CML.hash_transaction which is the fixed function from CML 5.2
- Updated dependencies [[`484a3c6`](https://github.com/Anastasia-Labs/evolution-sdk/commit/484a3c6bf273cedc0aa914eccebb4d78d633bdf4)]:
  - @evolution-sdk/core-types@0.1.3
  - @evolution-sdk/core-utils@0.1.3
  - @evolution-sdk/plutus@0.1.6
  - @evolution-sdk/bip39@0.2.3
  - @evolution-sdk/crc8@0.1.3

## 0.1.2

### Patch Changes

- [#47](https://github.com/Anastasia-Labs/evolution-sdk/pull/47) [`67b178b`](https://github.com/Anastasia-Labs/evolution-sdk/commit/67b178be520f53fe6901cac2c8573170408f861a) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - move key packages to dependencies

- Updated dependencies [[`67b178b`](https://github.com/Anastasia-Labs/evolution-sdk/commit/67b178be520f53fe6901cac2c8573170408f861a)]:
  - @evolution-sdk/core-types@0.1.2
  - @evolution-sdk/core-utils@0.1.2
  - @evolution-sdk/plutus@0.1.5
  - @evolution-sdk/bip39@0.2.2
  - @evolution-sdk/crc8@0.1.2

## 0.1.1

### Patch Changes

- [#45](https://github.com/Anastasia-Labs/evolution-sdk/pull/45) [`0f2e140`](https://github.com/Anastasia-Labs/evolution-sdk/commit/0f2e1404e4a476b5003f2937c01943ffd536fbd4) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - add dual export

## 0.1.0

### Minor Changes

- [#36](https://github.com/Anastasia-Labs/evolution-sdk/pull/36) [`fea08c4`](https://github.com/Anastasia-Labs/evolution-sdk/commit/fea08c44cdc52e58ed7a20ab4dc2566e708e8a21) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - fix building

## 0.1.0-alpha.0

### Minor Changes

- add toCMLTransactionHash function
