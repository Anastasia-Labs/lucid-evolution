/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML TransactionBuilder class
 *
 * @since 2.0.0
 * @category Types
 */
export type TransactionBuilder = CML.TransactionBuilder;

/**
 * Error class for TransactionBuilder operations
 * 
 * This error is thrown when operations on TransactionBuilder instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class TransactionBuilderError extends Data.TaggedError("TransactionBuilderError")<{
  message?: string;
}> {}

/**
 * Method free of TransactionBuilder
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionBuilder.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.TransactionBuilder): Effect.Effect<void, TransactionBuilderError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBuilder.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBuilder.freeUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.TransactionBuilder): void =>
  Effect.runSync(free(instance));

/**
 * Method selectUtxos of TransactionBuilder
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionBuilder.selectUtxos(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const selectUtxos = Effect.fn(
  (instance: CML.TransactionBuilder, strategy: CML.CoinSelectionStrategyCIP2): Effect.Effect<void, TransactionBuilderError> =>
    Effect.try({
      try: () => instance.select_utxos(strategy),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.selectUtxos failed with parameters: ${strategy} (CoinSelectionStrategyCIP2). `,
        }),
    })
);

/**
 * Unsafely calls instance.selectUtxos without Effect wrapper
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBuilder.selectUtxosUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBuilder.selectUtxosUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const selectUtxosUnsafe = (instance: CML.TransactionBuilder, strategy: CML.CoinSelectionStrategyCIP2): void =>
  Effect.runSync(selectUtxos(instance, strategy));

/**
 * Method addInput of TransactionBuilder
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionBuilder.addInput(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const addInput = Effect.fn(
  (instance: CML.TransactionBuilder, result: CML.InputBuilderResult): Effect.Effect<void, TransactionBuilderError> =>
    Effect.try({
      try: () => instance.add_input(result),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.addInput failed with parameters: ${result} (InputBuilderResult). `,
        }),
    })
);

/**
 * Unsafely calls instance.addInput without Effect wrapper
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBuilder.addInputUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBuilder.addInputUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addInputUnsafe = (instance: CML.TransactionBuilder, result: CML.InputBuilderResult): void =>
  Effect.runSync(addInput(instance, result));

/**
 * Method addUtxo of TransactionBuilder
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionBuilder.addUtxo(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const addUtxo = Effect.fn(
  (instance: CML.TransactionBuilder, result: CML.InputBuilderResult): Effect.Effect<void, TransactionBuilderError> =>
    Effect.try({
      try: () => instance.add_utxo(result),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.addUtxo failed with parameters: ${result} (InputBuilderResult). `,
        }),
    })
);

/**
 * Unsafely calls instance.addUtxo without Effect wrapper
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBuilder.addUtxoUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBuilder.addUtxoUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addUtxoUnsafe = (instance: CML.TransactionBuilder, result: CML.InputBuilderResult): void =>
  Effect.runSync(addUtxo(instance, result));

/**
 * Method feeForInput of TransactionBuilder
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionBuilder.feeForInput(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const feeForInput = Effect.fn(
  (instance: CML.TransactionBuilder, result: CML.InputBuilderResult): Effect.Effect<bigint, TransactionBuilderError> =>
    Effect.try({
      try: () => instance.fee_for_input(result),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.feeForInput failed with parameters: ${result} (InputBuilderResult). `,
        }),
    })
);

/**
 * Unsafely calls instance.feeForInput without Effect wrapper
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBuilder.feeForInputUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBuilder.feeForInputUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const feeForInputUnsafe = (instance: CML.TransactionBuilder, result: CML.InputBuilderResult): bigint =>
  Effect.runSync(feeForInput(instance, result));

/**
 * Method addReferenceInput of TransactionBuilder
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionBuilder.addReferenceInput(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const addReferenceInput = Effect.fn(
  (instance: CML.TransactionBuilder, utxo: CML.TransactionUnspentOutput): Effect.Effect<void, TransactionBuilderError> =>
    Effect.try({
      try: () => instance.add_reference_input(utxo),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.addReferenceInput failed with parameters: ${utxo} (TransactionUnspentOutput). `,
        }),
    })
);

/**
 * Unsafely calls instance.addReferenceInput without Effect wrapper
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBuilder.addReferenceInputUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBuilder.addReferenceInputUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addReferenceInputUnsafe = (instance: CML.TransactionBuilder, utxo: CML.TransactionUnspentOutput): void =>
  Effect.runSync(addReferenceInput(instance, utxo));

/**
 * Method addOutput of TransactionBuilder
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionBuilder.addOutput(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const addOutput = Effect.fn(
  (instance: CML.TransactionBuilder, builderResult: CML.SingleOutputBuilderResult): Effect.Effect<void, TransactionBuilderError> =>
    Effect.try({
      try: () => instance.add_output(builderResult),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.addOutput failed with parameters: ${builderResult} (SingleOutputBuilderResult). `,
        }),
    })
);

/**
 * Unsafely calls instance.addOutput without Effect wrapper
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBuilder.addOutputUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBuilder.addOutputUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addOutputUnsafe = (instance: CML.TransactionBuilder, builderResult: CML.SingleOutputBuilderResult): void =>
  Effect.runSync(addOutput(instance, builderResult));

/**
 * Method feeForOutput of TransactionBuilder
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionBuilder.feeForOutput(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const feeForOutput = Effect.fn(
  (instance: CML.TransactionBuilder, builder: CML.SingleOutputBuilderResult): Effect.Effect<bigint, TransactionBuilderError> =>
    Effect.try({
      try: () => instance.fee_for_output(builder),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.feeForOutput failed with parameters: ${builder} (SingleOutputBuilderResult). `,
        }),
    })
);

/**
 * Unsafely calls instance.feeForOutput without Effect wrapper
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBuilder.feeForOutputUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBuilder.feeForOutputUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const feeForOutputUnsafe = (instance: CML.TransactionBuilder, builder: CML.SingleOutputBuilderResult): bigint =>
  Effect.runSync(feeForOutput(instance, builder));

/**
 * Method setFee of TransactionBuilder
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionBuilder.setFee(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setFee = Effect.fn(
  (instance: CML.TransactionBuilder, fee: bigint): Effect.Effect<void, TransactionBuilderError> =>
    Effect.try({
      try: () => instance.set_fee(fee),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.setFee failed with parameters: ${fee}. `,
        }),
    })
);

/**
 * Unsafely calls instance.setFee without Effect wrapper
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBuilder.setFeeUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBuilder.setFeeUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setFeeUnsafe = (instance: CML.TransactionBuilder, fee: bigint): void =>
  Effect.runSync(setFee(instance, fee));

/**
 * Method setTtl of TransactionBuilder
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionBuilder.setTtl(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setTtl = Effect.fn(
  (instance: CML.TransactionBuilder, ttl: bigint): Effect.Effect<void, TransactionBuilderError> =>
    Effect.try({
      try: () => instance.set_ttl(ttl),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.setTtl failed with parameters: ${ttl}. `,
        }),
    })
);

/**
 * Unsafely calls instance.setTtl without Effect wrapper
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBuilder.setTtlUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBuilder.setTtlUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setTtlUnsafe = (instance: CML.TransactionBuilder, ttl: bigint): void =>
  Effect.runSync(setTtl(instance, ttl));

/**
 * Method setValidityStartInterval of TransactionBuilder
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionBuilder.setValidityStartInterval(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setValidityStartInterval = Effect.fn(
  (instance: CML.TransactionBuilder, validityStartInterval: bigint): Effect.Effect<void, TransactionBuilderError> =>
    Effect.try({
      try: () => instance.set_validity_start_interval(validityStartInterval),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.setValidityStartInterval failed with parameters: ${validityStartInterval}. `,
        }),
    })
);

/**
 * Unsafely calls instance.setValidityStartInterval without Effect wrapper
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBuilder.setValidityStartIntervalUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBuilder.setValidityStartIntervalUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setValidityStartIntervalUnsafe = (instance: CML.TransactionBuilder, validityStartInterval: bigint): void =>
  Effect.runSync(setValidityStartInterval(instance, validityStartInterval));

/**
 * Method addCert of TransactionBuilder
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionBuilder.addCert(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const addCert = Effect.fn(
  (instance: CML.TransactionBuilder, result: CML.CertificateBuilderResult): Effect.Effect<void, TransactionBuilderError> =>
    Effect.try({
      try: () => instance.add_cert(result),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.addCert failed with parameters: ${result} (CertificateBuilderResult). `,
        }),
    })
);

/**
 * Unsafely calls instance.addCert without Effect wrapper
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBuilder.addCertUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBuilder.addCertUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addCertUnsafe = (instance: CML.TransactionBuilder, result: CML.CertificateBuilderResult): void =>
  Effect.runSync(addCert(instance, result));

/**
 * Method addProposal of TransactionBuilder
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionBuilder.addProposal(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const addProposal = Effect.fn(
  (instance: CML.TransactionBuilder, result: CML.ProposalBuilderResult): Effect.Effect<void, TransactionBuilderError> =>
    Effect.try({
      try: () => instance.add_proposal(result),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.addProposal failed with parameters: ${result} (ProposalBuilderResult). `,
        }),
    })
);

/**
 * Unsafely calls instance.addProposal without Effect wrapper
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBuilder.addProposalUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBuilder.addProposalUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addProposalUnsafe = (instance: CML.TransactionBuilder, result: CML.ProposalBuilderResult): void =>
  Effect.runSync(addProposal(instance, result));

/**
 * Method addVote of TransactionBuilder
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionBuilder.addVote(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const addVote = Effect.fn(
  (instance: CML.TransactionBuilder, result: CML.VoteBuilderResult): Effect.Effect<void, TransactionBuilderError> =>
    Effect.try({
      try: () => instance.add_vote(result),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.addVote failed with parameters: ${result} (VoteBuilderResult). `,
        }),
    })
);

/**
 * Unsafely calls instance.addVote without Effect wrapper
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBuilder.addVoteUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBuilder.addVoteUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addVoteUnsafe = (instance: CML.TransactionBuilder, result: CML.VoteBuilderResult): void =>
  Effect.runSync(addVote(instance, result));

/**
 * Method getWithdrawals of TransactionBuilder
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionBuilder.getWithdrawals(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const getWithdrawals = Effect.fn(
  (instance: CML.TransactionBuilder): Effect.Effect<CML.MapRewardAccountToCoin | undefined, TransactionBuilderError> =>
    Effect.try({
      try: () => instance.get_withdrawals(),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.getWithdrawals failed `,
        }),
    })
);

/**
 * Unsafely calls instance.getWithdrawals without Effect wrapper
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBuilder.getWithdrawalsUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBuilder.getWithdrawalsUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getWithdrawalsUnsafe = (instance: CML.TransactionBuilder): CML.MapRewardAccountToCoin | undefined =>
  Effect.runSync(getWithdrawals(instance));

/**
 * Method addWithdrawal of TransactionBuilder
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionBuilder.addWithdrawal(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const addWithdrawal = Effect.fn(
  (instance: CML.TransactionBuilder, result: CML.WithdrawalBuilderResult): Effect.Effect<void, TransactionBuilderError> =>
    Effect.try({
      try: () => instance.add_withdrawal(result),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.addWithdrawal failed with parameters: ${result} (WithdrawalBuilderResult). `,
        }),
    })
);

/**
 * Unsafely calls instance.addWithdrawal without Effect wrapper
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBuilder.addWithdrawalUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBuilder.addWithdrawalUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addWithdrawalUnsafe = (instance: CML.TransactionBuilder, result: CML.WithdrawalBuilderResult): void =>
  Effect.runSync(addWithdrawal(instance, result));

/**
 * Method getAuxiliaryData of TransactionBuilder
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionBuilder.getAuxiliaryData(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const getAuxiliaryData = Effect.fn(
  (instance: CML.TransactionBuilder): Effect.Effect<CML.AuxiliaryData | undefined, TransactionBuilderError> =>
    Effect.try({
      try: () => instance.get_auxiliary_data(),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.getAuxiliaryData failed `,
        }),
    })
);

/**
 * Unsafely calls instance.getAuxiliaryData without Effect wrapper
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBuilder.getAuxiliaryDataUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBuilder.getAuxiliaryDataUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getAuxiliaryDataUnsafe = (instance: CML.TransactionBuilder): CML.AuxiliaryData | undefined =>
  Effect.runSync(getAuxiliaryData(instance));

/**
 * Method setAuxiliaryData of TransactionBuilder
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionBuilder.setAuxiliaryData(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setAuxiliaryData = Effect.fn(
  (instance: CML.TransactionBuilder, newAuxData: CML.AuxiliaryData): Effect.Effect<void, TransactionBuilderError> =>
    Effect.try({
      try: () => instance.set_auxiliary_data(newAuxData),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.setAuxiliaryData failed with parameters: ${newAuxData} (AuxiliaryData). `,
        }),
    })
);

/**
 * Unsafely calls instance.setAuxiliaryData without Effect wrapper
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBuilder.setAuxiliaryDataUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBuilder.setAuxiliaryDataUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setAuxiliaryDataUnsafe = (instance: CML.TransactionBuilder, newAuxData: CML.AuxiliaryData): void =>
  Effect.runSync(setAuxiliaryData(instance, newAuxData));

/**
 * Method addAuxiliaryData of TransactionBuilder
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionBuilder.addAuxiliaryData(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const addAuxiliaryData = Effect.fn(
  (instance: CML.TransactionBuilder, newAuxData: CML.AuxiliaryData): Effect.Effect<void, TransactionBuilderError> =>
    Effect.try({
      try: () => instance.add_auxiliary_data(newAuxData),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.addAuxiliaryData failed with parameters: ${newAuxData} (AuxiliaryData). `,
        }),
    })
);

/**
 * Unsafely calls instance.addAuxiliaryData without Effect wrapper
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBuilder.addAuxiliaryDataUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBuilder.addAuxiliaryDataUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addAuxiliaryDataUnsafe = (instance: CML.TransactionBuilder, newAuxData: CML.AuxiliaryData): void =>
  Effect.runSync(addAuxiliaryData(instance, newAuxData));

/**
 * Method addMint of TransactionBuilder
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionBuilder.addMint(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const addMint = Effect.fn(
  (instance: CML.TransactionBuilder, result: CML.MintBuilderResult): Effect.Effect<void, TransactionBuilderError> =>
    Effect.try({
      try: () => instance.add_mint(result),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.addMint failed with parameters: ${result} (MintBuilderResult). `,
        }),
    })
);

/**
 * Unsafely calls instance.addMint without Effect wrapper
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBuilder.addMintUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBuilder.addMintUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addMintUnsafe = (instance: CML.TransactionBuilder, result: CML.MintBuilderResult): void =>
  Effect.runSync(addMint(instance, result));

/**
 * Method getMint of TransactionBuilder
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionBuilder.getMint(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const getMint = Effect.fn(
  (instance: CML.TransactionBuilder): Effect.Effect<CML.Mint | undefined, TransactionBuilderError> =>
    Effect.try({
      try: () => instance.get_mint(),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.getMint failed `,
        }),
    })
);

/**
 * Unsafely calls instance.getMint without Effect wrapper
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBuilder.getMintUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBuilder.getMintUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getMintUnsafe = (instance: CML.TransactionBuilder): CML.Mint | undefined =>
  Effect.runSync(getMint(instance));

/**
 * Static method _new of TransactionBuilder
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* TransactionBuilder._new( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (cfg: CML.TransactionBuilderConfig) {
  return yield* Effect.try({
    try: () => CML.TransactionBuilder.new(cfg),
    catch: () => new TransactionBuilderError({
      message: `TransactionBuilder._new failed with parameters: ${cfg} (TransactionBuilderConfig). `,
    }),
  });
});

/**
 * Unsafely calls TransactionBuilder._new without Effect wrapper
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBuilder._newUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBuilder._newUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (cfg: CML.TransactionBuilderConfig) =>
  Effect.runSync(_new(cfg));

/**
 * Method addCollateral of TransactionBuilder
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionBuilder.addCollateral(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const addCollateral = Effect.fn(
  (instance: CML.TransactionBuilder, result: CML.InputBuilderResult): Effect.Effect<void, TransactionBuilderError> =>
    Effect.try({
      try: () => instance.add_collateral(result),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.addCollateral failed with parameters: ${result} (InputBuilderResult). `,
        }),
    })
);

/**
 * Unsafely calls instance.addCollateral without Effect wrapper
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBuilder.addCollateralUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBuilder.addCollateralUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addCollateralUnsafe = (instance: CML.TransactionBuilder, result: CML.InputBuilderResult): void =>
  Effect.runSync(addCollateral(instance, result));

/**
 * Method addRequiredSigner of TransactionBuilder
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionBuilder.addRequiredSigner(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const addRequiredSigner = Effect.fn(
  (instance: CML.TransactionBuilder, hash: CML.Ed25519KeyHash): Effect.Effect<void, TransactionBuilderError> =>
    Effect.try({
      try: () => instance.add_required_signer(hash),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.addRequiredSigner failed with parameters: ${hash} (Ed25519KeyHash). `,
        }),
    })
);

/**
 * Unsafely calls instance.addRequiredSigner without Effect wrapper
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBuilder.addRequiredSignerUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBuilder.addRequiredSignerUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addRequiredSignerUnsafe = (instance: CML.TransactionBuilder, hash: CML.Ed25519KeyHash): void =>
  Effect.runSync(addRequiredSigner(instance, hash));

/**
 * Method setNetworkId of TransactionBuilder
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionBuilder.setNetworkId(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setNetworkId = Effect.fn(
  (instance: CML.TransactionBuilder, networkId: CML.NetworkId): Effect.Effect<void, TransactionBuilderError> =>
    Effect.try({
      try: () => instance.set_network_id(networkId),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.setNetworkId failed with parameters: ${networkId} (NetworkId). `,
        }),
    })
);

/**
 * Unsafely calls instance.setNetworkId without Effect wrapper
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBuilder.setNetworkIdUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBuilder.setNetworkIdUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setNetworkIdUnsafe = (instance: CML.TransactionBuilder, networkId: CML.NetworkId): void =>
  Effect.runSync(setNetworkId(instance, networkId));

/**
 * Method networkId of TransactionBuilder
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionBuilder.networkId(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const networkId = Effect.fn(
  (instance: CML.TransactionBuilder): Effect.Effect<CML.NetworkId | undefined, TransactionBuilderError> =>
    Effect.try({
      try: () => instance.network_id(),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.networkId failed `,
        }),
    })
);

/**
 * Unsafely calls instance.networkId without Effect wrapper
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBuilder.networkIdUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBuilder.networkIdUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const networkIdUnsafe = (instance: CML.TransactionBuilder): CML.NetworkId | undefined =>
  Effect.runSync(networkId(instance));

/**
 * Method getExplicitInput of TransactionBuilder
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionBuilder.getExplicitInput(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const getExplicitInput = Effect.fn(
  (instance: CML.TransactionBuilder): Effect.Effect<CML.Value, TransactionBuilderError> =>
    Effect.try({
      try: () => instance.get_explicit_input(),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.getExplicitInput failed `,
        }),
    })
);

/**
 * Unsafely calls instance.getExplicitInput without Effect wrapper
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBuilder.getExplicitInputUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBuilder.getExplicitInputUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getExplicitInputUnsafe = (instance: CML.TransactionBuilder): CML.Value =>
  Effect.runSync(getExplicitInput(instance));

/**
 * Method getImplicitInput of TransactionBuilder
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionBuilder.getImplicitInput(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const getImplicitInput = Effect.fn(
  (instance: CML.TransactionBuilder): Effect.Effect<CML.Value, TransactionBuilderError> =>
    Effect.try({
      try: () => instance.get_implicit_input(),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.getImplicitInput failed `,
        }),
    })
);

/**
 * Unsafely calls instance.getImplicitInput without Effect wrapper
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBuilder.getImplicitInputUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBuilder.getImplicitInputUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getImplicitInputUnsafe = (instance: CML.TransactionBuilder): CML.Value =>
  Effect.runSync(getImplicitInput(instance));

/**
 * Method getTotalInput of TransactionBuilder
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionBuilder.getTotalInput(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const getTotalInput = Effect.fn(
  (instance: CML.TransactionBuilder): Effect.Effect<CML.Value, TransactionBuilderError> =>
    Effect.try({
      try: () => instance.get_total_input(),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.getTotalInput failed `,
        }),
    })
);

/**
 * Unsafely calls instance.getTotalInput without Effect wrapper
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBuilder.getTotalInputUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBuilder.getTotalInputUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getTotalInputUnsafe = (instance: CML.TransactionBuilder): CML.Value =>
  Effect.runSync(getTotalInput(instance));

/**
 * Method getTotalOutput of TransactionBuilder
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionBuilder.getTotalOutput(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const getTotalOutput = Effect.fn(
  (instance: CML.TransactionBuilder): Effect.Effect<CML.Value, TransactionBuilderError> =>
    Effect.try({
      try: () => instance.get_total_output(),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.getTotalOutput failed `,
        }),
    })
);

/**
 * Unsafely calls instance.getTotalOutput without Effect wrapper
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBuilder.getTotalOutputUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBuilder.getTotalOutputUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getTotalOutputUnsafe = (instance: CML.TransactionBuilder): CML.Value =>
  Effect.runSync(getTotalOutput(instance));

/**
 * Method getExplicitOutput of TransactionBuilder
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionBuilder.getExplicitOutput(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const getExplicitOutput = Effect.fn(
  (instance: CML.TransactionBuilder): Effect.Effect<CML.Value, TransactionBuilderError> =>
    Effect.try({
      try: () => instance.get_explicit_output(),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.getExplicitOutput failed `,
        }),
    })
);

/**
 * Unsafely calls instance.getExplicitOutput without Effect wrapper
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBuilder.getExplicitOutputUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBuilder.getExplicitOutputUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getExplicitOutputUnsafe = (instance: CML.TransactionBuilder): CML.Value =>
  Effect.runSync(getExplicitOutput(instance));

/**
 * Method getDeposit of TransactionBuilder
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionBuilder.getDeposit(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const getDeposit = Effect.fn(
  (instance: CML.TransactionBuilder): Effect.Effect<bigint, TransactionBuilderError> =>
    Effect.try({
      try: () => instance.get_deposit(),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.getDeposit failed `,
        }),
    })
);

/**
 * Unsafely calls instance.getDeposit without Effect wrapper
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBuilder.getDepositUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBuilder.getDepositUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getDepositUnsafe = (instance: CML.TransactionBuilder): bigint =>
  Effect.runSync(getDeposit(instance));

/**
 * Method getFeeIfSet of TransactionBuilder
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionBuilder.getFeeIfSet(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const getFeeIfSet = Effect.fn(
  (instance: CML.TransactionBuilder): Effect.Effect<bigint | undefined, TransactionBuilderError> =>
    Effect.try({
      try: () => instance.get_fee_if_set(),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.getFeeIfSet failed `,
        }),
    })
);

/**
 * Unsafely calls instance.getFeeIfSet without Effect wrapper
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBuilder.getFeeIfSetUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBuilder.getFeeIfSetUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getFeeIfSetUnsafe = (instance: CML.TransactionBuilder): bigint | undefined =>
  Effect.runSync(getFeeIfSet(instance));

/**
 * Method setCollateralReturn of TransactionBuilder
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionBuilder.setCollateralReturn(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setCollateralReturn = Effect.fn(
  (instance: CML.TransactionBuilder, output: CML.TransactionOutput): Effect.Effect<void, TransactionBuilderError> =>
    Effect.try({
      try: () => instance.set_collateral_return(output),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.setCollateralReturn failed with parameters: ${output} (TransactionOutput). `,
        }),
    })
);

/**
 * Unsafely calls instance.setCollateralReturn without Effect wrapper
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBuilder.setCollateralReturnUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBuilder.setCollateralReturnUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setCollateralReturnUnsafe = (instance: CML.TransactionBuilder, output: CML.TransactionOutput): void =>
  Effect.runSync(setCollateralReturn(instance, output));

/**
 * Method fullSize of TransactionBuilder
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionBuilder.fullSize(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const fullSize = Effect.fn(
  (instance: CML.TransactionBuilder): Effect.Effect<number, TransactionBuilderError> =>
    Effect.try({
      try: () => instance.full_size(),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.fullSize failed `,
        }),
    })
);

/**
 * Unsafely calls instance.fullSize without Effect wrapper
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBuilder.fullSizeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBuilder.fullSizeUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const fullSizeUnsafe = (instance: CML.TransactionBuilder): number =>
  Effect.runSync(fullSize(instance));

/**
 * Method outputSizes of TransactionBuilder
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionBuilder.outputSizes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const outputSizes = Effect.fn(
  (instance: CML.TransactionBuilder): Effect.Effect<Uint32Array, TransactionBuilderError> =>
    Effect.try({
      try: () => instance.output_sizes(),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.outputSizes failed `,
        }),
    })
);

/**
 * Unsafely calls instance.outputSizes without Effect wrapper
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBuilder.outputSizesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBuilder.outputSizesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const outputSizesUnsafe = (instance: CML.TransactionBuilder): Uint32Array =>
  Effect.runSync(outputSizes(instance));

/**
 * Method buildForEvaluation of TransactionBuilder
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionBuilder.buildForEvaluation(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const buildForEvaluation = Effect.fn(
  (instance: CML.TransactionBuilder, algo: CML.ChangeSelectionAlgo, changeAddress: CML.Address): Effect.Effect<CML.TxRedeemerBuilder, TransactionBuilderError> =>
    Effect.try({
      try: () => instance.build_for_evaluation(algo, changeAddress),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.buildForEvaluation failed with parameters: ${algo} (ChangeSelectionAlgo), ${changeAddress} (Address). `,
        }),
    })
);

/**
 * Unsafely calls instance.buildForEvaluation without Effect wrapper
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBuilder.buildForEvaluationUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBuilder.buildForEvaluationUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const buildForEvaluationUnsafe = (instance: CML.TransactionBuilder, algo: CML.ChangeSelectionAlgo, changeAddress: CML.Address): CML.TxRedeemerBuilder =>
  Effect.runSync(buildForEvaluation(instance, algo, changeAddress));

/**
 * Method build of TransactionBuilder
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionBuilder.build(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const build = Effect.fn(
  (instance: CML.TransactionBuilder, algo: CML.ChangeSelectionAlgo, changeAddress: CML.Address): Effect.Effect<CML.SignedTxBuilder, TransactionBuilderError> =>
    Effect.try({
      try: () => instance.build(algo, changeAddress),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.build failed with parameters: ${algo} (ChangeSelectionAlgo), ${changeAddress} (Address). `,
        }),
    })
);

/**
 * Unsafely calls instance.build without Effect wrapper
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBuilder.buildUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBuilder.buildUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const buildUnsafe = (instance: CML.TransactionBuilder, algo: CML.ChangeSelectionAlgo, changeAddress: CML.Address): CML.SignedTxBuilder =>
  Effect.runSync(build(instance, algo, changeAddress));

/**
 * Method setExunits of TransactionBuilder
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionBuilder.setExunits(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setExunits = Effect.fn(
  (instance: CML.TransactionBuilder, redeemer: CML.RedeemerWitnessKey, exUnits: CML.ExUnits): Effect.Effect<void, TransactionBuilderError> =>
    Effect.try({
      try: () => instance.set_exunits(redeemer, exUnits),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.setExunits failed with parameters: ${redeemer} (RedeemerWitnessKey), ${exUnits} (ExUnits). `,
        }),
    })
);

/**
 * Unsafely calls instance.setExunits without Effect wrapper
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBuilder.setExunitsUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBuilder.setExunitsUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setExunitsUnsafe = (instance: CML.TransactionBuilder, redeemer: CML.RedeemerWitnessKey, exUnits: CML.ExUnits): void =>
  Effect.runSync(setExunits(instance, redeemer, exUnits));

/**
 * Method minFee of TransactionBuilder
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionBuilder.minFee(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const minFee = Effect.fn(
  (instance: CML.TransactionBuilder, scriptCalulation: boolean): Effect.Effect<bigint, TransactionBuilderError> =>
    Effect.try({
      try: () => instance.min_fee(scriptCalulation),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.minFee failed with parameters: ${scriptCalulation}. `,
        }),
    })
);

/**
 * Unsafely calls instance.minFee without Effect wrapper
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBuilder.minFeeUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBuilder.minFeeUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const minFeeUnsafe = (instance: CML.TransactionBuilder, scriptCalulation: boolean): bigint =>
  Effect.runSync(minFee(instance, scriptCalulation));

/**
 * Method addChangeIfNeeded of TransactionBuilder
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionBuilder.addChangeIfNeeded(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const addChangeIfNeeded = Effect.fn(
  (instance: CML.TransactionBuilder, address: CML.Address, includeExunits: boolean): Effect.Effect<boolean, TransactionBuilderError> =>
    Effect.try({
      try: () => instance.add_change_if_needed(address, includeExunits),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.addChangeIfNeeded failed with parameters: ${address} (Address), ${includeExunits}. `,
        }),
    })
);

/**
 * Unsafely calls instance.addChangeIfNeeded without Effect wrapper
 * 
 * @example
 * import { TransactionBuilder } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionBuilder instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBuilder.addChangeIfNeededUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBuilder.addChangeIfNeededUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addChangeIfNeededUnsafe = (instance: CML.TransactionBuilder, address: CML.Address, includeExunits: boolean): boolean =>
  Effect.runSync(addChangeIfNeeded(instance, address, includeExunits));
