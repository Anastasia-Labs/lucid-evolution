---
title: CML/VRFVkey.ts
nav_order: 292
parent: Modules
---

## VRFVkey overview

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
  - [VRFVkeyError (class)](#vrfvkeyerror-class)
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
  - [VRFVkey (type alias)](#vrfvkey-type-alias)

---

# Constructors

## fromBech32

Static method fromBech32 of VRFVkey

**Signature**

```ts
export declare const fromBech32: (
  bech32Str: string,
) => Effect.Effect<CML.VRFVkey, VRFVkeyError>;
```

Added in v2.0.0

## fromHex

Static method fromHex of VRFVkey

**Signature**

```ts
export declare const fromHex: (
  input: string,
) => Effect.Effect<CML.VRFVkey, VRFVkeyError>;
```

Added in v2.0.0

## fromRawBytes

Static method fromRawBytes of VRFVkey

**Signature**

```ts
export declare const fromRawBytes: (
  bytes: Uint8Array,
) => Effect.Effect<CML.VRFVkey, VRFVkeyError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## fromBech32Unsafe

Unsafely calls VRFVkey.fromBech32 without Effect wrapper

**Signature**

```ts
export declare const fromBech32Unsafe: (bech32Str: string) => CML.VRFVkey;
```

Added in v2.0.0

## fromHexUnsafe

Unsafely calls VRFVkey.fromHex without Effect wrapper

**Signature**

```ts
export declare const fromHexUnsafe: (input: string) => CML.VRFVkey;
```

Added in v2.0.0

## fromRawBytesUnsafe

Unsafely calls VRFVkey.fromRawBytes without Effect wrapper

**Signature**

```ts
export declare const fromRawBytesUnsafe: (bytes: Uint8Array) => CML.VRFVkey;
```

Added in v2.0.0

# Errors

## VRFVkeyError (class)

Error class for VRFVkey operations

This error is thrown when operations on VRFVkey instances fail.

**Signature**

```ts
export declare class VRFVkeyError
```

Added in v2.0.0

# Methods

## free

Method free of VRFVkey

**Signature**

```ts
export declare const free: (
  instance: CML.VRFVkey,
) => Effect.Effect<void, VRFVkeyError>;
```

Added in v2.0.0

## toBech32

Method toBech32 of VRFVkey

**Signature**

```ts
export declare const toBech32: (
  instance: CML.VRFVkey,
  prefix: string,
) => Effect.Effect<string, VRFVkeyError>;
```

Added in v2.0.0

## toHex

Method toHex of VRFVkey

**Signature**

```ts
export declare const toHex: (
  instance: CML.VRFVkey,
) => Effect.Effect<string, VRFVkeyError>;
```

Added in v2.0.0

## toRawBytes

Method toRawBytes of VRFVkey

**Signature**

```ts
export declare const toRawBytes: (
  instance: CML.VRFVkey,
) => Effect.Effect<Uint8Array, VRFVkeyError>;
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.VRFVkey) => void;
```

Added in v2.0.0

## toBech32Unsafe

Unsafely calls instance.toBech32 without Effect wrapper

**Signature**

```ts
export declare const toBech32Unsafe: (
  instance: CML.VRFVkey,
  prefix: string,
) => string;
```

Added in v2.0.0

## toHexUnsafe

Unsafely calls instance.toHex without Effect wrapper

**Signature**

```ts
export declare const toHexUnsafe: (instance: CML.VRFVkey) => string;
```

Added in v2.0.0

## toRawBytesUnsafe

Unsafely calls instance.toRawBytes without Effect wrapper

**Signature**

```ts
export declare const toRawBytesUnsafe: (instance: CML.VRFVkey) => Uint8Array;
```

Added in v2.0.0

# Types

## VRFVkey (type alias)

Type alias for the CML VRFVkey class

**Signature**

```ts
export type VRFVkey = CML.VRFVkey;
```

Added in v2.0.0
