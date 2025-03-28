import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type NativeScript = CML.NativeScript;

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
 *   const result = NativeScript.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NativeScript.unsafeFree failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.NativeScript): void =>
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
 *   const result = NativeScript.unsafeGetRequiredSigners(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NativeScript.unsafeGetRequiredSigners failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeGetRequiredSigners = (
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
 *   const result = NativeScript.unsafeHash(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NativeScript.unsafeHash failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeHash = (instance: CML.NativeScript): CML.ScriptHash =>
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
 *   const result = NativeScript.unsafeVerify(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NativeScript.unsafeVerify failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeVerify = (
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
 *   const result = NativeScript.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NativeScript.unsafeToCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (instance: CML.NativeScript): Uint8Array =>
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
 *   const result = NativeScript.unsafeToCanonicalCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NativeScript.unsafeToCanonicalCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborBytes = (
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
 *   const result = NativeScript.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NativeScript.unsafeFromCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
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
 *   const result = NativeScript.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NativeScript.unsafeToCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (instance: CML.NativeScript): string =>
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
 *   const result = NativeScript.unsafeToCanonicalCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NativeScript.unsafeToCanonicalCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborHex = (instance: CML.NativeScript): string =>
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
 *   const result = NativeScript.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NativeScript.unsafeFromCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
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
 *   const result = NativeScript.unsafeToJson(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NativeScript.unsafeToJson failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJson = (instance: CML.NativeScript): string =>
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
 *   const result = NativeScript.unsafeToJsValue(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NativeScript.unsafeToJsValue failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJsValue = (instance: CML.NativeScript): any =>
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
 *   const result = NativeScript.unsafeFromJson( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NativeScript.unsafeFromJson failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromJson = (json: string) => Effect.runSync(fromJson(json));

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
 *   const result = NativeScript.unsafeNewScriptPubkey( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NativeScript.unsafeNewScriptPubkey failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeNewScriptPubkey = (ed25519KeyHash: CML.Ed25519KeyHash) =>
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
 *   const result = NativeScript.unsafeNewScriptAll( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NativeScript.unsafeNewScriptAll failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeNewScriptAll = (nativeScripts: CML.NativeScriptList) =>
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
 *   const result = NativeScript.unsafeNewScriptAny( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NativeScript.unsafeNewScriptAny failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeNewScriptAny = (nativeScripts: CML.NativeScriptList) =>
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
 *   const result = NativeScript.unsafeNewScriptNOfK( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NativeScript.unsafeNewScriptNOfK failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeNewScriptNOfK = (
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
 *   const result = NativeScript.unsafeNewScriptInvalidBefore( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NativeScript.unsafeNewScriptInvalidBefore failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeNewScriptInvalidBefore = (before: bigint) =>
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
 *   const result = NativeScript.unsafeNewScriptInvalidHereafter( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NativeScript.unsafeNewScriptInvalidHereafter failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeNewScriptInvalidHereafter = (after: bigint) =>
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
 *   const result = NativeScript.unsafeKind(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NativeScript.unsafeKind failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeKind = (instance: CML.NativeScript): CML.NativeScriptKind =>
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
 *   const result = NativeScript.unsafeAsScriptPubkey(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NativeScript.unsafeAsScriptPubkey failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAsScriptPubkey = (
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
 *   const result = NativeScript.unsafeAsScriptAll(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NativeScript.unsafeAsScriptAll failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAsScriptAll = (
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
 *   const result = NativeScript.unsafeAsScriptAny(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NativeScript.unsafeAsScriptAny failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAsScriptAny = (
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
 *   const result = NativeScript.unsafeAsScriptNOfK(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NativeScript.unsafeAsScriptNOfK failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAsScriptNOfK = (
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
 *   const result = NativeScript.unsafeAsScriptInvalidBefore(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NativeScript.unsafeAsScriptInvalidBefore failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAsScriptInvalidBefore = (
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
 *   const result = NativeScript.unsafeAsScriptInvalidHereafter(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NativeScript.unsafeAsScriptInvalidHereafter failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAsScriptInvalidHereafter = (
  instance: CML.NativeScript,
): CML.ScriptInvalidHereafter | undefined =>
  Effect.runSync(asScriptInvalidHereafter(instance));
