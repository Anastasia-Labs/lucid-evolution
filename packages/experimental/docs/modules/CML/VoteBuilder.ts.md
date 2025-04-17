---
title: CML/VoteBuilder.ts
nav_order: 282
parent: Modules
---

## VoteBuilder overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
- [Errors](#errors)
  - [VoteBuilderError (class)](#votebuildererror-class)
- [Methods](#methods)
  - [build](#build)
  - [free](#free)
  - [withNativeScriptVote](#withnativescriptvote)
  - [withPlutusVote](#withplutusvote)
  - [withPlutusVoteInlineDatum](#withplutusvoteinlinedatum)
  - [withVote](#withvote)
- [MethodsUnsafe](#methodsunsafe)
  - [buildUnsafe](#buildunsafe)
  - [freeUnsafe](#freeunsafe)
  - [withNativeScriptVoteUnsafe](#withnativescriptvoteunsafe)
  - [withPlutusVoteInlineDatumUnsafe](#withplutusvoteinlinedatumunsafe)
  - [withPlutusVoteUnsafe](#withplutusvoteunsafe)
  - [withVoteUnsafe](#withvoteunsafe)
- [Types](#types)
  - [VoteBuilder (type alias)](#votebuilder-type-alias)

---

# Constructors

## \_new

Static method \_new of VoteBuilder

**Signature**

```ts
export declare const _new: () => Effect.Effect<
  CML.VoteBuilder,
  VoteBuilderError
>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls VoteBuilder.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: () => CML.VoteBuilder;
```

Added in v2.0.0

# Errors

## VoteBuilderError (class)

Error class for VoteBuilder operations

This error is thrown when operations on VoteBuilder instances fail.

**Signature**

```ts
export declare class VoteBuilderError
```

Added in v2.0.0

# Methods

## build

Method build of VoteBuilder

**Signature**

```ts
export declare const build: (
  instance: CML.VoteBuilder,
) => Effect.Effect<CML.VoteBuilderResult, VoteBuilderError>;
```

Added in v2.0.0

## free

Method free of VoteBuilder

**Signature**

```ts
export declare const free: (
  instance: CML.VoteBuilder,
) => Effect.Effect<void, VoteBuilderError>;
```

Added in v2.0.0

## withNativeScriptVote

Method withNativeScriptVote of VoteBuilder

**Signature**

```ts
export declare const withNativeScriptVote: (
  instance: CML.VoteBuilder,
  voter: CML.Voter,
  govActionId: CML.GovActionId,
  procedure: CML.VotingProcedure,
  nativeScript: CML.NativeScript,
  witnessInfo: CML.NativeScriptWitnessInfo,
) => Effect.Effect<CML.VoteBuilder, VoteBuilderError>;
```

Added in v2.0.0

## withPlutusVote

Method withPlutusVote of VoteBuilder

**Signature**

```ts
export declare const withPlutusVote: (
  instance: CML.VoteBuilder,
  voter: CML.Voter,
  govActionId: CML.GovActionId,
  procedure: CML.VotingProcedure,
  partialWitness: CML.PartialPlutusWitness,
  requiredSigners: CML.Ed25519KeyHashList,
  datum: CML.PlutusData,
) => Effect.Effect<CML.VoteBuilder, VoteBuilderError>;
```

Added in v2.0.0

## withPlutusVoteInlineDatum

Method withPlutusVoteInlineDatum of VoteBuilder

**Signature**

```ts
export declare const withPlutusVoteInlineDatum: (
  instance: CML.VoteBuilder,
  voter: CML.Voter,
  govActionId: CML.GovActionId,
  procedure: CML.VotingProcedure,
  partialWitness: CML.PartialPlutusWitness,
  requiredSigners: CML.Ed25519KeyHashList,
) => Effect.Effect<CML.VoteBuilder, VoteBuilderError>;
```

Added in v2.0.0

## withVote

Method withVote of VoteBuilder

**Signature**

```ts
export declare const withVote: (
  instance: CML.VoteBuilder,
  voter: CML.Voter,
  govActionId: CML.GovActionId,
  procedure: CML.VotingProcedure,
) => Effect.Effect<CML.VoteBuilder, VoteBuilderError>;
```

Added in v2.0.0

# MethodsUnsafe

## buildUnsafe

Unsafely calls instance.build without Effect wrapper

**Signature**

```ts
export declare const buildUnsafe: (
  instance: CML.VoteBuilder,
) => CML.VoteBuilderResult;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.VoteBuilder) => void;
```

Added in v2.0.0

## withNativeScriptVoteUnsafe

Unsafely calls instance.withNativeScriptVote without Effect wrapper

**Signature**

```ts
export declare const withNativeScriptVoteUnsafe: (
  instance: CML.VoteBuilder,
  voter: CML.Voter,
  govActionId: CML.GovActionId,
  procedure: CML.VotingProcedure,
  nativeScript: CML.NativeScript,
  witnessInfo: CML.NativeScriptWitnessInfo,
) => CML.VoteBuilder;
```

Added in v2.0.0

## withPlutusVoteInlineDatumUnsafe

Unsafely calls instance.withPlutusVoteInlineDatum without Effect wrapper

**Signature**

```ts
export declare const withPlutusVoteInlineDatumUnsafe: (
  instance: CML.VoteBuilder,
  voter: CML.Voter,
  govActionId: CML.GovActionId,
  procedure: CML.VotingProcedure,
  partialWitness: CML.PartialPlutusWitness,
  requiredSigners: CML.Ed25519KeyHashList,
) => CML.VoteBuilder;
```

Added in v2.0.0

## withPlutusVoteUnsafe

Unsafely calls instance.withPlutusVote without Effect wrapper

**Signature**

```ts
export declare const withPlutusVoteUnsafe: (
  instance: CML.VoteBuilder,
  voter: CML.Voter,
  govActionId: CML.GovActionId,
  procedure: CML.VotingProcedure,
  partialWitness: CML.PartialPlutusWitness,
  requiredSigners: CML.Ed25519KeyHashList,
  datum: CML.PlutusData,
) => CML.VoteBuilder;
```

Added in v2.0.0

## withVoteUnsafe

Unsafely calls instance.withVote without Effect wrapper

**Signature**

```ts
export declare const withVoteUnsafe: (
  instance: CML.VoteBuilder,
  voter: CML.Voter,
  govActionId: CML.GovActionId,
  procedure: CML.VotingProcedure,
) => CML.VoteBuilder;
```

Added in v2.0.0

# Types

## VoteBuilder (type alias)

Type alias for the CML VoteBuilder class

**Signature**

```ts
export type VoteBuilder = CML.VoteBuilder;
```

Added in v2.0.0
