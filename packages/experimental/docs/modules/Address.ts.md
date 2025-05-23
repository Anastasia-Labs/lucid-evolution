---
title: Address.ts
nav_order: 1
parent: Modules
---

## Address overview

---

<h2 class="text-delta">Table of contents</h2>

- [encoding/decoding](#encodingdecoding)
  - [fromBech32](#frombech32)
  - [fromBytes](#frombytes)
  - [paymentAddressToJson](#paymentaddresstojson)
  - [toBech32](#tobech32)
  - [toBytes](#tobytes)
  - [toCBOR](#tocbor)
  - [toHex](#tohex)
- [model](#model)
  - [Address (type alias)](#address-type-alias)
  - [AddressError (class)](#addresserror-class)
- [utils](#utils)
  - [equals](#equals)
  - [generator](#generator)

---

# encoding/decoding

## fromBech32

Parse the complete address structure into a typed representation
This decodes the address format according to CIP-0019 specification

**Signature**

```ts
export declare const fromBech32: Serialization.FromBech32<
  Address,
  | ScriptHash.ScriptHashError
  | KeyHash.KeyHashError
  | PointerAddress.PointerAddressError
  | ParseError
  | Bech32.Bech32Error
  | Bytes.BytesError
  | AddressError
>;
```

**Example**

```ts
import { Address } from "@lucid-evolution/experimental";
import { Effect } from "effect";
import assert from "assert";

const effect = Address.fromBech32(
  "addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x",
);
const address = Effect.runSync(effect);
assert(address._tag === "BaseAddress");
assert(address.networkId === 1);

const stakeEffect = Address.fromBech32(
  "stake1uyehkck0lajq8gr28t9uxnuvgcqrc6070x3k9r8048z8y5gh6ffgw",
);
const stakeAddress = Effect.runSync(stakeEffect);
assert(stakeAddress._tag === "RewardAccount");
```

Added in v2.0.0

## fromBytes

Convert bytes to an address structure

**Signature**

```ts
export declare const fromBytes: Serialization.FromBytes<
  Address,
  | ScriptHash.ScriptHashError
  | KeyHash.KeyHashError
  | PointerAddress.PointerAddressError
  | ParseError
  | Bytes.BytesError
  | AddressError
>;
```

**Example**

```ts
import { Address, Bytes } from "@lucid-evolution/experimental";
import { Effect } from "effect";
import assert from "assert";

const addressBytes = Bytes.fromHexOrThrow(
  "019493315cd92eb5d8c4304e67b7e16ae36d61d34502694657811a2c8e337b62cfff6403a06a3acbc34f8c46003c69fe79a3628cefa9c47251",
);
const effect = Address.fromBytes(addressBytes);
const address = Effect.runSync(effect);
assert(address._tag === "BaseAddress");
assert(address.networkId === 1);
```

Added in v2.0.0

## paymentAddressToJson

Serialize a PaymentAddress to JSON format

**Signature**

```ts
export declare const paymentAddressToJson: (address: string) => string;
```

**Example**

```ts
import { Address } from "@lucid-evolution/experimental";
import assert from "assert";

const json = Address.paymentAddressToJson(
  "addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x",
);
assert(typeof json === "string");
assert(
  JSON.parse(json).address ===
    "addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x",
);
```

Added in v2.0.0

## toBech32

Convert address to bech32 format

**Signature**

```ts
export declare const toBech32: (address: Address) => string;
```

**Example**

```ts
import { Address, Bytes } from "@lucid-evolution/experimental";
import { Effect, pipe } from "effect";
import assert from "assert";

// First create an address from bytes
const bytesEffect = pipe(
  Address.fromBytes(
    Bytes.fromHexOrThrow(
      "019493315cd92eb5d8c4304e67b7e16ae36d61d34502694657811a2c8e337b62cfff6403a06a3acbc34f8c46003c69fe79a3628cefa9c47251",
    ),
  ),
  Effect.map(Address.toBech32),
);

const bech32 = Effect.runSync(bytesEffect);
assert(typeof bech32 === "string");
assert(bech32.startsWith("addr1"));
```

Added in v2.0.0

## toBytes

Convert address to bytes

**Signature**

```ts
export declare const toBytes: (address: Address) => Uint8Array;
```

**Example**

```ts
import { Address } from "@lucid-evolution/experimental";
import { Effect, pipe } from "effect";
import assert from "assert";

const addressEffect = pipe(
  Address.fromBech32(
    "addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x",
  ),
  Effect.map(Address.toBytes),
);

const bytes = Effect.runSync(addressEffect);
assert(bytes instanceof Uint8Array);
assert(bytes.length > 0);
```

Added in v2.0.0

## toCBOR

Encode a Cardano address to CBOR format

**Signature**

```ts
export declare const toCBOR: (address: Address) => unknown;
```

**Example**

```ts
import { Address } from "@lucid-evolution/experimental";
import { Effect } from "effect";
import assert from "assert";

const effect = Address.fromBech32(
  "addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x",
).pipe(Effect.map(Address.toCBOR));

const cborHex = Effect.runSync(effect);
assert(typeof cborHex === "string");
assert(cborHex.length > 0);
```

Added in v2.0.0

## toHex

Convert address to hex string

**Signature**

```ts
export declare const toHex: (address: Address) => string;
```

**Example**

```ts
import { Address } from "@lucid-evolution/experimental";
import { Effect, pipe } from "effect";
import assert from "assert";

const effect = pipe(
  Address.fromBech32(
    "addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x",
  ),
  Effect.map(Address.toHex),
);

const hex = Effect.runSync(effect);
assert(typeof hex === "string");
assert(hex.length > 0);
assert(/^[0-9a-f]+$/i.test(hex));
```

Added in v2.0.0

# model

## Address (type alias)

Union type representing all possible address types

**Signature**

```ts
export type Address =
  | BaseAddress.BaseAddress
  | EnterpriseAddress.EnterpriseAddress
  | PointerAddress.PointerAddress
  | RewardAccount.RewardAccount
  | ByronAddress.ByronAddress;
```

Added in v2.0.0

## AddressError (class)

Error thrown when address operations fail

**Signature**

```ts
export declare class AddressError
```

Added in v2.0.0

# utils

## equals

**Signature**

```ts
export declare const equals: (a: Address, b: Address) => boolean;
```

## generator

**Signature**

```ts
export declare const generator: FastCheck.Arbitrary<
  | PointerAddress.PointerAddress
  | EnterpriseAddress.EnterpriseAddress
  | BaseAddress.BaseAddress
  | RewardAccount.RewardAccount
>;
```
