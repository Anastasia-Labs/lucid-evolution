---
title: CML/DatumHash.ts
nav_order: 54
parent: Modules
---

## DatumHash overview

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
  - [DatumHashError (class)](#datumhasherror-class)
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
  - [DatumHash (type alias)](#datumhash-type-alias)

---

# Constructors

## fromBech32

Static method fromBech32 of DatumHash

**Signature**

```ts
export declare const fromBech32: (
  bech32Str: string,
) => Effect.Effect<CML.DatumHash, DatumHashError>;
```

Added in v2.0.0

## fromHex

Static method fromHex of DatumHash

**Signature**

```ts
export declare const fromHex: (
  input: string,
) => Effect.Effect<CML.DatumHash, DatumHashError>;
```

Added in v2.0.0

## fromRawBytes

Static method fromRawBytes of DatumHash

**Signature**

```ts
export declare const fromRawBytes: (
  bytes: Uint8Array,
) => Effect.Effect<CML.DatumHash, DatumHashError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## fromBech32Unsafe

Unsafely calls DatumHash.fromBech32 without Effect wrapper

**Signature**

```ts
export declare const fromBech32Unsafe: (bech32Str: string) => CML.DatumHash;
```

Added in v2.0.0

## fromHexUnsafe

Unsafely calls DatumHash.fromHex without Effect wrapper

**Signature**

```ts
export declare const fromHexUnsafe: (input: string) => CML.DatumHash;
```

Added in v2.0.0

## fromRawBytesUnsafe

Unsafely calls DatumHash.fromRawBytes without Effect wrapper

**Signature**

```ts
export declare const fromRawBytesUnsafe: (bytes: Uint8Array) => CML.DatumHash;
```

Added in v2.0.0

# Errors

## DatumHashError (class)

Error class for DatumHash operations

This error is thrown when operations on DatumHash instances fail.

**Signature**

```ts
export declare class DatumHashError
```

Added in v2.0.0

# Methods

## free

Method free of DatumHash

**Signature**

```ts
export declare const free: (
  instance: CML.DatumHash,
) => Effect.Effect<void, DatumHashError>;
```

Added in v2.0.0

## toBech32

Method toBech32 of DatumHash

**Signature**

```ts
export declare const toBech32: (
  instance: CML.DatumHash,
  prefix: string,
) => Effect.Effect<string, DatumHashError>;
```

Added in v2.0.0

## toHex

Method toHex of DatumHash

**Signature**

```ts
export declare const toHex: (
  instance: CML.DatumHash,
) => Effect.Effect<string, DatumHashError>;
```

Added in v2.0.0

## toRawBytes

Method toRawBytes of DatumHash

**Signature**

```ts
export declare const toRawBytes: (
  instance: CML.DatumHash,
) => Effect.Effect<Uint8Array, DatumHashError>;
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.DatumHash) => void;
```

Added in v2.0.0

## toBech32Unsafe

Unsafely calls instance.toBech32 without Effect wrapper

**Signature**

```ts
export declare const toBech32Unsafe: (
  instance: CML.DatumHash,
  prefix: string,
) => string;
```

Added in v2.0.0

## toHexUnsafe

Unsafely calls instance.toHex without Effect wrapper

**Signature**

```ts
export declare const toHexUnsafe: (instance: CML.DatumHash) => string;
```

Added in v2.0.0

## toRawBytesUnsafe

Unsafely calls instance.toRawBytes without Effect wrapper

**Signature**

```ts
export declare const toRawBytesUnsafe: (instance: CML.DatumHash) => Uint8Array;
```

Added in v2.0.0

# Types

## DatumHash (type alias)

Type alias for the CML DatumHash class

**Signature**

```ts
export type DatumHash = CML.DatumHash;
```

Added in v2.0.0
