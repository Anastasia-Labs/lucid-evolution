import { beforeEach, describe, expect, test, vi } from "vitest";
import {
  EvaluationInput,
  ProtocolParameters,
} from "@lucid-evolution/core-types";
import { createScalusEvaluator, decodeCostModels } from "../src/index.js";

const mocks = vi.hoisted(() => ({
  evalPlutusScripts: vi.fn<() => unknown[]>(() => []),
}));

vi.mock("scalus", () => ({
  default: {
    SlotConfig: class SlotConfig {
      constructor(
        readonly zeroTime: number,
        readonly zeroSlot: number,
        readonly slotLength: number,
      ) {}
    },
    Scalus: {
      evalPlutusScripts: mocks.evalPlutusScripts,
    },
  },
}));

const costModels = {
  PlutusV1: [1],
  PlutusV2: [2],
  PlutusV3: [3],
};

const protocolParameters: ProtocolParameters = {
  minFeeA: 44,
  minFeeB: 155381,
  maxTxSize: 16384,
  maxValSize: 5000,
  keyDeposit: 2_000_000n,
  poolDeposit: 500_000_000n,
  drepDeposit: 500_000_000n,
  govActionDeposit: 100_000_000_000n,
  priceMem: 0.0577,
  priceStep: 0.0000721,
  maxTxExMem: 14_000_000n,
  maxTxExSteps: 10_000_000_000n,
  coinsPerUtxoByte: 4310n,
  collateralPercentage: 150,
  maxCollateralInputs: 3,
  minFeeRefScriptCostPerByte: 15,
  costModels,
};

const makeEvaluationInput = (): EvaluationInput => ({
  tx: "80",
  additionalUTxOs: [],
  context: {
    network: "Custom",
    slotConfig: { zeroTime: 0, zeroSlot: 0, slotLength: 1000 },
    protocolParameters,
    costModels: undefined as never,
  },
});

beforeEach(() => {
  mocks.evalPlutusScripts.mockReset();
  mocks.evalPlutusScripts.mockReturnValue([]);
});

describe("Scalus evaluator adapter", () => {
  test("rejects unsafe cost model values", () => {
    const unsafeCostModels = structuredClone(costModels);
    unsafeCostModels.PlutusV1[0] = Number.MAX_SAFE_INTEGER + 1;

    expect(() => decodeCostModels(unsafeCostModels)).toThrow(/safe integer/);
  });

  test("returns an empty result from Scalus without treating it as adapter failure", async () => {
    const evaluator = createScalusEvaluator();

    await expect(evaluator.evaluate(makeEvaluationInput())).resolves.toEqual(
      [],
    );
  });

  test("converts Scalus redeemer results into Lucid evaluator results", async () => {
    mocks.evalPlutusScripts.mockReturnValueOnce([
      {
        tag: "Cert",
        index: 1,
        budget: { memory: 2n, steps: 3n },
      },
    ]);
    const evaluator = createScalusEvaluator();

    await expect(evaluator.evaluate(makeEvaluationInput())).resolves.toEqual([
      {
        redeemer_tag: "publish",
        redeemer_index: 1,
        ex_units: { mem: 2, steps: 3 },
      },
    ]);
  });

  test.each([
    [
      "redeemer index",
      {
        tag: "Spend",
        index: Number.MAX_SAFE_INTEGER + 1,
        budget: { memory: 1, steps: 1 },
      },
    ],
    [
      "redeemer memory budget",
      {
        tag: "Spend",
        index: 0,
        budget: { memory: Number.MAX_SAFE_INTEGER + 1, steps: 1 },
      },
    ],
    [
      "redeemer step budget",
      {
        tag: "Spend",
        index: 0,
        budget: { memory: 1, steps: Number.MAX_SAFE_INTEGER + 1 },
      },
    ],
  ])("rejects unsafe %s values returned by Scalus", async (label, redeemer) => {
    mocks.evalPlutusScripts.mockReturnValueOnce([redeemer]);
    const evaluator = createScalusEvaluator();

    await expect(evaluator.evaluate(makeEvaluationInput())).rejects.toThrow(
      `${label} must be a safe integer`,
    );
  });
});
