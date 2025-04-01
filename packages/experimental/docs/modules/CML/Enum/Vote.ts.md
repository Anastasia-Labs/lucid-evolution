---
title: CML/Enum/Vote.ts
nav_order: 90
parent: Modules
---

## Vote overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Types](#types)
  - [Vote (type alias)](#vote-type-alias)
- [Utils](#utils)
  - [fromString](#fromstring)
  - [toString](#tostring)
  - [values](#values)
- [Variants](#variants)
  - [Abstain](#abstain)
  - [No](#no)
  - [Yes](#yes)

---

# Types

## Vote (type alias)

Type alias for the CML Vote enum

**Signature**

```ts
export type Vote = CML.Vote
```

Added in v2.0.0

# Utils

## fromString

Convert string to Vote enum value

**Signature**

```ts
export declare const fromString: (str: string) => CML.Vote | undefined
```

Added in v2.0.0

## toString

Convert Vote enum value to string

**Signature**

```ts
export declare const toString: (value: CML.Vote) => string
```

Added in v2.0.0

## values

Get all values of the Vote enum

**Signature**

```ts
export declare const values: () => Array<CML.Vote>
```

Added in v2.0.0

# Variants

## Abstain

Abstain variant of the Vote enum

**Signature**

```ts
export declare const Abstain: CML.Vote.Abstain
```

Added in v2.0.0

## No

No variant of the Vote enum

**Signature**

```ts
export declare const No: CML.Vote.No
```

Added in v2.0.0

## Yes

Yes variant of the Vote enum

**Signature**

```ts
export declare const Yes: CML.Vote.Yes
```

Added in v2.0.0
