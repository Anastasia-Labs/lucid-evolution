---
title: AssetName.ts
nav_order: 4
parent: Modules
---

## AssetName overview

---

<h2 class="text-delta">Table of contents</h2>

- [constants](#constants)
  - [ASSETNAME_BYTES_LENGTH](#assetname_bytes_length)
  - [ASSETNAME_HEX_LENGTH](#assetname_hex_length)
- [encoding/decoding](#encodingdecoding)
  - [Bytes](#bytes)
  - [CBORBytes](#cborbytes)
  - [CBORHex](#cborhex)
  - [HexString](#hexstring)
- [equality](#equality)
  - [equals](#equals)
- [generators](#generators)
  - [generator](#generator)
- [schemas](#schemas)
  - [AssetName (class)](#assetname-class)
    - [[Inspectable.NodeInspectSymbol] (method)](#inspectablenodeinspectsymbol-method)
  - [AssetNameBytes](#assetnamebytes)
- [utils](#utils)
  - [AssetNameError (class)](#assetnameerror-class)
  - [Hash](#hash)

---

# constants

## ASSETNAME_BYTES_LENGTH

Max length in bytes of a AssetName.

**Signature**

```ts
export declare const ASSETNAME_BYTES_LENGTH: 32;
```

Added in v2.0.0

## ASSETNAME_HEX_LENGTH

Max length in hex characters of a AssetName.

**Signature**

```ts
export declare const ASSETNAME_HEX_LENGTH: 64;
```

Added in v2.0.0

# encoding/decoding

## Bytes

Schema for transforming between Uint8Array and AssetName.

**Signature**

```ts
export declare const Bytes: Schema.transform<
  Schema.SchemaClass<any, any, never>,
  Schema.Schema<
    AssetName,
    { readonly _tag: "AssetName"; readonly hex: string & Brand<"HexString"> },
    never
  >
>;
```

Added in v2.0.0

## CBORBytes

Schema for transforming between CBOR bytes and AssetName.

**Signature**

```ts
export declare const CBORBytes: Schema.transformOrFail<
  Schema.declare<any, any, readonly [], never>,
  typeof AssetName,
  never
>;
```

Added in v2.0.0

## CBORHex

Schema for transforming between CBOR hex and AssetName.

**Signature**

```ts
export declare const CBORHex: Schema.transformOrFail<
  Schema.SchemaClass<
    string & Brand<"HexString">,
    string & Brand<"HexString">,
    never
  >,
  typeof AssetName,
  never
>;
```

Added in v2.0.0

## HexString

Schema for transforming between hex string and AssetName.

**Signature**

```ts
export declare const HexString: Schema.transform<
  Schema.refine<
    string & Brand<"HexString">,
    Schema.SchemaClass<
      string & Brand<"HexString">,
      string & Brand<"HexString">,
      never
    >
  >,
  typeof AssetName
>;
```

Added in v2.0.0

# equality

## equals

Check if two AssetClass instances are equal.

**Signature**

```ts
export declare const equals: (a: AssetName, b: AssetName) => boolean;
```

Added in v2.0.0

# generators

## generator

Generate a random AssetName.

**Signature**

```ts
export declare const generator: FastCheck.Arbitrary<AssetName>;
```

**Example**

```ts
import { AssetName } from "@lucid-evolution/experimental";
import { FastCheck } from "effect";
import assert from "assert";

const randomSamples = FastCheck.sample(AssetName.generator, 20);
randomSamples.forEach((assetName) => {
  assert(assetName.hex.length <= 64);
});
```

Added in v2.0.0

# schemas

## AssetName (class)

Schema for AssetName, enforcing a max byte length of 32.

**Signature**

```ts
export declare class AssetName
```

Added in v2.0.0

### [Inspectable.NodeInspectSymbol] (method)

**Signature**

```ts
[Inspectable.NodeInspectSymbol]();
```

## AssetNameBytes

Schema for AssetName bytes validation.

**Signature**

```ts
export declare const AssetNameBytes: Schema.SchemaClass<any, any, never>;
```

Added in v2.0.0

# utils

## AssetNameError (class)

**Signature**

```ts
export declare class AssetNameError
```

## Hash

**Signature**

```ts
export declare const Hash: Schema.refine<
  string & Brand<"HexString">,
  Schema.SchemaClass<
    string & Brand<"HexString">,
    string & Brand<"HexString">,
    never
  >
>;
```
