import {
  Array as _Array,
  Arbitrary,
  Effect,
  Either,
  FastCheck,
  Schema,
  SchemaAST,
} from "effect";
import * as Bytes from "./Bytes.js";
import * as CML from "./CML/index.js";
import { ParseError } from "effect/ParseResult";
import * as Combinator from "./Combinator.js";

/**
 * Data type representing Plutus data for encoding/decoding
 *
 * @category model
 *
 * @since 2.0.0
 */
export type Data = Integer | ByteArray | List | Map | Constr;

/**
 * List data type for Plutus Data
 *
 * @category model
 *
 * @since 2.0.0
 */
export interface List<T extends Data = Data> {
  readonly _tag: "List";
  readonly list: readonly T[];
}

/**
 * Map data type for Plutus Data
 *
 * @category model
 *
 * @since 2.0.0
 */
export interface Map<
  Pairs extends ReadonlyArray<{ k: Data; v: Data }> = ReadonlyArray<{
    k: Data;
    v: Data;
  }>,
> {
  readonly _tag: "Map";
  readonly entries: Pairs;
}

/**
 * Constructor data type for Plutus Data
 *
 * @category model
 *
 * @since 2.0.0
 */
export interface Constr<
  T extends bigint = bigint,
  U extends readonly Data[] = readonly Data[],
> {
  readonly _tag: "Constr";
  readonly index: T;
  readonly fields: U;
}

/**
 * Integer data type for Plutus Data
 *
 * @category model
 *
 * @since 2.0.0
 */
export interface Integer<T extends bigint = bigint> {
  readonly _tag: "Integer";
  readonly integer: T;
}

/**
 * ByteArray data type for Plutus Data
 *
 * @category model
 *
 * @since 2.0.0
 */
export interface ByteArray<T extends string = string> {
  readonly _tag: "ByteArray";
  readonly bytearray: T;
}

/**
 * Schema for Integer data type
 *
 * @category schemas
 *
 * @since 2.0.0
 */
export interface Integer$
  extends Schema.Struct<
    {
      _tag: Schema.tag<"Integer">;
    } & {
      integer: typeof Schema.BigIntFromSelf;
    }
  > {}

/**
 * Schema for the Integer data type
 *
 * @category schemas
 *
 * @since 2.0.0
 */
export const Integer: Integer$ = Schema.TaggedStruct("Integer", {
  integer: Schema.BigIntFromSelf,
}).annotations({
  identifier: "Integer",
});

/**
 * Schema for ByteArray data type
 *
 * @category schemas
 *
 * @since 2.0.0
 */
export interface ByteArray$
  extends Schema.Struct<
    {
      _tag: Schema.tag<"ByteArray">;
    } & {
      bytearray: Schema.filter<Schema.Schema<string, string, never>>;
    }
  > {}

/**
 * Schema for the ByteArray data type
 *
 * @category schemas
 *
 * @since 2.0.0
 */
export const ByteArray: ByteArray$ = Schema.TaggedStruct("ByteArray", {
  bytearray: Combinator.HexStringSchema,
}).annotations({
  identifier: "ByteArray",
});

/**
 * Schema for List data type
 *
 * @category schemas
 *
 * @since 2.0.0
 */
export interface List$
  extends Schema.Struct<
    {
      _tag: Schema.tag<"List">;
    } & {
      list: Schema.Array$<Schema.suspend<Data, Data, never>>;
    }
  > {}

/**
 * Schema for the List data type
 *
 * @category schemas
 *
 * @since 2.0.0
 */
export const List: List$ = Schema.TaggedStruct("List", {
  list: Schema.Array(
    Schema.suspend((): Schema.Schema<Data> => Data),
  ).annotations({
    arbitrary: () => (fc) => fc.array(Arbitrary.make(Data), { maxLength: 3 }),
  }),
}).annotations({
  identifier: "List",
});

/**
 * Filter to ensure uniqueness by first item in entries
 *
 * @category utilities
 *
 * @since 2.0.0
 */
export const uniqueByFirst = (
  schema: Schema.Struct<{
    k: Schema.Schema<Data>;
    v: Schema.Schema<Data>;
  }>,
) => {
  return Schema.Array(schema).pipe(
    Schema.filter(
      (tuples) =>
        tuples.length ===
        _Array.dedupeWith(tuples, (a, b) => isEqual(a.k, b.k)).length,
    ),
  );
};

/**
 * Schema for Map data type
 *
 * @category schemas
 *
 * @since 2.0.0
 */
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

/**
 * Schema for the Map data type
 *
 * @category schemas
 *
 * @since 2.0.0
 */
