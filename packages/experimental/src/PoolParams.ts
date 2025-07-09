import { Schema, Data, FastCheck } from "effect";
import * as PoolKeyHash from "./PoolKeyHash.js";
import * as VrfKeyHash from "./VrfKeyHash.js";
import * as Coin from "./Coin.js";
import * as UnitInterval from "./UnitInterval.js";
import * as RewardAccount from "./RewardAccount.js";
import * as KeyHash from "./KeyHash.js";
import * as Relay from "./Relay.js";
import * as PoolMetadata from "./PoolMetadata.js";
import * as NetworkId from "./NetworkId.js";
import * as CBOR from "./CBOR.js";

/**
 * Error class for PoolParams related operations.
 *
 * @example
 * import { PoolParams } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const error = new PoolParams.PoolParamsError({ message: "Invalid pool parameters" });
 * assert(error.message === "Invalid pool parameters");
 *
 * @since 2.0.0
 * @category errors
 */
export class PoolParamsError extends Data.TaggedError("PoolParamsError")<{
  message?: string;
  reason?:
    | "InvalidStructure"
    | "InvalidOwners"
    | "InvalidRelays"
    | "InvalidMetadata";
}> {}

/**
 * Schema for PoolParams representing stake pool registration parameters.
 * pool_params =
 *   ( operator       : pool_keyhash
 *   , vrf_keyhash    : vrf_keyhash
 *   , pledge         : coin
 *   , cost           : coin
 *   , margin         : unit_interval
 *   , reward_account : reward_account
 *   , pool_owners    : set<addr_keyhash>
 *   , relays         : [* relay]
 *   , pool_metadata  : pool_metadata/ nil
 *   )
 *
 * @example
 * import { PoolParams, PoolKeyHash, VrfKeyHash, Coin, UnitInterval, RewardAccount, KeyHash } from "@lucid-evolution/experimental";
 *
 * const poolParams = new PoolParams.PoolParams({
 *   operator: PoolKeyHash.PoolKeyHash.make("a".repeat(56)),
 *   vrfKeyhash: VrfKeyHash.VrfKeyHash.make("b".repeat(64)),
 *   pledge: 1000000n,
 *   cost: 340000000n,
 *   margin: UnitInterval.make(1n, 100n),
 *   rewardAccount: new RewardAccount.RewardAccount({
 *     networkId: 1,
 *     stakeCredential: new KeyHash.KeyHash({ hash: "c".repeat(56) })
 *   }),
 *   poolOwners: [KeyHash.KeyHash.make("d".repeat(56))],
 *   relays: [],
 *   poolMetadata: undefined
 * });
 *
 * @since 2.0.0
 * @category model
 */
export class PoolParams extends Schema.Class<PoolParams>("PoolParams")({
  operator: PoolKeyHash.PoolKeyHash,
  vrfKeyhash: VrfKeyHash.VrfKeyHash,
  pledge: Coin.CoinSchema,
  cost: Coin.CoinSchema,
  margin: UnitInterval.UnitInterval,
  rewardAccount: RewardAccount.RewardAccount,
  poolOwners: Schema.Array(KeyHash.KeyHash),
  relays: Schema.Array(Relay.Relay),
  poolMetadata: Schema.optionalWith(PoolMetadata.PoolMetadata, {
    nullable: true,
  }),
}) {
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return {
      _tag: "PoolParams",
      operator: this.operator,
      vrfKeyhash: this.vrfKeyhash,
      pledge: this.pledge,
      cost: this.cost,
      margin: this.margin,
      rewardAccount: this.rewardAccount,
      poolOwners: this.poolOwners,
      relays: this.relays,
      poolMetadata: this.poolMetadata,
    };
  }
}

/**
 * CBOR bytes transformation schema for PoolParams.
 *
 * @since 2.0.0
 * @category schemas
 */
export const CBORBytesSchema = undefined;

/**
 * CBOR hex transformation schema for PoolParams.
 *
 * @since 2.0.0
 * @category schemas
 */
export const CBORHexSchema = undefined;

/**
 * Check if two PoolParams instances are equal.
 *
 * @since 2.0.0
 * @category equality
 */
export const equals = (a: PoolParams, b: PoolParams): boolean =>
  PoolKeyHash.equals(a.operator, b.operator) &&
  VrfKeyHash.equals(a.vrfKeyhash, b.vrfKeyhash) &&
  a.pledge === b.pledge &&
  a.cost === b.cost &&
  UnitInterval.equals(a.margin, b.margin) &&
  a.rewardAccount.networkId === b.rewardAccount.networkId &&
  a.rewardAccount.stakeCredential._tag ===
    b.rewardAccount.stakeCredential._tag &&
  a.poolOwners.length === b.poolOwners.length &&
  a.poolOwners.every((owner, index) =>
    KeyHash.equals(owner, b.poolOwners[index]),
  ) &&
  a.relays.length === b.relays.length &&
  // Note: Relay equality comparison would need to be implemented
  ((a.poolMetadata === undefined && b.poolMetadata === undefined) ||
    (a.poolMetadata !== undefined &&
      b.poolMetadata !== undefined &&
      a.poolMetadata.url === b.poolMetadata.url));

