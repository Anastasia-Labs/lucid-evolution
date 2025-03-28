import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type StakeDeregistration = CML.StakeDeregistration;

export class StakeDeregistrationError extends Data.TaggedError("StakeDeregistrationError")<{
  message?: string;
}> {}

/**
 * Method free of StakeDeregistration
 * 
 * @example
 * import { StakeDeregistration } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a StakeDeregistration instance
 * const instance = ... ;
 *   const result = yield* StakeDeregistration.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.StakeDeregistration): Effect.Effect<void, StakeDeregistrationError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new StakeDeregistrationError({
          message: `StakeDeregistration.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { StakeDeregistration } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a StakeDeregistration instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = StakeDeregistration.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeDeregistration.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.StakeDeregistration): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of StakeDeregistration
 * 
 * @example
 * import { StakeDeregistration } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a StakeDeregistration instance
 * const instance = ... ;
 *   const result = yield* StakeDeregistration.toCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.StakeDeregistration): Effect.Effect<Uint8Array, StakeDeregistrationError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new StakeDeregistrationError({
          message: `StakeDeregistration.toCborBytes failed StakeDeregistration is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @example
 * import { StakeDeregistration } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a StakeDeregistration instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = StakeDeregistration.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeDeregistration.unsafeToCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (instance: CML.StakeDeregistration): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of StakeDeregistration
 * 
 * @example
 * import { StakeDeregistration } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a StakeDeregistration instance
 * const instance = ... ;
 *   const result = yield* StakeDeregistration.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.StakeDeregistration): Effect.Effect<Uint8Array, StakeDeregistrationError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new StakeDeregistrationError({
          message: `StakeDeregistration.toCanonicalCborBytes failed StakeDeregistration is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @example
 * import { StakeDeregistration } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a StakeDeregistration instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = StakeDeregistration.unsafeToCanonicalCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeDeregistration.unsafeToCanonicalCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborBytes = (instance: CML.StakeDeregistration): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of StakeDeregistration
 * 
 * @example
 * import { StakeDeregistration } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* StakeDeregistration.fromCborBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.StakeDeregistration.from_cbor_bytes(cborBytes),
    catch: () => new StakeDeregistrationError({
      message: `StakeDeregistration.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls StakeDeregistration.fromCborBytes without Effect wrapper
 * 
 * @example
 * import { StakeDeregistration } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = StakeDeregistration.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeDeregistration.unsafeFromCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of StakeDeregistration
 * 
 * @example
 * import { StakeDeregistration } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a StakeDeregistration instance
 * const instance = ... ;
 *   const result = yield* StakeDeregistration.toCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.StakeDeregistration): Effect.Effect<string, StakeDeregistrationError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new StakeDeregistrationError({
          message: `StakeDeregistration.toCborHex failed StakeDeregistration is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @example
 * import { StakeDeregistration } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a StakeDeregistration instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = StakeDeregistration.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeDeregistration.unsafeToCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (instance: CML.StakeDeregistration): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of StakeDeregistration
 * 
 * @example
 * import { StakeDeregistration } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a StakeDeregistration instance
 * const instance = ... ;
 *   const result = yield* StakeDeregistration.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.StakeDeregistration): Effect.Effect<string, StakeDeregistrationError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new StakeDeregistrationError({
          message: `StakeDeregistration.toCanonicalCborHex failed StakeDeregistration is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @example
 * import { StakeDeregistration } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a StakeDeregistration instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = StakeDeregistration.unsafeToCanonicalCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeDeregistration.unsafeToCanonicalCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborHex = (instance: CML.StakeDeregistration): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of StakeDeregistration
 * 
 * @example
 * import { StakeDeregistration } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* StakeDeregistration.fromCborHex( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.StakeDeregistration.from_cbor_hex(cborBytes),
    catch: () => new StakeDeregistrationError({
      message: `StakeDeregistration.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls StakeDeregistration.fromCborHex without Effect wrapper
 * 
 * @example
 * import { StakeDeregistration } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = StakeDeregistration.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeDeregistration.unsafeFromCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of StakeDeregistration
 * 
 * @example
 * import { StakeDeregistration } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a StakeDeregistration instance
 * const instance = ... ;
 *   const result = yield* StakeDeregistration.toJson(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.StakeDeregistration): Effect.Effect<string, StakeDeregistrationError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new StakeDeregistrationError({
          message: `StakeDeregistration.toJson failed StakeDeregistration is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @example
 * import { StakeDeregistration } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a StakeDeregistration instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = StakeDeregistration.unsafeToJson(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeDeregistration.unsafeToJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJson = (instance: CML.StakeDeregistration): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of StakeDeregistration
 * 
 * @example
 * import { StakeDeregistration } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a StakeDeregistration instance
 * const instance = ... ;
 *   const result = yield* StakeDeregistration.toJsValue(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.StakeDeregistration): Effect.Effect<any, StakeDeregistrationError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new StakeDeregistrationError({
          message: `StakeDeregistration.toJsValue failed StakeDeregistration is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @example
 * import { StakeDeregistration } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a StakeDeregistration instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = StakeDeregistration.unsafeToJsValue(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeDeregistration.unsafeToJsValue failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJsValue = (instance: CML.StakeDeregistration): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of StakeDeregistration
 * 
 * @example
 * import { StakeDeregistration } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* StakeDeregistration.fromJson( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.StakeDeregistration.from_json(json),
    catch: () => new StakeDeregistrationError({
      message: `StakeDeregistration.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls StakeDeregistration.fromJson without Effect wrapper
 * 
 * @example
 * import { StakeDeregistration } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = StakeDeregistration.unsafeFromJson( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeDeregistration.unsafeFromJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromJson = (json: string) =>
  Effect.runSync(fromJson(json));

/**
 * Method stakeCredential of StakeDeregistration
 * 
 * @example
 * import { StakeDeregistration } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a StakeDeregistration instance
 * const instance = ... ;
 *   const result = yield* StakeDeregistration.stakeCredential(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const stakeCredential = Effect.fn(
  (instance: CML.StakeDeregistration): Effect.Effect<CML.Credential, StakeDeregistrationError> =>
    Effect.try({
      try: () => instance.stake_credential(),
      catch: () =>
        new StakeDeregistrationError({
          message: `StakeDeregistration.stakeCredential failed `,
        }),
    })
);

/**
 * Unsafely calls instance.stakeCredential without Effect wrapper
 * 
 * @example
 * import { StakeDeregistration } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a StakeDeregistration instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = StakeDeregistration.unsafeStakeCredential(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeDeregistration.unsafeStakeCredential failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeStakeCredential = (instance: CML.StakeDeregistration): CML.Credential =>
  Effect.runSync(stakeCredential(instance));

/**
 * Static method _new of StakeDeregistration
 * 
 * @example
 * import { StakeDeregistration } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* StakeDeregistration._new( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (stakeCredential: CML.Credential) {
  return yield* Effect.try({
    try: () => CML.StakeDeregistration.new(stakeCredential),
    catch: () => new StakeDeregistrationError({
      message: `StakeDeregistration._new failed with parameters: ${stakeCredential} (Credential). `,
    }),
  });
});

/**
 * Unsafely calls StakeDeregistration._new without Effect wrapper
 * 
 * @example
 * import { StakeDeregistration } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = StakeDeregistration.unsafe_new( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeDeregistration.unsafe_new failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = (stakeCredential: CML.Credential) =>
  Effect.runSync(_new(stakeCredential));
