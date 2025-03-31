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
 * @example
 * import { NewConstitution } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a NewConstitution instance
 * const instance = ... ;
 *   const result = yield* NewConstitution.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.NewConstitution): Effect.Effect<void, NewConstitutionError> =>
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
 * @example
 * import { NewConstitution } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a NewConstitution instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = NewConstitution.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NewConstitution.freeUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.NewConstitution): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of NewConstitution
 * 
 * @example
 * import { NewConstitution } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a NewConstitution instance
 * const instance = ... ;
 *   const result = yield* NewConstitution.toCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.NewConstitution): Effect.Effect<Uint8Array, NewConstitutionError> =>
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
 * @example
 * import { NewConstitution } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a NewConstitution instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = NewConstitution.toCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NewConstitution.toCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.NewConstitution): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of NewConstitution
 * 
 * @example
 * import { NewConstitution } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a NewConstitution instance
 * const instance = ... ;
 *   const result = yield* NewConstitution.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.NewConstitution): Effect.Effect<Uint8Array, NewConstitutionError> =>
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
 * @example
 * import { NewConstitution } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a NewConstitution instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = NewConstitution.toCanonicalCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NewConstitution.toCanonicalCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (instance: CML.NewConstitution): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of NewConstitution
 * 
 * @example
 * import { NewConstitution } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* NewConstitution.fromCborBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
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
 * @example
 * import { NewConstitution } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = NewConstitution.fromCborBytesUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NewConstitution.fromCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of NewConstitution
 * 
 * @example
 * import { NewConstitution } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a NewConstitution instance
 * const instance = ... ;
 *   const result = yield* NewConstitution.toCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.NewConstitution): Effect.Effect<string, NewConstitutionError> =>
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
 * @example
 * import { NewConstitution } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a NewConstitution instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = NewConstitution.toCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NewConstitution.toCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.NewConstitution): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of NewConstitution
 * 
 * @example
 * import { NewConstitution } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a NewConstitution instance
 * const instance = ... ;
 *   const result = yield* NewConstitution.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.NewConstitution): Effect.Effect<string, NewConstitutionError> =>
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
 * @example
 * import { NewConstitution } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a NewConstitution instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = NewConstitution.toCanonicalCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NewConstitution.toCanonicalCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.NewConstitution): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of NewConstitution
 * 
 * @example
 * import { NewConstitution } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* NewConstitution.fromCborHex( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
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
 * @example
 * import { NewConstitution } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = NewConstitution.fromCborHexUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NewConstitution.fromCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of NewConstitution
 * 
 * @example
 * import { NewConstitution } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a NewConstitution instance
 * const instance = ... ;
 *   const result = yield* NewConstitution.toJson(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.NewConstitution): Effect.Effect<string, NewConstitutionError> =>
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
 * @example
 * import { NewConstitution } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a NewConstitution instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = NewConstitution.toJsonUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NewConstitution.toJsonUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.NewConstitution): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of NewConstitution
 * 
 * @example
 * import { NewConstitution } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a NewConstitution instance
 * const instance = ... ;
 *   const result = yield* NewConstitution.toJsValue(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.NewConstitution): Effect.Effect<any, NewConstitutionError> =>
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
 * @example
 * import { NewConstitution } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a NewConstitution instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = NewConstitution.toJsValueUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NewConstitution.toJsValueUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.NewConstitution): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of NewConstitution
 * 
 * @example
 * import { NewConstitution } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* NewConstitution.fromJson( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
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
 * @example
 * import { NewConstitution } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = NewConstitution.fromJsonUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NewConstitution.fromJsonUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string) =>
  Effect.runSync(fromJson(json));

/**
 * Method actionId of NewConstitution
 * 
 * @example
 * import { NewConstitution } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a NewConstitution instance
 * const instance = ... ;
 *   const result = yield* NewConstitution.actionId(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const actionId = Effect.fn(
  (instance: CML.NewConstitution): Effect.Effect<CML.GovActionId | undefined, NewConstitutionError> =>
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
 * @example
 * import { NewConstitution } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a NewConstitution instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = NewConstitution.actionIdUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NewConstitution.actionIdUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const actionIdUnsafe = (instance: CML.NewConstitution): CML.GovActionId | undefined =>
  Effect.runSync(actionId(instance));

/**
 * Method constitution of NewConstitution
 * 
 * @example
 * import { NewConstitution } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a NewConstitution instance
 * const instance = ... ;
 *   const result = yield* NewConstitution.constitution(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const constitution = Effect.fn(
  (instance: CML.NewConstitution): Effect.Effect<CML.Constitution, NewConstitutionError> =>
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
 * @example
 * import { NewConstitution } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a NewConstitution instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = NewConstitution.constitutionUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NewConstitution.constitutionUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const constitutionUnsafe = (instance: CML.NewConstitution): CML.Constitution =>
  Effect.runSync(constitution(instance));

/**
 * Static method _new of NewConstitution
 * 
 * @example
 * import { NewConstitution } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* NewConstitution._new( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (actionId: CML.GovActionId | undefined, constitution: CML.Constitution) {
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
 * @example
 * import { NewConstitution } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = NewConstitution._newUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NewConstitution._newUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (actionId: CML.GovActionId | undefined, constitution: CML.Constitution) =>
  Effect.runSync(_new(actionId, constitution));
