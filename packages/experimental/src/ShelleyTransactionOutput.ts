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
  datumHash: Schema.optional(Schema.Uint8ArrayFromSelf),
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
 * @since 2.0.0
 * @category predicates
 */
export const isShelleyTransactionOutput = Schema.is(ShelleyTransactionOutput);

/**
 * Schema for transforming between CBOR bytes and ShelleyTransactionOutput
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
        ParseResult.encode(Address.Address)(toA.address),
        Effect.map((addressBytes) => {
          const outputArray: unknown[] = [addressBytes, toA.value];
          if (toA.datumHash) {
            outputArray.push(toA.datumHash);
          }
          return CBOR.encodeAsBytesOrThrow(outputArray);
        }),
      ),
    decode: (fromA, options, ast) =>
      Effect.gen(function* () {
        const decoded = yield* CBOR.decodeBytes(fromA).pipe(
          Effect.mapError(
            (error) => new ParseResult.Type(ast, fromA, error.message),
          ),
        );

        if (
          !Array.isArray(decoded) ||
          decoded.length < 2 ||
          decoded.length > 3
        ) {
          return yield* ParseResult.fail(
            new ParseResult.Type(
              ast,
              fromA,
              "Expected CBOR array with 2 or 3 elements",
            ),
          );
        }

        const [addressBytes, value, datumHash] = decoded;

        const address = yield* ParseResult.decodeUnknown(Address.Address)(
          addressBytes,
        );

        return new ShelleyTransactionOutput({
          address,
          value: value as bigint,
          datumHash: datumHash as Uint8Array | undefined,
        });
      }),
  },
);

/**
 * Schema for transforming between CBOR hex and ShelleyTransactionOutput
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
 * Generator for creating random ShelleyTransactionOutput instances for testing
 *
 * @since 2.0.0
 * @category generators
 */
export const generator = FastCheck.tuple(
  Address.generator,
  FastCheck.bigInt({ min: 1n, max: 1000000000n }),
  FastCheck.option(FastCheck.uint8Array({ minLength: 32, maxLength: 32 })), // hash32 is exactly 32 bytes
).map(
  ([address, value, datumHash]) =>
    new ShelleyTransactionOutput({
      address,
      value,
      datumHash: datumHash ?? undefined,
    }),
);
