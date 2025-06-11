---
title: CML/ExUnits.ts
nav_order: 98
parent: Modules
---

## ExUnits overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
  - [fromCborBytes](#fromcborbytes)
  - [fromCborHex](#fromcborhex)
  - [fromJson](#fromjson)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
  - [fromCborBytesUnsafe](#fromcborbytesunsafe)
  - [fromCborHexUnsafe](#fromcborhexunsafe)
  - [fromJsonUnsafe](#fromjsonunsafe)
- [Errors](#errors)
  - [ExUnitsError (class)](#exunitserror-class)
- [Methods](#methods)
  - [checkedAdd](#checkedadd)
  - [free](#free)
  - [mem](#mem)
  - [steps](#steps)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
- [MethodsUnsafe](#methodsunsafe)
  - [checkedAddUnsafe](#checkedaddunsafe)
  - [freeUnsafe](#freeunsafe)
  - [memUnsafe](#memunsafe)
  - [stepsUnsafe](#stepsunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
- [Types](#types)
  - [ExUnits (type alias)](#exunits-type-alias)

---

# Constructors

## \_new

Static method \_new of ExUnits

**Signature**

```ts
export declare const _new: (
  mem: bigint,
  steps: bigint,
) => Effect.Effect<CML.ExUnits, ExUnitsError>;
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of ExUnits

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.ExUnits, ExUnitsError>;
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of ExUnits

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.ExUnits, ExUnitsError>;
```

Added in v2.0.0

## fromJson

Static method fromJson of ExUnits

**Signature**

```ts
export declare const fromJson: (
  json: string,
) => Effect.Effect<CML.ExUnits, ExUnitsError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls ExUnits.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (mem: bigint, steps: bigint) => CML.ExUnits;
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls ExUnits.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (
  cborBytes: Uint8Array,
) => CML.ExUnits;
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls ExUnits.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.ExUnits;
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls ExUnits.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.ExUnits;
```

Added in v2.0.0

# Errors

## ExUnitsError (class)

Error class for ExUnits operations

This error is thrown when operations on ExUnits instances fail.

**Signature**

```ts
export declare class ExUnitsError
```

Added in v2.0.0

# Methods

## checkedAdd

Method checkedAdd of ExUnits

**Signature**

```ts
export declare const checkedAdd: (
  instance: CML.ExUnits,
  other: CML.ExUnits,
) => Effect.Effect<CML.ExUnits, ExUnitsError>;
```

Added in v2.0.0

## free

Method free of ExUnits

**Signature**

```ts
export declare const free: (
  instance: CML.ExUnits,
) => Effect.Effect<void, ExUnitsError>;
```

Added in v2.0.0

## mem

Method mem of ExUnits

**Signature**

```ts
export declare const mem: (
  instance: CML.ExUnits,
) => Effect.Effect<bigint, ExUnitsError>;
```

Added in v2.0.0

## steps

Method steps of ExUnits

**Signature**

```ts
export declare const steps: (
  instance: CML.ExUnits,
) => Effect.Effect<bigint, ExUnitsError>;
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of ExUnits

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.ExUnits,
) => Effect.Effect<Uint8Array, ExUnitsError>;
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of ExUnits

**Signature**

```ts
export declare const toCanonicalCborHex: (
  instance: CML.ExUnits,
) => Effect.Effect<string, ExUnitsError>;
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of ExUnits

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.ExUnits,
) => Effect.Effect<Uint8Array, ExUnitsError>;
```

Added in v2.0.0

## toCborHex

Method toCborHex of ExUnits

**Signature**

```ts
export declare const toCborHex: (
  instance: CML.ExUnits,
) => Effect.Effect<string, ExUnitsError>;
```

Added in v2.0.0

## toJsValue

Method toJsValue of ExUnits

**Signature**

```ts
export declare const toJsValue: (
  instance: CML.ExUnits,
) => Effect.Effect<any, ExUnitsError>;
```

Added in v2.0.0

## toJson

Method toJson of ExUnits

**Signature**

```ts
export declare const toJson: (
  instance: CML.ExUnits,
) => Effect.Effect<string, ExUnitsError>;
```

Added in v2.0.0

# MethodsUnsafe

## checkedAddUnsafe

Unsafely calls instance.checkedAdd without Effect wrapper

**Signature**

```ts
export declare const checkedAddUnsafe: (
  instance: CML.ExUnits,
  other: CML.ExUnits,
) => CML.ExUnits;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.ExUnits) => void;
```

Added in v2.0.0

## memUnsafe

Unsafely calls instance.mem without Effect wrapper

**Signature**

```ts
export declare const memUnsafe: (instance: CML.ExUnits) => bigint;
```

Added in v2.0.0

## stepsUnsafe

Unsafely calls instance.steps without Effect wrapper

**Signature**

```ts
export declare const stepsUnsafe: (instance: CML.ExUnits) => bigint;
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (
  instance: CML.ExUnits,
) => Uint8Array;
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (
  instance: CML.ExUnits,
) => string;
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (instance: CML.ExUnits) => Uint8Array;
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.ExUnits) => string;
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.ExUnits) => any;
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.ExUnits) => string;
```

Added in v2.0.0

# Types

## ExUnits (type alias)

Type alias for the CML ExUnits class

**Signature**

```ts
export type ExUnits = CML.ExUnits;
```

Added in v2.0.0
