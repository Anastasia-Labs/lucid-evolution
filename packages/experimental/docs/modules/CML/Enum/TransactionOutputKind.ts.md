---
title: CML/Enum/TransactionOutputKind.ts
nav_order: 95
parent: Modules
---

## TransactionOutputKind overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Types](#types)
  - [TransactionOutputKind (type alias)](#transactionoutputkind-type-alias)
- [Utils](#utils)
  - [fromString](#fromstring)
  - [toString](#tostring)
  - [values](#values)
- [Variants](#variants)
  - [AlonzoFormatTxOut](#alonzoformattxout)
  - [ConwayFormatTxOut](#conwayformattxout)

---

# Types

## TransactionOutputKind (type alias)

Type alias for the CML TransactionOutputKind enum

**Signature**

```ts
export type TransactionOutputKind = CML.TransactionOutputKind;
```

Added in v2.0.0

# Utils

## fromString

Convert string to TransactionOutputKind enum value

**Signature**

```ts
export declare const fromString: (
  str: string,
) => CML.TransactionOutputKind | undefined;
```

Added in v2.0.0

## toString

Convert TransactionOutputKind enum value to string

**Signature**

```ts
export declare const toString: (value: CML.TransactionOutputKind) => string;
```

Added in v2.0.0

## values

Get all values of the TransactionOutputKind enum

**Signature**

```ts
export declare const values: () => Array<CML.TransactionOutputKind>;
```

Added in v2.0.0

# Variants

## AlonzoFormatTxOut

AlonzoFormatTxOut variant of the TransactionOutputKind enum

**Signature**

```ts
export declare const AlonzoFormatTxOut: CML.TransactionOutputKind.AlonzoFormatTxOut;
```

Added in v2.0.0

## ConwayFormatTxOut

ConwayFormatTxOut variant of the TransactionOutputKind enum

**Signature**

```ts
export declare const ConwayFormatTxOut: CML.TransactionOutputKind.ConwayFormatTxOut;
```

Added in v2.0.0
