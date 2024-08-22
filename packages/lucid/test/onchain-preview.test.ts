import { describe, expect, test } from "vitest";
import { Effect, Layer, pipe } from "effect";
import {
  HelloContract,
  StakeContract,
  MintContract,
  User,
  NetworkConfig,
} from "./specs/services.js";
import * as HelloEndpoints from "./specs/hello.js";
import * as StakeEndpoints from "./specs/stake.js";
import * as MultiValidatorEndpoints from "./specs/multi-validators.js";
import * as MintBurnEndpoints from "./specs/mint-burn.js";
import * as ParametrizedEndpoints from "./specs/hello-params.js";
import * as TxChain from "./specs/tx-chaining.js";
import * as MetadataEndpoint from "./specs/metadata.js";

describe.sequential("Onchain testing", () => {
  test("TxChain", async () => {
    const program = pipe(
      TxChain.depositFundsCollect,
      Effect.provide(User.layer),
      Effect.provide(HelloContract.layer),
      Effect.provide(NetworkConfig.layerPreview),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("MultiValidator - registerStake", async () => {
    const program = pipe(
      MultiValidatorEndpoints.registerStake,
      Effect.provide(User.layer),
      Effect.provide(StakeContract.layer),
      Effect.provide(NetworkConfig.layerPreview),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("MultiValidator - DespositFunds", async () => {
    const program = pipe(
      MultiValidatorEndpoints.depositFunds,
      Effect.provide(User.layer),
      Effect.provide(StakeContract.layer),
      Effect.provide(MintContract.layer),
      Effect.provide(NetworkConfig.layerPreview),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("MultiValidator - CollectFunds", async () => {
    const program = pipe(
      MultiValidatorEndpoints.collectFunds,
      Effect.provide(User.layer),
      Effect.provide(StakeContract.layer),
      Effect.provide(MintContract.layer),
      Effect.provide(NetworkConfig.layerPreview),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("Metadata", async () => {
    const program = pipe(
      MetadataEndpoint.payWithMetadata,
      Effect.provide(User.layer),
      Effect.provide(HelloContract.layer),
      Effect.provide(NetworkConfig.layerPreview),
    );
    const exit = await Effect.runPromiseExit(program);
    console.log(exit);
    expect(exit._tag).toBe("Success");
  });

  test("DespositFunds", async () => {
    const program = pipe(
      HelloEndpoints.depositFunds,
      Effect.provide(User.layer),
      Effect.provide(HelloContract.layer),
      Effect.provide(NetworkConfig.layerPreview),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("CollectFunds", async () => {
    const program = pipe(
      HelloEndpoints.collectFunds,
      Effect.provide(User.layer),
      Effect.provide(HelloContract.layer),
      Effect.provide(NetworkConfig.layerPreview),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("DespositFunds, lock reference script", async () => {
    const program = pipe(
      HelloEndpoints.depositFundsLockRefScript,
      Effect.provide(User.layer),
      Effect.provide(HelloContract.layer),
      Effect.provide(NetworkConfig.layerPreview),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("CollectFunds , reading from reference script", async () => {
    const program = pipe(
      HelloEndpoints.collectFundsReadFrom,
      Effect.provide(User.layer),
      Effect.provide(HelloContract.layer),
      Effect.provide(NetworkConfig.layerPreview),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("registerStake", async () => {
    const program = pipe(
      StakeEndpoints.registerStake,
      Effect.provide(User.layer),
      Effect.provide(NetworkConfig.layerPreview),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("deRegisterStake", async () => {
    const program = pipe(
      StakeEndpoints.deRegisterStake,
      Effect.provide(User.layer),
      Effect.provide(NetworkConfig.layerPreview),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("registerStake/deRegisterStake", async () => {
    const program = pipe(
      StakeEndpoints.registerDeregisterStake,
      Effect.provide(User.layer),
      Effect.provide(NetworkConfig.layerPreview),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("registerStake", async () => {
    const program = pipe(
      StakeEndpoints.registerStake,
      Effect.provide(User.layer),
      Effect.provide(NetworkConfig.layerPreview),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("delegateTo", async () => {
    const program = pipe(
      StakeEndpoints.delegateTo,
      Effect.provide(User.layer),
      Effect.provide(NetworkConfig.layerPreview),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("withdrawAllReward", async () => {
    const program = pipe(
      StakeEndpoints.withdrawAllReward,
      Effect.provide(User.layer),
      Effect.provide(NetworkConfig.layerPreview),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("withdrawZero", async () => {
    const program = pipe(
      StakeEndpoints.withdrawZero,
      Effect.provide(User.layer),
      Effect.provide(NetworkConfig.layerPreview),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("deRegisterStake", async () => {
    const program = pipe(
      StakeEndpoints.deRegisterStake,
      Effect.provide(User.layer),
      Effect.provide(NetworkConfig.layerPreview),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("Parametrized Contract - Deposit Funds", async () => {
    const program = pipe(
      ParametrizedEndpoints.depositFunds,
      Effect.provide(User.layer),
      Effect.provide(NetworkConfig.layerPreview),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("Parametrized Contract - Collect Funds", async () => {
    const program = pipe(
      ParametrizedEndpoints.collectFunds,
      Effect.provide(User.layer),
      Effect.provide(NetworkConfig.layerPreview),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("Mint Test - Mint Token", async () => {
    const program = pipe(
      MintBurnEndpoints.mint,
      Effect.provide(User.layer),
      Effect.provide(MintContract.layer),
      Effect.provide(NetworkConfig.layerPreview),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("Mint Test - Burn Token", async () => {
    const program = pipe(
      MintBurnEndpoints.burn,
      Effect.provide(User.layer),
      Effect.provide(MintContract.layer),
      Effect.provide(NetworkConfig.layerPreview),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("Mint Test - Mint/Burn Token", async () => {
    const program = pipe(
      MintBurnEndpoints.mintburn,
      Effect.provide(User.layer),
      Effect.provide(NetworkConfig.layerPreview),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("Mint Test - Mint Token, Second Test", async () => {
    const program = pipe(
      MintBurnEndpoints.mint2,
      Effect.provide(User.layer),
      Effect.provide(NetworkConfig.layerPreview),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("Mint Test - Burn Token, Second Test", async () => {
    const program = pipe(
      MintBurnEndpoints.burn2,
      Effect.provide(User.layer),
      Effect.provide(NetworkConfig.layerPreview),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("Mint Test - Pay ADA", async () => {
    const program = pipe(
      MintBurnEndpoints.pay,
      Effect.provide(User.layer),
      Effect.provide(NetworkConfig.layerPreview),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("Mint Test - Pay Asset", async () => {
    const program = pipe(
      MintBurnEndpoints.pay2,
      Effect.provide(User.layer),
      Effect.provide(NetworkConfig.layerPreview),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("Mint Test - CollectFunds", async () => {
    const program = pipe(
      MintBurnEndpoints.pay3,
      Effect.provide(User.layer),
      Effect.provide(NetworkConfig.layerPreview),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("Mint Test - PayWithData", async () => {
    const program = pipe(
      MintBurnEndpoints.payWithData,
      Effect.provide(User.layer),
      Effect.provide(NetworkConfig.layerPreview),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("Mint Test - MissVkeyWitness", async () => {
    const program = pipe(
      MintBurnEndpoints.payWithoutVkeyWitness,
      Effect.provide(User.layer),
      Effect.provide(NetworkConfig.layerPreview),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Failure");
  });
});
