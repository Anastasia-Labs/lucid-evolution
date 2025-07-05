---
title: CML/NetworkInfo.ts
nav_order: 145
parent: Modules
---

## NetworkInfo overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
  - [mainnet](#mainnet)
  - [preprod](#preprod)
  - [preview](#preview)
  - [sanchoTestnet](#sanchotestnet)
  - [testnet](#testnet)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
  - [mainnetUnsafe](#mainnetunsafe)
  - [preprodUnsafe](#preprodunsafe)
  - [previewUnsafe](#previewunsafe)
  - [sanchoTestnetUnsafe](#sanchotestnetunsafe)
  - [testnetUnsafe](#testnetunsafe)
- [Errors](#errors)
  - [NetworkInfoError (class)](#networkinfoerror-class)
- [Methods](#methods)
  - [free](#free)
  - [networkId](#networkid)
  - [protocolMagic](#protocolmagic)
- [MethodsUnsafe](#methodsunsafe)
  - [freeUnsafe](#freeunsafe)
  - [networkIdUnsafe](#networkidunsafe)
  - [protocolMagicUnsafe](#protocolmagicunsafe)
- [Types](#types)
  - [NetworkInfo (type alias)](#networkinfo-type-alias)

---

# Constructors

## \_new

Static method \_new of NetworkInfo

**Signature**

```ts
export declare const _new: (
  networkId: number,
  protocolMagic: CML.ProtocolMagic,
) => Effect.Effect<CML.NetworkInfo, NetworkInfoError>;
```

Added in v2.0.0

## mainnet

Static method mainnet of NetworkInfo

**Signature**

```ts
export declare const mainnet: () => Effect.Effect<
  CML.NetworkInfo,
  NetworkInfoError
>;
```

Added in v2.0.0

## preprod

Static method preprod of NetworkInfo

**Signature**

```ts
export declare const preprod: () => Effect.Effect<
  CML.NetworkInfo,
  NetworkInfoError
>;
```

Added in v2.0.0

## preview

Static method preview of NetworkInfo

**Signature**

```ts
export declare const preview: () => Effect.Effect<
  CML.NetworkInfo,
  NetworkInfoError
>;
```

Added in v2.0.0

## sanchoTestnet

Static method sanchoTestnet of NetworkInfo

**Signature**

```ts
export declare const sanchoTestnet: () => Effect.Effect<
  CML.NetworkInfo,
  NetworkInfoError
>;
```

Added in v2.0.0

## testnet

Static method testnet of NetworkInfo

**Signature**

```ts
export declare const testnet: () => Effect.Effect<
  CML.NetworkInfo,
  NetworkInfoError
>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls NetworkInfo.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (
  networkId: number,
  protocolMagic: CML.ProtocolMagic,
) => CML.NetworkInfo;
```

Added in v2.0.0

## mainnetUnsafe

Unsafely calls NetworkInfo.mainnet without Effect wrapper

**Signature**

```ts
export declare const mainnetUnsafe: () => CML.NetworkInfo;
```

Added in v2.0.0

## preprodUnsafe

Unsafely calls NetworkInfo.preprod without Effect wrapper

**Signature**

```ts
export declare const preprodUnsafe: () => CML.NetworkInfo;
```

Added in v2.0.0

## previewUnsafe

Unsafely calls NetworkInfo.preview without Effect wrapper

**Signature**

```ts
export declare const previewUnsafe: () => CML.NetworkInfo;
```

Added in v2.0.0

## sanchoTestnetUnsafe

Unsafely calls NetworkInfo.sanchoTestnet without Effect wrapper

**Signature**

```ts
export declare const sanchoTestnetUnsafe: () => CML.NetworkInfo;
```

Added in v2.0.0

## testnetUnsafe

Unsafely calls NetworkInfo.testnet without Effect wrapper

**Signature**

```ts
export declare const testnetUnsafe: () => CML.NetworkInfo;
```

Added in v2.0.0

# Errors

## NetworkInfoError (class)

Error class for NetworkInfo operations

This error is thrown when operations on NetworkInfo instances fail.

**Signature**

```ts
export declare class NetworkInfoError
```

Added in v2.0.0

# Methods

## free

Method free of NetworkInfo

**Signature**

```ts
export declare const free: (
  instance: CML.NetworkInfo,
) => Effect.Effect<void, NetworkInfoError>;
```

Added in v2.0.0

## networkId

Method networkId of NetworkInfo

**Signature**

```ts
export declare const networkId: (
  instance: CML.NetworkInfo,
) => Effect.Effect<number, NetworkInfoError>;
```

Added in v2.0.0

## protocolMagic

Method protocolMagic of NetworkInfo

**Signature**

```ts
export declare const protocolMagic: (
  instance: CML.NetworkInfo,
) => Effect.Effect<CML.ProtocolMagic, NetworkInfoError>;
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.NetworkInfo) => void;
```

Added in v2.0.0

## networkIdUnsafe

Unsafely calls instance.networkId without Effect wrapper

**Signature**

```ts
export declare const networkIdUnsafe: (instance: CML.NetworkInfo) => number;
```

Added in v2.0.0

## protocolMagicUnsafe

Unsafely calls instance.protocolMagic without Effect wrapper

**Signature**

```ts
export declare const protocolMagicUnsafe: (
  instance: CML.NetworkInfo,
) => CML.ProtocolMagic;
```

Added in v2.0.0

# Types

## NetworkInfo (type alias)

Type alias for the CML NetworkInfo class

**Signature**

```ts
export type NetworkInfo = CML.NetworkInfo;
```

Added in v2.0.0
