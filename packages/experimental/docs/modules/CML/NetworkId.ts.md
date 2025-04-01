---
title: CML/NetworkId.ts
nav_order: 139
parent: Modules
---

## NetworkId overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
  - [fromCborBytes](#fromcborbytes)
  - [fromCborHex](#fromcborhex)
  - [fromJson](#fromjson)
  - [mainnet](#mainnet)
  - [testnet](#testnet)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
  - [fromCborBytesUnsafe](#fromcborbytesunsafe)
  - [fromCborHexUnsafe](#fromcborhexunsafe)
  - [fromJsonUnsafe](#fromjsonunsafe)
  - [mainnetUnsafe](#mainnetunsafe)
  - [testnetUnsafe](#testnetunsafe)
- [Errors](#errors)
  - [NetworkIdError (class)](#networkiderror-class)
- [Methods](#methods)
  - [free](#free)
  - [network](#network)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
- [MethodsUnsafe](#methodsunsafe)
  - [freeUnsafe](#freeunsafe)
  - [networkUnsafe](#networkunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
- [Types](#types)
  - [NetworkId (type alias)](#networkid-type-alias)

---

# Constructors

## \_new

Static method \_new of NetworkId

**Signature**

```ts
export declare const _new: (network: bigint) => Effect.Effect<CML.NetworkId, NetworkIdError>
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of NetworkId

**Signature**

```ts
export declare const fromCborBytes: (cborBytes: Uint8Array) => Effect.Effect<CML.NetworkId, NetworkIdError>
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of NetworkId

**Signature**

```ts
export declare const fromCborHex: (cborBytes: string) => Effect.Effect<CML.NetworkId, NetworkIdError>
```

Added in v2.0.0

## fromJson

Static method fromJson of NetworkId

**Signature**

```ts
export declare const fromJson: (json: string) => Effect.Effect<CML.NetworkId, NetworkIdError>
```

Added in v2.0.0

## mainnet

Static method mainnet of NetworkId

**Signature**

```ts
export declare const mainnet: () => Effect.Effect<CML.NetworkId, NetworkIdError>
```

Added in v2.0.0

## testnet

Static method testnet of NetworkId

**Signature**

```ts
export declare const testnet: () => Effect.Effect<CML.NetworkId, NetworkIdError>
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls NetworkId.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (network: bigint) => CML.NetworkId
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls NetworkId.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (cborBytes: Uint8Array) => CML.NetworkId
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls NetworkId.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.NetworkId
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls NetworkId.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.NetworkId
```

Added in v2.0.0

## mainnetUnsafe

Unsafely calls NetworkId.mainnet without Effect wrapper

**Signature**

```ts
export declare const mainnetUnsafe: () => CML.NetworkId
```

Added in v2.0.0

## testnetUnsafe

Unsafely calls NetworkId.testnet without Effect wrapper

**Signature**

```ts
export declare const testnetUnsafe: () => CML.NetworkId
```

Added in v2.0.0

# Errors

## NetworkIdError (class)

Error class for NetworkId operations

This error is thrown when operations on NetworkId instances fail.

**Signature**

```ts
export declare class NetworkIdError
```

Added in v2.0.0

# Methods

## free

Method free of NetworkId

**Signature**

```ts
export declare const free: (instance: CML.NetworkId) => Effect.Effect<void, NetworkIdError>
```

Added in v2.0.0

## network

Method network of NetworkId

**Signature**

```ts
export declare const network: (instance: CML.NetworkId) => Effect.Effect<bigint, NetworkIdError>
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of NetworkId

**Signature**

```ts
export declare const toCanonicalCborBytes: (instance: CML.NetworkId) => Effect.Effect<Uint8Array, NetworkIdError>
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of NetworkId

**Signature**

```ts
export declare const toCanonicalCborHex: (instance: CML.NetworkId) => Effect.Effect<string, NetworkIdError>
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of NetworkId

**Signature**

```ts
export declare const toCborBytes: (instance: CML.NetworkId) => Effect.Effect<Uint8Array, NetworkIdError>
```

Added in v2.0.0

## toCborHex

Method toCborHex of NetworkId

**Signature**

```ts
export declare const toCborHex: (instance: CML.NetworkId) => Effect.Effect<string, NetworkIdError>
```

Added in v2.0.0

## toJsValue

Method toJsValue of NetworkId

**Signature**

```ts
export declare const toJsValue: (instance: CML.NetworkId) => Effect.Effect<any, NetworkIdError>
```

Added in v2.0.0

## toJson

Method toJson of NetworkId

**Signature**

```ts
export declare const toJson: (instance: CML.NetworkId) => Effect.Effect<string, NetworkIdError>
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.NetworkId) => void
```

Added in v2.0.0

## networkUnsafe

Unsafely calls instance.network without Effect wrapper

**Signature**

```ts
export declare const networkUnsafe: (instance: CML.NetworkId) => bigint
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (instance: CML.NetworkId) => Uint8Array
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (instance: CML.NetworkId) => string
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (instance: CML.NetworkId) => Uint8Array
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.NetworkId) => string
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.NetworkId) => any
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.NetworkId) => string
```

Added in v2.0.0

# Types

## NetworkId (type alias)

Type alias for the CML NetworkId class

**Signature**

```ts
export type NetworkId = CML.NetworkId
```

Added in v2.0.0
