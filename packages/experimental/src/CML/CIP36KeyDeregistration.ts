/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML CIP36KeyDeregistration class
 *
 * @since 2.0.0
 * @category Types
 */
export type CIP36KeyDeregistration = CML.CIP36KeyDeregistration;

/**
 * Error class for CIP36KeyDeregistration operations
 * 
 * This error is thrown when operations on CIP36KeyDeregistration instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class CIP36KeyDeregistrationError extends Data.TaggedError("CIP36KeyDeregistrationError")<{
  message?: string;
}> {}

/**
 * Method free of CIP36KeyDeregistration
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.CIP36KeyDeregistration) => Effect.Effect<void, CIP36KeyDeregistrationError> = Effect.fn(
  (instance: CML.CIP36KeyDeregistration) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new CIP36KeyDeregistrationError({
          message: `CIP36KeyDeregistration.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.CIP36KeyDeregistration): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of CIP36KeyDeregistration
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (instance: CML.CIP36KeyDeregistration) => Effect.Effect<Uint8Array, CIP36KeyDeregistrationError> = Effect.fn(
  (instance: CML.CIP36KeyDeregistration) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new CIP36KeyDeregistrationError({
          message: `CIP36KeyDeregistration.toCborBytes failed CIP36KeyDeregistration is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.CIP36KeyDeregistration): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of CIP36KeyDeregistration
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (instance: CML.CIP36KeyDeregistration) => Effect.Effect<Uint8Array, CIP36KeyDeregistrationError> = Effect.fn(
  (instance: CML.CIP36KeyDeregistration) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new CIP36KeyDeregistrationError({
          message: `CIP36KeyDeregistration.toCanonicalCborBytes failed CIP36KeyDeregistration is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (instance: CML.CIP36KeyDeregistration): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of CIP36KeyDeregistration
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (cborBytes: Uint8Array) => Effect.Effect<CML.CIP36KeyDeregistration, CIP36KeyDeregistrationError> = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.CIP36KeyDeregistration.from_cbor_bytes(cborBytes),
    catch: () => new CIP36KeyDeregistrationError({
      message: `CIP36KeyDeregistration.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls CIP36KeyDeregistration.fromCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.CIP36KeyDeregistration =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of CIP36KeyDeregistration
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (instance: CML.CIP36KeyDeregistration) => Effect.Effect<string, CIP36KeyDeregistrationError> = Effect.fn(
  (instance: CML.CIP36KeyDeregistration) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new CIP36KeyDeregistrationError({
          message: `CIP36KeyDeregistration.toCborHex failed CIP36KeyDeregistration is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.CIP36KeyDeregistration): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of CIP36KeyDeregistration
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (instance: CML.CIP36KeyDeregistration) => Effect.Effect<string, CIP36KeyDeregistrationError> = Effect.fn(
  (instance: CML.CIP36KeyDeregistration) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new CIP36KeyDeregistrationError({
          message: `CIP36KeyDeregistration.toCanonicalCborHex failed CIP36KeyDeregistration is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.CIP36KeyDeregistration): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of CIP36KeyDeregistration
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (cborBytes: string) => Effect.Effect<CML.CIP36KeyDeregistration, CIP36KeyDeregistrationError> = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.CIP36KeyDeregistration.from_cbor_hex(cborBytes),
    catch: () => new CIP36KeyDeregistrationError({
      message: `CIP36KeyDeregistration.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls CIP36KeyDeregistration.fromCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.CIP36KeyDeregistration =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of CIP36KeyDeregistration
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (instance: CML.CIP36KeyDeregistration) => Effect.Effect<string, CIP36KeyDeregistrationError> = Effect.fn(
  (instance: CML.CIP36KeyDeregistration) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new CIP36KeyDeregistrationError({
          message: `CIP36KeyDeregistration.toJson failed CIP36KeyDeregistration is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.CIP36KeyDeregistration): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of CIP36KeyDeregistration
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (instance: CML.CIP36KeyDeregistration) => Effect.Effect<any, CIP36KeyDeregistrationError> = Effect.fn(
  (instance: CML.CIP36KeyDeregistration) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new CIP36KeyDeregistrationError({
          message: `CIP36KeyDeregistration.toJsValue failed CIP36KeyDeregistration is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.CIP36KeyDeregistration): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of CIP36KeyDeregistration
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (json: string) => Effect.Effect<CML.CIP36KeyDeregistration, CIP36KeyDeregistrationError> = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.CIP36KeyDeregistration.from_json(json),
    catch: () => new CIP36KeyDeregistrationError({
      message: `CIP36KeyDeregistration.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls CIP36KeyDeregistration.fromJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.CIP36KeyDeregistration =>
  Effect.runSync(fromJson(json));

/**
 * Method stakeCredential of CIP36KeyDeregistration
 * 
 * @since 2.0.0
 * @category Methods
 */
