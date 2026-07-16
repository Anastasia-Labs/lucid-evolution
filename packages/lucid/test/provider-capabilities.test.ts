import type {
  Provider,
  TransactionStatus,
  UTxO,
} from "@lucid-evolution/core-types";
import { afterEach, describe, expect, test, vi } from "vitest";
import {
  Lucid,
  PROTOCOL_PARAMETERS_DEFAULT,
  ProviderCapabilityError,
} from "../src/index.js";

const address =
  "addr_test1vzpwq95z3xyum8vqndgdd30p5y5wz7z6hqp5j3k6h8m83fs3s4l8w";
const rewardAddress =
  "stake_test17zt3vxfjx9pjnpnapa65lx375p2utwxmpc8afj053h0l3vgc8a3g3";
const txHash = "a".repeat(64);
const policyId = "b".repeat(56);

const makeUtxo = (suffix: string, assets: UTxO["assets"]): UTxO => ({
  txHash: suffix.repeat(64).slice(0, 64),
  outputIndex: 0,
  address,
  assets,
});

const makeProvider = (overrides: Partial<Provider> = {}): Provider => ({
  getProtocolParameters: async () => PROTOCOL_PARAMETERS_DEFAULT,
  getUtxos: async () => [],
  getUtxosWithUnit: async () => [],
  getUtxoByUnit: async () => {
    throw new Error("not implemented");
  },
  getUtxosByOutRef: async () => [],
  getDelegation: async () => ({ poolId: null, rewards: 0n }),
  getDatum: async () => "",
  awaitTx: async () => true,
  submitTx: async () => txHash,
  evaluateTx: async () => [],
  ...overrides,
});

afterEach(() => {
  vi.useRealTimers();
});

describe("provider-neutral policy queries", () => {
  test("fallback matches the exact 56-character policy prefix", async () => {
    const match = makeUtxo("1", {
      lovelace: 2_000_000n,
      [`${policyId}01`]: 1n,
      [`${policyId}02`]: 2n,
    });
    const zeroOnly = makeUtxo("2", {
      lovelace: 2_000_000n,
      [`${policyId}03`]: 0n,
    });
    const other = makeUtxo("3", {
      lovelace: 2_000_000n,
      [`${"c".repeat(56)}01`]: 1n,
    });
    const provider = makeProvider({
      getUtxos: vi.fn(async () => [match, zeroOnly, other]),
    });
    const lucid = await Lucid(provider, "Preprod");

    await expect(
      lucid.utxosAtWithPolicy(address, policyId.toUpperCase()),
    ).resolves.toEqual([match]);
    expect(provider.getUtxos).toHaveBeenCalledWith(address);
  });

  test("uses a provider-native policy capability when available", async () => {
    const match = makeUtxo("1", {
      lovelace: 2_000_000n,
      [`${policyId}01`]: 1n,
    });
    const native = vi.fn(async () => [match]);
    const getUtxos = vi.fn(async () => []);
    const lucid = await Lucid(
      makeProvider({ getUtxosWithPolicy: native, getUtxos }),
      "Preprod",
    );

    await expect(lucid.utxosAtWithPolicy(address, policyId)).resolves.toEqual([
      match,
    ]);
    expect(native).toHaveBeenCalledWith(address, policyId);
    expect(getUtxos).not.toHaveBeenCalled();
  });

  test("rejects malformed policy identifiers before querying", async () => {
    const getUtxos = vi.fn(async () => []);
    const lucid = await Lucid(makeProvider({ getUtxos }), "Preprod");

    await expect(lucid.utxosAtWithPolicy(address, "abcd")).rejects.toThrow(
      "56-character hexadecimal",
    );
    expect(getUtxos).not.toHaveBeenCalled();
  });
});