export const Map: Map$ = Schema.TaggedStruct("Map", {
  entries: uniqueByFirst(
    Schema.Struct({
      k: Schema.suspend((): Schema.Schema<Data> => Data),
      v: Schema.suspend((): Schema.Schema<Data> => Data),
    }),
  ).annotations({
    identifier: "Unique Entries",
  }),
}).annotations({
  identifier: "Map",
});

/**
 * Schema for Constr data type
 *
 * @category schemas
 *
 * @since 2.0.0
 */
export interface Constr$
  extends Schema.Struct<
    {
      _tag: Schema.tag<"Constr">;
    } & {
      index: Schema.filter<typeof Schema.BigIntFromSelf>;
      fields: Schema.Array$<Schema.suspend<Data, Data, never>>;
    }
  > {}

/**
 * Schema for the Constr data type
 *
 * @category schemas
 *
 * @since 2.0.0
 */
export const Constr: Constr$ = Schema.TaggedStruct("Constr", {
  index: Schema.BigIntFromSelf.pipe(Schema.betweenBigInt(0n, 2n ** 64n - 1n)),
  fields: Schema.Array(
    Schema.suspend((): Schema.Schema<Data> => Data),
  ).annotations({
    arbitrary: () => (fc) => fc.array(Arbitrary.make(Data), { maxLength: 3 }),
  }),
}).annotations({
  identifier: "Constr",
});

/**
 * Combined schema for Data type
 *
 * @category schemas
 *
 * @since 2.0.0
 */
export const Data: Schema.Schema<Data> = Schema.Union(
  Integer,
  ByteArray,
  List,
  Map,
  Constr,
);

/**
 * Type guard to check if a value is a Data.Integer
 *
 * @category predicates
 *
 * @example
 * import { Data } from "@evolution-sdk/experimental";
 *
 * const value = Data.mkByte("deadbeef");
 * const isByte = Data.isByteArray(value); // true
 *
 * @since 2.0.0
 */
export const isByteArray = Schema.is(ByteArray);

/**
 * Type guard to check if a value is a Data.Integer
 *
 * @category predicates
 *
 * @example
 * import { Data } from "@evolution-sdk/experimental";
 *
 * const value = Data.mkInt(42n);
 * const isInteger = Data.isInteger(value); // true
 *
 * @since 2.0.0
 */
export const isInteger = Schema.is(Integer);

/**
 * Type guard to check if a value is a Data.List
 *
 * @category predicates
 *
 * @example
 * import { Data } from "@evolution-sdk/experimental";
 *
 * const value = Data.mkList([Data.mkInt(1n), Data.mkInt(2n)]);
 * const isList = Data.isList(value); // true
 *
 * @since 2.0.0
 */
export const isList = Schema.is(List);

/**
 * Type guard to check if a value is a Data.Map
 *
 * @category predicates
 *
 * @example
 * import { Data } from "@evolution-sdk/experimental";
 *
 * const value = Data.mkMap([
 *   { k: Data.mkByte("cafe01"), v: Data.mkInt(1n) },
 *   { k: Data.mkByte("cafe02"), v: Data.mkInt(2n) }
 * ]);
 * const isMap = Data.isMap(value); // true
 *
 * @since 2.0.0
 */
export const isMap = Schema.is(Map);

/**
 * Type guard to check if a value is a Data.Constr
 *
 * @category predicates
 *
 * @example
 * import { Data } from "@evolution-sdk/experimental";
 *
 * const value = Data.mkConstr(0n, [Data.mkInt(1n), Data.mkInt(2n)]);
 * const isConstr = Data.isConstr(value); // true
 *
 * @since 2.0.0
 */
export const isConstr = Schema.is(Constr);

/**
 * Converts TypeScript data into CBOR hex string
 *
 * @category encoding/decoding
 *
 * @example
 * import { Data, TSchema } from "@evolution-sdk/experimental"
 *
 * const Token = TSchema.Struct({
 *  policyId: TSchema.ByteArray,
 *  assetName: TSchema.ByteArray,
 *  amount: TSchema.Integer
 * })
 *
 * const token = {
 *   policyId: "deadbeef",
 *   assetName: "cafe",
 *   amount: 1000n
 * }
 *
 * // Convert to canonical CBOR
 * const cbor = Data.encodeCBOROrThrow(token, Token, { canonical: true })
 *
 * @since 2.0.0
 */
