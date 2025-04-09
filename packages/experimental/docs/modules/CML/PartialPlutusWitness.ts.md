---
title: CML/PartialPlutusWitness.ts
nav_order: 148
parent: Modules
---

## PartialPlutusWitness overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
- [Errors](#errors)
  - [PartialPlutusWitnessError (class)](#partialplutuswitnesserror-class)
- [Methods](#methods)
  - [data](#data)
  - [free](#free)
  - [script](#script)
- [MethodsUnsafe](#methodsunsafe)
  - [dataUnsafe](#dataunsafe)
  - [freeUnsafe](#freeunsafe)
  - [scriptUnsafe](#scriptunsafe)
- [Types](#types)
  - [PartialPlutusWitness (type alias)](#partialplutuswitness-type-alias)

---

# Constructors

## \_new

Static method \_new of PartialPlutusWitness

**Signature**

```ts
export declare const _new: (
  script: CML.PlutusScriptWitness,
  data: CML.PlutusData,
) => Effect.Effect<CML.PartialPlutusWitness, PartialPlutusWitnessError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls PartialPlutusWitness.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (
  script: CML.PlutusScriptWitness,
  data: CML.PlutusData,
) => CML.PartialPlutusWitness;
```

Added in v2.0.0

# Errors

## PartialPlutusWitnessError (class)

Error class for PartialPlutusWitness operations

This error is thrown when operations on PartialPlutusWitness instances fail.

**Signature**

```ts
export declare class PartialPlutusWitnessError
```

Added in v2.0.0

# Methods

## data

Method data of PartialPlutusWitness

**Signature**

```ts
export declare const data: (
  instance: CML.PartialPlutusWitness,
) => Effect.Effect<CML.PlutusData, PartialPlutusWitnessError>;
```

Added in v2.0.0

## free

Method free of PartialPlutusWitness

**Signature**

```ts
export declare const free: (
  instance: CML.PartialPlutusWitness,
) => Effect.Effect<void, PartialPlutusWitnessError>;
```

Added in v2.0.0

## script

Method script of PartialPlutusWitness

**Signature**

```ts
export declare const script: (
  instance: CML.PartialPlutusWitness,
) => Effect.Effect<CML.PlutusScriptWitness, PartialPlutusWitnessError>;
```

Added in v2.0.0

# MethodsUnsafe

## dataUnsafe

Unsafely calls instance.data without Effect wrapper

**Signature**

```ts
export declare const dataUnsafe: (
  instance: CML.PartialPlutusWitness,
) => CML.PlutusData;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.PartialPlutusWitness) => void;
```

Added in v2.0.0

## scriptUnsafe

Unsafely calls instance.script without Effect wrapper

**Signature**

```ts
export declare const scriptUnsafe: (
  instance: CML.PartialPlutusWitness,
) => CML.PlutusScriptWitness;
```

Added in v2.0.0

# Types

## PartialPlutusWitness (type alias)

Type alias for the CML PartialPlutusWitness class

**Signature**

```ts
export type PartialPlutusWitness = CML.PartialPlutusWitness;
```

Added in v2.0.0
