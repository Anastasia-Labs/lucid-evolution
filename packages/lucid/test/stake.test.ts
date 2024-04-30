import { describe, expect, test } from "vitest";
import { Blockfrost, Lucid, LucidEvolution } from "../src";
import { Config, Effect, Schedule, pipe } from "effect";
import { TransactionError, TxSignerError } from "../src/Errors";
import { ConfigError } from "effect/ConfigError";
import { NoSuchElementException, UnknownException } from "effect/Cause";

const loadUser: Effect.Effect<LucidEvolution, UnknownException | ConfigError> =
  Effect.gen(function* ($) {
    const [apiURL, apiKey, seed] = yield* Config.all([
      Config.string("VITE_API_URL"),
      Config.string("VITE_BLOCKFROST_KEY"),
      Config.string("VITE_SEED"),
    ]);
    const user = yield* Effect.tryPromise(() =>
      Lucid(new Blockfrost(apiURL, apiKey), "Preprod"),
    );
    user.selectWallet.fromSeed(seed);
    return user;
  });

describe("Stake", () => {
  test.sequential("registerStake", async () => {
    const program: Effect.Effect<
      void,
      | NoSuchElementException
      | UnknownException
      | TransactionError
      | TxSignerError
      | ConfigError
    > = Effect.gen(function* ($) {
      const user = yield* loadUser;
      const rewardAddress = yield* pipe(
        Effect.promise(() => user.wallet().rewardAddress()),
        Effect.andThen(Effect.fromNullable),
      );
      const signBuilder = yield* user
        .newTx()
        .registerStake(rewardAddress)
        .complete()
        .program();
      const signed = yield* signBuilder.sign.withWallet().complete().program();
      const txHash = yield* Effect.tryPromise(() => signed.submit());
      yield* Effect.log(txHash);
    }).pipe(
      Effect.tapErrorCause(Effect.logError),
      Effect.catchTag("UnknownException", (error) =>
        error.message.includes("StakeKeyAlreadyRegisteredDELEG")
          ? Effect.succeed(Effect.void)
          : Effect.fail(error),
      ),
      Effect.retry(
        Schedule.compose(Schedule.exponential(20_000), Schedule.recurs(4)),
      ),
    );

    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test.sequential("deRegisterStake", async () => {
    const program: Effect.Effect<
      void,
      | NoSuchElementException
      | UnknownException
      | Error
      | TransactionError
      | TxSignerError
      | ConfigError
    > = Effect.gen(function* ($) {
      const user = yield* loadUser;
      const rewardAddress = yield* pipe(
        Effect.promise(() => user.wallet().rewardAddress()),
        Effect.andThen(Effect.fromNullable),
      );
      const signBuilder = yield* user
        .newTx()
        .deRegisterStake(rewardAddress)
        .complete()
        .program();
      const signed = yield* signBuilder.sign.withWallet().complete().program();
      const txHash = yield* Effect.tryPromise(() => signed.submit());
      yield* Effect.log(txHash);
    }).pipe(
      Effect.tapErrorCause(Effect.logError),
      Effect.retry(
        Schedule.compose(Schedule.exponential(20_000), Schedule.recurs(4)),
      ),
    );

    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test.sequential("registerStake/deRegisterStake", async () => {
    const program: Effect.Effect<
      void,
      | NoSuchElementException
      | UnknownException
      | TransactionError
      | TxSignerError
      | ConfigError
    > = Effect.gen(function* ($) {
      const user = yield* loadUser;
      const rewardAddress = yield* pipe(
        Effect.promise(() => user.wallet().rewardAddress()),
        Effect.andThen(Effect.fromNullable),
      );
      const signBuilder = yield* user
        .newTx()
        .registerStake(rewardAddress)
        .deRegisterStake(rewardAddress)
        .complete()
        .program();
      const signed = yield* signBuilder.sign.withWallet().complete().program();
      const txHash = yield* Effect.tryPromise(() => signed.submit());
      yield* Effect.log(txHash);
    }).pipe(
      Effect.tapErrorCause(Effect.logError),
      Effect.catchTag("UnknownException", (error) =>
        error.message.includes("StakeKeyAlreadyRegisteredDELEG")
          ? Effect.succeed(Effect.void)
          : Effect.fail(error),
      ),
      Effect.retry(
        Schedule.compose(Schedule.exponential(20_000), Schedule.recurs(4)),
      ),
    );

    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });
});
