// packages/experimental/src/ShelleyTransactionOutput.ts

import {
  Data,
  Effect,
  Equal,
  FastCheck,
  Inspectable,
  ParseResult,
  pipe,
  Schema,
} from "effect";
import * as CBOR from "./CBOR.js";
import * as Hex from "./Hex.js";
import * as Address from "./Address.js";
import * as DatumHash from "./DatumHash.js";

/**
 * CDDL specs (Shelley era)
 * shelley_transaction_output = [address, amount : value, ? hash32]
 * hash32 = bytes .size 32
 * value = coin/ [coin, multiasset<positive_coin>]
 * coin = uint
 */

/**
 * Represents a Shelley era transaction output with address, value, and optional datum hash
 *
 * @since 2.0.0
 * @category schemas
 */
export class ShelleyTransactionOutput extends Schema.TaggedClass<ShelleyTransactionOutput>(
  "ShelleyTransactionOutput",
)("ShelleyTransactionOutput", {
  address: Address.Address,
  value: Schema.BigIntFromSelf,
  datumHash: Schema.optional(DatumHash.DatumHash),
}) {
  [Inspectable.NodeInspectSymbol]() {
    return {
      _tag: "ShelleyTransactionOutput",
      address: this.address,
      value: this.value,
      datumHash: this.datumHash,
    };
  }
}

/**
 * Error class for ShelleyTransactionOutput operations
 *
 * @since 2.0.0
 * @category errors
 */
export class ShelleyTransactionOutputError extends Data.TaggedError(
  "ShelleyTransactionOutputError",
)<{
  message: string;
  cause?: unknown;
}> {}

/**
 * Check if the given value is a valid ShelleyTransactionOutput
 *
 * @example
 * import { ShelleyTransactionOutput } from "@lucid-evolution/experimental/ShelleyTransactionOutput";
 * import * as Address from "@lucid-evolution/experimental/Address";
 * import * as Hex from "@lucid-evolution/experimental/Hex";
 * import assert from "assert";
 *
 * const addr = Address.BaseAddress.makeOrThrow({
 * payment: { _tag: "KeyHash", hash: Hex.makeOrThrow("c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f") },
 * stake: { _tag: "ScriptHash", hash: Hex.makeOrThrow("1a4a40d588523c1186716a505b3191f6368d40026e6d1c810c90d6e2") },
 * network: "Preview"
 * });
 * const output = new ShelleyTransactionOutput({ address: addr, value: 100n });
 *
 * assert(ShelleyTransactionOutput.isShelleyTransactionOutput(output) === true);
 * assert(ShelleyTransactionOutput.isShelleyTransactionOutput({}) === false);
 *
 * @since 2.0.0
 * @category predicates
 */
export const isShelleyTransactionOutput = Schema.is(ShelleyTransactionOutput);

