/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML ProposalBuilder class
 *
 * @since 2.0.0
 * @category Types
 */
export type ProposalBuilder = CML.ProposalBuilder;

/**
 * Error class for ProposalBuilder operations
 * 
 * This error is thrown when operations on ProposalBuilder instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class ProposalBuilderError extends Data.TaggedError("ProposalBuilderError")<{
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
    })
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
 *   const result = ProposalBuilder.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProposalBuilder.freeUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.ProposalBuilder): void =>
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
    catch: () => new ProposalBuilderError({
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
 *   const result = ProposalBuilder._newUnsafe();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProposalBuilder._newUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = () =>
  Effect.runSync(_new());

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
  (instance: CML.ProposalBuilder, proposal: CML.ProposalProcedure): Effect.Effect<CML.ProposalBuilder, ProposalBuilderError> =>
    Effect.try({
      try: () => instance.with_proposal(proposal),
      catch: () =>
        new ProposalBuilderError({
          message: `ProposalBuilder.withProposal failed with parameters: ${proposal} (ProposalProcedure). `,
        }),
    })
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
 *   const result = ProposalBuilder.withProposalUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProposalBuilder.withProposalUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const withProposalUnsafe = (instance: CML.ProposalBuilder, proposal: CML.ProposalProcedure): CML.ProposalBuilder =>
  Effect.runSync(withProposal(instance, proposal));

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
  (instance: CML.ProposalBuilder, proposal: CML.ProposalProcedure, nativeScript: CML.NativeScript, witnessInfo: CML.NativeScriptWitnessInfo): Effect.Effect<CML.ProposalBuilder, ProposalBuilderError> =>
    Effect.try({
      try: () => instance.with_native_script_proposal(proposal, nativeScript, witnessInfo),
      catch: () =>
        new ProposalBuilderError({
          message: `ProposalBuilder.withNativeScriptProposal failed with parameters: ${proposal} (ProposalProcedure), ${nativeScript} (NativeScript), ${witnessInfo} (NativeScriptWitnessInfo). `,
        }),
    })
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
 *   const result = ProposalBuilder.withNativeScriptProposalUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProposalBuilder.withNativeScriptProposalUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const withNativeScriptProposalUnsafe = (instance: CML.ProposalBuilder, proposal: CML.ProposalProcedure, nativeScript: CML.NativeScript, witnessInfo: CML.NativeScriptWitnessInfo): CML.ProposalBuilder =>
  Effect.runSync(withNativeScriptProposal(instance, proposal, nativeScript, witnessInfo));

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
  (instance: CML.ProposalBuilder, proposal: CML.ProposalProcedure, partialWitness: CML.PartialPlutusWitness, requiredSigners: CML.Ed25519KeyHashList, datum: CML.PlutusData): Effect.Effect<CML.ProposalBuilder, ProposalBuilderError> =>
    Effect.try({
      try: () => instance.with_plutus_proposal(proposal, partialWitness, requiredSigners, datum),
      catch: () =>
        new ProposalBuilderError({
          message: `ProposalBuilder.withPlutusProposal failed with parameters: ${proposal} (ProposalProcedure), ${partialWitness} (PartialPlutusWitness), ${requiredSigners} (Ed25519KeyHashList), ${datum} (PlutusData). `,
        }),
    })
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
 *   const result = ProposalBuilder.withPlutusProposalUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProposalBuilder.withPlutusProposalUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const withPlutusProposalUnsafe = (instance: CML.ProposalBuilder, proposal: CML.ProposalProcedure, partialWitness: CML.PartialPlutusWitness, requiredSigners: CML.Ed25519KeyHashList, datum: CML.PlutusData): CML.ProposalBuilder =>
  Effect.runSync(withPlutusProposal(instance, proposal, partialWitness, requiredSigners, datum));

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
  (instance: CML.ProposalBuilder, proposal: CML.ProposalProcedure, partialWitness: CML.PartialPlutusWitness, requiredSigners: CML.Ed25519KeyHashList): Effect.Effect<CML.ProposalBuilder, ProposalBuilderError> =>
    Effect.try({
      try: () => instance.with_plutus_proposal_inline_datum(proposal, partialWitness, requiredSigners),
      catch: () =>
        new ProposalBuilderError({
          message: `ProposalBuilder.withPlutusProposalInlineDatum failed with parameters: ${proposal} (ProposalProcedure), ${partialWitness} (PartialPlutusWitness), ${requiredSigners} (Ed25519KeyHashList). `,
        }),
    })
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
 *   const result = ProposalBuilder.withPlutusProposalInlineDatumUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProposalBuilder.withPlutusProposalInlineDatumUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const withPlutusProposalInlineDatumUnsafe = (instance: CML.ProposalBuilder, proposal: CML.ProposalProcedure, partialWitness: CML.PartialPlutusWitness, requiredSigners: CML.Ed25519KeyHashList): CML.ProposalBuilder =>
  Effect.runSync(withPlutusProposalInlineDatum(instance, proposal, partialWitness, requiredSigners));

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
  (instance: CML.ProposalBuilder): Effect.Effect<CML.ProposalBuilderResult, ProposalBuilderError> =>
    Effect.try({
      try: () => instance.build(),
      catch: () =>
        new ProposalBuilderError({
          message: `ProposalBuilder.build failed `,
        }),
    })
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
 *   const result = ProposalBuilder.buildUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProposalBuilder.buildUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const buildUnsafe = (instance: CML.ProposalBuilder): CML.ProposalBuilderResult =>
  Effect.runSync(build(instance));