export const encodeCBOROrThrow = <Source, Target extends Data>(
  input: unknown,
  schema?: Schema.Schema<Source, Target>,
  options: {
    canonical?: boolean;
    parseOptions?: SchemaAST.ParseOptions;
  } = {},
): string => {
  const { canonical = false } = options;
  const data: Data = schema
    ? encodeDataOrThrow(input, schema, options.parseOptions)
    : encodeDataOrThrow(input, Data);
  const cmlPlutusData = toCMLPlutusData(data);
  return canonical
    ? cmlPlutusData.to_canonical_cbor_hex()
    : cmlPlutusData.to_cardano_node_format().to_cbor_hex();
};

export const encodeCBOR = Effect.fn(function* <Source, Target extends Data>(
  input: unknown,
  schema?: Schema.Schema<Source, Target>,
  options: {
    canonical?: boolean;
    parseOptions?: SchemaAST.ParseOptions;
  } = {},
) {
  const { canonical = false } = options;
  const data: Data = schema
    ? yield* encodeData(input, schema, options.parseOptions)
    : yield* encodeData(input, Data);
  const cmlPlutusData = toCMLPlutusData(data);
  return canonical
    ? cmlPlutusData.to_canonical_cbor_hex()
    : cmlPlutusData.to_cardano_node_format().to_cbor_hex();
});

const toCMLPlutusData = (data: Data): CML.PlutusData.PlutusData => {
  switch (data._tag) {
    case "Integer":
      return CML.PlutusData.newIntegerUnsafe(
        CML.BigInteger.fromStrUnsafe(data.integer.toString()),
      );
    case "ByteArray":
      return CML.PlutusData.newBytesUnsafe(
        Bytes.fromHexOrThrow(data.bytearray),
      );
    case "List": {
      const list = CML.PlutusDataList._newUnsafe();
      data.list.forEach((item) => list.add(toCMLPlutusData(item)));
      return CML.PlutusData.newListUnsafe(list);
    }
    case "Map": {
      const map = CML.PlutusMap._newUnsafe();
      data.entries.forEach(({ k, v }) => {
        const plutusKey = toCMLPlutusData(k);
        map.set(plutusKey, toCMLPlutusData(v));
      });
      return CML.PlutusData.newMapUnsafe(map);
    }
    case "Constr": {
      const fields = CML.PlutusDataList._newUnsafe();
      data.fields.forEach((item) => fields.add(toCMLPlutusData(item)));
      return CML.PlutusData.newConstrPlutusDataUnsafe(
        CML.ConstrPlutusData._newUnsafe(data.index, fields),
      );
    }
    default:
      throw new Error(`Unsupported data type: ${(data as any)._tag}`);
  }
};

/**
 * Decodes a CBOR hex string to a TypeScript type
 *
 * @category encoding/decoding
 *
 * @example
 * import { TSchema , Data } from "@evolution-sdk/experimental";
 *
 * const Token = TSchema.Struct({
 *  policyId: TSchema.ByteArray,
 *  assetName: TSchema.ByteArray,
 *  amount: TSchema.Integer
 * })
 *
 * const cbor = "d8799f44deadbeef42cafe1903e8ff"
 *
 * // Decode from CBOR
 * const token = Data.decodeCBOROrThrow(cbor, Token)
 * // { policyId: "deadbeef", assetName: "cafe", amount: 1000n }
 *
 * // Decode without schema
 * const data = Data.decodeCBOROrThrow(cbor)
 * // {
 * //   _tag: 'Constr',
 * //   index: 0n,
 * //   fields: [
 * //     { _tag: 'ByteArray', bytearray: 'deadbeef' },
 * //     { _tag: 'ByteArray', bytearray: 'cafe' },
 * //     { _tag: 'Integer', integer: 1000n }
 * //   ]
 * // }
 *
 * @since 2.0.0
 */
export function decodeCBOROrThrow(input: string): Data;
export function decodeCBOROrThrow<Source, Target extends Data>(
  input: string,
  schema: Schema.Schema<Source, Target>,
): Source;
export function decodeCBOROrThrow<Source, Target extends Data>(
  input: string,
  schema?: Schema.Schema<Source, Target>,
): Source | Data {
  const data = resolveCBOROrThrow(input);
  return schema ? decodeDataOrThrow(data, schema) : data;
}

export const decodeCBOR = Effect.fn(function* <Source, Target extends Data>(
  input: string,
  schema?: Schema.Schema<Source, Target>,
) {
  const data = yield* resolveCBOR(input);
  return schema ? yield* decodeData(data, schema) : data;
});

/**
 * Resolves a CBOR hex string to a Plutus Data structure
 *
 * @category transformation
 *
 * @since 2.0.0
 */
