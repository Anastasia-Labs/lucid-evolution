---
title: CML/Enum/CertificateKind.ts
nav_order: 67
parent: Modules
---

## CertificateKind overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Types](#types)
  - [CertificateKind (type alias)](#certificatekind-type-alias)
- [Utils](#utils)
  - [fromString](#fromstring)
  - [toString](#tostring)
  - [values](#values)
- [Variants](#variants)
  - [AuthCommitteeHotCert](#authcommitteehotcert)
  - [PoolRegistration](#poolregistration)
  - [PoolRetirement](#poolretirement)
  - [RegCert](#regcert)
  - [RegDrepCert](#regdrepcert)
  - [ResignCommitteeColdCert](#resigncommitteecoldcert)
  - [StakeDelegation](#stakedelegation)
  - [StakeDeregistration](#stakederegistration)
  - [StakeRegDelegCert](#stakeregdelegcert)
  - [StakeRegistration](#stakeregistration)
  - [StakeVoteDelegCert](#stakevotedelegcert)
  - [StakeVoteRegDelegCert](#stakevoteregdelegcert)
  - [UnregCert](#unregcert)
  - [UnregDrepCert](#unregdrepcert)
  - [UpdateDrepCert](#updatedrepcert)
  - [VoteDelegCert](#votedelegcert)
  - [VoteRegDelegCert](#voteregdelegcert)

---

# Types

## CertificateKind (type alias)

Type alias for the CML CertificateKind enum

**Signature**

```ts
export type CertificateKind = CML.CertificateKind;
```

Added in v2.0.0

# Utils

## fromString

Convert string to CertificateKind enum value

**Signature**

```ts
export declare const fromString: (
  str: string,
) => CML.CertificateKind | undefined;
```

Added in v2.0.0

## toString

Convert CertificateKind enum value to string

**Signature**

```ts
export declare const toString: (value: CML.CertificateKind) => string;
```

Added in v2.0.0

## values

Get all values of the CertificateKind enum

**Signature**

```ts
export declare const values: () => Array<CML.CertificateKind>;
```

Added in v2.0.0

# Variants

## AuthCommitteeHotCert

AuthCommitteeHotCert variant of the CertificateKind enum

**Signature**

```ts
export declare const AuthCommitteeHotCert: CML.CertificateKind.AuthCommitteeHotCert;
```

Added in v2.0.0

## PoolRegistration

PoolRegistration variant of the CertificateKind enum

**Signature**

```ts
export declare const PoolRegistration: CML.CertificateKind.PoolRegistration;
```

Added in v2.0.0

## PoolRetirement

PoolRetirement variant of the CertificateKind enum

**Signature**

```ts
export declare const PoolRetirement: CML.CertificateKind.PoolRetirement;
```

Added in v2.0.0

## RegCert

RegCert variant of the CertificateKind enum

**Signature**

```ts
export declare const RegCert: CML.CertificateKind.RegCert;
```

Added in v2.0.0

## RegDrepCert

RegDrepCert variant of the CertificateKind enum

**Signature**

```ts
export declare const RegDrepCert: CML.CertificateKind.RegDrepCert;
```

Added in v2.0.0

## ResignCommitteeColdCert

ResignCommitteeColdCert variant of the CertificateKind enum

**Signature**

```ts
export declare const ResignCommitteeColdCert: CML.CertificateKind.ResignCommitteeColdCert;
```

Added in v2.0.0

## StakeDelegation

StakeDelegation variant of the CertificateKind enum

**Signature**

```ts
export declare const StakeDelegation: CML.CertificateKind.StakeDelegation;
```

Added in v2.0.0

## StakeDeregistration

StakeDeregistration variant of the CertificateKind enum

**Signature**

```ts
export declare const StakeDeregistration: CML.CertificateKind.StakeDeregistration;
```

Added in v2.0.0

## StakeRegDelegCert

StakeRegDelegCert variant of the CertificateKind enum

**Signature**

```ts
export declare const StakeRegDelegCert: CML.CertificateKind.StakeRegDelegCert;
```

Added in v2.0.0

## StakeRegistration

StakeRegistration variant of the CertificateKind enum

**Signature**

```ts
export declare const StakeRegistration: CML.CertificateKind.StakeRegistration;
```

Added in v2.0.0

## StakeVoteDelegCert

StakeVoteDelegCert variant of the CertificateKind enum

**Signature**

```ts
export declare const StakeVoteDelegCert: CML.CertificateKind.StakeVoteDelegCert;
```

Added in v2.0.0

## StakeVoteRegDelegCert

StakeVoteRegDelegCert variant of the CertificateKind enum

**Signature**

```ts
export declare const StakeVoteRegDelegCert: CML.CertificateKind.StakeVoteRegDelegCert;
```

Added in v2.0.0

## UnregCert

UnregCert variant of the CertificateKind enum

**Signature**

```ts
export declare const UnregCert: CML.CertificateKind.UnregCert;
```

Added in v2.0.0

## UnregDrepCert

UnregDrepCert variant of the CertificateKind enum

**Signature**

```ts
export declare const UnregDrepCert: CML.CertificateKind.UnregDrepCert;
```

Added in v2.0.0

## UpdateDrepCert

UpdateDrepCert variant of the CertificateKind enum

**Signature**

```ts
export declare const UpdateDrepCert: CML.CertificateKind.UpdateDrepCert;
```

Added in v2.0.0

## VoteDelegCert

VoteDelegCert variant of the CertificateKind enum

**Signature**

```ts
export declare const VoteDelegCert: CML.CertificateKind.VoteDelegCert;
```

Added in v2.0.0

## VoteRegDelegCert

VoteRegDelegCert variant of the CertificateKind enum

**Signature**

```ts
export declare const VoteRegDelegCert: CML.CertificateKind.VoteRegDelegCert;
```

Added in v2.0.0
