---
title: CML/DNSName.ts
nav_order: 60
parent: Modules
---

## DNSName overview

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
  - [DNSNameError (class)](#dnsnameerror-class)
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
  - [DNSName (type alias)](#dnsname-type-alias)

---

# Constructors

## fromCborBytes

Static method fromCborBytes of DNSName

**Signature**

```ts
export declare const fromCborBytes: (cborBytes: Uint8Array) => Effect.Effect<CML.DNSName, DNSNameError>
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of DNSName

**Signature**

```ts
export declare const fromCborHex: (cborBytes: string) => Effect.Effect<CML.DNSName, DNSNameError>
```

Added in v2.0.0

## fromJson

Static method fromJson of DNSName

**Signature**

```ts
export declare const fromJson: (json: string) => Effect.Effect<CML.DNSName, DNSNameError>
```

Added in v2.0.0

# ConstructorsUnsafe

## fromCborBytesUnsafe

Unsafely calls DNSName.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (cborBytes: Uint8Array) => CML.DNSName
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls DNSName.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.DNSName
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls DNSName.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.DNSName
```

Added in v2.0.0

# Errors

## DNSNameError (class)

Error class for DNSName operations

This error is thrown when operations on DNSName instances fail.

**Signature**

```ts
export declare class DNSNameError
```

Added in v2.0.0

# Methods

## free

Method free of DNSName

**Signature**

```ts
export declare const free: (instance: CML.DNSName) => Effect.Effect<void, DNSNameError>
```

Added in v2.0.0

## get

Method get of DNSName

**Signature**

```ts
export declare const get: (instance: CML.DNSName) => Effect.Effect<string, DNSNameError>
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of DNSName

**Signature**

```ts
export declare const toCanonicalCborBytes: (instance: CML.DNSName) => Effect.Effect<Uint8Array, DNSNameError>
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of DNSName

**Signature**

```ts
export declare const toCanonicalCborHex: (instance: CML.DNSName) => Effect.Effect<string, DNSNameError>
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of DNSName

**Signature**

```ts
export declare const toCborBytes: (instance: CML.DNSName) => Effect.Effect<Uint8Array, DNSNameError>
```

Added in v2.0.0

## toCborHex

Method toCborHex of DNSName

**Signature**

```ts
export declare const toCborHex: (instance: CML.DNSName) => Effect.Effect<string, DNSNameError>
```

Added in v2.0.0

## toJsValue

Method toJsValue of DNSName

**Signature**

```ts
export declare const toJsValue: (instance: CML.DNSName) => Effect.Effect<any, DNSNameError>
```

Added in v2.0.0

## toJson

Method toJson of DNSName

**Signature**

```ts
export declare const toJson: (instance: CML.DNSName) => Effect.Effect<string, DNSNameError>
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.DNSName) => void
```

Added in v2.0.0

## getUnsafe

Unsafely calls instance.get without Effect wrapper

**Signature**

```ts
export declare const getUnsafe: (instance: CML.DNSName) => string
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (instance: CML.DNSName) => Uint8Array
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (instance: CML.DNSName) => string
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (instance: CML.DNSName) => Uint8Array
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.DNSName) => string
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.DNSName) => any
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.DNSName) => string
```

Added in v2.0.0

# Types

## DNSName (type alias)

Type alias for the CML DNSName class

**Signature**

```ts
export type DNSName = CML.DNSName
```

Added in v2.0.0