export const resolveCBOROrThrow = (input: string): Data => {
  let data: CML.PlutusData.PlutusData;
  try {
    data = CML.PlutusData.fromCborHexUnsafe(input);
  } catch (error) {
    throw new Error(`Failed to resolve CBOR input: ${input}`);
  }
  switch (data.kind()) {
    case CML.PlutusDataKind.Integer:
      return Integer.make({ integer: BigInt(data.as_integer()!.to_str()) });
    case CML.PlutusDataKind.Bytes:
      return ByteArray.make({
        bytearray: Bytes.toHexOrThrow!(data.as_bytes()!),
      });
    case CML.PlutusDataKind.List: {
      const list = data.as_list()!;
      const array = [];
      for (let i = 0; i < list.len(); i++) {
        array.push(resolveCBOROrThrow(list.get(i).to_cbor_hex()));
      }
      return List.make({ list: array });
    }
    case CML.PlutusDataKind.Map: {
      const plutusMap = data.as_map()!;
      const tuples: { k: Data; v: Data }[] = [];
      const keys = plutusMap.keys();
      for (let i = 0; i < keys.len(); i++) {
        const k = resolveCBOROrThrow(keys.get(i).to_cbor_hex());
        const v = resolveCBOROrThrow(plutusMap.get(keys.get(i))!.to_cbor_hex());
        tuples.push({ k, v });
      }
      return Map.make({ entries: tuples });
    }
    case CML.PlutusDataKind.ConstrPlutusData: {
      const constrData = data.as_constr_plutus_data()!;
      const fields = [];
      const list = constrData.fields();
      for (let i = 0; i < list.len(); i++) {
        fields.push(resolveCBOROrThrow(list.get(i).to_cbor_hex()));
      }
      return Constr.make({
        index: BigInt(constrData.alternative()),
        fields,
      });
    }
    default:
      throw new Error(`Unsupported type: ${data.kind()}`);
  }
};

export const resolveCBOR = Effect.fn(function* (input: string) {
  let data: CML.PlutusData.PlutusData;
  data = yield* CML.PlutusData.fromCborHex(input);
  switch (data.kind()) {
    case CML.PlutusDataKind.Integer:
      return Integer.make(
        { integer: BigInt(data.as_integer()!.to_str()) },
        { disableValidation: true },
      );
    case CML.PlutusDataKind.Bytes:
      return ByteArray.make(
        {
          bytearray: Bytes.toHexOrThrow!(data.as_bytes()!),
        },
        { disableValidation: true },
      );
    case CML.PlutusDataKind.List: {
      const list = data.as_list()!;
      const array = [];
      for (let i = 0; i < list.len(); i++) {
        array.push(resolveCBOROrThrow(list.get(i).to_cbor_hex()));
      }
      return List.make({ list: array }, { disableValidation: true });
    }
    case CML.PlutusDataKind.Map: {
      const plutusMap = data.as_map()!;
      const tuples: { k: Data; v: Data }[] = [];
      const keys = plutusMap.keys();
      for (let i = 0; i < keys.len(); i++) {
        const k = resolveCBOROrThrow(keys.get(i).to_cbor_hex());
        const v = resolveCBOROrThrow(plutusMap.get(keys.get(i))!.to_cbor_hex());
        tuples.push({ k, v });
      }
      return Map.make({ entries: tuples }, { disableValidation: true });
    }
    case CML.PlutusDataKind.ConstrPlutusData: {
      const constrData = data.as_constr_plutus_data()!;
      const fields = [];
      const list = constrData.fields();
      for (let i = 0; i < list.len(); i++) {
        fields.push(resolveCBOROrThrow(list.get(i).to_cbor_hex()));
      }
      return Constr.make(
        {
          index: BigInt(constrData.alternative()),
          fields,
        },
        { disableValidation: true },
      );
    }
  }
});

/**
 * Decodes an unknown value from Plutus Data Constructor to a TypeScript type
 *
 * @throws {ParseError} If the input value does not match the schema
 *
 * @category encoding/decoding
 *
 * @example
 * import { Data, TSchema } from "@evolution-sdk/experimental";
 *
 * const Token = TSchema.Struct({
 *   policyId: TSchema.ByteArray,
 *   assetName: TSchema.ByteArray,
 *   amount: TSchema.Integer
 * });
 *
 * const plutusData = Data.mkConstr(0n, [
 *   Data.mkByte("deadbeef"),
 *   Data.mkByte("cafe"),
 *   Data.mkInt(1000n)
 * ]);
 *
 * const token = Data.decodeDataOrThrow(plutusData, Token);
 * // { policyId: "deadbeef", assetName: "cafe", amount: 1000n }
 *
 * @since 2.0.0
 */
