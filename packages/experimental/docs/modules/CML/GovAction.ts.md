---
title: CML/GovAction.ts
nav_order: 103
parent: Modules
---

## GovAction overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [fromCborBytes](#fromcborbytes)
  - [fromCborHex](#fromcborhex)
  - [fromJson](#fromjson)
  - [newHardForkInitiationAction](#newhardforkinitiationaction)
  - [newInfoAction](#newinfoaction)
  - [newNewConstitution](#newnewconstitution)
  - [newNoConfidence](#newnoconfidence)
  - [newParameterChangeAction](#newparameterchangeaction)
  - [newTreasuryWithdrawalsAction](#newtreasurywithdrawalsaction)
  - [newUpdateCommittee](#newupdatecommittee)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [fromCborBytesUnsafe](#fromcborbytesunsafe)
  - [fromCborHexUnsafe](#fromcborhexunsafe)
  - [fromJsonUnsafe](#fromjsonunsafe)
  - [newHardForkInitiationActionUnsafe](#newhardforkinitiationactionunsafe)
  - [newInfoActionUnsafe](#newinfoactionunsafe)
  - [newNewConstitutionUnsafe](#newnewconstitutionunsafe)
  - [newNoConfidenceUnsafe](#newnoconfidenceunsafe)
  - [newParameterChangeActionUnsafe](#newparameterchangeactionunsafe)
  - [newTreasuryWithdrawalsActionUnsafe](#newtreasurywithdrawalsactionunsafe)
  - [newUpdateCommitteeUnsafe](#newupdatecommitteeunsafe)
- [Errors](#errors)
  - [GovActionError (class)](#govactionerror-class)
- [Methods](#methods)
  - [asHardForkInitiationAction](#ashardforkinitiationaction)
  - [asNewConstitution](#asnewconstitution)
  - [asNoConfidence](#asnoconfidence)
  - [asParameterChangeAction](#asparameterchangeaction)
  - [asTreasuryWithdrawalsAction](#astreasurywithdrawalsaction)
  - [asUpdateCommittee](#asupdatecommittee)
  - [free](#free)
  - [kind](#kind)
  - [scriptHash](#scripthash)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
- [MethodsUnsafe](#methodsunsafe)
  - [asHardForkInitiationActionUnsafe](#ashardforkinitiationactionunsafe)
  - [asNewConstitutionUnsafe](#asnewconstitutionunsafe)
  - [asNoConfidenceUnsafe](#asnoconfidenceunsafe)
  - [asParameterChangeActionUnsafe](#asparameterchangeactionunsafe)
  - [asTreasuryWithdrawalsActionUnsafe](#astreasurywithdrawalsactionunsafe)
  - [asUpdateCommitteeUnsafe](#asupdatecommitteeunsafe)
  - [freeUnsafe](#freeunsafe)
  - [kindUnsafe](#kindunsafe)
  - [scriptHashUnsafe](#scripthashunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
- [Types](#types)
  - [GovAction (type alias)](#govaction-type-alias)

---

# Constructors

## fromCborBytes

Static method fromCborBytes of GovAction

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.GovAction, GovActionError>;
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of GovAction

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.GovAction, GovActionError>;
```

Added in v2.0.0

## fromJson

Static method fromJson of GovAction

**Signature**

```ts
export declare const fromJson: (
  json: string,
) => Effect.Effect<CML.GovAction, GovActionError>;
```

Added in v2.0.0

## newHardForkInitiationAction

Static method newHardForkInitiationAction of GovAction

**Signature**

```ts
export declare const newHardForkInitiationAction: (
  actionId: CML.GovActionId | undefined,
  version: CML.ProtocolVersion,
) => Effect.Effect<CML.GovAction, GovActionError>;
```

Added in v2.0.0

## newInfoAction

Static method newInfoAction of GovAction

**Signature**

```ts
export declare const newInfoAction: () => Effect.Effect<
  CML.GovAction,
  GovActionError
>;
```

Added in v2.0.0

## newNewConstitution

Static method newNewConstitution of GovAction

**Signature**

```ts
export declare const newNewConstitution: (
  actionId: CML.GovActionId | undefined,
  constitution: CML.Constitution,
) => Effect.Effect<CML.GovAction, GovActionError>;
```

Added in v2.0.0

## newNoConfidence

Static method newNoConfidence of GovAction

**Signature**

```ts
export declare const newNoConfidence: (
  actionId: CML.GovActionId,
) => Effect.Effect<CML.GovAction, GovActionError>;
```

Added in v2.0.0

## newParameterChangeAction

Static method newParameterChangeAction of GovAction

**Signature**

```ts
export declare const newParameterChangeAction: (
  actionId: CML.GovActionId | undefined,
  update: CML.ProtocolParamUpdate,
  policyHash: CML.ScriptHash,
) => Effect.Effect<CML.GovAction, GovActionError>;
```

Added in v2.0.0

## newTreasuryWithdrawalsAction

Static method newTreasuryWithdrawalsAction of GovAction

**Signature**

```ts
export declare const newTreasuryWithdrawalsAction: (
  withdrawal: CML.MapRewardAccountToCoin,
  policyHash: CML.ScriptHash,
) => Effect.Effect<CML.GovAction, GovActionError>;
```

Added in v2.0.0

## newUpdateCommittee

Static method newUpdateCommittee of GovAction

**Signature**

```ts
export declare const newUpdateCommittee: (
  actionId: CML.GovActionId | undefined,
  coldCredentials: CML.CommitteeColdCredentialList,
  credentials: CML.MapCommitteeColdCredentialToEpoch,
  unitInterval: CML.UnitInterval,
) => Effect.Effect<CML.GovAction, GovActionError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## fromCborBytesUnsafe

Unsafely calls GovAction.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (
  cborBytes: Uint8Array,
) => CML.GovAction;
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls GovAction.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.GovAction;
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls GovAction.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.GovAction;
```

Added in v2.0.0

## newHardForkInitiationActionUnsafe

Unsafely calls GovAction.newHardForkInitiationAction without Effect wrapper

**Signature**

```ts
export declare const newHardForkInitiationActionUnsafe: (
  actionId: CML.GovActionId | undefined,
  version: CML.ProtocolVersion,
) => CML.GovAction;
```

Added in v2.0.0

## newInfoActionUnsafe

Unsafely calls GovAction.newInfoAction without Effect wrapper

**Signature**

```ts
export declare const newInfoActionUnsafe: () => CML.GovAction;
```

Added in v2.0.0

## newNewConstitutionUnsafe

Unsafely calls GovAction.newNewConstitution without Effect wrapper

**Signature**

```ts
export declare const newNewConstitutionUnsafe: (
  actionId: CML.GovActionId | undefined,
  constitution: CML.Constitution,
) => CML.GovAction;
```

Added in v2.0.0

## newNoConfidenceUnsafe

Unsafely calls GovAction.newNoConfidence without Effect wrapper

**Signature**

```ts
export declare const newNoConfidenceUnsafe: (
  actionId: CML.GovActionId,
) => CML.GovAction;
```

Added in v2.0.0

## newParameterChangeActionUnsafe

Unsafely calls GovAction.newParameterChangeAction without Effect wrapper

**Signature**

```ts
export declare const newParameterChangeActionUnsafe: (
  actionId: CML.GovActionId | undefined,
  update: CML.ProtocolParamUpdate,
  policyHash: CML.ScriptHash,
) => CML.GovAction;
```

Added in v2.0.0

## newTreasuryWithdrawalsActionUnsafe

Unsafely calls GovAction.newTreasuryWithdrawalsAction without Effect wrapper

**Signature**

```ts
export declare const newTreasuryWithdrawalsActionUnsafe: (
  withdrawal: CML.MapRewardAccountToCoin,
  policyHash: CML.ScriptHash,
) => CML.GovAction;
```

Added in v2.0.0

## newUpdateCommitteeUnsafe

Unsafely calls GovAction.newUpdateCommittee without Effect wrapper

**Signature**

```ts
export declare const newUpdateCommitteeUnsafe: (
  actionId: CML.GovActionId | undefined,
  coldCredentials: CML.CommitteeColdCredentialList,
  credentials: CML.MapCommitteeColdCredentialToEpoch,
  unitInterval: CML.UnitInterval,
) => CML.GovAction;
```

Added in v2.0.0

# Errors

## GovActionError (class)

Error class for GovAction operations

This error is thrown when operations on GovAction instances fail.

**Signature**

```ts
export declare class GovActionError
```

Added in v2.0.0

# Methods

## asHardForkInitiationAction

Method asHardForkInitiationAction of GovAction

**Signature**

```ts
export declare const asHardForkInitiationAction: (
  instance: CML.GovAction,
) => Effect.Effect<CML.HardForkInitiationAction | undefined, GovActionError>;
```

Added in v2.0.0

## asNewConstitution

Method asNewConstitution of GovAction

**Signature**

```ts
export declare const asNewConstitution: (
  instance: CML.GovAction,
) => Effect.Effect<CML.NewConstitution | undefined, GovActionError>;
```

Added in v2.0.0

## asNoConfidence

Method asNoConfidence of GovAction

**Signature**

```ts
export declare const asNoConfidence: (
  instance: CML.GovAction,
) => Effect.Effect<CML.NoConfidence | undefined, GovActionError>;
```

Added in v2.0.0

## asParameterChangeAction

Method asParameterChangeAction of GovAction

**Signature**

```ts
export declare const asParameterChangeAction: (
  instance: CML.GovAction,
) => Effect.Effect<CML.ParameterChangeAction | undefined, GovActionError>;
```

Added in v2.0.0

## asTreasuryWithdrawalsAction

Method asTreasuryWithdrawalsAction of GovAction

**Signature**

```ts
export declare const asTreasuryWithdrawalsAction: (
  instance: CML.GovAction,
) => Effect.Effect<CML.TreasuryWithdrawalsAction | undefined, GovActionError>;
```

Added in v2.0.0

## asUpdateCommittee

Method asUpdateCommittee of GovAction

**Signature**

```ts
export declare const asUpdateCommittee: (
  instance: CML.GovAction,
) => Effect.Effect<CML.UpdateCommittee | undefined, GovActionError>;
```

Added in v2.0.0

## free

Method free of GovAction

**Signature**

```ts
export declare const free: (
  instance: CML.GovAction,
) => Effect.Effect<void, GovActionError>;
```

Added in v2.0.0

## kind

Method kind of GovAction

**Signature**

```ts
export declare const kind: (
  instance: CML.GovAction,
) => Effect.Effect<CML.GovActionKind, GovActionError>;
```

Added in v2.0.0

## scriptHash

Method scriptHash of GovAction

**Signature**

```ts
export declare const scriptHash: (
  instance: CML.GovAction,
) => Effect.Effect<CML.ScriptHash | undefined, GovActionError>;
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of GovAction

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.GovAction,
) => Effect.Effect<Uint8Array, GovActionError>;
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of GovAction

**Signature**

```ts
export declare const toCanonicalCborHex: (
  instance: CML.GovAction,
) => Effect.Effect<string, GovActionError>;
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of GovAction

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.GovAction,
) => Effect.Effect<Uint8Array, GovActionError>;
```

Added in v2.0.0

## toCborHex

Method toCborHex of GovAction

**Signature**

```ts
export declare const toCborHex: (
  instance: CML.GovAction,
) => Effect.Effect<string, GovActionError>;
```

Added in v2.0.0

## toJsValue

Method toJsValue of GovAction

**Signature**

```ts
export declare const toJsValue: (
  instance: CML.GovAction,
) => Effect.Effect<any, GovActionError>;
```

Added in v2.0.0

## toJson

Method toJson of GovAction

**Signature**

```ts
export declare const toJson: (
  instance: CML.GovAction,
) => Effect.Effect<string, GovActionError>;
```

Added in v2.0.0

# MethodsUnsafe

## asHardForkInitiationActionUnsafe

Unsafely calls instance.asHardForkInitiationAction without Effect wrapper

**Signature**

```ts
export declare const asHardForkInitiationActionUnsafe: (
  instance: CML.GovAction,
) => CML.HardForkInitiationAction | undefined;
```

Added in v2.0.0

## asNewConstitutionUnsafe

Unsafely calls instance.asNewConstitution without Effect wrapper

**Signature**

```ts
export declare const asNewConstitutionUnsafe: (
  instance: CML.GovAction,
) => CML.NewConstitution | undefined;
```

Added in v2.0.0

## asNoConfidenceUnsafe

Unsafely calls instance.asNoConfidence without Effect wrapper

**Signature**

```ts
export declare const asNoConfidenceUnsafe: (
  instance: CML.GovAction,
) => CML.NoConfidence | undefined;
```

Added in v2.0.0

## asParameterChangeActionUnsafe

Unsafely calls instance.asParameterChangeAction without Effect wrapper

**Signature**

```ts
export declare const asParameterChangeActionUnsafe: (
  instance: CML.GovAction,
) => CML.ParameterChangeAction | undefined;
```

Added in v2.0.0

## asTreasuryWithdrawalsActionUnsafe

Unsafely calls instance.asTreasuryWithdrawalsAction without Effect wrapper

**Signature**

```ts
export declare const asTreasuryWithdrawalsActionUnsafe: (
  instance: CML.GovAction,
) => CML.TreasuryWithdrawalsAction | undefined;
```

Added in v2.0.0

## asUpdateCommitteeUnsafe

Unsafely calls instance.asUpdateCommittee without Effect wrapper

**Signature**

```ts
export declare const asUpdateCommitteeUnsafe: (
  instance: CML.GovAction,
) => CML.UpdateCommittee | undefined;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.GovAction) => void;
```

Added in v2.0.0

## kindUnsafe

Unsafely calls instance.kind without Effect wrapper

**Signature**

```ts
export declare const kindUnsafe: (instance: CML.GovAction) => CML.GovActionKind;
```

Added in v2.0.0

## scriptHashUnsafe

Unsafely calls instance.scriptHash without Effect wrapper

**Signature**

```ts
export declare const scriptHashUnsafe: (
  instance: CML.GovAction,
) => CML.ScriptHash | undefined;
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (
  instance: CML.GovAction,
) => Uint8Array;
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (
  instance: CML.GovAction,
) => string;
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (instance: CML.GovAction) => Uint8Array;
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.GovAction) => string;
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.GovAction) => any;
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.GovAction) => string;
```

Added in v2.0.0

# Types

## GovAction (type alias)

Type alias for the CML GovAction class

**Signature**

```ts
export type GovAction = CML.GovAction;
```

Added in v2.0.0
