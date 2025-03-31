/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML SingleMintBuilder class
 *
 * @since 2.0.0
 * @category Types
 */
export type SingleMintBuilder = CML.SingleMintBuilder;

/**
 * Error class for SingleMintBuilder operations
 * 
 * This error is thrown when operations on SingleMintBuilder instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class SingleMintBuilderError extends Data.TaggedError("SingleMintBuilderError")<{
  message?: string;
}> {}

/**
 * Method free of SingleMintBuilder
 * 
 * @example
 * import { SingleMintBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a SingleMintBuilder instance
 * const instance = ... ;
 *   const result = yield* SingleMintBuilder.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.SingleMintBuilder): Effect.Effect<void, SingleMintBuilderError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new SingleMintBuilderError({
          message: `SingleMintBuilder.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { SingleMintBuilder } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a SingleMintBuilder instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = SingleMintBuilder.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SingleMintBuilder.freeUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.SingleMintBuilder): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of SingleMintBuilder
 * 
 * @example
 * import { SingleMintBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* SingleMintBuilder._new( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (assets: CML.MapAssetNameToNonZeroInt64) {
  return yield* Effect.try({
    try: () => CML.SingleMintBuilder.new(assets),
    catch: () => new SingleMintBuilderError({
      message: `SingleMintBuilder._new failed with parameters: ${assets} (MapAssetNameToNonZeroInt64). `,
    }),
  });
});

/**
 * Unsafely calls SingleMintBuilder._new without Effect wrapper
 * 
 * @example
 * import { SingleMintBuilder } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = SingleMintBuilder._newUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SingleMintBuilder._newUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (assets: CML.MapAssetNameToNonZeroInt64) =>
  Effect.runSync(_new(assets));

/**
 * Static method newSingleAsset of SingleMintBuilder
 * 
 * @example
 * import { SingleMintBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* SingleMintBuilder.newSingleAsset( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newSingleAsset = Effect.fn(function* (asset: CML.AssetName, amount: bigint) {
  return yield* Effect.try({
    try: () => CML.SingleMintBuilder.new_single_asset(asset, amount),
    catch: () => new SingleMintBuilderError({
      message: `SingleMintBuilder.newSingleAsset failed with parameters: ${asset} (AssetName), ${amount}. `,
    }),
  });
});

/**
 * Unsafely calls SingleMintBuilder.newSingleAsset without Effect wrapper
 * 
 * @example
 * import { SingleMintBuilder } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = SingleMintBuilder.newSingleAssetUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SingleMintBuilder.newSingleAssetUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newSingleAssetUnsafe = (asset: CML.AssetName, amount: bigint) =>
  Effect.runSync(newSingleAsset(asset, amount));

/**
 * Method nativeScript of SingleMintBuilder
 * 
 * @example
 * import { SingleMintBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a SingleMintBuilder instance
 * const instance = ... ;
 *   const result = yield* SingleMintBuilder.nativeScript(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const nativeScript = Effect.fn(
  (instance: CML.SingleMintBuilder, _nativeScript: CML.NativeScript, witnessInfo: CML.NativeScriptWitnessInfo): Effect.Effect<CML.MintBuilderResult, SingleMintBuilderError> =>
    Effect.try({
      try: () => instance.native_script(_nativeScript, witnessInfo),
      catch: () =>
        new SingleMintBuilderError({
          message: `SingleMintBuilder.nativeScript failed with parameters: ${_nativeScript} (NativeScript), ${witnessInfo} (NativeScriptWitnessInfo). `,
        }),
    })
);

/**
 * Unsafely calls instance.nativeScript without Effect wrapper
 * 
 * @example
 * import { SingleMintBuilder } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a SingleMintBuilder instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = SingleMintBuilder.nativeScriptUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SingleMintBuilder.nativeScriptUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const nativeScriptUnsafe = (instance: CML.SingleMintBuilder, _nativeScript: CML.NativeScript, witnessInfo: CML.NativeScriptWitnessInfo): CML.MintBuilderResult =>
  Effect.runSync(nativeScript(instance, _nativeScript, witnessInfo));

/**
 * Method plutusScript of SingleMintBuilder
 * 
 * @example
 * import { SingleMintBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a SingleMintBuilder instance
 * const instance = ... ;
 *   const result = yield* SingleMintBuilder.plutusScript(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const plutusScript = Effect.fn(
  (instance: CML.SingleMintBuilder, partialWitness: CML.PartialPlutusWitness, requiredSigners: CML.Ed25519KeyHashList): Effect.Effect<CML.MintBuilderResult, SingleMintBuilderError> =>
    Effect.try({
      try: () => instance.plutus_script(partialWitness, requiredSigners),
      catch: () =>
        new SingleMintBuilderError({
          message: `SingleMintBuilder.plutusScript failed with parameters: ${partialWitness} (PartialPlutusWitness), ${requiredSigners} (Ed25519KeyHashList). `,
        }),
    })
);

/**
 * Unsafely calls instance.plutusScript without Effect wrapper
 * 
 * @example
 * import { SingleMintBuilder } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a SingleMintBuilder instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = SingleMintBuilder.plutusScriptUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SingleMintBuilder.plutusScriptUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const plutusScriptUnsafe = (instance: CML.SingleMintBuilder, partialWitness: CML.PartialPlutusWitness, requiredSigners: CML.Ed25519KeyHashList): CML.MintBuilderResult =>
  Effect.runSync(plutusScript(instance, partialWitness, requiredSigners));
