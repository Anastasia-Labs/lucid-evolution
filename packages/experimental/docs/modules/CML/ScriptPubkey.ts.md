---
title: CML/ScriptPubkey.ts
nav_order: 201
parent: Modules
---

## ScriptPubkey overview

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
  - [ScriptPubkeyError (class)](#scriptpubkeyerror-class)
- [Methods](#methods)
  - [ed25519KeyHash](#ed25519keyhash)
  - [free](#free)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
- [MethodsUnsafe](#methodsunsafe)
  - [ed25519KeyHashUnsafe](#ed25519keyhashunsafe)
  - [freeUnsafe](#freeunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
- [Types](#types)
  - [ScriptPubkey (type alias)](#scriptpubkey-type-alias)

---

# Constructors

## \_new

Static method \_new of ScriptPubkey

**Signature**

```ts
export declare const _new: (
  ed25519KeyHash: CML.Ed25519KeyHash,
) => Effect.Effect<CML.ScriptPubkey, ScriptPubkeyError>;
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of ScriptPubkey

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.ScriptPubkey, ScriptPubkeyError>;
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of ScriptPubkey

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.ScriptPubkey, ScriptPubkeyError>;
```

Added in v2.0.0

## fromJson

Static method fromJson of ScriptPubkey

**Signature**

```ts
export declare const fromJson: (
  json: string,
) => Effect.Effect<CML.ScriptPubkey, ScriptPubkeyError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls ScriptPubkey.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (
  ed25519KeyHash: CML.Ed25519KeyHash,
) => CML.ScriptPubkey;
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls ScriptPubkey.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (
  cborBytes: Uint8Array,
) => CML.ScriptPubkey;
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls ScriptPubkey.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.ScriptPubkey;
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls ScriptPubkey.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.ScriptPubkey;
```

Added in v2.0.0

# Errors

## ScriptPubkeyError (class)

Error class for ScriptPubkey operations

This error is thrown when operations on ScriptPubkey instances fail.

**Signature**

```ts
export declare class ScriptPubkeyError
```

Added in v2.0.0

# Methods

## ed25519KeyHash

Method ed25519KeyHash of ScriptPubkey

**Signature**

```ts
export declare const ed25519KeyHash: (
  instance: CML.ScriptPubkey,
) => Effect.Effect<CML.Ed25519KeyHash, ScriptPubkeyError>;
```

Added in v2.0.0

## free

Method free of ScriptPubkey

**Signature**

```ts
export declare const free: (
  instance: CML.ScriptPubkey,
) => Effect.Effect<void, ScriptPubkeyError>;
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of ScriptPubkey

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.ScriptPubkey,
) => Effect.Effect<Uint8Array, ScriptPubkeyError>;
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of ScriptPubkey

**Signature**

```ts
export declare const toCanonicalCborHex: (
  instance: CML.ScriptPubkey,
) => Effect.Effect<string, ScriptPubkeyError>;
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of ScriptPubkey

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.ScriptPubkey,
) => Effect.Effect<Uint8Array, ScriptPubkeyError>;
```

Added in v2.0.0

## toCborHex

Method toCborHex of ScriptPubkey

**Signature**

```ts
export declare const toCborHex: (
  instance: CML.ScriptPubkey,
) => Effect.Effect<string, ScriptPubkeyError>;
```

Added in v2.0.0

## toJsValue

Method toJsValue of ScriptPubkey

**Signature**

```ts
export declare const toJsValue: (
  instance: CML.ScriptPubkey,
) => Effect.Effect<any, ScriptPubkeyError>;
```

Added in v2.0.0

## toJson

Method toJson of ScriptPubkey

**Signature**

```ts
export declare const toJson: (
  instance: CML.ScriptPubkey,
) => Effect.Effect<string, ScriptPubkeyError>;
```

Added in v2.0.0

# MethodsUnsafe

## ed25519KeyHashUnsafe

Unsafely calls instance.ed25519KeyHash without Effect wrapper

**Signature**

```ts
export declare const ed25519KeyHashUnsafe: (
  instance: CML.ScriptPubkey,
) => CML.Ed25519KeyHash;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.ScriptPubkey) => void;
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (
  instance: CML.ScriptPubkey,
) => Uint8Array;
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (
  instance: CML.ScriptPubkey,
) => string;
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (
  instance: CML.ScriptPubkey,
) => Uint8Array;
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.ScriptPubkey) => string;
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.ScriptPubkey) => any;
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.ScriptPubkey) => string;
```

Added in v2.0.0

# Types

## ScriptPubkey (type alias)

Type alias for the CML ScriptPubkey class

**Signature**

```ts
export type ScriptPubkey = CML.ScriptPubkey;
```

Added in v2.0.0
