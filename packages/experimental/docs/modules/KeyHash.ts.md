---
title: KeyHash.ts
nav_order: 301
parent: Modules
---

## KeyHash overview

---

<h2 class="text-delta">Table of contents</h2>

- [constants](#constants)
  - [KEYHASH_BYTES_LENGTH](#keyhash_bytes_length)
  - [KEYHASH_HEX_LENGTH](#keyhash_hex_length)
- [encoding/decoding](#encodingdecoding)
  - [Decode](#decode)
  - [DecodeEither](#decodeeither)
  - [Encode](#encode)
  - [EncodeEither](#encodeeither)
- [equality](#equality)
  - [equals](#equals)
- [errors](#errors)
  - [KeyHashError (class)](#keyhasherror-class)
- [generators](#generators)
  - [generator](#generator)
- [schemas](#schemas)
  - [KeyHash (class)](#keyhash-class)
    - [[Inspectable.NodeInspectSymbol] (method)](#inspectablenodeinspectsymbol-method)
- [utils](#utils)
  - [Bytes](#bytes)
  - [HexString](#hexstring)
  - [KeyHash (interface)](#keyhash-interface)
  - [KeyHashBytes](#keyhashbytes)

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

# encoding/decoding

## Decode

Synchronous decoding utilities for KeyHash.

**Signature**

```ts
export declare const Decode: {
  hex: (u: unknown, overrideOptions?: ParseOptions) => KeyHash
  bytes: (u: unknown, overrideOptions?: ParseOptions) => KeyHash
}
```

Added in v2.0.0

## DecodeEither

Either decoding utilities for KeyHash.

**Signature**

```ts
export declare const DecodeEither: {
  hex: (u: unknown, overrideOptions?: ParseOptions) => Either<KeyHash, ParseError>
  bytes: (u: unknown, overrideOptions?: ParseOptions) => Either<KeyHash, ParseError>
}
```

Added in v2.0.0

## Encode

Synchronous encoding utilities for KeyHash.

**Signature**

```ts
export declare const Encode: {
  hex: (a: KeyHash, overrideOptions?: ParseOptions) => string & Brand<"HexString">
  bytes: (a: KeyHash, overrideOptions?: ParseOptions) => any
}
```

Added in v2.0.0

## EncodeEither

Either encoding utilities for KeyHash.

**Signature**

```ts
export declare const EncodeEither: {
  hex: (a: KeyHash, overrideOptions?: ParseOptions) => Either<string & Brand<"HexString">, ParseError>
  bytes: (a: KeyHash, overrideOptions?: ParseOptions) => Either<any, ParseError>
}
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

# utils

## Bytes

**Signature**

```ts
export declare const Bytes: Schema.transform<Schema.SchemaClass<any, any, never>, typeof KeyHash>
```

## HexString

**Signature**

```ts
export declare const HexString: Schema.transform<
  Schema.SchemaClass<string & Brand<"HexString">, string & Brand<"HexString">, never>,
  typeof KeyHash
>
```

## KeyHash (interface)

**Signature**

```ts
export interface KeyHash {
  readonly [NominalType]: unique symbol
}
```

## KeyHashBytes

**Signature**

```ts
export declare const KeyHashBytes: Schema.SchemaClass<any, any, never>
```
