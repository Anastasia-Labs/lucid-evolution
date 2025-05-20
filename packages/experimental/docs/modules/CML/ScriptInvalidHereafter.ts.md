---
title: CML/ScriptInvalidHereafter.ts
nav_order: 204
parent: Modules
---

## ScriptInvalidHereafter overview

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
  - [ScriptInvalidHereafterError (class)](#scriptinvalidhereaftererror-class)
- [Methods](#methods)
  - [after](#after)
  - [free](#free)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
- [MethodsUnsafe](#methodsunsafe)
  - [afterUnsafe](#afterunsafe)
  - [freeUnsafe](#freeunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
- [Types](#types)
  - [ScriptInvalidHereafter (type alias)](#scriptinvalidhereafter-type-alias)

---

# Constructors

## \_new

Static method \_new of ScriptInvalidHereafter

**Signature**

```ts
export declare const _new: (after: bigint) => Effect.Effect<CML.ScriptInvalidHereafter, ScriptInvalidHereafterError>
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of ScriptInvalidHereafter

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array
) => Effect.Effect<CML.ScriptInvalidHereafter, ScriptInvalidHereafterError>
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of ScriptInvalidHereafter

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string
) => Effect.Effect<CML.ScriptInvalidHereafter, ScriptInvalidHereafterError>
```

Added in v2.0.0

## fromJson

Static method fromJson of ScriptInvalidHereafter

**Signature**

```ts
export declare const fromJson: (json: string) => Effect.Effect<CML.ScriptInvalidHereafter, ScriptInvalidHereafterError>
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls ScriptInvalidHereafter.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (after: bigint) => CML.ScriptInvalidHereafter
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls ScriptInvalidHereafter.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (cborBytes: Uint8Array) => CML.ScriptInvalidHereafter
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls ScriptInvalidHereafter.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.ScriptInvalidHereafter
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls ScriptInvalidHereafter.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.ScriptInvalidHereafter
```

Added in v2.0.0

# Errors

## ScriptInvalidHereafterError (class)

Error class for ScriptInvalidHereafter operations

This error is thrown when operations on ScriptInvalidHereafter instances fail.

**Signature**

```ts
export declare class ScriptInvalidHereafterError
```

Added in v2.0.0

# Methods

## after

Method after of ScriptInvalidHereafter

**Signature**

```ts
export declare const after: (instance: CML.ScriptInvalidHereafter) => Effect.Effect<bigint, ScriptInvalidHereafterError>
```

Added in v2.0.0

## free

Method free of ScriptInvalidHereafter

**Signature**

```ts
export declare const free: (instance: CML.ScriptInvalidHereafter) => Effect.Effect<void, ScriptInvalidHereafterError>
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of ScriptInvalidHereafter

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.ScriptInvalidHereafter
) => Effect.Effect<Uint8Array, ScriptInvalidHereafterError>
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of ScriptInvalidHereafter

**Signature**

```ts
export declare const toCanonicalCborHex: (
  instance: CML.ScriptInvalidHereafter
) => Effect.Effect<string, ScriptInvalidHereafterError>
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of ScriptInvalidHereafter

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.ScriptInvalidHereafter
) => Effect.Effect<Uint8Array, ScriptInvalidHereafterError>
```

Added in v2.0.0

## toCborHex

Method toCborHex of ScriptInvalidHereafter

**Signature**

```ts
export declare const toCborHex: (
  instance: CML.ScriptInvalidHereafter
) => Effect.Effect<string, ScriptInvalidHereafterError>
```

Added in v2.0.0

## toJsValue

Method toJsValue of ScriptInvalidHereafter

**Signature**

```ts
export declare const toJsValue: (
  instance: CML.ScriptInvalidHereafter
) => Effect.Effect<any, ScriptInvalidHereafterError>
```

Added in v2.0.0

## toJson

Method toJson of ScriptInvalidHereafter

**Signature**

```ts
export declare const toJson: (
  instance: CML.ScriptInvalidHereafter
) => Effect.Effect<string, ScriptInvalidHereafterError>
```

Added in v2.0.0

# MethodsUnsafe

## afterUnsafe

Unsafely calls instance.after without Effect wrapper

**Signature**

```ts
export declare const afterUnsafe: (instance: CML.ScriptInvalidHereafter) => bigint
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.ScriptInvalidHereafter) => void
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (instance: CML.ScriptInvalidHereafter) => Uint8Array
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (instance: CML.ScriptInvalidHereafter) => string
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (instance: CML.ScriptInvalidHereafter) => Uint8Array
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.ScriptInvalidHereafter) => string
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.ScriptInvalidHereafter) => any
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.ScriptInvalidHereafter) => string
```

Added in v2.0.0

# Types

## ScriptInvalidHereafter (type alias)

Type alias for the CML ScriptInvalidHereafter class

**Signature**

```ts
export type ScriptInvalidHereafter = CML.ScriptInvalidHereafter
```

Added in v2.0.0
