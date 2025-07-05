---
title: CML/Anchor.ts
nav_order: 13
parent: Modules
---

## Anchor overview

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
  - [AnchorError (class)](#anchorerror-class)
- [Methods](#methods)
  - [anchorDocHash](#anchordochash)
  - [anchorUrl](#anchorurl)
  - [free](#free)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
- [MethodsUnsafe](#methodsunsafe)
  - [anchorDocHashUnsafe](#anchordochashunsafe)
  - [anchorUrlUnsafe](#anchorurlunsafe)
  - [freeUnsafe](#freeunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
- [Types](#types)
  - [Anchor (type alias)](#anchor-type-alias)

---

# Constructors

## \_new

Static method \_new of Anchor

**Signature**

```ts
export declare const _new: (
  anchorUrl: CML.Url,
  anchorDocHash: CML.AnchorDocHash,
) => Effect.Effect<CML.Anchor, AnchorError>;
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of Anchor

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.Anchor, AnchorError>;
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of Anchor

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.Anchor, AnchorError>;
```

Added in v2.0.0

## fromJson

Static method fromJson of Anchor

**Signature**

```ts
export declare const fromJson: (
  json: string,
) => Effect.Effect<CML.Anchor, AnchorError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls Anchor.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (
  anchorUrl: CML.Url,
  anchorDocHash: CML.AnchorDocHash,
) => CML.Anchor;
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls Anchor.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (cborBytes: Uint8Array) => CML.Anchor;
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls Anchor.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.Anchor;
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls Anchor.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.Anchor;
```

Added in v2.0.0

# Errors

## AnchorError (class)

Error class for Anchor operations

This error is thrown when operations on Anchor instances fail.

**Signature**

```ts
export declare class AnchorError
```

Added in v2.0.0

# Methods

## anchorDocHash

Method anchorDocHash of Anchor

**Signature**

```ts
export declare const anchorDocHash: (
  instance: CML.Anchor,
) => Effect.Effect<CML.AnchorDocHash, AnchorError>;
```

Added in v2.0.0

## anchorUrl

Method anchorUrl of Anchor

**Signature**

```ts
export declare const anchorUrl: (
  instance: CML.Anchor,
) => Effect.Effect<CML.Url, AnchorError>;
```

Added in v2.0.0

## free

Method free of Anchor

**Signature**

```ts
export declare const free: (
  instance: CML.Anchor,
) => Effect.Effect<void, AnchorError>;
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of Anchor

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.Anchor,
) => Effect.Effect<Uint8Array, AnchorError>;
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of Anchor

**Signature**

```ts
export declare const toCanonicalCborHex: (
  instance: CML.Anchor,
) => Effect.Effect<string, AnchorError>;
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of Anchor

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.Anchor,
) => Effect.Effect<Uint8Array, AnchorError>;
```

Added in v2.0.0

## toCborHex

Method toCborHex of Anchor

**Signature**

```ts
export declare const toCborHex: (
  instance: CML.Anchor,
) => Effect.Effect<string, AnchorError>;
```

Added in v2.0.0

## toJsValue

Method toJsValue of Anchor

**Signature**

```ts
export declare const toJsValue: (
  instance: CML.Anchor,
) => Effect.Effect<any, AnchorError>;
```

Added in v2.0.0

## toJson

Method toJson of Anchor

**Signature**

```ts
export declare const toJson: (
  instance: CML.Anchor,
) => Effect.Effect<string, AnchorError>;
```

Added in v2.0.0

# MethodsUnsafe

## anchorDocHashUnsafe

Unsafely calls instance.anchorDocHash without Effect wrapper

**Signature**

```ts
export declare const anchorDocHashUnsafe: (
  instance: CML.Anchor,
) => CML.AnchorDocHash;
```

Added in v2.0.0

## anchorUrlUnsafe

Unsafely calls instance.anchorUrl without Effect wrapper

**Signature**

```ts
export declare const anchorUrlUnsafe: (instance: CML.Anchor) => CML.Url;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.Anchor) => void;
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (
  instance: CML.Anchor,
) => Uint8Array;
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (instance: CML.Anchor) => string;
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (instance: CML.Anchor) => Uint8Array;
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.Anchor) => string;
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.Anchor) => any;
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.Anchor) => string;
```

Added in v2.0.0

# Types

## Anchor (type alias)

Type alias for the CML Anchor class

**Signature**

```ts
export type Anchor = CML.Anchor;
```

Added in v2.0.0
