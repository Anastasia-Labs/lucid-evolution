---
title: CML/Enum/ByronAddrType.ts
nav_order: 71
parent: Modules
---

## ByronAddrType overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Types](#types)
  - [ByronAddrType (type alias)](#byronaddrtype-type-alias)
- [Utils](#utils)
  - [fromString](#fromstring)
  - [toString](#tostring)
  - [values](#values)
- [Variants](#variants)
  - [PublicKey](#publickey)
  - [Redeem](#redeem)
  - [Script](#script)

---

# Types

## ByronAddrType (type alias)

Type alias for the CML ByronAddrType enum

**Signature**

```ts
export type ByronAddrType = CML.ByronAddrType
```

Added in v2.0.0

# Utils

## fromString

Convert string to ByronAddrType enum value

**Signature**

```ts
export declare const fromString: (str: string) => CML.ByronAddrType | undefined
```

Added in v2.0.0

## toString

Convert ByronAddrType enum value to string

**Signature**

```ts
export declare const toString: (value: CML.ByronAddrType) => string
```

Added in v2.0.0

## values

Get all values of the ByronAddrType enum

**Signature**

```ts
export declare const values: () => Array<CML.ByronAddrType>
```

Added in v2.0.0

# Variants

## PublicKey

PublicKey variant of the ByronAddrType enum

**Signature**

```ts
export declare const PublicKey: CML.ByronAddrType.PublicKey
```

Added in v2.0.0

## Redeem

Redeem variant of the ByronAddrType enum

**Signature**

```ts
export declare const Redeem: CML.ByronAddrType.Redeem
```

Added in v2.0.0

## Script

Script variant of the ByronAddrType enum

**Signature**

```ts
export declare const Script: CML.ByronAddrType.Script
```

Added in v2.0.0
