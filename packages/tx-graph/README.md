# @lucid-evolution/tx-graph

Transaction graph tracing and rendering utilities for Lucid Evolution.

The package records offchain transaction-building scenarios as an auditable UTxO graph. It can render the same trace as JSON, DOT, Mermaid, SVG, or a self-contained HTML explorer.

## What It Shows

- Which UTxOs were spent, referenced, used as collateral, or produced.
- Which reference-script and datum-bearing UTxOs participated in a transaction.
- Where minted and burned assets attach to the transaction flow.
- Which signer, withdrawal, and certificate relationships were required.
- Which redeemer maps to each spend, mint, withdrawal, or certificate edge.
- Which warnings affect the trustworthiness of the graph.

The graph is intentionally ledger-first. It does not guess project-specific actions such as `Swap`, `Lock`, or `UnitVal` from opaque redeemer CBOR. Add those labels with explicit redeemer describers.

## Basic Usage

```ts
import { createTxGraph, labelRedeemer } from "@lucid-evolution/tx-graph";

const graph = createTxGraph({
  assets: { lovelace: "ADA" },
  addresses: { [walletAddress]: "wallet" },
});

await graph.record(tx, { label: "swap and settle", status: "submitted" });

const svg = graph.toSvg({
  redeemers: [labelRedeemer({ tag: "spend", index: 0 }, "Swap")],
});
const html = graph.toHtml({
  view: "scriptInteraction",
  mode: "audit",
  redeemers: [labelRedeemer({ tag: "spend", index: 0 }, "Swap")],
});
```

## Renderers

- `graph.toJSON()` returns the canonical trace.
- `graph.toSemantic()` returns the renderer-neutral visual graph contract.
- `graph.toDot()` returns GraphViz DOT with structured HTML-like labels.
- `graph.toMermaid()` returns Mermaid flowchart text.
- `graph.toSvg()` returns a deterministic static SVG artifact.
- `graph.toHtml()` returns a self-contained explorer with SVG, search, edge filters, details, and copyable metadata.

`traceToDot`, `traceToMermaid`, `traceToSvg`, and `traceToHtml` are also exported for rendering saved traces.

## Actions And Redeemers

Use explicit describers to make redeemer intent visible:

```ts
import {
  describeRedeemerByConstructor,
  describeRedeemerWith,
  labelRedeemer,
} from "@lucid-evolution/tx-graph";

const redeemers = [
  labelRedeemer({ tag: "spend", index: 0 }, "Swap", "swap"),
  describeRedeemerByConstructor(
    { tag: "mint", index: 0, constructor: 0 },
    "MintReward",
  ),
  describeRedeemerWith(({ redeemer, target }) =>
    redeemer.tag === "publish" && target.type === "certificate"
      ? { label: "PublishStake", source: "schema", confidence: "high" }
      : undefined,
  ),
];
```

Every action records whether it came from `user`, `schema`, `constructor`, or `generic` fallback metadata.

## Modes, Views, And Privacy

Modes control detail level:

- `overview`: compact labels, action names, low raw-data exposure.
- `audit`: redeemer indices, ex units, constructor fields, more rows.
- `debug`: fuller raw values where privacy settings allow them.

Views control emphasis:

- `flow`: normal transaction flow.
- `scriptInteraction`: emphasizes script UTxOs, reference reads, collateral, redeemers, and script-touching asset movement.

Privacy can hide or shorten hashes, addresses, datums, redeemers, and CBOR. HTML metadata is privacy-safe by default. Set `includeRawMetadata: true` only for local/private artifacts where raw refs should be copyable from the details drawer.

## Example

Generate SVG and HTML artifacts from the deterministic example trace:

```sh
TMPDIR=/tmp pnpm --dir packages/tx-graph exec tsx examples/render-scenario.ts ../../temp/tx-graph-example
```

This writes:

- `temp/tx-graph-example/scenario.svg`
- `temp/tx-graph-example/scenario.html`
- `temp/tx-graph-example/scenario.dot`
- `temp/tx-graph-example/scenario.mmd`

The example intentionally uses a synthetic trace. In an emulator or provider flow, build the trace with `createTxGraph`, `graph.record(...)`, and optionally `graph.wrapProvider(...)`, then call the same render methods.
