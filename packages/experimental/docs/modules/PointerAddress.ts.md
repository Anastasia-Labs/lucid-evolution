---
title: PointerAddress.ts
nav_order: 300
parent: Modules
---

## PointerAddress overview

---

<h2 class="text-delta">Table of contents</h2>

- [encoding/decoding](#encodingdecoding)
  - [decodeVariableLength](#decodevariablelength)
  - [encodeVariableLength](#encodevariablelength)
- [model](#model)
  - [PointerAddressError (class)](#pointeraddresserror-class)
- [predicates](#predicates)
  - [isPointer](#ispointer)
- [schemas](#schemas)
  - [Pointer (class)](#pointer-class)
  - [PointerAddress (class)](#pointeraddress-class)
- [utils](#utils)
  - [fromBytes](#frombytes)
  - [makeOrThrow](#makeorthrow)
  - [toBytes](#tobytes)

---

# encoding/decoding

## decodeVariableLength

Decode a variable length integer from a Uint8Array
Following the Cardano ledger implementation for variable-length integers

**Signature**

```ts
export declare const decodeVariableLength: (
  bytes: Uint8Array,
  offset?: number | undefined,
) => Effect.Effect<
  [Positive.Positive, number],
  PointerAddressError | ParseError
>;
```

**Example**

```ts
import { PointerAddress } from "@lucid-evolution/experimental";
import { Effect } from "effect";
import assert from "assert";

// Create a buffer that encodes the value 128
const buffer = new Uint8Array([0x80, 0x01]);

const effect = PointerAddress.decodeVariableLength(buffer, 0);
const [positive, bytesRead] = Effect.runSync(effect);
assert(positive.number === 128);
assert(bytesRead === 2);
```

Added in v2.0.0

## encodeVariableLength

Encode a number as a variable length integer following the Cardano ledger specification

**Signature**

```ts
export declare const encodeVariableLength: (
  positive: Positive.Positive,
) => Uint8Array;
```

**Example**

```ts
import { PointerAddress, Positive } from "@lucid-evolution/experimental";
import { Effect } from "effect";
import assert from "assert";

const bytes = PointerAddress.encodeVariableLength(Positive.makeOrThrow(128));
assert(bytes instanceof Uint8Array);
assert(bytes.length === 2);
assert(bytes[0] === 0x80);
assert(bytes[1] === 0x01);

const smallBytes = PointerAddress.encodeVariableLength(
  Positive.makeOrThrow(42),
);
assert(smallBytes instanceof Uint8Array);
assert(smallBytes.length === 1);
assert(smallBytes[0] === 42);
```

Added in v2.0.0

# model

## PointerAddressError (class)

Error thrown when address operations fail

**Signature**

```ts
export declare class PointerAddressError
```

Added in v2.0.0

# predicates

## isPointer

Check if the given value is a valid Pointer

**Signature**

```ts
export declare const isPointer: (
  u: unknown,
  overrideOptions?: ParseOptions | number,
) => u is Pointer;
```

**Example**

```ts
import { PointerAddress, Positive } from "@lucid-evolution/experimental";
import assert from "assert";

const pointer = PointerAddress.Pointer.make({
  slot: Positive.makeOrThrow(1),
  txIndex: Positive.makeOrThrow(2),
  certIndex: Positive.makeOrThrow(3),
});
const isValid = PointerAddress.isPointer(pointer);
assert(isValid === true);
```

Added in v2.0.0

# schemas

## Pointer (class)

Schema for pointer to a stake registration certificate
Contains slot, transaction index, and certificate index information

**Signature**

```ts
export declare class Pointer
```

Added in v2.0.0

## PointerAddress (class)

Pointer address with payment credential and pointer to stake registration

**Signature**

```ts
export declare class PointerAddress
```

Added in v2.0.0

# utils

## fromBytes

**Signature**

```ts
export declare const fromBytes: (
  bytes: Uint8Array,
) => Effect.Effect<
  PointerAddress,
  [
    | YieldWrap<Effect.Effect<KeyHash.KeyHash, KeyHash.KeyHashError, never>>
    | YieldWrap<
        Effect.Effect<ScriptHash.ScriptHash, ScriptHash.ScriptHashError, never>
      >
    | YieldWrap<
        Effect.Effect<
          [Positive.Positive, number],
          PointerAddressError | ParseError,
          never
        >
      >,
  ] extends [never]
    ? never
    : [
          | YieldWrap<
              Effect.Effect<KeyHash.KeyHash, KeyHash.KeyHashError, never>
            >
          | YieldWrap<
              Effect.Effect<
                ScriptHash.ScriptHash,
                ScriptHash.ScriptHashError,
                never
              >
            >
          | YieldWrap<
              Effect.Effect<
                [Positive.Positive, number],
                PointerAddressError | ParseError,
                never
              >
            >,
        ] extends [YieldWrap<Effect.Effect<infer _A, infer E, infer _R>>]
      ? E
      : never,
  [
    | YieldWrap<Effect.Effect<KeyHash.KeyHash, KeyHash.KeyHashError, never>>
    | YieldWrap<
        Effect.Effect<ScriptHash.ScriptHash, ScriptHash.ScriptHashError, never>
      >
    | YieldWrap<
        Effect.Effect<
          [Positive.Positive, number],
          PointerAddressError | ParseError,
          never
        >
      >,
  ] extends [never]
    ? never
    : [
          | YieldWrap<
              Effect.Effect<KeyHash.KeyHash, KeyHash.KeyHashError, never>
            >
          | YieldWrap<
              Effect.Effect<
                ScriptHash.ScriptHash,
                ScriptHash.ScriptHashError,
                never
              >
            >
          | YieldWrap<
              Effect.Effect<
                [Positive.Positive, number],
                PointerAddressError | ParseError,
                never
              >
            >,
        ] extends [YieldWrap<Effect.Effect<infer _A, infer _E, infer R>>]
      ? R
      : never
>;
```

## makeOrThrow

**Signature**

```ts
export declare const makeOrThrow: (
  networkId: number,
  paymentCredential: Credential.Credential,
  slot: Positive.Positive,
  txIndex: Positive.Positive,
  certIndex: Positive.Positive,
) => PointerAddress;
```

## toBytes

**Signature**

```ts
export declare const toBytes: (address: PointerAddress) => Uint8Array;
```
