---
title: CML/PlutusScript.ts
nav_order: 156
parent: Modules
---

## PlutusScript overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [fromV1](#fromv1)
  - [fromV2](#fromv2)
  - [fromV3](#fromv3)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [fromV1Unsafe](#fromv1unsafe)
  - [fromV2Unsafe](#fromv2unsafe)
  - [fromV3Unsafe](#fromv3unsafe)
- [Errors](#errors)
  - [PlutusScriptError (class)](#plutusscripterror-class)
- [Methods](#methods)
  - [asV1](#asv1)
  - [asV2](#asv2)
  - [asV3](#asv3)
  - [free](#free)
  - [hash](#hash)
  - [version](#version)
- [MethodsUnsafe](#methodsunsafe)
  - [asV1Unsafe](#asv1unsafe)
  - [asV2Unsafe](#asv2unsafe)
  - [asV3Unsafe](#asv3unsafe)
  - [freeUnsafe](#freeunsafe)
  - [hashUnsafe](#hashunsafe)
  - [versionUnsafe](#versionunsafe)
- [Types](#types)
  - [PlutusScript (type alias)](#plutusscript-type-alias)

---

# Constructors

## fromV1

Static method fromV1 of PlutusScript

**Signature**

```ts
export declare const fromV1: (script: CML.PlutusV1Script) => Effect.Effect<CML.PlutusScript, PlutusScriptError>
```

Added in v2.0.0

## fromV2

Static method fromV2 of PlutusScript

**Signature**

```ts
export declare const fromV2: (script: CML.PlutusV2Script) => Effect.Effect<CML.PlutusScript, PlutusScriptError>
```

Added in v2.0.0

## fromV3

Static method fromV3 of PlutusScript

**Signature**

```ts
export declare const fromV3: (script: CML.PlutusV3Script) => Effect.Effect<CML.PlutusScript, PlutusScriptError>
```

Added in v2.0.0

# ConstructorsUnsafe

## fromV1Unsafe

Unsafely calls PlutusScript.fromV1 without Effect wrapper

**Signature**

```ts
export declare const fromV1Unsafe: (script: CML.PlutusV1Script) => CML.PlutusScript
```

Added in v2.0.0

## fromV2Unsafe

Unsafely calls PlutusScript.fromV2 without Effect wrapper

**Signature**

```ts
export declare const fromV2Unsafe: (script: CML.PlutusV2Script) => CML.PlutusScript
```

Added in v2.0.0

## fromV3Unsafe

Unsafely calls PlutusScript.fromV3 without Effect wrapper

**Signature**

```ts
export declare const fromV3Unsafe: (script: CML.PlutusV3Script) => CML.PlutusScript
```

Added in v2.0.0

# Errors

## PlutusScriptError (class)

Error class for PlutusScript operations

This error is thrown when operations on PlutusScript instances fail.

**Signature**

```ts
export declare class PlutusScriptError
```

Added in v2.0.0

# Methods

## asV1

Method asV1 of PlutusScript

**Signature**

```ts
export declare const asV1: (
  instance: CML.PlutusScript
) => Effect.Effect<CML.PlutusV1Script | undefined, PlutusScriptError>
```

Added in v2.0.0

## asV2

Method asV2 of PlutusScript

**Signature**

```ts
export declare const asV2: (
  instance: CML.PlutusScript
) => Effect.Effect<CML.PlutusV2Script | undefined, PlutusScriptError>
```

Added in v2.0.0

## asV3

Method asV3 of PlutusScript

**Signature**

```ts
export declare const asV3: (
  instance: CML.PlutusScript
) => Effect.Effect<CML.PlutusV3Script | undefined, PlutusScriptError>
```

Added in v2.0.0

## free

Method free of PlutusScript

**Signature**

```ts
export declare const free: (instance: CML.PlutusScript) => Effect.Effect<void, PlutusScriptError>
```

Added in v2.0.0

## hash

Method hash of PlutusScript

**Signature**

```ts
export declare const hash: (instance: CML.PlutusScript) => Effect.Effect<CML.ScriptHash, PlutusScriptError>
```

Added in v2.0.0

## version

Method version of PlutusScript

**Signature**

```ts
export declare const version: (instance: CML.PlutusScript) => Effect.Effect<CML.Language, PlutusScriptError>
```

Added in v2.0.0

# MethodsUnsafe

## asV1Unsafe

Unsafely calls instance.asV1 without Effect wrapper

**Signature**

```ts
export declare const asV1Unsafe: (instance: CML.PlutusScript) => CML.PlutusV1Script | undefined
```

Added in v2.0.0

## asV2Unsafe

Unsafely calls instance.asV2 without Effect wrapper

**Signature**

```ts
export declare const asV2Unsafe: (instance: CML.PlutusScript) => CML.PlutusV2Script | undefined
```

Added in v2.0.0

## asV3Unsafe

Unsafely calls instance.asV3 without Effect wrapper

**Signature**

```ts
export declare const asV3Unsafe: (instance: CML.PlutusScript) => CML.PlutusV3Script | undefined
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.PlutusScript) => void
```

Added in v2.0.0

## hashUnsafe

Unsafely calls instance.hash without Effect wrapper

**Signature**

```ts
export declare const hashUnsafe: (instance: CML.PlutusScript) => CML.ScriptHash
```

Added in v2.0.0

## versionUnsafe

Unsafely calls instance.version without Effect wrapper

**Signature**

```ts
export declare const versionUnsafe: (instance: CML.PlutusScript) => CML.Language
```

Added in v2.0.0

# Types

## PlutusScript (type alias)

Type alias for the CML PlutusScript class

**Signature**

```ts
export type PlutusScript = CML.PlutusScript
```

Added in v2.0.0
