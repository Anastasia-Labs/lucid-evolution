import { Effect, FastCheck, ParseResult, pipe, Schema } from "effect";
import * as Credential from "./Credential.js";
import * as KeyHash from "./KeyHash.js";
import * as ScriptHash from "./ScriptHash.js";
import * as NetworkId from "./NetworkId.js";
import * as Bytes from "./Bytes.js";
import * as Bytes57 from "./Bytes57.js";

export declare const NominalType: unique symbol;

export interface BaseAddress {
  readonly [NominalType]: unique symbol;
}

/**
 * Base address with both payment and staking credentials
 *
 * @since 2.0.0
 * @category schemas
 */
export class BaseAddress extends Schema.TaggedClass<BaseAddress>("BaseAddress")(
  "BaseAddress",
  {
    networkId: NetworkId.NetworkId,
    paymentCredential: Credential.Credential,
    stakeCredential: Credential.Credential,
  },
) {
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return {
      _tag: "BaseAddress",
      networkId: this.networkId,
      paymentCredential: this.paymentCredential,
      stakeCredential: this.stakeCredential,
    };
  }
}

export const BytesSchema = Schema.transformOrFail(
  Bytes57.BytesSchema,
  BaseAddress,
  {
    strict: true,
    encode: (_, __, ___, toA) => {
      const paymentBit = toA.paymentCredential._tag === "KeyHash" ? 0 : 1;
      const stakeBit = toA.stakeCredential._tag === "KeyHash" ? 0 : 1;
      const header =
        (0b00 << 6) |
        (stakeBit << 5) |
        (paymentBit << 4) |
        (toA.networkId & 0b00001111);
      const result = new Uint8Array(57);
      result[0] = header;
      const paymentCredentialBytes = Bytes.Decode.hex(
        toA.paymentCredential.hash,
      );
      result.set(paymentCredentialBytes, 1);
      const stakeCredentialBytes = Bytes.Decode.hex(toA.stakeCredential.hash);
      result.set(stakeCredentialBytes, 29);
      return ParseResult.succeed(result);
    },
    decode: (fromI, options, ast, fromA) =>
      Effect.gen(function* () {
        const header = fromA[0];
        // Extract network ID from the lower 4 bits
        const networkId = header & 0b00001111;
        // Extract address type from the upper 4 bits (bits 4-7)
        const addressType = header >> 4;
        // Script payment, Script stake
        const isPaymentKey = (addressType & 0b0001) === 0;
        const paymentCredential: Credential.Credential = isPaymentKey
          ? yield* ParseResult.decode(KeyHash.BytesSchema)(fromA.slice(1, 29))
          : yield* ParseResult.decode(ScriptHash.BytesSchema)(
              fromA.slice(1, 29),
            );
        const isStakeKey = (addressType & 0b0010) === 0;
        const stakeCredential: Credential.Credential = isStakeKey
          ? yield* ParseResult.decode(KeyHash.BytesSchema)(fromA.slice(29, 57))
          : yield* ParseResult.decode(ScriptHash.BytesSchema)(
              fromA.slice(29, 57),
            );
        return yield* ParseResult.decode(BaseAddress)({
          _tag: "BaseAddress",
          networkId,
          paymentCredential,
          stakeCredential,
        });
      }),
  },
);

export const HexSchema = Schema.transformOrFail(
  Schema.typeSchema(Bytes57.HexSchema),
  BaseAddress,
  {
    strict: true,
    encode: (_, __, ___, toA) =>
      pipe(ParseResult.encode(BytesSchema)(toA), Effect.map(Bytes.Encode.hex)),
    decode: (fromI) =>
      pipe(Bytes.Decode.hex(fromI), ParseResult.decode(BytesSchema)),
  },
);

/**
 * Check if two BaseAddress instances are equal.
 *
 * @since 2.0.0
 * @category equality
 */
export const equals = (a: BaseAddress, b: BaseAddress): boolean => {
  return (
    a.networkId === b.networkId &&
    Credential.equals(a.paymentCredential, b.paymentCredential) &&
    Credential.equals(a.stakeCredential, b.stakeCredential)
  );
};

/**
 * Generate a random BaseAddress.
 *
 * @example
 * import { BaseAddress } from "@lucid-evolution/experimental";
 * import { FastCheck } from "effect";
 * import assert from "assert";
 *
 * const randomSamples = FastCheck.sample(BaseAddress.generator, 20);
 * randomSamples.forEach((address) => {
 *   assert(address._tag === "BaseAddress");
 *   assert(typeof address.networkId === "number");
 * });
 *
 * @since 2.0.0
 * @category generators
 */
export const generator = FastCheck.tuple(
  NetworkId.generator,
  Credential.generator,
  Credential.generator,
).map(
  ([networkId, paymentCredential, stakeCredential]) =>
    new BaseAddress({
      networkId,
      paymentCredential,
      stakeCredential,
    }),
);

/**
 * Synchronous encoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Encode = {
  hex: Schema.encodeSync(HexSchema),
  bytes: Schema.encodeSync(BytesSchema),
};

/**
 * Synchronous decoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Decode = {
  hex: Schema.decodeUnknownSync(HexSchema),
  bytes: Schema.decodeUnknownSync(BytesSchema),
};

/**
 * Either encoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const EncodeEither = {
  hex: Schema.encodeEither(HexSchema),
  bytes: Schema.encodeEither(BytesSchema),
};

/**
 * Either decoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const DecodeEither = {
  hex: Schema.decodeUnknownEither(HexSchema),
  bytes: Schema.decodeUnknownEither(BytesSchema),
};
