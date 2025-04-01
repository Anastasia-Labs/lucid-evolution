---
title: CML/TransactionWitnessSet.ts
nav_order: 237
parent: Modules
---

## TransactionWitnessSet overview

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
  - [TransactionWitnessSetError (class)](#transactionwitnessseterror-class)
- [Methods](#methods)
  - [addAllWitnesses](#addallwitnesses)
  - [bootstrapWitnesses](#bootstrapwitnesses)
  - [free](#free)
  - [languages](#languages)
  - [nativeScripts](#nativescripts)
  - [plutusDatums](#plutusdatums)
  - [plutusV1Scripts](#plutusv1scripts)
  - [plutusV2Scripts](#plutusv2scripts)
  - [plutusV3Scripts](#plutusv3scripts)
  - [redeemers](#redeemers)
  - [setBootstrapWitnesses](#setbootstrapwitnesses)
  - [setNativeScripts](#setnativescripts)
  - [setPlutusDatums](#setplutusdatums)
  - [setPlutusV1Scripts](#setplutusv1scripts)
  - [setPlutusV2Scripts](#setplutusv2scripts)
  - [setPlutusV3Scripts](#setplutusv3scripts)
  - [setRedeemers](#setredeemers)
  - [setVkeywitnesses](#setvkeywitnesses)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
  - [vkeywitnesses](#vkeywitnesses)
- [MethodsUnsafe](#methodsunsafe)
  - [addAllWitnessesUnsafe](#addallwitnessesunsafe)
  - [bootstrapWitnessesUnsafe](#bootstrapwitnessesunsafe)
  - [freeUnsafe](#freeunsafe)
  - [languagesUnsafe](#languagesunsafe)
  - [nativeScriptsUnsafe](#nativescriptsunsafe)
  - [plutusDatumsUnsafe](#plutusdatumsunsafe)
  - [plutusV1ScriptsUnsafe](#plutusv1scriptsunsafe)
  - [plutusV2ScriptsUnsafe](#plutusv2scriptsunsafe)
  - [plutusV3ScriptsUnsafe](#plutusv3scriptsunsafe)
  - [redeemersUnsafe](#redeemersunsafe)
  - [setBootstrapWitnessesUnsafe](#setbootstrapwitnessesunsafe)
  - [setNativeScriptsUnsafe](#setnativescriptsunsafe)
  - [setPlutusDatumsUnsafe](#setplutusdatumsunsafe)
  - [setPlutusV1ScriptsUnsafe](#setplutusv1scriptsunsafe)
  - [setPlutusV2ScriptsUnsafe](#setplutusv2scriptsunsafe)
  - [setPlutusV3ScriptsUnsafe](#setplutusv3scriptsunsafe)
  - [setRedeemersUnsafe](#setredeemersunsafe)
  - [setVkeywitnessesUnsafe](#setvkeywitnessesunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
  - [vkeywitnessesUnsafe](#vkeywitnessesunsafe)
- [Types](#types)
  - [TransactionWitnessSet (type alias)](#transactionwitnessset-type-alias)

---

# Constructors

## \_new

Static method \_new of TransactionWitnessSet

**Signature**

```ts
export declare const _new: () => Effect.Effect<
  CML.TransactionWitnessSet,
  TransactionWitnessSetError
>;
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of TransactionWitnessSet

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.TransactionWitnessSet, TransactionWitnessSetError>;
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of TransactionWitnessSet

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.TransactionWitnessSet, TransactionWitnessSetError>;
```

Added in v2.0.0

## fromJson

Static method fromJson of TransactionWitnessSet

**Signature**

```ts
export declare const fromJson: (
  json: string,
) => Effect.Effect<CML.TransactionWitnessSet, TransactionWitnessSetError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls TransactionWitnessSet.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: () => CML.TransactionWitnessSet;
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls TransactionWitnessSet.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (
  cborBytes: Uint8Array,
) => CML.TransactionWitnessSet;
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls TransactionWitnessSet.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (
  cborBytes: string,
) => CML.TransactionWitnessSet;
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls TransactionWitnessSet.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (
  json: string,
) => CML.TransactionWitnessSet;
```

Added in v2.0.0

# Errors

## TransactionWitnessSetError (class)

Error class for TransactionWitnessSet operations

This error is thrown when operations on TransactionWitnessSet instances fail.

**Signature**

```ts
export declare class TransactionWitnessSetError
```

Added in v2.0.0

# Methods

## addAllWitnesses

Method addAllWitnesses of TransactionWitnessSet

**Signature**

```ts
export declare const addAllWitnesses: (
  instance: CML.TransactionWitnessSet,
  other: CML.TransactionWitnessSet,
) => Effect.Effect<void, TransactionWitnessSetError>;
```

Added in v2.0.0

## bootstrapWitnesses

Method bootstrapWitnesses of TransactionWitnessSet

**Signature**

```ts
export declare const bootstrapWitnesses: (
  instance: CML.TransactionWitnessSet,
) => Effect.Effect<
  CML.BootstrapWitnessList | undefined,
  TransactionWitnessSetError
>;
```

Added in v2.0.0

## free

Method free of TransactionWitnessSet

**Signature**

```ts
export declare const free: (
  instance: CML.TransactionWitnessSet,
) => Effect.Effect<void, TransactionWitnessSetError>;
```

Added in v2.0.0

## languages

Method languages of TransactionWitnessSet

**Signature**

```ts
export declare const languages: (
  instance: CML.TransactionWitnessSet,
) => Effect.Effect<CML.LanguageList, TransactionWitnessSetError>;
```

Added in v2.0.0

## nativeScripts

Method nativeScripts of TransactionWitnessSet

**Signature**

```ts
export declare const nativeScripts: (
  instance: CML.TransactionWitnessSet,
) => Effect.Effect<
  CML.NativeScriptList | undefined,
  TransactionWitnessSetError
>;
```

Added in v2.0.0

## plutusDatums

Method plutusDatums of TransactionWitnessSet

**Signature**

```ts
export declare const plutusDatums: (
  instance: CML.TransactionWitnessSet,
) => Effect.Effect<CML.PlutusDataList | undefined, TransactionWitnessSetError>;
```

Added in v2.0.0

## plutusV1Scripts

Method plutusV1Scripts of TransactionWitnessSet

**Signature**

```ts
export declare const plutusV1Scripts: (
  instance: CML.TransactionWitnessSet,
) => Effect.Effect<
  CML.PlutusV1ScriptList | undefined,
  TransactionWitnessSetError
>;
```

Added in v2.0.0

## plutusV2Scripts

Method plutusV2Scripts of TransactionWitnessSet

**Signature**

```ts
export declare const plutusV2Scripts: (
  instance: CML.TransactionWitnessSet,
) => Effect.Effect<
  CML.PlutusV2ScriptList | undefined,
  TransactionWitnessSetError
>;
```

Added in v2.0.0

## plutusV3Scripts

Method plutusV3Scripts of TransactionWitnessSet

**Signature**

```ts
export declare const plutusV3Scripts: (
  instance: CML.TransactionWitnessSet,
) => Effect.Effect<
  CML.PlutusV3ScriptList | undefined,
  TransactionWitnessSetError
>;
```

Added in v2.0.0

## redeemers

Method redeemers of TransactionWitnessSet

**Signature**

```ts
export declare const redeemers: (
  instance: CML.TransactionWitnessSet,
) => Effect.Effect<CML.Redeemers | undefined, TransactionWitnessSetError>;
```

Added in v2.0.0

## setBootstrapWitnesses

Method setBootstrapWitnesses of TransactionWitnessSet

**Signature**

```ts
export declare const setBootstrapWitnesses: (
  instance: CML.TransactionWitnessSet,
  bootstrapWitnesses: CML.BootstrapWitnessList,
) => Effect.Effect<void, TransactionWitnessSetError>;
```

Added in v2.0.0

## setNativeScripts

Method setNativeScripts of TransactionWitnessSet

**Signature**

```ts
export declare const setNativeScripts: (
  instance: CML.TransactionWitnessSet,
  nativeScripts: CML.NativeScriptList,
) => Effect.Effect<void, TransactionWitnessSetError>;
```

Added in v2.0.0

## setPlutusDatums

Method setPlutusDatums of TransactionWitnessSet

**Signature**

```ts
export declare const setPlutusDatums: (
  instance: CML.TransactionWitnessSet,
  plutusDatums: CML.PlutusDataList,
) => Effect.Effect<void, TransactionWitnessSetError>;
```

Added in v2.0.0

## setPlutusV1Scripts

Method setPlutusV1Scripts of TransactionWitnessSet

**Signature**

```ts
export declare const setPlutusV1Scripts: (
  instance: CML.TransactionWitnessSet,
  plutusV1Scripts: CML.PlutusV1ScriptList,
) => Effect.Effect<void, TransactionWitnessSetError>;
```

Added in v2.0.0

## setPlutusV2Scripts

Method setPlutusV2Scripts of TransactionWitnessSet

**Signature**

```ts
export declare const setPlutusV2Scripts: (
  instance: CML.TransactionWitnessSet,
  plutusV2Scripts: CML.PlutusV2ScriptList,
) => Effect.Effect<void, TransactionWitnessSetError>;
```

Added in v2.0.0

## setPlutusV3Scripts

Method setPlutusV3Scripts of TransactionWitnessSet

**Signature**

```ts
export declare const setPlutusV3Scripts: (
  instance: CML.TransactionWitnessSet,
  plutusV3Scripts: CML.PlutusV3ScriptList,
) => Effect.Effect<void, TransactionWitnessSetError>;
```

Added in v2.0.0

## setRedeemers

Method setRedeemers of TransactionWitnessSet

**Signature**

```ts
export declare const setRedeemers: (
  instance: CML.TransactionWitnessSet,
  redeemers: CML.Redeemers,
) => Effect.Effect<void, TransactionWitnessSetError>;
```

Added in v2.0.0

## setVkeywitnesses

Method setVkeywitnesses of TransactionWitnessSet

**Signature**

```ts
export declare const setVkeywitnesses: (
  instance: CML.TransactionWitnessSet,
  vkeywitnesses: CML.VkeywitnessList,
) => Effect.Effect<void, TransactionWitnessSetError>;
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of TransactionWitnessSet

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.TransactionWitnessSet,
) => Effect.Effect<Uint8Array, TransactionWitnessSetError>;
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of TransactionWitnessSet

**Signature**

```ts
export declare const toCanonicalCborHex: (
  instance: CML.TransactionWitnessSet,
) => Effect.Effect<string, TransactionWitnessSetError>;
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of TransactionWitnessSet

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.TransactionWitnessSet,
) => Effect.Effect<Uint8Array, TransactionWitnessSetError>;
```

Added in v2.0.0

## toCborHex

Method toCborHex of TransactionWitnessSet

**Signature**

```ts
export declare const toCborHex: (
  instance: CML.TransactionWitnessSet,
) => Effect.Effect<string, TransactionWitnessSetError>;
```

Added in v2.0.0

## toJsValue

Method toJsValue of TransactionWitnessSet

**Signature**

```ts
export declare const toJsValue: (
  instance: CML.TransactionWitnessSet,
) => Effect.Effect<any, TransactionWitnessSetError>;
```

Added in v2.0.0

## toJson

Method toJson of TransactionWitnessSet

**Signature**

```ts
export declare const toJson: (
  instance: CML.TransactionWitnessSet,
) => Effect.Effect<string, TransactionWitnessSetError>;
```

Added in v2.0.0

## vkeywitnesses

Method vkeywitnesses of TransactionWitnessSet

**Signature**

```ts
export declare const vkeywitnesses: (
  instance: CML.TransactionWitnessSet,
) => Effect.Effect<CML.VkeywitnessList | undefined, TransactionWitnessSetError>;
```

Added in v2.0.0

# MethodsUnsafe

## addAllWitnessesUnsafe

Unsafely calls instance.addAllWitnesses without Effect wrapper

**Signature**

```ts
export declare const addAllWitnessesUnsafe: (
  instance: CML.TransactionWitnessSet,
  other: CML.TransactionWitnessSet,
) => void;
```

Added in v2.0.0

## bootstrapWitnessesUnsafe

Unsafely calls instance.bootstrapWitnesses without Effect wrapper

**Signature**

```ts
export declare const bootstrapWitnessesUnsafe: (
  instance: CML.TransactionWitnessSet,
) => CML.BootstrapWitnessList | undefined;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.TransactionWitnessSet) => void;
```

Added in v2.0.0

## languagesUnsafe

Unsafely calls instance.languages without Effect wrapper

**Signature**

```ts
export declare const languagesUnsafe: (
  instance: CML.TransactionWitnessSet,
) => CML.LanguageList;
```

Added in v2.0.0

## nativeScriptsUnsafe

Unsafely calls instance.nativeScripts without Effect wrapper

**Signature**

```ts
export declare const nativeScriptsUnsafe: (
  instance: CML.TransactionWitnessSet,
) => CML.NativeScriptList | undefined;
```

Added in v2.0.0

## plutusDatumsUnsafe

Unsafely calls instance.plutusDatums without Effect wrapper

**Signature**

```ts
export declare const plutusDatumsUnsafe: (
  instance: CML.TransactionWitnessSet,
) => CML.PlutusDataList | undefined;
```

Added in v2.0.0

## plutusV1ScriptsUnsafe

Unsafely calls instance.plutusV1Scripts without Effect wrapper

**Signature**

```ts
export declare const plutusV1ScriptsUnsafe: (
  instance: CML.TransactionWitnessSet,
) => CML.PlutusV1ScriptList | undefined;
```

Added in v2.0.0

## plutusV2ScriptsUnsafe

Unsafely calls instance.plutusV2Scripts without Effect wrapper

**Signature**

```ts
export declare const plutusV2ScriptsUnsafe: (
  instance: CML.TransactionWitnessSet,
) => CML.PlutusV2ScriptList | undefined;
```

Added in v2.0.0

## plutusV3ScriptsUnsafe

Unsafely calls instance.plutusV3Scripts without Effect wrapper

**Signature**

```ts
export declare const plutusV3ScriptsUnsafe: (
  instance: CML.TransactionWitnessSet,
) => CML.PlutusV3ScriptList | undefined;
```

Added in v2.0.0

## redeemersUnsafe

Unsafely calls instance.redeemers without Effect wrapper

**Signature**

```ts
export declare const redeemersUnsafe: (
  instance: CML.TransactionWitnessSet,
) => CML.Redeemers | undefined;
```

Added in v2.0.0

## setBootstrapWitnessesUnsafe

Unsafely calls instance.setBootstrapWitnesses without Effect wrapper

**Signature**

```ts
export declare const setBootstrapWitnessesUnsafe: (
  instance: CML.TransactionWitnessSet,
  bootstrapWitnesses: CML.BootstrapWitnessList,
) => void;
```

Added in v2.0.0

## setNativeScriptsUnsafe

Unsafely calls instance.setNativeScripts without Effect wrapper

**Signature**

```ts
export declare const setNativeScriptsUnsafe: (
  instance: CML.TransactionWitnessSet,
  nativeScripts: CML.NativeScriptList,
) => void;
```

Added in v2.0.0

## setPlutusDatumsUnsafe

Unsafely calls instance.setPlutusDatums without Effect wrapper

**Signature**

```ts
export declare const setPlutusDatumsUnsafe: (
  instance: CML.TransactionWitnessSet,
  plutusDatums: CML.PlutusDataList,
) => void;
```

Added in v2.0.0

## setPlutusV1ScriptsUnsafe

Unsafely calls instance.setPlutusV1Scripts without Effect wrapper

**Signature**

```ts
export declare const setPlutusV1ScriptsUnsafe: (
  instance: CML.TransactionWitnessSet,
  plutusV1Scripts: CML.PlutusV1ScriptList,
) => void;
```

Added in v2.0.0

## setPlutusV2ScriptsUnsafe

Unsafely calls instance.setPlutusV2Scripts without Effect wrapper

**Signature**

```ts
export declare const setPlutusV2ScriptsUnsafe: (
  instance: CML.TransactionWitnessSet,
  plutusV2Scripts: CML.PlutusV2ScriptList,
) => void;
```

Added in v2.0.0

## setPlutusV3ScriptsUnsafe

Unsafely calls instance.setPlutusV3Scripts without Effect wrapper

**Signature**

```ts
export declare const setPlutusV3ScriptsUnsafe: (
  instance: CML.TransactionWitnessSet,
  plutusV3Scripts: CML.PlutusV3ScriptList,
) => void;
```

Added in v2.0.0

## setRedeemersUnsafe

Unsafely calls instance.setRedeemers without Effect wrapper

**Signature**

```ts
export declare const setRedeemersUnsafe: (
  instance: CML.TransactionWitnessSet,
  redeemers: CML.Redeemers,
) => void;
```

Added in v2.0.0

## setVkeywitnessesUnsafe

Unsafely calls instance.setVkeywitnesses without Effect wrapper

**Signature**

```ts
export declare const setVkeywitnessesUnsafe: (
  instance: CML.TransactionWitnessSet,
  vkeywitnesses: CML.VkeywitnessList,
) => void;
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (
  instance: CML.TransactionWitnessSet,
) => Uint8Array;
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (
  instance: CML.TransactionWitnessSet,
) => string;
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (
  instance: CML.TransactionWitnessSet,
) => Uint8Array;
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (
  instance: CML.TransactionWitnessSet,
) => string;
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (
  instance: CML.TransactionWitnessSet,
) => any;
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (
  instance: CML.TransactionWitnessSet,
) => string;
```

Added in v2.0.0

## vkeywitnessesUnsafe

Unsafely calls instance.vkeywitnesses without Effect wrapper

**Signature**

```ts
export declare const vkeywitnessesUnsafe: (
  instance: CML.TransactionWitnessSet,
) => CML.VkeywitnessList | undefined;
```

Added in v2.0.0

# Types

## TransactionWitnessSet (type alias)

Type alias for the CML TransactionWitnessSet class

**Signature**

```ts
export type TransactionWitnessSet = CML.TransactionWitnessSet;
```

Added in v2.0.0
