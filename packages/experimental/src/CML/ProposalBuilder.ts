import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type ProposalBuilder = CML.ProposalBuilder;

export class ProposalBuilderError extends Data.TaggedError(
  "ProposalBuilderError",
)<{
  message?: string;
}> {}

/**
 * Method free of ProposalBuilder
 *
 * @example
 * import { ProposalBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProposalBuilder instance
 * const instance = ... ;
 *   const result = yield* ProposalBuilder.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.ProposalBuilder): Effect.Effect<void, ProposalBuilderError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new ProposalBuilderError({
          message: `ProposalBuilder.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { ProposalBuilder } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ProposalBuilder instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ProposalBuilder.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProposalBuilder.unsafeFree failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.ProposalBuilder): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of ProposalBuilder
 *
 * @example
 * import { ProposalBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* ProposalBuilder._new();
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.ProposalBuilder.new(),
    catch: () =>
      new ProposalBuilderError({
        message: `ProposalBuilder._new failed `,
      }),
  });
});

/**
 * Unsafely calls ProposalBuilder._new without Effect wrapper
 *
 * @example
 * import { ProposalBuilder } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ProposalBuilder.unsafe_new();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProposalBuilder.unsafe_new failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = () => Effect.runSync(_new());

/**
 * Method withProposal of ProposalBuilder
 *
 * @example
 * import { ProposalBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProposalBuilder instance
 * const instance = ... ;
 *   const result = yield* ProposalBuilder.withProposal(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const withProposal = Effect.fn(
  (
    instance: CML.ProposalBuilder,
    proposal: CML.ProposalProcedure,
  ): Effect.Effect<CML.ProposalBuilder, ProposalBuilderError> =>
    Effect.try({
      try: () => instance.with_proposal(proposal),
      catch: () =>
        new ProposalBuilderError({
          message: `ProposalBuilder.withProposal failed with parameters: ${proposal} (ProposalProcedure). `,
        }),
    }),
);

/**
 * Unsafely calls instance.withProposal without Effect wrapper
 *
 * @example
 * import { ProposalBuilder } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ProposalBuilder instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ProposalBuilder.unsafeWithProposal(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProposalBuilder.unsafeWithProposal failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeWithProposal = (
  instance: CML.ProposalBuilder,
  proposal: CML.ProposalProcedure,
): CML.ProposalBuilder => Effect.runSync(withProposal(instance, proposal));

/**
 * Method withNativeScriptProposal of ProposalBuilder
 *
 * @example
 * import { ProposalBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProposalBuilder instance
 * const instance = ... ;
 *   const result = yield* ProposalBuilder.withNativeScriptProposal(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const withNativeScriptProposal = Effect.fn(
  (
    instance: CML.ProposalBuilder,
    proposal: CML.ProposalProcedure,
    nativeScript: CML.NativeScript,
    witnessInfo: CML.NativeScriptWitnessInfo,
  ): Effect.Effect<CML.ProposalBuilder, ProposalBuilderError> =>
    Effect.try({
      try: () =>
        instance.with_native_script_proposal(
          proposal,
          nativeScript,
          witnessInfo,
        ),
      catch: () =>
        new ProposalBuilderError({
          message: `ProposalBuilder.withNativeScriptProposal failed with parameters: ${proposal} (ProposalProcedure), ${nativeScript} (NativeScript), ${witnessInfo} (NativeScriptWitnessInfo). `,
        }),
    }),
);

/**
 * Unsafely calls instance.withNativeScriptProposal without Effect wrapper
 *
 * @example
 * import { ProposalBuilder } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ProposalBuilder instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ProposalBuilder.unsafeWithNativeScriptProposal(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProposalBuilder.unsafeWithNativeScriptProposal failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeWithNativeScriptProposal = (
  instance: CML.ProposalBuilder,
  proposal: CML.ProposalProcedure,
  nativeScript: CML.NativeScript,
  witnessInfo: CML.NativeScriptWitnessInfo,
): CML.ProposalBuilder =>
  Effect.runSync(
    withNativeScriptProposal(instance, proposal, nativeScript, witnessInfo),
  );

/**
 * Method withPlutusProposal of ProposalBuilder
 *
 * @example
 * import { ProposalBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProposalBuilder instance
 * const instance = ... ;
 *   const result = yield* ProposalBuilder.withPlutusProposal(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const withPlutusProposal = Effect.fn(
  (
    instance: CML.ProposalBuilder,
    proposal: CML.ProposalProcedure,
    partialWitness: CML.PartialPlutusWitness,
    requiredSigners: CML.Ed25519KeyHashList,
    datum: CML.PlutusData,
  ): Effect.Effect<CML.ProposalBuilder, ProposalBuilderError> =>
    Effect.try({
      try: () =>
        instance.with_plutus_proposal(
          proposal,
          partialWitness,
          requiredSigners,
          datum,
        ),
      catch: () =>
        new ProposalBuilderError({
          message: `ProposalBuilder.withPlutusProposal failed with parameters: ${proposal} (ProposalProcedure), ${partialWitness} (PartialPlutusWitness), ${requiredSigners} (Ed25519KeyHashList), ${datum} (PlutusData). `,
        }),
    }),
);

/**
 * Unsafely calls instance.withPlutusProposal without Effect wrapper
 *
 * @example
 * import { ProposalBuilder } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ProposalBuilder instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ProposalBuilder.unsafeWithPlutusProposal(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProposalBuilder.unsafeWithPlutusProposal failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeWithPlutusProposal = (
  instance: CML.ProposalBuilder,
  proposal: CML.ProposalProcedure,
  partialWitness: CML.PartialPlutusWitness,
  requiredSigners: CML.Ed25519KeyHashList,
  datum: CML.PlutusData,
): CML.ProposalBuilder =>
  Effect.runSync(
    withPlutusProposal(
      instance,
      proposal,
      partialWitness,
      requiredSigners,
      datum,
    ),
  );

/**
 * Method withPlutusProposalInlineDatum of ProposalBuilder
 *
 * @example
 * import { ProposalBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProposalBuilder instance
 * const instance = ... ;
 *   const result = yield* ProposalBuilder.withPlutusProposalInlineDatum(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const withPlutusProposalInlineDatum = Effect.fn(
  (
    instance: CML.ProposalBuilder,
    proposal: CML.ProposalProcedure,
    partialWitness: CML.PartialPlutusWitness,
    requiredSigners: CML.Ed25519KeyHashList,
  ): Effect.Effect<CML.ProposalBuilder, ProposalBuilderError> =>
    Effect.try({
      try: () =>
        instance.with_plutus_proposal_inline_datum(
          proposal,
          partialWitness,
          requiredSigners,
        ),
      catch: () =>
        new ProposalBuilderError({
          message: `ProposalBuilder.withPlutusProposalInlineDatum failed with parameters: ${proposal} (ProposalProcedure), ${partialWitness} (PartialPlutusWitness), ${requiredSigners} (Ed25519KeyHashList). `,
        }),
    }),
);

/**
 * Unsafely calls instance.withPlutusProposalInlineDatum without Effect wrapper
 *
 * @example
 * import { ProposalBuilder } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ProposalBuilder instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ProposalBuilder.unsafeWithPlutusProposalInlineDatum(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProposalBuilder.unsafeWithPlutusProposalInlineDatum failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeWithPlutusProposalInlineDatum = (
  instance: CML.ProposalBuilder,
  proposal: CML.ProposalProcedure,
  partialWitness: CML.PartialPlutusWitness,
  requiredSigners: CML.Ed25519KeyHashList,
): CML.ProposalBuilder =>
  Effect.runSync(
    withPlutusProposalInlineDatum(
      instance,
      proposal,
      partialWitness,
      requiredSigners,
    ),
  );

/**
 * Method build of ProposalBuilder
 *
 * @example
 * import { ProposalBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProposalBuilder instance
 * const instance = ... ;
 *   const result = yield* ProposalBuilder.build(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const build = Effect.fn(
  (
    instance: CML.ProposalBuilder,
  ): Effect.Effect<CML.ProposalBuilderResult, ProposalBuilderError> =>
    Effect.try({
      try: () => instance.build(),
      catch: () =>
        new ProposalBuilderError({
          message: `ProposalBuilder.build failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.build without Effect wrapper
 *
 * @example
 * import { ProposalBuilder } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ProposalBuilder instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ProposalBuilder.unsafeBuild(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProposalBuilder.unsafeBuild failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeBuild = (
  instance: CML.ProposalBuilder,
): CML.ProposalBuilderResult => Effect.runSync(build(instance));
