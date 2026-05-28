import { describe, expect, test } from "vitest";
import type { TxGraphTrace } from "../src/model.js";
import { traceToDot } from "../src/render/dot.js";
import { traceToHtml } from "../src/render/html.js";
import { traceToJSON } from "../src/render/json.js";
import { traceToMermaid } from "../src/render/mermaid.js";
import { traceToSvg } from "../src/render/svg.js";
import {
  describeRedeemerByConstructor,
  labelRedeemer,
} from "../src/render/semantic.js";

const txHash = "aa".repeat(32);
const inputHash = "11".repeat(32);
const outputKey = `${txHash}#0`;
const inputKey = `${inputHash}#0`;
const policy = "55".repeat(28);
const unit = `${policy}01`;
const scriptHash = "77".repeat(28);
const address =
  "addr_test1qrngfyc452vy4twdrepdjc50d4kvqutgt0hs9w6j2qhcdjfx0gpv7rsrjtxv97rplyz3ymyaqdwqa635zrcdena94ljs0xy950";
const rewardAddress =
  "stake_test1urqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqg28d0";

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
      redeemers: [
        {
          tag: "spend",
          index: "0",
          redeemerListIndex: 0,
          data: "d87980",
          exUnits: { mem: "1", steps: "2" },
        },
      ],
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

