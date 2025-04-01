---
title: CML/KESSignature.ts
nav_order: 110
parent: Modules
---

## KESSignature overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [fromCborBytes](#fromcborbytes)
  - [fromCborHex](#fromcborhex)
  - [fromJson](#fromjson)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [fromCborBytesUnsafe](#fromcborbytesunsafe)
  - [fromCborHexUnsafe](#fromcborhexunsafe)
  - [fromJsonUnsafe](#fromjsonunsafe)
- [Errors](#errors)
  - [KESSignatureError (class)](#kessignatureerror-class)
- [Methods](#methods)
  - [free](#free)
  - [get](#get)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
- [MethodsUnsafe](#methodsunsafe)
  - [freeUnsafe](#freeunsafe)
  - [getUnsafe](#getunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
- [Types](#types)
  - [KESSignature (type alias)](#kessignature-type-alias)

---

# Constructors

## fromCborBytes

Static method fromCborBytes of KESSignature

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.KESSignature, KESSignatureError>;
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of KESSignature

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.KESSignature, KESSignatureError>;
```

Added in v2.0.0

## fromJson

Static method fromJson of KESSignature

**Signature**

```ts
export declare const fromJson: (
  json: string,
) => Effect.Effect<CML.KESSignature, KESSignatureError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## fromCborBytesUnsafe

Unsafely calls KESSignature.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (
  cborBytes: Uint8Array,
) => CML.KESSignature;
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls KESSignature.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.KESSignature;
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls KESSignature.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.KESSignature;
```

Added in v2.0.0

# Errors

## KESSignatureError (class)

Error class for KESSignature operations

This error is thrown when operations on KESSignature instances fail.

**Signature**

```ts
export declare class KESSignatureError
```

Added in v2.0.0

# Methods

## free

Method free of KESSignature

**Signature**

```ts
export declare const free: (
  instance: CML.KESSignature,
) => Effect.Effect<void, KESSignatureError>;
```

Added in v2.0.0

## get

Method get of KESSignature

**Signature**

```ts
export declare const get: (
  instance: CML.KESSignature,
) => Effect.Effect<Uint8Array, KESSignatureError>;
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of KESSignature

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.KESSignature,
) => Effect.Effect<Uint8Array, KESSignatureError>;
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of KESSignature

**Signature**

```ts
export declare const toCanonicalCborHex: (
  instance: CML.KESSignature,
) => Effect.Effect<string, KESSignatureError>;
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of KESSignature

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.KESSignature,
) => Effect.Effect<Uint8Array, KESSignatureError>;
```

Added in v2.0.0

## toCborHex

Method toCborHex of KESSignature

**Signature**

```ts
export declare const toCborHex: (
  instance: CML.KESSignature,
) => Effect.Effect<string, KESSignatureError>;
```

Added in v2.0.0

## toJsValue

Method toJsValue of KESSignature

**Signature**

```ts
export declare const toJsValue: (
  instance: CML.KESSignature,
) => Effect.Effect<any, KESSignatureError>;
```

Added in v2.0.0

## toJson

Method toJson of KESSignature

**Signature**

```ts
export declare const toJson: (
  instance: CML.KESSignature,
) => Effect.Effect<string, KESSignatureError>;
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.KESSignature) => void;
```

Added in v2.0.0

## getUnsafe

Unsafely calls instance.get without Effect wrapper

**Signature**

```ts
export declare const getUnsafe: (instance: CML.KESSignature) => Uint8Array;
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (
  instance: CML.KESSignature,
) => Uint8Array;
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (
  instance: CML.KESSignature,
) => string;
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (
  instance: CML.KESSignature,
) => Uint8Array;
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.KESSignature) => string;
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.KESSignature) => any;
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.KESSignature) => string;
```

Added in v2.0.0

# Types

## KESSignature (type alias)

Type alias for the CML KESSignature class

**Signature**

```ts
export type KESSignature = CML.KESSignature;
```

Added in v2.0.0
