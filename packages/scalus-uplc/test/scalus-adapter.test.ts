import { beforeEach, describe, expect, test, vi } from "vitest";
import {
  EvaluationInput,
  ProtocolParameters,
} from "@lucid-evolution/core-types";
import { createScalusEvaluator, mapScalusTag } from "../src/index.js";

const mocks = vi.hoisted(() => ({
  evaluateTx: vi.fn((..._args: unknown[]): unknown[] => []),
}));

// Scalus takes UTxOs as handles now, so the mock needs the three value classes the adapter
// builds, not just the evaluation entry point.
vi.mock("scalus", () => {
  class Utxo {
    constructor(
      readonly txHash: string,
      readonly outputIndex: number,
      readonly address: string,
      readonly value: unknown,
    ) {}
    withDatumHash() {
      return this;
    }
    withInlineDatum() {
      return this;
    }
    withScriptRef() {
      return this;
    }
  }
  class Value {
    constructor(
      readonly coin: bigint,
      readonly assets: unknown[],
    ) {}
  }
  class Asset {
    constructor(
      readonly policyId: string,
      readonly assetName: string,
      readonly quantity: bigint,
    ) {}
  }
  return { Utxo, Value, Asset, evaluator: { evaluateTx: mocks.evaluateTx } };
});

const COST_MODELS = {
  PlutusV1: [1, 2, 3],
  PlutusV2: [4, 5, 6],
  PlutusV3: [7, 8, 9],
};

const protocolParameters = (
  overrides: Partial<ProtocolParameters> = {},
): ProtocolParameters =>
  ({ costModels: COST_MODELS, ...overrides }) as ProtocolParameters;

const input = (overrides: Partial<ProtocolParameters> = {}): EvaluationInput =>
  ({
    tx: "00",
    additionalUTxOs: [],
    context: {
      slotConfig: { zeroTime: 0, zeroSlot: 0, slotLength: 1000 },
      protocolParameters: protocolParameters(overrides),
    },
  }) as unknown as EvaluationInput;

/** The protocol major version the adapter handed to Scalus on its last call. */
const versionPassed = () => mocks.evaluateTx.mock.calls.at(-1)?.[4];

describe("scalus evaluator adapter", () => {
  beforeEach(() => {
    mocks.evaluateTx.mockReset();
    mocks.evaluateTx.mockReturnValue([]);
  });

  test("maps every redeemer tag Scalus can produce", () => {
    expect(mapScalusTag("Spend")).toBe("spend");
    expect(mapScalusTag("Cert")).toBe("publish");
    expect(mapScalusTag("Reward")).toBe("withdraw");
    // An unknown tag is an error rather than a default, so a tag added upstream cannot silently
    // become a spend redeemer.
    expect(() => mapScalusTag("Nonsense")).toThrow(/Unknown Scalus redeemer/);
  });

  test("returns an empty result from Scalus without treating it as adapter failure", async () => {
    await expect(createScalusEvaluator().evaluate(input())).resolves.toEqual(
      [],
    );
  });

  test("converts Scalus redeemer results into Lucid evaluator results", async () => {
    mocks.evaluateTx.mockReturnValue([
      { tag: "Mint", index: 1, budget: { memory: 1000n, steps: 2000n } },
    ]);
    await expect(createScalusEvaluator().evaluate(input())).resolves.toEqual([
      {
        redeemer_tag: "mint",
        redeemer_index: 1,
        ex_units: { mem: 1000, steps: 2000 },
      },
    ]);
  });

  test("passes the cost models through untouched", async () => {
    await createScalusEvaluator().evaluate(input());
    expect(mocks.evaluateTx.mock.calls[0]?.[3]).toBe(COST_MODELS);
  });

  test("prefers the version the option names", async () => {
    await createScalusEvaluator({ protocolMajorVersion: 9 }).evaluate(
      input({ protocolMajorVersion: 10 }),
    );
    expect(versionPassed()).toBe(9);
  });

  test("otherwise uses the version the provider reports", async () => {
    await createScalusEvaluator().evaluate(input({ protocolMajorVersion: 10 }));
    expect(versionPassed()).toBe(10);
  });

  test("falls back to 11 when the provider reports no version", async () => {
    // Blockfrost and the emulator both set it; a provider that does not gets mainnet's version
    // rather than a guess, so costing never silently uses a protocol nobody asked for.
    await createScalusEvaluator().evaluate(input());
    expect(versionPassed()).toBe(11);
  });
});
