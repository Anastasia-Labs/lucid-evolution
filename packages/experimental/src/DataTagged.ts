import { Either, Record, Schema, SchemaAST } from "effect";
import * as Bytes from "./Core/Bytes.js";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";
import { ReadonlyMap } from "effect/Schema";
import { ParseError } from "effect/ParseResult";

/**
 * Plutus data types and schemas for serialization/deserialization between
 * TypeScript types and Plutus data format
 *
 * @since 2.0.0
 */
export type Data =
  | { _tag: "Integer"; integer: bigint }
  | { _tag: "ByteArray"; bytearray: string }
  | { _tag: "List"; list: readonly Data[] }
  | { _tag: "Map"; map: ReadonlyMap<Data, Data> }
  | { _tag: "Constr"; index: bigint; fields: readonly Data[] };

export const Integer = Schema.TaggedStruct("Integer", {
  integer: Schema.BigIntFromSelf,
}).annotations({ schema: "integer" });

export const ByteArray = Schema.TaggedStruct("ByteArray", {
  bytearray: Schema.String,
}).annotations({ schema: "ByteArray" });

export const List = Schema.TaggedStruct("List", {
  list: Schema.Array(Schema.suspend((): Schema.Schema<Data> => Data)),
}).annotations({ schema: "List" });

export const Map = Schema.TaggedStruct("Map", {
  map: Schema.ReadonlyMapFromSelf({
    key: Schema.suspend((): Schema.Schema<Data> => Data),
    value: Schema.suspend((): Schema.Schema<Data> => Data),
  }),
}).annotations({ schema: "Map" });

export const Constr = Schema.TaggedStruct("Constr", {
  index: Schema.BigIntFromSelf,
  fields: Schema.Array(Schema.suspend((): Schema.Schema<Data> => Data)),
}).annotations({ schema: "Constr" });

export const Data = Schema.Union(Integer, ByteArray, List, Map, Constr);

export const isByteArray = (data: Data) => data._tag === "ByteArray";

export const isInteger = (data: Data) => data._tag === "Integer";

export const isList = (data: Data) => data._tag === "List";

export const isMap = (data: Data) => data._tag === "Map";

export const isConstr = (data: Data) => data._tag === "Constr";

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
        data.list.forEach((item) => list.add(toCMLPlutusData(item)));
        return CML.PlutusData.new_list(list);
      }
      case "Map": {
        const map = CML.PlutusMap.new();
        Object.entries(data.map).forEach(([key, value]) => {
          const plutusKey = CML.PlutusData.new_bytes(Bytes.fromHex(key));
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
    ? toData(input, schema, options.parseOptions)
    : toData(input, Data);
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
  return schema ? fromData(data, schema) : data;
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
      return { _tag: "List", list: array };
    }
    case CML.PlutusDataKind.Map: {
      const plutusMap = data.as_map()!;
      const map = new globalThis.Map<Data, Data>();
      const keys = plutusMap.keys();
      for (let i = 0; i < keys.len(); i++) {
        const keyData = resolveCBOR(keys.get(i).to_cbor_hex());
        // const key = isByteArray(keyData) ? keyData.bytearray : String(keyData);
        const key = resolveCBOR(keys.get(i).to_cbor_hex());
        const val = resolveCBOR(plutusMap.get(keys.get(i))!.to_cbor_hex());
        map.set(key, val);
      }
      return { _tag: "Map", map };
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
export const fromData = <Source, Target extends Data>(
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
export const toData = <Source, Target extends Data>(
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