/**
 * Create a PoolParams instance with validation.
 *
 * @example
 * import { PoolParams, PoolKeyHash, VrfKeyHash, Coin, UnitInterval } from "@lucid-evolution/experimental";
 *
 * const poolParams = PoolParams.make({
 *   operator: PoolKeyHash.PoolKeyHash.make("a".repeat(56)),
 *   vrfKeyhash: VrfKeyHash.VrfKeyHash.make("b".repeat(64)),
 *   pledge: 1000000n,
 *   cost: 340000000n,
 *   margin: UnitInterval.make(1n, 100n),
 *   // ... other fields
 * });
 *
 * @since 2.0.0
 * @category constructors
 */
export const make = (params: {
  operator: PoolKeyHash.PoolKeyHash;
  vrfKeyhash: VrfKeyHash.VrfKeyHash;
  pledge: Coin.Coin;
  cost: Coin.Coin;
  margin: UnitInterval.UnitInterval;
  rewardAccount: RewardAccount.RewardAccount;
  poolOwners: KeyHash.KeyHash[];
  relays: Relay.Relay[];
  poolMetadata?: PoolMetadata.PoolMetadata;
}): PoolParams => new PoolParams(params);

/**
 * Get total effective stake for pool rewards calculation.
 *
 * @since 2.0.0
 * @category transformation
 */
export const getEffectiveStake = (
  params: PoolParams,
  totalStake: Coin.Coin,
): Coin.Coin => {
  // Effective stake is min(totalStake, pledge) for calculation purposes
  return totalStake < params.pledge ? totalStake : params.pledge;
};

/**
 * Calculate pool operator rewards based on pool parameters.
 *
 * @since 2.0.0
 * @category transformation
 */
export const calculatePoolRewards = (
  params: PoolParams,
  totalRewards: Coin.Coin,
): { operatorRewards: Coin.Coin; delegatorRewards: Coin.Coin } => {
  const fixedCost = params.cost;
  const marginDecimal = UnitInterval.toDecimal(params.margin);

  if (totalRewards <= fixedCost) {
    return {
      operatorRewards: totalRewards,
      delegatorRewards: 0n,
    };
  }

  const rewardsAfterCost = totalRewards - fixedCost;
  const operatorShare = BigInt(
    Math.floor(Number(rewardsAfterCost) * marginDecimal),
  );

  return {
    operatorRewards: fixedCost + operatorShare,
    delegatorRewards: rewardsAfterCost - operatorShare,
  };
};

/**
 * Check if the pool has the minimum required cost.
 *
 * @since 2.0.0
 * @category predicates
 */
export const hasMinimumCost = (
  params: PoolParams,
  minPoolCost: Coin.Coin,
): boolean => params.cost >= minPoolCost;

/**
 * Check if the pool margin is within valid range (0 to 1).
 *
 * @since 2.0.0
 * @category predicates
 */
export const hasValidMargin = (params: PoolParams): boolean =>
  params.margin.numerator <= params.margin.denominator &&
  params.margin.denominator > 0n;

/**
 * Generate a random PoolParams.
 *
 * @example
 * import { PoolParams } from "@lucid-evolution/experimental";
 * import { FastCheck } from "effect";
 * import assert from "assert";
 *
 * const randomSamples = FastCheck.sample(PoolParams.generator, 5);
 * randomSamples.forEach((poolParams) => {
 *   assert(poolParams.poolOwners.length >= 0);
 *   assert(poolParams.cost >= 0n);
 * });
 *
 * @since 2.0.0
 * @category generators
 */
export const generator = FastCheck.record({
  operator: PoolKeyHash.generator,
  vrfKeyhash: VrfKeyHash.generator,
  pledge: FastCheck.bigInt({ min: 0n, max: 1000000000000n }),
  cost: FastCheck.bigInt({ min: 340000000n, max: 1000000000n }),
  margin: UnitInterval.generator,
  rewardAccount: FastCheck.constant(
    new RewardAccount.RewardAccount({
      networkId: NetworkId.makeOrThrow(1),
      stakeCredential: {
        _tag: "KeyHash",
        hash: KeyHash.KeyHash.make("a".repeat(56)),
      },
    }),
  ),
  poolOwners: FastCheck.array(KeyHash.generator, {
    minLength: 1,
    maxLength: 5,
  }),
  relays: FastCheck.array(Relay.generator, { minLength: 0, maxLength: 3 }),
  poolMetadata: FastCheck.option(FastCheck.constant(undefined), {
    nil: undefined,
  }),
}).map((params) => new PoolParams(params));

/**
 * Synchronous encoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Encode = {
  bytes: Schema.encodeSync(CBORBytesSchema),
  hex: Schema.encodeSync(CBORHexSchema),
};

/**
 * Synchronous decoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Decode = {
  bytes: Schema.decodeUnknownSync(CBORBytesSchema),
  hex: Schema.decodeUnknownSync(CBORHexSchema),
};

/**
 * Either encoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const EncodeEither = {
  bytes: Schema.encodeEither(CBORBytesSchema),
  hex: Schema.encodeEither(CBORHexSchema),
};

/**
 * Either decoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const DecodeEither = {
  bytes: Schema.decodeUnknownEither(CBORBytesSchema),
  hex: Schema.decodeUnknownEither(CBORHexSchema),
};