export const stakeCredential: (instance: CML.CIP36KeyDeregistration) => Effect.Effect<CML.PublicKey, CIP36KeyDeregistrationError> = Effect.fn(
  (instance: CML.CIP36KeyDeregistration) =>
    Effect.try({
      try: () => instance.stake_credential(),
      catch: () =>
        new CIP36KeyDeregistrationError({
          message: `CIP36KeyDeregistration.stakeCredential failed `,
        }),
    })
);

/**
 * Unsafely calls instance.stakeCredential without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const stakeCredentialUnsafe = (instance: CML.CIP36KeyDeregistration): CML.PublicKey =>
  Effect.runSync(stakeCredential(instance));

/**
 * Method nonce of CIP36KeyDeregistration
 * 
 * @since 2.0.0
 * @category Methods
 */
export const nonce: (instance: CML.CIP36KeyDeregistration) => Effect.Effect<bigint, CIP36KeyDeregistrationError> = Effect.fn(
  (instance: CML.CIP36KeyDeregistration) =>
    Effect.try({
      try: () => instance.nonce(),
      catch: () =>
        new CIP36KeyDeregistrationError({
          message: `CIP36KeyDeregistration.nonce failed `,
        }),
    })
);

/**
 * Unsafely calls instance.nonce without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const nonceUnsafe = (instance: CML.CIP36KeyDeregistration): bigint =>
  Effect.runSync(nonce(instance));

/**
 * Method setVotingPurpose of CIP36KeyDeregistration
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setVotingPurpose: (instance: CML.CIP36KeyDeregistration, votingPurpose: bigint) => Effect.Effect<void, CIP36KeyDeregistrationError> = Effect.fn(
  (instance: CML.CIP36KeyDeregistration, votingPurpose: bigint) =>
    Effect.try({
      try: () => instance.set_voting_purpose(votingPurpose),
      catch: () =>
        new CIP36KeyDeregistrationError({
          message: `CIP36KeyDeregistration.setVotingPurpose failed with parameters: ${votingPurpose}. `,
        }),
    })
);

/**
 * Unsafely calls instance.setVotingPurpose without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setVotingPurposeUnsafe = (instance: CML.CIP36KeyDeregistration, votingPurpose: bigint): void =>
  Effect.runSync(setVotingPurpose(instance, votingPurpose));

/**
 * Method votingPurpose of CIP36KeyDeregistration
 * 
 * @since 2.0.0
 * @category Methods
 */
export const votingPurpose: (instance: CML.CIP36KeyDeregistration) => Effect.Effect<bigint, CIP36KeyDeregistrationError> = Effect.fn(
  (instance: CML.CIP36KeyDeregistration) =>
    Effect.try({
      try: () => instance.voting_purpose(),
      catch: () =>
        new CIP36KeyDeregistrationError({
          message: `CIP36KeyDeregistration.votingPurpose failed `,
        }),
    })
);

/**
 * Unsafely calls instance.votingPurpose without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const votingPurposeUnsafe = (instance: CML.CIP36KeyDeregistration): bigint =>
  Effect.runSync(votingPurpose(instance));
