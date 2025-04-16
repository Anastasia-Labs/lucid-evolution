---
title: Credential.ts
nav_order: 289
parent: Modules
---

## Credential overview

---

<h2 class="text-delta">Table of contents</h2>

- [encoding/decoding](#encodingdecoding)
  - [fromCBOR](#fromcbor)
  - [fromCBORBytes](#fromcborbytes)
  - [toCBOR](#tocbor)
- [errors](#errors)
  - [CredentialError (class)](#credentialerror-class)
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
export declare const fromCBOR: (
  cborHex: string,
) => Effect.Effect<
  | Effect.Effect<{ _tag: string; hash: string }, Bytes.BytesError, never>
  | KeyHash.KeyHash,
  CBOR.CBORError | KeyHash.KeyHashError | CredentialError,
  never
>;
```

**Example**

```ts
import { Credential } from "@lucid-evolution/experimental";
import { Effect } from "effect";

const cborHex =
  "8200581cc37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f";
const credentialEffect = Credential.fromCBOR(cborHex);
const credential = Effect.runSync(credentialEffect);
// Returns a KeyHash credential
```

Added in v2.0.0

## fromCBORBytes

Decode CBOR bytes to a Credential
Internal helper function used by fromCBOR

**Signature**

```ts
export declare const fromCBORBytes: (
  bytes: any,
) => Effect.Effect<
  | Effect.Effect<{ _tag: string; hash: string }, Bytes.BytesError, never>
  | KeyHash.KeyHash,
  [
    | YieldWrap<Effect.Effect<any, CBOR.CBORError, never>>
    | YieldWrap<Effect.Effect<KeyHash.KeyHash, KeyHash.KeyHashError, never>>
    | YieldWrap<Effect.Effect<never, CredentialError, never>>,
  ] extends [never]
    ? never
    : [
          | YieldWrap<Effect.Effect<any, CBOR.CBORError, never>>
          | YieldWrap<
              Effect.Effect<KeyHash.KeyHash, KeyHash.KeyHashError, never>
            >
          | YieldWrap<Effect.Effect<never, CredentialError, never>>,
        ] extends [YieldWrap<Effect.Effect<infer _A, infer E, infer _R>>]
      ? E
      : never,
  [
    | YieldWrap<Effect.Effect<any, CBOR.CBORError, never>>
    | YieldWrap<Effect.Effect<KeyHash.KeyHash, KeyHash.KeyHashError, never>>
    | YieldWrap<Effect.Effect<never, CredentialError, never>>,
  ] extends [never]
    ? never
    : [
          | YieldWrap<Effect.Effect<any, CBOR.CBORError, never>>
          | YieldWrap<
              Effect.Effect<KeyHash.KeyHash, KeyHash.KeyHashError, never>
            >
          | YieldWrap<Effect.Effect<never, CredentialError, never>>,
        ] extends [YieldWrap<Effect.Effect<infer _A, infer _E, infer R>>]
      ? R
      : never
>;
```

**Example**

```ts
import { Credential, Bytes } from "@lucid-evolution/experimental";
import { Effect } from "effect";

const bytes = Bytes.fromHexOrThrow(
  "8201581cc37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f",
);
const credentialEffect = Credential.fromCBORBytes(bytes);
const credential = Effect.runSync(credentialEffect);
// Returns a KeyHash credential
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
export declare const toCBOR: (
  credential: Credential,
) => Effect.Effect<
  Effect.Effect<string, Bytes.BytesError, never>,
  CBOR.CBORError,
  never
>;
```

**Example**

```ts
import { Credential } from "@lucid-evolution/experimental";
import { Effect } from "effect";

const scriptHashCredential = {
  _tag: "ScriptHash",
  hash: "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f",
} as const;

const cborHexEffect = Credential.toCBOR(scriptHashCredential);
const cborHex = Effect.runSync(cborHexEffect);
// Returns "8201581cc37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f"
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
) => u is
  | { readonly hash: string; readonly _tag: "ScriptHash" }
  | KeyHash.KeyHash;
```

**Example**

```ts
import { Credential } from "@lucid-evolution/experimental";

const credential = {
  _tag: "KeyHash",
  hash: "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f",
};
const isValid = Credential.isCredential(credential);
// Returns true if credential is valid
```

Added in v2.0.0

# schemas

## Credential

Credential schema representing either a key hash or script hash
Used to identify ownership of addresses or stake rights

**Signature**

```ts
export declare const Credential: Schema.Union<
  [
    typeof KeyHash.KeyHash,
    Schema.TaggedStruct<
      "ScriptHash",
      { hash: Schema.refine<string, Schema.Schema<string, string, never>> }
    >,
  ]
>;
```

Added in v2.0.0
