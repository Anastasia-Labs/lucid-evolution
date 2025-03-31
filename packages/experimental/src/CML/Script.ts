/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML Script class
 *
 * @since 2.0.0
 * @category Types
 */
export type Script = CML.Script;

/**
 * Error class for Script operations
 * 
 * This error is thrown when operations on Script instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class ScriptError extends Data.TaggedError("ScriptError")<{
  message?: string;
}> {}

/**
 * Method free of Script
 * 
 * @example
 * import { Script } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Script instance
 * const instance = ... ;
 *   const result = yield* Script.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.Script): Effect.Effect<void, ScriptError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new ScriptError({
          message: `Script.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { Script } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Script instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Script.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Script.freeUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.Script): void =>
  Effect.runSync(free(instance));

/**
 * Method hash of Script
 * 
 * @example
 * import { Script } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Script instance
 * const instance = ... ;
 *   const result = yield* Script.hash(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const hash = Effect.fn(
  (instance: CML.Script): Effect.Effect<CML.ScriptHash, ScriptError> =>
    Effect.try({
      try: () => instance.hash(),
      catch: () =>
        new ScriptError({
          message: `Script.hash failed `,
        }),
    })
);

/**
 * Unsafely calls instance.hash without Effect wrapper
 * 
 * @example
 * import { Script } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Script instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Script.hashUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Script.hashUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const hashUnsafe = (instance: CML.Script): CML.ScriptHash =>
  Effect.runSync(hash(instance));

/**
 * Method language of Script
 * 
 * @example
 * import { Script } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Script instance
 * const instance = ... ;
 *   const result = yield* Script.language(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const language = Effect.fn(
  (instance: CML.Script): Effect.Effect<CML.Language | undefined, ScriptError> =>
    Effect.try({
      try: () => instance.language(),
      catch: () =>
        new ScriptError({
          message: `Script.language failed `,
        }),
    })
);

/**
 * Unsafely calls instance.language without Effect wrapper
 * 
 * @example
 * import { Script } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Script instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Script.languageUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Script.languageUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const languageUnsafe = (instance: CML.Script): CML.Language | undefined =>
  Effect.runSync(language(instance));

/**
 * Method toCborBytes of Script
 * 
 * @example
 * import { Script } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Script instance
 * const instance = ... ;
 *   const result = yield* Script.toCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.Script): Effect.Effect<Uint8Array, ScriptError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new ScriptError({
          message: `Script.toCborBytes failed Script is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @example
 * import { Script } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Script instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Script.toCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Script.toCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.Script): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of Script
 * 
 * @example
 * import { Script } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Script instance
 * const instance = ... ;
 *   const result = yield* Script.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.Script): Effect.Effect<Uint8Array, ScriptError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new ScriptError({
          message: `Script.toCanonicalCborBytes failed Script is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @example
 * import { Script } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Script instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Script.toCanonicalCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Script.toCanonicalCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (instance: CML.Script): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of Script
 * 
 * @example
 * import { Script } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* Script.fromCborBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.Script.from_cbor_bytes(cborBytes),
    catch: () => new ScriptError({
      message: `Script.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls Script.fromCborBytes without Effect wrapper
 * 
 * @example
 * import { Script } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Script.fromCborBytesUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Script.fromCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of Script
 * 
 * @example
 * import { Script } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Script instance
 * const instance = ... ;
 *   const result = yield* Script.toCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.Script): Effect.Effect<string, ScriptError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new ScriptError({
          message: `Script.toCborHex failed Script is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @example
 * import { Script } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Script instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Script.toCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Script.toCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.Script): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of Script
 * 
 * @example
 * import { Script } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Script instance
 * const instance = ... ;
 *   const result = yield* Script.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.Script): Effect.Effect<string, ScriptError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new ScriptError({
          message: `Script.toCanonicalCborHex failed Script is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @example
 * import { Script } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Script instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Script.toCanonicalCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Script.toCanonicalCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.Script): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of Script
 * 
 * @example
 * import { Script } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* Script.fromCborHex( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.Script.from_cbor_hex(cborBytes),
    catch: () => new ScriptError({
      message: `Script.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls Script.fromCborHex without Effect wrapper
 * 
 * @example
 * import { Script } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Script.fromCborHexUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Script.fromCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of Script
 * 
 * @example
 * import { Script } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Script instance
 * const instance = ... ;
 *   const result = yield* Script.toJson(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.Script): Effect.Effect<string, ScriptError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new ScriptError({
          message: `Script.toJson failed Script is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @example
 * import { Script } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Script instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Script.toJsonUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Script.toJsonUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.Script): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of Script
 * 
 * @example
 * import { Script } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Script instance
 * const instance = ... ;
 *   const result = yield* Script.toJsValue(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.Script): Effect.Effect<any, ScriptError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new ScriptError({
          message: `Script.toJsValue failed Script is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @example
 * import { Script } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Script instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Script.toJsValueUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Script.toJsValueUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.Script): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of Script
 * 
 * @example
 * import { Script } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* Script.fromJson( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.Script.from_json(json),
    catch: () => new ScriptError({
      message: `Script.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls Script.fromJson without Effect wrapper
 * 
 * @example
 * import { Script } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Script.fromJsonUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Script.fromJsonUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string) =>
  Effect.runSync(fromJson(json));

/**
 * Static method newNative of Script
 * 
 * @example
 * import { Script } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* Script.newNative( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newNative = Effect.fn(function* (script: CML.NativeScript) {
  return yield* Effect.try({
    try: () => CML.Script.new_native(script),
    catch: () => new ScriptError({
      message: `Script.newNative failed with parameters: ${script} (NativeScript). `,
    }),
  });
});

/**
 * Unsafely calls Script.newNative without Effect wrapper
 * 
 * @example
 * import { Script } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Script.newNativeUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Script.newNativeUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newNativeUnsafe = (script: CML.NativeScript) =>
  Effect.runSync(newNative(script));

/**
 * Static method newPlutusV1 of Script
 * 
 * @example
 * import { Script } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* Script.newPlutusV1( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newPlutusV1 = Effect.fn(function* (script: CML.PlutusV1Script) {
  return yield* Effect.try({
    try: () => CML.Script.new_plutus_v1(script),
    catch: () => new ScriptError({
      message: `Script.newPlutusV1 failed with parameters: ${script} (PlutusV1Script). `,
    }),
  });
});

/**
 * Unsafely calls Script.newPlutusV1 without Effect wrapper
 * 
 * @example
 * import { Script } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Script.newPlutusV1Unsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Script.newPlutusV1Unsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newPlutusV1Unsafe = (script: CML.PlutusV1Script) =>
  Effect.runSync(newPlutusV1(script));

/**
 * Static method newPlutusV2 of Script
 * 
 * @example
 * import { Script } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* Script.newPlutusV2( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newPlutusV2 = Effect.fn(function* (script: CML.PlutusV2Script) {
  return yield* Effect.try({
    try: () => CML.Script.new_plutus_v2(script),
    catch: () => new ScriptError({
      message: `Script.newPlutusV2 failed with parameters: ${script} (PlutusV2Script). `,
    }),
  });
});

/**
 * Unsafely calls Script.newPlutusV2 without Effect wrapper
 * 
 * @example
 * import { Script } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Script.newPlutusV2Unsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Script.newPlutusV2Unsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newPlutusV2Unsafe = (script: CML.PlutusV2Script) =>
  Effect.runSync(newPlutusV2(script));

/**
 * Static method newPlutusV3 of Script
 * 
 * @example
 * import { Script } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* Script.newPlutusV3( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newPlutusV3 = Effect.fn(function* (script: CML.PlutusV3Script) {
  return yield* Effect.try({
    try: () => CML.Script.new_plutus_v3(script),
    catch: () => new ScriptError({
      message: `Script.newPlutusV3 failed with parameters: ${script} (PlutusV3Script). `,
    }),
  });
});

/**
 * Unsafely calls Script.newPlutusV3 without Effect wrapper
 * 
 * @example
 * import { Script } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Script.newPlutusV3Unsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Script.newPlutusV3Unsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newPlutusV3Unsafe = (script: CML.PlutusV3Script) =>
  Effect.runSync(newPlutusV3(script));

/**
 * Method kind of Script
 * 
 * @example
 * import { Script } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Script instance
 * const instance = ... ;
 *   const result = yield* Script.kind(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const kind = Effect.fn(
  (instance: CML.Script): Effect.Effect<CML.ScriptKind, ScriptError> =>
    Effect.try({
      try: () => instance.kind(),
      catch: () =>
        new ScriptError({
          message: `Script.kind failed `,
        }),
    })
);

/**
 * Unsafely calls instance.kind without Effect wrapper
 * 
 * @example
 * import { Script } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Script instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Script.kindUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Script.kindUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const kindUnsafe = (instance: CML.Script): CML.ScriptKind =>
  Effect.runSync(kind(instance));

/**
 * Method asNative of Script
 * 
 * @example
 * import { Script } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Script instance
 * const instance = ... ;
 *   const result = yield* Script.asNative(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const asNative = Effect.fn(
  (instance: CML.Script): Effect.Effect<CML.NativeScript | undefined, ScriptError> =>
    Effect.try({
      try: () => instance.as_native(),
      catch: () =>
        new ScriptError({
          message: `Script.asNative failed `,
        }),
    })
);

/**
 * Unsafely calls instance.asNative without Effect wrapper
 * 
 * @example
 * import { Script } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Script instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Script.asNativeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Script.asNativeUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asNativeUnsafe = (instance: CML.Script): CML.NativeScript | undefined =>
  Effect.runSync(asNative(instance));

/**
 * Method asPlutusV1 of Script
 * 
 * @example
 * import { Script } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Script instance
 * const instance = ... ;
 *   const result = yield* Script.asPlutusV1(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const asPlutusV1 = Effect.fn(
  (instance: CML.Script): Effect.Effect<CML.PlutusV1Script | undefined, ScriptError> =>
    Effect.try({
      try: () => instance.as_plutus_v1(),
      catch: () =>
        new ScriptError({
          message: `Script.asPlutusV1 failed `,
        }),
    })
);

/**
 * Unsafely calls instance.asPlutusV1 without Effect wrapper
 * 
 * @example
 * import { Script } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Script instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Script.asPlutusV1Unsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Script.asPlutusV1Unsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asPlutusV1Unsafe = (instance: CML.Script): CML.PlutusV1Script | undefined =>
  Effect.runSync(asPlutusV1(instance));

/**
 * Method asPlutusV2 of Script
 * 
 * @example
 * import { Script } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Script instance
 * const instance = ... ;
 *   const result = yield* Script.asPlutusV2(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const asPlutusV2 = Effect.fn(
  (instance: CML.Script): Effect.Effect<CML.PlutusV2Script | undefined, ScriptError> =>
    Effect.try({
      try: () => instance.as_plutus_v2(),
      catch: () =>
        new ScriptError({
          message: `Script.asPlutusV2 failed `,
        }),
    })
);

/**
 * Unsafely calls instance.asPlutusV2 without Effect wrapper
 * 
 * @example
 * import { Script } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Script instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Script.asPlutusV2Unsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Script.asPlutusV2Unsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asPlutusV2Unsafe = (instance: CML.Script): CML.PlutusV2Script | undefined =>
  Effect.runSync(asPlutusV2(instance));

/**
 * Method asPlutusV3 of Script
 * 
 * @example
 * import { Script } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Script instance
 * const instance = ... ;
 *   const result = yield* Script.asPlutusV3(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const asPlutusV3 = Effect.fn(
  (instance: CML.Script): Effect.Effect<CML.PlutusV3Script | undefined, ScriptError> =>
    Effect.try({
      try: () => instance.as_plutus_v3(),
      catch: () =>
        new ScriptError({
          message: `Script.asPlutusV3 failed `,
        }),
    })
);

/**
 * Unsafely calls instance.asPlutusV3 without Effect wrapper
 * 
 * @example
 * import { Script } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Script instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Script.asPlutusV3Unsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Script.asPlutusV3Unsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asPlutusV3Unsafe = (instance: CML.Script): CML.PlutusV3Script | undefined =>
  Effect.runSync(asPlutusV3(instance));
