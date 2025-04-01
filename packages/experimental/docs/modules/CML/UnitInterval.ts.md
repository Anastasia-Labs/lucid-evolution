---
title: CML/UnitInterval.ts
nav_order: 242
parent: Modules
---

## UnitInterval overview

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
  - [UnitIntervalError (class)](#unitintervalerror-class)
- [Methods](#methods)
  - [end](#end)
  - [free](#free)
  - [start](#start)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
- [MethodsUnsafe](#methodsunsafe)
  - [endUnsafe](#endunsafe)
  - [freeUnsafe](#freeunsafe)
  - [startUnsafe](#startunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
- [Types](#types)
  - [UnitInterval (type alias)](#unitinterval-type-alias)

---

# Constructors

## \_new

Static method \_new of UnitInterval

**Signature**

```ts
export declare const _new: (start: bigint, end: bigint) => Effect.Effect<CML.UnitInterval, UnitIntervalError>
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of UnitInterval

**Signature**

```ts
export declare const fromCborBytes: (cborBytes: Uint8Array) => Effect.Effect<CML.UnitInterval, UnitIntervalError>
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of UnitInterval

**Signature**

```ts
export declare const fromCborHex: (cborBytes: string) => Effect.Effect<CML.UnitInterval, UnitIntervalError>
```

Added in v2.0.0

## fromJson

Static method fromJson of UnitInterval

**Signature**

```ts
export declare const fromJson: (json: string) => Effect.Effect<CML.UnitInterval, UnitIntervalError>
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls UnitInterval.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (start: bigint, end: bigint) => CML.UnitInterval
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls UnitInterval.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (cborBytes: Uint8Array) => CML.UnitInterval
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls UnitInterval.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.UnitInterval
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls UnitInterval.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.UnitInterval
```

Added in v2.0.0

# Errors

## UnitIntervalError (class)

Error class for UnitInterval operations

This error is thrown when operations on UnitInterval instances fail.

**Signature**

```ts
export declare class UnitIntervalError
```

Added in v2.0.0

# Methods

## end

Method end of UnitInterval

**Signature**

```ts
export declare const end: (instance: CML.UnitInterval) => Effect.Effect<bigint, UnitIntervalError>
```

Added in v2.0.0

## free

Method free of UnitInterval

**Signature**

```ts
export declare const free: (instance: CML.UnitInterval) => Effect.Effect<void, UnitIntervalError>
```

Added in v2.0.0

## start

Method start of UnitInterval

**Signature**

```ts
export declare const start: (instance: CML.UnitInterval) => Effect.Effect<bigint, UnitIntervalError>
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of UnitInterval

**Signature**

```ts
export declare const toCanonicalCborBytes: (instance: CML.UnitInterval) => Effect.Effect<Uint8Array, UnitIntervalError>
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of UnitInterval

**Signature**

```ts
export declare const toCanonicalCborHex: (instance: CML.UnitInterval) => Effect.Effect<string, UnitIntervalError>
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of UnitInterval

**Signature**

```ts
export declare const toCborBytes: (instance: CML.UnitInterval) => Effect.Effect<Uint8Array, UnitIntervalError>
```

Added in v2.0.0

## toCborHex

Method toCborHex of UnitInterval

**Signature**

```ts
export declare const toCborHex: (instance: CML.UnitInterval) => Effect.Effect<string, UnitIntervalError>
```

Added in v2.0.0

## toJsValue

Method toJsValue of UnitInterval

**Signature**

```ts
export declare const toJsValue: (instance: CML.UnitInterval) => Effect.Effect<any, UnitIntervalError>
```

Added in v2.0.0

## toJson

Method toJson of UnitInterval

**Signature**

```ts
export declare const toJson: (instance: CML.UnitInterval) => Effect.Effect<string, UnitIntervalError>
```

Added in v2.0.0

# MethodsUnsafe

## endUnsafe

Unsafely calls instance.end without Effect wrapper

**Signature**

```ts
export declare const endUnsafe: (instance: CML.UnitInterval) => bigint
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.UnitInterval) => void
```

Added in v2.0.0

## startUnsafe

Unsafely calls instance.start without Effect wrapper

**Signature**

```ts
export declare const startUnsafe: (instance: CML.UnitInterval) => bigint
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (instance: CML.UnitInterval) => Uint8Array
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (instance: CML.UnitInterval) => string
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (instance: CML.UnitInterval) => Uint8Array
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.UnitInterval) => string
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.UnitInterval) => any
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.UnitInterval) => string
```

Added in v2.0.0

# Types

## UnitInterval (type alias)

Type alias for the CML UnitInterval class

**Signature**

```ts
export type UnitInterval = CML.UnitInterval
```

Added in v2.0.0
