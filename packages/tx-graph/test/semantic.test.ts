import { describe, expect, test } from "vitest";
import type { TxGraphTrace } from "../src/model.js";
import { createTxGraph } from "../src/graph.js";
import { CML } from "../src/core.js";
import {
  buildSemanticRenderGraph,
  describeRedeemerByConstructor,
  describeRedeemerWith,
  labelRedeemer,
} from "../src/render/semantic.js";

const txHash = "aa".repeat(32);
const inputHash = "11".repeat(32);
const referenceHash = "22".repeat(32);
const collateralHash = "33".repeat(32);
const policy = "55".repeat(28);
const unit = `${policy}aa`;
const burnedUnit = `${policy}bb`;
const inputKey = `${inputHash}#0`;
const referenceKey = `${referenceHash}#1`;
const collateralKey = `${collateralHash}#2`;
const outputKey = `${txHash}#0`;
const address =
  "addr_test1qrngfyc452vy4twdrepdjc50d4kvqutgt0hs9w6j2qhcdjfx0gpv7rsrjtxv97rplyz3ymyaqdwqa635zrcdena94ljs0xy950";
const signer = "66".repeat(28);
const rewardAddress =
  "stake_test1urqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqg28d0";

const constrData = (constructor: number): string => {
  const fields = CML.PlutusDataList.new();
  return CML.PlutusData.new_constr_plutus_data(
    CML.ConstrPlutusData.new(BigInt(constructor), fields),
  ).to_canonical_cbor_hex();
};

const trace: TxGraphTrace = {
  version: 1,
  transactions: [
    {
      hash: txHash,
      label: "complex action",
      status: "submitted",
      cbor: "84",
      sizeBytes: 42,
      fee: "170000",
      validityInterval: {},
      inputs: [{ txHash: inputHash, outputIndex: 0 }],
      referenceInputs: [{ txHash: referenceHash, outputIndex: 1 }],
      collateralInputs: [{ txHash: collateralHash, outputIndex: 2 }],
      outputs: [
        {
          txHash,
          outputIndex: 0,
          address,
          assets: { lovelace: "2000000", [unit]: "5" },
          resolution: "resolved",
          tags: ["recipient"],
        },
      ],
      collateralReturn: {
        address,
        assets: { lovelace: "4000000" },
      },
      mint: { [unit]: "5", [burnedUnit]: "-2" },
      mintedAssets: { [unit]: "5" },
      burnedAssets: { [burnedUnit]: "2" },
      withdrawals: [{ rewardAddress, amount: "1000000" }],
      certificates: [{ index: 4, kind: 0, kindName: "stake registration" }],
      redeemers: [
        {
          tag: "spend",
          index: "0",
          redeemerListIndex: 0,
          data: "d87980",
          exUnits: { mem: "1", steps: "2" },
        },
        {
          tag: "mint",
          index: "0",
          redeemerListIndex: 1,
          data: "d87980",
          exUnits: { mem: "3", steps: "4" },
        },
        {
          tag: "publish",
          index: "4",
          redeemerListIndex: 2,
          data: "d87980",
          exUnits: { mem: "5", steps: "6" },
        },
        {
          tag: "vote",
          index: "0",
          redeemerListIndex: 3,
          data: "d87980",
          exUnits: { mem: "7", steps: "8" },
        },
      ],
      requiredSigners: [signer],
    },
  ],
  utxos: {
    [inputKey]: {
      txHash: inputHash,
      outputIndex: 0,
      address,
      assets: { lovelace: "3000000" },
      resolution: "resolved",
      tags: ["script-state"],
    },
    [referenceKey]: {
      txHash: referenceHash,
      outputIndex: 1,
      address,
      assets: { lovelace: "1500000" },
      resolution: "resolved",
      tags: ["reference-script"],
    },
    [collateralKey]: {
      txHash: collateralHash,
      outputIndex: 2,
      address,
      assets: { lovelace: "5000000" },
      resolution: "resolved",
      tags: ["collateral"],
    },
    [outputKey]: {
      txHash,
      outputIndex: 0,
      address,
      assets: { lovelace: "2000000", [unit]: "5" },
      resolution: "resolved",
      tags: ["recipient"],
    },
  },
  edges: [],
  warnings: [
    {
      code: "example-warning",
      message: "diagnostic coverage",
      txHash,
    },
  ],
  aliases: {
    assets: { [unit]: "TOKEN", [burnedUnit]: "BURNED" },
    addresses: { [address]: "wallet" },
  },
};

