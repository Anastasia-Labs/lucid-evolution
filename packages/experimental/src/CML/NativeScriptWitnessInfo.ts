import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type NativeScriptWitnessInfo = CML.NativeScriptWitnessInfo;

export class NativeScriptWitnessInfoError extends Data.TaggedError(
  "NativeScriptWitnessInfoError",
)<{
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
  (
    instance: CML.NativeScriptWitnessInfo,
  ): Effect.Effect<void, NativeScriptWitnessInfoError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new NativeScriptWitnessInfoError({
          message: `NativeScriptWitnessInfo.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
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
 *   const result = NativeScriptWitnessInfo.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NativeScriptWitnessInfo.unsafeFree failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.NativeScriptWitnessInfo): void =>
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
    catch: () =>
      new NativeScriptWitnessInfoError({
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
 *   const result = NativeScriptWitnessInfo.unsafeNumSignatures( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NativeScriptWitnessInfo.unsafeNumSignatures failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeNumSignatures = (num: number) =>
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
    catch: () =>
      new NativeScriptWitnessInfoError({
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
 *   const result = NativeScriptWitnessInfo.unsafeVkeys( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NativeScriptWitnessInfo.unsafeVkeys failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeVkeys = (_vkeys: CML.Ed25519KeyHashList) =>
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
    catch: () =>
      new NativeScriptWitnessInfoError({
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
 *   const result = NativeScriptWitnessInfo.unsafeAssumeSignatureCount();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NativeScriptWitnessInfo.unsafeAssumeSignatureCount failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeAssumeSignatureCount = () =>
  Effect.runSync(assumeSignatureCount());
