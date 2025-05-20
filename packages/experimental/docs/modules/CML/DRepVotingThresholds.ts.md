---
title: CML/DRepVotingThresholds.ts
nav_order: 63
parent: Modules
---

## DRepVotingThresholds overview

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
  - [DRepVotingThresholdsError (class)](#drepvotingthresholdserror-class)
- [Methods](#methods)
  - [committeeNoConfidence](#committeenoconfidence)
  - [committeeNormal](#committeenormal)
  - [free](#free)
  - [hardForkInitiation](#hardforkinitiation)
  - [motionNoConfidence](#motionnoconfidence)
  - [ppEconomicGroup](#ppeconomicgroup)
  - [ppGovernanceGroup](#ppgovernancegroup)
  - [ppNetworkGroup](#ppnetworkgroup)
  - [ppTechnicalGroup](#pptechnicalgroup)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
  - [treasuryWithdrawal](#treasurywithdrawal)
  - [updateConstitution](#updateconstitution)
- [MethodsUnsafe](#methodsunsafe)
  - [committeeNoConfidenceUnsafe](#committeenoconfidenceunsafe)
  - [committeeNormalUnsafe](#committeenormalunsafe)
  - [freeUnsafe](#freeunsafe)
  - [hardForkInitiationUnsafe](#hardforkinitiationunsafe)
  - [motionNoConfidenceUnsafe](#motionnoconfidenceunsafe)
  - [ppEconomicGroupUnsafe](#ppeconomicgroupunsafe)
  - [ppGovernanceGroupUnsafe](#ppgovernancegroupunsafe)
  - [ppNetworkGroupUnsafe](#ppnetworkgroupunsafe)
  - [ppTechnicalGroupUnsafe](#pptechnicalgroupunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
  - [treasuryWithdrawalUnsafe](#treasurywithdrawalunsafe)
  - [updateConstitutionUnsafe](#updateconstitutionunsafe)
- [Types](#types)
  - [DRepVotingThresholds (type alias)](#drepvotingthresholds-type-alias)

---

# Constructors

## \_new

Static method \_new of DRepVotingThresholds

**Signature**

```ts
export declare const _new: (
  motionNoConfidence: CML.UnitInterval,
  committeeNormal: CML.UnitInterval,
  committeeNoConfidence: CML.UnitInterval,
  updateConstitution: CML.UnitInterval,
  hardForkInitiation: CML.UnitInterval,
  ppNetworkGroup: CML.UnitInterval,
  ppEconomicGroup: CML.UnitInterval,
  ppTechnicalGroup: CML.UnitInterval,
  ppGovernanceGroup: CML.UnitInterval,
  treasuryWithdrawal: CML.UnitInterval
) => Effect.Effect<CML.DRepVotingThresholds, DRepVotingThresholdsError>
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of DRepVotingThresholds

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array
) => Effect.Effect<CML.DRepVotingThresholds, DRepVotingThresholdsError>
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of DRepVotingThresholds

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string
) => Effect.Effect<CML.DRepVotingThresholds, DRepVotingThresholdsError>
```

Added in v2.0.0

## fromJson

Static method fromJson of DRepVotingThresholds

**Signature**

```ts
export declare const fromJson: (json: string) => Effect.Effect<CML.DRepVotingThresholds, DRepVotingThresholdsError>
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls DRepVotingThresholds.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (
  motionNoConfidence: CML.UnitInterval,
  committeeNormal: CML.UnitInterval,
  committeeNoConfidence: CML.UnitInterval,
  updateConstitution: CML.UnitInterval,
  hardForkInitiation: CML.UnitInterval,
  ppNetworkGroup: CML.UnitInterval,
  ppEconomicGroup: CML.UnitInterval,
  ppTechnicalGroup: CML.UnitInterval,
  ppGovernanceGroup: CML.UnitInterval,
  treasuryWithdrawal: CML.UnitInterval
) => CML.DRepVotingThresholds
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls DRepVotingThresholds.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (cborBytes: Uint8Array) => CML.DRepVotingThresholds
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls DRepVotingThresholds.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.DRepVotingThresholds
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls DRepVotingThresholds.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.DRepVotingThresholds
```

Added in v2.0.0

# Errors

## DRepVotingThresholdsError (class)

Error class for DRepVotingThresholds operations

This error is thrown when operations on DRepVotingThresholds instances fail.

**Signature**

```ts
export declare class DRepVotingThresholdsError
```

Added in v2.0.0

# Methods

## committeeNoConfidence

Method committeeNoConfidence of DRepVotingThresholds

**Signature**

```ts
export declare const committeeNoConfidence: (
  instance: CML.DRepVotingThresholds
) => Effect.Effect<CML.UnitInterval, DRepVotingThresholdsError>
```

Added in v2.0.0

## committeeNormal

Method committeeNormal of DRepVotingThresholds

**Signature**

```ts
export declare const committeeNormal: (
  instance: CML.DRepVotingThresholds
) => Effect.Effect<CML.UnitInterval, DRepVotingThresholdsError>
```

Added in v2.0.0

## free

Method free of DRepVotingThresholds

**Signature**

```ts
export declare const free: (instance: CML.DRepVotingThresholds) => Effect.Effect<void, DRepVotingThresholdsError>
```

Added in v2.0.0

## hardForkInitiation

Method hardForkInitiation of DRepVotingThresholds

**Signature**

```ts
export declare const hardForkInitiation: (
  instance: CML.DRepVotingThresholds
) => Effect.Effect<CML.UnitInterval, DRepVotingThresholdsError>
```

Added in v2.0.0

## motionNoConfidence

Method motionNoConfidence of DRepVotingThresholds

**Signature**

```ts
export declare const motionNoConfidence: (
  instance: CML.DRepVotingThresholds
) => Effect.Effect<CML.UnitInterval, DRepVotingThresholdsError>
```

Added in v2.0.0

## ppEconomicGroup

Method ppEconomicGroup of DRepVotingThresholds

**Signature**

```ts
export declare const ppEconomicGroup: (
  instance: CML.DRepVotingThresholds
) => Effect.Effect<CML.UnitInterval, DRepVotingThresholdsError>
```

Added in v2.0.0

## ppGovernanceGroup

Method ppGovernanceGroup of DRepVotingThresholds

**Signature**

```ts
export declare const ppGovernanceGroup: (
  instance: CML.DRepVotingThresholds
) => Effect.Effect<CML.UnitInterval, DRepVotingThresholdsError>
```

Added in v2.0.0

## ppNetworkGroup

Method ppNetworkGroup of DRepVotingThresholds

**Signature**

```ts
export declare const ppNetworkGroup: (
  instance: CML.DRepVotingThresholds
) => Effect.Effect<CML.UnitInterval, DRepVotingThresholdsError>
```

Added in v2.0.0

## ppTechnicalGroup

Method ppTechnicalGroup of DRepVotingThresholds

**Signature**

```ts
export declare const ppTechnicalGroup: (
  instance: CML.DRepVotingThresholds
) => Effect.Effect<CML.UnitInterval, DRepVotingThresholdsError>
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of DRepVotingThresholds

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.DRepVotingThresholds
) => Effect.Effect<Uint8Array, DRepVotingThresholdsError>
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of DRepVotingThresholds

**Signature**

```ts
export declare const toCanonicalCborHex: (
  instance: CML.DRepVotingThresholds
) => Effect.Effect<string, DRepVotingThresholdsError>
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of DRepVotingThresholds

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.DRepVotingThresholds
) => Effect.Effect<Uint8Array, DRepVotingThresholdsError>
```

Added in v2.0.0

## toCborHex

Method toCborHex of DRepVotingThresholds

**Signature**

```ts
export declare const toCborHex: (instance: CML.DRepVotingThresholds) => Effect.Effect<string, DRepVotingThresholdsError>
```

Added in v2.0.0

## toJsValue

Method toJsValue of DRepVotingThresholds

**Signature**

```ts
export declare const toJsValue: (instance: CML.DRepVotingThresholds) => Effect.Effect<any, DRepVotingThresholdsError>
```

Added in v2.0.0

## toJson

Method toJson of DRepVotingThresholds

**Signature**

```ts
export declare const toJson: (instance: CML.DRepVotingThresholds) => Effect.Effect<string, DRepVotingThresholdsError>
```

Added in v2.0.0

## treasuryWithdrawal

Method treasuryWithdrawal of DRepVotingThresholds

**Signature**

```ts
export declare const treasuryWithdrawal: (
  instance: CML.DRepVotingThresholds
) => Effect.Effect<CML.UnitInterval, DRepVotingThresholdsError>
```

Added in v2.0.0

## updateConstitution

Method updateConstitution of DRepVotingThresholds

**Signature**

```ts
export declare const updateConstitution: (
  instance: CML.DRepVotingThresholds
) => Effect.Effect<CML.UnitInterval, DRepVotingThresholdsError>
```

Added in v2.0.0

# MethodsUnsafe

## committeeNoConfidenceUnsafe

Unsafely calls instance.committeeNoConfidence without Effect wrapper

**Signature**

```ts
export declare const committeeNoConfidenceUnsafe: (instance: CML.DRepVotingThresholds) => CML.UnitInterval
```

Added in v2.0.0

## committeeNormalUnsafe

Unsafely calls instance.committeeNormal without Effect wrapper

**Signature**

```ts
export declare const committeeNormalUnsafe: (instance: CML.DRepVotingThresholds) => CML.UnitInterval
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.DRepVotingThresholds) => void
```

Added in v2.0.0

## hardForkInitiationUnsafe

Unsafely calls instance.hardForkInitiation without Effect wrapper

**Signature**

```ts
export declare const hardForkInitiationUnsafe: (instance: CML.DRepVotingThresholds) => CML.UnitInterval
```

Added in v2.0.0

## motionNoConfidenceUnsafe

Unsafely calls instance.motionNoConfidence without Effect wrapper

**Signature**

```ts
export declare const motionNoConfidenceUnsafe: (instance: CML.DRepVotingThresholds) => CML.UnitInterval
```

Added in v2.0.0

## ppEconomicGroupUnsafe

Unsafely calls instance.ppEconomicGroup without Effect wrapper

**Signature**

```ts
export declare const ppEconomicGroupUnsafe: (instance: CML.DRepVotingThresholds) => CML.UnitInterval
```

Added in v2.0.0

## ppGovernanceGroupUnsafe

Unsafely calls instance.ppGovernanceGroup without Effect wrapper

**Signature**

```ts
export declare const ppGovernanceGroupUnsafe: (instance: CML.DRepVotingThresholds) => CML.UnitInterval
```

Added in v2.0.0

## ppNetworkGroupUnsafe

Unsafely calls instance.ppNetworkGroup without Effect wrapper

**Signature**

```ts
export declare const ppNetworkGroupUnsafe: (instance: CML.DRepVotingThresholds) => CML.UnitInterval
```

Added in v2.0.0

## ppTechnicalGroupUnsafe

Unsafely calls instance.ppTechnicalGroup without Effect wrapper

**Signature**

```ts
export declare const ppTechnicalGroupUnsafe: (instance: CML.DRepVotingThresholds) => CML.UnitInterval
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (instance: CML.DRepVotingThresholds) => Uint8Array
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (instance: CML.DRepVotingThresholds) => string
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (instance: CML.DRepVotingThresholds) => Uint8Array
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.DRepVotingThresholds) => string
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.DRepVotingThresholds) => any
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.DRepVotingThresholds) => string
```

Added in v2.0.0

## treasuryWithdrawalUnsafe

Unsafely calls instance.treasuryWithdrawal without Effect wrapper

**Signature**

```ts
export declare const treasuryWithdrawalUnsafe: (instance: CML.DRepVotingThresholds) => CML.UnitInterval
```

Added in v2.0.0

## updateConstitutionUnsafe

Unsafely calls instance.updateConstitution without Effect wrapper

**Signature**

```ts
export declare const updateConstitutionUnsafe: (instance: CML.DRepVotingThresholds) => CML.UnitInterval
```

Added in v2.0.0

# Types

## DRepVotingThresholds (type alias)

Type alias for the CML DRepVotingThresholds class

**Signature**

```ts
export type DRepVotingThresholds = CML.DRepVotingThresholds
```

Added in v2.0.0
