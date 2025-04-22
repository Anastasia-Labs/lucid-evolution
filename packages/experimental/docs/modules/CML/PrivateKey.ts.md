---
title: CML/PrivateKey.ts
nav_order: 174
parent: Modules
---

## PrivateKey overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [fromBech32](#frombech32)
  - [fromExtendedBytes](#fromextendedbytes)
  - [fromNormalBytes](#fromnormalbytes)
  - [generateEd25519](#generateed25519)
  - [generateEd25519extended](#generateed25519extended)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [fromBech32Unsafe](#frombech32unsafe)
  - [fromExtendedBytesUnsafe](#fromextendedbytesunsafe)
  - [fromNormalBytesUnsafe](#fromnormalbytesunsafe)
  - [generateEd25519Unsafe](#generateed25519unsafe)
  - [generateEd25519extendedUnsafe](#generateed25519extendedunsafe)
- [Errors](#errors)
  - [PrivateKeyError (class)](#privatekeyerror-class)
- [Methods](#methods)
  - [free](#free)
  - [sign](#sign)
  - [toBech32](#tobech32)
  - [toPublic](#topublic)
  - [toRawBytes](#torawbytes)
- [MethodsUnsafe](#methodsunsafe)
  - [freeUnsafe](#freeunsafe)
  - [signUnsafe](#signunsafe)
  - [toBech32Unsafe](#tobech32unsafe)
  - [toPublicUnsafe](#topublicunsafe)
  - [toRawBytesUnsafe](#torawbytesunsafe)
- [Types](#types)
  - [PrivateKey (type alias)](#privatekey-type-alias)

---

# Constructors

## fromBech32

Static method fromBech32 of PrivateKey

**Signature**

```ts
export declare const fromBech32: (
  bech32Str: string,
) => Effect.Effect<CML.PrivateKey, PrivateKeyError>;
```

Added in v2.0.0

## fromExtendedBytes

Static method fromExtendedBytes of PrivateKey

**Signature**

```ts
export declare const fromExtendedBytes: (
  bytes: Uint8Array,
) => Effect.Effect<CML.PrivateKey, PrivateKeyError>;
```

Added in v2.0.0

## fromNormalBytes

Static method fromNormalBytes of PrivateKey

**Signature**

```ts
export declare const fromNormalBytes: (
  bytes: Uint8Array,
) => Effect.Effect<CML.PrivateKey, PrivateKeyError>;
```

Added in v2.0.0

## generateEd25519

Static method generateEd25519 of PrivateKey

**Signature**

```ts
export declare const generateEd25519: () => Effect.Effect<
  CML.PrivateKey,
  PrivateKeyError
>;
```

Added in v2.0.0

## generateEd25519extended

Static method generateEd25519extended of PrivateKey

**Signature**

```ts
export declare const generateEd25519extended: () => Effect.Effect<
  CML.PrivateKey,
  PrivateKeyError
>;
```

Added in v2.0.0

# ConstructorsUnsafe

## fromBech32Unsafe

Unsafely calls PrivateKey.fromBech32 without Effect wrapper

**Signature**

```ts
export declare const fromBech32Unsafe: (bech32Str: string) => CML.PrivateKey;
```

Added in v2.0.0

## fromExtendedBytesUnsafe

Unsafely calls PrivateKey.fromExtendedBytes without Effect wrapper

**Signature**

```ts
export declare const fromExtendedBytesUnsafe: (
  bytes: Uint8Array,
) => CML.PrivateKey;
```

Added in v2.0.0

## fromNormalBytesUnsafe

Unsafely calls PrivateKey.fromNormalBytes without Effect wrapper

**Signature**

```ts
export declare const fromNormalBytesUnsafe: (
  bytes: Uint8Array,
) => CML.PrivateKey;
```

Added in v2.0.0

## generateEd25519Unsafe

Unsafely calls PrivateKey.generateEd25519 without Effect wrapper

**Signature**

```ts
export declare const generateEd25519Unsafe: () => CML.PrivateKey;
```

Added in v2.0.0

## generateEd25519extendedUnsafe

Unsafely calls PrivateKey.generateEd25519extended without Effect wrapper

**Signature**

```ts
export declare const generateEd25519extendedUnsafe: () => CML.PrivateKey;
```

Added in v2.0.0

# Errors

## PrivateKeyError (class)

Error class for PrivateKey operations

This error is thrown when operations on PrivateKey instances fail.

**Signature**

```ts
export declare class PrivateKeyError
```

Added in v2.0.0

# Methods

## free

Method free of PrivateKey

**Signature**

```ts
export declare const free: (
  instance: CML.PrivateKey,
) => Effect.Effect<void, PrivateKeyError>;
```

Added in v2.0.0

## sign

Method sign of PrivateKey

**Signature**

```ts
export declare const sign: (
  instance: CML.PrivateKey,
  message: Uint8Array,
) => Effect.Effect<CML.Ed25519Signature, PrivateKeyError>;
```

Added in v2.0.0

## toBech32

Method toBech32 of PrivateKey

**Signature**

```ts
export declare const toBech32: (
  instance: CML.PrivateKey,
) => Effect.Effect<string, PrivateKeyError>;
```

Added in v2.0.0

## toPublic

Method toPublic of PrivateKey

**Signature**

```ts
export declare const toPublic: (
  instance: CML.PrivateKey,
) => Effect.Effect<CML.PublicKey, PrivateKeyError>;
```

Added in v2.0.0

## toRawBytes

Method toRawBytes of PrivateKey

**Signature**

```ts
export declare const toRawBytes: (
  instance: CML.PrivateKey,
) => Effect.Effect<Uint8Array, PrivateKeyError>;
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.PrivateKey) => void;
```

Added in v2.0.0

## signUnsafe

Unsafely calls instance.sign without Effect wrapper

**Signature**

```ts
export declare const signUnsafe: (
  instance: CML.PrivateKey,
  message: Uint8Array,
) => CML.Ed25519Signature;
```

Added in v2.0.0

## toBech32Unsafe

Unsafely calls instance.toBech32 without Effect wrapper

**Signature**

```ts
export declare const toBech32Unsafe: (instance: CML.PrivateKey) => string;
```

Added in v2.0.0

## toPublicUnsafe

Unsafely calls instance.toPublic without Effect wrapper

**Signature**

```ts
export declare const toPublicUnsafe: (
  instance: CML.PrivateKey,
) => CML.PublicKey;
```

Added in v2.0.0

## toRawBytesUnsafe

Unsafely calls instance.toRawBytes without Effect wrapper

**Signature**

```ts
export declare const toRawBytesUnsafe: (instance: CML.PrivateKey) => Uint8Array;
```

Added in v2.0.0

# Types

## PrivateKey (type alias)

Type alias for the CML PrivateKey class

**Signature**

```ts
export type PrivateKey = CML.PrivateKey;
```

Added in v2.0.0
