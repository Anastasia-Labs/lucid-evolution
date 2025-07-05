---
title: CML/CIP36DeregistrationCbor.ts
nav_order: 46
parent: Modules
---

## CIP36DeregistrationCbor overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
  - [fromJson](#fromjson)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
  - [fromJsonUnsafe](#fromjsonunsafe)
- [Errors](#errors)
  - [CIP36DeregistrationCborError (class)](#cip36deregistrationcborerror-class)
- [Methods](#methods)
  - [deregistrationWitness](#deregistrationwitness)
  - [free](#free)
  - [keyDeregistration](#keyderegistration)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
- [MethodsUnsafe](#methodsunsafe)
  - [deregistrationWitnessUnsafe](#deregistrationwitnessunsafe)
  - [freeUnsafe](#freeunsafe)
  - [keyDeregistrationUnsafe](#keyderegistrationunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
- [Types](#types)
  - [CIP36DeregistrationCbor (type alias)](#cip36deregistrationcbor-type-alias)

---

# Constructors

## \_new

Static method \_new of CIP36DeregistrationCbor

**Signature**

```ts
export declare const _new: (
  keyDeregistration: CML.CIP36KeyDeregistration,
  deregistrationWitness: CML.CIP36DeregistrationWitness,
) => Effect.Effect<CML.CIP36DeregistrationCbor, CIP36DeregistrationCborError>;
```

Added in v2.0.0

## fromJson

Static method fromJson of CIP36DeregistrationCbor

**Signature**

```ts
export declare const fromJson: (
  json: string,
) => Effect.Effect<CML.CIP36DeregistrationCbor, CIP36DeregistrationCborError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls CIP36DeregistrationCbor.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (
  keyDeregistration: CML.CIP36KeyDeregistration,
  deregistrationWitness: CML.CIP36DeregistrationWitness,
) => CML.CIP36DeregistrationCbor;
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls CIP36DeregistrationCbor.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (
  json: string,
) => CML.CIP36DeregistrationCbor;
```

Added in v2.0.0

# Errors

## CIP36DeregistrationCborError (class)

Error class for CIP36DeregistrationCbor operations

This error is thrown when operations on CIP36DeregistrationCbor instances fail.

**Signature**

```ts
export declare class CIP36DeregistrationCborError
```

Added in v2.0.0

# Methods

## deregistrationWitness

Method deregistrationWitness of CIP36DeregistrationCbor

**Signature**

```ts
export declare const deregistrationWitness: (
  instance: CML.CIP36DeregistrationCbor,
) => Effect.Effect<
  CML.CIP36DeregistrationWitness,
  CIP36DeregistrationCborError
>;
```

Added in v2.0.0

## free

Method free of CIP36DeregistrationCbor

**Signature**

```ts
export declare const free: (
  instance: CML.CIP36DeregistrationCbor,
) => Effect.Effect<void, CIP36DeregistrationCborError>;
```

Added in v2.0.0

## keyDeregistration

Method keyDeregistration of CIP36DeregistrationCbor

**Signature**

```ts
export declare const keyDeregistration: (
  instance: CML.CIP36DeregistrationCbor,
) => Effect.Effect<CML.CIP36KeyDeregistration, CIP36DeregistrationCborError>;
```

Added in v2.0.0

## toJsValue

Method toJsValue of CIP36DeregistrationCbor

**Signature**

```ts
export declare const toJsValue: (
  instance: CML.CIP36DeregistrationCbor,
) => Effect.Effect<any, CIP36DeregistrationCborError>;
```

Added in v2.0.0

## toJson

Method toJson of CIP36DeregistrationCbor

**Signature**

```ts
export declare const toJson: (
  instance: CML.CIP36DeregistrationCbor,
) => Effect.Effect<string, CIP36DeregistrationCborError>;
```

Added in v2.0.0

# MethodsUnsafe

## deregistrationWitnessUnsafe

Unsafely calls instance.deregistrationWitness without Effect wrapper

**Signature**

```ts
export declare const deregistrationWitnessUnsafe: (
  instance: CML.CIP36DeregistrationCbor,
) => CML.CIP36DeregistrationWitness;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (
  instance: CML.CIP36DeregistrationCbor,
) => void;
```

Added in v2.0.0

## keyDeregistrationUnsafe

Unsafely calls instance.keyDeregistration without Effect wrapper

**Signature**

```ts
export declare const keyDeregistrationUnsafe: (
  instance: CML.CIP36DeregistrationCbor,
) => CML.CIP36KeyDeregistration;
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (
  instance: CML.CIP36DeregistrationCbor,
) => any;
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (
  instance: CML.CIP36DeregistrationCbor,
) => string;
```

Added in v2.0.0

# Types

## CIP36DeregistrationCbor (type alias)

Type alias for the CML CIP36DeregistrationCbor class

**Signature**

```ts
export type CIP36DeregistrationCbor = CML.CIP36DeregistrationCbor;
```

Added in v2.0.0
