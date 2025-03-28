import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type VoteDelegCert = CML.VoteDelegCert;

export class VoteDelegCertError extends Data.TaggedError("VoteDelegCertError")<{
  message?: string;
}> {}

/**
 * Method free of VoteDelegCert
 *
 * @example
 * import { VoteDelegCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a VoteDelegCert instance
 * const instance = ... ;
 *   const result = yield* VoteDelegCert.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.VoteDelegCert): Effect.Effect<void, VoteDelegCertError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new VoteDelegCertError({
          message: `VoteDelegCert.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { VoteDelegCert } from "@lucid-evolution/experimental";
 *
 * // Assume we have a VoteDelegCert instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = VoteDelegCert.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VoteDelegCert.unsafeFree failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.VoteDelegCert): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of VoteDelegCert
 *
 * @example
 * import { VoteDelegCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a VoteDelegCert instance
 * const instance = ... ;
 *   const result = yield* VoteDelegCert.toCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (
    instance: CML.VoteDelegCert,
  ): Effect.Effect<Uint8Array, VoteDelegCertError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new VoteDelegCertError({
          message: `VoteDelegCert.toCborBytes failed VoteDelegCert is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @example
 * import { VoteDelegCert } from "@lucid-evolution/experimental";
 *
 * // Assume we have a VoteDelegCert instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = VoteDelegCert.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VoteDelegCert.unsafeToCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (instance: CML.VoteDelegCert): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of VoteDelegCert
 *
 * @example
 * import { VoteDelegCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a VoteDelegCert instance
 * const instance = ... ;
 *   const result = yield* VoteDelegCert.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (
    instance: CML.VoteDelegCert,
  ): Effect.Effect<Uint8Array, VoteDelegCertError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new VoteDelegCertError({
          message: `VoteDelegCert.toCanonicalCborBytes failed VoteDelegCert is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 *
 * @example
 * import { VoteDelegCert } from "@lucid-evolution/experimental";
 *
 * // Assume we have a VoteDelegCert instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = VoteDelegCert.unsafeToCanonicalCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VoteDelegCert.unsafeToCanonicalCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborBytes = (
  instance: CML.VoteDelegCert,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of VoteDelegCert
 *
 * @example
 * import { VoteDelegCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* VoteDelegCert.fromCborBytes( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.VoteDelegCert.from_cbor_bytes(cborBytes),
    catch: () =>
      new VoteDelegCertError({
        message: `VoteDelegCert.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls VoteDelegCert.fromCborBytes without Effect wrapper
 *
 * @example
 * import { VoteDelegCert } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = VoteDelegCert.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VoteDelegCert.unsafeFromCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of VoteDelegCert
 *
 * @example
 * import { VoteDelegCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a VoteDelegCert instance
 * const instance = ... ;
 *   const result = yield* VoteDelegCert.toCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.VoteDelegCert): Effect.Effect<string, VoteDelegCertError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new VoteDelegCertError({
          message: `VoteDelegCert.toCborHex failed VoteDelegCert is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @example
 * import { VoteDelegCert } from "@lucid-evolution/experimental";
 *
 * // Assume we have a VoteDelegCert instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = VoteDelegCert.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VoteDelegCert.unsafeToCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (instance: CML.VoteDelegCert): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of VoteDelegCert
 *
 * @example
 * import { VoteDelegCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a VoteDelegCert instance
 * const instance = ... ;
 *   const result = yield* VoteDelegCert.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.VoteDelegCert): Effect.Effect<string, VoteDelegCertError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new VoteDelegCertError({
          message: `VoteDelegCert.toCanonicalCborHex failed VoteDelegCert is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @example
 * import { VoteDelegCert } from "@lucid-evolution/experimental";
 *
 * // Assume we have a VoteDelegCert instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = VoteDelegCert.unsafeToCanonicalCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VoteDelegCert.unsafeToCanonicalCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborHex = (instance: CML.VoteDelegCert): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of VoteDelegCert
 *
 * @example
 * import { VoteDelegCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* VoteDelegCert.fromCborHex( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.VoteDelegCert.from_cbor_hex(cborBytes),
    catch: () =>
      new VoteDelegCertError({
        message: `VoteDelegCert.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls VoteDelegCert.fromCborHex without Effect wrapper
 *
 * @example
 * import { VoteDelegCert } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = VoteDelegCert.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VoteDelegCert.unsafeFromCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of VoteDelegCert
 *
 * @example
 * import { VoteDelegCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a VoteDelegCert instance
 * const instance = ... ;
 *   const result = yield* VoteDelegCert.toJson(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.VoteDelegCert): Effect.Effect<string, VoteDelegCertError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new VoteDelegCertError({
          message: `VoteDelegCert.toJson failed VoteDelegCert is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @example
 * import { VoteDelegCert } from "@lucid-evolution/experimental";
 *
 * // Assume we have a VoteDelegCert instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = VoteDelegCert.unsafeToJson(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VoteDelegCert.unsafeToJson failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJson = (instance: CML.VoteDelegCert): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of VoteDelegCert
 *
 * @example
 * import { VoteDelegCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a VoteDelegCert instance
 * const instance = ... ;
 *   const result = yield* VoteDelegCert.toJsValue(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.VoteDelegCert): Effect.Effect<any, VoteDelegCertError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new VoteDelegCertError({
          message: `VoteDelegCert.toJsValue failed VoteDelegCert is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @example
 * import { VoteDelegCert } from "@lucid-evolution/experimental";
 *
 * // Assume we have a VoteDelegCert instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = VoteDelegCert.unsafeToJsValue(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VoteDelegCert.unsafeToJsValue failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJsValue = (instance: CML.VoteDelegCert): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of VoteDelegCert
 *
 * @example
 * import { VoteDelegCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* VoteDelegCert.fromJson( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.VoteDelegCert.from_json(json),
    catch: () =>
      new VoteDelegCertError({
        message: `VoteDelegCert.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls VoteDelegCert.fromJson without Effect wrapper
 *
 * @example
 * import { VoteDelegCert } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = VoteDelegCert.unsafeFromJson( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VoteDelegCert.unsafeFromJson failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromJson = (json: string) => Effect.runSync(fromJson(json));

/**
 * Method stakeCredential of VoteDelegCert
 *
 * @example
 * import { VoteDelegCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a VoteDelegCert instance
 * const instance = ... ;
 *   const result = yield* VoteDelegCert.stakeCredential(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const stakeCredential = Effect.fn(
  (
    instance: CML.VoteDelegCert,
  ): Effect.Effect<CML.Credential, VoteDelegCertError> =>
    Effect.try({
      try: () => instance.stake_credential(),
      catch: () =>
        new VoteDelegCertError({
          message: `VoteDelegCert.stakeCredential failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.stakeCredential without Effect wrapper
 *
 * @example
 * import { VoteDelegCert } from "@lucid-evolution/experimental";
 *
 * // Assume we have a VoteDelegCert instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = VoteDelegCert.unsafeStakeCredential(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VoteDelegCert.unsafeStakeCredential failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeStakeCredential = (
  instance: CML.VoteDelegCert,
): CML.Credential => Effect.runSync(stakeCredential(instance));

/**
 * Method dRep of VoteDelegCert
 *
 * @example
 * import { VoteDelegCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a VoteDelegCert instance
 * const instance = ... ;
 *   const result = yield* VoteDelegCert.dRep(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const dRep = Effect.fn(
  (instance: CML.VoteDelegCert): Effect.Effect<CML.DRep, VoteDelegCertError> =>
    Effect.try({
      try: () => instance.d_rep(),
      catch: () =>
        new VoteDelegCertError({
          message: `VoteDelegCert.dRep failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.dRep without Effect wrapper
 *
 * @example
 * import { VoteDelegCert } from "@lucid-evolution/experimental";
 *
 * // Assume we have a VoteDelegCert instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = VoteDelegCert.unsafeDRep(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VoteDelegCert.unsafeDRep failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeDRep = (instance: CML.VoteDelegCert): CML.DRep =>
  Effect.runSync(dRep(instance));

/**
 * Static method _new of VoteDelegCert
 *
 * @example
 * import { VoteDelegCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* VoteDelegCert._new( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (
  stakeCredential: CML.Credential,
  dRep: CML.DRep,
) {
  return yield* Effect.try({
    try: () => CML.VoteDelegCert.new(stakeCredential, dRep),
    catch: () =>
      new VoteDelegCertError({
        message: `VoteDelegCert._new failed with parameters: ${stakeCredential} (Credential), ${dRep} (DRep). `,
      }),
  });
});

/**
 * Unsafely calls VoteDelegCert._new without Effect wrapper
 *
 * @example
 * import { VoteDelegCert } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = VoteDelegCert.unsafe_new( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VoteDelegCert.unsafe_new failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = (stakeCredential: CML.Credential, dRep: CML.DRep) =>
  Effect.runSync(_new(stakeCredential, dRep));
