import { afterEach, describe, expect, test, vi } from "vitest";
import { Blockfrost } from "../src/blockfrost.js";
import * as _Blockfrost from "../src/internal/blockfrost.js";
import { UTxO } from "@lucid-evolution/core-types";

afterEach(() => {
  vi.restoreAllMocks();
});

const mockEmptyUtxos = () =>
  vi.spyOn(globalThis, "fetch").mockResolvedValue(
    new Response(JSON.stringify([]), {
      headers: { "content-type": "application/json" },
    }),
  );

describe("Blockfrost credential queries", () => {
  test("encodes script credentials with the script prefix for getUtxos", async () => {
    const fetchSpy = mockEmptyUtxos();

    await new Blockfrost("https://blockfrost.test").getUtxos({
      type: "Script",
      hash: "00".repeat(28),
    });

    const url = new URL(fetchSpy.mock.calls[0]![0] as string);
    expect(url.pathname).toMatch(/^\/addresses\/script1/);
    expect(url.pathname).toMatch(/\/utxos$/);
    expect(url.searchParams.get("page")).toBe("1");
  });

  test("encodes script credentials with the script prefix for getUtxosWithUnit", async () => {
    const fetchSpy = mockEmptyUtxos();

    await new Blockfrost("https://blockfrost.test").getUtxosWithUnit(
      {
        type: "Script",
        hash: "00".repeat(28),
      },
      "lovelace",
    );

    const url = new URL(fetchSpy.mock.calls[0]![0] as string);
    expect(url.pathname).toMatch(/^\/addresses\/script1/);
    expect(url.pathname).toMatch(/\/utxos\/lovelace$/);
    expect(url.searchParams.get("page")).toBe("1");
  });
});

describe("Blockfrost transaction evaluation", () => {
  const nativeAssetUtxo: UTxO = {
    txHash: "00".repeat(32),
    outputIndex: 1,
    address:
      "addr_test1qrngfyc452vy4twdrepdjc50d4kvqutgt0hs9w6j2qhcdjfx0gpv7rsrjtxv97rplyz3ymyaqdwqa635zrcdena94ljs0xy950",
    assets: {
      lovelace: 1_500_000n,
      [`${"11".repeat(28)}${"4c75636964"}`]: 7n,
    },
    datum: "d87980",
  };

  const evaluationResult = {
    result: {
      EvaluationResult: {
        "spend:0": { memory: 1, steps: 2 },
      },
    },
  };

  test("encodes additional UTxO values with Ogmios nested multi-assets", () => {
    const [[txIn, txOut]] = _Blockfrost.toAditionalUTXOs([nativeAssetUtxo]);

    expect(txIn).toEqual({
      txId: nativeAssetUtxo.txHash,
      index: nativeAssetUtxo.outputIndex,
    });
    expect(txOut.value).toEqual({
      ada: { lovelace: 1_500_000 },
      ["11".repeat(28)]: { "4c75636964": 7 },
    });
    expect(txOut).toMatchObject({ datum: "d87980" });
  });

  test("evaluates without additional UTxOs first when Blockfrost can resolve inputs", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify(evaluationResult), {
        headers: { "content-type": "application/json" },
      }),
    );

    await expect(
      new Blockfrost("https://blockfrost.test").evaluateTx("84", [
        nativeAssetUtxo,
      ]),
    ).resolves.toEqual([
      {
        redeemer_tag: "spend",
        redeemer_index: 0,
        ex_units: { mem: 1, steps: 2 },
      },
    ]);

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(
      JSON.parse(fetchSpy.mock.calls[0]![1]!.body as string),
    ).not.toHaveProperty("additionalUtxoSet");
  });

  test("retries with nested additional UTxOs when Blockfrost cannot resolve inputs", async () => {
    const fetchSpy = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            result: {
              CannotCreateEvaluationContext: { reason: "UnknownInputs" },
            },
          }),
          { headers: { "content-type": "application/json" } },
        ),
      )
      .mockResolvedValueOnce(
        new Response(JSON.stringify(evaluationResult), {
          headers: { "content-type": "application/json" },
        }),
      );

    await expect(
      new Blockfrost("https://blockfrost.test").evaluateTx("84", [
        nativeAssetUtxo,
      ]),
    ).resolves.toHaveLength(1);

    expect(fetchSpy).toHaveBeenCalledTimes(2);
    const retryBody = JSON.parse(fetchSpy.mock.calls[1]![1]!.body as string);
    expect(retryBody.additionalUtxoSet[0][1].value).toEqual({
      ada: { lovelace: 1_500_000 },
      ["11".repeat(28)]: { "4c75636964": 7 },
    });
  });
});
