/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML PlutusData class
 *
 * @since 2.0.0
 * @category Types
 */
export type PlutusData = CML.PlutusData;

/**
 * Error class for PlutusData operations
 *
 * This error is thrown when operations on PlutusData instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class PlutusDataError extends Data.TaggedError("PlutusDataError")<{
  message?: string;
}> {}

/**
 * Method free of PlutusData
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.PlutusData,
) => Effect.Effect<void, PlutusDataError> = Effect.fn(
  (instance: CML.PlutusData) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new PlutusDataError({
          message: `PlutusData.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.PlutusData): void =>
  Effect.runSync(free(instance));

/**
 * Method toCardanoNodeFormat of PlutusData
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCardanoNodeFormat: (
  instance: CML.PlutusData,
) => Effect.Effect<CML.PlutusData, PlutusDataError> = Effect.fn(
  (instance: CML.PlutusData) =>
    Effect.try({
      try: () => instance.to_cardano_node_format(),
      catch: () =>
        new PlutusDataError({
          message: `PlutusData.toCardanoNodeFormat failed PlutusData is not valid for PlutusData conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toCardanoNodeFormat without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCardanoNodeFormatUnsafe = (
  instance: CML.PlutusData,
): CML.PlutusData => Effect.runSync(toCardanoNodeFormat(instance));

/**
 * Method toCborBytes of PlutusData
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (
  instance: CML.PlutusData,
) => Effect.Effect<Uint8Array, PlutusDataError> = Effect.fn(
  (instance: CML.PlutusData) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new PlutusDataError({
          message: `PlutusData.toCborBytes failed PlutusData is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.PlutusData): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of PlutusData
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (
  instance: CML.PlutusData,
) => Effect.Effect<Uint8Array, PlutusDataError> = Effect.fn(
  (instance: CML.PlutusData) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new PlutusDataError({
          message: `PlutusData.toCanonicalCborBytes failed PlutusData is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (
  instance: CML.PlutusData,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of PlutusData
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.PlutusData, PlutusDataError> = Effect.fn(function* (
  cborBytes: Uint8Array,
) {
  return yield* Effect.try({
    try: () => CML.PlutusData.from_cbor_bytes(cborBytes),
    catch: () =>
      new PlutusDataError({
        message: `PlutusData.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls PlutusData.fromCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.PlutusData =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of PlutusData
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (
  instance: CML.PlutusData,
) => Effect.Effect<string, PlutusDataError> = Effect.fn(
  (instance: CML.PlutusData) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new PlutusDataError({
          message: `PlutusData.toCborHex failed PlutusData is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.PlutusData): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of PlutusData
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (
  instance: CML.PlutusData,
) => Effect.Effect<string, PlutusDataError> = Effect.fn(
  (instance: CML.PlutusData) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new PlutusDataError({
          message: `PlutusData.toCanonicalCborHex failed PlutusData is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.PlutusData): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of PlutusData
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.PlutusData, PlutusDataError> = Effect.fn(function* (
  cborBytes: string,
) {
  return yield* Effect.try({
    try: () => CML.PlutusData.from_cbor_hex(cborBytes),
    catch: () =>
      new PlutusDataError({
        message: `PlutusData.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls PlutusData.fromCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.PlutusData =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of PlutusData
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (
  instance: CML.PlutusData,
) => Effect.Effect<string, PlutusDataError> = Effect.fn(
  (instance: CML.PlutusData) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new PlutusDataError({
          message: `PlutusData.toJson failed PlutusData is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.PlutusData): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of PlutusData
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (
  instance: CML.PlutusData,
) => Effect.Effect<any, PlutusDataError> = Effect.fn(
  (instance: CML.PlutusData) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new PlutusDataError({
          message: `PlutusData.toJsValue failed PlutusData is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.PlutusData): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of PlutusData
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (
  json: string,
) => Effect.Effect<CML.PlutusData, PlutusDataError> = Effect.fn(function* (
  json: string,
) {
  return yield* Effect.try({
    try: () => CML.PlutusData.from_json(json),
    catch: () =>
      new PlutusDataError({
        message: `PlutusData.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls PlutusData.fromJson without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.PlutusData =>
  Effect.runSync(fromJson(json));

/**
 * Static method newConstrPlutusData of PlutusData
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newConstrPlutusData: (
  constrPlutusData: CML.ConstrPlutusData,
) => Effect.Effect<CML.PlutusData, PlutusDataError> = Effect.fn(function* (
  constrPlutusData: CML.ConstrPlutusData,
) {
  return yield* Effect.try({
    try: () => CML.PlutusData.new_constr_plutus_data(constrPlutusData),
    catch: () =>
      new PlutusDataError({
        message: `PlutusData.newConstrPlutusData failed with parameters: ${constrPlutusData} (ConstrPlutusData). Hint: Not all PlutusData instances can be stringified.`,
      }),
  });
});

/**
 * Unsafely calls PlutusData.newConstrPlutusData without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newConstrPlutusDataUnsafe = (
  constrPlutusData: CML.ConstrPlutusData,
): CML.PlutusData => Effect.runSync(newConstrPlutusData(constrPlutusData));

/**
 * Static method newMap of PlutusData
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newMap: (
  map: CML.PlutusMap,
) => Effect.Effect<CML.PlutusData, PlutusDataError> = Effect.fn(function* (
  map: CML.PlutusMap,
) {
  return yield* Effect.try({
    try: () => CML.PlutusData.new_map(map),
    catch: () =>
      new PlutusDataError({
        message: `PlutusData.newMap failed with parameters: ${map} (PlutusMap). `,
      }),
  });
});

/**
 * Unsafely calls PlutusData.newMap without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newMapUnsafe = (map: CML.PlutusMap): CML.PlutusData =>
  Effect.runSync(newMap(map));

/**
 * Static method newList of PlutusData
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newList: (
  list: CML.PlutusDataList,
) => Effect.Effect<CML.PlutusData, PlutusDataError> = Effect.fn(function* (
  list: CML.PlutusDataList,
) {
  return yield* Effect.try({
    try: () => CML.PlutusData.new_list(list),
    catch: () =>
      new PlutusDataError({
        message: `PlutusData.newList failed with parameters: ${list} (PlutusDataList). `,
      }),
  });
});

/**
 * Unsafely calls PlutusData.newList without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newListUnsafe = (list: CML.PlutusDataList): CML.PlutusData =>
  Effect.runSync(newList(list));

/**
 * Static method newInteger of PlutusData
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newInteger: (
  bigInt: CML.BigInteger,
) => Effect.Effect<CML.PlutusData, PlutusDataError> = Effect.fn(function* (
  bigInt: CML.BigInteger,
) {
  return yield* Effect.try({
    try: () => CML.PlutusData.new_integer(bigInt),
    catch: () =>
      new PlutusDataError({
        message: `PlutusData.newInteger failed with parameters: ${bigInt} (BigInteger). `,
      }),
  });
});

/**
 * Unsafely calls PlutusData.newInteger without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newIntegerUnsafe = (bigInt: CML.BigInteger): CML.PlutusData =>
  Effect.runSync(newInteger(bigInt));

/**
 * Static method newBytes of PlutusData
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newBytes: (
  bytes: Uint8Array,
) => Effect.Effect<CML.PlutusData, PlutusDataError> = Effect.fn(function* (
  bytes: Uint8Array,
) {
  return yield* Effect.try({
    try: () => CML.PlutusData.new_bytes(bytes),
    catch: () =>
      new PlutusDataError({
        message: `PlutusData.newBytes failed with parameters: ${bytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls PlutusData.newBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newBytesUnsafe = (bytes: Uint8Array): CML.PlutusData =>
  Effect.runSync(newBytes(bytes));

/**
 * Method kind of PlutusData
 *
 * @since 2.0.0
 * @category Methods
 */
