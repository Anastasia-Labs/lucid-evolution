import {
  Data,
  Effect,
  FastCheck,
  Inspectable,
  ParseResult,
  pipe,
  Schema,
} from "effect";
import { Bytes } from "../index.js";
import * as CBOR from "../CBOR.js";
import * as Hex from "../Hex.js";

import * as ShelleyTransactionOutput from "./ShelleyOutput.js";
import * as BabbageTransactionOutput from "./BabbageOutput.js";

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
const TransactionOutput = Schema.Union(
  ShelleyTransactionOutput.ShelleyTransactionOutput,
  BabbageTransactionOutput.BabbageTransactionOutput,
);

/**
 * Error thrown when transaction output operations fail
 *
 * @since 2.0.0
 * @category errors
 */
class TransactionOutputError
  extends Data.TaggedError("TransactionOutputError")<{
    message: string;
    cause?: unknown;
  }> {}

/**
 * Check if the given value is a valid TransactionOutput
 *
 * @example
 * import { TransactionOutput, Address, Bytes } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * import assert from "assert";
 *
 * const addressBytes = Bytes.fromHexOrThrow("019493315cd92eb5d8c4304e67b7e16ae36d61d34502694657811a2c8e337b62cfff6403a06a3acbc34f8c46003c69fe79a3628cefa9c47251");
 * const effect = Address.fromBytes(addressBytes);
 * const address = Effect.runSync(effect);
 * const transactionOutput = TransactionOutput.makeOrThrow(address, 1000000n);
 * const isValid = TransactionOutput.isTransactionOutput(transactionOutput);
 * assert(isValid === true);
 *
 * @since 2.0.0
 * @category predicates
 */
const isTransactionOutput = Schema.is(TransactionOutput);

// /**
//  * Smart constructor that creates the appropriate output type based on parameters
//  *
//  * @example
//  * import { TransactionOutput, Bytes } from "@lucid-evolution/experimental";
//  *
//  * const addressBytes = Bytes.fromHexOrThrow("019493315cd92eb5d8c4304e67b7e16ae36d61d34502694657811a2c8e337b62cfff6403a06a3acbc34f8c46003c69fe79a3628cefa9c47251");
//  * const effect = Address.fromBytes(addressBytes);
//  * const address = Effect.runSync(effect);
//  *
//  ** // Creates Shelley output
//  * const shelleyOutput = TransactionOutput.makeOrThrow(address, 1000000n);
//  * assert(shelleyOutput._tag === "ShelleyTransactionOutput");
//  *
//  * // Creates Babbage output
//  * const scriptRefBytes = new Uint8Array(32);
//  * const babbageOutput = TransactionOutput.makeOrThrow(address, 1000000n, {
//  *   scriptRef: scriptRefBytes
//  * });
//  * assert(babbageOutput._tag === "BabbageTransactionOutput");
//  *
// //  * const output = TransactionOutput.makeOrThrow(address, 1000000n);
//  *
//  * @category constructors
//  */
// const makeOrThrow = (
//   address: Uint8Array,
//   amount: bigint,
//   options?: {
//     datumHash?: Uint8Array;
//     datumOption?: Uint8Array;
//     scriptRef?: Uint8Array;
//   },
// ): Schema.Schema.Type<typeof TransactionOutput> => {
//   if (options?.datumOption || options?.scriptRef) {
//     return makeBabbageOrThrow(
//       address,
//       amount,
//       options.datumOption,
//       options.scriptRef,
//     );
//   } else {
//     return makeShelleyOrThrow(address, amount, options?.datumHash);
//   }
// };

/**
 * Schema for transforming between CBOR bytes and TransactionOutput
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
const CBORBytes = Schema.transformOrFail(
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

        // Determine format based on CBOR structure
        if (Array.isArray(decoded)) {
          // Array format indicates Shelley transaction output
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
const CBORHex = Schema.transformOrFail(
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
 * @example
 * import { TransactionOutput, Address } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const addressBytes = Bytes.fromHexOrThrow("019493315cd92eb5d8c4304e67b7e16ae36d61d34502694657811a2c8e337b62cfff6403a06a3acbc34f8c46003c69fe79a3628cefa9c47251");
 * const effect = Address.fromBytes(addressBytes);
 * const address = Effect.runSync(effect);
 * const output1 = TransactionOutput.makeOrThrow({ address, amount: 1000000n });
 * const output2 = TransactionOutput.makeOrThrow({ address, amount: 1000000n });
 * const output3 = TransactionOutput.makeOrThrow({ address, amount: 2000000n });
 *
 * assert(TransactionOutput.equals(output1, output2) === true);
 * assert(TransactionOutput.equals(output1, output3) === false);
 *
 * @since 2.0.0
 * @category equality
 */
const equals = (
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
const generator = FastCheck.oneof(
  ShelleyTransactionOutput.generator,
  BabbageTransactionOutput.generator,
);

export {
  CBORBytes,
  CBORHex,
  equals,
  generator,
  isTransactionOutput,
  TransactionOutput,
  TransactionOutputError,
};
