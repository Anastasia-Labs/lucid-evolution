---
title: ScriptHash.ts
nav_order: 292
parent: Modules
---

## ScriptHash overview

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [fromBytes](#frombytes)
- [encoding/decoding](#encodingdecoding)
  - [fromCBOR](#fromcbor)
  - [fromCBORBytes](#fromcborbytes)
  - [toCBOR](#tocbor)
  - [toCBORBytes](#tocborbytes)
- [errors](#errors)
  - [ScriptHashError (class)](#scripthasherror-class)
- [model](#model)
  - [ScriptHash (type alias)](#scripthash-type-alias)
- [schemas](#schemas)
  - [ScriptHash](#scripthash)
- [transformation](#transformation)
  - [toBytes](#tobytes)

---

# constructors

## fromBytes

Create a ScriptHash directly from bytes

**Signature**

```ts
export declare const fromBytes: (bytes: Uint8Array) => ScriptHash;
```

**Example**

```ts
import { ScriptHash, Bytes } from "@lucid-evolution/experimental";

const bytes = Bytes.fromHex(
  "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f",
);
const scriptHash = ScriptHash.fromBytes(bytes);
// Returns { _tag: "ScriptHash", hash: "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f" }
```

Added in v2.0.0

# encoding/decoding

## fromCBOR

Create a ScriptHash from a CBOR hex string

**Signature**

```ts
export declare const fromCBOR: (
  hex: string,
) => Effect.Effect<ScriptHash, CBOR.CBORError | ParseError>;
```

**Example**

```ts
import { ScriptHash } from "@lucid-evolution/experimental";
import { Effect } from "effect";

const cborHex = "581cc37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f";
const scriptHashEffect = ScriptHash.fromCBOR(cborHex);
const scriptHash = Effect.runSync(scriptHashEffect);
// Returns a ScriptHash object
```

Added in v2.0.0

## fromCBORBytes

Create a ScriptHash from CBOR bytes

**Signature**

```ts
export declare const fromCBORBytes: (
  bytes: Uint8Array,
) => Effect.Effect<ScriptHash, CBOR.CBORError | ParseError>;
```

**Example**

```ts
import { ScriptHash, Bytes } from "@lucid-evolution/experimental";
import { Effect } from "effect";

const bytes = Bytes.fromHex(
  "581cc37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f",
);
const scriptHashEffect = ScriptHash.fromCBORBytes(bytes);
const scriptHash = Effect.runSync(scriptHashEffect);
// Returns a ScriptHash object
```

Added in v2.0.0

## toCBOR

Convert a ScriptHash to CBOR hex string

**Signature**

```ts
export declare const toCBOR: (
  scriptHash: ScriptHash,
) => Effect.Effect<string, CBOR.CBORError>;
```

**Example**

```ts
import { ScriptHash } from "@lucid-evolution/experimental";
import { Effect } from "effect";

const scriptHash = {
  _tag: "ScriptHash",
  hash: "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f",
} as const;
const hexEffect = ScriptHash.toCBOR(scriptHash);
const hex = Effect.runSync(hexEffect);
// Returns a CBOR hex string representation
```

Added in v2.0.0

## toCBORBytes

Convert a ScriptHash to CBOR bytes

**Signature**

```ts
export declare const toCBORBytes: (
  scriptHash: ScriptHash,
) => Effect.Effect<Uint8Array, CBOR.CBORError>;
```

**Example**

```ts
import { ScriptHash } from "@lucid-evolution/experimental";
import { Effect } from "effect";

const scriptHash = {
  _tag: "ScriptHash",
  hash: "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f",
} as const;
const bytesEffect = ScriptHash.toCBORBytes(scriptHash);
const bytes = Effect.runSync(bytesEffect);
// Returns Uint8Array containing CBOR encoded bytes
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

Added in v2.0.0

# model

## ScriptHash (type alias)

Type representing a script hash credential
Used in addresses to identify script ownership

**Signature**

```ts
export type ScriptHash = Schema.Schema.Type<typeof ScriptHash>;
```

Added in v2.0.0

# schemas

## ScriptHash

Schema for script hash credential
Following CIP-0019 binary representation

**Signature**

```ts
export declare const ScriptHash: Schema.TaggedStruct<
  "ScriptHash",
  { hash: Schema.filter<Schema.Schema<string, string, never>> }
>;
```

Added in v2.0.0

# transformation

## toBytes

Convert a ScriptHash to bytes

**Signature**

```ts
export declare const toBytes: (scriptHash: ScriptHash) => Uint8Array;
```

**Example**

```ts
import { ScriptHash } from "@lucid-evolution/experimental";

const scriptHash = {
  _tag: "ScriptHash",
  hash: "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f",
} as const;
const bytes = ScriptHash.toBytes(scriptHash);
// Returns Uint8Array containing the hash bytes
```

Added in v2.0.0
