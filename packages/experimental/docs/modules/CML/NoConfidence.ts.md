---
title: CML/NoConfidence.ts
nav_order: 147
parent: Modules
---

## NoConfidence overview

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
  - [NoConfidenceError (class)](#noconfidenceerror-class)
- [Methods](#methods)
  - [actionId](#actionid)
  - [free](#free)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
- [MethodsUnsafe](#methodsunsafe)
  - [actionIdUnsafe](#actionidunsafe)
  - [freeUnsafe](#freeunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
- [Types](#types)
  - [NoConfidence (type alias)](#noconfidence-type-alias)

---

# Constructors

## \_new

Static method \_new of NoConfidence

**Signature**

```ts
export declare const _new: (
  actionId: CML.GovActionId,
) => Effect.Effect<CML.NoConfidence, NoConfidenceError>;
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of NoConfidence

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.NoConfidence, NoConfidenceError>;
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of NoConfidence

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.NoConfidence, NoConfidenceError>;
```

Added in v2.0.0

## fromJson

Static method fromJson of NoConfidence

**Signature**

```ts
export declare const fromJson: (
  json: string,
) => Effect.Effect<CML.NoConfidence, NoConfidenceError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls NoConfidence.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (
  actionId: CML.GovActionId,
) => CML.NoConfidence;
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls NoConfidence.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (
  cborBytes: Uint8Array,
) => CML.NoConfidence;
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls NoConfidence.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.NoConfidence;
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls NoConfidence.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.NoConfidence;
```

Added in v2.0.0

# Errors

## NoConfidenceError (class)

Error class for NoConfidence operations

This error is thrown when operations on NoConfidence instances fail.

**Signature**

```ts
export declare class NoConfidenceError
```

Added in v2.0.0

# Methods

## actionId

Method actionId of NoConfidence

**Signature**

```ts
export declare const actionId: (
  instance: CML.NoConfidence,
) => Effect.Effect<CML.GovActionId | undefined, NoConfidenceError>;
```

Added in v2.0.0

## free

Method free of NoConfidence

**Signature**

```ts
export declare const free: (
  instance: CML.NoConfidence,
) => Effect.Effect<void, NoConfidenceError>;
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of NoConfidence

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.NoConfidence,
) => Effect.Effect<Uint8Array, NoConfidenceError>;
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of NoConfidence

**Signature**

```ts
export declare const toCanonicalCborHex: (
  instance: CML.NoConfidence,
) => Effect.Effect<string, NoConfidenceError>;
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of NoConfidence

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.NoConfidence,
) => Effect.Effect<Uint8Array, NoConfidenceError>;
```

Added in v2.0.0

## toCborHex

Method toCborHex of NoConfidence

**Signature**

```ts
export declare const toCborHex: (
  instance: CML.NoConfidence,
) => Effect.Effect<string, NoConfidenceError>;
```

Added in v2.0.0

## toJsValue

Method toJsValue of NoConfidence

**Signature**

```ts
export declare const toJsValue: (
  instance: CML.NoConfidence,
) => Effect.Effect<any, NoConfidenceError>;
```

Added in v2.0.0

## toJson

Method toJson of NoConfidence

**Signature**

```ts
export declare const toJson: (
  instance: CML.NoConfidence,
) => Effect.Effect<string, NoConfidenceError>;
```

Added in v2.0.0

# MethodsUnsafe

## actionIdUnsafe

Unsafely calls instance.actionId without Effect wrapper

**Signature**

```ts
export declare const actionIdUnsafe: (
  instance: CML.NoConfidence,
) => CML.GovActionId | undefined;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.NoConfidence) => void;
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (
  instance: CML.NoConfidence,
) => Uint8Array;
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (
  instance: CML.NoConfidence,
) => string;
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (
  instance: CML.NoConfidence,
) => Uint8Array;
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.NoConfidence) => string;
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.NoConfidence) => any;
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.NoConfidence) => string;
```

Added in v2.0.0

# Types

## NoConfidence (type alias)

Type alias for the CML NoConfidence class

**Signature**

```ts
export type NoConfidence = CML.NoConfidence;
```

Added in v2.0.0
