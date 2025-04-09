---
title: CML/BigInteger.ts
nav_order: 15
parent: Modules
---

## BigInteger overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [fromCborBytes](#fromcborbytes)
  - [fromCborHex](#fromcborhex)
  - [fromInt](#fromint)
  - [fromJson](#fromjson)
  - [fromStr](#fromstr)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [fromCborBytesUnsafe](#fromcborbytesunsafe)
  - [fromCborHexUnsafe](#fromcborhexunsafe)
  - [fromIntUnsafe](#fromintunsafe)
  - [fromJsonUnsafe](#fromjsonunsafe)
  - [fromStrUnsafe](#fromstrunsafe)
- [Errors](#errors)
  - [BigIntegerError (class)](#bigintegererror-class)
- [Methods](#methods)
  - [asInt](#asint)
  - [asU64](#asu64)
  - [free](#free)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
  - [toStr](#tostr)
- [MethodsUnsafe](#methodsunsafe)
  - [asIntUnsafe](#asintunsafe)
  - [asU64Unsafe](#asu64unsafe)
  - [freeUnsafe](#freeunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
  - [toStrUnsafe](#tostrunsafe)
- [Types](#types)
  - [BigInteger (type alias)](#biginteger-type-alias)

---

# Constructors

## fromCborBytes

Static method fromCborBytes of BigInteger

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.BigInteger, BigIntegerError>;
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of BigInteger

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.BigInteger, BigIntegerError>;
```

Added in v2.0.0

## fromInt

Static method fromInt of BigInteger

**Signature**

```ts
export declare const fromInt: (
  x: CML.Int,
) => Effect.Effect<CML.BigInteger, BigIntegerError>;
```

Added in v2.0.0

## fromJson

Static method fromJson of BigInteger

**Signature**

```ts
export declare const fromJson: (
  json: string,
) => Effect.Effect<CML.BigInteger, BigIntegerError>;
```

Added in v2.0.0

## fromStr

Static method fromStr of BigInteger

**Signature**

```ts
export declare const fromStr: (
  s: string,
) => Effect.Effect<CML.BigInteger, BigIntegerError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## fromCborBytesUnsafe

Unsafely calls BigInteger.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (
  cborBytes: Uint8Array,
) => CML.BigInteger;
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls BigInteger.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.BigInteger;
```

Added in v2.0.0

## fromIntUnsafe

Unsafely calls BigInteger.fromInt without Effect wrapper

**Signature**

```ts
export declare const fromIntUnsafe: (x: CML.Int) => CML.BigInteger;
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls BigInteger.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.BigInteger;
```

Added in v2.0.0

## fromStrUnsafe

Unsafely calls BigInteger.fromStr without Effect wrapper

**Signature**

```ts
export declare const fromStrUnsafe: (s: string) => CML.BigInteger;
```

Added in v2.0.0

# Errors

## BigIntegerError (class)

Error class for BigInteger operations

This error is thrown when operations on BigInteger instances fail.

**Signature**

```ts
export declare class BigIntegerError
```

Added in v2.0.0

# Methods

## asInt

Method asInt of BigInteger

**Signature**

```ts
export declare const asInt: (
  instance: CML.BigInteger,
) => Effect.Effect<CML.Int | undefined, BigIntegerError>;
```

Added in v2.0.0

## asU64

Method asU64 of BigInteger

**Signature**

```ts
export declare const asU64: (
  instance: CML.BigInteger,
) => Effect.Effect<bigint | undefined, BigIntegerError>;
```

Added in v2.0.0

## free

Method free of BigInteger

**Signature**

```ts
export declare const free: (
  instance: CML.BigInteger,
) => Effect.Effect<void, BigIntegerError>;
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of BigInteger

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.BigInteger,
) => Effect.Effect<Uint8Array, BigIntegerError>;
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of BigInteger

**Signature**

```ts
export declare const toCanonicalCborHex: (
  instance: CML.BigInteger,
) => Effect.Effect<string, BigIntegerError>;
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of BigInteger

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.BigInteger,
) => Effect.Effect<Uint8Array, BigIntegerError>;
```

Added in v2.0.0

## toCborHex

Method toCborHex of BigInteger

**Signature**

```ts
export declare const toCborHex: (
  instance: CML.BigInteger,
) => Effect.Effect<string, BigIntegerError>;
```

Added in v2.0.0

## toJsValue

Method toJsValue of BigInteger

**Signature**

```ts
export declare const toJsValue: (
  instance: CML.BigInteger,
) => Effect.Effect<any, BigIntegerError>;
```

Added in v2.0.0

## toJson

Method toJson of BigInteger

**Signature**

```ts
export declare const toJson: (
  instance: CML.BigInteger,
) => Effect.Effect<string, BigIntegerError>;
```

Added in v2.0.0

## toStr

Method toStr of BigInteger

**Signature**

```ts
export declare const toStr: (
  instance: CML.BigInteger,
) => Effect.Effect<string, BigIntegerError>;
```

Added in v2.0.0

# MethodsUnsafe

## asIntUnsafe

Unsafely calls instance.asInt without Effect wrapper

**Signature**

```ts
export declare const asIntUnsafe: (
  instance: CML.BigInteger,
) => CML.Int | undefined;
```

Added in v2.0.0

## asU64Unsafe

Unsafely calls instance.asU64 without Effect wrapper

**Signature**

```ts
export declare const asU64Unsafe: (
  instance: CML.BigInteger,
) => bigint | undefined;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.BigInteger) => void;
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (
  instance: CML.BigInteger,
) => Uint8Array;
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (
  instance: CML.BigInteger,
) => string;
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (
  instance: CML.BigInteger,
) => Uint8Array;
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.BigInteger) => string;
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.BigInteger) => any;
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.BigInteger) => string;
```

Added in v2.0.0

## toStrUnsafe

Unsafely calls instance.toStr without Effect wrapper

**Signature**

```ts
export declare const toStrUnsafe: (instance: CML.BigInteger) => string;
```

Added in v2.0.0

# Types

## BigInteger (type alias)

Type alias for the CML BigInteger class

**Signature**

```ts
export type BigInteger = CML.BigInteger;
```

Added in v2.0.0