const scriptTrace: TxGraphTrace = {
  ...trace,
  transactions: [
    {
      ...trace.transactions[0]!,
      label: "script-swap",
      referenceInputs: [{ txHash: "22".repeat(32), outputIndex: 1 }],
      collateralInputs: [{ txHash: "33".repeat(32), outputIndex: 2 }],
    },
  ],
  utxos: {
    ...trace.utxos,
    [inputKey]: {
      ...trace.utxos[inputKey]!,
      address,
      assets: { lovelace: "3000000", [unit]: "9" },
      resolution: "resolved",
      tags: ["script-state"],
      datumHash: "99".repeat(32),
      scriptRef: { type: "PlutusV2", hash: scriptHash, sizeBytes: 42 },
    },
    [`${"22".repeat(32)}#1`]: {
      txHash: "22".repeat(32),
      outputIndex: 1,
      address,
      assets: { lovelace: "1500000" },
      resolution: "resolved",
      tags: ["reference-script"],
      scriptRef: { type: "PlutusV2", hash: scriptHash, sizeBytes: 42 },
    },
    [`${"33".repeat(32)}#2`]: {
      txHash: "33".repeat(32),
      outputIndex: 2,
      address,
      assets: { lovelace: "5000000" },
      resolution: "resolved",
      tags: ["collateral"],
    },
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
    const dot = traceToDot(trace, {
      redeemers: [labelRedeemer({ tag: "spend", index: 0 }, "Swap")],
    });

    expect(dot).toContain('digraph "lucid-evolution-tx-graph"');
    expect(dot).toContain("<TABLE");
    expect(dot).toContain("<B>Facts</B>");
    expect(dot).toContain("mint-and-pay");
    expect(dot).toContain("USDCX");
    expect(dot).toContain("provider-miss");
    expect(dot).toContain('label="Swap"');
    expect(dot).toContain('label="requires signer"');
    expect(dot).toContain('BGCOLOR="#fee2e2"');
  });

  test("renders Mermaid flowchart text with aliases and edge labels", () => {
    const mermaid = traceToMermaid(trace, {
      redeemers: [labelRedeemer({ tag: "spend", index: 0 }, "Swap")],
    });

    expect(mermaid).toContain("flowchart LR");
    expect(mermaid).toContain("mint-and-pay<br/>");
    expect(mermaid).toContain("Facts: Fee 170000");
    expect(mermaid).toContain("USDCX");
    expect(mermaid).toContain("|Swap|");
    expect(mermaid).toContain("classDef unresolved");
    expect(mermaid).not.toContain("\\<br/>");
  });

  test("renders structured SVG with action labels, legend, and privacy controls", () => {
    const svg = traceToSvg(trace, {
      title: "Example Tx Graph",
      redeemers: [labelRedeemer({ tag: "spend", index: 0 }, "Swap")],
    });

    expect(svg).toContain("<svg");
    expect(svg).toContain("<title>Example Tx Graph</title>");
    expect(svg).toContain("mint-and-pay");
    expect(svg).toContain("Swap");
    expect(svg).toContain(">Swap</text>");
    expect(svg).toContain("Legend");
    expect(svg).toContain('marker-end="url(#txg-arrow)"');
    expect(svg).toContain("Facts");

    const hidden = traceToSvg(trace, {
      privacy: { hash: "hidden", address: "hidden" },
    });
    expect(hidden).not.toContain(txHash);
    expect(hidden).not.toContain(inputHash);
    expect(hidden).not.toContain(address);

    const auditSvg = traceToSvg(trace, {
      mode: "audit",
      redeemers: [labelRedeemer({ tag: "spend", index: 0 }, "Swap")],
    });
    expect(auditSvg).toContain("spend #0 · Swap · redeemer list #0");
  });

  test("renders valid SVG for empty traces and preserves SVG edge styles", () => {
    const emptyTrace: TxGraphTrace = {
      version: 1,
      transactions: [],
      utxos: {},
      edges: [],
      warnings: [],
      aliases: { assets: {}, addresses: {} },
    };

    const empty = traceToSvg(emptyTrace);
    expect(empty).toContain('width="940"');
    expect(empty).not.toContain("Infinity");

    const styled = traceToSvg(trace);
    expect(styled).toContain('stroke-dasharray="2 4"');
    expect(styled).toContain("Legend");
  });

  test("renders script interaction view with script-state emphasis", () => {
    const svg = traceToSvg(scriptTrace, {
      view: "scriptInteraction",
      mode: "audit",
      redeemers: [labelRedeemer({ tag: "spend", index: 0 }, "Swap")],
    });
    const dot = traceToDot(scriptTrace, { view: "scriptInteraction" });
    const mermaid = traceToMermaid(scriptTrace, { view: "scriptInteraction" });

    expect(svg).toContain("script interaction");
    expect(svg).toContain("script-state");
    expect(svg).toContain("reference-script");
    expect(svg).toContain("Datum hash");
    expect(svg).toContain("Swap");
    expect(svg).toContain('stroke-width="2.8"');
    expect(svg).toContain("Uses collateral for script validation");
    expect(svg).toContain("Requires a signer");
    expect(dot).toContain("script interaction");
    expect(dot).toContain("penwidth=2.8");
    expect(mermaid).toContain("script interaction");
    expect(mermaid).toContain("stroke-width:3px");
  });

  test("renders HTML explorer with SVG, controls, filters, and metadata", () => {
    const titledTrace: TxGraphTrace = {
      ...scriptTrace,
      transactions: [
        {
          ...scriptTrace.transactions[0]!,
          label: "A&B <swap>",
        },
      ],
    };
    const html = traceToHtml(titledTrace, {
      title: "Explorer",
      view: "scriptInteraction",
      redeemers: [labelRedeemer({ tag: "spend", index: 0 }, "Swap")],
    });

    expect(html).toContain("<!doctype html>");
    expect(html).toContain('<input id="txg-search"');
    expect(html).toContain('data-kind="spend"');
    expect(html).toContain('id="txg-details"');
    expect(html).toContain('id="txg-data"');
    expect(html).toContain("<svg");
    expect(html).toContain("Copy JSON");
    expect(html).toContain('id="txg-fit"');
    expect(html).toContain("fitToView");
    expect(html).toContain("txg-sidebar-legend");
    expect(html).toContain("A&amp;B &lt;swap&gt;");
    expect(html).toContain("Swap");
    expect(html).toContain('data-txg-id="node:');
    expect(html).toContain('data-txg-id="edge:');
    expect(html).toContain("const byId");
    expect(html).toContain('data-kind="diagnostic"');

    const privateHtml = traceToHtml(scriptTrace, {
      privacy: { hash: "hidden", address: "hidden" },
    });
    const payload = privateHtml.match(
      /<script type="application\/json" id="txg-data">([^<]+)<\/script>/,
    )?.[1];
    expect(payload).toBeDefined();
    const decodedPayload = JSON.parse(payload!);
    expect(decodedPayload.nodes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ title: "script-swap" }),
      ]),
    );
    expect(privateHtml).not.toContain(txHash);
    expect(payload).not.toContain(txHash);
    expect(payload).not.toContain(inputHash);
    expect(payload).not.toContain(address);
    expect(payload).not.toContain("rawRef");
    expect(payload).not.toContain("targetRef");
  });

  test("keeps legacy DOT and Mermaid output available", () => {
    expect(traceToDot(trace, { legacy: true })).toContain(
      'fillcolor="#fee2e2"',
    );
    expect(traceToMermaid(trace, { legacy: true })).toContain(
      "status: submitted",
    );
  });

  test("honors audit redeemer, privacy, and complexity policies", () => {
    const manySigners = ["66", "67", "68", "69"].map((prefix) =>
      prefix.repeat(28),
    );
    const largeTrace: TxGraphTrace = {
      ...trace,
      transactions: [
        {
          ...trace.transactions[0]!,
          label: undefined,
          requiredSigners: manySigners,
          withdrawals: [{ rewardAddress, amount: "1000000" }],
        },
      ],
      utxos: {
        ...trace.utxos,
        [outputKey]: {
          ...trace.utxos[outputKey]!,
          scriptRef: { type: "PlutusV2", hash: scriptHash, sizeBytes: 42 },
        },
      },
      warnings: [
        ...trace.warnings,
        { code: "warning-2", message: "second warning", txHash },
        { code: "warning-3", message: "third warning", txHash },
      ],
    };

    const audit = traceToDot(largeTrace, {
      mode: "audit",
      redeemers: [
        describeRedeemerByConstructor(
          { tag: "spend", index: 0, constructor: 0 },
          "Swap",
        ),
      ],
    });
    expect(audit).toContain("constructor: 0");

    const hidden = traceToDot(largeTrace, {
      privacy: { hash: "hidden", address: "hidden" },
    });
    expect(hidden).not.toContain(txHash);
    expect(hidden).not.toContain(outputKey);
    expect(hidden).not.toContain(address);
    expect(hidden).not.toContain(rewardAddress);
    expect(hidden).not.toContain(policy);
    expect(hidden).not.toContain(scriptHash);
    expect(hidden).not.toContain(manySigners[0]);
    expect(hidden).toContain("hidden");

    const hiddenSvg = traceToSvg(largeTrace, {
      privacy: { hash: "hidden", address: "hidden" },
    });
    expect(hiddenSvg).not.toContain(txHash);
    expect(hiddenSvg).not.toContain(outputKey);
    expect(hiddenSvg).not.toContain(address);
    expect(hiddenSvg).not.toContain(rewardAddress);
    expect(hiddenSvg).not.toContain(policy);
    expect(hiddenSvg).not.toContain(scriptHash);
    expect(hiddenSvg).not.toContain(manySigners[0]);
    expect(hiddenSvg).toContain("hidden");

    const budgeted = traceToMermaid(largeTrace, {
      budget: { maxVisibleSigners: 1, maxVisibleWarnings: 1 },
    });
    expect(budgeted).toContain("+3 signers");
    expect(budgeted).toContain("+2 diagnostics");
  });
});
