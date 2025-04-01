---
title: CML/PoolMetadataHash.ts
nav_order: 163
parent: Modules
---

## PoolMetadataHash overview

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
  - [PoolMetadataHashError (class)](#poolmetadatahasherror-class)
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
  - [PoolMetadataHash (type alias)](#poolmetadatahash-type-alias)

---

# Constructors

## fromBech32

Static method fromBech32 of PoolMetadataHash

**Signature**

```ts
export declare const fromBech32: (bech32Str: string) => Effect.Effect<CML.PoolMetadataHash, PoolMetadataHashError>
```

Added in v2.0.0

## fromHex

Static method fromHex of PoolMetadataHash

**Signature**

```ts
export declare const fromHex: (input: string) => Effect.Effect<CML.PoolMetadataHash, PoolMetadataHashError>
```

Added in v2.0.0

## fromRawBytes

Static method fromRawBytes of PoolMetadataHash

**Signature**

```ts
export declare const fromRawBytes: (bytes: Uint8Array) => Effect.Effect<CML.PoolMetadataHash, PoolMetadataHashError>
```

Added in v2.0.0

# ConstructorsUnsafe

## fromBech32Unsafe

Unsafely calls PoolMetadataHash.fromBech32 without Effect wrapper

**Signature**

```ts
export declare const fromBech32Unsafe: (bech32Str: string) => CML.PoolMetadataHash
```

Added in v2.0.0

## fromHexUnsafe

Unsafely calls PoolMetadataHash.fromHex without Effect wrapper

**Signature**

```ts
export declare const fromHexUnsafe: (input: string) => CML.PoolMetadataHash
```

Added in v2.0.0

## fromRawBytesUnsafe

Unsafely calls PoolMetadataHash.fromRawBytes without Effect wrapper

**Signature**

```ts
export declare const fromRawBytesUnsafe: (bytes: Uint8Array) => CML.PoolMetadataHash
```

Added in v2.0.0

# Errors

## PoolMetadataHashError (class)

Error class for PoolMetadataHash operations

This error is thrown when operations on PoolMetadataHash instances fail.

**Signature**

```ts
export declare class PoolMetadataHashError
```

Added in v2.0.0

# Methods

## free

Method free of PoolMetadataHash

**Signature**

```ts
export declare const free: (instance: CML.PoolMetadataHash) => Effect.Effect<void, PoolMetadataHashError>
```

Added in v2.0.0

## toBech32

Method toBech32 of PoolMetadataHash

**Signature**

```ts
export declare const toBech32: (
  instance: CML.PoolMetadataHash,
  prefix: string
) => Effect.Effect<string, PoolMetadataHashError>
```

Added in v2.0.0

## toHex

Method toHex of PoolMetadataHash

**Signature**

```ts
export declare const toHex: (instance: CML.PoolMetadataHash) => Effect.Effect<string, PoolMetadataHashError>
```

Added in v2.0.0

## toRawBytes

Method toRawBytes of PoolMetadataHash

**Signature**

```ts
export declare const toRawBytes: (instance: CML.PoolMetadataHash) => Effect.Effect<Uint8Array, PoolMetadataHashError>
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.PoolMetadataHash) => void
```

Added in v2.0.0

## toBech32Unsafe

Unsafely calls instance.toBech32 without Effect wrapper

**Signature**

```ts
export declare const toBech32Unsafe: (instance: CML.PoolMetadataHash, prefix: string) => string
```

Added in v2.0.0

## toHexUnsafe

Unsafely calls instance.toHex without Effect wrapper

**Signature**

```ts
export declare const toHexUnsafe: (instance: CML.PoolMetadataHash) => string
```

Added in v2.0.0

## toRawBytesUnsafe

Unsafely calls instance.toRawBytes without Effect wrapper

**Signature**

```ts
export declare const toRawBytesUnsafe: (instance: CML.PoolMetadataHash) => Uint8Array
```

Added in v2.0.0

# Types

## PoolMetadataHash (type alias)

Type alias for the CML PoolMetadataHash class

**Signature**

```ts
export type PoolMetadataHash = CML.PoolMetadataHash
```

Added in v2.0.0
