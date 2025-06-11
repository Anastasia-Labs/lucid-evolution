---
title: CML/ScriptNOfK.ts
nav_order: 204
parent: Modules
---

## ScriptNOfK overview

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
  - [ScriptNOfKError (class)](#scriptnofkerror-class)
- [Methods](#methods)
  - [free](#free)
  - [n](#n)
  - [nativeScripts](#nativescripts)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
- [MethodsUnsafe](#methodsunsafe)
  - [freeUnsafe](#freeunsafe)
  - [nUnsafe](#nunsafe)
  - [nativeScriptsUnsafe](#nativescriptsunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
- [Types](#types)
  - [ScriptNOfK (type alias)](#scriptnofk-type-alias)

---

# Constructors

## \_new

Static method \_new of ScriptNOfK

**Signature**

```ts
export declare const _new: (
  n: bigint,
  nativeScripts: CML.NativeScriptList
) => Effect.Effect<CML.ScriptNOfK, ScriptNOfKError>
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of ScriptNOfK

**Signature**

```ts
export declare const fromCborBytes: (cborBytes: Uint8Array) => Effect.Effect<CML.ScriptNOfK, ScriptNOfKError>
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of ScriptNOfK

**Signature**

```ts
export declare const fromCborHex: (cborBytes: string) => Effect.Effect<CML.ScriptNOfK, ScriptNOfKError>
```

Added in v2.0.0

## fromJson

Static method fromJson of ScriptNOfK

**Signature**

```ts
export declare const fromJson: (json: string) => Effect.Effect<CML.ScriptNOfK, ScriptNOfKError>
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls ScriptNOfK.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (n: bigint, nativeScripts: CML.NativeScriptList) => CML.ScriptNOfK
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls ScriptNOfK.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (cborBytes: Uint8Array) => CML.ScriptNOfK
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls ScriptNOfK.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.ScriptNOfK
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls ScriptNOfK.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.ScriptNOfK
```

Added in v2.0.0

# Errors

## ScriptNOfKError (class)

Error class for ScriptNOfK operations

This error is thrown when operations on ScriptNOfK instances fail.

**Signature**

```ts
export declare class ScriptNOfKError
```

Added in v2.0.0

# Methods

## free

Method free of ScriptNOfK

**Signature**

```ts
export declare const free: (instance: CML.ScriptNOfK) => Effect.Effect<void, ScriptNOfKError>
```

Added in v2.0.0

## n

Method n of ScriptNOfK

**Signature**

```ts
export declare const n: (instance: CML.ScriptNOfK) => Effect.Effect<bigint, ScriptNOfKError>
```

Added in v2.0.0

## nativeScripts

Method nativeScripts of ScriptNOfK

**Signature**

```ts
export declare const nativeScripts: (instance: CML.ScriptNOfK) => Effect.Effect<CML.NativeScriptList, ScriptNOfKError>
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of ScriptNOfK

**Signature**

```ts
export declare const toCanonicalCborBytes: (instance: CML.ScriptNOfK) => Effect.Effect<Uint8Array, ScriptNOfKError>
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of ScriptNOfK

**Signature**

```ts
export declare const toCanonicalCborHex: (instance: CML.ScriptNOfK) => Effect.Effect<string, ScriptNOfKError>
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of ScriptNOfK

**Signature**

```ts
export declare const toCborBytes: (instance: CML.ScriptNOfK) => Effect.Effect<Uint8Array, ScriptNOfKError>
```

Added in v2.0.0

## toCborHex

Method toCborHex of ScriptNOfK

**Signature**

```ts
export declare const toCborHex: (instance: CML.ScriptNOfK) => Effect.Effect<string, ScriptNOfKError>
```

Added in v2.0.0

## toJsValue

Method toJsValue of ScriptNOfK

**Signature**

```ts
export declare const toJsValue: (instance: CML.ScriptNOfK) => Effect.Effect<any, ScriptNOfKError>
```

Added in v2.0.0

## toJson

Method toJson of ScriptNOfK

**Signature**

```ts
export declare const toJson: (instance: CML.ScriptNOfK) => Effect.Effect<string, ScriptNOfKError>
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.ScriptNOfK) => void
```

Added in v2.0.0

## nUnsafe

Unsafely calls instance.n without Effect wrapper

**Signature**

```ts
export declare const nUnsafe: (instance: CML.ScriptNOfK) => bigint
```

Added in v2.0.0

## nativeScriptsUnsafe

Unsafely calls instance.nativeScripts without Effect wrapper

**Signature**

```ts
export declare const nativeScriptsUnsafe: (instance: CML.ScriptNOfK) => CML.NativeScriptList
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (instance: CML.ScriptNOfK) => Uint8Array
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (instance: CML.ScriptNOfK) => string
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (instance: CML.ScriptNOfK) => Uint8Array
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.ScriptNOfK) => string
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.ScriptNOfK) => any
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.ScriptNOfK) => string
```

Added in v2.0.0

# Types

## ScriptNOfK (type alias)

Type alias for the CML ScriptNOfK class

**Signature**

```ts
export type ScriptNOfK = CML.ScriptNOfK
```

Added in v2.0.0
