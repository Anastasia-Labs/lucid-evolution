/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML CIP25MiniMetadataDetails class
 *
 * @since 2.0.0
 * @category Types
 */
export type CIP25MiniMetadataDetails = CML.CIP25MiniMetadataDetails;

/**
 * Error class for CIP25MiniMetadataDetails operations
 *
 * This error is thrown when operations on CIP25MiniMetadataDetails instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class CIP25MiniMetadataDetailsError extends Data.TaggedError(
  "CIP25MiniMetadataDetailsError",
)<{
  message?: string;
}> {}

/**
 * Method free of CIP25MiniMetadataDetails
 *
 * @example
 * import { CIP25MiniMetadataDetails } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP25MiniMetadataDetails instance
 * const instance = ... ;
 *   const result = yield* CIP25MiniMetadataDetails.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (
    instance: CML.CIP25MiniMetadataDetails,
  ): Effect.Effect<void, CIP25MiniMetadataDetailsError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new CIP25MiniMetadataDetailsError({
          message: `CIP25MiniMetadataDetails.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { CIP25MiniMetadataDetails } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP25MiniMetadataDetails instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25MiniMetadataDetails.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25MiniMetadataDetails.freeUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.CIP25MiniMetadataDetails): void =>
  Effect.runSync(free(instance));

/**
 * Method toJson of CIP25MiniMetadataDetails
 *
 * @example
 * import { CIP25MiniMetadataDetails } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP25MiniMetadataDetails instance
 * const instance = ... ;
 *   const result = yield* CIP25MiniMetadataDetails.toJson(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (
    instance: CML.CIP25MiniMetadataDetails,
  ): Effect.Effect<string, CIP25MiniMetadataDetailsError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new CIP25MiniMetadataDetailsError({
          message: `CIP25MiniMetadataDetails.toJson failed CIP25MiniMetadataDetails is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @example
 * import { CIP25MiniMetadataDetails } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP25MiniMetadataDetails instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25MiniMetadataDetails.toJsonUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25MiniMetadataDetails.toJsonUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.CIP25MiniMetadataDetails): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of CIP25MiniMetadataDetails
 *
 * @example
 * import { CIP25MiniMetadataDetails } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP25MiniMetadataDetails instance
 * const instance = ... ;
 *   const result = yield* CIP25MiniMetadataDetails.toJsValue(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (
    instance: CML.CIP25MiniMetadataDetails,
  ): Effect.Effect<any, CIP25MiniMetadataDetailsError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new CIP25MiniMetadataDetailsError({
          message: `CIP25MiniMetadataDetails.toJsValue failed CIP25MiniMetadataDetails is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @example
 * import { CIP25MiniMetadataDetails } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP25MiniMetadataDetails instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25MiniMetadataDetails.toJsValueUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25MiniMetadataDetails.toJsValueUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.CIP25MiniMetadataDetails): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of CIP25MiniMetadataDetails
 *
 * @example
 * import { CIP25MiniMetadataDetails } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* CIP25MiniMetadataDetails.fromJson( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.CIP25MiniMetadataDetails.from_json(json),
    catch: () =>
      new CIP25MiniMetadataDetailsError({
        message: `CIP25MiniMetadataDetails.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls CIP25MiniMetadataDetails.fromJson without Effect wrapper
 *
 * @example
 * import { CIP25MiniMetadataDetails } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25MiniMetadataDetails.fromJsonUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25MiniMetadataDetails.fromJsonUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string) => Effect.runSync(fromJson(json));

/**
 * Static method _new of CIP25MiniMetadataDetails
 *
 * @example
 * import { CIP25MiniMetadataDetails } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* CIP25MiniMetadataDetails._new();
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.CIP25MiniMetadataDetails.new(),
    catch: () =>
      new CIP25MiniMetadataDetailsError({
        message: `CIP25MiniMetadataDetails._new failed `,
      }),
  });
});

/**
 * Unsafely calls CIP25MiniMetadataDetails._new without Effect wrapper
 *
 * @example
 * import { CIP25MiniMetadataDetails } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25MiniMetadataDetails._newUnsafe();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25MiniMetadataDetails._newUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = () => Effect.runSync(_new());

/**
 * Method setName of CIP25MiniMetadataDetails
 *
 * @example
 * import { CIP25MiniMetadataDetails } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP25MiniMetadataDetails instance
 * const instance = ... ;
 *   const result = yield* CIP25MiniMetadataDetails.setName(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const setName = Effect.fn(
  (
    instance: CML.CIP25MiniMetadataDetails,
    name: CML.CIP25String64,
  ): Effect.Effect<void, CIP25MiniMetadataDetailsError> =>
    Effect.try({
      try: () => instance.set_name(name),
      catch: () =>
        new CIP25MiniMetadataDetailsError({
          message: `CIP25MiniMetadataDetails.setName failed with parameters: ${name} (CIP25String64). `,
        }),
    }),
);

/**
 * Unsafely calls instance.setName without Effect wrapper
 *
 * @example
 * import { CIP25MiniMetadataDetails } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP25MiniMetadataDetails instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25MiniMetadataDetails.setNameUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25MiniMetadataDetails.setNameUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setNameUnsafe = (
  instance: CML.CIP25MiniMetadataDetails,
  name: CML.CIP25String64,
): void => Effect.runSync(setName(instance, name));

/**
 * Method name of CIP25MiniMetadataDetails
 *
 * @example
 * import { CIP25MiniMetadataDetails } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP25MiniMetadataDetails instance
 * const instance = ... ;
 *   const result = yield* CIP25MiniMetadataDetails.name(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const name = Effect.fn(
  (
    instance: CML.CIP25MiniMetadataDetails,
  ): Effect.Effect<
    CML.CIP25String64 | undefined,
    CIP25MiniMetadataDetailsError
  > =>
    Effect.try({
      try: () => instance.name(),
      catch: () =>
        new CIP25MiniMetadataDetailsError({
          message: `CIP25MiniMetadataDetails.name failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.name without Effect wrapper
 *
 * @example
 * import { CIP25MiniMetadataDetails } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP25MiniMetadataDetails instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25MiniMetadataDetails.nameUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25MiniMetadataDetails.nameUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const nameUnsafe = (
  instance: CML.CIP25MiniMetadataDetails,
): CML.CIP25String64 | undefined => Effect.runSync(name(instance));

/**
 * Method setImage of CIP25MiniMetadataDetails
 *
 * @example
 * import { CIP25MiniMetadataDetails } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP25MiniMetadataDetails instance
 * const instance = ... ;
 *   const result = yield* CIP25MiniMetadataDetails.setImage(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const setImage = Effect.fn(
  (
    instance: CML.CIP25MiniMetadataDetails,
    image: CML.CIP25ChunkableString,
  ): Effect.Effect<void, CIP25MiniMetadataDetailsError> =>
    Effect.try({
      try: () => instance.set_image(image),
      catch: () =>
        new CIP25MiniMetadataDetailsError({
          message: `CIP25MiniMetadataDetails.setImage failed with parameters: ${image} (CIP25ChunkableString). `,
        }),
    }),
);

/**
 * Unsafely calls instance.setImage without Effect wrapper
 *
 * @example
 * import { CIP25MiniMetadataDetails } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP25MiniMetadataDetails instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25MiniMetadataDetails.setImageUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25MiniMetadataDetails.setImageUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setImageUnsafe = (
  instance: CML.CIP25MiniMetadataDetails,
  image: CML.CIP25ChunkableString,
): void => Effect.runSync(setImage(instance, image));

/**
 * Method image of CIP25MiniMetadataDetails
 *
 * @example
 * import { CIP25MiniMetadataDetails } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP25MiniMetadataDetails instance
 * const instance = ... ;
 *   const result = yield* CIP25MiniMetadataDetails.image(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const image = Effect.fn(
  (
    instance: CML.CIP25MiniMetadataDetails,
  ): Effect.Effect<
    CML.CIP25ChunkableString | undefined,
    CIP25MiniMetadataDetailsError
  > =>
    Effect.try({
      try: () => instance.image(),
      catch: () =>
        new CIP25MiniMetadataDetailsError({
          message: `CIP25MiniMetadataDetails.image failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.image without Effect wrapper
 *
 * @example
 * import { CIP25MiniMetadataDetails } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP25MiniMetadataDetails instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25MiniMetadataDetails.imageUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25MiniMetadataDetails.imageUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const imageUnsafe = (
  instance: CML.CIP25MiniMetadataDetails,
): CML.CIP25ChunkableString | undefined => Effect.runSync(image(instance));

/**
 * Static method looseParse of CIP25MiniMetadataDetails
 *
 * @example
 * import { CIP25MiniMetadataDetails } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* CIP25MiniMetadataDetails.looseParse( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const looseParse = Effect.fn(function* (
  metadatum: CML.TransactionMetadatum,
) {
  return yield* Effect.try({
    try: () => CML.CIP25MiniMetadataDetails.loose_parse(metadatum),
    catch: () =>
      new CIP25MiniMetadataDetailsError({
        message: `CIP25MiniMetadataDetails.looseParse failed with parameters: ${metadatum} (TransactionMetadatum). `,
      }),
  });
});

/**
 * Unsafely calls CIP25MiniMetadataDetails.looseParse without Effect wrapper
 *
 * @example
 * import { CIP25MiniMetadataDetails } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25MiniMetadataDetails.looseParseUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25MiniMetadataDetails.looseParseUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const looseParseUnsafe = (metadatum: CML.TransactionMetadatum) =>
  Effect.runSync(looseParse(metadatum));
