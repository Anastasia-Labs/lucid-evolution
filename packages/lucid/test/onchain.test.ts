import { describe, expect, test } from "vitest";
import { Effect, Layer, pipe } from "effect";
import { HelloContract, User } from "./specs/services.js";
import * as HelloEndpoints from "./specs/hello.js";
import * as StakeEndpoints from "./specs/stake.js";
import * as ParametrizedEndpoints from "./specs/hello-params.js";

describe.sequential("Hello", () => {
  test("DespositFunds", async () => {
    const program = pipe(
      HelloEndpoints.depositFunds,
      Effect.provide(Layer.mergeAll(User.layer, HelloContract.layer)),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("CollectFunds", async () => {
    const program = pipe(
      HelloEndpoints.collectFunds,
      Effect.provide(Layer.mergeAll(User.layer, HelloContract.layer)),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("DespositFunds, lock reference script", async () => {
    const program = pipe(
      HelloEndpoints.depositFundsLockRefScript,
      Effect.provide(Layer.mergeAll(User.layer, HelloContract.layer)),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("CollectFunds , reading from reference script", async () => {
    const program = pipe(
      HelloEndpoints.collectFundsReadFrom,
      Effect.provide(Layer.mergeAll(User.layer, HelloContract.layer)),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });
});

describe.sequential("Stake", () => {
  test("registerStake", async () => {
    const program = pipe(
      StakeEndpoints.registerStake,
      Effect.provide(User.layer),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("deRegisterStake", async () => {
    const program = pipe(
      StakeEndpoints.deRegisterStake,
      Effect.provide(User.layer),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("registerStake/deRegisterStake", async () => {
    const program = pipe(
      StakeEndpoints.registerDeregisterStake,
      Effect.provide(User.layer),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });
});

describe.sequential("Withdraw", () => {
  test("registerStake", async () => {
    const program = pipe(
      StakeEndpoints.registerStake,
      Effect.provide(User.layer),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("withdrawZero", async () => {
    const program = pipe(
      StakeEndpoints.withdrawZero,
      Effect.provide(User.layer),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });
});

describe.sequential("Parametrized Contract", () => {
  test("Deposit Funds", async () => {
    const program = pipe(
      ParametrizedEndpoints.depositFunds,
      Effect.provide(Layer.mergeAll(User.layer)),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("Collect Funds", async () => {
    const program = pipe(
      ParametrizedEndpoints.collectFunds,
      Effect.provide(Layer.mergeAll(User.layer)),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });
});
