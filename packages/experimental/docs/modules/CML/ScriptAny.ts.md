---
title: CML/ScriptAny.ts
nav_order: 200
parent: Modules
---

## ScriptAny overview

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
  - [ScriptAnyError (class)](#scriptanyerror-class)
- [Methods](#methods)
  - [free](#free)
  - [nativeScripts](#nativescripts)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
- [MethodsUnsafe](#methodsunsafe)
  - [freeUnsafe](#freeunsafe)
  - [nativeScriptsUnsafe](#nativescriptsunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
- [Types](#types)
  - [ScriptAny (type alias)](#scriptany-type-alias)

---

# Constructors

## \_new

Static method \_new of ScriptAny

**Signature**

```ts
export declare const _new: (nativeScripts: CML.NativeScriptList) => Effect.Effect<CML.ScriptAny, ScriptAnyError>
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of ScriptAny

**Signature**

```ts
export declare const fromCborBytes: (cborBytes: Uint8Array) => Effect.Effect<CML.ScriptAny, ScriptAnyError>
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of ScriptAny

**Signature**

```ts
export declare const fromCborHex: (cborBytes: string) => Effect.Effect<CML.ScriptAny, ScriptAnyError>
```

Added in v2.0.0

## fromJson

Static method fromJson of ScriptAny

**Signature**

```ts
export declare const fromJson: (json: string) => Effect.Effect<CML.ScriptAny, ScriptAnyError>
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls ScriptAny.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (nativeScripts: CML.NativeScriptList) => CML.ScriptAny
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls ScriptAny.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (cborBytes: Uint8Array) => CML.ScriptAny
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls ScriptAny.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.ScriptAny
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls ScriptAny.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.ScriptAny
```

Added in v2.0.0

# Errors

## ScriptAnyError (class)

Error class for ScriptAny operations

This error is thrown when operations on ScriptAny instances fail.

**Signature**

```ts
export declare class ScriptAnyError
```

Added in v2.0.0

# Methods

## free

Method free of ScriptAny

**Signature**

```ts
export declare const free: (instance: CML.ScriptAny) => Effect.Effect<void, ScriptAnyError>
```

Added in v2.0.0

## nativeScripts

Method nativeScripts of ScriptAny

**Signature**

```ts
export declare const nativeScripts: (instance: CML.ScriptAny) => Effect.Effect<CML.NativeScriptList, ScriptAnyError>
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of ScriptAny

**Signature**

```ts
export declare const toCanonicalCborBytes: (instance: CML.ScriptAny) => Effect.Effect<Uint8Array, ScriptAnyError>
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of ScriptAny

**Signature**

```ts
export declare const toCanonicalCborHex: (instance: CML.ScriptAny) => Effect.Effect<string, ScriptAnyError>
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of ScriptAny

**Signature**

```ts
export declare const toCborBytes: (instance: CML.ScriptAny) => Effect.Effect<Uint8Array, ScriptAnyError>
```

Added in v2.0.0

## toCborHex

Method toCborHex of ScriptAny

**Signature**

```ts
export declare const toCborHex: (instance: CML.ScriptAny) => Effect.Effect<string, ScriptAnyError>
```

Added in v2.0.0

## toJsValue

Method toJsValue of ScriptAny

**Signature**

```ts
export declare const toJsValue: (instance: CML.ScriptAny) => Effect.Effect<any, ScriptAnyError>
```

Added in v2.0.0

## toJson

Method toJson of ScriptAny

**Signature**

```ts
export declare const toJson: (instance: CML.ScriptAny) => Effect.Effect<string, ScriptAnyError>
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.ScriptAny) => void
```

Added in v2.0.0

## nativeScriptsUnsafe

Unsafely calls instance.nativeScripts without Effect wrapper

**Signature**

```ts
export declare const nativeScriptsUnsafe: (instance: CML.ScriptAny) => CML.NativeScriptList
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (instance: CML.ScriptAny) => Uint8Array
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (instance: CML.ScriptAny) => string
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (instance: CML.ScriptAny) => Uint8Array
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.ScriptAny) => string
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.ScriptAny) => any
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.ScriptAny) => string
```

Added in v2.0.0

# Types

## ScriptAny (type alias)

Type alias for the CML ScriptAny class

**Signature**

```ts
export type ScriptAny = CML.ScriptAny
```

Added in v2.0.0
