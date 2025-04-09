---
title: CML/Enum/StakeDistributionKind.ts
nav_order: 88
parent: Modules
---

## StakeDistributionKind overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Types](#types)
  - [StakeDistributionKind (type alias)](#stakedistributionkind-type-alias)
- [Utils](#utils)
  - [fromString](#fromstring)
  - [toString](#tostring)
  - [values](#values)
- [Variants](#variants)
  - [BootstrapEra](#bootstrapera)
  - [SingleKey](#singlekey)

---

# Types

## StakeDistributionKind (type alias)

Type alias for the CML StakeDistributionKind enum

**Signature**

```ts
export type StakeDistributionKind = CML.StakeDistributionKind;
```

Added in v2.0.0

# Utils

## fromString

Convert string to StakeDistributionKind enum value

**Signature**

```ts
export declare const fromString: (
  str: string,
) => CML.StakeDistributionKind | undefined;
```

Added in v2.0.0

## toString

Convert StakeDistributionKind enum value to string

**Signature**

```ts
export declare const toString: (value: CML.StakeDistributionKind) => string;
```

Added in v2.0.0

## values

Get all values of the StakeDistributionKind enum

**Signature**

```ts
export declare const values: () => Array<CML.StakeDistributionKind>;
```

Added in v2.0.0

# Variants

## BootstrapEra

BootstrapEra variant of the StakeDistributionKind enum

**Signature**

```ts
export declare const BootstrapEra: CML.StakeDistributionKind.BootstrapEra;
```

Added in v2.0.0

## SingleKey

SingleKey variant of the StakeDistributionKind enum

**Signature**

```ts
export declare const SingleKey: CML.StakeDistributionKind.SingleKey;
```

Added in v2.0.0
