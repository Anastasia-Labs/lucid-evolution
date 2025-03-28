import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type ScriptPubkey = CML.ScriptPubkey;

export class ScriptPubkeyError extends Data.TaggedError("ScriptPubkeyError")<{
  message?: string;
}> {}

/**
 * Method free of ScriptPubkey
 * 
 * @example
 * import { ScriptPubkey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ScriptPubkey instance
 * const instance = ... ;
 *   const result = yield* ScriptPubkey.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.ScriptPubkey): Effect.Effect<void, ScriptPubkeyError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new ScriptPubkeyError({
          message: `ScriptPubkey.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { ScriptPubkey } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ScriptPubkey instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptPubkey.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptPubkey.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.ScriptPubkey): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of ScriptPubkey
 * 
 * @example
 * import { ScriptPubkey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ScriptPubkey instance
 * const instance = ... ;
 *   const result = yield* ScriptPubkey.toCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.ScriptPubkey): Effect.Effect<Uint8Array, ScriptPubkeyError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new ScriptPubkeyError({
          message: `ScriptPubkey.toCborBytes failed ScriptPubkey is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @example
 * import { ScriptPubkey } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ScriptPubkey instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptPubkey.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptPubkey.unsafeToCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (instance: CML.ScriptPubkey): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of ScriptPubkey
 * 
 * @example
 * import { ScriptPubkey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ScriptPubkey instance
 * const instance = ... ;
 *   const result = yield* ScriptPubkey.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.ScriptPubkey): Effect.Effect<Uint8Array, ScriptPubkeyError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new ScriptPubkeyError({
          message: `ScriptPubkey.toCanonicalCborBytes failed ScriptPubkey is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @example
 * import { ScriptPubkey } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ScriptPubkey instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptPubkey.unsafeToCanonicalCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptPubkey.unsafeToCanonicalCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborBytes = (instance: CML.ScriptPubkey): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of ScriptPubkey
 * 
 * @example
 * import { ScriptPubkey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* ScriptPubkey.fromCborBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.ScriptPubkey.from_cbor_bytes(cborBytes),
    catch: () => new ScriptPubkeyError({
      message: `ScriptPubkey.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls ScriptPubkey.fromCborBytes without Effect wrapper
 * 
 * @example
 * import { ScriptPubkey } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptPubkey.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptPubkey.unsafeFromCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of ScriptPubkey
 * 
 * @example
 * import { ScriptPubkey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ScriptPubkey instance
 * const instance = ... ;
 *   const result = yield* ScriptPubkey.toCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.ScriptPubkey): Effect.Effect<string, ScriptPubkeyError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new ScriptPubkeyError({
          message: `ScriptPubkey.toCborHex failed ScriptPubkey is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @example
 * import { ScriptPubkey } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ScriptPubkey instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptPubkey.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptPubkey.unsafeToCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (instance: CML.ScriptPubkey): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of ScriptPubkey
 * 
 * @example
 * import { ScriptPubkey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ScriptPubkey instance
 * const instance = ... ;
 *   const result = yield* ScriptPubkey.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.ScriptPubkey): Effect.Effect<string, ScriptPubkeyError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new ScriptPubkeyError({
          message: `ScriptPubkey.toCanonicalCborHex failed ScriptPubkey is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @example
 * import { ScriptPubkey } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ScriptPubkey instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptPubkey.unsafeToCanonicalCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptPubkey.unsafeToCanonicalCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborHex = (instance: CML.ScriptPubkey): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of ScriptPubkey
 * 
 * @example
 * import { ScriptPubkey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* ScriptPubkey.fromCborHex( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.ScriptPubkey.from_cbor_hex(cborBytes),
    catch: () => new ScriptPubkeyError({
      message: `ScriptPubkey.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls ScriptPubkey.fromCborHex without Effect wrapper
 * 
 * @example
 * import { ScriptPubkey } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptPubkey.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptPubkey.unsafeFromCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of ScriptPubkey
 * 
 * @example
 * import { ScriptPubkey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ScriptPubkey instance
 * const instance = ... ;
 *   const result = yield* ScriptPubkey.toJson(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.ScriptPubkey): Effect.Effect<string, ScriptPubkeyError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new ScriptPubkeyError({
          message: `ScriptPubkey.toJson failed ScriptPubkey is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @example
 * import { ScriptPubkey } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ScriptPubkey instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptPubkey.unsafeToJson(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptPubkey.unsafeToJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJson = (instance: CML.ScriptPubkey): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of ScriptPubkey
 * 
 * @example
 * import { ScriptPubkey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ScriptPubkey instance
 * const instance = ... ;
 *   const result = yield* ScriptPubkey.toJsValue(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.ScriptPubkey): Effect.Effect<any, ScriptPubkeyError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new ScriptPubkeyError({
          message: `ScriptPubkey.toJsValue failed ScriptPubkey is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @example
 * import { ScriptPubkey } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ScriptPubkey instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptPubkey.unsafeToJsValue(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptPubkey.unsafeToJsValue failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJsValue = (instance: CML.ScriptPubkey): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of ScriptPubkey
 * 
 * @example
 * import { ScriptPubkey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* ScriptPubkey.fromJson( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.ScriptPubkey.from_json(json),
    catch: () => new ScriptPubkeyError({
      message: `ScriptPubkey.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls ScriptPubkey.fromJson without Effect wrapper
 * 
 * @example
 * import { ScriptPubkey } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptPubkey.unsafeFromJson( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptPubkey.unsafeFromJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromJson = (json: string) =>
  Effect.runSync(fromJson(json));

/**
 * Method ed25519KeyHash of ScriptPubkey
 * 
 * @example
 * import { ScriptPubkey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ScriptPubkey instance
 * const instance = ... ;
 *   const result = yield* ScriptPubkey.ed25519KeyHash(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const ed25519KeyHash = Effect.fn(
  (instance: CML.ScriptPubkey): Effect.Effect<CML.Ed25519KeyHash, ScriptPubkeyError> =>
    Effect.try({
      try: () => instance.ed25519_key_hash(),
      catch: () =>
        new ScriptPubkeyError({
          message: `ScriptPubkey.ed25519KeyHash failed `,
        }),
    })
);

/**
 * Unsafely calls instance.ed25519KeyHash without Effect wrapper
 * 
 * @example
 * import { ScriptPubkey } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ScriptPubkey instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptPubkey.unsafeEd25519KeyHash(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptPubkey.unsafeEd25519KeyHash failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeEd25519KeyHash = (instance: CML.ScriptPubkey): CML.Ed25519KeyHash =>
  Effect.runSync(ed25519KeyHash(instance));

/**
 * Static method _new of ScriptPubkey
 * 
 * @example
 * import { ScriptPubkey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* ScriptPubkey._new( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (ed25519KeyHash: CML.Ed25519KeyHash) {
  return yield* Effect.try({
    try: () => CML.ScriptPubkey.new(ed25519KeyHash),
    catch: () => new ScriptPubkeyError({
      message: `ScriptPubkey._new failed with parameters: ${ed25519KeyHash} (Ed25519KeyHash). `,
    }),
  });
});

/**
 * Unsafely calls ScriptPubkey._new without Effect wrapper
 * 
 * @example
 * import { ScriptPubkey } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptPubkey.unsafe_new( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptPubkey.unsafe_new failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = (ed25519KeyHash: CML.Ed25519KeyHash) =>
  Effect.runSync(_new(ed25519KeyHash));
