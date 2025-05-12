---
title: TransactionInput.ts
nav_order: 304
parent: Modules
---

## TransactionInput overview

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
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
- [model](#model)
  - [TransactionInputError (class)](#transactioninputerror-class)
- [predicates](#predicates)
  - [isTransactionInput](#istransactioninput)
- [schemas](#schemas)
  - [TransactionInput (class)](#transactioninput-class)
    - [[Inspectable.NodeInspectSymbol] (method)](#inspectablenodeinspectsymbol-method)

---

# constructors

## makeOrThrow

Construct a TransactionInput, throws on error.

**Signature**

```ts
export declare const makeOrThrow: (
  transactionId: TransactionHash.TransactionHash,
  index: number,
) => TransactionInput;
```

**Example**

```ts
import {
  TransactionHash,
  TransactionInput,
} from "@lucid-evolution/experimental";
import assert from "assert";

const transactionHash =
  "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819";
const transactionId = TransactionHash.makeOrThrow(transactionHash);
const transactionInput = TransactionInput.makeOrThrow(transactionId, 0);
assert(transactionInput._tag === "TransactionInput");
assert(transactionInput.transactionId.hash === transactionHash);
assert(transactionInput.index === 0);
```

Added in v2.0.0

# encoding/decoding

## fromCBOR

Decode a CBOR hex string to a TransactionInput

**Signature**

```ts
export declare const fromCBOR: SerdeImpl.FromCBOR<
  TransactionInput,
  | CBOR.CBORError
  | TransactionHash.TransactionHashError
  | TransactionInputError
  | Bytes.BytesError
>;
```

**Example**

```ts
import { TransactionInput } from "@lucid-evolution/experimental";
import { Effect } from "effect";
import assert from "assert";

const cborHex =
  "82005820cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819";
const transactionInputEffect = TransactionInput.fromCBOR(cborHex);
const transactionInput = Effect.runSync(transactionInputEffect);
assert(
  transactionInput.transactionId.hash ===
    "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819",
);
assert(transactionInput.index === 0);
```

Added in v2.0.0

## fromCBORBytes

Decode CBOR bytes to a TransactionInput
Internal helper function used by fromCBOR

**Signature**

```ts
export declare const fromCBORBytes: SerdeImpl.FromCBORBytes<
  TransactionInput,
  CBOR.CBORError | TransactionHash.TransactionHashError | TransactionInputError
>;
```

**Example**

```ts
import { TransactionInput, Bytes } from "@lucid-evolution/experimental";
import { Effect } from "effect";
import assert from "assert";

const bytes = Bytes.fromHexOrThrow(
  "82005820cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819",
);
const transactionInputEffect = TransactionInput.fromCBORBytes(bytes);
const transactionInput = Effect.runSync(transactionInputEffect);
assert(
  transactionInput.transactionId.hash ===
    "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819",
);
assert(transactionInput.index === 0);
```

Added in v2.0.0

## fromCBORBytesOrThrow

Decode CBOR bytes to a TransactionInput, throws on error.

**Signature**

```ts
export declare const fromCBORBytesOrThrow: SerdeImpl.FromCBORBytesOrThrow<TransactionInput>;
```

**Example**

```ts
import { TransactionInput, Bytes } from "@lucid-evolution/experimental";
import assert from "assert";

const bytes = Bytes.fromHexOrThrow(
  "82005820cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819",
);
const transactionInput = TransactionInput.fromCBORBytesOrThrow(bytes);
assert(
  transactionInput.transactionId.hash ===
    "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819",
);
assert(transactionInput.index === 0);
```

Added in v2.0.0

## fromCBOROrThrow

Decode a CBOR hex string to a TransactionInput, throws on error.

**Signature**

```ts
export declare const fromCBOROrThrow: SerdeImpl.FromCBOROrThrow<TransactionInput>;
```

**Example**

```ts
import { TransactionInput } from "@lucid-evolution/experimental";
import assert from "assert";

const cborHex =
  "82005820cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819";
const transactionInput = TransactionInput.fromCBOROrThrow(cborHex);
assert(
  transactionInput.transactionId.hash ===
    "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819",
);
assert(transactionInput.index === 0);
```

Added in v2.0.0

## toCBOR

CBOR diagnostic notation for TransactionInput:
transactionInput = [index, transactionId]

CBOR hex for TransactionInput:
[ 0, h'cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819' ]

Convert TransactionInput to CBOR hex encoding
Uses a pre-configured CBOR encoder for better performance

**Signature**

```ts
export declare const toCBOR: SerdeImpl.ToCBOR<TransactionInput>;
```

**Example**

```ts
import {
  TransactionHash,
  TransactionInput,
} from "@lucid-evolution/experimental";
import assert from "assert";

const transactionId = TransactionHash.makeOrThrow(
  "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819",
);
const transactionInput = TransactionInput.makeOrThrow(transactionId, 0);
const cbor = TransactionInput.toCBOR(transactionInput);
assert(
  cbor ===
    "82005820cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819",
);
```

Added in v2.0.0

## toCBORBytes

Convert TransactionInput to CBOR bytes
Internal helper function used by toCBOR

**Signature**

```ts
export declare const toCBORBytes: SerdeImpl.ToCBORBytes<TransactionInput>;
```

**Example**

```ts
import {
  Bytes,
  TransactionHash,
  TransactionInput,
} from "@lucid-evolution/experimental";
import { Effect } from "effect";
import assert from "assert";

const transactionId = TransactionHash.makeOrThrow(
  "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819",
);
const transactionInput = TransactionInput.makeOrThrow(transactionId, 0);
const cborBytes = TransactionInput.toCBORBytes(transactionInput);
// Verify the bytes are correct by converting back to hex
const hexString = Bytes.toHexOrThrow(cborBytes);
// 82005820cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819
assert(hexString.startsWith("82")); // Array of 2 elements in CBOR
assert(
  hexString.includes(
    "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819",
  ),
);
```

Added in v2.0.0

# equality

## equals

Check if two TransactionInput instances are equal.

**Signature**

```ts
export declare const equals: (
  a: TransactionInput,
  b: TransactionInput,
) => boolean;
```

**Example**

```ts
import {
  TransactionHash,
  TransactionInput,
} from "@lucid-evolution/experimental";
import assert from "assert";

const transactionId1 = TransactionHash.makeOrThrow(
  "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819",
);
const transactionId2 = TransactionHash.makeOrThrow(
  "dddd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819",
);
const transactionInput = TransactionInput.makeOrThrow(transactionId1, 0);
const sameTransactionInput = TransactionInput.makeOrThrow(transactionId1, 0);
const differentTransactionInput1 = TransactionInput.makeOrThrow(
  transactionId1,
  1,
);
const differentTransactionInput2 = TransactionInput.makeOrThrow(
  transactionId2,
  0,
);
assert(
  TransactionInput.equals(transactionInput, sameTransactionInput) === true,
);
assert(
  TransactionInput.equals(transactionInput, differentTransactionInput1) ===
    false,
);
assert(
  TransactionInput.equals(transactionInput, differentTransactionInput2) ===
    false,
);
```

Added in v2.0.0

# model

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
export declare const isTransactionInput: (
  u: unknown,
  overrideOptions?: ParseOptions | number,
) => u is TransactionInput;
```

**Example**

```ts
import {
  TransactionHash,
  TransactionInput,
} from "@lucid-evolution/experimental";
import assert from "assert";

const transactionId = TransactionHash.makeOrThrow(
  "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819",
);
const transactionInput = TransactionInput.makeOrThrow(transactionId, 0);
const isValid = TransactionInput.isTransactionInput(transactionInput);
assert(isValid === true);
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
[Inspectable.NodeInspectSymbol]();
```
