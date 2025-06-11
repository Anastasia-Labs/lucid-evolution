---
title: CML/SingleHostName.ts
nav_order: 210
parent: Modules
---

## SingleHostName overview

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
  - [SingleHostNameError (class)](#singlehostnameerror-class)
- [Methods](#methods)
  - [dnsName](#dnsname)
  - [free](#free)
  - [port](#port)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
- [MethodsUnsafe](#methodsunsafe)
  - [dnsNameUnsafe](#dnsnameunsafe)
  - [freeUnsafe](#freeunsafe)
  - [portUnsafe](#portunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
- [Types](#types)
  - [SingleHostName (type alias)](#singlehostname-type-alias)

---

# Constructors

## \_new

Static method \_new of SingleHostName

**Signature**

```ts
export declare const _new: (
  port: number | undefined,
  dnsName: CML.DNSName
) => Effect.Effect<CML.SingleHostName, SingleHostNameError>
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of SingleHostName

**Signature**

```ts
export declare const fromCborBytes: (cborBytes: Uint8Array) => Effect.Effect<CML.SingleHostName, SingleHostNameError>
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of SingleHostName

**Signature**

```ts
export declare const fromCborHex: (cborBytes: string) => Effect.Effect<CML.SingleHostName, SingleHostNameError>
```

Added in v2.0.0

## fromJson

Static method fromJson of SingleHostName

**Signature**

```ts
export declare const fromJson: (json: string) => Effect.Effect<CML.SingleHostName, SingleHostNameError>
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls SingleHostName.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (port: number | undefined, dnsName: CML.DNSName) => CML.SingleHostName
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls SingleHostName.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (cborBytes: Uint8Array) => CML.SingleHostName
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls SingleHostName.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.SingleHostName
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls SingleHostName.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.SingleHostName
```

Added in v2.0.0

# Errors

## SingleHostNameError (class)

Error class for SingleHostName operations

This error is thrown when operations on SingleHostName instances fail.

**Signature**

```ts
export declare class SingleHostNameError
```

Added in v2.0.0

# Methods

## dnsName

Method dnsName of SingleHostName

**Signature**

```ts
export declare const dnsName: (instance: CML.SingleHostName) => Effect.Effect<CML.DNSName, SingleHostNameError>
```

Added in v2.0.0

## free

Method free of SingleHostName

**Signature**

```ts
export declare const free: (instance: CML.SingleHostName) => Effect.Effect<void, SingleHostNameError>
```

Added in v2.0.0

## port

Method port of SingleHostName

**Signature**

```ts
export declare const port: (instance: CML.SingleHostName) => Effect.Effect<number | undefined, SingleHostNameError>
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of SingleHostName

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.SingleHostName
) => Effect.Effect<Uint8Array, SingleHostNameError>
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of SingleHostName

**Signature**

```ts
export declare const toCanonicalCborHex: (instance: CML.SingleHostName) => Effect.Effect<string, SingleHostNameError>
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of SingleHostName

**Signature**

```ts
export declare const toCborBytes: (instance: CML.SingleHostName) => Effect.Effect<Uint8Array, SingleHostNameError>
```

Added in v2.0.0

## toCborHex

Method toCborHex of SingleHostName

**Signature**

```ts
export declare const toCborHex: (instance: CML.SingleHostName) => Effect.Effect<string, SingleHostNameError>
```

Added in v2.0.0

## toJsValue

Method toJsValue of SingleHostName

**Signature**

```ts
export declare const toJsValue: (instance: CML.SingleHostName) => Effect.Effect<any, SingleHostNameError>
```

Added in v2.0.0

## toJson

Method toJson of SingleHostName

**Signature**

```ts
export declare const toJson: (instance: CML.SingleHostName) => Effect.Effect<string, SingleHostNameError>
```

Added in v2.0.0

# MethodsUnsafe

## dnsNameUnsafe

Unsafely calls instance.dnsName without Effect wrapper

**Signature**

```ts
export declare const dnsNameUnsafe: (instance: CML.SingleHostName) => CML.DNSName
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.SingleHostName) => void
```

Added in v2.0.0

## portUnsafe

Unsafely calls instance.port without Effect wrapper

**Signature**

```ts
export declare const portUnsafe: (instance: CML.SingleHostName) => number | undefined
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (instance: CML.SingleHostName) => Uint8Array
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (instance: CML.SingleHostName) => string
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (instance: CML.SingleHostName) => Uint8Array
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.SingleHostName) => string
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.SingleHostName) => any
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.SingleHostName) => string
```

Added in v2.0.0

# Types

## SingleHostName (type alias)

Type alias for the CML SingleHostName class

**Signature**

```ts
export type SingleHostName = CML.SingleHostName
```

Added in v2.0.0
