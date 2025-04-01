/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML Int class
 *
 * @since 2.0.0
 * @category Types
 */
export type Int = CML.Int;

/**
 * Error class for Int operations
 * 
 * This error is thrown when operations on Int instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class IntError extends Data.TaggedError("IntError")<{
  message?: string;
}> {}

/**
 * Method free of Int
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.Int) => Effect.Effect<void, IntError> = Effect.fn(
  (instance: CML.Int) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new IntError({
          message: `Int.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.Int): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of Int
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (instance: CML.Int) => Effect.Effect<Uint8Array, IntError> = Effect.fn(
  (instance: CML.Int) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new IntError({
          message: `Int.toCborBytes failed Int is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.Int): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Static method fromCborBytes of Int
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (cborBytes: Uint8Array) => Effect.Effect<CML.Int, IntError> = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.Int.from_cbor_bytes(cborBytes),
    catch: () => new IntError({
      message: `Int.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls Int.fromCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.Int =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toJson of Int
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (instance: CML.Int) => Effect.Effect<string, IntError> = Effect.fn(
  (instance: CML.Int) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new IntError({
          message: `Int.toJson failed Int is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.Int): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsonValue of Int
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsonValue: (instance: CML.Int) => Effect.Effect<any, IntError> = Effect.fn(
  (instance: CML.Int) =>
    Effect.try({
      try: () => instance.to_json_value(),
      catch: () =>
        new IntError({
          message: `Int.toJsonValue failed Int is not valid for any conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJsonValue without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonValueUnsafe = (instance: CML.Int): any =>
  Effect.runSync(toJsonValue(instance));

/**
 * Static method fromJson of Int
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (json: string) => Effect.Effect<CML.Int, IntError> = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.Int.from_json(json),
    catch: () => new IntError({
      message: `Int.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls Int.fromJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.Int =>
  Effect.runSync(fromJson(json));

/**
 * Static method _new of Int
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (x: bigint) => Effect.Effect<CML.Int, IntError> = Effect.fn(function* (x: bigint) {
  return yield* Effect.try({
    try: () => CML.Int.new(x),
    catch: () => new IntError({
      message: `Int._new failed with parameters: ${x}. `,
    }),
  });
});

/**
 * Unsafely calls Int._new without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (x: bigint): CML.Int =>
  Effect.runSync(_new(x));

/**
 * Method toStr of Int
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toStr: (instance: CML.Int) => Effect.Effect<string, IntError> = Effect.fn(
  (instance: CML.Int) =>
    Effect.try({
      try: () => instance.to_str(),
      catch: () =>
        new IntError({
          message: `Int.toStr failed Int is not valid for string conversion. Hint: Not all Int instances can be stringified.`,
        }),
    })
);

/**
 * Unsafely calls instance.toStr without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toStrUnsafe = (instance: CML.Int): string =>
  Effect.runSync(toStr(instance));

/**
 * Static method fromStr of Int
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromStr: (string: string) => Effect.Effect<CML.Int, IntError> = Effect.fn(function* (string: string) {
  return yield* Effect.try({
    try: () => CML.Int.from_str(string),
    catch: () => new IntError({
      message: `Int.fromStr failed with parameters: ${string}. Hint: Not all Int instances can be stringified.`,
    }),
  });
});

/**
 * Unsafely calls Int.fromStr without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromStrUnsafe = (string: string): CML.Int =>
  Effect.runSync(fromStr(string));
