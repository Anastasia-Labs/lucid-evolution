---
title: CML/Enum/NonceKind.ts
nav_order: 86
parent: Modules
---

## NonceKind overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Types](#types)
  - [NonceKind (type alias)](#noncekind-type-alias)
- [Utils](#utils)
  - [fromString](#fromstring)
  - [toString](#tostring)
  - [values](#values)
- [Variants](#variants)
  - [Hash](#hash)
  - [Identity](#identity)

---

# Types

## NonceKind (type alias)

Type alias for the CML NonceKind enum

**Signature**

```ts
export type NonceKind = CML.NonceKind;
```

Added in v2.0.0

# Utils

## fromString

Convert string to NonceKind enum value

**Signature**

```ts
export declare const fromString: (str: string) => CML.NonceKind | undefined;
```

Added in v2.0.0

## toString

Convert NonceKind enum value to string

**Signature**

```ts
export declare const toString: (value: CML.NonceKind) => string;
```

Added in v2.0.0

## values

Get all values of the NonceKind enum

**Signature**

```ts
export declare const values: () => Array<CML.NonceKind>;
```

Added in v2.0.0

# Variants

## Hash

Hash variant of the NonceKind enum

**Signature**

```ts
export declare const Hash: CML.NonceKind.Hash;
```

Added in v2.0.0

## Identity

Identity variant of the NonceKind enum

**Signature**

```ts
export declare const Identity: CML.NonceKind.Identity;
```

Added in v2.0.0
