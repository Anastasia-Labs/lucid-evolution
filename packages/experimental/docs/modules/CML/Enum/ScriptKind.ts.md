---
title: CML/Enum/ScriptKind.ts
nav_order: 85
parent: Modules
---

## ScriptKind overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Types](#types)
  - [ScriptKind (type alias)](#scriptkind-type-alias)
- [Utils](#utils)
  - [fromString](#fromstring)
  - [toString](#tostring)
  - [values](#values)
- [Variants](#variants)
  - [Native](#native)
  - [PlutusV1](#plutusv1)
  - [PlutusV2](#plutusv2)
  - [PlutusV3](#plutusv3)

---

# Types

## ScriptKind (type alias)

Type alias for the CML ScriptKind enum

**Signature**

```ts
export type ScriptKind = CML.ScriptKind;
```

Added in v2.0.0

# Utils

## fromString

Convert string to ScriptKind enum value

**Signature**

```ts
export declare const fromString: (str: string) => CML.ScriptKind | undefined;
```

Added in v2.0.0

## toString

Convert ScriptKind enum value to string

**Signature**

```ts
export declare const toString: (value: CML.ScriptKind) => string;
```

Added in v2.0.0

## values

Get all values of the ScriptKind enum

**Signature**

```ts
export declare const values: () => Array<CML.ScriptKind>;
```

Added in v2.0.0

# Variants

## Native

Native variant of the ScriptKind enum

**Signature**

```ts
export declare const Native: CML.ScriptKind.Native;
```

Added in v2.0.0

## PlutusV1

PlutusV1 variant of the ScriptKind enum

**Signature**

```ts
export declare const PlutusV1: CML.ScriptKind.PlutusV1;
```

Added in v2.0.0

## PlutusV2

PlutusV2 variant of the ScriptKind enum

**Signature**

```ts
export declare const PlutusV2: CML.ScriptKind.PlutusV2;
```

Added in v2.0.0

## PlutusV3

PlutusV3 variant of the ScriptKind enum

**Signature**

```ts
export declare const PlutusV3: CML.ScriptKind.PlutusV3;
```

Added in v2.0.0
