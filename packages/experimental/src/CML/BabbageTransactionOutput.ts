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
import * as CBOR from "../CBOR.js";
import * as Hex from "../Hex.js";
import * as Address from "../Address.js";

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
export class BabbageTransactionOutput extends Schema.TaggedClass<BabbageTransactionOutput>()(
  "BabbageTransactionOutput",
  {
    address: Address.Address,
    value: Schema.BigIntFromSelf,
    datumOption: Schema.optional(Schema.Uint8ArrayFromSelf),
    scriptRef: Schema.optional(Schema.Uint8ArrayFromSelf),
  },
) {
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
 * Schema for transforming between CBOR bytes and BabbageTransactionOutput
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
        ParseResult.encode(Address.Bytes)(toA.address),
        Effect.map((addressBytes) => {
          const map = new Map<number, unknown>([
            [0, addressBytes],
            [1, toA.value],
          ]);

          if (toA.datumOption) {
            map.set(2, toA.datumOption);
          }

          if (toA.scriptRef) {
            map.set(3, toA.scriptRef);
          }

          return CBOR.encodeAsBytesOrThrow(map);
        }),
      ),
    decode: (fromA, options, ast, fromI) =>
      Effect.gen(function* () {
        const decoded = yield* CBOR.decodeBytes(fromA).pipe(
          Effect.mapError(
            (error) => new ParseResult.Type(ast, fromA, error.message),
          ),
        );

        if (!(decoded instanceof Map)) {
          return yield* ParseResult.fail(
            new ParseResult.Type(ast, fromA, "Expected CBOR Map"),
          );
        }

        const addressBytes = decoded.get(0) as Uint8Array;
        const value = decoded.get(1) as bigint;
        const datumOption = decoded.get(2) as Uint8Array | undefined;
        const scriptRef = decoded.get(3) as Uint8Array | undefined;

        const address = yield* ParseResult.decodeUnknown(Address.Bytes)(
          addressBytes,
        );

        return new BabbageTransactionOutput({
          address,
          value,
          datumOption,
          scriptRef,
        });
      }),
  },
);

/**
 * Schema for transforming between CBOR hex and BabbageTransactionOutput
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
 * Generator for creating random BabbageTransactionOutput instances for testing
 *
 * @since 2.0.0
 * @category generators
 */
export const generator = FastCheck.tuple(
  Address.generator,
  FastCheck.bigInt({ min: 1n, max: 1000000000n }),
  FastCheck.option(FastCheck.uint8Array({ minLength: 1, maxLength: 100 })),
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
