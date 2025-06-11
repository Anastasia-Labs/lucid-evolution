---
title: CML/HeaderBody.ts
nav_order: 108
parent: Modules
---

## HeaderBody overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
  - [fromCborBytes](#fromcborbytes)
  - [fromCborHex](#fromcborhex)
  - [fromJson](#fromjson)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
  - [fromCborBytesUnsafe](#fromcborbytesunsafe)
  - [fromCborHexUnsafe](#fromcborhexunsafe)
  - [fromJsonUnsafe](#fromjsonunsafe)
- [Errors](#errors)
  - [HeaderBodyError (class)](#headerbodyerror-class)
- [Methods](#methods)
  - [blockBodyHash](#blockbodyhash)
  - [blockBodySize](#blockbodysize)
  - [blockNumber](#blocknumber)
  - [free](#free)
  - [issuerVkey](#issuervkey)
  - [operationalCert](#operationalcert)
  - [prevHash](#prevhash)
  - [protocolVersion](#protocolversion)
  - [slot](#slot)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
  - [vrfResult](#vrfresult)
  - [vrfVkey](#vrfvkey)
- [MethodsUnsafe](#methodsunsafe)
  - [blockBodyHashUnsafe](#blockbodyhashunsafe)
  - [blockBodySizeUnsafe](#blockbodysizeunsafe)
  - [blockNumberUnsafe](#blocknumberunsafe)
  - [freeUnsafe](#freeunsafe)
  - [issuerVkeyUnsafe](#issuervkeyunsafe)
  - [operationalCertUnsafe](#operationalcertunsafe)
  - [prevHashUnsafe](#prevhashunsafe)
  - [protocolVersionUnsafe](#protocolversionunsafe)
  - [slotUnsafe](#slotunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
  - [vrfResultUnsafe](#vrfresultunsafe)
  - [vrfVkeyUnsafe](#vrfvkeyunsafe)
- [Types](#types)
  - [HeaderBody (type alias)](#headerbody-type-alias)

---

# Constructors

## \_new

Static method \_new of HeaderBody

**Signature**

```ts
export declare const _new: (
  blockNumber: bigint,
  slot: bigint,
  prevHash: CML.BlockHeaderHash | undefined,
  issuerVkey: CML.PublicKey,
  vrfVkey: CML.VRFVkey,
  vrfResult: CML.VRFCert,
  blockBodySize: bigint,
  blockBodyHash: CML.BlockBodyHash,
  operationalCert: CML.OperationalCert,
  protocolVersion: CML.ProtocolVersion,
) => Effect.Effect<CML.HeaderBody, HeaderBodyError>;
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of HeaderBody

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.HeaderBody, HeaderBodyError>;
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of HeaderBody

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.HeaderBody, HeaderBodyError>;
```

Added in v2.0.0

## fromJson

Static method fromJson of HeaderBody

**Signature**

```ts
export declare const fromJson: (
  json: string,
) => Effect.Effect<CML.HeaderBody, HeaderBodyError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls HeaderBody.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (
  blockNumber: bigint,
  slot: bigint,
  prevHash: CML.BlockHeaderHash | undefined,
  issuerVkey: CML.PublicKey,
  vrfVkey: CML.VRFVkey,
  vrfResult: CML.VRFCert,
  blockBodySize: bigint,
  blockBodyHash: CML.BlockBodyHash,
  operationalCert: CML.OperationalCert,
  protocolVersion: CML.ProtocolVersion,
) => CML.HeaderBody;
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls HeaderBody.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (
  cborBytes: Uint8Array,
) => CML.HeaderBody;
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls HeaderBody.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.HeaderBody;
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls HeaderBody.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.HeaderBody;
```

Added in v2.0.0

# Errors

## HeaderBodyError (class)

Error class for HeaderBody operations

This error is thrown when operations on HeaderBody instances fail.

**Signature**

```ts
export declare class HeaderBodyError
```

Added in v2.0.0

# Methods

## blockBodyHash

Method blockBodyHash of HeaderBody

**Signature**

```ts
export declare const blockBodyHash: (
  instance: CML.HeaderBody,
) => Effect.Effect<CML.BlockBodyHash, HeaderBodyError>;
```

Added in v2.0.0

## blockBodySize

Method blockBodySize of HeaderBody

**Signature**

```ts
export declare const blockBodySize: (
  instance: CML.HeaderBody,
) => Effect.Effect<bigint, HeaderBodyError>;
```

Added in v2.0.0

## blockNumber

Method blockNumber of HeaderBody

**Signature**

```ts
export declare const blockNumber: (
  instance: CML.HeaderBody,
) => Effect.Effect<bigint, HeaderBodyError>;
```

Added in v2.0.0

## free

Method free of HeaderBody

**Signature**

```ts
export declare const free: (
  instance: CML.HeaderBody,
) => Effect.Effect<void, HeaderBodyError>;
```

Added in v2.0.0

## issuerVkey

Method issuerVkey of HeaderBody

**Signature**

```ts
export declare const issuerVkey: (
  instance: CML.HeaderBody,
) => Effect.Effect<CML.PublicKey, HeaderBodyError>;
```

Added in v2.0.0

## operationalCert

Method operationalCert of HeaderBody

**Signature**

```ts
export declare const operationalCert: (
  instance: CML.HeaderBody,
) => Effect.Effect<CML.OperationalCert, HeaderBodyError>;
```

Added in v2.0.0

## prevHash

Method prevHash of HeaderBody

**Signature**

```ts
export declare const prevHash: (
  instance: CML.HeaderBody,
) => Effect.Effect<CML.BlockHeaderHash | undefined, HeaderBodyError>;
```

Added in v2.0.0

## protocolVersion

Method protocolVersion of HeaderBody

**Signature**

```ts
export declare const protocolVersion: (
  instance: CML.HeaderBody,
) => Effect.Effect<CML.ProtocolVersion, HeaderBodyError>;
```

Added in v2.0.0

## slot

Method slot of HeaderBody

**Signature**

```ts
export declare const slot: (
  instance: CML.HeaderBody,
) => Effect.Effect<bigint, HeaderBodyError>;
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of HeaderBody

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.HeaderBody,
) => Effect.Effect<Uint8Array, HeaderBodyError>;
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of HeaderBody

**Signature**

```ts
export declare const toCanonicalCborHex: (
  instance: CML.HeaderBody,
) => Effect.Effect<string, HeaderBodyError>;
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of HeaderBody

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.HeaderBody,
) => Effect.Effect<Uint8Array, HeaderBodyError>;
```

Added in v2.0.0

## toCborHex

Method toCborHex of HeaderBody

**Signature**

```ts
export declare const toCborHex: (
  instance: CML.HeaderBody,
) => Effect.Effect<string, HeaderBodyError>;
```

Added in v2.0.0

## toJsValue

Method toJsValue of HeaderBody

**Signature**

```ts
export declare const toJsValue: (
  instance: CML.HeaderBody,
) => Effect.Effect<any, HeaderBodyError>;
```

Added in v2.0.0

## toJson

Method toJson of HeaderBody

**Signature**

```ts
export declare const toJson: (
  instance: CML.HeaderBody,
) => Effect.Effect<string, HeaderBodyError>;
```

Added in v2.0.0

## vrfResult

Method vrfResult of HeaderBody

**Signature**

```ts
export declare const vrfResult: (
  instance: CML.HeaderBody,
) => Effect.Effect<CML.VRFCert, HeaderBodyError>;
```

Added in v2.0.0

## vrfVkey

Method vrfVkey of HeaderBody

**Signature**

```ts
export declare const vrfVkey: (
  instance: CML.HeaderBody,
) => Effect.Effect<CML.VRFVkey, HeaderBodyError>;
```

Added in v2.0.0

# MethodsUnsafe

## blockBodyHashUnsafe

Unsafely calls instance.blockBodyHash without Effect wrapper

**Signature**

```ts
export declare const blockBodyHashUnsafe: (
  instance: CML.HeaderBody,
) => CML.BlockBodyHash;
```

Added in v2.0.0

## blockBodySizeUnsafe

Unsafely calls instance.blockBodySize without Effect wrapper

**Signature**

```ts
export declare const blockBodySizeUnsafe: (instance: CML.HeaderBody) => bigint;
```

Added in v2.0.0

## blockNumberUnsafe

Unsafely calls instance.blockNumber without Effect wrapper

**Signature**

```ts
export declare const blockNumberUnsafe: (instance: CML.HeaderBody) => bigint;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.HeaderBody) => void;
```

Added in v2.0.0

## issuerVkeyUnsafe

Unsafely calls instance.issuerVkey without Effect wrapper

**Signature**

```ts
export declare const issuerVkeyUnsafe: (
  instance: CML.HeaderBody,
) => CML.PublicKey;
```

Added in v2.0.0

## operationalCertUnsafe

Unsafely calls instance.operationalCert without Effect wrapper

**Signature**

```ts
export declare const operationalCertUnsafe: (
  instance: CML.HeaderBody,
) => CML.OperationalCert;
```

Added in v2.0.0

## prevHashUnsafe

Unsafely calls instance.prevHash without Effect wrapper

**Signature**

```ts
export declare const prevHashUnsafe: (
  instance: CML.HeaderBody,
) => CML.BlockHeaderHash | undefined;
```

Added in v2.0.0

## protocolVersionUnsafe

Unsafely calls instance.protocolVersion without Effect wrapper

**Signature**

```ts
export declare const protocolVersionUnsafe: (
  instance: CML.HeaderBody,
) => CML.ProtocolVersion;
```

Added in v2.0.0

## slotUnsafe

Unsafely calls instance.slot without Effect wrapper

**Signature**

```ts
export declare const slotUnsafe: (instance: CML.HeaderBody) => bigint;
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (
  instance: CML.HeaderBody,
) => Uint8Array;
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (
  instance: CML.HeaderBody,
) => string;
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (
  instance: CML.HeaderBody,
) => Uint8Array;
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.HeaderBody) => string;
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.HeaderBody) => any;
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.HeaderBody) => string;
```

Added in v2.0.0

## vrfResultUnsafe

Unsafely calls instance.vrfResult without Effect wrapper

**Signature**

```ts
export declare const vrfResultUnsafe: (instance: CML.HeaderBody) => CML.VRFCert;
```

Added in v2.0.0

## vrfVkeyUnsafe

Unsafely calls instance.vrfVkey without Effect wrapper

**Signature**

```ts
export declare const vrfVkeyUnsafe: (instance: CML.HeaderBody) => CML.VRFVkey;
```

Added in v2.0.0

# Types

## HeaderBody (type alias)

Type alias for the CML HeaderBody class

**Signature**

```ts
export type HeaderBody = CML.HeaderBody;
```

Added in v2.0.0
