/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML DRep class
 *
 * @since 2.0.0
 * @category Types
 */
export type DRep = CML.DRep;

/**
 * Error class for DRep operations
 *
 * This error is thrown when operations on DRep instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class DRepError extends Data.TaggedError("DRepError")<{
  message?: string;
}> {}

/**
 * Method free of DRep
 *
 * @example
 * import { DRep } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a DRep instance
 * const instance = ... ;
 *   const result = yield* DRep.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.DRep): Effect.Effect<void, DRepError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new DRepError({
          message: `DRep.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { DRep } from "@lucid-evolution/experimental";
 *
 * // Assume we have a DRep instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = DRep.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRep.freeUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.DRep): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of DRep
 *
 * @example
 * import { DRep } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a DRep instance
 * const instance = ... ;
 *   const result = yield* DRep.toCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.DRep): Effect.Effect<Uint8Array, DRepError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new DRepError({
          message: `DRep.toCborBytes failed DRep is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @example
 * import { DRep } from "@lucid-evolution/experimental";
 *
 * // Assume we have a DRep instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = DRep.toCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRep.toCborBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.DRep): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of DRep
 *
 * @example
 * import { DRep } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a DRep instance
 * const instance = ... ;
 *   const result = yield* DRep.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.DRep): Effect.Effect<Uint8Array, DRepError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new DRepError({
          message: `DRep.toCanonicalCborBytes failed DRep is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 *
 * @example
 * import { DRep } from "@lucid-evolution/experimental";
 *
 * // Assume we have a DRep instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = DRep.toCanonicalCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRep.toCanonicalCborBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (instance: CML.DRep): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of DRep
 *
 * @example
 * import { DRep } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* DRep.fromCborBytes( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.DRep.from_cbor_bytes(cborBytes),
    catch: () =>
      new DRepError({
        message: `DRep.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls DRep.fromCborBytes without Effect wrapper
 *
 * @example
 * import { DRep } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = DRep.fromCborBytesUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRep.fromCborBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of DRep
 *
 * @example
 * import { DRep } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a DRep instance
 * const instance = ... ;
 *   const result = yield* DRep.toCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.DRep): Effect.Effect<string, DRepError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new DRepError({
          message: `DRep.toCborHex failed DRep is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @example
 * import { DRep } from "@lucid-evolution/experimental";
 *
 * // Assume we have a DRep instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = DRep.toCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRep.toCborHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.DRep): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of DRep
 *
 * @example
 * import { DRep } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a DRep instance
 * const instance = ... ;
 *   const result = yield* DRep.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.DRep): Effect.Effect<string, DRepError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new DRepError({
          message: `DRep.toCanonicalCborHex failed DRep is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @example
 * import { DRep } from "@lucid-evolution/experimental";
 *
 * // Assume we have a DRep instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = DRep.toCanonicalCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRep.toCanonicalCborHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.DRep): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of DRep
 *
 * @example
 * import { DRep } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* DRep.fromCborHex( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.DRep.from_cbor_hex(cborBytes),
    catch: () =>
      new DRepError({
        message: `DRep.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls DRep.fromCborHex without Effect wrapper
 *
 * @example
 * import { DRep } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = DRep.fromCborHexUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRep.fromCborHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of DRep
 *
 * @example
 * import { DRep } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a DRep instance
 * const instance = ... ;
 *   const result = yield* DRep.toJson(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.DRep): Effect.Effect<string, DRepError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new DRepError({
          message: `DRep.toJson failed DRep is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @example
 * import { DRep } from "@lucid-evolution/experimental";
 *
 * // Assume we have a DRep instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = DRep.toJsonUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRep.toJsonUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.DRep): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of DRep
 *
 * @example
 * import { DRep } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a DRep instance
 * const instance = ... ;
 *   const result = yield* DRep.toJsValue(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.DRep): Effect.Effect<any, DRepError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new DRepError({
          message: `DRep.toJsValue failed DRep is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @example
 * import { DRep } from "@lucid-evolution/experimental";
 *
 * // Assume we have a DRep instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = DRep.toJsValueUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRep.toJsValueUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.DRep): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of DRep
 *
 * @example
 * import { DRep } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* DRep.fromJson( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.DRep.from_json(json),
    catch: () =>
      new DRepError({
        message: `DRep.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls DRep.fromJson without Effect wrapper
 *
 * @example
 * import { DRep } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = DRep.fromJsonUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRep.fromJsonUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string) => Effect.runSync(fromJson(json));

/**
 * Static method newKey of DRep
 *
 * @example
 * import { DRep } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* DRep.newKey( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newKey = Effect.fn(function* (pool: CML.Ed25519KeyHash) {
  return yield* Effect.try({
    try: () => CML.DRep.new_key(pool),
    catch: () =>
      new DRepError({
        message: `DRep.newKey failed with parameters: ${pool} (Ed25519KeyHash). `,
      }),
  });
});

/**
 * Unsafely calls DRep.newKey without Effect wrapper
 *
 * @example
 * import { DRep } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = DRep.newKeyUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRep.newKeyUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newKeyUnsafe = (pool: CML.Ed25519KeyHash) =>
  Effect.runSync(newKey(pool));

/**
 * Static method newScript of DRep
 *
 * @example
 * import { DRep } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* DRep.newScript( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newScript = Effect.fn(function* (scriptHash: CML.ScriptHash) {
  return yield* Effect.try({
    try: () => CML.DRep.new_script(scriptHash),
    catch: () =>
      new DRepError({
        message: `DRep.newScript failed with parameters: ${scriptHash} (ScriptHash). `,
      }),
  });
});

/**
 * Unsafely calls DRep.newScript without Effect wrapper
 *
 * @example
 * import { DRep } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = DRep.newScriptUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRep.newScriptUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newScriptUnsafe = (scriptHash: CML.ScriptHash) =>
  Effect.runSync(newScript(scriptHash));

/**
 * Static method newAlwaysAbstain of DRep
 *
 * @example
 * import { DRep } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* DRep.newAlwaysAbstain();
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newAlwaysAbstain = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.DRep.new_always_abstain(),
    catch: () =>
      new DRepError({
        message: `DRep.newAlwaysAbstain failed `,
      }),
  });
});

/**
 * Unsafely calls DRep.newAlwaysAbstain without Effect wrapper
 *
 * @example
 * import { DRep } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = DRep.newAlwaysAbstainUnsafe();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRep.newAlwaysAbstainUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newAlwaysAbstainUnsafe = () => Effect.runSync(newAlwaysAbstain());

/**
 * Static method newAlwaysNoConfidence of DRep
 *
 * @example
 * import { DRep } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* DRep.newAlwaysNoConfidence();
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newAlwaysNoConfidence = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.DRep.new_always_no_confidence(),
    catch: () =>
      new DRepError({
        message: `DRep.newAlwaysNoConfidence failed `,
      }),
  });
});

/**
 * Unsafely calls DRep.newAlwaysNoConfidence without Effect wrapper
 *
 * @example
 * import { DRep } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = DRep.newAlwaysNoConfidenceUnsafe();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRep.newAlwaysNoConfidenceUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newAlwaysNoConfidenceUnsafe = () =>
  Effect.runSync(newAlwaysNoConfidence());

/**
 * Method kind of DRep
 *
 * @example
 * import { DRep } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a DRep instance
 * const instance = ... ;
 *   const result = yield* DRep.kind(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const kind = Effect.fn(
  (instance: CML.DRep): Effect.Effect<CML.DRepKind, DRepError> =>
    Effect.try({
      try: () => instance.kind(),
      catch: () =>
        new DRepError({
          message: `DRep.kind failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.kind without Effect wrapper
 *
 * @example
 * import { DRep } from "@lucid-evolution/experimental";
 *
 * // Assume we have a DRep instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = DRep.kindUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRep.kindUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const kindUnsafe = (instance: CML.DRep): CML.DRepKind =>
  Effect.runSync(kind(instance));

/**
 * Method asKey of DRep
 *
 * @example
 * import { DRep } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a DRep instance
 * const instance = ... ;
 *   const result = yield* DRep.asKey(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const asKey = Effect.fn(
  (
    instance: CML.DRep,
  ): Effect.Effect<CML.Ed25519KeyHash | undefined, DRepError> =>
    Effect.try({
      try: () => instance.as_key(),
      catch: () =>
        new DRepError({
          message: `DRep.asKey failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.asKey without Effect wrapper
 *
 * @example
 * import { DRep } from "@lucid-evolution/experimental";
 *
 * // Assume we have a DRep instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = DRep.asKeyUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRep.asKeyUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asKeyUnsafe = (
  instance: CML.DRep,
): CML.Ed25519KeyHash | undefined => Effect.runSync(asKey(instance));

/**
 * Method asScript of DRep
 *
 * @example
 * import { DRep } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a DRep instance
 * const instance = ... ;
 *   const result = yield* DRep.asScript(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const asScript = Effect.fn(
  (instance: CML.DRep): Effect.Effect<CML.ScriptHash | undefined, DRepError> =>
    Effect.try({
      try: () => instance.as_script(),
      catch: () =>
        new DRepError({
          message: `DRep.asScript failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.asScript without Effect wrapper
 *
 * @example
 * import { DRep } from "@lucid-evolution/experimental";
 *
 * // Assume we have a DRep instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = DRep.asScriptUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRep.asScriptUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asScriptUnsafe = (
  instance: CML.DRep,
): CML.ScriptHash | undefined => Effect.runSync(asScript(instance));
