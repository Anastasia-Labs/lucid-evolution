---
title: TransactionInput.ts
nav_order: 307
parent: Modules
---

## TransactionInput overview

---

<h2 class="text-delta">Table of contents</h2>

- [encoding/decoding](#encodingdecoding)
  - [CBORHex](#cborhex)
- [equality](#equality)
  - [equals](#equals)
- [errors](#errors)
  - [TransactionInputError (class)](#transactioninputerror-class)
- [predicates](#predicates)
  - [isTransactionInput](#istransactioninput)
- [schemas](#schemas)
  - [TransactionInput (class)](#transactioninput-class)
    - [[Inspectable.NodeInspectSymbol] (method)](#inspectablenodeinspectsymbol-method)
- [utils](#utils)
  - [generator](#generator)

---

# encoding/decoding

## CBORHex

Schema for transforming between CBOR hex and TransactionInput

**Signature**

```ts
export declare const CBORHex: Schema.transformOrFail<
  Schema.SchemaClass<string & Brand<"HexString">, string & Brand<"HexString">, never>,
  typeof TransactionInput,
  never
>
```

Added in v2.0.0

# equality

## equals

Check if two TransactionInput instances are equal.

**Signature**

```ts
export declare const equals: (a: TransactionInput, b: TransactionInput) => boolean
```

Added in v2.0.0

# errors

## TransactionInputError (class)

Error thrown when transaction input operations fail

**Signature**

```ts
export declare class TransactionInputError
```

Added in v2.0.0

# predicates

## isTransactionInput

Check if the given value is a valid TransactionInput

**Signature**

```ts
export declare const isTransactionInput: (u: unknown, overrideOptions?: ParseOptions | number) => u is TransactionInput
```

Added in v2.0.0

# schemas

## TransactionInput (class)

Transaction input with transaction id and index

**Signature**

```ts
export declare class TransactionInput
```

Added in v2.0.0

### [Inspectable.NodeInspectSymbol] (method)

**Signature**

```ts
;[Inspectable.NodeInspectSymbol]()
```

# utils

## generator

**Signature**

```ts
export declare const generator: FastCheck.Arbitrary<TransactionInput>
```
