---
title: CML/GenesisHash.ts
nav_order: 101
parent: Modules
---

## GenesisHash overview

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
  - [GenesisHashError (class)](#genesishasherror-class)
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
  - [GenesisHash (type alias)](#genesishash-type-alias)

---

# Constructors

## fromBech32

Static method fromBech32 of GenesisHash

**Signature**

```ts
export declare const fromBech32: (
  bech32Str: string,
) => Effect.Effect<CML.GenesisHash, GenesisHashError>;
```

Added in v2.0.0

## fromHex

Static method fromHex of GenesisHash

**Signature**

```ts
export declare const fromHex: (
  input: string,
) => Effect.Effect<CML.GenesisHash, GenesisHashError>;
```

Added in v2.0.0

## fromRawBytes

Static method fromRawBytes of GenesisHash

**Signature**

```ts
export declare const fromRawBytes: (
  bytes: Uint8Array,
) => Effect.Effect<CML.GenesisHash, GenesisHashError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## fromBech32Unsafe

Unsafely calls GenesisHash.fromBech32 without Effect wrapper

**Signature**

```ts
export declare const fromBech32Unsafe: (bech32Str: string) => CML.GenesisHash;
```

Added in v2.0.0

## fromHexUnsafe

Unsafely calls GenesisHash.fromHex without Effect wrapper

**Signature**

```ts
export declare const fromHexUnsafe: (input: string) => CML.GenesisHash;
```

Added in v2.0.0

## fromRawBytesUnsafe

Unsafely calls GenesisHash.fromRawBytes without Effect wrapper

**Signature**

```ts
export declare const fromRawBytesUnsafe: (bytes: Uint8Array) => CML.GenesisHash;
```

Added in v2.0.0

# Errors

## GenesisHashError (class)

Error class for GenesisHash operations

This error is thrown when operations on GenesisHash instances fail.

**Signature**

```ts
export declare class GenesisHashError
```

Added in v2.0.0

# Methods

## free

Method free of GenesisHash

**Signature**

```ts
export declare const free: (
  instance: CML.GenesisHash,
) => Effect.Effect<void, GenesisHashError>;
```

Added in v2.0.0

## toBech32

Method toBech32 of GenesisHash

**Signature**

```ts
export declare const toBech32: (
  instance: CML.GenesisHash,
  prefix: string,
) => Effect.Effect<string, GenesisHashError>;
```

Added in v2.0.0

## toHex

Method toHex of GenesisHash

**Signature**

```ts
export declare const toHex: (
  instance: CML.GenesisHash,
) => Effect.Effect<string, GenesisHashError>;
```

Added in v2.0.0

## toRawBytes

Method toRawBytes of GenesisHash

**Signature**

```ts
export declare const toRawBytes: (
  instance: CML.GenesisHash,
) => Effect.Effect<Uint8Array, GenesisHashError>;
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.GenesisHash) => void;
```

Added in v2.0.0

## toBech32Unsafe

Unsafely calls instance.toBech32 without Effect wrapper

**Signature**

```ts
export declare const toBech32Unsafe: (
  instance: CML.GenesisHash,
  prefix: string,
) => string;
```

Added in v2.0.0

## toHexUnsafe

Unsafely calls instance.toHex without Effect wrapper

**Signature**

```ts
export declare const toHexUnsafe: (instance: CML.GenesisHash) => string;
```

Added in v2.0.0

## toRawBytesUnsafe

Unsafely calls instance.toRawBytes without Effect wrapper

**Signature**

```ts
export declare const toRawBytesUnsafe: (
  instance: CML.GenesisHash,
) => Uint8Array;
```

Added in v2.0.0

# Types

## GenesisHash (type alias)

Type alias for the CML GenesisHash class

**Signature**

```ts
export type GenesisHash = CML.GenesisHash;
```

Added in v2.0.0
