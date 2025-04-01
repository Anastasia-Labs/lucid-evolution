/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML SingleWithdrawalBuilder class
 *
 * @since 2.0.0
 * @category Types
 */
export type SingleWithdrawalBuilder = CML.SingleWithdrawalBuilder;

/**
 * Error class for SingleWithdrawalBuilder operations
 * 
 * This error is thrown when operations on SingleWithdrawalBuilder instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class SingleWithdrawalBuilderError extends Data.TaggedError("SingleWithdrawalBuilderError")<{
  message?: string;
}> {}

/**
 * Method free of SingleWithdrawalBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.SingleWithdrawalBuilder) => Effect.Effect<void, SingleWithdrawalBuilderError> = Effect.fn(
  (instance: CML.SingleWithdrawalBuilder) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new SingleWithdrawalBuilderError({
          message: `SingleWithdrawalBuilder.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.SingleWithdrawalBuilder): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of SingleWithdrawalBuilder
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (address: CML.RewardAddress, amount: bigint) => Effect.Effect<CML.SingleWithdrawalBuilder, SingleWithdrawalBuilderError> = Effect.fn(function* (address: CML.RewardAddress, amount: bigint) {
  return yield* Effect.try({
    try: () => CML.SingleWithdrawalBuilder.new(address, amount),
    catch: () => new SingleWithdrawalBuilderError({
      message: `SingleWithdrawalBuilder._new failed with parameters: ${address} (RewardAddress), ${amount}. `,
    }),
  });
});

/**
 * Unsafely calls SingleWithdrawalBuilder._new without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (address: CML.RewardAddress, amount: bigint): CML.SingleWithdrawalBuilder =>
  Effect.runSync(_new(address, amount));

/**
 * Method paymentKey of SingleWithdrawalBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const paymentKey: (instance: CML.SingleWithdrawalBuilder) => Effect.Effect<CML.WithdrawalBuilderResult, SingleWithdrawalBuilderError> = Effect.fn(
  (instance: CML.SingleWithdrawalBuilder) =>
    Effect.try({
      try: () => instance.payment_key(),
      catch: () =>
        new SingleWithdrawalBuilderError({
          message: `SingleWithdrawalBuilder.paymentKey failed `,
        }),
    })
);

/**
 * Unsafely calls instance.paymentKey without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const paymentKeyUnsafe = (instance: CML.SingleWithdrawalBuilder): CML.WithdrawalBuilderResult =>
  Effect.runSync(paymentKey(instance));

/**
 * Method nativeScript of SingleWithdrawalBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const nativeScript: (instance: CML.SingleWithdrawalBuilder, _nativeScript: CML.NativeScript, witnessInfo: CML.NativeScriptWitnessInfo) => Effect.Effect<CML.WithdrawalBuilderResult, SingleWithdrawalBuilderError> = Effect.fn(
  (instance: CML.SingleWithdrawalBuilder, _nativeScript: CML.NativeScript, witnessInfo: CML.NativeScriptWitnessInfo) =>
    Effect.try({
      try: () => instance.native_script(_nativeScript, witnessInfo),
      catch: () =>
        new SingleWithdrawalBuilderError({
          message: `SingleWithdrawalBuilder.nativeScript failed with parameters: ${_nativeScript} (NativeScript), ${witnessInfo} (NativeScriptWitnessInfo). `,
        }),
    })
);

/**
 * Unsafely calls instance.nativeScript without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const nativeScriptUnsafe = (instance: CML.SingleWithdrawalBuilder, _nativeScript: CML.NativeScript, witnessInfo: CML.NativeScriptWitnessInfo): CML.WithdrawalBuilderResult =>
  Effect.runSync(nativeScript(instance, _nativeScript, witnessInfo));

/**
 * Method plutusScript of SingleWithdrawalBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const plutusScript: (instance: CML.SingleWithdrawalBuilder, partialWitness: CML.PartialPlutusWitness, requiredSigners: CML.Ed25519KeyHashList) => Effect.Effect<CML.WithdrawalBuilderResult, SingleWithdrawalBuilderError> = Effect.fn(
  (instance: CML.SingleWithdrawalBuilder, partialWitness: CML.PartialPlutusWitness, requiredSigners: CML.Ed25519KeyHashList) =>
    Effect.try({
      try: () => instance.plutus_script(partialWitness, requiredSigners),
      catch: () =>
        new SingleWithdrawalBuilderError({
          message: `SingleWithdrawalBuilder.plutusScript failed with parameters: ${partialWitness} (PartialPlutusWitness), ${requiredSigners} (Ed25519KeyHashList). `,
        }),
    })
);

/**
 * Unsafely calls instance.plutusScript without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const plutusScriptUnsafe = (instance: CML.SingleWithdrawalBuilder, partialWitness: CML.PartialPlutusWitness, requiredSigners: CML.Ed25519KeyHashList): CML.WithdrawalBuilderResult =>
  Effect.runSync(plutusScript(instance, partialWitness, requiredSigners));
