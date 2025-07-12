---
title: Credential.ts
nav_order: 294
parent: Modules
---

## Credential overview

---

<h2 class="text-delta">Table of contents</h2>

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
- [utils](#utils)
  - [CBORBytes](#cborbytes)
  - [CBORHex](#cborhex)

---

# equality

## equals

Check if two Credential instances are equal.

**Signature**

```ts
export declare const equals: (a: Credential, b: Credential) => boolean;
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
import { Credential } from "@evolution-sdk/experimental";
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

# utils

## CBORBytes

**Signature**

```ts
export declare const CBORBytes: Schema.transformOrFail<
  Schema.declare<any, any, readonly [], never>,
  Schema.Union<[typeof KeyHash.KeyHash, typeof ScriptHash.ScriptHash]>,
  never
>;
```

## CBORHex

**Signature**

```ts
export declare const CBORHex: Schema.transformOrFail<
  Schema.SchemaClass<
    string & Brand<"HexString">,
    string & Brand<"HexString">,
    never
  >,
  Schema.Union<[typeof KeyHash.KeyHash, typeof ScriptHash.ScriptHash]>,
  never
>;
```
