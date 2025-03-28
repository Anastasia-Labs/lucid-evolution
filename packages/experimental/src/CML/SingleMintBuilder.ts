import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type SingleMintBuilder = CML.SingleMintBuilder;

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
 *   const result = SingleMintBuilder.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SingleMintBuilder.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.SingleMintBuilder): void =>
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
 *   const result = SingleMintBuilder.unsafe_new( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SingleMintBuilder.unsafe_new failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = (assets: CML.MapAssetNameToNonZeroInt64) =>
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
 *   const result = SingleMintBuilder.unsafeNewSingleAsset( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SingleMintBuilder.unsafeNewSingleAsset failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeNewSingleAsset = (asset: CML.AssetName, amount: bigint) =>
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
 *   const result = SingleMintBuilder.unsafeNativeScript(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SingleMintBuilder.unsafeNativeScript failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeNativeScript = (instance: CML.SingleMintBuilder, _nativeScript: CML.NativeScript, witnessInfo: CML.NativeScriptWitnessInfo): CML.MintBuilderResult =>
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
 *   const result = SingleMintBuilder.unsafePlutusScript(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SingleMintBuilder.unsafePlutusScript failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafePlutusScript = (instance: CML.SingleMintBuilder, partialWitness: CML.PartialPlutusWitness, requiredSigners: CML.Ed25519KeyHashList): CML.MintBuilderResult =>
  Effect.runSync(plutusScript(instance, partialWitness, requiredSigners));