export const decodeDataOrThrow = <Source, Target extends Data>(
  input: unknown,
  schema: Schema.Schema<Source, Target>,
  options: SchemaAST.ParseOptions = {},
): Source => Schema.decodeUnknownSync(schema, options)(input);

export const decodeData = Effect.fn(function* <Source, Target extends Data>(
  input: unknown,
  schema: Schema.Schema<Source, Target>,
  options: SchemaAST.ParseOptions = {},
) {
  return yield* Schema.decodeUnknown(schema, options)(input);
});

/**
 * Safely decodes data using Either for error handling
 *
 * @category encoding/decoding
 *
 * @since 2.0.0
 */
export const decodeDataEither = <Source, Target extends Data>(
  input: unknown,
  schema: Schema.Schema<Source, Target>,
  options: SchemaAST.ParseOptions = {},
): Either.Either<Source, ParseError> =>
  Schema.decodeUnknownEither(schema, options)(input);

/**
 * Encodes a TypeScript value to Plutus Data Constructor
 *
 * @throws {ParseError} If the input value does not match the schema
 *
 * @category encoding/decoding
 *
 * @example
 * import { Data , TSchema } from "@evolution-sdk/experimental";
 *
 * const token : unknown = {
 *   policyId: "deadbeef",
 *   assetName: "cafe",
 *   amount: 1000n
 * };
 *
 * const Token = TSchema.Struct({
 *   policyId: TSchema.ByteArray,
 *   assetName: TSchema.ByteArray,
 *   amount: TSchema.Integer
 * });
 *
 * const data = Data.encodeDataOrThrow(token, Token);
 * // { index: 0n, fields: ["deadbeef", "cafe", 1000n] }
 *
 * @since 2.0.0
 */
export const encodeDataOrThrow = <Source, Target extends Data>(
  input: unknown,
  schema: Schema.Schema<Source, Target>,
  options?: SchemaAST.ParseOptions,
): Target => Schema.encodeUnknownSync(schema, options)(input);

export const encodeData = Effect.fn(function* <Source, Target extends Data>(
  input: unknown,
  schema: Schema.Schema<Source, Target>,
  options?: SchemaAST.ParseOptions,
) {
  return yield* Schema.encodeUnknown(schema, options)(input);
});

/**
 * Safely encodes data using Either for error handling
 *
 * @category encoding/decoding
 *
 * @since 2.0.0
 */
export const encodeDataEither = <Source, Target extends Data>(
  input: unknown,
  schema: Schema.Schema<Source, Target>,
  options?: SchemaAST.ParseOptions,
): Either.Either<Target, ParseError> =>
  Schema.encodeUnknownEither(schema, options)(input);

/**
 * Creates a Plutus Data List type from an array of Data elements
 *
 * @category constructors
 *
 * @example
 * import { Data } from "@evolution-sdk/experimental";
 *
 * // Create a list with multiple elements of the same type
 * const integerList = Data.mkList([
 *   Data.mkInt(42n),
 *   Data.mkInt(100n)
 * ]);
 *
 * // Create a list with a single element
 * const singleList = Data.mkList([Data.mkInt(42n)]);
 *
 * // Create a mixed list with different element types
 * const mixedList = Data.mkList([
 *   Data.mkInt(42n),
 *   Data.mkByte("deadbeef")
 * ]);
 *
 * @since 2.0.0
 */
export const mkList = <const T extends Data>(list: readonly T[]) =>
  List.make({ list }) as List<T>;

/**
 * Creates a Plutus Data Integer type from a bigint value
 *
 * @category constructors
 *
 * @example
 * import { Data } from "@evolution-sdk/experimental";
 *
 * const myInteger = Data.mkInt(42n);
 *
 * @since 2.0.0
 */
export const mkInt = <const T extends bigint = bigint>(integer: T) =>
  Integer.make({ integer }) as Integer<T>;

/**
 * Creates a Plutus Data ByteArray type from a hex string
 *
 * @category constructors
 *
 * @example
 * import { Data } from "@evolution-sdk/experimental";
 *
 * const myByteArray = Data.mkByte("deadbeef");
 *
 * @since 2.0.0
 */
export const mkByte = <const T extends string>(bytearray: T) =>
  ByteArray.make({ bytearray }) as ByteArray<T>;

/**
 * Creates a Plutus Data Map type from an array of key-value tuples
 *
 * @category constructors
 *
 * @example
 * import { Data } from "@evolution-sdk/experimental";
 *
 * const myMap = Data.mkMap([
 *   { k: Data.mkByte("cafe01"), v: Data.mkInt(42n) },
 *   { k: Data.mkByte("deadbeef"), v: Data.mkByte("cafe01") }
 * ]);
 *
 * @since 2.0.0
 */
