import { describe, expect, test, vi } from "vitest";
import { Provider, WalletApi } from "@lucid-evolution/core-types";
import { CML } from "../src/core.js";
import { makeWalletFromAPI } from "../src/wallet_selection.js";

const TX_CBOR =
  "84a500818258200d31e3060edc0422bab792b414b6920534fb61f72a24cb76c911fea67060151801018282583900bc83d1474fafc0669e360c6ef389d3874f5eff99c31f343ff2cdab0bcb68eb5507f1a2a0cb4ddb095125f0f9878568cfe2466f2969db1ed3821a0011f436a1581c2fe05358b9e7016f454c25f1e2be181759ff9150ce633e132ba51f0fa14d4d794d696e746564546f6b656e0182583900bc83d1474fafc0669e360c6ef389d3874f5eff99c31f343ff2cdab0bcb68eb5507f1a2a0cb4ddb095125f0f9878568cfe2466f2969db1ed31a01c8bf03021a0002a935031a03329c4409a1581c2fe05358b9e7016f454c25f1e2be181759ff9150ce633e132ba51f0fa14d4d794d696e746564546f6b656e01a200818258204f26d9d8185481167e5647039d4f390c8c74a5fbca1f115709a2998e93180f395840738d6fc3fbd9a35fa2aabbbddc8f4297f1b990a349450734040cc7af259ebfa250966b0d754036615f66bace4c35166d342929dcca1f451cd94c991cbcf6920101818201828200581cbc83d1474fafc0669e360c6ef389d3874f5eff99c31f343ff2cdab0b8205192710f5f6";
const WITNESS_SET_CBOR = CML.TransactionWitnessSet.new().to_cbor_hex();
const provider = {} as Provider;

const tx = () => CML.Transaction.from_cbor_hex(TX_CBOR);

type WalletApiOverrides = Partial<Omit<WalletApi, "experimental">> & {
  experimental?: Partial<WalletApi["experimental"]>;
};

const makeApi = (overrides: WalletApiOverrides = {}): WalletApi => {
  const experimental = {
    getCollateral: vi.fn(async () => []),
    on: vi.fn(),
    off: vi.fn(),
    ...overrides.experimental,
  };
  return {
    getNetworkId: vi.fn(),
    getUtxos: vi.fn(),
    getBalance: vi.fn(),
    getUsedAddresses: vi.fn(),
    getUnusedAddresses: vi.fn(),
    getChangeAddress: vi.fn(),
    getRewardAddresses: vi.fn(),
    signTx: vi.fn(async () => WITNESS_SET_CBOR),
    signData: vi.fn(),
    submitTx: vi.fn(),
    getCollateral: vi.fn(),
    ...overrides,
    experimental,
  } as WalletApi;
};

describe("makeWalletFromAPI signTxs", () => {
  test("uses CIP-103 signTxs when available", async () => {
    const signTxs = vi.fn(async () => [WITNESS_SET_CBOR, WITNESS_SET_CBOR]);
    const signTx = vi.fn(async () => WITNESS_SET_CBOR);
    const api = makeApi({ cip103: { signTxs }, signTx });

    const witnessSets = await makeWalletFromAPI(provider, api).signTxs!([
      tx(),
      tx(),
    ]);

    expect(signTxs).toHaveBeenCalledWith([
      { cbor: TX_CBOR, partialSign: true },
      { cbor: TX_CBOR, partialSign: true },
    ]);
    expect(signTx).not.toHaveBeenCalled();
    expect(witnessSets.map((witnessSet) => witnessSet.to_cbor_hex())).toEqual([
      WITNESS_SET_CBOR,
      WITNESS_SET_CBOR,
    ]);
  });

  test("falls back to sequential signTx", async () => {
    const signTx = vi.fn(async () => WITNESS_SET_CBOR);
    const api = makeApi({ signTx });

    await makeWalletFromAPI(provider, api).signTxs!([tx(), tx()]);

    expect(signTx).toHaveBeenNthCalledWith(1, TX_CBOR, true);
    expect(signTx).toHaveBeenNthCalledWith(2, TX_CBOR, true);
  });

  test("rejects mismatched witness counts", async () => {
    const api = makeApi({
      cip103: { signTxs: vi.fn(async () => [WITNESS_SET_CBOR]) },
    });

    await expect(
      makeWalletFromAPI(provider, api).signTxs!([tx(), tx()]),
    ).rejects.toThrow("unexpected number of witness sets");
  });
});
