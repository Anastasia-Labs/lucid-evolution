---
title: AddressDetails.ts
nav_order: 2
parent: Modules
---

## AddressDetails overview

---

<h2 class="text-delta">Table of contents</h2>

- [schemas](#schemas)
  - [AddressDetails (class)](#addressdetails-class)
- [utils](#utils)
  - [AddressDetails (interface)](#addressdetails-interface)
  - [Bech32](#bech32)
  - [HexString](#hexstring)

---

# schemas

## AddressDetails (class)

Pointer address with payment credential and pointer to stake registration

**Signature**

```ts
export declare class AddressDetails
```

Added in v2.0.0

# utils

## AddressDetails (interface)

**Signature**

```ts
export interface AddressDetails {
  readonly [NominalType]: unique symbol;
}
```

## Bech32

**Signature**

```ts
export declare const Bech32: Schema.transformOrFail<
  Schema.SchemaClass<string & Brand<"Bech32">, string & Brand<"Bech32">, never>,
  typeof AddressDetails,
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
  typeof AddressDetails,
  never
>;
```
