---
title: CML/SingleHostAddr.ts
nav_order: 210
parent: Modules
---

## SingleHostAddr overview

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
  - [SingleHostAddrError (class)](#singlehostaddrerror-class)
- [Methods](#methods)
  - [free](#free)
  - [ipv4](#ipv4)
  - [ipv6](#ipv6)
  - [port](#port)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
- [MethodsUnsafe](#methodsunsafe)
  - [freeUnsafe](#freeunsafe)
  - [ipv4Unsafe](#ipv4unsafe)
  - [ipv6Unsafe](#ipv6unsafe)
  - [portUnsafe](#portunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
- [Types](#types)
  - [SingleHostAddr (type alias)](#singlehostaddr-type-alias)

---

# Constructors

## \_new

Static method \_new of SingleHostAddr

**Signature**

```ts
export declare const _new: (
  port: number,
  ipv4: CML.Ipv4,
  ipv6: CML.Ipv6,
) => Effect.Effect<CML.SingleHostAddr, SingleHostAddrError>;
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of SingleHostAddr

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.SingleHostAddr, SingleHostAddrError>;
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of SingleHostAddr

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.SingleHostAddr, SingleHostAddrError>;
```

Added in v2.0.0

## fromJson

Static method fromJson of SingleHostAddr

**Signature**

```ts
export declare const fromJson: (
  json: string,
) => Effect.Effect<CML.SingleHostAddr, SingleHostAddrError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls SingleHostAddr.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (
  port: number,
  ipv4: CML.Ipv4,
  ipv6: CML.Ipv6,
) => CML.SingleHostAddr;
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls SingleHostAddr.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (
  cborBytes: Uint8Array,
) => CML.SingleHostAddr;
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls SingleHostAddr.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (
  cborBytes: string,
) => CML.SingleHostAddr;
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls SingleHostAddr.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.SingleHostAddr;
```

Added in v2.0.0

# Errors

## SingleHostAddrError (class)

Error class for SingleHostAddr operations

This error is thrown when operations on SingleHostAddr instances fail.

**Signature**

```ts
export declare class SingleHostAddrError
```

Added in v2.0.0

# Methods

## free

Method free of SingleHostAddr

**Signature**

```ts
export declare const free: (
  instance: CML.SingleHostAddr,
) => Effect.Effect<void, SingleHostAddrError>;
```

Added in v2.0.0

## ipv4

Method ipv4 of SingleHostAddr

**Signature**

```ts
export declare const ipv4: (
  instance: CML.SingleHostAddr,
) => Effect.Effect<CML.Ipv4 | undefined, SingleHostAddrError>;
```

Added in v2.0.0

## ipv6

Method ipv6 of SingleHostAddr

**Signature**

```ts
export declare const ipv6: (
  instance: CML.SingleHostAddr,
) => Effect.Effect<CML.Ipv6 | undefined, SingleHostAddrError>;
```

Added in v2.0.0

## port

Method port of SingleHostAddr

**Signature**

```ts
export declare const port: (
  instance: CML.SingleHostAddr,
) => Effect.Effect<number | undefined, SingleHostAddrError>;
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of SingleHostAddr

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.SingleHostAddr,
) => Effect.Effect<Uint8Array, SingleHostAddrError>;
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of SingleHostAddr

**Signature**

```ts
export declare const toCanonicalCborHex: (
  instance: CML.SingleHostAddr,
) => Effect.Effect<string, SingleHostAddrError>;
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of SingleHostAddr

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.SingleHostAddr,
) => Effect.Effect<Uint8Array, SingleHostAddrError>;
```

Added in v2.0.0

## toCborHex

Method toCborHex of SingleHostAddr

**Signature**

```ts
export declare const toCborHex: (
  instance: CML.SingleHostAddr,
) => Effect.Effect<string, SingleHostAddrError>;
```

Added in v2.0.0

## toJsValue

Method toJsValue of SingleHostAddr

**Signature**

```ts
export declare const toJsValue: (
  instance: CML.SingleHostAddr,
) => Effect.Effect<any, SingleHostAddrError>;
```

Added in v2.0.0

## toJson

Method toJson of SingleHostAddr

**Signature**

```ts
export declare const toJson: (
  instance: CML.SingleHostAddr,
) => Effect.Effect<string, SingleHostAddrError>;
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.SingleHostAddr) => void;
```

Added in v2.0.0

## ipv4Unsafe

Unsafely calls instance.ipv4 without Effect wrapper

**Signature**

```ts
export declare const ipv4Unsafe: (
  instance: CML.SingleHostAddr,
) => CML.Ipv4 | undefined;
```

Added in v2.0.0

## ipv6Unsafe

Unsafely calls instance.ipv6 without Effect wrapper

**Signature**

```ts
export declare const ipv6Unsafe: (
  instance: CML.SingleHostAddr,
) => CML.Ipv6 | undefined;
```

Added in v2.0.0

## portUnsafe

Unsafely calls instance.port without Effect wrapper

**Signature**

```ts
export declare const portUnsafe: (
  instance: CML.SingleHostAddr,
) => number | undefined;
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (
  instance: CML.SingleHostAddr,
) => Uint8Array;
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (
  instance: CML.SingleHostAddr,
) => string;
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (
  instance: CML.SingleHostAddr,
) => Uint8Array;
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.SingleHostAddr) => string;
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.SingleHostAddr) => any;
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.SingleHostAddr) => string;
```

Added in v2.0.0

# Types

## SingleHostAddr (type alias)

Type alias for the CML SingleHostAddr class

**Signature**

```ts
export type SingleHostAddr = CML.SingleHostAddr;
```

Added in v2.0.0
