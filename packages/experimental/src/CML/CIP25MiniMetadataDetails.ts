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
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.CIP25MiniMetadataDetails,
) => Effect.Effect<void, CIP25MiniMetadataDetailsError> = Effect.fn(
  (instance: CML.CIP25MiniMetadataDetails) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.CIP25MiniMetadataDetails): void =>
  Effect.runSync(free(instance));

/**
 * Method toJson of CIP25MiniMetadataDetails
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (
  instance: CML.CIP25MiniMetadataDetails,
) => Effect.Effect<string, CIP25MiniMetadataDetailsError> = Effect.fn(
  (instance: CML.CIP25MiniMetadataDetails) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.CIP25MiniMetadataDetails): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of CIP25MiniMetadataDetails
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (
  instance: CML.CIP25MiniMetadataDetails,
) => Effect.Effect<any, CIP25MiniMetadataDetailsError> = Effect.fn(
  (instance: CML.CIP25MiniMetadataDetails) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.CIP25MiniMetadataDetails): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of CIP25MiniMetadataDetails
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (
  json: string,
) => Effect.Effect<
  CML.CIP25MiniMetadataDetails,
  CIP25MiniMetadataDetailsError
> = Effect.fn(function* (json: string) {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.CIP25MiniMetadataDetails =>
  Effect.runSync(fromJson(json));

/**
 * Static method _new of CIP25MiniMetadataDetails
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: () => Effect.Effect<
  CML.CIP25MiniMetadataDetails,
  CIP25MiniMetadataDetailsError
> = Effect.fn(function* () {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (): CML.CIP25MiniMetadataDetails =>
  Effect.runSync(_new());

/**
 * Method setName of CIP25MiniMetadataDetails
 *
 * @since 2.0.0
 * @category Methods
 */
export const setName: (
  instance: CML.CIP25MiniMetadataDetails,
  name: CML.CIP25String64,
) => Effect.Effect<void, CIP25MiniMetadataDetailsError> = Effect.fn(
  (instance: CML.CIP25MiniMetadataDetails, name: CML.CIP25String64) =>
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
 * @since 2.0.0
 * @category Methods
 */
export const name: (
  instance: CML.CIP25MiniMetadataDetails,
) => Effect.Effect<
  CML.CIP25String64 | undefined,
  CIP25MiniMetadataDetailsError
> = Effect.fn((instance: CML.CIP25MiniMetadataDetails) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const nameUnsafe = (
  instance: CML.CIP25MiniMetadataDetails,
): CML.CIP25String64 | undefined => Effect.runSync(name(instance));

/**
 * Method setImage of CIP25MiniMetadataDetails
 *
 * @since 2.0.0
 * @category Methods
 */
export const setImage: (
  instance: CML.CIP25MiniMetadataDetails,
  image: CML.CIP25ChunkableString,
) => Effect.Effect<void, CIP25MiniMetadataDetailsError> = Effect.fn(
  (instance: CML.CIP25MiniMetadataDetails, image: CML.CIP25ChunkableString) =>
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
 * @since 2.0.0
 * @category Methods
 */
export const image: (
  instance: CML.CIP25MiniMetadataDetails,
) => Effect.Effect<
  CML.CIP25ChunkableString | undefined,
  CIP25MiniMetadataDetailsError
> = Effect.fn((instance: CML.CIP25MiniMetadataDetails) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const imageUnsafe = (
  instance: CML.CIP25MiniMetadataDetails,
): CML.CIP25ChunkableString | undefined => Effect.runSync(image(instance));

/**
 * Static method looseParse of CIP25MiniMetadataDetails
 *
 * @since 2.0.0
 * @category Constructors
 */
export const looseParse: (
  metadatum: CML.TransactionMetadatum,
) => Effect.Effect<
  CML.CIP25MiniMetadataDetails,
  CIP25MiniMetadataDetailsError
> = Effect.fn(function* (metadatum: CML.TransactionMetadatum) {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const looseParseUnsafe = (
  metadatum: CML.TransactionMetadatum,
): CML.CIP25MiniMetadataDetails => Effect.runSync(looseParse(metadatum));
