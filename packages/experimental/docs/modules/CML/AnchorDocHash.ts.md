---
title: CML/AnchorDocHash.ts
nav_order: 7
parent: Modules
---

## AnchorDocHash overview

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
  - [AnchorDocHashError (class)](#anchordochasherror-class)
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
  - [AnchorDocHash (type alias)](#anchordochash-type-alias)

---

# Constructors

## fromBech32

Static method fromBech32 of AnchorDocHash

**Signature**

```ts
export declare const fromBech32: (bech32Str: string) => Effect.Effect<CML.AnchorDocHash, AnchorDocHashError>
```

Added in v2.0.0

## fromHex

Static method fromHex of AnchorDocHash

**Signature**

```ts
export declare const fromHex: (input: string) => Effect.Effect<CML.AnchorDocHash, AnchorDocHashError>
```

Added in v2.0.0

## fromRawBytes

Static method fromRawBytes of AnchorDocHash

**Signature**

```ts
export declare const fromRawBytes: (bytes: Uint8Array) => Effect.Effect<CML.AnchorDocHash, AnchorDocHashError>
```

Added in v2.0.0

# ConstructorsUnsafe

## fromBech32Unsafe

Unsafely calls AnchorDocHash.fromBech32 without Effect wrapper

**Signature**

```ts
export declare const fromBech32Unsafe: (bech32Str: string) => CML.AnchorDocHash
```

Added in v2.0.0

## fromHexUnsafe

Unsafely calls AnchorDocHash.fromHex without Effect wrapper

**Signature**

```ts
export declare const fromHexUnsafe: (input: string) => CML.AnchorDocHash
```

Added in v2.0.0

## fromRawBytesUnsafe

Unsafely calls AnchorDocHash.fromRawBytes without Effect wrapper

**Signature**

```ts
export declare const fromRawBytesUnsafe: (bytes: Uint8Array) => CML.AnchorDocHash
```

Added in v2.0.0

# Errors

## AnchorDocHashError (class)

Error class for AnchorDocHash operations

This error is thrown when operations on AnchorDocHash instances fail.

**Signature**

```ts
export declare class AnchorDocHashError
```

Added in v2.0.0

# Methods

## free

Method free of AnchorDocHash

**Signature**

```ts
export declare const free: (instance: CML.AnchorDocHash) => Effect.Effect<void, AnchorDocHashError>
```

Added in v2.0.0

## toBech32

Method toBech32 of AnchorDocHash

**Signature**

```ts
export declare const toBech32: (
  instance: CML.AnchorDocHash,
  prefix: string
) => Effect.Effect<string, AnchorDocHashError>
```

Added in v2.0.0

## toHex

Method toHex of AnchorDocHash

**Signature**

```ts
export declare const toHex: (instance: CML.AnchorDocHash) => Effect.Effect<string, AnchorDocHashError>
```

Added in v2.0.0

## toRawBytes

Method toRawBytes of AnchorDocHash

**Signature**

```ts
export declare const toRawBytes: (instance: CML.AnchorDocHash) => Effect.Effect<Uint8Array, AnchorDocHashError>
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.AnchorDocHash) => void
```

Added in v2.0.0

## toBech32Unsafe

Unsafely calls instance.toBech32 without Effect wrapper

**Signature**

```ts
export declare const toBech32Unsafe: (instance: CML.AnchorDocHash, prefix: string) => string
```

Added in v2.0.0

## toHexUnsafe

Unsafely calls instance.toHex without Effect wrapper

**Signature**

```ts
export declare const toHexUnsafe: (instance: CML.AnchorDocHash) => string
```

Added in v2.0.0

## toRawBytesUnsafe

Unsafely calls instance.toRawBytes without Effect wrapper

**Signature**

```ts
export declare const toRawBytesUnsafe: (instance: CML.AnchorDocHash) => Uint8Array
```

Added in v2.0.0

# Types

## AnchorDocHash (type alias)

Type alias for the CML AnchorDocHash class

**Signature**

```ts
export type AnchorDocHash = CML.AnchorDocHash
```

Added in v2.0.0
