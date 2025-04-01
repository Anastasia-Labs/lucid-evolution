---
title: CML/VRFKeyHash.ts
nav_order: 285
parent: Modules
---

## VRFKeyHash overview

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
  - [VRFKeyHashError (class)](#vrfkeyhasherror-class)
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
  - [VRFKeyHash (type alias)](#vrfkeyhash-type-alias)

---

# Constructors

## fromBech32

Static method fromBech32 of VRFKeyHash

**Signature**

```ts
export declare const fromBech32: (bech32Str: string) => Effect.Effect<CML.VRFKeyHash, VRFKeyHashError>
```

Added in v2.0.0

## fromHex

Static method fromHex of VRFKeyHash

**Signature**

```ts
export declare const fromHex: (input: string) => Effect.Effect<CML.VRFKeyHash, VRFKeyHashError>
```

Added in v2.0.0

## fromRawBytes

Static method fromRawBytes of VRFKeyHash

**Signature**

```ts
export declare const fromRawBytes: (bytes: Uint8Array) => Effect.Effect<CML.VRFKeyHash, VRFKeyHashError>
```

Added in v2.0.0

# ConstructorsUnsafe

## fromBech32Unsafe

Unsafely calls VRFKeyHash.fromBech32 without Effect wrapper

**Signature**

```ts
export declare const fromBech32Unsafe: (bech32Str: string) => CML.VRFKeyHash
```

Added in v2.0.0

## fromHexUnsafe

Unsafely calls VRFKeyHash.fromHex without Effect wrapper

**Signature**

```ts
export declare const fromHexUnsafe: (input: string) => CML.VRFKeyHash
```

Added in v2.0.0

## fromRawBytesUnsafe

Unsafely calls VRFKeyHash.fromRawBytes without Effect wrapper

**Signature**

```ts
export declare const fromRawBytesUnsafe: (bytes: Uint8Array) => CML.VRFKeyHash
```

Added in v2.0.0

# Errors

## VRFKeyHashError (class)

Error class for VRFKeyHash operations

This error is thrown when operations on VRFKeyHash instances fail.

**Signature**

```ts
export declare class VRFKeyHashError
```

Added in v2.0.0

# Methods

## free

Method free of VRFKeyHash

**Signature**

```ts
export declare const free: (instance: CML.VRFKeyHash) => Effect.Effect<void, VRFKeyHashError>
```

Added in v2.0.0

## toBech32

Method toBech32 of VRFKeyHash

**Signature**

```ts
export declare const toBech32: (instance: CML.VRFKeyHash, prefix: string) => Effect.Effect<string, VRFKeyHashError>
```

Added in v2.0.0

## toHex

Method toHex of VRFKeyHash

**Signature**

```ts
export declare const toHex: (instance: CML.VRFKeyHash) => Effect.Effect<string, VRFKeyHashError>
```

Added in v2.0.0

## toRawBytes

Method toRawBytes of VRFKeyHash

**Signature**

```ts
export declare const toRawBytes: (instance: CML.VRFKeyHash) => Effect.Effect<Uint8Array, VRFKeyHashError>
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.VRFKeyHash) => void
```

Added in v2.0.0

## toBech32Unsafe

Unsafely calls instance.toBech32 without Effect wrapper

**Signature**

```ts
export declare const toBech32Unsafe: (instance: CML.VRFKeyHash, prefix: string) => string
```

Added in v2.0.0

## toHexUnsafe

Unsafely calls instance.toHex without Effect wrapper

**Signature**

```ts
export declare const toHexUnsafe: (instance: CML.VRFKeyHash) => string
```

Added in v2.0.0

## toRawBytesUnsafe

Unsafely calls instance.toRawBytes without Effect wrapper

**Signature**

```ts
export declare const toRawBytesUnsafe: (instance: CML.VRFKeyHash) => Uint8Array
```

Added in v2.0.0

# Types

## VRFKeyHash (type alias)

Type alias for the CML VRFKeyHash class

**Signature**

```ts
export type VRFKeyHash = CML.VRFKeyHash
```

Added in v2.0.0
