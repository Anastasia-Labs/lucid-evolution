---
title: EnterpriseAddress.ts
nav_order: 296
parent: Modules
---

## EnterpriseAddress overview

---

<h2 class="text-delta">Table of contents</h2>

- [equality](#equality)
  - [equals](#equals)
- [generators](#generators)
  - [generator](#generator)
- [schemas](#schemas)
  - [EnterpriseAddress (class)](#enterpriseaddress-class)
    - [[Inspectable.NodeInspectSymbol] (method)](#inspectablenodeinspectsymbol-method)
- [utils](#utils)
  - [Bytes](#bytes)
  - [EnterpriseAddress (interface)](#enterpriseaddress-interface)
  - [HexString](#hexstring)

---

# equality

## equals

Check if two EnterpriseAddress instances are equal.

**Signature**

```ts
export declare const equals: (
  a: EnterpriseAddress,
  b: EnterpriseAddress,
) => boolean;
```

Added in v2.0.0

# generators

## generator

Generate a random EnterpriseAddress.

**Signature**

```ts
export declare const generator: FastCheck.Arbitrary<EnterpriseAddress>;
```

**Example**

```ts
import { EnterpriseAddress } from "@evolution-sdk/experimental";
import { FastCheck } from "effect";
import assert from "assert";

const randomSamples = FastCheck.sample(EnterpriseAddress.generator, 20);
randomSamples.forEach((address) => {
  assert(address._tag === "EnterpriseAddress");
  assert(typeof address.networkId === "number");
});
```

Added in v2.0.0

# schemas

## EnterpriseAddress (class)

Enterprise address with only payment credential

**Signature**

```ts
export declare class EnterpriseAddress
```

Added in v2.0.0

### [Inspectable.NodeInspectSymbol] (method)

**Signature**

```ts
[Inspectable.NodeInspectSymbol]();
```

# utils

## Bytes

**Signature**

```ts
export declare const Bytes: Schema.transformOrFail<
  typeof Schema.Uint8ArrayFromSelf,
  typeof EnterpriseAddress,
  never
>;
```

## EnterpriseAddress (interface)

**Signature**

```ts
export interface EnterpriseAddress {
  readonly [NominalType]: unique symbol;
}
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
  typeof EnterpriseAddress,
  never
>;
```
