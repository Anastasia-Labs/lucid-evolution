---
title: CML/RewardAddress.ts
nav_order: 192
parent: Modules
---

## RewardAddress overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
  - [fromAddress](#fromaddress)
  - [fromJson](#fromjson)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
  - [fromAddressUnsafe](#fromaddressunsafe)
  - [fromJsonUnsafe](#fromjsonunsafe)
- [Errors](#errors)
  - [RewardAddressError (class)](#rewardaddresserror-class)
- [Methods](#methods)
  - [free](#free)
  - [networkId](#networkid)
  - [payment](#payment)
  - [toAddress](#toaddress)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
- [MethodsUnsafe](#methodsunsafe)
  - [freeUnsafe](#freeunsafe)
  - [networkIdUnsafe](#networkidunsafe)
  - [paymentUnsafe](#paymentunsafe)
  - [toAddressUnsafe](#toaddressunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
- [Types](#types)
  - [RewardAddress (type alias)](#rewardaddress-type-alias)

---

# Constructors

## \_new

Static method \_new of RewardAddress

**Signature**

```ts
export declare const _new: (
  network: number,
  payment: CML.Credential,
) => Effect.Effect<CML.RewardAddress, RewardAddressError>;
```

Added in v2.0.0

## fromAddress

Static method fromAddress of RewardAddress

**Signature**

```ts
export declare const fromAddress: (
  address: CML.Address,
) => Effect.Effect<CML.RewardAddress | undefined, RewardAddressError>;
```

Added in v2.0.0

## fromJson

Static method fromJson of RewardAddress

**Signature**

```ts
export declare const fromJson: (
  json: string,
) => Effect.Effect<CML.RewardAddress, RewardAddressError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls RewardAddress.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (
  network: number,
  payment: CML.Credential,
) => CML.RewardAddress;
```

Added in v2.0.0

## fromAddressUnsafe

Unsafely calls RewardAddress.fromAddress without Effect wrapper

**Signature**

```ts
export declare const fromAddressUnsafe: (
  address: CML.Address,
) => CML.RewardAddress | undefined;
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls RewardAddress.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.RewardAddress;
```

Added in v2.0.0

# Errors

## RewardAddressError (class)

Error class for RewardAddress operations

This error is thrown when operations on RewardAddress instances fail.

**Signature**

```ts
export declare class RewardAddressError
```

Added in v2.0.0

# Methods

## free

Method free of RewardAddress

**Signature**

```ts
export declare const free: (
  instance: CML.RewardAddress,
) => Effect.Effect<void, RewardAddressError>;
```

Added in v2.0.0

## networkId

Method networkId of RewardAddress

**Signature**

```ts
export declare const networkId: (
  instance: CML.RewardAddress,
) => Effect.Effect<number, RewardAddressError>;
```

Added in v2.0.0

## payment

Method payment of RewardAddress

**Signature**

```ts
export declare const payment: (
  instance: CML.RewardAddress,
) => Effect.Effect<CML.Credential, RewardAddressError>;
```

Added in v2.0.0

## toAddress

Method toAddress of RewardAddress

**Signature**

```ts
export declare const toAddress: (
  instance: CML.RewardAddress,
) => Effect.Effect<CML.Address, RewardAddressError>;
```

Added in v2.0.0

## toJsValue

Method toJsValue of RewardAddress

**Signature**

```ts
export declare const toJsValue: (
  instance: CML.RewardAddress,
) => Effect.Effect<any, RewardAddressError>;
```

Added in v2.0.0

## toJson

Method toJson of RewardAddress

**Signature**

```ts
export declare const toJson: (
  instance: CML.RewardAddress,
) => Effect.Effect<string, RewardAddressError>;
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.RewardAddress) => void;
```

Added in v2.0.0

## networkIdUnsafe

Unsafely calls instance.networkId without Effect wrapper

**Signature**

```ts
export declare const networkIdUnsafe: (instance: CML.RewardAddress) => number;
```

Added in v2.0.0

## paymentUnsafe

Unsafely calls instance.payment without Effect wrapper

**Signature**

```ts
export declare const paymentUnsafe: (
  instance: CML.RewardAddress,
) => CML.Credential;
```

Added in v2.0.0

## toAddressUnsafe

Unsafely calls instance.toAddress without Effect wrapper

**Signature**

```ts
export declare const toAddressUnsafe: (
  instance: CML.RewardAddress,
) => CML.Address;
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.RewardAddress) => any;
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.RewardAddress) => string;
```

Added in v2.0.0

# Types

## RewardAddress (type alias)

Type alias for the CML RewardAddress class

**Signature**

```ts
export type RewardAddress = CML.RewardAddress;
```

Added in v2.0.0
