import {
  Array as _Array,
  Arbitrary,
  Either,
  FastCheck,
  Schema,
  SchemaAST,
} from "effect";
import * as Bytes from "./Bytes.js";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";
import { ParseError } from "effect/ParseResult";
import * as Combinator from "./Combinator.js";

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
  readonly value: readonly T[];
}

export interface Map<K extends Data = Data, V extends Data = Data> {
  readonly _tag: "Map";
  readonly value: ReadonlyArray<readonly [K, V]>;
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
  readonly value: T;
}

export interface ByteArray<T extends string = string> {
  readonly _tag: "ByteArray";
  readonly value: T;
}

export type DataTuple = readonly [Data, Data];

export interface Integer$
  extends Schema.Struct<
    {
      _tag: Schema.tag<"Integer">;
    } & {
      value: typeof Schema.BigIntFromSelf;
    }
  > {}

export const Integer: Integer$ = Schema.TaggedStruct("Integer", {
  value: Schema.BigIntFromSelf,
}).annotations({
  identifier: "Integer",
});

export interface ByteArray$
  extends Schema.Struct<
    {
      _tag: Schema.tag<"ByteArray">;
    } & {
      value: Schema.filter<Schema.Schema<string, string, never>>;
    }
  > {}
export const ByteArray: ByteArray$ = Schema.TaggedStruct("ByteArray", {
  value: Schema.String.pipe(Schema.lowercased(), Combinator.HexString),
}).annotations({
  identifier: "ByteArray",
});

export interface List$
  extends Schema.Struct<
    {
      _tag: Schema.tag<"List">;
    } & {
      value: Schema.Array$<Schema.suspend<Data, Data, never>>;
    }
  > {}
export const List: List$ = Schema.TaggedStruct("List", {
  value: Schema.Array(
    Schema.suspend((): Schema.Schema<Data> => Data),
  ).annotations({
    arbitrary: () => (fc) => fc.array(Arbitrary.make(Data), { maxLength: 3 }),
  }),
}).annotations({
  identifier: "List",
});

export const uniqueByFirst = <
  Fst extends Schema.Schema<Data>,
  Snd extends Schema.Schema<Data>,
>(
  schema: Schema.Tuple2<Fst, Snd>,
) => {
  return Schema.Array(schema).pipe(
    Schema.filter(
      (tuples) =>
        tuples.map(([a, _]) => a).length ===
        _Array.dedupeWith(tuples, (a, b) => isEqual(a[0], b[0])).length,
    ),
  );
};

export interface Map$
  extends Schema.Struct<
    {
      _tag: Schema.tag<"Map">;
    } & {
      value: Schema.filter<
        Schema.Array$<
          Schema.Tuple2<
            Schema.suspend<Data, Data, never>,
            Schema.suspend<Data, Data, never>
          >
        >
      >;
    }
  > {}

export const Map: Map$ = Schema.TaggedStruct("Map", {
  value: uniqueByFirst(
    Schema.Tuple(
      Schema.suspend((): Schema.Schema<Data> => Data),
      Schema.suspend((): Schema.Schema<Data> => Data),
    ),
  ),
}).annotations({
  identifier: "Map",
});

export interface Constr$
  extends Schema.Struct<
    {
      _tag: Schema.tag<"Constr">;
    } & {
      index: Schema.filter<typeof Schema.BigIntFromSelf>;
      fields: Schema.Array$<Schema.suspend<Data, Data, never>>;
    }
  > {}

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

export const Data: Schema.Schema<Data> = Schema.Union(
  Integer,
  ByteArray,
  List,
  Map,
  Constr,
);

export const isByteArray = Schema.is(ByteArray);

export const isInteger = Schema.is(Integer);

export const isList = Schema.is(List);

export const isMap = Schema.is(Map);

