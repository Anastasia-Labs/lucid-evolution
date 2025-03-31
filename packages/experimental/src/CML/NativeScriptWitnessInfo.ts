/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML NativeScriptWitnessInfo class
 *
 * @since 2.0.0
 * @category Types
 */
export type NativeScriptWitnessInfo = CML.NativeScriptWitnessInfo;

/**
 * Error class for NativeScriptWitnessInfo operations
 * 
 * This error is thrown when operations on NativeScriptWitnessInfo instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class NativeScriptWitnessInfoError extends Data.TaggedError("NativeScriptWitnessInfoError")<{
  message?: string;
}> {}

/**
 * Method free of NativeScriptWitnessInfo
 * 
 * @example
 * import { NativeScriptWitnessInfo } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a NativeScriptWitnessInfo instance
 * const instance = ... ;
 *   const result = yield* NativeScriptWitnessInfo.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.NativeScriptWitnessInfo): Effect.Effect<void, NativeScriptWitnessInfoError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new NativeScriptWitnessInfoError({
          message: `NativeScriptWitnessInfo.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { NativeScriptWitnessInfo } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a NativeScriptWitnessInfo instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = NativeScriptWitnessInfo.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NativeScriptWitnessInfo.freeUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.NativeScriptWitnessInfo): void =>
  Effect.runSync(free(instance));

/**
 * Static method numSignatures of NativeScriptWitnessInfo
 * 
 * @example
 * import { NativeScriptWitnessInfo } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* NativeScriptWitnessInfo.numSignatures( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const numSignatures = Effect.fn(function* (num: number) {
  return yield* Effect.try({
    try: () => CML.NativeScriptWitnessInfo.num_signatures(num),
    catch: () => new NativeScriptWitnessInfoError({
      message: `NativeScriptWitnessInfo.numSignatures failed with parameters: ${num}. `,
    }),
  });
});

/**
 * Unsafely calls NativeScriptWitnessInfo.numSignatures without Effect wrapper
 * 
 * @example
 * import { NativeScriptWitnessInfo } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = NativeScriptWitnessInfo.numSignaturesUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NativeScriptWitnessInfo.numSignaturesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const numSignaturesUnsafe = (num: number) =>
  Effect.runSync(numSignatures(num));

/**
 * Static method vkeys of NativeScriptWitnessInfo
 * 
 * @example
 * import { NativeScriptWitnessInfo } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* NativeScriptWitnessInfo.vkeys( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const vkeys = Effect.fn(function* (_vkeys: CML.Ed25519KeyHashList) {
  return yield* Effect.try({
    try: () => CML.NativeScriptWitnessInfo.vkeys(_vkeys),
    catch: () => new NativeScriptWitnessInfoError({
      message: `NativeScriptWitnessInfo.vkeys failed with parameters: ${_vkeys} (Ed25519KeyHashList). `,
    }),
  });
});

/**
 * Unsafely calls NativeScriptWitnessInfo.vkeys without Effect wrapper
 * 
 * @example
 * import { NativeScriptWitnessInfo } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = NativeScriptWitnessInfo.vkeysUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NativeScriptWitnessInfo.vkeysUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const vkeysUnsafe = (_vkeys: CML.Ed25519KeyHashList) =>
  Effect.runSync(vkeys(_vkeys));

/**
 * Static method assumeSignatureCount of NativeScriptWitnessInfo
 * 
 * @example
 * import { NativeScriptWitnessInfo } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* NativeScriptWitnessInfo.assumeSignatureCount();
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const assumeSignatureCount = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.NativeScriptWitnessInfo.assume_signature_count(),
    catch: () => new NativeScriptWitnessInfoError({
      message: `NativeScriptWitnessInfo.assumeSignatureCount failed `,
    }),
  });
});

/**
 * Unsafely calls NativeScriptWitnessInfo.assumeSignatureCount without Effect wrapper
 * 
 * @example
 * import { NativeScriptWitnessInfo } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = NativeScriptWitnessInfo.assumeSignatureCountUnsafe();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NativeScriptWitnessInfo.assumeSignatureCountUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const assumeSignatureCountUnsafe = () =>
  Effect.runSync(assumeSignatureCount());
