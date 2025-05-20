---
title: CML/HDAddressPayload.ts
nav_order: 107
parent: Modules
---

## HDAddressPayload overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [fromCborBytes](#fromcborbytes)
  - [fromCborHex](#fromcborhex)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [fromCborBytesUnsafe](#fromcborbytesunsafe)
  - [fromCborHexUnsafe](#fromcborhexunsafe)
- [Errors](#errors)
  - [HDAddressPayloadError (class)](#hdaddresspayloaderror-class)
- [Methods](#methods)
  - [free](#free)
  - [get](#get)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
- [MethodsUnsafe](#methodsunsafe)
  - [freeUnsafe](#freeunsafe)
  - [getUnsafe](#getunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
- [Types](#types)
  - [HDAddressPayload (type alias)](#hdaddresspayload-type-alias)

---

# Constructors

## fromCborBytes

Static method fromCborBytes of HDAddressPayload

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array
) => Effect.Effect<CML.HDAddressPayload, HDAddressPayloadError>
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of HDAddressPayload

**Signature**

```ts
export declare const fromCborHex: (cborBytes: string) => Effect.Effect<CML.HDAddressPayload, HDAddressPayloadError>
```

Added in v2.0.0

# ConstructorsUnsafe

## fromCborBytesUnsafe

Unsafely calls HDAddressPayload.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (cborBytes: Uint8Array) => CML.HDAddressPayload
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls HDAddressPayload.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.HDAddressPayload
```

Added in v2.0.0

# Errors

## HDAddressPayloadError (class)

Error class for HDAddressPayload operations

This error is thrown when operations on HDAddressPayload instances fail.

**Signature**

```ts
export declare class HDAddressPayloadError
```

Added in v2.0.0

# Methods

## free

Method free of HDAddressPayload

**Signature**

```ts
export declare const free: (instance: CML.HDAddressPayload) => Effect.Effect<void, HDAddressPayloadError>
```

Added in v2.0.0

## get

Method get of HDAddressPayload

**Signature**

```ts
export declare const get: (instance: CML.HDAddressPayload) => Effect.Effect<Uint8Array, HDAddressPayloadError>
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of HDAddressPayload

**Signature**

```ts
export declare const toCborBytes: (instance: CML.HDAddressPayload) => Effect.Effect<Uint8Array, HDAddressPayloadError>
```

Added in v2.0.0

## toCborHex

Method toCborHex of HDAddressPayload

**Signature**

```ts
export declare const toCborHex: (instance: CML.HDAddressPayload) => Effect.Effect<string, HDAddressPayloadError>
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.HDAddressPayload) => void
```

Added in v2.0.0

## getUnsafe

Unsafely calls instance.get without Effect wrapper

**Signature**

```ts
export declare const getUnsafe: (instance: CML.HDAddressPayload) => Uint8Array
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (instance: CML.HDAddressPayload) => Uint8Array
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.HDAddressPayload) => string
```

Added in v2.0.0

# Types

## HDAddressPayload (type alias)

Type alias for the CML HDAddressPayload class

**Signature**

```ts
export type HDAddressPayload = CML.HDAddressPayload
```

Added in v2.0.0
