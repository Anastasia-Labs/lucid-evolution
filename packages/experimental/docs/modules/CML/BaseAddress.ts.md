---
title: CML/BaseAddress.ts
nav_order: 19
parent: Modules
---

## BaseAddress overview

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
  - [BaseAddressError (class)](#baseaddresserror-class)
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
  - [BaseAddress (type alias)](#baseaddress-type-alias)

---

# Constructors

## \_new

Static method \_new of BaseAddress

**Signature**

```ts
export declare const _new: (
  network: number,
  payment: CML.Credential,
  stake: CML.Credential,
) => Effect.Effect<CML.BaseAddress, BaseAddressError>;
```

Added in v2.0.0

## fromAddress

Static method fromAddress of BaseAddress

**Signature**

```ts
export declare const fromAddress: (
  address: CML.Address,
) => Effect.Effect<CML.BaseAddress | undefined, BaseAddressError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls BaseAddress.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (
  network: number,
  payment: CML.Credential,
  stake: CML.Credential,
) => CML.BaseAddress;
```

Added in v2.0.0

## fromAddressUnsafe

Unsafely calls BaseAddress.fromAddress without Effect wrapper

**Signature**

```ts
export declare const fromAddressUnsafe: (
  address: CML.Address,
) => CML.BaseAddress | undefined;
```

Added in v2.0.0

# Errors

## BaseAddressError (class)

Error class for BaseAddress operations

This error is thrown when operations on BaseAddress instances fail.

**Signature**

```ts
export declare class BaseAddressError
```

Added in v2.0.0

# Methods

## free

Method free of BaseAddress

**Signature**

```ts
export declare const free: (
  instance: CML.BaseAddress,
) => Effect.Effect<void, BaseAddressError>;
```

Added in v2.0.0

## networkId

Method networkId of BaseAddress

**Signature**

```ts
export declare const networkId: (
  instance: CML.BaseAddress,
) => Effect.Effect<number, BaseAddressError>;
```

Added in v2.0.0

## payment

Method payment of BaseAddress

**Signature**

```ts
export declare const payment: (
  instance: CML.BaseAddress,
) => Effect.Effect<CML.Credential, BaseAddressError>;
```

Added in v2.0.0

## stake

Method stake of BaseAddress

**Signature**

```ts
export declare const stake: (
  instance: CML.BaseAddress,
) => Effect.Effect<CML.Credential, BaseAddressError>;
```

Added in v2.0.0

## toAddress

Method toAddress of BaseAddress

**Signature**

```ts
export declare const toAddress: (
  instance: CML.BaseAddress,
) => Effect.Effect<CML.Address, BaseAddressError>;
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.BaseAddress) => void;
```

Added in v2.0.0

## networkIdUnsafe

Unsafely calls instance.networkId without Effect wrapper

**Signature**

```ts
export declare const networkIdUnsafe: (instance: CML.BaseAddress) => number;
```

Added in v2.0.0

## paymentUnsafe

Unsafely calls instance.payment without Effect wrapper

**Signature**

```ts
export declare const paymentUnsafe: (
  instance: CML.BaseAddress,
) => CML.Credential;
```

Added in v2.0.0

## stakeUnsafe

Unsafely calls instance.stake without Effect wrapper

**Signature**

```ts
export declare const stakeUnsafe: (instance: CML.BaseAddress) => CML.Credential;
```

Added in v2.0.0

## toAddressUnsafe

Unsafely calls instance.toAddress without Effect wrapper

**Signature**

```ts
export declare const toAddressUnsafe: (
  instance: CML.BaseAddress,
) => CML.Address;
```

Added in v2.0.0

# Types

## BaseAddress (type alias)

Type alias for the CML BaseAddress class

**Signature**

```ts
export type BaseAddress = CML.BaseAddress;
```

Added in v2.0.0
