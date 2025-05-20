---
title: Credential.ts
nav_order: 294
parent: Modules
---

## Credential overview

---

<h2 class="text-delta">Table of contents</h2>

- [encoding/decoding](#encodingdecoding)
  - [fromCBOR](#fromcbor)
  - [fromCBORBytes](#fromcborbytes)
  - [fromCBORBytesOrThrow](#fromcborbytesorthrow)
  - [fromCBOROrThrow](#fromcbororthrow)
  - [toCBOR](#tocbor)
- [equality](#equality)
  - [equals](#equals)
- [errors](#errors)
  - [CredentialError (class)](#credentialerror-class)
- [generators](#generators)
  - [generator](#generator)
- [model](#model)
  - [Credential (type alias)](#credential-type-alias)
- [predicates](#predicates)
  - [isCredential](#iscredential)
- [schemas](#schemas)
  - [Credential](#credential)

---

# encoding/decoding

## fromCBOR

Decode a CBOR hex string to a Credential

**Signature**

```ts
export declare const fromCBOR: SerdeImpl.FromCBOR<
  ScriptHash.ScriptHash | KeyHash.KeyHash,
  | CBOR.CBORError
  | Bytes.BytesError
  | ScriptHash.ScriptHashError
  | KeyHash.KeyHashError
  | CredentialError
>;
```

**Example**

```ts
import { Credential } from "@lucid-evolution/experimental";
import { Effect } from "effect";
import assert from "assert";

const cborHex =
  "8200581cc37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f";
const credentialEffect = Credential.fromCBOR(cborHex);
const credential = Effect.runSync(credentialEffect);
assert(credential._tag === "KeyHash");
assert(
  credential.hash ===
    "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f",
);
```

Added in v2.0.0

## fromCBORBytes

Decode CBOR bytes to a Credential
Internal helper function used by fromCBOR

**Signature**

```ts
export declare const fromCBORBytes: SerdeImpl.FromCBORBytes<
  ScriptHash.ScriptHash | KeyHash.KeyHash,
  | CBOR.CBORError
  | ScriptHash.ScriptHashError
  | KeyHash.KeyHashError
  | CredentialError
>;
```

**Example**

```ts
import { Credential, Bytes } from "@lucid-evolution/experimental";
import { Effect } from "effect";
import assert from "assert";

const bytes = Bytes.fromHexOrThrow(
  "8201581cc37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f",
);
const credentialEffect = Credential.fromCBORBytes(bytes);
const credential = Effect.runSync(credentialEffect);
assert(credential._tag === "ScriptHash");
assert(
  credential.hash ===
    "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f",
);
```

Added in v2.0.0

## fromCBORBytesOrThrow

Decode CBOR bytes to a Credential, throws on error.

**Signature**

```ts
export declare const fromCBORBytesOrThrow: SerdeImpl.FromCBORBytesOrThrow<
  ScriptHash.ScriptHash | KeyHash.KeyHash
>;
```

**Example**

```ts
import { Credential, Bytes } from "@lucid-evolution/experimental";
import assert from "assert";

const bytes = Bytes.fromHexOrThrow(
  "8201581cc37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f",
);
const credential = Credential.fromCBORBytesOrThrow(bytes);
assert(credential._tag === "ScriptHash");
assert(
  credential.hash ===
    "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f",
);
```

Added in v2.0.0

## fromCBOROrThrow

Decode a CBOR hex string to a Credential, throws on error.

**Signature**

```ts
export declare const fromCBOROrThrow: SerdeImpl.FromCBOROrThrow<
  ScriptHash.ScriptHash | KeyHash.KeyHash
>;
```

**Example**

```ts
import { Credential } from "@lucid-evolution/experimental";
import assert from "assert";

const cborHex =
  "8200581cc37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f";
const credential = Credential.fromCBOROrThrow(cborHex);
assert(credential._tag === "KeyHash");
assert(
  credential.hash ===
    "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f",
);
```

Added in v2.0.0

## toCBOR

CBOR diagnostic notation for Credential:
credential = [0, addr_keyhash // 1, script_hash]

CBOR hex for ScriptHash:
[ 1, h'c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f' ]

CBOR hex for KeyHash:
[ 0, h'c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f' ]

Convert credential to CBOR hex encoding
Uses a pre-configured CBOR encoder for better performance

**Signature**

```ts
export declare const toCBOR: SerdeImpl.ToCBOR<
  ScriptHash.ScriptHash | KeyHash.KeyHash
>;
```

**Example**

```ts
import { Credential, ScriptHash } from "@lucid-evolution/experimental";
import assert from "assert";

const scriptHashCredential = ScriptHash.makeOrThrow(
  "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f",
);
const cbor = Credential.toCBOR(scriptHashCredential);
assert(
  cbor === "8201581cc37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f",
);
```

Added in v2.0.0

# equality

## equals

Check if two Credential instances are equal.

**Signature**

```ts
export declare const equals: (a: Credential, b: Credential) => boolean;
```

**Example**

```ts
import { Credential, KeyHash, ScriptHash } from "@lucid-evolution/experimental";
import assert from "assert";

const keyHash = KeyHash.makeOrThrow(
  "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f",
);
const sameKeyHash = KeyHash.makeOrThrow(
  "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f",
);
const scriptHash = ScriptHash.makeOrThrow(
  "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f",
);

assert(Credential.equals(keyHash, sameKeyHash) === true);
assert(Credential.equals(keyHash, scriptHash) === false);
```

Added in v2.0.0

# errors

## CredentialError (class)

Extends TaggedError for better error handling and categorization

**Signature**

```ts
export declare class CredentialError
```

Added in v2.0.0

# generators

## generator

Generate a random Credential.
Randomly selects between generating a KeyHash or ScriptHash credential.

**Signature**

```ts
export declare const generator: FastCheck.Arbitrary<
  ScriptHash.ScriptHash | KeyHash.KeyHash
>;
```

**Example**

```ts
import { Credential } from "@lucid-evolution/experimental";
import { FastCheck } from "effect";
import assert from "assert";

const randomSamples = FastCheck.sample(Credential.generator, 20);
randomSamples.forEach((credential) => {
  assert(credential._tag === "KeyHash" || credential._tag === "ScriptHash");
  assert(credential.hash.length === 56);
});
```

Added in v2.0.0

# model

## Credential (type alias)

Type representing a credential that can be either a key hash or script hash
Used in various address formats to identify ownership

**Signature**

```ts
export type Credential = typeof Credential.Type;
```

Added in v2.0.0

# predicates

## isCredential

Check if the given value is a valid Credential

**Signature**

```ts
export declare const isCredential: (
  u: unknown,
  overrideOptions?: ParseOptions | number,
) => u is ScriptHash.ScriptHash | KeyHash.KeyHash;
```

**Example**

```ts
import { Credential, KeyHash } from "@lucid-evolution/experimental";
import assert from "assert";

const credential = KeyHash.makeOrThrow(
  "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f",
);
const isValid = Credential.isCredential(credential);
assert(isValid === true);
```

Added in v2.0.0

# schemas

## Credential

Credential schema representing either a key hash or script hash
Used to identify ownership of addresses or stake rights

**Signature**

```ts
export declare const Credential: Schema.Union<
  [typeof KeyHash.KeyHash, typeof ScriptHash.ScriptHash]
>;
```

Added in v2.0.0
