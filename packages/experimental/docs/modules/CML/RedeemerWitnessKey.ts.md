---
title: CML/RedeemerWitnessKey.ts
nav_order: 183
parent: Modules
---

## RedeemerWitnessKey overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
  - [fromRedeemer](#fromredeemer)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
  - [fromRedeemerUnsafe](#fromredeemerunsafe)
- [Errors](#errors)
  - [RedeemerWitnessKeyError (class)](#redeemerwitnesskeyerror-class)
- [Methods](#methods)
  - [free](#free)
- [MethodsUnsafe](#methodsunsafe)
  - [freeUnsafe](#freeunsafe)
- [Types](#types)
  - [RedeemerWitnessKey (type alias)](#redeemerwitnesskey-type-alias)

---

# Constructors

## \_new

Static method \_new of RedeemerWitnessKey

**Signature**

```ts
export declare const _new: (
  tag: CML.RedeemerTag,
  index: bigint
) => Effect.Effect<CML.RedeemerWitnessKey, RedeemerWitnessKeyError>
```

Added in v2.0.0

## fromRedeemer

Static method fromRedeemer of RedeemerWitnessKey

**Signature**

```ts
export declare const fromRedeemer: (
  redeemer: CML.LegacyRedeemer
) => Effect.Effect<CML.RedeemerWitnessKey, RedeemerWitnessKeyError>
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls RedeemerWitnessKey.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (tag: CML.RedeemerTag, index: bigint) => CML.RedeemerWitnessKey
```

Added in v2.0.0

## fromRedeemerUnsafe

Unsafely calls RedeemerWitnessKey.fromRedeemer without Effect wrapper

**Signature**

```ts
export declare const fromRedeemerUnsafe: (redeemer: CML.LegacyRedeemer) => CML.RedeemerWitnessKey
```

Added in v2.0.0

# Errors

## RedeemerWitnessKeyError (class)

Error class for RedeemerWitnessKey operations

This error is thrown when operations on RedeemerWitnessKey instances fail.

**Signature**

```ts
export declare class RedeemerWitnessKeyError
```

Added in v2.0.0

# Methods

## free

Method free of RedeemerWitnessKey

**Signature**

```ts
export declare const free: (instance: CML.RedeemerWitnessKey) => Effect.Effect<void, RedeemerWitnessKeyError>
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.RedeemerWitnessKey) => void
```

Added in v2.0.0

# Types

## RedeemerWitnessKey (type alias)

Type alias for the CML RedeemerWitnessKey class

**Signature**

```ts
export type RedeemerWitnessKey = CML.RedeemerWitnessKey
```

Added in v2.0.0
