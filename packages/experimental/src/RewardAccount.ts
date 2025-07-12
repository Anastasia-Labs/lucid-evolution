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

declare const NominalType: unique symbol;
interface RewardAccount {
  readonly [NominalType]: unique symbol;
}

/**
 * Reward/stake address with only staking credential
 *
 * @since 2.0.0
 * @category schemas
 */
class RewardAccount extends Schema.TaggedClass<RewardAccount>("RewardAccount")(
  "RewardAccount",
  {
    networkId: NetworkId.NetworkId,
    stakeCredential: Credential.Credential,
  },
) {
  [Inspectable.NodeInspectSymbol]() {
    return {
      _tag: "RewardAccount",
      networkId: this.networkId,
      stakeCredential: this.stakeCredential,
    };
  }
}

const Bytes = Schema.transformOrFail(Schema.Uint8ArrayFromSelf, RewardAccount, {
  strict: true,
  encode: (toI, options, ast, toA) => {
    const stakingBit = toA.stakeCredential._tag === "KeyHash" ? 0 : 1;
    const header =
      (0b111 << 5) | (stakingBit << 4) | (toA.networkId & 0b00001111);
    const result = new Uint8Array(29);
    result[0] = header;
    const stakeCredentialBytes = Hex.toBytes(toA.stakeCredential.hash);
    result.set(stakeCredentialBytes, 1);
    return ParseResult.succeed(result);
  },
  decode: (fromI, options, ast, fromA) =>
    Effect.gen(function* () {
      const header = fromA[0];
      // Extract network ID from the lower 4 bits
      const networkId = header & 0b00001111;
      // Extract address type from the upper 4 bits (bits 4-7)
      const addressType = header >> 4;

      const isStakeKey = (addressType & 0b0001) === 0;
      const stakeCredential: Credential.Credential = isStakeKey
        ? yield* ParseResult.decode(KeyHash.Bytes)(fromA.slice(1, 29))
        : yield* ParseResult.decode(ScriptHash.Bytes)(fromA.slice(1, 29));
      return yield* ParseResult.decode(RewardAccount)({
        _tag: "RewardAccount",
        networkId,
        stakeCredential,
      });
    }),
});

const HexString = Schema.transformOrFail(Hex.HexString, RewardAccount, {
  strict: true,
  encode: (toI, options, ast, toA) =>
    pipe(ParseResult.encode(Bytes)(toA), Effect.map(Hex.fromBytes)),
  decode: (fromI, options, ast) =>
    pipe(Hex.toBytes(fromI), ParseResult.decode(Bytes)),
});

/**
 * Check if two RewardAccount instances are equal.
 *
 * @since 2.0.0
 * @category equality
 */
const equals = (a: RewardAccount, b: RewardAccount): boolean => {
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
 * import { RewardAccount } from "@evolution-sdk/experimental";
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
const generator = FastCheck.tuple(
  NetworkId.generator,
  Credential.generator,
).map(
  ([networkId, stakeCredential]) =>
    new RewardAccount({
      networkId,
      stakeCredential,
    }),
);

export { RewardAccount, Bytes, HexString, equals, generator };
