---
title: CML/Bip32PublicKey.ts
nav_order: 16
parent: Modules
---

## Bip32PublicKey overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [fromBech32](#frombech32)
  - [fromRawBytes](#fromrawbytes)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [fromBech32Unsafe](#frombech32unsafe)
  - [fromRawBytesUnsafe](#fromrawbytesunsafe)
- [Errors](#errors)
  - [Bip32PublicKeyError (class)](#bip32publickeyerror-class)
- [Methods](#methods)
  - [chaincode](#chaincode)
  - [derive](#derive)
  - [free](#free)
  - [toBech32](#tobech32)
  - [toRawBytes](#torawbytes)
  - [toRawKey](#torawkey)
- [MethodsUnsafe](#methodsunsafe)
  - [chaincodeUnsafe](#chaincodeunsafe)
  - [deriveUnsafe](#deriveunsafe)
  - [freeUnsafe](#freeunsafe)
  - [toBech32Unsafe](#tobech32unsafe)
  - [toRawBytesUnsafe](#torawbytesunsafe)
  - [toRawKeyUnsafe](#torawkeyunsafe)
- [Types](#types)
  - [Bip32PublicKey (type alias)](#bip32publickey-type-alias)

---

# Constructors

## fromBech32

Static method fromBech32 of Bip32PublicKey

**Signature**

```ts
export declare const fromBech32: (bech32Str: string) => Effect.Effect<CML.Bip32PublicKey, Bip32PublicKeyError>
```

Added in v2.0.0

## fromRawBytes

Static method fromRawBytes of Bip32PublicKey

**Signature**

```ts
export declare const fromRawBytes: (bytes: Uint8Array) => Effect.Effect<CML.Bip32PublicKey, Bip32PublicKeyError>
```

Added in v2.0.0

# ConstructorsUnsafe

## fromBech32Unsafe

Unsafely calls Bip32PublicKey.fromBech32 without Effect wrapper

**Signature**

```ts
export declare const fromBech32Unsafe: (bech32Str: string) => CML.Bip32PublicKey
```

Added in v2.0.0

## fromRawBytesUnsafe

Unsafely calls Bip32PublicKey.fromRawBytes without Effect wrapper

**Signature**

```ts
export declare const fromRawBytesUnsafe: (bytes: Uint8Array) => CML.Bip32PublicKey
```

Added in v2.0.0

# Errors

## Bip32PublicKeyError (class)

Error class for Bip32PublicKey operations

This error is thrown when operations on Bip32PublicKey instances fail.

**Signature**

```ts
export declare class Bip32PublicKeyError
```

Added in v2.0.0

# Methods

## chaincode

Method chaincode of Bip32PublicKey

**Signature**

```ts
export declare const chaincode: (instance: CML.Bip32PublicKey) => Effect.Effect<Uint8Array, Bip32PublicKeyError>
```

Added in v2.0.0

## derive

Method derive of Bip32PublicKey

**Signature**

```ts
export declare const derive: (
  instance: CML.Bip32PublicKey,
  index: number
) => Effect.Effect<CML.Bip32PublicKey, Bip32PublicKeyError>
```

Added in v2.0.0

## free

Method free of Bip32PublicKey

**Signature**

```ts
export declare const free: (instance: CML.Bip32PublicKey) => Effect.Effect<void, Bip32PublicKeyError>
```

Added in v2.0.0

## toBech32

Method toBech32 of Bip32PublicKey

**Signature**

```ts
export declare const toBech32: (instance: CML.Bip32PublicKey) => Effect.Effect<string, Bip32PublicKeyError>
```

Added in v2.0.0

## toRawBytes

Method toRawBytes of Bip32PublicKey

**Signature**

```ts
export declare const toRawBytes: (instance: CML.Bip32PublicKey) => Effect.Effect<Uint8Array, Bip32PublicKeyError>
```

Added in v2.0.0

## toRawKey

Method toRawKey of Bip32PublicKey

**Signature**

```ts
export declare const toRawKey: (instance: CML.Bip32PublicKey) => Effect.Effect<CML.PublicKey, Bip32PublicKeyError>
```

Added in v2.0.0

# MethodsUnsafe

## chaincodeUnsafe

Unsafely calls instance.chaincode without Effect wrapper

**Signature**

```ts
export declare const chaincodeUnsafe: (instance: CML.Bip32PublicKey) => Uint8Array
```

Added in v2.0.0

## deriveUnsafe

Unsafely calls instance.derive without Effect wrapper

**Signature**

```ts
export declare const deriveUnsafe: (instance: CML.Bip32PublicKey, index: number) => CML.Bip32PublicKey
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.Bip32PublicKey) => void
```

Added in v2.0.0

## toBech32Unsafe

Unsafely calls instance.toBech32 without Effect wrapper

**Signature**

```ts
export declare const toBech32Unsafe: (instance: CML.Bip32PublicKey) => string
```

Added in v2.0.0

## toRawBytesUnsafe

Unsafely calls instance.toRawBytes without Effect wrapper

**Signature**

```ts
export declare const toRawBytesUnsafe: (instance: CML.Bip32PublicKey) => Uint8Array
```

Added in v2.0.0

## toRawKeyUnsafe

Unsafely calls instance.toRawKey without Effect wrapper

**Signature**

```ts
export declare const toRawKeyUnsafe: (instance: CML.Bip32PublicKey) => CML.PublicKey
```

Added in v2.0.0

# Types

## Bip32PublicKey (type alias)

Type alias for the CML Bip32PublicKey class

**Signature**

```ts
export type Bip32PublicKey = CML.Bip32PublicKey
```

Added in v2.0.0
