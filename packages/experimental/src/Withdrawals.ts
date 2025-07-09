import { Schema, Data, FastCheck, Effect, ParseResult, pipe } from "effect";
import * as RewardAccount from "./RewardAccount.js";
import * as Coin from "./Coin.js";
import * as CBOR from "./CBOR.js";
import { Bytes } from "./index.js";

/**
 * CDDL specs
 * withdrawals = {+ reward_account => coin}
 */

/**
 * Error class for Withdrawals related operations.
 *
 * @example
 * import { Withdrawals } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const error = new Withdrawals.WithdrawalsError({ message: "Invalid withdrawals" });
 * assert(error.message === "Invalid withdrawals");
 *
 * @since 2.0.0
 * @category errors
 */
export class WithdrawalsError extends Data.TaggedError("WithdrawalsError")<{
  message: string;
  cause?: unknown;
}> {}

/**
 * Schema for Withdrawals representing a map of reward accounts to coin amounts.
 * withdrawals = {+ reward_account => coin}
 *
 * @example
 * import { Withdrawals, RewardAccount, Coin } from "@lucid-evolution/experimental";
 *
 * const withdrawals = new Withdrawals({
 *   withdrawals: new Map([
 *     [new RewardAccount.RewardAccount({ ... }), Coin.make(1000000n)]
 *   ])
 * });
 *
 * @since 2.0.0
 * @category model
 */
export class Withdrawals extends Schema.TaggedClass<Withdrawals>()(
  "Withdrawals",
  {
    withdrawals: Schema.MapFromSelf({
      key: RewardAccount.RewardAccount,
      value: Coin.CoinSchema,
    }),
  },
) {
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return {
      _tag: "Withdrawals",
      withdrawals: Array.from(this.withdrawals.entries()).map(([acc, coin]) => [
        acc,
        coin.toString(),
      ]),
    };
  }
}

/**
 * Check if the given value is a valid Withdrawals
 *
 * @since 2.0.0
 * @category predicates
 */
export const isWithdrawals = Schema.is(Withdrawals);

/**
 * CDDL schema for Withdrawals as map structure.
 * withdrawals = {+ reward_account => coin}
 *
 * @since 2.0.0
 * @category schemas
 */
export const WithdrawalsCDDLSchema = Schema.Map({
  key: Bytes.BytesSchema,
  value: Schema.BigIntFromNumber,
});

/**
 * CBOR bytes transformation schema for Withdrawals.
 *
 * @since 2.0.0
 * @category schemas
 */
export const CBORBytesSchema = Schema.transformOrFail(
  Schema.typeSchema(Bytes.BytesSchema),
  Withdrawals,
  {
    strict: true,
    encode: (_, __, ___, toA) =>
      Effect.gen(function* () {
        const withdrawalsCDDL = Array.from(toA.withdrawals.entries()).map(
          ([key, value]) => [RewardAccount.Encode.bytes(key), value],
        );
        return yield* ParseResult.succeed(CBOR.Encode.bytes(withdrawalsCDDL));
      }),

    decode: (_, __, ___, fromA) =>
      Effect.gen(function* () {
        // const withdrawalsCDDL = yield* ParseResult.decode(
        //   CBOR.makeCBORBytesSchema(WithdrawalsCDDLSchema),
        // )(fromA);
        const value = yield* ParseResult.decode(CBOR.CBORBytesSchema())(fromA);
        const withdrawalsCDDL = yield* ParseResult.decodeUnknown(
          WithdrawalsCDDLSchema,
        )(value);
        // decode keys and value to the appropriate types
        const decodedWithdrawals = new Map<
          RewardAccount.RewardAccount,
          Coin.Coin
        >();
        for (const [key, value] of withdrawalsCDDL) {
          const rewardAccount = yield* ParseResult.decode(
            RewardAccount.BytesSchema,
          )(key);
          const coin = yield* ParseResult.decode(Coin.CoinSchema)(value);
          decodedWithdrawals.set(rewardAccount, coin);
        }
        return new Withdrawals({ withdrawals: decodedWithdrawals });
      }),
  },
);

/**
 * CBOR hex transformation schema for Withdrawals.
 *
 * @since 2.0.0
 * @category schemas
 */
