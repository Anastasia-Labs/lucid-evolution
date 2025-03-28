import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type VRFCert = CML.VRFCert;

export class VRFCertError extends Data.TaggedError("VRFCertError")<{
  message?: string;
}> {}

/**
 * Method free of VRFCert
 *
 * @example
 * import { VRFCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a VRFCert instance
 * const instance = ... ;
 *   const result = yield* VRFCert.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.VRFCert): Effect.Effect<void, VRFCertError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new VRFCertError({
          message: `VRFCert.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { VRFCert } from "@lucid-evolution/experimental";
 *
 * // Assume we have a VRFCert instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = VRFCert.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VRFCert.unsafeFree failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.VRFCert): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of VRFCert
 *
 * @example
 * import { VRFCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a VRFCert instance
 * const instance = ... ;
 *   const result = yield* VRFCert.toCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.VRFCert): Effect.Effect<Uint8Array, VRFCertError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new VRFCertError({
          message: `VRFCert.toCborBytes failed VRFCert is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @example
 * import { VRFCert } from "@lucid-evolution/experimental";
 *
 * // Assume we have a VRFCert instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = VRFCert.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VRFCert.unsafeToCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (instance: CML.VRFCert): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of VRFCert
 *
 * @example
 * import { VRFCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a VRFCert instance
 * const instance = ... ;
 *   const result = yield* VRFCert.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.VRFCert): Effect.Effect<Uint8Array, VRFCertError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new VRFCertError({
          message: `VRFCert.toCanonicalCborBytes failed VRFCert is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 *
 * @example
 * import { VRFCert } from "@lucid-evolution/experimental";
 *
 * // Assume we have a VRFCert instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = VRFCert.unsafeToCanonicalCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VRFCert.unsafeToCanonicalCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborBytes = (instance: CML.VRFCert): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of VRFCert
 *
 * @example
 * import { VRFCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* VRFCert.fromCborBytes( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.VRFCert.from_cbor_bytes(cborBytes),
    catch: () =>
      new VRFCertError({
        message: `VRFCert.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls VRFCert.fromCborBytes without Effect wrapper
 *
 * @example
 * import { VRFCert } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = VRFCert.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VRFCert.unsafeFromCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of VRFCert
 *
 * @example
 * import { VRFCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a VRFCert instance
 * const instance = ... ;
 *   const result = yield* VRFCert.toCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.VRFCert): Effect.Effect<string, VRFCertError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new VRFCertError({
          message: `VRFCert.toCborHex failed VRFCert is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @example
 * import { VRFCert } from "@lucid-evolution/experimental";
 *
 * // Assume we have a VRFCert instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = VRFCert.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VRFCert.unsafeToCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (instance: CML.VRFCert): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of VRFCert
 *
 * @example
 * import { VRFCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a VRFCert instance
 * const instance = ... ;
 *   const result = yield* VRFCert.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.VRFCert): Effect.Effect<string, VRFCertError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new VRFCertError({
          message: `VRFCert.toCanonicalCborHex failed VRFCert is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @example
 * import { VRFCert } from "@lucid-evolution/experimental";
 *
 * // Assume we have a VRFCert instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = VRFCert.unsafeToCanonicalCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VRFCert.unsafeToCanonicalCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborHex = (instance: CML.VRFCert): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of VRFCert
 *
 * @example
 * import { VRFCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* VRFCert.fromCborHex( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.VRFCert.from_cbor_hex(cborBytes),
    catch: () =>
      new VRFCertError({
        message: `VRFCert.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls VRFCert.fromCborHex without Effect wrapper
 *
 * @example
 * import { VRFCert } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = VRFCert.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VRFCert.unsafeFromCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of VRFCert
 *
 * @example
 * import { VRFCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a VRFCert instance
 * const instance = ... ;
 *   const result = yield* VRFCert.toJson(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.VRFCert): Effect.Effect<string, VRFCertError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new VRFCertError({
          message: `VRFCert.toJson failed VRFCert is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @example
 * import { VRFCert } from "@lucid-evolution/experimental";
 *
 * // Assume we have a VRFCert instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = VRFCert.unsafeToJson(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VRFCert.unsafeToJson failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJson = (instance: CML.VRFCert): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of VRFCert
 *
 * @example
 * import { VRFCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a VRFCert instance
 * const instance = ... ;
 *   const result = yield* VRFCert.toJsValue(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.VRFCert): Effect.Effect<any, VRFCertError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new VRFCertError({
          message: `VRFCert.toJsValue failed VRFCert is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @example
 * import { VRFCert } from "@lucid-evolution/experimental";
 *
 * // Assume we have a VRFCert instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = VRFCert.unsafeToJsValue(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VRFCert.unsafeToJsValue failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJsValue = (instance: CML.VRFCert): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of VRFCert
 *
 * @example
 * import { VRFCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* VRFCert.fromJson( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.VRFCert.from_json(json),
    catch: () =>
      new VRFCertError({
        message: `VRFCert.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls VRFCert.fromJson without Effect wrapper
 *
 * @example
 * import { VRFCert } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = VRFCert.unsafeFromJson( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VRFCert.unsafeFromJson failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromJson = (json: string) => Effect.runSync(fromJson(json));

/**
 * Method output of VRFCert
 *
 * @example
 * import { VRFCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a VRFCert instance
 * const instance = ... ;
 *   const result = yield* VRFCert.output(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const output = Effect.fn(
  (instance: CML.VRFCert): Effect.Effect<Uint8Array, VRFCertError> =>
    Effect.try({
      try: () => instance.output(),
      catch: () =>
        new VRFCertError({
          message: `VRFCert.output failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.output without Effect wrapper
 *
 * @example
 * import { VRFCert } from "@lucid-evolution/experimental";
 *
 * // Assume we have a VRFCert instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = VRFCert.unsafeOutput(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VRFCert.unsafeOutput failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeOutput = (instance: CML.VRFCert): Uint8Array =>
  Effect.runSync(output(instance));

/**
 * Method proof of VRFCert
 *
 * @example
 * import { VRFCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a VRFCert instance
 * const instance = ... ;
 *   const result = yield* VRFCert.proof(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const proof = Effect.fn(
  (instance: CML.VRFCert): Effect.Effect<Uint8Array, VRFCertError> =>
    Effect.try({
      try: () => instance.proof(),
      catch: () =>
        new VRFCertError({
          message: `VRFCert.proof failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.proof without Effect wrapper
 *
 * @example
 * import { VRFCert } from "@lucid-evolution/experimental";
 *
 * // Assume we have a VRFCert instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = VRFCert.unsafeProof(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VRFCert.unsafeProof failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeProof = (instance: CML.VRFCert): Uint8Array =>
  Effect.runSync(proof(instance));

/**
 * Static method _new of VRFCert
 *
 * @example
 * import { VRFCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* VRFCert._new( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (
  output: Uint8Array,
  proof: Uint8Array,
) {
  return yield* Effect.try({
    try: () => CML.VRFCert.new(output, proof),
    catch: () =>
      new VRFCertError({
        message: `VRFCert._new failed with parameters: ${output}, ${proof}. `,
      }),
  });
});

/**
 * Unsafely calls VRFCert._new without Effect wrapper
 *
 * @example
 * import { VRFCert } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = VRFCert.unsafe_new( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VRFCert.unsafe_new failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = (output: Uint8Array, proof: Uint8Array) =>
  Effect.runSync(_new(output, proof));
