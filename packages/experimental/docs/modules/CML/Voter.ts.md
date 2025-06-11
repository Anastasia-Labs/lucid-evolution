---
title: CML/Voter.ts
nav_order: 284
parent: Modules
---

## Voter overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [fromCborBytes](#fromcborbytes)
  - [fromCborHex](#fromcborhex)
  - [fromJson](#fromjson)
  - [newConstitutionalCommitteeHotKeyHash](#newconstitutionalcommitteehotkeyhash)
  - [newConstitutionalCommitteeHotScriptHash](#newconstitutionalcommitteehotscripthash)
  - [newDRepKeyHash](#newdrepkeyhash)
  - [newDRepScriptHash](#newdrepscripthash)
  - [newStakingPoolKeyHash](#newstakingpoolkeyhash)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [fromCborBytesUnsafe](#fromcborbytesunsafe)
  - [fromCborHexUnsafe](#fromcborhexunsafe)
  - [fromJsonUnsafe](#fromjsonunsafe)
  - [newConstitutionalCommitteeHotKeyHashUnsafe](#newconstitutionalcommitteehotkeyhashunsafe)
  - [newConstitutionalCommitteeHotScriptHashUnsafe](#newconstitutionalcommitteehotscripthashunsafe)
  - [newDRepKeyHashUnsafe](#newdrepkeyhashunsafe)
  - [newDRepScriptHashUnsafe](#newdrepscripthashunsafe)
  - [newStakingPoolKeyHashUnsafe](#newstakingpoolkeyhashunsafe)
- [Errors](#errors)
  - [VoterError (class)](#votererror-class)
- [Methods](#methods)
  - [asConstitutionalCommitteeHotKeyHash](#asconstitutionalcommitteehotkeyhash)
  - [asConstitutionalCommitteeHotScriptHash](#asconstitutionalcommitteehotscripthash)
  - [asDRepKeyHash](#asdrepkeyhash)
  - [asDRepScriptHash](#asdrepscripthash)
  - [asStakingPoolKeyHash](#asstakingpoolkeyhash)
  - [free](#free)
  - [keyHash](#keyhash)
  - [kind](#kind)
  - [scriptHash](#scripthash)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
- [MethodsUnsafe](#methodsunsafe)
  - [asConstitutionalCommitteeHotKeyHashUnsafe](#asconstitutionalcommitteehotkeyhashunsafe)
  - [asConstitutionalCommitteeHotScriptHashUnsafe](#asconstitutionalcommitteehotscripthashunsafe)
  - [asDRepKeyHashUnsafe](#asdrepkeyhashunsafe)
  - [asDRepScriptHashUnsafe](#asdrepscripthashunsafe)
  - [asStakingPoolKeyHashUnsafe](#asstakingpoolkeyhashunsafe)
  - [freeUnsafe](#freeunsafe)
  - [keyHashUnsafe](#keyhashunsafe)
  - [kindUnsafe](#kindunsafe)
  - [scriptHashUnsafe](#scripthashunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
- [Types](#types)
  - [Voter (type alias)](#voter-type-alias)

---

# Constructors

## fromCborBytes

Static method fromCborBytes of Voter

**Signature**

```ts
export declare const fromCborBytes: (cborBytes: Uint8Array) => Effect.Effect<CML.Voter, VoterError>
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of Voter

**Signature**

```ts
export declare const fromCborHex: (cborBytes: string) => Effect.Effect<CML.Voter, VoterError>
```

Added in v2.0.0

## fromJson

Static method fromJson of Voter

**Signature**

```ts
export declare const fromJson: (json: string) => Effect.Effect<CML.Voter, VoterError>
```

Added in v2.0.0

## newConstitutionalCommitteeHotKeyHash

Static method newConstitutionalCommitteeHotKeyHash of Voter

**Signature**

```ts
export declare const newConstitutionalCommitteeHotKeyHash: (
  ed25519KeyHash: CML.Ed25519KeyHash
) => Effect.Effect<CML.Voter, VoterError>
```

Added in v2.0.0

## newConstitutionalCommitteeHotScriptHash

Static method newConstitutionalCommitteeHotScriptHash of Voter

**Signature**

```ts
export declare const newConstitutionalCommitteeHotScriptHash: (
  scriptHash: CML.ScriptHash
) => Effect.Effect<CML.Voter, VoterError>
```

Added in v2.0.0

## newDRepKeyHash

Static method newDRepKeyHash of Voter

**Signature**

```ts
export declare const newDRepKeyHash: (ed25519KeyHash: CML.Ed25519KeyHash) => Effect.Effect<CML.Voter, VoterError>
```

Added in v2.0.0

## newDRepScriptHash

Static method newDRepScriptHash of Voter

**Signature**

```ts
export declare const newDRepScriptHash: (scriptHash: CML.ScriptHash) => Effect.Effect<CML.Voter, VoterError>
```

Added in v2.0.0

## newStakingPoolKeyHash

Static method newStakingPoolKeyHash of Voter

**Signature**

```ts
export declare const newStakingPoolKeyHash: (ed25519KeyHash: CML.Ed25519KeyHash) => Effect.Effect<CML.Voter, VoterError>
```

Added in v2.0.0

# ConstructorsUnsafe

## fromCborBytesUnsafe

Unsafely calls Voter.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (cborBytes: Uint8Array) => CML.Voter
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls Voter.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.Voter
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls Voter.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.Voter
```

Added in v2.0.0

## newConstitutionalCommitteeHotKeyHashUnsafe

Unsafely calls Voter.newConstitutionalCommitteeHotKeyHash without Effect wrapper

**Signature**

```ts
export declare const newConstitutionalCommitteeHotKeyHashUnsafe: (ed25519KeyHash: CML.Ed25519KeyHash) => CML.Voter
```

Added in v2.0.0

## newConstitutionalCommitteeHotScriptHashUnsafe

Unsafely calls Voter.newConstitutionalCommitteeHotScriptHash without Effect wrapper

**Signature**

```ts
export declare const newConstitutionalCommitteeHotScriptHashUnsafe: (scriptHash: CML.ScriptHash) => CML.Voter
```

Added in v2.0.0

## newDRepKeyHashUnsafe

Unsafely calls Voter.newDRepKeyHash without Effect wrapper

**Signature**

```ts
export declare const newDRepKeyHashUnsafe: (ed25519KeyHash: CML.Ed25519KeyHash) => CML.Voter
```

Added in v2.0.0

## newDRepScriptHashUnsafe

Unsafely calls Voter.newDRepScriptHash without Effect wrapper

**Signature**

```ts
export declare const newDRepScriptHashUnsafe: (scriptHash: CML.ScriptHash) => CML.Voter
```

Added in v2.0.0

## newStakingPoolKeyHashUnsafe

Unsafely calls Voter.newStakingPoolKeyHash without Effect wrapper

**Signature**

```ts
export declare const newStakingPoolKeyHashUnsafe: (ed25519KeyHash: CML.Ed25519KeyHash) => CML.Voter
```

Added in v2.0.0

# Errors

## VoterError (class)

Error class for Voter operations

This error is thrown when operations on Voter instances fail.

**Signature**

```ts
export declare class VoterError
```

Added in v2.0.0

# Methods

## asConstitutionalCommitteeHotKeyHash

Method asConstitutionalCommitteeHotKeyHash of Voter

**Signature**

```ts
export declare const asConstitutionalCommitteeHotKeyHash: (
  instance: CML.Voter
) => Effect.Effect<CML.Ed25519KeyHash | undefined, VoterError>
```

Added in v2.0.0

## asConstitutionalCommitteeHotScriptHash

Method asConstitutionalCommitteeHotScriptHash of Voter

**Signature**

```ts
export declare const asConstitutionalCommitteeHotScriptHash: (
  instance: CML.Voter
) => Effect.Effect<CML.ScriptHash | undefined, VoterError>
```

Added in v2.0.0

## asDRepKeyHash

Method asDRepKeyHash of Voter

**Signature**

```ts
export declare const asDRepKeyHash: (instance: CML.Voter) => Effect.Effect<CML.Ed25519KeyHash | undefined, VoterError>
```

Added in v2.0.0

## asDRepScriptHash

Method asDRepScriptHash of Voter

**Signature**

```ts
export declare const asDRepScriptHash: (instance: CML.Voter) => Effect.Effect<CML.ScriptHash | undefined, VoterError>
```

Added in v2.0.0

## asStakingPoolKeyHash

Method asStakingPoolKeyHash of Voter

**Signature**

```ts
export declare const asStakingPoolKeyHash: (
  instance: CML.Voter
) => Effect.Effect<CML.Ed25519KeyHash | undefined, VoterError>
```

Added in v2.0.0

## free

Method free of Voter

**Signature**

```ts
export declare const free: (instance: CML.Voter) => Effect.Effect<void, VoterError>
```

Added in v2.0.0

## keyHash

Method keyHash of Voter

**Signature**

```ts
export declare const keyHash: (instance: CML.Voter) => Effect.Effect<CML.Ed25519KeyHash | undefined, VoterError>
```

Added in v2.0.0

## kind

Method kind of Voter

**Signature**

```ts
export declare const kind: (instance: CML.Voter) => Effect.Effect<CML.VoterKind, VoterError>
```

Added in v2.0.0

## scriptHash

Method scriptHash of Voter

**Signature**

```ts
export declare const scriptHash: (instance: CML.Voter) => Effect.Effect<CML.ScriptHash | undefined, VoterError>
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of Voter

**Signature**

```ts
export declare const toCanonicalCborBytes: (instance: CML.Voter) => Effect.Effect<Uint8Array, VoterError>
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of Voter

**Signature**

```ts
export declare const toCanonicalCborHex: (instance: CML.Voter) => Effect.Effect<string, VoterError>
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of Voter

**Signature**

```ts
export declare const toCborBytes: (instance: CML.Voter) => Effect.Effect<Uint8Array, VoterError>
```

Added in v2.0.0

## toCborHex

Method toCborHex of Voter

**Signature**

```ts
export declare const toCborHex: (instance: CML.Voter) => Effect.Effect<string, VoterError>
```

Added in v2.0.0

## toJsValue

Method toJsValue of Voter

**Signature**

```ts
export declare const toJsValue: (instance: CML.Voter) => Effect.Effect<any, VoterError>
```

Added in v2.0.0

## toJson

Method toJson of Voter

**Signature**

```ts
export declare const toJson: (instance: CML.Voter) => Effect.Effect<string, VoterError>
```

Added in v2.0.0

# MethodsUnsafe

## asConstitutionalCommitteeHotKeyHashUnsafe

Unsafely calls instance.asConstitutionalCommitteeHotKeyHash without Effect wrapper

**Signature**

```ts
export declare const asConstitutionalCommitteeHotKeyHashUnsafe: (instance: CML.Voter) => CML.Ed25519KeyHash | undefined
```

Added in v2.0.0

## asConstitutionalCommitteeHotScriptHashUnsafe

Unsafely calls instance.asConstitutionalCommitteeHotScriptHash without Effect wrapper

**Signature**

```ts
export declare const asConstitutionalCommitteeHotScriptHashUnsafe: (instance: CML.Voter) => CML.ScriptHash | undefined
```

Added in v2.0.0

## asDRepKeyHashUnsafe

Unsafely calls instance.asDRepKeyHash without Effect wrapper

**Signature**

```ts
export declare const asDRepKeyHashUnsafe: (instance: CML.Voter) => CML.Ed25519KeyHash | undefined
```

Added in v2.0.0

## asDRepScriptHashUnsafe

Unsafely calls instance.asDRepScriptHash without Effect wrapper

**Signature**

```ts
export declare const asDRepScriptHashUnsafe: (instance: CML.Voter) => CML.ScriptHash | undefined
```

Added in v2.0.0

## asStakingPoolKeyHashUnsafe

Unsafely calls instance.asStakingPoolKeyHash without Effect wrapper

**Signature**

```ts
export declare const asStakingPoolKeyHashUnsafe: (instance: CML.Voter) => CML.Ed25519KeyHash | undefined
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.Voter) => void
```

Added in v2.0.0

## keyHashUnsafe

Unsafely calls instance.keyHash without Effect wrapper

**Signature**

```ts
export declare const keyHashUnsafe: (instance: CML.Voter) => CML.Ed25519KeyHash | undefined
```

Added in v2.0.0

## kindUnsafe

Unsafely calls instance.kind without Effect wrapper

**Signature**

```ts
export declare const kindUnsafe: (instance: CML.Voter) => CML.VoterKind
```

Added in v2.0.0

## scriptHashUnsafe

Unsafely calls instance.scriptHash without Effect wrapper

**Signature**

```ts
export declare const scriptHashUnsafe: (instance: CML.Voter) => CML.ScriptHash | undefined
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (instance: CML.Voter) => Uint8Array
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (instance: CML.Voter) => string
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (instance: CML.Voter) => Uint8Array
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.Voter) => string
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.Voter) => any
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.Voter) => string
```

Added in v2.0.0

# Types

## Voter (type alias)

Type alias for the CML Voter class

**Signature**

```ts
export type Voter = CML.Voter
```

Added in v2.0.0
