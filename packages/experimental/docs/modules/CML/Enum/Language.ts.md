---
title: CML/Enum/Language.ts
nav_order: 77
parent: Modules
---

## Language overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Types](#types)
  - [Language (type alias)](#language-type-alias)
- [Utils](#utils)
  - [fromString](#fromstring)
  - [toString](#tostring)
  - [values](#values)
- [Variants](#variants)
  - [PlutusV1](#plutusv1)
  - [PlutusV2](#plutusv2)
  - [PlutusV3](#plutusv3)

---

# Types

## Language (type alias)

Type alias for the CML Language enum

**Signature**

```ts
export type Language = CML.Language;
```

Added in v2.0.0

# Utils

## fromString

Convert string to Language enum value

**Signature**

```ts
export declare const fromString: (str: string) => CML.Language | undefined;
```

Added in v2.0.0

## toString

Convert Language enum value to string

**Signature**

```ts
export declare const toString: (value: CML.Language) => string;
```

Added in v2.0.0

## values

Get all values of the Language enum

**Signature**

```ts
export declare const values: () => Array<CML.Language>;
```

Added in v2.0.0

# Variants

## PlutusV1

PlutusV1 variant of the Language enum

**Signature**

```ts
export declare const PlutusV1: CML.Language.PlutusV1;
```

Added in v2.0.0

## PlutusV2

PlutusV2 variant of the Language enum

**Signature**

```ts
export declare const PlutusV2: CML.Language.PlutusV2;
```

Added in v2.0.0

## PlutusV3

PlutusV3 variant of the Language enum

**Signature**

```ts
export declare const PlutusV3: CML.Language.PlutusV3;
```

Added in v2.0.0
