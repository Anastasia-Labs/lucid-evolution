import { Data, Effect, FastCheck, ParseResult, pipe, Schema } from "effect";
import * as CBOR from "./CBOR.js";
import * as Hex from "./Hex.js";

import * as ShelleyTransactionOutput from "./ShelleyTransactionOutput.js";
import * as BabbageTransactionOutput from "./BabbageTransactionOutput.js";

/**
 * CDDL specs (Conway era)
 * transaction_output = shelley_transaction_output / babbage_transaction_output
 *
 * value = coin / [coin, multiasset<positive_coin>]
 * coin = uint
 */

/**
 * Transaction output union type matching CDDL: shelley_transaction_output / babbage_transaction_output
 *
 * @since 2.0.0
 * @category schemas
 */
export const TransactionOutput = Schema.Union(
  ShelleyTransactionOutput.ShelleyTransactionOutput,
  BabbageTransactionOutput.BabbageTransactionOutput,
);

/**
 * Error thrown when transaction output operations fail
 *
 * @since 2.0.0
 * @category errors
 */
export class TransactionOutputError extends Data.TaggedError(
  "TransactionOutputError",
)<{
  message: string;
  cause?: unknown;
}> {}

/**
 * Check if the given value is a valid TransactionOutput
 *
 * @since 2.0.0
 * @category predicates
 */
export const isTransactionOutput = Schema.is(TransactionOutput);

/**
 * Schema for transforming between CBOR bytes and TransactionOutput
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const CBORBytes = Schema.transformOrFail(
  Schema.Uint8ArrayFromSelf.annotations({
    identifier: "CBORBytes",
  }),
  TransactionOutput,
  {
    strict: true,
    encode: (toI, options, ast, toA) => {
      switch (toA._tag) {
        case "ShelleyTransactionOutput":
          return ParseResult.encode(ShelleyTransactionOutput.CBORBytes)(toA);
        case "BabbageTransactionOutput":
          return ParseResult.encode(BabbageTransactionOutput.CBORBytes)(toA);
      }
    },
    decode: (fromA, options, ast, fromI) =>
      Effect.gen(function* () {
        const decoded = yield* CBOR.decodeBytes(fromA).pipe(
          Effect.mapError(
            (error) => new ParseResult.Type(ast, fromA, error.message),
          ),
        );

        if (Array.isArray(decoded)) {
          return yield* ParseResult.decodeUnknown(
            ShelleyTransactionOutput.CBORBytes,
          )(fromA);
        } else if (
          decoded instanceof Map ||
          (typeof decoded === "object" && decoded !== null)
        ) {
          // Map/Object format indicates Babbage transaction output
          return yield* ParseResult.decodeUnknown(
            BabbageTransactionOutput.CBORBytes,
          )(fromA);
        } else {
          return yield* ParseResult.fail(
            new ParseResult.Type(
              ast,
              fromA,
              "Unknown transaction output format",
            ),
          );
        }
      }),
  },
);

/**
 * Schema for transforming between CBOR hex and TransactionOutput
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const CBORHex = Schema.transformOrFail(
  Hex.HexString.pipe(Schema.typeSchema).annotations({
    identifier: "CBORHex",
  }),
  TransactionOutput,
  {
    strict: true,
    encode: (toI, options, ast, toA) =>
      pipe(ParseResult.encode(CBORBytes)(toA), Effect.map(Hex.fromBytes)),
    decode: (fromA, options, ast, fromI) =>
      pipe(Hex.toBytes(fromA), ParseResult.decode(CBORBytes)),
  },
);

/**
 * Check if two TransactionOutput instances are equal.
 *
 * @since 2.0.0
 * @category equality
 */
export const equals = (
  a: typeof TransactionOutput.Type,
  b: typeof TransactionOutput.Type,
): boolean => {
  if (a._tag !== b._tag) {
    return false;
  }

  switch (a._tag) {
    case "ShelleyTransactionOutput":
      return ShelleyTransactionOutput.equals(
        a,
        b as ShelleyTransactionOutput.ShelleyTransactionOutput,
      );
    case "BabbageTransactionOutput":
      return BabbageTransactionOutput.equals(
        a,
        b as BabbageTransactionOutput.BabbageTransactionOutput,
      );
  }
};

/**
 * Generator for creating random TransactionOutput instances for testing
 *
 * @since 2.0.0
 * @category generators
 */
export const generator = FastCheck.oneof(
  ShelleyTransactionOutput.generator,
  BabbageTransactionOutput.generator,
);
