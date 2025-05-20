---
title: CML/TransactionOutputBuilder.ts
nav_order: 240
parent: Modules
---

## TransactionOutputBuilder overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
- [Errors](#errors)
  - [TransactionOutputBuilderError (class)](#transactionoutputbuildererror-class)
- [Methods](#methods)
  - [free](#free)
  - [next](#next)
  - [withAddress](#withaddress)
  - [withCommunicationData](#withcommunicationdata)
  - [withData](#withdata)
  - [withReferenceScript](#withreferencescript)
- [MethodsUnsafe](#methodsunsafe)
  - [freeUnsafe](#freeunsafe)
  - [nextUnsafe](#nextunsafe)
  - [withAddressUnsafe](#withaddressunsafe)
  - [withCommunicationDataUnsafe](#withcommunicationdataunsafe)
  - [withDataUnsafe](#withdataunsafe)
  - [withReferenceScriptUnsafe](#withreferencescriptunsafe)
- [Types](#types)
  - [TransactionOutputBuilder (type alias)](#transactionoutputbuilder-type-alias)

---

# Constructors

## \_new

Static method \_new of TransactionOutputBuilder

**Signature**

```ts
export declare const _new: () => Effect.Effect<CML.TransactionOutputBuilder, TransactionOutputBuilderError>
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls TransactionOutputBuilder.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: () => CML.TransactionOutputBuilder
```

Added in v2.0.0

# Errors

## TransactionOutputBuilderError (class)

Error class for TransactionOutputBuilder operations

This error is thrown when operations on TransactionOutputBuilder instances fail.

**Signature**

```ts
export declare class TransactionOutputBuilderError
```

Added in v2.0.0

# Methods

## free

Method free of TransactionOutputBuilder

**Signature**

```ts
export declare const free: (
  instance: CML.TransactionOutputBuilder
) => Effect.Effect<void, TransactionOutputBuilderError>
```

Added in v2.0.0

## next

Method next of TransactionOutputBuilder

**Signature**

```ts
export declare const next: (
  instance: CML.TransactionOutputBuilder
) => Effect.Effect<CML.TransactionOutputAmountBuilder, TransactionOutputBuilderError>
```

Added in v2.0.0

## withAddress

Method withAddress of TransactionOutputBuilder

**Signature**

```ts
export declare const withAddress: (
  instance: CML.TransactionOutputBuilder,
  address: CML.Address
) => Effect.Effect<CML.TransactionOutputBuilder, TransactionOutputBuilderError>
```

Added in v2.0.0

## withCommunicationData

Method withCommunicationData of TransactionOutputBuilder

**Signature**

```ts
export declare const withCommunicationData: (
  instance: CML.TransactionOutputBuilder,
  datum: CML.PlutusData
) => Effect.Effect<CML.TransactionOutputBuilder, TransactionOutputBuilderError>
```

Added in v2.0.0

## withData

Method withData of TransactionOutputBuilder

**Signature**

```ts
export declare const withData: (
  instance: CML.TransactionOutputBuilder,
  datum: CML.DatumOption
) => Effect.Effect<CML.TransactionOutputBuilder, TransactionOutputBuilderError>
```

Added in v2.0.0

## withReferenceScript

Method withReferenceScript of TransactionOutputBuilder

**Signature**

```ts
export declare const withReferenceScript: (
  instance: CML.TransactionOutputBuilder,
  scriptRef: CML.Script
) => Effect.Effect<CML.TransactionOutputBuilder, TransactionOutputBuilderError>
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.TransactionOutputBuilder) => void
```

Added in v2.0.0

## nextUnsafe

Unsafely calls instance.next without Effect wrapper

**Signature**

```ts
export declare const nextUnsafe: (instance: CML.TransactionOutputBuilder) => CML.TransactionOutputAmountBuilder
```

Added in v2.0.0

## withAddressUnsafe

Unsafely calls instance.withAddress without Effect wrapper

**Signature**

```ts
export declare const withAddressUnsafe: (
  instance: CML.TransactionOutputBuilder,
  address: CML.Address
) => CML.TransactionOutputBuilder
```

Added in v2.0.0

## withCommunicationDataUnsafe

Unsafely calls instance.withCommunicationData without Effect wrapper

**Signature**

```ts
export declare const withCommunicationDataUnsafe: (
  instance: CML.TransactionOutputBuilder,
  datum: CML.PlutusData
) => CML.TransactionOutputBuilder
```

Added in v2.0.0

## withDataUnsafe

Unsafely calls instance.withData without Effect wrapper

**Signature**

```ts
export declare const withDataUnsafe: (
  instance: CML.TransactionOutputBuilder,
  datum: CML.DatumOption
) => CML.TransactionOutputBuilder
```

Added in v2.0.0

## withReferenceScriptUnsafe

Unsafely calls instance.withReferenceScript without Effect wrapper

**Signature**

```ts
export declare const withReferenceScriptUnsafe: (
  instance: CML.TransactionOutputBuilder,
  scriptRef: CML.Script
) => CML.TransactionOutputBuilder
```

Added in v2.0.0

# Types

## TransactionOutputBuilder (type alias)

Type alias for the CML TransactionOutputBuilder class

**Signature**

```ts
export type TransactionOutputBuilder = CML.TransactionOutputBuilder
```

Added in v2.0.0
