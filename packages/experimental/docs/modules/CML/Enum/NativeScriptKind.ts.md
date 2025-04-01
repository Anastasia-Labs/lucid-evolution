---
title: CML/Enum/NativeScriptKind.ts
nav_order: 79
parent: Modules
---

## NativeScriptKind overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Types](#types)
  - [NativeScriptKind (type alias)](#nativescriptkind-type-alias)
- [Utils](#utils)
  - [fromString](#fromstring)
  - [toString](#tostring)
  - [values](#values)
- [Variants](#variants)
  - [ScriptAll](#scriptall)
  - [ScriptAny](#scriptany)
  - [ScriptInvalidBefore](#scriptinvalidbefore)
  - [ScriptInvalidHereafter](#scriptinvalidhereafter)
  - [ScriptNOfK](#scriptnofk)
  - [ScriptPubkey](#scriptpubkey)

---

# Types

## NativeScriptKind (type alias)

Type alias for the CML NativeScriptKind enum

**Signature**

```ts
export type NativeScriptKind = CML.NativeScriptKind
```

Added in v2.0.0

# Utils

## fromString

Convert string to NativeScriptKind enum value

**Signature**

```ts
export declare const fromString: (str: string) => CML.NativeScriptKind | undefined
```

Added in v2.0.0

## toString

Convert NativeScriptKind enum value to string

**Signature**

```ts
export declare const toString: (value: CML.NativeScriptKind) => string
```

Added in v2.0.0

## values

Get all values of the NativeScriptKind enum

**Signature**

```ts
export declare const values: () => Array<CML.NativeScriptKind>
```

Added in v2.0.0

# Variants

## ScriptAll

ScriptAll variant of the NativeScriptKind enum

**Signature**

```ts
export declare const ScriptAll: CML.NativeScriptKind.ScriptAll
```

Added in v2.0.0

## ScriptAny

ScriptAny variant of the NativeScriptKind enum

**Signature**

```ts
export declare const ScriptAny: CML.NativeScriptKind.ScriptAny
```

Added in v2.0.0

## ScriptInvalidBefore

ScriptInvalidBefore variant of the NativeScriptKind enum

**Signature**

```ts
export declare const ScriptInvalidBefore: CML.NativeScriptKind.ScriptInvalidBefore
```

Added in v2.0.0

## ScriptInvalidHereafter

ScriptInvalidHereafter variant of the NativeScriptKind enum

**Signature**

```ts
export declare const ScriptInvalidHereafter: CML.NativeScriptKind.ScriptInvalidHereafter
```

Added in v2.0.0

## ScriptNOfK

ScriptNOfK variant of the NativeScriptKind enum

**Signature**

```ts
export declare const ScriptNOfK: CML.NativeScriptKind.ScriptNOfK
```

Added in v2.0.0

## ScriptPubkey

ScriptPubkey variant of the NativeScriptKind enum

**Signature**

```ts
export declare const ScriptPubkey: CML.NativeScriptKind.ScriptPubkey
```

Added in v2.0.0
