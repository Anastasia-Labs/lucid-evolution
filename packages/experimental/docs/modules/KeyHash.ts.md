---
title: KeyHash.ts
nav_order: 291
parent: Modules
---

## KeyHash overview

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
  - [KeyHashError (class)](#keyhasherror-class)
- [model](#model)
  - [KeyHash (type alias)](#keyhash-type-alias)
- [schemas](#schemas)
  - [KeyHash](#keyhash)
- [transformation](#transformation)
  - [toBytes](#tobytes)

---

# constructors

## fromBytes

Create a KeyHash directly from bytes

**Signature**

```ts
export declare const fromBytes: (bytes: Uint8Array) => KeyHash;
```

**Example**

```ts
import { KeyHash, Bytes } from "@lucid-evolution/experimental";

const bytes = Bytes.fromHex(
  "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f",
);
const keyHash = KeyHash.fromBytes(bytes);
// Returns { _tag: "KeyHash", hash: "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f" }
```

Added in v2.0.0

# encoding/decoding

## fromCBOR

Create a KeyHash from a CBOR hex string

**Signature**

```ts
export declare const fromCBOR: (
  hex: string,
) => Effect.Effect<KeyHash, CBOR.CBORError | ParseError>;
```

**Example**

```ts
import { KeyHash } from "@lucid-evolution/experimental";
import { Effect } from "effect";

const cborHex = "581cc37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f";
const keyHashEffect = KeyHash.fromCBOR(cborHex);
const keyHash = Effect.runSync(keyHashEffect);
// Returns a KeyHash object
```

Added in v2.0.0

## fromCBORBytes

Create a KeyHash from CBOR bytes

**Signature**

```ts
export declare const fromCBORBytes: (
  bytes: Uint8Array,
) => Effect.Effect<KeyHash, CBOR.CBORError | ParseError>;
```

**Example**

```ts
import { KeyHash, Bytes } from "@lucid-evolution/experimental";
import { Effect } from "effect";

const bytes = Bytes.fromHex(
  "581cc37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f",
);
const keyHashEffect = KeyHash.fromCBORBytes(bytes);
const keyHash = Effect.runSync(keyHashEffect);
// Returns a KeyHash object
```

Added in v2.0.0

## toCBOR

Convert a KeyHash to CBOR hex string

**Signature**

```ts
export declare const toCBOR: (
  keyHash: KeyHash,
) => Effect.Effect<string, CBOR.CBORError>;
```

**Example**

```ts
import { KeyHash } from "@lucid-evolution/experimental";
import { Effect } from "effect";

const keyHash = {
  _tag: "KeyHash",
  hash: "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f",
} as const;
const hexEffect = KeyHash.toCBOR(keyHash);
const hex = Effect.runSync(hexEffect);
// Returns a CBOR hex string representation
```

Added in v2.0.0

## toCBORBytes

Convert a KeyHash to CBOR bytes

**Signature**

```ts
export declare const toCBORBytes: (
  keyHash: KeyHash,
) => Effect.Effect<Uint8Array, CBOR.CBORError>;
```

**Example**

```ts
import { KeyHash } from "@lucid-evolution/experimental";
import { Effect } from "effect";

const keyHash = {
  _tag: "KeyHash",
  hash: "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f",
} as const;
const bytesEffect = KeyHash.toCBORBytes(keyHash);
const bytes = Effect.runSync(bytesEffect);
// Returns Uint8Array containing CBOR encoded bytes
```

Added in v2.0.0

# errors

## KeyHashError (class)

Error class for KeyHash related operations
Extends TaggedError for better error handling and categorization

**Signature**

```ts
export declare class KeyHashError
```

Added in v2.0.0

# model

## KeyHash (type alias)

Type representing a key hash credential
Used in addresses to identify verification key ownership

**Signature**

```ts
export type KeyHash = Schema.Schema.Type<typeof KeyHash>;
```

Added in v2.0.0

# schemas

## KeyHash

Schema for KeyHash representing a verification key hash
Following CIP-0019 binary representation

**Signature**

```ts
export declare const KeyHash: Schema.TaggedStruct<
  "KeyHash",
  { hash: Schema.filter<Schema.Schema<string, string, never>> }
>;
```

Added in v2.0.0

# transformation

## toBytes

Convert a KeyHash to bytes

**Signature**

```ts
export declare const toBytes: (keyHash: KeyHash) => Uint8Array;
```

**Example**

```ts
import { KeyHash } from "@lucid-evolution/experimental";

const keyHash = {
  _tag: "KeyHash",
  hash: "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f",
} as const;
const bytes = KeyHash.toBytes(keyHash);
// Returns Uint8Array containing the hash bytes
```

Added in v2.0.0
