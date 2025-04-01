---
title: CML/Vkeywitness.ts
nav_order: 274
parent: Modules
---

## Vkeywitness overview

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
  - [VkeywitnessError (class)](#vkeywitnesserror-class)
- [Methods](#methods)
  - [ed25519Signature](#ed25519signature)
  - [free](#free)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
  - [vkey](#vkey)
- [MethodsUnsafe](#methodsunsafe)
  - [ed25519SignatureUnsafe](#ed25519signatureunsafe)
  - [freeUnsafe](#freeunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
  - [vkeyUnsafe](#vkeyunsafe)
- [Types](#types)
  - [Vkeywitness (type alias)](#vkeywitness-type-alias)

---

# Constructors

## \_new

Static method \_new of Vkeywitness

**Signature**

```ts
export declare const _new: (
  vkey: CML.PublicKey,
  ed25519Signature: CML.Ed25519Signature,
) => Effect.Effect<CML.Vkeywitness, VkeywitnessError>;
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of Vkeywitness

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.Vkeywitness, VkeywitnessError>;
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of Vkeywitness

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.Vkeywitness, VkeywitnessError>;
```

Added in v2.0.0

## fromJson

Static method fromJson of Vkeywitness

**Signature**

```ts
export declare const fromJson: (
  json: string,
) => Effect.Effect<CML.Vkeywitness, VkeywitnessError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls Vkeywitness.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (
  vkey: CML.PublicKey,
  ed25519Signature: CML.Ed25519Signature,
) => CML.Vkeywitness;
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls Vkeywitness.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (
  cborBytes: Uint8Array,
) => CML.Vkeywitness;
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls Vkeywitness.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.Vkeywitness;
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls Vkeywitness.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.Vkeywitness;
```

Added in v2.0.0

# Errors

## VkeywitnessError (class)

Error class for Vkeywitness operations

This error is thrown when operations on Vkeywitness instances fail.

**Signature**

```ts
export declare class VkeywitnessError
```

Added in v2.0.0

# Methods

## ed25519Signature

Method ed25519Signature of Vkeywitness

**Signature**

```ts
export declare const ed25519Signature: (
  instance: CML.Vkeywitness,
) => Effect.Effect<CML.Ed25519Signature, VkeywitnessError>;
```

Added in v2.0.0

## free

Method free of Vkeywitness

**Signature**

```ts
export declare const free: (
  instance: CML.Vkeywitness,
) => Effect.Effect<void, VkeywitnessError>;
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of Vkeywitness

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.Vkeywitness,
) => Effect.Effect<Uint8Array, VkeywitnessError>;
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of Vkeywitness

**Signature**

```ts
export declare const toCanonicalCborHex: (
  instance: CML.Vkeywitness,
) => Effect.Effect<string, VkeywitnessError>;
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of Vkeywitness

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.Vkeywitness,
) => Effect.Effect<Uint8Array, VkeywitnessError>;
```

Added in v2.0.0

## toCborHex

Method toCborHex of Vkeywitness

**Signature**

```ts
export declare const toCborHex: (
  instance: CML.Vkeywitness,
) => Effect.Effect<string, VkeywitnessError>;
```

Added in v2.0.0

## toJsValue

Method toJsValue of Vkeywitness

**Signature**

```ts
export declare const toJsValue: (
  instance: CML.Vkeywitness,
) => Effect.Effect<any, VkeywitnessError>;
```

Added in v2.0.0

## toJson

Method toJson of Vkeywitness

**Signature**

```ts
export declare const toJson: (
  instance: CML.Vkeywitness,
) => Effect.Effect<string, VkeywitnessError>;
```

Added in v2.0.0

## vkey

Method vkey of Vkeywitness

**Signature**

```ts
export declare const vkey: (
  instance: CML.Vkeywitness,
) => Effect.Effect<CML.PublicKey, VkeywitnessError>;
```

Added in v2.0.0

# MethodsUnsafe

## ed25519SignatureUnsafe

Unsafely calls instance.ed25519Signature without Effect wrapper

**Signature**

```ts
export declare const ed25519SignatureUnsafe: (
  instance: CML.Vkeywitness,
) => CML.Ed25519Signature;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.Vkeywitness) => void;
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (
  instance: CML.Vkeywitness,
) => Uint8Array;
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (
  instance: CML.Vkeywitness,
) => string;
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (
  instance: CML.Vkeywitness,
) => Uint8Array;
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.Vkeywitness) => string;
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.Vkeywitness) => any;
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.Vkeywitness) => string;
```

Added in v2.0.0

## vkeyUnsafe

Unsafely calls instance.vkey without Effect wrapper

**Signature**

```ts
export declare const vkeyUnsafe: (instance: CML.Vkeywitness) => CML.PublicKey;
```

Added in v2.0.0

# Types

## Vkeywitness (type alias)

Type alias for the CML Vkeywitness class

**Signature**

```ts
export type Vkeywitness = CML.Vkeywitness;
```

Added in v2.0.0
