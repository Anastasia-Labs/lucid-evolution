import {
  Data as EffectData,
  Effect,
  ParseResult,
  Schema,
  FastCheck,
} from "effect";
import * as CBOR from "./CBOR.js";
import * as Bytes from "./Bytes.js";
import * as Numeric from "./Numeric.js";

/**
 * Error class for Data related operations.
 *
 * @example
 * import { Data } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const error = new Data.DataError({ message: "Invalid data" });
 * assert(error.message === "Invalid data");
 *
 * @since 2.0.0
 * @category errors
 */
export class DataError extends EffectData.TaggedError("DataError")<{
  message?: string;
  reason?: "InvalidFormat" | "EncodingError" | "DecodingError";
}> {}

/**
 * PlutusData type definition based on Conway CDDL specification
 *
 * CDDL: plutus_data =
 *   constr<plutus_data>
 *   / {* plutus_data => plutus_data}
 *   / [* plutus_data]
 *   / big_int
 *   / bounded_bytes
 *
 * constr<a0> =
 *   #6.121([* a0])
 *   / #6.122([* a0])
 *   / #6.123([* a0])
 *   / #6.124([* a0])
 *   / #6.125([* a0])
 *   / #6.126([* a0])
 *   / #6.127([* a0])
 *   / #6.102([uint, [* a0]])
 *
 * Constructor Index Limits:
 * - Tags 121-127: Direct encoding for constructor indices 0-6
 * - Tag 102: General constructor encoding for any uint value
 * - Maximum constructor index: 2^64 - 1 (18,446,744,073,709,551,615)
 *   as per CBOR RFC 8949 specification for unsigned integers
 *
 * @since 2.0.0
 * @category model
 */
export type PlutusData =
  | Constr<PlutusData>
  | PlutusMap
  | PlutusList
  | PlutusBigInt
  | PlutusBytes;

/**
 * Constr type for constructor alternatives based on Conway CDDL specification
 *
 * CDDL: constr<a0> =
 *   #6.121([* a0])    // index 0
 *   / #6.122([* a0])  // index 1
 *   / #6.123([* a0])  // index 2
 *   / #6.124([* a0])  // index 3
 *   / #6.125([* a0])  // index 4
 *   / #6.126([* a0])  // index 5
 *   / #6.127([* a0])  // index 6
 *   / #6.102([uint, [* a0]])  // general constructor with custom index
 *
 * Constructor Index Range:
 * - Minimum: 0
 * - Maximum: 2^64 - 1 (18,446,744,073,709,551,615)
 *   as per CBOR RFC 8949 specification for unsigned integers
 *
 * @since 2.0.0
 * @category model
 */
export interface Constr<T> {
  readonly _tag: "Constr";
  readonly index: bigint;
  readonly fields: readonly T[];
}

/**
 * PlutusMap type for plutus data maps
 *
 * @since 2.0.0
 * @category model
 */
export interface PlutusMap {
  readonly _tag: "Map";
  readonly entries: ReadonlyArray<{
    readonly key: PlutusData;
    readonly value: PlutusData;
  }>;
}

/**
 * PlutusList type for plutus data lists
 *
 * @since 2.0.0
 * @category model
 */
export interface PlutusList {
  readonly _tag: "List";
  readonly list: readonly PlutusData[];
}

/**
 * PlutusBigInt type for plutus big integers
 *
 * @since 2.0.0
 * @category model
 */
export interface PlutusBigInt {
  readonly _tag: "Integer";
  readonly integer: bigint;
}

/**
 * PlutusBytes type for plutus bounded bytes
 *
 * @since 2.0.0
 * @category model
 */
export interface PlutusBytes {
  readonly _tag: "ByteArray";
  readonly bytearray: string; // HexSchema
}

/**
 * Schema for Constr data type
 *
 * @category schemas
 *
 * @since 2.0.0
 */
export const ConstrSchema = Schema.TaggedStruct("Constr", {
  index: Numeric.Uint64Schema,
  fields: Schema.Array(
    Schema.suspend((): Schema.Schema<PlutusData> => PlutusDataSchema)
  ),
});

/**
 * Schema for PlutusMap data type
 *
 * @category schemas
 *
 * @since 2.0.0
 */
