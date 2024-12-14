import { assert, describe, expect, test } from "vitest";
import { Effect, Layer, pipe } from "effect";
import {
  emulator,
  mintInSlotRange,
  EmulatorUser,
  registerStake,
  delegateTo,
  EMULATOR_POOL_ID,
  REWARD_AMOUNT,
  deRegisterStake,
  evaluateAContract,
  withdrawReward,
  evaluateAContractWithDatum,
  compose,
  multiSigner,
  signByWalletFromPrivateKey,
  emulatorFromPrivateKey,
  depositFundsLockRefScript,
  sendAllFund,
  multiTxCompose,
  composeMintTx,
  composeMintAndStake,
  composeDeregister,
} from "./service.js";

const distributeRewards = Effect.gen(function* ($) {
  const { user, emulator } = yield* EmulatorUser;
  emulator.distributeRewards(REWARD_AMOUNT);
  const rewardInfo = yield* pipe(
    Effect.promise(() => user.wallet().getDelegation()),
    Effect.andThen(Effect.fromNullable),
  );
  assert.deepEqual(rewardInfo.poolId, EMULATOR_POOL_ID);
  assert.deepEqual(rewardInfo.rewards, REWARD_AMOUNT);
});

describe.sequential("Emulator", () => {
  test("composeMintTx", async () => {
    const program = pipe(composeMintTx, Effect.provide(EmulatorUser.layer));
    const exit = await Effect.runPromiseExit(program);
    emulator.awaitBlock(1);
    emulatorFromPrivateKey.awaitBlock(1);
    expect(exit._tag).toBe("Success");
  });

  test.skip("composeMintAndStake", async () => {
    const program = pipe(
      composeMintAndStake,
      Effect.provide(EmulatorUser.layer),
    );
    const exit = await Effect.runPromiseExit(program);
    emulator.awaitBlock(4);
    emulatorFromPrivateKey.awaitBlock(4);
    expect(exit._tag).toBe("Success");
  });

  test.skip("composeDeregister", async () => {
    const program = pipe(composeDeregister, Effect.provide(EmulatorUser.layer));
    const exit = await Effect.runPromiseExit(program);
    emulator.awaitBlock(1);
    emulatorFromPrivateKey.awaitBlock(1);
    expect(exit._tag).toBe("Success");
  });

  test("compose", async () => {
    const program = pipe(compose, Effect.provide(EmulatorUser.layer));
    const exit = await Effect.runPromiseExit(program);
    emulator.awaitBlock(1);
    emulatorFromPrivateKey.awaitBlock(1);
    expect(exit._tag).toBe("Success");
  });

  test("multiTxCompose", async () => {
    const program = pipe(multiTxCompose, Effect.provide(EmulatorUser.layer));
    const exit = await Effect.runPromiseExit(program);
    emulator.awaitBlock(1);
    emulatorFromPrivateKey.awaitBlock(1);
    expect(exit._tag).toBe("Success");
  });

  test("waitBlock", async () => {
    const program = pipe(
      mintInSlotRange,
      Effect.provide(Layer.mergeAll(EmulatorUser.layer)),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
    emulator.awaitBlock(14);
    emulatorFromPrivateKey.awaitBlock(14);
    const exit1 = await Effect.runPromiseExit(program);
    expect(exit1._tag).toBe("Failure");
  });

  test("registerStake", async () => {
    const program = pipe(registerStake, Effect.provide(EmulatorUser.layer));
    const exit = await Effect.runPromiseExit(program);
    emulator.awaitBlock(4);
    emulatorFromPrivateKey.awaitBlock(4);
    expect(exit._tag).toBe("Success");
  });

  test("delegateTo", async () => {
    const program = pipe(delegateTo, Effect.provide(EmulatorUser.layer));
    const exit = await Effect.runPromiseExit(program);
    emulator.awaitBlock(4);
    emulatorFromPrivateKey.awaitBlock(4);
    expect(exit._tag).toBe("Success");
  });

  test("withdrawAmount", async () => {
    const program = pipe(
      withdrawReward(0n),
      Effect.provide(EmulatorUser.layer),
    );
    const exit = await Effect.runPromiseExit(program);
    emulator.awaitBlock(4);
    emulatorFromPrivateKey.awaitBlock(4);
    expect(exit._tag).toBe("Success");
  });

  test("distributeRewards", async () => {
    const program = pipe(distributeRewards, Effect.provide(EmulatorUser.layer));
    const exit = await Effect.runPromiseExit(program);
    emulator.awaitBlock(4);
    emulatorFromPrivateKey.awaitBlock(4);
    expect(exit._tag).toBe("Success");
  });

  test("withdrawRewards", async () => {
    const program = pipe(
      withdrawReward(REWARD_AMOUNT),
      Effect.provide(EmulatorUser.layer),
    );
    const exit = await Effect.runPromiseExit(program);
    emulator.awaitBlock(4);
    emulatorFromPrivateKey.awaitBlock(4);
    expect(exit._tag).toBe("Success");
  });

  test("withdrawZeroAgain", async () => {
    const program = pipe(
      withdrawReward(0n),
      Effect.provide(EmulatorUser.layer),
    );
    const exit = await Effect.runPromiseExit(program);
    emulator.awaitBlock(4);
    emulatorFromPrivateKey.awaitBlock(4);
    expect(exit._tag).toBe("Success");
  });

  test.skip("deRegisterStake", async () => {
    const program = pipe(deRegisterStake, Effect.provide(EmulatorUser.layer));
    const exit = await Effect.runPromiseExit(program);
    emulator.awaitBlock(4);
    emulatorFromPrivateKey.awaitBlock(4);
    expect(exit._tag).toBe("Success");
  });

  test("evaluateAContract", async () => {
    const program = pipe(evaluateAContract, Effect.provide(EmulatorUser.layer));
    const exit = await Effect.runPromiseExit(program);
    emulator.awaitBlock(4);
    emulatorFromPrivateKey.awaitBlock(4);
    expect(exit._tag).toBe("Success");
  });

  test("evaluateAContractWithDatum", async () => {
    const program = pipe(
      evaluateAContractWithDatum,
      Effect.provide(EmulatorUser.layer),
    );
    const exit = await Effect.runPromiseExit(program);
    emulator.awaitBlock(4);
    emulatorFromPrivateKey.awaitBlock(4);
    expect(exit._tag).toBe("Success");
  });

  test("multiSigner", async () => {
    const program = pipe(multiSigner, Effect.provide(EmulatorUser.layer));
    const exit = await Effect.runPromiseExit(program);
    emulator.awaitBlock(4);
    emulatorFromPrivateKey.awaitBlock(4);
    expect(exit._tag).toBe("Success");
  });

  test("signByWalletFromPrivateKey", async () => {
    const program = pipe(
      signByWalletFromPrivateKey,
      Effect.provide(EmulatorUser.layer),
    );
    const exit = await Effect.runPromiseExit(program);
    emulator.awaitBlock(4);
    emulatorFromPrivateKey.awaitBlock(4);
    expect(exit._tag).toBe("Success");
  });
  test("txWithReferenceScript", async () => {
    const program = pipe(
      depositFundsLockRefScript,
      Effect.provide(EmulatorUser.layer),
    );
    const exit = await Effect.runPromiseExit(program);
    emulator.awaitBlock(4);
    emulatorFromPrivateKey.awaitBlock(4);
    expect(exit._tag).toBe("Success");
  });
  test("sendAllFund", async () => {
    const program = pipe(sendAllFund, Effect.provide(EmulatorUser.layer));
    const exit = await Effect.runPromiseExit(program);
    emulator.awaitBlock(4);
    emulatorFromPrivateKey.awaitBlock(4);
    expect(exit._tag).toBe("Success");
  });
});
