import { describe, expect, test } from "vitest";
import { Effect, Layer, pipe } from "effect";
import { HelloContract, User } from "./specs/services.js";
import * as HelloEndpoints from "./specs/hello.js";
import * as StakeEndpoints from "./specs/stake.js";
import * as MintBurnEndpoints from "./specs/mint-burn.js";
import * as ParametrizedEndpoints from "./specs/hello-params.js";
import * as TxChain from "./specs/tx-chaining.js";
import * as MetadataEndpoint from "./specs/metadata.js";

describe("Onchain testing", () => {
  test("TxChain", async () => {
    const program = pipe(
      TxChain.depositFundsCollect,
      Effect.provide(Layer.mergeAll(User.layer, HelloContract.layer)),
    );
    const exit = await Effect.runPromiseExit(program);
    console.log(exit);
    expect(exit._tag).toBe("Success");
  });
  test("Metadata", async () => {
    const program = pipe(
      MetadataEndpoint.payWithMetadata,
      Effect.provide(Layer.mergeAll(User.layer, HelloContract.layer)),
    );
    const exit = await Effect.runPromiseExit(program);
    console.log(exit);
    expect(exit._tag).toBe("Success");
  });

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

  test("Parametrized Contract - Deposit Funds", async () => {
    const program = pipe(
      ParametrizedEndpoints.depositFunds,
      Effect.provide(Layer.mergeAll(User.layer)),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("Parametrized Contract - Collect Funds", async () => {
    const program = pipe(
      ParametrizedEndpoints.collectFunds,
      Effect.provide(Layer.mergeAll(User.layer)),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("Mint Test - Mint Token", async () => {
    const program = pipe(
      MintBurnEndpoints.mint,
      Effect.provide(Layer.mergeAll(User.layer)),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("Mint Test - Burn Token", async () => {
    const program = pipe(
      MintBurnEndpoints.burn,
      Effect.provide(Layer.mergeAll(User.layer)),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("Mint Test - Mint/Burn Token", async () => {
    const program = pipe(
      MintBurnEndpoints.mintburn,
      Effect.provide(Layer.mergeAll(User.layer)),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("Mint Test - Mint Token, Second Test", async () => {
    const program = pipe(
      MintBurnEndpoints.mint2,
      Effect.provide(Layer.mergeAll(User.layer)),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("Mint Test - Burn Token, Second Test", async () => {
    const program = pipe(
      MintBurnEndpoints.burn2,
      Effect.provide(Layer.mergeAll(User.layer)),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });
  test("Mint Test - Pay ADA", async () => {
    const program = pipe(
      MintBurnEndpoints.pay,
      Effect.provide(Layer.mergeAll(User.layer)),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });
  test("Mint Test - Pay Asset", async () => {
    const program = pipe(
      MintBurnEndpoints.pay2,
      Effect.provide(Layer.mergeAll(User.layer)),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });
  test("Mint Test - CollectFunds", async () => {
    const program = pipe(
      MintBurnEndpoints.pay3,
      Effect.provide(Layer.mergeAll(User.layer, HelloContract.layer)),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });
});
