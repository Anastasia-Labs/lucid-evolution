---
title: CML/NativeScript.ts
nav_order: 136
parent: Modules
---

## NativeScript overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [fromCborBytes](#fromcborbytes)
  - [fromCborHex](#fromcborhex)
  - [fromJson](#fromjson)
  - [newScriptAll](#newscriptall)
  - [newScriptAny](#newscriptany)
  - [newScriptInvalidBefore](#newscriptinvalidbefore)
  - [newScriptInvalidHereafter](#newscriptinvalidhereafter)
  - [newScriptNOfK](#newscriptnofk)
  - [newScriptPubkey](#newscriptpubkey)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [fromCborBytesUnsafe](#fromcborbytesunsafe)
  - [fromCborHexUnsafe](#fromcborhexunsafe)
  - [fromJsonUnsafe](#fromjsonunsafe)
  - [newScriptAllUnsafe](#newscriptallunsafe)
  - [newScriptAnyUnsafe](#newscriptanyunsafe)
  - [newScriptInvalidBeforeUnsafe](#newscriptinvalidbeforeunsafe)
  - [newScriptInvalidHereafterUnsafe](#newscriptinvalidhereafterunsafe)
  - [newScriptNOfKUnsafe](#newscriptnofkunsafe)
  - [newScriptPubkeyUnsafe](#newscriptpubkeyunsafe)
- [Errors](#errors)
  - [NativeScriptError (class)](#nativescripterror-class)
- [Methods](#methods)
  - [asScriptAll](#asscriptall)
  - [asScriptAny](#asscriptany)
  - [asScriptInvalidBefore](#asscriptinvalidbefore)
  - [asScriptInvalidHereafter](#asscriptinvalidhereafter)
  - [asScriptNOfK](#asscriptnofk)
  - [asScriptPubkey](#asscriptpubkey)
  - [free](#free)
  - [getRequiredSigners](#getrequiredsigners)
  - [hash](#hash)
  - [kind](#kind)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
  - [verify](#verify)
- [MethodsUnsafe](#methodsunsafe)
  - [asScriptAllUnsafe](#asscriptallunsafe)
  - [asScriptAnyUnsafe](#asscriptanyunsafe)
  - [asScriptInvalidBeforeUnsafe](#asscriptinvalidbeforeunsafe)
  - [asScriptInvalidHereafterUnsafe](#asscriptinvalidhereafterunsafe)
  - [asScriptNOfKUnsafe](#asscriptnofkunsafe)
  - [asScriptPubkeyUnsafe](#asscriptpubkeyunsafe)
  - [freeUnsafe](#freeunsafe)
  - [getRequiredSignersUnsafe](#getrequiredsignersunsafe)
  - [hashUnsafe](#hashunsafe)
  - [kindUnsafe](#kindunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
  - [verifyUnsafe](#verifyunsafe)
- [Types](#types)
  - [NativeScript (type alias)](#nativescript-type-alias)

---

# Constructors

## fromCborBytes

Static method fromCborBytes of NativeScript

**Signature**

```ts
export declare const fromCborBytes: (cborBytes: Uint8Array) => Effect.Effect<CML.NativeScript, NativeScriptError>
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of NativeScript

**Signature**

```ts
export declare const fromCborHex: (cborBytes: string) => Effect.Effect<CML.NativeScript, NativeScriptError>
```

Added in v2.0.0

## fromJson

Static method fromJson of NativeScript

**Signature**

```ts
export declare const fromJson: (json: string) => Effect.Effect<CML.NativeScript, NativeScriptError>
```

Added in v2.0.0

## newScriptAll

Static method newScriptAll of NativeScript

**Signature**

```ts
export declare const newScriptAll: (
  nativeScripts: CML.NativeScriptList
) => Effect.Effect<CML.NativeScript, NativeScriptError>
```

Added in v2.0.0

## newScriptAny

Static method newScriptAny of NativeScript

**Signature**

```ts
export declare const newScriptAny: (
  nativeScripts: CML.NativeScriptList
) => Effect.Effect<CML.NativeScript, NativeScriptError>
```

Added in v2.0.0

## newScriptInvalidBefore

Static method newScriptInvalidBefore of NativeScript

**Signature**

```ts
export declare const newScriptInvalidBefore: (before: bigint) => Effect.Effect<CML.NativeScript, NativeScriptError>
```

Added in v2.0.0

## newScriptInvalidHereafter

Static method newScriptInvalidHereafter of NativeScript

**Signature**

```ts
export declare const newScriptInvalidHereafter: (after: bigint) => Effect.Effect<CML.NativeScript, NativeScriptError>
```

Added in v2.0.0

## newScriptNOfK

Static method newScriptNOfK of NativeScript

**Signature**

```ts
export declare const newScriptNOfK: (
  n: bigint,
  nativeScripts: CML.NativeScriptList
) => Effect.Effect<CML.NativeScript, NativeScriptError>
```

Added in v2.0.0

## newScriptPubkey

Static method newScriptPubkey of NativeScript

**Signature**

```ts
export declare const newScriptPubkey: (
  ed25519KeyHash: CML.Ed25519KeyHash
) => Effect.Effect<CML.NativeScript, NativeScriptError>
```

Added in v2.0.0

# ConstructorsUnsafe

## fromCborBytesUnsafe

Unsafely calls NativeScript.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (cborBytes: Uint8Array) => CML.NativeScript
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls NativeScript.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.NativeScript
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls NativeScript.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.NativeScript
```

Added in v2.0.0

## newScriptAllUnsafe

Unsafely calls NativeScript.newScriptAll without Effect wrapper

**Signature**

```ts
export declare const newScriptAllUnsafe: (nativeScripts: CML.NativeScriptList) => CML.NativeScript
```

Added in v2.0.0

## newScriptAnyUnsafe

Unsafely calls NativeScript.newScriptAny without Effect wrapper

**Signature**

```ts
export declare const newScriptAnyUnsafe: (nativeScripts: CML.NativeScriptList) => CML.NativeScript
```

Added in v2.0.0

## newScriptInvalidBeforeUnsafe

Unsafely calls NativeScript.newScriptInvalidBefore without Effect wrapper

**Signature**

```ts
export declare const newScriptInvalidBeforeUnsafe: (before: bigint) => CML.NativeScript
```

Added in v2.0.0

## newScriptInvalidHereafterUnsafe

Unsafely calls NativeScript.newScriptInvalidHereafter without Effect wrapper

**Signature**

```ts
export declare const newScriptInvalidHereafterUnsafe: (after: bigint) => CML.NativeScript
```

Added in v2.0.0

## newScriptNOfKUnsafe

Unsafely calls NativeScript.newScriptNOfK without Effect wrapper

**Signature**

```ts
export declare const newScriptNOfKUnsafe: (n: bigint, nativeScripts: CML.NativeScriptList) => CML.NativeScript
```

Added in v2.0.0

## newScriptPubkeyUnsafe

Unsafely calls NativeScript.newScriptPubkey without Effect wrapper

**Signature**

```ts
export declare const newScriptPubkeyUnsafe: (ed25519KeyHash: CML.Ed25519KeyHash) => CML.NativeScript
```

Added in v2.0.0

# Errors

## NativeScriptError (class)

Error class for NativeScript operations

This error is thrown when operations on NativeScript instances fail.

**Signature**

```ts
export declare class NativeScriptError
```

Added in v2.0.0

# Methods

## asScriptAll

Method asScriptAll of NativeScript

**Signature**

```ts
export declare const asScriptAll: (
  instance: CML.NativeScript
) => Effect.Effect<CML.ScriptAll | undefined, NativeScriptError>
```

Added in v2.0.0

## asScriptAny

Method asScriptAny of NativeScript

**Signature**

```ts
export declare const asScriptAny: (
  instance: CML.NativeScript
) => Effect.Effect<CML.ScriptAny | undefined, NativeScriptError>
```

Added in v2.0.0

## asScriptInvalidBefore

Method asScriptInvalidBefore of NativeScript

**Signature**

```ts
export declare const asScriptInvalidBefore: (
  instance: CML.NativeScript
) => Effect.Effect<CML.ScriptInvalidBefore | undefined, NativeScriptError>
```

Added in v2.0.0

## asScriptInvalidHereafter

Method asScriptInvalidHereafter of NativeScript

**Signature**

```ts
export declare const asScriptInvalidHereafter: (
  instance: CML.NativeScript
) => Effect.Effect<CML.ScriptInvalidHereafter | undefined, NativeScriptError>
```

Added in v2.0.0

## asScriptNOfK

Method asScriptNOfK of NativeScript

**Signature**

```ts
export declare const asScriptNOfK: (
  instance: CML.NativeScript
) => Effect.Effect<CML.ScriptNOfK | undefined, NativeScriptError>
```

Added in v2.0.0

## asScriptPubkey

Method asScriptPubkey of NativeScript

**Signature**

```ts
export declare const asScriptPubkey: (
  instance: CML.NativeScript
) => Effect.Effect<CML.ScriptPubkey | undefined, NativeScriptError>
```

Added in v2.0.0

## free

Method free of NativeScript

**Signature**

```ts
export declare const free: (instance: CML.NativeScript) => Effect.Effect<void, NativeScriptError>
```

Added in v2.0.0

## getRequiredSigners

Method getRequiredSigners of NativeScript

**Signature**

```ts
export declare const getRequiredSigners: (
  instance: CML.NativeScript
) => Effect.Effect<CML.Ed25519KeyHashList, NativeScriptError>
```

Added in v2.0.0

## hash

Method hash of NativeScript

**Signature**

```ts
export declare const hash: (instance: CML.NativeScript) => Effect.Effect<CML.ScriptHash, NativeScriptError>
```

Added in v2.0.0

## kind

Method kind of NativeScript

**Signature**

```ts
export declare const kind: (instance: CML.NativeScript) => Effect.Effect<CML.NativeScriptKind, NativeScriptError>
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of NativeScript

**Signature**

```ts
export declare const toCanonicalCborBytes: (instance: CML.NativeScript) => Effect.Effect<Uint8Array, NativeScriptError>
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of NativeScript

**Signature**

```ts
export declare const toCanonicalCborHex: (instance: CML.NativeScript) => Effect.Effect<string, NativeScriptError>
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of NativeScript

**Signature**

```ts
export declare const toCborBytes: (instance: CML.NativeScript) => Effect.Effect<Uint8Array, NativeScriptError>
```

Added in v2.0.0

## toCborHex

Method toCborHex of NativeScript

**Signature**

```ts
export declare const toCborHex: (instance: CML.NativeScript) => Effect.Effect<string, NativeScriptError>
```

Added in v2.0.0

## toJsValue

Method toJsValue of NativeScript

**Signature**

```ts
export declare const toJsValue: (instance: CML.NativeScript) => Effect.Effect<any, NativeScriptError>
```

Added in v2.0.0

## toJson

Method toJson of NativeScript

**Signature**

```ts
export declare const toJson: (instance: CML.NativeScript) => Effect.Effect<string, NativeScriptError>
```

Added in v2.0.0

## verify

Method verify of NativeScript

**Signature**

```ts
export declare const verify: (
  instance: CML.NativeScript,
  lowerBound: bigint | undefined,
  upperBound: bigint | undefined,
  keyHashes: CML.Ed25519KeyHashList
) => Effect.Effect<boolean, NativeScriptError>
```

Added in v2.0.0

# MethodsUnsafe

## asScriptAllUnsafe

Unsafely calls instance.asScriptAll without Effect wrapper

**Signature**

```ts
export declare const asScriptAllUnsafe: (instance: CML.NativeScript) => CML.ScriptAll | undefined
```

Added in v2.0.0

## asScriptAnyUnsafe

Unsafely calls instance.asScriptAny without Effect wrapper

**Signature**

```ts
export declare const asScriptAnyUnsafe: (instance: CML.NativeScript) => CML.ScriptAny | undefined
```

Added in v2.0.0

## asScriptInvalidBeforeUnsafe

Unsafely calls instance.asScriptInvalidBefore without Effect wrapper

**Signature**

```ts
export declare const asScriptInvalidBeforeUnsafe: (instance: CML.NativeScript) => CML.ScriptInvalidBefore | undefined
```

Added in v2.0.0

## asScriptInvalidHereafterUnsafe

Unsafely calls instance.asScriptInvalidHereafter without Effect wrapper

**Signature**

```ts
export declare const asScriptInvalidHereafterUnsafe: (
  instance: CML.NativeScript
) => CML.ScriptInvalidHereafter | undefined
```

Added in v2.0.0

## asScriptNOfKUnsafe

Unsafely calls instance.asScriptNOfK without Effect wrapper

**Signature**

```ts
export declare const asScriptNOfKUnsafe: (instance: CML.NativeScript) => CML.ScriptNOfK | undefined
```

Added in v2.0.0

## asScriptPubkeyUnsafe

Unsafely calls instance.asScriptPubkey without Effect wrapper

**Signature**

```ts
export declare const asScriptPubkeyUnsafe: (instance: CML.NativeScript) => CML.ScriptPubkey | undefined
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.NativeScript) => void
```

Added in v2.0.0

## getRequiredSignersUnsafe

Unsafely calls instance.getRequiredSigners without Effect wrapper

**Signature**

```ts
export declare const getRequiredSignersUnsafe: (instance: CML.NativeScript) => CML.Ed25519KeyHashList
```

Added in v2.0.0

## hashUnsafe

Unsafely calls instance.hash without Effect wrapper

**Signature**

```ts
export declare const hashUnsafe: (instance: CML.NativeScript) => CML.ScriptHash
```

Added in v2.0.0

## kindUnsafe

Unsafely calls instance.kind without Effect wrapper

**Signature**

```ts
export declare const kindUnsafe: (instance: CML.NativeScript) => CML.NativeScriptKind
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (instance: CML.NativeScript) => Uint8Array
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (instance: CML.NativeScript) => string
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (instance: CML.NativeScript) => Uint8Array
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.NativeScript) => string
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.NativeScript) => any
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.NativeScript) => string
```

Added in v2.0.0

## verifyUnsafe

Unsafely calls instance.verify without Effect wrapper

**Signature**

```ts
export declare const verifyUnsafe: (
  instance: CML.NativeScript,
  lowerBound: bigint | undefined,
  upperBound: bigint | undefined,
  keyHashes: CML.Ed25519KeyHashList
) => boolean
```

Added in v2.0.0

# Types

## NativeScript (type alias)

Type alias for the CML NativeScript class

**Signature**

```ts
export type NativeScript = CML.NativeScript
```

Added in v2.0.0
