/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML OperationalCert class
 *
 * @since 2.0.0
 * @category Types
 */
export type OperationalCert = CML.OperationalCert;

/**
 * Error class for OperationalCert operations
 * 
 * This error is thrown when operations on OperationalCert instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class OperationalCertError extends Data.TaggedError("OperationalCertError")<{
  message?: string;
}> {}

/**
 * Method free of OperationalCert
 * 
 * @example
 * import { OperationalCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a OperationalCert instance
 * const instance = ... ;
 *   const result = yield* OperationalCert.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.OperationalCert): Effect.Effect<void, OperationalCertError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new OperationalCertError({
          message: `OperationalCert.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { OperationalCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a OperationalCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = OperationalCert.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`OperationalCert.freeUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.OperationalCert): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of OperationalCert
 * 
 * @example
 * import { OperationalCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a OperationalCert instance
 * const instance = ... ;
 *   const result = yield* OperationalCert.toCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.OperationalCert): Effect.Effect<Uint8Array, OperationalCertError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new OperationalCertError({
          message: `OperationalCert.toCborBytes failed OperationalCert is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @example
 * import { OperationalCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a OperationalCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = OperationalCert.toCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`OperationalCert.toCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.OperationalCert): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of OperationalCert
 * 
 * @example
 * import { OperationalCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a OperationalCert instance
 * const instance = ... ;
 *   const result = yield* OperationalCert.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.OperationalCert): Effect.Effect<Uint8Array, OperationalCertError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new OperationalCertError({
          message: `OperationalCert.toCanonicalCborBytes failed OperationalCert is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @example
 * import { OperationalCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a OperationalCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = OperationalCert.toCanonicalCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`OperationalCert.toCanonicalCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (instance: CML.OperationalCert): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of OperationalCert
 * 
 * @example
 * import { OperationalCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* OperationalCert.fromCborBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.OperationalCert.from_cbor_bytes(cborBytes),
    catch: () => new OperationalCertError({
      message: `OperationalCert.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls OperationalCert.fromCborBytes without Effect wrapper
 * 
 * @example
 * import { OperationalCert } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = OperationalCert.fromCborBytesUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`OperationalCert.fromCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of OperationalCert
 * 
 * @example
 * import { OperationalCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a OperationalCert instance
 * const instance = ... ;
 *   const result = yield* OperationalCert.toCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.OperationalCert): Effect.Effect<string, OperationalCertError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new OperationalCertError({
          message: `OperationalCert.toCborHex failed OperationalCert is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @example
 * import { OperationalCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a OperationalCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = OperationalCert.toCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`OperationalCert.toCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.OperationalCert): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of OperationalCert
 * 
 * @example
 * import { OperationalCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a OperationalCert instance
 * const instance = ... ;
 *   const result = yield* OperationalCert.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.OperationalCert): Effect.Effect<string, OperationalCertError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new OperationalCertError({
          message: `OperationalCert.toCanonicalCborHex failed OperationalCert is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @example
 * import { OperationalCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a OperationalCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = OperationalCert.toCanonicalCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`OperationalCert.toCanonicalCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.OperationalCert): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of OperationalCert
 * 
 * @example
 * import { OperationalCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* OperationalCert.fromCborHex( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.OperationalCert.from_cbor_hex(cborBytes),
    catch: () => new OperationalCertError({
      message: `OperationalCert.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls OperationalCert.fromCborHex without Effect wrapper
 * 
 * @example
 * import { OperationalCert } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = OperationalCert.fromCborHexUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`OperationalCert.fromCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of OperationalCert
 * 
 * @example
 * import { OperationalCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a OperationalCert instance
 * const instance = ... ;
 *   const result = yield* OperationalCert.toJson(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.OperationalCert): Effect.Effect<string, OperationalCertError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new OperationalCertError({
          message: `OperationalCert.toJson failed OperationalCert is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @example
 * import { OperationalCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a OperationalCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = OperationalCert.toJsonUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`OperationalCert.toJsonUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.OperationalCert): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of OperationalCert
 * 
 * @example
 * import { OperationalCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a OperationalCert instance
 * const instance = ... ;
 *   const result = yield* OperationalCert.toJsValue(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.OperationalCert): Effect.Effect<any, OperationalCertError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new OperationalCertError({
          message: `OperationalCert.toJsValue failed OperationalCert is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @example
 * import { OperationalCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a OperationalCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = OperationalCert.toJsValueUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`OperationalCert.toJsValueUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.OperationalCert): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of OperationalCert
 * 
 * @example
 * import { OperationalCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* OperationalCert.fromJson( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.OperationalCert.from_json(json),
    catch: () => new OperationalCertError({
      message: `OperationalCert.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls OperationalCert.fromJson without Effect wrapper
 * 
 * @example
 * import { OperationalCert } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = OperationalCert.fromJsonUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`OperationalCert.fromJsonUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string) =>
  Effect.runSync(fromJson(json));

/**
 * Method hotVkey of OperationalCert
 * 
 * @example
 * import { OperationalCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a OperationalCert instance
 * const instance = ... ;
 *   const result = yield* OperationalCert.hotVkey(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const hotVkey = Effect.fn(
  (instance: CML.OperationalCert): Effect.Effect<CML.KESVkey, OperationalCertError> =>
    Effect.try({
      try: () => instance.hot_vkey(),
      catch: () =>
        new OperationalCertError({
          message: `OperationalCert.hotVkey failed `,
        }),
    })
);

/**
 * Unsafely calls instance.hotVkey without Effect wrapper
 * 
 * @example
 * import { OperationalCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a OperationalCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = OperationalCert.hotVkeyUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`OperationalCert.hotVkeyUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const hotVkeyUnsafe = (instance: CML.OperationalCert): CML.KESVkey =>
  Effect.runSync(hotVkey(instance));

/**
 * Method sequenceNumber of OperationalCert
 * 
 * @example
 * import { OperationalCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a OperationalCert instance
 * const instance = ... ;
 *   const result = yield* OperationalCert.sequenceNumber(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const sequenceNumber = Effect.fn(
  (instance: CML.OperationalCert): Effect.Effect<bigint, OperationalCertError> =>
    Effect.try({
      try: () => instance.sequence_number(),
      catch: () =>
        new OperationalCertError({
          message: `OperationalCert.sequenceNumber failed `,
        }),
    })
);

/**
 * Unsafely calls instance.sequenceNumber without Effect wrapper
 * 
 * @example
 * import { OperationalCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a OperationalCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = OperationalCert.sequenceNumberUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`OperationalCert.sequenceNumberUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const sequenceNumberUnsafe = (instance: CML.OperationalCert): bigint =>
  Effect.runSync(sequenceNumber(instance));

/**
 * Method kesPeriod of OperationalCert
 * 
 * @example
 * import { OperationalCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a OperationalCert instance
 * const instance = ... ;
 *   const result = yield* OperationalCert.kesPeriod(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const kesPeriod = Effect.fn(
  (instance: CML.OperationalCert): Effect.Effect<bigint, OperationalCertError> =>
    Effect.try({
      try: () => instance.kes_period(),
      catch: () =>
        new OperationalCertError({
          message: `OperationalCert.kesPeriod failed `,
        }),
    })
);

/**
 * Unsafely calls instance.kesPeriod without Effect wrapper
 * 
 * @example
 * import { OperationalCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a OperationalCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = OperationalCert.kesPeriodUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`OperationalCert.kesPeriodUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const kesPeriodUnsafe = (instance: CML.OperationalCert): bigint =>
  Effect.runSync(kesPeriod(instance));

/**
 * Method sigma of OperationalCert
 * 
 * @example
 * import { OperationalCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a OperationalCert instance
 * const instance = ... ;
 *   const result = yield* OperationalCert.sigma(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const sigma = Effect.fn(
  (instance: CML.OperationalCert): Effect.Effect<CML.Ed25519Signature, OperationalCertError> =>
    Effect.try({
      try: () => instance.sigma(),
      catch: () =>
        new OperationalCertError({
          message: `OperationalCert.sigma failed `,
        }),
    })
);

/**
 * Unsafely calls instance.sigma without Effect wrapper
 * 
 * @example
 * import { OperationalCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a OperationalCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = OperationalCert.sigmaUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`OperationalCert.sigmaUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const sigmaUnsafe = (instance: CML.OperationalCert): CML.Ed25519Signature =>
  Effect.runSync(sigma(instance));

/**
 * Static method _new of OperationalCert
 * 
 * @example
 * import { OperationalCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* OperationalCert._new( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (hotVkey: CML.KESVkey, sequenceNumber: bigint, kesPeriod: bigint, sigma: CML.Ed25519Signature) {
  return yield* Effect.try({
    try: () => CML.OperationalCert.new(hotVkey, sequenceNumber, kesPeriod, sigma),
    catch: () => new OperationalCertError({
      message: `OperationalCert._new failed with parameters: ${hotVkey} (KESVkey), ${sequenceNumber}, ${kesPeriod}, ${sigma} (Ed25519Signature). `,
    }),
  });
});

/**
 * Unsafely calls OperationalCert._new without Effect wrapper
 * 
 * @example
 * import { OperationalCert } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = OperationalCert._newUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`OperationalCert._newUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (hotVkey: CML.KESVkey, sequenceNumber: bigint, kesPeriod: bigint, sigma: CML.Ed25519Signature) =>
  Effect.runSync(_new(hotVkey, sequenceNumber, kesPeriod, sigma));
