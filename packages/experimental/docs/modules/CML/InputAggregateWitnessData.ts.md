---
title: CML/InputAggregateWitnessData.ts
nav_order: 109
parent: Modules
---

## InputAggregateWitnessData overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Errors](#errors)
  - [InputAggregateWitnessDataError (class)](#inputaggregatewitnessdataerror-class)
- [Methods](#methods)
  - [free](#free)
  - [plutusData](#plutusdata)
- [MethodsUnsafe](#methodsunsafe)
  - [freeUnsafe](#freeunsafe)
  - [plutusDataUnsafe](#plutusdataunsafe)
- [Types](#types)
  - [InputAggregateWitnessData (type alias)](#inputaggregatewitnessdata-type-alias)

---

# Errors

## InputAggregateWitnessDataError (class)

Error class for InputAggregateWitnessData operations

This error is thrown when operations on InputAggregateWitnessData instances fail.

**Signature**

```ts
export declare class InputAggregateWitnessDataError
```

Added in v2.0.0

# Methods

## free

Method free of InputAggregateWitnessData

**Signature**

```ts
export declare const free: (
  instance: CML.InputAggregateWitnessData
) => Effect.Effect<void, InputAggregateWitnessDataError>
```

Added in v2.0.0

## plutusData

Method plutusData of InputAggregateWitnessData

**Signature**

```ts
export declare const plutusData: (
  instance: CML.InputAggregateWitnessData
) => Effect.Effect<CML.PlutusData | undefined, InputAggregateWitnessDataError>
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.InputAggregateWitnessData) => void
```

Added in v2.0.0

## plutusDataUnsafe

Unsafely calls instance.plutusData without Effect wrapper

**Signature**

```ts
export declare const plutusDataUnsafe: (instance: CML.InputAggregateWitnessData) => CML.PlutusData | undefined
```

Added in v2.0.0

# Types

## InputAggregateWitnessData (type alias)

Type alias for the CML InputAggregateWitnessData class

**Signature**

```ts
export type InputAggregateWitnessData = CML.InputAggregateWitnessData
```

Added in v2.0.0
