import { describe, expect, test } from "vitest";
import type { Provider, UTxO } from "@lucid-evolution/core-types";
import { CML } from "../src/core.js";
import { createTxGraph } from "../src/graph.js";
import { tagByAddress, tagByUnit } from "../src/labels.js";
import type { TraceOutRef } from "../src/model.js";
import { outRefKey } from "../src/resolve.js";

const address =
  "addr_test1qrngfyc452vy4twdrepdjc50d4kvqutgt0hs9w6j2qhcdjfx0gpv7rsrjtxv97rplyz3ymyaqdwqa635zrcdena94ljs0xy950";

const ref = (byte: string, outputIndex: number): TraceOutRef => ({
  txHash: byte.repeat(32),
  outputIndex,
});

const txHash = (tx: CML.Transaction): string =>
  CML.hash_transaction(tx.body()).to_hex();

const makeInput = (outRef: TraceOutRef): CML.TransactionInput =>
  CML.TransactionInput.new(
    CML.TransactionHash.from_hex(outRef.txHash),
    BigInt(outRef.outputIndex),
  );

const makeInputList = (
  outRefs: ReadonlyArray<TraceOutRef>,
): CML.TransactionInputList => {
  const inputs = CML.TransactionInputList.new();
  for (const outRef of outRefs) {
    inputs.add(makeInput(outRef));
  }
  return inputs;
};

const makeOutput = (lovelace: bigint): CML.TransactionOutput =>
  CML.TransactionOutput.new(
    CML.Address.from_bech32(address),
    CML.Value.from_coin(lovelace),
  );

const makeTx = (
  inputs: ReadonlyArray<TraceOutRef>,
  outputs: ReadonlyArray<bigint>,
  configure?: (body: CML.TransactionBody) => void,
): CML.Transaction => {
  const cmlOutputs = CML.TransactionOutputList.new();
  for (const output of outputs) {
    cmlOutputs.add(makeOutput(output));
  }
  const body = CML.TransactionBody.new(
    makeInputList(inputs),
    cmlOutputs,
    170_000n,
  );
  configure?.(body);
  return CML.Transaction.new(body, CML.TransactionWitnessSet.new(), true);
};

const utxo = (outRef: TraceOutRef, lovelace: bigint): UTxO => ({
  ...outRef,
  address,
  assets: { lovelace },
});

const providerReturning = (
  byKey: ReadonlyMap<string, UTxO>,
  calls: TraceOutRef[][] = [],
): Pick<Provider, "getUtxosByOutRef"> => ({
  getUtxosByOutRef: async (outRefs) => {
    calls.push(outRefs);
    return outRefs.flatMap((outRef) => byKey.get(outRefKey(outRef)) ?? []);
  },
});

