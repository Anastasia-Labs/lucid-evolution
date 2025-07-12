import {
  Effect,
  FastCheck,
  Inspectable,
  ParseResult,
  pipe,
  Schema,
} from "effect";
import * as Credential from "./Credential.js";
import * as KeyHash from "./KeyHash.js";
import * as ScriptHash from "./ScriptHash.js";
import * as NetworkId from "./NetworkId.js";
import * as Hex from "./Hex.js";

export declare const NominalType: unique symbol;
export interface EnterpriseAddress {
  readonly [NominalType]: unique symbol;
}

/**
 * Enterprise address with only payment credential
 *
 * @since 2.0.0
 * @category schemas
 */
export class EnterpriseAddress extends Schema.TaggedClass<EnterpriseAddress>(
  "EnterpriseAddress",
)("EnterpriseAddress", {
  networkId: NetworkId.NetworkId,
  paymentCredential: Credential.Credential,
}) {
  [Inspectable.NodeInspectSymbol]() {
    return {
      _tag: "EnterpriseAddress",
      networkId: this.networkId,
      paymentCredential: this.paymentCredential,
    };
  }
}

export const BytesSchema = Schema.transformOrFail(
  Schema.Uint8ArrayFromSelf,
  EnterpriseAddress,
  {
    strict: true,
    encode: (toI, options, ast, toA) => {
      const paymentBit = toA.paymentCredential._tag === "KeyHash" ? 0 : 1;
      const header =
        (0b01 << 6) |
        (0b1 << 5) |
        (paymentBit << 4) |
        (toA.networkId & 0b00001111);

      const result = new Uint8Array(29);
      result[0] = header;

      const paymentCredentialBytes = Hex.toBytes(toA.paymentCredential.hash);
      result.set(paymentCredentialBytes, 1);

      return ParseResult.succeed(result);
    },
    decode: (fromI, options, ast, fromA) =>
      Effect.gen(function* () {
        const header = fromA[0];
        // Extract network ID from the lower 4 bits
        const networkId = header & 0b00001111;
        // Extract address type from the upper 4 bits (bits 4-7)
        const addressType = header >> 4;

        // Script payment
        const isPaymentKey = (addressType & 0b0001) === 0;
        const paymentCredential: Credential.Credential = isPaymentKey
          ? yield* ParseResult.decode(KeyHash.Bytes)(fromA.slice(1, 29))
          : yield* ParseResult.decode(ScriptHash.Bytes)(fromA.slice(1, 29));
        return yield* ParseResult.decode(EnterpriseAddress)({
          _tag: "EnterpriseAddress",
          networkId,
          paymentCredential,
        });
      }),
  },
);

export const HexStringSchema = Schema.transformOrFail(
  Hex.HexString,
  EnterpriseAddress,
  {
    strict: true,
    encode: (toI, options, ast, toA) =>
      pipe(ParseResult.encode(BytesSchema)(toA), Effect.map(Hex.fromBytes)),
    decode: (fromI, options, ast) =>
      pipe(Hex.toBytes(fromI), ParseResult.decode(BytesSchema)),
  },
);

/**
 * Check if two EnterpriseAddress instances are equal.
 *
 * @since 2.0.0
 * @category equality
 */
export const equals = (a: EnterpriseAddress, b: EnterpriseAddress): boolean => {
  return (
    a.networkId === b.networkId &&
    a.paymentCredential._tag === b.paymentCredential._tag &&
    a.paymentCredential.hash === b.paymentCredential.hash
  );
};

/**
 * Generate a random EnterpriseAddress.
 *
 * @example
 * import { EnterpriseAddress } from "@evolution-sdk/experimental";
 * import { FastCheck } from "effect";
 * import assert from "assert";
 *
 * const randomSamples = FastCheck.sample(EnterpriseAddress.generator, 20);
 * randomSamples.forEach((address) => {
 *   assert(address._tag === "EnterpriseAddress");
 *   assert(typeof address.networkId === "number");
 * });
 *
 * @since 2.0.0
 * @category generators
 */
export const generator = FastCheck.tuple(
  NetworkId.generator,
  Credential.generator,
).map(
  ([networkId, paymentCredential]) =>
    new EnterpriseAddress({
      networkId,
      paymentCredential,
    }),
);

/**
 * Synchronous encoding utilities for enterprise address.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Encode = {
  hex: Schema.encodeSync(HexStringSchema),
  bytes: Schema.encodeSync(BytesSchema),
};

/**
 * Synchronous decoding utilities for enterprise address.
 *
 @since 2.0.0
 * @category encoding/decoding
 */
export const Decode = {
  hex: Schema.decodeUnknownSync(HexStringSchema),
  bytes: Schema.decodeUnknownSync(BytesSchema),
};

/**
 * Either encoding utilities for enterprise address.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const EncodeEither = {
  hex: Schema.encodeEither(HexStringSchema),
  bytes: Schema.encodeEither(BytesSchema),
};

/**
 * Either decoding utilities for enterprise address.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const DecodeEither = {
  hex: Schema.decodeUnknownEither(HexStringSchema),
  bytes: Schema.decodeUnknownEither(BytesSchema),
};
