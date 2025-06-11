---
title: CML/ParameterChangeAction.ts
nav_order: 151
parent: Modules
---

## ParameterChangeAction overview

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
  - [ParameterChangeActionError (class)](#parameterchangeactionerror-class)
- [Methods](#methods)
  - [actionId](#actionid)
  - [free](#free)
  - [policyHash](#policyhash)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
  - [update](#update)
- [MethodsUnsafe](#methodsunsafe)
  - [actionIdUnsafe](#actionidunsafe)
  - [freeUnsafe](#freeunsafe)
  - [policyHashUnsafe](#policyhashunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
  - [updateUnsafe](#updateunsafe)
- [Types](#types)
  - [ParameterChangeAction (type alias)](#parameterchangeaction-type-alias)

---

# Constructors

## \_new

Static method \_new of ParameterChangeAction

**Signature**

```ts
export declare const _new: (
  actionId: CML.GovActionId | undefined,
  update: CML.ProtocolParamUpdate,
  policyHash: CML.ScriptHash
) => Effect.Effect<CML.ParameterChangeAction, ParameterChangeActionError>
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of ParameterChangeAction

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array
) => Effect.Effect<CML.ParameterChangeAction, ParameterChangeActionError>
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of ParameterChangeAction

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string
) => Effect.Effect<CML.ParameterChangeAction, ParameterChangeActionError>
```

Added in v2.0.0

## fromJson

Static method fromJson of ParameterChangeAction

**Signature**

```ts
export declare const fromJson: (json: string) => Effect.Effect<CML.ParameterChangeAction, ParameterChangeActionError>
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls ParameterChangeAction.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (
  actionId: CML.GovActionId | undefined,
  update: CML.ProtocolParamUpdate,
  policyHash: CML.ScriptHash
) => CML.ParameterChangeAction
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls ParameterChangeAction.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (cborBytes: Uint8Array) => CML.ParameterChangeAction
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls ParameterChangeAction.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.ParameterChangeAction
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls ParameterChangeAction.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.ParameterChangeAction
```

Added in v2.0.0

# Errors

## ParameterChangeActionError (class)

Error class for ParameterChangeAction operations

This error is thrown when operations on ParameterChangeAction instances fail.

**Signature**

```ts
export declare class ParameterChangeActionError
```

Added in v2.0.0

# Methods

## actionId

Method actionId of ParameterChangeAction

**Signature**

```ts
export declare const actionId: (
  instance: CML.ParameterChangeAction
) => Effect.Effect<CML.GovActionId | undefined, ParameterChangeActionError>
```

Added in v2.0.0

## free

Method free of ParameterChangeAction

**Signature**

```ts
export declare const free: (instance: CML.ParameterChangeAction) => Effect.Effect<void, ParameterChangeActionError>
```

Added in v2.0.0

## policyHash

Method policyHash of ParameterChangeAction

**Signature**

```ts
export declare const policyHash: (
  instance: CML.ParameterChangeAction
) => Effect.Effect<CML.ScriptHash | undefined, ParameterChangeActionError>
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of ParameterChangeAction

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.ParameterChangeAction
) => Effect.Effect<Uint8Array, ParameterChangeActionError>
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of ParameterChangeAction

**Signature**

```ts
export declare const toCanonicalCborHex: (
  instance: CML.ParameterChangeAction
) => Effect.Effect<string, ParameterChangeActionError>
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of ParameterChangeAction

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.ParameterChangeAction
) => Effect.Effect<Uint8Array, ParameterChangeActionError>
```

Added in v2.0.0

## toCborHex

Method toCborHex of ParameterChangeAction

**Signature**

```ts
export declare const toCborHex: (
  instance: CML.ParameterChangeAction
) => Effect.Effect<string, ParameterChangeActionError>
```

Added in v2.0.0

## toJsValue

Method toJsValue of ParameterChangeAction

**Signature**

```ts
export declare const toJsValue: (instance: CML.ParameterChangeAction) => Effect.Effect<any, ParameterChangeActionError>
```

Added in v2.0.0

## toJson

Method toJson of ParameterChangeAction

**Signature**

```ts
export declare const toJson: (instance: CML.ParameterChangeAction) => Effect.Effect<string, ParameterChangeActionError>
```

Added in v2.0.0

## update

Method update of ParameterChangeAction

**Signature**

```ts
export declare const update: (
  instance: CML.ParameterChangeAction
) => Effect.Effect<CML.ProtocolParamUpdate, ParameterChangeActionError>
```

Added in v2.0.0

# MethodsUnsafe

## actionIdUnsafe

Unsafely calls instance.actionId without Effect wrapper

**Signature**

```ts
export declare const actionIdUnsafe: (instance: CML.ParameterChangeAction) => CML.GovActionId | undefined
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.ParameterChangeAction) => void
```

Added in v2.0.0

## policyHashUnsafe

Unsafely calls instance.policyHash without Effect wrapper

**Signature**

```ts
export declare const policyHashUnsafe: (instance: CML.ParameterChangeAction) => CML.ScriptHash | undefined
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (instance: CML.ParameterChangeAction) => Uint8Array
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (instance: CML.ParameterChangeAction) => string
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (instance: CML.ParameterChangeAction) => Uint8Array
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.ParameterChangeAction) => string
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.ParameterChangeAction) => any
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.ParameterChangeAction) => string
```

Added in v2.0.0

## updateUnsafe

Unsafely calls instance.update without Effect wrapper

**Signature**

```ts
export declare const updateUnsafe: (instance: CML.ParameterChangeAction) => CML.ProtocolParamUpdate
```

Added in v2.0.0

# Types

## ParameterChangeAction (type alias)

Type alias for the CML ParameterChangeAction class

**Signature**

```ts
export type ParameterChangeAction = CML.ParameterChangeAction
```

Added in v2.0.0
