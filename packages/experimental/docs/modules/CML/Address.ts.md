---
title: CML/Address.ts
nav_order: 2
parent: Modules
---

## Address overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [fromBech32](#frombech32)
  - [fromHex](#fromhex)
  - [fromJson](#fromjson)
  - [fromRawBytes](#fromrawbytes)
  - [headerMatchesKind](#headermatcheskind)
  - [isValid](#isvalid)
  - [isValidBech32](#isvalidbech32)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [fromBech32Unsafe](#frombech32unsafe)
  - [fromHexUnsafe](#fromhexunsafe)
  - [fromJsonUnsafe](#fromjsonunsafe)
  - [fromRawBytesUnsafe](#fromrawbytesunsafe)
  - [headerMatchesKindUnsafe](#headermatcheskindunsafe)
  - [isValidBech32Unsafe](#isvalidbech32unsafe)
  - [isValidUnsafe](#isvalidunsafe)
- [Errors](#errors)
  - [AddressError (class)](#addresserror-class)
- [Methods](#methods)
  - [free](#free)
  - [header](#header)
  - [kind](#kind)
  - [networkId](#networkid)
  - [paymentCred](#paymentcred)
  - [stakingCred](#stakingcred)
  - [toBech32](#tobech32)
  - [toHex](#tohex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
  - [toRawBytes](#torawbytes)
- [MethodsUnsafe](#methodsunsafe)
  - [freeUnsafe](#freeunsafe)
  - [headerUnsafe](#headerunsafe)
  - [kindUnsafe](#kindunsafe)
  - [networkIdUnsafe](#networkidunsafe)
  - [paymentCredUnsafe](#paymentcredunsafe)
  - [stakingCredUnsafe](#stakingcredunsafe)
  - [toBech32Unsafe](#tobech32unsafe)
  - [toHexUnsafe](#tohexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
  - [toRawBytesUnsafe](#torawbytesunsafe)
- [Types](#types)
  - [Address (type alias)](#address-type-alias)

---

# Constructors

## fromBech32

Static method fromBech32 of Address

**Signature**

```ts
export declare const fromBech32: (
  bechStr: string,
) => Effect.Effect<CML.Address, AddressError>;
```

Added in v2.0.0

## fromHex

Static method fromHex of Address

**Signature**

```ts
export declare const fromHex: (
  hex: string,
) => Effect.Effect<CML.Address, AddressError>;
```

Added in v2.0.0

## fromJson

Static method fromJson of Address

**Signature**

```ts
export declare const fromJson: (
  json: string,
) => Effect.Effect<CML.Address, AddressError>;
```

Added in v2.0.0

## fromRawBytes

Static method fromRawBytes of Address

**Signature**

```ts
export declare const fromRawBytes: (
  data: Uint8Array,
) => Effect.Effect<CML.Address, AddressError>;
```

Added in v2.0.0

## headerMatchesKind

Static method headerMatchesKind of Address

**Signature**

```ts
export declare const headerMatchesKind: (
  header: number,
  kind: CML.AddressHeaderKind,
) => Effect.Effect<boolean, AddressError>;
```

Added in v2.0.0

## isValid

Static method isValid of Address

**Signature**

```ts
export declare const isValid: (
  bechStr: string,
) => Effect.Effect<boolean, AddressError>;
```

Added in v2.0.0

## isValidBech32

Static method isValidBech32 of Address

**Signature**

```ts
export declare const isValidBech32: (
  bechStr: string,
) => Effect.Effect<boolean, AddressError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## fromBech32Unsafe

Unsafely calls Address.fromBech32 without Effect wrapper

**Signature**

```ts
export declare const fromBech32Unsafe: (bechStr: string) => CML.Address;
```

Added in v2.0.0

## fromHexUnsafe

Unsafely calls Address.fromHex without Effect wrapper

**Signature**

```ts
export declare const fromHexUnsafe: (hex: string) => CML.Address;
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls Address.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.Address;
```

Added in v2.0.0

## fromRawBytesUnsafe

Unsafely calls Address.fromRawBytes without Effect wrapper

**Signature**

```ts
export declare const fromRawBytesUnsafe: (data: Uint8Array) => CML.Address;
```

Added in v2.0.0

## headerMatchesKindUnsafe

Unsafely calls Address.headerMatchesKind without Effect wrapper

**Signature**

```ts
export declare const headerMatchesKindUnsafe: (
  header: number,
  kind: CML.AddressHeaderKind,
) => boolean;
```

Added in v2.0.0

## isValidBech32Unsafe

Unsafely calls Address.isValidBech32 without Effect wrapper

**Signature**

```ts
export declare const isValidBech32Unsafe: (bechStr: string) => boolean;
```

Added in v2.0.0

## isValidUnsafe

Unsafely calls Address.isValid without Effect wrapper

**Signature**

```ts
export declare const isValidUnsafe: (bechStr: string) => boolean;
```

Added in v2.0.0

# Errors

## AddressError (class)

Error class for Address operations

This error is thrown when operations on Address instances fail.

**Signature**

```ts
export declare class AddressError
```

Added in v2.0.0

# Methods

## free

Method free of Address

**Signature**

```ts
export declare const free: (
  instance: CML.Address,
) => Effect.Effect<void, AddressError>;
```

Added in v2.0.0

## header

Method header of Address

**Signature**

```ts
export declare const header: (
  instance: CML.Address,
) => Effect.Effect<number, AddressError>;
```

Added in v2.0.0

## kind

Method kind of Address

**Signature**

```ts
export declare const kind: (
  instance: CML.Address,
) => Effect.Effect<CML.AddressKind, AddressError>;
```

Added in v2.0.0

## networkId

Method networkId of Address

**Signature**

```ts
export declare const networkId: (
  instance: CML.Address,
) => Effect.Effect<number, AddressError>;
```

Added in v2.0.0

## paymentCred

Method paymentCred of Address

**Signature**

```ts
export declare const paymentCred: (
  instance: CML.Address,
) => Effect.Effect<CML.Credential | undefined, AddressError>;
```

Added in v2.0.0

## stakingCred

Method stakingCred of Address

**Signature**

```ts
export declare const stakingCred: (
  instance: CML.Address,
) => Effect.Effect<CML.Credential | undefined, AddressError>;
```

Added in v2.0.0

## toBech32

Method toBech32 of Address

**Signature**

```ts
export declare const toBech32: (
  instance: CML.Address,
  prefix: string,
) => Effect.Effect<string, AddressError>;
```

Added in v2.0.0

## toHex

Method toHex of Address

**Signature**

```ts
export declare const toHex: (
  instance: CML.Address,
) => Effect.Effect<string, AddressError>;
```

Added in v2.0.0

## toJsValue

Method toJsValue of Address

**Signature**

```ts
export declare const toJsValue: (
  instance: CML.Address,
) => Effect.Effect<any, AddressError>;
```

Added in v2.0.0

## toJson

Method toJson of Address

**Signature**

```ts
export declare const toJson: (
  instance: CML.Address,
) => Effect.Effect<string, AddressError>;
```

Added in v2.0.0

## toRawBytes

Method toRawBytes of Address

**Signature**

```ts
export declare const toRawBytes: (
  instance: CML.Address,
) => Effect.Effect<Uint8Array, AddressError>;
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.Address) => void;
```

Added in v2.0.0

## headerUnsafe

Unsafely calls instance.header without Effect wrapper

**Signature**

```ts
export declare const headerUnsafe: (instance: CML.Address) => number;
```

Added in v2.0.0

## kindUnsafe

Unsafely calls instance.kind without Effect wrapper

**Signature**

```ts
export declare const kindUnsafe: (instance: CML.Address) => CML.AddressKind;
```

Added in v2.0.0

## networkIdUnsafe

Unsafely calls instance.networkId without Effect wrapper

**Signature**

```ts
export declare const networkIdUnsafe: (instance: CML.Address) => number;
```

Added in v2.0.0

## paymentCredUnsafe

Unsafely calls instance.paymentCred without Effect wrapper

**Signature**

```ts
export declare const paymentCredUnsafe: (
  instance: CML.Address,
) => CML.Credential | undefined;
```

Added in v2.0.0

## stakingCredUnsafe

Unsafely calls instance.stakingCred without Effect wrapper

**Signature**

```ts
export declare const stakingCredUnsafe: (
  instance: CML.Address,
) => CML.Credential | undefined;
```

Added in v2.0.0

## toBech32Unsafe

Unsafely calls instance.toBech32 without Effect wrapper

**Signature**

```ts
export declare const toBech32Unsafe: (
  instance: CML.Address,
  prefix: string,
) => string;
```

Added in v2.0.0

## toHexUnsafe

Unsafely calls instance.toHex without Effect wrapper

**Signature**

```ts
export declare const toHexUnsafe: (instance: CML.Address) => string;
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.Address) => any;
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.Address) => string;
```

Added in v2.0.0

## toRawBytesUnsafe

Unsafely calls instance.toRawBytes without Effect wrapper

**Signature**

```ts
export declare const toRawBytesUnsafe: (instance: CML.Address) => Uint8Array;
```

Added in v2.0.0

# Types

## Address (type alias)

Type alias for the CML Address class

**Signature**

```ts
export type Address = CML.Address;
```

Added in v2.0.0
