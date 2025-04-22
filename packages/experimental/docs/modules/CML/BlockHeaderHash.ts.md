---
title: CML/BlockHeaderHash.ts
nav_order: 25
parent: Modules
---

## BlockHeaderHash overview

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
  - [BlockHeaderHashError (class)](#blockheaderhasherror-class)
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
  - [BlockHeaderHash (type alias)](#blockheaderhash-type-alias)

---

# Constructors

## fromBech32

Static method fromBech32 of BlockHeaderHash

**Signature**

```ts
export declare const fromBech32: (
  bech32Str: string,
) => Effect.Effect<CML.BlockHeaderHash, BlockHeaderHashError>;
```

Added in v2.0.0

## fromHex

Static method fromHex of BlockHeaderHash

**Signature**

```ts
export declare const fromHex: (
  input: string,
) => Effect.Effect<CML.BlockHeaderHash, BlockHeaderHashError>;
```

Added in v2.0.0

## fromRawBytes

Static method fromRawBytes of BlockHeaderHash

**Signature**

```ts
export declare const fromRawBytes: (
  bytes: Uint8Array,
) => Effect.Effect<CML.BlockHeaderHash, BlockHeaderHashError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## fromBech32Unsafe

Unsafely calls BlockHeaderHash.fromBech32 without Effect wrapper

**Signature**

```ts
export declare const fromBech32Unsafe: (
  bech32Str: string,
) => CML.BlockHeaderHash;
```

Added in v2.0.0

## fromHexUnsafe

Unsafely calls BlockHeaderHash.fromHex without Effect wrapper

**Signature**

```ts
export declare const fromHexUnsafe: (input: string) => CML.BlockHeaderHash;
```

Added in v2.0.0

## fromRawBytesUnsafe

Unsafely calls BlockHeaderHash.fromRawBytes without Effect wrapper

**Signature**

```ts
export declare const fromRawBytesUnsafe: (
  bytes: Uint8Array,
) => CML.BlockHeaderHash;
```

Added in v2.0.0

# Errors

## BlockHeaderHashError (class)

Error class for BlockHeaderHash operations

This error is thrown when operations on BlockHeaderHash instances fail.

**Signature**

```ts
export declare class BlockHeaderHashError
```

Added in v2.0.0

# Methods

## free

Method free of BlockHeaderHash

**Signature**

```ts
export declare const free: (
  instance: CML.BlockHeaderHash,
) => Effect.Effect<void, BlockHeaderHashError>;
```

Added in v2.0.0

## toBech32

Method toBech32 of BlockHeaderHash

**Signature**

```ts
export declare const toBech32: (
  instance: CML.BlockHeaderHash,
  prefix: string,
) => Effect.Effect<string, BlockHeaderHashError>;
```

Added in v2.0.0

## toHex

Method toHex of BlockHeaderHash

**Signature**

```ts
export declare const toHex: (
  instance: CML.BlockHeaderHash,
) => Effect.Effect<string, BlockHeaderHashError>;
```

Added in v2.0.0

## toRawBytes

Method toRawBytes of BlockHeaderHash

**Signature**

```ts
export declare const toRawBytes: (
  instance: CML.BlockHeaderHash,
) => Effect.Effect<Uint8Array, BlockHeaderHashError>;
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.BlockHeaderHash) => void;
```

Added in v2.0.0

## toBech32Unsafe

Unsafely calls instance.toBech32 without Effect wrapper

**Signature**

```ts
export declare const toBech32Unsafe: (
  instance: CML.BlockHeaderHash,
  prefix: string,
) => string;
```

Added in v2.0.0

## toHexUnsafe

Unsafely calls instance.toHex without Effect wrapper

**Signature**

```ts
export declare const toHexUnsafe: (instance: CML.BlockHeaderHash) => string;
```

Added in v2.0.0

## toRawBytesUnsafe

Unsafely calls instance.toRawBytes without Effect wrapper

**Signature**

```ts
export declare const toRawBytesUnsafe: (
  instance: CML.BlockHeaderHash,
) => Uint8Array;
```

Added in v2.0.0

# Types

## BlockHeaderHash (type alias)

Type alias for the CML BlockHeaderHash class

**Signature**

```ts
export type BlockHeaderHash = CML.BlockHeaderHash;
```

Added in v2.0.0
