---
title: Address.ts
nav_order: 1
parent: Modules
---

## Address overview

---

<h2 class="text-delta">Table of contents</h2>

- [decoding](#decoding)
  - [decodeBech32](#decodebech32)
  - [decodeBech32Either](#decodebech32either)
  - [decodeBech32OrThrow](#decodebech32orthrow)
  - [decodeBytes](#decodebytes)
  - [decodeBytesEither](#decodebyteseither)
  - [decodeBytesOrThrow](#decodebytesorthrow)
  - [decodeHexString](#decodehexstring)
  - [decodeHexStringEither](#decodehexstringeither)
  - [decodeHexStringOrThrow](#decodehexstringorthrow)
- [encoding](#encoding)
  - [encodeBech32](#encodebech32)
  - [encodeBech32Either](#encodebech32either)
  - [encodeBech32OrThrow](#encodebech32orthrow)
  - [encodeBytes](#encodebytes)
  - [encodeBytesEither](#encodebyteseither)
  - [encodeBytesOrThrow](#encodebytesorthrow)
  - [encodeHexString](#encodehexstring)
  - [encodeHexStringEither](#encodehexstringeither)
  - [encodeHexStringOrThrow](#encodehexstringorthrow)
- [model](#model)
  - [Address](#address)
  - [Address (type alias)](#address-type-alias)
  - [AddressError (class)](#addresserror-class)
- [schema](#schema)
  - [Bech32](#bech32)
  - [Bytes](#bytes)
  - [HexString](#hexstring)
- [testing](#testing)
  - [generator](#generator)
- [utils](#utils)
  - [equals](#equals)

---

# decoding

## decodeBech32

Decodes a Bech32 string to an address.

**Signature**

```ts
export declare const decodeBech32: (
  u: unknown,
  overrideOptions?: ParseOptions,
) => Effect.Effect<
  | PointerAddress.PointerAddress
  | EnterpriseAddress.EnterpriseAddress
  | ByronAddress.ByronAddress
  | BaseAddress.BaseAddress
  | RewardAccount.RewardAccount,
  ParseResult.ParseError,
  never
>;
```

Added in v2.0.0

## decodeBech32Either

Decodes a Bech32 string to an address, returns Either.

**Signature**

```ts
export declare const decodeBech32Either: (
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
```

Added in v2.0.0

## decodeBech32OrThrow

Decodes a Bech32 string to an address, throws on error.

**Signature**

```ts
export declare const decodeBech32OrThrow: (
  u: unknown,
  overrideOptions?: ParseOptions,
) =>
  | PointerAddress.PointerAddress
  | EnterpriseAddress.EnterpriseAddress
  | ByronAddress.ByronAddress
  | BaseAddress.BaseAddress
  | RewardAccount.RewardAccount;
```

Added in v2.0.0

## decodeBytes

Decodes bytes to an address.

**Signature**

```ts
export declare const decodeBytes: (
  u: unknown,
  overrideOptions?: ParseOptions,
) => Effect.Effect<
  | PointerAddress.PointerAddress
  | EnterpriseAddress.EnterpriseAddress
  | ByronAddress.ByronAddress
  | BaseAddress.BaseAddress
  | RewardAccount.RewardAccount,
  ParseResult.ParseError,
  never
>;
```

Added in v2.0.0

## decodeBytesEither

Decodes bytes to an address, returns Either.

**Signature**

```ts
export declare const decodeBytesEither: (
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
```

Added in v2.0.0

## decodeBytesOrThrow

Decodes bytes to an address, throws on error.

**Signature**

```ts
export declare const decodeBytesOrThrow: (
  i: any,
  overrideOptions?: ParseOptions,
) =>
  | PointerAddress.PointerAddress
  | EnterpriseAddress.EnterpriseAddress
  | ByronAddress.ByronAddress
  | BaseAddress.BaseAddress
  | RewardAccount.RewardAccount;
```

Added in v2.0.0

## decodeHexString

Decodes a hex string to an address.

**Signature**

```ts
export declare const decodeHexString: (
  u: unknown,
  overrideOptions?: ParseOptions,
) => Effect.Effect<
  | PointerAddress.PointerAddress
  | EnterpriseAddress.EnterpriseAddress
  | ByronAddress.ByronAddress
  | BaseAddress.BaseAddress
  | RewardAccount.RewardAccount,
  ParseResult.ParseError,
  never
>;
```

Added in v2.0.0

## decodeHexStringEither

Decodes a hex string to an address, returns Either.

**Signature**

```ts
export declare const decodeHexStringEither: (
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
```

Added in v2.0.0

## decodeHexStringOrThrow

Decodes a hex string to an address, throws on error.

**Signature**

```ts
export declare const decodeHexStringOrThrow: (
  u: unknown,
  overrideOptions?: ParseOptions,
) =>
  | PointerAddress.PointerAddress
  | EnterpriseAddress.EnterpriseAddress
  | ByronAddress.ByronAddress
  | BaseAddress.BaseAddress
  | RewardAccount.RewardAccount;
```

Added in v2.0.0

# encoding

## encodeBech32

Encodes an address to Bech32 format.

**Signature**

```ts
export declare const encodeBech32: (
  a:
    | PointerAddress.PointerAddress
    | EnterpriseAddress.EnterpriseAddress
    | ByronAddress.ByronAddress
    | BaseAddress.BaseAddress
    | RewardAccount.RewardAccount,
  overrideOptions?: ParseOptions,
) => Effect.Effect<string & Brand<"Bech32">, ParseResult.ParseError, never>;
```

Added in v2.0.0

## encodeBech32Either

Encodes an address to Bech32 format, returns Either.

**Signature**

```ts
export declare const encodeBech32Either: (
  a:
    | PointerAddress.PointerAddress
    | EnterpriseAddress.EnterpriseAddress
    | ByronAddress.ByronAddress
    | BaseAddress.BaseAddress
    | RewardAccount.RewardAccount,
  overrideOptions?: ParseOptions,
) => Either<string & Brand<"Bech32">, ParseResult.ParseError>;
```

Added in v2.0.0

## encodeBech32OrThrow

Encodes an address to Bech32 format, throws on error.

**Signature**

```ts
export declare const encodeBech32OrThrow: (
  a:
    | PointerAddress.PointerAddress
    | EnterpriseAddress.EnterpriseAddress
    | ByronAddress.ByronAddress
    | BaseAddress.BaseAddress
    | RewardAccount.RewardAccount,
  overrideOptions?: ParseOptions,
) => string & Brand<"Bech32">;
```

Added in v2.0.0

## encodeBytes

Encodes an address to bytes.

**Signature**

```ts
export declare const encodeBytes: (
  a:
    | PointerAddress.PointerAddress
    | EnterpriseAddress.EnterpriseAddress
    | ByronAddress.ByronAddress
    | BaseAddress.BaseAddress
    | RewardAccount.RewardAccount,
  overrideOptions?: ParseOptions,
) => Effect.Effect<any, ParseResult.ParseError, never>;
```

Added in v2.0.0

## encodeBytesEither

Encodes an address to bytes, returns Either.

**Signature**

```ts
export declare const encodeBytesEither: (
  a:
    | PointerAddress.PointerAddress
    | EnterpriseAddress.EnterpriseAddress
    | ByronAddress.ByronAddress
    | BaseAddress.BaseAddress
    | RewardAccount.RewardAccount,
  overrideOptions?: ParseOptions,
) => Either<any, ParseResult.ParseError>;
```

Added in v2.0.0

## encodeBytesOrThrow

Encodes an address to bytes, throws on error.

**Signature**

```ts
export declare const encodeBytesOrThrow: (
  u: unknown,
  overrideOptions?: ParseOptions,
) => any;
```

Added in v2.0.0

## encodeHexString

Encodes an address to a hex string.

**Signature**

```ts
export declare const encodeHexString: (
  a:
    | PointerAddress.PointerAddress
    | EnterpriseAddress.EnterpriseAddress
    | ByronAddress.ByronAddress
    | BaseAddress.BaseAddress
    | RewardAccount.RewardAccount,
  overrideOptions?: ParseOptions,
) => Effect.Effect<string & Brand<"HexString">, ParseResult.ParseError, never>;
```

Added in v2.0.0

## encodeHexStringEither

Encodes an address to a hex string, returns Either.

**Signature**

```ts
export declare const encodeHexStringEither: (
  a:
    | PointerAddress.PointerAddress
    | EnterpriseAddress.EnterpriseAddress
    | ByronAddress.ByronAddress
    | BaseAddress.BaseAddress
    | RewardAccount.RewardAccount,
  overrideOptions?: ParseOptions,
) => Either<string & Brand<"HexString">, ParseResult.ParseError>;
```

Added in v2.0.0

## encodeHexStringOrThrow

Encodes an address to a hex string, throws on error.

**Signature**

```ts
export declare const encodeHexStringOrThrow: (
  a:
    | PointerAddress.PointerAddress
    | EnterpriseAddress.EnterpriseAddress
    | ByronAddress.ByronAddress
    | BaseAddress.BaseAddress
    | RewardAccount.RewardAccount,
  overrideOptions?: ParseOptions,
) => string & Brand<"HexString">;
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

## Bech32

Schema for encoding/decoding addresses as Bech32 strings.

**Signature**

```ts
export declare const Bech32: Schema.transformOrFail<
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

## Bytes

Schema for encoding/decoding addresses as bytes.

**Signature**

```ts
export declare const Bytes: Schema.transformOrFail<
  typeof Schema.Uint8ArrayFromSelf,
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

## HexString

Schema for encoding/decoding addresses as hex strings.

**Signature**

```ts
export declare const HexString: Schema.transformOrFail<
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
