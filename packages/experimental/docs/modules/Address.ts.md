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
  - [BaseAddress (interface)](#baseaddress-interface)
  - [ByronAddress (interface)](#byronaddress-interface)
  - [EnterpriseAddress (interface)](#enterpriseaddress-interface)
  - [NetworkId (type alias)](#networkid-type-alias)
  - [PaymentAddress (type alias)](#paymentaddress-type-alias)
  - [Pointer (type alias)](#pointer-type-alias)
  - [PointerAddress (interface)](#pointeraddress-interface)
  - [RewardAccount (interface)](#rewardaccount-interface)
  - [RewardAddress (type alias)](#rewardaddress-type-alias)
  - [StakeReference (type alias)](#stakereference-type-alias)
- [predicates](#predicates)
  - [isPaymentAddress](#ispaymentaddress)
  - [isPointer](#ispointer)
  - [isRewardAddress](#isrewardaddress)
- [schemas](#schemas)
  - [Address](#address)
  - [BaseAddress](#baseaddress)
  - [ByronAddress](#byronaddress)
  - [EnterpriseAddress](#enterpriseaddress)
  - [PaymentAddress](#paymentaddress)
  - [Pointer](#pointer)
  - [PointerAddress](#pointeraddress)
  - [RewardAccount](#rewardaccount)
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
export declare const addressDetailsFromBech32: (
  bech32Address: any,
) => Effect.Effect<
  | {
      address: { bech32: any; hex: string };
      _tag: "BaseAddress";
      networkId: number;
      paymentCredential:
        | { readonly hash: string; readonly _tag: "ScriptHash" }
        | KeyHash.KeyHash;
      stakeCredential:
        | { readonly hash: string; readonly _tag: "ScriptHash" }
        | KeyHash.KeyHash;
    }
  | {
      address: { bech32: any; hex: string };
      _tag: "EnterpriseAddress";
      networkId: number;
      paymentCredential:
        | { readonly hash: string; readonly _tag: "ScriptHash" }
        | KeyHash.KeyHash;
    }
  | {
      address: { bech32: any; hex: string };
      _tag: "PointerAddress";
      networkId: number;
      paymentCredential:
        | { readonly hash: string; readonly _tag: "ScriptHash" }
        | KeyHash.KeyHash;
      pointer: {
        readonly _tag: "Pointer";
        readonly slot: number;
        readonly txIndex: number;
        readonly certIndex: number;
      };
    }
  | {
      address: { bech32: any; hex: string };
      _tag: "RewardAccount";
      networkId: number;
      stakeCredential:
        | { readonly hash: string; readonly _tag: "ScriptHash" }
        | KeyHash.KeyHash;
    }
  | {
      address: { bech32: any; hex: string };
      _tag: "ByronAddress";
      bytes: string;
    },
  [
    | YieldWrap<
        Effect.Effect<
          | BaseAddress
          | EnterpriseAddress
          | PointerAddress
          | RewardAccount
          | ByronAddress,
          Bytes.BytesError | KeyHash.KeyHashError | AddressError,
          never
        >
      >
    | YieldWrap<Effect.Effect<string, Bytes.BytesError | AddressError, never>>,
  ] extends [never]
    ? never
    : [
          | YieldWrap<
              Effect.Effect<
                | BaseAddress
                | EnterpriseAddress
                | PointerAddress
                | RewardAccount
                | ByronAddress,
                Bytes.BytesError | KeyHash.KeyHashError | AddressError,
                never
              >
            >
          | YieldWrap<
              Effect.Effect<string, Bytes.BytesError | AddressError, never>
            >,
        ] extends [YieldWrap<Effect.Effect<infer _A, infer E, infer _R>>]
      ? E
      : never,
  [
    | YieldWrap<
        Effect.Effect<
          | BaseAddress
          | EnterpriseAddress
          | PointerAddress
          | RewardAccount
          | ByronAddress,
          Bytes.BytesError | KeyHash.KeyHashError | AddressError,
          never
        >
      >
    | YieldWrap<Effect.Effect<string, Bytes.BytesError | AddressError, never>>,
  ] extends [never]
    ? never
    : [
          | YieldWrap<
              Effect.Effect<
                | BaseAddress
                | EnterpriseAddress
                | PointerAddress
                | RewardAccount
                | ByronAddress,
                Bytes.BytesError | KeyHash.KeyHashError | AddressError,
                never
              >
            >
          | YieldWrap<
              Effect.Effect<string, Bytes.BytesError | AddressError, never>
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
export declare const addressDetailsFromHex: (hexAddress: any) => Effect.Effect<
  | {
      address: { bech32: string; hex: any };
      _tag: "BaseAddress";
      networkId: number;
      paymentCredential:
        | { readonly hash: string; readonly _tag: "ScriptHash" }
        | KeyHash.KeyHash;
      stakeCredential:
        | { readonly hash: string; readonly _tag: "ScriptHash" }
        | KeyHash.KeyHash;
    }
  | {
      address: { bech32: string; hex: any };
      _tag: "EnterpriseAddress";
      networkId: number;
      paymentCredential:
        | { readonly hash: string; readonly _tag: "ScriptHash" }
        | KeyHash.KeyHash;
    }
  | {
      address: { bech32: string; hex: any };
      _tag: "PointerAddress";
      networkId: number;
      paymentCredential:
        | { readonly hash: string; readonly _tag: "ScriptHash" }
        | KeyHash.KeyHash;
      pointer: {
        readonly _tag: "Pointer";
        readonly slot: number;
        readonly txIndex: number;
        readonly certIndex: number;
      };
    }
  | {
      address: { bech32: string; hex: any };
      _tag: "RewardAccount";
      networkId: number;
      stakeCredential:
        | { readonly hash: string; readonly _tag: "ScriptHash" }
        | KeyHash.KeyHash;
    }
  | {
      address: { bech32: string; hex: any };
      _tag: "ByronAddress";
      bytes: string;
    },
  [
    | YieldWrap<
        Effect.Effect<
          | BaseAddress
          | EnterpriseAddress
          | PointerAddress
          | RewardAccount
          | ByronAddress,
          Bytes.BytesError | KeyHash.KeyHashError | AddressError,
          never
        >
      >
    | YieldWrap<Effect.Effect<string, AddressError, never>>,
  ] extends [never]
    ? never
    : [
          | YieldWrap<
              Effect.Effect<
                | BaseAddress
                | EnterpriseAddress
                | PointerAddress
                | RewardAccount
                | ByronAddress,
                Bytes.BytesError | KeyHash.KeyHashError | AddressError,
                never
              >
            >
          | YieldWrap<Effect.Effect<string, AddressError, never>>,
        ] extends [YieldWrap<Effect.Effect<infer _A, infer E, infer _R>>]
      ? E
      : never,
  [
    | YieldWrap<
        Effect.Effect<
          | BaseAddress
          | EnterpriseAddress
          | PointerAddress
          | RewardAccount
          | ByronAddress,
          Bytes.BytesError | KeyHash.KeyHashError | AddressError,
          never
        >
      >
    | YieldWrap<Effect.Effect<string, AddressError, never>>,
  ] extends [never]
    ? never
    : [
          | YieldWrap<
              Effect.Effect<
                | BaseAddress
                | EnterpriseAddress
                | PointerAddress
                | RewardAccount
                | ByronAddress,
                Bytes.BytesError | KeyHash.KeyHashError | AddressError,
                never
              >
            >
          | YieldWrap<Effect.Effect<string, AddressError, never>>,
        ] extends [YieldWrap<Effect.Effect<infer _A, infer _E, infer R>>]
      ? R
      : never
>;
```

**Example**

```ts
import { Address } from "@lucid-evolution/experimental";
import { Effect } from "effect";

const effect = Address.addressDetailsFromHex(
  "019493315cd92eb5d8c4304e67b7e16ae36d61d34502694657811a2c8e337b62cfff6403a06a3acbc34f8c46003c69fe79a3628cefa9c47251",
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
  stringAddress: any,
) => Effect.Effect<
  | {
      address: { bech32: any; hex: string };
      _tag: "BaseAddress";
      networkId: number;
      paymentCredential:
        | { readonly hash: string; readonly _tag: "ScriptHash" }
        | KeyHash.KeyHash;
      stakeCredential:
        | { readonly hash: string; readonly _tag: "ScriptHash" }
        | KeyHash.KeyHash;
    }
  | {
      address: { bech32: any; hex: string };
      _tag: "EnterpriseAddress";
      networkId: number;
      paymentCredential:
        | { readonly hash: string; readonly _tag: "ScriptHash" }
        | KeyHash.KeyHash;
    }
  | {
      address: { bech32: any; hex: string };
      _tag: "PointerAddress";
      networkId: number;
      paymentCredential:
        | { readonly hash: string; readonly _tag: "ScriptHash" }
        | KeyHash.KeyHash;
      pointer: {
        readonly _tag: "Pointer";
        readonly slot: number;
        readonly txIndex: number;
        readonly certIndex: number;
      };
    }
  | {
      address: { bech32: any; hex: string };
      _tag: "RewardAccount";
      networkId: number;
      stakeCredential:
        | { readonly hash: string; readonly _tag: "ScriptHash" }
        | KeyHash.KeyHash;
    }
  | {
      address: { bech32: any; hex: string };
      _tag: "ByronAddress";
      bytes: string;
    }
  | {
      address: { bech32: string; hex: any };
      _tag: "BaseAddress";
      networkId: number;
      paymentCredential:
        | { readonly hash: string; readonly _tag: "ScriptHash" }
        | KeyHash.KeyHash;
      stakeCredential:
        | { readonly hash: string; readonly _tag: "ScriptHash" }
        | KeyHash.KeyHash;
    }
  | {
      address: { bech32: string; hex: any };
      _tag: "EnterpriseAddress";
      networkId: number;
      paymentCredential:
        | { readonly hash: string; readonly _tag: "ScriptHash" }
        | KeyHash.KeyHash;
    }
  | {
      address: { bech32: string; hex: any };
      _tag: "PointerAddress";
      networkId: number;
      paymentCredential:
        | { readonly hash: string; readonly _tag: "ScriptHash" }
        | KeyHash.KeyHash;
      pointer: {
        readonly _tag: "Pointer";
        readonly slot: number;
        readonly txIndex: number;
        readonly certIndex: number;
      };
    }
  | {
      address: { bech32: string; hex: any };
      _tag: "RewardAccount";
      networkId: number;
      stakeCredential:
        | { readonly hash: string; readonly _tag: "ScriptHash" }
        | KeyHash.KeyHash;
    }
  | {
      address: { bech32: string; hex: any };
      _tag: "ByronAddress";
      bytes: string;
    },
  [
    | YieldWrap<
        Effect.Effect<
          | {
              address: { bech32: any; hex: string };
              _tag: "BaseAddress";
              networkId: number;
              paymentCredential:
                | { readonly hash: string; readonly _tag: "ScriptHash" }
                | KeyHash.KeyHash;
              stakeCredential:
                | { readonly hash: string; readonly _tag: "ScriptHash" }
                | KeyHash.KeyHash;
            }
          | {
              address: { bech32: any; hex: string };
              _tag: "EnterpriseAddress";
              networkId: number;
              paymentCredential:
                | { readonly hash: string; readonly _tag: "ScriptHash" }
                | KeyHash.KeyHash;
            }
          | {
              address: { bech32: any; hex: string };
              _tag: "PointerAddress";
              networkId: number;
              paymentCredential:
                | { readonly hash: string; readonly _tag: "ScriptHash" }
                | KeyHash.KeyHash;
              pointer: {
                readonly _tag: "Pointer";
                readonly slot: number;
                readonly txIndex: number;
                readonly certIndex: number;
              };
            }
          | {
              address: { bech32: any; hex: string };
              _tag: "RewardAccount";
              networkId: number;
              stakeCredential:
                | { readonly hash: string; readonly _tag: "ScriptHash" }
                | KeyHash.KeyHash;
            }
          | {
              address: { bech32: any; hex: string };
              _tag: "ByronAddress";
              bytes: string;
            },
          Bytes.BytesError | KeyHash.KeyHashError | AddressError,
          never
        >
      >
    | YieldWrap<
        Effect.Effect<
          | {
              address: { bech32: string; hex: any };
              _tag: "BaseAddress";
              networkId: number;
              paymentCredential:
                | { readonly hash: string; readonly _tag: "ScriptHash" }
                | KeyHash.KeyHash;
              stakeCredential:
                | { readonly hash: string; readonly _tag: "ScriptHash" }
                | KeyHash.KeyHash;
            }
          | {
              address: { bech32: string; hex: any };
              _tag: "EnterpriseAddress";
              networkId: number;
              paymentCredential:
                | { readonly hash: string; readonly _tag: "ScriptHash" }
                | KeyHash.KeyHash;
            }
          | {
              address: { bech32: string; hex: any };
              _tag: "PointerAddress";
              networkId: number;
              paymentCredential:
                | { readonly hash: string; readonly _tag: "ScriptHash" }
                | KeyHash.KeyHash;
              pointer: {
                readonly _tag: "Pointer";
                readonly slot: number;
                readonly txIndex: number;
                readonly certIndex: number;
              };
            }
          | {
              address: { bech32: string; hex: any };
              _tag: "RewardAccount";
              networkId: number;
              stakeCredential:
                | { readonly hash: string; readonly _tag: "ScriptHash" }
                | KeyHash.KeyHash;
            }
          | {
              address: { bech32: string; hex: any };
              _tag: "ByronAddress";
              bytes: string;
            },
          Bytes.BytesError | KeyHash.KeyHashError | AddressError,
          never
        >
      >,
  ] extends [never]
    ? never
    : [
          | YieldWrap<
              Effect.Effect<
                | {
                    address: { bech32: any; hex: string };
                    _tag: "BaseAddress";
                    networkId: number;
                    paymentCredential:
                      | { readonly hash: string; readonly _tag: "ScriptHash" }
                      | KeyHash.KeyHash;
                    stakeCredential:
                      | { readonly hash: string; readonly _tag: "ScriptHash" }
                      | KeyHash.KeyHash;
                  }
                | {
                    address: { bech32: any; hex: string };
                    _tag: "EnterpriseAddress";
                    networkId: number;
                    paymentCredential:
                      | { readonly hash: string; readonly _tag: "ScriptHash" }
                      | KeyHash.KeyHash;
                  }
                | {
                    address: { bech32: any; hex: string };
                    _tag: "PointerAddress";
                    networkId: number;
                    paymentCredential:
                      | { readonly hash: string; readonly _tag: "ScriptHash" }
                      | KeyHash.KeyHash;
                    pointer: {
                      readonly _tag: "Pointer";
                      readonly slot: number;
                      readonly txIndex: number;
                      readonly certIndex: number;
                    };
                  }
                | {
                    address: { bech32: any; hex: string };
                    _tag: "RewardAccount";
                    networkId: number;
                    stakeCredential:
                      | { readonly hash: string; readonly _tag: "ScriptHash" }
                      | KeyHash.KeyHash;
                  }
                | {
                    address: { bech32: any; hex: string };
                    _tag: "ByronAddress";
                    bytes: string;
                  },
                Bytes.BytesError | KeyHash.KeyHashError | AddressError,
                never
              >
            >
          | YieldWrap<
              Effect.Effect<
                | {
                    address: { bech32: string; hex: any };
                    _tag: "BaseAddress";
                    networkId: number;
                    paymentCredential:
                      | { readonly hash: string; readonly _tag: "ScriptHash" }
                      | KeyHash.KeyHash;
                    stakeCredential:
                      | { readonly hash: string; readonly _tag: "ScriptHash" }
                      | KeyHash.KeyHash;
                  }
                | {
                    address: { bech32: string; hex: any };
                    _tag: "EnterpriseAddress";
                    networkId: number;
                    paymentCredential:
                      | { readonly hash: string; readonly _tag: "ScriptHash" }
                      | KeyHash.KeyHash;
                  }
                | {
                    address: { bech32: string; hex: any };
                    _tag: "PointerAddress";
                    networkId: number;
                    paymentCredential:
                      | { readonly hash: string; readonly _tag: "ScriptHash" }
                      | KeyHash.KeyHash;
                    pointer: {
                      readonly _tag: "Pointer";
                      readonly slot: number;
                      readonly txIndex: number;
                      readonly certIndex: number;
                    };
                  }
                | {
                    address: { bech32: string; hex: any };
                    _tag: "RewardAccount";
                    networkId: number;
                    stakeCredential:
                      | { readonly hash: string; readonly _tag: "ScriptHash" }
                      | KeyHash.KeyHash;
                  }
                | {
                    address: { bech32: string; hex: any };
                    _tag: "ByronAddress";
                    bytes: string;
                  },
                Bytes.BytesError | KeyHash.KeyHashError | AddressError,
                never
              >
            >,
        ] extends [YieldWrap<Effect.Effect<infer _A, infer E, infer _R>>]
      ? E
      : never,
  [
    | YieldWrap<
        Effect.Effect<
          | {
              address: { bech32: any; hex: string };
              _tag: "BaseAddress";
              networkId: number;
              paymentCredential:
                | { readonly hash: string; readonly _tag: "ScriptHash" }
                | KeyHash.KeyHash;
              stakeCredential:
                | { readonly hash: string; readonly _tag: "ScriptHash" }
                | KeyHash.KeyHash;
            }
          | {
              address: { bech32: any; hex: string };
              _tag: "EnterpriseAddress";
              networkId: number;
              paymentCredential:
                | { readonly hash: string; readonly _tag: "ScriptHash" }
                | KeyHash.KeyHash;
            }
          | {
              address: { bech32: any; hex: string };
              _tag: "PointerAddress";
              networkId: number;
              paymentCredential:
                | { readonly hash: string; readonly _tag: "ScriptHash" }
                | KeyHash.KeyHash;
              pointer: {
                readonly _tag: "Pointer";
                readonly slot: number;
                readonly txIndex: number;
                readonly certIndex: number;
              };
            }
          | {
              address: { bech32: any; hex: string };
              _tag: "RewardAccount";
              networkId: number;
              stakeCredential:
                | { readonly hash: string; readonly _tag: "ScriptHash" }
                | KeyHash.KeyHash;
            }
          | {
              address: { bech32: any; hex: string };
              _tag: "ByronAddress";
              bytes: string;
            },
          Bytes.BytesError | KeyHash.KeyHashError | AddressError,
          never
        >
      >
    | YieldWrap<
        Effect.Effect<
          | {
              address: { bech32: string; hex: any };
              _tag: "BaseAddress";
              networkId: number;
              paymentCredential:
                | { readonly hash: string; readonly _tag: "ScriptHash" }
                | KeyHash.KeyHash;
              stakeCredential:
                | { readonly hash: string; readonly _tag: "ScriptHash" }
                | KeyHash.KeyHash;
            }
          | {
              address: { bech32: string; hex: any };
              _tag: "EnterpriseAddress";
              networkId: number;
              paymentCredential:
                | { readonly hash: string; readonly _tag: "ScriptHash" }
                | KeyHash.KeyHash;
            }
          | {
              address: { bech32: string; hex: any };
              _tag: "PointerAddress";
              networkId: number;
              paymentCredential:
                | { readonly hash: string; readonly _tag: "ScriptHash" }
                | KeyHash.KeyHash;
              pointer: {
                readonly _tag: "Pointer";
                readonly slot: number;
                readonly txIndex: number;
                readonly certIndex: number;
              };
            }
          | {
              address: { bech32: string; hex: any };
              _tag: "RewardAccount";
              networkId: number;
              stakeCredential:
                | { readonly hash: string; readonly _tag: "ScriptHash" }
                | KeyHash.KeyHash;
            }
          | {
              address: { bech32: string; hex: any };
              _tag: "ByronAddress";
              bytes: string;
            },
          Bytes.BytesError | KeyHash.KeyHashError | AddressError,
          never
        >
      >,
  ] extends [never]
    ? never
    : [
          | YieldWrap<
              Effect.Effect<
                | {
                    address: { bech32: any; hex: string };
                    _tag: "BaseAddress";
                    networkId: number;
                    paymentCredential:
                      | { readonly hash: string; readonly _tag: "ScriptHash" }
                      | KeyHash.KeyHash;
                    stakeCredential:
                      | { readonly hash: string; readonly _tag: "ScriptHash" }
                      | KeyHash.KeyHash;
                  }
                | {
                    address: { bech32: any; hex: string };
                    _tag: "EnterpriseAddress";
                    networkId: number;
                    paymentCredential:
                      | { readonly hash: string; readonly _tag: "ScriptHash" }
                      | KeyHash.KeyHash;
                  }
                | {
                    address: { bech32: any; hex: string };
                    _tag: "PointerAddress";
                    networkId: number;
                    paymentCredential:
                      | { readonly hash: string; readonly _tag: "ScriptHash" }
                      | KeyHash.KeyHash;
                    pointer: {
                      readonly _tag: "Pointer";
                      readonly slot: number;
                      readonly txIndex: number;
                      readonly certIndex: number;
                    };
                  }
                | {
                    address: { bech32: any; hex: string };
                    _tag: "RewardAccount";
                    networkId: number;
                    stakeCredential:
                      | { readonly hash: string; readonly _tag: "ScriptHash" }
                      | KeyHash.KeyHash;
                  }
                | {
                    address: { bech32: any; hex: string };
                    _tag: "ByronAddress";
                    bytes: string;
                  },
                Bytes.BytesError | KeyHash.KeyHashError | AddressError,
                never
              >
            >
          | YieldWrap<
              Effect.Effect<
                | {
                    address: { bech32: string; hex: any };
                    _tag: "BaseAddress";
                    networkId: number;
                    paymentCredential:
                      | { readonly hash: string; readonly _tag: "ScriptHash" }
                      | KeyHash.KeyHash;
                    stakeCredential:
                      | { readonly hash: string; readonly _tag: "ScriptHash" }
                      | KeyHash.KeyHash;
                  }
                | {
                    address: { bech32: string; hex: any };
                    _tag: "EnterpriseAddress";
                    networkId: number;
                    paymentCredential:
                      | { readonly hash: string; readonly _tag: "ScriptHash" }
                      | KeyHash.KeyHash;
                  }
                | {
                    address: { bech32: string; hex: any };
                    _tag: "PointerAddress";
                    networkId: number;
                    paymentCredential:
                      | { readonly hash: string; readonly _tag: "ScriptHash" }
                      | KeyHash.KeyHash;
                    pointer: {
                      readonly _tag: "Pointer";
                      readonly slot: number;
                      readonly txIndex: number;
                      readonly certIndex: number;
                    };
                  }
                | {
                    address: { bech32: string; hex: any };
                    _tag: "RewardAccount";
                    networkId: number;
                    stakeCredential:
                      | { readonly hash: string; readonly _tag: "ScriptHash" }
                      | KeyHash.KeyHash;
                  }
                | {
                    address: { bech32: string; hex: any };
                    _tag: "ByronAddress";
                    bytes: string;
                  },
                Bytes.BytesError | KeyHash.KeyHashError | AddressError,
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

// From bech32
const bech32Effect = Address.addressDetailsFromString(
  "addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x",
);

// From hex
const hexEffect = Address.addressDetailsFromString(
  "019493315cd92eb5d8c4304e67b7e16ae36d61d34502694657811a2c8e337b62cfff6403a06a3acbc34f8c46003c69fe79a3628cefa9c47251",
);

const details = Effect.runSync(bech32Effect);
// Returns complete address details regardless of input format
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

const effect = Address.bytesFromBech32(
  "addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x",
);
const bytes = Effect.runSync(effect);
// Returns Uint8Array representing the binary address
```

Added in v2.0.0

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

## fromBech32

Parse the complete address structure into a typed representation
This decodes the address format according to CIP-0019 specification

**Signature**

```ts
export declare const fromBech32: (
  bech32Address: any,
) => Effect.Effect<
  | BaseAddress
  | EnterpriseAddress
  | PointerAddress
  | RewardAccount
  | ByronAddress,
  [
    | YieldWrap<Effect.Effect<Uint8Array, AddressError, never>>
    | YieldWrap<
        Effect.Effect<
          | BaseAddress
          | EnterpriseAddress
          | PointerAddress
          | RewardAccount
          | ByronAddress,
          Bytes.BytesError | KeyHash.KeyHashError | AddressError,
          never
        >
      >,
  ] extends [never]
    ? never
    : [
          | YieldWrap<Effect.Effect<Uint8Array, AddressError, never>>
          | YieldWrap<
              Effect.Effect<
                | BaseAddress
                | EnterpriseAddress
                | PointerAddress
                | RewardAccount
                | ByronAddress,
                Bytes.BytesError | KeyHash.KeyHashError | AddressError,
                never
              >
            >,
        ] extends [YieldWrap<Effect.Effect<infer _A, infer E, infer _R>>]
      ? E
      : never,
  [
    | YieldWrap<Effect.Effect<Uint8Array, AddressError, never>>
    | YieldWrap<
        Effect.Effect<
          | BaseAddress
          | EnterpriseAddress
          | PointerAddress
          | RewardAccount
          | ByronAddress,
          Bytes.BytesError | KeyHash.KeyHashError | AddressError,
          never
        >
      >,
  ] extends [never]
    ? never
    : [
          | YieldWrap<Effect.Effect<Uint8Array, AddressError, never>>
          | YieldWrap<
              Effect.Effect<
                | BaseAddress
                | EnterpriseAddress
                | PointerAddress
                | RewardAccount
                | ByronAddress,
                Bytes.BytesError | KeyHash.KeyHashError | AddressError,
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

## fromBytes

Convert bytes to an address structure

**Signature**

```ts
export declare const fromBytes: (
  bytes: Uint8Array,
) => Effect.Effect<
  | BaseAddress
  | EnterpriseAddress
  | PointerAddress
  | RewardAccount
  | ByronAddress,
  [
    | YieldWrap<Effect.Effect<string, Bytes.BytesError, never>>
    | YieldWrap<Effect.Effect<KeyHash.KeyHash, KeyHash.KeyHashError, never>>
    | YieldWrap<Effect.Effect<number[], AddressError, never>>,
  ] extends [never]
    ? never
    : [
          | YieldWrap<Effect.Effect<string, Bytes.BytesError, never>>
          | YieldWrap<
              Effect.Effect<KeyHash.KeyHash, KeyHash.KeyHashError, never>
            >
          | YieldWrap<Effect.Effect<number[], AddressError, never>>,
        ] extends [YieldWrap<Effect.Effect<infer _A, infer E, infer _R>>]
      ? E
      : never,
  [
    | YieldWrap<Effect.Effect<string, Bytes.BytesError, never>>
    | YieldWrap<Effect.Effect<KeyHash.KeyHash, KeyHash.KeyHashError, never>>
    | YieldWrap<Effect.Effect<number[], AddressError, never>>,
  ] extends [never]
    ? never
    : [
          | YieldWrap<Effect.Effect<string, Bytes.BytesError, never>>
          | YieldWrap<
              Effect.Effect<KeyHash.KeyHash, KeyHash.KeyHashError, never>
            >
          | YieldWrap<Effect.Effect<number[], AddressError, never>>,
        ] extends [YieldWrap<Effect.Effect<infer _A, infer _E, infer R>>]
      ? R
      : never
>;
```

**Example**

```ts
import { Address, Bytes } from "@lucid-evolution/experimental";
import { Effect } from "effect";

const addressBytes = Bytes.fromHexOrThrow(
  "019493315cd92eb5d8c4304e67b7e16ae36d61d34502694657811a2c8e337b62cfff6403a06a3acbc34f8c46003c69fe79a3628cefa9c47251",
);
// const effect = Address.fromBytes(addressBytes);
// const address = Effect.runSync(effect);
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
    Bytes.fromHexOrThrow(
      "019493315cd92eb5d8c4304e67b7e16ae36d61d34502694657811a2c8e337b62cfff6403a06a3acbc34f8c46003c69fe79a3628cefa9c47251",
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
) => Effect.Effect<
  Uint8Array,
  [YieldWrap<Effect.Effect<any, AddressError, never>>] extends [never]
    ? never
    : [YieldWrap<Effect.Effect<any, AddressError, never>>] extends [
          YieldWrap<Effect.Effect<infer _A, infer E, infer _R>>,
        ]
      ? E
      : never,
  [YieldWrap<Effect.Effect<any, AddressError, never>>] extends [never]
    ? never
    : [YieldWrap<Effect.Effect<any, AddressError, never>>] extends [
          YieldWrap<Effect.Effect<infer _A, infer _E, infer R>>,
        ]
      ? R
      : never
>;
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

## toCBOR

Encode a Cardano address to CBOR format

**Signature**

```ts
export declare const toCBOR: (
  address: Address,
) => Effect.Effect<
  Effect.Effect<string, Bytes.BytesError, never>,
  AddressError,
  never
>;
```

**Example**

```ts
import { Address } from "@lucid-evolution/experimental";
import { Effect } from "effect";

const effect = Address.fromBech32(
  "addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x",
).pipe(Effect.flatMap(Address.toCBOR));

const cborHex = Effect.runSync(effect);
// Returns hex string of the CBOR-encoded address
```

Added in v2.0.0

## toHex

Convert address to hex string

**Signature**

```ts
export declare const toHex: (
  address: Address,
) => Effect.Effect<string, Bytes.BytesError | AddressError, never>;
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

## BaseAddress (interface)

Type representing a base address with payment and stake credentials

**Signature**

```ts
export interface BaseAddress extends Schema.Schema.Type<typeof BaseAddress> {}
```

Added in v2.0.0

## ByronAddress (interface)

Type representing a Byron legacy address

**Signature**

```ts
export interface ByronAddress extends Schema.Schema.Type<typeof ByronAddress> {}
```

Added in v2.0.0

## EnterpriseAddress (interface)

Type representing an enterprise address with only payment credential

**Signature**

```ts
export interface EnterpriseAddress
  extends Schema.Schema.Type<typeof EnterpriseAddress> {}
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

## Pointer (type alias)

Type representing a pointer to a stake registration

**Signature**

```ts
export type Pointer = Schema.Schema.Type<typeof Pointer>;
```

Added in v2.0.0

## PointerAddress (interface)

Type representing a pointer address with payment credential and pointer

**Signature**

```ts
export interface PointerAddress
  extends Schema.Schema.Type<typeof PointerAddress> {}
```

Added in v2.0.0

## RewardAccount (interface)

Type representing a reward/stake address with only staking credential

**Signature**

```ts
export interface RewardAccount
  extends Schema.Schema.Type<typeof RewardAccount> {}
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

const isValid = Address.isPaymentAddress(
  "addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x",
);
// Returns true if address is a valid payment address
```

Added in v2.0.0

## isPointer

Check if the given value is a valid Pointer

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

**Example**

```ts
import { Address } from "@lucid-evolution/experimental";

const pointer = { _tag: "Pointer", slot: 1, txIndex: 2, certIndex: 3 };
const isValid = Address.isPointer(pointer);
// Returns true if pointer is valid
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

const isValid = Address.isRewardAddress(
  "stake1uyehkck0lajq8gr28t9uxnuvgcqrc6070x3k9r8048z8y5gh6ffgw",
);
// Returns true if address is a valid reward address
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
            typeof KeyHash.KeyHash,
            Schema.TaggedStruct<
              "ScriptHash",
              {
                hash: Schema.refine<
                  string,
                  Schema.Schema<string, string, never>
                >;
              }
            >,
          ]
        >;
        stakeCredential: Schema.Union<
          [
            typeof KeyHash.KeyHash,
            Schema.TaggedStruct<
              "ScriptHash",
              {
                hash: Schema.refine<
                  string,
                  Schema.Schema<string, string, never>
                >;
              }
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
            typeof KeyHash.KeyHash,
            Schema.TaggedStruct<
              "ScriptHash",
              {
                hash: Schema.refine<
                  string,
                  Schema.Schema<string, string, never>
                >;
              }
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
            typeof KeyHash.KeyHash,
            Schema.TaggedStruct<
              "ScriptHash",
              {
                hash: Schema.refine<
                  string,
                  Schema.Schema<string, string, never>
                >;
              }
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
            typeof KeyHash.KeyHash,
            Schema.TaggedStruct<
              "ScriptHash",
              {
                hash: Schema.refine<
                  string,
                  Schema.Schema<string, string, never>
                >;
              }
            >,
          ]
        >;
      }
    >,
    Schema.TaggedStruct<
      "ByronAddress",
      { bytes: Schema.refine<string, Schema.Schema<string, string, never>> }
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
        typeof KeyHash.KeyHash,
        Schema.TaggedStruct<
          "ScriptHash",
          { hash: Schema.refine<string, Schema.Schema<string, string, never>> }
        >,
      ]
    >;
    stakeCredential: Schema.Union<
      [
        typeof KeyHash.KeyHash,
        Schema.TaggedStruct<
          "ScriptHash",
          { hash: Schema.refine<string, Schema.Schema<string, string, never>> }
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
  { bytes: Schema.refine<string, Schema.Schema<string, string, never>> }
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
        typeof KeyHash.KeyHash,
        Schema.TaggedStruct<
          "ScriptHash",
          { hash: Schema.refine<string, Schema.Schema<string, string, never>> }
        >,
      ]
    >;
  }
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

## Pointer

Schema for pointer to a stake registration certificate
Contains slot, transaction index, and certificate index information

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
        typeof KeyHash.KeyHash,
        Schema.TaggedStruct<
          "ScriptHash",
          { hash: Schema.refine<string, Schema.Schema<string, string, never>> }
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
        typeof KeyHash.KeyHash,
        Schema.TaggedStruct<
          "ScriptHash",
          { hash: Schema.refine<string, Schema.Schema<string, string, never>> }
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

## StakeReference

Schema for stake reference that can be either a credential or a pointer

**Signature**

```ts
export declare const StakeReference: Schema.UndefinedOr<
  Schema.Union<
    [
      Schema.Union<
        [
          typeof KeyHash.KeyHash,
          Schema.TaggedStruct<
            "ScriptHash",
            {
              hash: Schema.refine<string, Schema.Schema<string, string, never>>;
            }
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

const effect = Address.addressTagFromBech32(
  "addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x",
);
const tag = Effect.runSync(effect);
// Returns "Base"
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

const tag = Address.addressTagFromHeader(0);
// Returns "Base"
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
