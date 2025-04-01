---
title: CML/Enum/RedeemersKind.ts
nav_order: 82
parent: Modules
---

## RedeemersKind overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Types](#types)
  - [RedeemersKind (type alias)](#redeemerskind-type-alias)
- [Utils](#utils)
  - [fromString](#fromstring)
  - [toString](#tostring)
  - [values](#values)
- [Variants](#variants)
  - [ArrLegacyRedeemer](#arrlegacyredeemer)
  - [MapRedeemerKeyToRedeemerVal](#mapredeemerkeytoredeemerval)

---

# Types

## RedeemersKind (type alias)

Type alias for the CML RedeemersKind enum

**Signature**

```ts
export type RedeemersKind = CML.RedeemersKind
```

Added in v2.0.0

# Utils

## fromString

Convert string to RedeemersKind enum value

**Signature**

```ts
export declare const fromString: (str: string) => CML.RedeemersKind | undefined
```

Added in v2.0.0

## toString

Convert RedeemersKind enum value to string

**Signature**

```ts
export declare const toString: (value: CML.RedeemersKind) => string
```

Added in v2.0.0

## values

Get all values of the RedeemersKind enum

**Signature**

```ts
export declare const values: () => Array<CML.RedeemersKind>
```

Added in v2.0.0

# Variants

## ArrLegacyRedeemer

ArrLegacyRedeemer variant of the RedeemersKind enum

**Signature**

```ts
export declare const ArrLegacyRedeemer: CML.RedeemersKind.ArrLegacyRedeemer
```

Added in v2.0.0

## MapRedeemerKeyToRedeemerVal

MapRedeemerKeyToRedeemerVal variant of the RedeemersKind enum

**Signature**

```ts
export declare const MapRedeemerKeyToRedeemerVal: CML.RedeemersKind.MapRedeemerKeyToRedeemerVal
```

Added in v2.0.0
