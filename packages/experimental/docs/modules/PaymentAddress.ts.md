---
title: PaymentAddress.ts
nav_order: 299
parent: Modules
---

## PaymentAddress overview

---

<h2 class="text-delta">Table of contents</h2>

- [model](#model)
  - [PaymentAddress (type alias)](#paymentaddress-type-alias)
- [predicates](#predicates)
  - [isPaymentAddress](#ispaymentaddress)
- [schemas](#schemas)
  - [PaymentAddress](#paymentaddress)

---

# model

## PaymentAddress (type alias)

Type representing a payment address string in bech32 format

**Signature**

```ts
export type PaymentAddress = Schema.Schema.Type<typeof PaymentAddress>;
```

Added in v2.0.0

# predicates

## isPaymentAddress

Check if the given value is a valid PaymentAddress

**Signature**

```ts
export declare const isPaymentAddress: (
  u: unknown,
  overrideOptions?: ParseOptions | number,
) => u is string & Brand<"PaymentAddress">;
```

**Example**

```ts
import { PaymentAddress } from "@evolution-sdk/experimental";
import assert from "assert";

const isValid = PaymentAddress.isPaymentAddress(
  "addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x",
);
assert(isValid === true);
```

Added in v2.0.0

# schemas

## PaymentAddress

Bech32 address format schema (human-readable addresses)
Following CIP-0019 encoding requirements

**Signature**

```ts
export declare const PaymentAddress: Schema.brand<
  Schema.filter<typeof Schema.String>,
  "PaymentAddress"
>;
```

Added in v2.0.0
