import type {
  Provider,
  UTxO,
  Wallet,
  WalletApi,
} from "@lucid-evolution/core-types";
import { generatePrivateKey, generateSeedPhrase } from "@lucid-evolution/utils";
import { describe, expect, test, vi } from "vitest";
import {
  makeWalletFromAddress,
  makeWalletFromAPI,
  makeWalletFromPrivateKey,
  makeWalletFromSeed,
} from "../src/wallet_selection.js";

const providerUtxo: UTxO = {
  txHash: "0".repeat(64),
  outputIndex: 0,
  address: "provider-result",
  assets: { lovelace: 1n },
};

const makeProvider = () => {
  const getUtxos = vi.fn(async () => [providerUtxo]);
  return {
    getUtxos,
    provider: { getUtxos } as unknown as Provider,
  };
};

const expectAuthoritativeEmptyOverride = async (
  wallet: Wallet,
  source: ReturnType<typeof vi.fn>,
) => {
  expect(wallet.clearUTxOOverride).toBeTypeOf("function");

  wallet.overrideUTxOs([]);
  expect(await wallet.getUtxos()).toEqual([]);
  expect(await wallet.getUtxosCore()).toEqual([]);
  expect(source).not.toHaveBeenCalled();

  wallet.clearUTxOOverride!();
  expect(await wallet.getUtxos()).toEqual([providerUtxo]);
  expect(source).toHaveBeenCalledOnce();
};

describe("authoritative wallet UTxO overrides", () => {
  test("seed wallet treats [] as authoritative until cleared", async () => {
    const { provider, getUtxos } = makeProvider();
    const wallet = makeWalletFromSeed(
      provider,
      "Preprod",
      generateSeedPhrase(),
    );

    await expectAuthoritativeEmptyOverride(wallet, getUtxos);
  });

  test("private-key wallet treats [] as authoritative until cleared", async () => {
    const { provider, getUtxos } = makeProvider();
    const wallet = makeWalletFromPrivateKey(
      provider,
      "Preprod",
      generatePrivateKey(),
    );

    await expectAuthoritativeEmptyOverride(wallet, getUtxos);
  });

  test("address wallet treats its initial [] as authoritative until cleared", async () => {
    const privateKey = generatePrivateKey();
    const addressProvider = makeProvider().provider;
    const address = await makeWalletFromPrivateKey(
      addressProvider,
      "Preprod",
      privateKey,
    ).address();
    const { provider, getUtxos } = makeProvider();
    const wallet = makeWalletFromAddress(provider, "Preprod", address, []);

    expect(await wallet.getUtxos()).toEqual([]);
    expect(getUtxos).not.toHaveBeenCalled();
    await expectAuthoritativeEmptyOverride(wallet, getUtxos);
  });

  test("CIP-30 wallet treats [] as authoritative until cleared", async () => {
    const getUtxos = vi.fn(async () => []);
    const api = { getUtxos } as unknown as WalletApi;
    const wallet = makeWalletFromAPI({} as Provider, api);

    expect(wallet.clearUTxOOverride).toBeTypeOf("function");
    wallet.overrideUTxOs([]);
    expect(await wallet.getUtxos()).toEqual([]);
    expect(await wallet.getUtxosCore()).toEqual([]);
    expect(getUtxos).not.toHaveBeenCalled();

    wallet.clearUTxOOverride!();
    expect(await wallet.getUtxos()).toEqual([]);
    expect(getUtxos).toHaveBeenCalledOnce();
  });
});
