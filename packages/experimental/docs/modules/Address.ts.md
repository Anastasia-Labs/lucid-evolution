---
title: Address.ts
nav_order: 1
parent: Modules
---

## Address overview

---

<h2 class="text-delta">Table of contents</h2>

- [encoding/decoding](#encodingdecoding)
  - [Decode](#decode)
  - [DecodeEither](#decodeeither)
  - [Encode](#encode)
  - [EncodeEither](#encodeeither)
- [model](#model)
  - [Address](#address)
  - [Address (type alias)](#address-type-alias)
  - [AddressError (class)](#addresserror-class)
- [schema](#schema)
  - [Bech32Schema](#bech32schema)
  - [BytesSchema](#bytesschema)
  - [HexStringSchema](#hexstringschema)
- [testing](#testing)
  - [generator](#generator)
- [utils](#utils)
  - [equals](#equals)

---

# encoding/decoding

## Decode

Synchronous decoding utilities for addresses.

**Signature**

```ts
export declare const Decode: {
  bech32: (
    u: unknown,
    overrideOptions?: ParseOptions,
  ) =>
    | PointerAddress.PointerAddress
    | EnterpriseAddress.EnterpriseAddress
    | ByronAddress.ByronAddress
    | BaseAddress.BaseAddress
    | RewardAccount.RewardAccount;
  hex: (
    u: unknown,
    overrideOptions?: ParseOptions,
  ) =>
    | PointerAddress.PointerAddress
    | EnterpriseAddress.EnterpriseAddress
    | ByronAddress.ByronAddress
    | BaseAddress.BaseAddress
    | RewardAccount.RewardAccount;
  bytes: (
    u: unknown,
    overrideOptions?: ParseOptions,
  ) =>
    | PointerAddress.PointerAddress
    | EnterpriseAddress.EnterpriseAddress
    | ByronAddress.ByronAddress
    | BaseAddress.BaseAddress
    | RewardAccount.RewardAccount;
};
```

Added in v2.0.0

## DecodeEither

Either decoding utilities for addresses.

**Signature**

```ts
export declare const DecodeEither: {
  bech32: (
    u: unknown,
    overrideOptions?: ParseOptions,
  ) => Either<
    | PointerAddress.PointerAddress
    | EnterpriseAddress.EnterpriseAddress
    | ByronAddress.ByronAddress
    | BaseAddress.BaseAddress
    | RewardAccount.RewardAccount,
    ParseResult.ParseError
  >;
  hex: (
    u: unknown,
    overrideOptions?: ParseOptions,
  ) => Either<
    | PointerAddress.PointerAddress
    | EnterpriseAddress.EnterpriseAddress
    | ByronAddress.ByronAddress
    | BaseAddress.BaseAddress
    | RewardAccount.RewardAccount,
    ParseResult.ParseError
  >;
  bytes: (
    u: unknown,
    overrideOptions?: ParseOptions,
  ) => Either<
    | PointerAddress.PointerAddress
    | EnterpriseAddress.EnterpriseAddress
    | ByronAddress.ByronAddress
    | BaseAddress.BaseAddress
    | RewardAccount.RewardAccount,
    ParseResult.ParseError
  >;
};
```

Added in v2.0.0

## Encode

Synchronous encoding utilities for addresses.

**Signature**

```ts
export declare const Encode: {
  bech32: (
    a:
      | PointerAddress.PointerAddress
      | EnterpriseAddress.EnterpriseAddress
      | ByronAddress.ByronAddress
      | BaseAddress.BaseAddress
      | RewardAccount.RewardAccount,
    overrideOptions?: ParseOptions,
  ) => string & Brand<"Bech32">;
  hex: (
    a:
      | PointerAddress.PointerAddress
      | EnterpriseAddress.EnterpriseAddress
      | ByronAddress.ByronAddress
      | BaseAddress.BaseAddress
      | RewardAccount.RewardAccount,
    overrideOptions?: ParseOptions,
  ) => string & Brand<"HexString">;
  bytes: (
    a:
      | PointerAddress.PointerAddress
      | EnterpriseAddress.EnterpriseAddress
      | ByronAddress.ByronAddress
      | BaseAddress.BaseAddress
      | RewardAccount.RewardAccount,
    overrideOptions?: ParseOptions,
  ) => any;
};
```

Added in v2.0.0

## EncodeEither

Either encoding utilities for addresses.

**Signature**

```ts
export declare const EncodeEither: {
  bech32: (
    a:
      | PointerAddress.PointerAddress
      | EnterpriseAddress.EnterpriseAddress
      | ByronAddress.ByronAddress
      | BaseAddress.BaseAddress
      | RewardAccount.RewardAccount,
    overrideOptions?: ParseOptions,
  ) => Either<string & Brand<"Bech32">, ParseResult.ParseError>;
  hex: (
    a:
      | PointerAddress.PointerAddress
      | EnterpriseAddress.EnterpriseAddress
      | ByronAddress.ByronAddress
      | BaseAddress.BaseAddress
      | RewardAccount.RewardAccount,
    overrideOptions?: ParseOptions,
  ) => Either<string & Brand<"HexString">, ParseResult.ParseError>;
  bytes: (
    a:
      | PointerAddress.PointerAddress
      | EnterpriseAddress.EnterpriseAddress
      | ByronAddress.ByronAddress
      | BaseAddress.BaseAddress
      | RewardAccount.RewardAccount,
    overrideOptions?: ParseOptions,
  ) => Either<any, ParseResult.ParseError>;
};
```

Added in v2.0.0

# model

## Address

Union type representing all possible address types.

**Signature**

```ts
export declare const Address: Schema.Union<
  [
    typeof BaseAddress.BaseAddress,
    typeof EnterpriseAddress.EnterpriseAddress,
    typeof PointerAddress.PointerAddress,
    typeof RewardAccount.RewardAccount,
    typeof ByronAddress.ByronAddress,
  ]
>;
```

Added in v2.0.0

## Address (type alias)

Type representing an address.

**Signature**

```ts
export type Address = typeof Address.Type;
```

Added in v2.0.0

## AddressError (class)

Error thrown when address operations fail

**Signature**

```ts
export declare class AddressError
```

Added in v2.0.0

# schema

## Bech32Schema

Schema for encoding/decoding addresses as Bech32 strings.

**Signature**

```ts
export declare const Bech32Schema: Schema.transformOrFail<
  Schema.SchemaClass<string & Brand<"Bech32">, string & Brand<"Bech32">, never>,
  Schema.Union<
    [
      typeof BaseAddress.BaseAddress,
      typeof EnterpriseAddress.EnterpriseAddress,
      typeof PointerAddress.PointerAddress,
      typeof RewardAccount.RewardAccount,
      typeof ByronAddress.ByronAddress,
    ]
  >,
  never
>;
```

Added in v2.0.0

## BytesSchema

Schema for encoding/decoding addresses as bytes.

**Signature**

```ts
export declare const BytesSchema: Schema.transformOrFail<
  Schema.SchemaClass<any, any, never>,
  Schema.Union<
    [
      typeof BaseAddress.BaseAddress,
      typeof EnterpriseAddress.EnterpriseAddress,
      typeof PointerAddress.PointerAddress,
      typeof RewardAccount.RewardAccount,
      typeof ByronAddress.ByronAddress,
    ]
  >,
  never
>;
```

Added in v2.0.0

## HexStringSchema

Schema for encoding/decoding addresses as hex strings.

**Signature**

```ts
export declare const HexStringSchema: Schema.transformOrFail<
  Schema.SchemaClass<
    string & Brand<"HexString">,
    string & Brand<"HexString">,
    never
  >,
  Schema.Union<
    [
      typeof BaseAddress.BaseAddress,
      typeof EnterpriseAddress.EnterpriseAddress,
      typeof PointerAddress.PointerAddress,
      typeof RewardAccount.RewardAccount,
      typeof ByronAddress.ByronAddress,
    ]
  >,
  never
>;
```

Added in v2.0.0

# testing

## generator

FastCheck generator for addresses.

**Signature**

```ts
export declare const generator: FastCheck.Arbitrary<
  | PointerAddress.PointerAddress
  | EnterpriseAddress.EnterpriseAddress
  | BaseAddress.BaseAddress
  | RewardAccount.RewardAccount
>;
```

Added in v2.0.0

# utils

## equals

Checks if two addresses are equal.

**Signature**

```ts
export declare const equals: (a: Address, b: Address) => boolean;
```

Added in v2.0.0
