---
title: CML/DRep.ts
nav_order: 62
parent: Modules
---

## DRep overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [fromCborBytes](#fromcborbytes)
  - [fromCborHex](#fromcborhex)
  - [fromJson](#fromjson)
  - [newAlwaysAbstain](#newalwaysabstain)
  - [newAlwaysNoConfidence](#newalwaysnoconfidence)
  - [newKey](#newkey)
  - [newScript](#newscript)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [fromCborBytesUnsafe](#fromcborbytesunsafe)
  - [fromCborHexUnsafe](#fromcborhexunsafe)
  - [fromJsonUnsafe](#fromjsonunsafe)
  - [newAlwaysAbstainUnsafe](#newalwaysabstainunsafe)
  - [newAlwaysNoConfidenceUnsafe](#newalwaysnoconfidenceunsafe)
  - [newKeyUnsafe](#newkeyunsafe)
  - [newScriptUnsafe](#newscriptunsafe)
- [Errors](#errors)
  - [DRepError (class)](#dreperror-class)
- [Methods](#methods)
  - [asKey](#askey)
  - [asScript](#asscript)
  - [free](#free)
  - [kind](#kind)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
- [MethodsUnsafe](#methodsunsafe)
  - [asKeyUnsafe](#askeyunsafe)
  - [asScriptUnsafe](#asscriptunsafe)
  - [freeUnsafe](#freeunsafe)
  - [kindUnsafe](#kindunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
- [Types](#types)
  - [DRep (type alias)](#drep-type-alias)

---

# Constructors

## fromCborBytes

Static method fromCborBytes of DRep

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.DRep, DRepError>;
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of DRep

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.DRep, DRepError>;
```

Added in v2.0.0

## fromJson

Static method fromJson of DRep

**Signature**

```ts
export declare const fromJson: (
  json: string,
) => Effect.Effect<CML.DRep, DRepError>;
```

Added in v2.0.0

## newAlwaysAbstain

Static method newAlwaysAbstain of DRep

**Signature**

```ts
export declare const newAlwaysAbstain: () => Effect.Effect<CML.DRep, DRepError>;
```

Added in v2.0.0

## newAlwaysNoConfidence

Static method newAlwaysNoConfidence of DRep

**Signature**

```ts
export declare const newAlwaysNoConfidence: () => Effect.Effect<
  CML.DRep,
  DRepError
>;
```

Added in v2.0.0

## newKey

Static method newKey of DRep

**Signature**

```ts
export declare const newKey: (
  pool: CML.Ed25519KeyHash,
) => Effect.Effect<CML.DRep, DRepError>;
```

Added in v2.0.0

## newScript

Static method newScript of DRep

**Signature**

```ts
export declare const newScript: (
  scriptHash: CML.ScriptHash,
) => Effect.Effect<CML.DRep, DRepError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## fromCborBytesUnsafe

Unsafely calls DRep.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (cborBytes: Uint8Array) => CML.DRep;
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls DRep.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.DRep;
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls DRep.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.DRep;
```

Added in v2.0.0

## newAlwaysAbstainUnsafe

Unsafely calls DRep.newAlwaysAbstain without Effect wrapper

**Signature**

```ts
export declare const newAlwaysAbstainUnsafe: () => CML.DRep;
```

Added in v2.0.0

## newAlwaysNoConfidenceUnsafe

Unsafely calls DRep.newAlwaysNoConfidence without Effect wrapper

**Signature**

```ts
export declare const newAlwaysNoConfidenceUnsafe: () => CML.DRep;
```

Added in v2.0.0

## newKeyUnsafe

Unsafely calls DRep.newKey without Effect wrapper

**Signature**

```ts
export declare const newKeyUnsafe: (pool: CML.Ed25519KeyHash) => CML.DRep;
```

Added in v2.0.0

## newScriptUnsafe

Unsafely calls DRep.newScript without Effect wrapper

**Signature**

```ts
export declare const newScriptUnsafe: (scriptHash: CML.ScriptHash) => CML.DRep;
```

Added in v2.0.0

# Errors

## DRepError (class)

Error class for DRep operations

This error is thrown when operations on DRep instances fail.

**Signature**

```ts
export declare class DRepError
```

Added in v2.0.0

# Methods

## asKey

Method asKey of DRep

**Signature**

```ts
export declare const asKey: (
  instance: CML.DRep,
) => Effect.Effect<CML.Ed25519KeyHash | undefined, DRepError>;
```

Added in v2.0.0

## asScript

Method asScript of DRep

**Signature**

```ts
export declare const asScript: (
  instance: CML.DRep,
) => Effect.Effect<CML.ScriptHash | undefined, DRepError>;
```

Added in v2.0.0

## free

Method free of DRep

**Signature**

```ts
export declare const free: (
  instance: CML.DRep,
) => Effect.Effect<void, DRepError>;
```

Added in v2.0.0

## kind

Method kind of DRep

**Signature**

```ts
export declare const kind: (
  instance: CML.DRep,
) => Effect.Effect<CML.DRepKind, DRepError>;
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of DRep

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.DRep,
) => Effect.Effect<Uint8Array, DRepError>;
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of DRep

**Signature**

```ts
export declare const toCanonicalCborHex: (
  instance: CML.DRep,
) => Effect.Effect<string, DRepError>;
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of DRep

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.DRep,
) => Effect.Effect<Uint8Array, DRepError>;
```

Added in v2.0.0

## toCborHex

Method toCborHex of DRep

**Signature**

```ts
export declare const toCborHex: (
  instance: CML.DRep,
) => Effect.Effect<string, DRepError>;
```

Added in v2.0.0

## toJsValue

Method toJsValue of DRep

**Signature**

```ts
export declare const toJsValue: (
  instance: CML.DRep,
) => Effect.Effect<any, DRepError>;
```

Added in v2.0.0

## toJson

Method toJson of DRep

**Signature**

```ts
export declare const toJson: (
  instance: CML.DRep,
) => Effect.Effect<string, DRepError>;
```

Added in v2.0.0

# MethodsUnsafe

## asKeyUnsafe

Unsafely calls instance.asKey without Effect wrapper

**Signature**

```ts
export declare const asKeyUnsafe: (
  instance: CML.DRep,
) => CML.Ed25519KeyHash | undefined;
```

Added in v2.0.0

## asScriptUnsafe

Unsafely calls instance.asScript without Effect wrapper

**Signature**

```ts
export declare const asScriptUnsafe: (
  instance: CML.DRep,
) => CML.ScriptHash | undefined;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.DRep) => void;
```

Added in v2.0.0

## kindUnsafe

Unsafely calls instance.kind without Effect wrapper

**Signature**

```ts
export declare const kindUnsafe: (instance: CML.DRep) => CML.DRepKind;
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (
  instance: CML.DRep,
) => Uint8Array;
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (instance: CML.DRep) => string;
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (instance: CML.DRep) => Uint8Array;
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.DRep) => string;
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.DRep) => any;
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.DRep) => string;
```

Added in v2.0.0

# Types

## DRep (type alias)

Type alias for the CML DRep class

**Signature**

```ts
export type DRep = CML.DRep;
```

Added in v2.0.0
