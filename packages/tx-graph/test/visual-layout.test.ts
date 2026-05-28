import { describe, expect, test } from "vitest";
import type { TxGraphTrace } from "../src/model.js";
import { traceToSvg } from "../src/render/svg.js";
import { labelRedeemer } from "../src/render/semantic.js";

const walletAddress =
  "addr_test1qz6z4qwm5tnuvl0x4qjvglvwp6e8yxs46sndzwrhkqn4j85he9ayv2g8qzysr6yvvdwncqusrqq";
const scriptAddress =
  "addr_test1wrp504y55m5aa33scfr607h3h5qj8t8x73d9ukzhjkv026c4q7z0l";
const rewardAddress =
  "stake_test17rp504y55m5aa33scfr607h3h5qj8t8x73d9ukzhjkv026s99mv";

const setupHash = "aa".repeat(32);
const complexHash = "bb".repeat(32);
const walletSeedHash = "11".repeat(32);
const policyStress = "55".repeat(28);
const policyNative = "66".repeat(28);
const signer = "77".repeat(28);

const unit = (policy: string, name: string) =>
  `${policy}${Buffer.from(name).toString("hex")}`;

const markerA = unit(policyNative, "CtxMarkerA");
const markerB = unit(policyNative, "CtxMarkerB");
const markerC = unit(policyNative, "CtxMarkerC");
const stressA = unit(policyStress, "CtxStressA");
const stressB = unit(policyStress, "CtxStressB");
const stressC = unit(policyStress, "CtxStressC");
const nativeA = unit(policyNative, "CtxNativeA");
const nativeB = unit(policyNative, "CtxNativeB");

const outRef = (txHash: string, outputIndex: number) =>
  `${txHash}#${outputIndex}`;

