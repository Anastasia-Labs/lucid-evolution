---
title: CML/NewConstitution.ts
nav_order: 147
parent: Modules
---

## NewConstitution overview

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
  - [NewConstitutionError (class)](#newconstitutionerror-class)
- [Methods](#methods)
  - [actionId](#actionid)
  - [constitution](#constitution)
  - [free](#free)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
- [MethodsUnsafe](#methodsunsafe)
  - [actionIdUnsafe](#actionidunsafe)
  - [constitutionUnsafe](#constitutionunsafe)
  - [freeUnsafe](#freeunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
- [Types](#types)
  - [NewConstitution (type alias)](#newconstitution-type-alias)

---

# Constructors

## \_new

Static method \_new of NewConstitution

**Signature**

```ts
export declare const _new: (
  actionId: CML.GovActionId | undefined,
  constitution: CML.Constitution,
) => Effect.Effect<CML.NewConstitution, NewConstitutionError>;
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of NewConstitution

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.NewConstitution, NewConstitutionError>;
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of NewConstitution

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.NewConstitution, NewConstitutionError>;
```

Added in v2.0.0

## fromJson

Static method fromJson of NewConstitution

**Signature**

```ts
export declare const fromJson: (
  json: string,
) => Effect.Effect<CML.NewConstitution, NewConstitutionError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls NewConstitution.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (
  actionId: CML.GovActionId | undefined,
  constitution: CML.Constitution,
) => CML.NewConstitution;
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls NewConstitution.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (
  cborBytes: Uint8Array,
) => CML.NewConstitution;
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls NewConstitution.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (
  cborBytes: string,
) => CML.NewConstitution;
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls NewConstitution.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.NewConstitution;
```

Added in v2.0.0

# Errors

## NewConstitutionError (class)

Error class for NewConstitution operations

This error is thrown when operations on NewConstitution instances fail.

**Signature**

```ts
export declare class NewConstitutionError
```

Added in v2.0.0

# Methods

## actionId

Method actionId of NewConstitution

**Signature**

```ts
export declare const actionId: (
  instance: CML.NewConstitution,
) => Effect.Effect<CML.GovActionId | undefined, NewConstitutionError>;
```

Added in v2.0.0

## constitution

Method constitution of NewConstitution

**Signature**

```ts
export declare const constitution: (
  instance: CML.NewConstitution,
) => Effect.Effect<CML.Constitution, NewConstitutionError>;
```

Added in v2.0.0

## free

Method free of NewConstitution

**Signature**

```ts
export declare const free: (
  instance: CML.NewConstitution,
) => Effect.Effect<void, NewConstitutionError>;
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of NewConstitution

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.NewConstitution,
) => Effect.Effect<Uint8Array, NewConstitutionError>;
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of NewConstitution

**Signature**

```ts
export declare const toCanonicalCborHex: (
  instance: CML.NewConstitution,
) => Effect.Effect<string, NewConstitutionError>;
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of NewConstitution

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.NewConstitution,
) => Effect.Effect<Uint8Array, NewConstitutionError>;
```

Added in v2.0.0

## toCborHex

Method toCborHex of NewConstitution

**Signature**

```ts
export declare const toCborHex: (
  instance: CML.NewConstitution,
) => Effect.Effect<string, NewConstitutionError>;
```

Added in v2.0.0

## toJsValue

Method toJsValue of NewConstitution

**Signature**

```ts
export declare const toJsValue: (
  instance: CML.NewConstitution,
) => Effect.Effect<any, NewConstitutionError>;
```

Added in v2.0.0

## toJson

Method toJson of NewConstitution

**Signature**

```ts
export declare const toJson: (
  instance: CML.NewConstitution,
) => Effect.Effect<string, NewConstitutionError>;
```

Added in v2.0.0

# MethodsUnsafe

## actionIdUnsafe

Unsafely calls instance.actionId without Effect wrapper

**Signature**

```ts
export declare const actionIdUnsafe: (
  instance: CML.NewConstitution,
) => CML.GovActionId | undefined;
```

Added in v2.0.0

## constitutionUnsafe

Unsafely calls instance.constitution without Effect wrapper

**Signature**

```ts
export declare const constitutionUnsafe: (
  instance: CML.NewConstitution,
) => CML.Constitution;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.NewConstitution) => void;
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (
  instance: CML.NewConstitution,
) => Uint8Array;
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (
  instance: CML.NewConstitution,
) => string;
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (
  instance: CML.NewConstitution,
) => Uint8Array;
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.NewConstitution) => string;
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.NewConstitution) => any;
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.NewConstitution) => string;
```

Added in v2.0.0

# Types

## NewConstitution (type alias)

Type alias for the CML NewConstitution class

**Signature**

```ts
export type NewConstitution = CML.NewConstitution;
```

Added in v2.0.0
