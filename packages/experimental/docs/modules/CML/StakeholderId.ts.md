---
title: CML/StakeholderId.ts
nav_order: 221
parent: Modules
---

## StakeholderId overview

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
  - [StakeholderIdError (class)](#stakeholderiderror-class)
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
  - [StakeholderId (type alias)](#stakeholderid-type-alias)

---

# Constructors

## \_new

Static method \_new of StakeholderId

**Signature**

```ts
export declare const _new: (pubk: CML.Bip32PublicKey) => Effect.Effect<CML.StakeholderId, StakeholderIdError>
```

Added in v2.0.0

## fromBech32

Static method fromBech32 of StakeholderId

**Signature**

```ts
export declare const fromBech32: (bech32Str: string) => Effect.Effect<CML.StakeholderId, StakeholderIdError>
```

Added in v2.0.0

## fromHex

Static method fromHex of StakeholderId

**Signature**

```ts
export declare const fromHex: (input: string) => Effect.Effect<CML.StakeholderId, StakeholderIdError>
```

Added in v2.0.0

## fromRawBytes

Static method fromRawBytes of StakeholderId

**Signature**

```ts
export declare const fromRawBytes: (bytes: Uint8Array) => Effect.Effect<CML.StakeholderId, StakeholderIdError>
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls StakeholderId.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (pubk: CML.Bip32PublicKey) => CML.StakeholderId
```

Added in v2.0.0

## fromBech32Unsafe

Unsafely calls StakeholderId.fromBech32 without Effect wrapper

**Signature**

```ts
export declare const fromBech32Unsafe: (bech32Str: string) => CML.StakeholderId
```

Added in v2.0.0

## fromHexUnsafe

Unsafely calls StakeholderId.fromHex without Effect wrapper

**Signature**

```ts
export declare const fromHexUnsafe: (input: string) => CML.StakeholderId
```

Added in v2.0.0

## fromRawBytesUnsafe

Unsafely calls StakeholderId.fromRawBytes without Effect wrapper

**Signature**

```ts
export declare const fromRawBytesUnsafe: (bytes: Uint8Array) => CML.StakeholderId
```

Added in v2.0.0

# Errors

## StakeholderIdError (class)

Error class for StakeholderId operations

This error is thrown when operations on StakeholderId instances fail.

**Signature**

```ts
export declare class StakeholderIdError
```

Added in v2.0.0

# Methods

## free

Method free of StakeholderId

**Signature**

```ts
export declare const free: (instance: CML.StakeholderId) => Effect.Effect<void, StakeholderIdError>
```

Added in v2.0.0

## toBech32

Method toBech32 of StakeholderId

**Signature**

```ts
export declare const toBech32: (
  instance: CML.StakeholderId,
  prefix: string
) => Effect.Effect<string, StakeholderIdError>
```

Added in v2.0.0

## toHex

Method toHex of StakeholderId

**Signature**

```ts
export declare const toHex: (instance: CML.StakeholderId) => Effect.Effect<string, StakeholderIdError>
```

Added in v2.0.0

## toRawBytes

Method toRawBytes of StakeholderId

**Signature**

```ts
export declare const toRawBytes: (instance: CML.StakeholderId) => Effect.Effect<Uint8Array, StakeholderIdError>
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.StakeholderId) => void
```

Added in v2.0.0

## toBech32Unsafe

Unsafely calls instance.toBech32 without Effect wrapper

**Signature**

```ts
export declare const toBech32Unsafe: (instance: CML.StakeholderId, prefix: string) => string
```

Added in v2.0.0

## toHexUnsafe

Unsafely calls instance.toHex without Effect wrapper

**Signature**

```ts
export declare const toHexUnsafe: (instance: CML.StakeholderId) => string
```

Added in v2.0.0

## toRawBytesUnsafe

Unsafely calls instance.toRawBytes without Effect wrapper

**Signature**

```ts
export declare const toRawBytesUnsafe: (instance: CML.StakeholderId) => Uint8Array
```

Added in v2.0.0

# Types

## StakeholderId (type alias)

Type alias for the CML StakeholderId class

**Signature**

```ts
export type StakeholderId = CML.StakeholderId
```

Added in v2.0.0
