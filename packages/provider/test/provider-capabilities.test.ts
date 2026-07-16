import { afterEach, describe, expect, test, vi } from "vitest";
import { Blockfrost, Koios, Kupmios, Maestro } from "../src/index.js";

const rewardAddress =
  "stake_test17zt3vxfjx9pjnpnapa65lx375p2utwxmpc8afj053h0l3vgc8a3g3";
const txHash = "a".repeat(64);

const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });

afterEach(() => {
  vi.restoreAllMocks();
});

describe("built-in provider reward-account capabilities", () => {
  test("Maestro preserves registered but undelegated state", async () => {
    vi.spyOn(globalThis, "fetch").mockImplementation(async () =>
      jsonResponse({
        data: {
          registered: true,
          delegated_pool: null,
          rewards_available: "0",
        },
      }),
    );
    const provider = new Maestro({ network: "Preprod", apiKey: "test" });

    await expect(provider.getRewardAccount(rewardAddress)).resolves.toEqual({
      registered: true,
      poolId: null,
      rewards: 0n,
    });
    await expect(provider.getDelegation(rewardAddress)).resolves.toEqual({
      poolId: null,
      rewards: 0n,
    });
  });

  test("Maestro maps a missing account to unregistered", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      jsonResponse({ message: "not found" }, 404),
    );
    const provider = new Maestro({ network: "Preprod", apiKey: "test" });

    await expect(provider.getRewardAccount(rewardAddress)).resolves.toEqual({
      registered: false,
      poolId: null,
      rewards: 0n,
    });
  });

  test("Blockfrost exposes account registration", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      jsonResponse({
        active: true,
        pool_id: null,
        withdrawable_amount: "42",
      }),
    );
    const provider = new Blockfrost("http://blockfrost.test", "test");

    await expect(provider.getRewardAccount(rewardAddress)).resolves.toEqual({
      registered: true,
      poolId: null,
      rewards: 42n,
    });
  });

  test("Koios uses its explicit account status", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      jsonResponse([
        {
          status: "not registered",
          delegated_pool: null,
          rewards_available: "0",
        },
      ]),
    );
    const provider = new Koios("http://koios.test");

    await expect(provider.getRewardAccount(rewardAddress)).resolves.toEqual({
      registered: false,
      poolId: null,
      rewards: 0n,
    });
  });
});

describe("built-in provider transaction-status capabilities", () => {
  test("Kupmios recognizes confirmed transactions after their outputs are spent", async () => {
    const match = {
      transaction_index: 0,
      transaction_id: txHash,
      output_index: 0,
      address: "addr_test1confirmed",
      value: { coins: "2000000", assets: {} },
      datum_hash: null,
      script_hash: null,
      created_at: { slot_no: 123, header_hash: "b".repeat(64) },
      spent_at: { slot_no: 124, header_hash: "c".repeat(64) },
    };
    const fetch = vi
      .spyOn(globalThis, "fetch")
      .mockImplementation(async () => jsonResponse([match]));
    const provider = new Kupmios("http://kupo.test", "http://ogmios.test");

    await expect(provider.getTransactionStatus(txHash)).resolves.toEqual({
      status: "confirmed",
      txHash,
      confirmation: {
        txHash,
        blockHash: "b".repeat(64),
        slot: 123,
      },
    });
    expect(String(fetch.mock.calls[0]?.[0])).toBe(
      `http://kupo.test/matches/*@${txHash}`,
    );

    fetch.mockClear();
    await expect(provider.awaitTx(txHash, 1)).resolves.toBe(true);
    expect(String(fetch.mock.calls[0]?.[0])).toBe(
      `http://kupo.test/matches/*@${txHash}`,
    );
  });

  test("Maestro exposes pending, confirmed, and failed states", async () => {
    vi.spyOn(globalThis, "fetch")
      .mockResolvedValueOnce(
        jsonResponse({ tx_hash: txHash, status: "pending", confirmations: 0 }),
      )
      .mockResolvedValueOnce(
        jsonResponse({
          tx_hash: txHash,
          status: "confirmed",
          confirmations: 7,
        }),
      )
      .mockResolvedValueOnce(
        jsonResponse({
          tx_hash: txHash,
          status: "failed",
          reason: "rejected",
          confirmations: 0,
        }),
      );
    const provider = new Maestro({ network: "Preprod", apiKey: "test" });

    await expect(provider.getTransactionStatus(txHash)).resolves.toEqual({
      status: "pending",
      txHash,
    });
    await expect(provider.getTransactionStatus(txHash)).resolves.toEqual({
      status: "confirmed",
      txHash,
      confirmation: { txHash, confirmations: 7 },
    });
    await expect(provider.getTransactionStatus(txHash)).resolves.toEqual({
      status: "failed",
      txHash,
      reason: "rejected",
    });
  });

  test("Blockfrost exposes confirmed inclusion metadata", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      jsonResponse({
        hash: txHash,
        block: "b".repeat(64),
        block_height: 123,
        slot: 456,
      }),
    );
    const provider = new Blockfrost("http://blockfrost.test", "test");

    await expect(provider.getTransactionStatus(txHash)).resolves.toEqual({
      status: "confirmed",
      txHash,
      confirmation: {
        txHash,
        blockHash: "b".repeat(64),
        blockHeight: 123,
        slot: 456,
      },
    });
  });

  test("Koios exposes actual block confirmation counts", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      jsonResponse([{ tx_hash: txHash, num_confirmations: 12 }]),
    );
    const provider = new Koios("http://koios.test");

    await expect(provider.getTransactionStatus(txHash)).resolves.toEqual({
      status: "confirmed",
      txHash,
      confirmation: { txHash, confirmations: 12 },
    });
  });

  test("all index-only providers return not_found without inventing pending", async () => {
    const fetch = vi.spyOn(globalThis, "fetch");
    const blockfrost = new Blockfrost("http://blockfrost.test", "test");
    const koios = new Koios("http://koios.test");

    fetch.mockResolvedValueOnce(jsonResponse({ message: "not found" }, 404));
    await expect(blockfrost.getTransactionStatus(txHash)).resolves.toEqual({
      status: "not_found",
      txHash,
    });

    fetch.mockResolvedValueOnce(
      jsonResponse([{ tx_hash: txHash, num_confirmations: null }]),
    );
    await expect(koios.getTransactionStatus(txHash)).resolves.toEqual({
      status: "not_found",
      txHash,
    });
  });
});

