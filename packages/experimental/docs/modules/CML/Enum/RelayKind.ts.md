---
title: CML/Enum/RelayKind.ts
nav_order: 84
parent: Modules
---

## RelayKind overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Types](#types)
  - [RelayKind (type alias)](#relaykind-type-alias)
- [Utils](#utils)
  - [fromString](#fromstring)
  - [toString](#tostring)
  - [values](#values)
- [Variants](#variants)
  - [MultiHostName](#multihostname)
  - [SingleHostAddr](#singlehostaddr)
  - [SingleHostName](#singlehostname)

---

# Types

## RelayKind (type alias)

Type alias for the CML RelayKind enum

**Signature**

```ts
export type RelayKind = CML.RelayKind
```

Added in v2.0.0

# Utils

## fromString

Convert string to RelayKind enum value

**Signature**

```ts
export declare const fromString: (str: string) => CML.RelayKind | undefined
```

Added in v2.0.0

## toString

Convert RelayKind enum value to string

**Signature**

```ts
export declare const toString: (value: CML.RelayKind) => string
```

Added in v2.0.0

## values

Get all values of the RelayKind enum

**Signature**

```ts
export declare const values: () => Array<CML.RelayKind>
```

Added in v2.0.0

# Variants

## MultiHostName

MultiHostName variant of the RelayKind enum

**Signature**

```ts
export declare const MultiHostName: CML.RelayKind.MultiHostName
```

Added in v2.0.0

## SingleHostAddr

SingleHostAddr variant of the RelayKind enum

**Signature**

```ts
export declare const SingleHostAddr: CML.RelayKind.SingleHostAddr
```

Added in v2.0.0

## SingleHostName

SingleHostName variant of the RelayKind enum

**Signature**

```ts
export declare const SingleHostName: CML.RelayKind.SingleHostName
```

Added in v2.0.0
