---
title: CML/SignedTxBuilder.ts
nav_order: 203
parent: Modules
---

## SignedTxBuilder overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [newWithData](#newwithdata)
  - [newWithoutData](#newwithoutdata)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [newWithDataUnsafe](#newwithdataunsafe)
  - [newWithoutDataUnsafe](#newwithoutdataunsafe)
- [Errors](#errors)
  - [SignedTxBuilderError (class)](#signedtxbuildererror-class)
- [Methods](#methods)
  - [addBootstrap](#addbootstrap)
  - [addVkey](#addvkey)
  - [auxiliaryData](#auxiliarydata)
  - [body](#body)
  - [buildChecked](#buildchecked)
  - [buildUnchecked](#buildunchecked)
  - [free](#free)
  - [isValid](#isvalid)
  - [witnessSet](#witnessset)
- [MethodsUnsafe](#methodsunsafe)
  - [addBootstrapUnsafe](#addbootstrapunsafe)
  - [addVkeyUnsafe](#addvkeyunsafe)
  - [auxiliaryDataUnsafe](#auxiliarydataunsafe)
  - [bodyUnsafe](#bodyunsafe)
  - [buildCheckedUnsafe](#buildcheckedunsafe)
  - [buildUncheckedUnsafe](#builduncheckedunsafe)
  - [freeUnsafe](#freeunsafe)
  - [isValidUnsafe](#isvalidunsafe)
  - [witnessSetUnsafe](#witnesssetunsafe)
- [Types](#types)
  - [SignedTxBuilder (type alias)](#signedtxbuilder-type-alias)

---

# Constructors

## newWithData

Static method newWithData of SignedTxBuilder

**Signature**

```ts
export declare const newWithData: (
  body: CML.TransactionBody,
  witnessSet: CML.TransactionWitnessSetBuilder,
  isValid: boolean,
  auxiliaryData: CML.AuxiliaryData,
) => Effect.Effect<CML.SignedTxBuilder, SignedTxBuilderError>;
```

Added in v2.0.0

## newWithoutData

Static method newWithoutData of SignedTxBuilder

**Signature**

```ts
export declare const newWithoutData: (
  body: CML.TransactionBody,
  witnessSet: CML.TransactionWitnessSetBuilder,
  isValid: boolean,
) => Effect.Effect<CML.SignedTxBuilder, SignedTxBuilderError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## newWithDataUnsafe

Unsafely calls SignedTxBuilder.newWithData without Effect wrapper

**Signature**

```ts
export declare const newWithDataUnsafe: (
  body: CML.TransactionBody,
  witnessSet: CML.TransactionWitnessSetBuilder,
  isValid: boolean,
  auxiliaryData: CML.AuxiliaryData,
) => CML.SignedTxBuilder;
```

Added in v2.0.0

## newWithoutDataUnsafe

Unsafely calls SignedTxBuilder.newWithoutData without Effect wrapper

**Signature**

```ts
export declare const newWithoutDataUnsafe: (
  body: CML.TransactionBody,
  witnessSet: CML.TransactionWitnessSetBuilder,
  isValid: boolean,
) => CML.SignedTxBuilder;
```

Added in v2.0.0

# Errors

## SignedTxBuilderError (class)

Error class for SignedTxBuilder operations

This error is thrown when operations on SignedTxBuilder instances fail.

**Signature**

```ts
export declare class SignedTxBuilderError
```

Added in v2.0.0

# Methods

## addBootstrap

Method addBootstrap of SignedTxBuilder

**Signature**

```ts
export declare const addBootstrap: (
  instance: CML.SignedTxBuilder,
  bootstrap: CML.BootstrapWitness,
) => Effect.Effect<void, SignedTxBuilderError>;
```

Added in v2.0.0

## addVkey

Method addVkey of SignedTxBuilder

**Signature**

```ts
export declare const addVkey: (
  instance: CML.SignedTxBuilder,
  vkey: CML.Vkeywitness,
) => Effect.Effect<void, SignedTxBuilderError>;
```

Added in v2.0.0

## auxiliaryData

Method auxiliaryData of SignedTxBuilder

**Signature**

```ts
export declare const auxiliaryData: (
  instance: CML.SignedTxBuilder,
) => Effect.Effect<CML.AuxiliaryData | undefined, SignedTxBuilderError>;
```

Added in v2.0.0

## body

Method body of SignedTxBuilder

**Signature**

```ts
export declare const body: (
  instance: CML.SignedTxBuilder,
) => Effect.Effect<CML.TransactionBody, SignedTxBuilderError>;
```

Added in v2.0.0

## buildChecked

Method buildChecked of SignedTxBuilder

**Signature**

```ts
export declare const buildChecked: (
  instance: CML.SignedTxBuilder,
) => Effect.Effect<CML.Transaction, SignedTxBuilderError>;
```

Added in v2.0.0

## buildUnchecked

Method buildUnchecked of SignedTxBuilder

**Signature**

```ts
export declare const buildUnchecked: (
  instance: CML.SignedTxBuilder,
) => Effect.Effect<CML.Transaction, SignedTxBuilderError>;
```

Added in v2.0.0

## free

Method free of SignedTxBuilder

**Signature**

```ts
export declare const free: (
  instance: CML.SignedTxBuilder,
) => Effect.Effect<void, SignedTxBuilderError>;
```

Added in v2.0.0

## isValid

Method isValid of SignedTxBuilder

**Signature**

```ts
export declare const isValid: (
  instance: CML.SignedTxBuilder,
) => Effect.Effect<boolean, SignedTxBuilderError>;
```

Added in v2.0.0

## witnessSet

Method witnessSet of SignedTxBuilder

**Signature**

```ts
export declare const witnessSet: (
  instance: CML.SignedTxBuilder,
) => Effect.Effect<CML.TransactionWitnessSetBuilder, SignedTxBuilderError>;
```

Added in v2.0.0

# MethodsUnsafe

## addBootstrapUnsafe

Unsafely calls instance.addBootstrap without Effect wrapper

**Signature**

```ts
export declare const addBootstrapUnsafe: (
  instance: CML.SignedTxBuilder,
  bootstrap: CML.BootstrapWitness,
) => void;
```

Added in v2.0.0

## addVkeyUnsafe

Unsafely calls instance.addVkey without Effect wrapper

**Signature**

```ts
export declare const addVkeyUnsafe: (
  instance: CML.SignedTxBuilder,
  vkey: CML.Vkeywitness,
) => void;
```

Added in v2.0.0

## auxiliaryDataUnsafe

Unsafely calls instance.auxiliaryData without Effect wrapper

**Signature**

```ts
export declare const auxiliaryDataUnsafe: (
  instance: CML.SignedTxBuilder,
) => CML.AuxiliaryData | undefined;
```

Added in v2.0.0

## bodyUnsafe

Unsafely calls instance.body without Effect wrapper

**Signature**

```ts
export declare const bodyUnsafe: (
  instance: CML.SignedTxBuilder,
) => CML.TransactionBody;
```

Added in v2.0.0

## buildCheckedUnsafe

Unsafely calls instance.buildChecked without Effect wrapper

**Signature**

```ts
export declare const buildCheckedUnsafe: (
  instance: CML.SignedTxBuilder,
) => CML.Transaction;
```

Added in v2.0.0

## buildUncheckedUnsafe

Unsafely calls instance.buildUnchecked without Effect wrapper

**Signature**

```ts
export declare const buildUncheckedUnsafe: (
  instance: CML.SignedTxBuilder,
) => CML.Transaction;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.SignedTxBuilder) => void;
```

Added in v2.0.0

## isValidUnsafe

Unsafely calls instance.isValid without Effect wrapper

**Signature**

```ts
export declare const isValidUnsafe: (instance: CML.SignedTxBuilder) => boolean;
```

Added in v2.0.0

## witnessSetUnsafe

Unsafely calls instance.witnessSet without Effect wrapper

**Signature**

```ts
export declare const witnessSetUnsafe: (
  instance: CML.SignedTxBuilder,
) => CML.TransactionWitnessSetBuilder;
```

Added in v2.0.0

# Types

## SignedTxBuilder (type alias)

Type alias for the CML SignedTxBuilder class

**Signature**

```ts
export type SignedTxBuilder = CML.SignedTxBuilder;
```

Added in v2.0.0
