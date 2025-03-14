import { Either, pipe, Schema, SchemaAST } from "effect";
import * as Bytes from "./Core/Bytes.js";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";
import { ParseError } from "effect/ParseResult";

export const HexString = <Source extends string, Target>(
  self: Schema.Schema<Source, Target>
) =>
  pipe(
    self,
    Schema.filter((value) => Bytes.isHex(value), {
      message: (issue) =>
        `Expected a hexadecimal string but got: ${issue.actual}.`,
    })
  );

/**
 * Plutus data types and schemas for serialization/deserialization between
 * TypeScript types and Plutus data format
 *
 * @since 2.0.0
 */
export type Data = Integer | ByteArray | List | Map | Constr;

/**
 * List type with a generic parameter T that specifies the element type
 */
export interface List<T extends Data = Data> {
  readonly _tag: "List";
  readonly array: readonly T[];
}

export interface Map<K extends Data = Data, V extends Data = Data> {
  readonly _tag: "Map";
  readonly entries: ReadonlyArray<readonly [K, V]>;
}

export interface Constr<
  T extends bigint = bigint,
  U extends readonly Data[] = readonly Data[],
> {
  readonly _tag: "Constr";
  readonly index: T;
  readonly fields: U;
}

export interface Integer<T extends bigint = bigint> {
  readonly _tag: "Integer";
  readonly integer: T;
}

export interface ByteArray<T extends string = string> {
  readonly _tag: "ByteArray";
  readonly bytearray: T;
}

export type DataTuple = readonly [Data, Data];

export const Integer = Schema.TaggedStruct("Integer", {
  integer: Schema.BigIntFromSelf,
}).annotations({ schema: "integer" });

export const ByteArray = Schema.TaggedStruct("ByteArray", {
  bytearray: Schema.String.pipe(HexString),
}).annotations({ schema: "ByteArray" });

export const List = Schema.TaggedStruct("List", {
  array: Schema.Array(Schema.suspend((): Schema.Schema<Data> => Data)),
}).annotations({ schema: "List" });

export const Map = Schema.TaggedStruct("Map", {
  entries: Schema.Array(
    Schema.Tuple(
      Schema.suspend((): Schema.Schema<Data> => Data),
      Schema.suspend((): Schema.Schema<Data> => Data)
    )
  ),
}).annotations({ schema: "Map" });

export const Constr = Schema.TaggedStruct("Constr", {
  index: Schema.BigIntFromSelf,
  fields: Schema.Array(Schema.suspend((): Schema.Schema<Data> => Data)),
}).annotations({ schema: "Constr" });

export const Data = Schema.Union(Integer, ByteArray, List, Map, Constr);

export const isByteArray = (data: Data): data is ByteArray =>
  data._tag === "ByteArray";

export const isInteger = (data: Data): data is Integer =>
  data._tag === "Integer";

export const isList = (data: Data): data is List => data._tag === "List";

export const isMap = (data: Data): data is Map => data._tag === "Map";

export const isConstr = (data: Data): data is Constr => data._tag === "Constr";

/**
 * Converts TypeScript data into CBOR hex string
 *
 * @example
 * import { Data, Type } from "@lucid-evolution/experimental"
 *
 * const Token = Type.Struct({
 *   policyId: Type.ByteArray,
 *   assetName: Type.ByteArray,
 *   amount: Type.Integer
 * })
 *
 * const token = {
 *   policyId: "deadbeef",
 *   assetName: "cafe",
 *   amount: 1000n
 * }
 *
 * // Convert to canonical CBOR
 * const cbor = Data.toCBOR(token, Token, { canonical: true })
 *
 * @since 1.0.0
 */
