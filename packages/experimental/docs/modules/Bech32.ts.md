---
title: Bech32.ts
nav_order: 5
parent: Modules
---

## Bech32 overview

---

<h2 class="text-delta">Table of contents</h2>

- [model](#model)
  - [Bech32Error (class)](#bech32error-class)
- [utils](#utils)
  - [Bech32](#bech32)
  - [Bech32 (type alias)](#bech32-type-alias)
  - [Bytes](#bytes)

---

# model

## Bech32Error (class)

**Signature**

```ts
export declare class Bech32Error
```

Added in v2.0.0

# utils

## Bech32

**Signature**

```ts
export declare const Bech32: Schema.brand<typeof Schema.String, "Bech32">
```

## Bech32 (type alias)

**Signature**

```ts
export type Bech32 = typeof Bech32.Type
```

## Bytes

**Signature**

```ts
export declare const Bytes: (
  prefix?: string
) => Schema.transformOrFail<typeof Schema.Uint8ArrayFromSelf, Schema.brand<typeof Schema.String, "Bech32">, never>
```
