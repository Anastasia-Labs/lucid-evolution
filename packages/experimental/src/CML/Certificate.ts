/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML Certificate class
 *
 * @since 2.0.0
 * @category Types
 */
export type Certificate = CML.Certificate;

/**
 * Error class for Certificate operations
 * 
 * This error is thrown when operations on Certificate instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class CertificateError extends Data.TaggedError("CertificateError")<{
  message?: string;
}> {}

/**
 * Method free of Certificate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.Certificate) => Effect.Effect<void, CertificateError> = Effect.fn(
  (instance: CML.Certificate) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new CertificateError({
          message: `Certificate.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.Certificate): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of Certificate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (instance: CML.Certificate) => Effect.Effect<Uint8Array, CertificateError> = Effect.fn(
  (instance: CML.Certificate) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new CertificateError({
          message: `Certificate.toCborBytes failed Certificate is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.Certificate): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of Certificate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (instance: CML.Certificate) => Effect.Effect<Uint8Array, CertificateError> = Effect.fn(
  (instance: CML.Certificate) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new CertificateError({
          message: `Certificate.toCanonicalCborBytes failed Certificate is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (instance: CML.Certificate): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of Certificate
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (cborBytes: Uint8Array) => Effect.Effect<CML.Certificate, CertificateError> = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.Certificate.from_cbor_bytes(cborBytes),
    catch: () => new CertificateError({
      message: `Certificate.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls Certificate.fromCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.Certificate =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of Certificate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (instance: CML.Certificate) => Effect.Effect<string, CertificateError> = Effect.fn(
  (instance: CML.Certificate) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new CertificateError({
          message: `Certificate.toCborHex failed Certificate is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.Certificate): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of Certificate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (instance: CML.Certificate) => Effect.Effect<string, CertificateError> = Effect.fn(
  (instance: CML.Certificate) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new CertificateError({
          message: `Certificate.toCanonicalCborHex failed Certificate is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.Certificate): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of Certificate
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (cborBytes: string) => Effect.Effect<CML.Certificate, CertificateError> = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.Certificate.from_cbor_hex(cborBytes),
    catch: () => new CertificateError({
      message: `Certificate.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls Certificate.fromCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.Certificate =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of Certificate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (instance: CML.Certificate) => Effect.Effect<string, CertificateError> = Effect.fn(
  (instance: CML.Certificate) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new CertificateError({
          message: `Certificate.toJson failed Certificate is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.Certificate): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of Certificate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (instance: CML.Certificate) => Effect.Effect<any, CertificateError> = Effect.fn(
  (instance: CML.Certificate) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new CertificateError({
          message: `Certificate.toJsValue failed Certificate is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.Certificate): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of Certificate
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (json: string) => Effect.Effect<CML.Certificate, CertificateError> = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.Certificate.from_json(json),
    catch: () => new CertificateError({
      message: `Certificate.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls Certificate.fromJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.Certificate =>
  Effect.runSync(fromJson(json));

/**
 * Static method newStakeRegistration of Certificate
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newStakeRegistration: (stakeCredential: CML.Credential) => Effect.Effect<CML.Certificate, CertificateError> = Effect.fn(function* (stakeCredential: CML.Credential) {
  return yield* Effect.try({
    try: () => CML.Certificate.new_stake_registration(stakeCredential),
    catch: () => new CertificateError({
      message: `Certificate.newStakeRegistration failed with parameters: ${stakeCredential} (Credential). Hint: Not all Certificate instances can be stringified.`,
    }),
  });
});

/**
 * Unsafely calls Certificate.newStakeRegistration without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newStakeRegistrationUnsafe = (stakeCredential: CML.Credential): CML.Certificate =>
  Effect.runSync(newStakeRegistration(stakeCredential));

/**
 * Static method newStakeDeregistration of Certificate
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newStakeDeregistration: (stakeCredential: CML.Credential) => Effect.Effect<CML.Certificate, CertificateError> = Effect.fn(function* (stakeCredential: CML.Credential) {
  return yield* Effect.try({
    try: () => CML.Certificate.new_stake_deregistration(stakeCredential),
    catch: () => new CertificateError({
      message: `Certificate.newStakeDeregistration failed with parameters: ${stakeCredential} (Credential). Hint: Not all Certificate instances can be stringified.`,
    }),
  });
});

/**
 * Unsafely calls Certificate.newStakeDeregistration without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newStakeDeregistrationUnsafe = (stakeCredential: CML.Credential): CML.Certificate =>
  Effect.runSync(newStakeDeregistration(stakeCredential));

/**
 * Static method newStakeDelegation of Certificate
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newStakeDelegation: (stakeCredential: CML.Credential, pool: CML.Ed25519KeyHash) => Effect.Effect<CML.Certificate, CertificateError> = Effect.fn(function* (stakeCredential: CML.Credential, pool: CML.Ed25519KeyHash) {
  return yield* Effect.try({
    try: () => CML.Certificate.new_stake_delegation(stakeCredential, pool),
    catch: () => new CertificateError({
      message: `Certificate.newStakeDelegation failed with parameters: ${stakeCredential} (Credential), ${pool} (Ed25519KeyHash). `,
    }),
  });
});

/**
 * Unsafely calls Certificate.newStakeDelegation without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newStakeDelegationUnsafe = (stakeCredential: CML.Credential, pool: CML.Ed25519KeyHash): CML.Certificate =>
  Effect.runSync(newStakeDelegation(stakeCredential, pool));

/**
 * Static method newPoolRegistration of Certificate
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newPoolRegistration: (poolParams: CML.PoolParams) => Effect.Effect<CML.Certificate, CertificateError> = Effect.fn(function* (poolParams: CML.PoolParams) {
  return yield* Effect.try({
    try: () => CML.Certificate.new_pool_registration(poolParams),
    catch: () => new CertificateError({
      message: `Certificate.newPoolRegistration failed with parameters: ${poolParams} (PoolParams). Hint: Not all Certificate instances can be stringified.`,
    }),
  });
});

/**
 * Unsafely calls Certificate.newPoolRegistration without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newPoolRegistrationUnsafe = (poolParams: CML.PoolParams): CML.Certificate =>
  Effect.runSync(newPoolRegistration(poolParams));

/**
 * Static method newPoolRetirement of Certificate
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newPoolRetirement: (pool: CML.Ed25519KeyHash, epoch: bigint) => Effect.Effect<CML.Certificate, CertificateError> = Effect.fn(function* (pool: CML.Ed25519KeyHash, epoch: bigint) {
  return yield* Effect.try({
    try: () => CML.Certificate.new_pool_retirement(pool, epoch),
    catch: () => new CertificateError({
      message: `Certificate.newPoolRetirement failed with parameters: ${pool} (Ed25519KeyHash), ${epoch}. `,
    }),
  });
});

/**
 * Unsafely calls Certificate.newPoolRetirement without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newPoolRetirementUnsafe = (pool: CML.Ed25519KeyHash, epoch: bigint): CML.Certificate =>
  Effect.runSync(newPoolRetirement(pool, epoch));

/**
 * Static method newRegCert of Certificate
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newRegCert: (stakeCredential: CML.Credential, deposit: bigint) => Effect.Effect<CML.Certificate, CertificateError> = Effect.fn(function* (stakeCredential: CML.Credential, deposit: bigint) {
  return yield* Effect.try({
    try: () => CML.Certificate.new_reg_cert(stakeCredential, deposit),
    catch: () => new CertificateError({
      message: `Certificate.newRegCert failed with parameters: ${stakeCredential} (Credential), ${deposit}. `,
    }),
  });
});

/**
 * Unsafely calls Certificate.newRegCert without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newRegCertUnsafe = (stakeCredential: CML.Credential, deposit: bigint): CML.Certificate =>
  Effect.runSync(newRegCert(stakeCredential, deposit));

/**
 * Static method newUnregCert of Certificate
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newUnregCert: (stakeCredential: CML.Credential, deposit: bigint) => Effect.Effect<CML.Certificate, CertificateError> = Effect.fn(function* (stakeCredential: CML.Credential, deposit: bigint) {
  return yield* Effect.try({
    try: () => CML.Certificate.new_unreg_cert(stakeCredential, deposit),
    catch: () => new CertificateError({
      message: `Certificate.newUnregCert failed with parameters: ${stakeCredential} (Credential), ${deposit}. `,
    }),
  });
});

/**
 * Unsafely calls Certificate.newUnregCert without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newUnregCertUnsafe = (stakeCredential: CML.Credential, deposit: bigint): CML.Certificate =>
  Effect.runSync(newUnregCert(stakeCredential, deposit));

/**
 * Static method newVoteDelegCert of Certificate
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newVoteDelegCert: (stakeCredential: CML.Credential, dRep: CML.DRep) => Effect.Effect<CML.Certificate, CertificateError> = Effect.fn(function* (stakeCredential: CML.Credential, dRep: CML.DRep) {
  return yield* Effect.try({
    try: () => CML.Certificate.new_vote_deleg_cert(stakeCredential, dRep),
    catch: () => new CertificateError({
      message: `Certificate.newVoteDelegCert failed with parameters: ${stakeCredential} (Credential), ${dRep} (DRep). `,
    }),
  });
});

/**
 * Unsafely calls Certificate.newVoteDelegCert without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newVoteDelegCertUnsafe = (stakeCredential: CML.Credential, dRep: CML.DRep): CML.Certificate =>
  Effect.runSync(newVoteDelegCert(stakeCredential, dRep));

/**
 * Static method newStakeVoteDelegCert of Certificate
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newStakeVoteDelegCert: (stakeCredential: CML.Credential, pool: CML.Ed25519KeyHash, dRep: CML.DRep) => Effect.Effect<CML.Certificate, CertificateError> = Effect.fn(function* (stakeCredential: CML.Credential, pool: CML.Ed25519KeyHash, dRep: CML.DRep) {
  return yield* Effect.try({
    try: () => CML.Certificate.new_stake_vote_deleg_cert(stakeCredential, pool, dRep),
    catch: () => new CertificateError({
      message: `Certificate.newStakeVoteDelegCert failed with parameters: ${stakeCredential} (Credential), ${pool} (Ed25519KeyHash), ${dRep} (DRep). `,
    }),
  });
});

/**
 * Unsafely calls Certificate.newStakeVoteDelegCert without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newStakeVoteDelegCertUnsafe = (stakeCredential: CML.Credential, pool: CML.Ed25519KeyHash, dRep: CML.DRep): CML.Certificate =>
  Effect.runSync(newStakeVoteDelegCert(stakeCredential, pool, dRep));

/**
 * Static method newStakeRegDelegCert of Certificate
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newStakeRegDelegCert: (stakeCredential: CML.Credential, pool: CML.Ed25519KeyHash, deposit: bigint) => Effect.Effect<CML.Certificate, CertificateError> = Effect.fn(function* (stakeCredential: CML.Credential, pool: CML.Ed25519KeyHash, deposit: bigint) {
  return yield* Effect.try({
    try: () => CML.Certificate.new_stake_reg_deleg_cert(stakeCredential, pool, deposit),
    catch: () => new CertificateError({
      message: `Certificate.newStakeRegDelegCert failed with parameters: ${stakeCredential} (Credential), ${pool} (Ed25519KeyHash), ${deposit}. `,
    }),
  });
});

/**
 * Unsafely calls Certificate.newStakeRegDelegCert without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newStakeRegDelegCertUnsafe = (stakeCredential: CML.Credential, pool: CML.Ed25519KeyHash, deposit: bigint): CML.Certificate =>
  Effect.runSync(newStakeRegDelegCert(stakeCredential, pool, deposit));

/**
 * Static method newVoteRegDelegCert of Certificate
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newVoteRegDelegCert: (stakeCredential: CML.Credential, dRep: CML.DRep, deposit: bigint) => Effect.Effect<CML.Certificate, CertificateError> = Effect.fn(function* (stakeCredential: CML.Credential, dRep: CML.DRep, deposit: bigint) {
  return yield* Effect.try({
    try: () => CML.Certificate.new_vote_reg_deleg_cert(stakeCredential, dRep, deposit),
    catch: () => new CertificateError({
      message: `Certificate.newVoteRegDelegCert failed with parameters: ${stakeCredential} (Credential), ${dRep} (DRep), ${deposit}. `,
    }),
  });
});

/**
 * Unsafely calls Certificate.newVoteRegDelegCert without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newVoteRegDelegCertUnsafe = (stakeCredential: CML.Credential, dRep: CML.DRep, deposit: bigint): CML.Certificate =>
  Effect.runSync(newVoteRegDelegCert(stakeCredential, dRep, deposit));

/**
 * Static method newStakeVoteRegDelegCert of Certificate
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newStakeVoteRegDelegCert: (stakeCredential: CML.Credential, pool: CML.Ed25519KeyHash, dRep: CML.DRep, deposit: bigint) => Effect.Effect<CML.Certificate, CertificateError> = Effect.fn(function* (stakeCredential: CML.Credential, pool: CML.Ed25519KeyHash, dRep: CML.DRep, deposit: bigint) {
  return yield* Effect.try({
    try: () => CML.Certificate.new_stake_vote_reg_deleg_cert(stakeCredential, pool, dRep, deposit),
    catch: () => new CertificateError({
      message: `Certificate.newStakeVoteRegDelegCert failed with parameters: ${stakeCredential} (Credential), ${pool} (Ed25519KeyHash), ${dRep} (DRep), ${deposit}. `,
    }),
  });
});

/**
 * Unsafely calls Certificate.newStakeVoteRegDelegCert without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newStakeVoteRegDelegCertUnsafe = (stakeCredential: CML.Credential, pool: CML.Ed25519KeyHash, dRep: CML.DRep, deposit: bigint): CML.Certificate =>
  Effect.runSync(newStakeVoteRegDelegCert(stakeCredential, pool, dRep, deposit));

/**
 * Static method newAuthCommitteeHotCert of Certificate
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newAuthCommitteeHotCert: (committeeColdCredential: CML.Credential, committeeHotCredential: CML.Credential) => Effect.Effect<CML.Certificate, CertificateError> = Effect.fn(function* (committeeColdCredential: CML.Credential, committeeHotCredential: CML.Credential) {
  return yield* Effect.try({
    try: () => CML.Certificate.new_auth_committee_hot_cert(committeeColdCredential, committeeHotCredential),
    catch: () => new CertificateError({
      message: `Certificate.newAuthCommitteeHotCert failed with parameters: ${committeeColdCredential} (Credential), ${committeeHotCredential} (Credential). `,
    }),
  });
});

/**
 * Unsafely calls Certificate.newAuthCommitteeHotCert without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newAuthCommitteeHotCertUnsafe = (committeeColdCredential: CML.Credential, committeeHotCredential: CML.Credential): CML.Certificate =>
  Effect.runSync(newAuthCommitteeHotCert(committeeColdCredential, committeeHotCredential));

/**
 * Static method newResignCommitteeColdCert of Certificate
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newResignCommitteeColdCert: (committeeColdCredential: CML.Credential, anchor: CML.Anchor) => Effect.Effect<CML.Certificate, CertificateError> = Effect.fn(function* (committeeColdCredential: CML.Credential, anchor: CML.Anchor) {
  return yield* Effect.try({
    try: () => CML.Certificate.new_resign_committee_cold_cert(committeeColdCredential, anchor),
    catch: () => new CertificateError({
      message: `Certificate.newResignCommitteeColdCert failed with parameters: ${committeeColdCredential} (Credential), ${anchor} (Anchor). `,
    }),
  });
});

/**
 * Unsafely calls Certificate.newResignCommitteeColdCert without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newResignCommitteeColdCertUnsafe = (committeeColdCredential: CML.Credential, anchor: CML.Anchor): CML.Certificate =>
  Effect.runSync(newResignCommitteeColdCert(committeeColdCredential, anchor));

/**
 * Static method newRegDrepCert of Certificate
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newRegDrepCert: (drepCredential: CML.Credential, deposit: bigint, anchor: CML.Anchor) => Effect.Effect<CML.Certificate, CertificateError> = Effect.fn(function* (drepCredential: CML.Credential, deposit: bigint, anchor: CML.Anchor) {
  return yield* Effect.try({
    try: () => CML.Certificate.new_reg_drep_cert(drepCredential, deposit, anchor),
    catch: () => new CertificateError({
      message: `Certificate.newRegDrepCert failed with parameters: ${drepCredential} (Credential), ${deposit}, ${anchor} (Anchor). `,
    }),
  });
});

/**
 * Unsafely calls Certificate.newRegDrepCert without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newRegDrepCertUnsafe = (drepCredential: CML.Credential, deposit: bigint, anchor: CML.Anchor): CML.Certificate =>
  Effect.runSync(newRegDrepCert(drepCredential, deposit, anchor));

/**
 * Static method newUnregDrepCert of Certificate
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newUnregDrepCert: (drepCredential: CML.Credential, deposit: bigint) => Effect.Effect<CML.Certificate, CertificateError> = Effect.fn(function* (drepCredential: CML.Credential, deposit: bigint) {
  return yield* Effect.try({
    try: () => CML.Certificate.new_unreg_drep_cert(drepCredential, deposit),
    catch: () => new CertificateError({
      message: `Certificate.newUnregDrepCert failed with parameters: ${drepCredential} (Credential), ${deposit}. `,
    }),
  });
});

/**
 * Unsafely calls Certificate.newUnregDrepCert without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newUnregDrepCertUnsafe = (drepCredential: CML.Credential, deposit: bigint): CML.Certificate =>
  Effect.runSync(newUnregDrepCert(drepCredential, deposit));

/**
 * Static method newUpdateDrepCert of Certificate
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newUpdateDrepCert: (drepCredential: CML.Credential, anchor: CML.Anchor) => Effect.Effect<CML.Certificate, CertificateError> = Effect.fn(function* (drepCredential: CML.Credential, anchor: CML.Anchor) {
  return yield* Effect.try({
    try: () => CML.Certificate.new_update_drep_cert(drepCredential, anchor),
    catch: () => new CertificateError({
      message: `Certificate.newUpdateDrepCert failed with parameters: ${drepCredential} (Credential), ${anchor} (Anchor). `,
    }),
  });
});

/**
 * Unsafely calls Certificate.newUpdateDrepCert without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newUpdateDrepCertUnsafe = (drepCredential: CML.Credential, anchor: CML.Anchor): CML.Certificate =>
  Effect.runSync(newUpdateDrepCert(drepCredential, anchor));

/**
 * Method kind of Certificate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const kind: (instance: CML.Certificate) => Effect.Effect<CML.CertificateKind, CertificateError> = Effect.fn(
  (instance: CML.Certificate) =>
    Effect.try({
      try: () => instance.kind(),
      catch: () =>
        new CertificateError({
          message: `Certificate.kind failed `,
        }),
    })
);

/**
 * Unsafely calls instance.kind without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const kindUnsafe = (instance: CML.Certificate): CML.CertificateKind =>
  Effect.runSync(kind(instance));

/**
 * Method asStakeRegistration of Certificate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const asStakeRegistration: (instance: CML.Certificate) => Effect.Effect<CML.StakeRegistration | undefined, CertificateError> = Effect.fn(
  (instance: CML.Certificate) =>
    Effect.try({
      try: () => instance.as_stake_registration(),
      catch: () =>
        new CertificateError({
          message: `Certificate.asStakeRegistration failed Hint: Not all Certificate instances can be stringified.`,
        }),
    })
);

/**
 * Unsafely calls instance.asStakeRegistration without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asStakeRegistrationUnsafe = (instance: CML.Certificate): CML.StakeRegistration | undefined =>
  Effect.runSync(asStakeRegistration(instance));

/**
 * Method asStakeDeregistration of Certificate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const asStakeDeregistration: (instance: CML.Certificate) => Effect.Effect<CML.StakeDeregistration | undefined, CertificateError> = Effect.fn(
  (instance: CML.Certificate) =>
    Effect.try({
      try: () => instance.as_stake_deregistration(),
      catch: () =>
        new CertificateError({
          message: `Certificate.asStakeDeregistration failed Hint: Not all Certificate instances can be stringified.`,
        }),
    })
);

/**
 * Unsafely calls instance.asStakeDeregistration without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asStakeDeregistrationUnsafe = (instance: CML.Certificate): CML.StakeDeregistration | undefined =>
  Effect.runSync(asStakeDeregistration(instance));

/**
 * Method asStakeDelegation of Certificate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const asStakeDelegation: (instance: CML.Certificate) => Effect.Effect<CML.StakeDelegation | undefined, CertificateError> = Effect.fn(
  (instance: CML.Certificate) =>
    Effect.try({
      try: () => instance.as_stake_delegation(),
      catch: () =>
        new CertificateError({
          message: `Certificate.asStakeDelegation failed `,
        }),
    })
);

/**
 * Unsafely calls instance.asStakeDelegation without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asStakeDelegationUnsafe = (instance: CML.Certificate): CML.StakeDelegation | undefined =>
  Effect.runSync(asStakeDelegation(instance));

/**
 * Method asPoolRegistration of Certificate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const asPoolRegistration: (instance: CML.Certificate) => Effect.Effect<CML.PoolRegistration | undefined, CertificateError> = Effect.fn(
  (instance: CML.Certificate) =>
    Effect.try({
      try: () => instance.as_pool_registration(),
      catch: () =>
        new CertificateError({
          message: `Certificate.asPoolRegistration failed Hint: Not all Certificate instances can be stringified.`,
        }),
    })
);

/**
 * Unsafely calls instance.asPoolRegistration without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asPoolRegistrationUnsafe = (instance: CML.Certificate): CML.PoolRegistration | undefined =>
  Effect.runSync(asPoolRegistration(instance));

/**
 * Method asPoolRetirement of Certificate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const asPoolRetirement: (instance: CML.Certificate) => Effect.Effect<CML.PoolRetirement | undefined, CertificateError> = Effect.fn(
  (instance: CML.Certificate) =>
    Effect.try({
      try: () => instance.as_pool_retirement(),
      catch: () =>
        new CertificateError({
          message: `Certificate.asPoolRetirement failed `,
        }),
    })
);

/**
 * Unsafely calls instance.asPoolRetirement without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asPoolRetirementUnsafe = (instance: CML.Certificate): CML.PoolRetirement | undefined =>
  Effect.runSync(asPoolRetirement(instance));

/**
 * Method asRegCert of Certificate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const asRegCert: (instance: CML.Certificate) => Effect.Effect<CML.RegCert | undefined, CertificateError> = Effect.fn(
  (instance: CML.Certificate) =>
    Effect.try({
      try: () => instance.as_reg_cert(),
      catch: () =>
        new CertificateError({
          message: `Certificate.asRegCert failed `,
        }),
    })
);

/**
 * Unsafely calls instance.asRegCert without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asRegCertUnsafe = (instance: CML.Certificate): CML.RegCert | undefined =>
  Effect.runSync(asRegCert(instance));

/**
 * Method asUnregCert of Certificate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const asUnregCert: (instance: CML.Certificate) => Effect.Effect<CML.UnregCert | undefined, CertificateError> = Effect.fn(
  (instance: CML.Certificate) =>
    Effect.try({
      try: () => instance.as_unreg_cert(),
      catch: () =>
        new CertificateError({
          message: `Certificate.asUnregCert failed `,
        }),
    })
);

/**
 * Unsafely calls instance.asUnregCert without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asUnregCertUnsafe = (instance: CML.Certificate): CML.UnregCert | undefined =>
  Effect.runSync(asUnregCert(instance));

/**
 * Method asVoteDelegCert of Certificate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const asVoteDelegCert: (instance: CML.Certificate) => Effect.Effect<CML.VoteDelegCert | undefined, CertificateError> = Effect.fn(
  (instance: CML.Certificate) =>
    Effect.try({
      try: () => instance.as_vote_deleg_cert(),
      catch: () =>
        new CertificateError({
          message: `Certificate.asVoteDelegCert failed `,
        }),
    })
);

/**
 * Unsafely calls instance.asVoteDelegCert without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asVoteDelegCertUnsafe = (instance: CML.Certificate): CML.VoteDelegCert | undefined =>
  Effect.runSync(asVoteDelegCert(instance));

/**
 * Method asStakeVoteDelegCert of Certificate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const asStakeVoteDelegCert: (instance: CML.Certificate) => Effect.Effect<CML.StakeVoteDelegCert | undefined, CertificateError> = Effect.fn(
  (instance: CML.Certificate) =>
    Effect.try({
      try: () => instance.as_stake_vote_deleg_cert(),
      catch: () =>
        new CertificateError({
          message: `Certificate.asStakeVoteDelegCert failed `,
        }),
    })
);

/**
 * Unsafely calls instance.asStakeVoteDelegCert without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asStakeVoteDelegCertUnsafe = (instance: CML.Certificate): CML.StakeVoteDelegCert | undefined =>
  Effect.runSync(asStakeVoteDelegCert(instance));

/**
 * Method asStakeRegDelegCert of Certificate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const asStakeRegDelegCert: (instance: CML.Certificate) => Effect.Effect<CML.StakeRegDelegCert | undefined, CertificateError> = Effect.fn(
  (instance: CML.Certificate) =>
    Effect.try({
      try: () => instance.as_stake_reg_deleg_cert(),
      catch: () =>
        new CertificateError({
          message: `Certificate.asStakeRegDelegCert failed `,
        }),
    })
);

/**
 * Unsafely calls instance.asStakeRegDelegCert without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asStakeRegDelegCertUnsafe = (instance: CML.Certificate): CML.StakeRegDelegCert | undefined =>
  Effect.runSync(asStakeRegDelegCert(instance));

/**
 * Method asVoteRegDelegCert of Certificate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const asVoteRegDelegCert: (instance: CML.Certificate) => Effect.Effect<CML.VoteRegDelegCert | undefined, CertificateError> = Effect.fn(
  (instance: CML.Certificate) =>
    Effect.try({
      try: () => instance.as_vote_reg_deleg_cert(),
      catch: () =>
        new CertificateError({
          message: `Certificate.asVoteRegDelegCert failed `,
        }),
    })
);

/**
 * Unsafely calls instance.asVoteRegDelegCert without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asVoteRegDelegCertUnsafe = (instance: CML.Certificate): CML.VoteRegDelegCert | undefined =>
  Effect.runSync(asVoteRegDelegCert(instance));

/**
 * Method asStakeVoteRegDelegCert of Certificate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const asStakeVoteRegDelegCert: (instance: CML.Certificate) => Effect.Effect<CML.StakeVoteRegDelegCert | undefined, CertificateError> = Effect.fn(
  (instance: CML.Certificate) =>
    Effect.try({
      try: () => instance.as_stake_vote_reg_deleg_cert(),
      catch: () =>
        new CertificateError({
          message: `Certificate.asStakeVoteRegDelegCert failed `,
        }),
    })
);

/**
 * Unsafely calls instance.asStakeVoteRegDelegCert without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asStakeVoteRegDelegCertUnsafe = (instance: CML.Certificate): CML.StakeVoteRegDelegCert | undefined =>
  Effect.runSync(asStakeVoteRegDelegCert(instance));

/**
 * Method asAuthCommitteeHotCert of Certificate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const asAuthCommitteeHotCert: (instance: CML.Certificate) => Effect.Effect<CML.AuthCommitteeHotCert | undefined, CertificateError> = Effect.fn(
  (instance: CML.Certificate) =>
    Effect.try({
      try: () => instance.as_auth_committee_hot_cert(),
      catch: () =>
        new CertificateError({
          message: `Certificate.asAuthCommitteeHotCert failed `,
        }),
    })
);

/**
 * Unsafely calls instance.asAuthCommitteeHotCert without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asAuthCommitteeHotCertUnsafe = (instance: CML.Certificate): CML.AuthCommitteeHotCert | undefined =>
  Effect.runSync(asAuthCommitteeHotCert(instance));

/**
 * Method asResignCommitteeColdCert of Certificate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const asResignCommitteeColdCert: (instance: CML.Certificate) => Effect.Effect<CML.ResignCommitteeColdCert | undefined, CertificateError> = Effect.fn(
  (instance: CML.Certificate) =>
    Effect.try({
      try: () => instance.as_resign_committee_cold_cert(),
      catch: () =>
        new CertificateError({
          message: `Certificate.asResignCommitteeColdCert failed `,
        }),
    })
);

/**
 * Unsafely calls instance.asResignCommitteeColdCert without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asResignCommitteeColdCertUnsafe = (instance: CML.Certificate): CML.ResignCommitteeColdCert | undefined =>
  Effect.runSync(asResignCommitteeColdCert(instance));

/**
 * Method asRegDrepCert of Certificate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const asRegDrepCert: (instance: CML.Certificate) => Effect.Effect<CML.RegDrepCert | undefined, CertificateError> = Effect.fn(
  (instance: CML.Certificate) =>
    Effect.try({
      try: () => instance.as_reg_drep_cert(),
      catch: () =>
        new CertificateError({
          message: `Certificate.asRegDrepCert failed `,
        }),
    })
);

/**
 * Unsafely calls instance.asRegDrepCert without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asRegDrepCertUnsafe = (instance: CML.Certificate): CML.RegDrepCert | undefined =>
  Effect.runSync(asRegDrepCert(instance));

/**
 * Method asUnregDrepCert of Certificate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const asUnregDrepCert: (instance: CML.Certificate) => Effect.Effect<CML.UnregDrepCert | undefined, CertificateError> = Effect.fn(
  (instance: CML.Certificate) =>
    Effect.try({
      try: () => instance.as_unreg_drep_cert(),
      catch: () =>
        new CertificateError({
          message: `Certificate.asUnregDrepCert failed `,
        }),
    })
);

/**
 * Unsafely calls instance.asUnregDrepCert without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asUnregDrepCertUnsafe = (instance: CML.Certificate): CML.UnregDrepCert | undefined =>
  Effect.runSync(asUnregDrepCert(instance));

/**
 * Method asUpdateDrepCert of Certificate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const asUpdateDrepCert: (instance: CML.Certificate) => Effect.Effect<CML.UpdateDrepCert | undefined, CertificateError> = Effect.fn(
  (instance: CML.Certificate) =>
    Effect.try({
      try: () => instance.as_update_drep_cert(),
      catch: () =>
        new CertificateError({
          message: `Certificate.asUpdateDrepCert failed `,
        }),
    })
);

/**
 * Unsafely calls instance.asUpdateDrepCert without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asUpdateDrepCertUnsafe = (instance: CML.Certificate): CML.UpdateDrepCert | undefined =>
  Effect.runSync(asUpdateDrepCert(instance));