const buildTxWithComplexTrace: TxGraphTrace = {
  version: 1,
  transactions: [
    {
      hash: setupHash,
      label: "BuildTxWithComplex setup",
      status: "submitted",
      cbor: "84",
      sizeBytes: 1100,
      fee: "210000",
      validityInterval: { validTo: "123456" },
      inputs: [{ txHash: walletSeedHash, outputIndex: 0 }],
      referenceInputs: [],
      collateralInputs: [],
      outputs: [
        {
          txHash: setupHash,
          outputIndex: 0,
          address: scriptAddress,
          assets: { lovelace: "10000000", [markerA]: "1" },
          datum: "d87980",
          resolution: "resolved",
          tags: ["stress input A"],
        },
        {
          txHash: setupHash,
          outputIndex: 1,
          address: scriptAddress,
          assets: { lovelace: "11000000", [markerB]: "1" },
          datum: "d87980",
          resolution: "resolved",
          tags: ["stress input B"],
        },
        {
          txHash: setupHash,
          outputIndex: 2,
          address: scriptAddress,
          assets: { lovelace: "12000000", [markerC]: "1" },
          datum: "d87980",
          resolution: "resolved",
          tags: ["stress input C"],
        },
        {
          txHash: setupHash,
          outputIndex: 3,
          address: walletAddress,
          assets: { lovelace: "15000000" },
          datum: "d87980",
          scriptRef: {
            type: "PlutusV3",
            hash: policyStress,
            sizeBytes: 6400,
          },
          resolution: "resolved",
          tags: ["reference script"],
        },
      ],
      mint: { [markerA]: "1", [markerB]: "1", [markerC]: "1" },
      mintedAssets: { [markerA]: "1", [markerB]: "1", [markerC]: "1" },
      burnedAssets: {},
      withdrawals: [],
      certificates: [],
      redeemers: [],
      requiredSigners: [signer],
    },
    {
      hash: complexHash,
      label: "BuildTxWithComplex",
      status: "failed",
      failureMessage: "WithdrawalsNotInRewardsCERTS",
      cbor: "84",
      sizeBytes: 14000,
      fee: "920000",
      validityInterval: { validTo: "123999" },
      inputs: [
        { txHash: setupHash, outputIndex: 0 },
        { txHash: setupHash, outputIndex: 1 },
        { txHash: setupHash, outputIndex: 2 },
      ],
      referenceInputs: [{ txHash: setupHash, outputIndex: 3 }],
      collateralInputs: [],
      outputs: [
        {
          txHash: complexHash,
          outputIndex: 0,
          address: scriptAddress,
          assets: { lovelace: "2500000" },
          datum: "d87980",
          resolution: "resolved",
          tags: ["next script state"],
        },
        {
          txHash: complexHash,
          outputIndex: 1,
          address: scriptAddress,
          assets: { lovelace: "2600000" },
          datum: "d87980",
          resolution: "resolved",
          tags: ["next script state"],
        },
        {
          txHash: complexHash,
          outputIndex: 2,
          address: scriptAddress,
          assets: { lovelace: "2700000" },
          datum: "d87980",
          resolution: "resolved",
          tags: ["next script state"],
        },
        {
          txHash: complexHash,
          outputIndex: 3,
          address: walletAddress,
          assets: { lovelace: "3000000", [stressA]: "1", [nativeA]: "1" },
          resolution: "resolved",
          tags: ["wallet result"],
        },
        {
          txHash: complexHash,
          outputIndex: 4,
          address: walletAddress,
          assets: {
            lovelace: "3000000",
            [stressB]: "2",
            [stressC]: "3",
            [nativeB]: "1",
          },
          resolution: "resolved",
          tags: ["wallet result"],
        },
      ],
      mint: {
        [stressA]: "1",
        [stressB]: "2",
        [stressC]: "3",
        [nativeA]: "1",
        [nativeB]: "1",
      },
      mintedAssets: {
        [stressA]: "1",
        [stressB]: "2",
        [stressC]: "3",
        [nativeA]: "1",
        [nativeB]: "1",
      },
      burnedAssets: {},
      withdrawals: [{ rewardAddress, amount: "100000000" }],
      certificates: [],
      redeemers: [
        {
          tag: "spend",
          index: "0",
          redeemerListIndex: 0,
          data: "d8799f80ff",
          exUnits: { mem: "100", steps: "200" },
        },
        {
          tag: "spend",
          index: "1",
          redeemerListIndex: 1,
          data: "d8799f80ff",
          exUnits: { mem: "101", steps: "201" },
        },
        {
          tag: "spend",
          index: "2",
          redeemerListIndex: 2,
          data: "d8799f80ff",
          exUnits: { mem: "102", steps: "202" },
        },
        {
          tag: "mint",
          index: "0",
          redeemerListIndex: 3,
          data: "d8799f80ff",
          exUnits: { mem: "103", steps: "203" },
        },
        {
          tag: "withdraw",
          index: "0",
          redeemerListIndex: 4,
          data: "d8799f80ff",
          exUnits: { mem: "104", steps: "204" },
        },
      ],
      requiredSigners: [signer],
    },
  ],
  utxos: {
    [outRef(walletSeedHash, 0)]: {
      txHash: walletSeedHash,
      outputIndex: 0,
      address: walletAddress,
      assets: { lovelace: "75000000000" },
      resolution: "genesis",
      tags: ["wallet seed"],
    },
  },
  edges: [
    {
      kind: "spends",
      from: `utxo:${outRef(walletSeedHash, 0)}`,
      to: `tx:${setupHash}`,
    },
    ...[0, 1, 2, 3].map((index) => ({
      kind: "produces" as const,
      from: `tx:${setupHash}`,
      to: `utxo:${outRef(setupHash, index)}`,
    })),
    ...[0, 1, 2].map((index) => ({
      kind: "spends" as const,
      from: `utxo:${outRef(setupHash, index)}`,
      to: `tx:${complexHash}`,
    })),
    {
      kind: "reads",
      from: `utxo:${outRef(setupHash, 3)}`,
      to: `tx:${complexHash}`,
    },
    ...[0, 1, 2, 3, 4].map((index) => ({
      kind: "produces" as const,
      from: `tx:${complexHash}`,
      to: `utxo:${outRef(complexHash, index)}`,
    })),
    { kind: "mints", from: `tx:${setupHash}`, to: `asset:${markerA}` },
    { kind: "mints", from: `tx:${complexHash}`, to: `asset:${stressA}` },
    { kind: "mints", from: `tx:${complexHash}`, to: `asset:${nativeA}` },
    {
      kind: "withdraws",
      from: `withdrawal:${rewardAddress}`,
      to: `tx:${complexHash}`,
    },
    { kind: "requiresSigner", from: `signer:${signer}`, to: `tx:${setupHash}` },
    {
      kind: "requiresSigner",
      from: `signer:${signer}`,
      to: `tx:${complexHash}`,
    },
  ],
  warnings: [
    {
      code: "failed-transaction",
      message: "WithdrawalsNotInRewardsCERTS",
      txHash: complexHash,
    },
  ],
  aliases: {
    addresses: {
      [walletAddress]: "wallet",
      [scriptAddress]: "stress validator",
      [rewardAddress]: "stress reward",
    },
    assets: {
      [markerA]: "CtxMarkerA",
      [markerB]: "CtxMarkerB",
      [markerC]: "CtxMarkerC",
      [stressA]: "CtxStressA",
      [stressB]: "CtxStressB",
      [stressC]: "CtxStressC",
      [nativeA]: "CtxNativeA",
      [nativeB]: "CtxNativeB",
    },
  },
};

for (const transaction of buildTxWithComplexTrace.transactions) {
  for (const output of transaction.outputs) {
    buildTxWithComplexTrace.utxos[outRef(output.txHash, output.outputIndex)] =
      output;
  }
}

type Rect = {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
};