/**
 * Schema for transforming between CBOR bytes and ShelleyTransactionOutput.
 * This schema handles encoding ShelleyTransactionOutput to CBOR bytes
 * and decoding CBOR bytes back into a ShelleyTransactionOutput.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const CBORBytes = Schema.transformOrFail(
  Schema.Uint8ArrayFromSelf.annotations({
    identifier: "CBORBytes",
  }),
  ShelleyTransactionOutput,
  {
    strict: true,
    encode: (toI, options, ast, toA) =>
      pipe(
        ParseResult.encode(Address.BytesSchema)(toA.address), // Encode Address to Bytes as per CDDL for array
        Effect.map((addressBytes) => {
          const outputArray: unknown[] = [addressBytes, toA.value];
          if (toA.datumHash) {
            outputArray.push(toA.datumHash);
          }
          return CBOR.encodeAsBytesOrThrow(outputArray);
        }),
      ),
    decode: (fromA, options, ast) =>
      pipe(
        CBOR.decodeBytes(fromA),
        Effect.mapError(
          (e) =>
            new ParseResult.Type(
              ast,
              fromA,
              `CBOR decoding failed: ${e.message}. Expected a CBOR array.`,
            ),
        ),
        Effect.flatMap((decodedData) =>
          Effect.gen(function* () {
            // Ensure decodedData is an array and has at least the required elements
            if (
              !Array.isArray(decodedData) ||
              decodedData.length < 2 ||
              decodedData.length > 3
            ) {
              return yield* ParseResult.fail(
                new ParseResult.Type(
                  ast,
                  fromA,
                  `Expected a CBOR array of length 2 or 3, but got length ${
                    Array.isArray(decodedData) ? decodedData.length : "unknown"
                  }.`,
                ),
              );
            }

            const [addressBytes, valueRaw, datumHashData] = decodedData;

            const address = yield* ParseResult.decodeUnknown(
              Address.BytesSchema, // Assuming Address.Address decodes from bytes based on encoding
            )(addressBytes);

            const value = yield* ParseResult.decodeUnknown(
              Schema.BigIntFromSelf,
            )(valueRaw);

            let datumHash: DatumHash.DatumHash | undefined = undefined;
            if (datumHashData !== undefined) {
              datumHash = yield* ParseResult.decodeUnknown(DatumHash.DatumHash)(
                datumHashData,
              );
            }

            return new ShelleyTransactionOutput({
              address,
              value,
              datumHash,
            });
          }),
        ),
      ),
  },
);

/**
 * Schema for transforming between CBOR hex string and ShelleyTransactionOutput.
 * This schema handles encoding ShelleyTransactionOutput to a CBOR hex string
 * and decoding a CBOR hex string back into a ShelleyTransactionOutput.
 *
 * @example
 * import { ShelleyTransactionOutput } from "@lucid-evolution/experimental/ShelleyTransactionOutput";
 * import * as Hex from "@lucid-evolution/experimental/Hex";
 * import { Effect } from "effect";
 * import assert from "assert";
 *
 * // Example with address and value
 * const hex1 = "82582760810477813a4362d26f6323a63339f4083a62885994b7c617b010000000000000001";
 * const decodedOutput1 = Effect.runSync(ShelleyTransactionOutput.CBORHex.decode(Hex.makeOrThrow(hex1)));
 * assert(decodedOutput1.value === 1n);
 * assert(decodedOutput1.datumHash === undefined);
 *
 * // Example with address, value, and datum hash
 * const hex2 = "83582760810477813a4362d26f6323a63339f4083a62885994b7c617b01000000000000000158204618e4740e53a31c51082c5f110753066d525287f3b8908f906f32e600000000";
 * const decodedOutput2 = Effect.runSync(ShelleyTransactionOutput.CBORHex.decode(Hex.makeOrThrow(hex2)));
 * assert(decodedOutput2.value === 1n);
 * assert(decodedOutput2.datumHash !== undefined);
 * assert(decodedOutput2.datumHash._tag === "DatumHash");
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const CBORHex = Schema.transformOrFail(
  Hex.HexString.pipe(Schema.typeSchema).annotations({
    identifier: "CBORHex",
  }),
  ShelleyTransactionOutput,
  {
    strict: true,
    encode: (toI, options, ast, toA) =>
      pipe(ParseResult.encode(CBORBytes)(toA), Effect.map(Hex.fromBytes)),
    decode: (fromA, options, ast) =>
      pipe(Hex.toBytes(fromA), ParseResult.decode(CBORBytes)),
  },
);

/**
 * Check if two ShelleyTransactionOutput instances are equal.
 *
 * @example
 * import { ShelleyTransactionOutput } from "@lucid-evolution/experimental/ShelleyTransactionOutput";
 * import * as Address from "@lucid-evolution/experimental/Address";
 * import * as Hex from "@lucid-evolution/experimental/Hex";
 * import assert from "assert";
 *
 * const addr1 = Address.BaseAddress.makeOrThrow({
 * payment: { _tag: "KeyHash", hash: Hex.makeOrThrow("c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f") },
 * stake: { _tag: "ScriptHash", hash: Hex.makeOrThrow("1a4a40d588523c1186716a505b3191f6368d40026e6d1c810c90d6e2") },
 * network: "Preview"
 * });
 * const output1 = new ShelleyTransactionOutput({ address: addr1, value: 100n });
 * const output2 = new ShelleyTransactionOutput({ address: addr1, value: 100n });
 * const output3 = new ShelleyTransactionOutput({ address: addr1, value: 200n });
 *
 * assert(ShelleyTransactionOutput.equals(output1, output2) === true);
 * assert(ShelleyTransactionOutput.equals(output1, output3) === false);
 *
 * @since 2.0.0
 * @category equality
 */
export const equals = (
  a: ShelleyTransactionOutput,
  b: ShelleyTransactionOutput,
): boolean => {
  return (
    a._tag === b._tag &&
    a.value === b.value &&
    Address.equals(a.address, b.address) &&
    Equal.equals(a.datumHash, b.datumHash)
  );
};

/**
 * Generate a random ShelleyTransactionOutput instance for property-based testing.
 *
 * @example
 * import { ShelleyTransactionOutput } from "@lucid-evolution/experimental/ShelleyTransactionOutput";
 * import { FastCheck } from "effect";
 * import assert from "assert";
 *
 * const randomSamples = FastCheck.sample(ShelleyTransactionOutput.generator, 5);
 * randomSamples.forEach((output) => {
 * assert(output instanceof ShelleyTransactionOutput);
 * assert(output.value >= 1n && output.value <= 1000000000n);
 * // Further assertions on address and datumHash can be added
 * });
 *
 * @since 2.0.0
 * @category generators
 */
export const generator = FastCheck.tuple(
  Address.generator,
  FastCheck.bigInt({ min: 1n, max: 1000000000n }),
  FastCheck.option(DatumHash.generator), // hash32 is exactly 32 bytes
).map(
  ([address, value, datumHash]) =>
    new ShelleyTransactionOutput({
      address,
      value,
      datumHash: datumHash ?? undefined, // Ensure undefined if FastCheck.option yields null
    }),
);
