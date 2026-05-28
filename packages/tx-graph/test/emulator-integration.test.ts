import { describe, expect, test } from "vitest";
import {
  Emulator,
  generateEmulatorAccount,
} from "@lucid-evolution/provider";
import { CML } from "../src/core.js";
import { createTxGraph } from "../src/graph.js";
import { outRefKey } from "../src/resolve.js";

const makeInput = (
  txHash: string,
  outputIndex: number,
): CML.TransactionInput =>
  CML.TransactionInput.new(
    CML.TransactionHash.from_hex(txHash),
    BigInt(outputIndex),
  );

const makeEvaluationTx = (
  txHash: string,
  outputIndex: number,
  address: string,
): CML.Transaction => {
  const inputs = CML.TransactionInputList.new();
  inputs.add(makeInput(txHash, outputIndex));

  const outputs = CML.TransactionOutputList.new();
  outputs.add(
    CML.TransactionOutput.new(
      CML.Address.from_bech32(address),
      CML.Value.from_coin(2_000_000n),
    ),
  );

  return CML.Transaction.new(
    CML.TransactionBody.new(inputs, outputs, 170_000n),
    CML.TransactionWitnessSet.new(),
    true,
  );
};

describe("tx graph with Emulator provider", () => {
  test("wraps a real Emulator evaluateTx flow and resolves additional UTxOs", async () => {
    const account = generateEmulatorAccount({
      lovelace: 10_000_000n,
    });
    const emulator = new Emulator([account]);
    const [seedUtxo] = await emulator.getUtxos(account.address);
    const tx = makeEvaluationTx(
      seedUtxo.txHash,
      seedUtxo.outputIndex,
      account.address,
    );
    const graph = createTxGraph({
      addresses: {
        [account.address]: "emulator-wallet",
      },
    });
    const tracedProvider = graph.wrapProvider(emulator, {
      evaluateLabel: "emulator-evaluate",
    });

    await expect(
      tracedProvider.evaluateTx(tx.to_cbor_hex(), [seedUtxo]),
    ).resolves.toEqual([]);

    const trace = graph.toJSON();
    expect(trace.transactions).toEqual([
      expect.objectContaining({
        label: "emulator-evaluate",
        status: "built",
        evaluation: [],
      }),
    ]);
    expect(trace.utxos[outRefKey(seedUtxo)]).toMatchObject({
      txHash: seedUtxo.txHash,
      outputIndex: seedUtxo.outputIndex,
      address: account.address,
      assets: { lovelace: "10000000" },
      resolution: "genesis",
      tags: ["genesis"],
    });
    expect(graph.toMermaid()).toContain("emulator-wallet");
    expect(graph.toMermaid()).toContain("genesis UTxO");
  });
});
