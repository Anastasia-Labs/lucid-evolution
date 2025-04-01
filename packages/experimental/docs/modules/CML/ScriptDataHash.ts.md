---
title: CML/ScriptDataHash.ts
nav_order: 195
parent: Modules
---

## ScriptDataHash overview

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
  - [ScriptDataHashError (class)](#scriptdatahasherror-class)
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
  - [ScriptDataHash (type alias)](#scriptdatahash-type-alias)

---

# Constructors

## fromBech32

Static method fromBech32 of ScriptDataHash

**Signature**

```ts
export declare const fromBech32: (bech32Str: string) => Effect.Effect<CML.ScriptDataHash, ScriptDataHashError>
```

Added in v2.0.0

## fromHex

Static method fromHex of ScriptDataHash

**Signature**

```ts
export declare const fromHex: (input: string) => Effect.Effect<CML.ScriptDataHash, ScriptDataHashError>
```

Added in v2.0.0

## fromRawBytes

Static method fromRawBytes of ScriptDataHash

**Signature**

```ts
export declare const fromRawBytes: (bytes: Uint8Array) => Effect.Effect<CML.ScriptDataHash, ScriptDataHashError>
```

Added in v2.0.0

# ConstructorsUnsafe

## fromBech32Unsafe

Unsafely calls ScriptDataHash.fromBech32 without Effect wrapper

**Signature**

```ts
export declare const fromBech32Unsafe: (bech32Str: string) => CML.ScriptDataHash
```

Added in v2.0.0

## fromHexUnsafe

Unsafely calls ScriptDataHash.fromHex without Effect wrapper

**Signature**

```ts
export declare const fromHexUnsafe: (input: string) => CML.ScriptDataHash
```

Added in v2.0.0

## fromRawBytesUnsafe

Unsafely calls ScriptDataHash.fromRawBytes without Effect wrapper

**Signature**

```ts
export declare const fromRawBytesUnsafe: (bytes: Uint8Array) => CML.ScriptDataHash
```

Added in v2.0.0

# Errors

## ScriptDataHashError (class)

Error class for ScriptDataHash operations

This error is thrown when operations on ScriptDataHash instances fail.

**Signature**

```ts
export declare class ScriptDataHashError
```

Added in v2.0.0

# Methods

## free

Method free of ScriptDataHash

**Signature**

```ts
export declare const free: (instance: CML.ScriptDataHash) => Effect.Effect<void, ScriptDataHashError>
```

Added in v2.0.0

## toBech32

Method toBech32 of ScriptDataHash

**Signature**

```ts
export declare const toBech32: (
  instance: CML.ScriptDataHash,
  prefix: string
) => Effect.Effect<string, ScriptDataHashError>
```

Added in v2.0.0

## toHex

Method toHex of ScriptDataHash

**Signature**

```ts
export declare const toHex: (instance: CML.ScriptDataHash) => Effect.Effect<string, ScriptDataHashError>
```

Added in v2.0.0

## toRawBytes

Method toRawBytes of ScriptDataHash

**Signature**

```ts
export declare const toRawBytes: (instance: CML.ScriptDataHash) => Effect.Effect<Uint8Array, ScriptDataHashError>
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.ScriptDataHash) => void
```

Added in v2.0.0

## toBech32Unsafe

Unsafely calls instance.toBech32 without Effect wrapper

**Signature**

```ts
export declare const toBech32Unsafe: (instance: CML.ScriptDataHash, prefix: string) => string
```

Added in v2.0.0

## toHexUnsafe

Unsafely calls instance.toHex without Effect wrapper

**Signature**

```ts
export declare const toHexUnsafe: (instance: CML.ScriptDataHash) => string
```

Added in v2.0.0

## toRawBytesUnsafe

Unsafely calls instance.toRawBytes without Effect wrapper

**Signature**

```ts
export declare const toRawBytesUnsafe: (instance: CML.ScriptDataHash) => Uint8Array
```

Added in v2.0.0

# Types

## ScriptDataHash (type alias)

Type alias for the CML ScriptDataHash class

**Signature**

```ts
export type ScriptDataHash = CML.ScriptDataHash
```

Added in v2.0.0
