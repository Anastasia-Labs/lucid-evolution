---
title: CML/CIP25ChunkableString.ts
nav_order: 29
parent: Modules
---

## CIP25ChunkableString overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [fromCborBytes](#fromcborbytes)
  - [fromCborHex](#fromcborhex)
  - [fromJson](#fromjson)
  - [fromString](#fromstring)
  - [newChunked](#newchunked)
  - [newSingle](#newsingle)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [fromCborBytesUnsafe](#fromcborbytesunsafe)
  - [fromCborHexUnsafe](#fromcborhexunsafe)
  - [fromJsonUnsafe](#fromjsonunsafe)
  - [fromStringUnsafe](#fromstringunsafe)
  - [newChunkedUnsafe](#newchunkedunsafe)
  - [newSingleUnsafe](#newsingleunsafe)
- [Errors](#errors)
  - [CIP25ChunkableStringError (class)](#cip25chunkablestringerror-class)
- [Methods](#methods)
  - [asChunked](#aschunked)
  - [asSingle](#assingle)
  - [free](#free)
  - [kind](#kind)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
  - [toString](#tostring)
- [MethodsUnsafe](#methodsunsafe)
  - [asChunkedUnsafe](#aschunkedunsafe)
  - [asSingleUnsafe](#assingleunsafe)
  - [freeUnsafe](#freeunsafe)
  - [kindUnsafe](#kindunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
  - [toStringUnsafe](#tostringunsafe)
- [Types](#types)
  - [CIP25ChunkableString (type alias)](#cip25chunkablestring-type-alias)

---

# Constructors

## fromCborBytes

Static method fromCborBytes of CIP25ChunkableString

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.CIP25ChunkableString, CIP25ChunkableStringError>;
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of CIP25ChunkableString

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.CIP25ChunkableString, CIP25ChunkableStringError>;
```

Added in v2.0.0

## fromJson

Static method fromJson of CIP25ChunkableString

**Signature**

```ts
export declare const fromJson: (
  json: string,
) => Effect.Effect<CML.CIP25ChunkableString, CIP25ChunkableStringError>;
```

Added in v2.0.0

## fromString

Static method fromString of CIP25ChunkableString

**Signature**

```ts
export declare const fromString: (
  str: string,
) => Effect.Effect<CML.CIP25ChunkableString, CIP25ChunkableStringError>;
```

Added in v2.0.0

## newChunked

Static method newChunked of CIP25ChunkableString

**Signature**

```ts
export declare const newChunked: (
  chunked: CML.CIP25String64List,
) => Effect.Effect<CML.CIP25ChunkableString, CIP25ChunkableStringError>;
```

Added in v2.0.0

## newSingle

Static method newSingle of CIP25ChunkableString

**Signature**

```ts
export declare const newSingle: (
  single: CML.CIP25String64,
) => Effect.Effect<CML.CIP25ChunkableString, CIP25ChunkableStringError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## fromCborBytesUnsafe

Unsafely calls CIP25ChunkableString.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (
  cborBytes: Uint8Array,
) => CML.CIP25ChunkableString;
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls CIP25ChunkableString.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (
  cborBytes: string,
) => CML.CIP25ChunkableString;
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls CIP25ChunkableString.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.CIP25ChunkableString;
```

Added in v2.0.0

## fromStringUnsafe

Unsafely calls CIP25ChunkableString.fromString without Effect wrapper

**Signature**

```ts
export declare const fromStringUnsafe: (
  str: string,
) => CML.CIP25ChunkableString;
```

Added in v2.0.0

## newChunkedUnsafe

Unsafely calls CIP25ChunkableString.newChunked without Effect wrapper

**Signature**

```ts
export declare const newChunkedUnsafe: (
  chunked: CML.CIP25String64List,
) => CML.CIP25ChunkableString;
```

Added in v2.0.0

## newSingleUnsafe

Unsafely calls CIP25ChunkableString.newSingle without Effect wrapper

**Signature**

```ts
export declare const newSingleUnsafe: (
  single: CML.CIP25String64,
) => CML.CIP25ChunkableString;
```

Added in v2.0.0

# Errors

## CIP25ChunkableStringError (class)

Error class for CIP25ChunkableString operations

This error is thrown when operations on CIP25ChunkableString instances fail.

**Signature**

```ts
export declare class CIP25ChunkableStringError
```

Added in v2.0.0

# Methods

## asChunked

Method asChunked of CIP25ChunkableString

**Signature**

```ts
export declare const asChunked: (
  instance: CML.CIP25ChunkableString,
) => Effect.Effect<
  CML.CIP25String64List | undefined,
  CIP25ChunkableStringError
>;
```

Added in v2.0.0

## asSingle

Method asSingle of CIP25ChunkableString

**Signature**

```ts
export declare const asSingle: (
  instance: CML.CIP25ChunkableString,
) => Effect.Effect<CML.CIP25String64 | undefined, CIP25ChunkableStringError>;
```

Added in v2.0.0

## free

Method free of CIP25ChunkableString

**Signature**

```ts
export declare const free: (
  instance: CML.CIP25ChunkableString,
) => Effect.Effect<void, CIP25ChunkableStringError>;
```

Added in v2.0.0

## kind

Method kind of CIP25ChunkableString

**Signature**

```ts
export declare const kind: (
  instance: CML.CIP25ChunkableString,
) => Effect.Effect<CML.ChunkableStringKind, CIP25ChunkableStringError>;
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of CIP25ChunkableString

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.CIP25ChunkableString,
) => Effect.Effect<Uint8Array, CIP25ChunkableStringError>;
```

Added in v2.0.0

## toCborHex

Method toCborHex of CIP25ChunkableString

**Signature**

```ts
export declare const toCborHex: (
  instance: CML.CIP25ChunkableString,
) => Effect.Effect<string, CIP25ChunkableStringError>;
```

Added in v2.0.0

## toJsValue

Method toJsValue of CIP25ChunkableString

**Signature**

```ts
export declare const toJsValue: (
  instance: CML.CIP25ChunkableString,
) => Effect.Effect<any, CIP25ChunkableStringError>;
```

Added in v2.0.0

## toJson

Method toJson of CIP25ChunkableString

**Signature**

```ts
export declare const toJson: (
  instance: CML.CIP25ChunkableString,
) => Effect.Effect<string, CIP25ChunkableStringError>;
```

Added in v2.0.0

## toString

Method toString of CIP25ChunkableString

**Signature**

```ts
export declare const toString: (
  instance: CML.CIP25ChunkableString,
) => Effect.Effect<string, CIP25ChunkableStringError>;
```

Added in v2.0.0

# MethodsUnsafe

## asChunkedUnsafe

Unsafely calls instance.asChunked without Effect wrapper

**Signature**

```ts
export declare const asChunkedUnsafe: (
  instance: CML.CIP25ChunkableString,
) => CML.CIP25String64List | undefined;
```

Added in v2.0.0

## asSingleUnsafe

Unsafely calls instance.asSingle without Effect wrapper

**Signature**

```ts
export declare const asSingleUnsafe: (
  instance: CML.CIP25ChunkableString,
) => CML.CIP25String64 | undefined;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.CIP25ChunkableString) => void;
```

Added in v2.0.0

## kindUnsafe

Unsafely calls instance.kind without Effect wrapper

**Signature**

```ts
export declare const kindUnsafe: (
  instance: CML.CIP25ChunkableString,
) => CML.ChunkableStringKind;
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (
  instance: CML.CIP25ChunkableString,
) => Uint8Array;
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (
  instance: CML.CIP25ChunkableString,
) => string;
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (
  instance: CML.CIP25ChunkableString,
) => any;
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (
  instance: CML.CIP25ChunkableString,
) => string;
```

Added in v2.0.0

## toStringUnsafe

Unsafely calls instance.toString without Effect wrapper

**Signature**

```ts
export declare const toStringUnsafe: (
  instance: CML.CIP25ChunkableString,
) => string;
```

Added in v2.0.0

# Types

## CIP25ChunkableString (type alias)

Type alias for the CML CIP25ChunkableString class

**Signature**

```ts
export type CIP25ChunkableString = CML.CIP25ChunkableString;
```

Added in v2.0.0
