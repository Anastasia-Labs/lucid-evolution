---
title: CML/NativeScriptWitnessInfo.ts
nav_order: 144
parent: Modules
---

## NativeScriptWitnessInfo overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [assumeSignatureCount](#assumesignaturecount)
  - [numSignatures](#numsignatures)
  - [vkeys](#vkeys)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [assumeSignatureCountUnsafe](#assumesignaturecountunsafe)
  - [numSignaturesUnsafe](#numsignaturesunsafe)
  - [vkeysUnsafe](#vkeysunsafe)
- [Errors](#errors)
  - [NativeScriptWitnessInfoError (class)](#nativescriptwitnessinfoerror-class)
- [Methods](#methods)
  - [free](#free)
- [MethodsUnsafe](#methodsunsafe)
  - [freeUnsafe](#freeunsafe)
- [Types](#types)
  - [NativeScriptWitnessInfo (type alias)](#nativescriptwitnessinfo-type-alias)

---

# Constructors

## assumeSignatureCount

Static method assumeSignatureCount of NativeScriptWitnessInfo

**Signature**

```ts
export declare const assumeSignatureCount: () => Effect.Effect<
  CML.NativeScriptWitnessInfo,
  NativeScriptWitnessInfoError
>;
```

Added in v2.0.0

## numSignatures

Static method numSignatures of NativeScriptWitnessInfo

**Signature**

```ts
export declare const numSignatures: (
  num: number,
) => Effect.Effect<CML.NativeScriptWitnessInfo, NativeScriptWitnessInfoError>;
```

Added in v2.0.0

## vkeys

Static method vkeys of NativeScriptWitnessInfo

**Signature**

```ts
export declare const vkeys: (
  _vkeys: CML.Ed25519KeyHashList,
) => Effect.Effect<CML.NativeScriptWitnessInfo, NativeScriptWitnessInfoError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## assumeSignatureCountUnsafe

Unsafely calls NativeScriptWitnessInfo.assumeSignatureCount without Effect wrapper

**Signature**

```ts
export declare const assumeSignatureCountUnsafe: () => CML.NativeScriptWitnessInfo;
```

Added in v2.0.0

## numSignaturesUnsafe

Unsafely calls NativeScriptWitnessInfo.numSignatures without Effect wrapper

**Signature**

```ts
export declare const numSignaturesUnsafe: (
  num: number,
) => CML.NativeScriptWitnessInfo;
```

Added in v2.0.0

## vkeysUnsafe

Unsafely calls NativeScriptWitnessInfo.vkeys without Effect wrapper

**Signature**

```ts
export declare const vkeysUnsafe: (
  _vkeys: CML.Ed25519KeyHashList,
) => CML.NativeScriptWitnessInfo;
```

Added in v2.0.0

# Errors

## NativeScriptWitnessInfoError (class)

Error class for NativeScriptWitnessInfo operations

This error is thrown when operations on NativeScriptWitnessInfo instances fail.

**Signature**

```ts
export declare class NativeScriptWitnessInfoError
```

Added in v2.0.0

# Methods

## free

Method free of NativeScriptWitnessInfo

**Signature**

```ts
export declare const free: (
  instance: CML.NativeScriptWitnessInfo,
) => Effect.Effect<void, NativeScriptWitnessInfoError>;
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (
  instance: CML.NativeScriptWitnessInfo,
) => void;
```

Added in v2.0.0

# Types

## NativeScriptWitnessInfo (type alias)

Type alias for the CML NativeScriptWitnessInfo class

**Signature**

```ts
export type NativeScriptWitnessInfo = CML.NativeScriptWitnessInfo;
```

Added in v2.0.0
