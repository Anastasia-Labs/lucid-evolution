import { Data, Effect, ParseResult, Schema, FastCheck } from "effect";
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
export class DataError extends Data.TaggedError("DataError")<{
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
  readonly data: readonly T[];
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
  readonly items: readonly PlutusData[];
}

/**
 * PlutusBigInt type for plutus big integers
 *
 * @since 2.0.0
 * @category model
 */
export interface PlutusBigInt {
  readonly _tag: "Int";
  readonly value: bigint;
}

/**
 * PlutusBytes type for plutus bounded bytes
 *
 * @since 2.0.0
 * @category model
 */
export interface PlutusBytes {
  readonly _tag: "BytesArray";
  readonly bytes: string; // HexSchema
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
  data: Schema.Array(
    Schema.suspend((): Schema.Schema<PlutusData> => PlutusDataSchema),
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
    }),
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
  items: Schema.Array(
    Schema.suspend((): Schema.Schema<PlutusData> => PlutusDataSchema),
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
 * - `int` covers integers that fit in CBOR major types 0 and 1 (±2^63)
 * - `big_uint` (tag 2) covers large positive integers that don't fit in 64 bits
 * - `big_nint` (tag 3) covers large negative integers that don't fit in 64 bits
 *
 * @category schemas
 *
 * @since 2.0.0
 */
export const PlutusBigIntSchema = Schema.TaggedStruct("Int", {
  value: Schema.BigIntFromSelf,
});

/**
 * Schema for PlutusBytes data type
 *
 * @category schemas
 *
 * @since 2.0.0
 */
export const PlutusBytesSchema = Schema.TaggedStruct("BytesArray", {
  bytes: Bytes.HexSchemaLenient,
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
  PlutusBytesSchema,
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
    data,
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
  entries: Array<{ key: PlutusData; value: PlutusData }>,
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
export const list = (items: PlutusData[]): PlutusList =>
  PlutusListSchema.make({
    items,
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
export const int = (value: bigint): PlutusBigInt =>
  PlutusBigIntSchema.make({
    value,
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
    bytes,
  });

/**
 * Recursively converts PlutusData to its CBOR byte representation.
 *
 * @example
 * import { Data } from "@lucid-evolution/experimental";
 *
 * const constr = Data.constr(0, []);
 * const cborBytes = Data.toCborBytes(constr);
 * // cborBytes is now a Uint8Array
 *
 * @since 2.0.0
 * @category encoding
 */
export const toCborBytes = (data: PlutusData): Uint8Array => {
  const encodeTag = (tag: number, value: Uint8Array): Uint8Array => {
    const chunks: Uint8Array[] = [];

    // Encode tag number using CBOR tag format
    if (tag < 24) {
      chunks.push(new Uint8Array([0xc0 + tag])); // Major type 6, additional info tag
    } else if (tag < 256) {
      chunks.push(new Uint8Array([0xd8, tag])); // Major type 6, 1-byte tag
    } else if (tag < 65536) {
      chunks.push(new Uint8Array([0xd9, tag >> 8, tag & 0xff])); // Major type 6, 2-byte tag
    } else {
      throw new DataError({ message: `Tag ${tag} too large` });
    }

    chunks.push(value);

    // Combine chunks
    const totalLength = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
    const result = new Uint8Array(totalLength);
    let offset = 0;
    for (const chunk of chunks) {
      result.set(chunk, offset);
      offset += chunk.length;
    }

    return result;
  };

  const encodeIndefiniteMap = (
    entries: readonly {
      readonly key: PlutusData;
      readonly value: PlutusData;
    }[],
  ): Uint8Array => {
    const chunks: Uint8Array[] = [];

    // Indefinite map start
    chunks.push(new Uint8Array([0xbf])); // 0b101_11111

    // Encode each key-value pair
    for (const { key, value } of entries) {
      chunks.push(toCborBytes(key));
      chunks.push(toCborBytes(value));
    }

    // Indefinite map end
    chunks.push(new Uint8Array([0xff]));

    // Combine chunks
    const totalLength = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
    const result = new Uint8Array(totalLength);
    let offset = 0;
    for (const chunk of chunks) {
      result.set(chunk, offset);
      offset += chunk.length;
    }

    return result;
  };

  // Handle each PlutusData type directly
  switch (data._tag) {
    case "Constr": {
      // Encode all fields recursively
      const encodedFields = data.data.map(toCborBytes);

      // Create indefinite array with encoded fields
      const chunks: Uint8Array[] = [];
      chunks.push(new Uint8Array([0x9f])); // Indefinite array start
      encodedFields.forEach((field) => chunks.push(field));
      chunks.push(new Uint8Array([0xff])); // Indefinite array end

      // Combine chunks
      const totalLength = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
      const arrayBytes = new Uint8Array(totalLength);
      let offset = 0;
      for (const chunk of chunks) {
        arrayBytes.set(chunk, offset);
        offset += chunk.length;
      }

      if (data.index >= 0 && data.index < 7) {
        // Use CBOR tags 121-127 for constructor indices 0-6
        const tagValue = 121 + Number(data.index);
        return encodeTag(tagValue, arrayBytes);
      } else {
        // Use CBOR tag 102 for general constructor with [index, fields]
        const generalArray: Uint8Array[] = [];
        generalArray.push(new Uint8Array([0x9f])); // Indefinite array start
        generalArray.push(CBOR.Encode().bytes(data.index)); // Index
        encodedFields.forEach((field) => generalArray.push(field)); // Fields
        generalArray.push(new Uint8Array([0xff])); // Indefinite array end

        const totalLen = generalArray.reduce(
          (sum, chunk) => sum + chunk.length,
          0,
        );
        const generalBytes = new Uint8Array(totalLen);
        let off = 0;
        for (const chunk of generalArray) {
          generalBytes.set(chunk, off);
          off += chunk.length;
        }

        return encodeTag(102, generalBytes);
      }
    }
    case "Map":
      // Use indefinite map encoding for PlutusMap
      return encodeIndefiniteMap(data.entries);
    case "List": {
      // Encode all items recursively and create indefinite array
      const encodedItems = data.items.map(toCborBytes);
      const chunks: Uint8Array[] = [];
      chunks.push(new Uint8Array([0x9f])); // Indefinite array start
      encodedItems.forEach((item) => chunks.push(item));
      chunks.push(new Uint8Array([0xff])); // Indefinite array end

      // Combine chunks
      const totalLength = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
      const result = new Uint8Array(totalLength);
      let offset = 0;
      for (const chunk of chunks) {
        result.set(chunk, offset);
        offset += chunk.length;
      }
      return result;
    }
    case "Int":
      if (
        data.value >= Number.MIN_SAFE_INTEGER &&
        data.value <= Number.MAX_SAFE_INTEGER
      ) {
        return CBOR.Encode().bytes(Number(data.value));
      }
      return CBOR.Encode().bytes(data.value);
    case "BytesArray":
      // Convert hex string to Uint8Array and encode as CBOR bytes
      return CBOR.Encode().bytes(Bytes.DecodeLenient.hex(data.bytes));
    default:
      throw new DataError({
        message: `Exhaustive check failed: Unhandled PlutusData case`,
      });
  }
};

type PlutusDataCDDL =
  | {
      readonly tag: 121 | 122 | 123 | 124 | 125 | 126 | 127;
      readonly value: readonly PlutusDataCDDL[];
    }
  | { readonly value: readonly [bigint, ...(readonly PlutusDataCDDL[])] }
  | readonly PlutusDataCDDL[]
  | ReadonlyMap<PlutusDataCDDL, PlutusDataCDDL>
  | number
  | bigint
  | Uint8Array;

const Constr121To127CDDL = Schema.Struct({
  tag: Schema.Literal(121, 122, 123, 124, 125, 126, 127),
  value: Schema.Array(
    Schema.suspend((): Schema.Schema<PlutusDataCDDL> => PlutusDataCDDL),
  ),
}).annotations({
  identifier: "Constr121To127CDDL",
});

const Constr102CDDL = Schema.Struct({
  value: Schema.Tuple(
    [Schema.BigIntFromSelf],
    Schema.suspend((): Schema.Schema<PlutusDataCDDL> => PlutusDataCDDL),
  ),
}).annotations({
  identifier: "Constr102CDDL",
});

const ListCDDL = Schema.Array(
  Schema.suspend((): Schema.Schema<PlutusDataCDDL> => PlutusDataCDDL),
).annotations({
  identifier: "ListCDDL",
});

const MapCDDL = Schema.ReadonlyMapFromSelf({
  key: Schema.suspend((): Schema.Schema<PlutusDataCDDL> => PlutusDataCDDL),
  value: Schema.suspend((): Schema.Schema<PlutusDataCDDL> => PlutusDataCDDL),
}).annotations({
  identifier: "MapCDDL",
});

const PlutusDataCDDL = Schema.Union(
  Schema.Union(Constr121To127CDDL, Constr102CDDL),
  ListCDDL,
  MapCDDL,
  Schema.Number,
  Schema.BigIntFromSelf,
  Schema.Uint8ArrayFromSelf,
);

const parsePlutusData = (decoded: PlutusDataCDDL): PlutusData => {
  if (Schema.is(Constr121To127CDDL)(decoded)) {
    const { tag, value } = decoded;
    const fields = value.map(parsePlutusData);
    return constr(globalThis.BigInt(tag - 121), fields);
  }
  if (Schema.is(Constr102CDDL)(decoded)) {
    const [index, ...fields] = decoded.value;
    return constr(index, fields.map(parsePlutusData));
  }
  if (Schema.is(ListCDDL)(decoded)) {
    return list(decoded.map(parsePlutusData));
  }

  if (Schema.is(MapCDDL)(decoded)) {
    const entries = Array.from(decoded.entries()).map(([key, value]) => ({
      key: parsePlutusData(key),
      value: parsePlutusData(value),
    }));
    return map(entries);
  }
  if (typeof decoded === "number") {
    return {
      _tag: "Int",
      value: globalThis.BigInt(decoded),
    };
  }
  if (typeof decoded === "bigint") {
    return {
      _tag: "Int",
      value: decoded,
    };
  }
  if (decoded instanceof Uint8Array) {
    return bytearray(Bytes.EncodeLenient.hex(decoded));
  }

  throw new DataError({
    message: `Unexpected decoded type: ${typeof decoded}`,
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
  },
): T => {
  const specificCase = cases[Number(constr.index)];
  if (specificCase) {
    return specificCase(constr.data);
  }
  return cases._(Number(constr.index), constr.data);
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
      }>,
    ) => T;
    PlutusList: (items: readonly PlutusData[]) => T;
    PlutusBigInt: (value: bigint) => T;
    PlutusBytes: (bytes: string) => T;
    Constr: (constr: Constr<PlutusData>) => T;
  },
): T => {
  switch (data._tag) {
    case "Map":
      return cases.PlutusMap(data.entries);
    case "List":
      return cases.PlutusList(data.items);
    case "Int":
      return cases.PlutusBigInt(data.value);
    case "BytesArray":
      return cases.PlutusBytes(data.bytes);
    case "Constr":
      return cases.Constr(data);
    default:
      throw new DataError({
        message: `Exhaustive check failed: Unhandled PlutusData case`,
      });
  }
};

export const CBORBytesSchema = Schema.transformOrFail(
  Schema.typeSchema(Bytes.BytesSchema),
  PlutusDataSchema,
  {
    strict: true,
    encode: (toI) => ParseResult.succeed(toCborBytes(toI)),
    decode: (fromA) =>
      Effect.gen(function* () {
        const cborDecoded = CBOR.Decode.bytes(fromA);
        const plutusDataCDDL =
          yield* ParseResult.decodeUnknown(PlutusDataCDDL)(cborDecoded);
        return yield* ParseResult.succeed(parsePlutusData(plutusDataCDDL));
      }),
  },
);

export const CBORHexSchema = Schema.transformOrFail(
  Bytes.HexSchema,
  PlutusDataSchema,
  {
    strict: true,
    encode: (toI) => ParseResult.succeed(Bytes.Encode.hex(toCborBytes(toI))),
    decode: (fromA) =>
      Effect.gen(function* () {
        const bytes = Bytes.Decode.hex(fromA);
        const cborDecoded = CBOR.Decode.bytes(bytes);
        const plutusDataCDDL =
          yield* ParseResult.decodeUnknown(PlutusDataCDDL)(cborDecoded);
        return yield* ParseResult.succeed(parsePlutusData(plutusDataCDDL));
      }),
  },
);

export const Encode = {
  cborHex: Schema.encodeSync(CBORHexSchema),
  cborBytes: Schema.encodeSync(CBORBytesSchema),
};

export const Decode = {
  cborHex: Schema.decodeSync(CBORHexSchema),
  cborBytes: Schema.decodeSync(CBORBytesSchema),
};

export const EncodeEither = {
  cborHex: Schema.encodeEither(CBORHexSchema),
  cborBytes: Schema.encodeEither(CBORBytesSchema),
};

export const DecodeEither = {
  cborHex: Schema.decodeEither(CBORHexSchema),
  cborBytes: Schema.decodeEither(CBORBytesSchema),
};

export const EncodeEffect = {
  cborHex: Schema.encode(CBORHexSchema),
  cborBytes: Schema.encode(CBORBytesSchema),
};

export const DecodeEffect = {
  cborHex: Schema.decode(CBORHexSchema),
  cborBytes: Schema.decode(CBORBytesSchema),
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
  depth: number = 3,
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
    genPlutusMap(depth - 1),
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
  depth: number,
): FastCheck.Arbitrary<Constr<PlutusData>> =>
  FastCheck.tuple(
    FastCheck.bigInt({ min: 0n, max: 2n ** 64n - 1n }),
    FastCheck.array(genPlutusData(depth), {
      minLength: 0,
      maxLength: 5,
    }),
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
    maxSize: number,
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
      },
    ).map((pairs) => pairs.map(([key, value]) => ({ key, value })));

  // PlutusBigInt keys (more frequent)
  const bigIntPairs = uniqueKeyValuePairs(genPlutusBigInt(), 3);

  // PlutusBytes keys (medium frequency)
  const bytesPairs = uniqueKeyValuePairs(genPlutusBytes(), 3);

  // Complex keys (less frequent)
  const complexPairs = uniqueKeyValuePairs(
    genPlutusData(depth > 1 ? depth - 2 : 0),
    2,
  );

  return FastCheck.oneof(bigIntPairs, bytesPairs, complexPairs).map((pairs) =>
    map(pairs),
  );
};

/**
 * FastCheck generators for PlutusData types
 *
 * @since 2.0.0
 * @category generators
 */
export const generator = genPlutusData(3);