export const CBORHexSchema = Schema.transformOrFail(
  Schema.typeSchema(Bytes.HexSchema),
  Withdrawals,
  {
    strict: true,
    encode: (_, __, ___, toA) =>
      pipe(
        ParseResult.encode(CBORBytesSchema)(toA),
        Effect.map(Bytes.Encode.hex),
      ),
    decode: (fromA) =>
      pipe(Bytes.Decode.hex(fromA), ParseResult.decode(CBORBytesSchema)),
  },
);

/**
 * Check if two Withdrawals instances are equal.
 *
 * @since 2.0.0
 * @category equality
 */
export const equals = (self: Withdrawals, that: Withdrawals): boolean => {
  if (self.withdrawals.size !== that.withdrawals.size) return false;

  for (const [account, coin] of self.withdrawals) {
    const otherCoin = that.withdrawals.get(account);
    if (!otherCoin || !Coin.equals(coin, otherCoin)) return false;
  }

  return true;
};

/**
 * FastCheck generator for Withdrawals instances.
 *
 * @since 2.0.0
 * @category generators
 */
export const generator = FastCheck.array(
  FastCheck.tuple(RewardAccount.generator, Coin.generator),
  { minLength: 0, maxLength: 10 },
).map((entries) => new Withdrawals({ withdrawals: new Map(entries) }));

/**
 * Create an empty Withdrawals instance.
 *
 * @example
 * import { Withdrawals } from "@lucid-evolution/experimental";
 *
 * const empty = Withdrawals.empty();
 *
 * @since 2.0.0
 * @category constructors
 */
export const empty = (): Withdrawals =>
  new Withdrawals({ withdrawals: new Map() });

/**
 * Create a Withdrawals instance with a single withdrawal.
 *
 * @example
 * import { Withdrawals, RewardAccount, Coin } from "@lucid-evolution/experimental";
 *
 * const rewardAccount = new RewardAccount.RewardAccount({ ... });
 * const withdrawals = Withdrawals.singleton(rewardAccount, Coin.make(1000000n));
 *
 * @since 2.0.0
 * @category constructors
 */
export const singleton = (
  rewardAccount: RewardAccount.RewardAccount,
  coin: Coin.Coin,
): Withdrawals =>
  new Withdrawals({ withdrawals: new Map([[rewardAccount, coin]]) });

/**
 * Create a Withdrawals instance from an array of [RewardAccount, Coin] pairs.
 *
 * @example
 * import { Withdrawals, RewardAccount, Coin } from "@lucid-evolution/experimental";
 *
 * const rewardAccount = new RewardAccount.RewardAccount({ ... });
 * const withdrawals = Withdrawals.fromEntries([[rewardAccount, Coin.make(1000000n)]]);
 *
 * @since 2.0.0
 * @category constructors
 */
export const fromEntries = (
  entries: Array<[RewardAccount.RewardAccount, Coin.Coin]>,
): Withdrawals => new Withdrawals({ withdrawals: new Map(entries) });

/**
 * Add a withdrawal to existing Withdrawals.
 *
 * @example
 * import { Withdrawals, RewardAccount, Coin } from "@lucid-evolution/experimental";
 *
 * const withdrawals = Withdrawals.empty();
 * const rewardAccount = new RewardAccount.RewardAccount({ ... });
 * const updatedWithdrawals = Withdrawals.add(withdrawals, rewardAccount, Coin.make(1000000n));
 *
 * @since 2.0.0
 * @category transformation
 */
export const add = (
  withdrawals: Withdrawals,
  rewardAccount: RewardAccount.RewardAccount,
  coin: Coin.Coin,
): Withdrawals => {
  const newMap = new Map(withdrawals.withdrawals);
  newMap.set(rewardAccount, coin);
  return new Withdrawals({ withdrawals: newMap });
};

/**
 * Remove a withdrawal from existing Withdrawals.
 *
 * @example
 * import { Withdrawals, RewardAccount } from "@lucid-evolution/experimental";
 *
 * const withdrawals = Withdrawals.singleton(rewardAccount, Coin.make(1000000n));
 * const updatedWithdrawals = Withdrawals.remove(withdrawals, rewardAccount);
 *
 * @since 2.0.0
 * @category transformation
 */
