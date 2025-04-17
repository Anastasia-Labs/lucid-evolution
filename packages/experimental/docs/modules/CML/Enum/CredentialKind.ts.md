---
title: CML/Enum/CredentialKind.ts
nav_order: 78
parent: Modules
---

## CredentialKind overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Types](#types)
  - [CredentialKind (type alias)](#credentialkind-type-alias)
- [Utils](#utils)
  - [fromString](#fromstring)
  - [toString](#tostring)
  - [values](#values)
- [Variants](#variants)
  - [PubKey](#pubkey)
  - [Script](#script)

---

# Types

## CredentialKind (type alias)

Type alias for the CML CredentialKind enum

**Signature**

```ts
export type CredentialKind = CML.CredentialKind;
```

Added in v2.0.0

# Utils

## fromString

Convert string to CredentialKind enum value

**Signature**

```ts
export declare const fromString: (
  str: string,
) => CML.CredentialKind | undefined;
```

Added in v2.0.0

## toString

Convert CredentialKind enum value to string

**Signature**

```ts
export declare const toString: (value: CML.CredentialKind) => string;
```

Added in v2.0.0

## values

Get all values of the CredentialKind enum

**Signature**

```ts
export declare const values: () => Array<CML.CredentialKind>;
```

Added in v2.0.0

# Variants

## PubKey

PubKey variant of the CredentialKind enum

**Signature**

```ts
export declare const PubKey: CML.CredentialKind.PubKey;
```

Added in v2.0.0

## Script

Script variant of the CredentialKind enum

**Signature**

```ts
export declare const Script: CML.CredentialKind.Script;
```

Added in v2.0.0
