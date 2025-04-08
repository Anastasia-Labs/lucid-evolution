/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML TransactionMetadatum class
 *
 * @since 2.0.0
 * @category Types
 */
export type TransactionMetadatum = CML.TransactionMetadatum;

/**
 * Error class for TransactionMetadatum operations
 *
 * This error is thrown when operations on TransactionMetadatum instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class TransactionMetadatumError extends Data.TaggedError(
  "TransactionMetadatumError",
)<{
  message?: string;
}> {}

/**
 * Method free of TransactionMetadatum
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.TransactionMetadatum,
) => Effect.Effect<void, TransactionMetadatumError> = Effect.fn(
  (instance: CML.TransactionMetadatum) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new TransactionMetadatumError({
          message: `TransactionMetadatum.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.TransactionMetadatum): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of TransactionMetadatum
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (
  instance: CML.TransactionMetadatum,
) => Effect.Effect<Uint8Array, TransactionMetadatumError> = Effect.fn(
  (instance: CML.TransactionMetadatum) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new TransactionMetadatumError({
          message: `TransactionMetadatum.toCborBytes failed TransactionMetadatum is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (
  instance: CML.TransactionMetadatum,
): Uint8Array => Effect.runSync(toCborBytes(instance));

/**
 * Static method fromCborBytes of TransactionMetadatum
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.TransactionMetadatum, TransactionMetadatumError> =
  Effect.fn(function* (cborBytes: Uint8Array) {
    return yield* Effect.try({
      try: () => CML.TransactionMetadatum.from_cbor_bytes(cborBytes),
      catch: () =>
        new TransactionMetadatumError({
          message: `TransactionMetadatum.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
        }),
    });
  });

/**
 * Unsafely calls TransactionMetadatum.fromCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (
  cborBytes: Uint8Array,
): CML.TransactionMetadatum => Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toJson of TransactionMetadatum
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (
  instance: CML.TransactionMetadatum,
) => Effect.Effect<string, TransactionMetadatumError> = Effect.fn(
  (instance: CML.TransactionMetadatum) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new TransactionMetadatumError({
          message: `TransactionMetadatum.toJson failed TransactionMetadatum is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.TransactionMetadatum): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsonValue of TransactionMetadatum
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsonValue: (
  instance: CML.TransactionMetadatum,
) => Effect.Effect<any, TransactionMetadatumError> = Effect.fn(
  (instance: CML.TransactionMetadatum) =>
    Effect.try({
      try: () => instance.to_json_value(),
      catch: () =>
        new TransactionMetadatumError({
          message: `TransactionMetadatum.toJsonValue failed TransactionMetadatum is not valid for any conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsonValue without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonValueUnsafe = (instance: CML.TransactionMetadatum): any =>
  Effect.runSync(toJsonValue(instance));

/**
 * Static method fromJson of TransactionMetadatum
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (
  json: string,
) => Effect.Effect<CML.TransactionMetadatum, TransactionMetadatumError> =
  Effect.fn(function* (json: string) {
    return yield* Effect.try({
      try: () => CML.TransactionMetadatum.from_json(json),
      catch: () =>
        new TransactionMetadatumError({
          message: `TransactionMetadatum.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
        }),
    });
  });

/**
 * Unsafely calls TransactionMetadatum.fromJson without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.TransactionMetadatum =>
  Effect.runSync(fromJson(json));

/**
 * Static method newMap of TransactionMetadatum
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newMap: (
  map: CML.MetadatumMap,
) => Effect.Effect<CML.TransactionMetadatum, TransactionMetadatumError> =
  Effect.fn(function* (map: CML.MetadatumMap) {
    return yield* Effect.try({
      try: () => CML.TransactionMetadatum.new_map(map),
      catch: () =>
        new TransactionMetadatumError({
          message: `TransactionMetadatum.newMap failed with parameters: ${map} (MetadatumMap). `,
        }),
    });
  });

/**
 * Unsafely calls TransactionMetadatum.newMap without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newMapUnsafe = (map: CML.MetadatumMap): CML.TransactionMetadatum =>
  Effect.runSync(newMap(map));

/**
 * Static method newList of TransactionMetadatum
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newList: (
  elements: CML.MetadatumList,
) => Effect.Effect<CML.TransactionMetadatum, TransactionMetadatumError> =
  Effect.fn(function* (elements: CML.MetadatumList) {
    return yield* Effect.try({
      try: () => CML.TransactionMetadatum.new_list(elements),
      catch: () =>
        new TransactionMetadatumError({
          message: `TransactionMetadatum.newList failed with parameters: ${elements} (MetadatumList). `,
        }),
    });
  });

/**
 * Unsafely calls TransactionMetadatum.newList without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newListUnsafe = (
  elements: CML.MetadatumList,
): CML.TransactionMetadatum => Effect.runSync(newList(elements));

/**
 * Static method newInt of TransactionMetadatum
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newInt: (
  int: CML.Int,
) => Effect.Effect<CML.TransactionMetadatum, TransactionMetadatumError> =
  Effect.fn(function* (int: CML.Int) {
    return yield* Effect.try({
      try: () => CML.TransactionMetadatum.new_int(int),
      catch: () =>
        new TransactionMetadatumError({
          message: `TransactionMetadatum.newInt failed with parameters: ${int} (Int). `,
        }),
    });
  });

/**
 * Unsafely calls TransactionMetadatum.newInt without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newIntUnsafe = (int: CML.Int): CML.TransactionMetadatum =>
  Effect.runSync(newInt(int));

/**
 * Static method newBytes of TransactionMetadatum
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newBytes: (
  bytes: Uint8Array,
) => Effect.Effect<CML.TransactionMetadatum, TransactionMetadatumError> =
  Effect.fn(function* (bytes: Uint8Array) {
    return yield* Effect.try({
      try: () => CML.TransactionMetadatum.new_bytes(bytes),
      catch: () =>
        new TransactionMetadatumError({
          message: `TransactionMetadatum.newBytes failed with parameters: ${bytes}. Hint: Check byte length and encoding.`,
        }),
    });
  });

/**
 * Unsafely calls TransactionMetadatum.newBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newBytesUnsafe = (bytes: Uint8Array): CML.TransactionMetadatum =>
  Effect.runSync(newBytes(bytes));

/**
 * Static method newText of TransactionMetadatum
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newText: (
  text: string,
) => Effect.Effect<CML.TransactionMetadatum, TransactionMetadatumError> =
  Effect.fn(function* (text: string) {
    return yield* Effect.try({
      try: () => CML.TransactionMetadatum.new_text(text),
      catch: () =>
        new TransactionMetadatumError({
          message: `TransactionMetadatum.newText failed with parameters: ${text}. `,
        }),
    });
  });

/**
 * Unsafely calls TransactionMetadatum.newText without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newTextUnsafe = (text: string): CML.TransactionMetadatum =>
  Effect.runSync(newText(text));

/**
 * Method kind of TransactionMetadatum
 *
 * @since 2.0.0
 * @category Methods
 */
