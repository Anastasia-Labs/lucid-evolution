---
title: CML/Enum/SpendingDataKind.ts
nav_order: 92
parent: Modules
---

## SpendingDataKind overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Types](#types)
  - [SpendingDataKind (type alias)](#spendingdatakind-type-alias)
- [Utils](#utils)
  - [fromString](#fromstring)
  - [toString](#tostring)
  - [values](#values)
- [Variants](#variants)
  - [SpendingDataPubKey](#spendingdatapubkey)
  - [SpendingDataRedeem](#spendingdataredeem)
  - [SpendingDataScript](#spendingdatascript)

---

# Types

## SpendingDataKind (type alias)

Type alias for the CML SpendingDataKind enum

**Signature**

```ts
export type SpendingDataKind = CML.SpendingDataKind
```

Added in v2.0.0

# Utils

## fromString

Convert string to SpendingDataKind enum value

**Signature**

```ts
export declare const fromString: (str: string) => CML.SpendingDataKind | undefined
```

Added in v2.0.0

## toString

Convert SpendingDataKind enum value to string

**Signature**

```ts
export declare const toString: (value: CML.SpendingDataKind) => string
```

Added in v2.0.0

## values

Get all values of the SpendingDataKind enum

**Signature**

```ts
export declare const values: () => Array<CML.SpendingDataKind>
```

Added in v2.0.0

# Variants

## SpendingDataPubKey

SpendingDataPubKey variant of the SpendingDataKind enum

**Signature**

```ts
export declare const SpendingDataPubKey: CML.SpendingDataKind.SpendingDataPubKey
```

Added in v2.0.0

## SpendingDataRedeem

SpendingDataRedeem variant of the SpendingDataKind enum

**Signature**

```ts
export declare const SpendingDataRedeem: CML.SpendingDataKind.SpendingDataRedeem
```

Added in v2.0.0

## SpendingDataScript

SpendingDataScript variant of the SpendingDataKind enum

**Signature**

```ts
export declare const SpendingDataScript: CML.SpendingDataKind.SpendingDataScript
```

Added in v2.0.0
