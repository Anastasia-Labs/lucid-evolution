import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type DRep = CML.DRep;

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
 *   const result = DRep.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRep.unsafeFree failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.DRep): void =>
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
 *   const result = DRep.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRep.unsafeToCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (instance: CML.DRep): Uint8Array =>
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
 *   const result = DRep.unsafeToCanonicalCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRep.unsafeToCanonicalCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborBytes = (instance: CML.DRep): Uint8Array =>
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
 *   const result = DRep.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRep.unsafeFromCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
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
 *   const result = DRep.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRep.unsafeToCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (instance: CML.DRep): string =>
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
 *   const result = DRep.unsafeToCanonicalCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRep.unsafeToCanonicalCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborHex = (instance: CML.DRep): string =>
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
 *   const result = DRep.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRep.unsafeFromCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
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
 *   const result = DRep.unsafeToJson(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRep.unsafeToJson failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJson = (instance: CML.DRep): string =>
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
 *   const result = DRep.unsafeToJsValue(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRep.unsafeToJsValue failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJsValue = (instance: CML.DRep): any =>
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
 *   const result = DRep.unsafeFromJson( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRep.unsafeFromJson failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromJson = (json: string) => Effect.runSync(fromJson(json));

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
 *   const result = DRep.unsafeNewKey( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRep.unsafeNewKey failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeNewKey = (pool: CML.Ed25519KeyHash) =>
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
 *   const result = DRep.unsafeNewScript( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRep.unsafeNewScript failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeNewScript = (scriptHash: CML.ScriptHash) =>
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
 *   const result = DRep.unsafeNewAlwaysAbstain();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRep.unsafeNewAlwaysAbstain failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeNewAlwaysAbstain = () => Effect.runSync(newAlwaysAbstain());

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
 *   const result = DRep.unsafeNewAlwaysNoConfidence();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRep.unsafeNewAlwaysNoConfidence failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeNewAlwaysNoConfidence = () =>
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
 *   const result = DRep.unsafeKind(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRep.unsafeKind failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeKind = (instance: CML.DRep): CML.DRepKind =>
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
 *   const result = DRep.unsafeAsKey(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRep.unsafeAsKey failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAsKey = (
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
 *   const result = DRep.unsafeAsScript(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRep.unsafeAsScript failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAsScript = (
  instance: CML.DRep,
): CML.ScriptHash | undefined => Effect.runSync(asScript(instance));
