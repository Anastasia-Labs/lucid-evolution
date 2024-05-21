import { describe, expect, test } from "vitest";
import { Effect, Layer, pipe } from "effect";
import { HelloContract, User } from "./services.js";
import {
  collectFunds,
  collectFundsReadFrom,
  depositFunds,
  depositFundsLockRefScript,
} from "./hello.js";
import {
  registerStake,
  deRegisterStake,
  registerDeregisterStake,
  withdrawZero,
} from "./stake.js";

describe.sequential("Hello", () => {
  test("DespositFunds", async () => {
    const program = pipe(
      depositFunds,
      Effect.provide(Layer.mergeAll(User.layer, HelloContract.layer)),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("CollectFunds", async () => {
    const program = pipe(
      collectFunds,
      Effect.provide(Layer.mergeAll(User.layer, HelloContract.layer)),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("DespositFunds, lock reference script", async () => {
    const program = pipe(
      depositFundsLockRefScript,
      Effect.provide(Layer.mergeAll(User.layer, HelloContract.layer)),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("CollectFunds , reading from reference script", async () => {
    const program = pipe(
      collectFundsReadFrom,
      Effect.provide(Layer.mergeAll(User.layer, HelloContract.layer)),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });
});

describe.sequential("Stake", () => {
  test("registerStake", async () => {
    const program = pipe(registerStake, Effect.provide(User.layer));
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("deRegisterStake", async () => {
    const program = pipe(deRegisterStake, Effect.provide(User.layer));
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("registerStake/deRegisterStake", async () => {
    const program = pipe(registerDeregisterStake, Effect.provide(User.layer));
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });
});

describe.sequential("Withdraw", () => {
  test("registerStake", async () => {
    const program = pipe(registerStake, Effect.provide(User.layer));
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("withdrawZero", async () => {
    const program = pipe(withdrawZero, Effect.provide(User.layer));
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });
});