export const PlutusMapSchema = Schema.TaggedStruct("Map", {
  entries: Schema.Array(
    Schema.Struct({
      key: Schema.suspend((): Schema.Schema<PlutusData> => PlutusDataSchema),
      value: Schema.suspend((): Schema.Schema<PlutusData> => PlutusDataSchema),
    })
  ),
});

/**
 * Schema for PlutusList data type
 *
 * @category schemas
 *
 * @since 2.0.0
 */
export const PlutusListSchema = Schema.TaggedStruct("List", {
  list: Schema.Array(
    Schema.suspend((): Schema.Schema<PlutusData> => PlutusDataSchema)
  ),
});

/**
 * Schema for PlutusBigInt data type
 *
 * Matches the CDDL specification for big_int:
 * ```
 * big_int = int / big_uint / big_nint
 * big_uint = #6.2(bounded_bytes)
 * big_nint = #6.3(bounded_bytes)
 * ```
 *
 * Where:
 * - `int` covers integers that fit in CBOR major types 0 and 1 (0 to 2^64-1 for positive, -(2^64-1) to -1 for negative)
 * - `big_uint` (tag 2) covers positive integers larger than 2^64-1
 * - `big_nint` (tag 3) covers negative integers smaller than -(2^64-1)
 *
 * Note: JavaScript's Number.MAX_SAFE_INTEGER (2^53-1) is much smaller than CBOR's 64-bit limit.
 *
 * @category schemas
 *
 * @since 2.0.0
 */
export const PlutusBigIntSchema = Schema.TaggedStruct("Integer", {
  integer: Schema.BigIntFromSelf,
});

/**
 * Schema for PlutusBytes data type
 *
 * @category schemas
 *
 * @since 2.0.0
 */
export const PlutusBytesSchema = Schema.TaggedStruct("ByteArray", {
  bytearray: Bytes.HexSchemaLenient,
});

/**
 * Combined schema for PlutusData type
 *
 * @category schemas
 *
 * @since 2.0.0
 */
export const PlutusDataSchema: Schema.Schema<PlutusData> = Schema.Union(
  ConstrSchema,
  PlutusMapSchema,
  PlutusListSchema,
  PlutusBigIntSchema,
  PlutusBytesSchema
);

/**
 * Type guard to check if a value is a Constr
 *
 * @category predicates
 *
 * @example
 * import { Data } from "@lucid-evolution/experimental";
 *
 * const value = Data.constr(0, []);
 * const isConstr = Data.isConstr(value); // true
 *
 * @since 2.0.0
 */
export const isConstr = Schema.is(ConstrSchema);

/**
 * Type guard to check if a value is a PlutusMap
 *
 * @category predicates
 *
 * @example
 * import { Data } from "@lucid-evolution/experimental";
 *
 * const value = Data.plutusMap([]);
 * const isPlutusMap = Data.isPlutusMap(value); // true
 *
 * @since 2.0.0
 */
export const isPlutusMap = Schema.is(PlutusMapSchema);

/**
 * Type guard to check if a value is a PlutusList
 *
 * @category predicates
 *
 * @example
 * import { Data } from "@lucid-evolution/experimental";
 *
 * const value = Data.plutusList([]);
 * const isPlutusList = Data.isPlutusList(value); // true
 *
 * @since 2.0.0
 */
export const isPlutusList = Schema.is(PlutusListSchema);

/**
 * Type guard to check if a value is a PlutusBigInt
 *
 * @category predicates
 *
 * @example
 * import { Data } from "@lucid-evolution/experimental";
 *
 * const value = Data.plutusBigInt(42n);
 * const isPlutusBigInt = Data.isPlutusBigInt(value); // true
 *
 * @since 2.0.0
 */
export const isPlutusBigInt = Schema.is(PlutusBigIntSchema);

/**
 * Type guard to check if a value is a PlutusBytes
 *
 * @category predicates
 *
 * @example
 * import { Data } from "@lucid-evolution/experimental";
 *
 * const value = Data.plutusBytes("deadbeef");
 * const isPlutusBytes = Data.isPlutusBytes(value); // true
 *
 * @since 2.0.0
 */
export const isPlutusBytes = Schema.is(PlutusBytesSchema);

/**
 * Creates a constructor with the specified index and data
 *
 * @example
 * import { Data } from "@lucid-evolution/experimental";
 *
 * const constr0 = Data.constr(0, []); // CBOR tag #6.121
 * const constr1 = Data.constr(1, []); // CBOR tag #6.122
 * const constr7 = Data.constr(7, []); // CBOR tag #6.102([7, []])
 *
 * @since 2.0.0
 * @category constructors
 */
