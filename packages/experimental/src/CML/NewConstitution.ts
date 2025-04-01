/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML NewConstitution class
 *
 * @since 2.0.0
 * @category Types
 */
export type NewConstitution = CML.NewConstitution;

/**
 * Error class for NewConstitution operations
 * 
 * This error is thrown when operations on NewConstitution instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class NewConstitutionError extends Data.TaggedError("NewConstitutionError")<{
  message?: string;
}> {}

/**
 * Method free of NewConstitution
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.NewConstitution) => Effect.Effect<void, NewConstitutionError> = Effect.fn(
  (instance: CML.NewConstitution) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new NewConstitutionError({
          message: `NewConstitution.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.NewConstitution): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of NewConstitution
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (instance: CML.NewConstitution) => Effect.Effect<Uint8Array, NewConstitutionError> = Effect.fn(
  (instance: CML.NewConstitution) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new NewConstitutionError({
          message: `NewConstitution.toCborBytes failed NewConstitution is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.NewConstitution): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of NewConstitution
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (instance: CML.NewConstitution) => Effect.Effect<Uint8Array, NewConstitutionError> = Effect.fn(
  (instance: CML.NewConstitution) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new NewConstitutionError({
          message: `NewConstitution.toCanonicalCborBytes failed NewConstitution is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (instance: CML.NewConstitution): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of NewConstitution
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (cborBytes: Uint8Array) => Effect.Effect<CML.NewConstitution, NewConstitutionError> = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.NewConstitution.from_cbor_bytes(cborBytes),
    catch: () => new NewConstitutionError({
      message: `NewConstitution.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls NewConstitution.fromCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.NewConstitution =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of NewConstitution
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (instance: CML.NewConstitution) => Effect.Effect<string, NewConstitutionError> = Effect.fn(
  (instance: CML.NewConstitution) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new NewConstitutionError({
          message: `NewConstitution.toCborHex failed NewConstitution is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.NewConstitution): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of NewConstitution
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (instance: CML.NewConstitution) => Effect.Effect<string, NewConstitutionError> = Effect.fn(
  (instance: CML.NewConstitution) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new NewConstitutionError({
          message: `NewConstitution.toCanonicalCborHex failed NewConstitution is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.NewConstitution): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of NewConstitution
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (cborBytes: string) => Effect.Effect<CML.NewConstitution, NewConstitutionError> = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.NewConstitution.from_cbor_hex(cborBytes),
    catch: () => new NewConstitutionError({
      message: `NewConstitution.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls NewConstitution.fromCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.NewConstitution =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of NewConstitution
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (instance: CML.NewConstitution) => Effect.Effect<string, NewConstitutionError> = Effect.fn(
  (instance: CML.NewConstitution) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new NewConstitutionError({
          message: `NewConstitution.toJson failed NewConstitution is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.NewConstitution): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of NewConstitution
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (instance: CML.NewConstitution) => Effect.Effect<any, NewConstitutionError> = Effect.fn(
  (instance: CML.NewConstitution) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new NewConstitutionError({
          message: `NewConstitution.toJsValue failed NewConstitution is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.NewConstitution): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of NewConstitution
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (json: string) => Effect.Effect<CML.NewConstitution, NewConstitutionError> = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.NewConstitution.from_json(json),
    catch: () => new NewConstitutionError({
      message: `NewConstitution.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls NewConstitution.fromJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.NewConstitution =>
  Effect.runSync(fromJson(json));

/**
 * Method actionId of NewConstitution
 * 
 * @since 2.0.0
 * @category Methods
 */
export const actionId: (instance: CML.NewConstitution) => Effect.Effect<CML.GovActionId | undefined, NewConstitutionError> = Effect.fn(
  (instance: CML.NewConstitution) =>
    Effect.try({
      try: () => instance.action_id(),
      catch: () =>
        new NewConstitutionError({
          message: `NewConstitution.actionId failed `,
        }),
    })
);

/**
 * Unsafely calls instance.actionId without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const actionIdUnsafe = (instance: CML.NewConstitution): CML.GovActionId | undefined =>
  Effect.runSync(actionId(instance));

/**
 * Method constitution of NewConstitution
 * 
 * @since 2.0.0
 * @category Methods
 */
export const constitution: (instance: CML.NewConstitution) => Effect.Effect<CML.Constitution, NewConstitutionError> = Effect.fn(
  (instance: CML.NewConstitution) =>
    Effect.try({
      try: () => instance.constitution(),
      catch: () =>
        new NewConstitutionError({
          message: `NewConstitution.constitution failed `,
        }),
    })
);

/**
 * Unsafely calls instance.constitution without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const constitutionUnsafe = (instance: CML.NewConstitution): CML.Constitution =>
  Effect.runSync(constitution(instance));

/**
 * Static method _new of NewConstitution
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (actionId: CML.GovActionId | undefined, constitution: CML.Constitution) => Effect.Effect<CML.NewConstitution, NewConstitutionError> = Effect.fn(function* (actionId: CML.GovActionId | undefined, constitution: CML.Constitution) {
  return yield* Effect.try({
    try: () => CML.NewConstitution.new(actionId, constitution),
    catch: () => new NewConstitutionError({
      message: `NewConstitution._new failed with parameters: ${actionId}, ${constitution} (Constitution). `,
    }),
  });
});

/**
 * Unsafely calls NewConstitution._new without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (actionId: CML.GovActionId | undefined, constitution: CML.Constitution): CML.NewConstitution =>
  Effect.runSync(_new(actionId, constitution));