export const mkMap = <const Pairs extends ReadonlyArray<{ k: Data; v: Data }>>(
  value: Pairs,
) => Map.make({ entries: value }) as Map<Pairs>;

/**
 * Creates a Plutus Data Constr type (constructor) with the given index and fields
 *
 * @category constructors
 *
 * @example
 * import { Data } from "@evolution-sdk/experimental";
 *
 * // Create a constructor for a custom data type (e.g., a "Mint" action with amount)
 * const mint = Data.mkConstr(0n, [Data.mkInt(5n)]);
 *
 * // Create a constructor with no fields (e.g., a "Burn" action)
 * const burn = Data.mkConstr(1n, []);
 *
 * @since 2.0.0
 */
export const mkConstr = <
  const T extends bigint,
  const U extends readonly Data[],
>(
  index: T,
  fields: U,
) => Constr.make({ index, fields }) as Constr<T, U>;

/**
 * JSON replacer function for handling BigInt serialization
 *
 * @category utilities
 *
 * @since 2.0.0
 */
const replacer = (key: string, value: any) => {
  if (typeof value === "bigint") {
    return value.toString() + "n";
  }
  return value;
};

/**
 * JSON reviver function for parsing BigInt values
 *
 * @category utilities
 *
 * @since 2.0.0
 */
const reviver = (key: string, value: any) => {
  if (typeof value === "string" && value.endsWith("n")) {
    return BigInt(value.slice(0, -1));
  }
  return value;
};

/**
 * Converts a Data value to a JSON string
 *
 * @category transformation
 *
 * @example
 * import { Data } from "@evolution-sdk/experimental";
 *
 * const data = Data.mkInt(42n);
 * const json = Data.toJSON(data);
 * // '{"_tag":"Integer","integer":"42n"}'
 *
 * @since 2.0.0
 */
export const toJSON = (data: Data): string => {
  return JSON.stringify(data, replacer, 2);
};

/**
 * Parses a JSON string to a Data value
 *
 * @category transformation
 *
 * @example
 * import { Data } from "@evolution-sdk/experimental";
 *
 * @throws {Error} If the JSON string is invalid or does not match the expected format
 *
 * const json = '{"_tag":"Integer","integer":"42n"}';
 * const data = Data.fromJSON(json);
 * // { _tag: 'Integer', integer: 42n }
 *
 * @since 2.0.0
 */
export const fromJSONOrThrow = (json: string): Data => {
  const parsed = JSON.parse(json, reviver);
  if (parsed._tag === undefined) {
    throw new Error("Invalid data format");
  }
  return parsed;
};

/**
 * Compares two Data values for equality
 *
 * @category equality
 *
 * @example
 * import { Data } from "@evolution-sdk/experimental";
 *
 * Data.isEqual(Data.mkInt(1n), Data.mkInt(1n)); // true
 * Data.isEqual(Data.mkInt(1n), Data.mkInt(2n)); // false
 * Data.isEqual(Data.mkByte("01"), Data.mkByte("01")); // true
 * Data.isEqual(Data.mkByte("cafe"), Data.mkByte("cafe01")); // false
 * Data.isEqual(Data.mkList([Data.mkInt(1n)]), Data.mkList([Data.mkInt(1n)])); // true
 * Data.isEqual(Data.mkList([Data.mkInt(1n)]), Data.mkList([Data.mkInt(2n)])); // false
 * Data.isEqual(Data.mkMap([{ k: Data.mkByte("deadbeef"), v: Data.mkInt(1n) }]), Data.mkMap([{ k: Data.mkByte("deadbeef"), v: Data.mkInt(1n) }])); // true
 * Data.isEqual(Data.mkMap([{ k: Data.mkByte("cafe"), v: Data.mkInt(1n) }]), Data.mkMap([{ k: Data.mkByte("deadbeef"), v: Data.mkInt(2n) }])); // false
 * Data.isEqual(Data.mkConstr(0n, [Data.mkInt(1n)]), Data.mkConstr(0n, [Data.mkInt(1n)])); // true
 * Data.isEqual(Data.mkConstr(0n, [Data.mkInt(1n)]), Data.mkConstr(1n, [Data.mkInt(2n)])); // false
 *
 * @since 2.0.0
 */
