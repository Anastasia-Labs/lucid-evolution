import { pipe, Schema, SchemaAST } from "effect";
import * as Bytes from "./Core/Bytes.js";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";
import { ParseIssue } from "effect/ParseResult";

/**
 * Plutus data types and schemas for serialization/deserialization between
 * TypeScript types and Cardano's Plutus data format
 *
 * @since 1.0.0
 */

/**
 * Core Plutus Data types that can be used in Cardano smart contracts
 *
 * @example
 * import { Data } from "@lucid-evolution/experimental"
 *
 * // Integer type
 * const integerData: Data = 42n
 *
 * // Bytes type (hex encoded)
 * const bytesData: Data = "deadbeef"
 *
 * // Map type
 * const mapData: Data = new Map([["deadbeef", 42n]])
 *
 * // List type
 * const listData: Data = [42n, "deadbeef"]
 *
 * // Constructor type
 * const constrData: Data = { index: 0n, fields: [42n, "deadbeef"] }
 *
 * @since 1.0.0
 */
//TODO: Map, Array, and Constr types will carry the format indefinite length or definite length
export type Data =
  | bigint // Integer
  | string // Bytes in hex
  | ReadonlyMap<string, Data> // Map/AssocList
  | ReadonlyArray<Data> // List
  | { index: bigint; fields: ReadonlyArray<Data> };

/**
 * Helper function for formatting parse issues into human readable messages
 *
 * @internal
 */
const renderParseIssue = (issue: ParseIssue): string | undefined =>
  typeof issue.actual === "object" ? "[complex value]" : String(issue.actual);

// Schema Definitions

/**
 * Schema validator that ensures strings are valid hexadecimal format
 *
 * @internal
 */
const HexString = <Source extends string, Target>(
  self: Schema.Schema<Source, Target>,
) =>
  pipe(
    self,
    Schema.filter((value) => Bytes.isHex(value), {
      message: (issue) =>
        `Expected a hexadecimal string but received: ${issue.actual}.`,
    }),
  );

interface ByteArray extends Schema.SchemaClass<string, string, never> {}
/**
 * Schema for Plutus byte arrays that validates and ensures proper hexadecimal format
 *
 * @since 1.0.0
 */
export const ByteArray: ByteArray = pipe(
  Schema.String.annotations({
    message: (issue: ParseIssue) => {
      return {
        message: `Expected ByteArray but got ${renderParseIssue(issue)}.`,
        override: true,
      };
    },
  }),
  HexString,
).annotations({
  identifier: "ByteArray",
});

/**
 * Type guard for checking if a value is a valid ByteArray
 *
 * @example
 * import { Data } from "@lucid-evolution/experimental"
 *
 * isByteArray("deadbeef") // true
 * isByteArray("not-hex") // false
 *
 * @since 1.0.0
 */
export const isByteArray = Schema.is(ByteArray);

interface Constr
  extends Schema.Struct<{
    index: Schema.SchemaClass<bigint, bigint, never>;
    fields: Schema.Array$<Schema.suspend<Data, Data, never>>;
  }> {}
/**
 * Schema for Plutus Constructor type
 * @since 1.0.0
 */
export const Constr: Constr = Schema.Struct({
  index: Schema.BigIntFromSelf,
  fields: Schema.Array(Schema.suspend((): Schema.Schema<Data> => Data)),
}).annotations({
  identifier: "Constr",
  message: (issue: ParseIssue) => {
    return `Expected Constr but got ${renderParseIssue(issue)}.`;
  },
});

/**
 * Type guard for checking if a value is a valid Plutus Constructor
 *
 * @example
 * import { Data } from "@lucid-evolution/experimental"
 *
 * isConstr({ index: 0n, fields: ["deadbeef"] }) // true
 * isConstr("not-a-constructor") // false
 *
 * @since 1.0.0
 */
export const isConstr = Schema.is(Constr);

interface Map
  extends Schema.ReadonlyMapFromSelf<
    Schema.SchemaClass<string, string, never>,
    Schema.suspend<Data, Data, never>
  > {}
/**
 * Schema for Plutus AssocList (Map) type
 * @since 1.0.0
 */
export const Map: Map = Schema.ReadonlyMapFromSelf({
  key: HexString(Schema.String).annotations({
    identifier: "key",
  }),
  value: Schema.suspend((): Schema.Schema<Data> => Data).annotations({
    identifier: "value",
  }),
}).annotations({
  identifier: "Map",
  message: (issue: ParseIssue) => {
    return `Expected Map but got ${renderParseIssue(issue)}.`;
  },
});

/**
 * Type guard for checking if a value is a valid Plutus Map
 *
 * @example
 * import { Data } from "@lucid-evolution/experimental"
 *
 * isMap(new Map([["deadbeef", 42n]])) // true
 * isMap({ key: "value" }) // false
 *
 * @since 1.0.0
 */
