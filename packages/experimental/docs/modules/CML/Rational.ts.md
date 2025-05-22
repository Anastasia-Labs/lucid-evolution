---
title: CML/Rational.ts
nav_order: 183
parent: Modules
---

## Rational overview

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
  - [RationalError (class)](#rationalerror-class)
- [Methods](#methods)
  - [denominator](#denominator)
  - [free](#free)
  - [numerator](#numerator)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
- [MethodsUnsafe](#methodsunsafe)
  - [denominatorUnsafe](#denominatorunsafe)
  - [freeUnsafe](#freeunsafe)
  - [numeratorUnsafe](#numeratorunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
- [Types](#types)
  - [Rational (type alias)](#rational-type-alias)

---

# Constructors

## \_new

Static method \_new of Rational

**Signature**

```ts
export declare const _new: (
  numerator: bigint,
  denominator: bigint,
) => Effect.Effect<CML.Rational, RationalError>;
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of Rational

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.Rational, RationalError>;
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of Rational

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.Rational, RationalError>;
```

Added in v2.0.0

## fromJson

Static method fromJson of Rational

**Signature**

```ts
export declare const fromJson: (
  json: string,
) => Effect.Effect<CML.Rational, RationalError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls Rational.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (
  numerator: bigint,
  denominator: bigint,
) => CML.Rational;
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls Rational.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (
  cborBytes: Uint8Array,
) => CML.Rational;
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls Rational.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.Rational;
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls Rational.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.Rational;
```

Added in v2.0.0

# Errors

## RationalError (class)

Error class for Rational operations

This error is thrown when operations on Rational instances fail.

**Signature**

```ts
export declare class RationalError
```

Added in v2.0.0

# Methods

## denominator

Method denominator of Rational

**Signature**

```ts
export declare const denominator: (
  instance: CML.Rational,
) => Effect.Effect<bigint, RationalError>;
```

Added in v2.0.0

## free

Method free of Rational

**Signature**

```ts
export declare const free: (
  instance: CML.Rational,
) => Effect.Effect<void, RationalError>;
```

Added in v2.0.0

## numerator

Method numerator of Rational

**Signature**

```ts
export declare const numerator: (
  instance: CML.Rational,
) => Effect.Effect<bigint, RationalError>;
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of Rational

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.Rational,
) => Effect.Effect<Uint8Array, RationalError>;
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of Rational

**Signature**

```ts
export declare const toCanonicalCborHex: (
  instance: CML.Rational,
) => Effect.Effect<string, RationalError>;
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of Rational

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.Rational,
) => Effect.Effect<Uint8Array, RationalError>;
```

Added in v2.0.0

## toCborHex

Method toCborHex of Rational

**Signature**

```ts
export declare const toCborHex: (
  instance: CML.Rational,
) => Effect.Effect<string, RationalError>;
```

Added in v2.0.0

## toJsValue

Method toJsValue of Rational

**Signature**

```ts
export declare const toJsValue: (
  instance: CML.Rational,
) => Effect.Effect<any, RationalError>;
```

Added in v2.0.0

## toJson

Method toJson of Rational

**Signature**

```ts
export declare const toJson: (
  instance: CML.Rational,
) => Effect.Effect<string, RationalError>;
```

Added in v2.0.0

# MethodsUnsafe

## denominatorUnsafe

Unsafely calls instance.denominator without Effect wrapper

**Signature**

```ts
export declare const denominatorUnsafe: (instance: CML.Rational) => bigint;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.Rational) => void;
```

Added in v2.0.0

## numeratorUnsafe

Unsafely calls instance.numerator without Effect wrapper

**Signature**

```ts
export declare const numeratorUnsafe: (instance: CML.Rational) => bigint;
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (
  instance: CML.Rational,
) => Uint8Array;
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (
  instance: CML.Rational,
) => string;
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (instance: CML.Rational) => Uint8Array;
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.Rational) => string;
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.Rational) => any;
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.Rational) => string;
```

Added in v2.0.0

# Types

## Rational (type alias)

Type alias for the CML Rational class

**Signature**

```ts
export type Rational = CML.Rational;
```

Added in v2.0.0
