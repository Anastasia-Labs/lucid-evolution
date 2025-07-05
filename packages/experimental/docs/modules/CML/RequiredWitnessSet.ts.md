---
title: CML/RequiredWitnessSet.ts
nav_order: 193
parent: Modules
---

## RequiredWitnessSet overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
- [Errors](#errors)
  - [RequiredWitnessSetError (class)](#requiredwitnessseterror-class)
- [Methods](#methods)
  - [addAll](#addall)
  - [addBootstrap](#addbootstrap)
  - [addPlutusDatumHash](#addplutusdatumhash)
  - [addRedeemerTag](#addredeemertag)
  - [addScriptHash](#addscripthash)
  - [addScriptRef](#addscriptref)
  - [addVkeyKeyHash](#addvkeykeyhash)
  - [free](#free)
  - [withdrawalRequiredWits](#withdrawalrequiredwits)
- [MethodsUnsafe](#methodsunsafe)
  - [addAllUnsafe](#addallunsafe)
  - [addBootstrapUnsafe](#addbootstrapunsafe)
  - [addPlutusDatumHashUnsafe](#addplutusdatumhashunsafe)
  - [addRedeemerTagUnsafe](#addredeemertagunsafe)
  - [addScriptHashUnsafe](#addscripthashunsafe)
  - [addScriptRefUnsafe](#addscriptrefunsafe)
  - [addVkeyKeyHashUnsafe](#addvkeykeyhashunsafe)
  - [freeUnsafe](#freeunsafe)
  - [withdrawalRequiredWitsUnsafe](#withdrawalrequiredwitsunsafe)
- [Types](#types)
  - [RequiredWitnessSet (type alias)](#requiredwitnessset-type-alias)

---

# Constructors

## \_new

Static method \_new of RequiredWitnessSet

**Signature**

```ts
export declare const _new: () => Effect.Effect<
  CML.RequiredWitnessSet,
  RequiredWitnessSetError
>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls RequiredWitnessSet.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: () => CML.RequiredWitnessSet;
```

Added in v2.0.0

# Errors

## RequiredWitnessSetError (class)

Error class for RequiredWitnessSet operations

This error is thrown when operations on RequiredWitnessSet instances fail.

**Signature**

```ts
export declare class RequiredWitnessSetError
```

Added in v2.0.0

# Methods

## addAll

Method addAll of RequiredWitnessSet

**Signature**

```ts
export declare const addAll: (
  instance: CML.RequiredWitnessSet,
  requirements: CML.RequiredWitnessSet,
) => Effect.Effect<void, RequiredWitnessSetError>;
```

Added in v2.0.0

## addBootstrap

Method addBootstrap of RequiredWitnessSet

**Signature**

```ts
export declare const addBootstrap: (
  instance: CML.RequiredWitnessSet,
  address: CML.ByronAddress,
) => Effect.Effect<void, RequiredWitnessSetError>;
```

Added in v2.0.0

## addPlutusDatumHash

Method addPlutusDatumHash of RequiredWitnessSet

**Signature**

```ts
export declare const addPlutusDatumHash: (
  instance: CML.RequiredWitnessSet,
  plutusDatum: CML.DatumHash,
) => Effect.Effect<void, RequiredWitnessSetError>;
```

Added in v2.0.0

## addRedeemerTag

Method addRedeemerTag of RequiredWitnessSet

**Signature**

```ts
export declare const addRedeemerTag: (
  instance: CML.RequiredWitnessSet,
  redeemer: CML.RedeemerWitnessKey,
) => Effect.Effect<void, RequiredWitnessSetError>;
```

Added in v2.0.0

## addScriptHash

Method addScriptHash of RequiredWitnessSet

**Signature**

```ts
export declare const addScriptHash: (
  instance: CML.RequiredWitnessSet,
  scriptHash: CML.ScriptHash,
) => Effect.Effect<void, RequiredWitnessSetError>;
```

Added in v2.0.0

## addScriptRef

Method addScriptRef of RequiredWitnessSet

**Signature**

```ts
export declare const addScriptRef: (
  instance: CML.RequiredWitnessSet,
  scriptHash: CML.ScriptHash,
) => Effect.Effect<void, RequiredWitnessSetError>;
```

Added in v2.0.0

## addVkeyKeyHash

Method addVkeyKeyHash of RequiredWitnessSet

**Signature**

```ts
export declare const addVkeyKeyHash: (
  instance: CML.RequiredWitnessSet,
  hash: CML.Ed25519KeyHash,
) => Effect.Effect<void, RequiredWitnessSetError>;
```

Added in v2.0.0

## free

Method free of RequiredWitnessSet

**Signature**

```ts
export declare const free: (
  instance: CML.RequiredWitnessSet,
) => Effect.Effect<void, RequiredWitnessSetError>;
```

Added in v2.0.0

## withdrawalRequiredWits

Method withdrawalRequiredWits of RequiredWitnessSet

**Signature**

```ts
export declare const withdrawalRequiredWits: (
  instance: CML.RequiredWitnessSet,
  address: CML.RewardAddress,
) => Effect.Effect<void, RequiredWitnessSetError>;
```

Added in v2.0.0

# MethodsUnsafe

## addAllUnsafe

Unsafely calls instance.addAll without Effect wrapper

**Signature**

```ts
export declare const addAllUnsafe: (
  instance: CML.RequiredWitnessSet,
  requirements: CML.RequiredWitnessSet,
) => void;
```

Added in v2.0.0

## addBootstrapUnsafe

Unsafely calls instance.addBootstrap without Effect wrapper

**Signature**

```ts
export declare const addBootstrapUnsafe: (
  instance: CML.RequiredWitnessSet,
  address: CML.ByronAddress,
) => void;
```

Added in v2.0.0

## addPlutusDatumHashUnsafe

Unsafely calls instance.addPlutusDatumHash without Effect wrapper

**Signature**

```ts
export declare const addPlutusDatumHashUnsafe: (
  instance: CML.RequiredWitnessSet,
  plutusDatum: CML.DatumHash,
) => void;
```

Added in v2.0.0

## addRedeemerTagUnsafe

Unsafely calls instance.addRedeemerTag without Effect wrapper

**Signature**

```ts
export declare const addRedeemerTagUnsafe: (
  instance: CML.RequiredWitnessSet,
  redeemer: CML.RedeemerWitnessKey,
) => void;
```

Added in v2.0.0

## addScriptHashUnsafe

Unsafely calls instance.addScriptHash without Effect wrapper

**Signature**

```ts
export declare const addScriptHashUnsafe: (
  instance: CML.RequiredWitnessSet,
  scriptHash: CML.ScriptHash,
) => void;
```

Added in v2.0.0

## addScriptRefUnsafe

Unsafely calls instance.addScriptRef without Effect wrapper

**Signature**

```ts
export declare const addScriptRefUnsafe: (
  instance: CML.RequiredWitnessSet,
  scriptHash: CML.ScriptHash,
) => void;
```

Added in v2.0.0

## addVkeyKeyHashUnsafe

Unsafely calls instance.addVkeyKeyHash without Effect wrapper

**Signature**

```ts
export declare const addVkeyKeyHashUnsafe: (
  instance: CML.RequiredWitnessSet,
  hash: CML.Ed25519KeyHash,
) => void;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.RequiredWitnessSet) => void;
```

Added in v2.0.0

## withdrawalRequiredWitsUnsafe

Unsafely calls instance.withdrawalRequiredWits without Effect wrapper

**Signature**

```ts
export declare const withdrawalRequiredWitsUnsafe: (
  instance: CML.RequiredWitnessSet,
  address: CML.RewardAddress,
) => void;
```

Added in v2.0.0

# Types

## RequiredWitnessSet (type alias)

Type alias for the CML RequiredWitnessSet class

**Signature**

```ts
export type RequiredWitnessSet = CML.RequiredWitnessSet;
```

Added in v2.0.0
