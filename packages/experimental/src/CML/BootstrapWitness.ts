/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML BootstrapWitness class
 *
 * @since 2.0.0
 * @category Types
 */
export type BootstrapWitness = CML.BootstrapWitness;

/**
 * Error class for BootstrapWitness operations
 *
 * This error is thrown when operations on BootstrapWitness instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class BootstrapWitnessError extends Data.TaggedError(
  "BootstrapWitnessError",
)<{
  message?: string;
}> {}

/**
 * Method free of BootstrapWitness
 *
 * @example
 * import { BootstrapWitness } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a BootstrapWitness instance
 * const instance = ... ;
 *   const result = yield* BootstrapWitness.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (
    instance: CML.BootstrapWitness,
  ): Effect.Effect<void, BootstrapWitnessError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new BootstrapWitnessError({
          message: `BootstrapWitness.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { BootstrapWitness } from "@lucid-evolution/experimental";
 *
 * // Assume we have a BootstrapWitness instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = BootstrapWitness.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BootstrapWitness.freeUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.BootstrapWitness): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of BootstrapWitness
 *
 * @example
 * import { BootstrapWitness } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a BootstrapWitness instance
 * const instance = ... ;
 *   const result = yield* BootstrapWitness.toCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (
    instance: CML.BootstrapWitness,
  ): Effect.Effect<Uint8Array, BootstrapWitnessError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new BootstrapWitnessError({
          message: `BootstrapWitness.toCborBytes failed BootstrapWitness is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @example
 * import { BootstrapWitness } from "@lucid-evolution/experimental";
 *
 * // Assume we have a BootstrapWitness instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = BootstrapWitness.toCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BootstrapWitness.toCborBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.BootstrapWitness): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of BootstrapWitness
 *
 * @example
 * import { BootstrapWitness } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a BootstrapWitness instance
 * const instance = ... ;
 *   const result = yield* BootstrapWitness.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (
    instance: CML.BootstrapWitness,
  ): Effect.Effect<Uint8Array, BootstrapWitnessError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new BootstrapWitnessError({
          message: `BootstrapWitness.toCanonicalCborBytes failed BootstrapWitness is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 *
 * @example
 * import { BootstrapWitness } from "@lucid-evolution/experimental";
 *
 * // Assume we have a BootstrapWitness instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = BootstrapWitness.toCanonicalCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BootstrapWitness.toCanonicalCborBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (
  instance: CML.BootstrapWitness,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of BootstrapWitness
 *
 * @example
 * import { BootstrapWitness } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* BootstrapWitness.fromCborBytes( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.BootstrapWitness.from_cbor_bytes(cborBytes),
    catch: () =>
      new BootstrapWitnessError({
        message: `BootstrapWitness.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls BootstrapWitness.fromCborBytes without Effect wrapper
 *
 * @example
 * import { BootstrapWitness } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = BootstrapWitness.fromCborBytesUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BootstrapWitness.fromCborBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of BootstrapWitness
 *
 * @example
 * import { BootstrapWitness } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a BootstrapWitness instance
 * const instance = ... ;
 *   const result = yield* BootstrapWitness.toCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (
    instance: CML.BootstrapWitness,
  ): Effect.Effect<string, BootstrapWitnessError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new BootstrapWitnessError({
          message: `BootstrapWitness.toCborHex failed BootstrapWitness is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @example
 * import { BootstrapWitness } from "@lucid-evolution/experimental";
 *
 * // Assume we have a BootstrapWitness instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = BootstrapWitness.toCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BootstrapWitness.toCborHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.BootstrapWitness): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of BootstrapWitness
 *
 * @example
 * import { BootstrapWitness } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a BootstrapWitness instance
 * const instance = ... ;
 *   const result = yield* BootstrapWitness.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (
    instance: CML.BootstrapWitness,
  ): Effect.Effect<string, BootstrapWitnessError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new BootstrapWitnessError({
          message: `BootstrapWitness.toCanonicalCborHex failed BootstrapWitness is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @example
 * import { BootstrapWitness } from "@lucid-evolution/experimental";
 *
 * // Assume we have a BootstrapWitness instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = BootstrapWitness.toCanonicalCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BootstrapWitness.toCanonicalCborHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (
  instance: CML.BootstrapWitness,
): string => Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of BootstrapWitness
 *
 * @example
 * import { BootstrapWitness } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* BootstrapWitness.fromCborHex( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.BootstrapWitness.from_cbor_hex(cborBytes),
    catch: () =>
      new BootstrapWitnessError({
        message: `BootstrapWitness.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls BootstrapWitness.fromCborHex without Effect wrapper
 *
 * @example
 * import { BootstrapWitness } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = BootstrapWitness.fromCborHexUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BootstrapWitness.fromCborHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of BootstrapWitness
 *
 * @example
 * import { BootstrapWitness } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a BootstrapWitness instance
 * const instance = ... ;
 *   const result = yield* BootstrapWitness.toJson(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (
    instance: CML.BootstrapWitness,
  ): Effect.Effect<string, BootstrapWitnessError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new BootstrapWitnessError({
          message: `BootstrapWitness.toJson failed BootstrapWitness is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @example
 * import { BootstrapWitness } from "@lucid-evolution/experimental";
 *
 * // Assume we have a BootstrapWitness instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = BootstrapWitness.toJsonUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BootstrapWitness.toJsonUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.BootstrapWitness): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of BootstrapWitness
 *
 * @example
 * import { BootstrapWitness } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a BootstrapWitness instance
 * const instance = ... ;
 *   const result = yield* BootstrapWitness.toJsValue(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.BootstrapWitness): Effect.Effect<any, BootstrapWitnessError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new BootstrapWitnessError({
          message: `BootstrapWitness.toJsValue failed BootstrapWitness is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @example
 * import { BootstrapWitness } from "@lucid-evolution/experimental";
 *
 * // Assume we have a BootstrapWitness instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = BootstrapWitness.toJsValueUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BootstrapWitness.toJsValueUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.BootstrapWitness): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of BootstrapWitness
 *
 * @example
 * import { BootstrapWitness } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* BootstrapWitness.fromJson( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.BootstrapWitness.from_json(json),
    catch: () =>
      new BootstrapWitnessError({
        message: `BootstrapWitness.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls BootstrapWitness.fromJson without Effect wrapper
 *
 * @example
 * import { BootstrapWitness } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = BootstrapWitness.fromJsonUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BootstrapWitness.fromJsonUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string) => Effect.runSync(fromJson(json));

/**
 * Method publicKey of BootstrapWitness
 *
 * @example
 * import { BootstrapWitness } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a BootstrapWitness instance
 * const instance = ... ;
 *   const result = yield* BootstrapWitness.publicKey(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const publicKey = Effect.fn(
  (
    instance: CML.BootstrapWitness,
  ): Effect.Effect<CML.PublicKey, BootstrapWitnessError> =>
    Effect.try({
      try: () => instance.public_key(),
      catch: () =>
        new BootstrapWitnessError({
          message: `BootstrapWitness.publicKey failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.publicKey without Effect wrapper
 *
 * @example
 * import { BootstrapWitness } from "@lucid-evolution/experimental";
 *
 * // Assume we have a BootstrapWitness instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = BootstrapWitness.publicKeyUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BootstrapWitness.publicKeyUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const publicKeyUnsafe = (
  instance: CML.BootstrapWitness,
): CML.PublicKey => Effect.runSync(publicKey(instance));

/**
 * Method signature of BootstrapWitness
 *
 * @example
 * import { BootstrapWitness } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a BootstrapWitness instance
 * const instance = ... ;
 *   const result = yield* BootstrapWitness.signature(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const signature = Effect.fn(
  (
    instance: CML.BootstrapWitness,
  ): Effect.Effect<CML.Ed25519Signature, BootstrapWitnessError> =>
    Effect.try({
      try: () => instance.signature(),
      catch: () =>
        new BootstrapWitnessError({
          message: `BootstrapWitness.signature failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.signature without Effect wrapper
 *
 * @example
 * import { BootstrapWitness } from "@lucid-evolution/experimental";
 *
 * // Assume we have a BootstrapWitness instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = BootstrapWitness.signatureUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BootstrapWitness.signatureUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const signatureUnsafe = (
  instance: CML.BootstrapWitness,
): CML.Ed25519Signature => Effect.runSync(signature(instance));

/**
 * Method chainCode of BootstrapWitness
 *
 * @example
 * import { BootstrapWitness } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a BootstrapWitness instance
 * const instance = ... ;
 *   const result = yield* BootstrapWitness.chainCode(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const chainCode = Effect.fn(
  (
    instance: CML.BootstrapWitness,
  ): Effect.Effect<Uint8Array, BootstrapWitnessError> =>
    Effect.try({
      try: () => instance.chain_code(),
      catch: () =>
        new BootstrapWitnessError({
          message: `BootstrapWitness.chainCode failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.chainCode without Effect wrapper
 *
 * @example
 * import { BootstrapWitness } from "@lucid-evolution/experimental";
 *
 * // Assume we have a BootstrapWitness instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = BootstrapWitness.chainCodeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BootstrapWitness.chainCodeUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const chainCodeUnsafe = (instance: CML.BootstrapWitness): Uint8Array =>
  Effect.runSync(chainCode(instance));

/**
 * Method attributes of BootstrapWitness
 *
 * @example
 * import { BootstrapWitness } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a BootstrapWitness instance
 * const instance = ... ;
 *   const result = yield* BootstrapWitness.attributes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const attributes = Effect.fn(
  (
    instance: CML.BootstrapWitness,
  ): Effect.Effect<CML.AddrAttributes, BootstrapWitnessError> =>
    Effect.try({
      try: () => instance.attributes(),
      catch: () =>
        new BootstrapWitnessError({
          message: `BootstrapWitness.attributes failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.attributes without Effect wrapper
 *
 * @example
 * import { BootstrapWitness } from "@lucid-evolution/experimental";
 *
 * // Assume we have a BootstrapWitness instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = BootstrapWitness.attributesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BootstrapWitness.attributesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const attributesUnsafe = (
  instance: CML.BootstrapWitness,
): CML.AddrAttributes => Effect.runSync(attributes(instance));

/**
 * Static method _new of BootstrapWitness
 *
 * @example
 * import { BootstrapWitness } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* BootstrapWitness._new( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (
  publicKey: CML.PublicKey,
  signature: CML.Ed25519Signature,
  chainCode: Uint8Array,
  attributes: CML.AddrAttributes,
) {
  return yield* Effect.try({
    try: () =>
      CML.BootstrapWitness.new(publicKey, signature, chainCode, attributes),
    catch: () =>
      new BootstrapWitnessError({
        message: `BootstrapWitness._new failed with parameters: ${publicKey} (PublicKey), ${signature} (Ed25519Signature), ${chainCode}, ${attributes} (AddrAttributes). `,
      }),
  });
});

/**
 * Unsafely calls BootstrapWitness._new without Effect wrapper
 *
 * @example
 * import { BootstrapWitness } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = BootstrapWitness._newUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BootstrapWitness._newUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (
  publicKey: CML.PublicKey,
  signature: CML.Ed25519Signature,
  chainCode: Uint8Array,
  attributes: CML.AddrAttributes,
) => Effect.runSync(_new(publicKey, signature, chainCode, attributes));

/**
 * Method toAddress of BootstrapWitness
 *
 * @example
 * import { BootstrapWitness } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a BootstrapWitness instance
 * const instance = ... ;
 *   const result = yield* BootstrapWitness.toAddress(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toAddress = Effect.fn(
  (
    instance: CML.BootstrapWitness,
  ): Effect.Effect<CML.AddressContent, BootstrapWitnessError> =>
    Effect.try({
      try: () => instance.to_address(),
      catch: () =>
        new BootstrapWitnessError({
          message: `BootstrapWitness.toAddress failed BootstrapWitness is not valid for AddressContent conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toAddress without Effect wrapper
 *
 * @example
 * import { BootstrapWitness } from "@lucid-evolution/experimental";
 *
 * // Assume we have a BootstrapWitness instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = BootstrapWitness.toAddressUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BootstrapWitness.toAddressUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toAddressUnsafe = (
  instance: CML.BootstrapWitness,
): CML.AddressContent => Effect.runSync(toAddress(instance));
