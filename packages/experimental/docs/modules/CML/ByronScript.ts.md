---
title: CML/ByronScript.ts
nav_order: 29
parent: Modules
---

## ByronScript overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [fromBech32](#frombech32)
  - [fromHex](#fromhex)
  - [fromRawBytes](#fromrawbytes)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [fromBech32Unsafe](#frombech32unsafe)
  - [fromHexUnsafe](#fromhexunsafe)
  - [fromRawBytesUnsafe](#fromrawbytesunsafe)
- [Errors](#errors)
  - [ByronScriptError (class)](#byronscripterror-class)
- [Methods](#methods)
  - [free](#free)
  - [toBech32](#tobech32)
  - [toHex](#tohex)
  - [toRawBytes](#torawbytes)
- [MethodsUnsafe](#methodsunsafe)
  - [freeUnsafe](#freeunsafe)
  - [toBech32Unsafe](#tobech32unsafe)
  - [toHexUnsafe](#tohexunsafe)
  - [toRawBytesUnsafe](#torawbytesunsafe)
- [Types](#types)
  - [ByronScript (type alias)](#byronscript-type-alias)

---

# Constructors

## fromBech32

Static method fromBech32 of ByronScript

**Signature**

```ts
export declare const fromBech32: (
  bech32Str: string,
) => Effect.Effect<CML.ByronScript, ByronScriptError>;
```

Added in v2.0.0

## fromHex

Static method fromHex of ByronScript

**Signature**

```ts
export declare const fromHex: (
  input: string,
) => Effect.Effect<CML.ByronScript, ByronScriptError>;
```

Added in v2.0.0

## fromRawBytes

Static method fromRawBytes of ByronScript

**Signature**

```ts
export declare const fromRawBytes: (
  bytes: Uint8Array,
) => Effect.Effect<CML.ByronScript, ByronScriptError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## fromBech32Unsafe

Unsafely calls ByronScript.fromBech32 without Effect wrapper

**Signature**

```ts
export declare const fromBech32Unsafe: (bech32Str: string) => CML.ByronScript;
```

Added in v2.0.0

## fromHexUnsafe

Unsafely calls ByronScript.fromHex without Effect wrapper

**Signature**

```ts
export declare const fromHexUnsafe: (input: string) => CML.ByronScript;
```

Added in v2.0.0

## fromRawBytesUnsafe

Unsafely calls ByronScript.fromRawBytes without Effect wrapper

**Signature**

```ts
export declare const fromRawBytesUnsafe: (bytes: Uint8Array) => CML.ByronScript;
```

Added in v2.0.0

# Errors

## ByronScriptError (class)

Error class for ByronScript operations

This error is thrown when operations on ByronScript instances fail.

**Signature**

```ts
export declare class ByronScriptError
```

Added in v2.0.0

# Methods

## free

Method free of ByronScript

**Signature**

```ts
export declare const free: (
  instance: CML.ByronScript,
) => Effect.Effect<void, ByronScriptError>;
```

Added in v2.0.0

## toBech32

Method toBech32 of ByronScript

**Signature**

```ts
export declare const toBech32: (
  instance: CML.ByronScript,
  prefix: string,
) => Effect.Effect<string, ByronScriptError>;
```

Added in v2.0.0

## toHex

Method toHex of ByronScript

**Signature**

```ts
export declare const toHex: (
  instance: CML.ByronScript,
) => Effect.Effect<string, ByronScriptError>;
```

Added in v2.0.0

## toRawBytes

Method toRawBytes of ByronScript

**Signature**

```ts
export declare const toRawBytes: (
  instance: CML.ByronScript,
) => Effect.Effect<Uint8Array, ByronScriptError>;
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.ByronScript) => void;
```

Added in v2.0.0

## toBech32Unsafe

Unsafely calls instance.toBech32 without Effect wrapper

**Signature**

```ts
export declare const toBech32Unsafe: (
  instance: CML.ByronScript,
  prefix: string,
) => string;
```

Added in v2.0.0

## toHexUnsafe

Unsafely calls instance.toHex without Effect wrapper

**Signature**

```ts
export declare const toHexUnsafe: (instance: CML.ByronScript) => string;
```

Added in v2.0.0

## toRawBytesUnsafe

Unsafely calls instance.toRawBytes without Effect wrapper

**Signature**

```ts
export declare const toRawBytesUnsafe: (
  instance: CML.ByronScript,
) => Uint8Array;
```

Added in v2.0.0

# Types

## ByronScript (type alias)

Type alias for the CML ByronScript class

**Signature**

```ts
export type ByronScript = CML.ByronScript;
```

Added in v2.0.0
