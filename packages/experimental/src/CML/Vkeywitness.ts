import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type Vkeywitness = CML.Vkeywitness;

export class VkeywitnessError extends Data.TaggedError("VkeywitnessError")<{
  message?: string;
}> {}

/**
 * Method free of Vkeywitness
 *
 * @example
 * import { Vkeywitness } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Vkeywitness instance
 * const instance = ... ;
 *   const result = yield* Vkeywitness.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.Vkeywitness): Effect.Effect<void, VkeywitnessError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new VkeywitnessError({
          message: `Vkeywitness.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { Vkeywitness } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Vkeywitness instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Vkeywitness.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Vkeywitness.unsafeFree failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.Vkeywitness): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of Vkeywitness
 *
 * @example
 * import { Vkeywitness } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Vkeywitness instance
 * const instance = ... ;
 *   const result = yield* Vkeywitness.toCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.Vkeywitness): Effect.Effect<Uint8Array, VkeywitnessError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new VkeywitnessError({
          message: `Vkeywitness.toCborBytes failed Vkeywitness is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @example
 * import { Vkeywitness } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Vkeywitness instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Vkeywitness.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Vkeywitness.unsafeToCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (instance: CML.Vkeywitness): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of Vkeywitness
 *
 * @example
 * import { Vkeywitness } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Vkeywitness instance
 * const instance = ... ;
 *   const result = yield* Vkeywitness.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.Vkeywitness): Effect.Effect<Uint8Array, VkeywitnessError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new VkeywitnessError({
          message: `Vkeywitness.toCanonicalCborBytes failed Vkeywitness is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 *
 * @example
 * import { Vkeywitness } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Vkeywitness instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Vkeywitness.unsafeToCanonicalCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Vkeywitness.unsafeToCanonicalCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborBytes = (
  instance: CML.Vkeywitness,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of Vkeywitness
 *
 * @example
 * import { Vkeywitness } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* Vkeywitness.fromCborBytes( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.Vkeywitness.from_cbor_bytes(cborBytes),
    catch: () =>
      new VkeywitnessError({
        message: `Vkeywitness.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls Vkeywitness.fromCborBytes without Effect wrapper
 *
 * @example
 * import { Vkeywitness } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Vkeywitness.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Vkeywitness.unsafeFromCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of Vkeywitness
 *
 * @example
 * import { Vkeywitness } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Vkeywitness instance
 * const instance = ... ;
 *   const result = yield* Vkeywitness.toCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.Vkeywitness): Effect.Effect<string, VkeywitnessError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new VkeywitnessError({
          message: `Vkeywitness.toCborHex failed Vkeywitness is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @example
 * import { Vkeywitness } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Vkeywitness instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Vkeywitness.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Vkeywitness.unsafeToCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (instance: CML.Vkeywitness): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of Vkeywitness
 *
 * @example
 * import { Vkeywitness } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Vkeywitness instance
 * const instance = ... ;
 *   const result = yield* Vkeywitness.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.Vkeywitness): Effect.Effect<string, VkeywitnessError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new VkeywitnessError({
          message: `Vkeywitness.toCanonicalCborHex failed Vkeywitness is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @example
 * import { Vkeywitness } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Vkeywitness instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Vkeywitness.unsafeToCanonicalCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Vkeywitness.unsafeToCanonicalCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborHex = (instance: CML.Vkeywitness): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of Vkeywitness
 *
 * @example
 * import { Vkeywitness } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* Vkeywitness.fromCborHex( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.Vkeywitness.from_cbor_hex(cborBytes),
    catch: () =>
      new VkeywitnessError({
        message: `Vkeywitness.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls Vkeywitness.fromCborHex without Effect wrapper
 *
 * @example
 * import { Vkeywitness } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Vkeywitness.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Vkeywitness.unsafeFromCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of Vkeywitness
 *
 * @example
 * import { Vkeywitness } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Vkeywitness instance
 * const instance = ... ;
 *   const result = yield* Vkeywitness.toJson(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.Vkeywitness): Effect.Effect<string, VkeywitnessError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new VkeywitnessError({
          message: `Vkeywitness.toJson failed Vkeywitness is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @example
 * import { Vkeywitness } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Vkeywitness instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Vkeywitness.unsafeToJson(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Vkeywitness.unsafeToJson failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJson = (instance: CML.Vkeywitness): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of Vkeywitness
 *
 * @example
 * import { Vkeywitness } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Vkeywitness instance
 * const instance = ... ;
 *   const result = yield* Vkeywitness.toJsValue(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.Vkeywitness): Effect.Effect<any, VkeywitnessError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new VkeywitnessError({
          message: `Vkeywitness.toJsValue failed Vkeywitness is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @example
 * import { Vkeywitness } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Vkeywitness instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Vkeywitness.unsafeToJsValue(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Vkeywitness.unsafeToJsValue failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJsValue = (instance: CML.Vkeywitness): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of Vkeywitness
 *
 * @example
 * import { Vkeywitness } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* Vkeywitness.fromJson( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.Vkeywitness.from_json(json),
    catch: () =>
      new VkeywitnessError({
        message: `Vkeywitness.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls Vkeywitness.fromJson without Effect wrapper
 *
 * @example
 * import { Vkeywitness } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Vkeywitness.unsafeFromJson( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Vkeywitness.unsafeFromJson failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromJson = (json: string) => Effect.runSync(fromJson(json));

/**
 * Method vkey of Vkeywitness
 *
 * @example
 * import { Vkeywitness } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Vkeywitness instance
 * const instance = ... ;
 *   const result = yield* Vkeywitness.vkey(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const vkey = Effect.fn(
  (instance: CML.Vkeywitness): Effect.Effect<CML.PublicKey, VkeywitnessError> =>
    Effect.try({
      try: () => instance.vkey(),
      catch: () =>
        new VkeywitnessError({
          message: `Vkeywitness.vkey failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.vkey without Effect wrapper
 *
 * @example
 * import { Vkeywitness } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Vkeywitness instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Vkeywitness.unsafeVkey(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Vkeywitness.unsafeVkey failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeVkey = (instance: CML.Vkeywitness): CML.PublicKey =>
  Effect.runSync(vkey(instance));

/**
 * Method ed25519Signature of Vkeywitness
 *
 * @example
 * import { Vkeywitness } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Vkeywitness instance
 * const instance = ... ;
 *   const result = yield* Vkeywitness.ed25519Signature(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const ed25519Signature = Effect.fn(
  (
    instance: CML.Vkeywitness,
  ): Effect.Effect<CML.Ed25519Signature, VkeywitnessError> =>
    Effect.try({
      try: () => instance.ed25519_signature(),
      catch: () =>
        new VkeywitnessError({
          message: `Vkeywitness.ed25519Signature failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.ed25519Signature without Effect wrapper
 *
 * @example
 * import { Vkeywitness } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Vkeywitness instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Vkeywitness.unsafeEd25519Signature(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Vkeywitness.unsafeEd25519Signature failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeEd25519Signature = (
  instance: CML.Vkeywitness,
): CML.Ed25519Signature => Effect.runSync(ed25519Signature(instance));

/**
 * Static method _new of Vkeywitness
 *
 * @example
 * import { Vkeywitness } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* Vkeywitness._new( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (
  vkey: CML.PublicKey,
  ed25519Signature: CML.Ed25519Signature,
) {
  return yield* Effect.try({
    try: () => CML.Vkeywitness.new(vkey, ed25519Signature),
    catch: () =>
      new VkeywitnessError({
        message: `Vkeywitness._new failed with parameters: ${vkey} (PublicKey), ${ed25519Signature} (Ed25519Signature). `,
      }),
  });
});

/**
 * Unsafely calls Vkeywitness._new without Effect wrapper
 *
 * @example
 * import { Vkeywitness } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Vkeywitness.unsafe_new( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Vkeywitness.unsafe_new failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = (
  vkey: CML.PublicKey,
  ed25519Signature: CML.Ed25519Signature,
) => Effect.runSync(_new(vkey, ed25519Signature));