describe("createTxGraph", () => {
  test("records chained transactions and resolves later inputs from scenario cache", async () => {
    const seedRef = ref("11", 0);
    const tx1 = makeTx([seedRef], [2_000_000n]);
    const tx1OutputRef = { txHash: txHash(tx1), outputIndex: 0 };
    const tx2 = makeTx([tx1OutputRef], [1_500_000n]);
    const providerCalls: TraceOutRef[][] = [];
    const graph = createTxGraph({
      provider: providerReturning(
        new Map([[outRefKey(seedRef), utxo(seedRef, 3_000_000n)]]),
        providerCalls,
      ),
      aliases: {
        assets: { lovelace: "ADA" },
        addresses: { [address]: "wallet" },
      },
    });

    await graph.record(tx1, { label: "first", status: "signed" });
    await graph.record(tx2, { label: "second", status: "submitted" });

    const trace = graph.toJSON();
    expect(providerCalls).toEqual([[seedRef]]);
    expect(trace.transactions.map(({ label, status }) => ({ label, status })))
      .toEqual([
        { label: "first", status: "signed" },
        { label: "second", status: "submitted" },
      ]);
    expect(Object.keys(trace.utxos)).toEqual(
      [outRefKey(seedRef), outRefKey(tx1OutputRef), `${txHash(tx2)}#0`].sort(),
    );
    expect(trace.utxos[outRefKey(tx1OutputRef)]).toMatchObject({
      ...tx1OutputRef,
      resolution: "resolved",
      assets: { lovelace: "2000000" },
    });
    expect(trace.edges).toEqual(
      expect.arrayContaining([
        {
          kind: "spends",
          from: `utxo:${outRefKey(seedRef)}`,
          to: `tx:${txHash(tx1)}`,
        },
        {
          kind: "produces",
          from: `tx:${txHash(tx1)}`,
          to: `utxo:${outRefKey(tx1OutputRef)}`,
        },
        {
          kind: "spends",
          from: `utxo:${outRefKey(tx1OutputRef)}`,
          to: `tx:${txHash(tx2)}`,
        },
      ]),
    );
    expect(trace.aliases).toEqual({
      assets: { lovelace: "ADA" },
      addresses: { [address]: "wallet" },
    });
    expect(trace.warnings).toEqual([]);
  });

  test("keeps unresolved spend, reference, and collateral inputs visible", async () => {
    const spendRef = ref("22", 0);
    const referenceRef = ref("33", 1);
    const collateralRef = ref("44", 2);
    const tx = makeTx([spendRef], [2_000_000n], (body) => {
      body.set_reference_inputs(makeInputList([referenceRef]));
      body.set_collateral_inputs(makeInputList([collateralRef]));
    });
    const graph = createTxGraph();

    await graph.record(tx);

    const trace = graph.toJSON();
    expect(trace.utxos[outRefKey(spendRef)]).toMatchObject({
      ...spendRef,
      resolution: "unresolved",
      unresolvedReason: "missing-provider",
    });
    expect(trace.utxos[outRefKey(referenceRef)]).toMatchObject({
      ...referenceRef,
      resolution: "unresolved",
      unresolvedReason: "missing-provider",
    });
    expect(trace.utxos[outRefKey(collateralRef)]).toMatchObject({
      ...collateralRef,
      resolution: "unresolved",
      unresolvedReason: "missing-provider",
    });
    expect(trace.warnings.map(({ code }) => code)).toEqual([
      "unresolved-spend-input",
      "unresolved-reference-input",
      "unresolved-collateral-input",
    ]);
  });

  test("classifies all-zero hash inputs as genesis before provider resolution", async () => {
    const genesisRef = ref("00", 0);
    const tx = makeTx([genesisRef], [2_000_000n]);
    const providerCalls: TraceOutRef[][] = [];
    const graph = createTxGraph({
      provider: {
        getUtxosByOutRef: async (outRefs) => {
          providerCalls.push(outRefs);
          throw new Error("genesis should not be provider-resolved");
        },
      },
    });

    await graph.record(tx, { label: "seeded-from-genesis" });

    const trace = graph.toJSON();
    expect(providerCalls).toEqual([]);
    expect(trace.utxos[outRefKey(genesisRef)]).toMatchObject({
      ...genesisRef,
      address: "genesis",
      resolution: "genesis",
      tags: ["genesis"],
    });
    expect(trace.warnings).toEqual([]);
    expect(graph.toMermaid()).toContain("genesis UTxO");
    expect(graph.toMermaid()).toContain("classDef genesis");
    expect(graph.toMermaid()).not.toContain("unresolved:");
    expect(graph.toDot()).toContain('fillcolor="#fef3c7"');
  });

  test("keeps preloaded all-zero hash inputs as genesis with known assets", async () => {
    const genesisRef = ref("00", 1);
    const tx = makeTx([genesisRef], [2_000_000n]);
    const graph = createTxGraph();
    graph.addResolvedUtxos([utxo(genesisRef, 5_000_000n)]);

    await graph.record(tx, { label: "seeded-from-known-genesis" });

    const trace = graph.toJSON();
    expect(trace.utxos[outRefKey(genesisRef)]).toMatchObject({
      ...genesisRef,
      assets: { lovelace: "5000000" },
      resolution: "genesis",
      tags: ["genesis"],
    });
    expect(trace.warnings).toEqual([]);
    expect(graph.toMermaid()).toContain("5000000 lovelace");
  });

  test("supports preloaded UTxOs and warns on duplicate spends", async () => {
    const seedRef = ref("55", 0);
    const graph = createTxGraph();
    graph.addResolvedUtxos([utxo(seedRef, 3_000_000n)]);

    await graph.record(makeTx([seedRef], [2_000_000n]), {
      label: "first-spend",
    });
    await graph.record(makeTx([seedRef], [1_500_000n]), {
      label: "second-spend",
    });

    const trace = graph.toJSON();
    expect(trace.utxos[outRefKey(seedRef)]).toMatchObject({
      ...seedRef,
      resolution: "resolved",
      assets: { lovelace: "3000000" },
    });
    expect(trace.warnings).toEqual([
      expect.objectContaining({
        code: "duplicate-spend",
        outRef: seedRef,
      }),
    ]);
  });

  test("applies taggers to resolved inputs and produced outputs", async () => {
    const seedRef = ref("60", 0);
    const unit = "aa".repeat(28) + "01";
    const tx = makeTx([seedRef], [2_000_000n]);
    const graph = createTxGraph({
      labels: [tagByAddress("wallet", address), tagByUnit("tracked-asset", unit)],
    });
    graph.addResolvedUtxos([
      {
        ...utxo(seedRef, 3_000_000n),
        assets: { lovelace: 3_000_000n, [unit]: 1n },
      },
    ]);

    await graph.record(tx);

    const trace = graph.toJSON();
    expect(trace.utxos[outRefKey(seedRef)]?.tags).toEqual([
      "tracked-asset",
      "wallet",
    ]);
    expect(trace.utxos[`${txHash(tx)}#0`]?.tags).toEqual(["wallet"]);
    expect(trace.transactions[0]?.outputs[0]?.tags).toEqual(["wallet"]);
  });

  test("updates an existing transaction when the same hash is recorded later", async () => {
    const seedRef = ref("61", 0);
    const tx = makeTx([seedRef], [2_000_000n]);
    const graph = createTxGraph();
    graph.addResolvedUtxos([utxo(seedRef, 3_000_000n)]);

    await graph.record(tx, { label: "lifecycle", status: "built" });
    await graph.record(tx, { status: "submitted" });

    const trace = graph.toJSON();
    const txNode = `tx:${txHash(tx)}`;
    expect(trace.transactions).toHaveLength(1);
    expect(trace.transactions[0]).toMatchObject({
      hash: txHash(tx),
      label: "lifecycle",
      status: "submitted",
    });
    expect(trace.edges.filter((edge) => edge.from === txNode || edge.to === txNode))
      .toHaveLength(2);
    expect(trace.warnings.filter(({ code }) => code === "duplicate-spend"))
      .toEqual([]);
  });

  test("exposes DOT and Mermaid renderers from the graph API", async () => {
    const seedRef = ref("62", 0);
    const tx = makeTx([seedRef], [2_000_000n]);
    const graph = createTxGraph({
      assets: { lovelace: "ADA" },
      addresses: { [address]: "wallet" },
    });
    graph.addResolvedUtxos([utxo(seedRef, 3_000_000n)]);

    await graph.record(tx, { label: "render-me", status: "submitted" });

    expect(graph.toDot()).toContain("render-me");
    expect(graph.toDot()).toContain("ADA");
    expect(graph.toMermaid()).toContain("render-me");
    expect(graph.toMermaid()).toContain("ADA");
  });

  test("supports user resolvers, recordCbor, and failed status metadata", async () => {
    const seedRef = ref("66", 0);
    const tx = makeTx([seedRef], [2_000_000n]);
    const graph = createTxGraph();
    graph.resolveWith(async (outRefs) => [utxo(outRefs[0], 4_000_000n)]);

    await graph.recordCbor(tx.to_cbor_hex(), {
      status: "failed",
      failureMessage: "submit rejected",
    });

    const trace = graph.toJSON();
    expect(trace.transactions[0]).toMatchObject({
      hash: txHash(tx),
      status: "failed",
      failureMessage: "submit rejected",
    });
    expect(trace.utxos[outRefKey(seedRef)]).toMatchObject({
      ...seedRef,
      resolution: "resolved",
      assets: { lovelace: "4000000" },
    });
    expect(trace.warnings).toEqual([
      expect.objectContaining({
        code: "failed-transaction",
        message: "submit rejected",
      }),
    ]);
  });

  test("does not advance the scenario cache for failed transactions", async () => {
    const seedRef = ref("77", 0);
    const failedTx = makeTx([seedRef], [2_000_000n]);
    const failedOutputRef = { txHash: txHash(failedTx), outputIndex: 0 };
    const dependentTx = makeTx([failedOutputRef], [1_500_000n]);
    const graph = createTxGraph();
    graph.addResolvedUtxos([utxo(seedRef, 3_000_000n)]);

    await graph.record(failedTx, { status: "failed" });
    await graph.record(dependentTx);

    const trace = graph.toJSON();
    expect(trace.warnings).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ code: "failed-transaction" }),
        expect.objectContaining({
          code: "unresolved-spend-input",
          outRef: failedOutputRef,
        }),
      ]),
    );
    expect(trace.utxos[outRefKey(failedOutputRef)]).toMatchObject({
      ...failedOutputRef,
      resolution: "resolved",
      assets: { lovelace: "2000000" },
    });
  });
});
