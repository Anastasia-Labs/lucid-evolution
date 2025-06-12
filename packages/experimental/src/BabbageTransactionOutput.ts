// packages/experimental/src/BabbageTransactionOutput.ts

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
import * as DatumOption from "./DatumOption.js";

/**
 * CDDL specs
 * babbage_transaction_output = {0 : address, 1 : value, ? 2 : datum_option, ? 3 : script_ref}
 * datum_option = [0, hash32// 1, data]
 * script_ref = #6.24(bytes .cbor script)
 */

/**
 * Represents a Babbage era transaction output with address, value, and optional datum and script reference
 *
 * @since 2.0.0
 * @category schemas
 */
export class BabbageTransactionOutput extends Schema.TaggedClass<BabbageTransactionOutput>(
  "BabbageTransactionOutput",
)("BabbageTransactionOutput", {
  address: Address.Address,
  value: Schema.BigIntFromSelf,
  datumOption: Schema.optional(DatumOption.DatumOption),
  scriptRef: Schema.optional(Schema.Uint8ArrayFromSelf),
}) {
  [Inspectable.NodeInspectSymbol]() {
    return {
      _tag: "BabbageTransactionOutput",
      address: this.address,
      value: this.value,
      datumOption: this.datumOption,
      scriptRef: this.scriptRef,
    };
  }
}

/**
 * Error thrown when BabbageTransactionOutput operations fail
 *
 * @since 2.0.0
 * @category errors
 */
export class BabbageTransactionOutputError extends Data.TaggedError(
  "BabbageTransactionOutputError",
)<{
  message: string;
  cause?: unknown;
}> {}

/**
 * Check if the given value is a valid BabbageTransactionOutput
 *
 * @since 2.0.0
 * @category predicates
 */
export const isBabbageTransactionOutput = Schema.is(BabbageTransactionOutput);

