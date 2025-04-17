---
title: Header.ts
nav_order: 297
parent: Modules
---

## Header overview

---

<h2 class="text-delta">Table of contents</h2>

- [transformation](#transformation)
  - [fromBech32](#frombech32)

---

# transformation

## fromBech32

Parse header from address

**Signature**

```ts
export declare const fromBech32: (
  bech32Address: string,
) => Effect.Effect<number, Bech32.Bech32Error>;
```

**Example**

```ts
import { Header } from "@lucid-evolution/experimental";
import { Effect } from "effect";
import assert from "assert";

const effect = Header.fromBech32(
  "addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x",
);
const header = Effect.runSync(effect);
assert(typeof header === "number");
assert(header === 0 || header === 1); // typically 0 for testnet, 1 for mainnet
```

Added in v2.0.0
