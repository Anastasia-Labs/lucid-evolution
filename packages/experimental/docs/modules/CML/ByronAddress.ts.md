---
title: CML/ByronAddress.ts
nav_order: 29
parent: Modules
---

## ByronAddress overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
  - [fromAddress](#fromaddress)
  - [fromAddressContent](#fromaddresscontent)
  - [fromBase58](#frombase58)
  - [fromCborBytes](#fromcborbytes)
  - [fromCborHex](#fromcborhex)
  - [isValid](#isvalid)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
  - [fromAddressContentUnsafe](#fromaddresscontentunsafe)
  - [fromAddressUnsafe](#fromaddressunsafe)
  - [fromBase58Unsafe](#frombase58unsafe)
  - [fromCborBytesUnsafe](#fromcborbytesunsafe)
  - [fromCborHexUnsafe](#fromcborhexunsafe)
  - [isValidUnsafe](#isvalidunsafe)
- [Errors](#errors)
  - [ByronAddressError (class)](#byronaddresserror-class)
- [Methods](#methods)
  - [content](#content)
  - [crc](#crc)
  - [free](#free)
  - [toAddress](#toaddress)
  - [toBase58](#tobase58)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
- [MethodsUnsafe](#methodsunsafe)
  - [contentUnsafe](#contentunsafe)
  - [crcUnsafe](#crcunsafe)
  - [freeUnsafe](#freeunsafe)
  - [toAddressUnsafe](#toaddressunsafe)
  - [toBase58Unsafe](#tobase58unsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
- [Types](#types)
  - [ByronAddress (type alias)](#byronaddress-type-alias)

---

# Constructors

## \_new

Static method \_new of ByronAddress

**Signature**

```ts
export declare const _new: (
  content: CML.AddressContent,
  crc: CML.Crc32,
) => Effect.Effect<CML.ByronAddress, ByronAddressError>;
```

Added in v2.0.0

## fromAddress

Static method fromAddress of ByronAddress

**Signature**

```ts
export declare const fromAddress: (
  addr: CML.Address,
) => Effect.Effect<CML.ByronAddress | undefined, ByronAddressError>;
```

Added in v2.0.0

## fromAddressContent

Static method fromAddressContent of ByronAddress

**Signature**

```ts
export declare const fromAddressContent: (
  addressContent: CML.AddressContent,
) => Effect.Effect<CML.ByronAddress, ByronAddressError>;
```

Added in v2.0.0

## fromBase58

Static method fromBase58 of ByronAddress

**Signature**

```ts
export declare const fromBase58: (
  s: string,
) => Effect.Effect<CML.ByronAddress, ByronAddressError>;
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of ByronAddress

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.ByronAddress, ByronAddressError>;
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of ByronAddress

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.ByronAddress, ByronAddressError>;
```

Added in v2.0.0

## isValid

Static method isValid of ByronAddress

**Signature**

```ts
export declare const isValid: (
  s: string,
) => Effect.Effect<boolean, ByronAddressError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls ByronAddress.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (
  content: CML.AddressContent,
  crc: CML.Crc32,
) => CML.ByronAddress;
```

Added in v2.0.0

## fromAddressContentUnsafe

Unsafely calls ByronAddress.fromAddressContent without Effect wrapper

**Signature**

```ts
export declare const fromAddressContentUnsafe: (
  addressContent: CML.AddressContent,
) => CML.ByronAddress;
```

Added in v2.0.0

## fromAddressUnsafe

Unsafely calls ByronAddress.fromAddress without Effect wrapper

**Signature**

```ts
export declare const fromAddressUnsafe: (
  addr: CML.Address,
) => CML.ByronAddress | undefined;
```

Added in v2.0.0

## fromBase58Unsafe

Unsafely calls ByronAddress.fromBase58 without Effect wrapper

**Signature**

```ts
export declare const fromBase58Unsafe: (s: string) => CML.ByronAddress;
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls ByronAddress.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (
  cborBytes: Uint8Array,
) => CML.ByronAddress;
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls ByronAddress.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.ByronAddress;
```

Added in v2.0.0

## isValidUnsafe

Unsafely calls ByronAddress.isValid without Effect wrapper

**Signature**

```ts
export declare const isValidUnsafe: (s: string) => boolean;
```

Added in v2.0.0

# Errors

## ByronAddressError (class)

Error class for ByronAddress operations

This error is thrown when operations on ByronAddress instances fail.

**Signature**

```ts
export declare class ByronAddressError
```

Added in v2.0.0

# Methods

## content

Method content of ByronAddress

**Signature**

```ts
export declare const content: (
  instance: CML.ByronAddress,
) => Effect.Effect<CML.AddressContent, ByronAddressError>;
```

Added in v2.0.0

## crc

Method crc of ByronAddress

**Signature**

```ts
export declare const crc: (
  instance: CML.ByronAddress,
) => Effect.Effect<CML.Crc32, ByronAddressError>;
```

Added in v2.0.0

## free

Method free of ByronAddress

**Signature**

```ts
export declare const free: (
  instance: CML.ByronAddress,
) => Effect.Effect<void, ByronAddressError>;
```

Added in v2.0.0

## toAddress

Method toAddress of ByronAddress

**Signature**

```ts
export declare const toAddress: (
  instance: CML.ByronAddress,
) => Effect.Effect<CML.Address, ByronAddressError>;
```

Added in v2.0.0

## toBase58

Method toBase58 of ByronAddress

**Signature**

```ts
export declare const toBase58: (
  instance: CML.ByronAddress,
) => Effect.Effect<string, ByronAddressError>;
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of ByronAddress

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.ByronAddress,
) => Effect.Effect<Uint8Array, ByronAddressError>;
```

Added in v2.0.0

## toCborHex

Method toCborHex of ByronAddress

**Signature**

```ts
export declare const toCborHex: (
  instance: CML.ByronAddress,
) => Effect.Effect<string, ByronAddressError>;
```

Added in v2.0.0

# MethodsUnsafe

## contentUnsafe

Unsafely calls instance.content without Effect wrapper

**Signature**

```ts
export declare const contentUnsafe: (
  instance: CML.ByronAddress,
) => CML.AddressContent;
```

Added in v2.0.0

## crcUnsafe

Unsafely calls instance.crc without Effect wrapper

**Signature**

```ts
export declare const crcUnsafe: (instance: CML.ByronAddress) => CML.Crc32;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.ByronAddress) => void;
```

Added in v2.0.0

## toAddressUnsafe

Unsafely calls instance.toAddress without Effect wrapper

**Signature**

```ts
export declare const toAddressUnsafe: (
  instance: CML.ByronAddress,
) => CML.Address;
```

Added in v2.0.0

## toBase58Unsafe

Unsafely calls instance.toBase58 without Effect wrapper

**Signature**

```ts
export declare const toBase58Unsafe: (instance: CML.ByronAddress) => string;
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (
  instance: CML.ByronAddress,
) => Uint8Array;
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.ByronAddress) => string;
```

Added in v2.0.0

# Types

## ByronAddress (type alias)

Type alias for the CML ByronAddress class

**Signature**

```ts
export type ByronAddress = CML.ByronAddress;
```

Added in v2.0.0