describe("buildSemanticRenderGraph", () => {
  test("builds stable nodes, ports, edge ids, and target metadata", () => {
    const semantic = buildSemanticRenderGraph(trace);

    expect(semantic.nodes.map(({ id }) => id)).toEqual(
      expect.arrayContaining([
        `tx:${txHash}`,
        `utxo:${inputKey}`,
        `utxo:${outputKey}`,
        `asset-policy:${policy}`,
        `certificate:${txHash}#4`,
        `collateral-return:${txHash}`,
        `signer:${signer}`,
        `withdrawal:${rewardAddress}`,
      ]),
    );

    const txNode = semantic.nodes.find((node) => node.id === `tx:${txHash}`);
    expect(txNode?.ports.map(({ id }) => id)).toEqual(
      expect.arrayContaining([
        `tx:${txHash}:port:spend:0`,
        `tx:${txHash}:port:read:0`,
        `tx:${txHash}:port:collateral:0`,
        `tx:${txHash}:port:produce:0`,
        `tx:${txHash}:port:mint:0`,
        `tx:${txHash}:port:burn:0`,
        `tx:${txHash}:port:withdraw:0`,
        `tx:${txHash}:port:certify:4`,
        `tx:${txHash}:port:sign:0`,
        `tx:${txHash}:port:collateralReturn:0`,
      ]),
    );

    const spendEdge = semantic.edges.find(
      (edge) => edge.id === `tx:${txHash}:spend:0:${inputKey}`,
    );
    expect(spendEdge).toMatchObject({
      kind: "spend",
      from: `utxo:${inputKey}`,
      to: `tx:${txHash}`,
      fromPort: `utxo:${inputKey}:port:out`,
      toPort: `tx:${txHash}:port:spend:0`,
      redeemerKey: {
        tag: "spend",
        index: "0",
        redeemerListIndex: 0,
      },
      targetRef: {
        type: "input",
        inputKind: "spend",
        txHash,
        index: 0,
        outRef: { txHash: inputHash, outputIndex: 0 },
      },
    });

    expect(
      semantic.edges.find(
        (edge) => edge.id === `tx:${txHash}:read:0:${referenceKey}`,
      ),
    ).toMatchObject({
      kind: "read",
      fromPort: `utxo:${referenceKey}:port:out`,
      toPort: `tx:${txHash}:port:read:0`,
      targetRef: {
        type: "input",
        inputKind: "read",
        index: 0,
        outRef: { txHash: referenceHash, outputIndex: 1 },
      },
    });

    expect(
      semantic.edges.find(
        (edge) => edge.id === `tx:${txHash}:collateral:0:${collateralKey}`,
      ),
    ).toMatchObject({
      kind: "collateral",
      targetRef: {
        type: "input",
        inputKind: "collateral",
        index: 0,
        outRef: { txHash: collateralHash, outputIndex: 2 },
      },
    });

    expect(
      semantic.edges.find((edge) => edge.id === `tx:${txHash}:produce:0`),
    ).toMatchObject({
      kind: "produce",
      targetRef: {
        type: "output",
        index: 0,
        outRef: { txHash, outputIndex: 0 },
      },
    });

    expect(
      semantic.edges.find(
        (edge) => edge.id === `tx:${txHash}:mint:0:${policy}`,
      ),
    ).toMatchObject({
      kind: "mint",
      redeemerKey: {
        tag: "mint",
        index: "0",
        redeemerListIndex: 1,
      },
      targetRef: {
        type: "assetPolicy",
        policyId: policy,
        policyIndex: 0,
        assets: { [unit]: "5" },
      },
    });

    expect(
      semantic.edges.find(
        (edge) => edge.id === `tx:${txHash}:burn:0:${policy}`,
      ),
    ).toMatchObject({
      kind: "burn",
      redeemerKey: {
        tag: "mint",
        index: "0",
        redeemerListIndex: 1,
      },
      targetRef: {
        type: "assetPolicy",
        policyId: policy,
        policyIndex: 0,
        assets: { [burnedUnit]: "2" },
      },
    });

    const assetNode = semantic.nodes.find(
      (node) => node.id === `asset-policy:${policy}`,
    );
    expect(
      assetNode?.sections[0]?.rows.map(({ label, value }) => ({
        label,
        value,
      })),
    ).toEqual([
      { label: "Asset", value: "TOKEN" },
      { label: "Asset", value: "BURNED" },
    ]);

    expect(
      semantic.edges.find(
        (edge) => edge.id === `tx:${txHash}:withdraw:0:${rewardAddress}`,
      ),
    ).toMatchObject({
      kind: "withdraw",
      targetRef: {
        type: "withdrawal",
        index: 0,
        rewardAddress,
      },
    });

    expect(
      semantic.edges.find((edge) => edge.id === `tx:${txHash}:cert:4`),
    ).toMatchObject({
      kind: "certify",
      fromPort: `tx:${txHash}:port:certify:4`,
      redeemerKey: {
        tag: "publish",
        index: "4",
        redeemerListIndex: 2,
      },
      targetRef: {
        type: "certificate",
        index: 4,
      },
    });

    expect(
      semantic.edges.find(
        (edge) => edge.id === `tx:${txHash}:signer:${signer}`,
      ),
    ).toMatchObject({
      kind: "sign",
      targetRef: {
        type: "signer",
        keyHash: signer,
      },
    });

    expect(
      semantic.edges.find(
        (edge) => edge.id === `tx:${txHash}:collateral-return`,
      ),
    ).toMatchObject({
      kind: "collateralReturn",
      targetRef: {
        type: "collateralReturn",
        txHash,
      },
    });

    expect(semantic.diagnostics).toEqual([
      expect.objectContaining({
        id: "diagnostic:0:example-warning",
        code: "example-warning",
        message: "diagnostic coverage",
        txHash,
      }),
      expect.objectContaining({
        code: "unmapped-redeemer",
        redeemerKey: {
          tag: "vote",
          index: "0",
          redeemerListIndex: 3,
        },
      }),
    ]);
  });

  test("is available from graph instances", async () => {
    const graph = createTxGraph();
    const tx = CML.Transaction.new(
      CML.TransactionBody.new(
        CML.TransactionInputList.new(),
        CML.TransactionOutputList.new(),
        170_000n,
      ),
      CML.TransactionWitnessSet.new(),
      true,
    );
    await graph.record(tx, {
      label: "empty placeholder",
    });

    expect(graph.toSemantic()).toMatchObject({
      version: 1,
      legend: expect.objectContaining({
        nodes: expect.arrayContaining([
          expect.objectContaining({ kind: "transaction" }),
        ]),
      }),
    });
  });

  test("keeps repeated policy units non-lossy on edges and non-misleading on policy nodes", () => {
    const firstHash = "77".repeat(32);
    const secondHash = "88".repeat(32);
    const repeatedTrace: TxGraphTrace = {
      ...trace,
      transactions: [
        {
          ...trace.transactions[0]!,
          hash: firstHash,
          label: "mint first",
          mint: { [unit]: "5" },
          mintedAssets: { [unit]: "5" },
          burnedAssets: {},
          outputs: [],
          inputs: [],
          referenceInputs: [],
          collateralInputs: [],
          withdrawals: [],
          certificates: [],
          requiredSigners: [],
          redeemers: [],
          collateralReturn: undefined,
        },
        {
          ...trace.transactions[0]!,
          hash: secondHash,
          label: "mint second",
          mint: { [unit]: "2" },
          mintedAssets: { [unit]: "2" },
          burnedAssets: {},
          outputs: [],
          inputs: [],
          referenceInputs: [],
          collateralInputs: [],
          withdrawals: [],
          certificates: [],
          requiredSigners: [],
          redeemers: [],
          collateralReturn: undefined,
        },
      ],
      utxos: {},
      warnings: [],
    };

    const semantic = buildSemanticRenderGraph(repeatedTrace);
    const assetNode = semantic.nodes.find(
      (node) => node.id === `asset-policy:${policy}`,
    );

    expect(assetNode?.sections[0]?.rows).toEqual([
      expect.objectContaining({
        id: `asset:${unit}`,
        label: "Asset",
        value: "TOKEN",
      }),
    ]);
    expect(
      semantic.edges.find(
        (edge) => edge.id === `tx:${firstHash}:mint:0:${policy}`,
      )?.targetRef,
    ).toMatchObject({ assets: { [unit]: "5" } });
    expect(
      semantic.edges.find(
        (edge) => edge.id === `tx:${secondHash}:mint:0:${policy}`,
      )?.targetRef,
    ).toMatchObject({ assets: { [unit]: "2" } });
  });

  test("adds auditable action labels from redeemer describers and generic fallbacks", () => {
    const semantic = buildSemanticRenderGraph(trace, {
      redeemers: [
        labelRedeemer({ tag: "spend", index: 0 }, "Swap", "swap"),
        describeRedeemerByConstructor(
          { tag: "mint", index: 0, constructor: 0 },
          "MintReward",
          "mint-reward",
        ),
        describeRedeemerWith(({ redeemer, target }) =>
          redeemer.tag === "publish" && target.type === "certificate"
            ? {
                label: "PublishStake",
                source: "schema",
                confidence: "high",
                fields: { certificate: String(target.index) },
              }
            : undefined,
        ),
      ],
    });

    expect(
      semantic.edges.find(
        (edge) => edge.id === `tx:${txHash}:spend:0:${inputKey}`,
      ),
    ).toMatchObject({
      label: "Swap",
      action: {
        label: "Swap",
        intent: "swap",
        source: "user",
        confidence: "high",
      },
    });
    expect(
      semantic.edges.find(
        (edge) => edge.id === `tx:${txHash}:mint:0:${policy}`,
      ),
    ).toMatchObject({
      label: "MintReward",
      action: {
        label: "MintReward",
        intent: "mint-reward",
        source: "constructor",
        confidence: "medium",
        fields: { constructor: "0" },
      },
    });
    expect(
      semantic.edges.find(
        (edge) => edge.id === `tx:${txHash}:burn:0:${policy}`,
      ),
    ).toMatchObject({
      label: "MintReward",
      action: {
        source: "constructor",
      },
    });
    expect(
      semantic.edges.find((edge) => edge.id === `tx:${txHash}:cert:4`),
    ).toMatchObject({
      label: "PublishStake",
      action: {
        label: "PublishStake",
        source: "schema",
        confidence: "high",
        fields: { certificate: "4" },
      },
    });
  });

  test("decodes non-zero Plutus constructors for action labels", () => {
    const constructorTrace: TxGraphTrace = {
      ...trace,
      transactions: [
        {
          ...trace.transactions[0]!,
          redeemers: trace.transactions[0]!.redeemers.map((redeemer) =>
            redeemer.tag === "mint"
              ? { ...redeemer, data: constrData(1) }
              : redeemer,
          ),
        },
      ],
    };
    const semantic = buildSemanticRenderGraph(constructorTrace, {
      redeemers: [
        describeRedeemerByConstructor(
          { tag: "mint", index: 0, constructor: 1 },
          "MintWithConstructorOne",
        ),
      ],
    });

    expect(
      semantic.edges.find(
        (edge) => edge.id === `tx:${txHash}:mint:0:${policy}`,
      ),
    ).toMatchObject({
      label: "MintWithConstructorOne",
      action: {
        fields: { constructor: "1" },
        source: "constructor",
      },
    });
  });

  test("scopes convenience redeemer labels by transaction and target", () => {
    const secondHash = "bb".repeat(32);
    const secondInputHash = "44".repeat(32);
    const secondInputKey = `${secondInputHash}#0`;
    const scopedTrace: TxGraphTrace = {
      ...trace,
      transactions: [
        trace.transactions[0]!,
        {
          hash: secondHash,
          label: "second action",
          status: "submitted",
          cbor: "84",
          sizeBytes: 12,
          fee: "120000",
          validityInterval: {},
          inputs: [{ txHash: secondInputHash, outputIndex: 0 }],
          referenceInputs: [],
          collateralInputs: [],
          outputs: [],
          mint: {},
          mintedAssets: {},
          burnedAssets: {},
          withdrawals: [],
          certificates: [],
          redeemers: [
            {
              tag: "spend",
              index: "0",
              redeemerListIndex: 0,
              data: "d87980",
              exUnits: { mem: "9", steps: "10" },
            },
          ],
          requiredSigners: [],
        },
      ],
      utxos: {
        ...trace.utxos,
        [secondInputKey]: {
          ...trace.utxos[inputKey]!,
          txHash: secondInputHash,
          outputIndex: 0,
          tags: ["second-script-state"],
        },
      },
    };
    const semantic = buildSemanticRenderGraph(scopedTrace, {
      redeemers: [
        labelRedeemer(
          {
            tag: "spend",
            index: 0,
            txHash: secondHash,
            target: (target) =>
              target.type === "input" &&
              target.outRef.txHash === secondInputHash,
          },
          "SecondSpend",
        ),
      ],
    });

    expect(
      semantic.edges.find(
        (edge) => edge.id === `tx:${txHash}:spend:0:${inputKey}`,
      ),
    ).toMatchObject({
      label: "spend #0",
      action: { source: "generic" },
    });
    expect(
      semantic.edges.find(
        (edge) => edge.id === `tx:${secondHash}:spend:0:${secondInputKey}`,
      ),
    ).toMatchObject({
      label: "SecondSpend",
      action: { source: "user" },
    });
  });

  test("uses generic action labels when a mapped redeemer has no describer", () => {
    const semantic = buildSemanticRenderGraph(trace);

    expect(
      semantic.edges.find(
        (edge) => edge.id === `tx:${txHash}:spend:0:${inputKey}`,
      ),
    ).toMatchObject({
      label: "spend #0",
      action: {
        label: "spend #0",
        source: "generic",
        confidence: "fallback",
      },
    });
  });
});
