---
title: CML/CIP36DelegationDistribution.ts
nav_order: 37
parent: Modules
---

## CIP36DelegationDistribution overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [fromCborBytes](#fromcborbytes)
  - [fromCborHex](#fromcborhex)
  - [fromJson](#fromjson)
  - [newLegacy](#newlegacy)
  - [newWeighted](#newweighted)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [fromCborBytesUnsafe](#fromcborbytesunsafe)
  - [fromCborHexUnsafe](#fromcborhexunsafe)
  - [fromJsonUnsafe](#fromjsonunsafe)
  - [newLegacyUnsafe](#newlegacyunsafe)
  - [newWeightedUnsafe](#newweightedunsafe)
- [Errors](#errors)
  - [CIP36DelegationDistributionError (class)](#cip36delegationdistributionerror-class)
- [Methods](#methods)
  - [asLegacy](#aslegacy)
  - [asWeighted](#asweighted)
  - [free](#free)
  - [kind](#kind)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
- [MethodsUnsafe](#methodsunsafe)
  - [asLegacyUnsafe](#aslegacyunsafe)
  - [asWeightedUnsafe](#asweightedunsafe)
  - [freeUnsafe](#freeunsafe)
  - [kindUnsafe](#kindunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
- [Types](#types)
  - [CIP36DelegationDistribution (type alias)](#cip36delegationdistribution-type-alias)

---

# Constructors

## fromCborBytes

Static method fromCborBytes of CIP36DelegationDistribution

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array
) => Effect.Effect<CML.CIP36DelegationDistribution, CIP36DelegationDistributionError>
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of CIP36DelegationDistribution

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string
) => Effect.Effect<CML.CIP36DelegationDistribution, CIP36DelegationDistributionError>
```

Added in v2.0.0

## fromJson

Static method fromJson of CIP36DelegationDistribution

**Signature**

```ts
export declare const fromJson: (
  json: string
) => Effect.Effect<CML.CIP36DelegationDistribution, CIP36DelegationDistributionError>
```

Added in v2.0.0

## newLegacy

Static method newLegacy of CIP36DelegationDistribution

**Signature**

```ts
export declare const newLegacy: (
  legacy: CML.PublicKey
) => Effect.Effect<CML.CIP36DelegationDistribution, CIP36DelegationDistributionError>
```

Added in v2.0.0

## newWeighted

Static method newWeighted of CIP36DelegationDistribution

**Signature**

```ts
export declare const newWeighted: (
  delegations: CML.CIP36DelegationList
) => Effect.Effect<CML.CIP36DelegationDistribution, CIP36DelegationDistributionError>
```

Added in v2.0.0

# ConstructorsUnsafe

## fromCborBytesUnsafe

Unsafely calls CIP36DelegationDistribution.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (cborBytes: Uint8Array) => CML.CIP36DelegationDistribution
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls CIP36DelegationDistribution.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.CIP36DelegationDistribution
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls CIP36DelegationDistribution.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.CIP36DelegationDistribution
```

Added in v2.0.0

## newLegacyUnsafe

Unsafely calls CIP36DelegationDistribution.newLegacy without Effect wrapper

**Signature**

```ts
export declare const newLegacyUnsafe: (legacy: CML.PublicKey) => CML.CIP36DelegationDistribution
```

Added in v2.0.0

## newWeightedUnsafe

Unsafely calls CIP36DelegationDistribution.newWeighted without Effect wrapper

**Signature**

```ts
export declare const newWeightedUnsafe: (delegations: CML.CIP36DelegationList) => CML.CIP36DelegationDistribution
```

Added in v2.0.0

# Errors

## CIP36DelegationDistributionError (class)

Error class for CIP36DelegationDistribution operations

This error is thrown when operations on CIP36DelegationDistribution instances fail.

**Signature**

```ts
export declare class CIP36DelegationDistributionError
```

Added in v2.0.0

# Methods

## asLegacy

Method asLegacy of CIP36DelegationDistribution

**Signature**

```ts
export declare const asLegacy: (
  instance: CML.CIP36DelegationDistribution
) => Effect.Effect<CML.PublicKey | undefined, CIP36DelegationDistributionError>
```

Added in v2.0.0

## asWeighted

Method asWeighted of CIP36DelegationDistribution

**Signature**

```ts
export declare const asWeighted: (
  instance: CML.CIP36DelegationDistribution
) => Effect.Effect<CML.CIP36DelegationList | undefined, CIP36DelegationDistributionError>
```

Added in v2.0.0

## free

Method free of CIP36DelegationDistribution

**Signature**

```ts
export declare const free: (
  instance: CML.CIP36DelegationDistribution
) => Effect.Effect<void, CIP36DelegationDistributionError>
```

Added in v2.0.0

## kind

Method kind of CIP36DelegationDistribution

**Signature**

```ts
export declare const kind: (
  instance: CML.CIP36DelegationDistribution
) => Effect.Effect<CML.DelegationDistributionKind, CIP36DelegationDistributionError>
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of CIP36DelegationDistribution

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.CIP36DelegationDistribution
) => Effect.Effect<Uint8Array, CIP36DelegationDistributionError>
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of CIP36DelegationDistribution

**Signature**

```ts
export declare const toCanonicalCborHex: (
  instance: CML.CIP36DelegationDistribution
) => Effect.Effect<string, CIP36DelegationDistributionError>
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of CIP36DelegationDistribution

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.CIP36DelegationDistribution
) => Effect.Effect<Uint8Array, CIP36DelegationDistributionError>
```

Added in v2.0.0

## toCborHex

Method toCborHex of CIP36DelegationDistribution

**Signature**

```ts
export declare const toCborHex: (
  instance: CML.CIP36DelegationDistribution
) => Effect.Effect<string, CIP36DelegationDistributionError>
```

Added in v2.0.0

## toJsValue

Method toJsValue of CIP36DelegationDistribution

**Signature**

```ts
export declare const toJsValue: (
  instance: CML.CIP36DelegationDistribution
) => Effect.Effect<any, CIP36DelegationDistributionError>
```

Added in v2.0.0

## toJson

Method toJson of CIP36DelegationDistribution

**Signature**

```ts
export declare const toJson: (
  instance: CML.CIP36DelegationDistribution
) => Effect.Effect<string, CIP36DelegationDistributionError>
```

Added in v2.0.0

# MethodsUnsafe

## asLegacyUnsafe

Unsafely calls instance.asLegacy without Effect wrapper

**Signature**

```ts
export declare const asLegacyUnsafe: (instance: CML.CIP36DelegationDistribution) => CML.PublicKey | undefined
```

Added in v2.0.0

## asWeightedUnsafe

Unsafely calls instance.asWeighted without Effect wrapper

**Signature**

```ts
export declare const asWeightedUnsafe: (
  instance: CML.CIP36DelegationDistribution
) => CML.CIP36DelegationList | undefined
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.CIP36DelegationDistribution) => void
```

Added in v2.0.0

## kindUnsafe

Unsafely calls instance.kind without Effect wrapper

**Signature**

```ts
export declare const kindUnsafe: (instance: CML.CIP36DelegationDistribution) => CML.DelegationDistributionKind
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (instance: CML.CIP36DelegationDistribution) => Uint8Array
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (instance: CML.CIP36DelegationDistribution) => string
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (instance: CML.CIP36DelegationDistribution) => Uint8Array
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.CIP36DelegationDistribution) => string
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.CIP36DelegationDistribution) => any
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.CIP36DelegationDistribution) => string
```

Added in v2.0.0

# Types

## CIP36DelegationDistribution (type alias)

Type alias for the CML CIP36DelegationDistribution class

**Signature**

```ts
export type CIP36DelegationDistribution = CML.CIP36DelegationDistribution
```

Added in v2.0.0
