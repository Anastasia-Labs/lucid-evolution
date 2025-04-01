---
title: CML/DatumOption.ts
nav_order: 54
parent: Modules
---

## DatumOption overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [fromCborBytes](#fromcborbytes)
  - [fromCborHex](#fromcborhex)
  - [fromJson](#fromjson)
  - [newDatum](#newdatum)
  - [newHash](#newhash)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [fromCborBytesUnsafe](#fromcborbytesunsafe)
  - [fromCborHexUnsafe](#fromcborhexunsafe)
  - [fromJsonUnsafe](#fromjsonunsafe)
  - [newDatumUnsafe](#newdatumunsafe)
  - [newHashUnsafe](#newhashunsafe)
- [Errors](#errors)
  - [DatumOptionError (class)](#datumoptionerror-class)
- [Methods](#methods)
  - [asDatum](#asdatum)
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
  - [asDatumUnsafe](#asdatumunsafe)
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
  - [DatumOption (type alias)](#datumoption-type-alias)

---

# Constructors

## fromCborBytes

Static method fromCborBytes of DatumOption

**Signature**

```ts
export declare const fromCborBytes: (cborBytes: Uint8Array) => Effect.Effect<CML.DatumOption, DatumOptionError>
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of DatumOption

**Signature**

```ts
export declare const fromCborHex: (cborBytes: string) => Effect.Effect<CML.DatumOption, DatumOptionError>
```

Added in v2.0.0

## fromJson

Static method fromJson of DatumOption

**Signature**

```ts
export declare const fromJson: (json: string) => Effect.Effect<CML.DatumOption, DatumOptionError>
```

Added in v2.0.0

## newDatum

Static method newDatum of DatumOption

**Signature**

```ts
export declare const newDatum: (datum: CML.PlutusData) => Effect.Effect<CML.DatumOption, DatumOptionError>
```

Added in v2.0.0

## newHash

Static method newHash of DatumOption

**Signature**

```ts
export declare const newHash: (datumHash: CML.DatumHash) => Effect.Effect<CML.DatumOption, DatumOptionError>
```

Added in v2.0.0

# ConstructorsUnsafe

## fromCborBytesUnsafe

Unsafely calls DatumOption.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (cborBytes: Uint8Array) => CML.DatumOption
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls DatumOption.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.DatumOption
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls DatumOption.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.DatumOption
```

Added in v2.0.0

## newDatumUnsafe

Unsafely calls DatumOption.newDatum without Effect wrapper

**Signature**

```ts
export declare const newDatumUnsafe: (datum: CML.PlutusData) => CML.DatumOption
```

Added in v2.0.0

## newHashUnsafe

Unsafely calls DatumOption.newHash without Effect wrapper

**Signature**

```ts
export declare const newHashUnsafe: (datumHash: CML.DatumHash) => CML.DatumOption
```

Added in v2.0.0

# Errors

## DatumOptionError (class)

Error class for DatumOption operations

This error is thrown when operations on DatumOption instances fail.

**Signature**

```ts
export declare class DatumOptionError
```

Added in v2.0.0

# Methods

## asDatum

Method asDatum of DatumOption

**Signature**

```ts
export declare const asDatum: (instance: CML.DatumOption) => Effect.Effect<CML.PlutusData | undefined, DatumOptionError>
```

Added in v2.0.0

## asHash

Method asHash of DatumOption

**Signature**

```ts
export declare const asHash: (instance: CML.DatumOption) => Effect.Effect<CML.DatumHash | undefined, DatumOptionError>
```

Added in v2.0.0

## free

Method free of DatumOption

**Signature**

```ts
export declare const free: (instance: CML.DatumOption) => Effect.Effect<void, DatumOptionError>
```

Added in v2.0.0

## kind

Method kind of DatumOption

**Signature**

```ts
export declare const kind: (instance: CML.DatumOption) => Effect.Effect<CML.DatumOptionKind, DatumOptionError>
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of DatumOption

**Signature**

```ts
export declare const toCanonicalCborBytes: (instance: CML.DatumOption) => Effect.Effect<Uint8Array, DatumOptionError>
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of DatumOption

**Signature**

```ts
export declare const toCanonicalCborHex: (instance: CML.DatumOption) => Effect.Effect<string, DatumOptionError>
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of DatumOption

**Signature**

```ts
export declare const toCborBytes: (instance: CML.DatumOption) => Effect.Effect<Uint8Array, DatumOptionError>
```

Added in v2.0.0

## toCborHex

Method toCborHex of DatumOption

**Signature**

```ts
export declare const toCborHex: (instance: CML.DatumOption) => Effect.Effect<string, DatumOptionError>
```

Added in v2.0.0

## toJsValue

Method toJsValue of DatumOption

**Signature**

```ts
export declare const toJsValue: (instance: CML.DatumOption) => Effect.Effect<any, DatumOptionError>
```

Added in v2.0.0

## toJson

Method toJson of DatumOption

**Signature**

```ts
export declare const toJson: (instance: CML.DatumOption) => Effect.Effect<string, DatumOptionError>
```

Added in v2.0.0

# MethodsUnsafe

## asDatumUnsafe

Unsafely calls instance.asDatum without Effect wrapper

**Signature**

```ts
export declare const asDatumUnsafe: (instance: CML.DatumOption) => CML.PlutusData | undefined
```

Added in v2.0.0

## asHashUnsafe

Unsafely calls instance.asHash without Effect wrapper

**Signature**

```ts
export declare const asHashUnsafe: (instance: CML.DatumOption) => CML.DatumHash | undefined
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.DatumOption) => void
```

Added in v2.0.0

## kindUnsafe

Unsafely calls instance.kind without Effect wrapper

**Signature**

```ts
export declare const kindUnsafe: (instance: CML.DatumOption) => CML.DatumOptionKind
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (instance: CML.DatumOption) => Uint8Array
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (instance: CML.DatumOption) => string
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (instance: CML.DatumOption) => Uint8Array
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.DatumOption) => string
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.DatumOption) => any
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.DatumOption) => string
```

Added in v2.0.0

# Types

## DatumOption (type alias)

Type alias for the CML DatumOption class

**Signature**

```ts
export type DatumOption = CML.DatumOption
```

Added in v2.0.0