export const toCBOR = <Source, Target extends Data>(
  input: unknown,
  schema?: Schema.Schema<Source, Target>,
  options: {
    canonical?: boolean;
    parseOptions?: SchemaAST.ParseOptions;
  } = {}
): string => {
  const { canonical = false } = options;
  const toCMLPlutusData = (data: Data): CML.PlutusData => {
    switch (data._tag) {
      case "Integer":
        return CML.PlutusData.new_integer(
          CML.BigInteger.from_str(data.integer.toString())
        );
      case "ByteArray":
        return CML.PlutusData.new_bytes(Bytes.fromHex(data.bytearray));
      case "List": {
        const list = CML.PlutusDataList.new();
        data.array.forEach((item) => list.add(toCMLPlutusData(item)));
        return CML.PlutusData.new_list(list);
      }
      case "Map": {
        const map = CML.PlutusMap.new();
        data.entries.forEach(([key, value]) => {
          const plutusKey = toCMLPlutusData(key);
          map.set(plutusKey, toCMLPlutusData(value));
        });
        return CML.PlutusData.new_map(map);
      }
      case "Constr": {
        const fields = CML.PlutusDataList.new();
        data.fields.forEach((item) => fields.add(toCMLPlutusData(item)));
        return CML.PlutusData.new_constr_plutus_data(
          CML.ConstrPlutusData.new(data.index, fields)
        );
      }
      default:
        throw new Error(`Unsupported data type: ${(data as any)._tag}`);
    }
  };

  const data: Data = schema
    ? encodeData(input, schema, options.parseOptions)
    : encodeData(input, Data);
  const cmlPlutusData = toCMLPlutusData(data);
  return canonical
    ? cmlPlutusData.to_canonical_cbor_hex()
    : cmlPlutusData.to_cardano_node_format().to_cbor_hex();
};

/**
 * Decodes a CBOR hex string to a TypeScript type
 *
 * @example
 * import { Data } from "@lucid-evolution/experimental";
 * const data = Data.fromCBOR(cborHexString, schema);
 *
 * @since 1.0.0
 */
export function fromCBOR(input: string): Data;
export function fromCBOR<Source, Target extends Data>(
  input: string,
  schema: Schema.Schema<Source, Target>
): Source;
export function fromCBOR<Source, Target extends Data>(
  input: string,
  schema?: Schema.Schema<Source, Target>
): Source | Data {
  const data = resolveCBOR(input);
  return schema ? decodeData(data, schema) : data;
}

export const resolveCBOR = (input: string): Data => {
  let data: CML.PlutusData;
  try {
    data = CML.PlutusData.from_cbor_hex(input);
  } catch (error) {
    throw new Error(`Failed to resolve CBOR input: ${input}`);
  }
  switch (data.kind()) {
    case CML.PlutusDataKind.Integer:
      return { _tag: "Integer", integer: BigInt(data.as_integer()!.to_str()) };
    case CML.PlutusDataKind.Bytes:
      return { _tag: "ByteArray", bytearray: Bytes.toHex(data.as_bytes()!) };
    case CML.PlutusDataKind.List: {
      const list = data.as_list()!;
      const array = [];
      for (let i = 0; i < list.len(); i++) {
        array.push(resolveCBOR(list.get(i).to_cbor_hex()));
      }
      return { _tag: "List", array: array };
    }
    case CML.PlutusDataKind.Map: {
      const plutusMap = data.as_map()!;
      const tuples: DataTuple[] = [];
      const keys = plutusMap.keys();
      for (let i = 0; i < keys.len(); i++) {
        const keyData = resolveCBOR(keys.get(i).to_cbor_hex());
        // const key = isByteArray(keyData) ? keyData.bytearray : String(keyData);
        const key = resolveCBOR(keys.get(i).to_cbor_hex());
        const val = resolveCBOR(plutusMap.get(keys.get(i))!.to_cbor_hex());
        tuples.push([key, val]);
      }
      return { _tag: "Map", entries: tuples };
    }
    case CML.PlutusDataKind.ConstrPlutusData: {
      const constrData = data.as_constr_plutus_data()!;
      const fields = [];
      const list = constrData.fields();
      for (let i = 0; i < list.len(); i++) {
        fields.push(resolveCBOR(list.get(i).to_cbor_hex()));
      }
      return {
        _tag: "Constr",
        index: BigInt(constrData.alternative()),
        fields,
      };
    }
    default:
      throw new Error(`Unsupported type: ${data.kind()}`);
  }
};

/**
 * Decodes an unknown value from Plutus Data Constructor to a TypeScript type
 *
 * @example
 * import { Type , Data } from "@lucid-evolution/experimental";
 *
 * const Token = Type.Struct({
 *   policyId: Type.ByteArray,
 *   assetName: Type.ByteArray,
 *   amount: Type.Integer
 * });
 *
 * const data : unknown = { index: 0n, fields: ["deadbeef", "cafe", 1000n] };
 * const token = Data.fromData(data, Token);
 * // { policyId: "deadbeef", assetName: "cafe", amount: 1000n }
 *
 * @since 1.0.0
 */