describe("Kupmios policy fast path", () => {
  test("keeps empty-name unit queries exact instead of treating them as policy queries", async () => {
    const policyId = "a".repeat(56);
    const emptyNameMatch = {
      transaction_index: 0,
      transaction_id: "1".repeat(64),
      output_index: 0,
      address: "addr_test1query",
      value: { coins: "2000000", assets: { [`${policyId}.`]: "1" } },
      datum_hash: null,
      script_hash: null,
      created_at: { slot_no: 123, header_hash: "b".repeat(64) },
      spent_at: null,
    };
    const otherAssetMatch = {
      ...emptyNameMatch,
      transaction_id: "2".repeat(64),
      output_index: 1,
      value: { coins: "2000000", assets: { [`${policyId}.01`]: "1" } },
    };
    const fetch = vi
      .spyOn(globalThis, "fetch")
      .mockImplementation(async () =>
        jsonResponse([emptyNameMatch, otherAssetMatch]),
      );
    const provider = new Kupmios("http://kupo.test", "http://ogmios.test");

    await expect(
      provider.getUtxosWithUnit("addr_test1query", policyId),
    ).resolves.toMatchObject([
      { txHash: emptyNameMatch.transaction_id, outputIndex: 0 },
    ]);
    expect(String(fetch.mock.calls[0]?.[0])).toBe(
      `http://kupo.test/matches/addr_test1query?unspent&policy_id=${policyId}`,
    );

    fetch.mockClear();
    fetch.mockImplementation(async () => jsonResponse([emptyNameMatch]));
    await expect(provider.getUtxoByUnit(policyId)).resolves.toMatchObject({
      txHash: emptyNameMatch.transaction_id,
      outputIndex: 0,
    });
    expect(String(fetch.mock.calls[0]?.[0])).toBe(
      `http://kupo.test/matches/${policyId}.?unspent`,
    );
  });

  test("uses Kupo's policy_id filter without adding exact-unit semantics", async () => {
    const fetch = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(jsonResponse([]));
    const provider = new Kupmios("http://kupo.test", "http://ogmios.test");
    const policyId = "A".repeat(56);

    await expect(
      provider.getUtxosWithPolicy("addr_test1query", policyId),
    ).resolves.toEqual([]);
    expect(String(fetch.mock.calls[0]?.[0])).toBe(
      `http://kupo.test/matches/addr_test1query?unspent&policy_id=${policyId.toLowerCase()}`,
    );
  });

  test("rejects malformed policy identifiers before querying Kupo", async () => {
    const fetch = vi.spyOn(globalThis, "fetch");
    const provider = new Kupmios("http://kupo.test", "http://ogmios.test");

    await expect(
      provider.getUtxosWithPolicy("addr_test1query", "abcd"),
    ).rejects.toThrow("56-character hexadecimal");
    expect(fetch).not.toHaveBeenCalled();
  });
});
