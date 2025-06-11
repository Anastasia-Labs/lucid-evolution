---
title: CML/PointerAddress.ts
nav_order: 165
parent: Modules
---

## PointerAddress overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
  - [fromAddress](#fromaddress)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
  - [fromAddressUnsafe](#fromaddressunsafe)
- [Errors](#errors)
  - [PointerAddressError (class)](#pointeraddresserror-class)
- [Methods](#methods)
  - [free](#free)
  - [networkId](#networkid)
  - [payment](#payment)
  - [stake](#stake)
  - [toAddress](#toaddress)
- [MethodsUnsafe](#methodsunsafe)
  - [freeUnsafe](#freeunsafe)
  - [networkIdUnsafe](#networkidunsafe)
  - [paymentUnsafe](#paymentunsafe)
  - [stakeUnsafe](#stakeunsafe)
  - [toAddressUnsafe](#toaddressunsafe)
- [Types](#types)
  - [PointerAddress (type alias)](#pointeraddress-type-alias)

---

# Constructors

## \_new

Static method \_new of PointerAddress

**Signature**

```ts
export declare const _new: (
  network: number,
  payment: CML.Credential,
  stake: CML.Pointer
) => Effect.Effect<CML.PointerAddress, PointerAddressError>
```

Added in v2.0.0

## fromAddress

Static method fromAddress of PointerAddress

**Signature**

```ts
export declare const fromAddress: (
  address: CML.Address
) => Effect.Effect<CML.PointerAddress | undefined, PointerAddressError>
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls PointerAddress.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (network: number, payment: CML.Credential, stake: CML.Pointer) => CML.PointerAddress
```

Added in v2.0.0

## fromAddressUnsafe

Unsafely calls PointerAddress.fromAddress without Effect wrapper

**Signature**

```ts
export declare const fromAddressUnsafe: (address: CML.Address) => CML.PointerAddress | undefined
```

Added in v2.0.0

# Errors

## PointerAddressError (class)

Error class for PointerAddress operations

This error is thrown when operations on PointerAddress instances fail.

**Signature**

```ts
export declare class PointerAddressError
```

Added in v2.0.0

# Methods

## free

Method free of PointerAddress

**Signature**

```ts
export declare const free: (instance: CML.PointerAddress) => Effect.Effect<void, PointerAddressError>
```

Added in v2.0.0

## networkId

Method networkId of PointerAddress

**Signature**

```ts
export declare const networkId: (instance: CML.PointerAddress) => Effect.Effect<number, PointerAddressError>
```

Added in v2.0.0

## payment

Method payment of PointerAddress

**Signature**

```ts
export declare const payment: (instance: CML.PointerAddress) => Effect.Effect<CML.Credential, PointerAddressError>
```

Added in v2.0.0

## stake

Method stake of PointerAddress

**Signature**

```ts
export declare const stake: (instance: CML.PointerAddress) => Effect.Effect<CML.Pointer, PointerAddressError>
```

Added in v2.0.0

## toAddress

Method toAddress of PointerAddress

**Signature**

```ts
export declare const toAddress: (instance: CML.PointerAddress) => Effect.Effect<CML.Address, PointerAddressError>
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.PointerAddress) => void
```

Added in v2.0.0

## networkIdUnsafe

Unsafely calls instance.networkId without Effect wrapper

**Signature**

```ts
export declare const networkIdUnsafe: (instance: CML.PointerAddress) => number
```

Added in v2.0.0

## paymentUnsafe

Unsafely calls instance.payment without Effect wrapper

**Signature**

```ts
export declare const paymentUnsafe: (instance: CML.PointerAddress) => CML.Credential
```

Added in v2.0.0

## stakeUnsafe

Unsafely calls instance.stake without Effect wrapper

**Signature**

```ts
export declare const stakeUnsafe: (instance: CML.PointerAddress) => CML.Pointer
```

Added in v2.0.0

## toAddressUnsafe

Unsafely calls instance.toAddress without Effect wrapper

**Signature**

```ts
export declare const toAddressUnsafe: (instance: CML.PointerAddress) => CML.Address
```

Added in v2.0.0

# Types

## PointerAddress (type alias)

Type alias for the CML PointerAddress class

**Signature**

```ts
export type PointerAddress = CML.PointerAddress
```

Added in v2.0.0