export const kind: (
  instance: CML.PlutusData,
) => Effect.Effect<CML.PlutusDataKind, PlutusDataError> = Effect.fn(
  (instance: CML.PlutusData) =>
    Effect.try({
      try: () => instance.kind(),
      catch: () =>
        new PlutusDataError({
          message: `PlutusData.kind failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.kind without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const kindUnsafe = (instance: CML.PlutusData): CML.PlutusDataKind =>
  Effect.runSync(kind(instance));

/**
 * Method asConstrPlutusData of PlutusData
 *
 * @since 2.0.0
 * @category Methods
 */
export const asConstrPlutusData: (
  instance: CML.PlutusData,
) => Effect.Effect<CML.ConstrPlutusData | undefined, PlutusDataError> =
  Effect.fn((instance: CML.PlutusData) =>
    Effect.try({
      try: () => instance.as_constr_plutus_data(),
      catch: () =>
        new PlutusDataError({
          message: `PlutusData.asConstrPlutusData failed Hint: Not all PlutusData instances can be stringified.`,
        }),
    }),
  );

/**
 * Unsafely calls instance.asConstrPlutusData without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asConstrPlutusDataUnsafe = (
  instance: CML.PlutusData,
): CML.ConstrPlutusData | undefined =>
  Effect.runSync(asConstrPlutusData(instance));

/**
 * Method asMap of PlutusData
 *
 * @since 2.0.0
 * @category Methods
 */
export const asMap: (
  instance: CML.PlutusData,
) => Effect.Effect<CML.PlutusMap | undefined, PlutusDataError> = Effect.fn(
  (instance: CML.PlutusData) =>
    Effect.try({
      try: () => instance.as_map(),
      catch: () =>
        new PlutusDataError({
          message: `PlutusData.asMap failed `,
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
  instance: CML.PlutusData,
): CML.PlutusMap | undefined => Effect.runSync(asMap(instance));

/**
 * Method asList of PlutusData
 *
 * @since 2.0.0
 * @category Methods
 */
export const asList: (
  instance: CML.PlutusData,
) => Effect.Effect<CML.PlutusDataList | undefined, PlutusDataError> = Effect.fn(
  (instance: CML.PlutusData) =>
    Effect.try({
      try: () => instance.as_list(),
      catch: () =>
        new PlutusDataError({
          message: `PlutusData.asList failed `,
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
  instance: CML.PlutusData,
): CML.PlutusDataList | undefined => Effect.runSync(asList(instance));

/**
 * Method asInteger of PlutusData
 *
 * @since 2.0.0
 * @category Methods
 */
export const asInteger: (
  instance: CML.PlutusData,
) => Effect.Effect<CML.BigInteger | undefined, PlutusDataError> = Effect.fn(
  (instance: CML.PlutusData) =>
    Effect.try({
      try: () => instance.as_integer(),
      catch: () =>
        new PlutusDataError({
          message: `PlutusData.asInteger failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.asInteger without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asIntegerUnsafe = (
  instance: CML.PlutusData,
): CML.BigInteger | undefined => Effect.runSync(asInteger(instance));

/**
 * Method asBytes of PlutusData
 *
 * @since 2.0.0
 * @category Methods
 */
export const asBytes: (
  instance: CML.PlutusData,
) => Effect.Effect<Uint8Array | undefined, PlutusDataError> = Effect.fn(
  (instance: CML.PlutusData) =>
    Effect.try({
      try: () => instance.as_bytes(),
      catch: () =>
        new PlutusDataError({
          message: `PlutusData.asBytes failed Hint: Check byte length and encoding.`,
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
  instance: CML.PlutusData,
): Uint8Array | undefined => Effect.runSync(asBytes(instance));