/**
 * Schema for transforming between CBOR bytes and BabbageTransactionOutput.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const CBORBytes = Schema.transformOrFail(
  Schema.Uint8ArrayFromSelf.annotations({
    identifier: "CBORBytes",
  }),
  BabbageTransactionOutput,
  {
    strict: true,
    encode: (toI, options, ast, toA) =>
      pipe(
        ParseResult.encode(Address.BytesSchema)(toA.address),
        Effect.flatMap((addressBytes) => {
          const map = new Map<number, unknown>([
            [0, addressBytes],
            [1, toA.value],
          ]);

          // Encode datumOption if present
          const datumOptionEffect =
            toA.datumOption !== undefined
              ? pipe(
                  ParseResult.encode(DatumOption.CBORBytes)(toA.datumOption),
                  Effect.map((encodedDatum) => {
                    map.set(2, encodedDatum);
                    return map;
                  }),
                )
              : Effect.succeed(map);

          return pipe(
            datumOptionEffect,
            Effect.map((updatedMap) => {
              if (toA.scriptRef !== undefined) {
                updatedMap.set(3, toA.scriptRef);
              }
              // Ensure we encode a Map, as per CDDL
              return CBOR.encodeAsBytesOrThrow(updatedMap);
            }),
          );
        }),
      ),
    decode: (fromA, options, ast, fromI) =>
      pipe(
        CBOR.decodeBytes(fromA),
        Effect.mapError(
          (e) =>
            new ParseResult.Type(
              ast,
              fromA,
              `CBOR decoding failed: ${e.message}`,
            ),
        ),
        Effect.flatMap((decodedData) => {
          const getField = (key: number): unknown => {
            if (decodedData instanceof Map) {
              return decodedData.get(key);
            } else if (
              typeof decodedData === "object" &&
              decodedData !== null
            ) {
              return (decodedData as Record<number, unknown>)[key];
            }
            return undefined; // If decodedData is neither expected type, return undefined
          };

          const addressBytes = getField(0);
          const valueRaw = getField(1);
          const datumOptionBytes = getField(2);
          const scriptRefRaw = getField(3);

          if (addressBytes === undefined || valueRaw === undefined) {
            return ParseResult.fail(
              new ParseResult.Type(
                ast,
                fromA,
                "Missing required fields (address (0) or value (1)) in decoded CBOR data for BabbageTransactionOutput.",
              ),
            );
          }

          if (
            !(decodedData instanceof Map) &&
            !(typeof decodedData === "object" && decodedData !== null)
          ) {
            return ParseResult.fail(
              new ParseResult.Type(
                ast,
                fromA,
                `Expected a Map or a plain object for BabbageTransactionOutput, but got ${typeof decodedData}.`,
              ),
            );
          }

          return Effect.gen(function* () {
            // Decode and validate each field using its respective schema
            const address = yield* ParseResult.decodeUnknown(
              Address.BytesSchema,
            )(addressBytes);

            const value = yield* ParseResult.decodeUnknown(
              Schema.BigIntFromSelf,
            )(valueRaw);

            const datumOption =
              datumOptionBytes !== undefined
                ? yield* ParseResult.decodeUnknown(DatumOption.CBORBytes)(
                    datumOptionBytes,
                  )
                : undefined;

            const scriptRef =
              scriptRefRaw !== undefined
                ? yield* ParseResult.decodeUnknown(Schema.Uint8ArrayFromSelf)(
                    scriptRefRaw,
                  )
                : undefined;

            return new BabbageTransactionOutput({
              address,
              value,
              datumOption,
              scriptRef,
            });
          });
        }),
      ),
  },
);

/**
 * Schema for transforming between CBOR hex string and BabbageTransactionOutput.
 * This schema handles encoding BabbageTransactionOutput to a CBOR hex string
 * and decoding a CBOR hex string back into a BabbageTransactionOutput.
 *
 * @example
 * import { BabbageTransactionOutput } from "@lucid-evolution/experimental/BabbageTransactionOutput";
 * import * as Hex from "@lucid-evolution/experimental/Hex";
 * import { Effect } from "effect";
 * import assert from "assert";
 *
 * const exampleHex = "a400581c810477813a4362d26f6323a63339f4083a62885994b7c617b010000000000000001028200581ca55a305d233157b545d13783a649842f21950c41031c260386e81e370358204618e4740e53a31c51082c5f110753066d525287f3b8908f906f32e60000000000000003"; // A complex example
 * const cborHexResult = BabbageTransactionOutput.CBORHex.decode(Hex.makeOrThrow(exampleHex));
 * const decodedOutput = Effect.runSync(cborHexResult);
 *
 * assert(decodedOutput.address._tag === "BaseAddress");
 * assert(decodedOutput.value === 1n);
 * assert(decodedOutput.datumOption?._tag === "Hash");
 * assert(decodedOutput.scriptRef !== undefined);
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const CBORHex = Schema.transformOrFail(
  Hex.HexString.pipe(Schema.typeSchema).annotations({
    identifier: "CBORHex",
  }),
  BabbageTransactionOutput,
  {
    strict: true,
    encode: (toI, options, ast, toA) =>
      pipe(ParseResult.encode(CBORBytes)(toA), Effect.map(Hex.fromBytes)),
    decode: (fromA, options, ast) =>
      pipe(Hex.toBytes(fromA), ParseResult.decode(CBORBytes)),
  },
);

/**
 * Check if two BabbageTransactionOutput instances are equal.
 *
 * @example
 * import { BabbageTransactionOutput } from "@lucid-evolution/experimental/BabbageTransactionOutput";
 * import * as Address from "@lucid-evolution/experimental/Address";
 * import * as Hex from "@lucid-evolution/experimental/Hex";
 * import assert from "assert";
 *
 * const addr1 = Address.BaseAddress.makeOrThrow({
 * payment: { _tag: "KeyHash", hash: Hex.makeOrThrow("c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f") },
 * stake: { _tag: "ScriptHash", hash: Hex.makeOrThrow("1a4a40d588523c1186716a505b3191f6368d40026e6d1c810c90d6e2") },
 * network: "Preview"
 * });
 * const output1 = new BabbageTransactionOutput({ address: addr1, value: 100n });
 * const output2 = new BabbageTransactionOutput({ address: addr1, value: 100n });
 * const output3 = new BabbageTransactionOutput({ address: addr1, value: 200n });
 *
 * assert(BabbageTransactionOutput.equals(output1, output2) === true);
 * assert(BabbageTransactionOutput.equals(output1, output3) === false);
 *
 * @since 2.0.0
 * @category equality
 */
export const equals = (
  a: BabbageTransactionOutput,
  b: BabbageTransactionOutput,
): boolean => {
  return (
    a._tag === b._tag &&
    a.value === b.value &&
    Address.equals(a.address, b.address) &&
    Equal.equals(a.datumOption, b.datumOption) &&
    Equal.equals(a.scriptRef, b.scriptRef)
  );
};

/**
 * Generate a random BabbageTransactionOutput instance for property-based testing.
 *
 * @example
 * import { BabbageTransactionOutput } from "@lucid-evolution/experimental/BabbageTransactionOutput";
 * import { FastCheck } from "effect";
 * import assert from "assert";
 *
 * const randomSamples = FastCheck.sample(BabbageTransactionOutput.generator, 5);
 * randomSamples.forEach((output) => {
 * assert(output instanceof BabbageTransactionOutput);
 * assert(output.value >= 1n && output.value <= 1000000000n);
 * // Further assertions on address, datumOption, scriptRef can be added
 * });
 *
 * @since 2.0.0
 * @category generators
 */
export const generator = FastCheck.tuple(
  Address.generator,
  FastCheck.bigInt({ min: 1n, max: 1000000000n }),
  FastCheck.option(DatumOption.generator),
  FastCheck.option(FastCheck.uint8Array({ minLength: 1, maxLength: 200 })),
).map(
  ([address, value, datumOption, scriptRef]) =>
    new BabbageTransactionOutput({
      address,
      value,
      datumOption: datumOption ?? undefined,
      scriptRef: scriptRef ?? undefined,
    }),
);
