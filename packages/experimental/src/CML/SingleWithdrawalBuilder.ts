import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type SingleWithdrawalBuilder = CML.SingleWithdrawalBuilder;

export class SingleWithdrawalBuilderError extends Data.TaggedError("SingleWithdrawalBuilderError")<{
  message?: string;
}> {}

/**
 * Method free of SingleWithdrawalBuilder
 * 
 * @example
 * import { SingleWithdrawalBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a SingleWithdrawalBuilder instance
 * const instance = ... ;
 *   const result = yield* SingleWithdrawalBuilder.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.SingleWithdrawalBuilder): Effect.Effect<void, SingleWithdrawalBuilderError> =>
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
 * @example
 * import { SingleWithdrawalBuilder } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a SingleWithdrawalBuilder instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = SingleWithdrawalBuilder.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SingleWithdrawalBuilder.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.SingleWithdrawalBuilder): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of SingleWithdrawalBuilder
 * 
 * @example
 * import { SingleWithdrawalBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* SingleWithdrawalBuilder._new( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (address: CML.RewardAddress, amount: bigint) {
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
 * @example
 * import { SingleWithdrawalBuilder } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = SingleWithdrawalBuilder.unsafe_new( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SingleWithdrawalBuilder.unsafe_new failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = (address: CML.RewardAddress, amount: bigint) =>
  Effect.runSync(_new(address, amount));

/**
 * Method paymentKey of SingleWithdrawalBuilder
 * 
 * @example
 * import { SingleWithdrawalBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a SingleWithdrawalBuilder instance
 * const instance = ... ;
 *   const result = yield* SingleWithdrawalBuilder.paymentKey(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const paymentKey = Effect.fn(
  (instance: CML.SingleWithdrawalBuilder): Effect.Effect<CML.WithdrawalBuilderResult, SingleWithdrawalBuilderError> =>
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
 * @example
 * import { SingleWithdrawalBuilder } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a SingleWithdrawalBuilder instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = SingleWithdrawalBuilder.unsafePaymentKey(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SingleWithdrawalBuilder.unsafePaymentKey failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafePaymentKey = (instance: CML.SingleWithdrawalBuilder): CML.WithdrawalBuilderResult =>
  Effect.runSync(paymentKey(instance));

/**
 * Method nativeScript of SingleWithdrawalBuilder
 * 
 * @example
 * import { SingleWithdrawalBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a SingleWithdrawalBuilder instance
 * const instance = ... ;
 *   const result = yield* SingleWithdrawalBuilder.nativeScript(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const nativeScript = Effect.fn(
  (instance: CML.SingleWithdrawalBuilder, _nativeScript: CML.NativeScript, witnessInfo: CML.NativeScriptWitnessInfo): Effect.Effect<CML.WithdrawalBuilderResult, SingleWithdrawalBuilderError> =>
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
 * @example
 * import { SingleWithdrawalBuilder } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a SingleWithdrawalBuilder instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = SingleWithdrawalBuilder.unsafeNativeScript(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SingleWithdrawalBuilder.unsafeNativeScript failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeNativeScript = (instance: CML.SingleWithdrawalBuilder, _nativeScript: CML.NativeScript, witnessInfo: CML.NativeScriptWitnessInfo): CML.WithdrawalBuilderResult =>
  Effect.runSync(nativeScript(instance, _nativeScript, witnessInfo));

/**
 * Method plutusScript of SingleWithdrawalBuilder
 * 
 * @example
 * import { SingleWithdrawalBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a SingleWithdrawalBuilder instance
 * const instance = ... ;
 *   const result = yield* SingleWithdrawalBuilder.plutusScript(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const plutusScript = Effect.fn(
  (instance: CML.SingleWithdrawalBuilder, partialWitness: CML.PartialPlutusWitness, requiredSigners: CML.Ed25519KeyHashList): Effect.Effect<CML.WithdrawalBuilderResult, SingleWithdrawalBuilderError> =>
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
 * @example
 * import { SingleWithdrawalBuilder } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a SingleWithdrawalBuilder instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = SingleWithdrawalBuilder.unsafePlutusScript(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SingleWithdrawalBuilder.unsafePlutusScript failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafePlutusScript = (instance: CML.SingleWithdrawalBuilder, partialWitness: CML.PartialPlutusWitness, requiredSigners: CML.Ed25519KeyHashList): CML.WithdrawalBuilderResult =>
  Effect.runSync(plutusScript(instance, partialWitness, requiredSigners));
