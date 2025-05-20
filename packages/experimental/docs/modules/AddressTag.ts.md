---
title: AddressTag.ts
nav_order: 3
parent: Modules
---

## AddressTag overview

---

<h2 class="text-delta">Table of contents</h2>

- [model](#model)
  - [AddressTag (type alias)](#addresstag-type-alias)
  - [AddressTagError (class)](#addresstagerror-class)
- [transformation](#transformation)
  - [fromBech32](#frombech32)
  - [fromHeader](#fromheader)

---

# model

## AddressTag (type alias)

Address header kind - used to determine the type of address from its header
Following CIP-0019 address types

**Signature**

```ts
export type AddressTag = "Base" | "Enterprise" | "Pointer" | "Reward" | "Byron"
```

Added in v2.0.0

## AddressTagError (class)

**Signature**

```ts
export declare class AddressTagError
```

Added in v2.0.0

# transformation

## fromBech32

Get address kind from address string

**Signature**

```ts
export declare const fromBech32: (bech32Address: string) => Effect.Effect<AddressTag, Bech32.Bech32Error>
```

**Example**

```ts
import { AddressTag } from "@lucid-evolution/experimental"
import { Effect } from "effect"
import assert from "assert"

const effect = AddressTag.fromBech32(
  "addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x"
)
const tag = Effect.runSync(effect)
assert(tag === "Base")
```

Added in v2.0.0

## fromHeader

Get address tag from header byte
Shifts the header byte to the right by 4 bits to isolate the address type

**Signature**

```ts
export declare const fromHeader: (header: number) => AddressTag
```

**Example**

```ts
import { AddressTag } from "@lucid-evolution/experimental"
import assert from "assert"

const tag = AddressTag.fromHeader(0)
assert(tag === "Base")
```

Added in v2.0.0
