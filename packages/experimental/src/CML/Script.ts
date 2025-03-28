import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type Script = CML.Script;

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
 *   const result = Script.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Script.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.Script): void =>
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
 *   const result = Script.unsafeHash(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Script.unsafeHash failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeHash = (instance: CML.Script): CML.ScriptHash =>
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
 *   const result = Script.unsafeLanguage(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Script.unsafeLanguage failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeLanguage = (instance: CML.Script): CML.Language | undefined =>
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
 *   const result = Script.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Script.unsafeToCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (instance: CML.Script): Uint8Array =>
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
 *   const result = Script.unsafeToCanonicalCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Script.unsafeToCanonicalCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborBytes = (instance: CML.Script): Uint8Array =>
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
 *   const result = Script.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Script.unsafeFromCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
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
 *   const result = Script.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Script.unsafeToCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (instance: CML.Script): string =>
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
 *   const result = Script.unsafeToCanonicalCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Script.unsafeToCanonicalCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborHex = (instance: CML.Script): string =>
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
 *   const result = Script.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Script.unsafeFromCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
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
 *   const result = Script.unsafeToJson(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Script.unsafeToJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJson = (instance: CML.Script): string =>
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
 *   const result = Script.unsafeToJsValue(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Script.unsafeToJsValue failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJsValue = (instance: CML.Script): any =>
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
 *   const result = Script.unsafeFromJson( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Script.unsafeFromJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromJson = (json: string) =>
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
 *   const result = Script.unsafeNewNative( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Script.unsafeNewNative failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeNewNative = (script: CML.NativeScript) =>
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
 *   const result = Script.unsafeNewPlutusV1( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Script.unsafeNewPlutusV1 failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeNewPlutusV1 = (script: CML.PlutusV1Script) =>
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
 *   const result = Script.unsafeNewPlutusV2( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Script.unsafeNewPlutusV2 failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeNewPlutusV2 = (script: CML.PlutusV2Script) =>
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
 *   const result = Script.unsafeNewPlutusV3( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Script.unsafeNewPlutusV3 failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeNewPlutusV3 = (script: CML.PlutusV3Script) =>
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
 *   const result = Script.unsafeKind(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Script.unsafeKind failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeKind = (instance: CML.Script): CML.ScriptKind =>
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
 *   const result = Script.unsafeAsNative(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Script.unsafeAsNative failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAsNative = (instance: CML.Script): CML.NativeScript | undefined =>
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
 *   const result = Script.unsafeAsPlutusV1(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Script.unsafeAsPlutusV1 failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAsPlutusV1 = (instance: CML.Script): CML.PlutusV1Script | undefined =>
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
 *   const result = Script.unsafeAsPlutusV2(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Script.unsafeAsPlutusV2 failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAsPlutusV2 = (instance: CML.Script): CML.PlutusV2Script | undefined =>
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
 *   const result = Script.unsafeAsPlutusV3(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Script.unsafeAsPlutusV3 failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAsPlutusV3 = (instance: CML.Script): CML.PlutusV3Script | undefined =>
  Effect.runSync(asPlutusV3(instance));
