---
title: CML/PlutusV2Script.ts
nav_order: 160
parent: Modules
---

## PlutusV2Script overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [fromCborBytes](#fromcborbytes)
  - [fromCborHex](#fromcborhex)
  - [fromHex](#fromhex)
  - [fromJson](#fromjson)
  - [fromRawBytes](#fromrawbytes)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [fromCborBytesUnsafe](#fromcborbytesunsafe)
  - [fromCborHexUnsafe](#fromcborhexunsafe)
  - [fromHexUnsafe](#fromhexunsafe)
  - [fromJsonUnsafe](#fromjsonunsafe)
  - [fromRawBytesUnsafe](#fromrawbytesunsafe)
- [Errors](#errors)
  - [PlutusV2ScriptError (class)](#plutusv2scripterror-class)
- [Methods](#methods)
  - [free](#free)
  - [hash](#hash)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toHex](#tohex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
  - [toRawBytes](#torawbytes)
- [MethodsUnsafe](#methodsunsafe)
  - [freeUnsafe](#freeunsafe)
  - [hashUnsafe](#hashunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toHexUnsafe](#tohexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
  - [toRawBytesUnsafe](#torawbytesunsafe)
- [Types](#types)
  - [PlutusV2Script (type alias)](#plutusv2script-type-alias)

---

# Constructors

## fromCborBytes

Static method fromCborBytes of PlutusV2Script

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.PlutusV2Script, PlutusV2ScriptError>;
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of PlutusV2Script

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.PlutusV2Script, PlutusV2ScriptError>;
```

Added in v2.0.0

## fromHex

Static method fromHex of PlutusV2Script

**Signature**

```ts
export declare const fromHex: (
  input: string,
) => Effect.Effect<CML.PlutusV2Script, PlutusV2ScriptError>;
```

Added in v2.0.0

## fromJson

Static method fromJson of PlutusV2Script

**Signature**

```ts
export declare const fromJson: (
  json: string,
) => Effect.Effect<CML.PlutusV2Script, PlutusV2ScriptError>;
```

Added in v2.0.0

## fromRawBytes

Static method fromRawBytes of PlutusV2Script

**Signature**

```ts
export declare const fromRawBytes: (
  bytes: Uint8Array,
) => Effect.Effect<CML.PlutusV2Script, PlutusV2ScriptError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## fromCborBytesUnsafe

Unsafely calls PlutusV2Script.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (
  cborBytes: Uint8Array,
) => CML.PlutusV2Script;
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls PlutusV2Script.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (
  cborBytes: string,
) => CML.PlutusV2Script;
```

Added in v2.0.0

## fromHexUnsafe

Unsafely calls PlutusV2Script.fromHex without Effect wrapper

**Signature**

```ts
export declare const fromHexUnsafe: (input: string) => CML.PlutusV2Script;
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls PlutusV2Script.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.PlutusV2Script;
```

Added in v2.0.0

## fromRawBytesUnsafe

Unsafely calls PlutusV2Script.fromRawBytes without Effect wrapper

**Signature**

```ts
export declare const fromRawBytesUnsafe: (
  bytes: Uint8Array,
) => CML.PlutusV2Script;
```

Added in v2.0.0

# Errors

## PlutusV2ScriptError (class)

Error class for PlutusV2Script operations

This error is thrown when operations on PlutusV2Script instances fail.

**Signature**

```ts
export declare class PlutusV2ScriptError
```

Added in v2.0.0

# Methods

## free

Method free of PlutusV2Script

**Signature**

```ts
export declare const free: (
  instance: CML.PlutusV2Script,
) => Effect.Effect<void, PlutusV2ScriptError>;
```

Added in v2.0.0

## hash

Method hash of PlutusV2Script

**Signature**

```ts
export declare const hash: (
  instance: CML.PlutusV2Script,
) => Effect.Effect<CML.ScriptHash, PlutusV2ScriptError>;
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of PlutusV2Script

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.PlutusV2Script,
) => Effect.Effect<Uint8Array, PlutusV2ScriptError>;
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of PlutusV2Script

**Signature**

```ts
export declare const toCanonicalCborHex: (
  instance: CML.PlutusV2Script,
) => Effect.Effect<string, PlutusV2ScriptError>;
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of PlutusV2Script

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.PlutusV2Script,
) => Effect.Effect<Uint8Array, PlutusV2ScriptError>;
```

Added in v2.0.0

## toCborHex

Method toCborHex of PlutusV2Script

**Signature**

```ts
export declare const toCborHex: (
  instance: CML.PlutusV2Script,
) => Effect.Effect<string, PlutusV2ScriptError>;
```

Added in v2.0.0

## toHex

Method toHex of PlutusV2Script

**Signature**

```ts
export declare const toHex: (
  instance: CML.PlutusV2Script,
) => Effect.Effect<string, PlutusV2ScriptError>;
```

Added in v2.0.0

## toJsValue

Method toJsValue of PlutusV2Script

**Signature**

```ts
export declare const toJsValue: (
  instance: CML.PlutusV2Script,
) => Effect.Effect<any, PlutusV2ScriptError>;
```

Added in v2.0.0

## toJson

Method toJson of PlutusV2Script

**Signature**

```ts
export declare const toJson: (
  instance: CML.PlutusV2Script,
) => Effect.Effect<string, PlutusV2ScriptError>;
```

Added in v2.0.0

## toRawBytes

Method toRawBytes of PlutusV2Script

**Signature**

```ts
export declare const toRawBytes: (
  instance: CML.PlutusV2Script,
) => Effect.Effect<Uint8Array, PlutusV2ScriptError>;
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.PlutusV2Script) => void;
```

Added in v2.0.0

## hashUnsafe

Unsafely calls instance.hash without Effect wrapper

**Signature**

```ts
export declare const hashUnsafe: (
  instance: CML.PlutusV2Script,
) => CML.ScriptHash;
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (
  instance: CML.PlutusV2Script,
) => Uint8Array;
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (
  instance: CML.PlutusV2Script,
) => string;
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (
  instance: CML.PlutusV2Script,
) => Uint8Array;
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.PlutusV2Script) => string;
```

Added in v2.0.0

## toHexUnsafe

Unsafely calls instance.toHex without Effect wrapper

**Signature**

```ts
export declare const toHexUnsafe: (instance: CML.PlutusV2Script) => string;
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.PlutusV2Script) => any;
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.PlutusV2Script) => string;
```

Added in v2.0.0

## toRawBytesUnsafe

Unsafely calls instance.toRawBytes without Effect wrapper

**Signature**

```ts
export declare const toRawBytesUnsafe: (
  instance: CML.PlutusV2Script,
) => Uint8Array;
```

Added in v2.0.0

# Types

## PlutusV2Script (type alias)

Type alias for the CML PlutusV2Script class

**Signature**

```ts
export type PlutusV2Script = CML.PlutusV2Script;
```

Added in v2.0.0
