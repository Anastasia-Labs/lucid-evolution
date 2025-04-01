/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML ExUnits class
 *
 * @since 2.0.0
 * @category Types
 */
export type ExUnits = CML.ExUnits;

/**
 * Error class for ExUnits operations
 * 
 * This error is thrown when operations on ExUnits instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class ExUnitsError extends Data.TaggedError("ExUnitsError")<{
  message?: string;
}> {}

/**
 * Method free of ExUnits
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.ExUnits) => Effect.Effect<void, ExUnitsError> = Effect.fn(
  (instance: CML.ExUnits) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new ExUnitsError({
          message: `ExUnits.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.ExUnits): void =>
  Effect.runSync(free(instance));

/**
 * Method checkedAdd of ExUnits
 * 
 * @since 2.0.0
 * @category Methods
 */
export const checkedAdd: (instance: CML.ExUnits, other: CML.ExUnits) => Effect.Effect<CML.ExUnits, ExUnitsError> = Effect.fn(
  (instance: CML.ExUnits, other: CML.ExUnits) =>
    Effect.try({
      try: () => instance.checked_add(other),
      catch: () =>
        new ExUnitsError({
          message: `ExUnits.checkedAdd failed with parameters: ${other} (ExUnits). `,
        }),
    })
);

/**
 * Unsafely calls instance.checkedAdd without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const checkedAddUnsafe = (instance: CML.ExUnits, other: CML.ExUnits): CML.ExUnits =>
  Effect.runSync(checkedAdd(instance, other));

/**
 * Method toCborBytes of ExUnits
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (instance: CML.ExUnits) => Effect.Effect<Uint8Array, ExUnitsError> = Effect.fn(
  (instance: CML.ExUnits) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new ExUnitsError({
          message: `ExUnits.toCborBytes failed ExUnits is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.ExUnits): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of ExUnits
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (instance: CML.ExUnits) => Effect.Effect<Uint8Array, ExUnitsError> = Effect.fn(
  (instance: CML.ExUnits) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new ExUnitsError({
          message: `ExUnits.toCanonicalCborBytes failed ExUnits is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (instance: CML.ExUnits): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of ExUnits
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (cborBytes: Uint8Array) => Effect.Effect<CML.ExUnits, ExUnitsError> = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.ExUnits.from_cbor_bytes(cborBytes),
    catch: () => new ExUnitsError({
      message: `ExUnits.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls ExUnits.fromCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.ExUnits =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of ExUnits
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (instance: CML.ExUnits) => Effect.Effect<string, ExUnitsError> = Effect.fn(
  (instance: CML.ExUnits) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new ExUnitsError({
          message: `ExUnits.toCborHex failed ExUnits is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.ExUnits): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of ExUnits
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (instance: CML.ExUnits) => Effect.Effect<string, ExUnitsError> = Effect.fn(
  (instance: CML.ExUnits) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new ExUnitsError({
          message: `ExUnits.toCanonicalCborHex failed ExUnits is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.ExUnits): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of ExUnits
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (cborBytes: string) => Effect.Effect<CML.ExUnits, ExUnitsError> = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.ExUnits.from_cbor_hex(cborBytes),
    catch: () => new ExUnitsError({
      message: `ExUnits.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls ExUnits.fromCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.ExUnits =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of ExUnits
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (instance: CML.ExUnits) => Effect.Effect<string, ExUnitsError> = Effect.fn(
  (instance: CML.ExUnits) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new ExUnitsError({
          message: `ExUnits.toJson failed ExUnits is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.ExUnits): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of ExUnits
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (instance: CML.ExUnits) => Effect.Effect<any, ExUnitsError> = Effect.fn(
  (instance: CML.ExUnits) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new ExUnitsError({
          message: `ExUnits.toJsValue failed ExUnits is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.ExUnits): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of ExUnits
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (json: string) => Effect.Effect<CML.ExUnits, ExUnitsError> = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.ExUnits.from_json(json),
    catch: () => new ExUnitsError({
      message: `ExUnits.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls ExUnits.fromJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.ExUnits =>
  Effect.runSync(fromJson(json));

/**
 * Method mem of ExUnits
 * 
 * @since 2.0.0
 * @category Methods
 */
export const mem: (instance: CML.ExUnits) => Effect.Effect<bigint, ExUnitsError> = Effect.fn(
  (instance: CML.ExUnits) =>
    Effect.try({
      try: () => instance.mem(),
      catch: () =>
        new ExUnitsError({
          message: `ExUnits.mem failed `,
        }),
    })
);

/**
 * Unsafely calls instance.mem without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const memUnsafe = (instance: CML.ExUnits): bigint =>
  Effect.runSync(mem(instance));

/**
 * Method steps of ExUnits
 * 
 * @since 2.0.0
 * @category Methods
 */
export const steps: (instance: CML.ExUnits) => Effect.Effect<bigint, ExUnitsError> = Effect.fn(
  (instance: CML.ExUnits) =>
    Effect.try({
      try: () => instance.steps(),
      catch: () =>
        new ExUnitsError({
          message: `ExUnits.steps failed `,
        }),
    })
);

/**
 * Unsafely calls instance.steps without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const stepsUnsafe = (instance: CML.ExUnits): bigint =>
  Effect.runSync(steps(instance));

/**
 * Static method _new of ExUnits
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (mem: bigint, steps: bigint) => Effect.Effect<CML.ExUnits, ExUnitsError> = Effect.fn(function* (mem: bigint, steps: bigint) {
  return yield* Effect.try({
    try: () => CML.ExUnits.new(mem, steps),
    catch: () => new ExUnitsError({
      message: `ExUnits._new failed with parameters: ${mem}, ${steps}. `,
    }),
  });
});

/**
 * Unsafely calls ExUnits._new without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (mem: bigint, steps: bigint): CML.ExUnits =>
  Effect.runSync(_new(mem, steps));
