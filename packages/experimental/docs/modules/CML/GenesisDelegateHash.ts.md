---
title: CML/GenesisDelegateHash.ts
nav_order: 100
parent: Modules
---

## GenesisDelegateHash overview

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
  - [GenesisDelegateHashError (class)](#genesisdelegatehasherror-class)
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
  - [GenesisDelegateHash (type alias)](#genesisdelegatehash-type-alias)

---

# Constructors

## fromBech32

Static method fromBech32 of GenesisDelegateHash

**Signature**

```ts
export declare const fromBech32: (bech32Str: string) => Effect.Effect<CML.GenesisDelegateHash, GenesisDelegateHashError>
```

Added in v2.0.0

## fromHex

Static method fromHex of GenesisDelegateHash

**Signature**

```ts
export declare const fromHex: (input: string) => Effect.Effect<CML.GenesisDelegateHash, GenesisDelegateHashError>
```

Added in v2.0.0

## fromRawBytes

Static method fromRawBytes of GenesisDelegateHash

**Signature**

```ts
export declare const fromRawBytes: (
  bytes: Uint8Array
) => Effect.Effect<CML.GenesisDelegateHash, GenesisDelegateHashError>
```

Added in v2.0.0

# ConstructorsUnsafe

## fromBech32Unsafe

Unsafely calls GenesisDelegateHash.fromBech32 without Effect wrapper

**Signature**

```ts
export declare const fromBech32Unsafe: (bech32Str: string) => CML.GenesisDelegateHash
```

Added in v2.0.0

## fromHexUnsafe

Unsafely calls GenesisDelegateHash.fromHex without Effect wrapper

**Signature**

```ts
export declare const fromHexUnsafe: (input: string) => CML.GenesisDelegateHash
```

Added in v2.0.0

## fromRawBytesUnsafe

Unsafely calls GenesisDelegateHash.fromRawBytes without Effect wrapper

**Signature**

```ts
export declare const fromRawBytesUnsafe: (bytes: Uint8Array) => CML.GenesisDelegateHash
```

Added in v2.0.0

# Errors

## GenesisDelegateHashError (class)

Error class for GenesisDelegateHash operations

This error is thrown when operations on GenesisDelegateHash instances fail.

**Signature**

```ts
export declare class GenesisDelegateHashError
```

Added in v2.0.0

# Methods

## free

Method free of GenesisDelegateHash

**Signature**

```ts
export declare const free: (instance: CML.GenesisDelegateHash) => Effect.Effect<void, GenesisDelegateHashError>
```

Added in v2.0.0

## toBech32

Method toBech32 of GenesisDelegateHash

**Signature**

```ts
export declare const toBech32: (
  instance: CML.GenesisDelegateHash,
  prefix: string
) => Effect.Effect<string, GenesisDelegateHashError>
```

Added in v2.0.0

## toHex

Method toHex of GenesisDelegateHash

**Signature**

```ts
export declare const toHex: (instance: CML.GenesisDelegateHash) => Effect.Effect<string, GenesisDelegateHashError>
```

Added in v2.0.0

## toRawBytes

Method toRawBytes of GenesisDelegateHash

**Signature**

```ts
export declare const toRawBytes: (
  instance: CML.GenesisDelegateHash
) => Effect.Effect<Uint8Array, GenesisDelegateHashError>
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.GenesisDelegateHash) => void
```

Added in v2.0.0

## toBech32Unsafe

Unsafely calls instance.toBech32 without Effect wrapper

**Signature**

```ts
export declare const toBech32Unsafe: (instance: CML.GenesisDelegateHash, prefix: string) => string
```

Added in v2.0.0

## toHexUnsafe

Unsafely calls instance.toHex without Effect wrapper

**Signature**

```ts
export declare const toHexUnsafe: (instance: CML.GenesisDelegateHash) => string
```

Added in v2.0.0

## toRawBytesUnsafe

Unsafely calls instance.toRawBytes without Effect wrapper

**Signature**

```ts
export declare const toRawBytesUnsafe: (instance: CML.GenesisDelegateHash) => Uint8Array
```

Added in v2.0.0

# Types

## GenesisDelegateHash (type alias)

Type alias for the CML GenesisDelegateHash class

**Signature**

```ts
export type GenesisDelegateHash = CML.GenesisDelegateHash
```

Added in v2.0.0
