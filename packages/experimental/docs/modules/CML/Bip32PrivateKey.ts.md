---
title: CML/Bip32PrivateKey.ts
nav_order: 15
parent: Modules
---

## Bip32PrivateKey overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [fromBech32](#frombech32)
  - [fromBip39Entropy](#frombip39entropy)
  - [fromRawBytes](#fromrawbytes)
  - [from_128Xprv](#from_128xprv)
  - [generateEd25519Bip32](#generateed25519bip32)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [fromBech32Unsafe](#frombech32unsafe)
  - [fromBip39EntropyUnsafe](#frombip39entropyunsafe)
  - [fromRawBytesUnsafe](#fromrawbytesunsafe)
  - [from_128XprvUnsafe](#from_128xprvunsafe)
  - [generateEd25519Bip32Unsafe](#generateed25519bip32unsafe)
- [Errors](#errors)
  - [Bip32PrivateKeyError (class)](#bip32privatekeyerror-class)
- [Methods](#methods)
  - [chaincode](#chaincode)
  - [derive](#derive)
  - [free](#free)
  - [toBech32](#tobech32)
  - [toPublic](#topublic)
  - [toRawBytes](#torawbytes)
  - [toRawKey](#torawkey)
  - [to_128Xprv](#to_128xprv)
- [MethodsUnsafe](#methodsunsafe)
  - [chaincodeUnsafe](#chaincodeunsafe)
  - [deriveUnsafe](#deriveunsafe)
  - [freeUnsafe](#freeunsafe)
  - [toBech32Unsafe](#tobech32unsafe)
  - [toPublicUnsafe](#topublicunsafe)
  - [toRawBytesUnsafe](#torawbytesunsafe)
  - [toRawKeyUnsafe](#torawkeyunsafe)
  - [to_128XprvUnsafe](#to_128xprvunsafe)
- [Types](#types)
  - [Bip32PrivateKey (type alias)](#bip32privatekey-type-alias)

---

# Constructors

## fromBech32

Static method fromBech32 of Bip32PrivateKey

**Signature**

```ts
export declare const fromBech32: (bech32Str: string) => Effect.Effect<CML.Bip32PrivateKey, Bip32PrivateKeyError>
```

Added in v2.0.0

## fromBip39Entropy

Static method fromBip39Entropy of Bip32PrivateKey

**Signature**

```ts
export declare const fromBip39Entropy: (
  entropy: Uint8Array,
  password: Uint8Array
) => Effect.Effect<CML.Bip32PrivateKey, Bip32PrivateKeyError>
```

Added in v2.0.0

## fromRawBytes

Static method fromRawBytes of Bip32PrivateKey

**Signature**

```ts
export declare const fromRawBytes: (bytes: Uint8Array) => Effect.Effect<CML.Bip32PrivateKey, Bip32PrivateKeyError>
```

Added in v2.0.0

## from_128Xprv

Static method from_128Xprv of Bip32PrivateKey

**Signature**

```ts
export declare const from_128Xprv: (bytes: Uint8Array) => Effect.Effect<CML.Bip32PrivateKey, Bip32PrivateKeyError>
```

Added in v2.0.0

## generateEd25519Bip32

Static method generateEd25519Bip32 of Bip32PrivateKey

**Signature**

```ts
export declare const generateEd25519Bip32: () => Effect.Effect<CML.Bip32PrivateKey, Bip32PrivateKeyError>
```

Added in v2.0.0

# ConstructorsUnsafe

## fromBech32Unsafe

Unsafely calls Bip32PrivateKey.fromBech32 without Effect wrapper

**Signature**

```ts
export declare const fromBech32Unsafe: (bech32Str: string) => CML.Bip32PrivateKey
```

Added in v2.0.0

## fromBip39EntropyUnsafe

Unsafely calls Bip32PrivateKey.fromBip39Entropy without Effect wrapper

**Signature**

```ts
export declare const fromBip39EntropyUnsafe: (entropy: Uint8Array, password: Uint8Array) => CML.Bip32PrivateKey
```

Added in v2.0.0

## fromRawBytesUnsafe

Unsafely calls Bip32PrivateKey.fromRawBytes without Effect wrapper

**Signature**

```ts
export declare const fromRawBytesUnsafe: (bytes: Uint8Array) => CML.Bip32PrivateKey
```

Added in v2.0.0

## from_128XprvUnsafe

Unsafely calls Bip32PrivateKey.from_128Xprv without Effect wrapper

**Signature**

```ts
export declare const from_128XprvUnsafe: (bytes: Uint8Array) => CML.Bip32PrivateKey
```

Added in v2.0.0

## generateEd25519Bip32Unsafe

Unsafely calls Bip32PrivateKey.generateEd25519Bip32 without Effect wrapper

**Signature**

```ts
export declare const generateEd25519Bip32Unsafe: () => CML.Bip32PrivateKey
```

Added in v2.0.0

# Errors

## Bip32PrivateKeyError (class)

Error class for Bip32PrivateKey operations

This error is thrown when operations on Bip32PrivateKey instances fail.

**Signature**

```ts
export declare class Bip32PrivateKeyError
```

Added in v2.0.0

# Methods

## chaincode

Method chaincode of Bip32PrivateKey

**Signature**

```ts
export declare const chaincode: (instance: CML.Bip32PrivateKey) => Effect.Effect<Uint8Array, Bip32PrivateKeyError>
```

Added in v2.0.0

## derive

Method derive of Bip32PrivateKey

**Signature**

```ts
export declare const derive: (
  instance: CML.Bip32PrivateKey,
  index: number
) => Effect.Effect<CML.Bip32PrivateKey, Bip32PrivateKeyError>
```

Added in v2.0.0

## free

Method free of Bip32PrivateKey

**Signature**

```ts
export declare const free: (instance: CML.Bip32PrivateKey) => Effect.Effect<void, Bip32PrivateKeyError>
```

Added in v2.0.0

## toBech32

Method toBech32 of Bip32PrivateKey

**Signature**

```ts
export declare const toBech32: (instance: CML.Bip32PrivateKey) => Effect.Effect<string, Bip32PrivateKeyError>
```

Added in v2.0.0

## toPublic

Method toPublic of Bip32PrivateKey

**Signature**

```ts
export declare const toPublic: (
  instance: CML.Bip32PrivateKey
) => Effect.Effect<CML.Bip32PublicKey, Bip32PrivateKeyError>
```

Added in v2.0.0

## toRawBytes

Method toRawBytes of Bip32PrivateKey

**Signature**

```ts
export declare const toRawBytes: (instance: CML.Bip32PrivateKey) => Effect.Effect<Uint8Array, Bip32PrivateKeyError>
```

Added in v2.0.0

## toRawKey

Method toRawKey of Bip32PrivateKey

**Signature**

```ts
export declare const toRawKey: (instance: CML.Bip32PrivateKey) => Effect.Effect<CML.PrivateKey, Bip32PrivateKeyError>
```

Added in v2.0.0

## to_128Xprv

Method to_128Xprv of Bip32PrivateKey

**Signature**

```ts
export declare const to_128Xprv: (instance: CML.Bip32PrivateKey) => Effect.Effect<Uint8Array, Bip32PrivateKeyError>
```

Added in v2.0.0

# MethodsUnsafe

## chaincodeUnsafe

Unsafely calls instance.chaincode without Effect wrapper

**Signature**

```ts
export declare const chaincodeUnsafe: (instance: CML.Bip32PrivateKey) => Uint8Array
```

Added in v2.0.0

## deriveUnsafe

Unsafely calls instance.derive without Effect wrapper

**Signature**

```ts
export declare const deriveUnsafe: (instance: CML.Bip32PrivateKey, index: number) => CML.Bip32PrivateKey
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.Bip32PrivateKey) => void
```

Added in v2.0.0

## toBech32Unsafe

Unsafely calls instance.toBech32 without Effect wrapper

**Signature**

```ts
export declare const toBech32Unsafe: (instance: CML.Bip32PrivateKey) => string
```

Added in v2.0.0

## toPublicUnsafe

Unsafely calls instance.toPublic without Effect wrapper

**Signature**

```ts
export declare const toPublicUnsafe: (instance: CML.Bip32PrivateKey) => CML.Bip32PublicKey
```

Added in v2.0.0

## toRawBytesUnsafe

Unsafely calls instance.toRawBytes without Effect wrapper

**Signature**

```ts
export declare const toRawBytesUnsafe: (instance: CML.Bip32PrivateKey) => Uint8Array
```

Added in v2.0.0

## toRawKeyUnsafe

Unsafely calls instance.toRawKey without Effect wrapper

**Signature**

```ts
export declare const toRawKeyUnsafe: (instance: CML.Bip32PrivateKey) => CML.PrivateKey
```

Added in v2.0.0

## to_128XprvUnsafe

Unsafely calls instance.to_128Xprv without Effect wrapper

**Signature**

```ts
export declare const to_128XprvUnsafe: (instance: CML.Bip32PrivateKey) => Uint8Array
```

Added in v2.0.0

# Types

## Bip32PrivateKey (type alias)

Type alias for the CML Bip32PrivateKey class

**Signature**

```ts
export type Bip32PrivateKey = CML.Bip32PrivateKey
```

Added in v2.0.0
