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

---

# model

## AddressTag (type alias)

Address header kind - used to determine the type of address from its header
Following CIP-0019 address types

**Signature**

```ts
export type AddressTag = "Base" | "Enterprise" | "Pointer" | "Reward" | "Byron";
```

Added in v2.0.0

## AddressTagError (class)

**Signature**

```ts
export declare class AddressTagError
```

Added in v2.0.0
