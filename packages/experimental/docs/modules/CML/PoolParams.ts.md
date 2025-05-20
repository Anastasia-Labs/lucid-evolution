---
title: CML/PoolParams.ts
nav_order: 170
parent: Modules
---

## PoolParams overview

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
  - [PoolParamsError (class)](#poolparamserror-class)
- [Methods](#methods)
  - [cost](#cost)
  - [free](#free)
  - [margin](#margin)
  - [operator](#operator)
  - [pledge](#pledge)
  - [poolMetadata](#poolmetadata)
  - [poolOwners](#poolowners)
  - [relays](#relays)
  - [rewardAccount](#rewardaccount)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
  - [vrfKeyhash](#vrfkeyhash)
- [MethodsUnsafe](#methodsunsafe)
  - [costUnsafe](#costunsafe)
  - [freeUnsafe](#freeunsafe)
  - [marginUnsafe](#marginunsafe)
  - [operatorUnsafe](#operatorunsafe)
  - [pledgeUnsafe](#pledgeunsafe)
  - [poolMetadataUnsafe](#poolmetadataunsafe)
  - [poolOwnersUnsafe](#poolownersunsafe)
  - [relaysUnsafe](#relaysunsafe)
  - [rewardAccountUnsafe](#rewardaccountunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
  - [vrfKeyhashUnsafe](#vrfkeyhashunsafe)
- [Types](#types)
  - [PoolParams (type alias)](#poolparams-type-alias)

---

# Constructors

## \_new

Static method \_new of PoolParams

**Signature**

```ts
export declare const _new: (
  operator: CML.Ed25519KeyHash,
  vrfKeyhash: CML.VRFKeyHash,
  pledge: bigint,
  cost: bigint,
  margin: CML.UnitInterval,
  rewardAccount: CML.RewardAddress,
  poolOwners: CML.Ed25519KeyHashList,
  relays: CML.RelayList,
  poolMetadata: CML.PoolMetadata
) => Effect.Effect<CML.PoolParams, PoolParamsError>
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of PoolParams

**Signature**

```ts
export declare const fromCborBytes: (cborBytes: Uint8Array) => Effect.Effect<CML.PoolParams, PoolParamsError>
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of PoolParams

**Signature**

```ts
export declare const fromCborHex: (cborBytes: string) => Effect.Effect<CML.PoolParams, PoolParamsError>
```

Added in v2.0.0

## fromJson

Static method fromJson of PoolParams

**Signature**

```ts
export declare const fromJson: (json: string) => Effect.Effect<CML.PoolParams, PoolParamsError>
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls PoolParams.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (
  operator: CML.Ed25519KeyHash,
  vrfKeyhash: CML.VRFKeyHash,
  pledge: bigint,
  cost: bigint,
  margin: CML.UnitInterval,
  rewardAccount: CML.RewardAddress,
  poolOwners: CML.Ed25519KeyHashList,
  relays: CML.RelayList,
  poolMetadata: CML.PoolMetadata
) => CML.PoolParams
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls PoolParams.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (cborBytes: Uint8Array) => CML.PoolParams
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls PoolParams.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.PoolParams
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls PoolParams.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.PoolParams
```

Added in v2.0.0

# Errors

## PoolParamsError (class)

Error class for PoolParams operations

This error is thrown when operations on PoolParams instances fail.

**Signature**

```ts
export declare class PoolParamsError
```

Added in v2.0.0

# Methods

## cost

Method cost of PoolParams

**Signature**

```ts
export declare const cost: (instance: CML.PoolParams) => Effect.Effect<bigint, PoolParamsError>
```

Added in v2.0.0

## free

Method free of PoolParams

**Signature**

```ts
export declare const free: (instance: CML.PoolParams) => Effect.Effect<void, PoolParamsError>
```

Added in v2.0.0

## margin

Method margin of PoolParams

**Signature**

```ts
export declare const margin: (instance: CML.PoolParams) => Effect.Effect<CML.UnitInterval, PoolParamsError>
```

Added in v2.0.0

## operator

Method operator of PoolParams

**Signature**

```ts
export declare const operator: (instance: CML.PoolParams) => Effect.Effect<CML.Ed25519KeyHash, PoolParamsError>
```

Added in v2.0.0

## pledge

Method pledge of PoolParams

**Signature**

```ts
export declare const pledge: (instance: CML.PoolParams) => Effect.Effect<bigint, PoolParamsError>
```

Added in v2.0.0

## poolMetadata

Method poolMetadata of PoolParams

**Signature**

```ts
export declare const poolMetadata: (
  instance: CML.PoolParams
) => Effect.Effect<CML.PoolMetadata | undefined, PoolParamsError>
```

Added in v2.0.0

## poolOwners

Method poolOwners of PoolParams

**Signature**

```ts
export declare const poolOwners: (instance: CML.PoolParams) => Effect.Effect<CML.Ed25519KeyHashList, PoolParamsError>
```

Added in v2.0.0

## relays

Method relays of PoolParams

**Signature**

```ts
export declare const relays: (instance: CML.PoolParams) => Effect.Effect<CML.RelayList, PoolParamsError>
```

Added in v2.0.0

## rewardAccount

Method rewardAccount of PoolParams

**Signature**

```ts
export declare const rewardAccount: (instance: CML.PoolParams) => Effect.Effect<CML.RewardAddress, PoolParamsError>
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of PoolParams

**Signature**

```ts
export declare const toCanonicalCborBytes: (instance: CML.PoolParams) => Effect.Effect<Uint8Array, PoolParamsError>
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of PoolParams

**Signature**

```ts
export declare const toCanonicalCborHex: (instance: CML.PoolParams) => Effect.Effect<string, PoolParamsError>
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of PoolParams

**Signature**

```ts
export declare const toCborBytes: (instance: CML.PoolParams) => Effect.Effect<Uint8Array, PoolParamsError>
```

Added in v2.0.0

## toCborHex

Method toCborHex of PoolParams

**Signature**

```ts
export declare const toCborHex: (instance: CML.PoolParams) => Effect.Effect<string, PoolParamsError>
```

Added in v2.0.0

## toJsValue

Method toJsValue of PoolParams

**Signature**

```ts
export declare const toJsValue: (instance: CML.PoolParams) => Effect.Effect<any, PoolParamsError>
```

Added in v2.0.0

## toJson

Method toJson of PoolParams

**Signature**

```ts
export declare const toJson: (instance: CML.PoolParams) => Effect.Effect<string, PoolParamsError>
```

Added in v2.0.0

## vrfKeyhash

Method vrfKeyhash of PoolParams

**Signature**

```ts
export declare const vrfKeyhash: (instance: CML.PoolParams) => Effect.Effect<CML.VRFKeyHash, PoolParamsError>
```

Added in v2.0.0

# MethodsUnsafe

## costUnsafe

Unsafely calls instance.cost without Effect wrapper

**Signature**

```ts
export declare const costUnsafe: (instance: CML.PoolParams) => bigint
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.PoolParams) => void
```

Added in v2.0.0

## marginUnsafe

Unsafely calls instance.margin without Effect wrapper

**Signature**

```ts
export declare const marginUnsafe: (instance: CML.PoolParams) => CML.UnitInterval
```

Added in v2.0.0

## operatorUnsafe

Unsafely calls instance.operator without Effect wrapper

**Signature**

```ts
export declare const operatorUnsafe: (instance: CML.PoolParams) => CML.Ed25519KeyHash
```

Added in v2.0.0

## pledgeUnsafe

Unsafely calls instance.pledge without Effect wrapper

**Signature**

```ts
export declare const pledgeUnsafe: (instance: CML.PoolParams) => bigint
```

Added in v2.0.0

## poolMetadataUnsafe

Unsafely calls instance.poolMetadata without Effect wrapper

**Signature**

```ts
export declare const poolMetadataUnsafe: (instance: CML.PoolParams) => CML.PoolMetadata | undefined
```

Added in v2.0.0

## poolOwnersUnsafe

Unsafely calls instance.poolOwners without Effect wrapper

**Signature**

```ts
export declare const poolOwnersUnsafe: (instance: CML.PoolParams) => CML.Ed25519KeyHashList
```

Added in v2.0.0

## relaysUnsafe

Unsafely calls instance.relays without Effect wrapper

**Signature**

```ts
export declare const relaysUnsafe: (instance: CML.PoolParams) => CML.RelayList
```

Added in v2.0.0

## rewardAccountUnsafe

Unsafely calls instance.rewardAccount without Effect wrapper

**Signature**

```ts
export declare const rewardAccountUnsafe: (instance: CML.PoolParams) => CML.RewardAddress
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (instance: CML.PoolParams) => Uint8Array
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (instance: CML.PoolParams) => string
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (instance: CML.PoolParams) => Uint8Array
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.PoolParams) => string
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.PoolParams) => any
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.PoolParams) => string
```

Added in v2.0.0

## vrfKeyhashUnsafe

Unsafely calls instance.vrfKeyhash without Effect wrapper

**Signature**

```ts
export declare const vrfKeyhashUnsafe: (instance: CML.PoolParams) => CML.VRFKeyHash
```

Added in v2.0.0

# Types

## PoolParams (type alias)

Type alias for the CML PoolParams class

**Signature**

```ts
export type PoolParams = CML.PoolParams
```

Added in v2.0.0
