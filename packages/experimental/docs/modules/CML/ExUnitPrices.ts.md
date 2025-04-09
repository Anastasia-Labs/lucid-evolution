---
title: CML/ExUnitPrices.ts
nav_order: 93
parent: Modules
---

## ExUnitPrices overview

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
  - [ExUnitPricesError (class)](#exunitpriceserror-class)
- [Methods](#methods)
  - [free](#free)
  - [memPrice](#memprice)
  - [stepPrice](#stepprice)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
- [MethodsUnsafe](#methodsunsafe)
  - [freeUnsafe](#freeunsafe)
  - [memPriceUnsafe](#mempriceunsafe)
  - [stepPriceUnsafe](#steppriceunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
- [Types](#types)
  - [ExUnitPrices (type alias)](#exunitprices-type-alias)

---

# Constructors

## \_new

Static method \_new of ExUnitPrices

**Signature**

```ts
export declare const _new: (
  memPrice: CML.Rational,
  stepPrice: CML.Rational,
) => Effect.Effect<CML.ExUnitPrices, ExUnitPricesError>;
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of ExUnitPrices

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.ExUnitPrices, ExUnitPricesError>;
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of ExUnitPrices

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.ExUnitPrices, ExUnitPricesError>;
```

Added in v2.0.0

## fromJson

Static method fromJson of ExUnitPrices

**Signature**

```ts
export declare const fromJson: (
  json: string,
) => Effect.Effect<CML.ExUnitPrices, ExUnitPricesError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls ExUnitPrices.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (
  memPrice: CML.Rational,
  stepPrice: CML.Rational,
) => CML.ExUnitPrices;
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls ExUnitPrices.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (
  cborBytes: Uint8Array,
) => CML.ExUnitPrices;
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls ExUnitPrices.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.ExUnitPrices;
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls ExUnitPrices.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.ExUnitPrices;
```

Added in v2.0.0

# Errors

## ExUnitPricesError (class)

Error class for ExUnitPrices operations

This error is thrown when operations on ExUnitPrices instances fail.

**Signature**

```ts
export declare class ExUnitPricesError
```

Added in v2.0.0

# Methods

## free

Method free of ExUnitPrices

**Signature**

```ts
export declare const free: (
  instance: CML.ExUnitPrices,
) => Effect.Effect<void, ExUnitPricesError>;
```

Added in v2.0.0

## memPrice

Method memPrice of ExUnitPrices

**Signature**

```ts
export declare const memPrice: (
  instance: CML.ExUnitPrices,
) => Effect.Effect<CML.Rational, ExUnitPricesError>;
```

Added in v2.0.0

## stepPrice

Method stepPrice of ExUnitPrices

**Signature**

```ts
export declare const stepPrice: (
  instance: CML.ExUnitPrices,
) => Effect.Effect<CML.Rational, ExUnitPricesError>;
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of ExUnitPrices

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.ExUnitPrices,
) => Effect.Effect<Uint8Array, ExUnitPricesError>;
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of ExUnitPrices

**Signature**

```ts
export declare const toCanonicalCborHex: (
  instance: CML.ExUnitPrices,
) => Effect.Effect<string, ExUnitPricesError>;
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of ExUnitPrices

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.ExUnitPrices,
) => Effect.Effect<Uint8Array, ExUnitPricesError>;
```

Added in v2.0.0

## toCborHex

Method toCborHex of ExUnitPrices

**Signature**

```ts
export declare const toCborHex: (
  instance: CML.ExUnitPrices,
) => Effect.Effect<string, ExUnitPricesError>;
```

Added in v2.0.0

## toJsValue

Method toJsValue of ExUnitPrices

**Signature**

```ts
export declare const toJsValue: (
  instance: CML.ExUnitPrices,
) => Effect.Effect<any, ExUnitPricesError>;
```

Added in v2.0.0

## toJson

Method toJson of ExUnitPrices

**Signature**

```ts
export declare const toJson: (
  instance: CML.ExUnitPrices,
) => Effect.Effect<string, ExUnitPricesError>;
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.ExUnitPrices) => void;
```

Added in v2.0.0

## memPriceUnsafe

Unsafely calls instance.memPrice without Effect wrapper

**Signature**

```ts
export declare const memPriceUnsafe: (
  instance: CML.ExUnitPrices,
) => CML.Rational;
```

Added in v2.0.0

## stepPriceUnsafe

Unsafely calls instance.stepPrice without Effect wrapper

**Signature**

```ts
export declare const stepPriceUnsafe: (
  instance: CML.ExUnitPrices,
) => CML.Rational;
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (
  instance: CML.ExUnitPrices,
) => Uint8Array;
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (
  instance: CML.ExUnitPrices,
) => string;
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (
  instance: CML.ExUnitPrices,
) => Uint8Array;
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.ExUnitPrices) => string;
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.ExUnitPrices) => any;
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.ExUnitPrices) => string;
```

Added in v2.0.0

# Types

## ExUnitPrices (type alias)

Type alias for the CML ExUnitPrices class

**Signature**

```ts
export type ExUnitPrices = CML.ExUnitPrices;
```

Added in v2.0.0
