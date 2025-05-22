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
  - [decodeCBORBytes](#decodecborbytes)
  - [decodeCBORBytesOrThrow](#decodecborbytesorthrow)
  - [decodeCBORHex](#decodecborhex)
  - [decodeCBORHexOrThrow](#decodecborhexorthrow)
  - [encodeCBORBytes](#encodecborbytes)
  - [encodeCBORHex](#encodecborhex)
- [equality](#equality)
  - [equals](#equals)
- [model](#model)
  - [TransactionInputError (class)](#transactioninputerror-class)
- [predicates](#predicates)
  - [isTransactionInput](#istransactioninput)
- [schemas](#schemas)
  - [TransactionInput (class)](#transactioninput-class)
    - [[Inspectable.NodeInspectSymbol] (method)](#inspectablenodeinspectsymbol-method)
- [utils](#utils)
  - [make](#make)

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
const transactionId = TransactionHash.decodeHexOrThrow(transactionHash);
const transactionInput = TransactionInput.makeOrThrow(transactionId, 0);
assert(transactionInput._tag === "TransactionInput");
assert(transactionInput.transactionId.hash === transactionHash);
assert(transactionInput.index === 0);
```

Added in v2.0.0

# encoding/decoding

## decodeCBORBytes

Decode CBOR bytes to a TransactionInput
Internal helper function used by fromCBOR

**Signature**

```ts
export declare const decodeCBORBytes: Serialization.FromCBORBytes<
  TransactionInput,
  TransactionInputError
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
const transactionInputEffect = TransactionInput.decodeCBORBytes(bytes);
const transactionInput = Effect.runSync(transactionInputEffect);
assert(
  transactionInput.transactionId.hash ===
    "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819",
);
assert(transactionInput.index === 0);
```

Added in v2.0.0

## decodeCBORBytesOrThrow

Decode CBOR bytes to a TransactionInput, throws on error.

**Signature**

```ts
export declare const decodeCBORBytesOrThrow: Serialization.FromCBORBytesOrThrow<TransactionInput>;
```

**Example**

```ts
import { TransactionInput, Bytes } from "@lucid-evolution/experimental";
import assert from "assert";

const bytes = Bytes.fromHexOrThrow(
  "82005820cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819",
);
const transactionInput = TransactionInput.decodeCBORBytesOrThrow(bytes);
assert(
  transactionInput.transactionId.hash ===
    "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819",
);
assert(transactionInput.index === 0);
```

Added in v2.0.0

## decodeCBORHex

Decode a CBOR hex string to a TransactionInput

**Signature**

```ts
export declare const decodeCBORHex: Serialization.FromCBOR<
  string,
  TransactionInput,
  TransactionInputError
>;
```

**Example**

```ts
import { TransactionInput, Hex } from "@lucid-evolution/experimental";
import { Effect } from "effect";
import assert from "assert";

const cborHex =
  "82005820cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819";
const transactionInputEffect = TransactionInput.decodeCBORHex(cborHex);
const transactionInput = Effect.runSync(transactionInputEffect);
assert(
  transactionInput.transactionId.hash ===
    "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819",
);
assert(transactionInput.index === 0);
```

Added in v2.0.0

## decodeCBORHexOrThrow

Decode a CBOR hex string to a TransactionInput, throws on error.

**Signature**

```ts
export declare const decodeCBORHexOrThrow: Serialization.FromCBOROrThrow<
  string & Brand<"HexString">,
  TransactionInput
>;
```

**Example**

```ts
import { TransactionInput, Hex } from "@lucid-evolution/experimental";
import assert from "assert";

const cborHex =
  "82005820cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819" as Hex.HexString;
const transactionInput = TransactionInput.decodeCBORHexOrThrow(cborHex);
assert(
  transactionInput.transactionId.hash ===
    "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819",
);
assert(transactionInput.index === 0);
```

Added in v2.0.0

## encodeCBORBytes

Convert TransactionInput to CBOR bytes
Internal helper function used by toCBOR

**Signature**

```ts
export declare const encodeCBORBytes: Serialization.ToCBORBytes<TransactionInput>;
```

**Example**

```ts
import {
  Bytes,
  TransactionHash,
  TransactionInput,
} from "@lucid-evolution/experimental";
import assert from "assert";

const transactionHash =
  "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819";
const transactionId = TransactionHash.decodeHexOrThrow(transactionHash);
const transactionInput = TransactionInput.makeOrThrow(transactionId, 0);
const cborBytes = TransactionInput.encodeCBORBytes(transactionInput);

// Verify the bytes are correct by converting back to hex
const hexString = Bytes.toHexOrThrow(cborBytes);
assert(hexString.startsWith("82")); // Array of 2 elements in CBOR
assert(hexString.includes(transactionHash));
```

Added in v2.0.0

## encodeCBORHex

CBOR diagnostic notation for TransactionInput:
transactionInput = [index, transactionId]

CBOR hex for TransactionInput:
[ 0, h'cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819' ]

Convert TransactionInput to CBOR hex encoding
Uses a pre-configured CBOR encoder for better performance

**Signature**

```ts
export declare const encodeCBORHex: Serialization.ToCBOR<TransactionInput>;
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
const transactionId = TransactionHash.decodeHexOrThrow(transactionHash);
const transactionInput = TransactionInput.makeOrThrow(transactionId, 0);
const cbor = TransactionInput.encodeCBORHex(transactionInput);
assert(
  cbor ===
    "820058225820cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819",
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

const transactionId1 = TransactionHash.decodeHexOrThrow(
  "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819",
);
const transactionId2 = TransactionHash.decodeHexOrThrow(
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

const transactionId = TransactionHash.decodeHexOrThrow(
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

# utils

## make

**Signature**

```ts
export declare const make: (
  transactionId: TransactionHash.TransactionHash,
  index: number,
) => Effect.Effect<TransactionInput, TransactionInputError, never>;
```
