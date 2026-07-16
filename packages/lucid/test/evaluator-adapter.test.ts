import { describe, expect, test, vi } from "vitest";
import {
  CML,
  EvalRedeemer,
  EvaluatorAdapter,
  Provider,
  Script,
  UTxO,
  Wallet,
  makeTxBuilder,
} from "../src/index.js";
import { Data } from "@lucid-evolution/plutus";
import {
  createCostModels,
  PROTOCOL_PARAMETERS_DEFAULT,
  validatorToAddress,
} from "@lucid-evolution/utils";
import { makeTxConfig } from "../src/tx-builder/TxConfig.js";

const address =
  "addr_test1qrngfyc452vy4twdrepdjc50d4kvqutgt0hs9w6j2qhcdjfx0gpv7rsrjtxv97rplyz3ymyaqdwqa635zrcdena94ljs0xy950";

const protocolParameters = PROTOCOL_PARAMETERS_DEFAULT;
const costModels = createCostModels(protocolParameters.costModels);

const alwaysSucceedScript: Script = {
  type: "PlutusV2",
  script: "49480100002221200101",
};

const scriptAddress = validatorToAddress("Custom", alwaysSucceedScript);

const evalRedeemer = (
  redeemer_tag: EvalRedeemer["redeemer_tag"] = "spend",
  redeemer_index = 0,
): EvalRedeemer => ({
  redeemer_tag,
  redeemer_index,
  ex_units: { mem: 500_000, steps: 500_000 },
});

const makeWallet = (utxos: UTxO[]): Wallet => ({
  overrideUTxOs: vi.fn(),
  address: async () => address,
  rewardAddress: async () => null,
  getUtxos: async () => utxos,
  getUtxosCore: async () => [],
  getDelegation: async () => ({ poolId: null, rewards: 0n }),
  signTx: async () => CML.TransactionWitnessSet.new(),
  signMessage: async () => ({ signature: "", key: "" }),
  submitTx: async () => "00".repeat(32),
});

const makeProvider = (
  evaluateTx: Provider["evaluateTx"] = async () => [evalRedeemer()],
): Provider => ({
  getProtocolParameters: async () => protocolParameters,
  getUtxos: async () => [],
  getUtxosWithUnit: async () => [],
  getUtxoByUnit: async () => {
    throw new Error("not implemented");
  },
  getUtxosByOutRef: async () => [],
  getDelegation: async () => ({ poolId: null, rewards: 0n }),
  getDatum: async () => Data.void(),
  awaitTx: async () => true,
  submitTx: async () => "00".repeat(32),
  evaluateTx,
});

const lucidConfig = (provider: Provider, wallet: Wallet) => ({
  provider,
  network: "Custom" as const,
  wallet,
  txbuilderconfig: makeTxConfig(protocolParameters, costModels),
  costModels,
  protocolParameters,
  slotConfig: { zeroTime: 0, zeroSlot: 0, slotLength: 1_000 },
});

const makeUtxo = (
  txHashByte: string,
  assets: UTxO["assets"] = { lovelace: 100_000_000n },
): UTxO => ({
  txHash: txHashByte.repeat(32),
  outputIndex: 0,
  address,
  assets,
});

const makeScriptUtxo = (txHashByte: string): UTxO => ({
  txHash: txHashByte.repeat(32),
  outputIndex: 0,
  address: scriptAddress,
  assets: { lovelace: 10_000_000n },
  datum: Data.void(),
});

const outRefKey = (utxo: UTxO) => `${utxo.txHash}:${utxo.outputIndex}`;

describe("evaluator adapter selection", () => {
  test("does not call evaluator adapters for transactions without redeemers", async () => {
    const walletInput = makeUtxo("10");
    const providerEvaluate = vi.fn<Provider["evaluateTx"]>(async () => {
      throw new Error("provider should not evaluate");
    });
    const adapterEvaluate = vi.fn<EvaluatorAdapter["evaluate"]>(async () => {
      throw new Error("local evaluator should not evaluate");
    });

    await makeTxBuilder({
      ...lucidConfig(makeProvider(providerEvaluate), makeWallet([walletInput])),
    })
      .pay.ToAddress(address, { lovelace: 1_000_000n })
      .complete({
        evaluator: { name: "fake", evaluate: adapterEvaluate },
        presetWalletInputs: [walletInput],
      });

    expect(adapterEvaluate).not.toHaveBeenCalled();
    expect(providerEvaluate).not.toHaveBeenCalled();
  });

  test("localUPLCEval false forces provider evaluation over configured evaluators", async () => {
    const walletInput = makeUtxo("33");
    const scriptUtxo = makeScriptUtxo("44");
    const referenceUtxo = makeUtxo("55");
    const providerEvaluate = vi.fn<Provider["evaluateTx"]>(async () => [
      evalRedeemer(),
    ]);
    const adapterEvaluate = vi.fn<EvaluatorAdapter["evaluate"]>(async () => {
      throw new Error("local evaluator should not be called");
    });

    await makeTxBuilder({
      ...lucidConfig(makeProvider(providerEvaluate), makeWallet([walletInput])),
      evaluator: { name: "global-fake", evaluate: adapterEvaluate },
    })
      .attach.SpendingValidator(alwaysSucceedScript)
      .collectFrom([scriptUtxo], Data.void())
      .readFrom([referenceUtxo])
      .complete({
        localUPLCEval: false,
        evaluator: { name: "per-complete-fake", evaluate: adapterEvaluate },
        presetWalletInputs: [walletInput],
      });

    expect(providerEvaluate).toHaveBeenCalled();
    const providerUtxos = providerEvaluate.mock.calls.at(-1)?.[1] ?? [];
    expect(providerUtxos.map(outRefKey)).toEqual(
      expect.arrayContaining([outRefKey(scriptUtxo), outRefKey(referenceUtxo)]),
    );
    expect(adapterEvaluate).not.toHaveBeenCalled();
  });

  test("passes the per-builder slot mapping to evaluator adapters", async () => {
    const walletInput = makeUtxo("66");
    const scriptUtxo = makeScriptUtxo("77");
    const slotConfig = {
      zeroTime: 1_700_000_000_000,
      zeroSlot: 123_456,
      slotLength: 250,
    };
    const adapterEvaluate = vi.fn<EvaluatorAdapter["evaluate"]>(async () => [
      evalRedeemer(),
    ]);

    await makeTxBuilder({
      ...lucidConfig(makeProvider(), makeWallet([walletInput])),
      slotConfig,
      evaluator: { name: "slot-aware", evaluate: adapterEvaluate },
    })
      .attach.SpendingValidator(alwaysSucceedScript)
      .collectFrom([scriptUtxo], Data.void())
      .complete({ presetWalletInputs: [walletInput] });

    expect(adapterEvaluate).toHaveBeenCalled();
    expect(adapterEvaluate.mock.calls.at(-1)?.[0].context.slotConfig).toEqual(
      slotConfig,
    );
  });
});
