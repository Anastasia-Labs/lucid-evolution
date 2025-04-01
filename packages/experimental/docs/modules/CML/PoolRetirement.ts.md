---
title: CML/PoolRetirement.ts
nav_order: 166
parent: Modules
---

## PoolRetirement overview

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
  - [PoolRetirementError (class)](#poolretirementerror-class)
- [Methods](#methods)
  - [epoch](#epoch)
  - [free](#free)
  - [pool](#pool)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
- [MethodsUnsafe](#methodsunsafe)
  - [epochUnsafe](#epochunsafe)
  - [freeUnsafe](#freeunsafe)
  - [poolUnsafe](#poolunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
- [Types](#types)
  - [PoolRetirement (type alias)](#poolretirement-type-alias)

---

# Constructors

## \_new

Static method \_new of PoolRetirement

**Signature**

```ts
export declare const _new: (
  pool: CML.Ed25519KeyHash,
  epoch: bigint
) => Effect.Effect<CML.PoolRetirement, PoolRetirementError>
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of PoolRetirement

**Signature**

```ts
export declare const fromCborBytes: (cborBytes: Uint8Array) => Effect.Effect<CML.PoolRetirement, PoolRetirementError>
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of PoolRetirement

**Signature**

```ts
export declare const fromCborHex: (cborBytes: string) => Effect.Effect<CML.PoolRetirement, PoolRetirementError>
```

Added in v2.0.0

## fromJson

Static method fromJson of PoolRetirement

**Signature**

```ts
export declare const fromJson: (json: string) => Effect.Effect<CML.PoolRetirement, PoolRetirementError>
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls PoolRetirement.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (pool: CML.Ed25519KeyHash, epoch: bigint) => CML.PoolRetirement
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls PoolRetirement.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (cborBytes: Uint8Array) => CML.PoolRetirement
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls PoolRetirement.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.PoolRetirement
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls PoolRetirement.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.PoolRetirement
```

Added in v2.0.0

# Errors

## PoolRetirementError (class)

Error class for PoolRetirement operations

This error is thrown when operations on PoolRetirement instances fail.

**Signature**

```ts
export declare class PoolRetirementError
```

Added in v2.0.0

# Methods

## epoch

Method epoch of PoolRetirement

**Signature**

```ts
export declare const epoch: (instance: CML.PoolRetirement) => Effect.Effect<bigint, PoolRetirementError>
```

Added in v2.0.0

## free

Method free of PoolRetirement

**Signature**

```ts
export declare const free: (instance: CML.PoolRetirement) => Effect.Effect<void, PoolRetirementError>
```

Added in v2.0.0

## pool

Method pool of PoolRetirement

**Signature**

```ts
export declare const pool: (instance: CML.PoolRetirement) => Effect.Effect<CML.Ed25519KeyHash, PoolRetirementError>
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of PoolRetirement

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.PoolRetirement
) => Effect.Effect<Uint8Array, PoolRetirementError>
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of PoolRetirement

**Signature**

```ts
export declare const toCanonicalCborHex: (instance: CML.PoolRetirement) => Effect.Effect<string, PoolRetirementError>
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of PoolRetirement

**Signature**

```ts
export declare const toCborBytes: (instance: CML.PoolRetirement) => Effect.Effect<Uint8Array, PoolRetirementError>
```

Added in v2.0.0

## toCborHex

Method toCborHex of PoolRetirement

**Signature**

```ts
export declare const toCborHex: (instance: CML.PoolRetirement) => Effect.Effect<string, PoolRetirementError>
```

Added in v2.0.0

## toJsValue

Method toJsValue of PoolRetirement

**Signature**

```ts
export declare const toJsValue: (instance: CML.PoolRetirement) => Effect.Effect<any, PoolRetirementError>
```

Added in v2.0.0

## toJson

Method toJson of PoolRetirement

**Signature**

```ts
export declare const toJson: (instance: CML.PoolRetirement) => Effect.Effect<string, PoolRetirementError>
```

Added in v2.0.0

# MethodsUnsafe

## epochUnsafe

Unsafely calls instance.epoch without Effect wrapper

**Signature**

```ts
export declare const epochUnsafe: (instance: CML.PoolRetirement) => bigint
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.PoolRetirement) => void
```

Added in v2.0.0

## poolUnsafe

Unsafely calls instance.pool without Effect wrapper

**Signature**

```ts
export declare const poolUnsafe: (instance: CML.PoolRetirement) => CML.Ed25519KeyHash
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (instance: CML.PoolRetirement) => Uint8Array
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (instance: CML.PoolRetirement) => string
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (instance: CML.PoolRetirement) => Uint8Array
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.PoolRetirement) => string
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.PoolRetirement) => any
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.PoolRetirement) => string
```

Added in v2.0.0

# Types

## PoolRetirement (type alias)

Type alias for the CML PoolRetirement class

**Signature**

```ts
export type PoolRetirement = CML.PoolRetirement
```

Added in v2.0.0
