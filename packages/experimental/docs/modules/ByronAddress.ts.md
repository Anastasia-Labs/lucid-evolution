---
title: ByronAddress.ts
nav_order: 6
parent: Modules
---

## ByronAddress overview

---

<h2 class="text-delta">Table of contents</h2>

- [schemas](#schemas)
  - [ByronAddress (class)](#byronaddress-class)
    - [[Inspectable.NodeInspectSymbol] (method)](#inspectablenodeinspectsymbol-method)
- [utils](#utils)
  - [ByronAddress (interface)](#byronaddress-interface)
  - [fromBytes](#frombytes)

---

# schemas

## ByronAddress (class)

Byron legacy address format

**Signature**

```ts
export declare class ByronAddress
```

Added in v2.0.0

### [Inspectable.NodeInspectSymbol] (method)

**Signature**

```ts
[Inspectable.NodeInspectSymbol]();
```

# utils

## ByronAddress (interface)

**Signature**

```ts
export interface ByronAddress {
  readonly [NominalType]: unique symbol;
}
```

## fromBytes

Byron legacy address has limited support

**Signature**

```ts
export declare const fromBytes: (bytes: Uint8Array) => ByronAddress;
```

Added in v2.0.0
