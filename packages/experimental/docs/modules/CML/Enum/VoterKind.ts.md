---
title: CML/Enum/VoterKind.ts
nav_order: 97
parent: Modules
---

## VoterKind overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Types](#types)
  - [VoterKind (type alias)](#voterkind-type-alias)
- [Utils](#utils)
  - [fromString](#fromstring)
  - [toString](#tostring)
  - [values](#values)
- [Variants](#variants)
  - [ConstitutionalCommitteeHotKeyHash](#constitutionalcommitteehotkeyhash)
  - [ConstitutionalCommitteeHotScriptHash](#constitutionalcommitteehotscripthash)
  - [DRepKeyHash](#drepkeyhash)
  - [DRepScriptHash](#drepscripthash)
  - [StakingPoolKeyHash](#stakingpoolkeyhash)

---

# Types

## VoterKind (type alias)

Type alias for the CML VoterKind enum

**Signature**

```ts
export type VoterKind = CML.VoterKind;
```

Added in v2.0.0

# Utils

## fromString

Convert string to VoterKind enum value

**Signature**

```ts
export declare const fromString: (str: string) => CML.VoterKind | undefined;
```

Added in v2.0.0

## toString

Convert VoterKind enum value to string

**Signature**

```ts
export declare const toString: (value: CML.VoterKind) => string;
```

Added in v2.0.0

## values

Get all values of the VoterKind enum

**Signature**

```ts
export declare const values: () => Array<CML.VoterKind>;
```

Added in v2.0.0

# Variants

## ConstitutionalCommitteeHotKeyHash

ConstitutionalCommitteeHotKeyHash variant of the VoterKind enum

**Signature**

```ts
export declare const ConstitutionalCommitteeHotKeyHash: CML.VoterKind.ConstitutionalCommitteeHotKeyHash;
```

Added in v2.0.0

## ConstitutionalCommitteeHotScriptHash

ConstitutionalCommitteeHotScriptHash variant of the VoterKind enum

**Signature**

```ts
export declare const ConstitutionalCommitteeHotScriptHash: CML.VoterKind.ConstitutionalCommitteeHotScriptHash;
```

Added in v2.0.0

## DRepKeyHash

DRepKeyHash variant of the VoterKind enum

**Signature**

```ts
export declare const DRepKeyHash: CML.VoterKind.DRepKeyHash;
```

Added in v2.0.0

## DRepScriptHash

DRepScriptHash variant of the VoterKind enum

**Signature**

```ts
export declare const DRepScriptHash: CML.VoterKind.DRepScriptHash;
```

Added in v2.0.0

## StakingPoolKeyHash

StakingPoolKeyHash variant of the VoterKind enum

**Signature**

```ts
export declare const StakingPoolKeyHash: CML.VoterKind.StakingPoolKeyHash;
```

Added in v2.0.0
