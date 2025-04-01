---
title: CML/TransactionBuilder.ts
nav_order: 223
parent: Modules
---

## TransactionBuilder overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
- [Errors](#errors)
  - [TransactionBuilderError (class)](#transactionbuildererror-class)
- [Methods](#methods)
  - [addAuxiliaryData](#addauxiliarydata)
  - [addCert](#addcert)
  - [addChangeIfNeeded](#addchangeifneeded)
  - [addCollateral](#addcollateral)
  - [addInput](#addinput)
  - [addMint](#addmint)
  - [addOutput](#addoutput)
  - [addProposal](#addproposal)
  - [addReferenceInput](#addreferenceinput)
  - [addRequiredSigner](#addrequiredsigner)
  - [addUtxo](#addutxo)
  - [addVote](#addvote)
  - [addWithdrawal](#addwithdrawal)
  - [build](#build)
  - [buildForEvaluation](#buildforevaluation)
  - [feeForInput](#feeforinput)
  - [feeForOutput](#feeforoutput)
  - [free](#free)
  - [fullSize](#fullsize)
  - [getAuxiliaryData](#getauxiliarydata)
  - [getDeposit](#getdeposit)
  - [getExplicitInput](#getexplicitinput)
  - [getExplicitOutput](#getexplicitoutput)
  - [getFeeIfSet](#getfeeifset)
  - [getImplicitInput](#getimplicitinput)
  - [getMint](#getmint)
  - [getTotalInput](#gettotalinput)
  - [getTotalOutput](#gettotaloutput)
  - [getWithdrawals](#getwithdrawals)
  - [minFee](#minfee)
  - [networkId](#networkid)
  - [outputSizes](#outputsizes)
  - [selectUtxos](#selectutxos)
  - [setAuxiliaryData](#setauxiliarydata)
  - [setCollateralReturn](#setcollateralreturn)
  - [setExunits](#setexunits)
  - [setFee](#setfee)
  - [setNetworkId](#setnetworkid)
  - [setTtl](#setttl)
  - [setValidityStartInterval](#setvaliditystartinterval)
- [MethodsUnsafe](#methodsunsafe)
  - [addAuxiliaryDataUnsafe](#addauxiliarydataunsafe)
  - [addCertUnsafe](#addcertunsafe)
  - [addChangeIfNeededUnsafe](#addchangeifneededunsafe)
  - [addCollateralUnsafe](#addcollateralunsafe)
  - [addInputUnsafe](#addinputunsafe)
  - [addMintUnsafe](#addmintunsafe)
  - [addOutputUnsafe](#addoutputunsafe)
  - [addProposalUnsafe](#addproposalunsafe)
  - [addReferenceInputUnsafe](#addreferenceinputunsafe)
  - [addRequiredSignerUnsafe](#addrequiredsignerunsafe)
  - [addUtxoUnsafe](#addutxounsafe)
  - [addVoteUnsafe](#addvoteunsafe)
  - [addWithdrawalUnsafe](#addwithdrawalunsafe)
  - [buildForEvaluationUnsafe](#buildforevaluationunsafe)
  - [buildUnsafe](#buildunsafe)
  - [feeForInputUnsafe](#feeforinputunsafe)
  - [feeForOutputUnsafe](#feeforoutputunsafe)
  - [freeUnsafe](#freeunsafe)
  - [fullSizeUnsafe](#fullsizeunsafe)
  - [getAuxiliaryDataUnsafe](#getauxiliarydataunsafe)
  - [getDepositUnsafe](#getdepositunsafe)
  - [getExplicitInputUnsafe](#getexplicitinputunsafe)
  - [getExplicitOutputUnsafe](#getexplicitoutputunsafe)
  - [getFeeIfSetUnsafe](#getfeeifsetunsafe)
  - [getImplicitInputUnsafe](#getimplicitinputunsafe)
  - [getMintUnsafe](#getmintunsafe)
  - [getTotalInputUnsafe](#gettotalinputunsafe)
  - [getTotalOutputUnsafe](#gettotaloutputunsafe)
  - [getWithdrawalsUnsafe](#getwithdrawalsunsafe)
  - [minFeeUnsafe](#minfeeunsafe)
  - [networkIdUnsafe](#networkidunsafe)
  - [outputSizesUnsafe](#outputsizesunsafe)
  - [selectUtxosUnsafe](#selectutxosunsafe)
  - [setAuxiliaryDataUnsafe](#setauxiliarydataunsafe)
  - [setCollateralReturnUnsafe](#setcollateralreturnunsafe)
  - [setExunitsUnsafe](#setexunitsunsafe)
  - [setFeeUnsafe](#setfeeunsafe)
  - [setNetworkIdUnsafe](#setnetworkidunsafe)
  - [setTtlUnsafe](#setttlunsafe)
  - [setValidityStartIntervalUnsafe](#setvaliditystartintervalunsafe)
- [Types](#types)
  - [TransactionBuilder (type alias)](#transactionbuilder-type-alias)

---

# Constructors

## \_new

Static method \_new of TransactionBuilder

**Signature**

```ts
export declare const _new: (
  cfg: CML.TransactionBuilderConfig,
) => Effect.Effect<CML.TransactionBuilder, TransactionBuilderError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls TransactionBuilder.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (
  cfg: CML.TransactionBuilderConfig,
) => CML.TransactionBuilder;
```

Added in v2.0.0

# Errors

## TransactionBuilderError (class)

Error class for TransactionBuilder operations

This error is thrown when operations on TransactionBuilder instances fail.

**Signature**

```ts
export declare class TransactionBuilderError
```

Added in v2.0.0

# Methods

## addAuxiliaryData

Method addAuxiliaryData of TransactionBuilder

**Signature**

```ts
export declare const addAuxiliaryData: (
  instance: CML.TransactionBuilder,
  newAuxData: CML.AuxiliaryData,
) => Effect.Effect<void, TransactionBuilderError>;
```

Added in v2.0.0

## addCert

Method addCert of TransactionBuilder

**Signature**

```ts
export declare const addCert: (
  instance: CML.TransactionBuilder,
  result: CML.CertificateBuilderResult,
) => Effect.Effect<void, TransactionBuilderError>;
```

Added in v2.0.0

## addChangeIfNeeded

Method addChangeIfNeeded of TransactionBuilder

**Signature**

```ts
export declare const addChangeIfNeeded: (
  instance: CML.TransactionBuilder,
  address: CML.Address,
  includeExunits: boolean,
) => Effect.Effect<boolean, TransactionBuilderError>;
```

Added in v2.0.0

## addCollateral

Method addCollateral of TransactionBuilder

**Signature**

```ts
export declare const addCollateral: (
  instance: CML.TransactionBuilder,
  result: CML.InputBuilderResult,
) => Effect.Effect<void, TransactionBuilderError>;
```

Added in v2.0.0

## addInput

Method addInput of TransactionBuilder

**Signature**

```ts
export declare const addInput: (
  instance: CML.TransactionBuilder,
  result: CML.InputBuilderResult,
) => Effect.Effect<void, TransactionBuilderError>;
```

Added in v2.0.0

## addMint

Method addMint of TransactionBuilder

**Signature**

```ts
export declare const addMint: (
  instance: CML.TransactionBuilder,
  result: CML.MintBuilderResult,
) => Effect.Effect<void, TransactionBuilderError>;
```

Added in v2.0.0

## addOutput

Method addOutput of TransactionBuilder

**Signature**

```ts
export declare const addOutput: (
  instance: CML.TransactionBuilder,
  builderResult: CML.SingleOutputBuilderResult,
) => Effect.Effect<void, TransactionBuilderError>;
```

Added in v2.0.0

## addProposal

Method addProposal of TransactionBuilder

**Signature**

```ts
export declare const addProposal: (
  instance: CML.TransactionBuilder,
  result: CML.ProposalBuilderResult,
) => Effect.Effect<void, TransactionBuilderError>;
```

Added in v2.0.0

## addReferenceInput

Method addReferenceInput of TransactionBuilder

**Signature**

```ts
export declare const addReferenceInput: (
  instance: CML.TransactionBuilder,
  utxo: CML.TransactionUnspentOutput,
) => Effect.Effect<void, TransactionBuilderError>;
```

Added in v2.0.0

## addRequiredSigner

Method addRequiredSigner of TransactionBuilder

**Signature**

```ts
export declare const addRequiredSigner: (
  instance: CML.TransactionBuilder,
  hash: CML.Ed25519KeyHash,
) => Effect.Effect<void, TransactionBuilderError>;
```

Added in v2.0.0

## addUtxo

Method addUtxo of TransactionBuilder

**Signature**

```ts
export declare const addUtxo: (
  instance: CML.TransactionBuilder,
  result: CML.InputBuilderResult,
) => Effect.Effect<void, TransactionBuilderError>;
```

Added in v2.0.0

## addVote

Method addVote of TransactionBuilder

**Signature**

```ts
export declare const addVote: (
  instance: CML.TransactionBuilder,
  result: CML.VoteBuilderResult,
) => Effect.Effect<void, TransactionBuilderError>;
```

Added in v2.0.0

## addWithdrawal

Method addWithdrawal of TransactionBuilder

**Signature**

```ts
export declare const addWithdrawal: (
  instance: CML.TransactionBuilder,
  result: CML.WithdrawalBuilderResult,
) => Effect.Effect<void, TransactionBuilderError>;
```

Added in v2.0.0

## build

Method build of TransactionBuilder

**Signature**

```ts
export declare const build: (
  instance: CML.TransactionBuilder,
  algo: CML.ChangeSelectionAlgo,
  changeAddress: CML.Address,
) => Effect.Effect<CML.SignedTxBuilder, TransactionBuilderError>;
```

Added in v2.0.0

## buildForEvaluation

Method buildForEvaluation of TransactionBuilder

**Signature**

```ts
export declare const buildForEvaluation: (
  instance: CML.TransactionBuilder,
  algo: CML.ChangeSelectionAlgo,
  changeAddress: CML.Address,
) => Effect.Effect<CML.TxRedeemerBuilder, TransactionBuilderError>;
```

Added in v2.0.0

## feeForInput

Method feeForInput of TransactionBuilder

**Signature**

```ts
export declare const feeForInput: (
  instance: CML.TransactionBuilder,
  result: CML.InputBuilderResult,
) => Effect.Effect<bigint, TransactionBuilderError>;
```

Added in v2.0.0

## feeForOutput

Method feeForOutput of TransactionBuilder

**Signature**

```ts
export declare const feeForOutput: (
  instance: CML.TransactionBuilder,
  builder: CML.SingleOutputBuilderResult,
) => Effect.Effect<bigint, TransactionBuilderError>;
```

Added in v2.0.0

## free

Method free of TransactionBuilder

**Signature**

```ts
export declare const free: (
  instance: CML.TransactionBuilder,
) => Effect.Effect<void, TransactionBuilderError>;
```

Added in v2.0.0

## fullSize

Method fullSize of TransactionBuilder

**Signature**

```ts
export declare const fullSize: (
  instance: CML.TransactionBuilder,
) => Effect.Effect<number, TransactionBuilderError>;
```

Added in v2.0.0

## getAuxiliaryData

Method getAuxiliaryData of TransactionBuilder

**Signature**

```ts
export declare const getAuxiliaryData: (
  instance: CML.TransactionBuilder,
) => Effect.Effect<CML.AuxiliaryData | undefined, TransactionBuilderError>;
```

Added in v2.0.0

## getDeposit

Method getDeposit of TransactionBuilder

**Signature**

```ts
export declare const getDeposit: (
  instance: CML.TransactionBuilder,
) => Effect.Effect<bigint, TransactionBuilderError>;
```

Added in v2.0.0

## getExplicitInput

Method getExplicitInput of TransactionBuilder

**Signature**

```ts
export declare const getExplicitInput: (
  instance: CML.TransactionBuilder,
) => Effect.Effect<CML.Value, TransactionBuilderError>;
```

Added in v2.0.0

## getExplicitOutput

Method getExplicitOutput of TransactionBuilder

**Signature**

```ts
export declare const getExplicitOutput: (
  instance: CML.TransactionBuilder,
) => Effect.Effect<CML.Value, TransactionBuilderError>;
```

Added in v2.0.0

## getFeeIfSet

Method getFeeIfSet of TransactionBuilder

**Signature**

```ts
export declare const getFeeIfSet: (
  instance: CML.TransactionBuilder,
) => Effect.Effect<bigint | undefined, TransactionBuilderError>;
```

Added in v2.0.0

## getImplicitInput

Method getImplicitInput of TransactionBuilder

**Signature**

```ts
export declare const getImplicitInput: (
  instance: CML.TransactionBuilder,
) => Effect.Effect<CML.Value, TransactionBuilderError>;
```

Added in v2.0.0

## getMint

Method getMint of TransactionBuilder

**Signature**

```ts
export declare const getMint: (
  instance: CML.TransactionBuilder,
) => Effect.Effect<CML.Mint | undefined, TransactionBuilderError>;
```

Added in v2.0.0

## getTotalInput

Method getTotalInput of TransactionBuilder

**Signature**

```ts
export declare const getTotalInput: (
  instance: CML.TransactionBuilder,
) => Effect.Effect<CML.Value, TransactionBuilderError>;
```

Added in v2.0.0

## getTotalOutput

Method getTotalOutput of TransactionBuilder

**Signature**

```ts
export declare const getTotalOutput: (
  instance: CML.TransactionBuilder,
) => Effect.Effect<CML.Value, TransactionBuilderError>;
```

Added in v2.0.0

## getWithdrawals

Method getWithdrawals of TransactionBuilder

**Signature**

```ts
export declare const getWithdrawals: (
  instance: CML.TransactionBuilder,
) => Effect.Effect<
  CML.MapRewardAccountToCoin | undefined,
  TransactionBuilderError
>;
```

Added in v2.0.0

## minFee

Method minFee of TransactionBuilder

**Signature**

```ts
export declare const minFee: (
  instance: CML.TransactionBuilder,
  scriptCalulation: boolean,
) => Effect.Effect<bigint, TransactionBuilderError>;
```

Added in v2.0.0

## networkId

Method networkId of TransactionBuilder

**Signature**

```ts
export declare const networkId: (
  instance: CML.TransactionBuilder,
) => Effect.Effect<CML.NetworkId | undefined, TransactionBuilderError>;
```

Added in v2.0.0

## outputSizes

Method outputSizes of TransactionBuilder

**Signature**

```ts
export declare const outputSizes: (
  instance: CML.TransactionBuilder,
) => Effect.Effect<Uint32Array, TransactionBuilderError>;
```

Added in v2.0.0

## selectUtxos

Method selectUtxos of TransactionBuilder

**Signature**

```ts
export declare const selectUtxos: (
  instance: CML.TransactionBuilder,
  strategy: CML.CoinSelectionStrategyCIP2,
) => Effect.Effect<void, TransactionBuilderError>;
```

Added in v2.0.0

## setAuxiliaryData

Method setAuxiliaryData of TransactionBuilder

**Signature**

```ts
export declare const setAuxiliaryData: (
  instance: CML.TransactionBuilder,
  newAuxData: CML.AuxiliaryData,
) => Effect.Effect<void, TransactionBuilderError>;
```

Added in v2.0.0

## setCollateralReturn

Method setCollateralReturn of TransactionBuilder

**Signature**

```ts
export declare const setCollateralReturn: (
  instance: CML.TransactionBuilder,
  output: CML.TransactionOutput,
) => Effect.Effect<void, TransactionBuilderError>;
```

Added in v2.0.0

## setExunits

Method setExunits of TransactionBuilder

**Signature**

```ts
export declare const setExunits: (
  instance: CML.TransactionBuilder,
  redeemer: CML.RedeemerWitnessKey,
  exUnits: CML.ExUnits,
) => Effect.Effect<void, TransactionBuilderError>;
```

Added in v2.0.0

## setFee

Method setFee of TransactionBuilder

**Signature**

```ts
export declare const setFee: (
  instance: CML.TransactionBuilder,
  fee: bigint,
) => Effect.Effect<void, TransactionBuilderError>;
```

Added in v2.0.0

## setNetworkId

Method setNetworkId of TransactionBuilder

**Signature**

```ts
export declare const setNetworkId: (
  instance: CML.TransactionBuilder,
  networkId: CML.NetworkId,
) => Effect.Effect<void, TransactionBuilderError>;
```

Added in v2.0.0

## setTtl

Method setTtl of TransactionBuilder

**Signature**

```ts
export declare const setTtl: (
  instance: CML.TransactionBuilder,
  ttl: bigint,
) => Effect.Effect<void, TransactionBuilderError>;
```

Added in v2.0.0

## setValidityStartInterval

Method setValidityStartInterval of TransactionBuilder

**Signature**

```ts
export declare const setValidityStartInterval: (
  instance: CML.TransactionBuilder,
  validityStartInterval: bigint,
) => Effect.Effect<void, TransactionBuilderError>;
```

Added in v2.0.0

# MethodsUnsafe

## addAuxiliaryDataUnsafe

Unsafely calls instance.addAuxiliaryData without Effect wrapper

**Signature**

```ts
export declare const addAuxiliaryDataUnsafe: (
  instance: CML.TransactionBuilder,
  newAuxData: CML.AuxiliaryData,
) => void;
```

Added in v2.0.0

## addCertUnsafe

Unsafely calls instance.addCert without Effect wrapper

**Signature**

```ts
export declare const addCertUnsafe: (
  instance: CML.TransactionBuilder,
  result: CML.CertificateBuilderResult,
) => void;
```

Added in v2.0.0

## addChangeIfNeededUnsafe

Unsafely calls instance.addChangeIfNeeded without Effect wrapper

**Signature**

```ts
export declare const addChangeIfNeededUnsafe: (
  instance: CML.TransactionBuilder,
  address: CML.Address,
  includeExunits: boolean,
) => boolean;
```

Added in v2.0.0

## addCollateralUnsafe

Unsafely calls instance.addCollateral without Effect wrapper

**Signature**

```ts
export declare const addCollateralUnsafe: (
  instance: CML.TransactionBuilder,
  result: CML.InputBuilderResult,
) => void;
```

Added in v2.0.0

## addInputUnsafe

Unsafely calls instance.addInput without Effect wrapper

**Signature**

```ts
export declare const addInputUnsafe: (
  instance: CML.TransactionBuilder,
  result: CML.InputBuilderResult,
) => void;
```

Added in v2.0.0

## addMintUnsafe

Unsafely calls instance.addMint without Effect wrapper

**Signature**

```ts
export declare const addMintUnsafe: (
  instance: CML.TransactionBuilder,
  result: CML.MintBuilderResult,
) => void;
```

Added in v2.0.0

## addOutputUnsafe

Unsafely calls instance.addOutput without Effect wrapper

**Signature**

```ts
export declare const addOutputUnsafe: (
  instance: CML.TransactionBuilder,
  builderResult: CML.SingleOutputBuilderResult,
) => void;
```

Added in v2.0.0

## addProposalUnsafe

Unsafely calls instance.addProposal without Effect wrapper

**Signature**

```ts
export declare const addProposalUnsafe: (
  instance: CML.TransactionBuilder,
  result: CML.ProposalBuilderResult,
) => void;
```

Added in v2.0.0

## addReferenceInputUnsafe

Unsafely calls instance.addReferenceInput without Effect wrapper

**Signature**

```ts
export declare const addReferenceInputUnsafe: (
  instance: CML.TransactionBuilder,
  utxo: CML.TransactionUnspentOutput,
) => void;
```

Added in v2.0.0

## addRequiredSignerUnsafe

Unsafely calls instance.addRequiredSigner without Effect wrapper

**Signature**

```ts
export declare const addRequiredSignerUnsafe: (
  instance: CML.TransactionBuilder,
  hash: CML.Ed25519KeyHash,
) => void;
```

Added in v2.0.0

## addUtxoUnsafe

Unsafely calls instance.addUtxo without Effect wrapper

**Signature**

```ts
export declare const addUtxoUnsafe: (
  instance: CML.TransactionBuilder,
  result: CML.InputBuilderResult,
) => void;
```

Added in v2.0.0

## addVoteUnsafe

Unsafely calls instance.addVote without Effect wrapper

**Signature**

```ts
export declare const addVoteUnsafe: (
  instance: CML.TransactionBuilder,
  result: CML.VoteBuilderResult,
) => void;
```

Added in v2.0.0

## addWithdrawalUnsafe

Unsafely calls instance.addWithdrawal without Effect wrapper

**Signature**

```ts
export declare const addWithdrawalUnsafe: (
  instance: CML.TransactionBuilder,
  result: CML.WithdrawalBuilderResult,
) => void;
```

Added in v2.0.0

## buildForEvaluationUnsafe

Unsafely calls instance.buildForEvaluation without Effect wrapper

**Signature**

```ts
export declare const buildForEvaluationUnsafe: (
  instance: CML.TransactionBuilder,
  algo: CML.ChangeSelectionAlgo,
  changeAddress: CML.Address,
) => CML.TxRedeemerBuilder;
```

Added in v2.0.0

## buildUnsafe

Unsafely calls instance.build without Effect wrapper

**Signature**

```ts
export declare const buildUnsafe: (
  instance: CML.TransactionBuilder,
  algo: CML.ChangeSelectionAlgo,
  changeAddress: CML.Address,
) => CML.SignedTxBuilder;
```

Added in v2.0.0

## feeForInputUnsafe

Unsafely calls instance.feeForInput without Effect wrapper

**Signature**

```ts
export declare const feeForInputUnsafe: (
  instance: CML.TransactionBuilder,
  result: CML.InputBuilderResult,
) => bigint;
```

Added in v2.0.0

## feeForOutputUnsafe

Unsafely calls instance.feeForOutput without Effect wrapper

**Signature**

```ts
export declare const feeForOutputUnsafe: (
  instance: CML.TransactionBuilder,
  builder: CML.SingleOutputBuilderResult,
) => bigint;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.TransactionBuilder) => void;
```

Added in v2.0.0

## fullSizeUnsafe

Unsafely calls instance.fullSize without Effect wrapper

**Signature**

```ts
export declare const fullSizeUnsafe: (
  instance: CML.TransactionBuilder,
) => number;
```

Added in v2.0.0

## getAuxiliaryDataUnsafe

Unsafely calls instance.getAuxiliaryData without Effect wrapper

**Signature**

```ts
export declare const getAuxiliaryDataUnsafe: (
  instance: CML.TransactionBuilder,
) => CML.AuxiliaryData | undefined;
```

Added in v2.0.0

## getDepositUnsafe

Unsafely calls instance.getDeposit without Effect wrapper

**Signature**

```ts
export declare const getDepositUnsafe: (
  instance: CML.TransactionBuilder,
) => bigint;
```

Added in v2.0.0

## getExplicitInputUnsafe

Unsafely calls instance.getExplicitInput without Effect wrapper

**Signature**

```ts
export declare const getExplicitInputUnsafe: (
  instance: CML.TransactionBuilder,
) => CML.Value;
```

Added in v2.0.0

## getExplicitOutputUnsafe

Unsafely calls instance.getExplicitOutput without Effect wrapper

**Signature**

```ts
export declare const getExplicitOutputUnsafe: (
  instance: CML.TransactionBuilder,
) => CML.Value;
```

Added in v2.0.0

## getFeeIfSetUnsafe

Unsafely calls instance.getFeeIfSet without Effect wrapper

**Signature**

```ts
export declare const getFeeIfSetUnsafe: (
  instance: CML.TransactionBuilder,
) => bigint | undefined;
```

Added in v2.0.0

## getImplicitInputUnsafe

Unsafely calls instance.getImplicitInput without Effect wrapper

**Signature**

```ts
export declare const getImplicitInputUnsafe: (
  instance: CML.TransactionBuilder,
) => CML.Value;
```

Added in v2.0.0

## getMintUnsafe

Unsafely calls instance.getMint without Effect wrapper

**Signature**

```ts
export declare const getMintUnsafe: (
  instance: CML.TransactionBuilder,
) => CML.Mint | undefined;
```

Added in v2.0.0

## getTotalInputUnsafe

Unsafely calls instance.getTotalInput without Effect wrapper

**Signature**

```ts
export declare const getTotalInputUnsafe: (
  instance: CML.TransactionBuilder,
) => CML.Value;
```

Added in v2.0.0

## getTotalOutputUnsafe

Unsafely calls instance.getTotalOutput without Effect wrapper

**Signature**

```ts
export declare const getTotalOutputUnsafe: (
  instance: CML.TransactionBuilder,
) => CML.Value;
```

Added in v2.0.0

## getWithdrawalsUnsafe

Unsafely calls instance.getWithdrawals without Effect wrapper

**Signature**

```ts
export declare const getWithdrawalsUnsafe: (
  instance: CML.TransactionBuilder,
) => CML.MapRewardAccountToCoin | undefined;
```

Added in v2.0.0

## minFeeUnsafe

Unsafely calls instance.minFee without Effect wrapper

**Signature**

```ts
export declare const minFeeUnsafe: (
  instance: CML.TransactionBuilder,
  scriptCalulation: boolean,
) => bigint;
```

Added in v2.0.0

## networkIdUnsafe

Unsafely calls instance.networkId without Effect wrapper

**Signature**

```ts
export declare const networkIdUnsafe: (
  instance: CML.TransactionBuilder,
) => CML.NetworkId | undefined;
```

Added in v2.0.0

## outputSizesUnsafe

Unsafely calls instance.outputSizes without Effect wrapper

**Signature**

```ts
export declare const outputSizesUnsafe: (
  instance: CML.TransactionBuilder,
) => Uint32Array;
```

Added in v2.0.0

## selectUtxosUnsafe

Unsafely calls instance.selectUtxos without Effect wrapper

**Signature**

```ts
export declare const selectUtxosUnsafe: (
  instance: CML.TransactionBuilder,
  strategy: CML.CoinSelectionStrategyCIP2,
) => void;
```

Added in v2.0.0

## setAuxiliaryDataUnsafe

Unsafely calls instance.setAuxiliaryData without Effect wrapper

**Signature**

```ts
export declare const setAuxiliaryDataUnsafe: (
  instance: CML.TransactionBuilder,
  newAuxData: CML.AuxiliaryData,
) => void;
```

Added in v2.0.0

## setCollateralReturnUnsafe

Unsafely calls instance.setCollateralReturn without Effect wrapper

**Signature**

```ts
export declare const setCollateralReturnUnsafe: (
  instance: CML.TransactionBuilder,
  output: CML.TransactionOutput,
) => void;
```

Added in v2.0.0

## setExunitsUnsafe

Unsafely calls instance.setExunits without Effect wrapper

**Signature**

```ts
export declare const setExunitsUnsafe: (
  instance: CML.TransactionBuilder,
  redeemer: CML.RedeemerWitnessKey,
  exUnits: CML.ExUnits,
) => void;
```

Added in v2.0.0

## setFeeUnsafe

Unsafely calls instance.setFee without Effect wrapper

**Signature**

```ts
export declare const setFeeUnsafe: (
  instance: CML.TransactionBuilder,
  fee: bigint,
) => void;
```

Added in v2.0.0

## setNetworkIdUnsafe

Unsafely calls instance.setNetworkId without Effect wrapper

**Signature**

```ts
export declare const setNetworkIdUnsafe: (
  instance: CML.TransactionBuilder,
  networkId: CML.NetworkId,
) => void;
```

Added in v2.0.0

## setTtlUnsafe

Unsafely calls instance.setTtl without Effect wrapper

**Signature**

```ts
export declare const setTtlUnsafe: (
  instance: CML.TransactionBuilder,
  ttl: bigint,
) => void;
```

Added in v2.0.0

## setValidityStartIntervalUnsafe

Unsafely calls instance.setValidityStartInterval without Effect wrapper

**Signature**

```ts
export declare const setValidityStartIntervalUnsafe: (
  instance: CML.TransactionBuilder,
  validityStartInterval: bigint,
) => void;
```

Added in v2.0.0

# Types

## TransactionBuilder (type alias)

Type alias for the CML TransactionBuilder class

**Signature**

```ts
export type TransactionBuilder = CML.TransactionBuilder;
```

Added in v2.0.0
