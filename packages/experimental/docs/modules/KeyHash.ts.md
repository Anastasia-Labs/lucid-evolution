---
title: KeyHash.ts
nav_order: 298
parent: Modules
---

## KeyHash overview

---

<h2 class="text-delta">Table of contents</h2>

- [constants](#constants)
  - [KEYHASH_BYTES_LENGTH](#keyhash_bytes_length)
  - [KEYHASH_HEX_LENGTH](#keyhash_hex_length)
- [constructors](#constructors)
  - [decodeBytes](#decodebytes)
  - [decodeBytesOrThrow](#decodebytesorthrow)
  - [make](#make)
  - [makeOrThrow](#makeorthrow)
- [equality](#equality)
  - [equals](#equals)
- [errors](#errors)
  - [KeyHashError (class)](#keyhasherror-class)
- [generators](#generators)
  - [generator](#generator)
- [schemas](#schemas)
  - [KeyHash (class)](#keyhash-class)
    - [[Inspectable.NodeInspectSymbol] (method)](#inspectablenodeinspectsymbol-method)
- [transformation](#transformation)
  - [toBytes](#tobytes)
- [utils](#utils)
  - [KeyHash (interface)](#keyhash-interface)

---

# constants

## KEYHASH_BYTES_LENGTH

The length in bytes of a KeyHash.

**Signature**

```ts
export declare const KEYHASH_BYTES_LENGTH: 28
```

Added in v2.0.0

## KEYHASH_HEX_LENGTH

The length in hex characters of a KeyHash.

**Signature**

```ts
export declare const KEYHASH_HEX_LENGTH: 56
```

Added in v2.0.0

# constructors

## decodeBytes

Create a KeyHash directly from bytes.

**Signature**

```ts
export declare const decodeBytes: Serialization.FromBytes<KeyHash, KeyHashError>
```

**Example**

```ts
import { KeyHash, Bytes } from "@lucid-evolution/experimental"
import assert from "assert"

const bytes = Bytes.fromHexOrThrow("c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f")
const keyHash = KeyHash.decodeBytesOrThrow(bytes)
assert(keyHash._tag === "KeyHash")
assert(keyHash.hash === "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f")
```

Added in v2.0.0

## decodeBytesOrThrow

Create a KeyHash directly from bytes, throws on error.

**Signature**

```ts
export declare const decodeBytesOrThrow: (bytes: Uint8Array) => KeyHash
```

**Example**

```ts
import { KeyHash, Bytes } from "@lucid-evolution/experimental"
import assert from "assert"

const bytes = Bytes.fromHexOrThrow("c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f")
assert(bytes.length === 28)
const keyHash = KeyHash.decodeBytesOrThrow(bytes)
assert(keyHash._tag === "KeyHash")
assert(keyHash.hash === "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f")
```

Added in v2.0.0

## make

Construct a KeyHash from a hex string.

**Signature**

```ts
export declare const make: Serialization.Make<KeyHash, KeyHashError>
```

**Example**

```ts
import { KeyHash } from "@lucid-evolution/experimental"
import assert from "assert"

const hash = "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f"
const keyHash = KeyHash.makeOrThrow(hash)
assert(keyHash._tag === "KeyHash")
assert(keyHash.hash === hash)
```

Added in v2.0.0

## makeOrThrow

Construct a KeyHash from a hex string, throws on error.

**Signature**

```ts
export declare const makeOrThrow: Serialization.MakeOrThrow<string, KeyHash>
```

**Example**

```ts
import { KeyHash } from "@lucid-evolution/experimental"
import assert from "assert"

const hash = "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f"
const keyHash = KeyHash.makeOrThrow(hash)
assert(keyHash._tag === "KeyHash")
assert(keyHash.hash === hash)
```

Added in v2.0.0

# equality

## equals

Check if two KeyHash instances are equal.

**Signature**

```ts
export declare const equals: (a: KeyHash, b: KeyHash) => boolean
```

**Example**

```ts
import { KeyHash } from "@lucid-evolution/experimental"
import assert from "assert"

const keyHash1 = KeyHash.makeOrThrow("c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f")
const keyHash2 = KeyHash.makeOrThrow("c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f")
const keyHash3 = KeyHash.makeOrThrow("530245ff0704032c031302cf01fb06010521a7fd024404010004f814")

assert(KeyHash.equals(keyHash1, keyHash2) === true)
assert(KeyHash.equals(keyHash1, keyHash3) === false)
```

Added in v2.0.0

# errors

## KeyHashError (class)

Error class for KeyHash related operations.

**Signature**

```ts
export declare class KeyHashError
```

**Example**

```ts
import { KeyHash } from "@lucid-evolution/experimental"
import assert from "assert"

const error = new KeyHash.KeyHashError({ message: "Invalid key hash" })
assert(error.message === "Invalid key hash")
```

Added in v2.0.0

# generators

## generator

Generate a random KeyHash.

**Signature**

```ts
export declare const generator: FastCheck.Arbitrary<KeyHash>
```

**Example**

```ts
import { KeyHash } from "@lucid-evolution/experimental"
import { FastCheck } from "effect"
import assert from "assert"

const randomSamples = FastCheck.sample(KeyHash.generator, 20)
randomSamples.forEach((keyHash) => {
  assert(keyHash.hash.length === 56)
})
```

Added in v2.0.0

# schemas

## KeyHash (class)

Schema for KeyHash representing a verification key hash.
Follows CIP-0019 binary representation.

**Signature**

```ts
export declare class KeyHash
```

Added in v2.0.0

### [Inspectable.NodeInspectSymbol] (method)

**Signature**

```ts
;[Inspectable.NodeInspectSymbol]()
```

# transformation

## toBytes

Convert a KeyHash to bytes.

**Signature**

```ts
export declare const toBytes: Serialization.ToBytes<KeyHash>
```

**Example**

```ts
import { KeyHash, Bytes } from "@lucid-evolution/experimental"
import assert from "assert"

const keyHash = KeyHash.makeOrThrow("c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f")
const bytes = KeyHash.toBytes(keyHash)
assert(bytes instanceof Uint8Array)
assert(bytes.length === 28)
assert(Bytes.toHexOrThrow(bytes) === "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f")
```

Added in v2.0.0

# utils

## KeyHash (interface)

**Signature**

```ts
export interface KeyHash {
  readonly [NominalType]: unique symbol
}
```
