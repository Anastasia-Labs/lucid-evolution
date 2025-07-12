import {
  Data,
  Effect,
  FastCheck,
  Inspectable,
  ParseResult,
  pipe,
  Schema,
} from "effect";
import * as CBOR from "./CBOR.js";
import * as Hex from "./Hex.js";
import * as DatumHash from "./DatumHash.js";
import { tag } from "effect/Schema";

/**
 * CDDL specs
 * datum_option = [0, hash32] / [1, data]
 */

/**
 * Error thrown when datum option operations fail
 *
 * @since 2.0.0
 * @category errors
 */
export class DatumOptionError extends Data.TaggedError("DatumOptionError")<{
  message: string;
  cause?: unknown;
}> {}

/**
 * Schema representing inline datum data
 *
 * @since 2.0.0
 * @category schemas
 */
export class InlineDatum extends Schema.TaggedClass<InlineDatum>()(
  "InlineDatum",
  {
    data: Schema.Uint8ArrayFromSelf, // Raw CBOR data
  },
) {
  [Inspectable.NodeInspectSymbol]() {
    return {
      _tag: "InlineDatum",
      data: this.data,
    };
  }
}

/**
 * Schema for transforming between Uint8Array and InlineDatum
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const InlineDatumBytes = Schema.transform(
  Schema.Uint8ArrayFromSelf,
  InlineDatum.pipe(Schema.asSchema),
  {
    strict: true,
    encode: (_, datum) => datum.data,
    decode: (data) => new InlineDatum({ data }),
  },
);

/**
 * Union type representing datum option types.
 *
 * @since 2.0.0
 * @category model
 */
export const DatumOption = Schema.Union(DatumHash.DatumHash, InlineDatum);

/**
 * Type representing a datum option.
 *
 * @since 2.0.0
 * @category model
 */
export type DatumOption = typeof DatumOption.Type;

/**
 * Check if the given value is a valid DatumOption
 *
 * @since 2.0.0
 * @category predicates
 */
export const isDatumOption = Schema.is(DatumOption);

/**
 * Schema for transforming between CBOR bytes and DatumOption
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const CBORBytes = Schema.transformOrFail(
  Schema.Uint8ArrayFromSelf.annotations({
    identifier: "CBORBytes",
  }),
  DatumOption,
  {
    strict: true,
    encode: (toI, options, ast, toA) => {
      switch (toA._tag) {
        case "DatumHash":
          return ParseResult.succeed(
            CBOR.encodeAsBytesOrThrow([0, Hex.toBytes(toA.hash)]),
          );
        case "InlineDatum":
          return ParseResult.succeed(CBOR.encodeAsBytesOrThrow([1, toA.data]));
        default:
          return ParseResult.fail(
            new ParseResult.Type(
              ast,
              toA,
              `Unknown DatumOption tag: ${(toA as any)._tag}`,
            ),
          );
      }
    },
    decode: (fromI, options, ast, fromA) =>
      pipe(
        CBOR.decodeBytes(fromA),
        Effect.mapError(
          (error) => new ParseResult.Type(ast, fromI, error.message),
        ),
        Effect.flatMap((a) =>
          ParseResult.decode(
            Schema.Tuple(
              Schema.Literal(0, 1),
              Schema.Uint8ArrayFromSelf,
            ).annotations({
              identifier: "DatumOptionTuple",
            }),
          )(a),
        ),
        Effect.flatMap(([tag, bytesDecoded]) =>
          Effect.gen(function* () {
            switch (tag) {
              case 0:
                return yield* ParseResult.decode(DatumHash.Bytes)(bytesDecoded);
              case 1:
                return yield* ParseResult.decode(InlineDatumBytes)(
                  bytesDecoded,
                );
            }
          }),
        ),
      ),
  },
);

/**
 * Schema for transforming between CBOR hex and DatumOption
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const CBORHex = Schema.transformOrFail(
  Hex.HexString.pipe(Schema.typeSchema).annotations({
    identifier: "CBORHex",
  }),
  DatumOption,
  {
    strict: true,
    encode: (toI, options, ast, toA) =>
      pipe(ParseResult.encode(CBORBytes)(toA), Effect.map(Hex.fromBytes)),
    decode: (fromA, options, ast) =>
      pipe(Hex.toBytes(fromA), ParseResult.decode(CBORBytes)),
  },
);

/**
 * Checks if two datum options are equal.
 *
 * @example
 * import { DatumOption, DatumHash } from "@evolution-sdk/experimental";
 * import { Schema } from "effect";
 * import assert from "assert";
 *
 * const hash1 = Schema.decodeUnknownSync(DatumHash.HexString)(
 *   "5160f88b929bf8a6c57c285b889488f9137c0ef3cfd0bcf408a10020e69146d5"
 * );
 * const hash2 = Schema.decodeUnknownSync(DatumHash.HexString)(
 *   "5160f88b929bf8a6c57c285b889488f9137c0ef3cfd0bcf408a10020e69146d5"
 * );
 * const inline1 = new DatumOption.InlineDatum({
 *   data: new Uint8Array([1, 2, 3])
 * });
 *
 * assert(DatumOption.equals(hash1, hash2) === true);
 * assert(DatumOption.equals(hash1, inline1) === false);
 *
 * @since 2.0.0
 * @category utils
 */
export const equals = (a: DatumOption, b: DatumOption): boolean => {
  if (a._tag !== b._tag) {
    return false;
  }
  switch (a._tag) {
    case "DatumHash":
      return DatumHash.equals(a, b as DatumHash.DatumHash);
    case "InlineDatum":
      const bInline = b as InlineDatum;
      return (
        a.data.length === bInline.data.length &&
        a.data.every((byte, index) => byte === bInline.data[index])
      );
  }
};

/**
 * FastCheck generator for datum options.
 *
 * @since 2.0.0
 * @category testing
 */
export const generator = FastCheck.oneof(
  DatumHash.generator,
  FastCheck.uint8Array({ minLength: 1, maxLength: 100 }).map(
    (data) => new InlineDatum({ data }),
  ),
);
