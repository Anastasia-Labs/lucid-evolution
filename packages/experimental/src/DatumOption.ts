import { Schema, Data, FastCheck, ParseResult, Effect } from "effect";
import * as Hash32 from "./Hash32.js";
import * as PlutusData from "./Data.js";
import * as CBOR from "./CBOR.js";
import * as Bytes from "./Bytes.js";

/**
 * Error class for DatumOption related operations.
 *
 * @example
 * import { DatumOption } from "@evolution-sdk/experimental";
 * import assert from "assert";
 *
 * const error = new DatumOption.DatumOptionError({ message: "Invalid datum option" });
 * assert(error.message === "Invalid datum option");
 *
 * @since 2.0.0
 * @category errors
 */
export class DatumOptionError extends Data.TaggedError("DatumOptionError")<{
  message?: string;
  cause?: unknown;
}> {}

/**
 * Schema for DatumHash variant of DatumOption.
 * Represents a reference to datum data stored elsewhere via its hash.
 *
 * @since 2.0.0
 * @category schemas
 */
export class DatumHash extends Schema.TaggedClass<DatumHash>()("DatumHash", {
  hash: Hash32.HexSchema,
}) {}

/**
 * Schema for InlineDatum variant of DatumOption.
 * Represents inline plutus data embedded directly in the transaction output.
 *
 * @since 2.0.0
 * @category schemas
 */
export class InlineDatum extends Schema.TaggedClass<InlineDatum>()(
  "InlineDatum",
  {
    data: PlutusData.DataSchema,
  },
) {}

/**
 * Schema for DatumOption representing optional datum information in transaction outputs.
 *
 * CDDL: datum_option = [0, hash32// 1, data]
 *
 * Where:
 * - [0, hash32] represents a datum hash reference
 * - [1, data] represents inline plutus data
 *
 * @since 2.0.0
 * @category schemas
 */
export const DatumOptionSchema = Schema.Union(
  DatumHash,
  InlineDatum,
).annotations({
  identifier: "DatumOption",
});

/**
 * Type alias for DatumOption representing optional datum information.
 * Can be either a hash reference to datum data or inline plutus data.
 *
 * @since 2.0.0
 * @category model
 */
export type DatumOption = typeof DatumOptionSchema.Type;

/**
 * Create a DatumOption with a datum hash.
 *
 * @example
 * import { DatumOption } from "@evolution-sdk/experimental";
 *
 * const datumHash = "a0b1c2d3e4f5678901234567890abcdef0123456789abcdef0123456789abcdef";
 * const datumOption = DatumOption.fromHash(datumHash);
 *
 * @since 2.0.0
 * @category constructors
 */
export const fromHash = (hash: string): DatumOption => new DatumHash({ hash });

/**
 * Create a DatumOption with inline data.
 *
 * @example
 * import { DatumOption, Data } from "@evolution-sdk/experimental";
 *
 * const plutusData = Data.fromNumber(42n);
 * const datumOption = DatumOption.fromInlineData(plutusData);
 *
 * @since 2.0.0
 * @category constructors
 */
export const fromInlineData = (data: PlutusData.Data): DatumOption =>
  new InlineDatum({ data });

/**
 * Check if a DatumOption is a datum hash.
 *
 * @example
 * import { DatumOption } from "@evolution-sdk/experimental";
 *
 * const datumOption = DatumOption.fromHash("a0b1c2d3...");
 * console.log(DatumOption.isDatumHash(datumOption)); // true
 *
 * @since 2.0.0
 * @category predicates
 */
export const isDatumHash = (
  datumOption: DatumOption,
): datumOption is DatumHash => datumOption._tag === "DatumHash";

/**
 * Check if a DatumOption is inline data.
 *
 * @example
 * import { DatumOption, Data } from "@evolution-sdk/experimental";
 *
 * const plutusData = Data.fromNumber(42n);
 * const datumOption = DatumOption.fromInlineData(plutusData);
 * console.log(DatumOption.isInlineDatum(datumOption)); // true
 *
 * @since 2.0.0
 * @category predicates
 */
export const isInlineDatum = (
  datumOption: DatumOption,
): datumOption is InlineDatum => datumOption._tag === "InlineDatum";

/**
 * Get the hash from a DatumHash, or undefined if it's not a DatumHash.
 *
 * @example
 * import { DatumOption } from "@evolution-sdk/experimental";
 *
 * const datumOption = DatumOption.fromHash("a0b1c2d3...");
 * const hash = DatumOption.getHash(datumOption);
 * console.log(hash); // "a0b1c2d3..."
 *
 * @since 2.0.0
 * @category transformation
 */
export const getHash = (datumOption: DatumOption): string | undefined =>
  isDatumHash(datumOption) ? datumOption.hash : undefined;

/**
 * Get the data from an InlineDatum, or undefined if it's not an InlineDatum.
 *
 * @example
 * import { DatumOption, Data } from "@evolution-sdk/experimental";
 *
 * const plutusData = Data.fromNumber(42n);
 * const datumOption = DatumOption.fromInlineData(plutusData);
 * const data = DatumOption.getData(datumOption);
 * console.log(data); // PlutusData representing 42n
 *
 * @since 2.0.0
 * @category transformation
 */
