---
title: CML/BootstrapWitness.ts
nav_order: 20
parent: Modules
---

## BootstrapWitness overview

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
  - [BootstrapWitnessError (class)](#bootstrapwitnesserror-class)
- [Methods](#methods)
  - [attributes](#attributes)
  - [chainCode](#chaincode)
  - [free](#free)
  - [publicKey](#publickey)
  - [signature](#signature)
  - [toAddress](#toaddress)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
- [MethodsUnsafe](#methodsunsafe)
  - [attributesUnsafe](#attributesunsafe)
  - [chainCodeUnsafe](#chaincodeunsafe)
  - [freeUnsafe](#freeunsafe)
  - [publicKeyUnsafe](#publickeyunsafe)
  - [signatureUnsafe](#signatureunsafe)
  - [toAddressUnsafe](#toaddressunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
- [Types](#types)
  - [BootstrapWitness (type alias)](#bootstrapwitness-type-alias)

---

# Constructors

## \_new

Static method \_new of BootstrapWitness

**Signature**

```ts
export declare const _new: (
  publicKey: CML.PublicKey,
  signature: CML.Ed25519Signature,
  chainCode: Uint8Array,
  attributes: CML.AddrAttributes,
) => Effect.Effect<CML.BootstrapWitness, BootstrapWitnessError>;
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of BootstrapWitness

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.BootstrapWitness, BootstrapWitnessError>;
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of BootstrapWitness

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.BootstrapWitness, BootstrapWitnessError>;
```

Added in v2.0.0

## fromJson

Static method fromJson of BootstrapWitness

**Signature**

```ts
export declare const fromJson: (
  json: string,
) => Effect.Effect<CML.BootstrapWitness, BootstrapWitnessError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls BootstrapWitness.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (
  publicKey: CML.PublicKey,
  signature: CML.Ed25519Signature,
  chainCode: Uint8Array,
  attributes: CML.AddrAttributes,
) => CML.BootstrapWitness;
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls BootstrapWitness.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (
  cborBytes: Uint8Array,
) => CML.BootstrapWitness;
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls BootstrapWitness.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (
  cborBytes: string,
) => CML.BootstrapWitness;
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls BootstrapWitness.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.BootstrapWitness;
```

Added in v2.0.0

# Errors

## BootstrapWitnessError (class)

Error class for BootstrapWitness operations

This error is thrown when operations on BootstrapWitness instances fail.

**Signature**

```ts
export declare class BootstrapWitnessError
```

Added in v2.0.0

# Methods

## attributes

Method attributes of BootstrapWitness

**Signature**

```ts
export declare const attributes: (
  instance: CML.BootstrapWitness,
) => Effect.Effect<CML.AddrAttributes, BootstrapWitnessError>;
```

Added in v2.0.0

## chainCode

Method chainCode of BootstrapWitness

**Signature**

```ts
export declare const chainCode: (
  instance: CML.BootstrapWitness,
) => Effect.Effect<Uint8Array, BootstrapWitnessError>;
```

Added in v2.0.0

## free

Method free of BootstrapWitness

**Signature**

```ts
export declare const free: (
  instance: CML.BootstrapWitness,
) => Effect.Effect<void, BootstrapWitnessError>;
```

Added in v2.0.0

## publicKey

Method publicKey of BootstrapWitness

**Signature**

```ts
export declare const publicKey: (
  instance: CML.BootstrapWitness,
) => Effect.Effect<CML.PublicKey, BootstrapWitnessError>;
```

Added in v2.0.0

## signature

Method signature of BootstrapWitness

**Signature**

```ts
export declare const signature: (
  instance: CML.BootstrapWitness,
) => Effect.Effect<CML.Ed25519Signature, BootstrapWitnessError>;
```

Added in v2.0.0

## toAddress

Method toAddress of BootstrapWitness

**Signature**

```ts
export declare const toAddress: (
  instance: CML.BootstrapWitness,
) => Effect.Effect<CML.AddressContent, BootstrapWitnessError>;
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of BootstrapWitness

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.BootstrapWitness,
) => Effect.Effect<Uint8Array, BootstrapWitnessError>;
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of BootstrapWitness

**Signature**

```ts
export declare const toCanonicalCborHex: (
  instance: CML.BootstrapWitness,
) => Effect.Effect<string, BootstrapWitnessError>;
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of BootstrapWitness

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.BootstrapWitness,
) => Effect.Effect<Uint8Array, BootstrapWitnessError>;
```

Added in v2.0.0

## toCborHex

Method toCborHex of BootstrapWitness

**Signature**

```ts
export declare const toCborHex: (
  instance: CML.BootstrapWitness,
) => Effect.Effect<string, BootstrapWitnessError>;
```

Added in v2.0.0

## toJsValue

Method toJsValue of BootstrapWitness

**Signature**

```ts
export declare const toJsValue: (
  instance: CML.BootstrapWitness,
) => Effect.Effect<any, BootstrapWitnessError>;
```

Added in v2.0.0

## toJson

Method toJson of BootstrapWitness

**Signature**

```ts
export declare const toJson: (
  instance: CML.BootstrapWitness,
) => Effect.Effect<string, BootstrapWitnessError>;
```

Added in v2.0.0

# MethodsUnsafe

## attributesUnsafe

Unsafely calls instance.attributes without Effect wrapper

**Signature**

```ts
export declare const attributesUnsafe: (
  instance: CML.BootstrapWitness,
) => CML.AddrAttributes;
```

Added in v2.0.0

## chainCodeUnsafe

Unsafely calls instance.chainCode without Effect wrapper

**Signature**

```ts
export declare const chainCodeUnsafe: (
  instance: CML.BootstrapWitness,
) => Uint8Array;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.BootstrapWitness) => void;
```

Added in v2.0.0

## publicKeyUnsafe

Unsafely calls instance.publicKey without Effect wrapper

**Signature**

```ts
export declare const publicKeyUnsafe: (
  instance: CML.BootstrapWitness,
) => CML.PublicKey;
```

Added in v2.0.0

## signatureUnsafe

Unsafely calls instance.signature without Effect wrapper

**Signature**

```ts
export declare const signatureUnsafe: (
  instance: CML.BootstrapWitness,
) => CML.Ed25519Signature;
```

Added in v2.0.0

## toAddressUnsafe

Unsafely calls instance.toAddress without Effect wrapper

**Signature**

```ts
export declare const toAddressUnsafe: (
  instance: CML.BootstrapWitness,
) => CML.AddressContent;
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (
  instance: CML.BootstrapWitness,
) => Uint8Array;
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (
  instance: CML.BootstrapWitness,
) => string;
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (
  instance: CML.BootstrapWitness,
) => Uint8Array;
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (
  instance: CML.BootstrapWitness,
) => string;
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.BootstrapWitness) => any;
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.BootstrapWitness) => string;
```

Added in v2.0.0

# Types

## BootstrapWitness (type alias)

Type alias for the CML BootstrapWitness class

**Signature**

```ts
export type BootstrapWitness = CML.BootstrapWitness;
```

Added in v2.0.0
