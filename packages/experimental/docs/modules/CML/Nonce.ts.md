---
title: CML/Nonce.ts
nav_order: 148
parent: Modules
---

## Nonce overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [fromCborBytes](#fromcborbytes)
  - [fromCborHex](#fromcborhex)
  - [fromJson](#fromjson)
  - [newHash](#newhash)
  - [newIdentity](#newidentity)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [fromCborBytesUnsafe](#fromcborbytesunsafe)
  - [fromCborHexUnsafe](#fromcborhexunsafe)
  - [fromJsonUnsafe](#fromjsonunsafe)
  - [newHashUnsafe](#newhashunsafe)
  - [newIdentityUnsafe](#newidentityunsafe)
- [Errors](#errors)
  - [NonceError (class)](#nonceerror-class)
- [Methods](#methods)
  - [asHash](#ashash)
  - [free](#free)
  - [kind](#kind)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
- [MethodsUnsafe](#methodsunsafe)
  - [asHashUnsafe](#ashashunsafe)
  - [freeUnsafe](#freeunsafe)
  - [kindUnsafe](#kindunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
- [Types](#types)
  - [Nonce (type alias)](#nonce-type-alias)

---

# Constructors

## fromCborBytes

Static method fromCborBytes of Nonce

**Signature**

```ts
export declare const fromCborBytes: (cborBytes: Uint8Array) => Effect.Effect<CML.Nonce, NonceError>
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of Nonce

**Signature**

```ts
export declare const fromCborHex: (cborBytes: string) => Effect.Effect<CML.Nonce, NonceError>
```

Added in v2.0.0

## fromJson

Static method fromJson of Nonce

**Signature**

```ts
export declare const fromJson: (json: string) => Effect.Effect<CML.Nonce, NonceError>
```

Added in v2.0.0

## newHash

Static method newHash of Nonce

**Signature**

```ts
export declare const newHash: (hash: CML.NonceHash) => Effect.Effect<CML.Nonce, NonceError>
```

Added in v2.0.0

## newIdentity

Static method newIdentity of Nonce

**Signature**

```ts
export declare const newIdentity: () => Effect.Effect<CML.Nonce, NonceError>
```

Added in v2.0.0

# ConstructorsUnsafe

## fromCborBytesUnsafe

Unsafely calls Nonce.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (cborBytes: Uint8Array) => CML.Nonce
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls Nonce.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.Nonce
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls Nonce.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.Nonce
```

Added in v2.0.0

## newHashUnsafe

Unsafely calls Nonce.newHash without Effect wrapper

**Signature**

```ts
export declare const newHashUnsafe: (hash: CML.NonceHash) => CML.Nonce
```

Added in v2.0.0

## newIdentityUnsafe

Unsafely calls Nonce.newIdentity without Effect wrapper

**Signature**

```ts
export declare const newIdentityUnsafe: () => CML.Nonce
```

Added in v2.0.0

# Errors

## NonceError (class)

Error class for Nonce operations

This error is thrown when operations on Nonce instances fail.

**Signature**

```ts
export declare class NonceError
```

Added in v2.0.0

# Methods

## asHash

Method asHash of Nonce

**Signature**

```ts
export declare const asHash: (instance: CML.Nonce) => Effect.Effect<CML.NonceHash | undefined, NonceError>
```

Added in v2.0.0

## free

Method free of Nonce

**Signature**

```ts
export declare const free: (instance: CML.Nonce) => Effect.Effect<void, NonceError>
```

Added in v2.0.0

## kind

Method kind of Nonce

**Signature**

```ts
export declare const kind: (instance: CML.Nonce) => Effect.Effect<CML.NonceKind, NonceError>
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of Nonce

**Signature**

```ts
export declare const toCanonicalCborBytes: (instance: CML.Nonce) => Effect.Effect<Uint8Array, NonceError>
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of Nonce

**Signature**

```ts
export declare const toCanonicalCborHex: (instance: CML.Nonce) => Effect.Effect<string, NonceError>
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of Nonce

**Signature**

```ts
export declare const toCborBytes: (instance: CML.Nonce) => Effect.Effect<Uint8Array, NonceError>
```

Added in v2.0.0

## toCborHex

Method toCborHex of Nonce

**Signature**

```ts
export declare const toCborHex: (instance: CML.Nonce) => Effect.Effect<string, NonceError>
```

Added in v2.0.0

## toJsValue

Method toJsValue of Nonce

**Signature**

```ts
export declare const toJsValue: (instance: CML.Nonce) => Effect.Effect<any, NonceError>
```

Added in v2.0.0

## toJson

Method toJson of Nonce

**Signature**

```ts
export declare const toJson: (instance: CML.Nonce) => Effect.Effect<string, NonceError>
```

Added in v2.0.0

# MethodsUnsafe

## asHashUnsafe

Unsafely calls instance.asHash without Effect wrapper

**Signature**

```ts
export declare const asHashUnsafe: (instance: CML.Nonce) => CML.NonceHash | undefined
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.Nonce) => void
```

Added in v2.0.0

## kindUnsafe

Unsafely calls instance.kind without Effect wrapper

**Signature**

```ts
export declare const kindUnsafe: (instance: CML.Nonce) => CML.NonceKind
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (instance: CML.Nonce) => Uint8Array
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (instance: CML.Nonce) => string
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (instance: CML.Nonce) => Uint8Array
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.Nonce) => string
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.Nonce) => any
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.Nonce) => string
```

Added in v2.0.0

# Types

## Nonce (type alias)

Type alias for the CML Nonce class

**Signature**

```ts
export type Nonce = CML.Nonce
```

Added in v2.0.0
