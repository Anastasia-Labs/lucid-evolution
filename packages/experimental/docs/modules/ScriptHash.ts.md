---
title: ScriptHash.ts
nav_order: 302
parent: Modules
---

## ScriptHash overview

---

<h2 class="text-delta">Table of contents</h2>

- [constants](#constants)
  - [SCRIPTHASH_BYTES_LENGTH](#scripthash_bytes_length)
  - [SCRIPTHASH_HEX_LENGTH](#scripthash_hex_length)
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
  - [ScriptHashError (class)](#scripthasherror-class)
- [generators](#generators)
  - [generator](#generator)
- [schemas](#schemas)
  - [ScriptHash (class)](#scripthash-class)
    - [[Inspectable.NodeInspectSymbol] (method)](#inspectablenodeinspectsymbol-method)
- [transformation](#transformation)
  - [toBytes](#tobytes)
- [utils](#utils)
  - [ScriptHash (interface)](#scripthash-interface)

---

# constants

## SCRIPTHASH_BYTES_LENGTH

The length in bytes of a ScriptHash.

**Signature**

```ts
export declare const SCRIPTHASH_BYTES_LENGTH: 28;
```

Added in v2.0.0

## SCRIPTHASH_HEX_LENGTH

The length in hex characters of a ScriptHash.

**Signature**

```ts
export declare const SCRIPTHASH_HEX_LENGTH: 56;
```

Added in v2.0.0

# constructors

## fromBytes

Create a ScriptHash directly from bytes.

**Signature**

```ts
export declare const fromBytes: SerdeImpl.FromBytes<
  ScriptHash,
  ScriptHashError
>;
```

**Example**

```ts
import { ScriptHash, Bytes } from "@lucid-evolution/experimental";
import { Effect } from "effect";
import assert from "assert";

const bytes = Bytes.fromHexOrThrow(
  "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f",
);
const scriptHashEffect = ScriptHash.fromBytes(bytes);
const scriptHash = Effect.runSync(scriptHashEffect);
assert(scriptHash._tag === "ScriptHash");
assert(
  scriptHash.hash ===
    "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f",
);
```

Added in v2.0.0

## fromBytesOrThrow

Create a ScriptHash directly from bytes, throws on error.

**Signature**

```ts
export declare const fromBytesOrThrow: (bytes: Uint8Array) => ScriptHash;
```

**Example**

```ts
import { ScriptHash, Bytes } from "@lucid-evolution/experimental";
import assert from "assert";

const bytes = Bytes.fromHexOrThrow(
  "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f",
);
const scriptHash = ScriptHash.fromBytesOrThrow(bytes);
assert(scriptHash._tag === "ScriptHash");
assert(
  scriptHash.hash ===
    "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f",
);
```

Added in v2.0.0

## make

Construct a ScriptHash from a hex string.

**Signature**

```ts
export declare const make: SerdeImpl.Make<ScriptHash, ScriptHashError>;
```

**Example**

```ts
import { ScriptHash } from "@lucid-evolution/experimental";
import { Effect } from "effect";
import assert from "assert";

const hash = "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f";
const scriptHashEffect = ScriptHash.make(hash);
const scriptHash = Effect.runSync(scriptHashEffect);
assert(scriptHash._tag === "ScriptHash");
assert(scriptHash.hash === hash);
```

Added in v2.0.0

## makeOrThrow

Construct a ScriptHash from a hex string, throws on error.

**Signature**

```ts
export declare const makeOrThrow: SerdeImpl.MakeOrThrow<ScriptHash>;
```

**Example**

```ts
import { ScriptHash } from "@lucid-evolution/experimental";
import assert from "assert";

const hash = "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f";
const scriptHash = ScriptHash.makeOrThrow(hash);
assert(scriptHash._tag === "ScriptHash");
assert(scriptHash.hash === hash);
```

Added in v2.0.0

# encoding/decoding

## fromCBOR

Create a ScriptHash from a CBOR hex string.

**Signature**

```ts
export declare const fromCBOR: SerdeImpl.FromCBOR<
  ScriptHash,
  CBOR.CBORError | ScriptHashError | Bytes.BytesError
>;
```

**Example**

```ts
import { ScriptHash } from "@lucid-evolution/experimental";
import { Effect } from "effect";
import assert from "assert";

const cborHex = "581cc37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f";
const scriptHashEffect = ScriptHash.fromCBOR(cborHex);
const scriptHash = Effect.runSync(scriptHashEffect);
assert(scriptHash._tag === "ScriptHash");
assert(
  scriptHash.hash ===
    "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f",
);
```

Added in v2.0.0

## fromCBORBytes

Create a ScriptHash from CBOR bytes.

**Signature**

```ts
export declare const fromCBORBytes: SerdeImpl.FromCBORBytes<
  ScriptHash,
  CBOR.CBORError | ScriptHashError
>;
```

**Example**

```ts
import { ScriptHash, Bytes } from "@lucid-evolution/experimental";
import { Effect } from "effect";
import assert from "assert";

const bytes = Bytes.fromHexOrThrow(
  "581cc37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f",
);
const scriptHashEffect = ScriptHash.fromCBORBytes(bytes);
const scriptHash = Effect.runSync(scriptHashEffect);
assert(scriptHash._tag === "ScriptHash");
assert(
  scriptHash.hash ===
    "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f",
);
```

Added in v2.0.0

## fromCBORBytesOrThrow

Create a ScriptHash from CBOR bytes, throws on error.

**Signature**

```ts
export declare const fromCBORBytesOrThrow: (bytes: Uint8Array) => ScriptHash;
```

**Example**

```ts
import { ScriptHash, Bytes } from "@lucid-evolution/experimental";
import assert from "assert";

const bytes = Bytes.fromHexOrThrow(
  "581cc37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f",
);
const scriptHash = ScriptHash.fromCBORBytesOrThrow(bytes);
assert(scriptHash._tag === "ScriptHash");
assert(
  scriptHash.hash ===
    "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f",
);
```

Added in v2.0.0

## fromCBOROrThrow

Create a ScriptHash from a CBOR hex string, throws on error.

**Signature**

```ts
export declare const fromCBOROrThrow: (cborHex: string) => ScriptHash;
```

**Example**

```ts
import { ScriptHash } from "@lucid-evolution/experimental";
import assert from "assert";

const scriptHash = ScriptHash.fromCBOROrThrow(
  "581cc37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f",
);
assert(scriptHash._tag === "ScriptHash");
assert(
  scriptHash.hash ===
    "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f",
);
```

Added in v2.0.0

## toCBOR

Convert a ScriptHash to CBOR hex string.

**Signature**

```ts
export declare const toCBOR: SerdeImpl.ToCBOR<ScriptHash>;
```

**Example**

```ts
import { ScriptHash } from "@lucid-evolution/experimental";
import assert from "assert";

const scriptHash = ScriptHash.makeOrThrow(
  "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f",
);
const hex = ScriptHash.toCBOR(scriptHash);
assert(hex.startsWith("581c"));
assert(
  hex.includes("c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f"),
);
```

Added in v2.0.0

## toCBORBytes

Convert a ScriptHash to CBOR bytes.

**Signature**

```ts
export declare const toCBORBytes: SerdeImpl.ToCBORBytes<ScriptHash>;
```

**Example**

```ts
import { ScriptHash, Bytes } from "@lucid-evolution/experimental";
import assert from "assert";

const scriptHash = ScriptHash.makeOrThrow(
  "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f",
);
const bytes = ScriptHash.toCBORBytes(scriptHash);
assert(bytes instanceof Uint8Array);
```

Added in v2.0.0

# equality

## equals

Check if two ScriptHashes are equal.

**Signature**

```ts
export declare const equals: (a: ScriptHash, b: ScriptHash) => boolean;
```

**Example**

```ts
import { ScriptHash } from "@lucid-evolution/experimental";
import assert from "assert";

const hash1 = ScriptHash.makeOrThrow(
  "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f",
);
const hash2 = ScriptHash.makeOrThrow(
  "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f",
);
const hash3 = ScriptHash.makeOrThrow(
  "2cc106ddd406fe57fd1ec4025f5a03a3fd0701bd0204fc3c00bef952",
);

assert(ScriptHash.equals(hash1, hash2) === true);
assert(ScriptHash.equals(hash1, hash3) === false);
```

Added in v2.0.0

# errors

## ScriptHashError (class)

Error class for ScriptHash related operations
Extends TaggedError for better error handling and categorization

**Signature**

```ts
export declare class ScriptHashError
```

**Example**

```ts
import { ScriptHash } from "@lucid-evolution/experimental";
import assert from "assert";

const error = new ScriptHash.ScriptHashError({
  message: "Invalid script hash",
});
assert(error.message === "Invalid script hash");
```

Added in v2.0.0

# generators

## generator

Generate a random ScriptHash using FastCheck.

This is useful for testing purposes.

**Signature**

```ts
export declare const generator: FastCheck.Arbitrary<ScriptHash>;
```

**Example**

```ts
import { ScriptHash } from "@lucid-evolution/experimental";
import { FastCheck } from "effect";
import assert from "assert";

const randomSamples = FastCheck.sample(ScriptHash.generator, 20);
randomSamples.forEach((scriptHash) => {
  assert(scriptHash.hash.length === 56);
});
```

Added in v2.0.0

# schemas

## ScriptHash (class)

Schema for ScriptHash representing a script hash credential.
Follows CIP-0019 binary representation.

**Signature**

```ts
export declare class ScriptHash
```

Added in v2.0.0

### [Inspectable.NodeInspectSymbol] (method)

**Signature**

```ts
[Inspectable.NodeInspectSymbol]();
```

# transformation

## toBytes

Convert a ScriptHash to bytes.

**Signature**

```ts
export declare const toBytes: SerdeImpl.ToBytes<ScriptHash>;
```

**Example**

```ts
import { ScriptHash, Bytes } from "@lucid-evolution/experimental";
import assert from "assert";

const scriptHash = ScriptHash.makeOrThrow(
  "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f",
);
const bytes = ScriptHash.toBytes(scriptHash);
assert(bytes instanceof Uint8Array);
assert(bytes.length === 28);
assert(
  Bytes.toHexOrThrow(bytes) ===
    "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f",
);
```

Added in v2.0.0

# utils

## ScriptHash (interface)

**Signature**

```ts
export interface ScriptHash {
  readonly [NominalType]: unique symbol;
}
```