export const constr = (index: bigint, data: PlutusData[]): Constr<PlutusData> =>
  ConstrSchema.make({
    index,
    fields: data,
  });

/**
 * Creates a Plutus map from key-value pairs
 *
 * @example
 * import { Data } from "@lucid-evolution/experimental";
 *
 * const map = Data.plutusMap([]);
 *
 * @since 2.0.0
 * @category constructors
 */
export const map = (
  entries: Array<{ key: PlutusData; value: PlutusData }>
): PlutusMap =>
  PlutusMapSchema.make({
    entries,
  });

/**
 * Creates a Plutus list from items
 *
 * @example
 * import { Data } from "@lucid-evolution/experimental";
 *
 * const list = Data.plutusList([]);
 *
 * @since 2.0.0
 * @category constructors
 */
export const list = (list: PlutusData[]): PlutusList =>
  PlutusListSchema.make({
    list,
  });

/**
 * Creates Plutus big integer
 *
 * @example
 * import { Data } from "@lucid-evolution/experimental";
 *
 * const plutusBigInt = Data.plutusBigInt(12345n);
 *
 * @since 2.0.0
 * @category constructors
 */
export const int = (integer: bigint): PlutusBigInt =>
  PlutusBigIntSchema.make({
    integer,
  });

/**
 * Creates Plutus bounded bytes from hex string
 *
 * @example
 * import { Data } from "@lucid-evolution/experimental";
 *
 * const plutusBytes = Data.plutusBytes("deadbeef");
 *
 * @since 2.0.0
 * @category constructors
 */
export const bytearray = (bytes: string): PlutusBytes =>
  PlutusBytesSchema.make({
    bytearray: bytes,
  });

/**
 * Recursively converts PlutusData to its CBOR byte representation with configurable encoding options.
 *
 * @example
 * import { Data, CBOR } from "@lucid-evolution/experimental";
 *
 * const constr = Data.constr(0, []);
 * const cborBytes = Data.toCborBytes(constr);
 * // cborBytes is now a Uint8Array with indefinite encoding
 *
 * const definiteBytes = Data.toCborBytes(constr, {
 *   useIndefiniteArrays: false,
 *   useIndefiniteMaps: false
 * });
 * // definiteBytes uses definite-length encoding
 *
 * @since 2.0.0
 * @category encoding
 */
export const toCborBytes = (
  data: PlutusData,
  options: CBOR.CBOREncodingOptions = CBOR.DEFAULT_ENCODING_OPTIONS
): Effect.Effect<Uint8Array, CBOR.CBORError> =>
  Effect.gen(function* () {
    // Handle each PlutusData type directly
    switch (data._tag) {
      case "Constr": {
        // Create array with encoded fields using configurable encoding
        const arrayBytes = yield* CBOR.encodeArray(
          data.fields,
          options,
          (field) => toCborBytes(field as PlutusData, options)
        );

        if (data.index >= 0 && data.index < 7) {
          // Use CBOR tags 121-127 for constructor indices 0-6
          const tagValue = 121 + Number(data.index);
          return yield* CBOR.encodeTag(tagValue, arrayBytes);
        } else if (
          options.mode === "custom" &&
          options.useDefiniteForEmpty &&
          data.index >= 7 &&
          data.index < 128
        ) {
          // CML compatibility: use tag 1280 + (index - 7) for indices 7-127
          const tagValue = 1280 + Number(data.index - 7n);
          return yield* CBOR.encodeTag(tagValue, arrayBytes);
        } else {
          // Use CBOR tag 102 for large constructor indices
          const indexBytes = yield* CBOR.encodeCompactNumber(data.index);

          // For general constructor, format is [index, fieldsArray]
          const fieldsArray = yield* CBOR.encodeArray(
            data.fields,
            options,
            (field) => toCborBytes(field as PlutusData, options)
          );

          const generalArrayItems = [indexBytes, fieldsArray];

          // Create custom options for the outer array in tag 102
          const tag102Options: CBOR.CBOREncodingOptions =
            options.mode === "custom"
              ? { ...options, useIndefiniteArrays: true } // Force indefinite for outer array in tag 102
              : CBOR.DEFAULT_ENCODING_OPTIONS;

          const generalBytes = yield* CBOR.encodeArray(
            generalArrayItems,
            tag102Options,
            (item) => Effect.succeed(item as Uint8Array)
          );

          return yield* CBOR.encodeTag(102, generalBytes);
        }
      }
      case "Map":
        // Use configurable map encoding for PlutusMap
        return yield* CBOR.encodeMap(data.entries, options, (item) =>
          toCborBytes(item as PlutusData, options)
        );
      case "List": {
        // Use configurable array encoding for PlutusList
        return yield* CBOR.encodeArray(data.list, options, (item) =>
          toCborBytes(item as PlutusData, options)
        );
      }
      case "Integer":
        // Always use proper CBOR integer encoding for BigInt values
        return yield* CBOR.encodeBigInt(data.integer);
      case "ByteArray":
        // Convert hex string to Uint8Array and encode as CBOR bytes
        return yield* CBOR.encodeCBORValue(
          Bytes.DecodeLenient.hex(data.bytearray),
          options
        );
      default:
        return yield* Effect.fail(
          new CBOR.CBORError({ message: "Unknown PlutusData type" })
        );
    }
  });

