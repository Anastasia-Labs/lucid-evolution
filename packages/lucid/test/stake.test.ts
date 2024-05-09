import { describe, expect, test } from "vitest";
import { Blockfrost, Lucid, TxBuilderError, TxSignerError } from "../src";
import { Config, Console, Effect, Schedule, pipe } from "effect";

const loadUser = Effect.gen(function* ($) {
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
    const program = Effect.gen(function* ($) {
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
      const txHash = yield* signed.submit().program()
      yield* Effect.logInfo(txHash);
    }).pipe(
      // Effect.tapError(Effect.logError),
      Effect.catchTag("UnknownException", (error) =>
        error.message.includes("StakeKeyAlreadyRegisteredDELEG")
          ? Effect.void
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
    const program = Effect.gen(function* ($) {
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
      const txHash = yield* signed.submit().program()
      yield* Effect.logInfo(txHash);
    }).pipe(
      Effect.retry(
        Schedule.compose(Schedule.exponential(20_000), Schedule.recurs(4)),
      ),
    );

    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test.sequential("registerStake/deRegisterStake", async () => {
    const program = Effect.gen(function* ($) {
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
      const txHash = yield* signed.submit().program()
      yield* Effect.logInfo(txHash);
    }).pipe(
      Effect.catchTag("UnknownException", (error) =>
        error.message.includes("StakeKeyAlreadyRegisteredDELEG")
          ? Effect.void
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

describe("Withdraw", () => {
  test.sequential("registerStake", async () => {
    const program = Effect.gen(function* () {
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
      const txHash = yield* signed.submit().program()
      yield* Effect.logInfo(txHash);
    }).pipe(
      Effect.catchTag("UnknownException", (error) =>
        error.message.includes("StakeKeyAlreadyRegisteredDELEG")
          ? Effect.void
          : Effect.fail(error),
      ),
      Effect.retry(
        Schedule.compose(Schedule.exponential(20_000), Schedule.recurs(4)),
      ),
    );

    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test.sequential("withdrawZero", async () => {
    const program = Effect.gen(function* ($) {
      const user = yield* loadUser;
      const rewardAddress = yield* pipe(
        Effect.promise(() => user.wallet().rewardAddress()),
        Effect.andThen(Effect.fromNullable),
      );
      const signBuilder = yield* user
        .newTx()
        .withdraw(rewardAddress, 0n)
        .complete()
        .program();
      const signed = yield* signBuilder.sign.withWallet().complete().program();
      const txHash = yield* signed.submit().program()
      yield* Effect.logInfo(txHash);
    }).pipe(
      Effect.retry(
        Schedule.compose(Schedule.exponential(20_000), Schedule.recurs(4)),
      ),
    );

    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });
});