export const remove = (
  withdrawals: Withdrawals,
  rewardAccount: RewardAccount.RewardAccount,
): Withdrawals => {
  const newMap = new Map(withdrawals.withdrawals);
  newMap.delete(rewardAccount);
  return new Withdrawals({ withdrawals: newMap });
};

/**
 * Get the coin amount for a specific reward account.
 *
 * @example
 * import { Withdrawals, RewardAccount, Coin } from "@lucid-evolution/experimental";
 * import { Option } from "effect";
 *
 * const withdrawals = Withdrawals.singleton(rewardAccount, Coin.make(1000000n));
 * const coin = Withdrawals.get(withdrawals, rewardAccount);
 * // Option.some(Coin.make(1000000n))
 *
 * @since 2.0.0
 * @category transformation
 */
export const get = (
  withdrawals: Withdrawals,
  rewardAccount: RewardAccount.RewardAccount,
): Coin.Coin | undefined => withdrawals.withdrawals.get(rewardAccount);

/**
 * Check if Withdrawals contains a specific reward account.
 *
 * @example
 * import { Withdrawals, RewardAccount, Coin } from "@lucid-evolution/experimental";
 *
 * const withdrawals = Withdrawals.singleton(rewardAccount, Coin.make(1000000n));
 * const hasAccount = Withdrawals.has(withdrawals, rewardAccount); // true
 *
 * @since 2.0.0
 * @category predicates
 */
export const has = (
  withdrawals: Withdrawals,
  rewardAccount: RewardAccount.RewardAccount,
): boolean => withdrawals.withdrawals.has(rewardAccount);

/**
 * Check if Withdrawals is empty.
 *
 * @example
 * import { Withdrawals } from "@lucid-evolution/experimental";
 *
 * const withdrawals = Withdrawals.empty();
 * const empty = Withdrawals.isEmpty(withdrawals); // true
 *
 * @since 2.0.0
 * @category predicates
 */
export const isEmpty = (withdrawals: Withdrawals): boolean =>
  withdrawals.withdrawals.size === 0;

/**
 * Get the size (number of withdrawals) in Withdrawals.
 *
 * @example
 * import { Withdrawals, RewardAccount, Coin } from "@lucid-evolution/experimental";
 *
 * const withdrawals = Withdrawals.singleton(rewardAccount, Coin.make(1000000n));
 * const size = Withdrawals.size(withdrawals); // 1
 *
 * @since 2.0.0
 * @category transformation
 */
export const size = (withdrawals: Withdrawals): number =>
  withdrawals.withdrawals.size;

/**
 * Get all entries as an array of [reward account, coin] pairs.
 *
 * @example
 * import { Withdrawals, RewardAccount, Coin } from "@lucid-evolution/experimental";
 *
 * const withdrawals = Withdrawals.singleton(rewardAccount, Coin.make(1000000n));
 * const entries = Withdrawals.entries(withdrawals);
 *
 * @since 2.0.0
 * @category transformation
 */
export const entries = (
  withdrawals: Withdrawals,
): Array<[RewardAccount.RewardAccount, Coin.Coin]> =>
  Array.from(withdrawals.withdrawals.entries());

/**
 * Synchronous encoding utilities for Withdrawals.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Encode = {
  cborHex: Schema.encodeSync(CBORHexSchema),
  cborBytes: Schema.encodeSync(CBORBytesSchema),
};

/**
 * Synchronous decoding utilities for Withdrawals.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Decode = {
  cborHex: Schema.decodeUnknownSync(CBORHexSchema),
  cborBytes: Schema.decodeUnknownSync(CBORBytesSchema),
};

/**
 * Either encoding utilities for Withdrawals.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const EncodeEither = {
  cborHex: Schema.encodeEither(CBORHexSchema),
  cborBytes: Schema.encodeEither(CBORBytesSchema),
};

/**
 * Either decoding utilities for Withdrawals.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const DecodeEither = {
  cborHex: Schema.decodeUnknownEither(CBORHexSchema),
  cborBytes: Schema.decodeUnknownEither(CBORBytesSchema),
};
