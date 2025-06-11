---
title: CML/Int.ts
nav_order: 111
parent: Modules
---

## Int overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
  - [fromCborBytes](#fromcborbytes)
  - [fromJson](#fromjson)
  - [fromStr](#fromstr)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
  - [fromCborBytesUnsafe](#fromcborbytesunsafe)
  - [fromJsonUnsafe](#fromjsonunsafe)
  - [fromStrUnsafe](#fromstrunsafe)
- [Errors](#errors)
  - [IntError (class)](#interror-class)
- [Methods](#methods)
  - [free](#free)
  - [toCborBytes](#tocborbytes)
  - [toJson](#tojson)
  - [toJsonValue](#tojsonvalue)
  - [toStr](#tostr)
- [MethodsUnsafe](#methodsunsafe)
  - [freeUnsafe](#freeunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
  - [toJsonValueUnsafe](#tojsonvalueunsafe)
  - [toStrUnsafe](#tostrunsafe)
- [Types](#types)
  - [Int (type alias)](#int-type-alias)

---

# Constructors

## \_new

Static method \_new of Int

**Signature**

```ts
export declare const _new: (x: bigint) => Effect.Effect<CML.Int, IntError>
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of Int

**Signature**

```ts
export declare const fromCborBytes: (cborBytes: Uint8Array) => Effect.Effect<CML.Int, IntError>
```

Added in v2.0.0

## fromJson

Static method fromJson of Int

**Signature**

```ts
export declare const fromJson: (json: string) => Effect.Effect<CML.Int, IntError>
```

Added in v2.0.0

## fromStr

Static method fromStr of Int

**Signature**

```ts
export declare const fromStr: (string: string) => Effect.Effect<CML.Int, IntError>
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls Int.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (x: bigint) => CML.Int
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls Int.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (cborBytes: Uint8Array) => CML.Int
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls Int.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.Int
```

Added in v2.0.0

## fromStrUnsafe

Unsafely calls Int.fromStr without Effect wrapper

**Signature**

```ts
export declare const fromStrUnsafe: (string: string) => CML.Int
```

Added in v2.0.0

# Errors

## IntError (class)

Error class for Int operations

This error is thrown when operations on Int instances fail.

**Signature**

```ts
export declare class IntError
```

Added in v2.0.0

# Methods

## free

Method free of Int

**Signature**

```ts
export declare const free: (instance: CML.Int) => Effect.Effect<void, IntError>
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of Int

**Signature**

```ts
export declare const toCborBytes: (instance: CML.Int) => Effect.Effect<Uint8Array, IntError>
```

Added in v2.0.0

## toJson

Method toJson of Int

**Signature**

```ts
export declare const toJson: (instance: CML.Int) => Effect.Effect<string, IntError>
```

Added in v2.0.0

## toJsonValue

Method toJsonValue of Int

**Signature**

```ts
export declare const toJsonValue: (instance: CML.Int) => Effect.Effect<any, IntError>
```

Added in v2.0.0

## toStr

Method toStr of Int

**Signature**

```ts
export declare const toStr: (instance: CML.Int) => Effect.Effect<string, IntError>
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.Int) => void
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (instance: CML.Int) => Uint8Array
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.Int) => string
```

Added in v2.0.0

## toJsonValueUnsafe

Unsafely calls instance.toJsonValue without Effect wrapper

**Signature**

```ts
export declare const toJsonValueUnsafe: (instance: CML.Int) => any
```

Added in v2.0.0

## toStrUnsafe

Unsafely calls instance.toStr without Effect wrapper

**Signature**

```ts
export declare const toStrUnsafe: (instance: CML.Int) => string
```

Added in v2.0.0

# Types

## Int (type alias)

Type alias for the CML Int class

**Signature**

```ts
export type Int = CML.Int
```

Added in v2.0.0
