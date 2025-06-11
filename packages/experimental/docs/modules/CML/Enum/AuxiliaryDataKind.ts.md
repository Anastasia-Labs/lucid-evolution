---
title: CML/Enum/AuxiliaryDataKind.ts
nav_order: 69
parent: Modules
---

## AuxiliaryDataKind overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Types](#types)
  - [AuxiliaryDataKind (type alias)](#auxiliarydatakind-type-alias)
- [Utils](#utils)
  - [fromString](#fromstring)
  - [toString](#tostring)
  - [values](#values)
- [Variants](#variants)
  - [Conway](#conway)
  - [Shelley](#shelley)
  - [ShelleyMA](#shelleyma)

---

# Types

## AuxiliaryDataKind (type alias)

Type alias for the CML AuxiliaryDataKind enum

**Signature**

```ts
export type AuxiliaryDataKind = CML.AuxiliaryDataKind
```

Added in v2.0.0

# Utils

## fromString

Convert string to AuxiliaryDataKind enum value

**Signature**

```ts
export declare const fromString: (str: string) => CML.AuxiliaryDataKind | undefined
```

Added in v2.0.0

## toString

Convert AuxiliaryDataKind enum value to string

**Signature**

```ts
export declare const toString: (value: CML.AuxiliaryDataKind) => string
```

Added in v2.0.0

## values

Get all values of the AuxiliaryDataKind enum

**Signature**

```ts
export declare const values: () => Array<CML.AuxiliaryDataKind>
```

Added in v2.0.0

# Variants

## Conway

Conway variant of the AuxiliaryDataKind enum

**Signature**

```ts
export declare const Conway: CML.AuxiliaryDataKind.Conway
```

Added in v2.0.0

## Shelley

Shelley variant of the AuxiliaryDataKind enum

**Signature**

```ts
export declare const Shelley: CML.AuxiliaryDataKind.Shelley
```

Added in v2.0.0

## ShelleyMA

ShelleyMA variant of the AuxiliaryDataKind enum

**Signature**

```ts
export declare const ShelleyMA: CML.AuxiliaryDataKind.ShelleyMA
```

Added in v2.0.0
