---
title: CML/StakeDistribution.ts
nav_order: 219
parent: Modules
---

## StakeDistribution overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [fromCborBytes](#fromcborbytes)
  - [fromCborHex](#fromcborhex)
  - [newBootstrapEra](#newbootstrapera)
  - [newSingleKey](#newsinglekey)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [fromCborBytesUnsafe](#fromcborbytesunsafe)
  - [fromCborHexUnsafe](#fromcborhexunsafe)
  - [newBootstrapEraUnsafe](#newbootstraperaunsafe)
  - [newSingleKeyUnsafe](#newsinglekeyunsafe)
- [Errors](#errors)
  - [StakeDistributionError (class)](#stakedistributionerror-class)
- [Methods](#methods)
  - [asSingleKey](#assinglekey)
  - [free](#free)
  - [kind](#kind)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
- [MethodsUnsafe](#methodsunsafe)
  - [asSingleKeyUnsafe](#assinglekeyunsafe)
  - [freeUnsafe](#freeunsafe)
  - [kindUnsafe](#kindunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
- [Types](#types)
  - [StakeDistribution (type alias)](#stakedistribution-type-alias)

---

# Constructors

## fromCborBytes

Static method fromCborBytes of StakeDistribution

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.StakeDistribution, StakeDistributionError>;
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of StakeDistribution

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.StakeDistribution, StakeDistributionError>;
```

Added in v2.0.0

## newBootstrapEra

Static method newBootstrapEra of StakeDistribution

**Signature**

```ts
export declare const newBootstrapEra: () => Effect.Effect<
  CML.StakeDistribution,
  StakeDistributionError
>;
```

Added in v2.0.0

## newSingleKey

Static method newSingleKey of StakeDistribution

**Signature**

```ts
export declare const newSingleKey: (
  stakeholderId: CML.StakeholderId,
) => Effect.Effect<CML.StakeDistribution, StakeDistributionError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## fromCborBytesUnsafe

Unsafely calls StakeDistribution.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (
  cborBytes: Uint8Array,
) => CML.StakeDistribution;
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls StakeDistribution.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (
  cborBytes: string,
) => CML.StakeDistribution;
```

Added in v2.0.0

## newBootstrapEraUnsafe

Unsafely calls StakeDistribution.newBootstrapEra without Effect wrapper

**Signature**

```ts
export declare const newBootstrapEraUnsafe: () => CML.StakeDistribution;
```

Added in v2.0.0

## newSingleKeyUnsafe

Unsafely calls StakeDistribution.newSingleKey without Effect wrapper

**Signature**

```ts
export declare const newSingleKeyUnsafe: (
  stakeholderId: CML.StakeholderId,
) => CML.StakeDistribution;
```

Added in v2.0.0

# Errors

## StakeDistributionError (class)

Error class for StakeDistribution operations

This error is thrown when operations on StakeDistribution instances fail.

**Signature**

```ts
export declare class StakeDistributionError
```

Added in v2.0.0

# Methods

## asSingleKey

Method asSingleKey of StakeDistribution

**Signature**

```ts
export declare const asSingleKey: (
  instance: CML.StakeDistribution,
) => Effect.Effect<CML.StakeholderId | undefined, StakeDistributionError>;
```

Added in v2.0.0

## free

Method free of StakeDistribution

**Signature**

```ts
export declare const free: (
  instance: CML.StakeDistribution,
) => Effect.Effect<void, StakeDistributionError>;
```

Added in v2.0.0

## kind

Method kind of StakeDistribution

**Signature**

```ts
export declare const kind: (
  instance: CML.StakeDistribution,
) => Effect.Effect<CML.StakeDistributionKind, StakeDistributionError>;
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of StakeDistribution

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.StakeDistribution,
) => Effect.Effect<Uint8Array, StakeDistributionError>;
```

Added in v2.0.0

## toCborHex

Method toCborHex of StakeDistribution

**Signature**

```ts
export declare const toCborHex: (
  instance: CML.StakeDistribution,
) => Effect.Effect<string, StakeDistributionError>;
```

Added in v2.0.0

# MethodsUnsafe

## asSingleKeyUnsafe

Unsafely calls instance.asSingleKey without Effect wrapper

**Signature**

```ts
export declare const asSingleKeyUnsafe: (
  instance: CML.StakeDistribution,
) => CML.StakeholderId | undefined;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.StakeDistribution) => void;
```

Added in v2.0.0

## kindUnsafe

Unsafely calls instance.kind without Effect wrapper

**Signature**

```ts
export declare const kindUnsafe: (
  instance: CML.StakeDistribution,
) => CML.StakeDistributionKind;
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (
  instance: CML.StakeDistribution,
) => Uint8Array;
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (
  instance: CML.StakeDistribution,
) => string;
```

Added in v2.0.0

# Types

## StakeDistribution (type alias)

Type alias for the CML StakeDistribution class

**Signature**

```ts
export type StakeDistribution = CML.StakeDistribution;
```

Added in v2.0.0
