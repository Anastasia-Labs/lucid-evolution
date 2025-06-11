---
title: CML/AddressId.ts
nav_order: 10
parent: Modules
---

## AddressId overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
  - [fromBech32](#frombech32)
  - [fromHex](#fromhex)
  - [fromRawBytes](#fromrawbytes)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
  - [fromBech32Unsafe](#frombech32unsafe)
  - [fromHexUnsafe](#fromhexunsafe)
  - [fromRawBytesUnsafe](#fromrawbytesunsafe)
- [Errors](#errors)
  - [AddressIdError (class)](#addressiderror-class)
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
  - [AddressId (type alias)](#addressid-type-alias)

---

# Constructors

## \_new

Static method \_new of AddressId

**Signature**

```ts
export declare const _new: (
  addrType: CML.ByronAddrType,
  spendingData: CML.SpendingData,
  attrs: CML.AddrAttributes
) => Effect.Effect<CML.AddressId, AddressIdError>
```

Added in v2.0.0

## fromBech32

Static method fromBech32 of AddressId

**Signature**

```ts
export declare const fromBech32: (bech32Str: string) => Effect.Effect<CML.AddressId, AddressIdError>
```

Added in v2.0.0

## fromHex

Static method fromHex of AddressId

**Signature**

```ts
export declare const fromHex: (input: string) => Effect.Effect<CML.AddressId, AddressIdError>
```

Added in v2.0.0

## fromRawBytes

Static method fromRawBytes of AddressId

**Signature**

```ts
export declare const fromRawBytes: (bytes: Uint8Array) => Effect.Effect<CML.AddressId, AddressIdError>
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls AddressId.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (
  addrType: CML.ByronAddrType,
  spendingData: CML.SpendingData,
  attrs: CML.AddrAttributes
) => CML.AddressId
```

Added in v2.0.0

## fromBech32Unsafe

Unsafely calls AddressId.fromBech32 without Effect wrapper

**Signature**

```ts
export declare const fromBech32Unsafe: (bech32Str: string) => CML.AddressId
```

Added in v2.0.0

## fromHexUnsafe

Unsafely calls AddressId.fromHex without Effect wrapper

**Signature**

```ts
export declare const fromHexUnsafe: (input: string) => CML.AddressId
```

Added in v2.0.0

## fromRawBytesUnsafe

Unsafely calls AddressId.fromRawBytes without Effect wrapper

**Signature**

```ts
export declare const fromRawBytesUnsafe: (bytes: Uint8Array) => CML.AddressId
```

Added in v2.0.0

# Errors

## AddressIdError (class)

Error class for AddressId operations

This error is thrown when operations on AddressId instances fail.

**Signature**

```ts
export declare class AddressIdError
```

Added in v2.0.0

# Methods

## free

Method free of AddressId

**Signature**

```ts
export declare const free: (instance: CML.AddressId) => Effect.Effect<void, AddressIdError>
```

Added in v2.0.0

## toBech32

Method toBech32 of AddressId

**Signature**

```ts
export declare const toBech32: (instance: CML.AddressId, prefix: string) => Effect.Effect<string, AddressIdError>
```

Added in v2.0.0

## toHex

Method toHex of AddressId

**Signature**

```ts
export declare const toHex: (instance: CML.AddressId) => Effect.Effect<string, AddressIdError>
```

Added in v2.0.0

## toRawBytes

Method toRawBytes of AddressId

**Signature**

```ts
export declare const toRawBytes: (instance: CML.AddressId) => Effect.Effect<Uint8Array, AddressIdError>
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.AddressId) => void
```

Added in v2.0.0

## toBech32Unsafe

Unsafely calls instance.toBech32 without Effect wrapper

**Signature**

```ts
export declare const toBech32Unsafe: (instance: CML.AddressId, prefix: string) => string
```

Added in v2.0.0

## toHexUnsafe

Unsafely calls instance.toHex without Effect wrapper

**Signature**

```ts
export declare const toHexUnsafe: (instance: CML.AddressId) => string
```

Added in v2.0.0

## toRawBytesUnsafe

Unsafely calls instance.toRawBytes without Effect wrapper

**Signature**

```ts
export declare const toRawBytesUnsafe: (instance: CML.AddressId) => Uint8Array
```

Added in v2.0.0

# Types

## AddressId (type alias)

Type alias for the CML AddressId class

**Signature**

```ts
export type AddressId = CML.AddressId
```

Added in v2.0.0
