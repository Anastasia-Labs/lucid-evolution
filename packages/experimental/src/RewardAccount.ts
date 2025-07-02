import { Effect, FastCheck, ParseResult, pipe, Schema } from "effect";
import * as Credential from "./Credential.js";
import * as KeyHash from "./KeyHash.js";
import * as ScriptHash from "./ScriptHash.js";
import * as NetworkId from "./NetworkId.js";
import * as Bytes from "./Bytes.js";
import * as Bytes29 from "./Bytes29.js";

export declare const NominalType: unique symbol;
export interface RewardAccount {
  readonly [NominalType]: unique symbol;
}

/**
 * Reward/stake address with only staking credential
 *
 * @since 2.0.0
 * @category schemas
 */
export class RewardAccount extends Schema.TaggedClass<RewardAccount>(
  "RewardAccount",
)("RewardAccount", {
  networkId: NetworkId.NetworkId,
  stakeCredential: Credential.Credential,
}) {
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return {
      _tag: "RewardAccount",
      networkId: this.networkId,
      stakeCredential: this.stakeCredential,
    };
  }
}

export const BytesSchema = Schema.transformOrFail(
  Bytes29.BytesSchema,
  RewardAccount,
  {
    strict: true,
    encode: (_, __, ___, toA) => {
      const stakingBit = toA.stakeCredential._tag === "KeyHash" ? 0 : 1;
      const header =
        (0b111 << 5) | (stakingBit << 4) | (toA.networkId & 0b00001111);
      const result = new Uint8Array(29);
      result[0] = header;
      const stakeCredentialBytes = Bytes.Decode.hex(toA.stakeCredential.hash);
      result.set(stakeCredentialBytes, 1);
      return ParseResult.succeed(result);
    },
    decode: (_, __, ___, fromA) =>
      Effect.gen(function* () {
        const header = fromA[0];
        // Extract network ID from the lower 4 bits
        const networkId = header & 0b00001111;
        // Extract address type from the upper 4 bits (bits 4-7)
        const addressType = header >> 4;

        const isStakeKey = (addressType & 0b0001) === 0;
        const stakeCredential: Credential.Credential = isStakeKey
          ? {
              _tag: "KeyHash",
              hash: yield* ParseResult.decode(KeyHash.BytesSchema)(
                fromA.slice(1, 29),
              ),
            }
          : {
              _tag: "ScriptHash",
              hash: yield* ParseResult.decode(ScriptHash.BytesSchema)(
                fromA.slice(1, 29),
              ),
            };
        return yield* ParseResult.decode(RewardAccount)({
          _tag: "RewardAccount",
          networkId,
          stakeCredential,
        });
      }),
  },
);

export const HexSchema = Schema.transformOrFail(
  Schema.typeSchema(Bytes29.HexSchema),
  RewardAccount,
  {
    strict: true,
    encode: (_, __, ___, toA) =>
      pipe(ParseResult.encode(BytesSchema)(toA), Effect.map(Bytes.Encode.hex)),
    decode: (fromI) =>
      pipe(Bytes.Decode.hex(fromI), ParseResult.decode(BytesSchema)),
  },
);

/**
 * Check if two RewardAccount instances are equal.
 *
 * @since 2.0.0
 * @category equality
 */
export const equals = (a: RewardAccount, b: RewardAccount): boolean => {
  return (
    a.networkId === b.networkId &&
    a.stakeCredential._tag === b.stakeCredential._tag &&
    a.stakeCredential.hash === b.stakeCredential.hash
  );
};

/**
 * Generate a random RewardAccount.
 *
 * @example
 * import { RewardAccount } from "@lucid-evolution/experimental";
 * import { FastCheck } from "effect";
 * import assert from "assert";
 *
 * const randomSamples = FastCheck.sample(RewardAccount.generator, 20);
 * randomSamples.forEach((account) => {
 *   assert(account._tag === "RewardAccount");
 *   assert(typeof account.networkId === "number");
 * });
 *
 * @since 2.0.0
 * @category generators
 */
export const generator = FastCheck.tuple(
  NetworkId.generator,
  Credential.generator,
).map(
  ([networkId, stakeCredential]) =>
    new RewardAccount({
      networkId,
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