describe("SVG visual layout", () => {
  test("renders BuildTxWithComplex without serious node or label collisions", () => {
    const svg = traceToSvg(buildTxWithComplexTrace, {
      mode: "audit",
      view: "scriptInteraction",
      redeemers: [
        labelRedeemer({ tag: "spend", index: 0 }, "Validate stress input"),
        labelRedeemer({ tag: "spend", index: 1 }, "Validate stress input"),
        labelRedeemer({ tag: "spend", index: 2 }, "Validate stress input"),
        labelRedeemer({ tag: "mint", index: 0 }, "Mint stress assets"),
        labelRedeemer({ tag: "withdraw", index: 0 }, "Withdraw reward"),
      ],
    });

    expect(svg).toContain("<svg");
    expect(svg).toContain('class="txg-node txg-transaction"');
    expect(svg).toContain('class="txg-edge txg-read"');
    expect(svg).toContain("Validate stress input");
    expect(svg).not.toContain(">resolved</text>");

    const viewBox = parseViewBox(svg);
    const nodes = parseNodeRects(svg);
    const labels = parseEdgeLabelRects(svg);
    expect(nodes.length).toBeGreaterThan(10);
    expect(labels.length).toBeGreaterThan(0);

    expect(findOverlaps(nodes, nodes, 2)).toEqual([]);
    expect(findOverlaps(labels, nodes, 2)).toEqual([]);
    expect(findOverlaps(labels, labels, 1)).toEqual([]);
    expect([...nodes, ...labels].every((box) => within(box, viewBox))).toBe(
      true,
    );
    const mintDirections = parseEdgeXDirection(svg, "mint");
    expect(mintDirections.length).toBeGreaterThan(0);
    expect(mintDirections.every(({ startX, endX }) => endX > startX)).toBe(
      true,
    );
  });

  test("reserves enough node height for wrapped chips", () => {
    const taggedTrace: TxGraphTrace = {
      ...buildTxWithComplexTrace,
      utxos: {
        ...buildTxWithComplexTrace.utxos,
        [outRef(walletSeedHash, 0)]: {
          ...buildTxWithComplexTrace.utxos[outRef(walletSeedHash, 0)]!,
          tags: [
            "long semantic label alpha",
            "long semantic label beta",
            "long semantic label gamma",
            "long semantic label delta",
          ],
        },
      },
    };
    const svg = traceToSvg(taggedTrace, {
      mode: "audit",
      view: "scriptInteraction",
    });

    const nodes = parseNodeRects(svg);
    expect(findOverlaps(nodes, nodes, 2)).toEqual([]);
    expect(svg).toContain("long semantic label alpha");
  });
});

const parseViewBox = (svg: string): Rect => {
  const match = svg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
  if (!match) throw new Error("Missing viewBox");
  return { x: 0, y: 0, width: Number(match[1]), height: Number(match[2]) };
};

const parseNodeRects = (svg: string): Rect[] =>
  [
    ...svg.matchAll(
      /<g[^>]*class="txg-node[^"]*"[\s\S]*?<rect x="([^"]+)" y="([^"]+)" width="([^"]+)" height="([^"]+)" rx="8"/g,
    ),
  ].map(rectFromMatch);

const parseEdgeLabelRects = (svg: string): Rect[] =>
  [
    ...svg.matchAll(
      /<rect class="txg-edge-label" x="([^"]+)" y="([^"]+)" width="([^"]+)" height="([^"]+)"/g,
    ),
  ].map(rectFromMatch);

const parseEdgeXDirection = (
  svg: string,
  kind: string,
): { readonly startX: number; readonly endX: number }[] =>
  [
    ...svg.matchAll(
      new RegExp(
        `<g[^>]*class="txg-edge txg-${kind}"[\\s\\S]*?<path class="txg-edge-hit" d="M ([\\d.]+) [\\d.]+ [CL][^"]* L ([\\d.]+) [\\d.]+"`,
        "g",
      ),
    ),
  ].map((match) => ({
    startX: Number(match[1]),
    endX: Number(match[2]),
  }));

const rectFromMatch = (match: RegExpMatchArray): Rect => ({
  x: Number(match[1]),
  y: Number(match[2]),
  width: Number(match[3]),
  height: Number(match[4]),
});

const findOverlaps = (
  left: ReadonlyArray<Rect>,
  right: ReadonlyArray<Rect>,
  tolerance: number,
): string[] => {
  const overlaps: string[] = [];
  for (let leftIndex = 0; leftIndex < left.length; leftIndex++) {
    for (let rightIndex = 0; rightIndex < right.length; rightIndex++) {
      if (left === right && rightIndex <= leftIndex) continue;
      if (intersects(left[leftIndex]!, right[rightIndex]!, tolerance)) {
        overlaps.push(`${leftIndex}:${rightIndex}`);
      }
    }
  }
  return overlaps;
};

const intersects = (left: Rect, right: Rect, tolerance: number): boolean =>
  left.x + tolerance < right.x + right.width &&
  left.x + left.width > right.x + tolerance &&
  left.y + tolerance < right.y + right.height &&
  left.y + left.height > right.y + tolerance;

const within = (box: Rect, bounds: Rect): boolean =>
  box.x >= bounds.x &&
  box.y >= bounds.y &&
  box.x + box.width <= bounds.x + bounds.width &&
  box.y + box.height <= bounds.y + bounds.height;
