/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML TreasuryWithdrawalsAction class
 *
 * @since 2.0.0
 * @category Types
 */
export type TreasuryWithdrawalsAction = CML.TreasuryWithdrawalsAction;

/**
 * Error class for TreasuryWithdrawalsAction operations
 *
 * This error is thrown when operations on TreasuryWithdrawalsAction instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class TreasuryWithdrawalsActionError extends Data.TaggedError(
  "TreasuryWithdrawalsActionError",
)<{
  message?: string;
}> {}

/**
 * Method free of TreasuryWithdrawalsAction
 *
 * @example
 * import { TreasuryWithdrawalsAction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TreasuryWithdrawalsAction instance
 * const instance = ... ;
 *   const result = yield* TreasuryWithdrawalsAction.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (
    instance: CML.TreasuryWithdrawalsAction,
  ): Effect.Effect<void, TreasuryWithdrawalsActionError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new TreasuryWithdrawalsActionError({
          message: `TreasuryWithdrawalsAction.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { TreasuryWithdrawalsAction } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TreasuryWithdrawalsAction instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TreasuryWithdrawalsAction.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TreasuryWithdrawalsAction.freeUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.TreasuryWithdrawalsAction): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of TreasuryWithdrawalsAction
 *
 * @example
 * import { TreasuryWithdrawalsAction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TreasuryWithdrawalsAction instance
 * const instance = ... ;
 *   const result = yield* TreasuryWithdrawalsAction.toCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (
    instance: CML.TreasuryWithdrawalsAction,
  ): Effect.Effect<Uint8Array, TreasuryWithdrawalsActionError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new TreasuryWithdrawalsActionError({
          message: `TreasuryWithdrawalsAction.toCborBytes failed TreasuryWithdrawalsAction is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @example
 * import { TreasuryWithdrawalsAction } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TreasuryWithdrawalsAction instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TreasuryWithdrawalsAction.toCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TreasuryWithdrawalsAction.toCborBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (
  instance: CML.TreasuryWithdrawalsAction,
): Uint8Array => Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of TreasuryWithdrawalsAction
 *
 * @example
 * import { TreasuryWithdrawalsAction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TreasuryWithdrawalsAction instance
 * const instance = ... ;
 *   const result = yield* TreasuryWithdrawalsAction.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (
    instance: CML.TreasuryWithdrawalsAction,
  ): Effect.Effect<Uint8Array, TreasuryWithdrawalsActionError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new TreasuryWithdrawalsActionError({
          message: `TreasuryWithdrawalsAction.toCanonicalCborBytes failed TreasuryWithdrawalsAction is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 *
 * @example
 * import { TreasuryWithdrawalsAction } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TreasuryWithdrawalsAction instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TreasuryWithdrawalsAction.toCanonicalCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TreasuryWithdrawalsAction.toCanonicalCborBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (
  instance: CML.TreasuryWithdrawalsAction,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of TreasuryWithdrawalsAction
 *
 * @example
 * import { TreasuryWithdrawalsAction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* TreasuryWithdrawalsAction.fromCborBytes( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.TreasuryWithdrawalsAction.from_cbor_bytes(cborBytes),
    catch: () =>
      new TreasuryWithdrawalsActionError({
        message: `TreasuryWithdrawalsAction.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls TreasuryWithdrawalsAction.fromCborBytes without Effect wrapper
 *
 * @example
 * import { TreasuryWithdrawalsAction } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TreasuryWithdrawalsAction.fromCborBytesUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TreasuryWithdrawalsAction.fromCborBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of TreasuryWithdrawalsAction
 *
 * @example
 * import { TreasuryWithdrawalsAction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TreasuryWithdrawalsAction instance
 * const instance = ... ;
 *   const result = yield* TreasuryWithdrawalsAction.toCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (
    instance: CML.TreasuryWithdrawalsAction,
  ): Effect.Effect<string, TreasuryWithdrawalsActionError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new TreasuryWithdrawalsActionError({
          message: `TreasuryWithdrawalsAction.toCborHex failed TreasuryWithdrawalsAction is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @example
 * import { TreasuryWithdrawalsAction } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TreasuryWithdrawalsAction instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TreasuryWithdrawalsAction.toCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TreasuryWithdrawalsAction.toCborHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (
  instance: CML.TreasuryWithdrawalsAction,
): string => Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of TreasuryWithdrawalsAction
 *
 * @example
 * import { TreasuryWithdrawalsAction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TreasuryWithdrawalsAction instance
 * const instance = ... ;
 *   const result = yield* TreasuryWithdrawalsAction.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (
    instance: CML.TreasuryWithdrawalsAction,
  ): Effect.Effect<string, TreasuryWithdrawalsActionError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new TreasuryWithdrawalsActionError({
          message: `TreasuryWithdrawalsAction.toCanonicalCborHex failed TreasuryWithdrawalsAction is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @example
 * import { TreasuryWithdrawalsAction } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TreasuryWithdrawalsAction instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TreasuryWithdrawalsAction.toCanonicalCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TreasuryWithdrawalsAction.toCanonicalCborHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (
  instance: CML.TreasuryWithdrawalsAction,
): string => Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of TreasuryWithdrawalsAction
 *
 * @example
 * import { TreasuryWithdrawalsAction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* TreasuryWithdrawalsAction.fromCborHex( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.TreasuryWithdrawalsAction.from_cbor_hex(cborBytes),
    catch: () =>
      new TreasuryWithdrawalsActionError({
        message: `TreasuryWithdrawalsAction.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls TreasuryWithdrawalsAction.fromCborHex without Effect wrapper
 *
 * @example
 * import { TreasuryWithdrawalsAction } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TreasuryWithdrawalsAction.fromCborHexUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TreasuryWithdrawalsAction.fromCborHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of TreasuryWithdrawalsAction
 *
 * @example
 * import { TreasuryWithdrawalsAction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TreasuryWithdrawalsAction instance
 * const instance = ... ;
 *   const result = yield* TreasuryWithdrawalsAction.toJson(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (
    instance: CML.TreasuryWithdrawalsAction,
  ): Effect.Effect<string, TreasuryWithdrawalsActionError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new TreasuryWithdrawalsActionError({
          message: `TreasuryWithdrawalsAction.toJson failed TreasuryWithdrawalsAction is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @example
 * import { TreasuryWithdrawalsAction } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TreasuryWithdrawalsAction instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TreasuryWithdrawalsAction.toJsonUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TreasuryWithdrawalsAction.toJsonUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.TreasuryWithdrawalsAction): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of TreasuryWithdrawalsAction
 *
 * @example
 * import { TreasuryWithdrawalsAction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TreasuryWithdrawalsAction instance
 * const instance = ... ;
 *   const result = yield* TreasuryWithdrawalsAction.toJsValue(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (
    instance: CML.TreasuryWithdrawalsAction,
  ): Effect.Effect<any, TreasuryWithdrawalsActionError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new TreasuryWithdrawalsActionError({
          message: `TreasuryWithdrawalsAction.toJsValue failed TreasuryWithdrawalsAction is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @example
 * import { TreasuryWithdrawalsAction } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TreasuryWithdrawalsAction instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TreasuryWithdrawalsAction.toJsValueUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TreasuryWithdrawalsAction.toJsValueUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.TreasuryWithdrawalsAction): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of TreasuryWithdrawalsAction
 *
 * @example
 * import { TreasuryWithdrawalsAction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* TreasuryWithdrawalsAction.fromJson( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.TreasuryWithdrawalsAction.from_json(json),
    catch: () =>
      new TreasuryWithdrawalsActionError({
        message: `TreasuryWithdrawalsAction.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls TreasuryWithdrawalsAction.fromJson without Effect wrapper
 *
 * @example
 * import { TreasuryWithdrawalsAction } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TreasuryWithdrawalsAction.fromJsonUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TreasuryWithdrawalsAction.fromJsonUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string) => Effect.runSync(fromJson(json));

/**
 * Method withdrawal of TreasuryWithdrawalsAction
 *
 * @example
 * import { TreasuryWithdrawalsAction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TreasuryWithdrawalsAction instance
 * const instance = ... ;
 *   const result = yield* TreasuryWithdrawalsAction.withdrawal(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const withdrawal = Effect.fn(
  (
    instance: CML.TreasuryWithdrawalsAction,
  ): Effect.Effect<
    CML.MapRewardAccountToCoin,
    TreasuryWithdrawalsActionError
  > =>
    Effect.try({
      try: () => instance.withdrawal(),
      catch: () =>
        new TreasuryWithdrawalsActionError({
          message: `TreasuryWithdrawalsAction.withdrawal failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.withdrawal without Effect wrapper
 *
 * @example
 * import { TreasuryWithdrawalsAction } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TreasuryWithdrawalsAction instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TreasuryWithdrawalsAction.withdrawalUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TreasuryWithdrawalsAction.withdrawalUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const withdrawalUnsafe = (
  instance: CML.TreasuryWithdrawalsAction,
): CML.MapRewardAccountToCoin => Effect.runSync(withdrawal(instance));

/**
 * Method policyHash of TreasuryWithdrawalsAction
 *
 * @example
 * import { TreasuryWithdrawalsAction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TreasuryWithdrawalsAction instance
 * const instance = ... ;
 *   const result = yield* TreasuryWithdrawalsAction.policyHash(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const policyHash = Effect.fn(
  (
    instance: CML.TreasuryWithdrawalsAction,
  ): Effect.Effect<
    CML.ScriptHash | undefined,
    TreasuryWithdrawalsActionError
  > =>
    Effect.try({
      try: () => instance.policy_hash(),
      catch: () =>
        new TreasuryWithdrawalsActionError({
          message: `TreasuryWithdrawalsAction.policyHash failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.policyHash without Effect wrapper
 *
 * @example
 * import { TreasuryWithdrawalsAction } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TreasuryWithdrawalsAction instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TreasuryWithdrawalsAction.policyHashUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TreasuryWithdrawalsAction.policyHashUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const policyHashUnsafe = (
  instance: CML.TreasuryWithdrawalsAction,
): CML.ScriptHash | undefined => Effect.runSync(policyHash(instance));

/**
 * Static method _new of TreasuryWithdrawalsAction
 *
 * @example
 * import { TreasuryWithdrawalsAction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* TreasuryWithdrawalsAction._new( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (
  withdrawal: CML.MapRewardAccountToCoin,
  policyHash: CML.ScriptHash,
) {
  return yield* Effect.try({
    try: () => CML.TreasuryWithdrawalsAction.new(withdrawal, policyHash),
    catch: () =>
      new TreasuryWithdrawalsActionError({
        message: `TreasuryWithdrawalsAction._new failed with parameters: ${withdrawal} (MapRewardAccountToCoin), ${policyHash} (ScriptHash). `,
      }),
  });
});

/**
 * Unsafely calls TreasuryWithdrawalsAction._new without Effect wrapper
 *
 * @example
 * import { TreasuryWithdrawalsAction } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TreasuryWithdrawalsAction._newUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TreasuryWithdrawalsAction._newUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (
  withdrawal: CML.MapRewardAccountToCoin,
  policyHash: CML.ScriptHash,
) => Effect.runSync(_new(withdrawal, policyHash));
