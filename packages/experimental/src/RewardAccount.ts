import { Effect, FastCheck, Inspectable, Schema } from "effect";
import * as Credential from "./Credential.js";
import * as KeyHash from "./KeyHash.js";
import * as ScriptHash from "./ScriptHash.js";
import * as Bytes from "./Bytes.js";
import * as Network from "./Network.js";

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
  networkId: Schema.Number,
  stakeCredential: Credential.Credential,
}) {
  [Inspectable.NodeInspectSymbol]() {
    return {
      _tag: "RewardAccount",
      networkId: this.networkId,
      stakeCredential: this.stakeCredential,
    };
  }
}

/**
 * Create a RewardAccount from bytes.
 *
 * @example
 * import { RewardAccount, Bytes } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * import assert from "assert";
 *
 * // Sample reward account bytes
 * const bytes = Bytes.fromHexOrThrow("e1c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 * const accountEffect = RewardAccount.fromBytes(bytes);
 * const account = Effect.runSync(accountEffect);
 * assert(account._tag === "RewardAccount");
 *
 * @since 2.0.0
 * @category constructors
 */
export const fromBytes = Effect.fn(function* (bytes: Uint8Array) {
  const header = bytes[0];
  // Extract network ID from the lower 4 bits
  const networkId = header & 0b00001111;
  // Extract address type from the upper 4 bits (bits 4-7)
  const addressType = header >> 4;

  const isStakeKey = (addressType & 0b0001) === 0;
  const stakeCredential: Credential.Credential = isStakeKey
    ? yield* KeyHash.fromBytes(bytes.slice(1, 29))
    : yield* ScriptHash.fromBytes(bytes.slice(1, 29));
  const rewardAccount: RewardAccount = makeOrThrow(networkId, stakeCredential);
  return rewardAccount;
});

/**
 * Convert a RewardAccount to bytes.
 *
 * @example
 * import { RewardAccount, KeyHash } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * // Create stake credential
 * const stakeKeyHash = KeyHash.makeOrThrow("c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 *
 * // Create reward account
 * const account = RewardAccount.makeOrThrow(0, stakeKeyHash);
 * const bytes = RewardAccount.toBytes(account);
 * assert(bytes instanceof Uint8Array);
 * assert(bytes.length === 29);
 *
 * @since 2.0.0
 * @category transformation
 */
export const toBytes = (address: RewardAccount): Uint8Array => {
  // Preallocate array of exact size ( 1 byte header + 28 bytes stake credential )
  const result = new Uint8Array(29);
  const stakingBit = address.stakeCredential._tag === "KeyHash" ? 0 : 1;
  const header =
    (0b111 << 5) | (stakingBit << 4) | (address.networkId & 0b00001111);

  result[0] = header;
  const stakeCredentialBytes = Bytes.fromHexOrThrow(
    address.stakeCredential.hash,
  );
  result.set(stakeCredentialBytes, 1);

  return result;
};

/**
 * Create a RewardAccount from network ID and stake credential, throws on error.
 *
 * @example
 * import { RewardAccount, KeyHash } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * // Create stake credential
 * const stakeKeyHash = KeyHash.makeOrThrow("c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 *
 * // Create reward account
 * const account = RewardAccount.makeOrThrow(0, stakeKeyHash);
 * assert(account._tag === "RewardAccount");
 * assert(account.networkId === 0);
 *
 * @since 2.0.0
 * @category constructors
 */
export const makeOrThrow = (
  networkId: number,
  stakeCredential: Credential.Credential,
): RewardAccount =>
  RewardAccount.make(
    {
      networkId,
      stakeCredential,
    },
    {
      disableValidation: true,
    },
  );

/**
 * Check if two RewardAccount instances are equal.
 *
 * @example
 * import { RewardAccount, KeyHash } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * // Create credential
 * const stakeKeyHash = KeyHash.makeOrThrow("c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 *
 * // Create two identical accounts
 * const account1 = RewardAccount.makeOrThrow(0, stakeKeyHash);
 * const account2 = RewardAccount.makeOrThrow(0, stakeKeyHash);
 * const account3 = RewardAccount.makeOrThrow(1, stakeKeyHash);
 *
 * assert(RewardAccount.equals(account1, account2) === true);
 * assert(RewardAccount.equals(account1, account3) === false);
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
  Network.generator,
  Credential.generator,
).map(([networkId, stakeCredential]) =>
  makeOrThrow(networkId, stakeCredential),
);
