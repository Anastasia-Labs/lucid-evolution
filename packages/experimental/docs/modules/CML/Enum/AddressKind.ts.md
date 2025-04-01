---
title: CML/Enum/AddressKind.ts
nav_order: 63
parent: Modules
---

## AddressKind overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Types](#types)
  - [AddressKind (type alias)](#addresskind-type-alias)
- [Utils](#utils)
  - [fromString](#fromstring)
  - [toString](#tostring)
  - [values](#values)
- [Variants](#variants)
  - [Base](#base)
  - [Byron](#byron)
  - [Enterprise](#enterprise)
  - [Ptr](#ptr)
  - [Reward](#reward)

---

# Types

## AddressKind (type alias)

Type alias for the CML AddressKind enum

**Signature**

```ts
export type AddressKind = CML.AddressKind;
```

Added in v2.0.0

# Utils

## fromString

Convert string to AddressKind enum value

**Signature**

```ts
export declare const fromString: (str: string) => CML.AddressKind | undefined;
```

Added in v2.0.0

## toString

Convert AddressKind enum value to string

**Signature**

```ts
export declare const toString: (value: CML.AddressKind) => string;
```

Added in v2.0.0

## values

Get all values of the AddressKind enum

**Signature**

```ts
export declare const values: () => Array<CML.AddressKind>;
```

Added in v2.0.0

# Variants

## Base

Base variant of the AddressKind enum

**Signature**

```ts
export declare const Base: CML.AddressKind.Base;
```

Added in v2.0.0

## Byron

Byron variant of the AddressKind enum

**Signature**

```ts
export declare const Byron: CML.AddressKind.Byron;
```

Added in v2.0.0

## Enterprise

Enterprise variant of the AddressKind enum

**Signature**

```ts
export declare const Enterprise: CML.AddressKind.Enterprise;
```

Added in v2.0.0

## Ptr

Ptr variant of the AddressKind enum

**Signature**

```ts
export declare const Ptr: CML.AddressKind.Ptr;
```

Added in v2.0.0

## Reward

Reward variant of the AddressKind enum

**Signature**

```ts
export declare const Reward: CML.AddressKind.Reward;
```

Added in v2.0.0
