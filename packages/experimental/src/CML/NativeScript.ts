/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML NativeScript class
 *
 * @since 2.0.0
 * @category Types
 */
export type NativeScript = CML.NativeScript;

/**
 * Error class for NativeScript operations
 *
 * This error is thrown when operations on NativeScript instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class NativeScriptError extends Data.TaggedError("NativeScriptError")<{
  message?: string;
}> {}

/**
 * Method free of NativeScript
 *
 * @example
 * import { NativeScript } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a NativeScript instance
 * const instance = ... ;
 *   const result = yield* NativeScript.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.NativeScript): Effect.Effect<void, NativeScriptError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new NativeScriptError({
          message: `NativeScript.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { NativeScript } from "@lucid-evolution/experimental";
 *
 * // Assume we have a NativeScript instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = NativeScript.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NativeScript.freeUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.NativeScript): void =>
  Effect.runSync(free(instance));

/**
 * Method getRequiredSigners of NativeScript
 *
 * @example
 * import { NativeScript } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a NativeScript instance
 * const instance = ... ;
 *   const result = yield* NativeScript.getRequiredSigners(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const getRequiredSigners = Effect.fn(
  (
    instance: CML.NativeScript,
  ): Effect.Effect<CML.Ed25519KeyHashList, NativeScriptError> =>
    Effect.try({
      try: () => instance.get_required_signers(),
      catch: () =>
        new NativeScriptError({
          message: `NativeScript.getRequiredSigners failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.getRequiredSigners without Effect wrapper
 *
 * @example
 * import { NativeScript } from "@lucid-evolution/experimental";
 *
 * // Assume we have a NativeScript instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = NativeScript.getRequiredSignersUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NativeScript.getRequiredSignersUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getRequiredSignersUnsafe = (
  instance: CML.NativeScript,
): CML.Ed25519KeyHashList => Effect.runSync(getRequiredSigners(instance));

/**
 * Method hash of NativeScript
 *
 * @example
 * import { NativeScript } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a NativeScript instance
 * const instance = ... ;
 *   const result = yield* NativeScript.hash(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const hash = Effect.fn(
  (
    instance: CML.NativeScript,
  ): Effect.Effect<CML.ScriptHash, NativeScriptError> =>
    Effect.try({
      try: () => instance.hash(),
      catch: () =>
        new NativeScriptError({
          message: `NativeScript.hash failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.hash without Effect wrapper
 *
 * @example
 * import { NativeScript } from "@lucid-evolution/experimental";
 *
 * // Assume we have a NativeScript instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = NativeScript.hashUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NativeScript.hashUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const hashUnsafe = (instance: CML.NativeScript): CML.ScriptHash =>
  Effect.runSync(hash(instance));

/**
 * Method verify of NativeScript
 *
 * @example
 * import { NativeScript } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a NativeScript instance
 * const instance = ... ;
 *   const result = yield* NativeScript.verify(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const verify = Effect.fn(
  (
    instance: CML.NativeScript,
    lowerBound: bigint | undefined,
    upperBound: bigint | undefined,
    keyHashes: CML.Ed25519KeyHashList,
  ): Effect.Effect<boolean, NativeScriptError> =>
    Effect.try({
      try: () => instance.verify(lowerBound, upperBound, keyHashes),
      catch: () =>
        new NativeScriptError({
          message: `NativeScript.verify failed with parameters: ${lowerBound}, ${upperBound}, ${keyHashes} (Ed25519KeyHashList). `,
        }),
    }),
);

/**
 * Unsafely calls instance.verify without Effect wrapper
 *
 * @example
 * import { NativeScript } from "@lucid-evolution/experimental";
 *
 * // Assume we have a NativeScript instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = NativeScript.verifyUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NativeScript.verifyUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const verifyUnsafe = (
  instance: CML.NativeScript,
  lowerBound: bigint | undefined,
  upperBound: bigint | undefined,
  keyHashes: CML.Ed25519KeyHashList,
): boolean =>
  Effect.runSync(verify(instance, lowerBound, upperBound, keyHashes));

/**
 * Method toCborBytes of NativeScript
 *
 * @example
 * import { NativeScript } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a NativeScript instance
 * const instance = ... ;
 *   const result = yield* NativeScript.toCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.NativeScript): Effect.Effect<Uint8Array, NativeScriptError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new NativeScriptError({
          message: `NativeScript.toCborBytes failed NativeScript is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @example
 * import { NativeScript } from "@lucid-evolution/experimental";
 *
 * // Assume we have a NativeScript instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = NativeScript.toCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NativeScript.toCborBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.NativeScript): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of NativeScript
 *
 * @example
 * import { NativeScript } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a NativeScript instance
 * const instance = ... ;
 *   const result = yield* NativeScript.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.NativeScript): Effect.Effect<Uint8Array, NativeScriptError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new NativeScriptError({
          message: `NativeScript.toCanonicalCborBytes failed NativeScript is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 *
 * @example
 * import { NativeScript } from "@lucid-evolution/experimental";
 *
 * // Assume we have a NativeScript instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = NativeScript.toCanonicalCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NativeScript.toCanonicalCborBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (
  instance: CML.NativeScript,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of NativeScript
 *
 * @example
 * import { NativeScript } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* NativeScript.fromCborBytes( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.NativeScript.from_cbor_bytes(cborBytes),
    catch: () =>
      new NativeScriptError({
        message: `NativeScript.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls NativeScript.fromCborBytes without Effect wrapper
 *
 * @example
 * import { NativeScript } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = NativeScript.fromCborBytesUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NativeScript.fromCborBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of NativeScript
 *
 * @example
 * import { NativeScript } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a NativeScript instance
 * const instance = ... ;
 *   const result = yield* NativeScript.toCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.NativeScript): Effect.Effect<string, NativeScriptError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new NativeScriptError({
          message: `NativeScript.toCborHex failed NativeScript is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @example
 * import { NativeScript } from "@lucid-evolution/experimental";
 *
 * // Assume we have a NativeScript instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = NativeScript.toCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NativeScript.toCborHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.NativeScript): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of NativeScript
 *
 * @example
 * import { NativeScript } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a NativeScript instance
 * const instance = ... ;
 *   const result = yield* NativeScript.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.NativeScript): Effect.Effect<string, NativeScriptError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new NativeScriptError({
          message: `NativeScript.toCanonicalCborHex failed NativeScript is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @example
 * import { NativeScript } from "@lucid-evolution/experimental";
 *
 * // Assume we have a NativeScript instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = NativeScript.toCanonicalCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NativeScript.toCanonicalCborHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.NativeScript): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of NativeScript
 *
 * @example
 * import { NativeScript } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* NativeScript.fromCborHex( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.NativeScript.from_cbor_hex(cborBytes),
    catch: () =>
      new NativeScriptError({
        message: `NativeScript.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls NativeScript.fromCborHex without Effect wrapper
 *
 * @example
 * import { NativeScript } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = NativeScript.fromCborHexUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NativeScript.fromCborHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of NativeScript
 *
 * @example
 * import { NativeScript } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a NativeScript instance
 * const instance = ... ;
 *   const result = yield* NativeScript.toJson(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.NativeScript): Effect.Effect<string, NativeScriptError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new NativeScriptError({
          message: `NativeScript.toJson failed NativeScript is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @example
 * import { NativeScript } from "@lucid-evolution/experimental";
 *
 * // Assume we have a NativeScript instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = NativeScript.toJsonUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NativeScript.toJsonUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.NativeScript): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of NativeScript
 *
 * @example
 * import { NativeScript } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a NativeScript instance
 * const instance = ... ;
 *   const result = yield* NativeScript.toJsValue(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.NativeScript): Effect.Effect<any, NativeScriptError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new NativeScriptError({
          message: `NativeScript.toJsValue failed NativeScript is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @example
 * import { NativeScript } from "@lucid-evolution/experimental";
 *
 * // Assume we have a NativeScript instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = NativeScript.toJsValueUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NativeScript.toJsValueUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.NativeScript): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of NativeScript
 *
 * @example
 * import { NativeScript } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* NativeScript.fromJson( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.NativeScript.from_json(json),
    catch: () =>
      new NativeScriptError({
        message: `NativeScript.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls NativeScript.fromJson without Effect wrapper
 *
 * @example
 * import { NativeScript } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = NativeScript.fromJsonUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NativeScript.fromJsonUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string) => Effect.runSync(fromJson(json));

/**
 * Static method newScriptPubkey of NativeScript
 *
 * @example
 * import { NativeScript } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* NativeScript.newScriptPubkey( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newScriptPubkey = Effect.fn(function* (
  ed25519KeyHash: CML.Ed25519KeyHash,
) {
  return yield* Effect.try({
    try: () => CML.NativeScript.new_script_pubkey(ed25519KeyHash),
    catch: () =>
      new NativeScriptError({
        message: `NativeScript.newScriptPubkey failed with parameters: ${ed25519KeyHash} (Ed25519KeyHash). `,
      }),
  });
});

/**
 * Unsafely calls NativeScript.newScriptPubkey without Effect wrapper
 *
 * @example
 * import { NativeScript } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = NativeScript.newScriptPubkeyUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NativeScript.newScriptPubkeyUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newScriptPubkeyUnsafe = (ed25519KeyHash: CML.Ed25519KeyHash) =>
  Effect.runSync(newScriptPubkey(ed25519KeyHash));

/**
 * Static method newScriptAll of NativeScript
 *
 * @example
 * import { NativeScript } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* NativeScript.newScriptAll( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newScriptAll = Effect.fn(function* (
  nativeScripts: CML.NativeScriptList,
) {
  return yield* Effect.try({
    try: () => CML.NativeScript.new_script_all(nativeScripts),
    catch: () =>
      new NativeScriptError({
        message: `NativeScript.newScriptAll failed with parameters: ${nativeScripts} (NativeScriptList). `,
      }),
  });
});

/**
 * Unsafely calls NativeScript.newScriptAll without Effect wrapper
 *
 * @example
 * import { NativeScript } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = NativeScript.newScriptAllUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NativeScript.newScriptAllUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newScriptAllUnsafe = (nativeScripts: CML.NativeScriptList) =>
  Effect.runSync(newScriptAll(nativeScripts));

/**
 * Static method newScriptAny of NativeScript
 *
 * @example
 * import { NativeScript } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* NativeScript.newScriptAny( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newScriptAny = Effect.fn(function* (
  nativeScripts: CML.NativeScriptList,
) {
  return yield* Effect.try({
    try: () => CML.NativeScript.new_script_any(nativeScripts),
    catch: () =>
      new NativeScriptError({
        message: `NativeScript.newScriptAny failed with parameters: ${nativeScripts} (NativeScriptList). `,
      }),
  });
});

/**
 * Unsafely calls NativeScript.newScriptAny without Effect wrapper
 *
 * @example
 * import { NativeScript } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = NativeScript.newScriptAnyUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NativeScript.newScriptAnyUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newScriptAnyUnsafe = (nativeScripts: CML.NativeScriptList) =>
  Effect.runSync(newScriptAny(nativeScripts));

/**
 * Static method newScriptNOfK of NativeScript
 *
 * @example
 * import { NativeScript } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* NativeScript.newScriptNOfK( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newScriptNOfK = Effect.fn(function* (
  n: bigint,
  nativeScripts: CML.NativeScriptList,
) {
  return yield* Effect.try({
    try: () => CML.NativeScript.new_script_n_of_k(n, nativeScripts),
    catch: () =>
      new NativeScriptError({
        message: `NativeScript.newScriptNOfK failed with parameters: ${n}, ${nativeScripts} (NativeScriptList). `,
      }),
  });
});

/**
 * Unsafely calls NativeScript.newScriptNOfK without Effect wrapper
 *
 * @example
 * import { NativeScript } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = NativeScript.newScriptNOfKUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NativeScript.newScriptNOfKUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newScriptNOfKUnsafe = (
  n: bigint,
  nativeScripts: CML.NativeScriptList,
) => Effect.runSync(newScriptNOfK(n, nativeScripts));

/**
 * Static method newScriptInvalidBefore of NativeScript
 *
 * @example
 * import { NativeScript } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* NativeScript.newScriptInvalidBefore( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newScriptInvalidBefore = Effect.fn(function* (before: bigint) {
  return yield* Effect.try({
    try: () => CML.NativeScript.new_script_invalid_before(before),
    catch: () =>
      new NativeScriptError({
        message: `NativeScript.newScriptInvalidBefore failed with parameters: ${before}. `,
      }),
  });
});

/**
 * Unsafely calls NativeScript.newScriptInvalidBefore without Effect wrapper
 *
 * @example
 * import { NativeScript } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = NativeScript.newScriptInvalidBeforeUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NativeScript.newScriptInvalidBeforeUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newScriptInvalidBeforeUnsafe = (before: bigint) =>
  Effect.runSync(newScriptInvalidBefore(before));

/**
 * Static method newScriptInvalidHereafter of NativeScript
 *
 * @example
 * import { NativeScript } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* NativeScript.newScriptInvalidHereafter( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newScriptInvalidHereafter = Effect.fn(function* (after: bigint) {
  return yield* Effect.try({
    try: () => CML.NativeScript.new_script_invalid_hereafter(after),
    catch: () =>
      new NativeScriptError({
        message: `NativeScript.newScriptInvalidHereafter failed with parameters: ${after}. `,
      }),
  });
});

/**
 * Unsafely calls NativeScript.newScriptInvalidHereafter without Effect wrapper
 *
 * @example
 * import { NativeScript } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = NativeScript.newScriptInvalidHereafterUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NativeScript.newScriptInvalidHereafterUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newScriptInvalidHereafterUnsafe = (after: bigint) =>
  Effect.runSync(newScriptInvalidHereafter(after));

/**
 * Method kind of NativeScript
 *
 * @example
 * import { NativeScript } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a NativeScript instance
 * const instance = ... ;
 *   const result = yield* NativeScript.kind(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const kind = Effect.fn(
  (
    instance: CML.NativeScript,
  ): Effect.Effect<CML.NativeScriptKind, NativeScriptError> =>
    Effect.try({
      try: () => instance.kind(),
      catch: () =>
        new NativeScriptError({
          message: `NativeScript.kind failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.kind without Effect wrapper
 *
 * @example
 * import { NativeScript } from "@lucid-evolution/experimental";
 *
 * // Assume we have a NativeScript instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = NativeScript.kindUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NativeScript.kindUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const kindUnsafe = (instance: CML.NativeScript): CML.NativeScriptKind =>
  Effect.runSync(kind(instance));

/**
 * Method asScriptPubkey of NativeScript
 *
 * @example
 * import { NativeScript } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a NativeScript instance
 * const instance = ... ;
 *   const result = yield* NativeScript.asScriptPubkey(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const asScriptPubkey = Effect.fn(
  (
    instance: CML.NativeScript,
  ): Effect.Effect<CML.ScriptPubkey | undefined, NativeScriptError> =>
    Effect.try({
      try: () => instance.as_script_pubkey(),
      catch: () =>
        new NativeScriptError({
          message: `NativeScript.asScriptPubkey failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.asScriptPubkey without Effect wrapper
 *
 * @example
 * import { NativeScript } from "@lucid-evolution/experimental";
 *
 * // Assume we have a NativeScript instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = NativeScript.asScriptPubkeyUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NativeScript.asScriptPubkeyUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asScriptPubkeyUnsafe = (
  instance: CML.NativeScript,
): CML.ScriptPubkey | undefined => Effect.runSync(asScriptPubkey(instance));

/**
 * Method asScriptAll of NativeScript
 *
 * @example
 * import { NativeScript } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a NativeScript instance
 * const instance = ... ;
 *   const result = yield* NativeScript.asScriptAll(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const asScriptAll = Effect.fn(
  (
    instance: CML.NativeScript,
  ): Effect.Effect<CML.ScriptAll | undefined, NativeScriptError> =>
    Effect.try({
      try: () => instance.as_script_all(),
      catch: () =>
        new NativeScriptError({
          message: `NativeScript.asScriptAll failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.asScriptAll without Effect wrapper
 *
 * @example
 * import { NativeScript } from "@lucid-evolution/experimental";
 *
 * // Assume we have a NativeScript instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = NativeScript.asScriptAllUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NativeScript.asScriptAllUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asScriptAllUnsafe = (
  instance: CML.NativeScript,
): CML.ScriptAll | undefined => Effect.runSync(asScriptAll(instance));

/**
 * Method asScriptAny of NativeScript
 *
 * @example
 * import { NativeScript } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a NativeScript instance
 * const instance = ... ;
 *   const result = yield* NativeScript.asScriptAny(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const asScriptAny = Effect.fn(
  (
    instance: CML.NativeScript,
  ): Effect.Effect<CML.ScriptAny | undefined, NativeScriptError> =>
    Effect.try({
      try: () => instance.as_script_any(),
      catch: () =>
        new NativeScriptError({
          message: `NativeScript.asScriptAny failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.asScriptAny without Effect wrapper
 *
 * @example
 * import { NativeScript } from "@lucid-evolution/experimental";
 *
 * // Assume we have a NativeScript instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = NativeScript.asScriptAnyUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NativeScript.asScriptAnyUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asScriptAnyUnsafe = (
  instance: CML.NativeScript,
): CML.ScriptAny | undefined => Effect.runSync(asScriptAny(instance));

/**
 * Method asScriptNOfK of NativeScript
 *
 * @example
 * import { NativeScript } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a NativeScript instance
 * const instance = ... ;
 *   const result = yield* NativeScript.asScriptNOfK(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const asScriptNOfK = Effect.fn(
  (
    instance: CML.NativeScript,
  ): Effect.Effect<CML.ScriptNOfK | undefined, NativeScriptError> =>
    Effect.try({
      try: () => instance.as_script_n_of_k(),
      catch: () =>
        new NativeScriptError({
          message: `NativeScript.asScriptNOfK failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.asScriptNOfK without Effect wrapper
 *
 * @example
 * import { NativeScript } from "@lucid-evolution/experimental";
 *
 * // Assume we have a NativeScript instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = NativeScript.asScriptNOfKUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NativeScript.asScriptNOfKUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asScriptNOfKUnsafe = (
  instance: CML.NativeScript,
): CML.ScriptNOfK | undefined => Effect.runSync(asScriptNOfK(instance));

/**
 * Method asScriptInvalidBefore of NativeScript
 *
 * @example
 * import { NativeScript } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a NativeScript instance
 * const instance = ... ;
 *   const result = yield* NativeScript.asScriptInvalidBefore(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const asScriptInvalidBefore = Effect.fn(
  (
    instance: CML.NativeScript,
  ): Effect.Effect<CML.ScriptInvalidBefore | undefined, NativeScriptError> =>
    Effect.try({
      try: () => instance.as_script_invalid_before(),
      catch: () =>
        new NativeScriptError({
          message: `NativeScript.asScriptInvalidBefore failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.asScriptInvalidBefore without Effect wrapper
 *
 * @example
 * import { NativeScript } from "@lucid-evolution/experimental";
 *
 * // Assume we have a NativeScript instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = NativeScript.asScriptInvalidBeforeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NativeScript.asScriptInvalidBeforeUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asScriptInvalidBeforeUnsafe = (
  instance: CML.NativeScript,
): CML.ScriptInvalidBefore | undefined =>
  Effect.runSync(asScriptInvalidBefore(instance));

/**
 * Method asScriptInvalidHereafter of NativeScript
 *
 * @example
 * import { NativeScript } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a NativeScript instance
 * const instance = ... ;
 *   const result = yield* NativeScript.asScriptInvalidHereafter(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const asScriptInvalidHereafter = Effect.fn(
  (
    instance: CML.NativeScript,
  ): Effect.Effect<CML.ScriptInvalidHereafter | undefined, NativeScriptError> =>
    Effect.try({
      try: () => instance.as_script_invalid_hereafter(),
      catch: () =>
        new NativeScriptError({
          message: `NativeScript.asScriptInvalidHereafter failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.asScriptInvalidHereafter without Effect wrapper
 *
 * @example
 * import { NativeScript } from "@lucid-evolution/experimental";
 *
 * // Assume we have a NativeScript instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = NativeScript.asScriptInvalidHereafterUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NativeScript.asScriptInvalidHereafterUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asScriptInvalidHereafterUnsafe = (
  instance: CML.NativeScript,
): CML.ScriptInvalidHereafter | undefined =>
  Effect.runSync(asScriptInvalidHereafter(instance));