export const getData = (
  datumOption: DatumOption,
): PlutusData.Data | undefined =>
  isInlineDatum(datumOption) ? datumOption.data : undefined;

/**
 * FastCheck generator for DatumOption instances.
 *
 * @since 2.0.0
 * @category generators
 */
export const generator = FastCheck.oneof(
  FastCheck.record({
    _tag: FastCheck.constant("DatumHash" as const),
    hash: FastCheck.hexaString({ minLength: 64, maxLength: 64 }),
  }).map((props) => new DatumHash(props)),
  FastCheck.record({
    _tag: FastCheck.constant("InlineDatum" as const),
    data: PlutusData.genPlutusData(),
  }).map((props) => new InlineDatum(props)),
);

/**
 * CDDL schema for DatumOption.
 * datum_option = [0, hash32// 1, data]
 *
 * Where:
 * - [0, hash32] represents a datum hash (tag 0 with 32-byte hash)
 * - [1, data] represents inline data (tag 1 with CBOR-encoded plutus data)
 *
 * @since 2.0.0
 * @category schemas
 */
export const DatumOptionCDDLSchema = Schema.transformOrFail(
  Schema.Union(
    Schema.Tuple(Schema.Literal(0n), CBOR.ByteArray), // [0, hash32]
    Schema.Tuple(Schema.Literal(1n), CBOR.CBORSchema), // [1, data] - data as CBOR bytes
  ),
  Schema.typeSchema(DatumOptionSchema),
  {
    strict: true,
    encode: (toA) =>
      Effect.gen(function* () {
        const result =
          toA._tag === "DatumHash"
            ? ([
                0n,
                yield* ParseResult.decode(Bytes.BytesSchema)(toA.hash),
              ] as const) // Encode as [0, hash32]
            : ([1n, PlutusData.plutusDataToCBORValue(toA.data)] as const); // Encode as [1, data]
        return result;
      }),
    decode: ([tag, value], _, ast) =>
      Effect.gen(function* () {
        if (tag === 0n) {
          // Decode as DatumHash
          const hash = yield* ParseResult.encode(Bytes.BytesSchema)(value);
          return new DatumHash({ hash });
        } else if (tag === 1n) {
          // Decode as InlineDatum
          return new InlineDatum({
            data: PlutusData.cborValueToPlutusData(value),
          });
        }
        return yield* ParseResult.fail(
          new ParseResult.Type(
            ast,
            [tag, value],
            `Invalid DatumOption tag: ${tag}. Expected 0 or 1.`,
          ),
        );
      }),
  },
);

/**
 * CBOR bytes transformation schema for DatumOption.
 * Transforms between Uint8Array and DatumOption using CBOR encoding.
 *
 * @since 2.0.0
 * @category schemas
 */
export const CBORBytesSchema = (
  options: CBOR.CodecOptions = CBOR.DEFAULT_OPTIONS,
) =>
  Schema.compose(
    CBOR.CBORBytesSchema(options), // Uint8Array → CBOR
    DatumOptionCDDLSchema, // CBOR → DatumOption
  );

/**
 * CBOR hex transformation schema for DatumOption.
 * Transforms between hex string and DatumOption using CBOR encoding.
 *
 * @since 2.0.0
 * @category schemas
 */
export const CBORHexSchema = (
  options: CBOR.CodecOptions = CBOR.DEFAULT_OPTIONS,
) =>
  Schema.compose(
    Bytes.BytesSchema, // string → Uint8Array
    CBORBytesSchema(options), // Uint8Array → DatumOption
  );

/**
 * Codec providing all encoding/decoding variants for DatumOption.
 *
 * @since 2.0.0
 * @category codecs
 */
export const Codec = (options: CBOR.CodecOptions = CBOR.DEFAULT_OPTIONS) => ({
  Encode: {
    cborBytes: Schema.encodeSync(CBORBytesSchema(options)),
    cborHex: Schema.encodeSync(CBORHexSchema(options)),
  },
  Decode: {
    cborBytes: Schema.decodeUnknownSync(CBORBytesSchema(options)),
    cborHex: Schema.decodeUnknownSync(CBORHexSchema(options)),
  },
  EncodeEither: {
    cborBytes: Schema.encodeEither(CBORBytesSchema(options)),
    cborHex: Schema.encodeEither(CBORHexSchema(options)),
  },
  DecodeEither: {
    cborBytes: Schema.decodeUnknownEither(CBORBytesSchema(options)),
    cborHex: Schema.decodeUnknownEither(CBORHexSchema(options)),
  },
  EncodeEffect: {
    cborBytes: Schema.encode(CBORBytesSchema(options)),
    cborHex: Schema.encode(CBORHexSchema(options)),
  },
  DecodeEffect: {
    cborBytes: Schema.decode(CBORBytesSchema(options)),
    cborHex: Schema.decode(CBORHexSchema(options)),
  },
});
