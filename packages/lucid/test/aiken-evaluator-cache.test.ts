import { describe, expect, test } from "vitest";
import {
  CML,
  createCostModels,
  EvaluationContext,
  makeAikenEvaluator,
  PROTOCOL_PARAMETERS_DEFAULT,
  SLOT_CONFIG_NETWORK,
  UPLCModule,
  UTxO,
} from "../src/index.js";

const ADDRESS = CML.EnterpriseAddress.new(
  0,
  CML.Credential.new_pub_key(CML.Ed25519KeyHash.from_hex("c".repeat(56))),
)
  .to_address()
  .to_bech32(undefined);
const POLICY_A = "a".repeat(56);
const POLICY_B = "b".repeat(56);

const context: EvaluationContext = {
  network: "Custom",
  slotConfig: SLOT_CONFIG_NETWORK.Preview,
  protocolParameters: PROTOCOL_PARAMETERS_DEFAULT,
  costModels: createCostModels(PROTOCOL_PARAMETERS_DEFAULT.costModels),
};

// A distinct transaction per fee, so the evaluator's remembered request does
// not answer a later call.
const emptyTx = (fee: bigint): string =>
  CML.Transaction.new(
    CML.TransactionBody.new(
      CML.TransactionInputList.new(),
      CML.TransactionOutputList.new(),
      fee,
    ),
    CML.TransactionWitnessSet.new(),
    true,
  ).to_cbor_hex();

const utxo = (outputIndex: number, assets: UTxO["assets"]): UTxO => ({
  txHash: "1".repeat(64),
  outputIndex,
  address: ADDRESS,
  assets,
});

// An evaluator whose wasm records the encoded outputs of every call.
const recordingEvaluator = () => {
  const outputs: Uint8Array[][] = [];
  const uplc: UPLCModule = {
    eval_phase_two_raw: (_tx, _inputs, encodedOutputs) => {
      outputs.push(encodedOutputs);
      return [];
    },
  };
  let fee = 0n;
  const evaluate = (utxos: UTxO[]) =>
    evaluator.evaluate({
      tx: emptyTx(fee++),
      additionalUTxOs: utxos,
      context,
    });
  const evaluator = makeAikenEvaluator(uplc);
  return { outputs, evaluate };
};

const hex = (bytes: Uint8Array) => Buffer.from(bytes).toString("hex");

describe("built-in evaluator UTxO encodings", () => {
  test("a UTxO whose assets are reordered is encoded again", async () => {
    const ordered = utxo(0, {
      lovelace: 5_000_000n,
      [POLICY_A + "01"]: 1n,
      [POLICY_B + "02"]: 1n,
    });
    const reordered = utxo(0, {
      lovelace: 5_000_000n,
      [POLICY_B + "02"]: 1n,
      [POLICY_A + "01"]: 1n,
    });

    const fresh = recordingEvaluator();
    await fresh.evaluate([reordered]);
    const reused = recordingEvaluator();
    await reused.evaluate([ordered]);
    await reused.evaluate([reordered]);

    expect(hex(reused.outputs[0][0])).not.toBe(hex(fresh.outputs[0][0]));
    expect(hex(reused.outputs[1][0])).toBe(hex(fresh.outputs[0][0]));
  });

  test("a UTxO whose datum or reference script changes is encoded again", async () => {
    const plain = utxo(0, { lovelace: 5_000_000n });
    const variants: UTxO[] = [
      { ...plain, datum: "d87980" },
      { ...plain, datumHash: "2".repeat(64) },
      { ...plain, scriptRef: { type: "PlutusV3", script: "450100002499" } },
    ];
    for (const variant of variants) {
      const fresh = recordingEvaluator();
      await fresh.evaluate([variant]);
      const reused = recordingEvaluator();
      await reused.evaluate([plain]);
      await reused.evaluate([variant]);
      expect(hex(reused.outputs[1][0])).toBe(hex(fresh.outputs[0][0]));
    }
  });

  test("an unchanged UTxO reuses its encoding", async () => {
    const { outputs, evaluate } = recordingEvaluator();
    const input = utxo(0, { lovelace: 5_000_000n, [POLICY_A + "01"]: 1n });
    await evaluate([input]);
    await evaluate([{ ...input, assets: { ...input.assets } }]);
    expect(outputs[1][0]).toBe(outputs[0][0]);
  });

  test("encodings the latest request did not use are dropped", async () => {
    const { outputs, evaluate } = recordingEvaluator();
    const kept = utxo(0, { lovelace: 5_000_000n });
    const dropped = utxo(1, { lovelace: 6_000_000n });
    await evaluate([kept, dropped]);
    // Many distinct UTxOs pass through a long-lived evaluator.
    for (let index = 2; index < 1_002; index++) {
      await evaluate([kept, utxo(index, { lovelace: 1_000_000n })]);
    }
    await evaluate([kept, dropped]);
    const last = outputs.at(-1)!;
    // `kept` was in every request, so its encoding was reused throughout;
    // `dropped` was encoded afresh.
    expect(last[0]).toBe(outputs[0][0]);
    expect(last[1]).not.toBe(outputs[0][1]);
    expect(hex(last[1])).toBe(hex(outputs[0][1]));
  });
});
