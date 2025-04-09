---
title: CML/ScriptHash.ts
nav_order: 197
parent: Modules
---

## ScriptHash overview

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
  - [ScriptHashError (class)](#scripthasherror-class)
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
  - [ScriptHash (type alias)](#scripthash-type-alias)

---

# Constructors

## fromBech32

Static method fromBech32 of ScriptHash

**Signature**

```ts
export declare const fromBech32: (
  bech32Str: string,
) => Effect.Effect<CML.ScriptHash, ScriptHashError>;
```

Added in v2.0.0

## fromHex

Static method fromHex of ScriptHash

**Signature**

```ts
export declare const fromHex: (
  input: string,
) => Effect.Effect<CML.ScriptHash, ScriptHashError>;
```

Added in v2.0.0

## fromRawBytes

Static method fromRawBytes of ScriptHash

**Signature**

```ts
export declare const fromRawBytes: (
  bytes: Uint8Array,
) => Effect.Effect<CML.ScriptHash, ScriptHashError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## fromBech32Unsafe

Unsafely calls ScriptHash.fromBech32 without Effect wrapper

**Signature**

```ts
export declare const fromBech32Unsafe: (bech32Str: string) => CML.ScriptHash;
```

Added in v2.0.0

## fromHexUnsafe

Unsafely calls ScriptHash.fromHex without Effect wrapper

**Signature**

```ts
export declare const fromHexUnsafe: (input: string) => CML.ScriptHash;
```

Added in v2.0.0

## fromRawBytesUnsafe

Unsafely calls ScriptHash.fromRawBytes without Effect wrapper

**Signature**

```ts
export declare const fromRawBytesUnsafe: (bytes: Uint8Array) => CML.ScriptHash;
```

Added in v2.0.0

# Errors

## ScriptHashError (class)

Error class for ScriptHash operations

This error is thrown when operations on ScriptHash instances fail.

**Signature**

```ts
export declare class ScriptHashError
```

Added in v2.0.0

# Methods

## free

Method free of ScriptHash

**Signature**

```ts
export declare const free: (
  instance: CML.ScriptHash,
) => Effect.Effect<void, ScriptHashError>;
```

Added in v2.0.0

## toBech32

Method toBech32 of ScriptHash

**Signature**

```ts
export declare const toBech32: (
  instance: CML.ScriptHash,
  prefix: string,
) => Effect.Effect<string, ScriptHashError>;
```

Added in v2.0.0

## toHex

Method toHex of ScriptHash

**Signature**

```ts
export declare const toHex: (
  instance: CML.ScriptHash,
) => Effect.Effect<string, ScriptHashError>;
```

Added in v2.0.0

## toRawBytes

Method toRawBytes of ScriptHash

**Signature**

```ts
export declare const toRawBytes: (
  instance: CML.ScriptHash,
) => Effect.Effect<Uint8Array, ScriptHashError>;
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.ScriptHash) => void;
```

Added in v2.0.0

## toBech32Unsafe

Unsafely calls instance.toBech32 without Effect wrapper

**Signature**

```ts
export declare const toBech32Unsafe: (
  instance: CML.ScriptHash,
  prefix: string,
) => string;
```

Added in v2.0.0

## toHexUnsafe

Unsafely calls instance.toHex without Effect wrapper

**Signature**

```ts
export declare const toHexUnsafe: (instance: CML.ScriptHash) => string;
```

Added in v2.0.0

## toRawBytesUnsafe

Unsafely calls instance.toRawBytes without Effect wrapper

**Signature**

```ts
export declare const toRawBytesUnsafe: (instance: CML.ScriptHash) => Uint8Array;
```

Added in v2.0.0

# Types

## ScriptHash (type alias)

Type alias for the CML ScriptHash class

**Signature**

```ts
export type ScriptHash = CML.ScriptHash;
```

Added in v2.0.0
