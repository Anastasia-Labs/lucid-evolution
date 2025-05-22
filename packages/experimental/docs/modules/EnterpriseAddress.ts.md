---
title: EnterpriseAddress.ts
nav_order: 296
parent: Modules
---

## EnterpriseAddress overview

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [makeOrThrow](#makeorthrow)
- [equality](#equality)
  - [equals](#equals)
- [generators](#generators)
  - [generator](#generator)
- [schemas](#schemas)
  - [EnterpriseAddress (class)](#enterpriseaddress-class)
    - [[Inspectable.NodeInspectSymbol] (method)](#inspectablenodeinspectsymbol-method)
- [utils](#utils)
  - [EnterpriseAddress (interface)](#enterpriseaddress-interface)
  - [fromBytes](#frombytes)
  - [toBytes](#tobytes)

---

# constructors

## makeOrThrow

Create an EnterpriseAddress from network ID and payment credential, throws on error.

**Signature**

```ts
export declare const makeOrThrow: (
  networkId: number,
  paymentCredential: Credential.Credential,
) => EnterpriseAddress;
```

**Example**

```ts
import { EnterpriseAddress, KeyHash } from "@lucid-evolution/experimental";
import assert from "assert";

// Create payment credential
const paymentKeyHash = KeyHash.makeOrThrow(
  "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f",
);

// Create enterprise address
const address = EnterpriseAddress.makeOrThrow(0, paymentKeyHash);
assert(address._tag === "EnterpriseAddress");
assert(address.networkId === 0);
```

Added in v2.0.0

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

**Example**

```ts
import { EnterpriseAddress, KeyHash } from "@lucid-evolution/experimental";
import assert from "assert";

// Create credential
const paymentKeyHash = KeyHash.makeOrThrow(
  "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f",
);

// Create two identical addresses
const address1 = EnterpriseAddress.makeOrThrow(0, paymentKeyHash);
const address2 = EnterpriseAddress.makeOrThrow(0, paymentKeyHash);
const address3 = EnterpriseAddress.makeOrThrow(1, paymentKeyHash);

assert(EnterpriseAddress.equals(address1, address2) === true);
assert(EnterpriseAddress.equals(address1, address3) === false);
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
import { EnterpriseAddress } from "@lucid-evolution/experimental";
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

## EnterpriseAddress (interface)

**Signature**

```ts
export interface EnterpriseAddress {
  readonly [NominalType]: unique symbol;
}
```

## fromBytes

**Signature**

```ts
export declare const fromBytes: (
  bytes: Uint8Array,
) => Effect.Effect<
  EnterpriseAddress,
  [
    | YieldWrap<Effect.Effect<KeyHash.KeyHash, KeyHash.KeyHashError, never>>
    | YieldWrap<
        Effect.Effect<ScriptHash.ScriptHash, ScriptHash.ScriptHashError, never>
      >,
  ] extends [never]
    ? never
    : [
          | YieldWrap<
              Effect.Effect<KeyHash.KeyHash, KeyHash.KeyHashError, never>
            >
          | YieldWrap<
              Effect.Effect<
                ScriptHash.ScriptHash,
                ScriptHash.ScriptHashError,
                never
              >
            >,
        ] extends [YieldWrap<Effect.Effect<infer _A, infer E, infer _R>>]
      ? E
      : never,
  [
    | YieldWrap<Effect.Effect<KeyHash.KeyHash, KeyHash.KeyHashError, never>>
    | YieldWrap<
        Effect.Effect<ScriptHash.ScriptHash, ScriptHash.ScriptHashError, never>
      >,
  ] extends [never]
    ? never
    : [
          | YieldWrap<
              Effect.Effect<KeyHash.KeyHash, KeyHash.KeyHashError, never>
            >
          | YieldWrap<
              Effect.Effect<
                ScriptHash.ScriptHash,
                ScriptHash.ScriptHashError,
                never
              >
            >,
        ] extends [YieldWrap<Effect.Effect<infer _A, infer _E, infer R>>]
      ? R
      : never
>;
```

## toBytes

**Signature**

```ts
export declare const toBytes: (address: EnterpriseAddress) => Uint8Array;
```
