---
title: EnterpriseAddress.ts
nav_order: 299
parent: Modules
---

## EnterpriseAddress overview

---

<h2 class="text-delta">Table of contents</h2>

- [encoding/decoding](#encodingdecoding)
  - [Decode](#decode)
  - [DecodeEither](#decodeeither)
  - [Encode](#encode)
  - [EncodeEither](#encodeeither)
- [equality](#equality)
  - [equals](#equals)
- [generators](#generators)
  - [generator](#generator)
- [schemas](#schemas)
  - [EnterpriseAddress (class)](#enterpriseaddress-class)
    - [[Inspectable.NodeInspectSymbol] (method)](#inspectablenodeinspectsymbol-method)
- [utils](#utils)
  - [BytesSchema](#bytesschema)
  - [EnterpriseAddress (interface)](#enterpriseaddress-interface)
  - [HexStringSchema](#hexstringschema)

---

# encoding/decoding

## Decode

Synchronous decoding utilities for enterprise address.

**Signature**

```ts
export declare const Decode: {
  hex: (u: unknown, overrideOptions?: ParseOptions) => EnterpriseAddress;
  bytes: (u: unknown, overrideOptions?: ParseOptions) => EnterpriseAddress;
};
```

Added in v2.0.0

## DecodeEither

Either decoding utilities for enterprise address.

**Signature**

```ts
export declare const DecodeEither: {
  hex: (
    u: unknown,
    overrideOptions?: ParseOptions,
  ) => Either<EnterpriseAddress, ParseResult.ParseError>;
  bytes: (
    u: unknown,
    overrideOptions?: ParseOptions,
  ) => Either<EnterpriseAddress, ParseResult.ParseError>;
};
```

Added in v2.0.0

## Encode

Synchronous encoding utilities for enterprise address.

**Signature**

```ts
export declare const Encode: {
  hex: (
    a: EnterpriseAddress,
    overrideOptions?: ParseOptions,
  ) => string & Brand<"HexString">;
  bytes: (a: EnterpriseAddress, overrideOptions?: ParseOptions) => any;
};
```

Added in v2.0.0

## EncodeEither

Either encoding utilities for enterprise address.

**Signature**

```ts
export declare const EncodeEither: {
  hex: (
    a: EnterpriseAddress,
    overrideOptions?: ParseOptions,
  ) => Either<string & Brand<"HexString">, ParseResult.ParseError>;
  bytes: (
    a: EnterpriseAddress,
    overrideOptions?: ParseOptions,
  ) => Either<any, ParseResult.ParseError>;
};
```

Added in v2.0.0

# equality

## equals

Check if two EnterpriseAddress instances are equal.

**Signature**

```ts
export declare const equals: (
  a: EnterpriseAddress,
  b: EnterpriseAddress,
) => boolean;
```

Added in v2.0.0

# generators

## generator

Generate a random EnterpriseAddress.

**Signature**

```ts
export declare const generator: FastCheck.Arbitrary<EnterpriseAddress>;
```

**Example**

```ts
import { EnterpriseAddress } from "@lucid-evolution/experimental";
import { FastCheck } from "effect";
import assert from "assert";

const randomSamples = FastCheck.sample(EnterpriseAddress.generator, 20);
randomSamples.forEach((address) => {
  assert(address._tag === "EnterpriseAddress");
  assert(typeof address.networkId === "number");
});
```

Added in v2.0.0

# schemas

## EnterpriseAddress (class)

Enterprise address with only payment credential

**Signature**

```ts
export declare class EnterpriseAddress
```

Added in v2.0.0

### [Inspectable.NodeInspectSymbol] (method)

**Signature**

```ts
[Inspectable.NodeInspectSymbol]();
```

# utils

## BytesSchema

**Signature**

```ts
export declare const BytesSchema: Schema.transformOrFail<
  typeof Schema.Uint8ArrayFromSelf,
  typeof EnterpriseAddress,
  never
>;
```

## EnterpriseAddress (interface)

**Signature**

```ts
export interface EnterpriseAddress {
  readonly [NominalType]: unique symbol;
}
```

## HexStringSchema

**Signature**

```ts
export declare const HexStringSchema: Schema.transformOrFail<
  Schema.SchemaClass<
    string & Brand<"HexString">,
    string & Brand<"HexString">,
    never
  >,
  typeof EnterpriseAddress,
  never
>;
```
