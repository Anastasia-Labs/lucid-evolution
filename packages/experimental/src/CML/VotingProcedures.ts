/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML VotingProcedures class
 *
 * @since 2.0.0
 * @category Types
 */
export type VotingProcedures = CML.VotingProcedures;

/**
 * Error class for VotingProcedures operations
 *
 * This error is thrown when operations on VotingProcedures instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class VotingProceduresError extends Data.TaggedError(
  "VotingProceduresError",
)<{
  message?: string;
}> {}

/**
 * Method free of VotingProcedures
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.VotingProcedures,
) => Effect.Effect<void, VotingProceduresError> = Effect.fn(
  (instance: CML.VotingProcedures) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new VotingProceduresError({
          message: `VotingProcedures.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.VotingProcedures): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of VotingProcedures
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: () => Effect.Effect<
  CML.VotingProcedures,
  VotingProceduresError
> = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.VotingProcedures.new(),
    catch: () =>
      new VotingProceduresError({
        message: `VotingProcedures._new failed `,
      }),
  });
});

/**
 * Unsafely calls VotingProcedures._new without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (): CML.VotingProcedures => Effect.runSync(_new());

/**
 * Method len of VotingProcedures
 *
 * @since 2.0.0
 * @category Methods
 */
export const len: (
  instance: CML.VotingProcedures,
) => Effect.Effect<number, VotingProceduresError> = Effect.fn(
  (instance: CML.VotingProcedures) =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new VotingProceduresError({
          message: `VotingProcedures.len failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.len without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const lenUnsafe = (instance: CML.VotingProcedures): number =>
  Effect.runSync(len(instance));

/**
 * Method insert of VotingProcedures
 *
 * @since 2.0.0
 * @category Methods
 */
export const insert: (
  instance: CML.VotingProcedures,
  key: CML.Voter,
  value: CML.MapGovActionIdToVotingProcedure,
) => Effect.Effect<
  CML.MapGovActionIdToVotingProcedure | undefined,
  VotingProceduresError
> = Effect.fn(
  (
    instance: CML.VotingProcedures,
    key: CML.Voter,
    value: CML.MapGovActionIdToVotingProcedure,
  ) =>
    Effect.try({
      try: () => instance.insert(key, value),
      catch: () =>
        new VotingProceduresError({
          message: `VotingProcedures.insert failed with parameters: ${key} (Voter), ${value} (MapGovActionIdToVotingProcedure). `,
        }),
    }),
);

/**
 * Unsafely calls instance.insert without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const insertUnsafe = (
  instance: CML.VotingProcedures,
  key: CML.Voter,
  value: CML.MapGovActionIdToVotingProcedure,
): CML.MapGovActionIdToVotingProcedure | undefined =>
  Effect.runSync(insert(instance, key, value));

/**
 * Method get of VotingProcedures
 *
 * @since 2.0.0
 * @category Methods
 */
export const get: (
  instance: CML.VotingProcedures,
  key: CML.Voter,
) => Effect.Effect<
  CML.MapGovActionIdToVotingProcedure | undefined,
  VotingProceduresError
> = Effect.fn((instance: CML.VotingProcedures, key: CML.Voter) =>
  Effect.try({
    try: () => instance.get(key),
    catch: () =>
      new VotingProceduresError({
        message: `VotingProcedures.get failed with parameters: ${key} (Voter). `,
      }),
  }),
);

/**
 * Unsafely calls instance.get without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getUnsafe = (
  instance: CML.VotingProcedures,
  key: CML.Voter,
): CML.MapGovActionIdToVotingProcedure | undefined =>
  Effect.runSync(get(instance, key));

/**
 * Method keys of VotingProcedures
 *
 * @since 2.0.0
 * @category Methods
 */
export const keys: (
  instance: CML.VotingProcedures,
) => Effect.Effect<CML.VoterList, VotingProceduresError> = Effect.fn(
  (instance: CML.VotingProcedures) =>
    Effect.try({
      try: () => instance.keys(),
      catch: () =>
        new VotingProceduresError({
          message: `VotingProcedures.keys failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.keys without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const keysUnsafe = (instance: CML.VotingProcedures): CML.VoterList =>
  Effect.runSync(keys(instance));
