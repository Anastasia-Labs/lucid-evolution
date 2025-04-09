---
title: CML/BlockBodyHash.ts
nav_order: 19
parent: Modules
---

## BlockBodyHash overview

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
  - [BlockBodyHashError (class)](#blockbodyhasherror-class)
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
  - [BlockBodyHash (type alias)](#blockbodyhash-type-alias)

---

# Constructors

## fromBech32

Static method fromBech32 of BlockBodyHash

**Signature**

```ts
export declare const fromBech32: (
  bech32Str: string,
) => Effect.Effect<CML.BlockBodyHash, BlockBodyHashError>;
```

Added in v2.0.0

## fromHex

Static method fromHex of BlockBodyHash

**Signature**

```ts
export declare const fromHex: (
  input: string,
) => Effect.Effect<CML.BlockBodyHash, BlockBodyHashError>;
```

Added in v2.0.0

## fromRawBytes

Static method fromRawBytes of BlockBodyHash

**Signature**

```ts
export declare const fromRawBytes: (
  bytes: Uint8Array,
) => Effect.Effect<CML.BlockBodyHash, BlockBodyHashError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## fromBech32Unsafe

Unsafely calls BlockBodyHash.fromBech32 without Effect wrapper

**Signature**

```ts
export declare const fromBech32Unsafe: (bech32Str: string) => CML.BlockBodyHash;
```

Added in v2.0.0

## fromHexUnsafe

Unsafely calls BlockBodyHash.fromHex without Effect wrapper

**Signature**

```ts
export declare const fromHexUnsafe: (input: string) => CML.BlockBodyHash;
```

Added in v2.0.0

## fromRawBytesUnsafe

Unsafely calls BlockBodyHash.fromRawBytes without Effect wrapper

**Signature**

```ts
export declare const fromRawBytesUnsafe: (
  bytes: Uint8Array,
) => CML.BlockBodyHash;
```

Added in v2.0.0

# Errors

## BlockBodyHashError (class)

Error class for BlockBodyHash operations

This error is thrown when operations on BlockBodyHash instances fail.

**Signature**

```ts
export declare class BlockBodyHashError
```

Added in v2.0.0

# Methods

## free

Method free of BlockBodyHash

**Signature**

```ts
export declare const free: (
  instance: CML.BlockBodyHash,
) => Effect.Effect<void, BlockBodyHashError>;
```

Added in v2.0.0

## toBech32

Method toBech32 of BlockBodyHash

**Signature**

```ts
export declare const toBech32: (
  instance: CML.BlockBodyHash,
  prefix: string,
) => Effect.Effect<string, BlockBodyHashError>;
```

Added in v2.0.0

## toHex

Method toHex of BlockBodyHash

**Signature**

```ts
export declare const toHex: (
  instance: CML.BlockBodyHash,
) => Effect.Effect<string, BlockBodyHashError>;
```

Added in v2.0.0

## toRawBytes

Method toRawBytes of BlockBodyHash

**Signature**

```ts
export declare const toRawBytes: (
  instance: CML.BlockBodyHash,
) => Effect.Effect<Uint8Array, BlockBodyHashError>;
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.BlockBodyHash) => void;
```

Added in v2.0.0

## toBech32Unsafe

Unsafely calls instance.toBech32 without Effect wrapper

**Signature**

```ts
export declare const toBech32Unsafe: (
  instance: CML.BlockBodyHash,
  prefix: string,
) => string;
```

Added in v2.0.0

## toHexUnsafe

Unsafely calls instance.toHex without Effect wrapper

**Signature**

```ts
export declare const toHexUnsafe: (instance: CML.BlockBodyHash) => string;
```

Added in v2.0.0

## toRawBytesUnsafe

Unsafely calls instance.toRawBytes without Effect wrapper

**Signature**

```ts
export declare const toRawBytesUnsafe: (
  instance: CML.BlockBodyHash,
) => Uint8Array;
```

Added in v2.0.0

# Types

## BlockBodyHash (type alias)

Type alias for the CML BlockBodyHash class

**Signature**

```ts
export type BlockBodyHash = CML.BlockBodyHash;
```

Added in v2.0.0
