---
title: CML/TransactionHash.ts
nav_order: 231
parent: Modules
---

## TransactionHash overview

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
  - [TransactionHashError (class)](#transactionhasherror-class)
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
  - [TransactionHash (type alias)](#transactionhash-type-alias)

---

# Constructors

## fromBech32

Static method fromBech32 of TransactionHash

**Signature**

```ts
export declare const fromBech32: (bech32Str: string) => Effect.Effect<CML.TransactionHash, TransactionHashError>
```

Added in v2.0.0

## fromHex

Static method fromHex of TransactionHash

**Signature**

```ts
export declare const fromHex: (input: string) => Effect.Effect<CML.TransactionHash, TransactionHashError>
```

Added in v2.0.0

## fromRawBytes

Static method fromRawBytes of TransactionHash

**Signature**

```ts
export declare const fromRawBytes: (bytes: Uint8Array) => Effect.Effect<CML.TransactionHash, TransactionHashError>
```

Added in v2.0.0

# ConstructorsUnsafe

## fromBech32Unsafe

Unsafely calls TransactionHash.fromBech32 without Effect wrapper

**Signature**

```ts
export declare const fromBech32Unsafe: (bech32Str: string) => CML.TransactionHash
```

Added in v2.0.0

## fromHexUnsafe

Unsafely calls TransactionHash.fromHex without Effect wrapper

**Signature**

```ts
export declare const fromHexUnsafe: (input: string) => CML.TransactionHash
```

Added in v2.0.0

## fromRawBytesUnsafe

Unsafely calls TransactionHash.fromRawBytes without Effect wrapper

**Signature**

```ts
export declare const fromRawBytesUnsafe: (bytes: Uint8Array) => CML.TransactionHash
```

Added in v2.0.0

# Errors

## TransactionHashError (class)

Error class for TransactionHash operations

This error is thrown when operations on TransactionHash instances fail.

**Signature**

```ts
export declare class TransactionHashError
```

Added in v2.0.0

# Methods

## free

Method free of TransactionHash

**Signature**

```ts
export declare const free: (instance: CML.TransactionHash) => Effect.Effect<void, TransactionHashError>
```

Added in v2.0.0

## toBech32

Method toBech32 of TransactionHash

**Signature**

```ts
export declare const toBech32: (
  instance: CML.TransactionHash,
  prefix: string
) => Effect.Effect<string, TransactionHashError>
```

Added in v2.0.0

## toHex

Method toHex of TransactionHash

**Signature**

```ts
export declare const toHex: (instance: CML.TransactionHash) => Effect.Effect<string, TransactionHashError>
```

Added in v2.0.0

## toRawBytes

Method toRawBytes of TransactionHash

**Signature**

```ts
export declare const toRawBytes: (instance: CML.TransactionHash) => Effect.Effect<Uint8Array, TransactionHashError>
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.TransactionHash) => void
```

Added in v2.0.0

## toBech32Unsafe

Unsafely calls instance.toBech32 without Effect wrapper

**Signature**

```ts
export declare const toBech32Unsafe: (instance: CML.TransactionHash, prefix: string) => string
```

Added in v2.0.0

## toHexUnsafe

Unsafely calls instance.toHex without Effect wrapper

**Signature**

```ts
export declare const toHexUnsafe: (instance: CML.TransactionHash) => string
```

Added in v2.0.0

## toRawBytesUnsafe

Unsafely calls instance.toRawBytes without Effect wrapper

**Signature**

```ts
export declare const toRawBytesUnsafe: (instance: CML.TransactionHash) => Uint8Array
```

Added in v2.0.0

# Types

## TransactionHash (type alias)

Type alias for the CML TransactionHash class

**Signature**

```ts
export type TransactionHash = CML.TransactionHash
```

Added in v2.0.0
