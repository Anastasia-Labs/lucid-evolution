---
title: CML/Certificate.ts
nav_order: 32
parent: Modules
---

## Certificate overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [fromCborBytes](#fromcborbytes)
  - [fromCborHex](#fromcborhex)
  - [fromJson](#fromjson)
  - [newAuthCommitteeHotCert](#newauthcommitteehotcert)
  - [newPoolRegistration](#newpoolregistration)
  - [newPoolRetirement](#newpoolretirement)
  - [newRegCert](#newregcert)
  - [newRegDrepCert](#newregdrepcert)
  - [newResignCommitteeColdCert](#newresigncommitteecoldcert)
  - [newStakeDelegation](#newstakedelegation)
  - [newStakeDeregistration](#newstakederegistration)
  - [newStakeRegDelegCert](#newstakeregdelegcert)
  - [newStakeRegistration](#newstakeregistration)
  - [newStakeVoteDelegCert](#newstakevotedelegcert)
  - [newStakeVoteRegDelegCert](#newstakevoteregdelegcert)
  - [newUnregCert](#newunregcert)
  - [newUnregDrepCert](#newunregdrepcert)
  - [newUpdateDrepCert](#newupdatedrepcert)
  - [newVoteDelegCert](#newvotedelegcert)
  - [newVoteRegDelegCert](#newvoteregdelegcert)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [fromCborBytesUnsafe](#fromcborbytesunsafe)
  - [fromCborHexUnsafe](#fromcborhexunsafe)
  - [fromJsonUnsafe](#fromjsonunsafe)
  - [newAuthCommitteeHotCertUnsafe](#newauthcommitteehotcertunsafe)
  - [newPoolRegistrationUnsafe](#newpoolregistrationunsafe)
  - [newPoolRetirementUnsafe](#newpoolretirementunsafe)
  - [newRegCertUnsafe](#newregcertunsafe)
  - [newRegDrepCertUnsafe](#newregdrepcertunsafe)
  - [newResignCommitteeColdCertUnsafe](#newresigncommitteecoldcertunsafe)
  - [newStakeDelegationUnsafe](#newstakedelegationunsafe)
  - [newStakeDeregistrationUnsafe](#newstakederegistrationunsafe)
  - [newStakeRegDelegCertUnsafe](#newstakeregdelegcertunsafe)
  - [newStakeRegistrationUnsafe](#newstakeregistrationunsafe)
  - [newStakeVoteDelegCertUnsafe](#newstakevotedelegcertunsafe)
  - [newStakeVoteRegDelegCertUnsafe](#newstakevoteregdelegcertunsafe)
  - [newUnregCertUnsafe](#newunregcertunsafe)
  - [newUnregDrepCertUnsafe](#newunregdrepcertunsafe)
  - [newUpdateDrepCertUnsafe](#newupdatedrepcertunsafe)
  - [newVoteDelegCertUnsafe](#newvotedelegcertunsafe)
  - [newVoteRegDelegCertUnsafe](#newvoteregdelegcertunsafe)
- [Errors](#errors)
  - [CertificateError (class)](#certificateerror-class)
- [Methods](#methods)
  - [asAuthCommitteeHotCert](#asauthcommitteehotcert)
  - [asPoolRegistration](#aspoolregistration)
  - [asPoolRetirement](#aspoolretirement)
  - [asRegCert](#asregcert)
  - [asRegDrepCert](#asregdrepcert)
  - [asResignCommitteeColdCert](#asresigncommitteecoldcert)
  - [asStakeDelegation](#asstakedelegation)
  - [asStakeDeregistration](#asstakederegistration)
  - [asStakeRegDelegCert](#asstakeregdelegcert)
  - [asStakeRegistration](#asstakeregistration)
  - [asStakeVoteDelegCert](#asstakevotedelegcert)
  - [asStakeVoteRegDelegCert](#asstakevoteregdelegcert)
  - [asUnregCert](#asunregcert)
  - [asUnregDrepCert](#asunregdrepcert)
  - [asUpdateDrepCert](#asupdatedrepcert)
  - [asVoteDelegCert](#asvotedelegcert)
  - [asVoteRegDelegCert](#asvoteregdelegcert)
  - [free](#free)
  - [kind](#kind)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
- [MethodsUnsafe](#methodsunsafe)
  - [asAuthCommitteeHotCertUnsafe](#asauthcommitteehotcertunsafe)
  - [asPoolRegistrationUnsafe](#aspoolregistrationunsafe)
  - [asPoolRetirementUnsafe](#aspoolretirementunsafe)
  - [asRegCertUnsafe](#asregcertunsafe)
  - [asRegDrepCertUnsafe](#asregdrepcertunsafe)
  - [asResignCommitteeColdCertUnsafe](#asresigncommitteecoldcertunsafe)
  - [asStakeDelegationUnsafe](#asstakedelegationunsafe)
  - [asStakeDeregistrationUnsafe](#asstakederegistrationunsafe)
  - [asStakeRegDelegCertUnsafe](#asstakeregdelegcertunsafe)
  - [asStakeRegistrationUnsafe](#asstakeregistrationunsafe)
  - [asStakeVoteDelegCertUnsafe](#asstakevotedelegcertunsafe)
  - [asStakeVoteRegDelegCertUnsafe](#asstakevoteregdelegcertunsafe)
  - [asUnregCertUnsafe](#asunregcertunsafe)
  - [asUnregDrepCertUnsafe](#asunregdrepcertunsafe)
  - [asUpdateDrepCertUnsafe](#asupdatedrepcertunsafe)
  - [asVoteDelegCertUnsafe](#asvotedelegcertunsafe)
  - [asVoteRegDelegCertUnsafe](#asvoteregdelegcertunsafe)
  - [freeUnsafe](#freeunsafe)
  - [kindUnsafe](#kindunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
- [Types](#types)
  - [Certificate (type alias)](#certificate-type-alias)

---

# Constructors

## fromCborBytes

Static method fromCborBytes of Certificate

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.Certificate, CertificateError>;
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of Certificate

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.Certificate, CertificateError>;
```

Added in v2.0.0

## fromJson

Static method fromJson of Certificate

**Signature**

```ts
export declare const fromJson: (
  json: string,
) => Effect.Effect<CML.Certificate, CertificateError>;
```

Added in v2.0.0

## newAuthCommitteeHotCert

Static method newAuthCommitteeHotCert of Certificate

**Signature**

```ts
export declare const newAuthCommitteeHotCert: (
  committeeColdCredential: CML.Credential,
  committeeHotCredential: CML.Credential,
) => Effect.Effect<CML.Certificate, CertificateError>;
```

Added in v2.0.0

## newPoolRegistration

Static method newPoolRegistration of Certificate

**Signature**

```ts
export declare const newPoolRegistration: (
  poolParams: CML.PoolParams,
) => Effect.Effect<CML.Certificate, CertificateError>;
```

Added in v2.0.0

## newPoolRetirement

Static method newPoolRetirement of Certificate

**Signature**

```ts
export declare const newPoolRetirement: (
  pool: CML.Ed25519KeyHash,
  epoch: bigint,
) => Effect.Effect<CML.Certificate, CertificateError>;
```

Added in v2.0.0

## newRegCert

Static method newRegCert of Certificate

**Signature**

```ts
export declare const newRegCert: (
  stakeCredential: CML.Credential,
  deposit: bigint,
) => Effect.Effect<CML.Certificate, CertificateError>;
```

Added in v2.0.0

## newRegDrepCert

Static method newRegDrepCert of Certificate

**Signature**

```ts
export declare const newRegDrepCert: (
  drepCredential: CML.Credential,
  deposit: bigint,
  anchor: CML.Anchor,
) => Effect.Effect<CML.Certificate, CertificateError>;
```

Added in v2.0.0

## newResignCommitteeColdCert

Static method newResignCommitteeColdCert of Certificate

**Signature**

```ts
export declare const newResignCommitteeColdCert: (
  committeeColdCredential: CML.Credential,
  anchor: CML.Anchor,
) => Effect.Effect<CML.Certificate, CertificateError>;
```

Added in v2.0.0

## newStakeDelegation

Static method newStakeDelegation of Certificate

**Signature**

```ts
export declare const newStakeDelegation: (
  stakeCredential: CML.Credential,
  pool: CML.Ed25519KeyHash,
) => Effect.Effect<CML.Certificate, CertificateError>;
```

Added in v2.0.0

## newStakeDeregistration

Static method newStakeDeregistration of Certificate

**Signature**

```ts
export declare const newStakeDeregistration: (
  stakeCredential: CML.Credential,
) => Effect.Effect<CML.Certificate, CertificateError>;
```

Added in v2.0.0

## newStakeRegDelegCert

Static method newStakeRegDelegCert of Certificate

**Signature**

```ts
export declare const newStakeRegDelegCert: (
  stakeCredential: CML.Credential,
  pool: CML.Ed25519KeyHash,
  deposit: bigint,
) => Effect.Effect<CML.Certificate, CertificateError>;
```

Added in v2.0.0

## newStakeRegistration

Static method newStakeRegistration of Certificate

**Signature**

```ts
export declare const newStakeRegistration: (
  stakeCredential: CML.Credential,
) => Effect.Effect<CML.Certificate, CertificateError>;
```

Added in v2.0.0

## newStakeVoteDelegCert

Static method newStakeVoteDelegCert of Certificate

**Signature**

```ts
export declare const newStakeVoteDelegCert: (
  stakeCredential: CML.Credential,
  pool: CML.Ed25519KeyHash,
  dRep: CML.DRep,
) => Effect.Effect<CML.Certificate, CertificateError>;
```

Added in v2.0.0

## newStakeVoteRegDelegCert

Static method newStakeVoteRegDelegCert of Certificate

**Signature**

```ts
export declare const newStakeVoteRegDelegCert: (
  stakeCredential: CML.Credential,
  pool: CML.Ed25519KeyHash,
  dRep: CML.DRep,
  deposit: bigint,
) => Effect.Effect<CML.Certificate, CertificateError>;
```

Added in v2.0.0

## newUnregCert

Static method newUnregCert of Certificate

**Signature**

```ts
export declare const newUnregCert: (
  stakeCredential: CML.Credential,
  deposit: bigint,
) => Effect.Effect<CML.Certificate, CertificateError>;
```

Added in v2.0.0

## newUnregDrepCert

Static method newUnregDrepCert of Certificate

**Signature**

```ts
export declare const newUnregDrepCert: (
  drepCredential: CML.Credential,
  deposit: bigint,
) => Effect.Effect<CML.Certificate, CertificateError>;
```

Added in v2.0.0

## newUpdateDrepCert

Static method newUpdateDrepCert of Certificate

**Signature**

```ts
export declare const newUpdateDrepCert: (
  drepCredential: CML.Credential,
  anchor: CML.Anchor,
) => Effect.Effect<CML.Certificate, CertificateError>;
```

Added in v2.0.0

## newVoteDelegCert

Static method newVoteDelegCert of Certificate

**Signature**

```ts
export declare const newVoteDelegCert: (
  stakeCredential: CML.Credential,
  dRep: CML.DRep,
) => Effect.Effect<CML.Certificate, CertificateError>;
```

Added in v2.0.0

## newVoteRegDelegCert

Static method newVoteRegDelegCert of Certificate

**Signature**

```ts
export declare const newVoteRegDelegCert: (
  stakeCredential: CML.Credential,
  dRep: CML.DRep,
  deposit: bigint,
) => Effect.Effect<CML.Certificate, CertificateError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## fromCborBytesUnsafe

Unsafely calls Certificate.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (
  cborBytes: Uint8Array,
) => CML.Certificate;
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls Certificate.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.Certificate;
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls Certificate.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.Certificate;
```

Added in v2.0.0

## newAuthCommitteeHotCertUnsafe

Unsafely calls Certificate.newAuthCommitteeHotCert without Effect wrapper

**Signature**

```ts
export declare const newAuthCommitteeHotCertUnsafe: (
  committeeColdCredential: CML.Credential,
  committeeHotCredential: CML.Credential,
) => CML.Certificate;
```

Added in v2.0.0

## newPoolRegistrationUnsafe

Unsafely calls Certificate.newPoolRegistration without Effect wrapper

**Signature**

```ts
export declare const newPoolRegistrationUnsafe: (
  poolParams: CML.PoolParams,
) => CML.Certificate;
```

Added in v2.0.0

## newPoolRetirementUnsafe

Unsafely calls Certificate.newPoolRetirement without Effect wrapper

**Signature**

```ts
export declare const newPoolRetirementUnsafe: (
  pool: CML.Ed25519KeyHash,
  epoch: bigint,
) => CML.Certificate;
```

Added in v2.0.0

## newRegCertUnsafe

Unsafely calls Certificate.newRegCert without Effect wrapper

**Signature**

```ts
export declare const newRegCertUnsafe: (
  stakeCredential: CML.Credential,
  deposit: bigint,
) => CML.Certificate;
```

Added in v2.0.0

## newRegDrepCertUnsafe

Unsafely calls Certificate.newRegDrepCert without Effect wrapper

**Signature**

```ts
export declare const newRegDrepCertUnsafe: (
  drepCredential: CML.Credential,
  deposit: bigint,
  anchor: CML.Anchor,
) => CML.Certificate;
```

Added in v2.0.0

## newResignCommitteeColdCertUnsafe

Unsafely calls Certificate.newResignCommitteeColdCert without Effect wrapper

**Signature**

```ts
export declare const newResignCommitteeColdCertUnsafe: (
  committeeColdCredential: CML.Credential,
  anchor: CML.Anchor,
) => CML.Certificate;
```

Added in v2.0.0

## newStakeDelegationUnsafe

Unsafely calls Certificate.newStakeDelegation without Effect wrapper

**Signature**

```ts
export declare const newStakeDelegationUnsafe: (
  stakeCredential: CML.Credential,
  pool: CML.Ed25519KeyHash,
) => CML.Certificate;
```

Added in v2.0.0

## newStakeDeregistrationUnsafe

Unsafely calls Certificate.newStakeDeregistration without Effect wrapper

**Signature**

```ts
export declare const newStakeDeregistrationUnsafe: (
  stakeCredential: CML.Credential,
) => CML.Certificate;
```

Added in v2.0.0

## newStakeRegDelegCertUnsafe

Unsafely calls Certificate.newStakeRegDelegCert without Effect wrapper

**Signature**

```ts
export declare const newStakeRegDelegCertUnsafe: (
  stakeCredential: CML.Credential,
  pool: CML.Ed25519KeyHash,
  deposit: bigint,
) => CML.Certificate;
```

Added in v2.0.0

## newStakeRegistrationUnsafe

Unsafely calls Certificate.newStakeRegistration without Effect wrapper

**Signature**

```ts
export declare const newStakeRegistrationUnsafe: (
  stakeCredential: CML.Credential,
) => CML.Certificate;
```

Added in v2.0.0

## newStakeVoteDelegCertUnsafe

Unsafely calls Certificate.newStakeVoteDelegCert without Effect wrapper

**Signature**

```ts
export declare const newStakeVoteDelegCertUnsafe: (
  stakeCredential: CML.Credential,
  pool: CML.Ed25519KeyHash,
  dRep: CML.DRep,
) => CML.Certificate;
```

Added in v2.0.0

## newStakeVoteRegDelegCertUnsafe

Unsafely calls Certificate.newStakeVoteRegDelegCert without Effect wrapper

**Signature**

```ts
export declare const newStakeVoteRegDelegCertUnsafe: (
  stakeCredential: CML.Credential,
  pool: CML.Ed25519KeyHash,
  dRep: CML.DRep,
  deposit: bigint,
) => CML.Certificate;
```

Added in v2.0.0

## newUnregCertUnsafe

Unsafely calls Certificate.newUnregCert without Effect wrapper

**Signature**

```ts
export declare const newUnregCertUnsafe: (
  stakeCredential: CML.Credential,
  deposit: bigint,
) => CML.Certificate;
```

Added in v2.0.0

## newUnregDrepCertUnsafe

Unsafely calls Certificate.newUnregDrepCert without Effect wrapper

**Signature**

```ts
export declare const newUnregDrepCertUnsafe: (
  drepCredential: CML.Credential,
  deposit: bigint,
) => CML.Certificate;
```

Added in v2.0.0

## newUpdateDrepCertUnsafe

Unsafely calls Certificate.newUpdateDrepCert without Effect wrapper

**Signature**

```ts
export declare const newUpdateDrepCertUnsafe: (
  drepCredential: CML.Credential,
  anchor: CML.Anchor,
) => CML.Certificate;
```

Added in v2.0.0

## newVoteDelegCertUnsafe

Unsafely calls Certificate.newVoteDelegCert without Effect wrapper

**Signature**

```ts
export declare const newVoteDelegCertUnsafe: (
  stakeCredential: CML.Credential,
  dRep: CML.DRep,
) => CML.Certificate;
```

Added in v2.0.0

## newVoteRegDelegCertUnsafe

Unsafely calls Certificate.newVoteRegDelegCert without Effect wrapper

**Signature**

```ts
export declare const newVoteRegDelegCertUnsafe: (
  stakeCredential: CML.Credential,
  dRep: CML.DRep,
  deposit: bigint,
) => CML.Certificate;
```

Added in v2.0.0

# Errors

## CertificateError (class)

Error class for Certificate operations

This error is thrown when operations on Certificate instances fail.

**Signature**

```ts
export declare class CertificateError
```

Added in v2.0.0

# Methods

## asAuthCommitteeHotCert

Method asAuthCommitteeHotCert of Certificate

**Signature**

```ts
export declare const asAuthCommitteeHotCert: (
  instance: CML.Certificate,
) => Effect.Effect<CML.AuthCommitteeHotCert | undefined, CertificateError>;
```

Added in v2.0.0

## asPoolRegistration

Method asPoolRegistration of Certificate

**Signature**

```ts
export declare const asPoolRegistration: (
  instance: CML.Certificate,
) => Effect.Effect<CML.PoolRegistration | undefined, CertificateError>;
```

Added in v2.0.0

## asPoolRetirement

Method asPoolRetirement of Certificate

**Signature**

```ts
export declare const asPoolRetirement: (
  instance: CML.Certificate,
) => Effect.Effect<CML.PoolRetirement | undefined, CertificateError>;
```

Added in v2.0.0

## asRegCert

Method asRegCert of Certificate

**Signature**

```ts
export declare const asRegCert: (
  instance: CML.Certificate,
) => Effect.Effect<CML.RegCert | undefined, CertificateError>;
```

Added in v2.0.0

## asRegDrepCert

Method asRegDrepCert of Certificate

**Signature**

```ts
export declare const asRegDrepCert: (
  instance: CML.Certificate,
) => Effect.Effect<CML.RegDrepCert | undefined, CertificateError>;
```

Added in v2.0.0

## asResignCommitteeColdCert

Method asResignCommitteeColdCert of Certificate

**Signature**

```ts
export declare const asResignCommitteeColdCert: (
  instance: CML.Certificate,
) => Effect.Effect<CML.ResignCommitteeColdCert | undefined, CertificateError>;
```

Added in v2.0.0

## asStakeDelegation

Method asStakeDelegation of Certificate

**Signature**

```ts
export declare const asStakeDelegation: (
  instance: CML.Certificate,
) => Effect.Effect<CML.StakeDelegation | undefined, CertificateError>;
```

Added in v2.0.0

## asStakeDeregistration

Method asStakeDeregistration of Certificate

**Signature**

```ts
export declare const asStakeDeregistration: (
  instance: CML.Certificate,
) => Effect.Effect<CML.StakeDeregistration | undefined, CertificateError>;
```

Added in v2.0.0

## asStakeRegDelegCert

Method asStakeRegDelegCert of Certificate

**Signature**

```ts
export declare const asStakeRegDelegCert: (
  instance: CML.Certificate,
) => Effect.Effect<CML.StakeRegDelegCert | undefined, CertificateError>;
```

Added in v2.0.0

## asStakeRegistration

Method asStakeRegistration of Certificate

**Signature**

```ts
export declare const asStakeRegistration: (
  instance: CML.Certificate,
) => Effect.Effect<CML.StakeRegistration | undefined, CertificateError>;
```

Added in v2.0.0

## asStakeVoteDelegCert

Method asStakeVoteDelegCert of Certificate

**Signature**

```ts
export declare const asStakeVoteDelegCert: (
  instance: CML.Certificate,
) => Effect.Effect<CML.StakeVoteDelegCert | undefined, CertificateError>;
```

Added in v2.0.0

## asStakeVoteRegDelegCert

Method asStakeVoteRegDelegCert of Certificate

**Signature**

```ts
export declare const asStakeVoteRegDelegCert: (
  instance: CML.Certificate,
) => Effect.Effect<CML.StakeVoteRegDelegCert | undefined, CertificateError>;
```

Added in v2.0.0

## asUnregCert

Method asUnregCert of Certificate

**Signature**

```ts
export declare const asUnregCert: (
  instance: CML.Certificate,
) => Effect.Effect<CML.UnregCert | undefined, CertificateError>;
```

Added in v2.0.0

## asUnregDrepCert

Method asUnregDrepCert of Certificate

**Signature**

```ts
export declare const asUnregDrepCert: (
  instance: CML.Certificate,
) => Effect.Effect<CML.UnregDrepCert | undefined, CertificateError>;
```

Added in v2.0.0

## asUpdateDrepCert

Method asUpdateDrepCert of Certificate

**Signature**

```ts
export declare const asUpdateDrepCert: (
  instance: CML.Certificate,
) => Effect.Effect<CML.UpdateDrepCert | undefined, CertificateError>;
```

Added in v2.0.0

## asVoteDelegCert

Method asVoteDelegCert of Certificate

**Signature**

```ts
export declare const asVoteDelegCert: (
  instance: CML.Certificate,
) => Effect.Effect<CML.VoteDelegCert | undefined, CertificateError>;
```

Added in v2.0.0

## asVoteRegDelegCert

Method asVoteRegDelegCert of Certificate

**Signature**

```ts
export declare const asVoteRegDelegCert: (
  instance: CML.Certificate,
) => Effect.Effect<CML.VoteRegDelegCert | undefined, CertificateError>;
```

Added in v2.0.0

## free

Method free of Certificate

**Signature**

```ts
export declare const free: (
  instance: CML.Certificate,
) => Effect.Effect<void, CertificateError>;
```

Added in v2.0.0

## kind

Method kind of Certificate

**Signature**

```ts
export declare const kind: (
  instance: CML.Certificate,
) => Effect.Effect<CML.CertificateKind, CertificateError>;
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of Certificate

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.Certificate,
) => Effect.Effect<Uint8Array, CertificateError>;
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of Certificate

**Signature**

```ts
export declare const toCanonicalCborHex: (
  instance: CML.Certificate,
) => Effect.Effect<string, CertificateError>;
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of Certificate

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.Certificate,
) => Effect.Effect<Uint8Array, CertificateError>;
```

Added in v2.0.0

## toCborHex

Method toCborHex of Certificate

**Signature**

```ts
export declare const toCborHex: (
  instance: CML.Certificate,
) => Effect.Effect<string, CertificateError>;
```

Added in v2.0.0

## toJsValue

Method toJsValue of Certificate

**Signature**

```ts
export declare const toJsValue: (
  instance: CML.Certificate,
) => Effect.Effect<any, CertificateError>;
```

Added in v2.0.0

## toJson

Method toJson of Certificate

**Signature**

```ts
export declare const toJson: (
  instance: CML.Certificate,
) => Effect.Effect<string, CertificateError>;
```

Added in v2.0.0

# MethodsUnsafe

## asAuthCommitteeHotCertUnsafe

Unsafely calls instance.asAuthCommitteeHotCert without Effect wrapper

**Signature**

```ts
export declare const asAuthCommitteeHotCertUnsafe: (
  instance: CML.Certificate,
) => CML.AuthCommitteeHotCert | undefined;
```

Added in v2.0.0

## asPoolRegistrationUnsafe

Unsafely calls instance.asPoolRegistration without Effect wrapper

**Signature**

```ts
export declare const asPoolRegistrationUnsafe: (
  instance: CML.Certificate,
) => CML.PoolRegistration | undefined;
```

Added in v2.0.0

## asPoolRetirementUnsafe

Unsafely calls instance.asPoolRetirement without Effect wrapper

**Signature**

```ts
export declare const asPoolRetirementUnsafe: (
  instance: CML.Certificate,
) => CML.PoolRetirement | undefined;
```

Added in v2.0.0

## asRegCertUnsafe

Unsafely calls instance.asRegCert without Effect wrapper

**Signature**

```ts
export declare const asRegCertUnsafe: (
  instance: CML.Certificate,
) => CML.RegCert | undefined;
```

Added in v2.0.0

## asRegDrepCertUnsafe

Unsafely calls instance.asRegDrepCert without Effect wrapper

**Signature**

```ts
export declare const asRegDrepCertUnsafe: (
  instance: CML.Certificate,
) => CML.RegDrepCert | undefined;
```

Added in v2.0.0

## asResignCommitteeColdCertUnsafe

Unsafely calls instance.asResignCommitteeColdCert without Effect wrapper

**Signature**

```ts
export declare const asResignCommitteeColdCertUnsafe: (
  instance: CML.Certificate,
) => CML.ResignCommitteeColdCert | undefined;
```

Added in v2.0.0

## asStakeDelegationUnsafe

Unsafely calls instance.asStakeDelegation without Effect wrapper

**Signature**

```ts
export declare const asStakeDelegationUnsafe: (
  instance: CML.Certificate,
) => CML.StakeDelegation | undefined;
```

Added in v2.0.0

## asStakeDeregistrationUnsafe

Unsafely calls instance.asStakeDeregistration without Effect wrapper

**Signature**

```ts
export declare const asStakeDeregistrationUnsafe: (
  instance: CML.Certificate,
) => CML.StakeDeregistration | undefined;
```

Added in v2.0.0

## asStakeRegDelegCertUnsafe

Unsafely calls instance.asStakeRegDelegCert without Effect wrapper

**Signature**

```ts
export declare const asStakeRegDelegCertUnsafe: (
  instance: CML.Certificate,
) => CML.StakeRegDelegCert | undefined;
```

Added in v2.0.0

## asStakeRegistrationUnsafe

Unsafely calls instance.asStakeRegistration without Effect wrapper

**Signature**

```ts
export declare const asStakeRegistrationUnsafe: (
  instance: CML.Certificate,
) => CML.StakeRegistration | undefined;
```

Added in v2.0.0

## asStakeVoteDelegCertUnsafe

Unsafely calls instance.asStakeVoteDelegCert without Effect wrapper

**Signature**

```ts
export declare const asStakeVoteDelegCertUnsafe: (
  instance: CML.Certificate,
) => CML.StakeVoteDelegCert | undefined;
```

Added in v2.0.0

## asStakeVoteRegDelegCertUnsafe

Unsafely calls instance.asStakeVoteRegDelegCert without Effect wrapper

**Signature**

```ts
export declare const asStakeVoteRegDelegCertUnsafe: (
  instance: CML.Certificate,
) => CML.StakeVoteRegDelegCert | undefined;
```

Added in v2.0.0

## asUnregCertUnsafe

Unsafely calls instance.asUnregCert without Effect wrapper

**Signature**

```ts
export declare const asUnregCertUnsafe: (
  instance: CML.Certificate,
) => CML.UnregCert | undefined;
```

Added in v2.0.0

## asUnregDrepCertUnsafe

Unsafely calls instance.asUnregDrepCert without Effect wrapper

**Signature**

```ts
export declare const asUnregDrepCertUnsafe: (
  instance: CML.Certificate,
) => CML.UnregDrepCert | undefined;
```

Added in v2.0.0

## asUpdateDrepCertUnsafe

Unsafely calls instance.asUpdateDrepCert without Effect wrapper

**Signature**

```ts
export declare const asUpdateDrepCertUnsafe: (
  instance: CML.Certificate,
) => CML.UpdateDrepCert | undefined;
```

Added in v2.0.0

## asVoteDelegCertUnsafe

Unsafely calls instance.asVoteDelegCert without Effect wrapper

**Signature**

```ts
export declare const asVoteDelegCertUnsafe: (
  instance: CML.Certificate,
) => CML.VoteDelegCert | undefined;
```

Added in v2.0.0

## asVoteRegDelegCertUnsafe

Unsafely calls instance.asVoteRegDelegCert without Effect wrapper

**Signature**

```ts
export declare const asVoteRegDelegCertUnsafe: (
  instance: CML.Certificate,
) => CML.VoteRegDelegCert | undefined;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.Certificate) => void;
```

Added in v2.0.0

## kindUnsafe

Unsafely calls instance.kind without Effect wrapper

**Signature**

```ts
export declare const kindUnsafe: (
  instance: CML.Certificate,
) => CML.CertificateKind;
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (
  instance: CML.Certificate,
) => Uint8Array;
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (
  instance: CML.Certificate,
) => string;
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (
  instance: CML.Certificate,
) => Uint8Array;
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.Certificate) => string;
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.Certificate) => any;
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.Certificate) => string;
```

Added in v2.0.0

# Types

## Certificate (type alias)

Type alias for the CML Certificate class

**Signature**

```ts
export type Certificate = CML.Certificate;
```

Added in v2.0.0
