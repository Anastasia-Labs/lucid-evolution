---
title: CML/ProposalBuilder.ts
nav_order: 175
parent: Modules
---

## ProposalBuilder overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
- [Errors](#errors)
  - [ProposalBuilderError (class)](#proposalbuildererror-class)
- [Methods](#methods)
  - [build](#build)
  - [free](#free)
  - [withNativeScriptProposal](#withnativescriptproposal)
  - [withPlutusProposal](#withplutusproposal)
  - [withPlutusProposalInlineDatum](#withplutusproposalinlinedatum)
  - [withProposal](#withproposal)
- [MethodsUnsafe](#methodsunsafe)
  - [buildUnsafe](#buildunsafe)
  - [freeUnsafe](#freeunsafe)
  - [withNativeScriptProposalUnsafe](#withnativescriptproposalunsafe)
  - [withPlutusProposalInlineDatumUnsafe](#withplutusproposalinlinedatumunsafe)
  - [withPlutusProposalUnsafe](#withplutusproposalunsafe)
  - [withProposalUnsafe](#withproposalunsafe)
- [Types](#types)
  - [ProposalBuilder (type alias)](#proposalbuilder-type-alias)

---

# Constructors

## \_new

Static method \_new of ProposalBuilder

**Signature**

```ts
export declare const _new: () => Effect.Effect<CML.ProposalBuilder, ProposalBuilderError>
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls ProposalBuilder.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: () => CML.ProposalBuilder
```

Added in v2.0.0

# Errors

## ProposalBuilderError (class)

Error class for ProposalBuilder operations

This error is thrown when operations on ProposalBuilder instances fail.

**Signature**

```ts
export declare class ProposalBuilderError
```

Added in v2.0.0

# Methods

## build

Method build of ProposalBuilder

**Signature**

```ts
export declare const build: (
  instance: CML.ProposalBuilder
) => Effect.Effect<CML.ProposalBuilderResult, ProposalBuilderError>
```

Added in v2.0.0

## free

Method free of ProposalBuilder

**Signature**

```ts
export declare const free: (instance: CML.ProposalBuilder) => Effect.Effect<void, ProposalBuilderError>
```

Added in v2.0.0

## withNativeScriptProposal

Method withNativeScriptProposal of ProposalBuilder

**Signature**

```ts
export declare const withNativeScriptProposal: (
  instance: CML.ProposalBuilder,
  proposal: CML.ProposalProcedure,
  nativeScript: CML.NativeScript,
  witnessInfo: CML.NativeScriptWitnessInfo
) => Effect.Effect<CML.ProposalBuilder, ProposalBuilderError>
```

Added in v2.0.0

## withPlutusProposal

Method withPlutusProposal of ProposalBuilder

**Signature**

```ts
export declare const withPlutusProposal: (
  instance: CML.ProposalBuilder,
  proposal: CML.ProposalProcedure,
  partialWitness: CML.PartialPlutusWitness,
  requiredSigners: CML.Ed25519KeyHashList,
  datum: CML.PlutusData
) => Effect.Effect<CML.ProposalBuilder, ProposalBuilderError>
```

Added in v2.0.0

## withPlutusProposalInlineDatum

Method withPlutusProposalInlineDatum of ProposalBuilder

**Signature**

```ts
export declare const withPlutusProposalInlineDatum: (
  instance: CML.ProposalBuilder,
  proposal: CML.ProposalProcedure,
  partialWitness: CML.PartialPlutusWitness,
  requiredSigners: CML.Ed25519KeyHashList
) => Effect.Effect<CML.ProposalBuilder, ProposalBuilderError>
```

Added in v2.0.0

## withProposal

Method withProposal of ProposalBuilder

**Signature**

```ts
export declare const withProposal: (
  instance: CML.ProposalBuilder,
  proposal: CML.ProposalProcedure
) => Effect.Effect<CML.ProposalBuilder, ProposalBuilderError>
```

Added in v2.0.0

# MethodsUnsafe

## buildUnsafe

Unsafely calls instance.build without Effect wrapper

**Signature**

```ts
export declare const buildUnsafe: (instance: CML.ProposalBuilder) => CML.ProposalBuilderResult
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.ProposalBuilder) => void
```

Added in v2.0.0

## withNativeScriptProposalUnsafe

Unsafely calls instance.withNativeScriptProposal without Effect wrapper

**Signature**

```ts
export declare const withNativeScriptProposalUnsafe: (
  instance: CML.ProposalBuilder,
  proposal: CML.ProposalProcedure,
  nativeScript: CML.NativeScript,
  witnessInfo: CML.NativeScriptWitnessInfo
) => CML.ProposalBuilder
```

Added in v2.0.0

## withPlutusProposalInlineDatumUnsafe

Unsafely calls instance.withPlutusProposalInlineDatum without Effect wrapper

**Signature**

```ts
export declare const withPlutusProposalInlineDatumUnsafe: (
  instance: CML.ProposalBuilder,
  proposal: CML.ProposalProcedure,
  partialWitness: CML.PartialPlutusWitness,
  requiredSigners: CML.Ed25519KeyHashList
) => CML.ProposalBuilder
```

Added in v2.0.0

## withPlutusProposalUnsafe

Unsafely calls instance.withPlutusProposal without Effect wrapper

**Signature**

```ts
export declare const withPlutusProposalUnsafe: (
  instance: CML.ProposalBuilder,
  proposal: CML.ProposalProcedure,
  partialWitness: CML.PartialPlutusWitness,
  requiredSigners: CML.Ed25519KeyHashList,
  datum: CML.PlutusData
) => CML.ProposalBuilder
```

Added in v2.0.0

## withProposalUnsafe

Unsafely calls instance.withProposal without Effect wrapper

**Signature**

```ts
export declare const withProposalUnsafe: (
  instance: CML.ProposalBuilder,
  proposal: CML.ProposalProcedure
) => CML.ProposalBuilder
```

Added in v2.0.0

# Types

## ProposalBuilder (type alias)

Type alias for the CML ProposalBuilder class

**Signature**

```ts
export type ProposalBuilder = CML.ProposalBuilder
```

Added in v2.0.0
