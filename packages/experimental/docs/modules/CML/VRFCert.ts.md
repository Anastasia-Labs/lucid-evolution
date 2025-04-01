---
title: CML/VRFCert.ts
nav_order: 284
parent: Modules
---

## VRFCert overview

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
  - [VRFCertError (class)](#vrfcerterror-class)
- [Methods](#methods)
  - [free](#free)
  - [output](#output)
  - [proof](#proof)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
- [MethodsUnsafe](#methodsunsafe)
  - [freeUnsafe](#freeunsafe)
  - [outputUnsafe](#outputunsafe)
  - [proofUnsafe](#proofunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
- [Types](#types)
  - [VRFCert (type alias)](#vrfcert-type-alias)

---

# Constructors

## \_new

Static method \_new of VRFCert

**Signature**

```ts
export declare const _new: (output: Uint8Array, proof: Uint8Array) => Effect.Effect<CML.VRFCert, VRFCertError>
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of VRFCert

**Signature**

```ts
export declare const fromCborBytes: (cborBytes: Uint8Array) => Effect.Effect<CML.VRFCert, VRFCertError>
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of VRFCert

**Signature**

```ts
export declare const fromCborHex: (cborBytes: string) => Effect.Effect<CML.VRFCert, VRFCertError>
```

Added in v2.0.0

## fromJson

Static method fromJson of VRFCert

**Signature**

```ts
export declare const fromJson: (json: string) => Effect.Effect<CML.VRFCert, VRFCertError>
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls VRFCert.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (output: Uint8Array, proof: Uint8Array) => CML.VRFCert
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls VRFCert.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (cborBytes: Uint8Array) => CML.VRFCert
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls VRFCert.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.VRFCert
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls VRFCert.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.VRFCert
```

Added in v2.0.0

# Errors

## VRFCertError (class)

Error class for VRFCert operations

This error is thrown when operations on VRFCert instances fail.

**Signature**

```ts
export declare class VRFCertError
```

Added in v2.0.0

# Methods

## free

Method free of VRFCert

**Signature**

```ts
export declare const free: (instance: CML.VRFCert) => Effect.Effect<void, VRFCertError>
```

Added in v2.0.0

## output

Method output of VRFCert

**Signature**

```ts
export declare const output: (instance: CML.VRFCert) => Effect.Effect<Uint8Array, VRFCertError>
```

Added in v2.0.0

## proof

Method proof of VRFCert

**Signature**

```ts
export declare const proof: (instance: CML.VRFCert) => Effect.Effect<Uint8Array, VRFCertError>
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of VRFCert

**Signature**

```ts
export declare const toCanonicalCborBytes: (instance: CML.VRFCert) => Effect.Effect<Uint8Array, VRFCertError>
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of VRFCert

**Signature**

```ts
export declare const toCanonicalCborHex: (instance: CML.VRFCert) => Effect.Effect<string, VRFCertError>
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of VRFCert

**Signature**

```ts
export declare const toCborBytes: (instance: CML.VRFCert) => Effect.Effect<Uint8Array, VRFCertError>
```

Added in v2.0.0

## toCborHex

Method toCborHex of VRFCert

**Signature**

```ts
export declare const toCborHex: (instance: CML.VRFCert) => Effect.Effect<string, VRFCertError>
```

Added in v2.0.0

## toJsValue

Method toJsValue of VRFCert

**Signature**

```ts
export declare const toJsValue: (instance: CML.VRFCert) => Effect.Effect<any, VRFCertError>
```

Added in v2.0.0

## toJson

Method toJson of VRFCert

**Signature**

```ts
export declare const toJson: (instance: CML.VRFCert) => Effect.Effect<string, VRFCertError>
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.VRFCert) => void
```

Added in v2.0.0

## outputUnsafe

Unsafely calls instance.output without Effect wrapper

**Signature**

```ts
export declare const outputUnsafe: (instance: CML.VRFCert) => Uint8Array
```

Added in v2.0.0

## proofUnsafe

Unsafely calls instance.proof without Effect wrapper

**Signature**

```ts
export declare const proofUnsafe: (instance: CML.VRFCert) => Uint8Array
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (instance: CML.VRFCert) => Uint8Array
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (instance: CML.VRFCert) => string
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (instance: CML.VRFCert) => Uint8Array
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.VRFCert) => string
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.VRFCert) => any
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.VRFCert) => string
```

Added in v2.0.0

# Types

## VRFCert (type alias)

Type alias for the CML VRFCert class

**Signature**

```ts
export type VRFCert = CML.VRFCert
```

Added in v2.0.0
