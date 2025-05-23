---
title: BaseAddress.ts
nav_order: 4
parent: Modules
---

## BaseAddress overview

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [fromBytes](#frombytes)
  - [makeOrThrow](#makeorthrow)
- [equality](#equality)
  - [equals](#equals)
- [generators](#generators)
  - [generator](#generator)
- [schemas](#schemas)
  - [BaseAddress (class)](#baseaddress-class)
    - [[Inspectable.NodeInspectSymbol] (method)](#inspectablenodeinspectsymbol-method)
- [transformation](#transformation)
  - [toBytes](#tobytes)
- [utils](#utils)
  - [BaseAddress (interface)](#baseaddress-interface)

---

# constructors

## fromBytes

Create a BaseAddress from bytes.

**Signature**

```ts
export declare const fromBytes: (
  bytes: Uint8Array,
) => Effect.Effect<
  BaseAddress,
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

**Example**

```ts
import { BaseAddress, Bytes } from "@lucid-evolution/experimental";
import { Effect } from "effect";
import assert from "assert";

// Sample address bytes
const bytes = Bytes.fromHexOrThrow(
  "100607f9006603f3dd1cf8fc033cfb0718064e013bfdfb84fc5105d1006f1603021707060342fe0505000107fbd206d2aa000141fb0602079b",
);
const addressEffect = BaseAddress.fromBytes(bytes);
const address = Effect.runSync(addressEffect);
assert(address._tag === "BaseAddress");
```

Added in v2.0.0

## makeOrThrow

Create a BaseAddress from network ID and credentials, throws on error.

**Signature**

```ts
export declare const makeOrThrow: (
  networkId: number,
  paymentCredential: Credential.Credential,
  stakeCredential: Credential.Credential,
) => BaseAddress;
```

**Example**

```ts
import { BaseAddress, KeyHash } from "@lucid-evolution/experimental";
import assert from "assert";

// Create payment and stake credentials
const paymentKeyHash = KeyHash.makeOrThrow(
  "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f",
);
const stakeKeyHash = KeyHash.makeOrThrow(
  "530245ff0704032c031302cf01fb06010521a7fd024404010004f814",
);

// Create base address
const address = BaseAddress.makeOrThrow(0, paymentKeyHash, stakeKeyHash);
assert(address._tag === "BaseAddress");
assert(address.networkId === 0);
```

Added in v2.0.0

# equality

## equals

Check if two BaseAddress instances are equal.

**Signature**

```ts
export declare const equals: (a: BaseAddress, b: BaseAddress) => boolean;
```

**Example**

```ts
import { BaseAddress, KeyHash } from "@lucid-evolution/experimental";
import assert from "assert";

// Create payment and stake key hashes with consistent test values
const paymentHash = "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f";
const stakeHash = "530245ff0704032c031302cf01fb06010521a7fd024404010004f814";

// Create credentials from the key hashes
const paymentCredential = KeyHash.makeOrThrow(paymentHash);
const stakeCredential = KeyHash.makeOrThrow(stakeHash);

// Create identical addresses with same network ID
const address1 = BaseAddress.makeOrThrow(0, paymentCredential, stakeCredential);
const address2 = BaseAddress.makeOrThrow(0, paymentCredential, stakeCredential);

// Create a different address with different network ID
const address3 = BaseAddress.makeOrThrow(1, paymentCredential, stakeCredential);

// Compare addresses
assert(BaseAddress.equals(address1, address2) === true);
assert(BaseAddress.equals(address1, address3) === false);
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
import { BaseAddress } from "@lucid-evolution/experimental";
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

# transformation

## toBytes

Convert a BaseAddress to bytes.

**Signature**

```ts
export declare const toBytes: (address: BaseAddress) => Uint8Array;
```

**Example**

```ts
import {
  BaseAddress,
  Credential,
  KeyHash,
} from "@lucid-evolution/experimental";
import assert from "assert";

// Create payment and stake credentials
const paymentKeyHash = KeyHash.makeOrThrow(
  "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f",
);
const stakeKeyHash = KeyHash.makeOrThrow(
  "530245ff0704032c031302cf01fb06010521a7fd024404010004f814",
);

// Create base address
const address = BaseAddress.makeOrThrow(0, paymentKeyHash, stakeKeyHash);
const bytes = BaseAddress.toBytes(address);
assert(bytes instanceof Uint8Array);
assert(bytes.length === 57);
```

Added in v2.0.0

# utils

## BaseAddress (interface)

**Signature**

```ts
export interface BaseAddress {
  readonly [NominalType]: unique symbol;
}
```