export const decodeData = <Source, Target extends Data>(
  input: unknown,
  schema: Schema.Schema<Source, Target>,
  options: SchemaAST.ParseOptions = {}
): Source => Schema.decodeUnknownSync(schema, options)(input);

export const safeFromData = <Source, Target extends Data>(
  input: unknown,
  schema: Schema.Schema<Source, Target>,
  options: SchemaAST.ParseOptions = {}
): Either.Either<Source, ParseError> =>
  Schema.decodeUnknownEither(schema, options)(input);

/**
 * Encodes a TypeScript value to Plutus Data Constructor
 *
 * @example
 * import { Data } from "@lucid-evolution/experimental";
 *
 * const token : unknown = {
 *   policyId: "deadbeef",
 *   assetName: "cafe",
 *   amount: 1000n
 * };
 * const data = Data.toData(token, Token);
 * // { index: 0n, fields: ["deadbeef", "cafe", 1000n] }
 *
 * @since 1.0.0
 */
export const encodeData = <Source, Target extends Data>(
  input: unknown,
  schema: Schema.Schema<Source, Target>,
  options?: SchemaAST.ParseOptions
): Target => Schema.encodeUnknownSync(schema, options)(input);

export const safeToData = <Source, Target extends Data>(
  input: unknown,
  schema: Schema.Schema<Source, Target>,
  options?: SchemaAST.ParseOptions
): Either.Either<Target, ParseError> =>
  Schema.encodeUnknownEither(schema, options)(input);

/**
 * Creates a Plutus Data List type from an array of Data elements
 *
 * @example
 * import { Data } from "@lucid-evolution/experimental";
 *
 * // Create a list with multiple elements of the same type
 * const integerList = Data.makeList<Data.Integer>([
 *   Data.makeInteger(42n),
 *   Data.makeInteger(100n)
 * ]);
 *
 * // Create a list with a single element
 * const singleList = Data.makeList([Data.makeInteger(42n)]);
 *
 * // Create a mixed list with different element types
 * const mixedList = Data.makeList<Data>([
 *   Data.makeInteger(42n),
 *   Data.makeByteArray("deadbeef")
 * ]);
 *
 * @since 2.0.0
 */
export const makeList = <T extends Data = Data>(
  items: readonly T[]
): List<T> => ({
  _tag: "List",
  array: items,
});

/**
 * Creates a Plutus Data Integer type from a bigint value
 *
 * @example
 * import { Data } from "@lucid-evolution/experimental";
 *
 * const myInteger = Data.makeInteger(42n);
 *
 * @since 2.0.0
 */
export const makeInteger = <T extends bigint = bigint>(
  value: T
): Integer<T> => ({
  _tag: "Integer",
  integer: value,
});

/**
 * Creates a Plutus Data ByteArray type from a hex string
 *
 * @example
 * import { Data } from "@lucid-evolution/experimental";
 *
 * const myByteArray = Data.makeByteArray("deadbeef");
 *
 * @since 2.0.0
 */
export const makeByteArray = <T extends string = string>(
  value: T
): ByteArray<T> => ({
  _tag: "ByteArray",
  bytearray: value,
});

/**
 * Creates a Plutus Data Map type from an array of key-value tuples
 *
 * @example
 * import { Data } from "@lucid-evolution/experimental";
 *
 * const myMap = Data.makeMap([
 *   [Data.makeByteArray("key1"), Data.makeInteger(42n)],
 *   [Data.makeByteArray("key2"), Data.makeByteArray("value2")]
 * ]);
 *
 * @since 2.0.0
 */
export const makeMap = <K extends Data = Data, V extends Data = Data>(
  entries: ReadonlyArray<readonly [K, V]>
) => ({
  _tag: "Map",
  map: entries,
});

/**
 * Creates a Plutus Data Constr type (constructor) with the given index and fields
 *
 * @example
 * import { Data } from "@lucid-evolution/experimental";
 *
 * // Create a constructor for a custom data type (e.g., a "Mint" action with amount)
 * const mint = Data.makeConstr(0n, [Data.makeInteger(5n)]);
 *
 * // Create a constructor with no fields (e.g., a "Burn" action)
 * const burn = Data.makeConstr(1n, []);
 *
 * @since 2.0.0
 */
export const makeConstr = <
  T extends bigint = bigint,
  U extends readonly Data[] = readonly Data[],
>(
  index: T,
  fields: U
): Constr<T, U> => ({
  _tag: "Constr",
  index,
  fields,
});

