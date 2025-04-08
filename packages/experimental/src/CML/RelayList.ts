/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML RelayList class
 *
 * @since 2.0.0
 * @category Types
 */
export type RelayList = CML.RelayList;

/**
 * Error class for RelayList operations
 *
 * This error is thrown when operations on RelayList instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class RelayListError extends Data.TaggedError("RelayListError")<{
  message?: string;
}> {}

/**
 * Method free of RelayList
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.RelayList,
) => Effect.Effect<void, RelayListError> = Effect.fn(
  (instance: CML.RelayList) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new RelayListError({
          message: `RelayList.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.RelayList): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of RelayList
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: () => Effect.Effect<CML.RelayList, RelayListError> =
  Effect.fn(function* () {
    return yield* Effect.try({
      try: () => CML.RelayList.new(),
      catch: () =>
        new RelayListError({
          message: `RelayList._new failed `,
        }),
    });
  });

/**
 * Unsafely calls RelayList._new without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (): CML.RelayList => Effect.runSync(_new());

/**
 * Method len of RelayList
 *
 * @since 2.0.0
 * @category Methods
 */
export const len: (
  instance: CML.RelayList,
) => Effect.Effect<number, RelayListError> = Effect.fn(
  (instance: CML.RelayList) =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new RelayListError({
          message: `RelayList.len failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.len without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const lenUnsafe = (instance: CML.RelayList): number =>
  Effect.runSync(len(instance));

/**
 * Method get of RelayList
 *
 * @since 2.0.0
 * @category Methods
 */
export const get: (
  instance: CML.RelayList,
  index: number,
) => Effect.Effect<CML.Relay, RelayListError> = Effect.fn(
  (instance: CML.RelayList, index: number) =>
    Effect.try({
      try: () => instance.get(index),
      catch: () =>
        new RelayListError({
          message: `RelayList.get failed with parameters: ${index}. `,
        }),
    }),
);

/**
 * Unsafely calls instance.get without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getUnsafe = (instance: CML.RelayList, index: number): CML.Relay =>
  Effect.runSync(get(instance, index));

/**
 * Method add of RelayList
 *
 * @since 2.0.0
 * @category Methods
 */
export const add: (
  instance: CML.RelayList,
  elem: CML.Relay,
) => Effect.Effect<void, RelayListError> = Effect.fn(
  (instance: CML.RelayList, elem: CML.Relay) =>
    Effect.try({
      try: () => instance.add(elem),
      catch: () =>
        new RelayListError({
          message: `RelayList.add failed with parameters: ${elem} (Relay). `,
        }),
    }),
);

/**
 * Unsafely calls instance.add without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addUnsafe = (instance: CML.RelayList, elem: CML.Relay): void =>
  Effect.runSync(add(instance, elem));
