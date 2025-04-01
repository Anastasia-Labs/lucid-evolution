---
title: CML/HardForkInitiationAction.ts
nav_order: 100
parent: Modules
---

## HardForkInitiationAction overview

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
  - [HardForkInitiationActionError (class)](#hardforkinitiationactionerror-class)
- [Methods](#methods)
  - [actionId](#actionid)
  - [free](#free)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
  - [version](#version)
- [MethodsUnsafe](#methodsunsafe)
  - [actionIdUnsafe](#actionidunsafe)
  - [freeUnsafe](#freeunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
  - [versionUnsafe](#versionunsafe)
- [Types](#types)
  - [HardForkInitiationAction (type alias)](#hardforkinitiationaction-type-alias)

---

# Constructors

## \_new

Static method \_new of HardForkInitiationAction

**Signature**

```ts
export declare const _new: (
  actionId: CML.GovActionId | undefined,
  version: CML.ProtocolVersion
) => Effect.Effect<CML.HardForkInitiationAction, HardForkInitiationActionError>
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of HardForkInitiationAction

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array
) => Effect.Effect<CML.HardForkInitiationAction, HardForkInitiationActionError>
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of HardForkInitiationAction

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string
) => Effect.Effect<CML.HardForkInitiationAction, HardForkInitiationActionError>
```

Added in v2.0.0

## fromJson

Static method fromJson of HardForkInitiationAction

**Signature**

```ts
export declare const fromJson: (
  json: string
) => Effect.Effect<CML.HardForkInitiationAction, HardForkInitiationActionError>
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls HardForkInitiationAction.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (
  actionId: CML.GovActionId | undefined,
  version: CML.ProtocolVersion
) => CML.HardForkInitiationAction
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls HardForkInitiationAction.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (cborBytes: Uint8Array) => CML.HardForkInitiationAction
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls HardForkInitiationAction.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.HardForkInitiationAction
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls HardForkInitiationAction.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.HardForkInitiationAction
```

Added in v2.0.0

# Errors

## HardForkInitiationActionError (class)

Error class for HardForkInitiationAction operations

This error is thrown when operations on HardForkInitiationAction instances fail.

**Signature**

```ts
export declare class HardForkInitiationActionError
```

Added in v2.0.0

# Methods

## actionId

Method actionId of HardForkInitiationAction

**Signature**

```ts
export declare const actionId: (
  instance: CML.HardForkInitiationAction
) => Effect.Effect<CML.GovActionId | undefined, HardForkInitiationActionError>
```

Added in v2.0.0

## free

Method free of HardForkInitiationAction

**Signature**

```ts
export declare const free: (
  instance: CML.HardForkInitiationAction
) => Effect.Effect<void, HardForkInitiationActionError>
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of HardForkInitiationAction

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.HardForkInitiationAction
) => Effect.Effect<Uint8Array, HardForkInitiationActionError>
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of HardForkInitiationAction

**Signature**

```ts
export declare const toCanonicalCborHex: (
  instance: CML.HardForkInitiationAction
) => Effect.Effect<string, HardForkInitiationActionError>
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of HardForkInitiationAction

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.HardForkInitiationAction
) => Effect.Effect<Uint8Array, HardForkInitiationActionError>
```

Added in v2.0.0

## toCborHex

Method toCborHex of HardForkInitiationAction

**Signature**

```ts
export declare const toCborHex: (
  instance: CML.HardForkInitiationAction
) => Effect.Effect<string, HardForkInitiationActionError>
```

Added in v2.0.0

## toJsValue

Method toJsValue of HardForkInitiationAction

**Signature**

```ts
export declare const toJsValue: (
  instance: CML.HardForkInitiationAction
) => Effect.Effect<any, HardForkInitiationActionError>
```

Added in v2.0.0

## toJson

Method toJson of HardForkInitiationAction

**Signature**

```ts
export declare const toJson: (
  instance: CML.HardForkInitiationAction
) => Effect.Effect<string, HardForkInitiationActionError>
```

Added in v2.0.0

## version

Method version of HardForkInitiationAction

**Signature**

```ts
export declare const version: (
  instance: CML.HardForkInitiationAction
) => Effect.Effect<CML.ProtocolVersion, HardForkInitiationActionError>
```

Added in v2.0.0

# MethodsUnsafe

## actionIdUnsafe

Unsafely calls instance.actionId without Effect wrapper

**Signature**

```ts
export declare const actionIdUnsafe: (instance: CML.HardForkInitiationAction) => CML.GovActionId | undefined
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.HardForkInitiationAction) => void
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (instance: CML.HardForkInitiationAction) => Uint8Array
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (instance: CML.HardForkInitiationAction) => string
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (instance: CML.HardForkInitiationAction) => Uint8Array
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.HardForkInitiationAction) => string
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.HardForkInitiationAction) => any
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.HardForkInitiationAction) => string
```

Added in v2.0.0

## versionUnsafe

Unsafely calls instance.version without Effect wrapper

**Signature**

```ts
export declare const versionUnsafe: (instance: CML.HardForkInitiationAction) => CML.ProtocolVersion
```

Added in v2.0.0

# Types

## HardForkInitiationAction (type alias)

Type alias for the CML HardForkInitiationAction class

**Signature**

```ts
export type HardForkInitiationAction = CML.HardForkInitiationAction
```

Added in v2.0.0
