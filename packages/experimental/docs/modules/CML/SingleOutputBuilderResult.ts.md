---
title: CML/SingleOutputBuilderResult.ts
nav_order: 213
parent: Modules
---

## SingleOutputBuilderResult overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
- [Errors](#errors)
  - [SingleOutputBuilderResultError (class)](#singleoutputbuilderresulterror-class)
- [Methods](#methods)
  - [communicationDatum](#communicationdatum)
  - [free](#free)
  - [output](#output)
- [MethodsUnsafe](#methodsunsafe)
  - [communicationDatumUnsafe](#communicationdatumunsafe)
  - [freeUnsafe](#freeunsafe)
  - [outputUnsafe](#outputunsafe)
- [Types](#types)
  - [SingleOutputBuilderResult (type alias)](#singleoutputbuilderresult-type-alias)

---

# Constructors

## \_new

Static method \_new of SingleOutputBuilderResult

**Signature**

```ts
export declare const _new: (
  output: CML.TransactionOutput
) => Effect.Effect<CML.SingleOutputBuilderResult, SingleOutputBuilderResultError>
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls SingleOutputBuilderResult.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (output: CML.TransactionOutput) => CML.SingleOutputBuilderResult
```

Added in v2.0.0

# Errors

## SingleOutputBuilderResultError (class)

Error class for SingleOutputBuilderResult operations

This error is thrown when operations on SingleOutputBuilderResult instances fail.

**Signature**

```ts
export declare class SingleOutputBuilderResultError
```

Added in v2.0.0

# Methods

## communicationDatum

Method communicationDatum of SingleOutputBuilderResult

**Signature**

```ts
export declare const communicationDatum: (
  instance: CML.SingleOutputBuilderResult
) => Effect.Effect<CML.PlutusData | undefined, SingleOutputBuilderResultError>
```

Added in v2.0.0

## free

Method free of SingleOutputBuilderResult

**Signature**

```ts
export declare const free: (
  instance: CML.SingleOutputBuilderResult
) => Effect.Effect<void, SingleOutputBuilderResultError>
```

Added in v2.0.0

## output

Method output of SingleOutputBuilderResult

**Signature**

```ts
export declare const output: (
  instance: CML.SingleOutputBuilderResult
) => Effect.Effect<CML.TransactionOutput, SingleOutputBuilderResultError>
```

Added in v2.0.0

# MethodsUnsafe

## communicationDatumUnsafe

Unsafely calls instance.communicationDatum without Effect wrapper

**Signature**

```ts
export declare const communicationDatumUnsafe: (instance: CML.SingleOutputBuilderResult) => CML.PlutusData | undefined
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.SingleOutputBuilderResult) => void
```

Added in v2.0.0

## outputUnsafe

Unsafely calls instance.output without Effect wrapper

**Signature**

```ts
export declare const outputUnsafe: (instance: CML.SingleOutputBuilderResult) => CML.TransactionOutput
```

Added in v2.0.0

# Types

## SingleOutputBuilderResult (type alias)

Type alias for the CML SingleOutputBuilderResult class

**Signature**

```ts
export type SingleOutputBuilderResult = CML.SingleOutputBuilderResult
```

Added in v2.0.0
