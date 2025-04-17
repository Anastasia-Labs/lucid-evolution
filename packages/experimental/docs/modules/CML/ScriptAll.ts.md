---
title: CML/ScriptAll.ts
nav_order: 199
parent: Modules
---

## ScriptAll overview

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
  - [ScriptAllError (class)](#scriptallerror-class)
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
  - [ScriptAll (type alias)](#scriptall-type-alias)

---

# Constructors

## \_new

Static method \_new of ScriptAll

**Signature**

```ts
export declare const _new: (
  nativeScripts: CML.NativeScriptList,
) => Effect.Effect<CML.ScriptAll, ScriptAllError>;
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of ScriptAll

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.ScriptAll, ScriptAllError>;
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of ScriptAll

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.ScriptAll, ScriptAllError>;
```

Added in v2.0.0

## fromJson

Static method fromJson of ScriptAll

**Signature**

```ts
export declare const fromJson: (
  json: string,
) => Effect.Effect<CML.ScriptAll, ScriptAllError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls ScriptAll.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (
  nativeScripts: CML.NativeScriptList,
) => CML.ScriptAll;
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls ScriptAll.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (
  cborBytes: Uint8Array,
) => CML.ScriptAll;
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls ScriptAll.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.ScriptAll;
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls ScriptAll.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.ScriptAll;
```

Added in v2.0.0

# Errors

## ScriptAllError (class)

Error class for ScriptAll operations

This error is thrown when operations on ScriptAll instances fail.

**Signature**

```ts
export declare class ScriptAllError
```

Added in v2.0.0

# Methods

## free

Method free of ScriptAll

**Signature**

```ts
export declare const free: (
  instance: CML.ScriptAll,
) => Effect.Effect<void, ScriptAllError>;
```

Added in v2.0.0

## nativeScripts

Method nativeScripts of ScriptAll

**Signature**

```ts
export declare const nativeScripts: (
  instance: CML.ScriptAll,
) => Effect.Effect<CML.NativeScriptList, ScriptAllError>;
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of ScriptAll

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.ScriptAll,
) => Effect.Effect<Uint8Array, ScriptAllError>;
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of ScriptAll

**Signature**

```ts
export declare const toCanonicalCborHex: (
  instance: CML.ScriptAll,
) => Effect.Effect<string, ScriptAllError>;
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of ScriptAll

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.ScriptAll,
) => Effect.Effect<Uint8Array, ScriptAllError>;
```

Added in v2.0.0

## toCborHex

Method toCborHex of ScriptAll

**Signature**

```ts
export declare const toCborHex: (
  instance: CML.ScriptAll,
) => Effect.Effect<string, ScriptAllError>;
```

Added in v2.0.0

## toJsValue

Method toJsValue of ScriptAll

**Signature**

```ts
export declare const toJsValue: (
  instance: CML.ScriptAll,
) => Effect.Effect<any, ScriptAllError>;
```

Added in v2.0.0

## toJson

Method toJson of ScriptAll

**Signature**

```ts
export declare const toJson: (
  instance: CML.ScriptAll,
) => Effect.Effect<string, ScriptAllError>;
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.ScriptAll) => void;
```

Added in v2.0.0

## nativeScriptsUnsafe

Unsafely calls instance.nativeScripts without Effect wrapper

**Signature**

```ts
export declare const nativeScriptsUnsafe: (
  instance: CML.ScriptAll,
) => CML.NativeScriptList;
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (
  instance: CML.ScriptAll,
) => Uint8Array;
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (
  instance: CML.ScriptAll,
) => string;
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (instance: CML.ScriptAll) => Uint8Array;
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.ScriptAll) => string;
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.ScriptAll) => any;
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.ScriptAll) => string;
```

Added in v2.0.0

# Types

## ScriptAll (type alias)

Type alias for the CML ScriptAll class

**Signature**

```ts
export type ScriptAll = CML.ScriptAll;
```

Added in v2.0.0
