---
title: CML/LegacyDaedalusPrivateKey.ts
nav_order: 118
parent: Modules
---

## LegacyDaedalusPrivateKey overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Errors](#errors)
  - [LegacyDaedalusPrivateKeyError (class)](#legacydaedalusprivatekeyerror-class)
- [Methods](#methods)
  - [chaincode](#chaincode)
  - [free](#free)
- [MethodsUnsafe](#methodsunsafe)
  - [chaincodeUnsafe](#chaincodeunsafe)
  - [freeUnsafe](#freeunsafe)
- [Types](#types)
  - [LegacyDaedalusPrivateKey (type alias)](#legacydaedalusprivatekey-type-alias)

---

# Errors

## LegacyDaedalusPrivateKeyError (class)

Error class for LegacyDaedalusPrivateKey operations

This error is thrown when operations on LegacyDaedalusPrivateKey instances fail.

**Signature**

```ts
export declare class LegacyDaedalusPrivateKeyError
```

Added in v2.0.0

# Methods

## chaincode

Method chaincode of LegacyDaedalusPrivateKey

**Signature**

```ts
export declare const chaincode: (
  instance: CML.LegacyDaedalusPrivateKey
) => Effect.Effect<Uint8Array, LegacyDaedalusPrivateKeyError>
```

Added in v2.0.0

## free

Method free of LegacyDaedalusPrivateKey

**Signature**

```ts
export declare const free: (
  instance: CML.LegacyDaedalusPrivateKey
) => Effect.Effect<void, LegacyDaedalusPrivateKeyError>
```

Added in v2.0.0

# MethodsUnsafe

## chaincodeUnsafe

Unsafely calls instance.chaincode without Effect wrapper

**Signature**

```ts
export declare const chaincodeUnsafe: (instance: CML.LegacyDaedalusPrivateKey) => Uint8Array
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.LegacyDaedalusPrivateKey) => void
```

Added in v2.0.0

# Types

## LegacyDaedalusPrivateKey (type alias)

Type alias for the CML LegacyDaedalusPrivateKey class

**Signature**

```ts
export type LegacyDaedalusPrivateKey = CML.LegacyDaedalusPrivateKey
```

Added in v2.0.0
