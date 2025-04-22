---
title: BaseAddress.ts
nav_order: 4
parent: Modules
---

## BaseAddress overview

---

<h2 class="text-delta">Table of contents</h2>

- [schemas](#schemas)
  - [BaseAddress (class)](#baseaddress-class)
- [utils](#utils)
  - [fromBytes](#frombytes)
  - [makeOrThrow](#makeorthrow)
  - [toBytes](#tobytes)

---

# schemas

## BaseAddress (class)

Base address with both payment and staking credentials

**Signature**

```ts
export declare class BaseAddress
```

Added in v2.0.0

# utils

## fromBytes

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

## makeOrThrow

**Signature**

```ts
export declare const makeOrThrow: (
  networkId: number,
  paymentCredential: Credential.Credential,
  stakeCredential: Credential.Credential,
) => BaseAddress;
```

## toBytes

**Signature**

```ts
export declare const toBytes: (address: BaseAddress) => Uint8Array;
```
