---
title: CML/PlutusScriptWitness.ts
nav_order: 152
parent: Modules
---

## PlutusScriptWitness overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [newRef](#newref)
  - [newScript](#newscript)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [newRefUnsafe](#newrefunsafe)
  - [newScriptUnsafe](#newscriptunsafe)
- [Errors](#errors)
  - [PlutusScriptWitnessError (class)](#plutusscriptwitnesserror-class)
- [Methods](#methods)
  - [free](#free)
  - [hash](#hash)
- [MethodsUnsafe](#methodsunsafe)
  - [freeUnsafe](#freeunsafe)
  - [hashUnsafe](#hashunsafe)
- [Types](#types)
  - [PlutusScriptWitness (type alias)](#plutusscriptwitness-type-alias)

---

# Constructors

## newRef

Static method newRef of PlutusScriptWitness

**Signature**

```ts
export declare const newRef: (
  hash: CML.ScriptHash,
) => Effect.Effect<CML.PlutusScriptWitness, PlutusScriptWitnessError>;
```

Added in v2.0.0

## newScript

Static method newScript of PlutusScriptWitness

**Signature**

```ts
export declare const newScript: (
  script: CML.PlutusScript,
) => Effect.Effect<CML.PlutusScriptWitness, PlutusScriptWitnessError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## newRefUnsafe

Unsafely calls PlutusScriptWitness.newRef without Effect wrapper

**Signature**

```ts
export declare const newRefUnsafe: (
  hash: CML.ScriptHash,
) => CML.PlutusScriptWitness;
```

Added in v2.0.0

## newScriptUnsafe

Unsafely calls PlutusScriptWitness.newScript without Effect wrapper

**Signature**

```ts
export declare const newScriptUnsafe: (
  script: CML.PlutusScript,
) => CML.PlutusScriptWitness;
```

Added in v2.0.0

# Errors

## PlutusScriptWitnessError (class)

Error class for PlutusScriptWitness operations

This error is thrown when operations on PlutusScriptWitness instances fail.

**Signature**

```ts
export declare class PlutusScriptWitnessError
```

Added in v2.0.0

# Methods

## free

Method free of PlutusScriptWitness

**Signature**

```ts
export declare const free: (
  instance: CML.PlutusScriptWitness,
) => Effect.Effect<void, PlutusScriptWitnessError>;
```

Added in v2.0.0

## hash

Method hash of PlutusScriptWitness

**Signature**

```ts
export declare const hash: (
  instance: CML.PlutusScriptWitness,
) => Effect.Effect<CML.ScriptHash, PlutusScriptWitnessError>;
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.PlutusScriptWitness) => void;
```

Added in v2.0.0

## hashUnsafe

Unsafely calls instance.hash without Effect wrapper

**Signature**

```ts
export declare const hashUnsafe: (
  instance: CML.PlutusScriptWitness,
) => CML.ScriptHash;
```

Added in v2.0.0

# Types

## PlutusScriptWitness (type alias)

Type alias for the CML PlutusScriptWitness class

**Signature**

```ts
export type PlutusScriptWitness = CML.PlutusScriptWitness;
```

Added in v2.0.0
