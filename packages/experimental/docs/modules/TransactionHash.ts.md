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
- [constructors](#constructors)
  - [fromBytes](#frombytes)
  - [fromBytesOrThrow](#frombytesorthrow)
  - [make](#make)
  - [makeOrThrow](#makeorthrow)
- [encoding/decoding](#encodingdecoding)
  - [fromCBOR](#fromcbor)
  - [fromCBORBytes](#fromcborbytes)
  - [fromCBORBytesOrThrow](#fromcborbytesorthrow)
  - [fromCBOROrThrow](#fromcbororthrow)
  - [toCBOR](#tocbor)
  - [toCBORBytes](#tocborbytes)
- [equality](#equality)
  - [equals](#equals)
- [errors](#errors)
  - [TransactionHashError (class)](#transactionhasherror-class)
- [generators](#generators)
  - [generator](#generator)
- [schemas](#schemas)
  - [TransactionHash (class)](#transactionhash-class)
    - [[Inspectable.NodeInspectSymbol] (method)](#inspectablenodeinspectsymbol-method)
- [transformation](#transformation)
  - [toBytes](#tobytes)
- [utils](#utils)
  - [TransactionHash (interface)](#transactionhash-interface)

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

# constructors

## fromBytes

Create a TransactionHash directly from bytes.

**Signature**

```ts
export declare const fromBytes: SerdeImpl.FromBytes<
  TransactionHash,
  TransactionHashError
>;
```

**Example**

```ts
import { TransactionHash, Bytes } from "@lucid-evolution/experimental";
import { Effect } from "effect";
import assert from "assert";

const bytes = Bytes.fromHexOrThrow(
  "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819",
);
const transactionHashEffect = TransactionHash.fromBytes(bytes);
const transactionHash = Effect.runSync(transactionHashEffect);
assert(transactionHash._tag === "TransactionHash");
assert(
  transactionHash.hash ===
    "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819",
);
```

Added in v2.0.0

## fromBytesOrThrow

Create a TransactionHash directly from bytes, throws on error.

**Signature**

```ts
export declare const fromBytesOrThrow: (bytes: Uint8Array) => TransactionHash;
```

**Example**

```ts
import { TransactionHash, Bytes } from "@lucid-evolution/experimental";
import assert from "assert";

const bytes = Bytes.fromHexOrThrow(
  "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819",
);
const transactionHash = TransactionHash.fromBytesOrThrow(bytes);
assert(transactionHash._tag === "TransactionHash");
assert(
  transactionHash.hash ===
    "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819",
);
```

Added in v2.0.0

## make

Construct a TransactionHash from a hex string.

**Signature**

```ts
export declare const make: SerdeImpl.Make<
  TransactionHash,
  TransactionHashError
>;
```

**Example**

```ts
import { TransactionHash } from "@lucid-evolution/experimental";
import { Effect } from "effect";
import assert from "assert";

const hash = "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819";
const transactionHashEffect = TransactionHash.make(hash);
const transactionHash = Effect.runSync(transactionHashEffect);
assert(transactionHash._tag === "TransactionHash");
assert(transactionHash.hash === hash);
```

Added in v2.0.0

## makeOrThrow

Construct a TransactionHash from a hex string, throws on error.

**Signature**

```ts
export declare const makeOrThrow: SerdeImpl.MakeOrThrow<TransactionHash>;
```

**Example**

```ts
import { TransactionHash } from "@lucid-evolution/experimental";
import assert from "assert";

const hash = "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819";
const transactionHash = TransactionHash.makeOrThrow(hash);
assert(transactionHash._tag === "TransactionHash");
assert(transactionHash.hash === hash);
```

Added in v2.0.0

# encoding/decoding

## fromCBOR

Create a TransactionHash from a CBOR hex string.

**Signature**

```ts
export declare const fromCBOR: SerdeImpl.FromCBOR<
  TransactionHash,
  CBOR.CBORError | TransactionHashError | Bytes.BytesError
>;
```

**Example**

```ts
import { TransactionHash } from "@lucid-evolution/experimental";
import { Effect } from "effect";
import assert from "assert";

const cborHex =
  "5820cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819";
const transactionHashEffect = TransactionHash.fromCBOR(cborHex);
const transactionHash = Effect.runSync(transactionHashEffect);
assert(transactionHash._tag === "TransactionHash");
assert(
  transactionHash.hash ===
    "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819",
);
```

Added in v2.0.0

## fromCBORBytes

Create a TransactionHash from CBOR bytes.

**Signature**

```ts
export declare const fromCBORBytes: SerdeImpl.FromCBORBytes<
  TransactionHash,
  CBOR.CBORError | TransactionHashError
>;
```

**Example**

```ts
import { TransactionHash, Bytes } from "@lucid-evolution/experimental";
import { Effect } from "effect";
import assert from "assert";

const bytes = Bytes.fromHexOrThrow(
  "5820cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819",
);
const transactionHashEffect = TransactionHash.fromCBORBytes(bytes);
const transactionHash = Effect.runSync(transactionHashEffect);
assert(transactionHash._tag === "TransactionHash");
assert(
  transactionHash.hash ===
    "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819",
);
```

Added in v2.0.0

## fromCBORBytesOrThrow

Create a TransactionHash from CBOR bytes, throws on error.

**Signature**

```ts
export declare const fromCBORBytesOrThrow: (
  bytes: Uint8Array,
) => TransactionHash;
```

**Example**

```ts
import { TransactionHash, Bytes } from "@lucid-evolution/experimental";
import assert from "assert";

const bytes = Bytes.fromHexOrThrow(
  "5820cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819",
);
const transactionHash = TransactionHash.fromCBORBytesOrThrow(bytes);
assert(transactionHash._tag === "TransactionHash");
assert(
  transactionHash.hash ===
    "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819",
);
```

Added in v2.0.0

## fromCBOROrThrow

Create a TransactionHash from a CBOR hex string, throws on error.

**Signature**

```ts
export declare const fromCBOROrThrow: (cborHex: string) => TransactionHash;
```

**Example**

```ts
import { TransactionHash } from "@lucid-evolution/experimental";
import assert from "assert";

const transactionHash = TransactionHash.fromCBOROrThrow(
  "5820cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819",
);
assert(transactionHash._tag === "TransactionHash");
assert(
  transactionHash.hash ===
    "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819",
);
```

Added in v2.0.0

## toCBOR

Convert a TransactionHash to CBOR hex string.

**Signature**

```ts
export declare const toCBOR: SerdeImpl.ToCBOR<TransactionHash>;
```

**Example**

```ts
import { TransactionHash } from "@lucid-evolution/experimental";
import assert from "assert";

const transactionHash = TransactionHash.makeOrThrow(
  "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819",
);
const hex = TransactionHash.toCBOR(transactionHash);
assert(hex.startsWith("5820"));
assert(
  hex.includes(
    "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819",
  ),
);
```

Added in v2.0.0

## toCBORBytes

Convert a TransactionHash to CBOR bytes.

**Signature**

```ts
export declare const toCBORBytes: SerdeImpl.ToCBORBytes<TransactionHash>;
```

**Example**

```ts
import { TransactionHash, Bytes } from "@lucid-evolution/experimental";
import assert from "assert";

const transactionHash = TransactionHash.makeOrThrow(
  "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819",
);
const bytes = TransactionHash.toCBORBytes(transactionHash);
assert(bytes instanceof Uint8Array);
```

Added in v2.0.0

# equality

## equals

Check if two TransactionHashes are equal.

**Signature**

```ts
export declare const equals: (
  a: TransactionHash,
  b: TransactionHash,
) => boolean;
```

**Example**

```ts
import { TransactionHash } from "@lucid-evolution/experimental";
import assert from "assert";

const hash1 = TransactionHash.makeOrThrow(
  "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819",
);
const hash2 = TransactionHash.makeOrThrow(
  "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819",
);
const hash3 = TransactionHash.makeOrThrow(
  "dc97057e0949d9676e55b69f28fcb2dccb8002583a4ad761f1dbfb985f36085c",
);

assert(TransactionHash.equals(hash1, hash2) === true);
assert(TransactionHash.equals(hash1, hash3) === false);
```

Added in v2.0.0

# errors

## TransactionHashError (class)

Error class for TransactionHash related operations
Extends TaggedError for better error handling and categorization

**Signature**

```ts
export declare class TransactionHashError
```

**Example**

```ts
import { TransactionHash } from "@lucid-evolution/experimental";
import assert from "assert";

const error = new TransactionHash.TransactionHashError({
  message: "Invalid transaction hash",
});
assert(error.message === "Invalid transaction hash");
```

Added in v2.0.0

# generators

## generator

Generate a random TransactionHash using FastCheck.

This is useful for testing purposes.

**Signature**

```ts
export declare const generator: FastCheck.Arbitrary<TransactionHash>;
```

**Example**

```ts
import { TransactionHash } from "@lucid-evolution/experimental";
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

# transformation

## toBytes

Convert a TransactionHash to bytes.

**Signature**

```ts
export declare const toBytes: SerdeImpl.ToBytes<TransactionHash>;
```

**Example**

```ts
import { TransactionHash, Bytes } from "@lucid-evolution/experimental";
import assert from "assert";

const transactionHash = TransactionHash.makeOrThrow(
  "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819",
);
const bytes = TransactionHash.toBytes(transactionHash);
assert(bytes instanceof Uint8Array);
assert(bytes.length === 32);
assert(
  Bytes.toHexOrThrow(bytes) ===
    "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819",
);
```

Added in v2.0.0

# utils

## TransactionHash (interface)

**Signature**

```ts
export interface TransactionHash {
  readonly [NominalType]: unique symbol;
}
```
