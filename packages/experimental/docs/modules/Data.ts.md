---
title: Data.ts
nav_order: 295
parent: Modules
---

## Data overview

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [mkByte](#mkbyte)
  - [mkConstr](#mkconstr)
  - [mkInt](#mkint)
  - [mkList](#mklist)
  - [mkMap](#mkmap)
- [encoding/decoding](#encodingdecoding)
  - [decodeCBOROrThrow](#decodecbororthrow)
  - [decodeDataEither](#decodedataeither)
  - [decodeDataOrThrow](#decodedataorthrow)
  - [encodeCBOROrThrow](#encodecbororthrow)
  - [encodeDataEither](#encodedataeither)
  - [encodeDataOrThrow](#encodedataorthrow)
- [equality](#equality)
  - [isEqual](#isequal)
- [generators](#generators)
  - [genByteArray](#genbytearray)
  - [genConstr](#genconstr)
  - [genData](#gendata)
  - [genInteger](#geninteger)
  - [genList](#genlist)
  - [genMap](#genmap)
- [model](#model)
  - [ByteArray (interface)](#bytearray-interface)
  - [Constr (interface)](#constr-interface)
  - [Data (type alias)](#data-type-alias)
  - [Integer (interface)](#integer-interface)
  - [List (interface)](#list-interface)
  - [Map (interface)](#map-interface)
- [ordering](#ordering)
  - [compare](#compare)
  - [sort](#sort)
- [predicates](#predicates)
  - [isByteArray](#isbytearray)
  - [isConstr](#isconstr)
  - [isInteger](#isinteger)
  - [isList](#islist)
  - [isMap](#ismap)
- [schemas](#schemas)
  - [ByteArray](#bytearray)
  - [ByteArray$ (interface)](#bytearray-interface)
  - [Constr](#constr)
  - [Constr$ (interface)](#constr-interface)
  - [Data](#data)
  - [Integer](#integer)
  - [Integer$ (interface)](#integer-interface)
  - [List](#list)
  - [List$ (interface)](#list-interface)
  - [Map](#map)
  - [Map$ (interface)](#map-interface)
- [transformation](#transformation)
  - [fromJSONOrThrow](#fromjsonorthrow)
  - [resolveCBOROrThrow](#resolvecbororthrow)
  - [toJSON](#tojson)
- [utilities](#utilities)
  - [uniqueByFirst](#uniquebyfirst)
- [utils](#utils)
  - [decodeCBOR](#decodecbor)
  - [decodeData](#decodedata)
  - [encodeCBOR](#encodecbor)
  - [encodeData](#encodedata)
  - [resolveCBOR](#resolvecbor)

---

# constructors

## mkByte

Creates a Plutus Data ByteArray type from a hex string

**Signature**

```ts
export declare const mkByte: <const T extends string>(
  bytearray: T,
) => ByteArray<T>;
```

**Example**

```ts
import { Data } from "@evolution-sdk/experimental";

const myByteArray = Data.mkByte("deadbeef");
```

Added in v2.0.0

## mkConstr

Creates a Plutus Data Constr type (constructor) with the given index and fields

**Signature**

```ts
export declare const mkConstr: <
  const T extends bigint,
  const U extends readonly Data[],
>(
  index: T,
  fields: U,
) => Constr<T, U>;
```

**Example**

```ts
import { Data } from "@evolution-sdk/experimental";

// Create a constructor for a custom data type (e.g., a "Mint" action with amount)
const mint = Data.mkConstr(0n, [Data.mkInt(5n)]);

// Create a constructor with no fields (e.g., a "Burn" action)
const burn = Data.mkConstr(1n, []);
```

Added in v2.0.0

## mkInt

Creates a Plutus Data Integer type from a bigint value

**Signature**

```ts
export declare const mkInt: <const T extends bigint = bigint>(
  integer: T,
) => Integer<T>;
```

**Example**

```ts
import { Data } from "@evolution-sdk/experimental";

const myInteger = Data.mkInt(42n);
```

Added in v2.0.0

## mkList

Creates a Plutus Data List type from an array of Data elements

**Signature**

```ts
export declare const mkList: <const T extends Data>(
  list: readonly T[],
) => List<T>;
```

**Example**

```ts
import { Data } from "@evolution-sdk/experimental";

// Create a list with multiple elements of the same type
const integerList = Data.mkList([Data.mkInt(42n), Data.mkInt(100n)]);

// Create a list with a single element
const singleList = Data.mkList([Data.mkInt(42n)]);

// Create a mixed list with different element types
const mixedList = Data.mkList([Data.mkInt(42n), Data.mkByte("deadbeef")]);
```

Added in v2.0.0

## mkMap

Creates a Plutus Data Map type from an array of key-value tuples

**Signature**

```ts
export declare const mkMap: <
  const Pairs extends ReadonlyArray<{ k: Data; v: Data }>,
>(
  value: Pairs,
) => Map<Pairs>;
```

**Example**

```ts
import { Data } from "@evolution-sdk/experimental";

const myMap = Data.mkMap([
  { k: Data.mkByte("cafe01"), v: Data.mkInt(42n) },
  { k: Data.mkByte("deadbeef"), v: Data.mkByte("cafe01") },
]);
```

Added in v2.0.0

# encoding/decoding

## decodeCBOROrThrow

Decodes a CBOR hex string to a TypeScript type

**Signature**

```ts
export declare function decodeCBOROrThrow(input: string): Data;
export declare function decodeCBOROrThrow<Source, Target extends Data>(
  input: string,
  schema: Schema.Schema<Source, Target>,
): Source;
```

**Example**

```ts
import { TSchema, Data } from "@evolution-sdk/experimental";

const Token = TSchema.Struct({
  policyId: TSchema.ByteArray,
  assetName: TSchema.ByteArray,
  amount: TSchema.Integer,
});

const cbor = "d8799f44deadbeef42cafe1903e8ff";

// Decode from CBOR
const token = Data.decodeCBOROrThrow(cbor, Token);
// { policyId: "deadbeef", assetName: "cafe", amount: 1000n }

// Decode without schema
const data = Data.decodeCBOROrThrow(cbor);
// {
//   _tag: 'Constr',
//   index: 0n,
//   fields: [
//     { _tag: 'ByteArray', bytearray: 'deadbeef' },
//     { _tag: 'ByteArray', bytearray: 'cafe' },
//     { _tag: 'Integer', integer: 1000n }
//   ]
// }
```

Added in v2.0.0

## decodeDataEither

Safely decodes data using Either for error handling

**Signature**

```ts
export declare const decodeDataEither: <Source, Target extends Data>(
  input: unknown,
  schema: Schema.Schema<Source, Target>,
  options?: SchemaAST.ParseOptions,
) => Either.Either<Source, ParseError>;
```

Added in v2.0.0

## decodeDataOrThrow

Decodes an unknown value from Plutus Data Constructor to a TypeScript type

**Signature**

```ts
export declare const decodeDataOrThrow: <Source, Target extends Data>(
  input: unknown,
  schema: Schema.Schema<Source, Target>,
  options?: SchemaAST.ParseOptions,
) => Source;
```

**Example**

```ts
import { Data, TSchema } from "@evolution-sdk/experimental";

const Token = TSchema.Struct({
  policyId: TSchema.ByteArray,
  assetName: TSchema.ByteArray,
  amount: TSchema.Integer,
});

const plutusData = Data.mkConstr(0n, [
  Data.mkByte("deadbeef"),
  Data.mkByte("cafe"),
  Data.mkInt(1000n),
]);

const token = Data.decodeDataOrThrow(plutusData, Token);
// { policyId: "deadbeef", assetName: "cafe", amount: 1000n }
```

Added in v2.0.0

## encodeCBOROrThrow

Converts TypeScript data into CBOR hex string

**Signature**

```ts
export declare const encodeCBOROrThrow: <Source, Target extends Data>(
  input: unknown,
  schema?: Schema.Schema<Source, Target>,
  options?: { canonical?: boolean; parseOptions?: SchemaAST.ParseOptions },
) => string;
```

**Example**

```ts
import { Data, TSchema } from "@evolution-sdk/experimental";

const Token = TSchema.Struct({
  policyId: TSchema.ByteArray,
  assetName: TSchema.ByteArray,
  amount: TSchema.Integer,
});

const token = {
  policyId: "deadbeef",
  assetName: "cafe",
  amount: 1000n,
};

// Convert to canonical CBOR
const cbor = Data.encodeCBOROrThrow(token, Token, { canonical: true });
```

Added in v2.0.0

## encodeDataEither

Safely encodes data using Either for error handling

**Signature**

```ts
export declare const encodeDataEither: <Source, Target extends Data>(
  input: unknown,
  schema: Schema.Schema<Source, Target>,
  options?: SchemaAST.ParseOptions,
) => Either.Either<Target, ParseError>;
```

Added in v2.0.0

## encodeDataOrThrow

Encodes a TypeScript value to Plutus Data Constructor

**Signature**

```ts
export declare const encodeDataOrThrow: <Source, Target extends Data>(
  input: unknown,
  schema: Schema.Schema<Source, Target>,
  options?: SchemaAST.ParseOptions,
) => Target;
```

**Example**

```ts
import { Data, TSchema } from "@evolution-sdk/experimental";

const token: unknown = {
  policyId: "deadbeef",
  assetName: "cafe",
  amount: 1000n,
};

const Token = TSchema.Struct({
  policyId: TSchema.ByteArray,
  assetName: TSchema.ByteArray,
  amount: TSchema.Integer,
});

const data = Data.encodeDataOrThrow(token, Token);
// { index: 0n, fields: ["deadbeef", "cafe", 1000n] }
```

Added in v2.0.0

# equality

## isEqual

Compares two Data values for equality

**Signature**

```ts
export declare const isEqual: (a: Data, b: Data) => boolean;
```

**Example**

```ts
import { Data } from "@evolution-sdk/experimental";

Data.isEqual(Data.mkInt(1n), Data.mkInt(1n)); // true
Data.isEqual(Data.mkInt(1n), Data.mkInt(2n)); // false
Data.isEqual(Data.mkByte("01"), Data.mkByte("01")); // true
Data.isEqual(Data.mkByte("cafe"), Data.mkByte("cafe01")); // false
Data.isEqual(Data.mkList([Data.mkInt(1n)]), Data.mkList([Data.mkInt(1n)])); // true
Data.isEqual(Data.mkList([Data.mkInt(1n)]), Data.mkList([Data.mkInt(2n)])); // false
Data.isEqual(
  Data.mkMap([{ k: Data.mkByte("deadbeef"), v: Data.mkInt(1n) }]),
  Data.mkMap([{ k: Data.mkByte("deadbeef"), v: Data.mkInt(1n) }]),
); // true
Data.isEqual(
  Data.mkMap([{ k: Data.mkByte("cafe"), v: Data.mkInt(1n) }]),
  Data.mkMap([{ k: Data.mkByte("deadbeef"), v: Data.mkInt(2n) }]),
); // false
Data.isEqual(
  Data.mkConstr(0n, [Data.mkInt(1n)]),
  Data.mkConstr(0n, [Data.mkInt(1n)]),
); // true
Data.isEqual(
  Data.mkConstr(0n, [Data.mkInt(1n)]),
  Data.mkConstr(1n, [Data.mkInt(2n)]),
); // false
```

Added in v2.0.0

# generators

## genByteArray

Creates an arbitrary that generates Data.ByteArray values

**Signature**

```ts
export declare const genByteArray: () => FastCheck.Arbitrary<ByteArray>;
```

Added in v2.0.0

## genConstr

Creates an arbitrary that generates Data.Constr values

**Signature**

```ts
export declare const genConstr: (depth: number) => FastCheck.Arbitrary<Constr>;
```

Added in v2.0.0

## genData

Creates an arbitrary that generates Data.Data values with controlled depth

**Signature**

```ts
export declare const genData: (depth?: number) => FastCheck.Arbitrary<Data>;
```

**Example**

```ts
import { Data } from "@evolution-sdk/experimental";
import { FastCheck } from "effect";

const data = Data.genData(3);
const sample = FastCheck.sample(data);
```

Added in v2.0.0

## genInteger

Creates an arbitrary that generates Data.Integer values

**Signature**

```ts
export declare const genInteger: () => FastCheck.Arbitrary<Integer>;
```

Added in v2.0.0

## genList

Creates an arbitrary that generates Data.List values

**Signature**

```ts
export declare const genList: (depth: number) => FastCheck.Arbitrary<List>;
```

Added in v2.0.0

## genMap

Creates an arbitrary that generates Data.Map values with unique keys
Following the Plutus distribution of key types:

- 60% ByteArray keys
- 30% Integer keys
- 10% Complex keys

**Signature**

```ts
export declare const genMap: (depth: number) => FastCheck.Arbitrary<Map>;
```

**Example**

```ts
import { Data } from "@evolution-sdk/experimental";
import { FastCheck } from "effect";

const mapArb = Data.genMap(2);
const sample = FastCheck.sample(mapArb);
```

Added in v2.0.0

# model

## ByteArray (interface)

ByteArray data type for Plutus Data

**Signature**

```ts
export interface ByteArray<T extends string = string> {
  readonly _tag: "ByteArray";
  readonly bytearray: T;
}
```

Added in v2.0.0

## Constr (interface)

Constructor data type for Plutus Data

**Signature**

```ts
export interface Constr<
  T extends bigint = bigint,
  U extends readonly Data[] = readonly Data[],
> {
  readonly _tag: "Constr";
  readonly index: T;
  readonly fields: U;
}
```

Added in v2.0.0

## Data (type alias)

Data type representing Plutus data for encoding/decoding

**Signature**

```ts
export type Data = Integer | ByteArray | List | Map | Constr;
```

Added in v2.0.0

## Integer (interface)

Integer data type for Plutus Data

**Signature**

```ts
export interface Integer<T extends bigint = bigint> {
  readonly _tag: "Integer";
  readonly integer: T;
}
```

Added in v2.0.0

## List (interface)

List data type for Plutus Data

**Signature**

```ts
export interface List<T extends Data = Data> {
  readonly _tag: "List";
  readonly list: readonly T[];
}
```

Added in v2.0.0

## Map (interface)

Map data type for Plutus Data

**Signature**

```ts
export interface Map<
  Pairs extends ReadonlyArray<{ k: Data; v: Data }> = ReadonlyArray<{
    k: Data;
    v: Data;
  }>,
> {
  readonly _tag: "Map";
  readonly entries: Pairs;
}
```

Added in v2.0.0

# ordering

## compare

Compares two Data values according to CBOR canonical ordering rules

**Signature**

```ts
export declare const compare: (a: Data, b: Data) => number;
```

**Example**

```ts
import { Data } from "@evolution-sdk/experimental";
import assert from "assert";

Data.compare(Data.mkInt(1n), Data.mkInt(2n)); // -1
Data.compare(Data.mkInt(2n), Data.mkInt(2n)); // 0
assert(Data.compare(Data.mkByte("cafe"), Data.mkByte("deadbeef")) === -1); // -1
```

Added in v2.0.0

## sort

Sorts a Data value in canonical order

**Signature**

```ts
export declare const sort: (data: Data) => Data;
```

**Example**

```ts
import { Data } from "@evolution-sdk/experimental";

const data = Data.mkMap([
  { k: Data.mkByte("cafe"), v: Data.mkInt(2n) },
  { k: Data.mkByte("deadbeef"), v: Data.mkInt(1n) },
]);

const sortedData = Data.sort(data);
```

Added in v2.0.0

# predicates

## isByteArray

Type guard to check if a value is a Data.Integer

**Signature**

```ts
export declare const isByteArray: (
  u: unknown,
  overrideOptions?: SchemaAST.ParseOptions | number,
) => u is { readonly _tag: "ByteArray"; readonly bytearray: string };
```

**Example**

```ts
import { Data } from "@evolution-sdk/experimental";

const value = Data.mkByte("deadbeef");
const isByte = Data.isByteArray(value); // true
```

Added in v2.0.0

## isConstr

Type guard to check if a value is a Data.Constr

**Signature**

```ts
export declare const isConstr: (
  u: unknown,
  overrideOptions?: SchemaAST.ParseOptions | number,
) => u is {
  readonly index: bigint;
  readonly fields: readonly Data[];
  readonly _tag: "Constr";
};
```

**Example**

```ts
import { Data } from "@evolution-sdk/experimental";

const value = Data.mkConstr(0n, [Data.mkInt(1n), Data.mkInt(2n)]);
const isConstr = Data.isConstr(value); // true
```

Added in v2.0.0

## isInteger

Type guard to check if a value is a Data.Integer

**Signature**

```ts
export declare const isInteger: (
  u: unknown,
  overrideOptions?: SchemaAST.ParseOptions | number,
) => u is { readonly _tag: "Integer"; readonly integer: bigint };
```

**Example**

```ts
import { Data } from "@evolution-sdk/experimental";

const value = Data.mkInt(42n);
const isInteger = Data.isInteger(value); // true
```

Added in v2.0.0

## isList

Type guard to check if a value is a Data.List

**Signature**

```ts
export declare const isList: (
  u: unknown,
  overrideOptions?: SchemaAST.ParseOptions | number,
) => u is { readonly _tag: "List"; readonly list: readonly Data[] };
```

**Example**

```ts
import { Data } from "@evolution-sdk/experimental";

const value = Data.mkList([Data.mkInt(1n), Data.mkInt(2n)]);
const isList = Data.isList(value); // true
```

Added in v2.0.0

## isMap

Type guard to check if a value is a Data.Map

**Signature**

```ts
export declare const isMap: (
  u: unknown,
  overrideOptions?: SchemaAST.ParseOptions | number,
) => u is {
  readonly _tag: "Map";
  readonly entries: readonly { readonly k: Data; readonly v: Data }[];
};
```

**Example**

```ts
import { Data } from "@evolution-sdk/experimental";

const value = Data.mkMap([
  { k: Data.mkByte("cafe01"), v: Data.mkInt(1n) },
  { k: Data.mkByte("cafe02"), v: Data.mkInt(2n) },
]);
const isMap = Data.isMap(value); // true
```

Added in v2.0.0

# schemas

## ByteArray

Schema for the ByteArray data type

**Signature**

```ts
export declare const ByteArray: ByteArray$;
```

Added in v2.0.0

## ByteArray$ (interface)

Schema for ByteArray data type

**Signature**

```ts
export interface ByteArray$
  extends Schema.Struct<
    {
      _tag: Schema.tag<"ByteArray">;
    } & {
      bytearray: Schema.filter<Schema.Schema<string, string, never>>;
    }
  > {}
```

Added in v2.0.0

## Constr

Schema for the Constr data type

**Signature**

```ts
export declare const Constr: Constr$;
```

Added in v2.0.0

## Constr$ (interface)

Schema for Constr data type

**Signature**

```ts
export interface Constr$
  extends Schema.Struct<
    {
      _tag: Schema.tag<"Constr">;
    } & {
      index: Schema.filter<typeof Schema.BigIntFromSelf>;
      fields: Schema.Array$<Schema.suspend<Data, Data, never>>;
    }
  > {}
```

Added in v2.0.0

## Data

Combined schema for Data type

**Signature**

```ts
export declare const Data: Schema.Schema<Data, Data, never>;
```

Added in v2.0.0

## Integer

Schema for the Integer data type

**Signature**

```ts
export declare const Integer: Integer$;
```

Added in v2.0.0

## Integer$ (interface)

Schema for Integer data type

**Signature**

```ts
export interface Integer$
  extends Schema.Struct<
    {
      _tag: Schema.tag<"Integer">;
    } & {
      integer: typeof Schema.BigIntFromSelf;
    }
  > {}
```

Added in v2.0.0

## List

Schema for the List data type

**Signature**

```ts
export declare const List: List$;
```

Added in v2.0.0

## List$ (interface)

Schema for List data type

**Signature**

```ts
export interface List$
  extends Schema.Struct<
    {
      _tag: Schema.tag<"List">;
    } & {
      list: Schema.Array$<Schema.suspend<Data, Data, never>>;
    }
  > {}
```

Added in v2.0.0

## Map

Schema for the Map data type

**Signature**

```ts
export declare const Map: Map$;
```

Added in v2.0.0

## Map$ (interface)

Schema for Map data type

**Signature**

```ts
export interface Map$
  extends Schema.Struct<
    {
      _tag: Schema.tag<"Map">;
    } & {
      entries: Schema.refine<
        readonly {
          readonly k: Data;
          readonly v: Data;
        }[],
        Schema.Array$<
          Schema.Struct<{
            k: Schema.Schema<Data>;
            v: Schema.Schema<Data>;
          }>
        >
      >;
    }
  > {}
```

Added in v2.0.0

# transformation

## fromJSONOrThrow

Parses a JSON string to a Data value

**Signature**

```ts
export declare const fromJSONOrThrow: (json: string) => Data;
```

**Example**

```ts
import { Data } from "@evolution-sdk/experimental";
```

Added in v2.0.0

## resolveCBOROrThrow

Resolves a CBOR hex string to a Plutus Data structure

**Signature**

```ts
export declare const resolveCBOROrThrow: (input: string) => Data;
```

Added in v2.0.0

## toJSON

Converts a Data value to a JSON string

**Signature**

```ts
export declare const toJSON: (data: Data) => string;
```

**Example**

```ts
import { Data } from "@evolution-sdk/experimental";

const data = Data.mkInt(42n);
const json = Data.toJSON(data);
// '{"_tag":"Integer","integer":"42n"}'
```

Added in v2.0.0

# utilities

## uniqueByFirst

Filter to ensure uniqueness by first item in entries

**Signature**

```ts
export declare const uniqueByFirst: (
  schema: Schema.Struct<{ k: Schema.Schema<Data>; v: Schema.Schema<Data> }>,
) => Schema.filter<
  Schema.Array$<
    Schema.Struct<{ k: Schema.Schema<Data>; v: Schema.Schema<Data> }>
  >
>;
```

Added in v2.0.0

# utils

## decodeCBOR

**Signature**

```ts
export declare const decodeCBOR: <Source, Target extends Data>(
  input: string,
  schema?: Schema.Schema<Source, Target, never> | undefined,
) => Effect.Effect<
  | { readonly _tag: "List"; readonly list: readonly Data[] }
  | { readonly _tag: "Integer"; readonly integer: bigint }
  | { readonly _tag: "ByteArray"; readonly bytearray: string }
  | {
      readonly _tag: "Map";
      readonly entries: readonly { readonly k: Data; readonly v: Data }[];
    }
  | {
      readonly index: bigint;
      readonly fields: readonly Data[];
      readonly _tag: "Constr";
    }
  | Source,
  [
    | YieldWrap<
        Effect.Effect<
          | { readonly _tag: "List"; readonly list: readonly Data[] }
          | { readonly _tag: "Integer"; readonly integer: bigint }
          | { readonly _tag: "ByteArray"; readonly bytearray: string }
          | {
              readonly _tag: "Map";
              readonly entries: readonly {
                readonly k: Data;
                readonly v: Data;
              }[];
            }
          | {
              readonly index: bigint;
              readonly fields: readonly Data[];
              readonly _tag: "Constr";
            },
          CML.PlutusData.PlutusDataError,
          never
        >
      >
    | YieldWrap<Effect.Effect<Source, ParseError, never>>,
  ] extends [never]
    ? never
    : [
          | YieldWrap<
              Effect.Effect<
                | { readonly _tag: "List"; readonly list: readonly Data[] }
                | { readonly _tag: "Integer"; readonly integer: bigint }
                | { readonly _tag: "ByteArray"; readonly bytearray: string }
                | {
                    readonly _tag: "Map";
                    readonly entries: readonly {
                      readonly k: Data;
                      readonly v: Data;
                    }[];
                  }
                | {
                    readonly index: bigint;
                    readonly fields: readonly Data[];
                    readonly _tag: "Constr";
                  },
                CML.PlutusData.PlutusDataError,
                never
              >
            >
          | YieldWrap<Effect.Effect<Source, ParseError, never>>,
        ] extends [YieldWrap<Effect.Effect<infer _A, infer E, infer _R>>]
      ? E
      : never,
  [
    | YieldWrap<
        Effect.Effect<
          | { readonly _tag: "List"; readonly list: readonly Data[] }
          | { readonly _tag: "Integer"; readonly integer: bigint }
          | { readonly _tag: "ByteArray"; readonly bytearray: string }
          | {
              readonly _tag: "Map";
              readonly entries: readonly {
                readonly k: Data;
                readonly v: Data;
              }[];
            }
          | {
              readonly index: bigint;
              readonly fields: readonly Data[];
              readonly _tag: "Constr";
            },
          CML.PlutusData.PlutusDataError,
          never
        >
      >
    | YieldWrap<Effect.Effect<Source, ParseError, never>>,
  ] extends [never]
    ? never
    : [
          | YieldWrap<
              Effect.Effect<
                | { readonly _tag: "List"; readonly list: readonly Data[] }
                | { readonly _tag: "Integer"; readonly integer: bigint }
                | { readonly _tag: "ByteArray"; readonly bytearray: string }
                | {
                    readonly _tag: "Map";
                    readonly entries: readonly {
                      readonly k: Data;
                      readonly v: Data;
                    }[];
                  }
                | {
                    readonly index: bigint;
                    readonly fields: readonly Data[];
                    readonly _tag: "Constr";
                  },
                CML.PlutusData.PlutusDataError,
                never
              >
            >
          | YieldWrap<Effect.Effect<Source, ParseError, never>>,
        ] extends [YieldWrap<Effect.Effect<infer _A, infer _E, infer R>>]
      ? R
      : never
>;
```

## decodeData

**Signature**

```ts
export declare const decodeData: <Source, Target extends Data>(
  input: unknown,
  schema: Schema.Schema<Source, Target, never>,
  options?: SchemaAST.ParseOptions | undefined,
) => Effect.Effect<
  Source,
  [YieldWrap<Effect.Effect<Source, ParseError, never>>] extends [never]
    ? never
    : [YieldWrap<Effect.Effect<Source, ParseError, never>>] extends [
          YieldWrap<Effect.Effect<infer _A, infer E, infer _R>>,
        ]
      ? E
      : never,
  [YieldWrap<Effect.Effect<Source, ParseError, never>>] extends [never]
    ? never
    : [YieldWrap<Effect.Effect<Source, ParseError, never>>] extends [
          YieldWrap<Effect.Effect<infer _A, infer _E, infer R>>,
        ]
      ? R
      : never
>;
```

## encodeCBOR

**Signature**

```ts
export declare const encodeCBOR: <Source, Target extends Data>(
  input: unknown,
  schema?: Schema.Schema<Source, Target, never> | undefined,
  options?:
    | { canonical?: boolean; parseOptions?: SchemaAST.ParseOptions }
    | undefined,
) => Effect.Effect<
  string,
  [YieldWrap<Effect.Effect<Data, ParseError, never>>] extends [never]
    ? never
    : [YieldWrap<Effect.Effect<Data, ParseError, never>>] extends [
          YieldWrap<Effect.Effect<infer _A, infer E, infer _R>>,
        ]
      ? E
      : never,
  [YieldWrap<Effect.Effect<Data, ParseError, never>>] extends [never]
    ? never
    : [YieldWrap<Effect.Effect<Data, ParseError, never>>] extends [
          YieldWrap<Effect.Effect<infer _A, infer _E, infer R>>,
        ]
      ? R
      : never
>;
```

## encodeData

**Signature**

```ts
export declare const encodeData: <Source, Target extends Data>(
  input: unknown,
  schema: Schema.Schema<Source, Target, never>,
  options?: SchemaAST.ParseOptions | undefined,
) => Effect.Effect<
  Target,
  [YieldWrap<Effect.Effect<Target, ParseError, never>>] extends [never]
    ? never
    : [YieldWrap<Effect.Effect<Target, ParseError, never>>] extends [
          YieldWrap<Effect.Effect<infer _A, infer E, infer _R>>,
        ]
      ? E
      : never,
  [YieldWrap<Effect.Effect<Target, ParseError, never>>] extends [never]
    ? never
    : [YieldWrap<Effect.Effect<Target, ParseError, never>>] extends [
          YieldWrap<Effect.Effect<infer _A, infer _E, infer R>>,
        ]
      ? R
      : never
>;
```

## resolveCBOR

**Signature**

```ts
export declare const resolveCBOR: (input: string) => Effect.Effect<
  | { readonly _tag: "List"; readonly list: readonly Data[] }
  | { readonly _tag: "Integer"; readonly integer: bigint }
  | { readonly _tag: "ByteArray"; readonly bytearray: string }
  | {
      readonly _tag: "Map";
      readonly entries: readonly { readonly k: Data; readonly v: Data }[];
    }
  | {
      readonly index: bigint;
      readonly fields: readonly Data[];
      readonly _tag: "Constr";
    },
  [
    YieldWrap<Effect.Effect<PlutusData, CML.PlutusData.PlutusDataError, never>>,
  ] extends [never]
    ? never
    : [
          YieldWrap<
            Effect.Effect<PlutusData, CML.PlutusData.PlutusDataError, never>
          >,
        ] extends [YieldWrap<Effect.Effect<infer _A, infer E, infer _R>>]
      ? E
      : never,
  [
    YieldWrap<Effect.Effect<PlutusData, CML.PlutusData.PlutusDataError, never>>,
  ] extends [never]
    ? never
    : [
          YieldWrap<
            Effect.Effect<PlutusData, CML.PlutusData.PlutusDataError, never>
          >,
        ] extends [YieldWrap<Effect.Effect<infer _A, infer _E, infer R>>]
      ? R
      : never
>;
```
