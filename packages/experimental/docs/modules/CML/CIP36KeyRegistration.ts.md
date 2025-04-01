---
title: CML/CIP36KeyRegistration.ts
nav_order: 42
parent: Modules
---

## CIP36KeyRegistration overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [fromCborBytes](#fromcborbytes)
  - [fromCborHex](#fromcborhex)
  - [fromJson](#fromjson)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [fromCborBytesUnsafe](#fromcborbytesunsafe)
  - [fromCborHexUnsafe](#fromcborhexunsafe)
  - [fromJsonUnsafe](#fromjsonunsafe)
- [Errors](#errors)
  - [CIP36KeyRegistrationError (class)](#cip36keyregistrationerror-class)
- [Methods](#methods)
  - [delegation](#delegation)
  - [free](#free)
  - [nonce](#nonce)
  - [paymentAddress](#paymentaddress)
  - [setVotingPurpose](#setvotingpurpose)
  - [stakeCredential](#stakecredential)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
  - [votingPurpose](#votingpurpose)
- [MethodsUnsafe](#methodsunsafe)
  - [delegationUnsafe](#delegationunsafe)
  - [freeUnsafe](#freeunsafe)
  - [nonceUnsafe](#nonceunsafe)
  - [paymentAddressUnsafe](#paymentaddressunsafe)
  - [setVotingPurposeUnsafe](#setvotingpurposeunsafe)
  - [stakeCredentialUnsafe](#stakecredentialunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
  - [votingPurposeUnsafe](#votingpurposeunsafe)
- [Types](#types)
  - [CIP36KeyRegistration (type alias)](#cip36keyregistration-type-alias)

---

# Constructors

## fromCborBytes

Static method fromCborBytes of CIP36KeyRegistration

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array
) => Effect.Effect<CML.CIP36KeyRegistration, CIP36KeyRegistrationError>
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of CIP36KeyRegistration

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string
) => Effect.Effect<CML.CIP36KeyRegistration, CIP36KeyRegistrationError>
```

Added in v2.0.0

## fromJson

Static method fromJson of CIP36KeyRegistration

**Signature**

```ts
export declare const fromJson: (json: string) => Effect.Effect<CML.CIP36KeyRegistration, CIP36KeyRegistrationError>
```

Added in v2.0.0

# ConstructorsUnsafe

## fromCborBytesUnsafe

Unsafely calls CIP36KeyRegistration.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (cborBytes: Uint8Array) => CML.CIP36KeyRegistration
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls CIP36KeyRegistration.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.CIP36KeyRegistration
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls CIP36KeyRegistration.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.CIP36KeyRegistration
```

Added in v2.0.0

# Errors

## CIP36KeyRegistrationError (class)

Error class for CIP36KeyRegistration operations

This error is thrown when operations on CIP36KeyRegistration instances fail.

**Signature**

```ts
export declare class CIP36KeyRegistrationError
```

Added in v2.0.0

# Methods

## delegation

Method delegation of CIP36KeyRegistration

**Signature**

```ts
export declare const delegation: (
  instance: CML.CIP36KeyRegistration
) => Effect.Effect<CML.CIP36DelegationDistribution, CIP36KeyRegistrationError>
```

Added in v2.0.0

## free

Method free of CIP36KeyRegistration

**Signature**

```ts
export declare const free: (instance: CML.CIP36KeyRegistration) => Effect.Effect<void, CIP36KeyRegistrationError>
```

Added in v2.0.0

## nonce

Method nonce of CIP36KeyRegistration

**Signature**

```ts
export declare const nonce: (instance: CML.CIP36KeyRegistration) => Effect.Effect<bigint, CIP36KeyRegistrationError>
```

Added in v2.0.0

## paymentAddress

Method paymentAddress of CIP36KeyRegistration

**Signature**

```ts
export declare const paymentAddress: (
  instance: CML.CIP36KeyRegistration
) => Effect.Effect<CML.Address, CIP36KeyRegistrationError>
```

Added in v2.0.0

## setVotingPurpose

Method setVotingPurpose of CIP36KeyRegistration

**Signature**

```ts
export declare const setVotingPurpose: (
  instance: CML.CIP36KeyRegistration,
  votingPurpose: bigint
) => Effect.Effect<void, CIP36KeyRegistrationError>
```

Added in v2.0.0

## stakeCredential

Method stakeCredential of CIP36KeyRegistration

**Signature**

```ts
export declare const stakeCredential: (
  instance: CML.CIP36KeyRegistration
) => Effect.Effect<CML.PublicKey, CIP36KeyRegistrationError>
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of CIP36KeyRegistration

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.CIP36KeyRegistration
) => Effect.Effect<Uint8Array, CIP36KeyRegistrationError>
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of CIP36KeyRegistration

**Signature**

```ts
export declare const toCanonicalCborHex: (
  instance: CML.CIP36KeyRegistration
) => Effect.Effect<string, CIP36KeyRegistrationError>
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of CIP36KeyRegistration

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.CIP36KeyRegistration
) => Effect.Effect<Uint8Array, CIP36KeyRegistrationError>
```

Added in v2.0.0

## toCborHex

Method toCborHex of CIP36KeyRegistration

**Signature**

```ts
export declare const toCborHex: (instance: CML.CIP36KeyRegistration) => Effect.Effect<string, CIP36KeyRegistrationError>
```

Added in v2.0.0

## toJsValue

Method toJsValue of CIP36KeyRegistration

**Signature**

```ts
export declare const toJsValue: (instance: CML.CIP36KeyRegistration) => Effect.Effect<any, CIP36KeyRegistrationError>
```

Added in v2.0.0

## toJson

Method toJson of CIP36KeyRegistration

**Signature**

```ts
export declare const toJson: (instance: CML.CIP36KeyRegistration) => Effect.Effect<string, CIP36KeyRegistrationError>
```

Added in v2.0.0

## votingPurpose

Method votingPurpose of CIP36KeyRegistration

**Signature**

```ts
export declare const votingPurpose: (
  instance: CML.CIP36KeyRegistration
) => Effect.Effect<bigint, CIP36KeyRegistrationError>
```

Added in v2.0.0

# MethodsUnsafe

## delegationUnsafe

Unsafely calls instance.delegation without Effect wrapper

**Signature**

```ts
export declare const delegationUnsafe: (instance: CML.CIP36KeyRegistration) => CML.CIP36DelegationDistribution
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.CIP36KeyRegistration) => void
```

Added in v2.0.0

## nonceUnsafe

Unsafely calls instance.nonce without Effect wrapper

**Signature**

```ts
export declare const nonceUnsafe: (instance: CML.CIP36KeyRegistration) => bigint
```

Added in v2.0.0

## paymentAddressUnsafe

Unsafely calls instance.paymentAddress without Effect wrapper

**Signature**

```ts
export declare const paymentAddressUnsafe: (instance: CML.CIP36KeyRegistration) => CML.Address
```

Added in v2.0.0

## setVotingPurposeUnsafe

Unsafely calls instance.setVotingPurpose without Effect wrapper

**Signature**

```ts
export declare const setVotingPurposeUnsafe: (instance: CML.CIP36KeyRegistration, votingPurpose: bigint) => void
```

Added in v2.0.0

## stakeCredentialUnsafe

Unsafely calls instance.stakeCredential without Effect wrapper

**Signature**

```ts
export declare const stakeCredentialUnsafe: (instance: CML.CIP36KeyRegistration) => CML.PublicKey
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (instance: CML.CIP36KeyRegistration) => Uint8Array
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (instance: CML.CIP36KeyRegistration) => string
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (instance: CML.CIP36KeyRegistration) => Uint8Array
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.CIP36KeyRegistration) => string
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.CIP36KeyRegistration) => any
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.CIP36KeyRegistration) => string
```

Added in v2.0.0

## votingPurposeUnsafe

Unsafely calls instance.votingPurpose without Effect wrapper

**Signature**

```ts
export declare const votingPurposeUnsafe: (instance: CML.CIP36KeyRegistration) => bigint
```

Added in v2.0.0

# Types

## CIP36KeyRegistration (type alias)

Type alias for the CML CIP36KeyRegistration class

**Signature**

```ts
export type CIP36KeyRegistration = CML.CIP36KeyRegistration
```

Added in v2.0.0
