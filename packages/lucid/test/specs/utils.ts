import { Console, Effect, Logger, LogLevel, pipe, Schedule } from "effect";
import { TxSignBuilder } from "../../src/index.js";
import { User } from "./services.js";

export const handleSignSubmit = (signBuilder: TxSignBuilder) =>
  Effect.gen(function* () {
    const { user } = yield* User;
    const signed = yield* signBuilder.sign.withWallet().completeProgram();
    const txHash = yield* signed.submitProgram();
    yield* Effect.logDebug(`🚀 Transaction submitted: ${txHash}`);
    yield* Effect.logDebug(`Confirming Transaction...`);
    yield* Effect.tryPromise(() => user.awaitTx(txHash, 20_000));
    yield* Effect.logDebug(`✅ Transaction confirmed: ${txHash}`);
    yield* Effect.logDebug("Pausing for 10 seconds...");
    yield* Effect.sleep("10 seconds");
  });

export const handleSignSubmitWithoutValidation = (signBuilder: TxSignBuilder) =>
  Effect.gen(function* () {
    const signed = yield* signBuilder.sign.withWallet().completeProgram();
    const txHash = yield* signed.submitProgram();
    yield* Effect.logDebug(`🚀 Transaction submitted: ${txHash}`);
  });

export const withLogRetry = <A, E, R>(effect: Effect.Effect<A, E, R>) =>
  pipe(
    effect,
    Effect.tapError(Console.log),
    Effect.tapError((_) => Effect.log("💥️ Recovering from error")),
    Logger.withMinimumLogLevel(LogLevel.Debug),
    Effect.retry(
      Schedule.compose(Schedule.exponential(10_000), Schedule.recurs(5)),
    ),
  );

export const withLogNoRetry = <A, E, R>(effect: Effect.Effect<A, E, R>) =>
  pipe(
    effect,
    Effect.tapError(Console.log),
    Logger.withMinimumLogLevel(LogLevel.Debug),
  );
