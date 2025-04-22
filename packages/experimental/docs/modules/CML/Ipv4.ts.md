---
title: CML/Ipv4.ts
nav_order: 114
parent: Modules
---

## Ipv4 overview

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
  - [Ipv4Error (class)](#ipv4error-class)
- [Methods](#methods)
  - [free](#free)
  - [get](#get)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
- [MethodsUnsafe](#methodsunsafe)
  - [freeUnsafe](#freeunsafe)
  - [getUnsafe](#getunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
- [Types](#types)
  - [Ipv4 (type alias)](#ipv4-type-alias)

---

# Constructors

## fromCborBytes

Static method fromCborBytes of Ipv4

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.Ipv4, Ipv4Error>;
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of Ipv4

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.Ipv4, Ipv4Error>;
```

Added in v2.0.0

## fromJson

Static method fromJson of Ipv4

**Signature**

```ts
export declare const fromJson: (
  json: string,
) => Effect.Effect<CML.Ipv4, Ipv4Error>;
```

Added in v2.0.0

# ConstructorsUnsafe

## fromCborBytesUnsafe

Unsafely calls Ipv4.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (cborBytes: Uint8Array) => CML.Ipv4;
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls Ipv4.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.Ipv4;
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls Ipv4.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.Ipv4;
```

Added in v2.0.0

# Errors

## Ipv4Error (class)

Error class for Ipv4 operations

This error is thrown when operations on Ipv4 instances fail.

**Signature**

```ts
export declare class Ipv4Error
```

Added in v2.0.0

# Methods

## free

Method free of Ipv4

**Signature**

```ts
export declare const free: (
  instance: CML.Ipv4,
) => Effect.Effect<void, Ipv4Error>;
```

Added in v2.0.0

## get

Method get of Ipv4

**Signature**

```ts
export declare const get: (
  instance: CML.Ipv4,
) => Effect.Effect<Uint8Array, Ipv4Error>;
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of Ipv4

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.Ipv4,
) => Effect.Effect<Uint8Array, Ipv4Error>;
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of Ipv4

**Signature**

```ts
export declare const toCanonicalCborHex: (
  instance: CML.Ipv4,
) => Effect.Effect<string, Ipv4Error>;
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of Ipv4

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.Ipv4,
) => Effect.Effect<Uint8Array, Ipv4Error>;
```

Added in v2.0.0

## toCborHex

Method toCborHex of Ipv4

**Signature**

```ts
export declare const toCborHex: (
  instance: CML.Ipv4,
) => Effect.Effect<string, Ipv4Error>;
```

Added in v2.0.0

## toJsValue

Method toJsValue of Ipv4

**Signature**

```ts
export declare const toJsValue: (
  instance: CML.Ipv4,
) => Effect.Effect<any, Ipv4Error>;
```

Added in v2.0.0

## toJson

Method toJson of Ipv4

**Signature**

```ts
export declare const toJson: (
  instance: CML.Ipv4,
) => Effect.Effect<string, Ipv4Error>;
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.Ipv4) => void;
```

Added in v2.0.0

## getUnsafe

Unsafely calls instance.get without Effect wrapper

**Signature**

```ts
export declare const getUnsafe: (instance: CML.Ipv4) => Uint8Array;
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (
  instance: CML.Ipv4,
) => Uint8Array;
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (instance: CML.Ipv4) => string;
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (instance: CML.Ipv4) => Uint8Array;
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.Ipv4) => string;
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.Ipv4) => any;
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.Ipv4) => string;
```

Added in v2.0.0

# Types

## Ipv4 (type alias)

Type alias for the CML Ipv4 class

**Signature**

```ts
export type Ipv4 = CML.Ipv4;
```

Added in v2.0.0
