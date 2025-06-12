---
title: CML/RedeemerSetBuilder.ts
nav_order: 186
parent: Modules
---

## RedeemerSetBuilder overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
- [Errors](#errors)
  - [RedeemerSetBuilderError (class)](#redeemersetbuildererror-class)
- [Methods](#methods)
  - [addCert](#addcert)
  - [addMint](#addmint)
  - [addProposal](#addproposal)
  - [addReward](#addreward)
  - [addSpend](#addspend)
  - [addVote](#addvote)
  - [build](#build)
  - [free](#free)
  - [isEmpty](#isempty)
  - [updateExUnits](#updateexunits)
- [MethodsUnsafe](#methodsunsafe)
  - [addCertUnsafe](#addcertunsafe)
  - [addMintUnsafe](#addmintunsafe)
  - [addProposalUnsafe](#addproposalunsafe)
  - [addRewardUnsafe](#addrewardunsafe)
  - [addSpendUnsafe](#addspendunsafe)
  - [addVoteUnsafe](#addvoteunsafe)
  - [buildUnsafe](#buildunsafe)
  - [freeUnsafe](#freeunsafe)
  - [isEmptyUnsafe](#isemptyunsafe)
  - [updateExUnitsUnsafe](#updateexunitsunsafe)
- [Types](#types)
  - [RedeemerSetBuilder (type alias)](#redeemersetbuilder-type-alias)

---

# Constructors

## \_new

Static method \_new of RedeemerSetBuilder

**Signature**

```ts
export declare const _new: () => Effect.Effect<
  CML.RedeemerSetBuilder,
  RedeemerSetBuilderError
>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls RedeemerSetBuilder.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: () => CML.RedeemerSetBuilder;
```

Added in v2.0.0

# Errors

## RedeemerSetBuilderError (class)

Error class for RedeemerSetBuilder operations

This error is thrown when operations on RedeemerSetBuilder instances fail.

**Signature**

```ts
export declare class RedeemerSetBuilderError
```

Added in v2.0.0

# Methods

## addCert

Method addCert of RedeemerSetBuilder

**Signature**

```ts
export declare const addCert: (
  instance: CML.RedeemerSetBuilder,
  result: CML.CertificateBuilderResult,
) => Effect.Effect<void, RedeemerSetBuilderError>;
```

Added in v2.0.0

## addMint

Method addMint of RedeemerSetBuilder

**Signature**

```ts
export declare const addMint: (
  instance: CML.RedeemerSetBuilder,
  result: CML.MintBuilderResult,
) => Effect.Effect<void, RedeemerSetBuilderError>;
```

Added in v2.0.0

## addProposal

Method addProposal of RedeemerSetBuilder

**Signature**

```ts
export declare const addProposal: (
  instance: CML.RedeemerSetBuilder,
  result: CML.ProposalBuilderResult,
) => Effect.Effect<void, RedeemerSetBuilderError>;
```

Added in v2.0.0

## addReward

Method addReward of RedeemerSetBuilder

**Signature**

```ts
export declare const addReward: (
  instance: CML.RedeemerSetBuilder,
  result: CML.WithdrawalBuilderResult,
) => Effect.Effect<void, RedeemerSetBuilderError>;
```

Added in v2.0.0

## addSpend

Method addSpend of RedeemerSetBuilder

**Signature**

```ts
export declare const addSpend: (
  instance: CML.RedeemerSetBuilder,
  result: CML.InputBuilderResult,
) => Effect.Effect<void, RedeemerSetBuilderError>;
```

Added in v2.0.0

## addVote

Method addVote of RedeemerSetBuilder

**Signature**

```ts
export declare const addVote: (
  instance: CML.RedeemerSetBuilder,
  result: CML.VoteBuilderResult,
) => Effect.Effect<void, RedeemerSetBuilderError>;
```

Added in v2.0.0

## build

Method build of RedeemerSetBuilder

**Signature**

```ts
export declare const build: (
  instance: CML.RedeemerSetBuilder,
  defaultToDummyExunits: boolean,
) => Effect.Effect<CML.Redeemers, RedeemerSetBuilderError>;
```

Added in v2.0.0

## free

Method free of RedeemerSetBuilder

**Signature**

```ts
export declare const free: (
  instance: CML.RedeemerSetBuilder,
) => Effect.Effect<void, RedeemerSetBuilderError>;
```

Added in v2.0.0

## isEmpty

Method isEmpty of RedeemerSetBuilder

**Signature**

```ts
export declare const isEmpty: (
  instance: CML.RedeemerSetBuilder,
) => Effect.Effect<boolean, RedeemerSetBuilderError>;
```

Added in v2.0.0

## updateExUnits

Method updateExUnits of RedeemerSetBuilder

**Signature**

```ts
export declare const updateExUnits: (
  instance: CML.RedeemerSetBuilder,
  key: CML.RedeemerWitnessKey,
  exUnits: CML.ExUnits,
) => Effect.Effect<void, RedeemerSetBuilderError>;
```

Added in v2.0.0

# MethodsUnsafe

## addCertUnsafe

Unsafely calls instance.addCert without Effect wrapper

**Signature**

```ts
export declare const addCertUnsafe: (
  instance: CML.RedeemerSetBuilder,
  result: CML.CertificateBuilderResult,
) => void;
```

Added in v2.0.0

## addMintUnsafe

Unsafely calls instance.addMint without Effect wrapper

**Signature**

```ts
export declare const addMintUnsafe: (
  instance: CML.RedeemerSetBuilder,
  result: CML.MintBuilderResult,
) => void;
```

Added in v2.0.0

## addProposalUnsafe

Unsafely calls instance.addProposal without Effect wrapper

**Signature**

```ts
export declare const addProposalUnsafe: (
  instance: CML.RedeemerSetBuilder,
  result: CML.ProposalBuilderResult,
) => void;
```

Added in v2.0.0

## addRewardUnsafe

Unsafely calls instance.addReward without Effect wrapper

**Signature**

```ts
export declare const addRewardUnsafe: (
  instance: CML.RedeemerSetBuilder,
  result: CML.WithdrawalBuilderResult,
) => void;
```

Added in v2.0.0

## addSpendUnsafe

Unsafely calls instance.addSpend without Effect wrapper

**Signature**

```ts
export declare const addSpendUnsafe: (
  instance: CML.RedeemerSetBuilder,
  result: CML.InputBuilderResult,
) => void;
```

Added in v2.0.0

## addVoteUnsafe

Unsafely calls instance.addVote without Effect wrapper

**Signature**

```ts
export declare const addVoteUnsafe: (
  instance: CML.RedeemerSetBuilder,
  result: CML.VoteBuilderResult,
) => void;
```

Added in v2.0.0

## buildUnsafe

Unsafely calls instance.build without Effect wrapper

**Signature**

```ts
export declare const buildUnsafe: (
  instance: CML.RedeemerSetBuilder,
  defaultToDummyExunits: boolean,
) => CML.Redeemers;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.RedeemerSetBuilder) => void;
```

Added in v2.0.0

## isEmptyUnsafe

Unsafely calls instance.isEmpty without Effect wrapper

**Signature**

```ts
export declare const isEmptyUnsafe: (
  instance: CML.RedeemerSetBuilder,
) => boolean;
```

Added in v2.0.0

## updateExUnitsUnsafe

Unsafely calls instance.updateExUnits without Effect wrapper

**Signature**

```ts
export declare const updateExUnitsUnsafe: (
  instance: CML.RedeemerSetBuilder,
  key: CML.RedeemerWitnessKey,
  exUnits: CML.ExUnits,
) => void;
```

Added in v2.0.0

# Types

## RedeemerSetBuilder (type alias)

Type alias for the CML RedeemerSetBuilder class

**Signature**

```ts
export type RedeemerSetBuilder = CML.RedeemerSetBuilder;
```

Added in v2.0.0