export const isEqual = (a: Data, b: Data): boolean => {
  if (a._tag !== b._tag) {
    return false;
  }

  if (a._tag === "Integer" && b._tag === "Integer") {
    return a.integer === b.integer;
  }

  if (a._tag === "ByteArray" && b._tag === "ByteArray") {
    return a.bytearray === b.bytearray;
  }
  if (a._tag === "List" && b._tag === "List") {
    return (
      a.list.length === b.list.length &&
      a.list.every((item, index) => isEqual(item, b.list[index]))
    );
  }
  if (a._tag === "Map" && b._tag === "Map") {
    return (
      a.entries.length === b.entries.length &&
      a.entries.every((a, index) => {
        const { k, v } = b.entries[index];
        return isEqual(k, a.k) && isEqual(v, a.v);
      })
    );
  }
  if (a._tag === "Constr" && b._tag === "Constr") {
    return (
      a.index === b.index &&
      a.fields.length === b.fields.length &&
      a.fields.every((field, index) => isEqual(field, b.fields[index]))
    );
  }
  return false;
};

/**
 * Compares two Data values according to CBOR canonical ordering rules
 *
 * @category ordering
 *
 * @example
 * import { Data } from "@evolution-sdk/experimental";
 * import assert from "assert"
 *
 * Data.compare(Data.mkInt(1n), Data.mkInt(2n)); // -1
 * Data.compare(Data.mkInt(2n), Data.mkInt(2n)); // 0
 * assert(Data.compare(Data.mkByte("cafe"), Data.mkByte("deadbeef")) === -1); // -1
 *
 * @since 2.0.0
 */
export const compare = (a: Data, b: Data): number => {
  // Compare by type first
  const typeOrder = {
    Integer: 3,
    ByteArray: 4,
    List: 2,
    Map: 1,
    Constr: 0,
  } as const;

  if (a._tag !== b._tag) {
    return typeOrder[a._tag] - typeOrder[b._tag];
  }

  // Then compare by value for same types
  if (a._tag === "Integer" && b._tag === "Integer") {
    return a.integer < b.integer ? -1 : a.integer > b.integer ? 1 : 0;
  }

  if (a._tag === "ByteArray" && b._tag === "ByteArray") {
    return a.bytearray < b.bytearray ? -1 : a.bytearray > b.bytearray ? 1 : 0;
  }

  if (a._tag === "List" && b._tag === "List") {
    // Compare list lengths first
    const lengthDiff = a.list.length - b.list.length;
    if (lengthDiff !== 0) {
      return lengthDiff;
    }

    // Compare elements one by one
    for (let i = 0; i < a.list.length; i++) {
      const comparison = compare(a.list[i], b.list[i]);
      if (comparison !== 0) {
        return comparison;
      }
    }
    return 0;
  }

  if (a._tag === "Map" && b._tag === "Map") {
    // Compare map sizes first
    const lengthDiff = a.entries.length - b.entries.length;
    if (lengthDiff !== 0) {
      return lengthDiff;
    }

    // Maps should already be sorted by key, so compare entries in order
    for (let i = 0; i < a.entries.length; i++) {
      // Compare keys first
      const keyComparison = compare(a.entries[i].k, b.entries[i].k);
      if (keyComparison !== 0) {
        return keyComparison;
      }

      // If keys are equal, compare values
      const valueComparison = compare(a.entries[i].v, b.entries[i].v);
      if (valueComparison !== 0) {
        return valueComparison;
      }
    }
    return 0;
  }

  if (a._tag === "Constr" && b._tag === "Constr") {
    // Compare constructor index first
    if (a.index !== b.index) {
      // Safely compare bigint values
      return a.index < b.index ? -1 : 1;
    }

    // Compare field lengths
    const lengthDiff = a.fields.length - b.fields.length;
    if (lengthDiff !== 0) {
      return lengthDiff;
    }

    // Then compare fields one by one
    for (let i = 0; i < a.fields.length; i++) {
      const comparison = compare(a.fields[i], b.fields[i]);
      if (comparison !== 0) {
        return comparison;
      }
    }
    return 0;
  }

  // This should never happen due to exhaustive tag checking above
  return 0;
};

/**
 * Creates an arbitrary that generates Data.Data values with controlled depth
 *
 * @category generators
 *
 * @example
 * import { Data } from "@evolution-sdk/experimental";
 * import { FastCheck } from "effect"
 *
 * const data = Data.genData(3);
 * const sample = FastCheck.sample(data);
 *
 * @since 2.0.0
 */
export const genData = (depth: number = 3): FastCheck.Arbitrary<Data> => {
  if (depth <= 0) {
    // Base cases: Integer or ByteArray
    return FastCheck.oneof(genInteger(), genByteArray());
  }

  // Recursive cases with decreasing depth
  return FastCheck.oneof(
    genInteger(),
    genByteArray(),
    genConstr(depth - 1),
    genList(depth - 1),
    genMap(depth - 1),
  );
};

