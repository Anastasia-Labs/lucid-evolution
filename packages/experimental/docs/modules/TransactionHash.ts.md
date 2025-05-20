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
  - [decodeBytes](#decodebytes)
  - [decodeBytesOrThrow](#decodebytesorthrow)
  - [decodeHex](#decodehex)
  - [decodeHexOrThrow](#decodehexorthrow)
- [encoding/decoding](#encodingdecoding)
  - [decodeCBORBytes](#decodecborbytes)
  - [decodeCBORBytesOrThrow](#decodecborbytesorthrow)
  - [decodeCBORHex](#decodecborhex)
  - [decodeCBORHexOrThrow](#decodecborhexorthrow)
  - [encodeCBORBytes](#encodecborbytes)
  - [encodeCBORHex](#encodecborhex)
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
  - [encodeBytes](#encodebytes)
- [utils](#utils)
  - [TransactionHash (interface)](#transactionhash-interface)

---

# constants

## TRANSACTIONHASH_BYTES_LENGTH

The length in bytes of a TransactionHash.

**Signature**

```ts
export declare const TRANSACTIONHASH_BYTES_LENGTH: 32
```

Added in v2.0.0

## TRANSACTIONHASH_HEX_LENGTH

The length in hex characters of a TransactionHash.

**Signature**

```ts
export declare const TRANSACTIONHASH_HEX_LENGTH: 64
```

Added in v2.0.0

# constructors

## decodeBytes

Create a TransactionHash directly from bytes.

**Signature**

```ts
export declare const decodeBytes: Serialization.FromBytes<TransactionHash, TransactionHashError>
```

**Example**

```ts
import { TransactionHash, Bytes } from "@lucid-evolution/experimental"
import assert from "assert"

const bytes = Bytes.fromHexOrThrow("cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819")
const transactionHash = TransactionHash.decodeBytesOrThrow(bytes)
assert(transactionHash._tag === "TransactionHash")
assert(transactionHash.hash === "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819")
```

Added in v2.0.0

## decodeBytesOrThrow

Create a TransactionHash directly from bytes, throws on error.

**Signature**

```ts
export declare const decodeBytesOrThrow: (bytes: Uint8Array) => TransactionHash
```

**Example**

```ts
import { TransactionHash, Bytes } from "@lucid-evolution/experimental"
import assert from "assert"

const bytes = Bytes.fromHexOrThrow("cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819")
const transactionHash = TransactionHash.decodeBytesOrThrow(bytes)
assert(transactionHash._tag === "TransactionHash")
assert(transactionHash.hash === "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819")
```

Added in v2.0.0

## decodeHex

Construct a TransactionHash from a hex string.

**Signature**

```ts
export declare const decodeHex: Serialization.Make<TransactionHash, TransactionHashError>
```

**Example**

```ts
import { TransactionHash } from "@lucid-evolution/experimental"
import assert from "assert"

const hash = "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819"
const transactionHash = TransactionHash.decodeHexOrThrow(hash)
assert(transactionHash._tag === "TransactionHash")
assert(transactionHash.hash === hash)
```

Added in v2.0.0

## decodeHexOrThrow

Construct a TransactionHash from a hex string, throws on error.

**Signature**

```ts
export declare const decodeHexOrThrow: Serialization.MakeOrThrow<string, TransactionHash>
```

**Example**

```ts
import { TransactionHash } from "@lucid-evolution/experimental"
import assert from "assert"

const hash = "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819"
const transactionHash = TransactionHash.decodeHexOrThrow(hash)
assert(transactionHash._tag === "TransactionHash")
assert(transactionHash.hash === hash)
```

Added in v2.0.0

# encoding/decoding

## decodeCBORBytes

Create a TransactionHash from CBOR bytes.

**Signature**

```ts
export declare const decodeCBORBytes: Serialization.FromCBORBytes<TransactionHash, TransactionHashError>
```

**Example**

```ts
import { TransactionHash, Bytes } from "@lucid-evolution/experimental"
import assert from "assert"

const bytes = Bytes.fromHexOrThrow("5820cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819")
const transactionHash = TransactionHash.decodeCBORBytesOrThrow(bytes)
assert(transactionHash._tag === "TransactionHash")
assert(transactionHash.hash === "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819")
```

Added in v2.0.0

## decodeCBORBytesOrThrow

Create a TransactionHash from CBOR bytes, throws on error.

**Signature**

```ts
export declare const decodeCBORBytesOrThrow: (bytes: Uint8Array) => TransactionHash
```

**Example**

```ts
import { TransactionHash, Bytes } from "@lucid-evolution/experimental"
import assert from "assert"

const bytes = Bytes.fromHexOrThrow("5820cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819")
const transactionHash = TransactionHash.decodeCBORBytesOrThrow(bytes)
assert(transactionHash._tag === "TransactionHash")
assert(transactionHash.hash === "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819")
```

Added in v2.0.0

## decodeCBORHex

Create a TransactionHash from a CBOR hex string.

**Signature**

```ts
export declare const decodeCBORHex: Serialization.FromCBOR<string, TransactionHash, TransactionHashError>
```

**Example**

```ts
import { TransactionHash } from "@lucid-evolution/experimental"
import assert from "assert"

const cborHex = "5820cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819"
const transactionHash = TransactionHash.decodeCBORHexOrThrow(cborHex)
assert(transactionHash._tag === "TransactionHash")
assert(transactionHash.hash === "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819")
```

Added in v2.0.0

## decodeCBORHexOrThrow

Create a TransactionHash from a CBOR hex string, throws on error.

**Signature**

```ts
export declare const decodeCBORHexOrThrow: Serialization.FromCBOROrThrow<string, TransactionHash>
```

**Example**

```ts
import { TransactionHash } from "@lucid-evolution/experimental"
import assert from "assert"

const cborHex = "5820cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819"
const transactionHash = TransactionHash.decodeCBORHexOrThrow(cborHex)
assert(transactionHash._tag === "TransactionHash")
assert(transactionHash.hash === "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819")
```

Added in v2.0.0

## encodeCBORBytes

Convert a TransactionHash to CBOR bytes.

**Signature**

```ts
export declare const encodeCBORBytes: Serialization.ToCBORBytes<TransactionHash>
```

**Example**

```ts
import { TransactionHash, Bytes } from "@lucid-evolution/experimental"
import assert from "assert"

const transactionHash = TransactionHash.decodeHexOrThrow(
  "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819"
)
const bytes = TransactionHash.encodeCBORBytes(transactionHash)
assert(bytes instanceof Uint8Array)
```

Added in v2.0.0

## encodeCBORHex

Convert a TransactionHash to CBOR hex string.

**Signature**

```ts
export declare const encodeCBORHex: Serialization.ToCBOR<TransactionHash>
```

**Example**

```ts
import { TransactionHash } from "@lucid-evolution/experimental"
import assert from "assert"

const transactionHash = TransactionHash.decodeHexOrThrow(
  "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819"
)
const hex = TransactionHash.encodeCBORHex(transactionHash)
assert(hex.startsWith("5820"))
assert(hex.includes("cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819"))
```

Added in v2.0.0

# equality

## equals

Check if two TransactionHash instances are equal.

**Signature**

```ts
export declare const equals: (a: TransactionHash, b: TransactionHash) => boolean
```

**Example**

```ts
import { TransactionHash } from "@lucid-evolution/experimental"
import assert from "assert"

const hash1 = TransactionHash.decodeHexOrThrow("cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819")
const hash2 = TransactionHash.decodeHexOrThrow("cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819")
const hash3 = TransactionHash.decodeHexOrThrow("dc97057e0949d9676e55b69f28fcb2dccb8002583a4ad761f1dbfb985f36085c")

assert(TransactionHash.equals(hash1, hash2) === true)
assert(TransactionHash.equals(hash1, hash3) === false)
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
import { TransactionHash } from "@lucid-evolution/experimental"
import assert from "assert"

const error = new TransactionHash.TransactionHashError({ message: "Invalid transaction hash" })
assert(error.message === "Invalid transaction hash")
```

Added in v2.0.0

# generators

## generator

Generate a random TransactionHash.

**Signature**

```ts
export declare const generator: FastCheck.Arbitrary<TransactionHash>
```

**Example**

```ts
import { TransactionHash } from "@lucid-evolution/experimental"
import { FastCheck } from "effect"
import assert from "assert"

const randomSamples = FastCheck.sample(TransactionHash.generator, 20)
randomSamples.forEach((transactionHash) => {
  assert(transactionHash.hash.length === 64)
})
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
;[Inspectable.NodeInspectSymbol]()
```

# transformation

## encodeBytes

Convert a TransactionHash to bytes.

**Signature**

```ts
export declare const encodeBytes: Serialization.ToBytes<TransactionHash>
```

**Example**

```ts
import { TransactionHash, Bytes } from "@lucid-evolution/experimental"
import assert from "assert"

const transactionHash = TransactionHash.decodeHexOrThrow(
  "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819"
)
const bytes = TransactionHash.encodeBytes(transactionHash)
assert(bytes instanceof Uint8Array)
assert(bytes.length === 32)
assert(Bytes.toHexOrThrow(bytes) === "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819")
```

Added in v2.0.0

# utils

## TransactionHash (interface)

**Signature**

```ts
export interface TransactionHash {
  readonly [NominalType]: unique symbol
}
```
