---
title: CML/ScriptInvalidBefore.ts
nav_order: 202
parent: Modules
---

## ScriptInvalidBefore overview

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
  - [ScriptInvalidBeforeError (class)](#scriptinvalidbeforeerror-class)
- [Methods](#methods)
  - [before](#before)
  - [free](#free)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
- [MethodsUnsafe](#methodsunsafe)
  - [beforeUnsafe](#beforeunsafe)
  - [freeUnsafe](#freeunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
- [Types](#types)
  - [ScriptInvalidBefore (type alias)](#scriptinvalidbefore-type-alias)

---

# Constructors

## \_new

Static method \_new of ScriptInvalidBefore

**Signature**

```ts
export declare const _new: (
  before: bigint,
) => Effect.Effect<CML.ScriptInvalidBefore, ScriptInvalidBeforeError>;
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of ScriptInvalidBefore

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.ScriptInvalidBefore, ScriptInvalidBeforeError>;
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of ScriptInvalidBefore

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.ScriptInvalidBefore, ScriptInvalidBeforeError>;
```

Added in v2.0.0

## fromJson

Static method fromJson of ScriptInvalidBefore

**Signature**

```ts
export declare const fromJson: (
  json: string,
) => Effect.Effect<CML.ScriptInvalidBefore, ScriptInvalidBeforeError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls ScriptInvalidBefore.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (before: bigint) => CML.ScriptInvalidBefore;
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls ScriptInvalidBefore.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (
  cborBytes: Uint8Array,
) => CML.ScriptInvalidBefore;
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls ScriptInvalidBefore.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (
  cborBytes: string,
) => CML.ScriptInvalidBefore;
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls ScriptInvalidBefore.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.ScriptInvalidBefore;
```

Added in v2.0.0

# Errors

## ScriptInvalidBeforeError (class)

Error class for ScriptInvalidBefore operations

This error is thrown when operations on ScriptInvalidBefore instances fail.

**Signature**

```ts
export declare class ScriptInvalidBeforeError
```

Added in v2.0.0

# Methods

## before

Method before of ScriptInvalidBefore

**Signature**

```ts
export declare const before: (
  instance: CML.ScriptInvalidBefore,
) => Effect.Effect<bigint, ScriptInvalidBeforeError>;
```

Added in v2.0.0

## free

Method free of ScriptInvalidBefore

**Signature**

```ts
export declare const free: (
  instance: CML.ScriptInvalidBefore,
) => Effect.Effect<void, ScriptInvalidBeforeError>;
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of ScriptInvalidBefore

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.ScriptInvalidBefore,
) => Effect.Effect<Uint8Array, ScriptInvalidBeforeError>;
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of ScriptInvalidBefore

**Signature**

```ts
export declare const toCanonicalCborHex: (
  instance: CML.ScriptInvalidBefore,
) => Effect.Effect<string, ScriptInvalidBeforeError>;
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of ScriptInvalidBefore

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.ScriptInvalidBefore,
) => Effect.Effect<Uint8Array, ScriptInvalidBeforeError>;
```

Added in v2.0.0

## toCborHex

Method toCborHex of ScriptInvalidBefore

**Signature**

```ts
export declare const toCborHex: (
  instance: CML.ScriptInvalidBefore,
) => Effect.Effect<string, ScriptInvalidBeforeError>;
```

Added in v2.0.0

## toJsValue

Method toJsValue of ScriptInvalidBefore

**Signature**

```ts
export declare const toJsValue: (
  instance: CML.ScriptInvalidBefore,
) => Effect.Effect<any, ScriptInvalidBeforeError>;
```

Added in v2.0.0

## toJson

Method toJson of ScriptInvalidBefore

**Signature**

```ts
export declare const toJson: (
  instance: CML.ScriptInvalidBefore,
) => Effect.Effect<string, ScriptInvalidBeforeError>;
```

Added in v2.0.0

# MethodsUnsafe

## beforeUnsafe

Unsafely calls instance.before without Effect wrapper

**Signature**

```ts
export declare const beforeUnsafe: (
  instance: CML.ScriptInvalidBefore,
) => bigint;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.ScriptInvalidBefore) => void;
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (
  instance: CML.ScriptInvalidBefore,
) => Uint8Array;
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (
  instance: CML.ScriptInvalidBefore,
) => string;
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (
  instance: CML.ScriptInvalidBefore,
) => Uint8Array;
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (
  instance: CML.ScriptInvalidBefore,
) => string;
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (
  instance: CML.ScriptInvalidBefore,
) => any;
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (
  instance: CML.ScriptInvalidBefore,
) => string;
```

Added in v2.0.0

# Types

## ScriptInvalidBefore (type alias)

Type alias for the CML ScriptInvalidBefore class

**Signature**

```ts
export type ScriptInvalidBefore = CML.ScriptInvalidBefore;
```

Added in v2.0.0