/**
 * Converts generic CBOR tagged values to Plutus Data constructors.
 * Incorporates the important transformations from the original parsePlutusData function.
 *
 * @since 2.0.0
 * @category transformation
 */
const convertCBORToPlutusData = (value: CBOR.CBORValue): PlutusData => {
  // Handle primitives first
  if (typeof value === "bigint") {
    return {
      _tag: "Integer",
      integer: value,
    };
  }

  if (typeof value === "number") {
    return {
      _tag: "Integer",
      integer: BigInt(value),
    };
  }

  if (value instanceof Uint8Array) {
    return {
      _tag: "ByteArray",
      bytearray: Bytes.EncodeLenient.hex(value),
    };
  }

  // Handle arrays
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return list([]);
    }
    return list(value.map((item) => convertCBORToPlutusData(item)));
  }

  if (value && typeof value === "object") {
    // Check if it's a tagged value
    if ("tag" in value && "value" in value) {
      const taggedValue = value;

      // Handle Plutus Data constructor tags (incorporating parsePlutusData logic)
      if (taggedValue.tag >= 121 && taggedValue.tag <= 127) {
        // Direct constructor tags (121-127) represent constructor indices 0-6
        const constructorIndex = BigInt(taggedValue.tag - 121);
        if (Array.isArray(taggedValue.value)) {
          const fields = taggedValue.value.map((item) =>
            convertCBORToPlutusData(item)
          );
          if (fields.length === 0) {
            return constr(constructorIndex, []);
          }
          return constr(constructorIndex, fields);
        }
        throw new DataError({
          message: `Invalid constructor value for tag ${taggedValue.tag}`,
        });
      } else if (taggedValue.tag >= 1280 && taggedValue.tag <= 1407) {
        // CML compatibility tags (1280-1407) represent constructor indices 7-127
        const constructorIndex = BigInt(taggedValue.tag - 1280 + 7);
        if (Array.isArray(taggedValue.value)) {
          const fields = taggedValue.value.map((item) =>
            convertCBORToPlutusData(item)
          );
          if (fields.length === 0) {
            return constr(constructorIndex, []);
          }
          return constr(constructorIndex, fields);
        }
        throw new DataError({
          message: `Invalid constructor value for tag ${taggedValue.tag}`,
        });
      } else if (taggedValue.tag === 102) {
        // General constructor tag (102) - value should be [index, fields]
        if (Array.isArray(taggedValue.value) && taggedValue.value.length >= 2) {
          const index = taggedValue.value[0];
          const fieldsArray = taggedValue.value[1];
          const indexBigInt =
            typeof index === "bigint" ? index : BigInt(Number(index));

          // fieldsArray should be the second element and should be an array
          if (Array.isArray(fieldsArray)) {
            const fields = fieldsArray.map((item) =>
              convertCBORToPlutusData(item)
            );
            if (fields.length === 0) {
              return constr(indexBigInt, []);
            }
            return constr(indexBigInt, fields);
          } else {
            throw new DataError({
              message: `Tag 102 second element should be an array, got ${typeof fieldsArray}`,
            });
          }
        }
        throw new DataError({
          message: `Tag 102 should have array value with at least 2 elements, got ${typeof taggedValue.value}`,
        });
      }

      // For other tags, this is not a valid PlutusData constructor
      throw new DataError({
        message: `Unsupported CBOR tag for PlutusData: ${taggedValue.tag}`,
      });
    }

    // Handle Maps
    if (value instanceof Map) {
      const convertedEntries: Array<{ key: PlutusData; value: PlutusData }> =
        [];
      for (const [key, val] of value) {
        convertedEntries.push({
          key: convertCBORToPlutusData(key),
          value: convertCBORToPlutusData(val),
        });
      }
      if (convertedEntries.length === 0) {
        return map([]);
      }
      return map(convertedEntries);
    }

    // Handle plain objects (should not happen with our CBOR decoder)
    throw new DataError({
      message: `Unsupported CBOR object type for PlutusData`,
    });
  }

  // Handle unsupported primitive types
  if (
    typeof value === "string" ||
    typeof value === "boolean" ||
    value === null ||
    value === undefined
  ) {
    throw new DataError({
      message: `Unsupported CBOR primitive type for PlutusData: ${typeof value}`,
    });
  }

  throw new DataError({
    message: `Unsupported CBOR value type for PlutusData: ${typeof value}`,
  });
};

