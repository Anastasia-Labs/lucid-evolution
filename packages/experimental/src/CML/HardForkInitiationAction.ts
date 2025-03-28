import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type HardForkInitiationAction = CML.HardForkInitiationAction;

export class HardForkInitiationActionError extends Data.TaggedError(
  "HardForkInitiationActionError",
)<{
  message?: string;
}> {}

/**
 * Method free of HardForkInitiationAction
 *
 * @example
 * import { HardForkInitiationAction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a HardForkInitiationAction instance
 * const instance = ... ;
 *   const result = yield* HardForkInitiationAction.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (
    instance: CML.HardForkInitiationAction,
  ): Effect.Effect<void, HardForkInitiationActionError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new HardForkInitiationActionError({
          message: `HardForkInitiationAction.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { HardForkInitiationAction } from "@lucid-evolution/experimental";
 *
 * // Assume we have a HardForkInitiationAction instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = HardForkInitiationAction.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`HardForkInitiationAction.unsafeFree failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.HardForkInitiationAction): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of HardForkInitiationAction
 *
 * @example
 * import { HardForkInitiationAction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a HardForkInitiationAction instance
 * const instance = ... ;
 *   const result = yield* HardForkInitiationAction.toCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (
    instance: CML.HardForkInitiationAction,
  ): Effect.Effect<Uint8Array, HardForkInitiationActionError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new HardForkInitiationActionError({
          message: `HardForkInitiationAction.toCborBytes failed HardForkInitiationAction is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @example
 * import { HardForkInitiationAction } from "@lucid-evolution/experimental";
 *
 * // Assume we have a HardForkInitiationAction instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = HardForkInitiationAction.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`HardForkInitiationAction.unsafeToCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (
  instance: CML.HardForkInitiationAction,
): Uint8Array => Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of HardForkInitiationAction
 *
 * @example
 * import { HardForkInitiationAction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a HardForkInitiationAction instance
 * const instance = ... ;
 *   const result = yield* HardForkInitiationAction.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (
    instance: CML.HardForkInitiationAction,
  ): Effect.Effect<Uint8Array, HardForkInitiationActionError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new HardForkInitiationActionError({
          message: `HardForkInitiationAction.toCanonicalCborBytes failed HardForkInitiationAction is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 *
 * @example
 * import { HardForkInitiationAction } from "@lucid-evolution/experimental";
 *
 * // Assume we have a HardForkInitiationAction instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = HardForkInitiationAction.unsafeToCanonicalCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`HardForkInitiationAction.unsafeToCanonicalCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborBytes = (
  instance: CML.HardForkInitiationAction,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of HardForkInitiationAction
 *
 * @example
 * import { HardForkInitiationAction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* HardForkInitiationAction.fromCborBytes( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.HardForkInitiationAction.from_cbor_bytes(cborBytes),
    catch: () =>
      new HardForkInitiationActionError({
        message: `HardForkInitiationAction.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls HardForkInitiationAction.fromCborBytes without Effect wrapper
 *
 * @example
 * import { HardForkInitiationAction } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = HardForkInitiationAction.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`HardForkInitiationAction.unsafeFromCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of HardForkInitiationAction
 *
 * @example
 * import { HardForkInitiationAction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a HardForkInitiationAction instance
 * const instance = ... ;
 *   const result = yield* HardForkInitiationAction.toCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (
    instance: CML.HardForkInitiationAction,
  ): Effect.Effect<string, HardForkInitiationActionError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new HardForkInitiationActionError({
          message: `HardForkInitiationAction.toCborHex failed HardForkInitiationAction is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @example
 * import { HardForkInitiationAction } from "@lucid-evolution/experimental";
 *
 * // Assume we have a HardForkInitiationAction instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = HardForkInitiationAction.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`HardForkInitiationAction.unsafeToCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (
  instance: CML.HardForkInitiationAction,
): string => Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of HardForkInitiationAction
 *
 * @example
 * import { HardForkInitiationAction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a HardForkInitiationAction instance
 * const instance = ... ;
 *   const result = yield* HardForkInitiationAction.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (
    instance: CML.HardForkInitiationAction,
  ): Effect.Effect<string, HardForkInitiationActionError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new HardForkInitiationActionError({
          message: `HardForkInitiationAction.toCanonicalCborHex failed HardForkInitiationAction is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @example
 * import { HardForkInitiationAction } from "@lucid-evolution/experimental";
 *
 * // Assume we have a HardForkInitiationAction instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = HardForkInitiationAction.unsafeToCanonicalCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`HardForkInitiationAction.unsafeToCanonicalCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborHex = (
  instance: CML.HardForkInitiationAction,
): string => Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of HardForkInitiationAction
 *
 * @example
 * import { HardForkInitiationAction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* HardForkInitiationAction.fromCborHex( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.HardForkInitiationAction.from_cbor_hex(cborBytes),
    catch: () =>
      new HardForkInitiationActionError({
        message: `HardForkInitiationAction.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls HardForkInitiationAction.fromCborHex without Effect wrapper
 *
 * @example
 * import { HardForkInitiationAction } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = HardForkInitiationAction.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`HardForkInitiationAction.unsafeFromCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of HardForkInitiationAction
 *
 * @example
 * import { HardForkInitiationAction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a HardForkInitiationAction instance
 * const instance = ... ;
 *   const result = yield* HardForkInitiationAction.toJson(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (
    instance: CML.HardForkInitiationAction,
  ): Effect.Effect<string, HardForkInitiationActionError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new HardForkInitiationActionError({
          message: `HardForkInitiationAction.toJson failed HardForkInitiationAction is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @example
 * import { HardForkInitiationAction } from "@lucid-evolution/experimental";
 *
 * // Assume we have a HardForkInitiationAction instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = HardForkInitiationAction.unsafeToJson(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`HardForkInitiationAction.unsafeToJson failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJson = (instance: CML.HardForkInitiationAction): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of HardForkInitiationAction
 *
 * @example
 * import { HardForkInitiationAction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a HardForkInitiationAction instance
 * const instance = ... ;
 *   const result = yield* HardForkInitiationAction.toJsValue(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (
    instance: CML.HardForkInitiationAction,
  ): Effect.Effect<any, HardForkInitiationActionError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new HardForkInitiationActionError({
          message: `HardForkInitiationAction.toJsValue failed HardForkInitiationAction is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @example
 * import { HardForkInitiationAction } from "@lucid-evolution/experimental";
 *
 * // Assume we have a HardForkInitiationAction instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = HardForkInitiationAction.unsafeToJsValue(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`HardForkInitiationAction.unsafeToJsValue failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJsValue = (instance: CML.HardForkInitiationAction): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of HardForkInitiationAction
 *
 * @example
 * import { HardForkInitiationAction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* HardForkInitiationAction.fromJson( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.HardForkInitiationAction.from_json(json),
    catch: () =>
      new HardForkInitiationActionError({
        message: `HardForkInitiationAction.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls HardForkInitiationAction.fromJson without Effect wrapper
 *
 * @example
 * import { HardForkInitiationAction } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = HardForkInitiationAction.unsafeFromJson( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`HardForkInitiationAction.unsafeFromJson failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromJson = (json: string) => Effect.runSync(fromJson(json));

/**
 * Method actionId of HardForkInitiationAction
 *
 * @example
 * import { HardForkInitiationAction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a HardForkInitiationAction instance
 * const instance = ... ;
 *   const result = yield* HardForkInitiationAction.actionId(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const actionId = Effect.fn(
  (
    instance: CML.HardForkInitiationAction,
  ): Effect.Effect<
    CML.GovActionId | undefined,
    HardForkInitiationActionError
  > =>
    Effect.try({
      try: () => instance.action_id(),
      catch: () =>
        new HardForkInitiationActionError({
          message: `HardForkInitiationAction.actionId failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.actionId without Effect wrapper
 *
 * @example
 * import { HardForkInitiationAction } from "@lucid-evolution/experimental";
 *
 * // Assume we have a HardForkInitiationAction instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = HardForkInitiationAction.unsafeActionId(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`HardForkInitiationAction.unsafeActionId failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeActionId = (
  instance: CML.HardForkInitiationAction,
): CML.GovActionId | undefined => Effect.runSync(actionId(instance));

/**
 * Method version of HardForkInitiationAction
 *
 * @example
 * import { HardForkInitiationAction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a HardForkInitiationAction instance
 * const instance = ... ;
 *   const result = yield* HardForkInitiationAction.version(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const version = Effect.fn(
  (
    instance: CML.HardForkInitiationAction,
  ): Effect.Effect<CML.ProtocolVersion, HardForkInitiationActionError> =>
    Effect.try({
      try: () => instance.version(),
      catch: () =>
        new HardForkInitiationActionError({
          message: `HardForkInitiationAction.version failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.version without Effect wrapper
 *
 * @example
 * import { HardForkInitiationAction } from "@lucid-evolution/experimental";
 *
 * // Assume we have a HardForkInitiationAction instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = HardForkInitiationAction.unsafeVersion(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`HardForkInitiationAction.unsafeVersion failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeVersion = (
  instance: CML.HardForkInitiationAction,
): CML.ProtocolVersion => Effect.runSync(version(instance));

/**
 * Static method _new of HardForkInitiationAction
 *
 * @example
 * import { HardForkInitiationAction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* HardForkInitiationAction._new( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (
  actionId: CML.GovActionId | undefined,
  version: CML.ProtocolVersion,
) {
  return yield* Effect.try({
    try: () => CML.HardForkInitiationAction.new(actionId, version),
    catch: () =>
      new HardForkInitiationActionError({
        message: `HardForkInitiationAction._new failed with parameters: ${actionId}, ${version} (ProtocolVersion). `,
      }),
  });
});

/**
 * Unsafely calls HardForkInitiationAction._new without Effect wrapper
 *
 * @example
 * import { HardForkInitiationAction } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = HardForkInitiationAction.unsafe_new( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`HardForkInitiationAction.unsafe_new failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = (
  actionId: CML.GovActionId | undefined,
  version: CML.ProtocolVersion,
) => Effect.runSync(_new(actionId, version));
