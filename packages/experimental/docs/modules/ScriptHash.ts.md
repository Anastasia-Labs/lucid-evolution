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
- [equality](#equality)
  - [equals](#equals)
- [errors](#errors)
  - [ScriptHashError (class)](#scripthasherror-class)
- [generators](#generators)
  - [generator](#generator)
- [schemas](#schemas)
  - [ScriptHash (class)](#scripthash-class)
    - [[Inspectable.NodeInspectSymbol] (method)](#inspectablenodeinspectsymbol-method)
- [utils](#utils)
  - [Bytes](#bytes)
  - [ScriptHash (interface)](#scripthash-interface)
  - [ScriptHashBytes](#scripthashbytes)
  - [ScriptHashFromHex](#scripthashfromhex)

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

# equality

## equals

Check if two ScriptHash instances are equal.

**Signature**

```ts
export declare const equals: (a: ScriptHash, b: ScriptHash) => boolean;
```

Added in v2.0.0

# errors

## ScriptHashError (class)

Error class for ScriptHash related operations.

**Signature**

```ts
export declare class ScriptHashError
```

**Example**

```ts
import { ScriptHash } from "@evolution-sdk/experimental";
import assert from "assert";

const error = new ScriptHash.ScriptHashError({
  message: "Invalid script hash",
});
assert(error.message === "Invalid script hash");
```

Added in v2.0.0

# generators

## generator

Generate a random ScriptHash.

**Signature**

```ts
export declare const generator: FastCheck.Arbitrary<ScriptHash>;
```

**Example**

```ts
import { ScriptHash } from "@evolution-sdk/experimental";
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

# utils

## Bytes

**Signature**

```ts
export declare const Bytes: Schema.transform<
  Schema.SchemaClass<any, any, never>,
  typeof ScriptHash
>;
```

## ScriptHash (interface)

**Signature**

```ts
export interface ScriptHash {
  readonly [NominalType]: unique symbol;
}
```

## ScriptHashBytes

**Signature**

```ts
export declare const ScriptHashBytes: Schema.SchemaClass<any, any, never>;
```

## ScriptHashFromHex

**Signature**

```ts
export declare const ScriptHashFromHex: Schema.transform<
  Schema.SchemaClass<
    string & Brand<"HexString">,
    string & Brand<"HexString">,
    never
  >,
  typeof ScriptHash
>;
```
