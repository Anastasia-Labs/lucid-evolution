import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type OperationalCert = CML.OperationalCert;

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
 *   const result = OperationalCert.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`OperationalCert.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.OperationalCert): void =>
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
 *   const result = OperationalCert.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`OperationalCert.unsafeToCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (instance: CML.OperationalCert): Uint8Array =>
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
 *   const result = OperationalCert.unsafeToCanonicalCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`OperationalCert.unsafeToCanonicalCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborBytes = (instance: CML.OperationalCert): Uint8Array =>
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
 *   const result = OperationalCert.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`OperationalCert.unsafeFromCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
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
 *   const result = OperationalCert.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`OperationalCert.unsafeToCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (instance: CML.OperationalCert): string =>
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
 *   const result = OperationalCert.unsafeToCanonicalCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`OperationalCert.unsafeToCanonicalCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborHex = (instance: CML.OperationalCert): string =>
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
 *   const result = OperationalCert.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`OperationalCert.unsafeFromCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
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
 *   const result = OperationalCert.unsafeToJson(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`OperationalCert.unsafeToJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJson = (instance: CML.OperationalCert): string =>
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
 *   const result = OperationalCert.unsafeToJsValue(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`OperationalCert.unsafeToJsValue failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJsValue = (instance: CML.OperationalCert): any =>
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
 *   const result = OperationalCert.unsafeFromJson( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`OperationalCert.unsafeFromJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromJson = (json: string) =>
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
 *   const result = OperationalCert.unsafeHotVkey(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`OperationalCert.unsafeHotVkey failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeHotVkey = (instance: CML.OperationalCert): CML.KESVkey =>
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
 *   const result = OperationalCert.unsafeSequenceNumber(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`OperationalCert.unsafeSequenceNumber failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeSequenceNumber = (instance: CML.OperationalCert): bigint =>
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
 *   const result = OperationalCert.unsafeKesPeriod(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`OperationalCert.unsafeKesPeriod failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeKesPeriod = (instance: CML.OperationalCert): bigint =>
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
 *   const result = OperationalCert.unsafeSigma(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`OperationalCert.unsafeSigma failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeSigma = (instance: CML.OperationalCert): CML.Ed25519Signature =>
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
 *   const result = OperationalCert.unsafe_new( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`OperationalCert.unsafe_new failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = (hotVkey: CML.KESVkey, sequenceNumber: bigint, kesPeriod: bigint, sigma: CML.Ed25519Signature) =>
  Effect.runSync(_new(hotVkey, sequenceNumber, kesPeriod, sigma));
