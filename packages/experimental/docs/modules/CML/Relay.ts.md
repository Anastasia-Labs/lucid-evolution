---
title: CML/Relay.ts
nav_order: 186
parent: Modules
---

## Relay overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [fromCborBytes](#fromcborbytes)
  - [fromCborHex](#fromcborhex)
  - [fromJson](#fromjson)
  - [newMultiHostName](#newmultihostname)
  - [newSingleHostAddr](#newsinglehostaddr)
  - [newSingleHostName](#newsinglehostname)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [fromCborBytesUnsafe](#fromcborbytesunsafe)
  - [fromCborHexUnsafe](#fromcborhexunsafe)
  - [fromJsonUnsafe](#fromjsonunsafe)
  - [newMultiHostNameUnsafe](#newmultihostnameunsafe)
  - [newSingleHostAddrUnsafe](#newsinglehostaddrunsafe)
  - [newSingleHostNameUnsafe](#newsinglehostnameunsafe)
- [Errors](#errors)
  - [RelayError (class)](#relayerror-class)
- [Methods](#methods)
  - [asMultiHostName](#asmultihostname)
  - [asSingleHostAddr](#assinglehostaddr)
  - [asSingleHostName](#assinglehostname)
  - [free](#free)
  - [kind](#kind)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
- [MethodsUnsafe](#methodsunsafe)
  - [asMultiHostNameUnsafe](#asmultihostnameunsafe)
  - [asSingleHostAddrUnsafe](#assinglehostaddrunsafe)
  - [asSingleHostNameUnsafe](#assinglehostnameunsafe)
  - [freeUnsafe](#freeunsafe)
  - [kindUnsafe](#kindunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
- [Types](#types)
  - [Relay (type alias)](#relay-type-alias)

---

# Constructors

## fromCborBytes

Static method fromCborBytes of Relay

**Signature**

```ts
export declare const fromCborBytes: (cborBytes: Uint8Array) => Effect.Effect<CML.Relay, RelayError>
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of Relay

**Signature**

```ts
export declare const fromCborHex: (cborBytes: string) => Effect.Effect<CML.Relay, RelayError>
```

Added in v2.0.0

## fromJson

Static method fromJson of Relay

**Signature**

```ts
export declare const fromJson: (json: string) => Effect.Effect<CML.Relay, RelayError>
```

Added in v2.0.0

## newMultiHostName

Static method newMultiHostName of Relay

**Signature**

```ts
export declare const newMultiHostName: (dnsName: CML.DNSName) => Effect.Effect<CML.Relay, RelayError>
```

Added in v2.0.0

## newSingleHostAddr

Static method newSingleHostAddr of Relay

**Signature**

```ts
export declare const newSingleHostAddr: (
  port: number,
  ipv4: CML.Ipv4,
  ipv6: CML.Ipv6
) => Effect.Effect<CML.Relay, RelayError>
```

Added in v2.0.0

## newSingleHostName

Static method newSingleHostName of Relay

**Signature**

```ts
export declare const newSingleHostName: (
  port: number | undefined,
  dnsName: CML.DNSName
) => Effect.Effect<CML.Relay, RelayError>
```

Added in v2.0.0

# ConstructorsUnsafe

## fromCborBytesUnsafe

Unsafely calls Relay.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (cborBytes: Uint8Array) => CML.Relay
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls Relay.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.Relay
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls Relay.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.Relay
```

Added in v2.0.0

## newMultiHostNameUnsafe

Unsafely calls Relay.newMultiHostName without Effect wrapper

**Signature**

```ts
export declare const newMultiHostNameUnsafe: (dnsName: CML.DNSName) => CML.Relay
```

Added in v2.0.0

## newSingleHostAddrUnsafe

Unsafely calls Relay.newSingleHostAddr without Effect wrapper

**Signature**

```ts
export declare const newSingleHostAddrUnsafe: (port: number, ipv4: CML.Ipv4, ipv6: CML.Ipv6) => CML.Relay
```

Added in v2.0.0

## newSingleHostNameUnsafe

Unsafely calls Relay.newSingleHostName without Effect wrapper

**Signature**

```ts
export declare const newSingleHostNameUnsafe: (port: number | undefined, dnsName: CML.DNSName) => CML.Relay
```

Added in v2.0.0

# Errors

## RelayError (class)

Error class for Relay operations

This error is thrown when operations on Relay instances fail.

**Signature**

```ts
export declare class RelayError
```

Added in v2.0.0

# Methods

## asMultiHostName

Method asMultiHostName of Relay

**Signature**

```ts
export declare const asMultiHostName: (instance: CML.Relay) => Effect.Effect<CML.MultiHostName | undefined, RelayError>
```

Added in v2.0.0

## asSingleHostAddr

Method asSingleHostAddr of Relay

**Signature**

```ts
export declare const asSingleHostAddr: (
  instance: CML.Relay
) => Effect.Effect<CML.SingleHostAddr | undefined, RelayError>
```

Added in v2.0.0

## asSingleHostName

Method asSingleHostName of Relay

**Signature**

```ts
export declare const asSingleHostName: (
  instance: CML.Relay
) => Effect.Effect<CML.SingleHostName | undefined, RelayError>
```

Added in v2.0.0

## free

Method free of Relay

**Signature**

```ts
export declare const free: (instance: CML.Relay) => Effect.Effect<void, RelayError>
```

Added in v2.0.0

## kind

Method kind of Relay

**Signature**

```ts
export declare const kind: (instance: CML.Relay) => Effect.Effect<CML.RelayKind, RelayError>
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of Relay

**Signature**

```ts
export declare const toCanonicalCborBytes: (instance: CML.Relay) => Effect.Effect<Uint8Array, RelayError>
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of Relay

**Signature**

```ts
export declare const toCanonicalCborHex: (instance: CML.Relay) => Effect.Effect<string, RelayError>
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of Relay

**Signature**

```ts
export declare const toCborBytes: (instance: CML.Relay) => Effect.Effect<Uint8Array, RelayError>
```

Added in v2.0.0

## toCborHex

Method toCborHex of Relay

**Signature**

```ts
export declare const toCborHex: (instance: CML.Relay) => Effect.Effect<string, RelayError>
```

Added in v2.0.0

## toJsValue

Method toJsValue of Relay

**Signature**

```ts
export declare const toJsValue: (instance: CML.Relay) => Effect.Effect<any, RelayError>
```

Added in v2.0.0

## toJson

Method toJson of Relay

**Signature**

```ts
export declare const toJson: (instance: CML.Relay) => Effect.Effect<string, RelayError>
```

Added in v2.0.0

# MethodsUnsafe

## asMultiHostNameUnsafe

Unsafely calls instance.asMultiHostName without Effect wrapper

**Signature**

```ts
export declare const asMultiHostNameUnsafe: (instance: CML.Relay) => CML.MultiHostName | undefined
```

Added in v2.0.0

## asSingleHostAddrUnsafe

Unsafely calls instance.asSingleHostAddr without Effect wrapper

**Signature**

```ts
export declare const asSingleHostAddrUnsafe: (instance: CML.Relay) => CML.SingleHostAddr | undefined
```

Added in v2.0.0

## asSingleHostNameUnsafe

Unsafely calls instance.asSingleHostName without Effect wrapper

**Signature**

```ts
export declare const asSingleHostNameUnsafe: (instance: CML.Relay) => CML.SingleHostName | undefined
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.Relay) => void
```

Added in v2.0.0

## kindUnsafe

Unsafely calls instance.kind without Effect wrapper

**Signature**

```ts
export declare const kindUnsafe: (instance: CML.Relay) => CML.RelayKind
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (instance: CML.Relay) => Uint8Array
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (instance: CML.Relay) => string
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (instance: CML.Relay) => Uint8Array
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.Relay) => string
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.Relay) => any
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.Relay) => string
```

Added in v2.0.0

# Types

## Relay (type alias)

Type alias for the CML Relay class

**Signature**

```ts
export type Relay = CML.Relay
```

Added in v2.0.0
