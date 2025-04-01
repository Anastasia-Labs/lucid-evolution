/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML HardForkInitiationAction class
 *
 * @since 2.0.0
 * @category Types
 */
export type HardForkInitiationAction = CML.HardForkInitiationAction;

/**
 * Error class for HardForkInitiationAction operations
 *
 * This error is thrown when operations on HardForkInitiationAction instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class HardForkInitiationActionError extends Data.TaggedError(
  "HardForkInitiationActionError",
)<{
  message?: string;
}> {}

/**
 * Method free of HardForkInitiationAction
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.HardForkInitiationAction,
) => Effect.Effect<void, HardForkInitiationActionError> = Effect.fn(
  (instance: CML.HardForkInitiationAction) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.HardForkInitiationAction): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of HardForkInitiationAction
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (
  instance: CML.HardForkInitiationAction,
) => Effect.Effect<Uint8Array, HardForkInitiationActionError> = Effect.fn(
  (instance: CML.HardForkInitiationAction) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (
  instance: CML.HardForkInitiationAction,
): Uint8Array => Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of HardForkInitiationAction
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (
  instance: CML.HardForkInitiationAction,
) => Effect.Effect<Uint8Array, HardForkInitiationActionError> = Effect.fn(
  (instance: CML.HardForkInitiationAction) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (
  instance: CML.HardForkInitiationAction,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of HardForkInitiationAction
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<
  CML.HardForkInitiationAction,
  HardForkInitiationActionError
> = Effect.fn(function* (cborBytes: Uint8Array) {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (
  cborBytes: Uint8Array,
): CML.HardForkInitiationAction => Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of HardForkInitiationAction
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (
  instance: CML.HardForkInitiationAction,
) => Effect.Effect<string, HardForkInitiationActionError> = Effect.fn(
  (instance: CML.HardForkInitiationAction) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (
  instance: CML.HardForkInitiationAction,
): string => Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of HardForkInitiationAction
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (
  instance: CML.HardForkInitiationAction,
) => Effect.Effect<string, HardForkInitiationActionError> = Effect.fn(
  (instance: CML.HardForkInitiationAction) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (
  instance: CML.HardForkInitiationAction,
): string => Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of HardForkInitiationAction
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<
  CML.HardForkInitiationAction,
  HardForkInitiationActionError
> = Effect.fn(function* (cborBytes: string) {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (
  cborBytes: string,
): CML.HardForkInitiationAction => Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of HardForkInitiationAction
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (
  instance: CML.HardForkInitiationAction,
) => Effect.Effect<string, HardForkInitiationActionError> = Effect.fn(
  (instance: CML.HardForkInitiationAction) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.HardForkInitiationAction): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of HardForkInitiationAction
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (
  instance: CML.HardForkInitiationAction,
) => Effect.Effect<any, HardForkInitiationActionError> = Effect.fn(
  (instance: CML.HardForkInitiationAction) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.HardForkInitiationAction): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of HardForkInitiationAction
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (
  json: string,
) => Effect.Effect<
  CML.HardForkInitiationAction,
  HardForkInitiationActionError
> = Effect.fn(function* (json: string) {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.HardForkInitiationAction =>
  Effect.runSync(fromJson(json));

/**
 * Method actionId of HardForkInitiationAction
 *
 * @since 2.0.0
 * @category Methods
 */
export const actionId: (
  instance: CML.HardForkInitiationAction,
) => Effect.Effect<CML.GovActionId | undefined, HardForkInitiationActionError> =
  Effect.fn((instance: CML.HardForkInitiationAction) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const actionIdUnsafe = (
  instance: CML.HardForkInitiationAction,
): CML.GovActionId | undefined => Effect.runSync(actionId(instance));

/**
 * Method version of HardForkInitiationAction
 *
 * @since 2.0.0
 * @category Methods
 */
export const version: (
  instance: CML.HardForkInitiationAction,
) => Effect.Effect<CML.ProtocolVersion, HardForkInitiationActionError> =
  Effect.fn((instance: CML.HardForkInitiationAction) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const versionUnsafe = (
  instance: CML.HardForkInitiationAction,
): CML.ProtocolVersion => Effect.runSync(version(instance));

/**
 * Static method _new of HardForkInitiationAction
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (
  actionId: CML.GovActionId | undefined,
  version: CML.ProtocolVersion,
) => Effect.Effect<
  CML.HardForkInitiationAction,
  HardForkInitiationActionError
> = Effect.fn(function* (
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (
  actionId: CML.GovActionId | undefined,
  version: CML.ProtocolVersion,
): CML.HardForkInitiationAction => Effect.runSync(_new(actionId, version));
