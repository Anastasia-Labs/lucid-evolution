/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML DatumOption class
 *
 * @since 2.0.0
 * @category Types
 */
export type DatumOption = CML.DatumOption;

/**
 * Error class for DatumOption operations
 *
 * This error is thrown when operations on DatumOption instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class DatumOptionError extends Data.TaggedError("DatumOptionError")<{
  message?: string;
}> {}

/**
 * Method free of DatumOption
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.DatumOption,
) => Effect.Effect<void, DatumOptionError> = Effect.fn(
  (instance: CML.DatumOption) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new DatumOptionError({
          message: `DatumOption.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.DatumOption): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of DatumOption
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (
  instance: CML.DatumOption,
) => Effect.Effect<Uint8Array, DatumOptionError> = Effect.fn(
  (instance: CML.DatumOption) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new DatumOptionError({
          message: `DatumOption.toCborBytes failed DatumOption is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.DatumOption): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of DatumOption
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (
  instance: CML.DatumOption,
) => Effect.Effect<Uint8Array, DatumOptionError> = Effect.fn(
  (instance: CML.DatumOption) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new DatumOptionError({
          message: `DatumOption.toCanonicalCborBytes failed DatumOption is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
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
  instance: CML.DatumOption,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of DatumOption
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.DatumOption, DatumOptionError> = Effect.fn(function* (
  cborBytes: Uint8Array,
) {
  return yield* Effect.try({
    try: () => CML.DatumOption.from_cbor_bytes(cborBytes),
    catch: () =>
      new DatumOptionError({
        message: `DatumOption.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls DatumOption.fromCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.DatumOption =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of DatumOption
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (
  instance: CML.DatumOption,
) => Effect.Effect<string, DatumOptionError> = Effect.fn(
  (instance: CML.DatumOption) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new DatumOptionError({
          message: `DatumOption.toCborHex failed DatumOption is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.DatumOption): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of DatumOption
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (
  instance: CML.DatumOption,
) => Effect.Effect<string, DatumOptionError> = Effect.fn(
  (instance: CML.DatumOption) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new DatumOptionError({
          message: `DatumOption.toCanonicalCborHex failed DatumOption is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.DatumOption): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of DatumOption
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.DatumOption, DatumOptionError> = Effect.fn(function* (
  cborBytes: string,
) {
  return yield* Effect.try({
    try: () => CML.DatumOption.from_cbor_hex(cborBytes),
    catch: () =>
      new DatumOptionError({
        message: `DatumOption.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls DatumOption.fromCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.DatumOption =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of DatumOption
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (
  instance: CML.DatumOption,
) => Effect.Effect<string, DatumOptionError> = Effect.fn(
  (instance: CML.DatumOption) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new DatumOptionError({
          message: `DatumOption.toJson failed DatumOption is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.DatumOption): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of DatumOption
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (
  instance: CML.DatumOption,
) => Effect.Effect<any, DatumOptionError> = Effect.fn(
  (instance: CML.DatumOption) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new DatumOptionError({
          message: `DatumOption.toJsValue failed DatumOption is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.DatumOption): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of DatumOption
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (
  json: string,
) => Effect.Effect<CML.DatumOption, DatumOptionError> = Effect.fn(function* (
  json: string,
) {
  return yield* Effect.try({
    try: () => CML.DatumOption.from_json(json),
    catch: () =>
      new DatumOptionError({
        message: `DatumOption.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls DatumOption.fromJson without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.DatumOption =>
  Effect.runSync(fromJson(json));

/**
 * Static method newHash of DatumOption
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newHash: (
  datumHash: CML.DatumHash,
) => Effect.Effect<CML.DatumOption, DatumOptionError> = Effect.fn(function* (
  datumHash: CML.DatumHash,
) {
  return yield* Effect.try({
    try: () => CML.DatumOption.new_hash(datumHash),
    catch: () =>
      new DatumOptionError({
        message: `DatumOption.newHash failed with parameters: ${datumHash} (DatumHash). `,
      }),
  });
});

/**
 * Unsafely calls DatumOption.newHash without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newHashUnsafe = (datumHash: CML.DatumHash): CML.DatumOption =>
  Effect.runSync(newHash(datumHash));

/**
 * Static method newDatum of DatumOption
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newDatum: (
  datum: CML.PlutusData,
) => Effect.Effect<CML.DatumOption, DatumOptionError> = Effect.fn(function* (
  datum: CML.PlutusData,
) {
  return yield* Effect.try({
    try: () => CML.DatumOption.new_datum(datum),
    catch: () =>
      new DatumOptionError({
        message: `DatumOption.newDatum failed with parameters: ${datum} (PlutusData). `,
      }),
  });
});

/**
 * Unsafely calls DatumOption.newDatum without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newDatumUnsafe = (datum: CML.PlutusData): CML.DatumOption =>
  Effect.runSync(newDatum(datum));

/**
 * Method kind of DatumOption
 *
 * @since 2.0.0
 * @category Methods
 */
export const kind: (
  instance: CML.DatumOption,
) => Effect.Effect<CML.DatumOptionKind, DatumOptionError> = Effect.fn(
  (instance: CML.DatumOption) =>
    Effect.try({
      try: () => instance.kind(),
      catch: () =>
        new DatumOptionError({
          message: `DatumOption.kind failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.kind without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const kindUnsafe = (instance: CML.DatumOption): CML.DatumOptionKind =>
  Effect.runSync(kind(instance));

/**
 * Method asHash of DatumOption
 *
 * @since 2.0.0
 * @category Methods
 */
export const asHash: (
  instance: CML.DatumOption,
) => Effect.Effect<CML.DatumHash | undefined, DatumOptionError> = Effect.fn(
  (instance: CML.DatumOption) =>
    Effect.try({
      try: () => instance.as_hash(),
      catch: () =>
        new DatumOptionError({
          message: `DatumOption.asHash failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.asHash without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asHashUnsafe = (
  instance: CML.DatumOption,
): CML.DatumHash | undefined => Effect.runSync(asHash(instance));

/**
 * Method asDatum of DatumOption
 *
 * @since 2.0.0
 * @category Methods
 */
export const asDatum: (
  instance: CML.DatumOption,
) => Effect.Effect<CML.PlutusData | undefined, DatumOptionError> = Effect.fn(
  (instance: CML.DatumOption) =>
    Effect.try({
      try: () => instance.as_datum(),
      catch: () =>
        new DatumOptionError({
          message: `DatumOption.asDatum failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.asDatum without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asDatumUnsafe = (
  instance: CML.DatumOption,
): CML.PlutusData | undefined => Effect.runSync(asDatum(instance));