/**
 * Creates an arbitrary that generates Data.ByteArray values
 *
 * @category generators
 *
 * @since 2.0.0
 */
export const genByteArray = (): FastCheck.Arbitrary<ByteArray> =>
  FastCheck.string({
    minLength: 0,
    maxLength: 64,
  }).map((value) => mkByte(Bytes.fromTextUnsafe(value)));

/**
 * Creates an arbitrary that generates Data.Integer values
 *
 * @category generators
 *
 * @since 2.0.0
 */
export const genInteger = (): FastCheck.Arbitrary<Integer> =>
  FastCheck.bigInt({ min: 0n, max: 64n - 1n }).map((value) => mkInt(value));

/**
 * Creates an arbitrary that generates Data.List values
 *
 * @category generators
 *
 * @since 2.0.0
 */
export const genList = (depth: number): FastCheck.Arbitrary<List> =>
  FastCheck.array(genData(depth), {
    minLength: 0,
    maxLength: 5,
  }).map((value) => mkList(value));

/**
 * Creates an arbitrary that generates Data.Constr values
 *
 * @category generators
 *
 * @since 2.0.0
 */
export const genConstr = (depth: number): FastCheck.Arbitrary<Constr> =>
  FastCheck.tuple(
    FastCheck.bigInt(0n, 2n ** 64n - 1n),
    FastCheck.array(genData(depth), {
      minLength: 0,
      maxLength: 5,
    }),
  ).map(([index, fields]) => mkConstr(index, fields));

/**
 * Creates an arbitrary that generates Data.Map values with unique keys
 * Following the Plutus distribution of key types:
 * - 60% ByteArray keys
 * - 30% Integer keys
 * - 10% Complex keys
 *
 * @category generators
 *
 * @example
 * import { Data } from "@evolution-sdk/experimental";
 * import { FastCheck } from "effect"
 *
 * const mapArb = Data.genMap(2);
 * const sample = FastCheck.sample(mapArb);
 *
 * @since 2.0.0
 */
export const genMap = (depth: number): FastCheck.Arbitrary<Map> => {
  // Helper to create key-value pairs with unique keys
  const uniqueKeyValuePairs = <T extends Data>(
    keyGen: FastCheck.Arbitrary<T>,
    maxSize: number,
  ) =>
    FastCheck.uniqueArray(
      FastCheck.tuple(keyGen, genData(depth > 0 ? depth - 1 : 0)),
      {
        minLength: 0,
        maxLength: maxSize * 2, // Generate more than needed to increase chance of unique keys
        selector: (pair) => {
          const keyStr = toJSON(pair[0]);
          return keyStr;
        },
      },
    ).map((pairs) =>
      pairs.map(([k, v]) => ({ k, v })).sort((a, b) => compare(a.k, b.k)),
    );

  // ByteArray keys (more frequent)
  const byteArrayPairs = uniqueKeyValuePairs(genByteArray(), 3);

  // Integer keys (medium frequency)
  const integerPairs = uniqueKeyValuePairs(genInteger(), 3);

  // Complex keys (less frequent)
  const complexPairs = uniqueKeyValuePairs(
    genData(depth > 1 ? depth - 2 : 0),
    2,
  );

  return FastCheck.oneof(byteArrayPairs, integerPairs, complexPairs).map(
    (pairs) => mkMap(pairs),
  );
};

/**
 * Sorts a Data value in canonical order
 *
 * @category ordering
 *
 * @example
 * import { Data } from "@evolution-sdk/experimental";
 *
 * const data = Data.mkMap([
 *   { k: Data.mkByte("cafe"), v: Data.mkInt(2n) },
 *   { k: Data.mkByte("deadbeef"), v: Data.mkInt(1n) }
 * ]);
 *
 * const sortedData = Data.sort(data);
 *
 * @since 2.0.0
 */
export const sort = (data: Data): Data => {
  switch (data._tag) {
    case "Map": {
      // First recursively sort any nested Data in both keys and values
      const sortedPairs = data.entries.map(({ k, v }) => ({
        k: sort(k),
        v: sort(v),
      }));

      // Then sort the pairs by key
      const sortedMap = [...sortedPairs].sort((a, b) => compare(a.k, b.k));

      return mkMap(sortedMap);
    }
    case "List": {
      // Recursively sort elements in the list
      const sortedElements = data.list.map((item) => sort(item));
      return mkList(sortedElements);
    }
    case "Constr": {
      // Recursively sort fields in the constructor
      const sortedFields = data.fields.map((field) => sort(field));
      return mkConstr(data.index, sortedFields);
    }
    // Integers and ByteArrays don't need sorting
    default:
      return data;
  }
};