/**
 * Pattern matching helper for Constr types
 *
 * @example
 * import { Data } from "@lucid-evolution/experimental";
 *
 * const result = Data.matchConstr(constr, {
 *   0: (fields) => "Alternative 0",
 *   1: (fields) => "Alternative 1",
 *   _: (index, fields) => `Alternative ${index}`
 * });
 *
 * @since 2.0.0
 * @category utilities
 */
export const matchConstr = <T>(
  constr: Constr<PlutusData>,
  cases: {
    [key: number]: (fields: readonly PlutusData[]) => T;
    _: (index: number, fields: readonly PlutusData[]) => T;
  }
): T => {
  const specificCase = cases[Number(constr.index)];
  if (specificCase) {
    return specificCase(constr.fields);
  }
  return cases._(Number(constr.index), constr.fields);
};

/**
 * Pattern matching helper for PlutusData types
 *
 * @example
 * import { Data } from "@lucid-evolution/experimental";
 *
 * const result = Data.matchPlutusData(data, {
 *   PlutusMap: (entries) => "Map",
 *   PlutusList: (items) => "List",
 *   PlutusBigInt: (value) => "BigInt",
 *   PlutusBytes: (bytes) => "Bytes",
 *   Constr: (constr) => "Constructor"
 * });
 *
 * @since 2.0.0
 * @category utilities
 */
export const matchPlutusData = <T>(
  data: PlutusData,
  cases: {
    PlutusMap: (
      entries: ReadonlyArray<{
        readonly key: PlutusData;
        readonly value: PlutusData;
      }>
    ) => T;
    PlutusList: (items: readonly PlutusData[]) => T;
    PlutusBigInt: (value: bigint) => T;
    PlutusBytes: (bytes: string) => T;
    Constr: (constr: Constr<PlutusData>) => T;
  }
): T => {
  switch (data._tag) {
    case "Map":
      return cases.PlutusMap(data.entries);
    case "List":
      return cases.PlutusList(data.list);
    case "Integer":
      return cases.PlutusBigInt(data.integer);
    case "ByteArray":
      return cases.PlutusBytes(data.bytearray);
    case "Constr":
      return cases.Constr(data);
    default:
      throw new DataError({
        message: `Exhaustive check failed: Unhandled PlutusData case`,
      });
  }
};

/**
 * Creates an arbitrary that generates PlutusData values with controlled depth
 *
 * @category generators
 *
 * @example
 * import { Data } from "@lucid-evolution/experimental";
 * import { FastCheck } from "effect"
 *
 * const data = Data.genPlutusData(3);
 * const sample = FastCheck.sample(data);
 *
 * @since 2.0.0
 */
export const genPlutusData = (
  depth: number = 3
): FastCheck.Arbitrary<PlutusData> => {
  if (depth <= 0) {
    // Base cases: PlutusBigInt or PlutusBytes
    return FastCheck.oneof(genPlutusBigInt(), genPlutusBytes());
  }

  // Recursive cases with decreasing depth
  return FastCheck.oneof(
    genPlutusBigInt(),
    genPlutusBytes(),
    genConstr(depth - 1),
    genPlutusList(depth - 1),
    genPlutusMap(depth - 1)
  );
};

