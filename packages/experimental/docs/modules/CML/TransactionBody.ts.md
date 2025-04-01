---
title: CML/TransactionBody.ts
nav_order: 221
parent: Modules
---

## TransactionBody overview

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
  - [TransactionBodyError (class)](#transactionbodyerror-class)
- [Methods](#methods)
  - [auxiliaryDataHash](#auxiliarydatahash)
  - [certs](#certs)
  - [collateralInputs](#collateralinputs)
  - [collateralReturn](#collateralreturn)
  - [currentTreasuryValue](#currenttreasuryvalue)
  - [donation](#donation)
  - [fee](#fee)
  - [free](#free)
  - [inputs](#inputs)
  - [mint](#mint)
  - [networkId](#networkid)
  - [outputs](#outputs)
  - [proposalProcedures](#proposalprocedures)
  - [referenceInputs](#referenceinputs)
  - [requiredSigners](#requiredsigners)
  - [scriptDataHash](#scriptdatahash)
  - [setAuxiliaryDataHash](#setauxiliarydatahash)
  - [setCerts](#setcerts)
  - [setCollateralInputs](#setcollateralinputs)
  - [setCollateralReturn](#setcollateralreturn)
  - [setCurrentTreasuryValue](#setcurrenttreasuryvalue)
  - [setDonation](#setdonation)
  - [setMint](#setmint)
  - [setNetworkId](#setnetworkid)
  - [setProposalProcedures](#setproposalprocedures)
  - [setReferenceInputs](#setreferenceinputs)
  - [setRequiredSigners](#setrequiredsigners)
  - [setScriptDataHash](#setscriptdatahash)
  - [setTotalCollateral](#settotalcollateral)
  - [setTtl](#setttl)
  - [setValidityIntervalStart](#setvalidityintervalstart)
  - [setVotingProcedures](#setvotingprocedures)
  - [setWithdrawals](#setwithdrawals)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
  - [totalCollateral](#totalcollateral)
  - [ttl](#ttl)
  - [validityIntervalStart](#validityintervalstart)
  - [votingProcedures](#votingprocedures)
  - [withdrawals](#withdrawals)
- [MethodsUnsafe](#methodsunsafe)
  - [auxiliaryDataHashUnsafe](#auxiliarydatahashunsafe)
  - [certsUnsafe](#certsunsafe)
  - [collateralInputsUnsafe](#collateralinputsunsafe)
  - [collateralReturnUnsafe](#collateralreturnunsafe)
  - [currentTreasuryValueUnsafe](#currenttreasuryvalueunsafe)
  - [donationUnsafe](#donationunsafe)
  - [feeUnsafe](#feeunsafe)
  - [freeUnsafe](#freeunsafe)
  - [inputsUnsafe](#inputsunsafe)
  - [mintUnsafe](#mintunsafe)
  - [networkIdUnsafe](#networkidunsafe)
  - [outputsUnsafe](#outputsunsafe)
  - [proposalProceduresUnsafe](#proposalproceduresunsafe)
  - [referenceInputsUnsafe](#referenceinputsunsafe)
  - [requiredSignersUnsafe](#requiredsignersunsafe)
  - [scriptDataHashUnsafe](#scriptdatahashunsafe)
  - [setAuxiliaryDataHashUnsafe](#setauxiliarydatahashunsafe)
  - [setCertsUnsafe](#setcertsunsafe)
  - [setCollateralInputsUnsafe](#setcollateralinputsunsafe)
  - [setCollateralReturnUnsafe](#setcollateralreturnunsafe)
  - [setCurrentTreasuryValueUnsafe](#setcurrenttreasuryvalueunsafe)
  - [setDonationUnsafe](#setdonationunsafe)
  - [setMintUnsafe](#setmintunsafe)
  - [setNetworkIdUnsafe](#setnetworkidunsafe)
  - [setProposalProceduresUnsafe](#setproposalproceduresunsafe)
  - [setReferenceInputsUnsafe](#setreferenceinputsunsafe)
  - [setRequiredSignersUnsafe](#setrequiredsignersunsafe)
  - [setScriptDataHashUnsafe](#setscriptdatahashunsafe)
  - [setTotalCollateralUnsafe](#settotalcollateralunsafe)
  - [setTtlUnsafe](#setttlunsafe)
  - [setValidityIntervalStartUnsafe](#setvalidityintervalstartunsafe)
  - [setVotingProceduresUnsafe](#setvotingproceduresunsafe)
  - [setWithdrawalsUnsafe](#setwithdrawalsunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
  - [totalCollateralUnsafe](#totalcollateralunsafe)
  - [ttlUnsafe](#ttlunsafe)
  - [validityIntervalStartUnsafe](#validityintervalstartunsafe)
  - [votingProceduresUnsafe](#votingproceduresunsafe)
  - [withdrawalsUnsafe](#withdrawalsunsafe)
- [Types](#types)
  - [TransactionBody (type alias)](#transactionbody-type-alias)

---

# Constructors

## \_new

Static method \_new of TransactionBody

**Signature**

```ts
export declare const _new: (
  inputs: CML.TransactionInputList,
  outputs: CML.TransactionOutputList,
  fee: bigint
) => Effect.Effect<CML.TransactionBody, TransactionBodyError>
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of TransactionBody

**Signature**

```ts
export declare const fromCborBytes: (cborBytes: Uint8Array) => Effect.Effect<CML.TransactionBody, TransactionBodyError>
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of TransactionBody

**Signature**

```ts
export declare const fromCborHex: (cborBytes: string) => Effect.Effect<CML.TransactionBody, TransactionBodyError>
```

Added in v2.0.0

## fromJson

Static method fromJson of TransactionBody

**Signature**

```ts
export declare const fromJson: (json: string) => Effect.Effect<CML.TransactionBody, TransactionBodyError>
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls TransactionBody.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (
  inputs: CML.TransactionInputList,
  outputs: CML.TransactionOutputList,
  fee: bigint
) => CML.TransactionBody
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls TransactionBody.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (cborBytes: Uint8Array) => CML.TransactionBody
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls TransactionBody.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.TransactionBody
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls TransactionBody.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.TransactionBody
```

Added in v2.0.0

# Errors

## TransactionBodyError (class)

Error class for TransactionBody operations

This error is thrown when operations on TransactionBody instances fail.

**Signature**

```ts
export declare class TransactionBodyError
```

Added in v2.0.0

# Methods

## auxiliaryDataHash

Method auxiliaryDataHash of TransactionBody

**Signature**

```ts
export declare const auxiliaryDataHash: (
  instance: CML.TransactionBody
) => Effect.Effect<CML.AuxiliaryDataHash | undefined, TransactionBodyError>
```

Added in v2.0.0

## certs

Method certs of TransactionBody

**Signature**

```ts
export declare const certs: (
  instance: CML.TransactionBody
) => Effect.Effect<CML.CertificateList | undefined, TransactionBodyError>
```

Added in v2.0.0

## collateralInputs

Method collateralInputs of TransactionBody

**Signature**

```ts
export declare const collateralInputs: (
  instance: CML.TransactionBody
) => Effect.Effect<CML.TransactionInputList | undefined, TransactionBodyError>
```

Added in v2.0.0

## collateralReturn

Method collateralReturn of TransactionBody

**Signature**

```ts
export declare const collateralReturn: (
  instance: CML.TransactionBody
) => Effect.Effect<CML.TransactionOutput | undefined, TransactionBodyError>
```

Added in v2.0.0

## currentTreasuryValue

Method currentTreasuryValue of TransactionBody

**Signature**

```ts
export declare const currentTreasuryValue: (
  instance: CML.TransactionBody
) => Effect.Effect<bigint | undefined, TransactionBodyError>
```

Added in v2.0.0

## donation

Method donation of TransactionBody

**Signature**

```ts
export declare const donation: (
  instance: CML.TransactionBody
) => Effect.Effect<bigint | undefined, TransactionBodyError>
```

Added in v2.0.0

## fee

Method fee of TransactionBody

**Signature**

```ts
export declare const fee: (instance: CML.TransactionBody) => Effect.Effect<bigint, TransactionBodyError>
```

Added in v2.0.0

## free

Method free of TransactionBody

**Signature**

```ts
export declare const free: (instance: CML.TransactionBody) => Effect.Effect<void, TransactionBodyError>
```

Added in v2.0.0

## inputs

Method inputs of TransactionBody

**Signature**

```ts
export declare const inputs: (
  instance: CML.TransactionBody
) => Effect.Effect<CML.TransactionInputList, TransactionBodyError>
```

Added in v2.0.0

## mint

Method mint of TransactionBody

**Signature**

```ts
export declare const mint: (instance: CML.TransactionBody) => Effect.Effect<CML.Mint | undefined, TransactionBodyError>
```

Added in v2.0.0

## networkId

Method networkId of TransactionBody

**Signature**

```ts
export declare const networkId: (
  instance: CML.TransactionBody
) => Effect.Effect<CML.NetworkId | undefined, TransactionBodyError>
```

Added in v2.0.0

## outputs

Method outputs of TransactionBody

**Signature**

```ts
export declare const outputs: (
  instance: CML.TransactionBody
) => Effect.Effect<CML.TransactionOutputList, TransactionBodyError>
```

Added in v2.0.0

## proposalProcedures

Method proposalProcedures of TransactionBody

**Signature**

```ts
export declare const proposalProcedures: (
  instance: CML.TransactionBody
) => Effect.Effect<CML.ProposalProcedureList | undefined, TransactionBodyError>
```

Added in v2.0.0

## referenceInputs

Method referenceInputs of TransactionBody

**Signature**

```ts
export declare const referenceInputs: (
  instance: CML.TransactionBody
) => Effect.Effect<CML.TransactionInputList | undefined, TransactionBodyError>
```

Added in v2.0.0

## requiredSigners

Method requiredSigners of TransactionBody

**Signature**

```ts
export declare const requiredSigners: (
  instance: CML.TransactionBody
) => Effect.Effect<CML.Ed25519KeyHashList | undefined, TransactionBodyError>
```

Added in v2.0.0

## scriptDataHash

Method scriptDataHash of TransactionBody

**Signature**

```ts
export declare const scriptDataHash: (
  instance: CML.TransactionBody
) => Effect.Effect<CML.ScriptDataHash | undefined, TransactionBodyError>
```

Added in v2.0.0

## setAuxiliaryDataHash

Method setAuxiliaryDataHash of TransactionBody

**Signature**

```ts
export declare const setAuxiliaryDataHash: (
  instance: CML.TransactionBody,
  auxiliaryDataHash: CML.AuxiliaryDataHash
) => Effect.Effect<void, TransactionBodyError>
```

Added in v2.0.0

## setCerts

Method setCerts of TransactionBody

**Signature**

```ts
export declare const setCerts: (
  instance: CML.TransactionBody,
  certs: CML.CertificateList
) => Effect.Effect<void, TransactionBodyError>
```

Added in v2.0.0

## setCollateralInputs

Method setCollateralInputs of TransactionBody

**Signature**

```ts
export declare const setCollateralInputs: (
  instance: CML.TransactionBody,
  collateralInputs: CML.TransactionInputList
) => Effect.Effect<void, TransactionBodyError>
```

Added in v2.0.0

## setCollateralReturn

Method setCollateralReturn of TransactionBody

**Signature**

```ts
export declare const setCollateralReturn: (
  instance: CML.TransactionBody,
  collateralReturn: CML.TransactionOutput
) => Effect.Effect<void, TransactionBodyError>
```

Added in v2.0.0

## setCurrentTreasuryValue

Method setCurrentTreasuryValue of TransactionBody

**Signature**

```ts
export declare const setCurrentTreasuryValue: (
  instance: CML.TransactionBody,
  currentTreasuryValue: bigint
) => Effect.Effect<void, TransactionBodyError>
```

Added in v2.0.0

## setDonation

Method setDonation of TransactionBody

**Signature**

```ts
export declare const setDonation: (
  instance: CML.TransactionBody,
  donation: bigint
) => Effect.Effect<void, TransactionBodyError>
```

Added in v2.0.0

## setMint

Method setMint of TransactionBody

**Signature**

```ts
export declare const setMint: (
  instance: CML.TransactionBody,
  mint: CML.Mint
) => Effect.Effect<void, TransactionBodyError>
```

Added in v2.0.0

## setNetworkId

Method setNetworkId of TransactionBody

**Signature**

```ts
export declare const setNetworkId: (
  instance: CML.TransactionBody,
  networkId: CML.NetworkId
) => Effect.Effect<void, TransactionBodyError>
```

Added in v2.0.0

## setProposalProcedures

Method setProposalProcedures of TransactionBody

**Signature**

```ts
export declare const setProposalProcedures: (
  instance: CML.TransactionBody,
  proposalProcedures: CML.ProposalProcedureList
) => Effect.Effect<void, TransactionBodyError>
```

Added in v2.0.0

## setReferenceInputs

Method setReferenceInputs of TransactionBody

**Signature**

```ts
export declare const setReferenceInputs: (
  instance: CML.TransactionBody,
  referenceInputs: CML.TransactionInputList
) => Effect.Effect<void, TransactionBodyError>
```

Added in v2.0.0

## setRequiredSigners

Method setRequiredSigners of TransactionBody

**Signature**

```ts
export declare const setRequiredSigners: (
  instance: CML.TransactionBody,
  requiredSigners: CML.Ed25519KeyHashList
) => Effect.Effect<void, TransactionBodyError>
```

Added in v2.0.0

## setScriptDataHash

Method setScriptDataHash of TransactionBody

**Signature**

```ts
export declare const setScriptDataHash: (
  instance: CML.TransactionBody,
  scriptDataHash: CML.ScriptDataHash
) => Effect.Effect<void, TransactionBodyError>
```

Added in v2.0.0

## setTotalCollateral

Method setTotalCollateral of TransactionBody

**Signature**

```ts
export declare const setTotalCollateral: (
  instance: CML.TransactionBody,
  totalCollateral: bigint
) => Effect.Effect<void, TransactionBodyError>
```

Added in v2.0.0

## setTtl

Method setTtl of TransactionBody

**Signature**

```ts
export declare const setTtl: (instance: CML.TransactionBody, ttl: bigint) => Effect.Effect<void, TransactionBodyError>
```

Added in v2.0.0

## setValidityIntervalStart

Method setValidityIntervalStart of TransactionBody

**Signature**

```ts
export declare const setValidityIntervalStart: (
  instance: CML.TransactionBody,
  validityIntervalStart: bigint
) => Effect.Effect<void, TransactionBodyError>
```

Added in v2.0.0

## setVotingProcedures

Method setVotingProcedures of TransactionBody

**Signature**

```ts
export declare const setVotingProcedures: (
  instance: CML.TransactionBody,
  votingProcedures: CML.VotingProcedures
) => Effect.Effect<void, TransactionBodyError>
```

Added in v2.0.0

## setWithdrawals

Method setWithdrawals of TransactionBody

**Signature**

```ts
export declare const setWithdrawals: (
  instance: CML.TransactionBody,
  withdrawals: CML.MapRewardAccountToCoin
) => Effect.Effect<void, TransactionBodyError>
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of TransactionBody

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.TransactionBody
) => Effect.Effect<Uint8Array, TransactionBodyError>
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of TransactionBody

**Signature**

```ts
export declare const toCanonicalCborHex: (instance: CML.TransactionBody) => Effect.Effect<string, TransactionBodyError>
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of TransactionBody

**Signature**

```ts
export declare const toCborBytes: (instance: CML.TransactionBody) => Effect.Effect<Uint8Array, TransactionBodyError>
```

Added in v2.0.0

## toCborHex

Method toCborHex of TransactionBody

**Signature**

```ts
export declare const toCborHex: (instance: CML.TransactionBody) => Effect.Effect<string, TransactionBodyError>
```

Added in v2.0.0

## toJsValue

Method toJsValue of TransactionBody

**Signature**

```ts
export declare const toJsValue: (instance: CML.TransactionBody) => Effect.Effect<any, TransactionBodyError>
```

Added in v2.0.0

## toJson

Method toJson of TransactionBody

**Signature**

```ts
export declare const toJson: (instance: CML.TransactionBody) => Effect.Effect<string, TransactionBodyError>
```

Added in v2.0.0

## totalCollateral

Method totalCollateral of TransactionBody

**Signature**

```ts
export declare const totalCollateral: (
  instance: CML.TransactionBody
) => Effect.Effect<bigint | undefined, TransactionBodyError>
```

Added in v2.0.0

## ttl

Method ttl of TransactionBody

**Signature**

```ts
export declare const ttl: (instance: CML.TransactionBody) => Effect.Effect<bigint | undefined, TransactionBodyError>
```

Added in v2.0.0

## validityIntervalStart

Method validityIntervalStart of TransactionBody

**Signature**

```ts
export declare const validityIntervalStart: (
  instance: CML.TransactionBody
) => Effect.Effect<bigint | undefined, TransactionBodyError>
```

Added in v2.0.0

## votingProcedures

Method votingProcedures of TransactionBody

**Signature**

```ts
export declare const votingProcedures: (
  instance: CML.TransactionBody
) => Effect.Effect<CML.VotingProcedures | undefined, TransactionBodyError>
```

Added in v2.0.0

## withdrawals

Method withdrawals of TransactionBody

**Signature**

```ts
export declare const withdrawals: (
  instance: CML.TransactionBody
) => Effect.Effect<CML.MapRewardAccountToCoin | undefined, TransactionBodyError>
```

Added in v2.0.0

# MethodsUnsafe

## auxiliaryDataHashUnsafe

Unsafely calls instance.auxiliaryDataHash without Effect wrapper

**Signature**

```ts
export declare const auxiliaryDataHashUnsafe: (instance: CML.TransactionBody) => CML.AuxiliaryDataHash | undefined
```

Added in v2.0.0

## certsUnsafe

Unsafely calls instance.certs without Effect wrapper

**Signature**

```ts
export declare const certsUnsafe: (instance: CML.TransactionBody) => CML.CertificateList | undefined
```

Added in v2.0.0

## collateralInputsUnsafe

Unsafely calls instance.collateralInputs without Effect wrapper

**Signature**

```ts
export declare const collateralInputsUnsafe: (instance: CML.TransactionBody) => CML.TransactionInputList | undefined
```

Added in v2.0.0

## collateralReturnUnsafe

Unsafely calls instance.collateralReturn without Effect wrapper

**Signature**

```ts
export declare const collateralReturnUnsafe: (instance: CML.TransactionBody) => CML.TransactionOutput | undefined
```

Added in v2.0.0

## currentTreasuryValueUnsafe

Unsafely calls instance.currentTreasuryValue without Effect wrapper

**Signature**

```ts
export declare const currentTreasuryValueUnsafe: (instance: CML.TransactionBody) => bigint | undefined
```

Added in v2.0.0

## donationUnsafe

Unsafely calls instance.donation without Effect wrapper

**Signature**

```ts
export declare const donationUnsafe: (instance: CML.TransactionBody) => bigint | undefined
```

Added in v2.0.0

## feeUnsafe

Unsafely calls instance.fee without Effect wrapper

**Signature**

```ts
export declare const feeUnsafe: (instance: CML.TransactionBody) => bigint
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.TransactionBody) => void
```

Added in v2.0.0

## inputsUnsafe

Unsafely calls instance.inputs without Effect wrapper

**Signature**

```ts
export declare const inputsUnsafe: (instance: CML.TransactionBody) => CML.TransactionInputList
```

Added in v2.0.0

## mintUnsafe

Unsafely calls instance.mint without Effect wrapper

**Signature**

```ts
export declare const mintUnsafe: (instance: CML.TransactionBody) => CML.Mint | undefined
```

Added in v2.0.0

## networkIdUnsafe

Unsafely calls instance.networkId without Effect wrapper

**Signature**

```ts
export declare const networkIdUnsafe: (instance: CML.TransactionBody) => CML.NetworkId | undefined
```

Added in v2.0.0

## outputsUnsafe

Unsafely calls instance.outputs without Effect wrapper

**Signature**

```ts
export declare const outputsUnsafe: (instance: CML.TransactionBody) => CML.TransactionOutputList
```

Added in v2.0.0

## proposalProceduresUnsafe

Unsafely calls instance.proposalProcedures without Effect wrapper

**Signature**

```ts
export declare const proposalProceduresUnsafe: (instance: CML.TransactionBody) => CML.ProposalProcedureList | undefined
```

Added in v2.0.0

## referenceInputsUnsafe

Unsafely calls instance.referenceInputs without Effect wrapper

**Signature**

```ts
export declare const referenceInputsUnsafe: (instance: CML.TransactionBody) => CML.TransactionInputList | undefined
```

Added in v2.0.0

## requiredSignersUnsafe

Unsafely calls instance.requiredSigners without Effect wrapper

**Signature**

```ts
export declare const requiredSignersUnsafe: (instance: CML.TransactionBody) => CML.Ed25519KeyHashList | undefined
```

Added in v2.0.0

## scriptDataHashUnsafe

Unsafely calls instance.scriptDataHash without Effect wrapper

**Signature**

```ts
export declare const scriptDataHashUnsafe: (instance: CML.TransactionBody) => CML.ScriptDataHash | undefined
```

Added in v2.0.0

## setAuxiliaryDataHashUnsafe

Unsafely calls instance.setAuxiliaryDataHash without Effect wrapper

**Signature**

```ts
export declare const setAuxiliaryDataHashUnsafe: (
  instance: CML.TransactionBody,
  auxiliaryDataHash: CML.AuxiliaryDataHash
) => void
```

Added in v2.0.0

## setCertsUnsafe

Unsafely calls instance.setCerts without Effect wrapper

**Signature**

```ts
export declare const setCertsUnsafe: (instance: CML.TransactionBody, certs: CML.CertificateList) => void
```

Added in v2.0.0

## setCollateralInputsUnsafe

Unsafely calls instance.setCollateralInputs without Effect wrapper

**Signature**

```ts
export declare const setCollateralInputsUnsafe: (
  instance: CML.TransactionBody,
  collateralInputs: CML.TransactionInputList
) => void
```

Added in v2.0.0

## setCollateralReturnUnsafe

Unsafely calls instance.setCollateralReturn without Effect wrapper

**Signature**

```ts
export declare const setCollateralReturnUnsafe: (
  instance: CML.TransactionBody,
  collateralReturn: CML.TransactionOutput
) => void
```

Added in v2.0.0

## setCurrentTreasuryValueUnsafe

Unsafely calls instance.setCurrentTreasuryValue without Effect wrapper

**Signature**

```ts
export declare const setCurrentTreasuryValueUnsafe: (
  instance: CML.TransactionBody,
  currentTreasuryValue: bigint
) => void
```

Added in v2.0.0

## setDonationUnsafe

Unsafely calls instance.setDonation without Effect wrapper

**Signature**

```ts
export declare const setDonationUnsafe: (instance: CML.TransactionBody, donation: bigint) => void
```

Added in v2.0.0

## setMintUnsafe

Unsafely calls instance.setMint without Effect wrapper

**Signature**

```ts
export declare const setMintUnsafe: (instance: CML.TransactionBody, mint: CML.Mint) => void
```

Added in v2.0.0

## setNetworkIdUnsafe

Unsafely calls instance.setNetworkId without Effect wrapper

**Signature**

```ts
export declare const setNetworkIdUnsafe: (instance: CML.TransactionBody, networkId: CML.NetworkId) => void
```

Added in v2.0.0

## setProposalProceduresUnsafe

Unsafely calls instance.setProposalProcedures without Effect wrapper

**Signature**

```ts
export declare const setProposalProceduresUnsafe: (
  instance: CML.TransactionBody,
  proposalProcedures: CML.ProposalProcedureList
) => void
```

Added in v2.0.0

## setReferenceInputsUnsafe

Unsafely calls instance.setReferenceInputs without Effect wrapper

**Signature**

```ts
export declare const setReferenceInputsUnsafe: (
  instance: CML.TransactionBody,
  referenceInputs: CML.TransactionInputList
) => void
```

Added in v2.0.0

## setRequiredSignersUnsafe

Unsafely calls instance.setRequiredSigners without Effect wrapper

**Signature**

```ts
export declare const setRequiredSignersUnsafe: (
  instance: CML.TransactionBody,
  requiredSigners: CML.Ed25519KeyHashList
) => void
```

Added in v2.0.0

## setScriptDataHashUnsafe

Unsafely calls instance.setScriptDataHash without Effect wrapper

**Signature**

```ts
export declare const setScriptDataHashUnsafe: (
  instance: CML.TransactionBody,
  scriptDataHash: CML.ScriptDataHash
) => void
```

Added in v2.0.0

## setTotalCollateralUnsafe

Unsafely calls instance.setTotalCollateral without Effect wrapper

**Signature**

```ts
export declare const setTotalCollateralUnsafe: (instance: CML.TransactionBody, totalCollateral: bigint) => void
```

Added in v2.0.0

## setTtlUnsafe

Unsafely calls instance.setTtl without Effect wrapper

**Signature**

```ts
export declare const setTtlUnsafe: (instance: CML.TransactionBody, ttl: bigint) => void
```

Added in v2.0.0

## setValidityIntervalStartUnsafe

Unsafely calls instance.setValidityIntervalStart without Effect wrapper

**Signature**

```ts
export declare const setValidityIntervalStartUnsafe: (
  instance: CML.TransactionBody,
  validityIntervalStart: bigint
) => void
```

Added in v2.0.0

## setVotingProceduresUnsafe

Unsafely calls instance.setVotingProcedures without Effect wrapper

**Signature**

```ts
export declare const setVotingProceduresUnsafe: (
  instance: CML.TransactionBody,
  votingProcedures: CML.VotingProcedures
) => void
```

Added in v2.0.0

## setWithdrawalsUnsafe

Unsafely calls instance.setWithdrawals without Effect wrapper

**Signature**

```ts
export declare const setWithdrawalsUnsafe: (
  instance: CML.TransactionBody,
  withdrawals: CML.MapRewardAccountToCoin
) => void
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (instance: CML.TransactionBody) => Uint8Array
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (instance: CML.TransactionBody) => string
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (instance: CML.TransactionBody) => Uint8Array
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.TransactionBody) => string
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.TransactionBody) => any
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.TransactionBody) => string
```

Added in v2.0.0

## totalCollateralUnsafe

Unsafely calls instance.totalCollateral without Effect wrapper

**Signature**

```ts
export declare const totalCollateralUnsafe: (instance: CML.TransactionBody) => bigint | undefined
```

Added in v2.0.0

## ttlUnsafe

Unsafely calls instance.ttl without Effect wrapper

**Signature**

```ts
export declare const ttlUnsafe: (instance: CML.TransactionBody) => bigint | undefined
```

Added in v2.0.0

## validityIntervalStartUnsafe

Unsafely calls instance.validityIntervalStart without Effect wrapper

**Signature**

```ts
export declare const validityIntervalStartUnsafe: (instance: CML.TransactionBody) => bigint | undefined
```

Added in v2.0.0

## votingProceduresUnsafe

Unsafely calls instance.votingProcedures without Effect wrapper

**Signature**

```ts
export declare const votingProceduresUnsafe: (instance: CML.TransactionBody) => CML.VotingProcedures | undefined
```

Added in v2.0.0

## withdrawalsUnsafe

Unsafely calls instance.withdrawals without Effect wrapper

**Signature**

```ts
export declare const withdrawalsUnsafe: (instance: CML.TransactionBody) => CML.MapRewardAccountToCoin | undefined
```

Added in v2.0.0

# Types

## TransactionBody (type alias)

Type alias for the CML TransactionBody class

**Signature**

```ts
export type TransactionBody = CML.TransactionBody
```

Added in v2.0.0
