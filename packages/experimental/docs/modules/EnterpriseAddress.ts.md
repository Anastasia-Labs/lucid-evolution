---
title: EnterpriseAddress.ts
nav_order: 296
parent: Modules
---

## EnterpriseAddress overview

---

<h2 class="text-delta">Table of contents</h2>

- [schemas](#schemas)
  - [EnterpriseAddress (class)](#enterpriseaddress-class)
- [utils](#utils)
  - [fromBytes](#frombytes)
  - [makeOrThrow](#makeorthrow)
  - [toBytes](#tobytes)

---

# schemas

## EnterpriseAddress (class)

Enterprise address with only payment credential

**Signature**

```ts
export declare class EnterpriseAddress
```

Added in v2.0.0

# utils

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

## makeOrThrow

**Signature**

```ts
export declare const makeOrThrow: (
  networkId: number,
  paymentCredential: Credential.Credential,
) => EnterpriseAddress;
```

## toBytes

**Signature**

```ts
export declare const toBytes: (address: EnterpriseAddress) => Uint8Array;
```
