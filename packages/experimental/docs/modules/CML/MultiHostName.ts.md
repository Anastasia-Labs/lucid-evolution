---
title: CML/MultiHostName.ts
nav_order: 141
parent: Modules
---

## MultiHostName overview

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
  - [MultiHostNameError (class)](#multihostnameerror-class)
- [Methods](#methods)
  - [dnsName](#dnsname)
  - [free](#free)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
- [MethodsUnsafe](#methodsunsafe)
  - [dnsNameUnsafe](#dnsnameunsafe)
  - [freeUnsafe](#freeunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
- [Types](#types)
  - [MultiHostName (type alias)](#multihostname-type-alias)

---

# Constructors

## \_new

Static method \_new of MultiHostName

**Signature**

```ts
export declare const _new: (
  dnsName: CML.DNSName,
) => Effect.Effect<CML.MultiHostName, MultiHostNameError>;
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of MultiHostName

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.MultiHostName, MultiHostNameError>;
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of MultiHostName

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.MultiHostName, MultiHostNameError>;
```

Added in v2.0.0

## fromJson

Static method fromJson of MultiHostName

**Signature**

```ts
export declare const fromJson: (
  json: string,
) => Effect.Effect<CML.MultiHostName, MultiHostNameError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls MultiHostName.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (dnsName: CML.DNSName) => CML.MultiHostName;
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls MultiHostName.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (
  cborBytes: Uint8Array,
) => CML.MultiHostName;
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls MultiHostName.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (
  cborBytes: string,
) => CML.MultiHostName;
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls MultiHostName.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.MultiHostName;
```

Added in v2.0.0

# Errors

## MultiHostNameError (class)

Error class for MultiHostName operations

This error is thrown when operations on MultiHostName instances fail.

**Signature**

```ts
export declare class MultiHostNameError
```

Added in v2.0.0

# Methods

## dnsName

Method dnsName of MultiHostName

**Signature**

```ts
export declare const dnsName: (
  instance: CML.MultiHostName,
) => Effect.Effect<CML.DNSName, MultiHostNameError>;
```

Added in v2.0.0

## free

Method free of MultiHostName

**Signature**

```ts
export declare const free: (
  instance: CML.MultiHostName,
) => Effect.Effect<void, MultiHostNameError>;
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of MultiHostName

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.MultiHostName,
) => Effect.Effect<Uint8Array, MultiHostNameError>;
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of MultiHostName

**Signature**

```ts
export declare const toCanonicalCborHex: (
  instance: CML.MultiHostName,
) => Effect.Effect<string, MultiHostNameError>;
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of MultiHostName

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.MultiHostName,
) => Effect.Effect<Uint8Array, MultiHostNameError>;
```

Added in v2.0.0

## toCborHex

Method toCborHex of MultiHostName

**Signature**

```ts
export declare const toCborHex: (
  instance: CML.MultiHostName,
) => Effect.Effect<string, MultiHostNameError>;
```

Added in v2.0.0

## toJsValue

Method toJsValue of MultiHostName

**Signature**

```ts
export declare const toJsValue: (
  instance: CML.MultiHostName,
) => Effect.Effect<any, MultiHostNameError>;
```

Added in v2.0.0

## toJson

Method toJson of MultiHostName

**Signature**

```ts
export declare const toJson: (
  instance: CML.MultiHostName,
) => Effect.Effect<string, MultiHostNameError>;
```

Added in v2.0.0

# MethodsUnsafe

## dnsNameUnsafe

Unsafely calls instance.dnsName without Effect wrapper

**Signature**

```ts
export declare const dnsNameUnsafe: (
  instance: CML.MultiHostName,
) => CML.DNSName;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.MultiHostName) => void;
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (
  instance: CML.MultiHostName,
) => Uint8Array;
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (
  instance: CML.MultiHostName,
) => string;
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (
  instance: CML.MultiHostName,
) => Uint8Array;
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.MultiHostName) => string;
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.MultiHostName) => any;
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.MultiHostName) => string;
```

Added in v2.0.0

# Types

## MultiHostName (type alias)

Type alias for the CML MultiHostName class

**Signature**

```ts
export type MultiHostName = CML.MultiHostName;
```

Added in v2.0.0
