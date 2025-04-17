---
title: CML/PublicKey.ts
nav_order: 182
parent: Modules
---

## PublicKey overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [fromBech32](#frombech32)
  - [fromBytes](#frombytes)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [fromBech32Unsafe](#frombech32unsafe)
  - [fromBytesUnsafe](#frombytesunsafe)
- [Errors](#errors)
  - [PublicKeyError (class)](#publickeyerror-class)
- [Methods](#methods)
  - [free](#free)
  - [hash](#hash)
  - [toBech32](#tobech32)
  - [toRawBytes](#torawbytes)
  - [verify](#verify)
- [MethodsUnsafe](#methodsunsafe)
  - [freeUnsafe](#freeunsafe)
  - [hashUnsafe](#hashunsafe)
  - [toBech32Unsafe](#tobech32unsafe)
  - [toRawBytesUnsafe](#torawbytesunsafe)
  - [verifyUnsafe](#verifyunsafe)
- [Types](#types)
  - [PublicKey (type alias)](#publickey-type-alias)

---

# Constructors

## fromBech32

Static method fromBech32 of PublicKey

**Signature**

```ts
export declare const fromBech32: (
  bech32Str: string,
) => Effect.Effect<CML.PublicKey, PublicKeyError>;
```

Added in v2.0.0

## fromBytes

Static method fromBytes of PublicKey

**Signature**

```ts
export declare const fromBytes: (
  bytes: Uint8Array,
) => Effect.Effect<CML.PublicKey, PublicKeyError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## fromBech32Unsafe

Unsafely calls PublicKey.fromBech32 without Effect wrapper

**Signature**

```ts
export declare const fromBech32Unsafe: (bech32Str: string) => CML.PublicKey;
```

Added in v2.0.0

## fromBytesUnsafe

Unsafely calls PublicKey.fromBytes without Effect wrapper

**Signature**

```ts
export declare const fromBytesUnsafe: (bytes: Uint8Array) => CML.PublicKey;
```

Added in v2.0.0

# Errors

## PublicKeyError (class)

Error class for PublicKey operations

This error is thrown when operations on PublicKey instances fail.

**Signature**

```ts
export declare class PublicKeyError
```

Added in v2.0.0

# Methods

## free

Method free of PublicKey

**Signature**

```ts
export declare const free: (
  instance: CML.PublicKey,
) => Effect.Effect<void, PublicKeyError>;
```

Added in v2.0.0

## hash

Method hash of PublicKey

**Signature**

```ts
export declare const hash: (
  instance: CML.PublicKey,
) => Effect.Effect<CML.Ed25519KeyHash, PublicKeyError>;
```

Added in v2.0.0

## toBech32

Method toBech32 of PublicKey

**Signature**

```ts
export declare const toBech32: (
  instance: CML.PublicKey,
) => Effect.Effect<string, PublicKeyError>;
```

Added in v2.0.0

## toRawBytes

Method toRawBytes of PublicKey

**Signature**

```ts
export declare const toRawBytes: (
  instance: CML.PublicKey,
) => Effect.Effect<Uint8Array, PublicKeyError>;
```

Added in v2.0.0

## verify

Method verify of PublicKey

**Signature**

```ts
export declare const verify: (
  instance: CML.PublicKey,
  data: Uint8Array,
  signature: CML.Ed25519Signature,
) => Effect.Effect<boolean, PublicKeyError>;
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.PublicKey) => void;
```

Added in v2.0.0

## hashUnsafe

Unsafely calls instance.hash without Effect wrapper

**Signature**

```ts
export declare const hashUnsafe: (
  instance: CML.PublicKey,
) => CML.Ed25519KeyHash;
```

Added in v2.0.0

## toBech32Unsafe

Unsafely calls instance.toBech32 without Effect wrapper

**Signature**

```ts
export declare const toBech32Unsafe: (instance: CML.PublicKey) => string;
```

Added in v2.0.0

## toRawBytesUnsafe

Unsafely calls instance.toRawBytes without Effect wrapper

**Signature**

```ts
export declare const toRawBytesUnsafe: (instance: CML.PublicKey) => Uint8Array;
```

Added in v2.0.0

## verifyUnsafe

Unsafely calls instance.verify without Effect wrapper

**Signature**

```ts
export declare const verifyUnsafe: (
  instance: CML.PublicKey,
  data: Uint8Array,
  signature: CML.Ed25519Signature,
) => boolean;
```

Added in v2.0.0

# Types

## PublicKey (type alias)

Type alias for the CML PublicKey class

**Signature**

```ts
export type PublicKey = CML.PublicKey;
```

Added in v2.0.0
