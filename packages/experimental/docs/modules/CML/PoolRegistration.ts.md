---
title: CML/PoolRegistration.ts
nav_order: 171
parent: Modules
---

## PoolRegistration overview

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
  - [PoolRegistrationError (class)](#poolregistrationerror-class)
- [Methods](#methods)
  - [free](#free)
  - [poolParams](#poolparams)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
- [MethodsUnsafe](#methodsunsafe)
  - [freeUnsafe](#freeunsafe)
  - [poolParamsUnsafe](#poolparamsunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
- [Types](#types)
  - [PoolRegistration (type alias)](#poolregistration-type-alias)

---

# Constructors

## \_new

Static method \_new of PoolRegistration

**Signature**

```ts
export declare const _new: (poolParams: CML.PoolParams) => Effect.Effect<CML.PoolRegistration, PoolRegistrationError>
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of PoolRegistration

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array
) => Effect.Effect<CML.PoolRegistration, PoolRegistrationError>
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of PoolRegistration

**Signature**

```ts
export declare const fromCborHex: (cborBytes: string) => Effect.Effect<CML.PoolRegistration, PoolRegistrationError>
```

Added in v2.0.0

## fromJson

Static method fromJson of PoolRegistration

**Signature**

```ts
export declare const fromJson: (json: string) => Effect.Effect<CML.PoolRegistration, PoolRegistrationError>
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls PoolRegistration.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (poolParams: CML.PoolParams) => CML.PoolRegistration
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls PoolRegistration.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (cborBytes: Uint8Array) => CML.PoolRegistration
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls PoolRegistration.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.PoolRegistration
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls PoolRegistration.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.PoolRegistration
```

Added in v2.0.0

# Errors

## PoolRegistrationError (class)

Error class for PoolRegistration operations

This error is thrown when operations on PoolRegistration instances fail.

**Signature**

```ts
export declare class PoolRegistrationError
```

Added in v2.0.0

# Methods

## free

Method free of PoolRegistration

**Signature**

```ts
export declare const free: (instance: CML.PoolRegistration) => Effect.Effect<void, PoolRegistrationError>
```

Added in v2.0.0

## poolParams

Method poolParams of PoolRegistration

**Signature**

```ts
export declare const poolParams: (
  instance: CML.PoolRegistration
) => Effect.Effect<CML.PoolParams, PoolRegistrationError>
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of PoolRegistration

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.PoolRegistration
) => Effect.Effect<Uint8Array, PoolRegistrationError>
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of PoolRegistration

**Signature**

```ts
export declare const toCanonicalCborHex: (
  instance: CML.PoolRegistration
) => Effect.Effect<string, PoolRegistrationError>
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of PoolRegistration

**Signature**

```ts
export declare const toCborBytes: (instance: CML.PoolRegistration) => Effect.Effect<Uint8Array, PoolRegistrationError>
```

Added in v2.0.0

## toCborHex

Method toCborHex of PoolRegistration

**Signature**

```ts
export declare const toCborHex: (instance: CML.PoolRegistration) => Effect.Effect<string, PoolRegistrationError>
```

Added in v2.0.0

## toJsValue

Method toJsValue of PoolRegistration

**Signature**

```ts
export declare const toJsValue: (instance: CML.PoolRegistration) => Effect.Effect<any, PoolRegistrationError>
```

Added in v2.0.0

## toJson

Method toJson of PoolRegistration

**Signature**

```ts
export declare const toJson: (instance: CML.PoolRegistration) => Effect.Effect<string, PoolRegistrationError>
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.PoolRegistration) => void
```

Added in v2.0.0

## poolParamsUnsafe

Unsafely calls instance.poolParams without Effect wrapper

**Signature**

```ts
export declare const poolParamsUnsafe: (instance: CML.PoolRegistration) => CML.PoolParams
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (instance: CML.PoolRegistration) => Uint8Array
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (instance: CML.PoolRegistration) => string
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (instance: CML.PoolRegistration) => Uint8Array
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.PoolRegistration) => string
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.PoolRegistration) => any
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.PoolRegistration) => string
```

Added in v2.0.0

# Types

## PoolRegistration (type alias)

Type alias for the CML PoolRegistration class

**Signature**

```ts
export type PoolRegistration = CML.PoolRegistration
```

Added in v2.0.0
