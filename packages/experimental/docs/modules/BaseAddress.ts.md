---
title: BaseAddress.ts
nav_order: 4
parent: Modules
---

## BaseAddress overview

---

<h2 class="text-delta">Table of contents</h2>

- [equality](#equality)
  - [equals](#equals)
- [generators](#generators)
  - [generator](#generator)
- [schemas](#schemas)
  - [BaseAddress (class)](#baseaddress-class)
    - [[Inspectable.NodeInspectSymbol] (method)](#inspectablenodeinspectsymbol-method)
- [utils](#utils)
  - [BaseAddress (interface)](#baseaddress-interface)
  - [Bytes](#bytes)
  - [HexString](#hexstring)

---

# equality

## equals

Check if two BaseAddress instances are equal.

**Signature**

```ts
export declare const equals: (a: BaseAddress, b: BaseAddress) => boolean;
```

Added in v2.0.0

# generators

## generator

Generate a random BaseAddress.

**Signature**

```ts
export declare const generator: FastCheck.Arbitrary<BaseAddress>;
```

**Example**

```ts
import { BaseAddress } from "@evolution-sdk/experimental";
import { FastCheck } from "effect";
import assert from "assert";

const randomSamples = FastCheck.sample(BaseAddress.generator, 20);
randomSamples.forEach((address) => {
  assert(address._tag === "BaseAddress");
  assert(typeof address.networkId === "number");
});
```

Added in v2.0.0

# schemas

## BaseAddress (class)

Base address with both payment and staking credentials

**Signature**

```ts
export declare class BaseAddress
```

Added in v2.0.0

### [Inspectable.NodeInspectSymbol] (method)

**Signature**

```ts
[Inspectable.NodeInspectSymbol]();
```

# utils

## BaseAddress (interface)

**Signature**

```ts
export interface BaseAddress {
  readonly [NominalType]: unique symbol;
}
```

## Bytes

**Signature**

```ts
export declare const Bytes: Schema.transformOrFail<
  typeof Schema.Uint8ArrayFromSelf,
  typeof BaseAddress,
  never
>;
```

## HexString

**Signature**

```ts
export declare const HexString: Schema.transformOrFail<
  Schema.SchemaClass<
    string & Brand<"HexString">,
    string & Brand<"HexString">,
    never
  >,
  typeof BaseAddress,
  never
>;
```
