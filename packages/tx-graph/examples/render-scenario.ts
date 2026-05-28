import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import {
  labelRedeemer,
  traceToDot,
  traceToHtml,
  traceToMermaid,
  traceToSvg,
  type TxGraphTrace,
} from "../src/index.js";

const txHash = "aa".repeat(32);
const scriptInputHash = "11".repeat(32);
const referenceHash = "22".repeat(32);
const collateralHash = "33".repeat(32);
const policy = "55".repeat(28);
const unit = `${policy}01`;
const address =
  "addr_test1qrngfyc452vy4twdrepdjc50d4kvqutgt0hs9w6j2qhcdjfx0gpv7rsrplyz3ymyaqdwqa635zrcdena94ljs0xy950";
const scriptHash = "77".repeat(28);

const trace: TxGraphTrace = {
  version: 1,
  transactions: [
    {
      hash: txHash,
      label: "script swap",
      status: "submitted",
      cbor: "84",
      sizeBytes: 512,
      fee: "180000",
      validityInterval: {},
      inputs: [{ txHash: scriptInputHash, outputIndex: 0 }],
      referenceInputs: [{ txHash: referenceHash, outputIndex: 1 }],
      collateralInputs: [{ txHash: collateralHash, outputIndex: 2 }],
      outputs: [
        {
          txHash,
          outputIndex: 0,
          address,
          assets: { lovelace: "2500000", [unit]: "5" },
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
          exUnits: { mem: "1000000", steps: "250000000" },
        },
      ],
      requiredSigners: ["66".repeat(28)],
    },
  ],
  utxos: {
    [`${scriptInputHash}#0`]: {
      txHash: scriptInputHash,
      outputIndex: 0,
      address,
      assets: { lovelace: "3000000", [unit]: "9" },
      resolution: "resolved",
      tags: ["script-state"],
      datumHash: "99".repeat(32),
      scriptRef: { type: "PlutusV2", hash: scriptHash, sizeBytes: 42 },
    },
    [`${referenceHash}#1`]: {
      txHash: referenceHash,
      outputIndex: 1,
      address,
      assets: { lovelace: "1500000" },
      resolution: "resolved",
      tags: ["reference-script"],
      scriptRef: { type: "PlutusV2", hash: scriptHash, sizeBytes: 42 },
    },
    [`${collateralHash}#2`]: {
      txHash: collateralHash,
      outputIndex: 2,
      address,
      assets: { lovelace: "5000000" },
      resolution: "resolved",
      tags: ["collateral"],
    },
    [`${txHash}#0`]: {
      txHash,
      outputIndex: 0,
      address,
      assets: { lovelace: "2500000", [unit]: "5" },
      resolution: "resolved",
      tags: ["recipient"],
    },
  },
  edges: [],
  warnings: [],
  aliases: {
    assets: { [unit]: "TOKEN" },
    addresses: { [address]: "wallet" },
  },
};

const outDir = process.argv[2] ?? "temp/tx-graph-example";
const redeemers = [labelRedeemer({ tag: "spend", index: 0 }, "Swap", "swap")];
const renderOptions = {
  view: "scriptInteraction" as const,
  mode: "audit" as const,
  redeemers,
  title: "Tx Graph Script Interaction Example",
};

await mkdir(outDir, { recursive: true });
await Promise.all([
  writeFile(join(outDir, "scenario.svg"), traceToSvg(trace, renderOptions)),
  writeFile(join(outDir, "scenario.html"), traceToHtml(trace, renderOptions)),
  writeFile(join(outDir, "scenario.dot"), traceToDot(trace, renderOptions)),
  writeFile(join(outDir, "scenario.mmd"), traceToMermaid(trace, renderOptions)),
]);

console.log(`Wrote tx graph artifacts to ${outDir}`);
