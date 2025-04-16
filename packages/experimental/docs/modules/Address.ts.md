---
title: Address.ts
nav_order: 1
parent: Modules
---

## Address overview

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [addressDetailsFromBech32](#addressdetailsfrombech32)
  - [addressDetailsFromHex](#addressdetailsfromhex)
  - [addressDetailsFromString](#addressdetailsfromstring)
- [encoding/decoding](#encodingdecoding)
  - [bytesFromBech32](#bytesfrombech32)
  - [decodeVariableLength](#decodevariablelength)
  - [encodeVariableLength](#encodevariablelength)
  - [fromBech32](#frombech32)
  - [fromBytes](#frombytes)
  - [paymentAddressToJson](#paymentaddresstojson)
  - [toBech32](#tobech32)
  - [toBytes](#tobytes)
  - [toCBOR](#tocbor)
  - [toHex](#tohex)
- [model](#model)
  - [Address (type alias)](#address-type-alias)
  - [AddressDetails (type alias)](#addressdetails-type-alias)
  - [AddressError (class)](#addresserror-class)
  - [AddressTag (type alias)](#addresstag-type-alias)
  - [NetworkId (type alias)](#networkid-type-alias)
  - [PaymentAddress (type alias)](#paymentaddress-type-alias)
  - [RewardAddress (type alias)](#rewardaddress-type-alias)
  - [StakeReference (type alias)](#stakereference-type-alias)
- [predicates](#predicates)
  - [isPaymentAddress](#ispaymentaddress)
  - [isPointer](#ispointer)
  - [isRewardAddress](#isrewardaddress)
- [schemas](#schemas)
  - [Address](#address)
  - [BaseAddress (class)](#baseaddress-class)
  - [ByronAddress (class)](#byronaddress-class)
  - [EnterpriseAddress (class)](#enterpriseaddress-class)
  - [PaymentAddress](#paymentaddress)
  - [Pointer (class)](#pointer-class)
  - [PointerAddress (class)](#pointeraddress-class)
  - [RewardAccount (class)](#rewardaccount-class)
  - [RewardAddress](#rewardaddress)
  - [StakeReference](#stakereference)
- [transformation](#transformation)
  - [addressTagFromBech32](#addresstagfrombech32)
  - [addressTagFromHeader](#addresstagfromheader)
  - [headerFromBech32](#headerfrombech32)
  - [networkIdFromBech32](#networkidfrombech32)

---

# constructors

## addressDetailsFromBech32

Extract detailed information from a bech32 address

**Signature**

```ts
export declare const addressDetailsFromBech32: SerdeImpl.FromBech32<
  AddressDetails,
  | ScriptHash.ScriptHashError
  | Bytes.BytesError
  | KeyHash.KeyHashError
  | ParseError
  | AddressError
>;
```

**Example**

```ts
import { Address } from "@lucid-evolution/experimental";
import { Effect } from "effect";
import assert from "assert";

const effect = Address.addressDetailsFromBech32(
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

## addressDetailsFromHex

Extract detailed information from a hex-encoded address

**Signature**

```ts
export declare const addressDetailsFromHex: SerdeImpl.FromHex<
  AddressDetails,
  | ScriptHash.ScriptHashError
  | Bytes.BytesError
  | KeyHash.KeyHashError
  | ParseError
  | AddressError
>;
```

**Example**

```ts
import { Address } from "@lucid-evolution/experimental";
import { Effect } from "effect";
import assert from "assert";

const effect = Address.addressDetailsFromHex(
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

## addressDetailsFromString

Extract address details from a string (auto-detects bech32 or hex format)

**Signature**

```ts
export declare const addressDetailsFromString: (
  stringAddress: string,
) => Effect.Effect<
  AddressDetails,
  [
    YieldWrap<
      Effect.Effect<
        AddressDetails,
        | ScriptHash.ScriptHashError
        | Bytes.BytesError
        | KeyHash.KeyHashError
        | ParseError
        | AddressError,
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
              | Bytes.BytesError
              | KeyHash.KeyHashError
              | ParseError
              | AddressError,
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
        | Bytes.BytesError
        | KeyHash.KeyHashError
        | ParseError
        | AddressError,
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
              | Bytes.BytesError
              | KeyHash.KeyHashError
              | ParseError
              | AddressError,
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
import { Address } from "@lucid-evolution/experimental";
import { Effect } from "effect";
import assert from "assert";

// From bech32
const bech32Effect = Address.addressDetailsFromString(
  "addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x",
);
const bech32Details = Effect.runSync(bech32Effect);
assert(bech32Details._tag === "BaseAddress");

// From hex
const hexEffect = Address.addressDetailsFromString(
  "019493315cd92eb5d8c4304e67b7e16ae36d61d34502694657811a2c8e337b62cfff6403a06a3acbc34f8c46003c69fe79a3628cefa9c47251",
);
const hexDetails = Effect.runSync(hexEffect);
assert(hexDetails._tag === "BaseAddress");
```

Added in v2.0.0

# encoding/decoding

## bytesFromBech32

Get raw bytes from address string (either format)

**Signature**

```ts
export declare const bytesFromBech32: (
  bech32Address: string,
) => Effect.Effect<Uint8Array, AddressError>;
```

**Example**

```ts
import { Address } from "@lucid-evolution/experimental";
import { Effect } from "effect";
import assert from "assert";

const effect = Address.bytesFromBech32(
  "addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x",
);
const bytes = Effect.runSync(effect);
assert(bytes instanceof Uint8Array);
assert(bytes.length > 0);
```

Added in v2.0.0

## decodeVariableLength

Decode a variable length integer from a Uint8Array
Following the Cardano ledger implementation for variable-length integers

**Signature**

```ts
export declare const decodeVariableLength: (
  bytes: Uint8Array,
  offset?: number | undefined,
) => Effect.Effect<[Positive.Positive, number], AddressError | ParseError>;
```

**Example**

```ts
import { Address } from "@lucid-evolution/experimental";
import { Effect } from "effect";
import assert from "assert";

// Create a buffer that encodes the value 128
const buffer = new Uint8Array([0x80, 0x01]);

const effect = Address.decodeVariableLength(buffer, 0);
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
import { Address, Positive } from "@lucid-evolution/experimental";
import { Effect } from "effect";
import assert from "assert";

const bytes = Address.encodeVariableLength(Positive.makeOrThrow(128));
assert(bytes instanceof Uint8Array);
assert(bytes.length === 2);
assert(bytes[0] === 0x80);
assert(bytes[1] === 0x01);

const smallBytes = Address.encodeVariableLength(Positive.makeOrThrow(42));
assert(smallBytes instanceof Uint8Array);
assert(smallBytes.length === 1);
assert(smallBytes[0] === 42);
```

Added in v2.0.0

## fromBech32

Parse the complete address structure into a typed representation
This decodes the address format according to CIP-0019 specification

**Signature**

```ts
export declare const fromBech32: SerdeImpl.FromBech32<
  Address,
  | ScriptHash.ScriptHashError
  | Bytes.BytesError
  | KeyHash.KeyHashError
  | ParseError
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
export declare const fromBytes: SerdeImpl.FromBytes<
  Address,
  | ScriptHash.ScriptHashError
  | Bytes.BytesError
  | KeyHash.KeyHashError
  | ParseError
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
export declare const toCBOR: (address: Address) => string;
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

Type inferred from the AddressInfo schema

**Signature**

```ts
export type Address =
  | BaseAddress
  | EnterpriseAddress
  | PointerAddress
  | RewardAccount
  | ByronAddress;
```

Added in v2.0.0

## AddressDetails (type alias)

Extended address information with both structured data and serialized formats
Contains the address structure and its serialized representations

**Signature**

```ts
export type AddressDetails = Address & {
  address: {
    bech32: string;
    hex: string;
  };
};
```

Added in v2.0.0

## AddressError (class)

Error thrown when address operations fail

**Signature**

```ts
export declare class AddressError
```

Added in v2.0.0

## AddressTag (type alias)

Address header kind - used to determine the type of address from its header
Following CIP-0019 address types

**Signature**

```ts
export type AddressTag = "Base" | "Enterprise" | "Pointer" | "Reward" | "Byron";
```

Added in v2.0.0

## NetworkId (type alias)

Address Network ID type - either a testnet (0) or mainnet (1)
As defined in CIP-0019

**Signature**

```ts
export type NetworkId = 0 | 1 | number;
```

Added in v2.0.0

## PaymentAddress (type alias)

Type representing a payment address string in bech32 format

**Signature**

```ts
export type PaymentAddress = Schema.Schema.Type<typeof PaymentAddress>;
```

Added in v2.0.0

## RewardAddress (type alias)

Type representing a reward/stake address string in bech32 format

**Signature**

```ts
export type RewardAddress = Schema.Schema.Type<typeof RewardAddress>;
```

Added in v2.0.0

## StakeReference (type alias)

Type representing a reference to staking information
Can be a credential (key hash or script hash) or a pointer

**Signature**

```ts
export type StakeReference = Schema.Schema.Type<typeof StakeReference>;
```

Added in v2.0.0

# predicates

## isPaymentAddress

Check if the given value is a valid PaymentAddress

**Signature**

```ts
export declare const isPaymentAddress: (
  u: unknown,
  overrideOptions?: ParseOptions | number,
) => u is string & Brand<"PaymentAddress">;
```

**Example**

```ts
import { Address } from "@lucid-evolution/experimental";
import assert from "assert";

const isValid = Address.isPaymentAddress(
  "addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x",
);
assert(isValid === true);
```

Added in v2.0.0

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
import { Address, Positive } from "@lucid-evolution/experimental";
import assert from "assert";

const pointer = Address.Pointer.make({
  slot: Positive.makeOrThrow(1),
  txIndex: Positive.makeOrThrow(2),
  certIndex: Positive.makeOrThrow(3),
});
const isValid = Address.isPointer(pointer);
assert(isValid === true);
```

Added in v2.0.0

## isRewardAddress

Check if the given value is a valid RewardAddress

**Signature**

```ts
export declare const isRewardAddress: (
  u: unknown,
  overrideOptions?: ParseOptions | number,
) => u is string & Brand<"RewardAddress">;
```

**Example**

```ts
import { Address } from "@lucid-evolution/experimental";
import assert from "assert";

const isValid = Address.isRewardAddress(
  "stake1uyehkck0lajq8gr28t9uxnuvgcqrc6070x3k9r8048z8y5gh6ffgw",
);
assert(isValid === true);
```

Added in v2.0.0

# schemas

## Address

Union schema representing all possible address formats
Discriminated by the 'kind' field

**Signature**

```ts
export declare const Address: Schema.Union<
  [
    typeof BaseAddress,
    typeof EnterpriseAddress,
    typeof PointerAddress,
    typeof RewardAccount,
    typeof ByronAddress,
  ]
>;
```

Added in v2.0.0

## BaseAddress (class)

Base address with both payment and staking credentials

**Signature**

```ts
export declare class BaseAddress
```

Added in v2.0.0

## ByronAddress (class)

Byron legacy address format

**Signature**

```ts
export declare class ByronAddress
```

Added in v2.0.0

## EnterpriseAddress (class)

Enterprise address with only payment credential

**Signature**

```ts
export declare class EnterpriseAddress
```

Added in v2.0.0

## PaymentAddress

Bech32 address format schema (human-readable addresses)
Following CIP-0019 encoding requirements

**Signature**

```ts
export declare const PaymentAddress: Schema.brand<
  Schema.filter<typeof Schema.String>,
  "PaymentAddress"
>;
```

Added in v2.0.0

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

## RewardAccount (class)

Reward/stake address with only staking credential

**Signature**

```ts
export declare class RewardAccount
```

Added in v2.0.0

## RewardAddress

Reward address format schema (human-readable addresses)
Following CIP-0019 encoding requirements

**Signature**

```ts
export declare const RewardAddress: Schema.brand<
  Schema.filter<typeof Schema.String>,
  "RewardAddress"
>;
```

Added in v2.0.0

## StakeReference

Schema for stake reference that can be either a credential or a pointer

**Signature**

```ts
export declare const StakeReference: Schema.UndefinedOr<
  Schema.Union<
    [
      Schema.Union<[typeof KeyHash.KeyHash, typeof ScriptHash.ScriptHash]>,
      typeof Pointer,
    ]
  >
>;
```

Added in v2.0.0

# transformation

## addressTagFromBech32

Get address kind from address string

**Signature**

```ts
export declare const addressTagFromBech32: (
  bech32Address: string,
) => Effect.Effect<AddressTag, AddressError>;
```

**Example**

```ts
import { Address } from "@lucid-evolution/experimental";
import { Effect } from "effect";
import assert from "assert";

const effect = Address.addressTagFromBech32(
  "addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x",
);
const tag = Effect.runSync(effect);
assert(tag === "Base");
```

Added in v2.0.0

## addressTagFromHeader

Get address tag from header byte
Shifts the header byte to the right by 4 bits to isolate the address type

**Signature**

```ts
export declare const addressTagFromHeader: (header: number) => AddressTag;
```

**Example**

```ts
import { Address } from "@lucid-evolution/experimental";
import assert from "assert";

const tag = Address.addressTagFromHeader(0);
assert(tag === "Base");
```

Added in v2.0.0

## headerFromBech32

Parse header from address

**Signature**

```ts
export declare const headerFromBech32: (
  bech32Address: string,
) => Effect.Effect<number, AddressError>;
```

**Example**

```ts
import { Address } from "@lucid-evolution/experimental";
import { Effect } from "effect";
import assert from "assert";

const effect = Address.headerFromBech32(
  "addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x",
);
const header = Effect.runSync(effect);
assert(typeof header === "number");
assert(header === 0 || header === 1); // typically 0 for testnet, 1 for mainnet
```

Added in v2.0.0

## networkIdFromBech32

Extract network ID from address by applying a bit mask to isolate the network identifier
Network ID is stored in the lower 4 bits of the header byte (bits 0-3)

**Signature**

```ts
export declare const networkIdFromBech32: (
  bech32Address: string,
) => Effect.Effect<NetworkId, AddressError>;
```

**Example**

```ts
import { Address } from "@lucid-evolution/experimental";
import { Effect } from "effect";
import assert from "assert";

const effect = Address.networkIdFromBech32(
  "addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x",
);
const networkId = Effect.runSync(effect);
assert(networkId === 1); // 1 for mainnet

// For testnet addresses:
const testnetEffect = Address.networkIdFromBech32(
  "addr_test1qz2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgs68faae",
);
const testnetId = Effect.runSync(testnetEffect);
assert(testnetId === 0); // 0 for testnet
```

Added in v2.0.0