export const isMap = Schema.is(Map);

interface List extends Schema.Array$<Schema.suspend<Data, Data, never>> {}
/**
 * Schema for Plutus List type
 * @since 1.0.0
 */
export const List: List = Schema.Array(
  Schema.suspend((): Schema.Schema<Data> => Data),
).annotations({
  identifier: "List",
  message: (issue: ParseIssue) => {
    return `Expected List but got ${renderParseIssue(issue)}.`;
  },
});

/**
 * Type guard for checking if a value is a valid Plutus List
 *
 * @example
 * import { Data } from "@lucid-evolution/experimental"
 *
 * isList([42n, "deadbeef"]) // true
 * isList("not-a-list") // false
 *
 * @since 1.0.0
 */
export const isList = Schema.is(List);

interface Integer extends Schema.SchemaClass<bigint, bigint, never> {}
/**
 * Schema for Plutus Integer type
 * @since 1.0.0
 */
export const Integer: Integer = Schema.BigIntFromSelf.annotations({
  identifier: "Integer",
  message: (issue: ParseIssue) => {
    return `Expected Integer but got ${renderParseIssue(issue)}.`;
  },
});

/**
 * Type guard for checking if a value is a valid Plutus Integer
 *
 * @example
 * import { Data } from "@lucid-evolution/experimental"
 *
 * isInteger(42n) // true
 * isInteger(42) // false
 *
 * @since 1.0.0
 */
export const isInteger = Schema.is(Integer);

export const Data: Schema.Schema<Data> = Schema.Union(
  List,
  Map,
  Constr,
  Integer,
  ByteArray,
).annotations({
  identifier: "Data",
});

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
  } = {},
): string => {
  const { canonical = false } = options;
  const toCMLPlutusData = (data: Data): CML.PlutusData => {
    if (Schema.is(Integer)(data))
      return CML.PlutusData.new_integer(
        CML.BigInteger.from_str(data.toString()),
      );
    if (Schema.is(ByteArray)(data))
      return CML.PlutusData.new_bytes(Bytes.fromHex(data));
    if (Schema.is(List)(data)) {
      const list = CML.PlutusDataList.new();
      data.forEach((item) => list.add(toCMLPlutusData(item)));
      return CML.PlutusData.new_list(list);
    }
    if (Schema.is(Map)(data)) {
      const map = CML.PlutusMap.new();
      for (const [key, value] of data) {
        map.set(toCMLPlutusData(key), toCMLPlutusData(value));
      }
      return CML.PlutusData.new_map(map);
    }
    if (Schema.is(Constr)(data)) {
      const fields = CML.PlutusDataList.new();
      data.fields.forEach((item) => fields.add(toCMLPlutusData(item)));
      return CML.PlutusData.new_constr_plutus_data(
        CML.ConstrPlutusData.new(data.index, fields),
      );
    }
    throw new Error(`Unsupported type: ${typeof data}`);
  };
  const data: Data = schema
    ? toData(input, schema, options.parseOptions)
    : toData(input, Data);
  const cmlPlutusData: CML.PlutusData = toCMLPlutusData(data);
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
  schema: Schema.Schema<Source, Target>,
): Source;
export function fromCBOR<Source, Target extends Data>(
  input: string,
  schema?: Schema.Schema<Source, Target>,
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
      return BigInt(data.as_integer()!.to_str());
    case CML.PlutusDataKind.Bytes:
      return Bytes.toHex(data.as_bytes()!);
    case CML.PlutusDataKind.List: {
      const list = data.as_list()!;
      const result = [];
      for (let i = 0; i < list.len(); i++) {
        result.push(resolveCBOR(list.get(i).to_cbor_hex()));
      }
      return result;
    }
    case CML.PlutusDataKind.Map: {
      const map = data.as_map()!;
      const result = new globalThis.Map();
      const keys = map.keys();
      for (let i = 0; i < keys.len(); i++) {
        const key = resolveCBOR(keys.get(i).to_cbor_hex());
        const value = resolveCBOR(map.get(keys.get(i))!.to_cbor_hex());
        result.set(key, value);
      }
      return result;
    }
    case CML.PlutusDataKind.ConstrPlutusData: {
      const constr = data.as_constr_plutus_data()!;
      const fields = [];
      const list = constr.fields();
      for (let i = 0; i < list.len(); i++) {
        fields.push(resolveCBOR(list.get(i).to_cbor_hex()));
      }
      return {
        index: constr.alternative(),
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
  options: SchemaAST.ParseOptions = {},
): Source => Schema.decodeUnknownSync(schema, options)(input);

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
  options?: SchemaAST.ParseOptions,
): Target => Schema.encodeUnknownSync(schema, options)(input);
