---
title: CML/Script.ts
nav_order: 197
parent: Modules
---

## Script overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [fromCborBytes](#fromcborbytes)
  - [fromCborHex](#fromcborhex)
  - [fromJson](#fromjson)
  - [newNative](#newnative)
  - [newPlutusV1](#newplutusv1)
  - [newPlutusV2](#newplutusv2)
  - [newPlutusV3](#newplutusv3)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [fromCborBytesUnsafe](#fromcborbytesunsafe)
  - [fromCborHexUnsafe](#fromcborhexunsafe)
  - [fromJsonUnsafe](#fromjsonunsafe)
  - [newNativeUnsafe](#newnativeunsafe)
  - [newPlutusV1Unsafe](#newplutusv1unsafe)
  - [newPlutusV2Unsafe](#newplutusv2unsafe)
  - [newPlutusV3Unsafe](#newplutusv3unsafe)
- [Errors](#errors)
  - [ScriptError (class)](#scripterror-class)
- [Methods](#methods)
  - [asNative](#asnative)
  - [asPlutusV1](#asplutusv1)
  - [asPlutusV2](#asplutusv2)
  - [asPlutusV3](#asplutusv3)
  - [free](#free)
  - [hash](#hash)
  - [kind](#kind)
  - [language](#language)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
- [MethodsUnsafe](#methodsunsafe)
  - [asNativeUnsafe](#asnativeunsafe)
  - [asPlutusV1Unsafe](#asplutusv1unsafe)
  - [asPlutusV2Unsafe](#asplutusv2unsafe)
  - [asPlutusV3Unsafe](#asplutusv3unsafe)
  - [freeUnsafe](#freeunsafe)
  - [hashUnsafe](#hashunsafe)
  - [kindUnsafe](#kindunsafe)
  - [languageUnsafe](#languageunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
- [Types](#types)
  - [Script (type alias)](#script-type-alias)

---

# Constructors

## fromCborBytes

Static method fromCborBytes of Script

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.Script, ScriptError>;
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of Script

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.Script, ScriptError>;
```

Added in v2.0.0

## fromJson

Static method fromJson of Script

**Signature**

```ts
export declare const fromJson: (
  json: string,
) => Effect.Effect<CML.Script, ScriptError>;
```

Added in v2.0.0

## newNative

Static method newNative of Script

**Signature**

```ts
export declare const newNative: (
  script: CML.NativeScript,
) => Effect.Effect<CML.Script, ScriptError>;
```

Added in v2.0.0

## newPlutusV1

Static method newPlutusV1 of Script

**Signature**

```ts
export declare const newPlutusV1: (
  script: CML.PlutusV1Script,
) => Effect.Effect<CML.Script, ScriptError>;
```

Added in v2.0.0

## newPlutusV2

Static method newPlutusV2 of Script

**Signature**

```ts
export declare const newPlutusV2: (
  script: CML.PlutusV2Script,
) => Effect.Effect<CML.Script, ScriptError>;
```

Added in v2.0.0

## newPlutusV3

Static method newPlutusV3 of Script

**Signature**

```ts
export declare const newPlutusV3: (
  script: CML.PlutusV3Script,
) => Effect.Effect<CML.Script, ScriptError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## fromCborBytesUnsafe

Unsafely calls Script.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (cborBytes: Uint8Array) => CML.Script;
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls Script.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.Script;
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls Script.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.Script;
```

Added in v2.0.0

## newNativeUnsafe

Unsafely calls Script.newNative without Effect wrapper

**Signature**

```ts
export declare const newNativeUnsafe: (script: CML.NativeScript) => CML.Script;
```

Added in v2.0.0

## newPlutusV1Unsafe

Unsafely calls Script.newPlutusV1 without Effect wrapper

**Signature**

```ts
export declare const newPlutusV1Unsafe: (
  script: CML.PlutusV1Script,
) => CML.Script;
```

Added in v2.0.0

## newPlutusV2Unsafe

Unsafely calls Script.newPlutusV2 without Effect wrapper

**Signature**

```ts
export declare const newPlutusV2Unsafe: (
  script: CML.PlutusV2Script,
) => CML.Script;
```

Added in v2.0.0

## newPlutusV3Unsafe

Unsafely calls Script.newPlutusV3 without Effect wrapper

**Signature**

```ts
export declare const newPlutusV3Unsafe: (
  script: CML.PlutusV3Script,
) => CML.Script;
```

Added in v2.0.0

# Errors

## ScriptError (class)

Error class for Script operations

This error is thrown when operations on Script instances fail.

**Signature**

```ts
export declare class ScriptError
```

Added in v2.0.0

# Methods

## asNative

Method asNative of Script

**Signature**

```ts
export declare const asNative: (
  instance: CML.Script,
) => Effect.Effect<CML.NativeScript | undefined, ScriptError>;
```

Added in v2.0.0

## asPlutusV1

Method asPlutusV1 of Script

**Signature**

```ts
export declare const asPlutusV1: (
  instance: CML.Script,
) => Effect.Effect<CML.PlutusV1Script | undefined, ScriptError>;
```

Added in v2.0.0

## asPlutusV2

Method asPlutusV2 of Script

**Signature**

```ts
export declare const asPlutusV2: (
  instance: CML.Script,
) => Effect.Effect<CML.PlutusV2Script | undefined, ScriptError>;
```

Added in v2.0.0

## asPlutusV3

Method asPlutusV3 of Script

**Signature**

```ts
export declare const asPlutusV3: (
  instance: CML.Script,
) => Effect.Effect<CML.PlutusV3Script | undefined, ScriptError>;
```

Added in v2.0.0

## free

Method free of Script

**Signature**

```ts
export declare const free: (
  instance: CML.Script,
) => Effect.Effect<void, ScriptError>;
```

Added in v2.0.0

## hash

Method hash of Script

**Signature**

```ts
export declare const hash: (
  instance: CML.Script,
) => Effect.Effect<CML.ScriptHash, ScriptError>;
```

Added in v2.0.0

## kind

Method kind of Script

**Signature**

```ts
export declare const kind: (
  instance: CML.Script,
) => Effect.Effect<CML.ScriptKind, ScriptError>;
```

Added in v2.0.0

## language

Method language of Script

**Signature**

```ts
export declare const language: (
  instance: CML.Script,
) => Effect.Effect<CML.Language | undefined, ScriptError>;
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of Script

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.Script,
) => Effect.Effect<Uint8Array, ScriptError>;
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of Script

**Signature**

```ts
export declare const toCanonicalCborHex: (
  instance: CML.Script,
) => Effect.Effect<string, ScriptError>;
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of Script

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.Script,
) => Effect.Effect<Uint8Array, ScriptError>;
```

Added in v2.0.0

## toCborHex

Method toCborHex of Script

**Signature**

```ts
export declare const toCborHex: (
  instance: CML.Script,
) => Effect.Effect<string, ScriptError>;
```

Added in v2.0.0

## toJsValue

Method toJsValue of Script

**Signature**

```ts
export declare const toJsValue: (
  instance: CML.Script,
) => Effect.Effect<any, ScriptError>;
```

Added in v2.0.0

## toJson

Method toJson of Script

**Signature**

```ts
export declare const toJson: (
  instance: CML.Script,
) => Effect.Effect<string, ScriptError>;
```

Added in v2.0.0

# MethodsUnsafe

## asNativeUnsafe

Unsafely calls instance.asNative without Effect wrapper

**Signature**

```ts
export declare const asNativeUnsafe: (
  instance: CML.Script,
) => CML.NativeScript | undefined;
```

Added in v2.0.0

## asPlutusV1Unsafe

Unsafely calls instance.asPlutusV1 without Effect wrapper

**Signature**

```ts
export declare const asPlutusV1Unsafe: (
  instance: CML.Script,
) => CML.PlutusV1Script | undefined;
```

Added in v2.0.0

## asPlutusV2Unsafe

Unsafely calls instance.asPlutusV2 without Effect wrapper

**Signature**

```ts
export declare const asPlutusV2Unsafe: (
  instance: CML.Script,
) => CML.PlutusV2Script | undefined;
```

Added in v2.0.0

## asPlutusV3Unsafe

Unsafely calls instance.asPlutusV3 without Effect wrapper

**Signature**

```ts
export declare const asPlutusV3Unsafe: (
  instance: CML.Script,
) => CML.PlutusV3Script | undefined;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.Script) => void;
```

Added in v2.0.0

## hashUnsafe

Unsafely calls instance.hash without Effect wrapper

**Signature**

```ts
export declare const hashUnsafe: (instance: CML.Script) => CML.ScriptHash;
```

Added in v2.0.0

## kindUnsafe

Unsafely calls instance.kind without Effect wrapper

**Signature**

```ts
export declare const kindUnsafe: (instance: CML.Script) => CML.ScriptKind;
```

Added in v2.0.0

## languageUnsafe

Unsafely calls instance.language without Effect wrapper

**Signature**

```ts
export declare const languageUnsafe: (
  instance: CML.Script,
) => CML.Language | undefined;
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (
  instance: CML.Script,
) => Uint8Array;
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (instance: CML.Script) => string;
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (instance: CML.Script) => Uint8Array;
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.Script) => string;
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.Script) => any;
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.Script) => string;
```

Added in v2.0.0

# Types

## Script (type alias)

Type alias for the CML Script class

**Signature**

```ts
export type Script = CML.Script;
```

Added in v2.0.0
