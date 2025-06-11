---
title: CML/LinearFee.ts
nav_order: 121
parent: Modules
---

## LinearFee overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
- [Errors](#errors)
  - [LinearFeeError (class)](#linearfeeerror-class)
- [Methods](#methods)
  - [coefficient](#coefficient)
  - [constant](#constant)
  - [free](#free)
  - [refScriptCostPerByte](#refscriptcostperbyte)
- [MethodsUnsafe](#methodsunsafe)
  - [coefficientUnsafe](#coefficientunsafe)
  - [constantUnsafe](#constantunsafe)
  - [freeUnsafe](#freeunsafe)
  - [refScriptCostPerByteUnsafe](#refscriptcostperbyteunsafe)
- [Types](#types)
  - [LinearFee (type alias)](#linearfee-type-alias)

---

# Constructors

## \_new

Static method \_new of LinearFee

**Signature**

```ts
export declare const _new: (
  coefficient: bigint,
  constant: bigint,
  refScriptCostPerByte: bigint
) => Effect.Effect<CML.LinearFee, LinearFeeError>
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls LinearFee.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (coefficient: bigint, constant: bigint, refScriptCostPerByte: bigint) => CML.LinearFee
```

Added in v2.0.0

# Errors

## LinearFeeError (class)

Error class for LinearFee operations

This error is thrown when operations on LinearFee instances fail.

**Signature**

```ts
export declare class LinearFeeError
```

Added in v2.0.0

# Methods

## coefficient

Method coefficient of LinearFee

**Signature**

```ts
export declare const coefficient: (instance: CML.LinearFee) => Effect.Effect<bigint, LinearFeeError>
```

Added in v2.0.0

## constant

Method constant of LinearFee

**Signature**

```ts
export declare const constant: (instance: CML.LinearFee) => Effect.Effect<bigint, LinearFeeError>
```

Added in v2.0.0

## free

Method free of LinearFee

**Signature**

```ts
export declare const free: (instance: CML.LinearFee) => Effect.Effect<void, LinearFeeError>
```

Added in v2.0.0

## refScriptCostPerByte

Method refScriptCostPerByte of LinearFee

**Signature**

```ts
export declare const refScriptCostPerByte: (instance: CML.LinearFee) => Effect.Effect<bigint, LinearFeeError>
```

Added in v2.0.0

# MethodsUnsafe

## coefficientUnsafe

Unsafely calls instance.coefficient without Effect wrapper

**Signature**

```ts
export declare const coefficientUnsafe: (instance: CML.LinearFee) => bigint
```

Added in v2.0.0

## constantUnsafe

Unsafely calls instance.constant without Effect wrapper

**Signature**

```ts
export declare const constantUnsafe: (instance: CML.LinearFee) => bigint
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.LinearFee) => void
```

Added in v2.0.0

## refScriptCostPerByteUnsafe

Unsafely calls instance.refScriptCostPerByte without Effect wrapper

**Signature**

```ts
export declare const refScriptCostPerByteUnsafe: (instance: CML.LinearFee) => bigint
```

Added in v2.0.0

# Types

## LinearFee (type alias)

Type alias for the CML LinearFee class

**Signature**

```ts
export type LinearFee = CML.LinearFee
```

Added in v2.0.0
