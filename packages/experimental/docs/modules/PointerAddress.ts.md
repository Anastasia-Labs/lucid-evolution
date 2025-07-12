---
title: PointerAddress.ts
nav_order: 301
parent: Modules
---

## PointerAddress overview

---

<h2 class="text-delta">Table of contents</h2>

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
- [utils](#utils)
  - [Bytes](#bytes)
  - [HexString](#hexstring)
  - [PointerAddress (interface)](#pointeraddress-interface)

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
  [Natural.Natural, number],
  PointerAddressError | ParseResult.ParseIssue
>;
```

**Example**

```ts
import { PointerAddress } from "@evolution-sdk/experimental";
import { Effect } from "effect";
import assert from "assert";

// Create a buffer that encodes the value 128
const buffer = new Uint8Array([0x80, 0x01]);

const effect = PointerAddress.decodeVariableLength(buffer, 0);
const [natural, bytesRead] = Effect.runSync(effect);
assert(natural === 128);
assert(bytesRead === 2);
```

Added in v2.0.0

## encodeVariableLength

Encode a number as a variable length integer following the Cardano ledger specification

**Signature**

```ts
export declare const encodeVariableLength: (
  natural: Natural.Natural,
) => Effect.Effect<Uint8Array, ParseResult.ParseIssue, never>;
```

Added in v2.0.0

# equality

## equals

Check if two PointerAddress instances are equal.

**Signature**

```ts
export declare const equals: (a: PointerAddress, b: PointerAddress) => boolean;
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
import { PointerAddress } from "@evolution-sdk/experimental";
import { FastCheck } from "effect";
import assert from "assert";

const randomSamples = FastCheck.sample(PointerAddress.generator, 20);
randomSamples.forEach((address) => {
  assert(address._tag === "PointerAddress");
  assert(typeof address.networkId === "number");
  assert(address.pointer.slot > 0);
  assert(address.pointer.txIndex > 0);
  assert(address.pointer.certIndex > 0);
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

# utils

## Bytes

**Signature**

```ts
export declare const Bytes: Schema.transformOrFail<
  typeof Schema.Uint8ArrayFromSelf,
  typeof PointerAddress,
  never
>;
```

## HexString

**Signature**

```ts
export declare const HexString: Schema.transformOrFail<
  Schema.SchemaClass<
    string & Brand<"HexString">,
    string & Brand<"HexString">,
    never
  >,
  typeof PointerAddress,
  never
>;
```

## PointerAddress (interface)

**Signature**

```ts
export interface PointerAddress {
  readonly [NominalType]: unique symbol;
}
```
