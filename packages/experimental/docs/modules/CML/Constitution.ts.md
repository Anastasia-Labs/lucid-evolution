---
title: CML/Constitution.ts
nav_order: 46
parent: Modules
---

## Constitution overview

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
  - [ConstitutionError (class)](#constitutionerror-class)
- [Methods](#methods)
  - [anchor](#anchor)
  - [free](#free)
  - [scriptHash](#scripthash)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
- [MethodsUnsafe](#methodsunsafe)
  - [anchorUnsafe](#anchorunsafe)
  - [freeUnsafe](#freeunsafe)
  - [scriptHashUnsafe](#scripthashunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
- [Types](#types)
  - [Constitution (type alias)](#constitution-type-alias)

---

# Constructors

## \_new

Static method \_new of Constitution

**Signature**

```ts
export declare const _new: (
  anchor: CML.Anchor,
  scriptHash: CML.ScriptHash,
) => Effect.Effect<CML.Constitution, ConstitutionError>;
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of Constitution

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.Constitution, ConstitutionError>;
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of Constitution

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.Constitution, ConstitutionError>;
```

Added in v2.0.0

## fromJson

Static method fromJson of Constitution

**Signature**

```ts
export declare const fromJson: (
  json: string,
) => Effect.Effect<CML.Constitution, ConstitutionError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls Constitution.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (
  anchor: CML.Anchor,
  scriptHash: CML.ScriptHash,
) => CML.Constitution;
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls Constitution.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (
  cborBytes: Uint8Array,
) => CML.Constitution;
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls Constitution.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.Constitution;
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls Constitution.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.Constitution;
```

Added in v2.0.0

# Errors

## ConstitutionError (class)

Error class for Constitution operations

This error is thrown when operations on Constitution instances fail.

**Signature**

```ts
export declare class ConstitutionError
```

Added in v2.0.0

# Methods

## anchor

Method anchor of Constitution

**Signature**

```ts
export declare const anchor: (
  instance: CML.Constitution,
) => Effect.Effect<CML.Anchor, ConstitutionError>;
```

Added in v2.0.0

## free

Method free of Constitution

**Signature**

```ts
export declare const free: (
  instance: CML.Constitution,
) => Effect.Effect<void, ConstitutionError>;
```

Added in v2.0.0

## scriptHash

Method scriptHash of Constitution

**Signature**

```ts
export declare const scriptHash: (
  instance: CML.Constitution,
) => Effect.Effect<CML.ScriptHash | undefined, ConstitutionError>;
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of Constitution

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.Constitution,
) => Effect.Effect<Uint8Array, ConstitutionError>;
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of Constitution

**Signature**

```ts
export declare const toCanonicalCborHex: (
  instance: CML.Constitution,
) => Effect.Effect<string, ConstitutionError>;
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of Constitution

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.Constitution,
) => Effect.Effect<Uint8Array, ConstitutionError>;
```

Added in v2.0.0

## toCborHex

Method toCborHex of Constitution

**Signature**

```ts
export declare const toCborHex: (
  instance: CML.Constitution,
) => Effect.Effect<string, ConstitutionError>;
```

Added in v2.0.0

## toJsValue

Method toJsValue of Constitution

**Signature**

```ts
export declare const toJsValue: (
  instance: CML.Constitution,
) => Effect.Effect<any, ConstitutionError>;
```

Added in v2.0.0

## toJson

Method toJson of Constitution

**Signature**

```ts
export declare const toJson: (
  instance: CML.Constitution,
) => Effect.Effect<string, ConstitutionError>;
```

Added in v2.0.0

# MethodsUnsafe

## anchorUnsafe

Unsafely calls instance.anchor without Effect wrapper

**Signature**

```ts
export declare const anchorUnsafe: (instance: CML.Constitution) => CML.Anchor;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.Constitution) => void;
```

Added in v2.0.0

## scriptHashUnsafe

Unsafely calls instance.scriptHash without Effect wrapper

**Signature**

```ts
export declare const scriptHashUnsafe: (
  instance: CML.Constitution,
) => CML.ScriptHash | undefined;
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (
  instance: CML.Constitution,
) => Uint8Array;
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (
  instance: CML.Constitution,
) => string;
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (
  instance: CML.Constitution,
) => Uint8Array;
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.Constitution) => string;
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.Constitution) => any;
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.Constitution) => string;
```

Added in v2.0.0

# Types

## Constitution (type alias)

Type alias for the CML Constitution class

**Signature**

```ts
export type Constitution = CML.Constitution;
```

Added in v2.0.0
