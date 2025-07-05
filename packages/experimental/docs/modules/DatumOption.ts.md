---
title: DatumOption.ts
nav_order: 296
parent: Modules
---

## DatumOption overview

---

<h2 class="text-delta">Table of contents</h2>

- [encoding/decoding](#encodingdecoding)
  - [CBORBytes](#cborbytes)
  - [CBORHex](#cborhex)
  - [InlineDatumBytes](#inlinedatumbytes)
- [errors](#errors)
  - [DatumOptionError (class)](#datumoptionerror-class)
- [model](#model)
  - [DatumOption](#datumoption)
  - [DatumOption (type alias)](#datumoption-type-alias)
- [predicates](#predicates)
  - [isDatumOption](#isdatumoption)
- [schemas](#schemas)
  - [InlineDatum (class)](#inlinedatum-class)
    - [[Inspectable.NodeInspectSymbol] (method)](#inspectablenodeinspectsymbol-method)
- [testing](#testing)
  - [generator](#generator)
- [utils](#utils)
  - [equals](#equals)

---

# encoding/decoding

## CBORBytes

Schema for transforming between CBOR bytes and DatumOption

**Signature**

```ts
export declare const CBORBytes: Schema.transformOrFail<
  Schema.declare<any, any, readonly [], never>,
  Schema.Union<[typeof DatumHash.DatumHash, typeof InlineDatum]>,
  never
>;
```

Added in v2.0.0

## CBORHex

Schema for transforming between CBOR hex and DatumOption

**Signature**

```ts
export declare const CBORHex: Schema.transformOrFail<
  Schema.SchemaClass<
    string & Brand<"HexString">,
    string & Brand<"HexString">,
    never
  >,
  Schema.Union<[typeof DatumHash.DatumHash, typeof InlineDatum]>,
  never
>;
```

Added in v2.0.0

## InlineDatumBytes

Schema for transforming between Uint8Array and InlineDatum

**Signature**

```ts
export declare const InlineDatumBytes: Schema.transform<
  typeof Schema.Uint8ArrayFromSelf,
  Schema.Schema<
    InlineDatum,
    { readonly _tag: "InlineDatum"; readonly data: any },
    never
  >
>;
```

Added in v2.0.0

# errors

## DatumOptionError (class)

Error thrown when datum option operations fail

**Signature**

```ts
export declare class DatumOptionError
```

Added in v2.0.0

# model

## DatumOption

Union type representing datum option types.

**Signature**

```ts
export declare const DatumOption: Schema.Union<
  [typeof DatumHash.DatumHash, typeof InlineDatum]
>;
```

Added in v2.0.0

## DatumOption (type alias)

Type representing a datum option.

**Signature**

```ts
export type DatumOption = typeof DatumOption.Type;
```

Added in v2.0.0

# predicates

## isDatumOption

Check if the given value is a valid DatumOption

**Signature**

```ts
export declare const isDatumOption: (
  u: unknown,
  overrideOptions?: ParseOptions | number,
) => u is DatumHash.DatumHash | InlineDatum;
```

Added in v2.0.0

# schemas

## InlineDatum (class)

Schema representing inline datum data

**Signature**

```ts
export declare class InlineDatum
```

Added in v2.0.0

### [Inspectable.NodeInspectSymbol] (method)

**Signature**

```ts
[Inspectable.NodeInspectSymbol]();
```

# testing

## generator

FastCheck generator for datum options.

**Signature**

```ts
export declare const generator: FastCheck.Arbitrary<
  DatumHash.DatumHash | InlineDatum
>;
```

Added in v2.0.0

# utils

## equals

Checks if two datum options are equal.

**Signature**

```ts
export declare const equals: (a: DatumOption, b: DatumOption) => boolean;
```

**Example**

```ts
import { DatumOption, DatumHash } from "@lucid-evolution/experimental";
import { Schema } from "effect";
import assert from "assert";

const hash1 = Schema.decodeUnknownSync(DatumHash.HexString)(
  "5160f88b929bf8a6c57c285b889488f9137c0ef3cfd0bcf408a10020e69146d5",
);
const hash2 = Schema.decodeUnknownSync(DatumHash.HexString)(
  "5160f88b929bf8a6c57c285b889488f9137c0ef3cfd0bcf408a10020e69146d5",
);
const inline1 = new DatumOption.InlineDatum({
  data: new Uint8Array([1, 2, 3]),
});

assert(DatumOption.equals(hash1, hash2) === true);
assert(DatumOption.equals(hash1, inline1) === false);
```

Added in v2.0.0
