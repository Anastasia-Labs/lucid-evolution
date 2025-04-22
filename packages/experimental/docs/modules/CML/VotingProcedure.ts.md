---
title: CML/VotingProcedure.ts
nav_order: 288
parent: Modules
---

## VotingProcedure overview

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
  - [VotingProcedureError (class)](#votingprocedureerror-class)
- [Methods](#methods)
  - [anchor](#anchor)
  - [free](#free)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
  - [vote](#vote)
- [MethodsUnsafe](#methodsunsafe)
  - [anchorUnsafe](#anchorunsafe)
  - [freeUnsafe](#freeunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
  - [voteUnsafe](#voteunsafe)
- [Types](#types)
  - [VotingProcedure (type alias)](#votingprocedure-type-alias)

---

# Constructors

## \_new

Static method \_new of VotingProcedure

**Signature**

```ts
export declare const _new: (
  vote: CML.Vote,
  anchor: CML.Anchor,
) => Effect.Effect<CML.VotingProcedure, VotingProcedureError>;
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of VotingProcedure

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.VotingProcedure, VotingProcedureError>;
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of VotingProcedure

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.VotingProcedure, VotingProcedureError>;
```

Added in v2.0.0

## fromJson

Static method fromJson of VotingProcedure

**Signature**

```ts
export declare const fromJson: (
  json: string,
) => Effect.Effect<CML.VotingProcedure, VotingProcedureError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls VotingProcedure.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (
  vote: CML.Vote,
  anchor: CML.Anchor,
) => CML.VotingProcedure;
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls VotingProcedure.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (
  cborBytes: Uint8Array,
) => CML.VotingProcedure;
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls VotingProcedure.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (
  cborBytes: string,
) => CML.VotingProcedure;
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls VotingProcedure.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.VotingProcedure;
```

Added in v2.0.0

# Errors

## VotingProcedureError (class)

Error class for VotingProcedure operations

This error is thrown when operations on VotingProcedure instances fail.

**Signature**

```ts
export declare class VotingProcedureError
```

Added in v2.0.0

# Methods

## anchor

Method anchor of VotingProcedure

**Signature**

```ts
export declare const anchor: (
  instance: CML.VotingProcedure,
) => Effect.Effect<CML.Anchor | undefined, VotingProcedureError>;
```

Added in v2.0.0

## free

Method free of VotingProcedure

**Signature**

```ts
export declare const free: (
  instance: CML.VotingProcedure,
) => Effect.Effect<void, VotingProcedureError>;
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of VotingProcedure

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.VotingProcedure,
) => Effect.Effect<Uint8Array, VotingProcedureError>;
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of VotingProcedure

**Signature**

```ts
export declare const toCanonicalCborHex: (
  instance: CML.VotingProcedure,
) => Effect.Effect<string, VotingProcedureError>;
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of VotingProcedure

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.VotingProcedure,
) => Effect.Effect<Uint8Array, VotingProcedureError>;
```

Added in v2.0.0

## toCborHex

Method toCborHex of VotingProcedure

**Signature**

```ts
export declare const toCborHex: (
  instance: CML.VotingProcedure,
) => Effect.Effect<string, VotingProcedureError>;
```

Added in v2.0.0

## toJsValue

Method toJsValue of VotingProcedure

**Signature**

```ts
export declare const toJsValue: (
  instance: CML.VotingProcedure,
) => Effect.Effect<any, VotingProcedureError>;
```

Added in v2.0.0

## toJson

Method toJson of VotingProcedure

**Signature**

```ts
export declare const toJson: (
  instance: CML.VotingProcedure,
) => Effect.Effect<string, VotingProcedureError>;
```

Added in v2.0.0

## vote

Method vote of VotingProcedure

**Signature**

```ts
export declare const vote: (
  instance: CML.VotingProcedure,
) => Effect.Effect<CML.Vote, VotingProcedureError>;
```

Added in v2.0.0

# MethodsUnsafe

## anchorUnsafe

Unsafely calls instance.anchor without Effect wrapper

**Signature**

```ts
export declare const anchorUnsafe: (
  instance: CML.VotingProcedure,
) => CML.Anchor | undefined;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.VotingProcedure) => void;
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (
  instance: CML.VotingProcedure,
) => Uint8Array;
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (
  instance: CML.VotingProcedure,
) => string;
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (
  instance: CML.VotingProcedure,
) => Uint8Array;
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.VotingProcedure) => string;
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.VotingProcedure) => any;
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.VotingProcedure) => string;
```

Added in v2.0.0

## voteUnsafe

Unsafely calls instance.vote without Effect wrapper

**Signature**

```ts
export declare const voteUnsafe: (instance: CML.VotingProcedure) => CML.Vote;
```

Added in v2.0.0

# Types

## VotingProcedure (type alias)

Type alias for the CML VotingProcedure class

**Signature**

```ts
export type VotingProcedure = CML.VotingProcedure;
```

Added in v2.0.0
