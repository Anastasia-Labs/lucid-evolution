/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML VoterList class
 *
 * @since 2.0.0
 * @category Types
 */
export type VoterList = CML.VoterList;

/**
 * Error class for VoterList operations
 * 
 * This error is thrown when operations on VoterList instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class VoterListError extends Data.TaggedError("VoterListError")<{
  message?: string;
}> {}

/**
 * Method free of VoterList
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.VoterList) => Effect.Effect<void, VoterListError> = Effect.fn(
  (instance: CML.VoterList) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new VoterListError({
          message: `VoterList.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.VoterList): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of VoterList
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new: () => Effect.Effect<CML.VoterList, VoterListError> = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.VoterList.new(),
    catch: () => new VoterListError({
      message: `VoterList._new failed `,
    }),
  });
});

/**
 * Unsafely calls VoterList._new without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (): CML.VoterList =>
  Effect.runSync(_new());

/**
 * Method len of VoterList
 * 
 * @since 2.0.0
 * @category Methods
 */
export const len: (instance: CML.VoterList) => Effect.Effect<number, VoterListError> = Effect.fn(
  (instance: CML.VoterList) =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new VoterListError({
          message: `VoterList.len failed `,
        }),
    })
);

/**
 * Unsafely calls instance.len without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const lenUnsafe = (instance: CML.VoterList): number =>
  Effect.runSync(len(instance));

/**
 * Method get of VoterList
 * 
 * @since 2.0.0
 * @category Methods
 */
export const get: (instance: CML.VoterList, index: number) => Effect.Effect<CML.Voter, VoterListError> = Effect.fn(
  (instance: CML.VoterList, index: number) =>
    Effect.try({
      try: () => instance.get(index),
      catch: () =>
        new VoterListError({
          message: `VoterList.get failed with parameters: ${index}. `,
        }),
    })
);

/**
 * Unsafely calls instance.get without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getUnsafe = (instance: CML.VoterList, index: number): CML.Voter =>
  Effect.runSync(get(instance, index));

/**
 * Method add of VoterList
 * 
 * @since 2.0.0
 * @category Methods
 */
export const add: (instance: CML.VoterList, elem: CML.Voter) => Effect.Effect<void, VoterListError> = Effect.fn(
  (instance: CML.VoterList, elem: CML.Voter) =>
    Effect.try({
      try: () => instance.add(elem),
      catch: () =>
        new VoterListError({
          message: `VoterList.add failed with parameters: ${elem} (Voter). `,
        }),
    })
);

/**
 * Unsafely calls instance.add without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addUnsafe = (instance: CML.VoterList, elem: CML.Voter): void =>
  Effect.runSync(add(instance, elem));
