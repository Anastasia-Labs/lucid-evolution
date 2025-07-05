---
title: CML/Enum/RedeemerTag.ts
nav_order: 88
parent: Modules
---

## RedeemerTag overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Types](#types)
  - [RedeemerTag (type alias)](#redeemertag-type-alias)
- [Utils](#utils)
  - [fromString](#fromstring)
  - [toString](#tostring)
  - [values](#values)
- [Variants](#variants)
  - [Cert](#cert)
  - [Mint](#mint)
  - [Proposing](#proposing)
  - [Reward](#reward)
  - [Spend](#spend)
  - [Voting](#voting)

---

# Types

## RedeemerTag (type alias)

Type alias for the CML RedeemerTag enum

**Signature**

```ts
export type RedeemerTag = CML.RedeemerTag;
```

Added in v2.0.0

# Utils

## fromString

Convert string to RedeemerTag enum value

**Signature**

```ts
export declare const fromString: (str: string) => CML.RedeemerTag | undefined;
```

Added in v2.0.0

## toString

Convert RedeemerTag enum value to string

**Signature**

```ts
export declare const toString: (value: CML.RedeemerTag) => string;
```

Added in v2.0.0

## values

Get all values of the RedeemerTag enum

**Signature**

```ts
export declare const values: () => Array<CML.RedeemerTag>;
```

Added in v2.0.0

# Variants

## Cert

Cert variant of the RedeemerTag enum

**Signature**

```ts
export declare const Cert: CML.RedeemerTag.Cert;
```

Added in v2.0.0

## Mint

Mint variant of the RedeemerTag enum

**Signature**

```ts
export declare const Mint: CML.RedeemerTag.Mint;
```

Added in v2.0.0

## Proposing

Proposing variant of the RedeemerTag enum

**Signature**

```ts
export declare const Proposing: CML.RedeemerTag.Proposing;
```

Added in v2.0.0

## Reward

Reward variant of the RedeemerTag enum

**Signature**

```ts
export declare const Reward: CML.RedeemerTag.Reward;
```

Added in v2.0.0

## Spend

Spend variant of the RedeemerTag enum

**Signature**

```ts
export declare const Spend: CML.RedeemerTag.Spend;
```

Added in v2.0.0

## Voting

Voting variant of the RedeemerTag enum

**Signature**

```ts
export declare const Voting: CML.RedeemerTag.Voting;
```

Added in v2.0.0