export const isConstr = Schema.is(Constr);

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
    switch (data._tag) {
      case "Integer":
        return CML.PlutusData.new_integer(
          CML.BigInteger.from_str(data.value.toString()),
        );
      case "ByteArray":
        return CML.PlutusData.new_bytes(Bytes.fromHex(data.value));
      case "List": {
        const list = CML.PlutusDataList.new();
        data.value.forEach((item) => list.add(toCMLPlutusData(item)));
        return CML.PlutusData.new_list(list);
      }
      case "Map": {
        const map = CML.PlutusMap.new();
        data.value.forEach(([key, value]) => {
          const plutusKey = toCMLPlutusData(key);
          map.set(plutusKey, toCMLPlutusData(value));
        });
        return CML.PlutusData.new_map(map);
      }
      case "Constr": {
        const fields = CML.PlutusDataList.new();
        data.fields.forEach((item) => fields.add(toCMLPlutusData(item)));
        return CML.PlutusData.new_constr_plutus_data(
          CML.ConstrPlutusData.new(data.index, fields),
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
  schema: Schema.Schema<Source, Target>,
): Source;
export function fromCBOR<Source, Target extends Data>(
  input: string,
  schema?: Schema.Schema<Source, Target>,
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
      return Integer.make({ value: BigInt(data.as_integer()!.to_str()) });
    case CML.PlutusDataKind.Bytes:
      return ByteArray.make({
        value: Bytes.toHex(data.as_bytes()!),
      });
    case CML.PlutusDataKind.List: {
      const list = data.as_list()!;
      const array = [];
      for (let i = 0; i < list.len(); i++) {
        array.push(resolveCBOR(list.get(i).to_cbor_hex()));
      }
      return List.make({ value: array });
    }
    case CML.PlutusDataKind.Map: {
      const plutusMap = data.as_map()!;
      const tuples: DataTuple[] = [];
      const keys = plutusMap.keys();
      for (let i = 0; i < keys.len(); i++) {
        const key = resolveCBOR(keys.get(i).to_cbor_hex());
        const val = resolveCBOR(plutusMap.get(keys.get(i))!.to_cbor_hex());
        tuples.push([key, val]);
      }
      return Map.make({ value: tuples });
    }
    case CML.PlutusDataKind.ConstrPlutusData: {
      const constrData = data.as_constr_plutus_data()!;
      const fields = [];
      const list = constrData.fields();
      for (let i = 0; i < list.len(); i++) {
        fields.push(resolveCBOR(list.get(i).to_cbor_hex()));
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
  options: SchemaAST.ParseOptions = {},
): Source => Schema.decodeUnknownSync(schema, options)(input);

export const safeFromData = <Source, Target extends Data>(
  input: unknown,
  schema: Schema.Schema<Source, Target>,
  options: SchemaAST.ParseOptions = {},
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
  options?: SchemaAST.ParseOptions,
): Target => Schema.encodeUnknownSync(schema, options)(input);

export const safeToData = <Source, Target extends Data>(
  input: unknown,
  schema: Schema.Schema<Source, Target>,
  options?: SchemaAST.ParseOptions,
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
export const makeList = <T extends Data>(value: readonly T[]) =>
  List.make({ value });

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
export const makeInteger = <T extends bigint = bigint>(value: T) =>
  Integer.make({ value });

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
export const makeByteArray = <T extends string>(value: T) =>
  ByteArray.make({ value });

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
export const makeMap = (value: ReadonlyArray<readonly [Data, Data]>) =>
  Map.make({ value });

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
export const makeConstr = <T extends bigint, U extends readonly Data[]>(
  index: T,
  fields: U,
) => Constr.make({ index, fields });

const replacer = (key: string, value: any) => {
  if (typeof value === "bigint") {
    return value.toString() + "n";
  }
  return value;
};

const reviver = (key: string, value: any) => {
  if (typeof value === "string" && value.endsWith("n")) {
    return BigInt(value.slice(0, -1));
  }
  return value;
};

export const toJSON = (data: Data): string => {
  return JSON.stringify(data, replacer, 2);
};

export const fromJSON = (json: string): Data => {
  const parsed = JSON.parse(json, reviver);
  if (parsed._tag === undefined) {
    throw new Error("Invalid data format");
  }
  return parsed;
};

export const equals = (a: Data, b: Data): boolean => toJSON(a) === toJSON(b);

export const isEqual = (a: Data, b: Data): boolean => {
  if (a._tag !== b._tag) {
    return false;
  }

  if (a._tag === "Integer" && b._tag === "Integer") {
    return a.value === b.value;
  }

  if (a._tag === "ByteArray" && b._tag === "ByteArray") {
    return a.value === b.value;
  }
  if (a._tag === "List" && b._tag === "List") {
    return (
      a.value.length === b.value.length &&
      a.value.every((item, index) => isEqual(item, b.value[index]))
    );
  }
  if (a._tag === "Map" && b._tag === "Map") {
    return (
      a.value.length === b.value.length &&
      a.value.every(([key, value], index) => {
        const [otherKey, otherValue] = b.value[index];
        return isEqual(key, otherKey) && isEqual(value, otherValue);
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
 * @example
 * import { compareData } from "experimental/DataTagged";
 *
 * compareData(DataTagged.makeInteger(1n), DataTagged.makeInteger(2n)); // -1
 * compareData(DataTagged.makeInteger(2n), DataTagged.makeInteger(2n)); // 0
 * compareData(DataTagged.makeByteArray("a"), DataTagged.makeByteArray("b")); // -1
 *
 * @since 1.0.0
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
    return a.value < b.value ? -1 : a.value > b.value ? 1 : 0;
  }

  if (a._tag === "ByteArray" && b._tag === "ByteArray") {
    return a.value < b.value ? -1 : a.value > b.value ? 1 : 0;
  }

  if (a._tag === "List" && b._tag === "List") {
    // Compare list lengths first
    const lengthDiff = a.value.length - b.value.length;
    if (lengthDiff !== 0) {
      return lengthDiff;
    }

    // Compare elements one by one
    for (let i = 0; i < a.value.length; i++) {
      const comparison = compare(a.value[i], b.value[i]);
      if (comparison !== 0) {
        return comparison;
      }
    }
    return 0;
  }

  if (a._tag === "Map" && b._tag === "Map") {
    // Compare map sizes first
    const lengthDiff = a.value.length - b.value.length;
    if (lengthDiff !== 0) {
      return lengthDiff;
    }

    // Maps should already be sorted by key, so compare entries in order
    for (let i = 0; i < a.value.length; i++) {
      // Compare keys first
      const keyComparison = compare(a.value[i][0], b.value[i][0]);
      if (keyComparison !== 0) {
        return keyComparison;
      }

      // If keys are equal, compare values
      const valueComparison = compare(a.value[i][1], b.value[i][1]);
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
 * Creates an arbitrary that generates DataTagged.Data values with controlled depth
 *
 * @example
 * import { genData } from "@lucid-evolution/experimental/test/temp/data-tagged-generator";
 *
 * const data = genData(3);
 * const sample = Arbitrary.sample(data);
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
 * Creates an arbitrary that generates DataTagged.ByteArray values
 *
 * @since 2.0.0
 */
export const genByteArray = (): FastCheck.Arbitrary<ByteArray> =>
  FastCheck.string({
    minLength: 0,
    maxLength: 64,
  }).map((value) => makeByteArray(Bytes.fromText(value)));

/**
 * Creates an arbitrary that generates DataTagged.Integer values
 *
 * @since 2.0.0
 */
export const genInteger = (): FastCheck.Arbitrary<Integer> =>
  FastCheck.bigInt({ min: 0n, max: 64n - 1n }).map((value) =>
    makeInteger(value),
  );

/**
 * Creates an arbitrary that generates DataTagged.List values
 *
 * @since 2.0.0
 */
export const genList = (depth: number): FastCheck.Arbitrary<List> =>
  FastCheck.array(genData(depth), {
    minLength: 0,
    maxLength: 5,
  }).map((value) => makeList(value));

/**
 * Creates an arbitrary that generates DataTagged.Constr values
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
  ).map(([index, fields]) => makeConstr(index, fields));

/**
 * Creates an arbitrary that generates DataTagged.Map values
 * Following the Plutus distribution of key types:
 * - 60% ByteArray keys
 * - 30% Integer keys
 * - 10% Complex keys
 *
 * @since 2.0.0
 */
/**
 * Creates an arbitrary that generates DataTagged.Map values with unique keys
 * Following the Plutus distribution of key types:
 * - 60% ByteArray keys
 * - 30% Integer keys
 * - 10% Complex keys
 *
 * @example
 * import { genMap } from "@lucid-evolution/experimental/test/temp/data-tagged-generator";
 *
 * const mapArb = genMap(2);
 * const sample = Arbitrary.sample(mapArb);
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
    ).map((pairs) => pairs.sort((a, b) => compare(a[0], b[0])));

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
    (pairs) => makeMap(pairs),
  );
};

export const sort = (data: Data): Data => {
  switch (data._tag) {
    case "Map": {
      // First recursively sort any nested Data in both keys and values
      const sortedPairs = data.value.map(
        ([key, value]) => [sort(key), sort(value)] as const,
      );

      // Then sort the pairs by key
      const sortedMap = [...sortedPairs].sort((a, b) => compare(a[0], b[0]));

      return makeMap(sortedMap);
    }
    case "List": {
      // Recursively sort elements in the list
      const sortedElements = data.value.map((item) => sort(item));
      return makeList(sortedElements);
    }
    case "Constr": {
      // Recursively sort fields in the constructor
      const sortedFields = data.fields.map((field) => sort(field));
      return makeConstr(data.index, sortedFields);
    }
    // Integers and ByteArrays don't need sorting
    default:
      return data;
  }
};