/**
 * Creates an arbitrary that generates PlutusBytes values
 *
 * @category generators
 *
 * @since 2.0.0
 */
export const genPlutusBytes = (): FastCheck.Arbitrary<PlutusBytes> =>
  FastCheck.uint8Array({
    minLength: 0, // Allow empty arrays (valid for PlutusBytes)
    maxLength: 32, // Max 32 bytes
  }).map((bytes) => bytearray(Bytes.EncodeLenient.hex(bytes)));

/**
 * Creates an arbitrary that generates PlutusBigInt values
 *
 * @category generators
 *
 * @since 2.0.0
 */
export const genPlutusBigInt = (): FastCheck.Arbitrary<PlutusBigInt> =>
  FastCheck.bigInt().map((value) => int(value));

/**
 * Creates an arbitrary that generates PlutusList values
 *
 * @category generators
 *
 * @since 2.0.0
 */
export const genPlutusList = (depth: number): FastCheck.Arbitrary<PlutusList> =>
  FastCheck.array(genPlutusData(depth), {
    minLength: 0,
    maxLength: 5,
  }).map((value) => list(value));

/**
 * Creates an arbitrary that generates Constr values
 *
 * @category generators
 *
 * @since 2.0.0
 */
export const genConstr = (
  depth: number
): FastCheck.Arbitrary<Constr<PlutusData>> =>
  FastCheck.tuple(
    FastCheck.bigInt({ min: 0n, max: 2n ** 64n - 1n }),
    FastCheck.array(genPlutusData(depth), {
      minLength: 0,
      maxLength: 5,
    })
  ).map(([index, data]) => constr(index, data));

/**
 * Creates an arbitrary that generates PlutusMap values with unique keys
 * Following a similar distribution pattern:
 * - 60% PlutusBigInt keys
 * - 30% PlutusBytes keys
 * - 10% Complex keys
 *
 * @category generators
 *
 * @example
 * import { Data } from "@lucid-evolution/experimental";
 * import { FastCheck } from "effect"
 *
 * const mapArb = Data.genPlutusMap(2);
 * const sample = FastCheck.sample(mapArb);
 *
 * @since 2.0.0
 */
export const genPlutusMap = (depth: number): FastCheck.Arbitrary<PlutusMap> => {
  // Helper to create key-value pairs with unique keys
  const uniqueKeyValuePairs = <T extends PlutusData>(
    keyGen: FastCheck.Arbitrary<T>,
    maxSize: number
  ) =>
    FastCheck.uniqueArray(
      FastCheck.tuple(keyGen, genPlutusData(depth > 0 ? depth - 1 : 0)),
      {
        minLength: 0,
        maxLength: maxSize * 2, // Generate more than needed to increase chance of unique keys
        selector: (pair) => {
          // Use CBOR encoding for unique key identification
          const keyHex = Encode.cborHex(pair[0]);
          return keyHex;
        },
      }
    ).map((pairs) => pairs.map(([key, value]) => ({ key, value })));

  // PlutusBigInt keys (more frequent)
  const bigIntPairs = uniqueKeyValuePairs(genPlutusBigInt(), 3);

  // PlutusBytes keys (medium frequency)
  const bytesPairs = uniqueKeyValuePairs(genPlutusBytes(), 3);

  // Complex keys (less frequent)
  const complexPairs = uniqueKeyValuePairs(
    genPlutusData(depth > 1 ? depth - 2 : 0),
    2
  );

  return FastCheck.oneof(bigIntPairs, bytesPairs, complexPairs).map((pairs) =>
    map(pairs)
  );
};

/**
 * FastCheck generators for PlutusData types
 *
 * @since 2.0.0
 * @category generators
 */
export const generator = genPlutusData(3);

export const CBORBytesSchema = (
  options: CBOR.CBOREncodingOptions = CBOR.DEFAULT_ENCODING_OPTIONS
) =>
  Schema.transformOrFail(
    Schema.typeSchema(Bytes.BytesSchema),
    PlutusDataSchema,
    {
      strict: true,
      encode: (_, __, ___, toA) =>
        Effect.gen(function* () {
          const bytes = yield* toCborBytes(toA, options);
          return bytes;
        }).pipe(
          Effect.mapError(
            (error: CBOR.CBORError) =>
              new ParseResult.Type(PlutusDataSchema.ast, toA, error.message)
          )
        ),
      decode: (_, __, ast, fromA) =>
        Effect.gen(function* () {
          const cborDecoded = yield* ParseResult.decode(
            CBOR.CBORBytesSchema(options)
          )(fromA);
          return convertCBORToPlutusData(cborDecoded);
        }),
    }
  );

