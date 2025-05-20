---
title: CML/OperationalCert.ts
nav_order: 151
parent: Modules
---

## OperationalCert overview

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
  - [OperationalCertError (class)](#operationalcerterror-class)
- [Methods](#methods)
  - [free](#free)
  - [hotVkey](#hotvkey)
  - [kesPeriod](#kesperiod)
  - [sequenceNumber](#sequencenumber)
  - [sigma](#sigma)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
- [MethodsUnsafe](#methodsunsafe)
  - [freeUnsafe](#freeunsafe)
  - [hotVkeyUnsafe](#hotvkeyunsafe)
  - [kesPeriodUnsafe](#kesperiodunsafe)
  - [sequenceNumberUnsafe](#sequencenumberunsafe)
  - [sigmaUnsafe](#sigmaunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
- [Types](#types)
  - [OperationalCert (type alias)](#operationalcert-type-alias)

---

# Constructors

## \_new

Static method \_new of OperationalCert

**Signature**

```ts
export declare const _new: (
  hotVkey: CML.KESVkey,
  sequenceNumber: bigint,
  kesPeriod: bigint,
  sigma: CML.Ed25519Signature
) => Effect.Effect<CML.OperationalCert, OperationalCertError>
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of OperationalCert

**Signature**

```ts
export declare const fromCborBytes: (cborBytes: Uint8Array) => Effect.Effect<CML.OperationalCert, OperationalCertError>
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of OperationalCert

**Signature**

```ts
export declare const fromCborHex: (cborBytes: string) => Effect.Effect<CML.OperationalCert, OperationalCertError>
```

Added in v2.0.0

## fromJson

Static method fromJson of OperationalCert

**Signature**

```ts
export declare const fromJson: (json: string) => Effect.Effect<CML.OperationalCert, OperationalCertError>
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls OperationalCert.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (
  hotVkey: CML.KESVkey,
  sequenceNumber: bigint,
  kesPeriod: bigint,
  sigma: CML.Ed25519Signature
) => CML.OperationalCert
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls OperationalCert.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (cborBytes: Uint8Array) => CML.OperationalCert
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls OperationalCert.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.OperationalCert
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls OperationalCert.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.OperationalCert
```

Added in v2.0.0

# Errors

## OperationalCertError (class)

Error class for OperationalCert operations

This error is thrown when operations on OperationalCert instances fail.

**Signature**

```ts
export declare class OperationalCertError
```

Added in v2.0.0

# Methods

## free

Method free of OperationalCert

**Signature**

```ts
export declare const free: (instance: CML.OperationalCert) => Effect.Effect<void, OperationalCertError>
```

Added in v2.0.0

## hotVkey

Method hotVkey of OperationalCert

**Signature**

```ts
export declare const hotVkey: (instance: CML.OperationalCert) => Effect.Effect<CML.KESVkey, OperationalCertError>
```

Added in v2.0.0

## kesPeriod

Method kesPeriod of OperationalCert

**Signature**

```ts
export declare const kesPeriod: (instance: CML.OperationalCert) => Effect.Effect<bigint, OperationalCertError>
```

Added in v2.0.0

## sequenceNumber

Method sequenceNumber of OperationalCert

**Signature**

```ts
export declare const sequenceNumber: (instance: CML.OperationalCert) => Effect.Effect<bigint, OperationalCertError>
```

Added in v2.0.0

## sigma

Method sigma of OperationalCert

**Signature**

```ts
export declare const sigma: (instance: CML.OperationalCert) => Effect.Effect<CML.Ed25519Signature, OperationalCertError>
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of OperationalCert

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.OperationalCert
) => Effect.Effect<Uint8Array, OperationalCertError>
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of OperationalCert

**Signature**

```ts
export declare const toCanonicalCborHex: (instance: CML.OperationalCert) => Effect.Effect<string, OperationalCertError>
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of OperationalCert

**Signature**

```ts
export declare const toCborBytes: (instance: CML.OperationalCert) => Effect.Effect<Uint8Array, OperationalCertError>
```

Added in v2.0.0

## toCborHex

Method toCborHex of OperationalCert

**Signature**

```ts
export declare const toCborHex: (instance: CML.OperationalCert) => Effect.Effect<string, OperationalCertError>
```

Added in v2.0.0

## toJsValue

Method toJsValue of OperationalCert

**Signature**

```ts
export declare const toJsValue: (instance: CML.OperationalCert) => Effect.Effect<any, OperationalCertError>
```

Added in v2.0.0

## toJson

Method toJson of OperationalCert

**Signature**

```ts
export declare const toJson: (instance: CML.OperationalCert) => Effect.Effect<string, OperationalCertError>
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.OperationalCert) => void
```

Added in v2.0.0

## hotVkeyUnsafe

Unsafely calls instance.hotVkey without Effect wrapper

**Signature**

```ts
export declare const hotVkeyUnsafe: (instance: CML.OperationalCert) => CML.KESVkey
```

Added in v2.0.0

## kesPeriodUnsafe

Unsafely calls instance.kesPeriod without Effect wrapper

**Signature**

```ts
export declare const kesPeriodUnsafe: (instance: CML.OperationalCert) => bigint
```

Added in v2.0.0

## sequenceNumberUnsafe

Unsafely calls instance.sequenceNumber without Effect wrapper

**Signature**

```ts
export declare const sequenceNumberUnsafe: (instance: CML.OperationalCert) => bigint
```

Added in v2.0.0

## sigmaUnsafe

Unsafely calls instance.sigma without Effect wrapper

**Signature**

```ts
export declare const sigmaUnsafe: (instance: CML.OperationalCert) => CML.Ed25519Signature
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (instance: CML.OperationalCert) => Uint8Array
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (instance: CML.OperationalCert) => string
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (instance: CML.OperationalCert) => Uint8Array
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.OperationalCert) => string
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.OperationalCert) => any
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.OperationalCert) => string
```

Added in v2.0.0

# Types

## OperationalCert (type alias)

Type alias for the CML OperationalCert class

**Signature**

```ts
export type OperationalCert = CML.OperationalCert
```

Added in v2.0.0
