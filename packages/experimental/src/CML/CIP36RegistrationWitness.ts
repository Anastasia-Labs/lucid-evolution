/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML CIP36RegistrationWitness class
 *
 * @since 2.0.0
 * @category Types
 */
export type CIP36RegistrationWitness = CML.CIP36RegistrationWitness;

/**
 * Error class for CIP36RegistrationWitness operations
 *
 * This error is thrown when operations on CIP36RegistrationWitness instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class CIP36RegistrationWitnessError extends Data.TaggedError(
  "CIP36RegistrationWitnessError",
)<{
  message?: string;
}> {}

/**
 * Method free of CIP36RegistrationWitness
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.CIP36RegistrationWitness,
) => Effect.Effect<void, CIP36RegistrationWitnessError> = Effect.fn(
  (instance: CML.CIP36RegistrationWitness) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new CIP36RegistrationWitnessError({
          message: `CIP36RegistrationWitness.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.CIP36RegistrationWitness): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of CIP36RegistrationWitness
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (
  instance: CML.CIP36RegistrationWitness,
) => Effect.Effect<Uint8Array, CIP36RegistrationWitnessError> = Effect.fn(
  (instance: CML.CIP36RegistrationWitness) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new CIP36RegistrationWitnessError({
          message: `CIP36RegistrationWitness.toCborBytes failed CIP36RegistrationWitness is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
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
  instance: CML.CIP36RegistrationWitness,
): Uint8Array => Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of CIP36RegistrationWitness
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (
  instance: CML.CIP36RegistrationWitness,
) => Effect.Effect<Uint8Array, CIP36RegistrationWitnessError> = Effect.fn(
  (instance: CML.CIP36RegistrationWitness) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new CIP36RegistrationWitnessError({
          message: `CIP36RegistrationWitness.toCanonicalCborBytes failed CIP36RegistrationWitness is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
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
  instance: CML.CIP36RegistrationWitness,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of CIP36RegistrationWitness
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<
  CML.CIP36RegistrationWitness,
  CIP36RegistrationWitnessError
> = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.CIP36RegistrationWitness.from_cbor_bytes(cborBytes),
    catch: () =>
      new CIP36RegistrationWitnessError({
        message: `CIP36RegistrationWitness.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls CIP36RegistrationWitness.fromCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (
  cborBytes: Uint8Array,
): CML.CIP36RegistrationWitness => Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of CIP36RegistrationWitness
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (
  instance: CML.CIP36RegistrationWitness,
) => Effect.Effect<string, CIP36RegistrationWitnessError> = Effect.fn(
  (instance: CML.CIP36RegistrationWitness) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new CIP36RegistrationWitnessError({
          message: `CIP36RegistrationWitness.toCborHex failed CIP36RegistrationWitness is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (
  instance: CML.CIP36RegistrationWitness,
): string => Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of CIP36RegistrationWitness
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (
  instance: CML.CIP36RegistrationWitness,
) => Effect.Effect<string, CIP36RegistrationWitnessError> = Effect.fn(
  (instance: CML.CIP36RegistrationWitness) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new CIP36RegistrationWitnessError({
          message: `CIP36RegistrationWitness.toCanonicalCborHex failed CIP36RegistrationWitness is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
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
  instance: CML.CIP36RegistrationWitness,
): string => Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of CIP36RegistrationWitness
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<
  CML.CIP36RegistrationWitness,
  CIP36RegistrationWitnessError
> = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.CIP36RegistrationWitness.from_cbor_hex(cborBytes),
    catch: () =>
      new CIP36RegistrationWitnessError({
        message: `CIP36RegistrationWitness.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls CIP36RegistrationWitness.fromCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (
  cborBytes: string,
): CML.CIP36RegistrationWitness => Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of CIP36RegistrationWitness
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (
  instance: CML.CIP36RegistrationWitness,
) => Effect.Effect<string, CIP36RegistrationWitnessError> = Effect.fn(
  (instance: CML.CIP36RegistrationWitness) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new CIP36RegistrationWitnessError({
          message: `CIP36RegistrationWitness.toJson failed CIP36RegistrationWitness is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.CIP36RegistrationWitness): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of CIP36RegistrationWitness
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (
  instance: CML.CIP36RegistrationWitness,
) => Effect.Effect<any, CIP36RegistrationWitnessError> = Effect.fn(
  (instance: CML.CIP36RegistrationWitness) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new CIP36RegistrationWitnessError({
          message: `CIP36RegistrationWitness.toJsValue failed CIP36RegistrationWitness is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.CIP36RegistrationWitness): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of CIP36RegistrationWitness
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (
  json: string,
) => Effect.Effect<
  CML.CIP36RegistrationWitness,
  CIP36RegistrationWitnessError
> = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.CIP36RegistrationWitness.from_json(json),
    catch: () =>
      new CIP36RegistrationWitnessError({
        message: `CIP36RegistrationWitness.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls CIP36RegistrationWitness.fromJson without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.CIP36RegistrationWitness =>
  Effect.runSync(fromJson(json));

/**
 * Method stakeWitness of CIP36RegistrationWitness
 *
 * @since 2.0.0
 * @category Methods
 */
export const stakeWitness: (
  instance: CML.CIP36RegistrationWitness,
) => Effect.Effect<CML.Ed25519Signature, CIP36RegistrationWitnessError> =
  Effect.fn((instance: CML.CIP36RegistrationWitness) =>
    Effect.try({
      try: () => instance.stake_witness(),
      catch: () =>
        new CIP36RegistrationWitnessError({
          message: `CIP36RegistrationWitness.stakeWitness failed `,
        }),
    }),
  );

/**
 * Unsafely calls instance.stakeWitness without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const stakeWitnessUnsafe = (
  instance: CML.CIP36RegistrationWitness,
): CML.Ed25519Signature => Effect.runSync(stakeWitness(instance));

/**
 * Static method _new of CIP36RegistrationWitness
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (
  stakeWitness: CML.Ed25519Signature,
) => Effect.Effect<
  CML.CIP36RegistrationWitness,
  CIP36RegistrationWitnessError
> = Effect.fn(function* (stakeWitness: CML.Ed25519Signature) {
  return yield* Effect.try({
    try: () => CML.CIP36RegistrationWitness.new(stakeWitness),
    catch: () =>
      new CIP36RegistrationWitnessError({
        message: `CIP36RegistrationWitness._new failed with parameters: ${stakeWitness} (Ed25519Signature). `,
      }),
  });
});

/**
 * Unsafely calls CIP36RegistrationWitness._new without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (
  stakeWitness: CML.Ed25519Signature,
): CML.CIP36RegistrationWitness => Effect.runSync(_new(stakeWitness));
