/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML LegacyRedeemer class
 *
 * @since 2.0.0
 * @category Types
 */
export type LegacyRedeemer = CML.LegacyRedeemer;

/**
 * Error class for LegacyRedeemer operations
 * 
 * This error is thrown when operations on LegacyRedeemer instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class LegacyRedeemerError extends Data.TaggedError("LegacyRedeemerError")<{
  message?: string;
}> {}

/**
 * Method free of LegacyRedeemer
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.LegacyRedeemer) => Effect.Effect<void, LegacyRedeemerError> = Effect.fn(
  (instance: CML.LegacyRedeemer) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new LegacyRedeemerError({
          message: `LegacyRedeemer.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.LegacyRedeemer): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of LegacyRedeemer
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (instance: CML.LegacyRedeemer) => Effect.Effect<Uint8Array, LegacyRedeemerError> = Effect.fn(
  (instance: CML.LegacyRedeemer) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new LegacyRedeemerError({
          message: `LegacyRedeemer.toCborBytes failed LegacyRedeemer is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.LegacyRedeemer): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of LegacyRedeemer
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (instance: CML.LegacyRedeemer) => Effect.Effect<Uint8Array, LegacyRedeemerError> = Effect.fn(
  (instance: CML.LegacyRedeemer) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new LegacyRedeemerError({
          message: `LegacyRedeemer.toCanonicalCborBytes failed LegacyRedeemer is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (instance: CML.LegacyRedeemer): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of LegacyRedeemer
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (cborBytes: Uint8Array) => Effect.Effect<CML.LegacyRedeemer, LegacyRedeemerError> = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.LegacyRedeemer.from_cbor_bytes(cborBytes),
    catch: () => new LegacyRedeemerError({
      message: `LegacyRedeemer.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls LegacyRedeemer.fromCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.LegacyRedeemer =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of LegacyRedeemer
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (instance: CML.LegacyRedeemer) => Effect.Effect<string, LegacyRedeemerError> = Effect.fn(
  (instance: CML.LegacyRedeemer) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new LegacyRedeemerError({
          message: `LegacyRedeemer.toCborHex failed LegacyRedeemer is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.LegacyRedeemer): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of LegacyRedeemer
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (instance: CML.LegacyRedeemer) => Effect.Effect<string, LegacyRedeemerError> = Effect.fn(
  (instance: CML.LegacyRedeemer) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new LegacyRedeemerError({
          message: `LegacyRedeemer.toCanonicalCborHex failed LegacyRedeemer is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.LegacyRedeemer): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of LegacyRedeemer
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (cborBytes: string) => Effect.Effect<CML.LegacyRedeemer, LegacyRedeemerError> = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.LegacyRedeemer.from_cbor_hex(cborBytes),
    catch: () => new LegacyRedeemerError({
      message: `LegacyRedeemer.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls LegacyRedeemer.fromCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.LegacyRedeemer =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of LegacyRedeemer
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (instance: CML.LegacyRedeemer) => Effect.Effect<string, LegacyRedeemerError> = Effect.fn(
  (instance: CML.LegacyRedeemer) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new LegacyRedeemerError({
          message: `LegacyRedeemer.toJson failed LegacyRedeemer is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.LegacyRedeemer): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of LegacyRedeemer
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (instance: CML.LegacyRedeemer) => Effect.Effect<any, LegacyRedeemerError> = Effect.fn(
  (instance: CML.LegacyRedeemer) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new LegacyRedeemerError({
          message: `LegacyRedeemer.toJsValue failed LegacyRedeemer is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.LegacyRedeemer): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of LegacyRedeemer
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (json: string) => Effect.Effect<CML.LegacyRedeemer, LegacyRedeemerError> = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.LegacyRedeemer.from_json(json),
    catch: () => new LegacyRedeemerError({
      message: `LegacyRedeemer.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls LegacyRedeemer.fromJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.LegacyRedeemer =>
  Effect.runSync(fromJson(json));

/**
 * Method tag of LegacyRedeemer
 * 
 * @since 2.0.0
 * @category Methods
 */
export const tag: (instance: CML.LegacyRedeemer) => Effect.Effect<CML.RedeemerTag, LegacyRedeemerError> = Effect.fn(
  (instance: CML.LegacyRedeemer) =>
    Effect.try({
      try: () => instance.tag(),
      catch: () =>
        new LegacyRedeemerError({
          message: `LegacyRedeemer.tag failed `,
        }),
    })
);

/**
 * Unsafely calls instance.tag without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const tagUnsafe = (instance: CML.LegacyRedeemer): CML.RedeemerTag =>
  Effect.runSync(tag(instance));

/**
 * Method index of LegacyRedeemer
 * 
 * @since 2.0.0
 * @category Methods
 */
export const index: (instance: CML.LegacyRedeemer) => Effect.Effect<bigint, LegacyRedeemerError> = Effect.fn(
  (instance: CML.LegacyRedeemer) =>
    Effect.try({
      try: () => instance.index(),
      catch: () =>
        new LegacyRedeemerError({
          message: `LegacyRedeemer.index failed `,
        }),
    })
);

/**
 * Unsafely calls instance.index without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const indexUnsafe = (instance: CML.LegacyRedeemer): bigint =>
  Effect.runSync(index(instance));

/**
 * Method data of LegacyRedeemer
 * 
 * @since 2.0.0
 * @category Methods
 */
export const data: (instance: CML.LegacyRedeemer) => Effect.Effect<CML.PlutusData, LegacyRedeemerError> = Effect.fn(
  (instance: CML.LegacyRedeemer) =>
    Effect.try({
      try: () => instance.data(),
      catch: () =>
        new LegacyRedeemerError({
          message: `LegacyRedeemer.data failed `,
        }),
    })
);

/**
 * Unsafely calls instance.data without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const dataUnsafe = (instance: CML.LegacyRedeemer): CML.PlutusData =>
  Effect.runSync(data(instance));

/**
 * Method exUnits of LegacyRedeemer
 * 
 * @since 2.0.0
 * @category Methods
 */
export const exUnits: (instance: CML.LegacyRedeemer) => Effect.Effect<CML.ExUnits, LegacyRedeemerError> = Effect.fn(
  (instance: CML.LegacyRedeemer) =>
    Effect.try({
      try: () => instance.ex_units(),
      catch: () =>
        new LegacyRedeemerError({
          message: `LegacyRedeemer.exUnits failed `,
        }),
    })
);

/**
 * Unsafely calls instance.exUnits without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const exUnitsUnsafe = (instance: CML.LegacyRedeemer): CML.ExUnits =>
  Effect.runSync(exUnits(instance));

/**
 * Static method _new of LegacyRedeemer
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (tag: CML.RedeemerTag, index: bigint, data: CML.PlutusData, exUnits: CML.ExUnits) => Effect.Effect<CML.LegacyRedeemer, LegacyRedeemerError> = Effect.fn(function* (tag: CML.RedeemerTag, index: bigint, data: CML.PlutusData, exUnits: CML.ExUnits) {
  return yield* Effect.try({
    try: () => CML.LegacyRedeemer.new(tag, index, data, exUnits),
    catch: () => new LegacyRedeemerError({
      message: `LegacyRedeemer._new failed with parameters: ${tag} (RedeemerTag), ${index}, ${data} (PlutusData), ${exUnits} (ExUnits). `,
    }),
  });
});

/**
 * Unsafely calls LegacyRedeemer._new without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (tag: CML.RedeemerTag, index: bigint, data: CML.PlutusData, exUnits: CML.ExUnits): CML.LegacyRedeemer =>
  Effect.runSync(_new(tag, index, data, exUnits));
