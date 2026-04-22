import { afterEach, describe, expect, test, vi } from "vitest";
import { Kupmios } from "../src/kupmios.js";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("Kupmios Ogmios JSON-RPC handling", () => {
  test("getDelegation accepts Ogmios reward account summaries", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          jsonrpc: "2.0",
          method: "queryLedgerState/rewardAccountSummaries",
          result: [
            {
              from: "script",
              credential:
                "97161932314329867d0f754f9a3ea055c5b8db0e0fd4c9f48ddff8b1",
              stakePool: {
                id: "pool1e0arfuamnymdkmjztvkryasxv9d8u8key27ajgc4mquz2nr8mk9",
              },
              rewards: { ada: { lovelace: 1505083629601 } },
              deposit: { ada: { lovelace: 2000000 } },
            },
          ],
          id: null,
        }),
        {
          status: 200,
          headers: { "content-type": "application/json" },
        },
      ),
    );
    const kupmios = new Kupmios("http://kupo.test", "http://ogmios.test");

    await expect(
      kupmios.getDelegation(
        "stake_test17zt3vxfjx9pjnpnapa65lx375p2utwxmpc8afj053h0l3vgc8a3g3",
      ),
    ).resolves.toStrictEqual({
      poolId: "pool1e0arfuamnymdkmjztvkryasxv9d8u8key27ajgc4mquz2nr8mk9",
      rewards: 1505083629601n,
    });
  });

  test("getDelegation returns empty delegation for empty Ogmios summaries", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          jsonrpc: "2.0",
          method: "queryLedgerState/rewardAccountSummaries",
          result: [],
          id: null,
        }),
        {
          status: 200,
          headers: { "content-type": "application/json" },
        },
      ),
    );
    const kupmios = new Kupmios("http://kupo.test", "http://ogmios.test");

    await expect(
      kupmios.getDelegation(
        "stake_test17zt3vxfjx9pjnpnapa65lx375p2utwxmpc8afj053h0l3vgc8a3g3",
      ),
    ).resolves.toStrictEqual({
      poolId: null,
      rewards: 0n,
    });
  });

  test("evaluateTx surfaces Ogmios JSON-RPC errors", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          jsonrpc: "2.0",
          method: "evaluateTransaction",
          error: {
            code: 3010,
            message:
              "Some scripts of the transactions terminated with error(s).",
            data: [
              {
                error: {
                  code: 3004,
                  message:
                    "Unable to create the evaluation context from the given transaction.",
                  data: {
                    reason:
                      "Unknown transaction input (missing from UTxO set): abcd#0",
                  },
                },
              },
            ],
          },
          id: null,
        }),
        {
          status: 200,
          headers: { "content-type": "application/json" },
        },
      ),
    );
    const kupmios = new Kupmios("http://kupo.test", "http://ogmios.test");

    await expect(kupmios.evaluateTx("80")).rejects.toThrow(
      /Ogmios JSON-RPC error 3010: .*Unknown transaction input/,
    );
  });
});
