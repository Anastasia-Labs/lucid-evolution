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
- [utils](#utils)
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

# utils

## fromBytes

Byron legacy address has limited support

**Signature**

```ts
export declare const fromBytes: (bytes: Uint8Array) => ByronAddress;
```

Added in v2.0.0
