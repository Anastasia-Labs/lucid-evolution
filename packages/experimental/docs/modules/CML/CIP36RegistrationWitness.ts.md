---
title: CML/CIP36RegistrationWitness.ts
nav_order: 50
parent: Modules
---

## CIP36RegistrationWitness overview

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
  - [CIP36RegistrationWitnessError (class)](#cip36registrationwitnesserror-class)
- [Methods](#methods)
  - [free](#free)
  - [stakeWitness](#stakewitness)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
- [MethodsUnsafe](#methodsunsafe)
  - [freeUnsafe](#freeunsafe)
  - [stakeWitnessUnsafe](#stakewitnessunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
- [Types](#types)
  - [CIP36RegistrationWitness (type alias)](#cip36registrationwitness-type-alias)

---

# Constructors

## \_new

Static method \_new of CIP36RegistrationWitness

**Signature**

```ts
export declare const _new: (
  stakeWitness: CML.Ed25519Signature
) => Effect.Effect<CML.CIP36RegistrationWitness, CIP36RegistrationWitnessError>
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of CIP36RegistrationWitness

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array
) => Effect.Effect<CML.CIP36RegistrationWitness, CIP36RegistrationWitnessError>
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of CIP36RegistrationWitness

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string
) => Effect.Effect<CML.CIP36RegistrationWitness, CIP36RegistrationWitnessError>
```

Added in v2.0.0

## fromJson

Static method fromJson of CIP36RegistrationWitness

**Signature**

```ts
export declare const fromJson: (
  json: string
) => Effect.Effect<CML.CIP36RegistrationWitness, CIP36RegistrationWitnessError>
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls CIP36RegistrationWitness.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (stakeWitness: CML.Ed25519Signature) => CML.CIP36RegistrationWitness
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls CIP36RegistrationWitness.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (cborBytes: Uint8Array) => CML.CIP36RegistrationWitness
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls CIP36RegistrationWitness.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.CIP36RegistrationWitness
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls CIP36RegistrationWitness.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.CIP36RegistrationWitness
```

Added in v2.0.0

# Errors

## CIP36RegistrationWitnessError (class)

Error class for CIP36RegistrationWitness operations

This error is thrown when operations on CIP36RegistrationWitness instances fail.

**Signature**

```ts
export declare class CIP36RegistrationWitnessError
```

Added in v2.0.0

# Methods

## free

Method free of CIP36RegistrationWitness

**Signature**

```ts
export declare const free: (
  instance: CML.CIP36RegistrationWitness
) => Effect.Effect<void, CIP36RegistrationWitnessError>
```

Added in v2.0.0

## stakeWitness

Method stakeWitness of CIP36RegistrationWitness

**Signature**

```ts
export declare const stakeWitness: (
  instance: CML.CIP36RegistrationWitness
) => Effect.Effect<CML.Ed25519Signature, CIP36RegistrationWitnessError>
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of CIP36RegistrationWitness

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.CIP36RegistrationWitness
) => Effect.Effect<Uint8Array, CIP36RegistrationWitnessError>
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of CIP36RegistrationWitness

**Signature**

```ts
export declare const toCanonicalCborHex: (
  instance: CML.CIP36RegistrationWitness
) => Effect.Effect<string, CIP36RegistrationWitnessError>
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of CIP36RegistrationWitness

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.CIP36RegistrationWitness
) => Effect.Effect<Uint8Array, CIP36RegistrationWitnessError>
```

Added in v2.0.0

## toCborHex

Method toCborHex of CIP36RegistrationWitness

**Signature**

```ts
export declare const toCborHex: (
  instance: CML.CIP36RegistrationWitness
) => Effect.Effect<string, CIP36RegistrationWitnessError>
```

Added in v2.0.0

## toJsValue

Method toJsValue of CIP36RegistrationWitness

**Signature**

```ts
export declare const toJsValue: (
  instance: CML.CIP36RegistrationWitness
) => Effect.Effect<any, CIP36RegistrationWitnessError>
```

Added in v2.0.0

## toJson

Method toJson of CIP36RegistrationWitness

**Signature**

```ts
export declare const toJson: (
  instance: CML.CIP36RegistrationWitness
) => Effect.Effect<string, CIP36RegistrationWitnessError>
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.CIP36RegistrationWitness) => void
```

Added in v2.0.0

## stakeWitnessUnsafe

Unsafely calls instance.stakeWitness without Effect wrapper

**Signature**

```ts
export declare const stakeWitnessUnsafe: (instance: CML.CIP36RegistrationWitness) => CML.Ed25519Signature
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (instance: CML.CIP36RegistrationWitness) => Uint8Array
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (instance: CML.CIP36RegistrationWitness) => string
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (instance: CML.CIP36RegistrationWitness) => Uint8Array
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.CIP36RegistrationWitness) => string
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.CIP36RegistrationWitness) => any
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.CIP36RegistrationWitness) => string
```

Added in v2.0.0

# Types

## CIP36RegistrationWitness (type alias)

Type alias for the CML CIP36RegistrationWitness class

**Signature**

```ts
export type CIP36RegistrationWitness = CML.CIP36RegistrationWitness
```

Added in v2.0.0
