---
title: CML/TxRedeemerBuilder.ts
nav_order: 246
parent: Modules
---

## TxRedeemerBuilder overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Errors](#errors)
  - [TxRedeemerBuilderError (class)](#txredeemerbuildererror-class)
- [Methods](#methods)
  - [auxiliaryData](#auxiliarydata)
  - [build](#build)
  - [draftBody](#draftbody)
  - [draftTx](#drafttx)
  - [free](#free)
  - [setExunits](#setexunits)
- [MethodsUnsafe](#methodsunsafe)
  - [auxiliaryDataUnsafe](#auxiliarydataunsafe)
  - [buildUnsafe](#buildunsafe)
  - [draftBodyUnsafe](#draftbodyunsafe)
  - [draftTxUnsafe](#drafttxunsafe)
  - [freeUnsafe](#freeunsafe)
  - [setExunitsUnsafe](#setexunitsunsafe)
- [Types](#types)
  - [TxRedeemerBuilder (type alias)](#txredeemerbuilder-type-alias)

---

# Errors

## TxRedeemerBuilderError (class)

Error class for TxRedeemerBuilder operations

This error is thrown when operations on TxRedeemerBuilder instances fail.

**Signature**

```ts
export declare class TxRedeemerBuilderError
```

Added in v2.0.0

# Methods

## auxiliaryData

Method auxiliaryData of TxRedeemerBuilder

**Signature**

```ts
export declare const auxiliaryData: (
  instance: CML.TxRedeemerBuilder,
) => Effect.Effect<CML.AuxiliaryData | undefined, TxRedeemerBuilderError>;
```

Added in v2.0.0

## build

Method build of TxRedeemerBuilder

**Signature**

```ts
export declare const build: (
  instance: CML.TxRedeemerBuilder,
) => Effect.Effect<CML.Redeemers, TxRedeemerBuilderError>;
```

Added in v2.0.0

## draftBody

Method draftBody of TxRedeemerBuilder

**Signature**

```ts
export declare const draftBody: (
  instance: CML.TxRedeemerBuilder,
) => Effect.Effect<CML.TransactionBody, TxRedeemerBuilderError>;
```

Added in v2.0.0

## draftTx

Method draftTx of TxRedeemerBuilder

**Signature**

```ts
export declare const draftTx: (
  instance: CML.TxRedeemerBuilder,
) => Effect.Effect<CML.Transaction, TxRedeemerBuilderError>;
```

Added in v2.0.0

## free

Method free of TxRedeemerBuilder

**Signature**

```ts
export declare const free: (
  instance: CML.TxRedeemerBuilder,
) => Effect.Effect<void, TxRedeemerBuilderError>;
```

Added in v2.0.0

## setExunits

Method setExunits of TxRedeemerBuilder

**Signature**

```ts
export declare const setExunits: (
  instance: CML.TxRedeemerBuilder,
  redeemer: CML.RedeemerWitnessKey,
  exUnits: CML.ExUnits,
) => Effect.Effect<void, TxRedeemerBuilderError>;
```

Added in v2.0.0

# MethodsUnsafe

## auxiliaryDataUnsafe

Unsafely calls instance.auxiliaryData without Effect wrapper

**Signature**

```ts
export declare const auxiliaryDataUnsafe: (
  instance: CML.TxRedeemerBuilder,
) => CML.AuxiliaryData | undefined;
```

Added in v2.0.0

## buildUnsafe

Unsafely calls instance.build without Effect wrapper

**Signature**

```ts
export declare const buildUnsafe: (
  instance: CML.TxRedeemerBuilder,
) => CML.Redeemers;
```

Added in v2.0.0

## draftBodyUnsafe

Unsafely calls instance.draftBody without Effect wrapper

**Signature**

```ts
export declare const draftBodyUnsafe: (
  instance: CML.TxRedeemerBuilder,
) => CML.TransactionBody;
```

Added in v2.0.0

## draftTxUnsafe

Unsafely calls instance.draftTx without Effect wrapper

**Signature**

```ts
export declare const draftTxUnsafe: (
  instance: CML.TxRedeemerBuilder,
) => CML.Transaction;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.TxRedeemerBuilder) => void;
```

Added in v2.0.0

## setExunitsUnsafe

Unsafely calls instance.setExunits without Effect wrapper

**Signature**

```ts
export declare const setExunitsUnsafe: (
  instance: CML.TxRedeemerBuilder,
  redeemer: CML.RedeemerWitnessKey,
  exUnits: CML.ExUnits,
) => void;
```

Added in v2.0.0

# Types

## TxRedeemerBuilder (type alias)

Type alias for the CML TxRedeemerBuilder class

**Signature**

```ts
export type TxRedeemerBuilder = CML.TxRedeemerBuilder;
```

Added in v2.0.0
