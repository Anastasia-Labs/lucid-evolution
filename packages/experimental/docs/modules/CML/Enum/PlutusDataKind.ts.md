---
title: CML/Enum/PlutusDataKind.ts
nav_order: 82
parent: Modules
---

## PlutusDataKind overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Types](#types)
  - [PlutusDataKind (type alias)](#plutusdatakind-type-alias)
- [Utils](#utils)
  - [fromString](#fromstring)
  - [toString](#tostring)
  - [values](#values)
- [Variants](#variants)
  - [Bytes](#bytes)
  - [ConstrPlutusData](#constrplutusdata)
  - [Integer](#integer)
  - [List](#list)
  - [Map](#map)

---

# Types

## PlutusDataKind (type alias)

Type alias for the CML PlutusDataKind enum

**Signature**

```ts
export type PlutusDataKind = CML.PlutusDataKind;
```

Added in v2.0.0

# Utils

## fromString

Convert string to PlutusDataKind enum value

**Signature**

```ts
export declare const fromString: (
  str: string,
) => CML.PlutusDataKind | undefined;
```

Added in v2.0.0

## toString

Convert PlutusDataKind enum value to string

**Signature**

```ts
export declare const toString: (value: CML.PlutusDataKind) => string;
```

Added in v2.0.0

## values

Get all values of the PlutusDataKind enum

**Signature**

```ts
export declare const values: () => Array<CML.PlutusDataKind>;
```

Added in v2.0.0

# Variants

## Bytes

Bytes variant of the PlutusDataKind enum

**Signature**

```ts
export declare const Bytes: CML.PlutusDataKind.Bytes;
```

Added in v2.0.0

## ConstrPlutusData

ConstrPlutusData variant of the PlutusDataKind enum

**Signature**

```ts
export declare const ConstrPlutusData: CML.PlutusDataKind.ConstrPlutusData;
```

Added in v2.0.0

## Integer

Integer variant of the PlutusDataKind enum

**Signature**

```ts
export declare const Integer: CML.PlutusDataKind.Integer;
```

Added in v2.0.0

## List

List variant of the PlutusDataKind enum

**Signature**

```ts
export declare const List: CML.PlutusDataKind.List;
```

Added in v2.0.0

## Map

Map variant of the PlutusDataKind enum

**Signature**

```ts
export declare const Map: CML.PlutusDataKind.Map;
```

Added in v2.0.0
