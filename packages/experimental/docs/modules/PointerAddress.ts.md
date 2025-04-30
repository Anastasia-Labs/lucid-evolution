---
title: PointerAddress.ts
nav_order: 301
parent: Modules
---

## PointerAddress overview

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [fromBytes](#frombytes)
  - [makeOrThrow](#makeorthrow)
- [encoding/decoding](#encodingdecoding)
  - [decodeVariableLength](#decodevariablelength)
  - [encodeVariableLength](#encodevariablelength)
- [equality](#equality)
  - [equals](#equals)
- [generators](#generators)
  - [generator](#generator)
- [model](#model)
  - [PointerAddressError (class)](#pointeraddresserror-class)
- [schemas](#schemas)
  - [PointerAddress (class)](#pointeraddress-class)
    - [[Inspectable.NodeInspectSymbol] (method)](#inspectablenodeinspectsymbol-method)
- [transformation](#transformation)
  - [toBytes](#tobytes)
- [utils](#utils)
  - [PointerAddress (interface)](#pointeraddress-interface)

---

# constructors

## fromBytes

Create a PointerAddress from bytes.

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
          [Natural.Natural, number],
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
                [Natural.Natural, number],
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
          [Natural.Natural, number],
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
                [Natural.Natural, number],
                PointerAddressError | ParseError,
                never
              >
            >,
        ] extends [YieldWrap<Effect.Effect<infer _A, infer _E, infer R>>]
      ? R
      : never
>;
```

**Example**

```ts
import { PointerAddress, Bytes } from "@lucid-evolution/experimental";
import { Effect } from "effect";
import assert from "assert";

// Sample pointer address bytes - this is a placeholder example
const bytes = Bytes.fromHexOrThrow(
  "4059f801786707f961faf991fd73036405431a3f5d3a97fc03eefcad05a6a685bbcb848908a2f1be9397eabf0998d2c0cde9c1e206",
);
const addressEffect = PointerAddress.fromBytes(bytes);
const address = Effect.runSync(addressEffect);
assert(address._tag === "PointerAddress");
```

Added in v2.0.0

## makeOrThrow

Create a PointerAddress from components, throws on error.

**Signature**

```ts
export declare const makeOrThrow: (
  networkId: number,
  paymentCredential: Credential.Credential,
  slot: Natural.Natural,
  txIndex: Natural.Natural,
  certIndex: Natural.Natural,
) => PointerAddress;
```

**Example**

```ts
import {
  PointerAddress,
  KeyHash,
  Natural,
} from "@lucid-evolution/experimental";
import assert from "assert";

// Create payment credential
const paymentKeyHash = KeyHash.makeOrThrow(
  "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f",
);

// Create pointer address
const address = PointerAddress.makeOrThrow(
  0,
  paymentKeyHash,
  Natural.makeOrThrow(1),
  Natural.makeOrThrow(2),
  Natural.makeOrThrow(3),
);
assert(address._tag === "PointerAddress");
assert(address.networkId === 0);
assert(address.pointer.slot.number === 1);
assert(address.pointer.txIndex.number === 2);
assert(address.pointer.certIndex.number === 3);
```

Added in v2.0.0

# encoding/decoding

## decodeVariableLength

Decode a variable length integer from a Uint8Array
Following the Cardano ledger implementation for variable-length integers

**Signature**

```ts
export declare const decodeVariableLength: (
  bytes: Uint8Array,
  offset?: number | undefined,
) => Effect.Effect<[Natural.Natural, number], PointerAddressError | ParseError>;
```

**Example**

```ts
import { PointerAddress } from "@lucid-evolution/experimental";
import { Effect } from "effect";
import assert from "assert";

// Create a buffer that encodes the value 128
const buffer = new Uint8Array([0x80, 0x01]);

const effect = PointerAddress.decodeVariableLength(buffer, 0);
const [natural, bytesRead] = Effect.runSync(effect);
assert(natural.number === 128);
assert(bytesRead === 2);
```

Added in v2.0.0

## encodeVariableLength

Encode a number as a variable length integer following the Cardano ledger specification

**Signature**

```ts
export declare const encodeVariableLength: (
  natural: Natural.Natural,
) => Uint8Array;
```

**Example**

```ts
import { PointerAddress, Natural } from "@lucid-evolution/experimental";
import { Effect } from "effect";
import assert from "assert";

const bytes = PointerAddress.encodeVariableLength(Natural.makeOrThrow(128));
assert(bytes instanceof Uint8Array);
assert(bytes.length === 2);
assert(bytes[0] === 0x80);
assert(bytes[1] === 0x01);

const smallBytes = PointerAddress.encodeVariableLength(Natural.makeOrThrow(42));
assert(smallBytes instanceof Uint8Array);
assert(smallBytes.length === 1);
assert(smallBytes[0] === 42);
```

Added in v2.0.0

# equality

## equals

Check if two PointerAddress instances are equal.

**Signature**

```ts
export declare const equals: (a: PointerAddress, b: PointerAddress) => boolean;
```

**Example**

```ts
import {
  PointerAddress,
  KeyHash,
  Natural,
} from "@lucid-evolution/experimental";
import assert from "assert";

// Create credential
const paymentKeyHash = KeyHash.makeOrThrow(
  "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f",
);

// Create two identical addresses
const address1 = PointerAddress.makeOrThrow(
  0,
  paymentKeyHash,
  Natural.makeOrThrow(1),
  Natural.makeOrThrow(2),
  Natural.makeOrThrow(3),
);
const address2 = PointerAddress.makeOrThrow(
  0,
  paymentKeyHash,
  Natural.makeOrThrow(1),
  Natural.makeOrThrow(2),
  Natural.makeOrThrow(3),
);
const address3 = PointerAddress.makeOrThrow(
  1,
  paymentKeyHash,
  Natural.makeOrThrow(1),
  Natural.makeOrThrow(2),
  Natural.makeOrThrow(3),
);

assert(PointerAddress.equals(address1, address2) === true);
assert(PointerAddress.equals(address1, address3) === false);
```

Added in v2.0.0

# generators

## generator

Generate a random PointerAddress.

**Signature**

```ts
export declare const generator: FastCheck.Arbitrary<PointerAddress>;
```

**Example**

```ts
import { PointerAddress } from "@lucid-evolution/experimental";
import { FastCheck } from "effect";
import assert from "assert";

const randomSamples = FastCheck.sample(PointerAddress.generator, 20);
randomSamples.forEach((address) => {
  assert(address._tag === "PointerAddress");
  assert(typeof address.networkId === "number");
  assert(address.pointer.slot.number > 0);
  assert(address.pointer.txIndex.number > 0);
  assert(address.pointer.certIndex.number > 0);
});
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

# schemas

## PointerAddress (class)

Pointer address with payment credential and pointer to stake registration

**Signature**

```ts
export declare class PointerAddress
```

Added in v2.0.0

### [Inspectable.NodeInspectSymbol] (method)

**Signature**

```ts
[Inspectable.NodeInspectSymbol]();
```

# transformation

## toBytes

Convert a PointerAddress to bytes.

**Signature**

```ts
export declare const toBytes: (address: PointerAddress) => Uint8Array;
```

**Example**

```ts
import {
  PointerAddress,
  KeyHash,
  Natural,
} from "@lucid-evolution/experimental";
import assert from "assert";

// Create payment credential
const paymentKeyHash = KeyHash.makeOrThrow(
  "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f",
);

// Create pointer address
const address = PointerAddress.makeOrThrow(
  0,
  paymentKeyHash,
  Natural.makeOrThrow(1),
  Natural.makeOrThrow(2),
  Natural.makeOrThrow(3),
);
const bytes = PointerAddress.toBytes(address);
assert(bytes instanceof Uint8Array);
```

Added in v2.0.0

# utils

## PointerAddress (interface)

**Signature**

```ts
export interface PointerAddress {
  readonly [NominalType]: unique symbol;
}
```
