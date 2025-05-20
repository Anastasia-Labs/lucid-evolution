---
title: Bech32.ts
nav_order: 5
parent: Modules
---

## Bech32 overview

---

<h2 class="text-delta">Table of contents</h2>

- [encoding/decoding](#encodingdecoding)
  - [toBytes](#tobytes)
- [model](#model)
  - [Bech32Error (class)](#bech32error-class)

---

# encoding/decoding

## toBytes

Get raw bytes from address string (either format)

**Signature**

```ts
export declare const toBytes: (bech32Address: string) => Effect.Effect<Uint8Array, Bech32Error>
```

**Example**

```ts
import { Bech32 } from "@lucid-evolution/experimental"
import { Effect } from "effect"
import assert from "assert"

const effect = Bech32.toBytes(
  "addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x"
)
const bytes = Effect.runSync(effect)
assert(bytes instanceof Uint8Array)
assert(bytes.length > 0)
```

Added in v2.0.0

# model

## Bech32Error (class)

**Signature**

```ts
export declare class Bech32Error
```

Added in v2.0.0
