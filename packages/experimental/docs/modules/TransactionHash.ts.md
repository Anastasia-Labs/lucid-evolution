---
title: TransactionHash.ts
nav_order: 303
parent: Modules
---

## TransactionHash overview

---

<h2 class="text-delta">Table of contents</h2>

- [constants](#constants)
  - [TRANSACTIONHASH_BYTES_LENGTH](#transactionhash_bytes_length)
  - [TRANSACTIONHASH_HEX_LENGTH](#transactionhash_hex_length)
- [encoding/decoding](#encodingdecoding)
  - [Bytes](#bytes)
  - [CBORBytes](#cborbytes)
  - [CBORHex](#cborhex)
  - [HexString](#hexstring)
- [equality](#equality)
  - [equals](#equals)
- [errors](#errors)
  - [TransactionHashError (class)](#transactionhasherror-class)
- [generators](#generators)
  - [generator](#generator)
- [schemas](#schemas)
  - [TransactionHash (class)](#transactionhash-class)
    - [[Inspectable.NodeInspectSymbol] (method)](#inspectablenodeinspectsymbol-method)
  - [TransactionHashBytes](#transactionhashbytes)
- [utils](#utils)
  - [Hash](#hash)

---

# constants

## TRANSACTIONHASH_BYTES_LENGTH

The length in bytes of a TransactionHash.

**Signature**

```ts
export declare const TRANSACTIONHASH_BYTES_LENGTH: 32;
```

Added in v2.0.0

## TRANSACTIONHASH_HEX_LENGTH

The length in hex characters of a TransactionHash.

**Signature**

```ts
export declare const TRANSACTIONHASH_HEX_LENGTH: 64;
```

Added in v2.0.0

# encoding/decoding

## Bytes

Schema for transforming between Uint8Array and TransactionHash.

**Signature**

```ts
export declare const Bytes: Schema.transform<
  Schema.SchemaClass<any, any, never>,
  Schema.Schema<
    TransactionHash,
    {
      readonly hash: string & Brand<"HexString">;
      readonly _tag: "TransactionHash";
    },
    never
  >
>;
```

Added in v2.0.0

## CBORBytes

Schema for transforming between CBOR bytes and TransactionHash.

**Signature**

```ts
export declare const CBORBytes: Schema.transformOrFail<
  Schema.declare<any, any, readonly [], never>,
  typeof TransactionHash,
  never
>;
```

Added in v2.0.0

## CBORHex

Schema for transforming between CBOR hex and TransactionHash.

**Signature**

```ts
export declare const CBORHex: Schema.transformOrFail<
  Schema.SchemaClass<
    string & Brand<"HexString">,
    string & Brand<"HexString">,
    never
  >,
  typeof TransactionHash,
  never
>;
```

Added in v2.0.0

## HexString

Schema for transforming between hex string and TransactionHash.

**Signature**

```ts
export declare const HexString: Schema.transform<
  Schema.refine<
    string & Brand<"HexString">,
    Schema.SchemaClass<
      string & Brand<"HexString">,
      string & Brand<"HexString">,
      never
    >
  >,
  typeof TransactionHash
>;
```

Added in v2.0.0

# equality

## equals

Check if two TransactionHash instances are equal.

**Signature**

```ts
export declare const equals: (
  a: TransactionHash,
  b: TransactionHash,
) => boolean;
```

**Example**

```ts
import { TransactionHash } from "@evolution-sdk/experimental";
import assert from "assert";
```

Added in v2.0.0

# errors

## TransactionHashError (class)

Error class for TransactionHash related operations.

**Signature**

```ts
export declare class TransactionHashError
```

**Example**

```ts
import { TransactionHash } from "@evolution-sdk/experimental";
import assert from "assert";

const error = new TransactionHash.TransactionHashError({
  message: "Invalid transaction hash",
});
assert(error.message === "Invalid transaction hash");
```

Added in v2.0.0

# generators

## generator

Generate a random TransactionHash.

**Signature**

```ts
export declare const generator: FastCheck.Arbitrary<TransactionHash>;
```

**Example**

```ts
import { TransactionHash } from "@evolution-sdk/experimental";
import { FastCheck } from "effect";
import assert from "assert";

const randomSamples = FastCheck.sample(TransactionHash.generator, 20);
randomSamples.forEach((transactionHash) => {
  assert(transactionHash.hash.length === 64);
});
```

Added in v2.0.0

# schemas

## TransactionHash (class)

Schema for TransactionHash.

**Signature**

```ts
export declare class TransactionHash
```

Added in v2.0.0

### [Inspectable.NodeInspectSymbol] (method)

**Signature**

```ts
[Inspectable.NodeInspectSymbol]();
```

## TransactionHashBytes

Schema for TransactionHash bytes validation.

**Signature**

```ts
export declare const TransactionHashBytes: Schema.SchemaClass<any, any, never>;
```

Added in v2.0.0

# utils

## Hash

**Signature**

```ts
export declare const Hash: Schema.refine<
  string & Brand<"HexString">,
  Schema.SchemaClass<
    string & Brand<"HexString">,
    string & Brand<"HexString">,
    never
  >
>;
```
