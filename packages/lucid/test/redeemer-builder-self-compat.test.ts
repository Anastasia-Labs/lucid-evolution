import { describe, expect, test } from "vitest";
import { Effect, Layer, pipe } from "effect";
import {
  makeTxBuilder,
  Provider,
  RedeemerBuilder,
  SpendingValidator,
  UTxO,
  validatorToAddress,
} from "../src/index.js";
import { makeTxConfig } from "../src/tx-builder/TxConfig.js";
import {
  makeReplayConfig,
  replayTxActions,
} from "../src/tx-builder/TxBuilder.js";
import { TxConfig } from "../src/tx-builder/internal/Service.js";
import {
  createCostModels,
  PROTOCOL_PARAMETERS_DEFAULT,
} from "@lucid-evolution/utils";
import { Data } from "@lucid-evolution/plutus";

type SelfRedeemerBuilder = Extract<RedeemerBuilder, { kind: "self" }>;

const alwaysSucceedScript: SpendingValidator = {
  type: "PlutusV2",
  script: "49480100002221200101",
};

const scriptAddress = validatorToAddress("Custom", alwaysSucceedScript);
const provider = {} as Provider;
const protocolParameters = PROTOCOL_PARAMETERS_DEFAULT;
const costModels = createCostModels(protocolParameters.costModels);
const lucidConfig = {
  provider,
  network: "Custom" as const,
  wallet: undefined,
  txbuilderconfig: makeTxConfig(protocolParameters, costModels),
  costModels,
  protocolParameters,
  slotConfig: { zeroTime: 0, zeroSlot: 0, slotLength: 1_000 },
};

const makeSelfRedeemerBuilder = (): SelfRedeemerBuilder => ({
  kind: "self",
  makeRedeemer: (inputIndex: bigint) => Data.to(inputIndex),
});

const makeScriptUtxo = (txHash: string, lovelace: bigint): UTxO => ({
  txHash,
  outputIndex: 0,
  address: scriptAddress,
  assets: { lovelace },
  datum: Data.void(),
});

describe("RedeemerBuilder self compatibility", () => {
  test("collectFrom updates the caller-provided self builder inputs", () => {
    const input = makeScriptUtxo("01".repeat(32), 2_000_000n);
    const inputs = [input];
    const redeemerBuilder = makeSelfRedeemerBuilder();

    makeTxBuilder(lucidConfig).collectFrom(inputs, redeemerBuilder);

    expect(redeemerBuilder.inputs).toHaveLength(1);
    expect(redeemerBuilder.inputs?.[0].txHash).toBe(input.txHash);
    expect(redeemerBuilder.inputs).not.toBe(inputs);
    expect(redeemerBuilder.inputs?.[0]).not.toBe(input);
  });

  test("recorded collectFrom action keeps its snapshot after caller mutations", async () => {
    const originalTxHash = "11".repeat(32);
    const mutatedTxHash = "22".repeat(32);
    const originalInput = makeScriptUtxo(originalTxHash, 2_000_000n);
    const mutatedInput = makeScriptUtxo(mutatedTxHash, 9_000_000n);
    const inputs = [originalInput];
    const redeemerBuilder = makeSelfRedeemerBuilder();

    const tx = makeTxBuilder(lucidConfig)
      .attach.SpendingValidator(alwaysSucceedScript)
      .collectFrom(inputs, redeemerBuilder);

    inputs[0] = mutatedInput;
    originalInput.assets.lovelace = 8_000_000n;
    redeemerBuilder.inputs = [mutatedInput];

    const sourceConfig = tx.rawConfig();
    const replayConfig = makeReplayConfig(sourceConfig);
    await Effect.runPromise(
      pipe(
        replayTxActions(sourceConfig.actions),
        Effect.provide(Layer.succeed(TxConfig, { config: replayConfig })),
      ),
    );

    expect(replayConfig.collectedInputs).toHaveLength(1);
    expect(replayConfig.collectedInputs[0].txHash).toBe(originalTxHash);
    expect(replayConfig.collectedInputs[0].assets.lovelace).toBe(2_000_000n);
    expect(replayConfig.pendingRedeemers).toHaveLength(1);
    expect(replayConfig.pendingRedeemers[0].purposeKey).toEqual({
      tag: "spend",
      input: { txHash: originalTxHash, outputIndex: 0 },
    });
    expect(
      (replayConfig.pendingRedeemers[0].source as SelfRedeemerBuilder)
        .inputs?.[0].txHash,
    ).toBe(originalTxHash);
  });
});
