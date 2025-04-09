---
title: Address.ts
nav_order: 1
parent: Modules
---

## Address overview

---

<h2 class="text-delta">Table of contents</h2>

- [encoding/decoding](#encodingdecoding)
  - [decodeVariableLength](#decodevariablelength)
  - [encodeVariableLength](#encodevariablelength)
  - [fromBytes](#frombytes)
  - [paymentAddressToJson](#paymentaddresstojson)
  - [toBech32](#tobech32)
  - [toBytes](#tobytes)
  - [toHex](#tohex)
- [model](#model)
  - [Address (type alias)](#address-type-alias)
  - [AddressError (class)](#addresserror-class)
  - [AddressTag (type alias)](#addresstag-type-alias)
  - [Credential](#credential)
  - [NetworkId (type alias)](#networkid-type-alias)
- [schemas](#schemas)
  - [Address](#address)
  - [BaseAddress](#baseaddress)
  - [ByronAddress](#byronaddress)
  - [EnterpriseAddress](#enterpriseaddress)
  - [KeyHash](#keyhash)
  - [PaymentAddress](#paymentaddress)
  - [PointerAddress](#pointeraddress)
  - [RewardAccount](#rewardaccount)
  - [RewardAddress](#rewardaddress)
- [utilities](#utilities)
  - [addressDetailsFromBech32](#addressdetailsfrombech32)
  - [addressDetailsFromHex](#addressdetailsfromhex)
  - [addressDetailsFromString](#addressdetailsfromstring)
  - [addressTagFromBech32](#addresstagfrombech32)
  - [addressTagFromHeader](#addresstagfromheader)
  - [bytesFromBech32](#bytesfrombech32)
  - [fromBech32](#frombech32)
  - [headerFromBech32](#headerfrombech32)
  - [networkIdFromBech32](#networkidfrombech32)
- [utils](#utils)
  - [AddressDetails (type alias)](#addressdetails-type-alias)
  - [BaseAddress (interface)](#baseaddress-interface)
  - [ByronAddressInfo (interface)](#byronaddressinfo-interface)
  - [Credential (type alias)](#credential-type-alias)
  - [EnterpriseAddress (interface)](#enterpriseaddress-interface)
  - [KeyHash (type alias)](#keyhash-type-alias)
  - [PaymentAddress (type alias)](#paymentaddress-type-alias)
  - [Pointer](#pointer)
  - [Pointer (type alias)](#pointer-type-alias)
  - [PointerAddress (interface)](#pointeraddress-interface)
  - [RewardAccount (interface)](#rewardaccount-interface)
  - [RewardAddress (type alias)](#rewardaddress-type-alias)
  - [ScriptHash](#scripthash)
  - [ScriptHash (type alias)](#scripthash-type-alias)
  - [StakeReference](#stakereference)
  - [StakeReference (type alias)](#stakereference-type-alias)
  - [isCredential](#iscredential)
  - [isPaymentAddress](#ispaymentaddress)
  - [isPointer](#ispointer)
  - [isRewardAddress](#isrewardaddress)

---

# encoding/decoding

## decodeVariableLength

Decode a variable length integer from a Uint8Array
Following the Cardano ledger implementation for variable-length integers

**Signature**

```ts
export declare const decodeVariableLength: (
  bytes: Uint8Array<ArrayBufferLike>,
  offset?: number | undefined,
) => Effect.Effect<number[], AddressError>;
```

**Example**

```ts
import { Address } from "@lucid-evolution/experimental";
import { Effect } from "effect";

// Create a buffer that encodes the value 128
const buffer = new Uint8Array([0x80, 0x01]);

const effect = Address.decodeVariableLength(buffer, 0);
const [value, bytesRead] = Effect.runSync(effect);
// Returns [128, 2]
```

Added in v2.0.0

## encodeVariableLength

Encode a number as a variable length integer following the Cardano ledger specification

**Signature**

```ts
export declare const encodeVariableLength: (
  value: number,
) => Effect.Effect<Uint8Array<ArrayBuffer>, AddressError>;
```

**Example**

```ts
import { Address } from "@lucid-evolution/experimental";
import { Effect } from "effect";

const effect = Address.encodeVariableLength(128);
const bytes = Effect.runSync(effect);
// Returns Uint8Array([0x80, 0x01])

const smallEffect = Address.encodeVariableLength(42);
const smallBytes = Effect.runSync(smallEffect);
// Returns Uint8Array([42])
```

Added in v2.0.0

## fromBytes

Convert bytes to an address structure

**Signature**

```ts
export declare const fromBytes: (
  bytes: Uint8Array<ArrayBufferLike>,
) => Effect.Effect<
  | BaseAddress
  | EnterpriseAddress
  | PointerAddress
  | RewardAccount
  | ByronAddressInfo,
  AddressError
>;
```

**Example**

```ts
import { Address, Bytes } from "@lucid-evolution/experimental";
import { Effect } from "effect";

const addressBytes = Bytes.fromHex(
  "01af2ff48c27324dae7fb3116381e6d7b11f1e7ef37adce1d5e07fdde614800e78e7849bfbb5c4ad414498d57ae5ecad",
);
const effect = Address.fromBytes(addressBytes);
const address = Effect.runSync(effect);
// Returns a structured Address object
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

const json = Address.paymentAddressToJson(
  "addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x",
);
// Returns '{"address":"addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x"}'
```

Added in v2.0.0

## toBech32

Convert address to bech32 format

**Signature**

```ts
export declare const toBech32: (
  address: Address,
) => Effect.Effect<string, AddressError, never>;
```

**Example**

```ts
import { Address, Bytes } from "@lucid-evolution/experimental";
import { Effect, pipe } from "effect";

// First create an address from bytes
const bytesEffect = pipe(
  Address.fromBytes(
    Bytes.fromHex(
      "01af2ff48c27324dae7fb3116381e6d7b11f1e7ef37adce1d5e07fdde614800e78e7849bfbb5c4ad414498d57ae5ecad",
    ),
  ),
  Effect.flatMap(Address.toBech32),
);

const bech32 = Effect.runSync(bytesEffect);
// Returns bech32 encoded address like "addr1..."
```

Added in v2.0.0

## toBytes

Convert address to bytes

**Signature**

```ts
export declare const toBytes: (
  address: Address,
) => Effect.Effect<Uint8Array<ArrayBufferLike>, AddressError>;
```

**Example**

```ts
import { Address } from "@lucid-evolution/experimental";
import { Effect, pipe } from "effect";

const addressEffect = pipe(
  Address.fromBech32(
    "addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x",
  ),
  Effect.flatMap(Address.toBytes),
);

const bytes = Effect.runSync(addressEffect);
// Returns Uint8Array of the binary address representation
```

Added in v2.0.0

## toHex

Convert address to hex string

**Signature**

```ts
export declare const toHex: (
  address: Address,
) => Effect.Effect<string, AddressError>;
```

**Example**

```ts
import { Address } from "@lucid-evolution/experimental";
import { Effect, pipe } from "effect";

const effect = pipe(
  Address.fromBech32(
    "addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x",
  ),
  Effect.flatMap(Address.toHex),
);

const hex = Effect.runSync(effect);
// Returns hex string like "01af2f..."
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
  | ByronAddressInfo;
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

## Credential

Credential used within addresses, as specified in CIP-0019

**Signature**

```ts
export declare const Credential: Schema.Union<
  [
    Schema.TaggedStruct<
      "KeyHash",
      { hash: Schema.filter<Schema.Schema<string, string, never>> }
    >,
    Schema.TaggedStruct<
      "ScriptHash",
      { hash: Schema.filter<Schema.Schema<string, string, never>> }
    >,
  ]
>;
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

# schemas

## Address

Union schema representing all possible address formats
Discriminated by the 'kind' field

**Signature**

```ts
export declare const Address: Schema.Union<
  [
    Schema.TaggedStruct<
      "BaseAddress",
      {
        networkId: typeof Schema.Number;
        paymentCredential: Schema.Union<
          [
            Schema.TaggedStruct<
              "KeyHash",
              { hash: Schema.filter<Schema.Schema<string, string, never>> }
            >,
            Schema.TaggedStruct<
              "ScriptHash",
              { hash: Schema.filter<Schema.Schema<string, string, never>> }
            >,
          ]
        >;
        stakeCredential: Schema.Union<
          [
            Schema.TaggedStruct<
              "KeyHash",
              { hash: Schema.filter<Schema.Schema<string, string, never>> }
            >,
            Schema.TaggedStruct<
              "ScriptHash",
              { hash: Schema.filter<Schema.Schema<string, string, never>> }
            >,
          ]
        >;
      }
    >,
    Schema.TaggedStruct<
      "EnterpriseAddress",
      {
        networkId: typeof Schema.Number;
        paymentCredential: Schema.Union<
          [
            Schema.TaggedStruct<
              "KeyHash",
              { hash: Schema.filter<Schema.Schema<string, string, never>> }
            >,
            Schema.TaggedStruct<
              "ScriptHash",
              { hash: Schema.filter<Schema.Schema<string, string, never>> }
            >,
          ]
        >;
      }
    >,
    Schema.TaggedStruct<
      "PointerAddress",
      {
        networkId: typeof Schema.Number;
        paymentCredential: Schema.Union<
          [
            Schema.TaggedStruct<
              "KeyHash",
              { hash: Schema.filter<Schema.Schema<string, string, never>> }
            >,
            Schema.TaggedStruct<
              "ScriptHash",
              { hash: Schema.filter<Schema.Schema<string, string, never>> }
            >,
          ]
        >;
        pointer: Schema.TaggedStruct<
          "Pointer",
          {
            slot: typeof Schema.Number;
            txIndex: typeof Schema.Number;
            certIndex: typeof Schema.Number;
          }
        >;
      }
    >,
    Schema.TaggedStruct<
      "RewardAccount",
      {
        networkId: typeof Schema.Number;
        stakeCredential: Schema.Union<
          [
            Schema.TaggedStruct<
              "KeyHash",
              { hash: Schema.filter<Schema.Schema<string, string, never>> }
            >,
            Schema.TaggedStruct<
              "ScriptHash",
              { hash: Schema.filter<Schema.Schema<string, string, never>> }
            >,
          ]
        >;
      }
    >,
    Schema.TaggedStruct<
      "ByronAddress",
      { bytes: Schema.filter<Schema.Schema<string, string, never>> }
    >,
  ]
>;
```

Added in v2.0.0

## BaseAddress

Base address with both payment and staking credentials

**Signature**

```ts
export declare const BaseAddress: Schema.TaggedStruct<
  "BaseAddress",
  {
    networkId: typeof Schema.Number;
    paymentCredential: Schema.Union<
      [
        Schema.TaggedStruct<
          "KeyHash",
          { hash: Schema.filter<Schema.Schema<string, string, never>> }
        >,
        Schema.TaggedStruct<
          "ScriptHash",
          { hash: Schema.filter<Schema.Schema<string, string, never>> }
        >,
      ]
    >;
    stakeCredential: Schema.Union<
      [
        Schema.TaggedStruct<
          "KeyHash",
          { hash: Schema.filter<Schema.Schema<string, string, never>> }
        >,
        Schema.TaggedStruct<
          "ScriptHash",
          { hash: Schema.filter<Schema.Schema<string, string, never>> }
        >,
      ]
    >;
  }
>;
```

Added in v2.0.0

## ByronAddress

Byron legacy address format

**Signature**

```ts
export declare const ByronAddress: Schema.TaggedStruct<
  "ByronAddress",
  { bytes: Schema.filter<Schema.Schema<string, string, never>> }
>;
```

Added in v2.0.0

## EnterpriseAddress

Enterprise address with only payment credential

**Signature**

```ts
export declare const EnterpriseAddress: Schema.TaggedStruct<
  "EnterpriseAddress",
  {
    networkId: typeof Schema.Number;
    paymentCredential: Schema.Union<
      [
        Schema.TaggedStruct<
          "KeyHash",
          { hash: Schema.filter<Schema.Schema<string, string, never>> }
        >,
        Schema.TaggedStruct<
          "ScriptHash",
          { hash: Schema.filter<Schema.Schema<string, string, never>> }
        >,
      ]
    >;
  }
>;
```

Added in v2.0.0

## KeyHash

Hex address format schema (raw/binary format encoded as hex)
Following CIP-0019 binary representation

**Signature**

```ts
export declare const KeyHash: Schema.TaggedStruct<
  "KeyHash",
  { hash: Schema.filter<Schema.Schema<string, string, never>> }
>;
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

## PointerAddress

Pointer address with payment credential and pointer to stake registration

**Signature**

```ts
export declare const PointerAddress: Schema.TaggedStruct<
  "PointerAddress",
  {
    networkId: typeof Schema.Number;
    paymentCredential: Schema.Union<
      [
        Schema.TaggedStruct<
          "KeyHash",
          { hash: Schema.filter<Schema.Schema<string, string, never>> }
        >,
        Schema.TaggedStruct<
          "ScriptHash",
          { hash: Schema.filter<Schema.Schema<string, string, never>> }
        >,
      ]
    >;
    pointer: Schema.TaggedStruct<
      "Pointer",
      {
        slot: typeof Schema.Number;
        txIndex: typeof Schema.Number;
        certIndex: typeof Schema.Number;
      }
    >;
  }
>;
```

Added in v2.0.0

## RewardAccount

Reward/stake address with only staking credential

**Signature**

```ts
export declare const RewardAccount: Schema.TaggedStruct<
  "RewardAccount",
  {
    networkId: typeof Schema.Number;
    stakeCredential: Schema.Union<
      [
        Schema.TaggedStruct<
          "KeyHash",
          { hash: Schema.filter<Schema.Schema<string, string, never>> }
        >,
        Schema.TaggedStruct<
          "ScriptHash",
          { hash: Schema.filter<Schema.Schema<string, string, never>> }
        >,
      ]
    >;
  }
>;
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

# utilities

## addressDetailsFromBech32

Extract detailed information from a bech32 address

**Signature**

```ts
export declare const addressDetailsFromBech32: (
  bech32Address: string,
) => Effect.Effect<AddressDetails, AddressError>;
```

**Example**

```ts
import { Address } from "@lucid-evolution/experimental";
import { Effect } from "effect";

const effect = Address.addressDetailsFromBech32(
  "addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x",
);
const details = Effect.runSync(effect);
// Returns object with network ID, credentials, and encoding details
```

Added in v2.0.0

## addressDetailsFromHex

Extract detailed information from a hex-encoded address

**Signature**

```ts
export declare const addressDetailsFromHex: (
  hexAddress: string,
) => Effect.Effect<AddressDetails, AddressError>;
```

**Example**

```ts
import { Address } from "@lucid-evolution/experimental";
import { Effect } from "effect";

const effect = Address.addressDetailsFromHex(
  "01af2ff48c27324dae7fb3116381e6d7b11f1e7ef37adce1d5e07fdde614800e78e7849bfbb5c4ad414498d57ae5ecad",
);
const details = Effect.runSync(effect);
// Returns object with network ID, credentials, and encoding details
```

Added in v2.0.0

## addressDetailsFromString

Extract address details from a string (auto-detects bech32 or hex format)

**Signature**

```ts
export declare const addressDetailsFromString: (
  stringAddress: string,
) => Effect.Effect<AddressDetails, AddressError>;
```

**Example**

```ts
import { Address } from "@lucid-evolution/experimental";
import { Effect } from "effect";

// From bech32
const bech32Effect = Address.addressDetailsFromString(
  "addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x",
);

// From hex
const hexEffect = Address.addressDetailsFromString(
  "01af2ff48c27324dae7fb3116381e6d7b11f1e7ef37adce1d5e07fdde614800e78e7849bfbb5c4ad414498d57ae5ecad",
);

const details = Effect.runSync(bech32Effect);
// Returns complete address details regardless of input format
```

Added in v2.0.0

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

const effect = Address.addressTagFromBech32(
  "addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x",
);
const tag = Effect.runSync(effect);
// Returns "Base"
```

Added in v2.0.0

## addressTagFromHeader

Parse an address kind from header

**Signature**

```ts
export declare const addressTagFromHeader: (header: number) => AddressTag;
```

**Example**

```ts
import { Address } from "@lucid-evolution/experimental";

const tag = Address.addressTagFromHeader(0);
// Returns "Base"
```

Added in v2.0.0

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

const effect = Address.bytesFromBech32(
  "addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x",
);
const bytes = Effect.runSync(effect);
// Returns Uint8Array representing the binary address
```

Added in v2.0.0

## fromBech32

Parse the complete address structure into a typed representation
This decodes the address format according to CIP-0019 specification

**Signature**

```ts
export declare const fromBech32: (
  bech32Address: string,
) => Effect.Effect<Address, AddressError>;
```

**Example**

```ts
import { Address } from "@lucid-evolution/experimental";
import { Effect } from "effect";

const effect = Address.fromBech32(
  "addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x",
);
const address = Effect.runSync(effect);
// Returns a structured Address object with _tag: "BaseAddress"

const stakeEffect = Address.fromBech32(
  "stake1uyehkck0lajq8gr28t9uxnuvgcqrc6070x3k9r8048z8y5gh6ffgw",
);
const stakeAddress = Effect.runSync(stakeEffect);
// Returns a structured Address object with _tag: "RewardAccount"
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

const effect = Address.headerFromBech32(
  "addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x",
);
const header = Effect.runSync(effect);
// Returns a number (e.g., 0) representing the header byte
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

const effect = Address.networkIdFromBech32(
  "addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x",
);
const networkId = Effect.runSync(effect);
// Returns 1 for mainnet

// For testnet addresses:
const testnetEffect = Address.networkIdFromBech32(
  "addr_test1qz2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgs68faae",
);
const testnetId = Effect.runSync(testnetEffect);
// Returns 0 for testnet
```

Added in v2.0.0

# utils

## AddressDetails (type alias)

**Signature**

```ts
export type AddressDetails = Address & {
  address: {
    bech32: string;
    hex: string;
  };
};
```

## BaseAddress (interface)

**Signature**

```ts
export interface BaseAddress extends Schema.Schema.Type<typeof BaseAddress> {}
```

## ByronAddressInfo (interface)

**Signature**

```ts
export interface ByronAddressInfo
  extends Schema.Schema.Type<typeof ByronAddress> {}
```

## Credential (type alias)

**Signature**

```ts
export type Credential = typeof Credential.Type;
```

## EnterpriseAddress (interface)

**Signature**

```ts
export interface EnterpriseAddress
  extends Schema.Schema.Type<typeof EnterpriseAddress> {}
```

## KeyHash (type alias)

**Signature**

```ts
export type KeyHash = typeof KeyHash.Type;
```

## PaymentAddress (type alias)

**Signature**

```ts
export type PaymentAddress = typeof PaymentAddress.Type;
```

## Pointer

**Signature**

```ts
export declare const Pointer: Schema.TaggedStruct<
  "Pointer",
  {
    slot: typeof Schema.Number;
    txIndex: typeof Schema.Number;
    certIndex: typeof Schema.Number;
  }
>;
```

## Pointer (type alias)

**Signature**

```ts
export type Pointer = typeof Pointer.Type;
```

## PointerAddress (interface)

**Signature**

```ts
export interface PointerAddress
  extends Schema.Schema.Type<typeof PointerAddress> {}
```

## RewardAccount (interface)

**Signature**

```ts
export interface RewardAccount
  extends Schema.Schema.Type<typeof RewardAccount> {}
```

## RewardAddress (type alias)

**Signature**

```ts
export type RewardAddress = typeof RewardAddress.Type;
```

## ScriptHash

**Signature**

```ts
export declare const ScriptHash: Schema.TaggedStruct<
  "ScriptHash",
  { hash: Schema.filter<Schema.Schema<string, string, never>> }
>;
```

## ScriptHash (type alias)

**Signature**

```ts
export type ScriptHash = typeof ScriptHash.Type;
```

## StakeReference

**Signature**

```ts
export declare const StakeReference: Schema.UndefinedOr<
  Schema.Union<
    [
      Schema.Union<
        [
          Schema.TaggedStruct<
            "KeyHash",
            { hash: Schema.filter<Schema.Schema<string, string, never>> }
          >,
          Schema.TaggedStruct<
            "ScriptHash",
            { hash: Schema.filter<Schema.Schema<string, string, never>> }
          >,
        ]
      >,
      Schema.TaggedStruct<
        "Pointer",
        {
          slot: typeof Schema.Number;
          txIndex: typeof Schema.Number;
          certIndex: typeof Schema.Number;
        }
      >,
    ]
  >
>;
```

## StakeReference (type alias)

**Signature**

```ts
export type StakeReference = typeof StakeReference.Type;
```

## isCredential

**Signature**

```ts
export declare const isCredential: (
  u: unknown,
  overrideOptions?: ParseOptions | number,
) => u is
  | { readonly _tag: "KeyHash"; readonly hash: string }
  | { readonly _tag: "ScriptHash"; readonly hash: string };
```

## isPaymentAddress

**Signature**

```ts
export declare const isPaymentAddress: (
  u: unknown,
  overrideOptions?: ParseOptions | number,
) => u is string & Brand<"PaymentAddress">;
```

## isPointer

**Signature**

```ts
export declare const isPointer: (
  u: unknown,
  overrideOptions?: ParseOptions | number,
) => u is {
  readonly _tag: "Pointer";
  readonly slot: number;
  readonly txIndex: number;
  readonly certIndex: number;
};
```

## isRewardAddress

**Signature**

```ts
export declare const isRewardAddress: (
  u: unknown,
  overrideOptions?: ParseOptions | number,
) => u is string & Brand<"RewardAddress">;
```
