---
title: CML/EnterpriseAddress.ts
nav_order: 61
parent: Modules
---

## EnterpriseAddress overview

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
  - [EnterpriseAddressError (class)](#enterpriseaddresserror-class)
- [Methods](#methods)
  - [free](#free)
  - [networkId](#networkid)
  - [payment](#payment)
  - [toAddress](#toaddress)
- [MethodsUnsafe](#methodsunsafe)
  - [freeUnsafe](#freeunsafe)
  - [networkIdUnsafe](#networkidunsafe)
  - [paymentUnsafe](#paymentunsafe)
  - [toAddressUnsafe](#toaddressunsafe)
- [Types](#types)
  - [EnterpriseAddress (type alias)](#enterpriseaddress-type-alias)

---

# Constructors

## \_new

Static method \_new of EnterpriseAddress

**Signature**

```ts
export declare const _new: (
  network: number,
  payment: CML.Credential,
) => Effect.Effect<CML.EnterpriseAddress, EnterpriseAddressError>;
```

Added in v2.0.0

## fromAddress

Static method fromAddress of EnterpriseAddress

**Signature**

```ts
export declare const fromAddress: (
  address: CML.Address,
) => Effect.Effect<CML.EnterpriseAddress | undefined, EnterpriseAddressError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls EnterpriseAddress.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (
  network: number,
  payment: CML.Credential,
) => CML.EnterpriseAddress;
```

Added in v2.0.0

## fromAddressUnsafe

Unsafely calls EnterpriseAddress.fromAddress without Effect wrapper

**Signature**

```ts
export declare const fromAddressUnsafe: (
  address: CML.Address,
) => CML.EnterpriseAddress | undefined;
```

Added in v2.0.0

# Errors

## EnterpriseAddressError (class)

Error class for EnterpriseAddress operations

This error is thrown when operations on EnterpriseAddress instances fail.

**Signature**

```ts
export declare class EnterpriseAddressError
```

Added in v2.0.0

# Methods

## free

Method free of EnterpriseAddress

**Signature**

```ts
export declare const free: (
  instance: CML.EnterpriseAddress,
) => Effect.Effect<void, EnterpriseAddressError>;
```

Added in v2.0.0

## networkId

Method networkId of EnterpriseAddress

**Signature**

```ts
export declare const networkId: (
  instance: CML.EnterpriseAddress,
) => Effect.Effect<number, EnterpriseAddressError>;
```

Added in v2.0.0

## payment

Method payment of EnterpriseAddress

**Signature**

```ts
export declare const payment: (
  instance: CML.EnterpriseAddress,
) => Effect.Effect<CML.Credential, EnterpriseAddressError>;
```

Added in v2.0.0

## toAddress

Method toAddress of EnterpriseAddress

**Signature**

```ts
export declare const toAddress: (
  instance: CML.EnterpriseAddress,
) => Effect.Effect<CML.Address, EnterpriseAddressError>;
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.EnterpriseAddress) => void;
```

Added in v2.0.0

## networkIdUnsafe

Unsafely calls instance.networkId without Effect wrapper

**Signature**

```ts
export declare const networkIdUnsafe: (
  instance: CML.EnterpriseAddress,
) => number;
```

Added in v2.0.0

## paymentUnsafe

Unsafely calls instance.payment without Effect wrapper

**Signature**

```ts
export declare const paymentUnsafe: (
  instance: CML.EnterpriseAddress,
) => CML.Credential;
```

Added in v2.0.0

## toAddressUnsafe

Unsafely calls instance.toAddress without Effect wrapper

**Signature**

```ts
export declare const toAddressUnsafe: (
  instance: CML.EnterpriseAddress,
) => CML.Address;
```

Added in v2.0.0

# Types

## EnterpriseAddress (type alias)

Type alias for the CML EnterpriseAddress class

**Signature**

```ts
export type EnterpriseAddress = CML.EnterpriseAddress;
```

Added in v2.0.0
