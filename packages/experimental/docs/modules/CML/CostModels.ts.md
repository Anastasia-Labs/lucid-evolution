---
title: CML/CostModels.ts
nav_order: 57
parent: Modules
---

## CostModels overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [fromCborBytes](#fromcborbytes)
  - [fromCborHex](#fromcborhex)
  - [fromJson](#fromjson)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [fromCborBytesUnsafe](#fromcborbytesunsafe)
  - [fromCborHexUnsafe](#fromcborhexunsafe)
  - [fromJsonUnsafe](#fromjsonunsafe)
- [Errors](#errors)
  - [CostModelsError (class)](#costmodelserror-class)
- [Methods](#methods)
  - [free](#free)
  - [inner](#inner)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
- [MethodsUnsafe](#methodsunsafe)
  - [freeUnsafe](#freeunsafe)
  - [innerUnsafe](#innerunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
- [Types](#types)
  - [CostModels (type alias)](#costmodels-type-alias)

---

# Constructors

## fromCborBytes

Static method fromCborBytes of CostModels

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.CostModels, CostModelsError>;
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of CostModels

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.CostModels, CostModelsError>;
```

Added in v2.0.0

## fromJson

Static method fromJson of CostModels

**Signature**

```ts
export declare const fromJson: (
  json: string,
) => Effect.Effect<CML.CostModels, CostModelsError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## fromCborBytesUnsafe

Unsafely calls CostModels.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (
  cborBytes: Uint8Array,
) => CML.CostModels;
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls CostModels.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.CostModels;
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls CostModels.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.CostModels;
```

Added in v2.0.0

# Errors

## CostModelsError (class)

Error class for CostModels operations

This error is thrown when operations on CostModels instances fail.

**Signature**

```ts
export declare class CostModelsError
```

Added in v2.0.0

# Methods

## free

Method free of CostModels

**Signature**

```ts
export declare const free: (
  instance: CML.CostModels,
) => Effect.Effect<void, CostModelsError>;
```

Added in v2.0.0

## inner

Method inner of CostModels

**Signature**

```ts
export declare const inner: (
  instance: CML.CostModels,
) => Effect.Effect<CML.MapU64ToArrI64, CostModelsError>;
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of CostModels

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.CostModels,
) => Effect.Effect<Uint8Array, CostModelsError>;
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of CostModels

**Signature**

```ts
export declare const toCanonicalCborHex: (
  instance: CML.CostModels,
) => Effect.Effect<string, CostModelsError>;
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of CostModels

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.CostModels,
) => Effect.Effect<Uint8Array, CostModelsError>;
```

Added in v2.0.0

## toCborHex

Method toCborHex of CostModels

**Signature**

```ts
export declare const toCborHex: (
  instance: CML.CostModels,
) => Effect.Effect<string, CostModelsError>;
```

Added in v2.0.0

## toJsValue

Method toJsValue of CostModels

**Signature**

```ts
export declare const toJsValue: (
  instance: CML.CostModels,
) => Effect.Effect<any, CostModelsError>;
```

Added in v2.0.0

## toJson

Method toJson of CostModels

**Signature**

```ts
export declare const toJson: (
  instance: CML.CostModels,
) => Effect.Effect<string, CostModelsError>;
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.CostModels) => void;
```

Added in v2.0.0

## innerUnsafe

Unsafely calls instance.inner without Effect wrapper

**Signature**

```ts
export declare const innerUnsafe: (
  instance: CML.CostModels,
) => CML.MapU64ToArrI64;
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (
  instance: CML.CostModels,
) => Uint8Array;
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (
  instance: CML.CostModels,
) => string;
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (
  instance: CML.CostModels,
) => Uint8Array;
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.CostModels) => string;
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.CostModels) => any;
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.CostModels) => string;
```

Added in v2.0.0

# Types

## CostModels (type alias)

Type alias for the CML CostModels class

**Signature**

```ts
export type CostModels = CML.CostModels;
```

Added in v2.0.0
