import { Schema } from "effect";

/**
 * Plutus data types and schemas for serialization/deserialization
 *
 * @since 1.0.0
 */

/**
 * Represents Plutus Data types that can be used in smart contracts
 *
 * @example
 * import { Data } from "./Plutus"
 * const integerData: Data = 42n
 * const bytesData: Data = "deadbeef"
 *
 * @since 1.0.0
 */
//TODO: Data type is a special type and must be branded with a unique symbol to prevent mixing with other bigint or string values
//TODO: Branded types can be constructed with a make constructor
export type Data =
  | bigint // Integer
  | string // Bytes in hex
  | ReadonlyMap<string, Data> // Map/AssocList
  | ReadonlyArray<Data> // List
  | { index: bigint; fields: ReadonlyArray<Data> };

// Schema Definitions

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
  index: Schema.BigIntFromSelf.annotations({ identifier: "bigint" }),
  fields: Schema.Array(
    Schema.suspend((): Schema.Schema<Data> => Data)
  ).annotations({ identifier: "array" }),
}).annotations({
  identifier: "Constr",
});

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
  key: Schema.String.annotations({ identifier: "key" }),
  value: Schema.suspend((): Schema.Schema<Data> => Data).annotations({
    identifier: "value",
  }),
}).annotations({ identifier: "Map" });

interface List extends Schema.Array$<Schema.suspend<Data, Data, never>> {}
/**
 * Schema for Plutus List type
 * @since 1.0.0
 */
export const List: List = Schema.Array(
  Schema.suspend((): Schema.Schema<Data> => Data)
).annotations({
  identifier: "List",
});

interface ByteArray extends Schema.SchemaClass<string, string, never> {}
/**
 * Schema for Plutus byte array represented as a hexadecimal string
 *
 * Byte arrays must be encoded as hexadecimal strings (e.g. "deadbeef")
 * where each byte is represented by two hexadecimal digits.
 *
 * @since 1.0.0
 */
export const ByteArray: ByteArray = Schema.String.annotations({
  identifier: "ByteArray",
});

interface Integer extends Schema.SchemaClass<bigint, bigint, never> {}
/**
 * Schema for Plutus Integer type
 * @since 1.0.0
 */
export const Integer: Integer = Schema.BigIntFromSelf.annotations({
  identifier: "Integer",
});

/**
 * Combined Schema for all Plutus Data types
 * @since 1.0.0
 */
export const Data: Schema.Schema<Data> = Schema.Union(
  Integer,
  ByteArray,
  List,
  Map,
  Constr
);
