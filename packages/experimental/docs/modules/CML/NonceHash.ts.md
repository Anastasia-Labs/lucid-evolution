---
title: CML/NonceHash.ts
nav_order: 149
parent: Modules
---

## NonceHash overview

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
  - [NonceHashError (class)](#noncehasherror-class)
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
  - [NonceHash (type alias)](#noncehash-type-alias)

---

# Constructors

## fromBech32

Static method fromBech32 of NonceHash

**Signature**

```ts
export declare const fromBech32: (
  bech32Str: string,
) => Effect.Effect<CML.NonceHash, NonceHashError>;
```

Added in v2.0.0

## fromHex

Static method fromHex of NonceHash

**Signature**

```ts
export declare const fromHex: (
  input: string,
) => Effect.Effect<CML.NonceHash, NonceHashError>;
```

Added in v2.0.0

## fromRawBytes

Static method fromRawBytes of NonceHash

**Signature**

```ts
export declare const fromRawBytes: (
  bytes: Uint8Array,
) => Effect.Effect<CML.NonceHash, NonceHashError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## fromBech32Unsafe

Unsafely calls NonceHash.fromBech32 without Effect wrapper

**Signature**

```ts
export declare const fromBech32Unsafe: (bech32Str: string) => CML.NonceHash;
```

Added in v2.0.0

## fromHexUnsafe

Unsafely calls NonceHash.fromHex without Effect wrapper

**Signature**

```ts
export declare const fromHexUnsafe: (input: string) => CML.NonceHash;
```

Added in v2.0.0

## fromRawBytesUnsafe

Unsafely calls NonceHash.fromRawBytes without Effect wrapper

**Signature**

```ts
export declare const fromRawBytesUnsafe: (bytes: Uint8Array) => CML.NonceHash;
```

Added in v2.0.0

# Errors

## NonceHashError (class)

Error class for NonceHash operations

This error is thrown when operations on NonceHash instances fail.

**Signature**

```ts
export declare class NonceHashError
```

Added in v2.0.0

# Methods

## free

Method free of NonceHash

**Signature**

```ts
export declare const free: (
  instance: CML.NonceHash,
) => Effect.Effect<void, NonceHashError>;
```

Added in v2.0.0

## toBech32

Method toBech32 of NonceHash

**Signature**

```ts
export declare const toBech32: (
  instance: CML.NonceHash,
  prefix: string,
) => Effect.Effect<string, NonceHashError>;
```

Added in v2.0.0

## toHex

Method toHex of NonceHash

**Signature**

```ts
export declare const toHex: (
  instance: CML.NonceHash,
) => Effect.Effect<string, NonceHashError>;
```

Added in v2.0.0

## toRawBytes

Method toRawBytes of NonceHash

**Signature**

```ts
export declare const toRawBytes: (
  instance: CML.NonceHash,
) => Effect.Effect<Uint8Array, NonceHashError>;
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.NonceHash) => void;
```

Added in v2.0.0

## toBech32Unsafe

Unsafely calls instance.toBech32 without Effect wrapper

**Signature**

```ts
export declare const toBech32Unsafe: (
  instance: CML.NonceHash,
  prefix: string,
) => string;
```

Added in v2.0.0

## toHexUnsafe

Unsafely calls instance.toHex without Effect wrapper

**Signature**

```ts
export declare const toHexUnsafe: (instance: CML.NonceHash) => string;
```

Added in v2.0.0

## toRawBytesUnsafe

Unsafely calls instance.toRawBytes without Effect wrapper

**Signature**

```ts
export declare const toRawBytesUnsafe: (instance: CML.NonceHash) => Uint8Array;
```

Added in v2.0.0

# Types

## NonceHash (type alias)

Type alias for the CML NonceHash class

**Signature**

```ts
export type NonceHash = CML.NonceHash;
```

Added in v2.0.0
