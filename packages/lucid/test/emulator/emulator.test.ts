import { describe, expect } from "vitest";
import { it } from "@effect/vitest";
import { Effect, Layer, pipe, Record, Option } from "effect";
import { User } from "./service/EmulatorUser.js";
import { EmulatorInstance } from "./service/EmulatorInstance.js";
import * as StakeExecutor from "./executor/StakeExecutor.js";
import * as PayExecutor from "./executor/PayExecutor.js";
import * as MintExecutor from "./executor/MintExecutor.js";
import * as HelloExecutor from "./executor/HelloExecutor.js";
import * as SignExecutor from "./executor/SignExecutor.js";
import { HelloContract } from "../specs/services.js";
import { Data } from "@evolution-sdk/plutus";
import { CONSTANTS } from "./Constants.js";

const TestEnvironment = pipe(
  Layer.provide(User.layer, EmulatorInstance.layer),
  Layer.merge(EmulatorInstance.layer),
);

describe("Emulator", () => {
  it.effect("should successfully mint tokens with composed transaction", () =>
    Effect.gen(function* () {
      const { assetId, quantity, userUTxOs } = yield* MintExecutor.mintAndPay();
      const hasAsset = userUTxOs.some(
        (utxo) =>
          Record.has(utxo.assets, assetId) &&
          Record.get(utxo.assets, assetId).pipe(Option.getOrElse(() => 0n)) ===
            quantity,
      );
      expect(hasAsset).toBe(true);
    }).pipe(Effect.provide(TestEnvironment)),
  );

  it.effect(
    "should successfully mint tokens and register stake address in one composed transaction",
    () =>
      Effect.gen(function* () {
        const { assetId, quantity, userUTxOs } =
          yield* MintExecutor.mintAndStake();
        const hasAsset = userUTxOs.some(
          (utxo) =>
            Record.has(utxo.assets, assetId) &&
            Record.get(utxo.assets, assetId).pipe(
              Option.getOrElse(() => 0n),
            ) === quantity,
        );
        const hasDatumZero = userUTxOs.some(
          (utxo) => utxo.datum === Data.to(0n),
        );
        expect(hasDatumZero).toBe(true);
        expect(hasAsset).toBe(true);
      }).pipe(Effect.provide(TestEnvironment)),
  );

  //NOTE: This test is failing because the stake address is not being deregistered
  // TxSubmitError: Error: Extraneous vkey witness. Key hash: 2f1d5aa2f580814c5ce8658c18c0a35be369edcb047d5f7a455b185a
  it.effect.fails("should register and then deregister stake address", () =>
    Effect.gen(function* () {
      yield* StakeExecutor.registerStake;
      yield* StakeExecutor.deregisterStake;
    }).pipe(Effect.provide(TestEnvironment)),
  );

  it.effect(
    "should successfully compose transaction with always succeed script",
    () =>
      Effect.gen(function* () {
        const { alwaysSucceedUtxos } =
          yield* PayExecutor.withDatumHashAndInlineDatum;
        const hasDatum = alwaysSucceedUtxos.some(
          (utxo) => utxo.datum === Data.to("31313131"),
        );
        const hasDatumHash = alwaysSucceedUtxos.some(
          (utxo) =>
            utxo.datumHash ===
            "33f1fa0beaeac56d9f7c73033333bffcf30c8a06ca7045e40ef6b70bcc1550e1",
        );
        expect(hasDatum).toBe(true);
        expect(hasDatumHash).toBe(true);
      }).pipe(Effect.provide(TestEnvironment)),
  );

  it.effect(
    "should mint tokens with correct quantity in valid slot range",
    () =>
      Effect.gen(function* () {
        const { assetId, quantity, userUTxOs } =
          yield* MintExecutor.mintInSlotRange();
        const [utxo] = userUTxOs;
        expect(Record.get(utxo.assets, assetId)).toEqual(Option.some(quantity));
      }).pipe(Effect.provide(TestEnvironment)),
  );

  it.effect(
    "should register stake address and verify 75M lovelace balance deduction",
    () =>
      Effect.gen(function* () {
        const registerResult = yield* StakeExecutor.registerStake;
        const [utxo] = registerResult.userUTxOs;
        expect(utxo.assets["lovelace"]).toBeLessThan(75_000_000_000n);
      }).pipe(Effect.provide(TestEnvironment)),
  );

  it.effect(
    "should deposit funds to Hello contract and verify successful collection",
    () =>
      Effect.gen(function* () {
        const depositResult = yield* HelloExecutor.depositFunds;
        expect(depositResult.contractUTxOs.length).toBe(1);

        const collectResult = yield* HelloExecutor.collectFromReadFrom;
        expect(collectResult.contractUTxOs.length).toBe(0);
        expect(collectResult.userUTxOs.length).toBe(2);
      }).pipe(
        Effect.provide(TestEnvironment),
        Effect.provide(HelloContract.layer),
      ),
  );

  it.effect("should successfully delegate to stake pool", () =>
    Effect.gen(function* () {
      const { emulator } = yield* EmulatorInstance;
      const { rewardAddress } = yield* User;
      yield* StakeExecutor.registerStake;
      yield* StakeExecutor.delegateStake;
      expect(emulator.chain[rewardAddress]).toEqual({
        registeredStake: true,
        delegation: {
          poolId: CONSTANTS.EMULATOR_POOL_ID,
          rewards: CONSTANTS.REWARD_AMOUNT,
        },
      });
    }).pipe(Effect.provide(TestEnvironment)),
  );

  it.effect(
    "should successfully register, delegate, receive rewards, and withdraw them",
    () =>
      Effect.gen(function* () {
        const { emulator } = yield* EmulatorInstance;
        const { rewardAddress } = yield* User;
        yield* StakeExecutor.registerStake;
        yield* StakeExecutor.delegateStake;
        yield* StakeExecutor.withdrawRewardAmount({
          rewardAmount: CONSTANTS.REWARD_AMOUNT,
        });
        // Verify that the delegation and rewards are correctly updated
        expect(emulator.chain[rewardAddress]).toEqual({
          registeredStake: true,
          delegation: {
            poolId: CONSTANTS.EMULATOR_POOL_ID,
            rewards: 0n,
          },
        });
      }).pipe(Effect.provide(TestEnvironment)),
  );

  //NOTE: This test is failing because the ledger is not allowing withdrawing 0 rewards
  //TxSubmitError: Error: Withdrawal amount doesn't match actual reward balance.
  it.effect.fails(
    "should successfully register, delegate, receive rewards, and withdraw 0 rewards",
    () =>
      Effect.gen(function* () {
        yield* StakeExecutor.registerStake;
        yield* StakeExecutor.delegateStake;
        yield* StakeExecutor.withdrawRewardAmount({
          rewardAmount: 0n,
        });
      }).pipe(Effect.provide(TestEnvironment)),
  );

  it.effect("should successfully send all funds to Hello contract", () =>
    Effect.gen(function* () {
      const contractUTxOs = yield* PayExecutor.sendAllFund;
      expect(contractUTxOs.length).toBe(1);
    }).pipe(
      Effect.provide(TestEnvironment),
      Effect.provide(HelloContract.layer),
    ),
  );
  it.effect("should successfully compose multiple transactions", () =>
    Effect.gen(function* () {
      const userUTxOs = yield* PayExecutor.multiTxCompose;
      expect(userUTxOs.length).toBe(6);
    }).pipe(Effect.provide(TestEnvironment)),
  );
  it.effect("should successfully compose mint and pay transactions", () =>
    Effect.gen(function* () {
      yield* PayExecutor.mintAndPayTxCompose;
    }).pipe(Effect.provide(TestEnvironment)),
  );
  it.effect("should successfully verify message", () =>
    Effect.gen(function* () {
      const isValid = yield* SignExecutor.verifySignedMessage;
      expect(isValid).toBe(true);
    }).pipe(Effect.provide(TestEnvironment)),
  );
  it.effect("should successfully verify add signer key", () =>
    Effect.gen(function* () {
      const isValid = yield* SignExecutor.verifyAddSignerKey;
      expect(isValid).toBe(true);
    }).pipe(Effect.provide(TestEnvironment)),
  );
});
