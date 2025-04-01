/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML VoteBuilder class
 *
 * @since 2.0.0
 * @category Types
 */
export type VoteBuilder = CML.VoteBuilder;

/**
 * Error class for VoteBuilder operations
 * 
 * This error is thrown when operations on VoteBuilder instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class VoteBuilderError extends Data.TaggedError("VoteBuilderError")<{
  message?: string;
}> {}

/**
 * Method free of VoteBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.VoteBuilder) => Effect.Effect<void, VoteBuilderError> = Effect.fn(
  (instance: CML.VoteBuilder) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new VoteBuilderError({
          message: `VoteBuilder.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.VoteBuilder): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of VoteBuilder
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new: () => Effect.Effect<CML.VoteBuilder, VoteBuilderError> = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.VoteBuilder.new(),
    catch: () => new VoteBuilderError({
      message: `VoteBuilder._new failed `,
    }),
  });
});

/**
 * Unsafely calls VoteBuilder._new without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (): CML.VoteBuilder =>
  Effect.runSync(_new());

/**
 * Method withVote of VoteBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const withVote: (instance: CML.VoteBuilder, voter: CML.Voter, govActionId: CML.GovActionId, procedure: CML.VotingProcedure) => Effect.Effect<CML.VoteBuilder, VoteBuilderError> = Effect.fn(
  (instance: CML.VoteBuilder, voter: CML.Voter, govActionId: CML.GovActionId, procedure: CML.VotingProcedure) =>
    Effect.try({
      try: () => instance.with_vote(voter, govActionId, procedure),
      catch: () =>
        new VoteBuilderError({
          message: `VoteBuilder.withVote failed with parameters: ${voter} (Voter), ${govActionId} (GovActionId), ${procedure} (VotingProcedure). `,
        }),
    })
);

/**
 * Unsafely calls instance.withVote without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const withVoteUnsafe = (instance: CML.VoteBuilder, voter: CML.Voter, govActionId: CML.GovActionId, procedure: CML.VotingProcedure): CML.VoteBuilder =>
  Effect.runSync(withVote(instance, voter, govActionId, procedure));

/**
 * Method withNativeScriptVote of VoteBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const withNativeScriptVote: (instance: CML.VoteBuilder, voter: CML.Voter, govActionId: CML.GovActionId, procedure: CML.VotingProcedure, nativeScript: CML.NativeScript, witnessInfo: CML.NativeScriptWitnessInfo) => Effect.Effect<CML.VoteBuilder, VoteBuilderError> = Effect.fn(
  (instance: CML.VoteBuilder, voter: CML.Voter, govActionId: CML.GovActionId, procedure: CML.VotingProcedure, nativeScript: CML.NativeScript, witnessInfo: CML.NativeScriptWitnessInfo) =>
    Effect.try({
      try: () => instance.with_native_script_vote(voter, govActionId, procedure, nativeScript, witnessInfo),
      catch: () =>
        new VoteBuilderError({
          message: `VoteBuilder.withNativeScriptVote failed with parameters: ${voter} (Voter), ${govActionId} (GovActionId), ${procedure} (VotingProcedure), ${nativeScript} (NativeScript), ${witnessInfo} (NativeScriptWitnessInfo). `,
        }),
    })
);

/**
 * Unsafely calls instance.withNativeScriptVote without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const withNativeScriptVoteUnsafe = (instance: CML.VoteBuilder, voter: CML.Voter, govActionId: CML.GovActionId, procedure: CML.VotingProcedure, nativeScript: CML.NativeScript, witnessInfo: CML.NativeScriptWitnessInfo): CML.VoteBuilder =>
  Effect.runSync(withNativeScriptVote(instance, voter, govActionId, procedure, nativeScript, witnessInfo));

/**
 * Method withPlutusVote of VoteBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const withPlutusVote: (instance: CML.VoteBuilder, voter: CML.Voter, govActionId: CML.GovActionId, procedure: CML.VotingProcedure, partialWitness: CML.PartialPlutusWitness, requiredSigners: CML.Ed25519KeyHashList, datum: CML.PlutusData) => Effect.Effect<CML.VoteBuilder, VoteBuilderError> = Effect.fn(
  (instance: CML.VoteBuilder, voter: CML.Voter, govActionId: CML.GovActionId, procedure: CML.VotingProcedure, partialWitness: CML.PartialPlutusWitness, requiredSigners: CML.Ed25519KeyHashList, datum: CML.PlutusData) =>
    Effect.try({
      try: () => instance.with_plutus_vote(voter, govActionId, procedure, partialWitness, requiredSigners, datum),
      catch: () =>
        new VoteBuilderError({
          message: `VoteBuilder.withPlutusVote failed with parameters: ${voter} (Voter), ${govActionId} (GovActionId), ${procedure} (VotingProcedure), ${partialWitness} (PartialPlutusWitness), ${requiredSigners} (Ed25519KeyHashList), ${datum} (PlutusData). `,
        }),
    })
);

/**
 * Unsafely calls instance.withPlutusVote without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const withPlutusVoteUnsafe = (instance: CML.VoteBuilder, voter: CML.Voter, govActionId: CML.GovActionId, procedure: CML.VotingProcedure, partialWitness: CML.PartialPlutusWitness, requiredSigners: CML.Ed25519KeyHashList, datum: CML.PlutusData): CML.VoteBuilder =>
  Effect.runSync(withPlutusVote(instance, voter, govActionId, procedure, partialWitness, requiredSigners, datum));

/**
 * Method withPlutusVoteInlineDatum of VoteBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const withPlutusVoteInlineDatum: (instance: CML.VoteBuilder, voter: CML.Voter, govActionId: CML.GovActionId, procedure: CML.VotingProcedure, partialWitness: CML.PartialPlutusWitness, requiredSigners: CML.Ed25519KeyHashList) => Effect.Effect<CML.VoteBuilder, VoteBuilderError> = Effect.fn(
  (instance: CML.VoteBuilder, voter: CML.Voter, govActionId: CML.GovActionId, procedure: CML.VotingProcedure, partialWitness: CML.PartialPlutusWitness, requiredSigners: CML.Ed25519KeyHashList) =>
    Effect.try({
      try: () => instance.with_plutus_vote_inline_datum(voter, govActionId, procedure, partialWitness, requiredSigners),
      catch: () =>
        new VoteBuilderError({
          message: `VoteBuilder.withPlutusVoteInlineDatum failed with parameters: ${voter} (Voter), ${govActionId} (GovActionId), ${procedure} (VotingProcedure), ${partialWitness} (PartialPlutusWitness), ${requiredSigners} (Ed25519KeyHashList). `,
        }),
    })
);

/**
 * Unsafely calls instance.withPlutusVoteInlineDatum without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const withPlutusVoteInlineDatumUnsafe = (instance: CML.VoteBuilder, voter: CML.Voter, govActionId: CML.GovActionId, procedure: CML.VotingProcedure, partialWitness: CML.PartialPlutusWitness, requiredSigners: CML.Ed25519KeyHashList): CML.VoteBuilder =>
  Effect.runSync(withPlutusVoteInlineDatum(instance, voter, govActionId, procedure, partialWitness, requiredSigners));

/**
 * Method build of VoteBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const build: (instance: CML.VoteBuilder) => Effect.Effect<CML.VoteBuilderResult, VoteBuilderError> = Effect.fn(
  (instance: CML.VoteBuilder) =>
    Effect.try({
      try: () => instance.build(),
      catch: () =>
        new VoteBuilderError({
          message: `VoteBuilder.build failed `,
        }),
    })
);

/**
 * Unsafely calls instance.build without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const buildUnsafe = (instance: CML.VoteBuilder): CML.VoteBuilderResult =>
  Effect.runSync(build(instance));
