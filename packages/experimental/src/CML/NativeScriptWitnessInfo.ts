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
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.NativeScriptWitnessInfo) => Effect.Effect<void, NativeScriptWitnessInfoError> = Effect.fn(
  (instance: CML.NativeScriptWitnessInfo) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.NativeScriptWitnessInfo): void =>
  Effect.runSync(free(instance));

/**
 * Static method numSignatures of NativeScriptWitnessInfo
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const numSignatures: (num: number) => Effect.Effect<CML.NativeScriptWitnessInfo, NativeScriptWitnessInfoError> = Effect.fn(function* (num: number) {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const numSignaturesUnsafe = (num: number): CML.NativeScriptWitnessInfo =>
  Effect.runSync(numSignatures(num));

/**
 * Static method vkeys of NativeScriptWitnessInfo
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const vkeys: (_vkeys: CML.Ed25519KeyHashList) => Effect.Effect<CML.NativeScriptWitnessInfo, NativeScriptWitnessInfoError> = Effect.fn(function* (_vkeys: CML.Ed25519KeyHashList) {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const vkeysUnsafe = (_vkeys: CML.Ed25519KeyHashList): CML.NativeScriptWitnessInfo =>
  Effect.runSync(vkeys(_vkeys));

/**
 * Static method assumeSignatureCount of NativeScriptWitnessInfo
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const assumeSignatureCount: () => Effect.Effect<CML.NativeScriptWitnessInfo, NativeScriptWitnessInfoError> = Effect.fn(function* () {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const assumeSignatureCountUnsafe = (): CML.NativeScriptWitnessInfo =>
  Effect.runSync(assumeSignatureCount());
