import { describe, expect, test } from "vitest";
import type { TxGraphTrace } from "../src/model.js";
import { traceToDot } from "../src/render/dot.js";
import { traceToJSON } from "../src/render/json.js";
import { traceToMermaid } from "../src/render/mermaid.js";

const txHash = "aa".repeat(32);
const inputHash = "11".repeat(32);
const outputKey = `${txHash}#0`;
const inputKey = `${inputHash}#0`;
const policy = "55".repeat(28);
const unit = `${policy}01`;
const address =
  "addr_test1qrngfyc452vy4twdrepdjc50d4kvqutgt0hs9w6j2qhcdjfx0gpv7rsrjtxv97rplyz3ymyaqdwqa635zrcdena94ljs0xy950";

const trace: TxGraphTrace = {
  version: 1,
  transactions: [
    {
      hash: txHash,
      label: "mint-and-pay",
      status: "submitted",
      cbor: "84",
      sizeBytes: 1,
      fee: "170000",
      validityInterval: {},
      inputs: [{ txHash: inputHash, outputIndex: 0 }],
      referenceInputs: [],
      collateralInputs: [],
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
      mint: { [unit]: "5" },
      mintedAssets: { [unit]: "5" },
      burnedAssets: {},
      withdrawals: [],
      certificates: [],
      redeemers: [],
      requiredSigners: ["66".repeat(28)],
    },
  ],
  utxos: {
    [outputKey]: {
      txHash,
      outputIndex: 0,
      address,
      assets: { lovelace: "2000000", [unit]: "5" },
      resolution: "resolved",
      tags: ["recipient"],
    },
    [inputKey]: {
      txHash: inputHash,
      outputIndex: 0,
      address: "unresolved",
      assets: {},
      resolution: "unresolved",
      unresolvedReason: "provider-miss",
      tags: [],
    },
  },
  edges: [
    {
      kind: "mints",
      from: `tx:${txHash}`,
      to: `asset:${unit}`,
    },
    {
      kind: "produces",
      from: `tx:${txHash}`,
      to: `utxo:${outputKey}`,
    },
    {
      kind: "spends",
      from: `utxo:${inputKey}`,
      to: `tx:${txHash}`,
    },
    {
      kind: "requiresSigner",
      from: `signer:${"66".repeat(28)}`,
      to: `tx:${txHash}`,
    },
  ],
  warnings: [
    {
      code: "unresolved-spend-input",
      message: "missing input",
      txHash,
      outRef: { txHash: inputHash, outputIndex: 0 },
    },
  ],
  aliases: {
    assets: { [unit]: "USDCX" },
    addresses: { [address]: "recipient-wallet" },
  },
};

describe("renderers", () => {
  test("returns deterministic JSON with sorted record keys and edges", () => {
    const json = traceToJSON(trace);

    expect(Object.keys(json.utxos)).toEqual([inputKey, outputKey].sort());
    expect(json.edges.map(({ kind }) => kind)).toEqual([
      "requiresSigner",
      "mints",
      "produces",
      "spends",
    ]);
    expect(json.aliases.assets).toEqual({ [unit]: "USDCX" });
  });

  test("renders DOT with useful labels for transactions, assets, and unresolved inputs", () => {
    const dot = traceToDot(trace);

    expect(dot).toContain('digraph "lucid-evolution-tx-graph"');
    expect(dot).toContain("mint-and-pay");
    expect(dot).toContain("USDCX");
    expect(dot).toContain("unresolved: provider-miss");
    expect(dot).toContain('label="requires signer"');
    expect(dot).toContain('fillcolor="#fee2e2"');
  });

  test("renders Mermaid flowchart text with aliases and edge labels", () => {
    const mermaid = traceToMermaid(trace);

    expect(mermaid).toContain("flowchart LR");
    expect(mermaid).toContain("mint-and-pay<br/>status: submitted");
    expect(mermaid).toContain("USDCX");
    expect(mermaid).toContain("|spends|");
    expect(mermaid).toContain("classDef unresolved");
    expect(mermaid).not.toContain("\\<br/>");
  });
});
