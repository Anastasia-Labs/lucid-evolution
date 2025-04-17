---
title: CML/PoolVotingThresholds.ts
nav_order: 173
parent: Modules
---

## PoolVotingThresholds overview

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
  - [PoolVotingThresholdsError (class)](#poolvotingthresholdserror-class)
- [Methods](#methods)
  - [committeeNoConfidence](#committeenoconfidence)
  - [committeeNormal](#committeenormal)
  - [free](#free)
  - [hardForkInitiation](#hardforkinitiation)
  - [motionNoConfidence](#motionnoconfidence)
  - [securityRelevantParameterVotingThreshold](#securityrelevantparametervotingthreshold)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
- [MethodsUnsafe](#methodsunsafe)
  - [committeeNoConfidenceUnsafe](#committeenoconfidenceunsafe)
  - [committeeNormalUnsafe](#committeenormalunsafe)
  - [freeUnsafe](#freeunsafe)
  - [hardForkInitiationUnsafe](#hardforkinitiationunsafe)
  - [motionNoConfidenceUnsafe](#motionnoconfidenceunsafe)
  - [securityRelevantParameterVotingThresholdUnsafe](#securityrelevantparametervotingthresholdunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
- [Types](#types)
  - [PoolVotingThresholds (type alias)](#poolvotingthresholds-type-alias)

---

# Constructors

## \_new

Static method \_new of PoolVotingThresholds

**Signature**

```ts
export declare const _new: (
  motionNoConfidence: CML.UnitInterval,
  committeeNormal: CML.UnitInterval,
  committeeNoConfidence: CML.UnitInterval,
  hardForkInitiation: CML.UnitInterval,
  securityRelevantParameterVotingThreshold: CML.UnitInterval,
) => Effect.Effect<CML.PoolVotingThresholds, PoolVotingThresholdsError>;
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of PoolVotingThresholds

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.PoolVotingThresholds, PoolVotingThresholdsError>;
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of PoolVotingThresholds

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.PoolVotingThresholds, PoolVotingThresholdsError>;
```

Added in v2.0.0

## fromJson

Static method fromJson of PoolVotingThresholds

**Signature**

```ts
export declare const fromJson: (
  json: string,
) => Effect.Effect<CML.PoolVotingThresholds, PoolVotingThresholdsError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls PoolVotingThresholds.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (
  motionNoConfidence: CML.UnitInterval,
  committeeNormal: CML.UnitInterval,
  committeeNoConfidence: CML.UnitInterval,
  hardForkInitiation: CML.UnitInterval,
  securityRelevantParameterVotingThreshold: CML.UnitInterval,
) => CML.PoolVotingThresholds;
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls PoolVotingThresholds.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (
  cborBytes: Uint8Array,
) => CML.PoolVotingThresholds;
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls PoolVotingThresholds.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (
  cborBytes: string,
) => CML.PoolVotingThresholds;
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls PoolVotingThresholds.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.PoolVotingThresholds;
```

Added in v2.0.0

# Errors

## PoolVotingThresholdsError (class)

Error class for PoolVotingThresholds operations

This error is thrown when operations on PoolVotingThresholds instances fail.

**Signature**

```ts
export declare class PoolVotingThresholdsError
```

Added in v2.0.0

# Methods

## committeeNoConfidence

Method committeeNoConfidence of PoolVotingThresholds

**Signature**

```ts
export declare const committeeNoConfidence: (
  instance: CML.PoolVotingThresholds,
) => Effect.Effect<CML.UnitInterval, PoolVotingThresholdsError>;
```

Added in v2.0.0

## committeeNormal

Method committeeNormal of PoolVotingThresholds

**Signature**

```ts
export declare const committeeNormal: (
  instance: CML.PoolVotingThresholds,
) => Effect.Effect<CML.UnitInterval, PoolVotingThresholdsError>;
```

Added in v2.0.0

## free

Method free of PoolVotingThresholds

**Signature**

```ts
export declare const free: (
  instance: CML.PoolVotingThresholds,
) => Effect.Effect<void, PoolVotingThresholdsError>;
```

Added in v2.0.0

## hardForkInitiation

Method hardForkInitiation of PoolVotingThresholds

**Signature**

```ts
export declare const hardForkInitiation: (
  instance: CML.PoolVotingThresholds,
) => Effect.Effect<CML.UnitInterval, PoolVotingThresholdsError>;
```

Added in v2.0.0

## motionNoConfidence

Method motionNoConfidence of PoolVotingThresholds

**Signature**

```ts
export declare const motionNoConfidence: (
  instance: CML.PoolVotingThresholds,
) => Effect.Effect<CML.UnitInterval, PoolVotingThresholdsError>;
```

Added in v2.0.0

## securityRelevantParameterVotingThreshold

Method securityRelevantParameterVotingThreshold of PoolVotingThresholds

**Signature**

```ts
export declare const securityRelevantParameterVotingThreshold: (
  instance: CML.PoolVotingThresholds,
) => Effect.Effect<CML.UnitInterval, PoolVotingThresholdsError>;
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of PoolVotingThresholds

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.PoolVotingThresholds,
) => Effect.Effect<Uint8Array, PoolVotingThresholdsError>;
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of PoolVotingThresholds

**Signature**

```ts
export declare const toCanonicalCborHex: (
  instance: CML.PoolVotingThresholds,
) => Effect.Effect<string, PoolVotingThresholdsError>;
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of PoolVotingThresholds

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.PoolVotingThresholds,
) => Effect.Effect<Uint8Array, PoolVotingThresholdsError>;
```

Added in v2.0.0

## toCborHex

Method toCborHex of PoolVotingThresholds

**Signature**

```ts
export declare const toCborHex: (
  instance: CML.PoolVotingThresholds,
) => Effect.Effect<string, PoolVotingThresholdsError>;
```

Added in v2.0.0

## toJsValue

Method toJsValue of PoolVotingThresholds

**Signature**

```ts
export declare const toJsValue: (
  instance: CML.PoolVotingThresholds,
) => Effect.Effect<any, PoolVotingThresholdsError>;
```

Added in v2.0.0

## toJson

Method toJson of PoolVotingThresholds

**Signature**

```ts
export declare const toJson: (
  instance: CML.PoolVotingThresholds,
) => Effect.Effect<string, PoolVotingThresholdsError>;
```

Added in v2.0.0

# MethodsUnsafe

## committeeNoConfidenceUnsafe

Unsafely calls instance.committeeNoConfidence without Effect wrapper

**Signature**

```ts
export declare const committeeNoConfidenceUnsafe: (
  instance: CML.PoolVotingThresholds,
) => CML.UnitInterval;
```

Added in v2.0.0

## committeeNormalUnsafe

Unsafely calls instance.committeeNormal without Effect wrapper

**Signature**

```ts
export declare const committeeNormalUnsafe: (
  instance: CML.PoolVotingThresholds,
) => CML.UnitInterval;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.PoolVotingThresholds) => void;
```

Added in v2.0.0

## hardForkInitiationUnsafe

Unsafely calls instance.hardForkInitiation without Effect wrapper

**Signature**

```ts
export declare const hardForkInitiationUnsafe: (
  instance: CML.PoolVotingThresholds,
) => CML.UnitInterval;
```

Added in v2.0.0

## motionNoConfidenceUnsafe

Unsafely calls instance.motionNoConfidence without Effect wrapper

**Signature**

```ts
export declare const motionNoConfidenceUnsafe: (
  instance: CML.PoolVotingThresholds,
) => CML.UnitInterval;
```

Added in v2.0.0

## securityRelevantParameterVotingThresholdUnsafe

Unsafely calls instance.securityRelevantParameterVotingThreshold without Effect wrapper

**Signature**

```ts
export declare const securityRelevantParameterVotingThresholdUnsafe: (
  instance: CML.PoolVotingThresholds,
) => CML.UnitInterval;
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (
  instance: CML.PoolVotingThresholds,
) => Uint8Array;
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (
  instance: CML.PoolVotingThresholds,
) => string;
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (
  instance: CML.PoolVotingThresholds,
) => Uint8Array;
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (
  instance: CML.PoolVotingThresholds,
) => string;
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (
  instance: CML.PoolVotingThresholds,
) => any;
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (
  instance: CML.PoolVotingThresholds,
) => string;
```

Added in v2.0.0

# Types

## PoolVotingThresholds (type alias)

Type alias for the CML PoolVotingThresholds class

**Signature**

```ts
export type PoolVotingThresholds = CML.PoolVotingThresholds;
```

Added in v2.0.0