describe("provider-neutral reward and transaction status", () => {
  test("optional capability failures remain normal inspectable Errors", async () => {
    const lucid = await Lucid(makeProvider(), "Preprod");

    const rewardError = await lucid
      .rewardAccountAt(rewardAddress)
      .catch((error) => error);
    const statusError = await lucid
      .transactionStatus(txHash)
      .catch((error) => error);

    expect(rewardError).toBeInstanceOf(ProviderCapabilityError);
    expect(rewardError).toMatchObject({ capability: "getRewardAccount" });
    expect(statusError).toBeInstanceOf(ProviderCapabilityError);
    expect(statusError).toMatchObject({ capability: "getTransactionStatus" });
  });

  test("forwards registration state and AbortSignal", async () => {
    const controller = new AbortController();
    const getTransactionStatus = vi.fn(
      async (): Promise<TransactionStatus> => ({ status: "pending", txHash }),
    );
    const lucid = await Lucid(
      makeProvider({
        getRewardAccount: async () => ({
          registered: true,
          poolId: null,
          rewards: 0n,
        }),
        getTransactionStatus,
      }),
      "Preprod",
    );

    await expect(lucid.rewardAccountAt(rewardAddress)).resolves.toEqual({
      registered: true,
      poolId: null,
      rewards: 0n,
    });
    await expect(
      lucid.transactionStatus(txHash, { signal: controller.signal }),
    ).resolves.toEqual({ status: "pending", txHash });
    expect(getTransactionStatus).toHaveBeenCalledWith(txHash, {
      signal: controller.signal,
    });
  });

  test("waits for the requested actual confirmation count", async () => {
    vi.useFakeTimers();
    const getTransactionStatus = vi
      .fn<Provider["getTransactionStatus"]>()
      .mockResolvedValueOnce({
        status: "confirmed",
        txHash,
        confirmation: { txHash, confirmations: 1 },
      })
      .mockResolvedValueOnce({
        status: "confirmed",
        txHash,
        confirmation: { txHash, confirmations: 2 },
      });
    const lucid = await Lucid(
      makeProvider({ getTransactionStatus }),
      "Preprod",
    );

    const result = lucid.awaitTxConfirmation(txHash, {
      checkInterval: 10,
      timeout: 100,
      minimumConfirmations: 2,
    });
    await vi.advanceTimersByTimeAsync(10);

    await expect(result).resolves.toEqual({ txHash, confirmations: 2 });
    expect(getTransactionStatus).toHaveBeenCalledTimes(2);
  });

  test("does not ignore a provider-reported zero confirmation count", async () => {
    vi.useFakeTimers();
    const getTransactionStatus = vi
      .fn<Provider["getTransactionStatus"]>()
      .mockResolvedValueOnce({
        status: "confirmed",
        txHash,
        confirmation: { txHash, confirmations: 0 },
      })
      .mockResolvedValueOnce({
        status: "confirmed",
        txHash,
        confirmation: { txHash, confirmations: 1 },
      });
    const lucid = await Lucid(
      makeProvider({ getTransactionStatus }),
      "Preprod",
    );

    const result = lucid.awaitTxConfirmation(txHash, {
      checkInterval: 10,
      timeout: 100,
    });
    await vi.advanceTimersByTimeAsync(10);

    await expect(result).resolves.toEqual({ txHash, confirmations: 1 });
    expect(getTransactionStatus).toHaveBeenCalledTimes(2);
  });

  test("honors cancellation before polling", async () => {
    const getTransactionStatus = vi.fn<Provider["getTransactionStatus"]>();
    const lucid = await Lucid(
      makeProvider({ getTransactionStatus }),
      "Preprod",
    );
    const controller = new AbortController();
    const reason = new Error("caller cancelled");
    controller.abort(reason);

    await expect(
      lucid.awaitTxConfirmation(txHash, { signal: controller.signal }),
    ).rejects.toBe(reason);
    expect(getTransactionStatus).not.toHaveBeenCalled();
  });

  test("cancels an in-progress wait and clears its polling timer", async () => {
    vi.useFakeTimers();
    const getTransactionStatus = vi.fn(
      async (): Promise<TransactionStatus> => ({
        status: "not_found",
        txHash,
      }),
    );
    const lucid = await Lucid(
      makeProvider({ getTransactionStatus }),
      "Preprod",
    );
    const controller = new AbortController();
    const reason = new Error("stop waiting");

    const result = lucid.awaitTxConfirmation(txHash, {
      checkInterval: 1_000,
      timeout: 10_000,
      signal: controller.signal,
    });
    await Promise.resolve();
    controller.abort(reason);

    await expect(result).rejects.toBe(reason);
    expect(vi.getTimerCount()).toBe(0);
  });

  test("enforces a caller-supplied timeout on an in-flight provider query", async () => {
    vi.useFakeTimers();
    let providerSignal: AbortSignal | undefined;
    const getTransactionStatus = vi.fn(
      async (
        _txHash: string,
        options?: { signal?: AbortSignal },
      ): Promise<TransactionStatus> => {
        providerSignal = options?.signal;
        return new Promise(() => undefined);
      },
    );
    const lucid = await Lucid(
      makeProvider({ getTransactionStatus }),
      "Preprod",
    );

    const result = lucid.awaitTxConfirmation(txHash, {
      checkInterval: 10,
      timeout: 25,
    });
    const assertion = expect(result).rejects.toThrow(
      `Timed out waiting for transaction ${txHash}.`,
    );
    await vi.advanceTimersByTimeAsync(25);

    await assertion;
    expect(providerSignal?.aborted).toBe(true);
  });
});