export const kind: (
  instance: CML.TransactionMetadatum,
) => Effect.Effect<CML.TransactionMetadatumKind, TransactionMetadatumError> =
  Effect.fn((instance: CML.TransactionMetadatum) =>
    Effect.try({
      try: () => instance.kind(),
      catch: () =>
        new TransactionMetadatumError({
          message: `TransactionMetadatum.kind failed `,
        }),
    }),
  );

/**
 * Unsafely calls instance.kind without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const kindUnsafe = (
  instance: CML.TransactionMetadatum,
): CML.TransactionMetadatumKind => Effect.runSync(kind(instance));

/**
 * Method asMap of TransactionMetadatum
 *
 * @since 2.0.0
 * @category Methods
 */
export const asMap: (
  instance: CML.TransactionMetadatum,
) => Effect.Effect<CML.MetadatumMap | undefined, TransactionMetadatumError> =
  Effect.fn((instance: CML.TransactionMetadatum) =>
    Effect.try({
      try: () => instance.as_map(),
      catch: () =>
        new TransactionMetadatumError({
          message: `TransactionMetadatum.asMap failed `,
        }),
    }),
  );

/**
 * Unsafely calls instance.asMap without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asMapUnsafe = (
  instance: CML.TransactionMetadatum,
): CML.MetadatumMap | undefined => Effect.runSync(asMap(instance));

/**
 * Method asList of TransactionMetadatum
 *
 * @since 2.0.0
 * @category Methods
 */
export const asList: (
  instance: CML.TransactionMetadatum,
) => Effect.Effect<CML.MetadatumList | undefined, TransactionMetadatumError> =
  Effect.fn((instance: CML.TransactionMetadatum) =>
    Effect.try({
      try: () => instance.as_list(),
      catch: () =>
        new TransactionMetadatumError({
          message: `TransactionMetadatum.asList failed `,
        }),
    }),
  );

/**
 * Unsafely calls instance.asList without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asListUnsafe = (
  instance: CML.TransactionMetadatum,
): CML.MetadatumList | undefined => Effect.runSync(asList(instance));

/**
 * Method asInt of TransactionMetadatum
 *
 * @since 2.0.0
 * @category Methods
 */
export const asInt: (
  instance: CML.TransactionMetadatum,
) => Effect.Effect<CML.Int | undefined, TransactionMetadatumError> = Effect.fn(
  (instance: CML.TransactionMetadatum) =>
    Effect.try({
      try: () => instance.as_int(),
      catch: () =>
        new TransactionMetadatumError({
          message: `TransactionMetadatum.asInt failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.asInt without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asIntUnsafe = (
  instance: CML.TransactionMetadatum,
): CML.Int | undefined => Effect.runSync(asInt(instance));

/**
 * Method asBytes of TransactionMetadatum
 *
 * @since 2.0.0
 * @category Methods
 */
export const asBytes: (
  instance: CML.TransactionMetadatum,
) => Effect.Effect<Uint8Array | undefined, TransactionMetadatumError> =
  Effect.fn((instance: CML.TransactionMetadatum) =>
    Effect.try({
      try: () => instance.as_bytes(),
      catch: () =>
        new TransactionMetadatumError({
          message: `TransactionMetadatum.asBytes failed Hint: Check byte length and encoding.`,
        }),
    }),
  );

/**
 * Unsafely calls instance.asBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asBytesUnsafe = (
  instance: CML.TransactionMetadatum,
): Uint8Array | undefined => Effect.runSync(asBytes(instance));

/**
 * Method asText of TransactionMetadatum
 *
 * @since 2.0.0
 * @category Methods
 */
export const asText: (
  instance: CML.TransactionMetadatum,
) => Effect.Effect<string | undefined, TransactionMetadatumError> = Effect.fn(
  (instance: CML.TransactionMetadatum) =>
    Effect.try({
      try: () => instance.as_text(),
      catch: () =>
        new TransactionMetadatumError({
          message: `TransactionMetadatum.asText failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.asText without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asTextUnsafe = (
  instance: CML.TransactionMetadatum,
): string | undefined => Effect.runSync(asText(instance));
