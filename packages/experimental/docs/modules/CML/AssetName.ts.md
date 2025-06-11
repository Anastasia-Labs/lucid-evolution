---
title: CML/AssetName.ts
nav_order: 14
parent: Modules
---

## AssetName overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [fromCborBytes](#fromcborbytes)
  - [fromCborHex](#fromcborhex)
  - [fromHex](#fromhex)
  - [fromJson](#fromjson)
  - [fromRawBytes](#fromrawbytes)
  - [fromStr](#fromstr)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [fromCborBytesUnsafe](#fromcborbytesunsafe)
  - [fromCborHexUnsafe](#fromcborhexunsafe)
  - [fromHexUnsafe](#fromhexunsafe)
  - [fromJsonUnsafe](#fromjsonunsafe)
  - [fromRawBytesUnsafe](#fromrawbytesunsafe)
  - [fromStrUnsafe](#fromstrunsafe)
- [Errors](#errors)
  - [AssetNameError (class)](#assetnameerror-class)
- [Methods](#methods)
  - [free](#free)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toHex](#tohex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
  - [toRawBytes](#torawbytes)
  - [toStr](#tostr)
- [MethodsUnsafe](#methodsunsafe)
  - [freeUnsafe](#freeunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toHexUnsafe](#tohexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
  - [toRawBytesUnsafe](#torawbytesunsafe)
  - [toStrUnsafe](#tostrunsafe)
- [Types](#types)
  - [AssetName (type alias)](#assetname-type-alias)

---

# Constructors

## fromCborBytes

Static method fromCborBytes of AssetName

**Signature**

```ts
export declare const fromCborBytes: (cborBytes: Uint8Array) => Effect.Effect<CML.AssetName, AssetNameError>
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of AssetName

**Signature**

```ts
export declare const fromCborHex: (cborBytes: string) => Effect.Effect<CML.AssetName, AssetNameError>
```

Added in v2.0.0

## fromHex

Static method fromHex of AssetName

**Signature**

```ts
export declare const fromHex: (input: string) => Effect.Effect<CML.AssetName, AssetNameError>
```

Added in v2.0.0

## fromJson

Static method fromJson of AssetName

**Signature**

```ts
export declare const fromJson: (json: string) => Effect.Effect<CML.AssetName, AssetNameError>
```

Added in v2.0.0

## fromRawBytes

Static method fromRawBytes of AssetName

**Signature**

```ts
export declare const fromRawBytes: (bytes: Uint8Array) => Effect.Effect<CML.AssetName, AssetNameError>
```

Added in v2.0.0

## fromStr

Static method fromStr of AssetName

**Signature**

```ts
export declare const fromStr: (utf8Str: string) => Effect.Effect<CML.AssetName, AssetNameError>
```

Added in v2.0.0

# ConstructorsUnsafe

## fromCborBytesUnsafe

Unsafely calls AssetName.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (cborBytes: Uint8Array) => CML.AssetName
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls AssetName.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.AssetName
```

Added in v2.0.0

## fromHexUnsafe

Unsafely calls AssetName.fromHex without Effect wrapper

**Signature**

```ts
export declare const fromHexUnsafe: (input: string) => CML.AssetName
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls AssetName.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.AssetName
```

Added in v2.0.0

## fromRawBytesUnsafe

Unsafely calls AssetName.fromRawBytes without Effect wrapper

**Signature**

```ts
export declare const fromRawBytesUnsafe: (bytes: Uint8Array) => CML.AssetName
```

Added in v2.0.0

## fromStrUnsafe

Unsafely calls AssetName.fromStr without Effect wrapper

**Signature**

```ts
export declare const fromStrUnsafe: (utf8Str: string) => CML.AssetName
```

Added in v2.0.0

# Errors

## AssetNameError (class)

Error class for AssetName operations

This error is thrown when operations on AssetName instances fail.

**Signature**

```ts
export declare class AssetNameError
```

Added in v2.0.0

# Methods

## free

Method free of AssetName

**Signature**

```ts
export declare const free: (instance: CML.AssetName) => Effect.Effect<void, AssetNameError>
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of AssetName

**Signature**

```ts
export declare const toCanonicalCborBytes: (instance: CML.AssetName) => Effect.Effect<Uint8Array, AssetNameError>
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of AssetName

**Signature**

```ts
export declare const toCanonicalCborHex: (instance: CML.AssetName) => Effect.Effect<string, AssetNameError>
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of AssetName

**Signature**

```ts
export declare const toCborBytes: (instance: CML.AssetName) => Effect.Effect<Uint8Array, AssetNameError>
```

Added in v2.0.0

## toCborHex

Method toCborHex of AssetName

**Signature**

```ts
export declare const toCborHex: (instance: CML.AssetName) => Effect.Effect<string, AssetNameError>
```

Added in v2.0.0

## toHex

Method toHex of AssetName

**Signature**

```ts
export declare const toHex: (instance: CML.AssetName) => Effect.Effect<string, AssetNameError>
```

Added in v2.0.0

## toJsValue

Method toJsValue of AssetName

**Signature**

```ts
export declare const toJsValue: (instance: CML.AssetName) => Effect.Effect<any, AssetNameError>
```

Added in v2.0.0

## toJson

Method toJson of AssetName

**Signature**

```ts
export declare const toJson: (instance: CML.AssetName) => Effect.Effect<string, AssetNameError>
```

Added in v2.0.0

## toRawBytes

Method toRawBytes of AssetName

**Signature**

```ts
export declare const toRawBytes: (instance: CML.AssetName) => Effect.Effect<Uint8Array, AssetNameError>
```

Added in v2.0.0

## toStr

Method toStr of AssetName

**Signature**

```ts
export declare const toStr: (instance: CML.AssetName) => Effect.Effect<string, AssetNameError>
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.AssetName) => void
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (instance: CML.AssetName) => Uint8Array
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (instance: CML.AssetName) => string
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (instance: CML.AssetName) => Uint8Array
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.AssetName) => string
```

Added in v2.0.0

## toHexUnsafe

Unsafely calls instance.toHex without Effect wrapper

**Signature**

```ts
export declare const toHexUnsafe: (instance: CML.AssetName) => string
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.AssetName) => any
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.AssetName) => string
```

Added in v2.0.0

## toRawBytesUnsafe

Unsafely calls instance.toRawBytes without Effect wrapper

**Signature**

```ts
export declare const toRawBytesUnsafe: (instance: CML.AssetName) => Uint8Array
```

Added in v2.0.0

## toStrUnsafe

Unsafely calls instance.toStr without Effect wrapper

**Signature**

```ts
export declare const toStrUnsafe: (instance: CML.AssetName) => string
```

Added in v2.0.0

# Types

## AssetName (type alias)

Type alias for the CML AssetName class

**Signature**

```ts
export type AssetName = CML.AssetName
```

Added in v2.0.0
