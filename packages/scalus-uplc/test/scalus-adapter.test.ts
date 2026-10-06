import { beforeEach, describe, expect, test, vi } from "vitest";
import {
  EvaluationInput,
  ProtocolParameters,
  UTxO,
} from "@lucid-evolution/core-types";
import { createScalusEvaluator, mapScalusTag } from "../src/index.js";

const mocks = vi.hoisted(() => ({
  evaluateTx: vi.fn((..._args: unknown[]): unknown[] => []),
  utxosBuilt: 0,
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
    ) {
      mocks.utxosBuilt++;
    }
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
    mocks.utxosBuilt = 0;
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

  const utxo = (lovelace: bigint, outputIndex = 0): UTxO => ({
    txHash: "aa".repeat(32),
    outputIndex,
    address: "addr_test1vz",
    assets: { lovelace },
  });

  const withUTxOs = (
    utxos: UTxO[],
    overrides: Partial<ProtocolParameters> = {},
  ): EvaluationInput => ({ ...input(overrides), additionalUTxOs: utxos });

  const MINT = [{ tag: "Mint", index: 0, budget: { memory: 10n, steps: 20n } }];

  test("an identical request is evaluated once, and callers get their own copies", async () => {
    mocks.evaluateTx.mockReturnValue(MINT);
    const evaluator = createScalusEvaluator();
    const first = await evaluator.evaluate(withUTxOs([utxo(5n)]));
    first[0].ex_units.mem = 0;
    const second = await evaluator.evaluate(withUTxOs([utxo(5n)]));
    expect(mocks.evaluateTx).toHaveBeenCalledTimes(1);
    expect(second).toEqual([
      {
        redeemer_tag: "mint",
        redeemer_index: 0,
        ex_units: { mem: 10, steps: 20 },
      },
    ]);
  });

  test("a change to any part of the request evaluates again", async () => {
    const evaluator = createScalusEvaluator();
    const base = withUTxOs([utxo(5n)]);
    await evaluator.evaluate(base);
    await evaluator.evaluate({ ...base, tx: "01" });
    await evaluator.evaluate(withUTxOs([utxo(6n)]));
    await evaluator.evaluate(
      withUTxOs([utxo(6n)], {
        costModels: { ...COST_MODELS, PlutusV3: [7, 8, 10] },
      }),
    );
    await evaluator.evaluate(
      withUTxOs([utxo(6n)], {
        costModels: { ...COST_MODELS, PlutusV3: [7, 8, 10] },
        protocolMajorVersion: 10,
      }),
    );
    const slot = withUTxOs([utxo(6n)], {
      costModels: { ...COST_MODELS, PlutusV3: [7, 8, 10] },
      protocolMajorVersion: 10,
    });
    await evaluator.evaluate({
      ...slot,
      context: {
        ...slot.context,
        slotConfig: { zeroTime: 0, zeroSlot: 0, slotLength: 20 },
      },
    });
    expect(mocks.evaluateTx).toHaveBeenCalledTimes(6);
  });

  test("a failed evaluation is not remembered", async () => {
    mocks.evaluateTx.mockImplementationOnce(() => {
      throw new Error("script failed");
    });
    const evaluator = createScalusEvaluator();
    await expect(evaluator.evaluate(withUTxOs([utxo(5n)]))).rejects.toThrow(
      "script failed",
    );
    await expect(evaluator.evaluate(withUTxOs([utxo(5n)]))).resolves.toEqual(
      [],
    );
    expect(mocks.evaluateTx).toHaveBeenCalledTimes(2);
  });

  test("reuses the Scalus Utxo of an unchanged UTxO and converts a changed one", async () => {
    const evaluator = createScalusEvaluator();
    await evaluator.evaluate({
      ...withUTxOs([utxo(5n), utxo(7n, 1)]),
      tx: "01",
    });
    const [, firstHandles] = mocks.evaluateTx.mock.calls[0] as unknown[][];
    expect(mocks.utxosBuilt).toBe(2);
    await evaluator.evaluate({
      ...withUTxOs([utxo(5n), utxo(8n, 1)]),
      tx: "02",
    });
    const [, secondHandles] = mocks.evaluateTx.mock.calls[1] as unknown[][];
    expect(mocks.utxosBuilt).toBe(3);
    expect(secondHandles[0]).toBe(firstHandles[0]);
    expect(secondHandles[1]).not.toBe(firstHandles[1]);
  });

  test("a UTxO changed in place after evaluation is converted again", async () => {
    const evaluator = createScalusEvaluator();
    const mutable = utxo(5n);
    await evaluator.evaluate({ ...withUTxOs([mutable]), tx: "01" });
    mutable.assets.lovelace = 9n;
    await evaluator.evaluate({ ...withUTxOs([mutable]), tx: "01" });
    expect(mocks.evaluateTx).toHaveBeenCalledTimes(2);
    expect(mocks.utxosBuilt).toBe(2);
  });

  test("evaluateBytes passes the bytes through and is not enumerable", async () => {
    const evaluator = createScalusEvaluator();
    expect(Object.keys(evaluator)).not.toContain("evaluateBytes");
    const tx = new Uint8Array([0x84, 0x01]);
    const { tx: _hex, ...rest } = input();
    await evaluator.evaluateBytes!({ ...rest, tx });
    expect(mocks.evaluateTx.mock.calls[0]?.[0]).toBe(tx);
  });
});
