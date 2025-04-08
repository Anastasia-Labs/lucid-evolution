---
title: CML/TreasuryWithdrawalsAction.ts
nav_order: 240
parent: Modules
---

## TreasuryWithdrawalsAction overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
  - [fromCborBytes](#fromcborbytes)
  - [fromCborHex](#fromcborhex)
  - [fromJson](#fromjson)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
  - [fromCborBytesUnsafe](#fromcborbytesunsafe)
  - [fromCborHexUnsafe](#fromcborhexunsafe)
  - [fromJsonUnsafe](#fromjsonunsafe)
- [Errors](#errors)
  - [TreasuryWithdrawalsActionError (class)](#treasurywithdrawalsactionerror-class)
- [Methods](#methods)
  - [free](#free)
  - [policyHash](#policyhash)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
  - [withdrawal](#withdrawal)
- [MethodsUnsafe](#methodsunsafe)
  - [freeUnsafe](#freeunsafe)
  - [policyHashUnsafe](#policyhashunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
  - [withdrawalUnsafe](#withdrawalunsafe)
- [Types](#types)
  - [TreasuryWithdrawalsAction (type alias)](#treasurywithdrawalsaction-type-alias)

---

# Constructors

## \_new

Static method \_new of TreasuryWithdrawalsAction

**Signature**

```ts
export declare const _new: (
  withdrawal: CML.MapRewardAccountToCoin,
  policyHash: CML.ScriptHash,
) => Effect.Effect<
  CML.TreasuryWithdrawalsAction,
  TreasuryWithdrawalsActionError
>;
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of TreasuryWithdrawalsAction

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<
  CML.TreasuryWithdrawalsAction,
  TreasuryWithdrawalsActionError
>;
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of TreasuryWithdrawalsAction

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<
  CML.TreasuryWithdrawalsAction,
  TreasuryWithdrawalsActionError
>;
```

Added in v2.0.0

## fromJson

Static method fromJson of TreasuryWithdrawalsAction

**Signature**

```ts
export declare const fromJson: (
  json: string,
) => Effect.Effect<
  CML.TreasuryWithdrawalsAction,
  TreasuryWithdrawalsActionError
>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls TreasuryWithdrawalsAction.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (
  withdrawal: CML.MapRewardAccountToCoin,
  policyHash: CML.ScriptHash,
) => CML.TreasuryWithdrawalsAction;
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls TreasuryWithdrawalsAction.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (
  cborBytes: Uint8Array,
) => CML.TreasuryWithdrawalsAction;
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls TreasuryWithdrawalsAction.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (
  cborBytes: string,
) => CML.TreasuryWithdrawalsAction;
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls TreasuryWithdrawalsAction.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (
  json: string,
) => CML.TreasuryWithdrawalsAction;
```

Added in v2.0.0

# Errors

## TreasuryWithdrawalsActionError (class)

Error class for TreasuryWithdrawalsAction operations

This error is thrown when operations on TreasuryWithdrawalsAction instances fail.

**Signature**

```ts
export declare class TreasuryWithdrawalsActionError
```

Added in v2.0.0

# Methods

## free

Method free of TreasuryWithdrawalsAction

**Signature**

```ts
export declare const free: (
  instance: CML.TreasuryWithdrawalsAction,
) => Effect.Effect<void, TreasuryWithdrawalsActionError>;
```

Added in v2.0.0

## policyHash

Method policyHash of TreasuryWithdrawalsAction

**Signature**

```ts
export declare const policyHash: (
  instance: CML.TreasuryWithdrawalsAction,
) => Effect.Effect<CML.ScriptHash | undefined, TreasuryWithdrawalsActionError>;
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of TreasuryWithdrawalsAction

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.TreasuryWithdrawalsAction,
) => Effect.Effect<Uint8Array, TreasuryWithdrawalsActionError>;
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of TreasuryWithdrawalsAction

**Signature**

```ts
export declare const toCanonicalCborHex: (
  instance: CML.TreasuryWithdrawalsAction,
) => Effect.Effect<string, TreasuryWithdrawalsActionError>;
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of TreasuryWithdrawalsAction

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.TreasuryWithdrawalsAction,
) => Effect.Effect<Uint8Array, TreasuryWithdrawalsActionError>;
```

Added in v2.0.0

## toCborHex

Method toCborHex of TreasuryWithdrawalsAction

**Signature**

```ts
export declare const toCborHex: (
  instance: CML.TreasuryWithdrawalsAction,
) => Effect.Effect<string, TreasuryWithdrawalsActionError>;
```

Added in v2.0.0

## toJsValue

Method toJsValue of TreasuryWithdrawalsAction

**Signature**

```ts
export declare const toJsValue: (
  instance: CML.TreasuryWithdrawalsAction,
) => Effect.Effect<any, TreasuryWithdrawalsActionError>;
```

Added in v2.0.0

## toJson

Method toJson of TreasuryWithdrawalsAction

**Signature**

```ts
export declare const toJson: (
  instance: CML.TreasuryWithdrawalsAction,
) => Effect.Effect<string, TreasuryWithdrawalsActionError>;
```

Added in v2.0.0

## withdrawal

Method withdrawal of TreasuryWithdrawalsAction

**Signature**

```ts
export declare const withdrawal: (
  instance: CML.TreasuryWithdrawalsAction,
) => Effect.Effect<CML.MapRewardAccountToCoin, TreasuryWithdrawalsActionError>;
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (
  instance: CML.TreasuryWithdrawalsAction,
) => void;
```

Added in v2.0.0

## policyHashUnsafe

Unsafely calls instance.policyHash without Effect wrapper

**Signature**

```ts
export declare const policyHashUnsafe: (
  instance: CML.TreasuryWithdrawalsAction,
) => CML.ScriptHash | undefined;
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (
  instance: CML.TreasuryWithdrawalsAction,
) => Uint8Array;
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (
  instance: CML.TreasuryWithdrawalsAction,
) => string;
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (
  instance: CML.TreasuryWithdrawalsAction,
) => Uint8Array;
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (
  instance: CML.TreasuryWithdrawalsAction,
) => string;
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (
  instance: CML.TreasuryWithdrawalsAction,
) => any;
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (
  instance: CML.TreasuryWithdrawalsAction,
) => string;
```

Added in v2.0.0

## withdrawalUnsafe

Unsafely calls instance.withdrawal without Effect wrapper

**Signature**

```ts
export declare const withdrawalUnsafe: (
  instance: CML.TreasuryWithdrawalsAction,
) => CML.MapRewardAccountToCoin;
```

Added in v2.0.0

# Types

## TreasuryWithdrawalsAction (type alias)

Type alias for the CML TreasuryWithdrawalsAction class

**Signature**

```ts
export type TreasuryWithdrawalsAction = CML.TreasuryWithdrawalsAction;
```

Added in v2.0.0
