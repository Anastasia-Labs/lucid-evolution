---
title: TransactionOutput.ts
nav_order: 308
parent: Modules
---

## TransactionOutput overview

---

<h2 class="text-delta">Table of contents</h2>

- [encoding/decoding](#encodingdecoding)
  - [CBORBytes](#cborbytes)
  - [CBORHex](#cborhex)
- [equality](#equality)
  - [equals](#equals)
- [errors](#errors)
  - [TransactionOutputError (class)](#transactionoutputerror-class)
- [generators](#generators)
  - [generator](#generator)
- [predicates](#predicates)
  - [isTransactionOutput](#istransactionoutput)
- [schemas](#schemas)
  - [TransactionOutput](#transactionoutput)

---

# encoding/decoding

## CBORBytes

Schema for transforming between CBOR bytes and TransactionOutput

**Signature**

```ts
export declare const CBORBytes: Schema.transformOrFail<
  Schema.declare<any, any, readonly [], never>,
  Schema.Union<
    [typeof ShelleyTransactionOutput.ShelleyTransactionOutput, typeof BabbageTransactionOutput.BabbageTransactionOutput]
  >,
  never
>
```

Added in v2.0.0

## CBORHex

Schema for transforming between CBOR hex and TransactionOutput

**Signature**

```ts
export declare const CBORHex: Schema.transformOrFail<
  Schema.SchemaClass<string & Brand<"HexString">, string & Brand<"HexString">, never>,
  Schema.Union<
    [typeof ShelleyTransactionOutput.ShelleyTransactionOutput, typeof BabbageTransactionOutput.BabbageTransactionOutput]
  >,
  never
>
```

Added in v2.0.0

# equality

## equals

Check if two TransactionOutput instances are equal.

**Signature**

```ts
export declare const equals: (a: typeof TransactionOutput.Type, b: typeof TransactionOutput.Type) => boolean
```

Added in v2.0.0

# errors

## TransactionOutputError (class)

Error thrown when transaction output operations fail

**Signature**

```ts
export declare class TransactionOutputError
```

Added in v2.0.0

# generators

## generator

Generator for creating random TransactionOutput instances for testing

**Signature**

```ts
export declare const generator: FastCheck.Arbitrary<
  ShelleyTransactionOutput.ShelleyTransactionOutput | BabbageTransactionOutput.BabbageTransactionOutput
>
```

Added in v2.0.0

# predicates

## isTransactionOutput

Check if the given value is a valid TransactionOutput

**Signature**

```ts
export declare const isTransactionOutput: (
  u: unknown,
  overrideOptions?: ParseOptions | number
) => u is ShelleyTransactionOutput.ShelleyTransactionOutput | BabbageTransactionOutput.BabbageTransactionOutput
```

Added in v2.0.0

# schemas

## TransactionOutput

Transaction output union type matching CDDL: shelley_transaction_output / babbage_transaction_output

**Signature**

```ts
export declare const TransactionOutput: Schema.Union<
  [typeof ShelleyTransactionOutput.ShelleyTransactionOutput, typeof BabbageTransactionOutput.BabbageTransactionOutput]
>
```

Added in v2.0.0
