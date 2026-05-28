import { describe, expect, test, vi } from "vitest";
import type {
  EvalRedeemer,
  OutRef,
  Provider,
  UTxO,
} from "@lucid-evolution/core-types";
import { CML } from "../src/core.js";
import { createTxGraph } from "../src/graph.js";
import type { TraceOutRef } from "../src/model.js";
import { wrapProvider } from "../src/provider-wrapper.js";
import { outRefKey } from "../src/resolve.js";

const address =
  "addr_test1qrngfyc452vy4twdrepdjc50d4kvqutgt0hs9w6j2qhcdjfx0gpv7rsrjtxv97rplyz3ymyaqdwqa635zrcdena94ljs0xy950";

const ref = (byte: string, outputIndex: number): TraceOutRef => ({
  txHash: byte.repeat(32),
  outputIndex,
});

const makeInput = (outRef: TraceOutRef): CML.TransactionInput =>
  CML.TransactionInput.new(
    CML.TransactionHash.from_hex(outRef.txHash),
    BigInt(outRef.outputIndex),
  );

const makeTx = (input: TraceOutRef): CML.Transaction => {
  const inputs = CML.TransactionInputList.new();
  inputs.add(makeInput(input));
  const outputs = CML.TransactionOutputList.new();
  outputs.add(
    CML.TransactionOutput.new(
      CML.Address.from_bech32(address),
      CML.Value.from_coin(2_000_000n),
    ),
  );
  const body = CML.TransactionBody.new(inputs, outputs, 170_000n);
  return CML.Transaction.new(body, CML.TransactionWitnessSet.new(), true);
};

const txHash = (tx: CML.Transaction): string =>
  CML.hash_transaction(tx.body()).to_hex();

const utxo = (outRef: TraceOutRef, lovelace: bigint): UTxO => ({
  ...outRef,
  address,
  assets: { lovelace },
});

const makeProvider = (
  utxos: ReadonlyArray<UTxO>,
  overrides: Partial<Provider> = {},
): Provider => {
  const byKey = new Map(utxos.map((resolved) => [outRefKey(resolved), resolved]));
  return {
    getProtocolParameters: vi.fn(async () => ({}) as never),
    getUtxos: vi.fn(async () => []),
    getUtxosWithUnit: vi.fn(async () => []),
    getUtxoByUnit: vi.fn(async () => {
      throw new Error("not implemented");
    }),
    getUtxosByOutRef: vi.fn(async (outRefs: OutRef[]) =>
      outRefs.flatMap((outRef) => byKey.get(outRefKey(outRef)) ?? []),
    ),
    getDelegation: vi.fn(async () => ({ poolId: null, rewards: 0n })),
    getDatum: vi.fn(async () => ""),
    awaitTx: vi.fn(async () => true),
    submitTx: vi.fn(async (cbor: string) =>
      txHash(CML.Transaction.from_cbor_hex(cbor)),
    ),
    evaluateTx: vi.fn(async () => []),
    ...overrides,
  };
};

describe("wrapProvider", () => {
  test("records successful submitTx calls and resolves inputs through the wrapped provider", async () => {
    const seedRef = ref("11", 0);
    const tx = makeTx(seedRef);
    const provider = makeProvider([utxo(seedRef, 3_000_000n)]);
    const graph = createTxGraph();
    const tracedProvider = graph.wrapProvider(provider, {
      submitLabel: "submit-flow",
    });

    const submittedHash = await tracedProvider.submitTx(tx.to_cbor_hex());

    expect(submittedHash).toBe(txHash(tx));
    expect(provider.submitTx).toHaveBeenCalledWith(tx.to_cbor_hex());
    expect(await tracedProvider.awaitTx(submittedHash)).toBe(true);
    const trace = graph.toJSON();
    expect(trace.transactions).toHaveLength(1);
    expect(trace.transactions[0]).toMatchObject({
      hash: txHash(tx),
      label: "submit-flow",
      status: "submitted",
    });
    expect(trace.utxos[outRefKey(seedRef)]).toMatchObject({
      ...seedRef,
      resolution: "resolved",
      assets: { lovelace: "3000000" },
    });
    expect(trace.warnings).toEqual([]);
  });

  test("records failed submitTx calls and rethrows the provider error", async () => {
    const seedRef = ref("22", 0);
    const tx = makeTx(seedRef);
    const providerError = new Error("submit rejected");
    const provider = makeProvider([utxo(seedRef, 3_000_000n)], {
      submitTx: vi.fn(async () => {
        throw providerError;
      }),
    });
    const graph = createTxGraph();
    const tracedProvider = wrapProvider(provider, graph, {
      submitLabel: "bad-submit",
    });

    await expect(tracedProvider.submitTx(tx.to_cbor_hex())).rejects.toThrow(
      providerError,
    );

    const trace = graph.toJSON();
    expect(trace.transactions).toHaveLength(1);
    expect(trace.transactions[0]).toMatchObject({
      hash: txHash(tx),
      label: "bad-submit",
      status: "failed",
      failureMessage: "submit rejected",
    });
    expect(trace.warnings).toEqual([
      expect.objectContaining({
        code: "failed-transaction",
        message: "submit rejected",
      }),
    ]);
  });

  test("warns when submitTx returns a different hash than the transaction body", async () => {
    const seedRef = ref("33", 0);
    const tx = makeTx(seedRef);
    const wrongHash = "ff".repeat(32);
    const provider = makeProvider([utxo(seedRef, 3_000_000n)], {
      submitTx: vi.fn(async () => wrongHash),
    });
    const graph = createTxGraph();
    const tracedProvider = graph.wrapProvider(provider);

    await expect(tracedProvider.submitTx(tx.to_cbor_hex())).resolves.toBe(
      wrongHash,
    );

    expect(graph.toJSON().warnings).toEqual([
      expect.objectContaining({
        code: "provider-tx-hash-mismatch",
        txHash: txHash(tx),
      }),
    ]);
  });

  test("records evaluateTx results and uses additional UTxOs for resolution", async () => {
    const seedRef = ref("44", 0);
    const tx = makeTx(seedRef);
    const evaluation: EvalRedeemer[] = [
      {
        redeemer_tag: "spend",
        redeemer_index: 0,
        ex_units: { mem: 12, steps: 34 },
      },
    ];
    const provider = makeProvider([], {
      evaluateTx: vi.fn(async () => evaluation),
    });
    const graph = createTxGraph();
    const tracedProvider = graph.wrapProvider(provider, {
      evaluateLabel: "eval-flow",
    });

    await expect(
      tracedProvider.evaluateTx(tx.to_cbor_hex(), [utxo(seedRef, 3_000_000n)]),
    ).resolves.toEqual(evaluation);

    const trace = graph.toJSON();
    expect(provider.evaluateTx).toHaveBeenCalledWith(tx.to_cbor_hex(), [
      utxo(seedRef, 3_000_000n),
    ]);
    expect(trace.transactions[0]).toMatchObject({
      hash: txHash(tx),
      label: "eval-flow",
      status: "built",
      evaluation: [
        {
          tag: "spend",
          redeemerIndex: 0,
          exUnits: { mem: "12", steps: "34" },
        },
      ],
    });
    expect(trace.utxos[outRefKey(seedRef)]).toMatchObject({
      ...seedRef,
      resolution: "resolved",
    });
  });
});
