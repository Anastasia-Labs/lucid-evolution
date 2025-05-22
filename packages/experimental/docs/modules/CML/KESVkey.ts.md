---
title: CML/KESVkey.ts
nav_order: 117
parent: Modules
---

## KESVkey overview

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
  - [KESVkeyError (class)](#kesvkeyerror-class)
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
  - [KESVkey (type alias)](#kesvkey-type-alias)

---

# Constructors

## fromBech32

Static method fromBech32 of KESVkey

**Signature**

```ts
export declare const fromBech32: (
  bech32Str: string,
) => Effect.Effect<CML.KESVkey, KESVkeyError>;
```

Added in v2.0.0

## fromHex

Static method fromHex of KESVkey

**Signature**

```ts
export declare const fromHex: (
  input: string,
) => Effect.Effect<CML.KESVkey, KESVkeyError>;
```

Added in v2.0.0

## fromRawBytes

Static method fromRawBytes of KESVkey

**Signature**

```ts
export declare const fromRawBytes: (
  bytes: Uint8Array,
) => Effect.Effect<CML.KESVkey, KESVkeyError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## fromBech32Unsafe

Unsafely calls KESVkey.fromBech32 without Effect wrapper

**Signature**

```ts
export declare const fromBech32Unsafe: (bech32Str: string) => CML.KESVkey;
```

Added in v2.0.0

## fromHexUnsafe

Unsafely calls KESVkey.fromHex without Effect wrapper

**Signature**

```ts
export declare const fromHexUnsafe: (input: string) => CML.KESVkey;
```

Added in v2.0.0

## fromRawBytesUnsafe

Unsafely calls KESVkey.fromRawBytes without Effect wrapper

**Signature**

```ts
export declare const fromRawBytesUnsafe: (bytes: Uint8Array) => CML.KESVkey;
```

Added in v2.0.0

# Errors

## KESVkeyError (class)

Error class for KESVkey operations

This error is thrown when operations on KESVkey instances fail.

**Signature**

```ts
export declare class KESVkeyError
```

Added in v2.0.0

# Methods

## free

Method free of KESVkey

**Signature**

```ts
export declare const free: (
  instance: CML.KESVkey,
) => Effect.Effect<void, KESVkeyError>;
```

Added in v2.0.0

## toBech32

Method toBech32 of KESVkey

**Signature**

```ts
export declare const toBech32: (
  instance: CML.KESVkey,
  prefix: string,
) => Effect.Effect<string, KESVkeyError>;
```

Added in v2.0.0

## toHex

Method toHex of KESVkey

**Signature**

```ts
export declare const toHex: (
  instance: CML.KESVkey,
) => Effect.Effect<string, KESVkeyError>;
```

Added in v2.0.0

## toRawBytes

Method toRawBytes of KESVkey

**Signature**

```ts
export declare const toRawBytes: (
  instance: CML.KESVkey,
) => Effect.Effect<Uint8Array, KESVkeyError>;
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.KESVkey) => void;
```

Added in v2.0.0

## toBech32Unsafe

Unsafely calls instance.toBech32 without Effect wrapper

**Signature**

```ts
export declare const toBech32Unsafe: (
  instance: CML.KESVkey,
  prefix: string,
) => string;
```

Added in v2.0.0

## toHexUnsafe

Unsafely calls instance.toHex without Effect wrapper

**Signature**

```ts
export declare const toHexUnsafe: (instance: CML.KESVkey) => string;
```

Added in v2.0.0

## toRawBytesUnsafe

Unsafely calls instance.toRawBytes without Effect wrapper

**Signature**

```ts
export declare const toRawBytesUnsafe: (instance: CML.KESVkey) => Uint8Array;
```

Added in v2.0.0

# Types

## KESVkey (type alias)

Type alias for the CML KESVkey class

**Signature**

```ts
export type KESVkey = CML.KESVkey;
```

Added in v2.0.0
