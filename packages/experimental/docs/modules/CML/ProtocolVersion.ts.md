---
title: CML/ProtocolVersion.ts
nav_order: 176
parent: Modules
---

## ProtocolVersion overview

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
  - [ProtocolVersionError (class)](#protocolversionerror-class)
- [Methods](#methods)
  - [free](#free)
  - [major](#major)
  - [minor](#minor)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
- [MethodsUnsafe](#methodsunsafe)
  - [freeUnsafe](#freeunsafe)
  - [majorUnsafe](#majorunsafe)
  - [minorUnsafe](#minorunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
- [Types](#types)
  - [ProtocolVersion (type alias)](#protocolversion-type-alias)

---

# Constructors

## \_new

Static method \_new of ProtocolVersion

**Signature**

```ts
export declare const _new: (
  major: bigint,
  minor: bigint,
) => Effect.Effect<CML.ProtocolVersion, ProtocolVersionError>;
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of ProtocolVersion

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.ProtocolVersion, ProtocolVersionError>;
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of ProtocolVersion

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.ProtocolVersion, ProtocolVersionError>;
```

Added in v2.0.0

## fromJson

Static method fromJson of ProtocolVersion

**Signature**

```ts
export declare const fromJson: (
  json: string,
) => Effect.Effect<CML.ProtocolVersion, ProtocolVersionError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls ProtocolVersion.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (
  major: bigint,
  minor: bigint,
) => CML.ProtocolVersion;
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls ProtocolVersion.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (
  cborBytes: Uint8Array,
) => CML.ProtocolVersion;
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls ProtocolVersion.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (
  cborBytes: string,
) => CML.ProtocolVersion;
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls ProtocolVersion.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.ProtocolVersion;
```

Added in v2.0.0

# Errors

## ProtocolVersionError (class)

Error class for ProtocolVersion operations

This error is thrown when operations on ProtocolVersion instances fail.

**Signature**

```ts
export declare class ProtocolVersionError
```

Added in v2.0.0

# Methods

## free

Method free of ProtocolVersion

**Signature**

```ts
export declare const free: (
  instance: CML.ProtocolVersion,
) => Effect.Effect<void, ProtocolVersionError>;
```

Added in v2.0.0

## major

Method major of ProtocolVersion

**Signature**

```ts
export declare const major: (
  instance: CML.ProtocolVersion,
) => Effect.Effect<bigint, ProtocolVersionError>;
```

Added in v2.0.0

## minor

Method minor of ProtocolVersion

**Signature**

```ts
export declare const minor: (
  instance: CML.ProtocolVersion,
) => Effect.Effect<bigint, ProtocolVersionError>;
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of ProtocolVersion

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.ProtocolVersion,
) => Effect.Effect<Uint8Array, ProtocolVersionError>;
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of ProtocolVersion

**Signature**

```ts
export declare const toCanonicalCborHex: (
  instance: CML.ProtocolVersion,
) => Effect.Effect<string, ProtocolVersionError>;
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of ProtocolVersion

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.ProtocolVersion,
) => Effect.Effect<Uint8Array, ProtocolVersionError>;
```

Added in v2.0.0

## toCborHex

Method toCborHex of ProtocolVersion

**Signature**

```ts
export declare const toCborHex: (
  instance: CML.ProtocolVersion,
) => Effect.Effect<string, ProtocolVersionError>;
```

Added in v2.0.0

## toJsValue

Method toJsValue of ProtocolVersion

**Signature**

```ts
export declare const toJsValue: (
  instance: CML.ProtocolVersion,
) => Effect.Effect<any, ProtocolVersionError>;
```

Added in v2.0.0

## toJson

Method toJson of ProtocolVersion

**Signature**

```ts
export declare const toJson: (
  instance: CML.ProtocolVersion,
) => Effect.Effect<string, ProtocolVersionError>;
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.ProtocolVersion) => void;
```

Added in v2.0.0

## majorUnsafe

Unsafely calls instance.major without Effect wrapper

**Signature**

```ts
export declare const majorUnsafe: (instance: CML.ProtocolVersion) => bigint;
```

Added in v2.0.0

## minorUnsafe

Unsafely calls instance.minor without Effect wrapper

**Signature**

```ts
export declare const minorUnsafe: (instance: CML.ProtocolVersion) => bigint;
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (
  instance: CML.ProtocolVersion,
) => Uint8Array;
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (
  instance: CML.ProtocolVersion,
) => string;
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (
  instance: CML.ProtocolVersion,
) => Uint8Array;
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.ProtocolVersion) => string;
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.ProtocolVersion) => any;
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.ProtocolVersion) => string;
```

Added in v2.0.0

# Types

## ProtocolVersion (type alias)

Type alias for the CML ProtocolVersion class

**Signature**

```ts
export type ProtocolVersion = CML.ProtocolVersion;
```

Added in v2.0.0
