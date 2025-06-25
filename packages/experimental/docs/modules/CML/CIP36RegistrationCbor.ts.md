---
title: CML/CIP36RegistrationCbor.ts
nav_order: 50
parent: Modules
---

## CIP36RegistrationCbor overview

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
  - [CIP36RegistrationCborError (class)](#cip36registrationcborerror-class)
- [Methods](#methods)
  - [free](#free)
  - [keyRegistration](#keyregistration)
  - [registrationWitness](#registrationwitness)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
- [MethodsUnsafe](#methodsunsafe)
  - [freeUnsafe](#freeunsafe)
  - [keyRegistrationUnsafe](#keyregistrationunsafe)
  - [registrationWitnessUnsafe](#registrationwitnessunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
- [Types](#types)
  - [CIP36RegistrationCbor (type alias)](#cip36registrationcbor-type-alias)

---

# Constructors

## \_new

Static method \_new of CIP36RegistrationCbor

**Signature**

```ts
export declare const _new: (
  keyRegistration: CML.CIP36KeyRegistration,
  registrationWitness: CML.CIP36RegistrationWitness,
) => Effect.Effect<CML.CIP36RegistrationCbor, CIP36RegistrationCborError>;
```

Added in v2.0.0

## fromJson

Static method fromJson of CIP36RegistrationCbor

**Signature**

```ts
export declare const fromJson: (
  json: string,
) => Effect.Effect<CML.CIP36RegistrationCbor, CIP36RegistrationCborError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls CIP36RegistrationCbor.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (
  keyRegistration: CML.CIP36KeyRegistration,
  registrationWitness: CML.CIP36RegistrationWitness,
) => CML.CIP36RegistrationCbor;
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls CIP36RegistrationCbor.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (
  json: string,
) => CML.CIP36RegistrationCbor;
```

Added in v2.0.0

# Errors

## CIP36RegistrationCborError (class)

Error class for CIP36RegistrationCbor operations

This error is thrown when operations on CIP36RegistrationCbor instances fail.

**Signature**

```ts
export declare class CIP36RegistrationCborError
```

Added in v2.0.0

# Methods

## free

Method free of CIP36RegistrationCbor

**Signature**

```ts
export declare const free: (
  instance: CML.CIP36RegistrationCbor,
) => Effect.Effect<void, CIP36RegistrationCborError>;
```

Added in v2.0.0

## keyRegistration

Method keyRegistration of CIP36RegistrationCbor

**Signature**

```ts
export declare const keyRegistration: (
  instance: CML.CIP36RegistrationCbor,
) => Effect.Effect<CML.CIP36KeyRegistration, CIP36RegistrationCborError>;
```

Added in v2.0.0

## registrationWitness

Method registrationWitness of CIP36RegistrationCbor

**Signature**

```ts
export declare const registrationWitness: (
  instance: CML.CIP36RegistrationCbor,
) => Effect.Effect<CML.CIP36RegistrationWitness, CIP36RegistrationCborError>;
```

Added in v2.0.0

## toJsValue

Method toJsValue of CIP36RegistrationCbor

**Signature**

```ts
export declare const toJsValue: (
  instance: CML.CIP36RegistrationCbor,
) => Effect.Effect<any, CIP36RegistrationCborError>;
```

Added in v2.0.0

## toJson

Method toJson of CIP36RegistrationCbor

**Signature**

```ts
export declare const toJson: (
  instance: CML.CIP36RegistrationCbor,
) => Effect.Effect<string, CIP36RegistrationCborError>;
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.CIP36RegistrationCbor) => void;
```

Added in v2.0.0

## keyRegistrationUnsafe

Unsafely calls instance.keyRegistration without Effect wrapper

**Signature**

```ts
export declare const keyRegistrationUnsafe: (
  instance: CML.CIP36RegistrationCbor,
) => CML.CIP36KeyRegistration;
```

Added in v2.0.0

## registrationWitnessUnsafe

Unsafely calls instance.registrationWitness without Effect wrapper

**Signature**

```ts
export declare const registrationWitnessUnsafe: (
  instance: CML.CIP36RegistrationCbor,
) => CML.CIP36RegistrationWitness;
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (
  instance: CML.CIP36RegistrationCbor,
) => any;
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (
  instance: CML.CIP36RegistrationCbor,
) => string;
```

Added in v2.0.0

# Types

## CIP36RegistrationCbor (type alias)

Type alias for the CML CIP36RegistrationCbor class

**Signature**

```ts
export type CIP36RegistrationCbor = CML.CIP36RegistrationCbor;
```

Added in v2.0.0
