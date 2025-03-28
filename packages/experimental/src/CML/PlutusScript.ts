import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type PlutusScript = CML.PlutusScript;

export class PlutusScriptError extends Data.TaggedError("PlutusScriptError")<{
  message?: string;
}> {}

/**
 * Method free of PlutusScript
 *
 * @example
 * import { PlutusScript } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusScript instance
 * const instance = ... ;
 *   const result = yield* PlutusScript.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.PlutusScript): Effect.Effect<void, PlutusScriptError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new PlutusScriptError({
          message: `PlutusScript.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { PlutusScript } from "@lucid-evolution/experimental";
 *
 * // Assume we have a PlutusScript instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusScript.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusScript.unsafeFree failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.PlutusScript): void =>
  Effect.runSync(free(instance));

/**
 * Static method fromV1 of PlutusScript
 *
 * @example
 * import { PlutusScript } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* PlutusScript.fromV1( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromV1 = Effect.fn(function* (script: CML.PlutusV1Script) {
  return yield* Effect.try({
    try: () => CML.PlutusScript.from_v1(script),
    catch: () =>
      new PlutusScriptError({
        message: `PlutusScript.fromV1 failed with parameters: ${script} (PlutusV1Script). `,
      }),
  });
});

/**
 * Unsafely calls PlutusScript.fromV1 without Effect wrapper
 *
 * @example
 * import { PlutusScript } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusScript.unsafeFromV1( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusScript.unsafeFromV1 failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromV1 = (script: CML.PlutusV1Script) =>
  Effect.runSync(fromV1(script));

/**
 * Static method fromV2 of PlutusScript
 *
 * @example
 * import { PlutusScript } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* PlutusScript.fromV2( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromV2 = Effect.fn(function* (script: CML.PlutusV2Script) {
  return yield* Effect.try({
    try: () => CML.PlutusScript.from_v2(script),
    catch: () =>
      new PlutusScriptError({
        message: `PlutusScript.fromV2 failed with parameters: ${script} (PlutusV2Script). `,
      }),
  });
});

/**
 * Unsafely calls PlutusScript.fromV2 without Effect wrapper
 *
 * @example
 * import { PlutusScript } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusScript.unsafeFromV2( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusScript.unsafeFromV2 failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromV2 = (script: CML.PlutusV2Script) =>
  Effect.runSync(fromV2(script));

/**
 * Static method fromV3 of PlutusScript
 *
 * @example
 * import { PlutusScript } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* PlutusScript.fromV3( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromV3 = Effect.fn(function* (script: CML.PlutusV3Script) {
  return yield* Effect.try({
    try: () => CML.PlutusScript.from_v3(script),
    catch: () =>
      new PlutusScriptError({
        message: `PlutusScript.fromV3 failed with parameters: ${script} (PlutusV3Script). `,
      }),
  });
});

/**
 * Unsafely calls PlutusScript.fromV3 without Effect wrapper
 *
 * @example
 * import { PlutusScript } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusScript.unsafeFromV3( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusScript.unsafeFromV3 failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromV3 = (script: CML.PlutusV3Script) =>
  Effect.runSync(fromV3(script));

/**
 * Method hash of PlutusScript
 *
 * @example
 * import { PlutusScript } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusScript instance
 * const instance = ... ;
 *   const result = yield* PlutusScript.hash(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const hash = Effect.fn(
  (
    instance: CML.PlutusScript,
  ): Effect.Effect<CML.ScriptHash, PlutusScriptError> =>
    Effect.try({
      try: () => instance.hash(),
      catch: () =>
        new PlutusScriptError({
          message: `PlutusScript.hash failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.hash without Effect wrapper
 *
 * @example
 * import { PlutusScript } from "@lucid-evolution/experimental";
 *
 * // Assume we have a PlutusScript instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusScript.unsafeHash(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusScript.unsafeHash failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeHash = (instance: CML.PlutusScript): CML.ScriptHash =>
  Effect.runSync(hash(instance));

/**
 * Method asV1 of PlutusScript
 *
 * @example
 * import { PlutusScript } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusScript instance
 * const instance = ... ;
 *   const result = yield* PlutusScript.asV1(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const asV1 = Effect.fn(
  (
    instance: CML.PlutusScript,
  ): Effect.Effect<CML.PlutusV1Script | undefined, PlutusScriptError> =>
    Effect.try({
      try: () => instance.as_v1(),
      catch: () =>
        new PlutusScriptError({
          message: `PlutusScript.asV1 failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.asV1 without Effect wrapper
 *
 * @example
 * import { PlutusScript } from "@lucid-evolution/experimental";
 *
 * // Assume we have a PlutusScript instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusScript.unsafeAsV1(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusScript.unsafeAsV1 failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAsV1 = (
  instance: CML.PlutusScript,
): CML.PlutusV1Script | undefined => Effect.runSync(asV1(instance));

/**
 * Method asV2 of PlutusScript
 *
 * @example
 * import { PlutusScript } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusScript instance
 * const instance = ... ;
 *   const result = yield* PlutusScript.asV2(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const asV2 = Effect.fn(
  (
    instance: CML.PlutusScript,
  ): Effect.Effect<CML.PlutusV2Script | undefined, PlutusScriptError> =>
    Effect.try({
      try: () => instance.as_v2(),
      catch: () =>
        new PlutusScriptError({
          message: `PlutusScript.asV2 failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.asV2 without Effect wrapper
 *
 * @example
 * import { PlutusScript } from "@lucid-evolution/experimental";
 *
 * // Assume we have a PlutusScript instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusScript.unsafeAsV2(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusScript.unsafeAsV2 failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAsV2 = (
  instance: CML.PlutusScript,
): CML.PlutusV2Script | undefined => Effect.runSync(asV2(instance));

/**
 * Method asV3 of PlutusScript
 *
 * @example
 * import { PlutusScript } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusScript instance
 * const instance = ... ;
 *   const result = yield* PlutusScript.asV3(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const asV3 = Effect.fn(
  (
    instance: CML.PlutusScript,
  ): Effect.Effect<CML.PlutusV3Script | undefined, PlutusScriptError> =>
    Effect.try({
      try: () => instance.as_v3(),
      catch: () =>
        new PlutusScriptError({
          message: `PlutusScript.asV3 failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.asV3 without Effect wrapper
 *
 * @example
 * import { PlutusScript } from "@lucid-evolution/experimental";
 *
 * // Assume we have a PlutusScript instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusScript.unsafeAsV3(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusScript.unsafeAsV3 failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAsV3 = (
  instance: CML.PlutusScript,
): CML.PlutusV3Script | undefined => Effect.runSync(asV3(instance));

/**
 * Method version of PlutusScript
 *
 * @example
 * import { PlutusScript } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusScript instance
 * const instance = ... ;
 *   const result = yield* PlutusScript.version(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const version = Effect.fn(
  (
    instance: CML.PlutusScript,
  ): Effect.Effect<CML.Language, PlutusScriptError> =>
    Effect.try({
      try: () => instance.version(),
      catch: () =>
        new PlutusScriptError({
          message: `PlutusScript.version failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.version without Effect wrapper
 *
 * @example
 * import { PlutusScript } from "@lucid-evolution/experimental";
 *
 * // Assume we have a PlutusScript instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusScript.unsafeVersion(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusScript.unsafeVersion failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeVersion = (instance: CML.PlutusScript): CML.Language =>
  Effect.runSync(version(instance));