export const CBORHexSchema = (
  options: CBOR.CBOREncodingOptions = CBOR.DEFAULT_ENCODING_OPTIONS
) =>
  Schema.transformOrFail(Bytes.HexSchema, PlutusDataSchema, {
    strict: true,
    encode: (_, __, ___, toA) =>
      Effect.gen(function* () {
        const bytes = yield* toCborBytes(toA, options);
        return Bytes.Encode.hex(bytes);
      }).pipe(
        Effect.mapError(
          (error: CBOR.CBORError) =>
            new ParseResult.Type(PlutusDataSchema.ast, toA, error.message)
        )
      ),
    decode: (_, __, ast, fromA) =>
      Effect.gen(function* () {
        const bytes = Bytes.Decode.hex(fromA);
        const cborDecoded = yield* ParseResult.decode(
          CBOR.CBORBytesSchema(options)
        )(bytes);
        return convertCBORToPlutusData(cborDecoded);
      }),
  });

export const Encode = {
  cborHex: (
    data: PlutusData,
    options: CBOR.CBOREncodingOptions = CBOR.DEFAULT_ENCODING_OPTIONS
  ) => Effect.runSync(Schema.encode(CBORHexSchema(options))(data)),
  cborBytes: (
    data: PlutusData,
    options: CBOR.CBOREncodingOptions = CBOR.DEFAULT_ENCODING_OPTIONS
  ) => Effect.runSync(Schema.encode(CBORBytesSchema(options))(data)),
};

export const Decode = {
  cborHex: (
    data: string,
    options: CBOR.CBOREncodingOptions = CBOR.DEFAULT_ENCODING_OPTIONS
  ) => Effect.runSync(Schema.decode(CBORHexSchema(options))(data)),
  cborBytes: (
    data: Uint8Array,
    options: CBOR.CBOREncodingOptions = CBOR.DEFAULT_ENCODING_OPTIONS
  ) => Effect.runSync(Schema.decode(CBORBytesSchema(options))(data)),
};

export const EncodeEither = {
  cborHex: (
    data: PlutusData,
    options: CBOR.CBOREncodingOptions = CBOR.DEFAULT_ENCODING_OPTIONS
  ) => Schema.encodeEither(CBORHexSchema(options))(data),
  cborBytes: (
    data: PlutusData,
    options: CBOR.CBOREncodingOptions = CBOR.DEFAULT_ENCODING_OPTIONS
  ) => Schema.encodeEither(CBORBytesSchema(options))(data),
};

export const DecodeEither = {
  cborHex: (
    data: string,
    options: CBOR.CBOREncodingOptions = CBOR.DEFAULT_ENCODING_OPTIONS
  ) => Schema.decodeEither(CBORHexSchema(options))(data),
  cborBytes: (
    data: Uint8Array,
    options: CBOR.CBOREncodingOptions = CBOR.DEFAULT_ENCODING_OPTIONS
  ) => Schema.decodeEither(CBORBytesSchema(options))(data),
};

export const EncodeEffect = {
  cborHex: (
    data: PlutusData,
    options: CBOR.CBOREncodingOptions = CBOR.DEFAULT_ENCODING_OPTIONS
  ) => Schema.encode(CBORHexSchema(options))(data),
  cborBytes: (
    data: PlutusData,
    options: CBOR.CBOREncodingOptions = CBOR.DEFAULT_ENCODING_OPTIONS
  ) => Schema.encode(CBORBytesSchema(options))(data),
};

export const DecodeEffect = {
  cborHex: (
    data: string,
    options: CBOR.CBOREncodingOptions = CBOR.DEFAULT_ENCODING_OPTIONS
  ) => Schema.decode(CBORHexSchema(options))(data),
  cborBytes: (
    data: Uint8Array,
    options: CBOR.CBOREncodingOptions = CBOR.DEFAULT_ENCODING_OPTIONS
  ) => Schema.decode(CBORBytesSchema(options))(data),
};
