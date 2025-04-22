---
title: CML/AuxiliaryDataHash.ts
nav_order: 18
parent: Modules
---

## AuxiliaryDataHash overview

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
  - [AuxiliaryDataHashError (class)](#auxiliarydatahasherror-class)
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
  - [AuxiliaryDataHash (type alias)](#auxiliarydatahash-type-alias)

---

# Constructors

## fromBech32

Static method fromBech32 of AuxiliaryDataHash

**Signature**

```ts
export declare const fromBech32: (
  bech32Str: string,
) => Effect.Effect<CML.AuxiliaryDataHash, AuxiliaryDataHashError>;
```

Added in v2.0.0

## fromHex

Static method fromHex of AuxiliaryDataHash

**Signature**

```ts
export declare const fromHex: (
  input: string,
) => Effect.Effect<CML.AuxiliaryDataHash, AuxiliaryDataHashError>;
```

Added in v2.0.0

## fromRawBytes

Static method fromRawBytes of AuxiliaryDataHash

**Signature**

```ts
export declare const fromRawBytes: (
  bytes: Uint8Array,
) => Effect.Effect<CML.AuxiliaryDataHash, AuxiliaryDataHashError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## fromBech32Unsafe

Unsafely calls AuxiliaryDataHash.fromBech32 without Effect wrapper

**Signature**

```ts
export declare const fromBech32Unsafe: (
  bech32Str: string,
) => CML.AuxiliaryDataHash;
```

Added in v2.0.0

## fromHexUnsafe

Unsafely calls AuxiliaryDataHash.fromHex without Effect wrapper

**Signature**

```ts
export declare const fromHexUnsafe: (input: string) => CML.AuxiliaryDataHash;
```

Added in v2.0.0

## fromRawBytesUnsafe

Unsafely calls AuxiliaryDataHash.fromRawBytes without Effect wrapper

**Signature**

```ts
export declare const fromRawBytesUnsafe: (
  bytes: Uint8Array,
) => CML.AuxiliaryDataHash;
```

Added in v2.0.0

# Errors

## AuxiliaryDataHashError (class)

Error class for AuxiliaryDataHash operations

This error is thrown when operations on AuxiliaryDataHash instances fail.

**Signature**

```ts
export declare class AuxiliaryDataHashError
```

Added in v2.0.0

# Methods

## free

Method free of AuxiliaryDataHash

**Signature**

```ts
export declare const free: (
  instance: CML.AuxiliaryDataHash,
) => Effect.Effect<void, AuxiliaryDataHashError>;
```

Added in v2.0.0

## toBech32

Method toBech32 of AuxiliaryDataHash

**Signature**

```ts
export declare const toBech32: (
  instance: CML.AuxiliaryDataHash,
  prefix: string,
) => Effect.Effect<string, AuxiliaryDataHashError>;
```

Added in v2.0.0

## toHex

Method toHex of AuxiliaryDataHash

**Signature**

```ts
export declare const toHex: (
  instance: CML.AuxiliaryDataHash,
) => Effect.Effect<string, AuxiliaryDataHashError>;
```

Added in v2.0.0

## toRawBytes

Method toRawBytes of AuxiliaryDataHash

**Signature**

```ts
export declare const toRawBytes: (
  instance: CML.AuxiliaryDataHash,
) => Effect.Effect<Uint8Array, AuxiliaryDataHashError>;
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.AuxiliaryDataHash) => void;
```

Added in v2.0.0

## toBech32Unsafe

Unsafely calls instance.toBech32 without Effect wrapper

**Signature**

```ts
export declare const toBech32Unsafe: (
  instance: CML.AuxiliaryDataHash,
  prefix: string,
) => string;
```

Added in v2.0.0

## toHexUnsafe

Unsafely calls instance.toHex without Effect wrapper

**Signature**

```ts
export declare const toHexUnsafe: (instance: CML.AuxiliaryDataHash) => string;
```

Added in v2.0.0

## toRawBytesUnsafe

Unsafely calls instance.toRawBytes without Effect wrapper

**Signature**

```ts
export declare const toRawBytesUnsafe: (
  instance: CML.AuxiliaryDataHash,
) => Uint8Array;
```

Added in v2.0.0

# Types

## AuxiliaryDataHash (type alias)

Type alias for the CML AuxiliaryDataHash class

**Signature**

```ts
export type AuxiliaryDataHash = CML.AuxiliaryDataHash;
```

Added in v2.0.0
