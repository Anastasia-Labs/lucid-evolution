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
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.SingleMintBuilder) => Effect.Effect<void, SingleMintBuilderError> = Effect.fn(
  (instance: CML.SingleMintBuilder) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.SingleMintBuilder): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of SingleMintBuilder
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (assets: CML.MapAssetNameToNonZeroInt64) => Effect.Effect<CML.SingleMintBuilder, SingleMintBuilderError> = Effect.fn(function* (assets: CML.MapAssetNameToNonZeroInt64) {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (assets: CML.MapAssetNameToNonZeroInt64): CML.SingleMintBuilder =>
  Effect.runSync(_new(assets));

/**
 * Static method newSingleAsset of SingleMintBuilder
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newSingleAsset: (asset: CML.AssetName, amount: bigint) => Effect.Effect<CML.SingleMintBuilder, SingleMintBuilderError> = Effect.fn(function* (asset: CML.AssetName, amount: bigint) {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newSingleAssetUnsafe = (asset: CML.AssetName, amount: bigint): CML.SingleMintBuilder =>
  Effect.runSync(newSingleAsset(asset, amount));

/**
 * Method nativeScript of SingleMintBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const nativeScript: (instance: CML.SingleMintBuilder, _nativeScript: CML.NativeScript, witnessInfo: CML.NativeScriptWitnessInfo) => Effect.Effect<CML.MintBuilderResult, SingleMintBuilderError> = Effect.fn(
  (instance: CML.SingleMintBuilder, _nativeScript: CML.NativeScript, witnessInfo: CML.NativeScriptWitnessInfo) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const nativeScriptUnsafe = (instance: CML.SingleMintBuilder, _nativeScript: CML.NativeScript, witnessInfo: CML.NativeScriptWitnessInfo): CML.MintBuilderResult =>
  Effect.runSync(nativeScript(instance, _nativeScript, witnessInfo));

/**
 * Method plutusScript of SingleMintBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const plutusScript: (instance: CML.SingleMintBuilder, partialWitness: CML.PartialPlutusWitness, requiredSigners: CML.Ed25519KeyHashList) => Effect.Effect<CML.MintBuilderResult, SingleMintBuilderError> = Effect.fn(
  (instance: CML.SingleMintBuilder, partialWitness: CML.PartialPlutusWitness, requiredSigners: CML.Ed25519KeyHashList) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const plutusScriptUnsafe = (instance: CML.SingleMintBuilder, partialWitness: CML.PartialPlutusWitness, requiredSigners: CML.Ed25519KeyHashList): CML.MintBuilderResult =>
  Effect.runSync(plutusScript(instance, partialWitness, requiredSigners));
