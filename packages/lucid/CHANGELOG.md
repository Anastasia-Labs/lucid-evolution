# @lucid-evolution/lucid

## 0.4.24

### Patch Changes

- [#538](https://github.com/Anastasia-Labs/lucid-evolution/pull/538) [`9503425`](https://github.com/Anastasia-Labs/lucid-evolution/commit/95034257fb3edda5605a76054fdfc70d51640441) Thanks [@hadelive](https://github.com/hadelive)! - expose drepIDToCredential

- Updated dependencies [[`9503425`](https://github.com/Anastasia-Labs/lucid-evolution/commit/95034257fb3edda5605a76054fdfc70d51640441)]:
  - @lucid-evolution/utils@0.1.65
  - @lucid-evolution/provider@0.1.88
  - @lucid-evolution/wallet@0.1.71

## 0.4.23

### Patch Changes

- [#522](https://github.com/Anastasia-Labs/lucid-evolution/pull/522) [`7c3591c`](https://github.com/Anastasia-Labs/lucid-evolution/commit/7c3591cc3136b6a429d4c86224c4d8c4ab86bcc3) Thanks [@hadelive](https://github.com/hadelive)! - fix compose minting transactions

- [#505](https://github.com/Anastasia-Labs/lucid-evolution/pull/505) [`39559d1`](https://github.com/Anastasia-Labs/lucid-evolution/commit/39559d17954a9e5d07d54acad69558a9522397ca) Thanks [@hadelive](https://github.com/hadelive)! - Added Math.ceil to round up floating-point fee calculations before converting to BigInt. This fixes an issue where BigInt was being created from non-integer values, which could lead to runtime errors.

## 0.4.22

### Patch Changes

- [#493](https://github.com/Anastasia-Labs/lucid-evolution/pull/493) [`9ad2c36`](https://github.com/Anastasia-Labs/lucid-evolution/commit/9ad2c366e4647423adc7a81753fd084255358709) Thanks [@hadelive](https://github.com/hadelive)! - drepid to credential

- [#478](https://github.com/Anastasia-Labs/lucid-evolution/pull/478) [`d7bed7f`](https://github.com/Anastasia-Labs/lucid-evolution/commit/d7bed7fa15939e852811f5abc7ab928c7c303718) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - improve emulator test structure; update emulator provider; upgrade effect dependency at lucid package

- Updated dependencies [[`d7bed7f`](https://github.com/Anastasia-Labs/lucid-evolution/commit/d7bed7fa15939e852811f5abc7ab928c7c303718)]:
  - @lucid-evolution/provider@0.1.87

## 0.4.21

### Patch Changes

- [#485](https://github.com/Anastasia-Labs/lucid-evolution/pull/485) [`2335ef1`](https://github.com/Anastasia-Labs/lucid-evolution/commit/2335ef101f8a5d2a92324c7fd8536d5d8927531e) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - attempt to fix drep issue

- Updated dependencies [[`2335ef1`](https://github.com/Anastasia-Labs/lucid-evolution/commit/2335ef101f8a5d2a92324c7fd8536d5d8927531e), [`09a41ae`](https://github.com/Anastasia-Labs/lucid-evolution/commit/09a41ae8b7030dd3f4e04d6721e1d9fa77e02b12)]:
  - @lucid-evolution/core-types@0.1.22
  - @lucid-evolution/uplc@0.2.19
  - @lucid-evolution/plutus@0.1.29
  - @lucid-evolution/provider@0.1.86
  - @lucid-evolution/sign_data@0.1.25
  - @lucid-evolution/utils@0.1.64
  - @lucid-evolution/wallet@0.1.70

## 0.4.20

### Patch Changes

- [#475](https://github.com/Anastasia-Labs/lucid-evolution/pull/475) [`377add4`](https://github.com/Anastasia-Labs/lucid-evolution/commit/377add4ac84ec8e278485426e92e9dabe1826593) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - Previously, readFrom directly used TxBuilderConfig as input, which contradicted the builder design, where all TxBuilder modules are effect types and depend on TxConfig as Context. This mismatch led to conflicts with the compose API.

  To resolve this, TxConfig is now passed via dependency injection, aligning readFrom with the effect-driven architecture of the TxBuilder modules.

## 0.4.19

### Patch Changes

- [#472](https://github.com/Anastasia-Labs/lucid-evolution/pull/472) [`0342519`](https://github.com/Anastasia-Labs/lucid-evolution/commit/0342519266ca6ff9e96c1e646f7150b78ba095a8) Thanks [@hadelive](https://github.com/hadelive)! - support esd,cjs

- Updated dependencies [[`0342519`](https://github.com/Anastasia-Labs/lucid-evolution/commit/0342519266ca6ff9e96c1e646f7150b78ba095a8)]:
  - @lucid-evolution/utils@0.1.63
  - @lucid-evolution/provider@0.1.85
  - @lucid-evolution/wallet@0.1.69

## 0.4.18

### Patch Changes

- [#459](https://github.com/Anastasia-Labs/lucid-evolution/pull/459) [`59b51f9`](https://github.com/Anastasia-Labs/lucid-evolution/commit/59b51f96f4201d464b91ec44467963789f7b9983) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - UTXO handling to normalize entries containing both a `datum` and `datumHash`.
  The `datum` field is now removed when a `datumHash` is present to ensure consistency and avoid errors during transaction evaluation.
- Updated dependencies [[`59b51f9`](https://github.com/Anastasia-Labs/lucid-evolution/commit/59b51f96f4201d464b91ec44467963789f7b9983)]:
  - @lucid-evolution/utils@0.1.62
  - @lucid-evolution/provider@0.1.84
  - @lucid-evolution/wallet@0.1.68

## 0.4.17

### Patch Changes

- Updated dependencies [[`855cc2a`](https://github.com/Anastasia-Labs/lucid-evolution/commit/855cc2a55f4789571cdfa1adaa25948fa49ece30)]:
  - @lucid-evolution/provider@0.1.83

## 0.4.16

### Patch Changes

- Updated dependencies [[`9e8cfc6`](https://github.com/Anastasia-Labs/lucid-evolution/commit/9e8cfc6c47fb3d6e45f397f944321c2fe5cf610a)]:
  - @lucid-evolution/utils@0.1.61
  - @lucid-evolution/provider@0.1.82
  - @lucid-evolution/wallet@0.1.67

## 0.4.15

### Patch Changes

- [#444](https://github.com/Anastasia-Labs/lucid-evolution/pull/444) [`d6870fb`](https://github.com/Anastasia-Labs/lucid-evolution/commit/d6870fbbd478fae445f33b1841180f7124ac0ce8) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - allow undefined datum output

- [#443](https://github.com/Anastasia-Labs/lucid-evolution/pull/443) [`dd3bd77`](https://github.com/Anastasia-Labs/lucid-evolution/commit/dd3bd772f59fc774c32b140e1e06314df2c69e4b) Thanks [@nikhils9](https://github.com/nikhils9)! - Fix `unixTimeToSlot` for Custom network

- Updated dependencies [[`8622e93`](https://github.com/Anastasia-Labs/lucid-evolution/commit/8622e93a002c4e9bc797d9e2e5d6804f573d1261), [`a375179`](https://github.com/Anastasia-Labs/lucid-evolution/commit/a375179960e0d17a17d97474c53b9f285c9d5ad0), [`dd3bd77`](https://github.com/Anastasia-Labs/lucid-evolution/commit/dd3bd772f59fc774c32b140e1e06314df2c69e4b)]:
  - @lucid-evolution/wallet@0.1.66
  - @lucid-evolution/uplc@0.2.18
  - @lucid-evolution/utils@0.1.60
  - @lucid-evolution/provider@0.1.81

## 0.4.14

### Patch Changes

- [#436](https://github.com/Anastasia-Labs/lucid-evolution/pull/436) [`6844e1e`](https://github.com/Anastasia-Labs/lucid-evolution/commit/6844e1ebc5f2bdb2ef7987d67e926cb8f4d8d427) Thanks [@hadelive](https://github.com/hadelive)! - minimum fee used in collateral calc

- Updated dependencies [[`6844e1e`](https://github.com/Anastasia-Labs/lucid-evolution/commit/6844e1ebc5f2bdb2ef7987d67e926cb8f4d8d427)]:
  - @lucid-evolution/provider@0.1.80

## 0.4.13

### Patch Changes

- Updated dependencies [[`4e01e51`](https://github.com/Anastasia-Labs/lucid-evolution/commit/4e01e51b2afba34d3ef1d089722a1294c7f253bc)]:
  - @lucid-evolution/provider@0.1.79

## 0.4.12

### Patch Changes

- Updated dependencies [[`87dbc3a`](https://github.com/Anastasia-Labs/lucid-evolution/commit/87dbc3a93c2181ec26f984ac6e5bb73b6e1553c5)]:
  - @lucid-evolution/provider@0.1.78

## 0.4.11

### Patch Changes

- [#427](https://github.com/Anastasia-Labs/lucid-evolution/pull/427) [`3e5b782`](https://github.com/Anastasia-Labs/lucid-evolution/commit/3e5b78248560b7545c0d807de84168b66caed39d) Thanks [@hadelive](https://github.com/hadelive)! - default burnable lovelace

## 0.4.10

### Patch Changes

- [#423](https://github.com/Anastasia-Labs/lucid-evolution/pull/423) [`d51efd2`](https://github.com/Anastasia-Labs/lucid-evolution/commit/d51efd29f9b8637b9ec05e4ee8556451727a3442) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - enforce single encoding for tx evaluation in providerrs; fix blockfrost redeemer labels

- Updated dependencies [[`d51efd2`](https://github.com/Anastasia-Labs/lucid-evolution/commit/d51efd29f9b8637b9ec05e4ee8556451727a3442)]:
  - @lucid-evolution/provider@0.1.77
  - @lucid-evolution/utils@0.1.59
  - @lucid-evolution/wallet@0.1.65

## 0.4.9

### Patch Changes

- [#420](https://github.com/Anastasia-Labs/lucid-evolution/pull/420) [`f8bf954`](https://github.com/Anastasia-Labs/lucid-evolution/commit/f8bf954959518f3dd96837a619cd96c6d3048944) Thanks [@hadelive](https://github.com/hadelive)! - fix double cbor encoding

- Updated dependencies [[`f8bf954`](https://github.com/Anastasia-Labs/lucid-evolution/commit/f8bf954959518f3dd96837a619cd96c6d3048944)]:
  - @lucid-evolution/provider@0.1.76
  - @lucid-evolution/utils@0.1.58
  - @lucid-evolution/wallet@0.1.64

## 0.4.8

### Patch Changes

- [#418](https://github.com/Anastasia-Labs/lucid-evolution/pull/418) [`45a541f`](https://github.com/Anastasia-Labs/lucid-evolution/commit/45a541ff10fd8ddf21036848c7b67e380e36518f) Thanks [@hadelive](https://github.com/hadelive)! - double cbor encoding

- Updated dependencies [[`45a541f`](https://github.com/Anastasia-Labs/lucid-evolution/commit/45a541ff10fd8ddf21036848c7b67e380e36518f)]:
  - @lucid-evolution/provider@0.1.75
  - @lucid-evolution/utils@0.1.57
  - @lucid-evolution/wallet@0.1.63

## 0.4.7

### Patch Changes

- [#413](https://github.com/Anastasia-Labs/lucid-evolution/pull/413) [`898777b`](https://github.com/Anastasia-Labs/lucid-evolution/commit/898777beac2e10ca176a9c7bc6295a3af1bc8a60) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - Enable the creation of a Lucid instance with undefined providers and networks.

## 0.4.6

### Patch Changes

- [#410](https://github.com/Anastasia-Labs/lucid-evolution/pull/410) [`2ef5e3c`](https://github.com/Anastasia-Labs/lucid-evolution/commit/2ef5e3c166799e3d7eeeb642205a33a27ab2c324) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - supports single and double cbor encoding

- Updated dependencies [[`7857343`](https://github.com/Anastasia-Labs/lucid-evolution/commit/785734347e5b4d99a20866f715884f5c7e9a2d0c), [`2ef5e3c`](https://github.com/Anastasia-Labs/lucid-evolution/commit/2ef5e3c166799e3d7eeeb642205a33a27ab2c324)]:
  - @lucid-evolution/utils@0.1.56
  - @lucid-evolution/provider@0.1.74
  - @lucid-evolution/wallet@0.1.62

## 0.4.5

### Patch Changes

- [#406](https://github.com/Anastasia-Labs/lucid-evolution/pull/406) [`18c3c4d`](https://github.com/Anastasia-Labs/lucid-evolution/commit/18c3c4d3676fa12d631b177116d93c35896ecea4) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - fix cbor encoding/decoding in browser, installed cbor-x

- Updated dependencies [[`18c3c4d`](https://github.com/Anastasia-Labs/lucid-evolution/commit/18c3c4d3676fa12d631b177116d93c35896ecea4)]:
  - @lucid-evolution/utils@0.1.55
  - @lucid-evolution/provider@0.1.73
  - @lucid-evolution/wallet@0.1.61

## 0.4.4

### Patch Changes

- [#402](https://github.com/Anastasia-Labs/lucid-evolution/pull/402) [`f304a79`](https://github.com/Anastasia-Labs/lucid-evolution/commit/f304a798fbc0b48e5005867bea103ce4046608d6) Thanks [@hadelive](https://github.com/hadelive)! - cjs compatible

- Updated dependencies [[`f304a79`](https://github.com/Anastasia-Labs/lucid-evolution/commit/f304a798fbc0b48e5005867bea103ce4046608d6)]:
  - @lucid-evolution/provider@0.1.72
  - @lucid-evolution/utils@0.1.54
  - @lucid-evolution/wallet@0.1.60

## 0.4.3

### Patch Changes

- [#397](https://github.com/Anastasia-Labs/lucid-evolution/pull/397) [`0e5e891`](https://github.com/Anastasia-Labs/lucid-evolution/commit/0e5e89143e28957144466863a3518761f2ef71ee) Thanks [@hadelive](https://github.com/hadelive)! - fix compose

## 0.4.2

### Patch Changes

- [#392](https://github.com/Anastasia-Labs/lucid-evolution/pull/392) [`56f2d6f`](https://github.com/Anastasia-Labs/lucid-evolution/commit/56f2d6f47fed754accbdc8988014d12bb1319cce) Thanks [@hadelive](https://github.com/hadelive)! - inlude tiny change in fee

## 0.4.1

### Patch Changes

- [#389](https://github.com/Anastasia-Labs/lucid-evolution/pull/389) [`23f1fdd`](https://github.com/Anastasia-Labs/lucid-evolution/commit/23f1fddf74b131a4f6ee28e8c4d7020bf62d8bcc) Thanks [@sourabhxyz](https://github.com/sourabhxyz)! - add collateral only when Script is not NativeScript

## 0.4.0

### Minor Changes

- [#383](https://github.com/Anastasia-Labs/lucid-evolution/pull/383) [`0baf07f`](https://github.com/Anastasia-Labs/lucid-evolution/commit/0baf07fa5c0affadabdc7b8b581d3e4c6260960f) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - Make I/O-bound computations optional by allowing preset protocol parameters during Lucid initialization and preset wallet UTXOs during transaction building. Updated Effect library to the latest version.

### Patch Changes

- Updated dependencies [[`0baf07f`](https://github.com/Anastasia-Labs/lucid-evolution/commit/0baf07fa5c0affadabdc7b8b581d3e4c6260960f)]:
  - @lucid-evolution/provider@0.1.71
  - @lucid-evolution/utils@0.1.53
  - @lucid-evolution/wallet@0.1.59

## 0.3.53

### Patch Changes

- Updated dependencies [[`ca75789`](https://github.com/Anastasia-Labs/lucid-evolution/commit/ca75789d60316387b08404d25d6181921e3b9c9a)]:
  - @lucid-evolution/utils@0.1.52
  - @lucid-evolution/provider@0.1.70
  - @lucid-evolution/wallet@0.1.58

## 0.3.52

### Patch Changes

- [#378](https://github.com/Anastasia-Labs/lucid-evolution/pull/378) [`fbb2404`](https://github.com/Anastasia-Labs/lucid-evolution/commit/fbb2404465673d71488a86594640eb5e4246a57d) Thanks [@hadelive](https://github.com/hadelive)! - support map redeemer

- Updated dependencies [[`fbb2404`](https://github.com/Anastasia-Labs/lucid-evolution/commit/fbb2404465673d71488a86594640eb5e4246a57d)]:
  - @lucid-evolution/provider@0.1.69

## 0.3.51

### Patch Changes

- [#373](https://github.com/Anastasia-Labs/lucid-evolution/pull/373) [`bcea535`](https://github.com/Anastasia-Labs/lucid-evolution/commit/bcea535356fa72e6582d02a4c8aea2cd0e614e42) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - expose CML.Transaction; set constitutionalCommitteeMinSize as optional type schema

- Updated dependencies [[`bcea535`](https://github.com/Anastasia-Labs/lucid-evolution/commit/bcea535356fa72e6582d02a4c8aea2cd0e614e42)]:
  - @lucid-evolution/provider@0.1.68

## 0.3.50

### Patch Changes

- Updated dependencies [[`d60c249`](https://github.com/Anastasia-Labs/lucid-evolution/commit/d60c24906fa0133b993185d86d3834a159c79a27)]:
  - @lucid-evolution/provider@0.1.67

## 0.3.49

### Patch Changes

- [#366](https://github.com/Anastasia-Labs/lucid-evolution/pull/366) [`fe6beb0`](https://github.com/Anastasia-Labs/lucid-evolution/commit/fe6beb024053f262b0441ea1777eddee1b90e07d) Thanks [@hadelive](https://github.com/hadelive)! - update process certs

## 0.3.48

### Patch Changes

- [#364](https://github.com/Anastasia-Labs/lucid-evolution/pull/364) [`9b6312d`](https://github.com/Anastasia-Labs/lucid-evolution/commit/9b6312d319c3cd378030fc72e974403becb0257b) Thanks [@hadelive](https://github.com/hadelive)! - update script cert

## 0.3.47

### Patch Changes

- [#359](https://github.com/Anastasia-Labs/lucid-evolution/pull/359) [`cb6476b`](https://github.com/Anastasia-Labs/lucid-evolution/commit/cb6476be9455f9d3fc599cda450c9ec5bbe5a500) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - add return .lucidConfig()

## 0.3.46

### Patch Changes

- [#357](https://github.com/Anastasia-Labs/lucid-evolution/pull/357) [`974c5ef`](https://github.com/Anastasia-Labs/lucid-evolution/commit/974c5efb56db592ed4bc3c84ca3b5a4659182a51) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - add canonical format option

- Updated dependencies [[`974c5ef`](https://github.com/Anastasia-Labs/lucid-evolution/commit/974c5efb56db592ed4bc3c84ca3b5a4659182a51)]:
  - @lucid-evolution/plutus@0.1.28
  - @lucid-evolution/utils@0.1.51
  - @lucid-evolution/provider@0.1.66
  - @lucid-evolution/wallet@0.1.57

## 0.3.45

### Patch Changes

- Updated dependencies [[`310559c`](https://github.com/Anastasia-Labs/lucid-evolution/commit/310559c2241c3fd4564b33db8f46fd2fc1d5e936)]:
  - @lucid-evolution/uplc@0.2.17
  - @lucid-evolution/utils@0.1.50
  - @lucid-evolution/provider@0.1.65
  - @lucid-evolution/wallet@0.1.56

## 0.3.44

### Patch Changes

- [#348](https://github.com/Anastasia-Labs/lucid-evolution/pull/348) [`7f9c1a4`](https://github.com/Anastasia-Labs/lucid-evolution/commit/7f9c1a4e23bdfe934e22865d364651936c183070) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - set collateral option

## 0.3.43

### Patch Changes

- [#346](https://github.com/Anastasia-Labs/lucid-evolution/pull/346) [`d3b97fe`](https://github.com/Anastasia-Labs/lucid-evolution/commit/d3b97fe49d164e62ebd56b80da1767d4fe10a106) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - execute programs when returning config()

## 0.3.42

### Patch Changes

- [#343](https://github.com/Anastasia-Labs/lucid-evolution/pull/343) [`54ef5c2`](https://github.com/Anastasia-Labs/lucid-evolution/commit/54ef5c23b173dd43f9e86089c7a95acb0c7a42eb) Thanks [@hadelive](https://github.com/hadelive)! - support native-script stake

## 0.3.41

### Patch Changes

- Updated dependencies [[`33135ed`](https://github.com/Anastasia-Labs/lucid-evolution/commit/33135ed8532a3140025751cbc7e1b7efae74545d)]:
  - @lucid-evolution/uplc@0.2.16
  - @lucid-evolution/utils@0.1.49
  - @lucid-evolution/provider@0.1.64
  - @lucid-evolution/wallet@0.1.55

## 0.3.40

### Patch Changes

- [#337](https://github.com/Anastasia-Labs/lucid-evolution/pull/337) [`ad4e56f`](https://github.com/Anastasia-Labs/lucid-evolution/commit/ad4e56f9556e99b6b534dd476ca5fc38f6fcd3d6) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - update aiken uplc to 1.1.3; add redeemer utils; update redeemer types

- Updated dependencies [[`ad4e56f`](https://github.com/Anastasia-Labs/lucid-evolution/commit/ad4e56f9556e99b6b534dd476ca5fc38f6fcd3d6)]:
  - @lucid-evolution/core-types@0.1.21
  - @lucid-evolution/provider@0.1.63
  - @lucid-evolution/utils@0.1.48
  - @lucid-evolution/uplc@0.2.15
  - @lucid-evolution/plutus@0.1.27
  - @lucid-evolution/sign_data@0.1.24
  - @lucid-evolution/wallet@0.1.54

## 0.3.39

### Patch Changes

- Updated dependencies [[`2e25677`](https://github.com/Anastasia-Labs/lucid-evolution/commit/2e256779181e0f79ccbf0f1eaaae432795d4315d)]:
  - @lucid-evolution/uplc@0.2.14
  - @lucid-evolution/utils@0.1.47
  - @lucid-evolution/provider@0.1.62
  - @lucid-evolution/wallet@0.1.53

## 0.3.38

### Patch Changes

- [#331](https://github.com/Anastasia-Labs/lucid-evolution/pull/331) [`5f573dd`](https://github.com/Anastasia-Labs/lucid-evolution/commit/5f573dddf53fa711f69cbdff42ede4aea61ffcbc) Thanks [@nikhils9](https://github.com/nikhils9)! - Fix `RedeemerBuilder` issue with `mintAssets`

## 0.3.37

### Patch Changes

- [#330](https://github.com/Anastasia-Labs/lucid-evolution/pull/330) [`876fee9`](https://github.com/Anastasia-Labs/lucid-evolution/commit/876fee988089ec56355a68f0279899c1d299b9cc) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - fix toOgmiosAssets

- [#333](https://github.com/Anastasia-Labs/lucid-evolution/pull/333) [`d0ae360`](https://github.com/Anastasia-Labs/lucid-evolution/commit/d0ae360e432822796f8db9e985a894f17bf385b9) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - add canonical format

- Updated dependencies [[`876fee9`](https://github.com/Anastasia-Labs/lucid-evolution/commit/876fee988089ec56355a68f0279899c1d299b9cc), [`d0ae360`](https://github.com/Anastasia-Labs/lucid-evolution/commit/d0ae360e432822796f8db9e985a894f17bf385b9)]:
  - @lucid-evolution/provider@0.1.61
  - @lucid-evolution/utils@0.1.46
  - @lucid-evolution/wallet@0.1.52

## 0.3.36

### Patch Changes

- Updated dependencies [[`95e9d98`](https://github.com/Anastasia-Labs/lucid-evolution/commit/95e9d983692e15ac114c2b4cf3496f6854d23bed)]:
  - @lucid-evolution/uplc@0.2.13
  - @lucid-evolution/utils@0.1.45
  - @lucid-evolution/provider@0.1.60
  - @lucid-evolution/wallet@0.1.51

## 0.3.35

### Patch Changes

- Updated dependencies [[`a85ae4d`](https://github.com/Anastasia-Labs/lucid-evolution/commit/a85ae4d386287359c734b8342f50a5082ecf1625)]:
  - @lucid-evolution/provider@0.1.59

## 0.3.34

### Patch Changes

- [#323](https://github.com/Anastasia-Labs/lucid-evolution/pull/323) [`a1b58a9`](https://github.com/Anastasia-Labs/lucid-evolution/commit/a1b58a9992c65da63e9ed4f28cbd5a4f31f299be) Thanks [@hadelive](https://github.com/hadelive)! - update committee certs

## 0.3.33

### Patch Changes

- [#321](https://github.com/Anastasia-Labs/lucid-evolution/pull/321) [`5869fe7`](https://github.com/Anastasia-Labs/lucid-evolution/commit/5869fe7e5f99892988f7f372beae004035e31179) Thanks [@hadelive](https://github.com/hadelive)! - fix register drep required wits

- Updated dependencies [[`5869fe7`](https://github.com/Anastasia-Labs/lucid-evolution/commit/5869fe7e5f99892988f7f372beae004035e31179)]:
  - @lucid-evolution/core-types@0.1.20
  - @lucid-evolution/core-utils@0.1.16
  - @lucid-evolution/sign_data@0.1.23
  - @lucid-evolution/provider@0.1.58
  - @lucid-evolution/plutus@0.1.26
  - @lucid-evolution/wallet@0.1.50
  - @lucid-evolution/utils@0.1.44

## 0.3.32

### Patch Changes

- [`0d5831e`](https://github.com/Anastasia-Labs/lucid-evolution/commit/0d5831e1aee73f780cee800ff33c25be8da19123) Thanks [@hadelive](https://github.com/hadelive)! - skip reg drep witness

## 0.3.31

### Patch Changes

- Updated dependencies [[`93e4784`](https://github.com/Anastasia-Labs/lucid-evolution/commit/93e4784b3397a13b197b04c4de897c455ae62088)]:
  - @lucid-evolution/core-types@0.1.19
  - @lucid-evolution/plutus@0.1.25
  - @lucid-evolution/provider@0.1.57
  - @lucid-evolution/sign_data@0.1.22
  - @lucid-evolution/utils@0.1.43
  - @lucid-evolution/wallet@0.1.49

## 0.3.30

### Patch Changes

- [#313](https://github.com/Anastasia-Labs/lucid-evolution/pull/313) [`76af78f`](https://github.com/Anastasia-Labs/lucid-evolution/commit/76af78fedb6a41400bb1204596e0ef39953ce82c) Thanks [@hadelive](https://github.com/hadelive)! - Add governance certs

- Updated dependencies [[`76af78f`](https://github.com/Anastasia-Labs/lucid-evolution/commit/76af78fedb6a41400bb1204596e0ef39953ce82c)]:
  - @lucid-evolution/wallet@0.1.48
  - @lucid-evolution/provider@0.1.56

## 0.3.29

### Patch Changes

- [#308](https://github.com/Anastasia-Labs/lucid-evolution/pull/308) [`2afc548`](https://github.com/Anastasia-Labs/lucid-evolution/commit/2afc5485d65c7811a66339daa4c90493026cf51e) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - add governance modules

- Updated dependencies [[`2afc548`](https://github.com/Anastasia-Labs/lucid-evolution/commit/2afc5485d65c7811a66339daa4c90493026cf51e)]:
  - @lucid-evolution/core-types@0.1.18
  - @lucid-evolution/provider@0.1.55
  - @lucid-evolution/wallet@0.1.47
  - @lucid-evolution/utils@0.1.42
  - @lucid-evolution/plutus@0.1.24
  - @lucid-evolution/sign_data@0.1.21

## 0.3.28

### Patch Changes

- [#309](https://github.com/Anastasia-Labs/lucid-evolution/pull/309) [`8ddb8c0`](https://github.com/Anastasia-Labs/lucid-evolution/commit/8ddb8c0381eb4e0a63715a6abd4aeb77bbd3c162) Thanks [@hadelive](https://github.com/hadelive)! - remove CSL dependency

- Updated dependencies [[`8ddb8c0`](https://github.com/Anastasia-Labs/lucid-evolution/commit/8ddb8c0381eb4e0a63715a6abd4aeb77bbd3c162), [`020ba4f`](https://github.com/Anastasia-Labs/lucid-evolution/commit/020ba4fc869a8b41480241ced40ff827e837ab31)]:
  - @lucid-evolution/utils@0.1.41
  - @lucid-evolution/provider@0.1.54
  - @lucid-evolution/wallet@0.1.46

## 0.3.27

### Patch Changes

- [#302](https://github.com/Anastasia-Labs/lucid-evolution/pull/302) [`156c054`](https://github.com/Anastasia-Labs/lucid-evolution/commit/156c0546b15c8ea8d8a8c7c3eb1ba5d78ed60fc1) Thanks [@hadelive](https://github.com/hadelive)! - enable plutusV3

- Updated dependencies [[`156c054`](https://github.com/Anastasia-Labs/lucid-evolution/commit/156c0546b15c8ea8d8a8c7c3eb1ba5d78ed60fc1)]:
  - @lucid-evolution/provider@0.1.53
  - @lucid-evolution/utils@0.1.40
  - @lucid-evolution/uplc@0.2.12
  - @lucid-evolution/wallet@0.1.45

## 0.3.26

### Patch Changes

- [#298](https://github.com/Anastasia-Labs/lucid-evolution/pull/298) [`22a9c9c`](https://github.com/Anastasia-Labs/lucid-evolution/commit/22a9c9ceda21cad992727e3f46ae5dea89a0fe7e) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - update datum serialization to cardano_node_format() (indefinite length notation)

- Updated dependencies [[`22a9c9c`](https://github.com/Anastasia-Labs/lucid-evolution/commit/22a9c9ceda21cad992727e3f46ae5dea89a0fe7e), [`083f991`](https://github.com/Anastasia-Labs/lucid-evolution/commit/083f991af49b1dcfe51267bf186db5100136de1d)]:
  - @lucid-evolution/core-types@0.1.17
  - @lucid-evolution/core-utils@0.1.15
  - @lucid-evolution/sign_data@0.1.20
  - @lucid-evolution/provider@0.1.52
  - @lucid-evolution/plutus@0.1.23
  - @lucid-evolution/wallet@0.1.44
  - @lucid-evolution/utils@0.1.39

## 0.3.25

### Patch Changes

- [#278](https://github.com/Anastasia-Labs/lucid-evolution/pull/278) [`538d607`](https://github.com/Anastasia-Labs/lucid-evolution/commit/538d607f63c36b6fe173022b4fe65810d17a1070) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - fix tx eval regex

## 0.3.24

### Patch Changes

- Updated dependencies [[`9a4f765`](https://github.com/Anastasia-Labs/lucid-evolution/commit/9a4f7656c4f172ce0487a2c7b453a56cb9883921)]:
  - @lucid-evolution/provider@0.1.51

## 0.3.23

### Patch Changes

- Updated dependencies [[`6225208`](https://github.com/Anastasia-Labs/lucid-evolution/commit/62252086fb6d2adbecf56ec94da8b6d7c8a63e08)]:
  - @lucid-evolution/provider@0.1.50

## 0.3.22

### Patch Changes

- [#283](https://github.com/Anastasia-Labs/lucid-evolution/pull/283) [`83cc37c`](https://github.com/Anastasia-Labs/lucid-evolution/commit/83cc37c801f29eaf4d4968f173cbe3e656f7e2a8) Thanks [@nikhils9](https://github.com/nikhils9)! - Export CML

- Updated dependencies [[`8c76538`](https://github.com/Anastasia-Labs/lucid-evolution/commit/8c76538d3d64fc2698d858b1d6c5beaaeb594162)]:
  - @lucid-evolution/provider@0.1.49

## 0.3.21

### Patch Changes

- [#285](https://github.com/Anastasia-Labs/lucid-evolution/pull/285) [`59a15c8`](https://github.com/Anastasia-Labs/lucid-evolution/commit/59a15c83e16c1bf22a44e1e05ff7480ef39cb631) Thanks [@hadelive](https://github.com/hadelive)! - bump cml to 6.0.1-2

- Updated dependencies [[`59a15c8`](https://github.com/Anastasia-Labs/lucid-evolution/commit/59a15c83e16c1bf22a44e1e05ff7480ef39cb631)]:
  - @lucid-evolution/core-types@0.1.16
  - @lucid-evolution/core-utils@0.1.14
  - @lucid-evolution/sign_data@0.1.19
  - @lucid-evolution/provider@0.1.48
  - @lucid-evolution/plutus@0.1.22
  - @lucid-evolution/wallet@0.1.43
  - @lucid-evolution/utils@0.1.38

## 0.3.20

### Patch Changes

- [#279](https://github.com/Anastasia-Labs/lucid-evolution/pull/279) [`018fffc`](https://github.com/Anastasia-Labs/lucid-evolution/commit/018fffc39b97887521cf92296404757ebcfc709b) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - enable mainnet hardfork

## 0.3.19

### Patch Changes

- [#276](https://github.com/Anastasia-Labs/lucid-evolution/pull/276) [`0a87f69`](https://github.com/Anastasia-Labs/lucid-evolution/commit/0a87f692dddc0e080831ac39a7aaa243f0122fbf) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - add missing types to selectWallet.fromSeed; export TxSubmit types

- [#272](https://github.com/Anastasia-Labs/lucid-evolution/pull/272) [`56cbe22`](https://github.com/Anastasia-Labs/lucid-evolution/commit/56cbe228b8b1830415a9cb99d4ff66744959b07b) Thanks [@hadelive](https://github.com/hadelive)! - add sign by keyhash

## 0.3.18

### Patch Changes

- [#273](https://github.com/Anastasia-Labs/lucid-evolution/pull/273) [`f119e2f`](https://github.com/Anastasia-Labs/lucid-evolution/commit/f119e2f64c3d5869f9a2b44832f267c45a6567e0) Thanks [@hadelive](https://github.com/hadelive)! - fix sellect wallet from private key

- Updated dependencies [[`f119e2f`](https://github.com/Anastasia-Labs/lucid-evolution/commit/f119e2f64c3d5869f9a2b44832f267c45a6567e0)]:
  - @lucid-evolution/provider@0.1.47
  - @lucid-evolution/wallet@0.1.42

## 0.3.17

### Patch Changes

- Updated dependencies [[`f8f905a`](https://github.com/Anastasia-Labs/lucid-evolution/commit/f8f905aeda20b30a03ba69e4b062a80a7a5be7de)]:
  - @lucid-evolution/core-types@0.1.15
  - @lucid-evolution/provider@0.1.46
  - @lucid-evolution/utils@0.1.37
  - @lucid-evolution/plutus@0.1.21
  - @lucid-evolution/sign_data@0.1.18
  - @lucid-evolution/wallet@0.1.41

## 0.3.16

### Patch Changes

- [#250](https://github.com/Anastasia-Labs/lucid-evolution/pull/250) [`c45c5d2`](https://github.com/Anastasia-Labs/lucid-evolution/commit/c45c5d27f59622a70383871fbc058e817fc94155) Thanks [@nikhils9](https://github.com/nikhils9)! - Fix min ada issue for outputs

## 0.3.15

### Patch Changes

- [#258](https://github.com/Anastasia-Labs/lucid-evolution/pull/258) [`8372b50`](https://github.com/Anastasia-Labs/lucid-evolution/commit/8372b50972bd99d5cfe122ebb0bfb98908484e0d) Thanks [@hadelive](https://github.com/hadelive)! - fix emulator submitTx function

- Updated dependencies [[`8372b50`](https://github.com/Anastasia-Labs/lucid-evolution/commit/8372b50972bd99d5cfe122ebb0bfb98908484e0d)]:
  - @lucid-evolution/core-types@0.1.14
  - @lucid-evolution/provider@0.1.45
  - @lucid-evolution/utils@0.1.36
  - @lucid-evolution/plutus@0.1.20
  - @lucid-evolution/sign_data@0.1.17
  - @lucid-evolution/wallet@0.1.40

## 0.3.14

### Patch Changes

- [#239](https://github.com/Anastasia-Labs/lucid-evolution/pull/239) [`eeab0c2`](https://github.com/Anastasia-Labs/lucid-evolution/commit/eeab0c2bf8b594e47d665f9daa76a3acd5af0acc) Thanks [@nikhils9](https://github.com/nikhils9)! - Enable Conway Era for Preprod

## 0.3.13

### Patch Changes

- [#226](https://github.com/Anastasia-Labs/lucid-evolution/pull/226) [`344b8cb`](https://github.com/Anastasia-Labs/lucid-evolution/commit/344b8cbf376d59fd1b6fbf9a17ab892559bf325f) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - fix applyParamsToScript; normalize providers test; fix evaluateTx for spent transacions; fix kupmios awaitTx

- Updated dependencies [[`344b8cb`](https://github.com/Anastasia-Labs/lucid-evolution/commit/344b8cbf376d59fd1b6fbf9a17ab892559bf325f)]:
  - @lucid-evolution/provider@0.1.44
  - @lucid-evolution/utils@0.1.35
  - @lucid-evolution/wallet@0.1.39

## 0.3.12

### Patch Changes

- [#243](https://github.com/Anastasia-Labs/lucid-evolution/pull/243) [`4114e3a`](https://github.com/Anastasia-Labs/lucid-evolution/commit/4114e3a21a2d6a0f48e6f7016e3705306e77f11e) Thanks [@hadelive](https://github.com/hadelive)! - add compose tx

## 0.3.11

### Patch Changes

- [#241](https://github.com/Anastasia-Labs/lucid-evolution/pull/241) [`f38f34d`](https://github.com/Anastasia-Labs/lucid-evolution/commit/f38f34d3333cd096fa02f94ebdcbfd344a418240) Thanks [@hadelive](https://github.com/hadelive)! - fix collect ashash-datum utxo

## 0.3.10

### Patch Changes

- [#233](https://github.com/Anastasia-Labs/lucid-evolution/pull/233) [`803086b`](https://github.com/Anastasia-Labs/lucid-evolution/commit/803086be99793f334b8c82eb2edd739b3e57ba37) Thanks [@nikhils9](https://github.com/nikhils9)! - Fix reference script fee issues with coin selection

- [#236](https://github.com/Anastasia-Labs/lucid-evolution/pull/236) [`96aaabd`](https://github.com/Anastasia-Labs/lucid-evolution/commit/96aaabd87142e02f814fce141a5fc9de2a6b5b31) Thanks [@hadelive](https://github.com/hadelive)! - add existing plutus datums witness

- Updated dependencies [[`803086b`](https://github.com/Anastasia-Labs/lucid-evolution/commit/803086be99793f334b8c82eb2edd739b3e57ba37)]:
  - @lucid-evolution/utils@0.1.34
  - @lucid-evolution/provider@0.1.43
  - @lucid-evolution/wallet@0.1.38

## 0.3.9

### Patch Changes

- [#228](https://github.com/Anastasia-Labs/lucid-evolution/pull/228) [`d4b03aa`](https://github.com/Anastasia-Labs/lucid-evolution/commit/d4b03aa121f42d8e27e1062ddf38b09ad9f8a5d9) Thanks [@hadelive](https://github.com/hadelive)! - datum inclusion for asHash kind in payToContract

- [#225](https://github.com/Anastasia-Labs/lucid-evolution/pull/225) [`7c25501`](https://github.com/Anastasia-Labs/lucid-evolution/commit/7c25501e5f11af8d4a1b2e36d3430bf638cb1eed) Thanks [@hadelive](https://github.com/hadelive)! - support conway un_reg cert

- Updated dependencies [[`7c25501`](https://github.com/Anastasia-Labs/lucid-evolution/commit/7c25501e5f11af8d4a1b2e36d3430bf638cb1eed)]:
  - @lucid-evolution/core-utils@0.1.13
  - @lucid-evolution/provider@0.1.42
  - @lucid-evolution/wallet@0.1.37
  - @lucid-evolution/plutus@0.1.19
  - @lucid-evolution/sign_data@0.1.16
  - @lucid-evolution/utils@0.1.33

## 0.3.8

### Patch Changes

- Updated dependencies [[`aec1ccd`](https://github.com/Anastasia-Labs/lucid-evolution/commit/aec1ccd7659e17c07b677f1649977590b830c6bc), [`3fa5522`](https://github.com/Anastasia-Labs/lucid-evolution/commit/3fa55226d7dc182a1515cb034744a3b4343c3c33), [`18dea56`](https://github.com/Anastasia-Labs/lucid-evolution/commit/18dea561759ad569e02af252a89c774e53b74dd7)]:
  - @lucid-evolution/core-types@0.1.13
  - @lucid-evolution/provider@0.1.41
  - @lucid-evolution/wallet@0.1.36
  - @lucid-evolution/core-utils@0.1.12
  - @lucid-evolution/plutus@0.1.18
  - @lucid-evolution/sign_data@0.1.15
  - @lucid-evolution/utils@0.1.32

## 0.3.7

### Patch Changes

- Updated dependencies [[`c96eda2`](https://github.com/Anastasia-Labs/lucid-evolution/commit/c96eda240092a640f0884a8e3071fc5a31b89fcf)]:
  - @lucid-evolution/uplc@0.2.11
  - @lucid-evolution/utils@0.1.31
  - @lucid-evolution/provider@0.1.40
  - @lucid-evolution/wallet@0.1.35

## 0.3.6

### Patch Changes

- Updated dependencies [[`f99d031`](https://github.com/Anastasia-Labs/lucid-evolution/commit/f99d031bd6ccbeffddd01e3ebf869a04978ba4e6)]:
  - @lucid-evolution/core-utils@0.1.11
  - @lucid-evolution/plutus@0.1.17
  - @lucid-evolution/provider@0.1.39
  - @lucid-evolution/sign_data@0.1.14
  - @lucid-evolution/utils@0.1.30
  - @lucid-evolution/wallet@0.1.34

## 0.3.5

### Patch Changes

- [#208](https://github.com/Anastasia-Labs/lucid-evolution/pull/208) [`10d9f80`](https://github.com/Anastasia-Labs/lucid-evolution/commit/10d9f80695928675061fc15b9b18b1c93fb9bb4f) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - deprecate @lucid-evolution/bip39, use bip39 package instead (browser/node compatible)

- Updated dependencies [[`10d9f80`](https://github.com/Anastasia-Labs/lucid-evolution/commit/10d9f80695928675061fc15b9b18b1c93fb9bb4f), [`bf2341f`](https://github.com/Anastasia-Labs/lucid-evolution/commit/bf2341f5a5d541fe2ca468fa512e009ab32a1346), [`dc8dc0c`](https://github.com/Anastasia-Labs/lucid-evolution/commit/dc8dc0c76cf2f9666f7e4c6a2452911f4ea6b007)]:
  - @lucid-evolution/wallet@0.1.33
  - @lucid-evolution/utils@0.1.29
  - @lucid-evolution/core-utils@0.1.10
  - @lucid-evolution/uplc@0.2.10
  - @lucid-evolution/provider@0.1.38
  - @lucid-evolution/plutus@0.1.16
  - @lucid-evolution/sign_data@0.1.13

## 0.3.4

### Patch Changes

- [#200](https://github.com/Anastasia-Labs/lucid-evolution/pull/200) [`b4d379c`](https://github.com/Anastasia-Labs/lucid-evolution/commit/b4d379c3429c85468c5137b0d828da0b16fe331f) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - fix toCBOR now return the transaction instead of tx body, fix wallet from address, cleanup tests

- Updated dependencies [[`b4d379c`](https://github.com/Anastasia-Labs/lucid-evolution/commit/b4d379c3429c85468c5137b0d828da0b16fe331f)]:
  - @lucid-evolution/wallet@0.1.32
  - @lucid-evolution/provider@0.1.37

## 0.3.3

### Patch Changes

- [#195](https://github.com/Anastasia-Labs/lucid-evolution/pull/195) [`e281b5b`](https://github.com/Anastasia-Labs/lucid-evolution/commit/e281b5bfe5da9a02e3cda35668c3a3eb18f20092) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - add refscript fee to preview

- Updated dependencies [[`e281b5b`](https://github.com/Anastasia-Labs/lucid-evolution/commit/e281b5bfe5da9a02e3cda35668c3a3eb18f20092)]:
  - @lucid-evolution/core-types@0.1.12
  - @lucid-evolution/core-utils@0.1.9
  - @lucid-evolution/sign_data@0.1.12
  - @lucid-evolution/provider@0.1.36
  - @lucid-evolution/plutus@0.1.15
  - @lucid-evolution/wallet@0.1.31
  - @lucid-evolution/utils@0.1.28
  - @lucid-evolution/bip39@0.2.11

## 0.3.2

### Patch Changes

- [#155](https://github.com/Anastasia-Labs/lucid-evolution/pull/155) [`5933bce`](https://github.com/Anastasia-Labs/lucid-evolution/commit/5933bced0cc75cb4330439d8a4f8f46ae7a04a50) Thanks [@hadelive](https://github.com/hadelive)! - Add emulator provider

- Updated dependencies [[`5933bce`](https://github.com/Anastasia-Labs/lucid-evolution/commit/5933bced0cc75cb4330439d8a4f8f46ae7a04a50)]:
  - @lucid-evolution/provider@0.1.35
  - @lucid-evolution/wallet@0.1.30

## 0.3.1

### Patch Changes

- [#185](https://github.com/Anastasia-Labs/lucid-evolution/pull/185) [`f0bf16d`](https://github.com/Anastasia-Labs/lucid-evolution/commit/f0bf16db7d043696e31eb1196fc9cf2076fb7ae2) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - add assemble tx ; partial sign; toJSON; toCBOR; toHash

- [#183](https://github.com/Anastasia-Labs/lucid-evolution/pull/183) [`8ab1875`](https://github.com/Anastasia-Labs/lucid-evolution/commit/8ab187531e496bd764651328088e99fc09304ca3) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - cleanup tsconfig.json files, use base.json from typescript-config package as extends property

- Updated dependencies [[`8ab1875`](https://github.com/Anastasia-Labs/lucid-evolution/commit/8ab187531e496bd764651328088e99fc09304ca3)]:
  - @lucid-evolution/core-types@0.1.11
  - @lucid-evolution/core-utils@0.1.8
  - @lucid-evolution/sign_data@0.1.11
  - @lucid-evolution/provider@0.1.34
  - @lucid-evolution/plutus@0.1.14
  - @lucid-evolution/wallet@0.1.29
  - @lucid-evolution/bip39@0.2.10
  - @lucid-evolution/utils@0.1.27
  - @lucid-evolution/uplc@0.2.9

## 0.3.0

### Minor Changes

- [#169](https://github.com/Anastasia-Labs/lucid-evolution/pull/169) [`6282481`](https://github.com/Anastasia-Labs/lucid-evolution/commit/6282481a2183cfa1a3deec025552d7432cb35869) Thanks [@nikhils9](https://github.com/nikhils9)! - Auto populate input indices

### Patch Changes

- Updated dependencies [[`6282481`](https://github.com/Anastasia-Labs/lucid-evolution/commit/6282481a2183cfa1a3deec025552d7432cb35869)]:
  - @lucid-evolution/core-types@0.1.10
  - @lucid-evolution/utils@0.1.26
  - @lucid-evolution/plutus@0.1.13
  - @lucid-evolution/provider@0.1.33
  - @lucid-evolution/sign_data@0.1.10
  - @lucid-evolution/wallet@0.1.28

## 0.2.49

### Patch Changes

- Updated dependencies [[`fcd0de0`](https://github.com/Anastasia-Labs/lucid-evolution/commit/fcd0de09e037e5dc92676b219a0ca0c0ae83fd00), [`def34e8`](https://github.com/Anastasia-Labs/lucid-evolution/commit/def34e800af761abcd7b85ba4c6b7c65219d1891)]:
  - @lucid-evolution/wallet@0.1.27
  - @lucid-evolution/bip39@0.2.9
  - @lucid-evolution/utils@0.1.25
  - @lucid-evolution/provider@0.1.32

## 0.2.48

### Patch Changes

- [#174](https://github.com/Anastasia-Labs/lucid-evolution/pull/174) [`f86b74a`](https://github.com/Anastasia-Labs/lucid-evolution/commit/f86b74a7a5489012e717b1247771b527f21be424) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - refactor error messages and constructor

- [#174](https://github.com/Anastasia-Labs/lucid-evolution/pull/174) [`e05e805`](https://github.com/Anastasia-Labs/lucid-evolution/commit/e05e8057f2561040fe733bcb895c567ff7d2f0d5) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - improve RunTimeError, refactor TxSubmitError

- Updated dependencies [[`61613f5`](https://github.com/Anastasia-Labs/lucid-evolution/commit/61613f5178045bfe6ba53f1cd4c7b8900431013b), [`f794a5b`](https://github.com/Anastasia-Labs/lucid-evolution/commit/f794a5bbec7d1ae39135495827ccca91e9ac9da6), [`f86b74a`](https://github.com/Anastasia-Labs/lucid-evolution/commit/f86b74a7a5489012e717b1247771b527f21be424)]:
  - @lucid-evolution/wallet@0.1.26
  - @lucid-evolution/utils@0.1.24
  - @lucid-evolution/provider@0.1.31

## 0.2.47

### Patch Changes

- [#168](https://github.com/Anastasia-Labs/lucid-evolution/pull/168) [`26dc344`](https://github.com/Anastasia-Labs/lucid-evolution/commit/26dc34466e74a8af6b6952dcd705d6f67f9660d0) Thanks [@solidsnakedev](https://github.com/solidsnakedev)! - Changes

  - Add kupos and ogmios schemas
  - Support jsonrpc v2
  - Effectful http request
  - Remove websocket from ogmios, use http post instead.
  - Support for ogmios v6
  - Support for kupo 2.8.0

- Updated dependencies [[`26dc344`](https://github.com/Anastasia-Labs/lucid-evolution/commit/26dc34466e74a8af6b6952dcd705d6f67f9660d0)]:
  - @lucid-evolution/provider@0.1.30
  - @lucid-evolution/uplc@0.2.8
  - @lucid-evolution/utils@0.1.23
  - @lucid-evolution/wallet@0.1.25

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
