---
title: AddressDetails.ts
nav_order: 2
parent: Modules
---

## AddressDetails overview

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [fromBech32](#frombech32)
  - [fromHex](#fromhex)
  - [fromString](#fromstring)
- [model](#model)
  - [AddressDetails (type alias)](#addressdetails-type-alias)

---

# constructors

## fromBech32

Extract detailed information from a bech32 address

**Signature**

```ts
export declare const fromBech32: SerdeImpl.FromBech32<
  AddressDetails,
  | ScriptHash.ScriptHashError
  | KeyHash.KeyHashError
  | PointerAddress.PointerAddressError
  | ParseError
  | Bech32.Bech32Error
  | Bytes.BytesError
  | Address.AddressError
>;
```

**Example**

```ts
import { AddressDetails } from "@lucid-evolution/experimental";
import { Effect } from "effect";
import assert from "assert";

const effect = AddressDetails.fromBech32(
  "addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x",
);
const details = Effect.runSync(effect);
assert(details._tag === "BaseAddress");
assert(details.networkId === 1);
assert(
  details.address.bech32 ===
    "addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x",
);
assert(typeof details.address.hex === "string");
```

Added in v2.0.0

## fromHex

Extract detailed information from a hex-encoded address

**Signature**

```ts
export declare const fromHex: SerdeImpl.FromHex<
  AddressDetails,
  | ScriptHash.ScriptHashError
  | KeyHash.KeyHashError
  | PointerAddress.PointerAddressError
  | ParseError
  | Bytes.BytesError
  | Address.AddressError
>;
```

**Example**

```ts
import { AddressDetails } from "@lucid-evolution/experimental";
import { Effect } from "effect";
import assert from "assert";

const effect = AddressDetails.fromHex(
  "019493315cd92eb5d8c4304e67b7e16ae36d61d34502694657811a2c8e337b62cfff6403a06a3acbc34f8c46003c69fe79a3628cefa9c47251",
);
const details = Effect.runSync(effect);
assert(details._tag === "BaseAddress");
assert(details.networkId === 1);
assert(typeof details.address.bech32 === "string");
assert(
  details.address.hex ===
    "019493315cd92eb5d8c4304e67b7e16ae36d61d34502694657811a2c8e337b62cfff6403a06a3acbc34f8c46003c69fe79a3628cefa9c47251",
);
```

Added in v2.0.0

## fromString

Extract address details from a string (auto-detects bech32 or hex format)

**Signature**

```ts
export declare const fromString: (
  stringAddress: string,
) => Effect.Effect<
  AddressDetails,
  [
    YieldWrap<
      Effect.Effect<
        AddressDetails,
        | ScriptHash.ScriptHashError
        | KeyHash.KeyHashError
        | PointerAddress.PointerAddressError
        | ParseError
        | Bech32.Bech32Error
        | Bytes.BytesError
        | Address.AddressError,
        never
      >
    >,
  ] extends [never]
    ? never
    : [
          YieldWrap<
            Effect.Effect<
              AddressDetails,
              | ScriptHash.ScriptHashError
              | KeyHash.KeyHashError
              | PointerAddress.PointerAddressError
              | ParseError
              | Bech32.Bech32Error
              | Bytes.BytesError
              | Address.AddressError,
              never
            >
          >,
        ] extends [YieldWrap<Effect.Effect<infer _A, infer E, infer _R>>]
      ? E
      : never,
  [
    YieldWrap<
      Effect.Effect<
        AddressDetails,
        | ScriptHash.ScriptHashError
        | KeyHash.KeyHashError
        | PointerAddress.PointerAddressError
        | ParseError
        | Bech32.Bech32Error
        | Bytes.BytesError
        | Address.AddressError,
        never
      >
    >,
  ] extends [never]
    ? never
    : [
          YieldWrap<
            Effect.Effect<
              AddressDetails,
              | ScriptHash.ScriptHashError
              | KeyHash.KeyHashError
              | PointerAddress.PointerAddressError
              | ParseError
              | Bech32.Bech32Error
              | Bytes.BytesError
              | Address.AddressError,
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
import { AddressDetails } from "@lucid-evolution/experimental";
import { Effect } from "effect";
import assert from "assert";

// From bech32
const bech32Effect = AddressDetails.fromString(
  "addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x",
);
const bech32Details = Effect.runSync(bech32Effect);
assert(bech32Details._tag === "BaseAddress");

// From hex
const hexEffect = AddressDetails.fromString(
  "019493315cd92eb5d8c4304e67b7e16ae36d61d34502694657811a2c8e337b62cfff6403a06a3acbc34f8c46003c69fe79a3628cefa9c47251",
);
const hexDetails = Effect.runSync(hexEffect);
assert(hexDetails._tag === "BaseAddress");
```

Added in v2.0.0

# model

## AddressDetails (type alias)

Extended address information with both structured data and serialized formats
Contains the address structure and its serialized representations

**Signature**

```ts
export type AddressDetails = Address.Address & {
  address: {
    bech32: string;
    hex: string;
  };
};
```

Added in v2.0.0
