---
title: CML/TransactionWitnessSetBuilder.ts
nav_order: 238
parent: Modules
---

## TransactionWitnessSetBuilder overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
- [Errors](#errors)
  - [TransactionWitnessSetBuilderError (class)](#transactionwitnesssetbuildererror-class)
- [Methods](#methods)
  - [addBootstrap](#addbootstrap)
  - [addExisting](#addexisting)
  - [addPlutusDatum](#addplutusdatum)
  - [addRedeemer](#addredeemer)
  - [addRequiredWits](#addrequiredwits)
  - [addScript](#addscript)
  - [addVkey](#addvkey)
  - [build](#build)
  - [free](#free)
  - [getNativeScript](#getnativescript)
  - [getPlutusDatum](#getplutusdatum)
  - [getPlutusV1Script](#getplutusv1script)
  - [getPlutusV2Script](#getplutusv2script)
  - [getRedeemer](#getredeemer)
  - [mergeFakeWitness](#mergefakewitness)
  - [remainingWits](#remainingwits)
  - [tryBuild](#trybuild)
- [MethodsUnsafe](#methodsunsafe)
  - [addBootstrapUnsafe](#addbootstrapunsafe)
  - [addExistingUnsafe](#addexistingunsafe)
  - [addPlutusDatumUnsafe](#addplutusdatumunsafe)
  - [addRedeemerUnsafe](#addredeemerunsafe)
  - [addRequiredWitsUnsafe](#addrequiredwitsunsafe)
  - [addScriptUnsafe](#addscriptunsafe)
  - [addVkeyUnsafe](#addvkeyunsafe)
  - [buildUnsafe](#buildunsafe)
  - [freeUnsafe](#freeunsafe)
  - [getNativeScriptUnsafe](#getnativescriptunsafe)
  - [getPlutusDatumUnsafe](#getplutusdatumunsafe)
  - [getPlutusV1ScriptUnsafe](#getplutusv1scriptunsafe)
  - [getPlutusV2ScriptUnsafe](#getplutusv2scriptunsafe)
  - [getRedeemerUnsafe](#getredeemerunsafe)
  - [mergeFakeWitnessUnsafe](#mergefakewitnessunsafe)
  - [remainingWitsUnsafe](#remainingwitsunsafe)
  - [tryBuildUnsafe](#trybuildunsafe)
- [Types](#types)
  - [TransactionWitnessSetBuilder (type alias)](#transactionwitnesssetbuilder-type-alias)

---

# Constructors

## \_new

Static method \_new of TransactionWitnessSetBuilder

**Signature**

```ts
export declare const _new: () => Effect.Effect<
  CML.TransactionWitnessSetBuilder,
  TransactionWitnessSetBuilderError
>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls TransactionWitnessSetBuilder.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: () => CML.TransactionWitnessSetBuilder;
```

Added in v2.0.0

# Errors

## TransactionWitnessSetBuilderError (class)

Error class for TransactionWitnessSetBuilder operations

This error is thrown when operations on TransactionWitnessSetBuilder instances fail.

**Signature**

```ts
export declare class TransactionWitnessSetBuilderError
```

Added in v2.0.0

# Methods

## addBootstrap

Method addBootstrap of TransactionWitnessSetBuilder

**Signature**

```ts
export declare const addBootstrap: (
  instance: CML.TransactionWitnessSetBuilder,
  bootstrap: CML.BootstrapWitness,
) => Effect.Effect<void, TransactionWitnessSetBuilderError>;
```

Added in v2.0.0

## addExisting

Method addExisting of TransactionWitnessSetBuilder

**Signature**

```ts
export declare const addExisting: (
  instance: CML.TransactionWitnessSetBuilder,
  witSet: CML.TransactionWitnessSet,
) => Effect.Effect<void, TransactionWitnessSetBuilderError>;
```

Added in v2.0.0

## addPlutusDatum

Method addPlutusDatum of TransactionWitnessSetBuilder

**Signature**

```ts
export declare const addPlutusDatum: (
  instance: CML.TransactionWitnessSetBuilder,
  plutusDatum: CML.PlutusData,
) => Effect.Effect<void, TransactionWitnessSetBuilderError>;
```

Added in v2.0.0

## addRedeemer

Method addRedeemer of TransactionWitnessSetBuilder

**Signature**

```ts
export declare const addRedeemer: (
  instance: CML.TransactionWitnessSetBuilder,
  redeemer: CML.LegacyRedeemer,
) => Effect.Effect<void, TransactionWitnessSetBuilderError>;
```

Added in v2.0.0

## addRequiredWits

Method addRequiredWits of TransactionWitnessSetBuilder

**Signature**

```ts
export declare const addRequiredWits: (
  instance: CML.TransactionWitnessSetBuilder,
  requiredWits: CML.RequiredWitnessSet,
) => Effect.Effect<void, TransactionWitnessSetBuilderError>;
```

Added in v2.0.0

## addScript

Method addScript of TransactionWitnessSetBuilder

**Signature**

```ts
export declare const addScript: (
  instance: CML.TransactionWitnessSetBuilder,
  script: CML.Script,
) => Effect.Effect<void, TransactionWitnessSetBuilderError>;
```

Added in v2.0.0

## addVkey

Method addVkey of TransactionWitnessSetBuilder

**Signature**

```ts
export declare const addVkey: (
  instance: CML.TransactionWitnessSetBuilder,
  vkeyWitness: CML.Vkeywitness,
) => Effect.Effect<void, TransactionWitnessSetBuilderError>;
```

Added in v2.0.0

## build

Method build of TransactionWitnessSetBuilder

**Signature**

```ts
export declare const build: (
  instance: CML.TransactionWitnessSetBuilder,
) => Effect.Effect<
  CML.TransactionWitnessSet,
  TransactionWitnessSetBuilderError
>;
```

Added in v2.0.0

## free

Method free of TransactionWitnessSetBuilder

**Signature**

```ts
export declare const free: (
  instance: CML.TransactionWitnessSetBuilder,
) => Effect.Effect<void, TransactionWitnessSetBuilderError>;
```

Added in v2.0.0

## getNativeScript

Method getNativeScript of TransactionWitnessSetBuilder

**Signature**

```ts
export declare const getNativeScript: (
  instance: CML.TransactionWitnessSetBuilder,
) => Effect.Effect<CML.NativeScriptList, TransactionWitnessSetBuilderError>;
```

Added in v2.0.0

## getPlutusDatum

Method getPlutusDatum of TransactionWitnessSetBuilder

**Signature**

```ts
export declare const getPlutusDatum: (
  instance: CML.TransactionWitnessSetBuilder,
) => Effect.Effect<CML.PlutusDataList, TransactionWitnessSetBuilderError>;
```

Added in v2.0.0

## getPlutusV1Script

Method getPlutusV1Script of TransactionWitnessSetBuilder

**Signature**

```ts
export declare const getPlutusV1Script: (
  instance: CML.TransactionWitnessSetBuilder,
) => Effect.Effect<CML.PlutusV1ScriptList, TransactionWitnessSetBuilderError>;
```

Added in v2.0.0

## getPlutusV2Script

Method getPlutusV2Script of TransactionWitnessSetBuilder

**Signature**

```ts
export declare const getPlutusV2Script: (
  instance: CML.TransactionWitnessSetBuilder,
) => Effect.Effect<CML.PlutusV2ScriptList, TransactionWitnessSetBuilderError>;
```

Added in v2.0.0

## getRedeemer

Method getRedeemer of TransactionWitnessSetBuilder

**Signature**

```ts
export declare const getRedeemer: (
  instance: CML.TransactionWitnessSetBuilder,
) => Effect.Effect<CML.LegacyRedeemerList, TransactionWitnessSetBuilderError>;
```

Added in v2.0.0

## mergeFakeWitness

Method mergeFakeWitness of TransactionWitnessSetBuilder

**Signature**

```ts
export declare const mergeFakeWitness: (
  instance: CML.TransactionWitnessSetBuilder,
  requiredWits: CML.RequiredWitnessSet,
) => Effect.Effect<void, TransactionWitnessSetBuilderError>;
```

Added in v2.0.0

## remainingWits

Method remainingWits of TransactionWitnessSetBuilder

**Signature**

```ts
export declare const remainingWits: (
  instance: CML.TransactionWitnessSetBuilder,
) => Effect.Effect<CML.RequiredWitnessSet, TransactionWitnessSetBuilderError>;
```

Added in v2.0.0

## tryBuild

Method tryBuild of TransactionWitnessSetBuilder

**Signature**

```ts
export declare const tryBuild: (
  instance: CML.TransactionWitnessSetBuilder,
) => Effect.Effect<
  CML.TransactionWitnessSet,
  TransactionWitnessSetBuilderError
>;
```

Added in v2.0.0

# MethodsUnsafe

## addBootstrapUnsafe

Unsafely calls instance.addBootstrap without Effect wrapper

**Signature**

```ts
export declare const addBootstrapUnsafe: (
  instance: CML.TransactionWitnessSetBuilder,
  bootstrap: CML.BootstrapWitness,
) => void;
```

Added in v2.0.0

## addExistingUnsafe

Unsafely calls instance.addExisting without Effect wrapper

**Signature**

```ts
export declare const addExistingUnsafe: (
  instance: CML.TransactionWitnessSetBuilder,
  witSet: CML.TransactionWitnessSet,
) => void;
```

Added in v2.0.0

## addPlutusDatumUnsafe

Unsafely calls instance.addPlutusDatum without Effect wrapper

**Signature**

```ts
export declare const addPlutusDatumUnsafe: (
  instance: CML.TransactionWitnessSetBuilder,
  plutusDatum: CML.PlutusData,
) => void;
```

Added in v2.0.0

## addRedeemerUnsafe

Unsafely calls instance.addRedeemer without Effect wrapper

**Signature**

```ts
export declare const addRedeemerUnsafe: (
  instance: CML.TransactionWitnessSetBuilder,
  redeemer: CML.LegacyRedeemer,
) => void;
```

Added in v2.0.0

## addRequiredWitsUnsafe

Unsafely calls instance.addRequiredWits without Effect wrapper

**Signature**

```ts
export declare const addRequiredWitsUnsafe: (
  instance: CML.TransactionWitnessSetBuilder,
  requiredWits: CML.RequiredWitnessSet,
) => void;
```

Added in v2.0.0

## addScriptUnsafe

Unsafely calls instance.addScript without Effect wrapper

**Signature**

```ts
export declare const addScriptUnsafe: (
  instance: CML.TransactionWitnessSetBuilder,
  script: CML.Script,
) => void;
```

Added in v2.0.0

## addVkeyUnsafe

Unsafely calls instance.addVkey without Effect wrapper

**Signature**

```ts
export declare const addVkeyUnsafe: (
  instance: CML.TransactionWitnessSetBuilder,
  vkeyWitness: CML.Vkeywitness,
) => void;
```

Added in v2.0.0

## buildUnsafe

Unsafely calls instance.build without Effect wrapper

**Signature**

```ts
export declare const buildUnsafe: (
  instance: CML.TransactionWitnessSetBuilder,
) => CML.TransactionWitnessSet;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (
  instance: CML.TransactionWitnessSetBuilder,
) => void;
```

Added in v2.0.0

## getNativeScriptUnsafe

Unsafely calls instance.getNativeScript without Effect wrapper

**Signature**

```ts
export declare const getNativeScriptUnsafe: (
  instance: CML.TransactionWitnessSetBuilder,
) => CML.NativeScriptList;
```

Added in v2.0.0

## getPlutusDatumUnsafe

Unsafely calls instance.getPlutusDatum without Effect wrapper

**Signature**

```ts
export declare const getPlutusDatumUnsafe: (
  instance: CML.TransactionWitnessSetBuilder,
) => CML.PlutusDataList;
```

Added in v2.0.0

## getPlutusV1ScriptUnsafe

Unsafely calls instance.getPlutusV1Script without Effect wrapper

**Signature**

```ts
export declare const getPlutusV1ScriptUnsafe: (
  instance: CML.TransactionWitnessSetBuilder,
) => CML.PlutusV1ScriptList;
```

Added in v2.0.0

## getPlutusV2ScriptUnsafe

Unsafely calls instance.getPlutusV2Script without Effect wrapper

**Signature**

```ts
export declare const getPlutusV2ScriptUnsafe: (
  instance: CML.TransactionWitnessSetBuilder,
) => CML.PlutusV2ScriptList;
```

Added in v2.0.0

## getRedeemerUnsafe

Unsafely calls instance.getRedeemer without Effect wrapper

**Signature**

```ts
export declare const getRedeemerUnsafe: (
  instance: CML.TransactionWitnessSetBuilder,
) => CML.LegacyRedeemerList;
```

Added in v2.0.0

## mergeFakeWitnessUnsafe

Unsafely calls instance.mergeFakeWitness without Effect wrapper

**Signature**

```ts
export declare const mergeFakeWitnessUnsafe: (
  instance: CML.TransactionWitnessSetBuilder,
  requiredWits: CML.RequiredWitnessSet,
) => void;
```

Added in v2.0.0

## remainingWitsUnsafe

Unsafely calls instance.remainingWits without Effect wrapper

**Signature**

```ts
export declare const remainingWitsUnsafe: (
  instance: CML.TransactionWitnessSetBuilder,
) => CML.RequiredWitnessSet;
```

Added in v2.0.0

## tryBuildUnsafe

Unsafely calls instance.tryBuild without Effect wrapper

**Signature**

```ts
export declare const tryBuildUnsafe: (
  instance: CML.TransactionWitnessSetBuilder,
) => CML.TransactionWitnessSet;
```

Added in v2.0.0

# Types

## TransactionWitnessSetBuilder (type alias)

Type alias for the CML TransactionWitnessSetBuilder class

**Signature**

```ts
export type TransactionWitnessSetBuilder = CML.TransactionWitnessSetBuilder;
```

Added in v2.0.0
