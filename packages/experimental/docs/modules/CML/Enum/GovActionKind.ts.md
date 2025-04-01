---
title: CML/Enum/GovActionKind.ts
nav_order: 76
parent: Modules
---

## GovActionKind overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Types](#types)
  - [GovActionKind (type alias)](#govactionkind-type-alias)
- [Utils](#utils)
  - [fromString](#fromstring)
  - [toString](#tostring)
  - [values](#values)
- [Variants](#variants)
  - [HardForkInitiationAction](#hardforkinitiationaction)
  - [InfoAction](#infoaction)
  - [NewConstitution](#newconstitution)
  - [NoConfidence](#noconfidence)
  - [ParameterChangeAction](#parameterchangeaction)
  - [TreasuryWithdrawalsAction](#treasurywithdrawalsaction)
  - [UpdateCommittee](#updatecommittee)

---

# Types

## GovActionKind (type alias)

Type alias for the CML GovActionKind enum

**Signature**

```ts
export type GovActionKind = CML.GovActionKind;
```

Added in v2.0.0

# Utils

## fromString

Convert string to GovActionKind enum value

**Signature**

```ts
export declare const fromString: (str: string) => CML.GovActionKind | undefined;
```

Added in v2.0.0

## toString

Convert GovActionKind enum value to string

**Signature**

```ts
export declare const toString: (value: CML.GovActionKind) => string;
```

Added in v2.0.0

## values

Get all values of the GovActionKind enum

**Signature**

```ts
export declare const values: () => Array<CML.GovActionKind>;
```

Added in v2.0.0

# Variants

## HardForkInitiationAction

HardForkInitiationAction variant of the GovActionKind enum

**Signature**

```ts
export declare const HardForkInitiationAction: CML.GovActionKind.HardForkInitiationAction;
```

Added in v2.0.0

## InfoAction

InfoAction variant of the GovActionKind enum

**Signature**

```ts
export declare const InfoAction: CML.GovActionKind.InfoAction;
```

Added in v2.0.0

## NewConstitution

NewConstitution variant of the GovActionKind enum

**Signature**

```ts
export declare const NewConstitution: CML.GovActionKind.NewConstitution;
```

Added in v2.0.0

## NoConfidence

NoConfidence variant of the GovActionKind enum

**Signature**

```ts
export declare const NoConfidence: CML.GovActionKind.NoConfidence;
```

Added in v2.0.0

## ParameterChangeAction

ParameterChangeAction variant of the GovActionKind enum

**Signature**

```ts
export declare const ParameterChangeAction: CML.GovActionKind.ParameterChangeAction;
```

Added in v2.0.0

## TreasuryWithdrawalsAction

TreasuryWithdrawalsAction variant of the GovActionKind enum

**Signature**

```ts
export declare const TreasuryWithdrawalsAction: CML.GovActionKind.TreasuryWithdrawalsAction;
```

Added in v2.0.0

## UpdateCommittee

UpdateCommittee variant of the GovActionKind enum

**Signature**

```ts
export declare const UpdateCommittee: CML.GovActionKind.UpdateCommittee;
```

Added in v2.0.0
