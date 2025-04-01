---
title: CML/ProtocolParamUpdate.ts
nav_order: 174
parent: Modules
---

## ProtocolParamUpdate overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
  - [fromCborBytes](#fromcborbytes)
  - [fromCborHex](#fromcborhex)
  - [fromJson](#fromjson)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
  - [fromCborBytesUnsafe](#fromcborbytesunsafe)
  - [fromCborHexUnsafe](#fromcborhexunsafe)
  - [fromJsonUnsafe](#fromjsonunsafe)
- [Errors](#errors)
  - [ProtocolParamUpdateError (class)](#protocolparamupdateerror-class)
- [Methods](#methods)
  - [adaPerUtxoByte](#adaperutxobyte)
  - [collateralPercentage](#collateralpercentage)
  - [committeeTermLimit](#committeetermlimit)
  - [costModelsForScriptLanguages](#costmodelsforscriptlanguages)
  - [dRepDeposit](#drepdeposit)
  - [dRepInactivityPeriod](#drepinactivityperiod)
  - [dRepVotingThresholds](#drepvotingthresholds)
  - [executionCosts](#executioncosts)
  - [expansionRate](#expansionrate)
  - [free](#free)
  - [governanceActionDeposit](#governanceactiondeposit)
  - [governanceActionValidityPeriod](#governanceactionvalidityperiod)
  - [keyDeposit](#keydeposit)
  - [maxBlockBodySize](#maxblockbodysize)
  - [maxBlockExUnits](#maxblockexunits)
  - [maxBlockHeaderSize](#maxblockheadersize)
  - [maxCollateralInputs](#maxcollateralinputs)
  - [maxTransactionSize](#maxtransactionsize)
  - [maxTxExUnits](#maxtxexunits)
  - [maxValueSize](#maxvaluesize)
  - [maximumEpoch](#maximumepoch)
  - [minCommitteeSize](#mincommitteesize)
  - [minFeeRefScriptCostPerByte](#minfeerefscriptcostperbyte)
  - [minPoolCost](#minpoolcost)
  - [minfeeA](#minfeea)
  - [minfeeB](#minfeeb)
  - [nOpt](#nopt)
  - [poolDeposit](#pooldeposit)
  - [poolPledgeInfluence](#poolpledgeinfluence)
  - [poolVotingThresholds](#poolvotingthresholds)
  - [setAdaPerUtxoByte](#setadaperutxobyte)
  - [setCollateralPercentage](#setcollateralpercentage)
  - [setCommitteeTermLimit](#setcommitteetermlimit)
  - [setCostModelsForScriptLanguages](#setcostmodelsforscriptlanguages)
  - [setDRepDeposit](#setdrepdeposit)
  - [setDRepInactivityPeriod](#setdrepinactivityperiod)
  - [setDRepVotingThresholds](#setdrepvotingthresholds)
  - [setExecutionCosts](#setexecutioncosts)
  - [setExpansionRate](#setexpansionrate)
  - [setGovernanceActionDeposit](#setgovernanceactiondeposit)
  - [setGovernanceActionValidityPeriod](#setgovernanceactionvalidityperiod)
  - [setKeyDeposit](#setkeydeposit)
  - [setMaxBlockBodySize](#setmaxblockbodysize)
  - [setMaxBlockExUnits](#setmaxblockexunits)
  - [setMaxBlockHeaderSize](#setmaxblockheadersize)
  - [setMaxCollateralInputs](#setmaxcollateralinputs)
  - [setMaxTransactionSize](#setmaxtransactionsize)
  - [setMaxTxExUnits](#setmaxtxexunits)
  - [setMaxValueSize](#setmaxvaluesize)
  - [setMaximumEpoch](#setmaximumepoch)
  - [setMinCommitteeSize](#setmincommitteesize)
  - [setMinFeeRefScriptCostPerByte](#setminfeerefscriptcostperbyte)
  - [setMinPoolCost](#setminpoolcost)
  - [setMinfeeA](#setminfeea)
  - [setMinfeeB](#setminfeeb)
  - [setNOpt](#setnopt)
  - [setPoolDeposit](#setpooldeposit)
  - [setPoolPledgeInfluence](#setpoolpledgeinfluence)
  - [setPoolVotingThresholds](#setpoolvotingthresholds)
  - [setTreasuryGrowthRate](#settreasurygrowthrate)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
  - [treasuryGrowthRate](#treasurygrowthrate)
- [MethodsUnsafe](#methodsunsafe)
  - [adaPerUtxoByteUnsafe](#adaperutxobyteunsafe)
  - [collateralPercentageUnsafe](#collateralpercentageunsafe)
  - [committeeTermLimitUnsafe](#committeetermlimitunsafe)
  - [costModelsForScriptLanguagesUnsafe](#costmodelsforscriptlanguagesunsafe)
  - [dRepDepositUnsafe](#drepdepositunsafe)
  - [dRepInactivityPeriodUnsafe](#drepinactivityperiodunsafe)
  - [dRepVotingThresholdsUnsafe](#drepvotingthresholdsunsafe)
  - [executionCostsUnsafe](#executioncostsunsafe)
  - [expansionRateUnsafe](#expansionrateunsafe)
  - [freeUnsafe](#freeunsafe)
  - [governanceActionDepositUnsafe](#governanceactiondepositunsafe)
  - [governanceActionValidityPeriodUnsafe](#governanceactionvalidityperiodunsafe)
  - [keyDepositUnsafe](#keydepositunsafe)
  - [maxBlockBodySizeUnsafe](#maxblockbodysizeunsafe)
  - [maxBlockExUnitsUnsafe](#maxblockexunitsunsafe)
  - [maxBlockHeaderSizeUnsafe](#maxblockheadersizeunsafe)
  - [maxCollateralInputsUnsafe](#maxcollateralinputsunsafe)
  - [maxTransactionSizeUnsafe](#maxtransactionsizeunsafe)
  - [maxTxExUnitsUnsafe](#maxtxexunitsunsafe)
  - [maxValueSizeUnsafe](#maxvaluesizeunsafe)
  - [maximumEpochUnsafe](#maximumepochunsafe)
  - [minCommitteeSizeUnsafe](#mincommitteesizeunsafe)
  - [minFeeRefScriptCostPerByteUnsafe](#minfeerefscriptcostperbyteunsafe)
  - [minPoolCostUnsafe](#minpoolcostunsafe)
  - [minfeeAUnsafe](#minfeeaunsafe)
  - [minfeeBUnsafe](#minfeebunsafe)
  - [nOptUnsafe](#noptunsafe)
  - [poolDepositUnsafe](#pooldepositunsafe)
  - [poolPledgeInfluenceUnsafe](#poolpledgeinfluenceunsafe)
  - [poolVotingThresholdsUnsafe](#poolvotingthresholdsunsafe)
  - [setAdaPerUtxoByteUnsafe](#setadaperutxobyteunsafe)
  - [setCollateralPercentageUnsafe](#setcollateralpercentageunsafe)
  - [setCommitteeTermLimitUnsafe](#setcommitteetermlimitunsafe)
  - [setCostModelsForScriptLanguagesUnsafe](#setcostmodelsforscriptlanguagesunsafe)
  - [setDRepDepositUnsafe](#setdrepdepositunsafe)
  - [setDRepInactivityPeriodUnsafe](#setdrepinactivityperiodunsafe)
  - [setDRepVotingThresholdsUnsafe](#setdrepvotingthresholdsunsafe)
  - [setExecutionCostsUnsafe](#setexecutioncostsunsafe)
  - [setExpansionRateUnsafe](#setexpansionrateunsafe)
  - [setGovernanceActionDepositUnsafe](#setgovernanceactiondepositunsafe)
  - [setGovernanceActionValidityPeriodUnsafe](#setgovernanceactionvalidityperiodunsafe)
  - [setKeyDepositUnsafe](#setkeydepositunsafe)
  - [setMaxBlockBodySizeUnsafe](#setmaxblockbodysizeunsafe)
  - [setMaxBlockExUnitsUnsafe](#setmaxblockexunitsunsafe)
  - [setMaxBlockHeaderSizeUnsafe](#setmaxblockheadersizeunsafe)
  - [setMaxCollateralInputsUnsafe](#setmaxcollateralinputsunsafe)
  - [setMaxTransactionSizeUnsafe](#setmaxtransactionsizeunsafe)
  - [setMaxTxExUnitsUnsafe](#setmaxtxexunitsunsafe)
  - [setMaxValueSizeUnsafe](#setmaxvaluesizeunsafe)
  - [setMaximumEpochUnsafe](#setmaximumepochunsafe)
  - [setMinCommitteeSizeUnsafe](#setmincommitteesizeunsafe)
  - [setMinFeeRefScriptCostPerByteUnsafe](#setminfeerefscriptcostperbyteunsafe)
  - [setMinPoolCostUnsafe](#setminpoolcostunsafe)
  - [setMinfeeAUnsafe](#setminfeeaunsafe)
  - [setMinfeeBUnsafe](#setminfeebunsafe)
  - [setNOptUnsafe](#setnoptunsafe)
  - [setPoolDepositUnsafe](#setpooldepositunsafe)
  - [setPoolPledgeInfluenceUnsafe](#setpoolpledgeinfluenceunsafe)
  - [setPoolVotingThresholdsUnsafe](#setpoolvotingthresholdsunsafe)
  - [setTreasuryGrowthRateUnsafe](#settreasurygrowthrateunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
  - [treasuryGrowthRateUnsafe](#treasurygrowthrateunsafe)
- [Types](#types)
  - [ProtocolParamUpdate (type alias)](#protocolparamupdate-type-alias)

---

# Constructors

## \_new

Static method \_new of ProtocolParamUpdate

**Signature**

```ts
export declare const _new: () => Effect.Effect<
  CML.ProtocolParamUpdate,
  ProtocolParamUpdateError
>;
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of ProtocolParamUpdate

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.ProtocolParamUpdate, ProtocolParamUpdateError>;
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of ProtocolParamUpdate

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.ProtocolParamUpdate, ProtocolParamUpdateError>;
```

Added in v2.0.0

## fromJson

Static method fromJson of ProtocolParamUpdate

**Signature**

```ts
export declare const fromJson: (
  json: string,
) => Effect.Effect<CML.ProtocolParamUpdate, ProtocolParamUpdateError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls ProtocolParamUpdate.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: () => CML.ProtocolParamUpdate;
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls ProtocolParamUpdate.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (
  cborBytes: Uint8Array,
) => CML.ProtocolParamUpdate;
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls ProtocolParamUpdate.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (
  cborBytes: string,
) => CML.ProtocolParamUpdate;
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls ProtocolParamUpdate.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.ProtocolParamUpdate;
```

Added in v2.0.0

# Errors

## ProtocolParamUpdateError (class)

Error class for ProtocolParamUpdate operations

This error is thrown when operations on ProtocolParamUpdate instances fail.

**Signature**

```ts
export declare class ProtocolParamUpdateError
```

Added in v2.0.0

# Methods

## adaPerUtxoByte

Method adaPerUtxoByte of ProtocolParamUpdate

**Signature**

```ts
export declare const adaPerUtxoByte: (
  instance: CML.ProtocolParamUpdate,
) => Effect.Effect<bigint | undefined, ProtocolParamUpdateError>;
```

Added in v2.0.0

## collateralPercentage

Method collateralPercentage of ProtocolParamUpdate

**Signature**

```ts
export declare const collateralPercentage: (
  instance: CML.ProtocolParamUpdate,
) => Effect.Effect<bigint | undefined, ProtocolParamUpdateError>;
```

Added in v2.0.0

## committeeTermLimit

Method committeeTermLimit of ProtocolParamUpdate

**Signature**

```ts
export declare const committeeTermLimit: (
  instance: CML.ProtocolParamUpdate,
) => Effect.Effect<bigint | undefined, ProtocolParamUpdateError>;
```

Added in v2.0.0

## costModelsForScriptLanguages

Method costModelsForScriptLanguages of ProtocolParamUpdate

**Signature**

```ts
export declare const costModelsForScriptLanguages: (
  instance: CML.ProtocolParamUpdate,
) => Effect.Effect<CML.CostModels | undefined, ProtocolParamUpdateError>;
```

Added in v2.0.0

## dRepDeposit

Method dRepDeposit of ProtocolParamUpdate

**Signature**

```ts
export declare const dRepDeposit: (
  instance: CML.ProtocolParamUpdate,
) => Effect.Effect<bigint | undefined, ProtocolParamUpdateError>;
```

Added in v2.0.0

## dRepInactivityPeriod

Method dRepInactivityPeriod of ProtocolParamUpdate

**Signature**

```ts
export declare const dRepInactivityPeriod: (
  instance: CML.ProtocolParamUpdate,
) => Effect.Effect<bigint | undefined, ProtocolParamUpdateError>;
```

Added in v2.0.0

## dRepVotingThresholds

Method dRepVotingThresholds of ProtocolParamUpdate

**Signature**

```ts
export declare const dRepVotingThresholds: (
  instance: CML.ProtocolParamUpdate,
) => Effect.Effect<
  CML.DRepVotingThresholds | undefined,
  ProtocolParamUpdateError
>;
```

Added in v2.0.0

## executionCosts

Method executionCosts of ProtocolParamUpdate

**Signature**

```ts
export declare const executionCosts: (
  instance: CML.ProtocolParamUpdate,
) => Effect.Effect<CML.ExUnitPrices | undefined, ProtocolParamUpdateError>;
```

Added in v2.0.0

## expansionRate

Method expansionRate of ProtocolParamUpdate

**Signature**

```ts
export declare const expansionRate: (
  instance: CML.ProtocolParamUpdate,
) => Effect.Effect<CML.UnitInterval | undefined, ProtocolParamUpdateError>;
```

Added in v2.0.0

## free

Method free of ProtocolParamUpdate

**Signature**

```ts
export declare const free: (
  instance: CML.ProtocolParamUpdate,
) => Effect.Effect<void, ProtocolParamUpdateError>;
```

Added in v2.0.0

## governanceActionDeposit

Method governanceActionDeposit of ProtocolParamUpdate

**Signature**

```ts
export declare const governanceActionDeposit: (
  instance: CML.ProtocolParamUpdate,
) => Effect.Effect<bigint | undefined, ProtocolParamUpdateError>;
```

Added in v2.0.0

## governanceActionValidityPeriod

Method governanceActionValidityPeriod of ProtocolParamUpdate

**Signature**

```ts
export declare const governanceActionValidityPeriod: (
  instance: CML.ProtocolParamUpdate,
) => Effect.Effect<bigint | undefined, ProtocolParamUpdateError>;
```

Added in v2.0.0

## keyDeposit

Method keyDeposit of ProtocolParamUpdate

**Signature**

```ts
export declare const keyDeposit: (
  instance: CML.ProtocolParamUpdate,
) => Effect.Effect<bigint | undefined, ProtocolParamUpdateError>;
```

Added in v2.0.0

## maxBlockBodySize

Method maxBlockBodySize of ProtocolParamUpdate

**Signature**

```ts
export declare const maxBlockBodySize: (
  instance: CML.ProtocolParamUpdate,
) => Effect.Effect<bigint | undefined, ProtocolParamUpdateError>;
```

Added in v2.0.0

## maxBlockExUnits

Method maxBlockExUnits of ProtocolParamUpdate

**Signature**

```ts
export declare const maxBlockExUnits: (
  instance: CML.ProtocolParamUpdate,
) => Effect.Effect<CML.ExUnits | undefined, ProtocolParamUpdateError>;
```

Added in v2.0.0

## maxBlockHeaderSize

Method maxBlockHeaderSize of ProtocolParamUpdate

**Signature**

```ts
export declare const maxBlockHeaderSize: (
  instance: CML.ProtocolParamUpdate,
) => Effect.Effect<bigint | undefined, ProtocolParamUpdateError>;
```

Added in v2.0.0

## maxCollateralInputs

Method maxCollateralInputs of ProtocolParamUpdate

**Signature**

```ts
export declare const maxCollateralInputs: (
  instance: CML.ProtocolParamUpdate,
) => Effect.Effect<bigint | undefined, ProtocolParamUpdateError>;
```

Added in v2.0.0

## maxTransactionSize

Method maxTransactionSize of ProtocolParamUpdate

**Signature**

```ts
export declare const maxTransactionSize: (
  instance: CML.ProtocolParamUpdate,
) => Effect.Effect<bigint | undefined, ProtocolParamUpdateError>;
```

Added in v2.0.0

## maxTxExUnits

Method maxTxExUnits of ProtocolParamUpdate

**Signature**

```ts
export declare const maxTxExUnits: (
  instance: CML.ProtocolParamUpdate,
) => Effect.Effect<CML.ExUnits | undefined, ProtocolParamUpdateError>;
```

Added in v2.0.0

## maxValueSize

Method maxValueSize of ProtocolParamUpdate

**Signature**

```ts
export declare const maxValueSize: (
  instance: CML.ProtocolParamUpdate,
) => Effect.Effect<bigint | undefined, ProtocolParamUpdateError>;
```

Added in v2.0.0

## maximumEpoch

Method maximumEpoch of ProtocolParamUpdate

**Signature**

```ts
export declare const maximumEpoch: (
  instance: CML.ProtocolParamUpdate,
) => Effect.Effect<bigint | undefined, ProtocolParamUpdateError>;
```

Added in v2.0.0

## minCommitteeSize

Method minCommitteeSize of ProtocolParamUpdate

**Signature**

```ts
export declare const minCommitteeSize: (
  instance: CML.ProtocolParamUpdate,
) => Effect.Effect<bigint | undefined, ProtocolParamUpdateError>;
```

Added in v2.0.0

## minFeeRefScriptCostPerByte

Method minFeeRefScriptCostPerByte of ProtocolParamUpdate

**Signature**

```ts
export declare const minFeeRefScriptCostPerByte: (
  instance: CML.ProtocolParamUpdate,
) => Effect.Effect<CML.Rational | undefined, ProtocolParamUpdateError>;
```

Added in v2.0.0

## minPoolCost

Method minPoolCost of ProtocolParamUpdate

**Signature**

```ts
export declare const minPoolCost: (
  instance: CML.ProtocolParamUpdate,
) => Effect.Effect<bigint | undefined, ProtocolParamUpdateError>;
```

Added in v2.0.0

## minfeeA

Method minfeeA of ProtocolParamUpdate

**Signature**

```ts
export declare const minfeeA: (
  instance: CML.ProtocolParamUpdate,
) => Effect.Effect<bigint | undefined, ProtocolParamUpdateError>;
```

Added in v2.0.0

## minfeeB

Method minfeeB of ProtocolParamUpdate

**Signature**

```ts
export declare const minfeeB: (
  instance: CML.ProtocolParamUpdate,
) => Effect.Effect<bigint | undefined, ProtocolParamUpdateError>;
```

Added in v2.0.0

## nOpt

Method nOpt of ProtocolParamUpdate

**Signature**

```ts
export declare const nOpt: (
  instance: CML.ProtocolParamUpdate,
) => Effect.Effect<bigint | undefined, ProtocolParamUpdateError>;
```

Added in v2.0.0

## poolDeposit

Method poolDeposit of ProtocolParamUpdate

**Signature**

```ts
export declare const poolDeposit: (
  instance: CML.ProtocolParamUpdate,
) => Effect.Effect<bigint | undefined, ProtocolParamUpdateError>;
```

Added in v2.0.0

## poolPledgeInfluence

Method poolPledgeInfluence of ProtocolParamUpdate

**Signature**

```ts
export declare const poolPledgeInfluence: (
  instance: CML.ProtocolParamUpdate,
) => Effect.Effect<CML.Rational | undefined, ProtocolParamUpdateError>;
```

Added in v2.0.0

## poolVotingThresholds

Method poolVotingThresholds of ProtocolParamUpdate

**Signature**

```ts
export declare const poolVotingThresholds: (
  instance: CML.ProtocolParamUpdate,
) => Effect.Effect<
  CML.PoolVotingThresholds | undefined,
  ProtocolParamUpdateError
>;
```

Added in v2.0.0

## setAdaPerUtxoByte

Method setAdaPerUtxoByte of ProtocolParamUpdate

**Signature**

```ts
export declare const setAdaPerUtxoByte: (
  instance: CML.ProtocolParamUpdate,
  adaPerUtxoByte: bigint,
) => Effect.Effect<void, ProtocolParamUpdateError>;
```

Added in v2.0.0

## setCollateralPercentage

Method setCollateralPercentage of ProtocolParamUpdate

**Signature**

```ts
export declare const setCollateralPercentage: (
  instance: CML.ProtocolParamUpdate,
  collateralPercentage: bigint,
) => Effect.Effect<void, ProtocolParamUpdateError>;
```

Added in v2.0.0

## setCommitteeTermLimit

Method setCommitteeTermLimit of ProtocolParamUpdate

**Signature**

```ts
export declare const setCommitteeTermLimit: (
  instance: CML.ProtocolParamUpdate,
  committeeTermLimit: bigint,
) => Effect.Effect<void, ProtocolParamUpdateError>;
```

Added in v2.0.0

## setCostModelsForScriptLanguages

Method setCostModelsForScriptLanguages of ProtocolParamUpdate

**Signature**

```ts
export declare const setCostModelsForScriptLanguages: (
  instance: CML.ProtocolParamUpdate,
  costModelsForScriptLanguages: CML.CostModels,
) => Effect.Effect<void, ProtocolParamUpdateError>;
```

Added in v2.0.0

## setDRepDeposit

Method setDRepDeposit of ProtocolParamUpdate

**Signature**

```ts
export declare const setDRepDeposit: (
  instance: CML.ProtocolParamUpdate,
  dRepDeposit: bigint,
) => Effect.Effect<void, ProtocolParamUpdateError>;
```

Added in v2.0.0

## setDRepInactivityPeriod

Method setDRepInactivityPeriod of ProtocolParamUpdate

**Signature**

```ts
export declare const setDRepInactivityPeriod: (
  instance: CML.ProtocolParamUpdate,
  dRepInactivityPeriod: bigint,
) => Effect.Effect<void, ProtocolParamUpdateError>;
```

Added in v2.0.0

## setDRepVotingThresholds

Method setDRepVotingThresholds of ProtocolParamUpdate

**Signature**

```ts
export declare const setDRepVotingThresholds: (
  instance: CML.ProtocolParamUpdate,
  dRepVotingThresholds: CML.DRepVotingThresholds,
) => Effect.Effect<void, ProtocolParamUpdateError>;
```

Added in v2.0.0

## setExecutionCosts

Method setExecutionCosts of ProtocolParamUpdate

**Signature**

```ts
export declare const setExecutionCosts: (
  instance: CML.ProtocolParamUpdate,
  executionCosts: CML.ExUnitPrices,
) => Effect.Effect<void, ProtocolParamUpdateError>;
```

Added in v2.0.0

## setExpansionRate

Method setExpansionRate of ProtocolParamUpdate

**Signature**

```ts
export declare const setExpansionRate: (
  instance: CML.ProtocolParamUpdate,
  expansionRate: CML.UnitInterval,
) => Effect.Effect<void, ProtocolParamUpdateError>;
```

Added in v2.0.0

## setGovernanceActionDeposit

Method setGovernanceActionDeposit of ProtocolParamUpdate

**Signature**

```ts
export declare const setGovernanceActionDeposit: (
  instance: CML.ProtocolParamUpdate,
  governanceActionDeposit: bigint,
) => Effect.Effect<void, ProtocolParamUpdateError>;
```

Added in v2.0.0

## setGovernanceActionValidityPeriod

Method setGovernanceActionValidityPeriod of ProtocolParamUpdate

**Signature**

```ts
export declare const setGovernanceActionValidityPeriod: (
  instance: CML.ProtocolParamUpdate,
  governanceActionValidityPeriod: bigint,
) => Effect.Effect<void, ProtocolParamUpdateError>;
```

Added in v2.0.0

## setKeyDeposit

Method setKeyDeposit of ProtocolParamUpdate

**Signature**

```ts
export declare const setKeyDeposit: (
  instance: CML.ProtocolParamUpdate,
  keyDeposit: bigint,
) => Effect.Effect<void, ProtocolParamUpdateError>;
```

Added in v2.0.0

## setMaxBlockBodySize

Method setMaxBlockBodySize of ProtocolParamUpdate

**Signature**

```ts
export declare const setMaxBlockBodySize: (
  instance: CML.ProtocolParamUpdate,
  maxBlockBodySize: bigint,
) => Effect.Effect<void, ProtocolParamUpdateError>;
```

Added in v2.0.0

## setMaxBlockExUnits

Method setMaxBlockExUnits of ProtocolParamUpdate

**Signature**

```ts
export declare const setMaxBlockExUnits: (
  instance: CML.ProtocolParamUpdate,
  maxBlockExUnits: CML.ExUnits,
) => Effect.Effect<void, ProtocolParamUpdateError>;
```

Added in v2.0.0

## setMaxBlockHeaderSize

Method setMaxBlockHeaderSize of ProtocolParamUpdate

**Signature**

```ts
export declare const setMaxBlockHeaderSize: (
  instance: CML.ProtocolParamUpdate,
  maxBlockHeaderSize: bigint,
) => Effect.Effect<void, ProtocolParamUpdateError>;
```

Added in v2.0.0

## setMaxCollateralInputs

Method setMaxCollateralInputs of ProtocolParamUpdate

**Signature**

```ts
export declare const setMaxCollateralInputs: (
  instance: CML.ProtocolParamUpdate,
  maxCollateralInputs: bigint,
) => Effect.Effect<void, ProtocolParamUpdateError>;
```

Added in v2.0.0

## setMaxTransactionSize

Method setMaxTransactionSize of ProtocolParamUpdate

**Signature**

```ts
export declare const setMaxTransactionSize: (
  instance: CML.ProtocolParamUpdate,
  maxTransactionSize: bigint,
) => Effect.Effect<void, ProtocolParamUpdateError>;
```

Added in v2.0.0

## setMaxTxExUnits

Method setMaxTxExUnits of ProtocolParamUpdate

**Signature**

```ts
export declare const setMaxTxExUnits: (
  instance: CML.ProtocolParamUpdate,
  maxTxExUnits: CML.ExUnits,
) => Effect.Effect<void, ProtocolParamUpdateError>;
```

Added in v2.0.0

## setMaxValueSize

Method setMaxValueSize of ProtocolParamUpdate

**Signature**

```ts
export declare const setMaxValueSize: (
  instance: CML.ProtocolParamUpdate,
  maxValueSize: bigint,
) => Effect.Effect<void, ProtocolParamUpdateError>;
```

Added in v2.0.0

## setMaximumEpoch

Method setMaximumEpoch of ProtocolParamUpdate

**Signature**

```ts
export declare const setMaximumEpoch: (
  instance: CML.ProtocolParamUpdate,
  maximumEpoch: bigint,
) => Effect.Effect<void, ProtocolParamUpdateError>;
```

Added in v2.0.0

## setMinCommitteeSize

Method setMinCommitteeSize of ProtocolParamUpdate

**Signature**

```ts
export declare const setMinCommitteeSize: (
  instance: CML.ProtocolParamUpdate,
  minCommitteeSize: bigint,
) => Effect.Effect<void, ProtocolParamUpdateError>;
```

Added in v2.0.0

## setMinFeeRefScriptCostPerByte

Method setMinFeeRefScriptCostPerByte of ProtocolParamUpdate

**Signature**

```ts
export declare const setMinFeeRefScriptCostPerByte: (
  instance: CML.ProtocolParamUpdate,
  minFeeRefScriptCostPerByte: CML.Rational,
) => Effect.Effect<void, ProtocolParamUpdateError>;
```

Added in v2.0.0

## setMinPoolCost

Method setMinPoolCost of ProtocolParamUpdate

**Signature**

```ts
export declare const setMinPoolCost: (
  instance: CML.ProtocolParamUpdate,
  minPoolCost: bigint,
) => Effect.Effect<void, ProtocolParamUpdateError>;
```

Added in v2.0.0

## setMinfeeA

Method setMinfeeA of ProtocolParamUpdate

**Signature**

```ts
export declare const setMinfeeA: (
  instance: CML.ProtocolParamUpdate,
  minfeeA: bigint,
) => Effect.Effect<void, ProtocolParamUpdateError>;
```

Added in v2.0.0

## setMinfeeB

Method setMinfeeB of ProtocolParamUpdate

**Signature**

```ts
export declare const setMinfeeB: (
  instance: CML.ProtocolParamUpdate,
  minfeeB: bigint,
) => Effect.Effect<void, ProtocolParamUpdateError>;
```

Added in v2.0.0

## setNOpt

Method setNOpt of ProtocolParamUpdate

**Signature**

```ts
export declare const setNOpt: (
  instance: CML.ProtocolParamUpdate,
  nOpt: bigint,
) => Effect.Effect<void, ProtocolParamUpdateError>;
```

Added in v2.0.0

## setPoolDeposit

Method setPoolDeposit of ProtocolParamUpdate

**Signature**

```ts
export declare const setPoolDeposit: (
  instance: CML.ProtocolParamUpdate,
  poolDeposit: bigint,
) => Effect.Effect<void, ProtocolParamUpdateError>;
```

Added in v2.0.0

## setPoolPledgeInfluence

Method setPoolPledgeInfluence of ProtocolParamUpdate

**Signature**

```ts
export declare const setPoolPledgeInfluence: (
  instance: CML.ProtocolParamUpdate,
  poolPledgeInfluence: CML.Rational,
) => Effect.Effect<void, ProtocolParamUpdateError>;
```

Added in v2.0.0

## setPoolVotingThresholds

Method setPoolVotingThresholds of ProtocolParamUpdate

**Signature**

```ts
export declare const setPoolVotingThresholds: (
  instance: CML.ProtocolParamUpdate,
  poolVotingThresholds: CML.PoolVotingThresholds,
) => Effect.Effect<void, ProtocolParamUpdateError>;
```

Added in v2.0.0

## setTreasuryGrowthRate

Method setTreasuryGrowthRate of ProtocolParamUpdate

**Signature**

```ts
export declare const setTreasuryGrowthRate: (
  instance: CML.ProtocolParamUpdate,
  treasuryGrowthRate: CML.UnitInterval,
) => Effect.Effect<void, ProtocolParamUpdateError>;
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of ProtocolParamUpdate

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.ProtocolParamUpdate,
) => Effect.Effect<Uint8Array, ProtocolParamUpdateError>;
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of ProtocolParamUpdate

**Signature**

```ts
export declare const toCanonicalCborHex: (
  instance: CML.ProtocolParamUpdate,
) => Effect.Effect<string, ProtocolParamUpdateError>;
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of ProtocolParamUpdate

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.ProtocolParamUpdate,
) => Effect.Effect<Uint8Array, ProtocolParamUpdateError>;
```

Added in v2.0.0

## toCborHex

Method toCborHex of ProtocolParamUpdate

**Signature**

```ts
export declare const toCborHex: (
  instance: CML.ProtocolParamUpdate,
) => Effect.Effect<string, ProtocolParamUpdateError>;
```

Added in v2.0.0

## toJsValue

Method toJsValue of ProtocolParamUpdate

**Signature**

```ts
export declare const toJsValue: (
  instance: CML.ProtocolParamUpdate,
) => Effect.Effect<any, ProtocolParamUpdateError>;
```

Added in v2.0.0

## toJson

Method toJson of ProtocolParamUpdate

**Signature**

```ts
export declare const toJson: (
  instance: CML.ProtocolParamUpdate,
) => Effect.Effect<string, ProtocolParamUpdateError>;
```

Added in v2.0.0

## treasuryGrowthRate

Method treasuryGrowthRate of ProtocolParamUpdate

**Signature**

```ts
export declare const treasuryGrowthRate: (
  instance: CML.ProtocolParamUpdate,
) => Effect.Effect<CML.UnitInterval | undefined, ProtocolParamUpdateError>;
```

Added in v2.0.0

# MethodsUnsafe

## adaPerUtxoByteUnsafe

Unsafely calls instance.adaPerUtxoByte without Effect wrapper

**Signature**

```ts
export declare const adaPerUtxoByteUnsafe: (
  instance: CML.ProtocolParamUpdate,
) => bigint | undefined;
```

Added in v2.0.0

## collateralPercentageUnsafe

Unsafely calls instance.collateralPercentage without Effect wrapper

**Signature**

```ts
export declare const collateralPercentageUnsafe: (
  instance: CML.ProtocolParamUpdate,
) => bigint | undefined;
```

Added in v2.0.0

## committeeTermLimitUnsafe

Unsafely calls instance.committeeTermLimit without Effect wrapper

**Signature**

```ts
export declare const committeeTermLimitUnsafe: (
  instance: CML.ProtocolParamUpdate,
) => bigint | undefined;
```

Added in v2.0.0

## costModelsForScriptLanguagesUnsafe

Unsafely calls instance.costModelsForScriptLanguages without Effect wrapper

**Signature**

```ts
export declare const costModelsForScriptLanguagesUnsafe: (
  instance: CML.ProtocolParamUpdate,
) => CML.CostModels | undefined;
```

Added in v2.0.0

## dRepDepositUnsafe

Unsafely calls instance.dRepDeposit without Effect wrapper

**Signature**

```ts
export declare const dRepDepositUnsafe: (
  instance: CML.ProtocolParamUpdate,
) => bigint | undefined;
```

Added in v2.0.0

## dRepInactivityPeriodUnsafe

Unsafely calls instance.dRepInactivityPeriod without Effect wrapper

**Signature**

```ts
export declare const dRepInactivityPeriodUnsafe: (
  instance: CML.ProtocolParamUpdate,
) => bigint | undefined;
```

Added in v2.0.0

## dRepVotingThresholdsUnsafe

Unsafely calls instance.dRepVotingThresholds without Effect wrapper

**Signature**

```ts
export declare const dRepVotingThresholdsUnsafe: (
  instance: CML.ProtocolParamUpdate,
) => CML.DRepVotingThresholds | undefined;
```

Added in v2.0.0

## executionCostsUnsafe

Unsafely calls instance.executionCosts without Effect wrapper

**Signature**

```ts
export declare const executionCostsUnsafe: (
  instance: CML.ProtocolParamUpdate,
) => CML.ExUnitPrices | undefined;
```

Added in v2.0.0

## expansionRateUnsafe

Unsafely calls instance.expansionRate without Effect wrapper

**Signature**

```ts
export declare const expansionRateUnsafe: (
  instance: CML.ProtocolParamUpdate,
) => CML.UnitInterval | undefined;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.ProtocolParamUpdate) => void;
```

Added in v2.0.0

## governanceActionDepositUnsafe

Unsafely calls instance.governanceActionDeposit without Effect wrapper

**Signature**

```ts
export declare const governanceActionDepositUnsafe: (
  instance: CML.ProtocolParamUpdate,
) => bigint | undefined;
```

Added in v2.0.0

## governanceActionValidityPeriodUnsafe

Unsafely calls instance.governanceActionValidityPeriod without Effect wrapper

**Signature**

```ts
export declare const governanceActionValidityPeriodUnsafe: (
  instance: CML.ProtocolParamUpdate,
) => bigint | undefined;
```

Added in v2.0.0

## keyDepositUnsafe

Unsafely calls instance.keyDeposit without Effect wrapper

**Signature**

```ts
export declare const keyDepositUnsafe: (
  instance: CML.ProtocolParamUpdate,
) => bigint | undefined;
```

Added in v2.0.0

## maxBlockBodySizeUnsafe

Unsafely calls instance.maxBlockBodySize without Effect wrapper

**Signature**

```ts
export declare const maxBlockBodySizeUnsafe: (
  instance: CML.ProtocolParamUpdate,
) => bigint | undefined;
```

Added in v2.0.0

## maxBlockExUnitsUnsafe

Unsafely calls instance.maxBlockExUnits without Effect wrapper

**Signature**

```ts
export declare const maxBlockExUnitsUnsafe: (
  instance: CML.ProtocolParamUpdate,
) => CML.ExUnits | undefined;
```

Added in v2.0.0

## maxBlockHeaderSizeUnsafe

Unsafely calls instance.maxBlockHeaderSize without Effect wrapper

**Signature**

```ts
export declare const maxBlockHeaderSizeUnsafe: (
  instance: CML.ProtocolParamUpdate,
) => bigint | undefined;
```

Added in v2.0.0

## maxCollateralInputsUnsafe

Unsafely calls instance.maxCollateralInputs without Effect wrapper

**Signature**

```ts
export declare const maxCollateralInputsUnsafe: (
  instance: CML.ProtocolParamUpdate,
) => bigint | undefined;
```

Added in v2.0.0

## maxTransactionSizeUnsafe

Unsafely calls instance.maxTransactionSize without Effect wrapper

**Signature**

```ts
export declare const maxTransactionSizeUnsafe: (
  instance: CML.ProtocolParamUpdate,
) => bigint | undefined;
```

Added in v2.0.0

## maxTxExUnitsUnsafe

Unsafely calls instance.maxTxExUnits without Effect wrapper

**Signature**

```ts
export declare const maxTxExUnitsUnsafe: (
  instance: CML.ProtocolParamUpdate,
) => CML.ExUnits | undefined;
```

Added in v2.0.0

## maxValueSizeUnsafe

Unsafely calls instance.maxValueSize without Effect wrapper

**Signature**

```ts
export declare const maxValueSizeUnsafe: (
  instance: CML.ProtocolParamUpdate,
) => bigint | undefined;
```

Added in v2.0.0

## maximumEpochUnsafe

Unsafely calls instance.maximumEpoch without Effect wrapper

**Signature**

```ts
export declare const maximumEpochUnsafe: (
  instance: CML.ProtocolParamUpdate,
) => bigint | undefined;
```

Added in v2.0.0

## minCommitteeSizeUnsafe

Unsafely calls instance.minCommitteeSize without Effect wrapper

**Signature**

```ts
export declare const minCommitteeSizeUnsafe: (
  instance: CML.ProtocolParamUpdate,
) => bigint | undefined;
```

Added in v2.0.0

## minFeeRefScriptCostPerByteUnsafe

Unsafely calls instance.minFeeRefScriptCostPerByte without Effect wrapper

**Signature**

```ts
export declare const minFeeRefScriptCostPerByteUnsafe: (
  instance: CML.ProtocolParamUpdate,
) => CML.Rational | undefined;
```

Added in v2.0.0

## minPoolCostUnsafe

Unsafely calls instance.minPoolCost without Effect wrapper

**Signature**

```ts
export declare const minPoolCostUnsafe: (
  instance: CML.ProtocolParamUpdate,
) => bigint | undefined;
```

Added in v2.0.0

## minfeeAUnsafe

Unsafely calls instance.minfeeA without Effect wrapper

**Signature**

```ts
export declare const minfeeAUnsafe: (
  instance: CML.ProtocolParamUpdate,
) => bigint | undefined;
```

Added in v2.0.0

## minfeeBUnsafe

Unsafely calls instance.minfeeB without Effect wrapper

**Signature**

```ts
export declare const minfeeBUnsafe: (
  instance: CML.ProtocolParamUpdate,
) => bigint | undefined;
```

Added in v2.0.0

## nOptUnsafe

Unsafely calls instance.nOpt without Effect wrapper

**Signature**

```ts
export declare const nOptUnsafe: (
  instance: CML.ProtocolParamUpdate,
) => bigint | undefined;
```

Added in v2.0.0

## poolDepositUnsafe

Unsafely calls instance.poolDeposit without Effect wrapper

**Signature**

```ts
export declare const poolDepositUnsafe: (
  instance: CML.ProtocolParamUpdate,
) => bigint | undefined;
```

Added in v2.0.0

## poolPledgeInfluenceUnsafe

Unsafely calls instance.poolPledgeInfluence without Effect wrapper

**Signature**

```ts
export declare const poolPledgeInfluenceUnsafe: (
  instance: CML.ProtocolParamUpdate,
) => CML.Rational | undefined;
```

Added in v2.0.0

## poolVotingThresholdsUnsafe

Unsafely calls instance.poolVotingThresholds without Effect wrapper

**Signature**

```ts
export declare const poolVotingThresholdsUnsafe: (
  instance: CML.ProtocolParamUpdate,
) => CML.PoolVotingThresholds | undefined;
```

Added in v2.0.0

## setAdaPerUtxoByteUnsafe

Unsafely calls instance.setAdaPerUtxoByte without Effect wrapper

**Signature**

```ts
export declare const setAdaPerUtxoByteUnsafe: (
  instance: CML.ProtocolParamUpdate,
  adaPerUtxoByte: bigint,
) => void;
```

Added in v2.0.0

## setCollateralPercentageUnsafe

Unsafely calls instance.setCollateralPercentage without Effect wrapper

**Signature**

```ts
export declare const setCollateralPercentageUnsafe: (
  instance: CML.ProtocolParamUpdate,
  collateralPercentage: bigint,
) => void;
```

Added in v2.0.0

## setCommitteeTermLimitUnsafe

Unsafely calls instance.setCommitteeTermLimit without Effect wrapper

**Signature**

```ts
export declare const setCommitteeTermLimitUnsafe: (
  instance: CML.ProtocolParamUpdate,
  committeeTermLimit: bigint,
) => void;
```

Added in v2.0.0

## setCostModelsForScriptLanguagesUnsafe

Unsafely calls instance.setCostModelsForScriptLanguages without Effect wrapper

**Signature**

```ts
export declare const setCostModelsForScriptLanguagesUnsafe: (
  instance: CML.ProtocolParamUpdate,
  costModelsForScriptLanguages: CML.CostModels,
) => void;
```

Added in v2.0.0

## setDRepDepositUnsafe

Unsafely calls instance.setDRepDeposit without Effect wrapper

**Signature**

```ts
export declare const setDRepDepositUnsafe: (
  instance: CML.ProtocolParamUpdate,
  dRepDeposit: bigint,
) => void;
```

Added in v2.0.0

## setDRepInactivityPeriodUnsafe

Unsafely calls instance.setDRepInactivityPeriod without Effect wrapper

**Signature**

```ts
export declare const setDRepInactivityPeriodUnsafe: (
  instance: CML.ProtocolParamUpdate,
  dRepInactivityPeriod: bigint,
) => void;
```

Added in v2.0.0

## setDRepVotingThresholdsUnsafe

Unsafely calls instance.setDRepVotingThresholds without Effect wrapper

**Signature**

```ts
export declare const setDRepVotingThresholdsUnsafe: (
  instance: CML.ProtocolParamUpdate,
  dRepVotingThresholds: CML.DRepVotingThresholds,
) => void;
```

Added in v2.0.0

## setExecutionCostsUnsafe

Unsafely calls instance.setExecutionCosts without Effect wrapper

**Signature**

```ts
export declare const setExecutionCostsUnsafe: (
  instance: CML.ProtocolParamUpdate,
  executionCosts: CML.ExUnitPrices,
) => void;
```

Added in v2.0.0

## setExpansionRateUnsafe

Unsafely calls instance.setExpansionRate without Effect wrapper

**Signature**

```ts
export declare const setExpansionRateUnsafe: (
  instance: CML.ProtocolParamUpdate,
  expansionRate: CML.UnitInterval,
) => void;
```

Added in v2.0.0

## setGovernanceActionDepositUnsafe

Unsafely calls instance.setGovernanceActionDeposit without Effect wrapper

**Signature**

```ts
export declare const setGovernanceActionDepositUnsafe: (
  instance: CML.ProtocolParamUpdate,
  governanceActionDeposit: bigint,
) => void;
```

Added in v2.0.0

## setGovernanceActionValidityPeriodUnsafe

Unsafely calls instance.setGovernanceActionValidityPeriod without Effect wrapper

**Signature**

```ts
export declare const setGovernanceActionValidityPeriodUnsafe: (
  instance: CML.ProtocolParamUpdate,
  governanceActionValidityPeriod: bigint,
) => void;
```

Added in v2.0.0

## setKeyDepositUnsafe

Unsafely calls instance.setKeyDeposit without Effect wrapper

**Signature**

```ts
export declare const setKeyDepositUnsafe: (
  instance: CML.ProtocolParamUpdate,
  keyDeposit: bigint,
) => void;
```

Added in v2.0.0

## setMaxBlockBodySizeUnsafe

Unsafely calls instance.setMaxBlockBodySize without Effect wrapper

**Signature**

```ts
export declare const setMaxBlockBodySizeUnsafe: (
  instance: CML.ProtocolParamUpdate,
  maxBlockBodySize: bigint,
) => void;
```

Added in v2.0.0

## setMaxBlockExUnitsUnsafe

Unsafely calls instance.setMaxBlockExUnits without Effect wrapper

**Signature**

```ts
export declare const setMaxBlockExUnitsUnsafe: (
  instance: CML.ProtocolParamUpdate,
  maxBlockExUnits: CML.ExUnits,
) => void;
```

Added in v2.0.0

## setMaxBlockHeaderSizeUnsafe

Unsafely calls instance.setMaxBlockHeaderSize without Effect wrapper

**Signature**

```ts
export declare const setMaxBlockHeaderSizeUnsafe: (
  instance: CML.ProtocolParamUpdate,
  maxBlockHeaderSize: bigint,
) => void;
```

Added in v2.0.0

## setMaxCollateralInputsUnsafe

Unsafely calls instance.setMaxCollateralInputs without Effect wrapper

**Signature**

```ts
export declare const setMaxCollateralInputsUnsafe: (
  instance: CML.ProtocolParamUpdate,
  maxCollateralInputs: bigint,
) => void;
```

Added in v2.0.0

## setMaxTransactionSizeUnsafe

Unsafely calls instance.setMaxTransactionSize without Effect wrapper

**Signature**

```ts
export declare const setMaxTransactionSizeUnsafe: (
  instance: CML.ProtocolParamUpdate,
  maxTransactionSize: bigint,
) => void;
```

Added in v2.0.0

## setMaxTxExUnitsUnsafe

Unsafely calls instance.setMaxTxExUnits without Effect wrapper

**Signature**

```ts
export declare const setMaxTxExUnitsUnsafe: (
  instance: CML.ProtocolParamUpdate,
  maxTxExUnits: CML.ExUnits,
) => void;
```

Added in v2.0.0

## setMaxValueSizeUnsafe

Unsafely calls instance.setMaxValueSize without Effect wrapper

**Signature**

```ts
export declare const setMaxValueSizeUnsafe: (
  instance: CML.ProtocolParamUpdate,
  maxValueSize: bigint,
) => void;
```

Added in v2.0.0

## setMaximumEpochUnsafe

Unsafely calls instance.setMaximumEpoch without Effect wrapper

**Signature**

```ts
export declare const setMaximumEpochUnsafe: (
  instance: CML.ProtocolParamUpdate,
  maximumEpoch: bigint,
) => void;
```

Added in v2.0.0

## setMinCommitteeSizeUnsafe

Unsafely calls instance.setMinCommitteeSize without Effect wrapper

**Signature**

```ts
export declare const setMinCommitteeSizeUnsafe: (
  instance: CML.ProtocolParamUpdate,
  minCommitteeSize: bigint,
) => void;
```

Added in v2.0.0

## setMinFeeRefScriptCostPerByteUnsafe

Unsafely calls instance.setMinFeeRefScriptCostPerByte without Effect wrapper

**Signature**

```ts
export declare const setMinFeeRefScriptCostPerByteUnsafe: (
  instance: CML.ProtocolParamUpdate,
  minFeeRefScriptCostPerByte: CML.Rational,
) => void;
```

Added in v2.0.0

## setMinPoolCostUnsafe

Unsafely calls instance.setMinPoolCost without Effect wrapper

**Signature**

```ts
export declare const setMinPoolCostUnsafe: (
  instance: CML.ProtocolParamUpdate,
  minPoolCost: bigint,
) => void;
```

Added in v2.0.0

## setMinfeeAUnsafe

Unsafely calls instance.setMinfeeA without Effect wrapper

**Signature**

```ts
export declare const setMinfeeAUnsafe: (
  instance: CML.ProtocolParamUpdate,
  minfeeA: bigint,
) => void;
```

Added in v2.0.0

## setMinfeeBUnsafe

Unsafely calls instance.setMinfeeB without Effect wrapper

**Signature**

```ts
export declare const setMinfeeBUnsafe: (
  instance: CML.ProtocolParamUpdate,
  minfeeB: bigint,
) => void;
```

Added in v2.0.0

## setNOptUnsafe

Unsafely calls instance.setNOpt without Effect wrapper

**Signature**

```ts
export declare const setNOptUnsafe: (
  instance: CML.ProtocolParamUpdate,
  nOpt: bigint,
) => void;
```

Added in v2.0.0

## setPoolDepositUnsafe

Unsafely calls instance.setPoolDeposit without Effect wrapper

**Signature**

```ts
export declare const setPoolDepositUnsafe: (
  instance: CML.ProtocolParamUpdate,
  poolDeposit: bigint,
) => void;
```

Added in v2.0.0

## setPoolPledgeInfluenceUnsafe

Unsafely calls instance.setPoolPledgeInfluence without Effect wrapper

**Signature**

```ts
export declare const setPoolPledgeInfluenceUnsafe: (
  instance: CML.ProtocolParamUpdate,
  poolPledgeInfluence: CML.Rational,
) => void;
```

Added in v2.0.0

## setPoolVotingThresholdsUnsafe

Unsafely calls instance.setPoolVotingThresholds without Effect wrapper

**Signature**

```ts
export declare const setPoolVotingThresholdsUnsafe: (
  instance: CML.ProtocolParamUpdate,
  poolVotingThresholds: CML.PoolVotingThresholds,
) => void;
```

Added in v2.0.0

## setTreasuryGrowthRateUnsafe

Unsafely calls instance.setTreasuryGrowthRate without Effect wrapper

**Signature**

```ts
export declare const setTreasuryGrowthRateUnsafe: (
  instance: CML.ProtocolParamUpdate,
  treasuryGrowthRate: CML.UnitInterval,
) => void;
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (
  instance: CML.ProtocolParamUpdate,
) => Uint8Array;
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (
  instance: CML.ProtocolParamUpdate,
) => string;
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (
  instance: CML.ProtocolParamUpdate,
) => Uint8Array;
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (
  instance: CML.ProtocolParamUpdate,
) => string;
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (
  instance: CML.ProtocolParamUpdate,
) => any;
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (
  instance: CML.ProtocolParamUpdate,
) => string;
```

Added in v2.0.0

## treasuryGrowthRateUnsafe

Unsafely calls instance.treasuryGrowthRate without Effect wrapper

**Signature**

```ts
export declare const treasuryGrowthRateUnsafe: (
  instance: CML.ProtocolParamUpdate,
) => CML.UnitInterval | undefined;
```

Added in v2.0.0

# Types

## ProtocolParamUpdate (type alias)

Type alias for the CML ProtocolParamUpdate class

**Signature**

```ts
export type ProtocolParamUpdate = CML.ProtocolParamUpdate;
```

Added in v2.0.0
