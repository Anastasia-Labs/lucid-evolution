/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML StakeDeregistration class
 *
 * @since 2.0.0
 * @category Types
 */
export type StakeDeregistration = CML.StakeDeregistration;

/**
 * Error class for StakeDeregistration operations
 *
 * This error is thrown when operations on StakeDeregistration instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class StakeDeregistrationError extends Data.TaggedError(
  "StakeDeregistrationError",
)<{
  message?: string;
}> {}

/**
 * Method free of StakeDeregistration
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.StakeDeregistration,
) => Effect.Effect<void, StakeDeregistrationError> = Effect.fn(
  (instance: CML.StakeDeregistration) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new StakeDeregistrationError({
          message: `StakeDeregistration.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.StakeDeregistration): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of StakeDeregistration
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (
  instance: CML.StakeDeregistration,
) => Effect.Effect<Uint8Array, StakeDeregistrationError> = Effect.fn(
  (instance: CML.StakeDeregistration) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new StakeDeregistrationError({
          message: `StakeDeregistration.toCborBytes failed StakeDeregistration is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (
  instance: CML.StakeDeregistration,
): Uint8Array => Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of StakeDeregistration
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (
  instance: CML.StakeDeregistration,
) => Effect.Effect<Uint8Array, StakeDeregistrationError> = Effect.fn(
  (instance: CML.StakeDeregistration) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new StakeDeregistrationError({
          message: `StakeDeregistration.toCanonicalCborBytes failed StakeDeregistration is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (
  instance: CML.StakeDeregistration,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of StakeDeregistration
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.StakeDeregistration, StakeDeregistrationError> =
  Effect.fn(function* (cborBytes: Uint8Array) {
    return yield* Effect.try({
      try: () => CML.StakeDeregistration.from_cbor_bytes(cborBytes),
      catch: () =>
        new StakeDeregistrationError({
          message: `StakeDeregistration.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
        }),
    });
  });

/**
 * Unsafely calls StakeDeregistration.fromCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (
  cborBytes: Uint8Array,
): CML.StakeDeregistration => Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of StakeDeregistration
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (
  instance: CML.StakeDeregistration,
) => Effect.Effect<string, StakeDeregistrationError> = Effect.fn(
  (instance: CML.StakeDeregistration) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new StakeDeregistrationError({
          message: `StakeDeregistration.toCborHex failed StakeDeregistration is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.StakeDeregistration): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of StakeDeregistration
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (
  instance: CML.StakeDeregistration,
) => Effect.Effect<string, StakeDeregistrationError> = Effect.fn(
  (instance: CML.StakeDeregistration) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new StakeDeregistrationError({
          message: `StakeDeregistration.toCanonicalCborHex failed StakeDeregistration is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (
  instance: CML.StakeDeregistration,
): string => Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of StakeDeregistration
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.StakeDeregistration, StakeDeregistrationError> =
  Effect.fn(function* (cborBytes: string) {
    return yield* Effect.try({
      try: () => CML.StakeDeregistration.from_cbor_hex(cborBytes),
      catch: () =>
        new StakeDeregistrationError({
          message: `StakeDeregistration.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    });
  });

/**
 * Unsafely calls StakeDeregistration.fromCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.StakeDeregistration =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of StakeDeregistration
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (
  instance: CML.StakeDeregistration,
) => Effect.Effect<string, StakeDeregistrationError> = Effect.fn(
  (instance: CML.StakeDeregistration) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new StakeDeregistrationError({
          message: `StakeDeregistration.toJson failed StakeDeregistration is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.StakeDeregistration): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of StakeDeregistration
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (
  instance: CML.StakeDeregistration,
) => Effect.Effect<any, StakeDeregistrationError> = Effect.fn(
  (instance: CML.StakeDeregistration) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new StakeDeregistrationError({
          message: `StakeDeregistration.toJsValue failed StakeDeregistration is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.StakeDeregistration): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of StakeDeregistration
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (
  json: string,
) => Effect.Effect<CML.StakeDeregistration, StakeDeregistrationError> =
  Effect.fn(function* (json: string) {
    return yield* Effect.try({
      try: () => CML.StakeDeregistration.from_json(json),
      catch: () =>
        new StakeDeregistrationError({
          message: `StakeDeregistration.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
        }),
    });
  });

/**
 * Unsafely calls StakeDeregistration.fromJson without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.StakeDeregistration =>
  Effect.runSync(fromJson(json));

/**
 * Method stakeCredential of StakeDeregistration
 *
 * @since 2.0.0
 * @category Methods
 */
export const stakeCredential: (
  instance: CML.StakeDeregistration,
) => Effect.Effect<CML.Credential, StakeDeregistrationError> = Effect.fn(
  (instance: CML.StakeDeregistration) =>
    Effect.try({
      try: () => instance.stake_credential(),
      catch: () =>
        new StakeDeregistrationError({
          message: `StakeDeregistration.stakeCredential failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.stakeCredential without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const stakeCredentialUnsafe = (
  instance: CML.StakeDeregistration,
): CML.Credential => Effect.runSync(stakeCredential(instance));

/**
 * Static method _new of StakeDeregistration
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (
  stakeCredential: CML.Credential,
) => Effect.Effect<CML.StakeDeregistration, StakeDeregistrationError> =
  Effect.fn(function* (stakeCredential: CML.Credential) {
    return yield* Effect.try({
      try: () => CML.StakeDeregistration.new(stakeCredential),
      catch: () =>
        new StakeDeregistrationError({
          message: `StakeDeregistration._new failed with parameters: ${stakeCredential} (Credential). `,
        }),
    });
  });

/**
 * Unsafely calls StakeDeregistration._new without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (
  stakeCredential: CML.Credential,
): CML.StakeDeregistration => Effect.runSync(_new(stakeCredential));
