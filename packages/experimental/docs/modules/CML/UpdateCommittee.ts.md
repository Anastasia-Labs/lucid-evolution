---
title: CML/UpdateCommittee.ts
nav_order: 251
parent: Modules
---

## UpdateCommittee overview

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
  - [UpdateCommitteeError (class)](#updatecommitteeerror-class)
- [Methods](#methods)
  - [actionId](#actionid)
  - [coldCredentials](#coldcredentials)
  - [credentials](#credentials)
  - [free](#free)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
  - [unitInterval](#unitinterval)
- [MethodsUnsafe](#methodsunsafe)
  - [actionIdUnsafe](#actionidunsafe)
  - [coldCredentialsUnsafe](#coldcredentialsunsafe)
  - [credentialsUnsafe](#credentialsunsafe)
  - [freeUnsafe](#freeunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
  - [unitIntervalUnsafe](#unitintervalunsafe)
- [Types](#types)
  - [UpdateCommittee (type alias)](#updatecommittee-type-alias)

---

# Constructors

## \_new

Static method \_new of UpdateCommittee

**Signature**

```ts
export declare const _new: (
  actionId: CML.GovActionId | undefined,
  coldCredentials: CML.CommitteeColdCredentialList,
  credentials: CML.MapCommitteeColdCredentialToEpoch,
  unitInterval: CML.UnitInterval
) => Effect.Effect<CML.UpdateCommittee, UpdateCommitteeError>
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of UpdateCommittee

**Signature**

```ts
export declare const fromCborBytes: (cborBytes: Uint8Array) => Effect.Effect<CML.UpdateCommittee, UpdateCommitteeError>
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of UpdateCommittee

**Signature**

```ts
export declare const fromCborHex: (cborBytes: string) => Effect.Effect<CML.UpdateCommittee, UpdateCommitteeError>
```

Added in v2.0.0

## fromJson

Static method fromJson of UpdateCommittee

**Signature**

```ts
export declare const fromJson: (json: string) => Effect.Effect<CML.UpdateCommittee, UpdateCommitteeError>
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls UpdateCommittee.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (
  actionId: CML.GovActionId | undefined,
  coldCredentials: CML.CommitteeColdCredentialList,
  credentials: CML.MapCommitteeColdCredentialToEpoch,
  unitInterval: CML.UnitInterval
) => CML.UpdateCommittee
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls UpdateCommittee.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (cborBytes: Uint8Array) => CML.UpdateCommittee
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls UpdateCommittee.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.UpdateCommittee
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls UpdateCommittee.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.UpdateCommittee
```

Added in v2.0.0

# Errors

## UpdateCommitteeError (class)

Error class for UpdateCommittee operations

This error is thrown when operations on UpdateCommittee instances fail.

**Signature**

```ts
export declare class UpdateCommitteeError
```

Added in v2.0.0

# Methods

## actionId

Method actionId of UpdateCommittee

**Signature**

```ts
export declare const actionId: (
  instance: CML.UpdateCommittee
) => Effect.Effect<CML.GovActionId | undefined, UpdateCommitteeError>
```

Added in v2.0.0

## coldCredentials

Method coldCredentials of UpdateCommittee

**Signature**

```ts
export declare const coldCredentials: (
  instance: CML.UpdateCommittee
) => Effect.Effect<CML.CommitteeColdCredentialList, UpdateCommitteeError>
```

Added in v2.0.0

## credentials

Method credentials of UpdateCommittee

**Signature**

```ts
export declare const credentials: (
  instance: CML.UpdateCommittee
) => Effect.Effect<CML.MapCommitteeColdCredentialToEpoch, UpdateCommitteeError>
```

Added in v2.0.0

## free

Method free of UpdateCommittee

**Signature**

```ts
export declare const free: (instance: CML.UpdateCommittee) => Effect.Effect<void, UpdateCommitteeError>
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of UpdateCommittee

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.UpdateCommittee
) => Effect.Effect<Uint8Array, UpdateCommitteeError>
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of UpdateCommittee

**Signature**

```ts
export declare const toCanonicalCborHex: (instance: CML.UpdateCommittee) => Effect.Effect<string, UpdateCommitteeError>
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of UpdateCommittee

**Signature**

```ts
export declare const toCborBytes: (instance: CML.UpdateCommittee) => Effect.Effect<Uint8Array, UpdateCommitteeError>
```

Added in v2.0.0

## toCborHex

Method toCborHex of UpdateCommittee

**Signature**

```ts
export declare const toCborHex: (instance: CML.UpdateCommittee) => Effect.Effect<string, UpdateCommitteeError>
```

Added in v2.0.0

## toJsValue

Method toJsValue of UpdateCommittee

**Signature**

```ts
export declare const toJsValue: (instance: CML.UpdateCommittee) => Effect.Effect<any, UpdateCommitteeError>
```

Added in v2.0.0

## toJson

Method toJson of UpdateCommittee

**Signature**

```ts
export declare const toJson: (instance: CML.UpdateCommittee) => Effect.Effect<string, UpdateCommitteeError>
```

Added in v2.0.0

## unitInterval

Method unitInterval of UpdateCommittee

**Signature**

```ts
export declare const unitInterval: (
  instance: CML.UpdateCommittee
) => Effect.Effect<CML.UnitInterval, UpdateCommitteeError>
```

Added in v2.0.0

# MethodsUnsafe

## actionIdUnsafe

Unsafely calls instance.actionId without Effect wrapper

**Signature**

```ts
export declare const actionIdUnsafe: (instance: CML.UpdateCommittee) => CML.GovActionId | undefined
```

Added in v2.0.0

## coldCredentialsUnsafe

Unsafely calls instance.coldCredentials without Effect wrapper

**Signature**

```ts
export declare const coldCredentialsUnsafe: (instance: CML.UpdateCommittee) => CML.CommitteeColdCredentialList
```

Added in v2.0.0

## credentialsUnsafe

Unsafely calls instance.credentials without Effect wrapper

**Signature**

```ts
export declare const credentialsUnsafe: (instance: CML.UpdateCommittee) => CML.MapCommitteeColdCredentialToEpoch
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.UpdateCommittee) => void
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (instance: CML.UpdateCommittee) => Uint8Array
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (instance: CML.UpdateCommittee) => string
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (instance: CML.UpdateCommittee) => Uint8Array
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.UpdateCommittee) => string
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.UpdateCommittee) => any
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.UpdateCommittee) => string
```

Added in v2.0.0

## unitIntervalUnsafe

Unsafely calls instance.unitInterval without Effect wrapper

**Signature**

```ts
export declare const unitIntervalUnsafe: (instance: CML.UpdateCommittee) => CML.UnitInterval
```

Added in v2.0.0

# Types

## UpdateCommittee (type alias)

Type alias for the CML UpdateCommittee class

**Signature**

```ts
export type UpdateCommittee = CML.UpdateCommittee
```

Added in v2.0.0
