/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML PlutusScript class
 *
 * @since 2.0.0
 * @category Types
 */
export type PlutusScript = CML.PlutusScript;

/**
 * Error class for PlutusScript operations
 * 
 * This error is thrown when operations on PlutusScript instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class PlutusScriptError extends Data.TaggedError("PlutusScriptError")<{
  message?: string;
}> {}

/**
 * Method free of PlutusScript
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.PlutusScript) => Effect.Effect<void, PlutusScriptError> = Effect.fn(
  (instance: CML.PlutusScript) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new PlutusScriptError({
          message: `PlutusScript.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.PlutusScript): void =>
  Effect.runSync(free(instance));

/**
 * Static method fromV1 of PlutusScript
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromV1: (script: CML.PlutusV1Script) => Effect.Effect<CML.PlutusScript, PlutusScriptError> = Effect.fn(function* (script: CML.PlutusV1Script) {
  return yield* Effect.try({
    try: () => CML.PlutusScript.from_v1(script),
    catch: () => new PlutusScriptError({
      message: `PlutusScript.fromV1 failed with parameters: ${script} (PlutusV1Script). `,
    }),
  });
});

/**
 * Unsafely calls PlutusScript.fromV1 without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromV1Unsafe = (script: CML.PlutusV1Script): CML.PlutusScript =>
  Effect.runSync(fromV1(script));

/**
 * Static method fromV2 of PlutusScript
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromV2: (script: CML.PlutusV2Script) => Effect.Effect<CML.PlutusScript, PlutusScriptError> = Effect.fn(function* (script: CML.PlutusV2Script) {
  return yield* Effect.try({
    try: () => CML.PlutusScript.from_v2(script),
    catch: () => new PlutusScriptError({
      message: `PlutusScript.fromV2 failed with parameters: ${script} (PlutusV2Script). `,
    }),
  });
});

/**
 * Unsafely calls PlutusScript.fromV2 without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromV2Unsafe = (script: CML.PlutusV2Script): CML.PlutusScript =>
  Effect.runSync(fromV2(script));

/**
 * Static method fromV3 of PlutusScript
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromV3: (script: CML.PlutusV3Script) => Effect.Effect<CML.PlutusScript, PlutusScriptError> = Effect.fn(function* (script: CML.PlutusV3Script) {
  return yield* Effect.try({
    try: () => CML.PlutusScript.from_v3(script),
    catch: () => new PlutusScriptError({
      message: `PlutusScript.fromV3 failed with parameters: ${script} (PlutusV3Script). `,
    }),
  });
});

/**
 * Unsafely calls PlutusScript.fromV3 without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromV3Unsafe = (script: CML.PlutusV3Script): CML.PlutusScript =>
  Effect.runSync(fromV3(script));

/**
 * Method hash of PlutusScript
 * 
 * @since 2.0.0
 * @category Methods
 */
export const hash: (instance: CML.PlutusScript) => Effect.Effect<CML.ScriptHash, PlutusScriptError> = Effect.fn(
  (instance: CML.PlutusScript) =>
    Effect.try({
      try: () => instance.hash(),
      catch: () =>
        new PlutusScriptError({
          message: `PlutusScript.hash failed `,
        }),
    })
);

/**
 * Unsafely calls instance.hash without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const hashUnsafe = (instance: CML.PlutusScript): CML.ScriptHash =>
  Effect.runSync(hash(instance));

/**
 * Method asV1 of PlutusScript
 * 
 * @since 2.0.0
 * @category Methods
 */
export const asV1: (instance: CML.PlutusScript) => Effect.Effect<CML.PlutusV1Script | undefined, PlutusScriptError> = Effect.fn(
  (instance: CML.PlutusScript) =>
    Effect.try({
      try: () => instance.as_v1(),
      catch: () =>
        new PlutusScriptError({
          message: `PlutusScript.asV1 failed `,
        }),
    })
);

/**
 * Unsafely calls instance.asV1 without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asV1Unsafe = (instance: CML.PlutusScript): CML.PlutusV1Script | undefined =>
  Effect.runSync(asV1(instance));

/**
 * Method asV2 of PlutusScript
 * 
 * @since 2.0.0
 * @category Methods
 */
export const asV2: (instance: CML.PlutusScript) => Effect.Effect<CML.PlutusV2Script | undefined, PlutusScriptError> = Effect.fn(
  (instance: CML.PlutusScript) =>
    Effect.try({
      try: () => instance.as_v2(),
      catch: () =>
        new PlutusScriptError({
          message: `PlutusScript.asV2 failed `,
        }),
    })
);

/**
 * Unsafely calls instance.asV2 without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asV2Unsafe = (instance: CML.PlutusScript): CML.PlutusV2Script | undefined =>
  Effect.runSync(asV2(instance));

/**
 * Method asV3 of PlutusScript
 * 
 * @since 2.0.0
 * @category Methods
 */
export const asV3: (instance: CML.PlutusScript) => Effect.Effect<CML.PlutusV3Script | undefined, PlutusScriptError> = Effect.fn(
  (instance: CML.PlutusScript) =>
    Effect.try({
      try: () => instance.as_v3(),
      catch: () =>
        new PlutusScriptError({
          message: `PlutusScript.asV3 failed `,
        }),
    })
);

/**
 * Unsafely calls instance.asV3 without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asV3Unsafe = (instance: CML.PlutusScript): CML.PlutusV3Script | undefined =>
  Effect.runSync(asV3(instance));

/**
 * Method version of PlutusScript
 * 
 * @since 2.0.0
 * @category Methods
 */
export const version: (instance: CML.PlutusScript) => Effect.Effect<CML.Language, PlutusScriptError> = Effect.fn(
  (instance: CML.PlutusScript) =>
    Effect.try({
      try: () => instance.version(),
      catch: () =>
        new PlutusScriptError({
          message: `PlutusScript.version failed `,
        }),
    })
);

/**
 * Unsafely calls instance.version without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const versionUnsafe = (instance: CML.PlutusScript): CML.Language =>
  Effect.runSync(version(instance));
