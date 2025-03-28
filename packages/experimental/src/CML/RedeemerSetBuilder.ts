import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type RedeemerSetBuilder = CML.RedeemerSetBuilder;

export class RedeemerSetBuilderError extends Data.TaggedError(
  "RedeemerSetBuilderError",
)<{
  message?: string;
}> {}

/**
 * Method free of RedeemerSetBuilder
 *
 * @example
 * import { RedeemerSetBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a RedeemerSetBuilder instance
 * const instance = ... ;
 *   const result = yield* RedeemerSetBuilder.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (
    instance: CML.RedeemerSetBuilder,
  ): Effect.Effect<void, RedeemerSetBuilderError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new RedeemerSetBuilderError({
          message: `RedeemerSetBuilder.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { RedeemerSetBuilder } from "@lucid-evolution/experimental";
 *
 * // Assume we have a RedeemerSetBuilder instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = RedeemerSetBuilder.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RedeemerSetBuilder.unsafeFree failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.RedeemerSetBuilder): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of RedeemerSetBuilder
 *
 * @example
 * import { RedeemerSetBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* RedeemerSetBuilder._new();
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.RedeemerSetBuilder.new(),
    catch: () =>
      new RedeemerSetBuilderError({
        message: `RedeemerSetBuilder._new failed `,
      }),
  });
});

/**
 * Unsafely calls RedeemerSetBuilder._new without Effect wrapper
 *
 * @example
 * import { RedeemerSetBuilder } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = RedeemerSetBuilder.unsafe_new();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RedeemerSetBuilder.unsafe_new failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = () => Effect.runSync(_new());

/**
 * Method isEmpty of RedeemerSetBuilder
 *
 * @example
 * import { RedeemerSetBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a RedeemerSetBuilder instance
 * const instance = ... ;
 *   const result = yield* RedeemerSetBuilder.isEmpty(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const isEmpty = Effect.fn(
  (
    instance: CML.RedeemerSetBuilder,
  ): Effect.Effect<boolean, RedeemerSetBuilderError> =>
    Effect.try({
      try: () => instance.is_empty(),
      catch: () =>
        new RedeemerSetBuilderError({
          message: `RedeemerSetBuilder.isEmpty failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.isEmpty without Effect wrapper
 *
 * @example
 * import { RedeemerSetBuilder } from "@lucid-evolution/experimental";
 *
 * // Assume we have a RedeemerSetBuilder instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = RedeemerSetBuilder.unsafeIsEmpty(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RedeemerSetBuilder.unsafeIsEmpty failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeIsEmpty = (instance: CML.RedeemerSetBuilder): boolean =>
  Effect.runSync(isEmpty(instance));

/**
 * Method updateExUnits of RedeemerSetBuilder
 *
 * @example
 * import { RedeemerSetBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a RedeemerSetBuilder instance
 * const instance = ... ;
 *   const result = yield* RedeemerSetBuilder.updateExUnits(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const updateExUnits = Effect.fn(
  (
    instance: CML.RedeemerSetBuilder,
    key: CML.RedeemerWitnessKey,
    exUnits: CML.ExUnits,
  ): Effect.Effect<void, RedeemerSetBuilderError> =>
    Effect.try({
      try: () => instance.update_ex_units(key, exUnits),
      catch: () =>
        new RedeemerSetBuilderError({
          message: `RedeemerSetBuilder.updateExUnits failed with parameters: ${key} (RedeemerWitnessKey), ${exUnits} (ExUnits). `,
        }),
    }),
);

/**
 * Unsafely calls instance.updateExUnits without Effect wrapper
 *
 * @example
 * import { RedeemerSetBuilder } from "@lucid-evolution/experimental";
 *
 * // Assume we have a RedeemerSetBuilder instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = RedeemerSetBuilder.unsafeUpdateExUnits(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RedeemerSetBuilder.unsafeUpdateExUnits failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeUpdateExUnits = (
  instance: CML.RedeemerSetBuilder,
  key: CML.RedeemerWitnessKey,
  exUnits: CML.ExUnits,
): void => Effect.runSync(updateExUnits(instance, key, exUnits));

/**
 * Method addSpend of RedeemerSetBuilder
 *
 * @example
 * import { RedeemerSetBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a RedeemerSetBuilder instance
 * const instance = ... ;
 *   const result = yield* RedeemerSetBuilder.addSpend(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const addSpend = Effect.fn(
  (
    instance: CML.RedeemerSetBuilder,
    result: CML.InputBuilderResult,
  ): Effect.Effect<void, RedeemerSetBuilderError> =>
    Effect.try({
      try: () => instance.add_spend(result),
      catch: () =>
        new RedeemerSetBuilderError({
          message: `RedeemerSetBuilder.addSpend failed with parameters: ${result} (InputBuilderResult). `,
        }),
    }),
);

/**
 * Unsafely calls instance.addSpend without Effect wrapper
 *
 * @example
 * import { RedeemerSetBuilder } from "@lucid-evolution/experimental";
 *
 * // Assume we have a RedeemerSetBuilder instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = RedeemerSetBuilder.unsafeAddSpend(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RedeemerSetBuilder.unsafeAddSpend failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAddSpend = (
  instance: CML.RedeemerSetBuilder,
  result: CML.InputBuilderResult,
): void => Effect.runSync(addSpend(instance, result));

/**
 * Method addMint of RedeemerSetBuilder
 *
 * @example
 * import { RedeemerSetBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a RedeemerSetBuilder instance
 * const instance = ... ;
 *   const result = yield* RedeemerSetBuilder.addMint(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const addMint = Effect.fn(
  (
    instance: CML.RedeemerSetBuilder,
    result: CML.MintBuilderResult,
  ): Effect.Effect<void, RedeemerSetBuilderError> =>
    Effect.try({
      try: () => instance.add_mint(result),
      catch: () =>
        new RedeemerSetBuilderError({
          message: `RedeemerSetBuilder.addMint failed with parameters: ${result} (MintBuilderResult). `,
        }),
    }),
);

/**
 * Unsafely calls instance.addMint without Effect wrapper
 *
 * @example
 * import { RedeemerSetBuilder } from "@lucid-evolution/experimental";
 *
 * // Assume we have a RedeemerSetBuilder instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = RedeemerSetBuilder.unsafeAddMint(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RedeemerSetBuilder.unsafeAddMint failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAddMint = (
  instance: CML.RedeemerSetBuilder,
  result: CML.MintBuilderResult,
): void => Effect.runSync(addMint(instance, result));

/**
 * Method addReward of RedeemerSetBuilder
 *
 * @example
 * import { RedeemerSetBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a RedeemerSetBuilder instance
 * const instance = ... ;
 *   const result = yield* RedeemerSetBuilder.addReward(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const addReward = Effect.fn(
  (
    instance: CML.RedeemerSetBuilder,
    result: CML.WithdrawalBuilderResult,
  ): Effect.Effect<void, RedeemerSetBuilderError> =>
    Effect.try({
      try: () => instance.add_reward(result),
      catch: () =>
        new RedeemerSetBuilderError({
          message: `RedeemerSetBuilder.addReward failed with parameters: ${result} (WithdrawalBuilderResult). `,
        }),
    }),
);

/**
 * Unsafely calls instance.addReward without Effect wrapper
 *
 * @example
 * import { RedeemerSetBuilder } from "@lucid-evolution/experimental";
 *
 * // Assume we have a RedeemerSetBuilder instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = RedeemerSetBuilder.unsafeAddReward(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RedeemerSetBuilder.unsafeAddReward failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAddReward = (
  instance: CML.RedeemerSetBuilder,
  result: CML.WithdrawalBuilderResult,
): void => Effect.runSync(addReward(instance, result));

/**
 * Method addCert of RedeemerSetBuilder
 *
 * @example
 * import { RedeemerSetBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a RedeemerSetBuilder instance
 * const instance = ... ;
 *   const result = yield* RedeemerSetBuilder.addCert(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const addCert = Effect.fn(
  (
    instance: CML.RedeemerSetBuilder,
    result: CML.CertificateBuilderResult,
  ): Effect.Effect<void, RedeemerSetBuilderError> =>
    Effect.try({
      try: () => instance.add_cert(result),
      catch: () =>
        new RedeemerSetBuilderError({
          message: `RedeemerSetBuilder.addCert failed with parameters: ${result} (CertificateBuilderResult). `,
        }),
    }),
);

/**
 * Unsafely calls instance.addCert without Effect wrapper
 *
 * @example
 * import { RedeemerSetBuilder } from "@lucid-evolution/experimental";
 *
 * // Assume we have a RedeemerSetBuilder instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = RedeemerSetBuilder.unsafeAddCert(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RedeemerSetBuilder.unsafeAddCert failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAddCert = (
  instance: CML.RedeemerSetBuilder,
  result: CML.CertificateBuilderResult,
): void => Effect.runSync(addCert(instance, result));

/**
 * Method addProposal of RedeemerSetBuilder
 *
 * @example
 * import { RedeemerSetBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a RedeemerSetBuilder instance
 * const instance = ... ;
 *   const result = yield* RedeemerSetBuilder.addProposal(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const addProposal = Effect.fn(
  (
    instance: CML.RedeemerSetBuilder,
    result: CML.ProposalBuilderResult,
  ): Effect.Effect<void, RedeemerSetBuilderError> =>
    Effect.try({
      try: () => instance.add_proposal(result),
      catch: () =>
        new RedeemerSetBuilderError({
          message: `RedeemerSetBuilder.addProposal failed with parameters: ${result} (ProposalBuilderResult). `,
        }),
    }),
);

/**
 * Unsafely calls instance.addProposal without Effect wrapper
 *
 * @example
 * import { RedeemerSetBuilder } from "@lucid-evolution/experimental";
 *
 * // Assume we have a RedeemerSetBuilder instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = RedeemerSetBuilder.unsafeAddProposal(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RedeemerSetBuilder.unsafeAddProposal failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAddProposal = (
  instance: CML.RedeemerSetBuilder,
  result: CML.ProposalBuilderResult,
): void => Effect.runSync(addProposal(instance, result));

/**
 * Method addVote of RedeemerSetBuilder
 *
 * @example
 * import { RedeemerSetBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a RedeemerSetBuilder instance
 * const instance = ... ;
 *   const result = yield* RedeemerSetBuilder.addVote(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const addVote = Effect.fn(
  (
    instance: CML.RedeemerSetBuilder,
    result: CML.VoteBuilderResult,
  ): Effect.Effect<void, RedeemerSetBuilderError> =>
    Effect.try({
      try: () => instance.add_vote(result),
      catch: () =>
        new RedeemerSetBuilderError({
          message: `RedeemerSetBuilder.addVote failed with parameters: ${result} (VoteBuilderResult). `,
        }),
    }),
);

/**
 * Unsafely calls instance.addVote without Effect wrapper
 *
 * @example
 * import { RedeemerSetBuilder } from "@lucid-evolution/experimental";
 *
 * // Assume we have a RedeemerSetBuilder instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = RedeemerSetBuilder.unsafeAddVote(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RedeemerSetBuilder.unsafeAddVote failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAddVote = (
  instance: CML.RedeemerSetBuilder,
  result: CML.VoteBuilderResult,
): void => Effect.runSync(addVote(instance, result));

/**
 * Method build of RedeemerSetBuilder
 *
 * @example
 * import { RedeemerSetBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a RedeemerSetBuilder instance
 * const instance = ... ;
 *   const result = yield* RedeemerSetBuilder.build(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const build = Effect.fn(
  (
    instance: CML.RedeemerSetBuilder,
    defaultToDummyExunits: boolean,
  ): Effect.Effect<CML.Redeemers, RedeemerSetBuilderError> =>
    Effect.try({
      try: () => instance.build(defaultToDummyExunits),
      catch: () =>
        new RedeemerSetBuilderError({
          message: `RedeemerSetBuilder.build failed with parameters: ${defaultToDummyExunits}. `,
        }),
    }),
);

/**
 * Unsafely calls instance.build without Effect wrapper
 *
 * @example
 * import { RedeemerSetBuilder } from "@lucid-evolution/experimental";
 *
 * // Assume we have a RedeemerSetBuilder instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = RedeemerSetBuilder.unsafeBuild(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RedeemerSetBuilder.unsafeBuild failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeBuild = (
  instance: CML.RedeemerSetBuilder,
  defaultToDummyExunits: boolean,
): CML.Redeemers => Effect.runSync(build(instance, defaultToDummyExunits));
