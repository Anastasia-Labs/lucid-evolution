---
title: DatumHash.ts
nav_order: 295
parent: Modules
---

## DatumHash overview

---

<h2 class="text-delta">Table of contents</h2>

- [constants](#constants)
  - [DATUM_HASH_BYTES_LENGTH](#datum_hash_bytes_length)
  - [DATUM_HASH_HEX_LENGTH](#datum_hash_hex_length)
- [encoding/decoding](#encodingdecoding)
  - [Bytes](#bytes)
  - [HexString](#hexstring)
- [equality](#equality)
  - [equals](#equals)
- [errors](#errors)
  - [DatumHashError (class)](#datumhasherror-class)
- [generators](#generators)
  - [generator](#generator)
- [predicates](#predicates)
  - [isDatumHash](#isdatumhash)
- [schemas](#schemas)
  - [DatumHash (class)](#datumhash-class)
    - [[Inspectable.NodeInspectSymbol] (method)](#inspectablenodeinspectsymbol-method)
  - [DatumHashBytes](#datumhashbytes)
  - [Hash](#hash)

---

# constants

## DATUM_HASH_BYTES_LENGTH

The length in bytes of a DatumHash.

**Signature**

```ts
export declare const DATUM_HASH_BYTES_LENGTH: 32;
```

Added in v2.0.0

## DATUM_HASH_HEX_LENGTH

The length in hex characters of a DatumHash.

**Signature**

```ts
export declare const DATUM_HASH_HEX_LENGTH: 64;
```

Added in v2.0.0

# encoding/decoding

## Bytes

Schema for transforming between Uint8Array and DatumHash

**Signature**

```ts
export declare const Bytes: Schema.transform<
  Schema.SchemaClass<any, any, never>,
  Schema.Schema<
    DatumHash,
    { readonly hash: string & Brand<"HexString">; readonly _tag: "DatumHash" },
    never
  >
>;
```

Added in v2.0.0

## HexString

Schema for transforming between hex string and DatumHash

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
  typeof DatumHash
>;
```

Added in v2.0.0

# equality

## equals

Check if two DatumHash instances are equal.

**Signature**

```ts
export declare const equals: (a: DatumHash, b: DatumHash) => boolean;
```

**Example**

```ts
import { DatumHash } from "@lucid-evolution/experimental";
import { Schema } from "effect";
import assert from "assert";

const hash1 = Schema.decodeUnknownSync(DatumHash.HexString)(
  "5160f88b929bf8a6c57c285b889488f9137c0ef3cfd0bcf408a10020e69146d5",
);
const hash2 = Schema.decodeUnknownSync(DatumHash.HexString)(
  "5160f88b929bf8a6c57c285b889488f9137c0ef3cfd0bcf408a10020e69146d5",
);
const hash3 = Schema.decodeUnknownSync(DatumHash.HexString)(
  "bfd6dd1e96e4fd26c6379aa3093aaef25639d58ee76d045bd4528ef9f2fed808",
);

assert(DatumHash.equals(hash1, hash2) === true); // Same hash
assert(DatumHash.equals(hash1, hash3) === false); // Different hashes
```

Added in v2.0.0

# errors

## DatumHashError (class)

Error class for DatumHash related operations.

**Signature**

```ts
export declare class DatumHashError
```

**Example**

```ts
import { DatumHash } from "@lucid-evolution/experimental";
import assert from "assert";

const error = new DatumHash.DatumHashError({ message: "Invalid datum hash" });
assert(error.message === "Invalid datum hash");
```

Added in v2.0.0

# generators

## generator

Generator for creating random DatumHash instances for testing

**Signature**

```ts
export declare const generator: FastCheck.Arbitrary<DatumHash>;
```

**Example**

```ts
import { DatumHash } from "@lucid-evolution/experimental";
import { FastCheck } from "effect";
import assert from "assert";

const randomSamples = FastCheck.sample(DatumHash.generator, 10);
randomSamples.forEach((datumHash) => {
  assert(datumHash._tag === "DatumHash");
  assert(datumHash.hash.length === 64);
});
```

Added in v2.0.0

# predicates

## isDatumHash

Check if the given value is a valid DatumHash

**Signature**

```ts
export declare const isDatumHash: (
  u: unknown,
  overrideOptions?: ParseOptions | number,
) => u is DatumHash;
```

Added in v2.0.0

# schemas

## DatumHash (class)

Schema for a 32-byte datum hash

**Signature**

```ts
export declare class DatumHash
```

Added in v2.0.0

### [Inspectable.NodeInspectSymbol] (method)

**Signature**

```ts
[Inspectable.NodeInspectSymbol]();
```

## DatumHashBytes

Schema for DatumHash bytes validation

**Signature**

```ts
export declare const DatumHashBytes: Schema.SchemaClass<any, any, never>;
```

Added in v2.0.0

## Hash

Schema for validating hex strings as datum hashes

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

Added in v2.0.0
