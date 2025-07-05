---
title: CML/Ed25519KeyHash.ts
nav_order: 63
parent: Modules
---

## Ed25519KeyHash overview

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
  - [Ed25519KeyHashError (class)](#ed25519keyhasherror-class)
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
  - [Ed25519KeyHash (type alias)](#ed25519keyhash-type-alias)

---

# Constructors

## fromBech32

Static method fromBech32 of Ed25519KeyHash

**Signature**

```ts
export declare const fromBech32: (
  bech32Str: string,
) => Effect.Effect<CML.Ed25519KeyHash, Ed25519KeyHashError>;
```

Added in v2.0.0

## fromHex

Static method fromHex of Ed25519KeyHash

**Signature**

```ts
export declare const fromHex: (
  input: string,
) => Effect.Effect<CML.Ed25519KeyHash, Ed25519KeyHashError>;
```

Added in v2.0.0

## fromRawBytes

Static method fromRawBytes of Ed25519KeyHash

**Signature**

```ts
export declare const fromRawBytes: (
  bytes: Uint8Array,
) => Effect.Effect<CML.Ed25519KeyHash, Ed25519KeyHashError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## fromBech32Unsafe

Unsafely calls Ed25519KeyHash.fromBech32 without Effect wrapper

**Signature**

```ts
export declare const fromBech32Unsafe: (
  bech32Str: string,
) => CML.Ed25519KeyHash;
```

Added in v2.0.0

## fromHexUnsafe

Unsafely calls Ed25519KeyHash.fromHex without Effect wrapper

**Signature**

```ts
export declare const fromHexUnsafe: (input: string) => CML.Ed25519KeyHash;
```

Added in v2.0.0

## fromRawBytesUnsafe

Unsafely calls Ed25519KeyHash.fromRawBytes without Effect wrapper

**Signature**

```ts
export declare const fromRawBytesUnsafe: (
  bytes: Uint8Array,
) => CML.Ed25519KeyHash;
```

Added in v2.0.0

# Errors

## Ed25519KeyHashError (class)

Error class for Ed25519KeyHash operations

This error is thrown when operations on Ed25519KeyHash instances fail.

**Signature**

```ts
export declare class Ed25519KeyHashError
```

Added in v2.0.0

# Methods

## free

Method free of Ed25519KeyHash

**Signature**

```ts
export declare const free: (
  instance: CML.Ed25519KeyHash,
) => Effect.Effect<void, Ed25519KeyHashError>;
```

Added in v2.0.0

## toBech32

Method toBech32 of Ed25519KeyHash

**Signature**

```ts
export declare const toBech32: (
  instance: CML.Ed25519KeyHash,
  prefix: string,
) => Effect.Effect<string, Ed25519KeyHashError>;
```

Added in v2.0.0

## toHex

Method toHex of Ed25519KeyHash

**Signature**

```ts
export declare const toHex: (
  instance: CML.Ed25519KeyHash,
) => Effect.Effect<string, Ed25519KeyHashError>;
```

Added in v2.0.0

## toRawBytes

Method toRawBytes of Ed25519KeyHash

**Signature**

```ts
export declare const toRawBytes: (
  instance: CML.Ed25519KeyHash,
) => Effect.Effect<Uint8Array, Ed25519KeyHashError>;
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.Ed25519KeyHash) => void;
```

Added in v2.0.0

## toBech32Unsafe

Unsafely calls instance.toBech32 without Effect wrapper

**Signature**

```ts
export declare const toBech32Unsafe: (
  instance: CML.Ed25519KeyHash,
  prefix: string,
) => string;
```

Added in v2.0.0

## toHexUnsafe

Unsafely calls instance.toHex without Effect wrapper

**Signature**

```ts
export declare const toHexUnsafe: (instance: CML.Ed25519KeyHash) => string;
```

Added in v2.0.0

## toRawBytesUnsafe

Unsafely calls instance.toRawBytes without Effect wrapper

**Signature**

```ts
export declare const toRawBytesUnsafe: (
  instance: CML.Ed25519KeyHash,
) => Uint8Array;
```

Added in v2.0.0

# Types

## Ed25519KeyHash (type alias)

Type alias for the CML Ed25519KeyHash class

**Signature**

```ts
export type Ed25519KeyHash = CML.Ed25519KeyHash;
```

Added in v2.0.0
