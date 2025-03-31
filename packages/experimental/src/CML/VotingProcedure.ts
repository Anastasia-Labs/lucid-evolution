/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML VotingProcedure class
 *
 * @since 2.0.0
 * @category Types
 */
export type VotingProcedure = CML.VotingProcedure;

/**
 * Error class for VotingProcedure operations
 * 
 * This error is thrown when operations on VotingProcedure instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class VotingProcedureError extends Data.TaggedError("VotingProcedureError")<{
  message?: string;
}> {}

/**
 * Method free of VotingProcedure
 * 
 * @example
 * import { VotingProcedure } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a VotingProcedure instance
 * const instance = ... ;
 *   const result = yield* VotingProcedure.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.VotingProcedure): Effect.Effect<void, VotingProcedureError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new VotingProcedureError({
          message: `VotingProcedure.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { VotingProcedure } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a VotingProcedure instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = VotingProcedure.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VotingProcedure.freeUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.VotingProcedure): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of VotingProcedure
 * 
 * @example
 * import { VotingProcedure } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a VotingProcedure instance
 * const instance = ... ;
 *   const result = yield* VotingProcedure.toCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.VotingProcedure): Effect.Effect<Uint8Array, VotingProcedureError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new VotingProcedureError({
          message: `VotingProcedure.toCborBytes failed VotingProcedure is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @example
 * import { VotingProcedure } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a VotingProcedure instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = VotingProcedure.toCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VotingProcedure.toCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.VotingProcedure): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of VotingProcedure
 * 
 * @example
 * import { VotingProcedure } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a VotingProcedure instance
 * const instance = ... ;
 *   const result = yield* VotingProcedure.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.VotingProcedure): Effect.Effect<Uint8Array, VotingProcedureError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new VotingProcedureError({
          message: `VotingProcedure.toCanonicalCborBytes failed VotingProcedure is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @example
 * import { VotingProcedure } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a VotingProcedure instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = VotingProcedure.toCanonicalCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VotingProcedure.toCanonicalCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (instance: CML.VotingProcedure): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of VotingProcedure
 * 
 * @example
 * import { VotingProcedure } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* VotingProcedure.fromCborBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.VotingProcedure.from_cbor_bytes(cborBytes),
    catch: () => new VotingProcedureError({
      message: `VotingProcedure.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls VotingProcedure.fromCborBytes without Effect wrapper
 * 
 * @example
 * import { VotingProcedure } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = VotingProcedure.fromCborBytesUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VotingProcedure.fromCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of VotingProcedure
 * 
 * @example
 * import { VotingProcedure } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a VotingProcedure instance
 * const instance = ... ;
 *   const result = yield* VotingProcedure.toCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.VotingProcedure): Effect.Effect<string, VotingProcedureError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new VotingProcedureError({
          message: `VotingProcedure.toCborHex failed VotingProcedure is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @example
 * import { VotingProcedure } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a VotingProcedure instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = VotingProcedure.toCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VotingProcedure.toCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.VotingProcedure): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of VotingProcedure
 * 
 * @example
 * import { VotingProcedure } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a VotingProcedure instance
 * const instance = ... ;
 *   const result = yield* VotingProcedure.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.VotingProcedure): Effect.Effect<string, VotingProcedureError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new VotingProcedureError({
          message: `VotingProcedure.toCanonicalCborHex failed VotingProcedure is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @example
 * import { VotingProcedure } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a VotingProcedure instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = VotingProcedure.toCanonicalCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VotingProcedure.toCanonicalCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.VotingProcedure): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of VotingProcedure
 * 
 * @example
 * import { VotingProcedure } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* VotingProcedure.fromCborHex( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.VotingProcedure.from_cbor_hex(cborBytes),
    catch: () => new VotingProcedureError({
      message: `VotingProcedure.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls VotingProcedure.fromCborHex without Effect wrapper
 * 
 * @example
 * import { VotingProcedure } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = VotingProcedure.fromCborHexUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VotingProcedure.fromCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of VotingProcedure
 * 
 * @example
 * import { VotingProcedure } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a VotingProcedure instance
 * const instance = ... ;
 *   const result = yield* VotingProcedure.toJson(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.VotingProcedure): Effect.Effect<string, VotingProcedureError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new VotingProcedureError({
          message: `VotingProcedure.toJson failed VotingProcedure is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @example
 * import { VotingProcedure } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a VotingProcedure instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = VotingProcedure.toJsonUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VotingProcedure.toJsonUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.VotingProcedure): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of VotingProcedure
 * 
 * @example
 * import { VotingProcedure } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a VotingProcedure instance
 * const instance = ... ;
 *   const result = yield* VotingProcedure.toJsValue(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.VotingProcedure): Effect.Effect<any, VotingProcedureError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new VotingProcedureError({
          message: `VotingProcedure.toJsValue failed VotingProcedure is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @example
 * import { VotingProcedure } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a VotingProcedure instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = VotingProcedure.toJsValueUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VotingProcedure.toJsValueUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.VotingProcedure): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of VotingProcedure
 * 
 * @example
 * import { VotingProcedure } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* VotingProcedure.fromJson( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.VotingProcedure.from_json(json),
    catch: () => new VotingProcedureError({
      message: `VotingProcedure.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls VotingProcedure.fromJson without Effect wrapper
 * 
 * @example
 * import { VotingProcedure } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = VotingProcedure.fromJsonUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VotingProcedure.fromJsonUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string) =>
  Effect.runSync(fromJson(json));

/**
 * Method vote of VotingProcedure
 * 
 * @example
 * import { VotingProcedure } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a VotingProcedure instance
 * const instance = ... ;
 *   const result = yield* VotingProcedure.vote(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const vote = Effect.fn(
  (instance: CML.VotingProcedure): Effect.Effect<CML.Vote, VotingProcedureError> =>
    Effect.try({
      try: () => instance.vote(),
      catch: () =>
        new VotingProcedureError({
          message: `VotingProcedure.vote failed `,
        }),
    })
);

/**
 * Unsafely calls instance.vote without Effect wrapper
 * 
 * @example
 * import { VotingProcedure } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a VotingProcedure instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = VotingProcedure.voteUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VotingProcedure.voteUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const voteUnsafe = (instance: CML.VotingProcedure): CML.Vote =>
  Effect.runSync(vote(instance));

/**
 * Method anchor of VotingProcedure
 * 
 * @example
 * import { VotingProcedure } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a VotingProcedure instance
 * const instance = ... ;
 *   const result = yield* VotingProcedure.anchor(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const anchor = Effect.fn(
  (instance: CML.VotingProcedure): Effect.Effect<CML.Anchor | undefined, VotingProcedureError> =>
    Effect.try({
      try: () => instance.anchor(),
      catch: () =>
        new VotingProcedureError({
          message: `VotingProcedure.anchor failed `,
        }),
    })
);

/**
 * Unsafely calls instance.anchor without Effect wrapper
 * 
 * @example
 * import { VotingProcedure } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a VotingProcedure instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = VotingProcedure.anchorUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VotingProcedure.anchorUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const anchorUnsafe = (instance: CML.VotingProcedure): CML.Anchor | undefined =>
  Effect.runSync(anchor(instance));

/**
 * Static method _new of VotingProcedure
 * 
 * @example
 * import { VotingProcedure } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* VotingProcedure._new( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (vote: CML.Vote, anchor: CML.Anchor) {
  return yield* Effect.try({
    try: () => CML.VotingProcedure.new(vote, anchor),
    catch: () => new VotingProcedureError({
      message: `VotingProcedure._new failed with parameters: ${vote} (Vote), ${anchor} (Anchor). `,
    }),
  });
});

/**
 * Unsafely calls VotingProcedure._new without Effect wrapper
 * 
 * @example
 * import { VotingProcedure } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = VotingProcedure._newUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VotingProcedure._newUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (vote: CML.Vote, anchor: CML.Anchor) =>
  Effect.runSync(_new(vote, anchor));
