import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type UpdateDrepCert = CML.UpdateDrepCert;

export class UpdateDrepCertError extends Data.TaggedError("UpdateDrepCertError")<{
  message?: string;
}> {}

/**
 * Method free of UpdateDrepCert
 * 
 * @example
 * import { UpdateDrepCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a UpdateDrepCert instance
 * const instance = ... ;
 *   const result = yield* UpdateDrepCert.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.UpdateDrepCert): Effect.Effect<void, UpdateDrepCertError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new UpdateDrepCertError({
          message: `UpdateDrepCert.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { UpdateDrepCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a UpdateDrepCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = UpdateDrepCert.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UpdateDrepCert.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.UpdateDrepCert): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of UpdateDrepCert
 * 
 * @example
 * import { UpdateDrepCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a UpdateDrepCert instance
 * const instance = ... ;
 *   const result = yield* UpdateDrepCert.toCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.UpdateDrepCert): Effect.Effect<Uint8Array, UpdateDrepCertError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new UpdateDrepCertError({
          message: `UpdateDrepCert.toCborBytes failed UpdateDrepCert is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @example
 * import { UpdateDrepCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a UpdateDrepCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = UpdateDrepCert.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UpdateDrepCert.unsafeToCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (instance: CML.UpdateDrepCert): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of UpdateDrepCert
 * 
 * @example
 * import { UpdateDrepCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a UpdateDrepCert instance
 * const instance = ... ;
 *   const result = yield* UpdateDrepCert.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.UpdateDrepCert): Effect.Effect<Uint8Array, UpdateDrepCertError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new UpdateDrepCertError({
          message: `UpdateDrepCert.toCanonicalCborBytes failed UpdateDrepCert is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @example
 * import { UpdateDrepCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a UpdateDrepCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = UpdateDrepCert.unsafeToCanonicalCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UpdateDrepCert.unsafeToCanonicalCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborBytes = (instance: CML.UpdateDrepCert): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of UpdateDrepCert
 * 
 * @example
 * import { UpdateDrepCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* UpdateDrepCert.fromCborBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.UpdateDrepCert.from_cbor_bytes(cborBytes),
    catch: () => new UpdateDrepCertError({
      message: `UpdateDrepCert.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls UpdateDrepCert.fromCborBytes without Effect wrapper
 * 
 * @example
 * import { UpdateDrepCert } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = UpdateDrepCert.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UpdateDrepCert.unsafeFromCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of UpdateDrepCert
 * 
 * @example
 * import { UpdateDrepCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a UpdateDrepCert instance
 * const instance = ... ;
 *   const result = yield* UpdateDrepCert.toCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.UpdateDrepCert): Effect.Effect<string, UpdateDrepCertError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new UpdateDrepCertError({
          message: `UpdateDrepCert.toCborHex failed UpdateDrepCert is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @example
 * import { UpdateDrepCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a UpdateDrepCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = UpdateDrepCert.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UpdateDrepCert.unsafeToCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (instance: CML.UpdateDrepCert): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of UpdateDrepCert
 * 
 * @example
 * import { UpdateDrepCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a UpdateDrepCert instance
 * const instance = ... ;
 *   const result = yield* UpdateDrepCert.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.UpdateDrepCert): Effect.Effect<string, UpdateDrepCertError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new UpdateDrepCertError({
          message: `UpdateDrepCert.toCanonicalCborHex failed UpdateDrepCert is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @example
 * import { UpdateDrepCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a UpdateDrepCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = UpdateDrepCert.unsafeToCanonicalCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UpdateDrepCert.unsafeToCanonicalCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborHex = (instance: CML.UpdateDrepCert): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of UpdateDrepCert
 * 
 * @example
 * import { UpdateDrepCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* UpdateDrepCert.fromCborHex( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.UpdateDrepCert.from_cbor_hex(cborBytes),
    catch: () => new UpdateDrepCertError({
      message: `UpdateDrepCert.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls UpdateDrepCert.fromCborHex without Effect wrapper
 * 
 * @example
 * import { UpdateDrepCert } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = UpdateDrepCert.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UpdateDrepCert.unsafeFromCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of UpdateDrepCert
 * 
 * @example
 * import { UpdateDrepCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a UpdateDrepCert instance
 * const instance = ... ;
 *   const result = yield* UpdateDrepCert.toJson(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.UpdateDrepCert): Effect.Effect<string, UpdateDrepCertError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new UpdateDrepCertError({
          message: `UpdateDrepCert.toJson failed UpdateDrepCert is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @example
 * import { UpdateDrepCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a UpdateDrepCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = UpdateDrepCert.unsafeToJson(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UpdateDrepCert.unsafeToJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJson = (instance: CML.UpdateDrepCert): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of UpdateDrepCert
 * 
 * @example
 * import { UpdateDrepCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a UpdateDrepCert instance
 * const instance = ... ;
 *   const result = yield* UpdateDrepCert.toJsValue(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.UpdateDrepCert): Effect.Effect<any, UpdateDrepCertError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new UpdateDrepCertError({
          message: `UpdateDrepCert.toJsValue failed UpdateDrepCert is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @example
 * import { UpdateDrepCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a UpdateDrepCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = UpdateDrepCert.unsafeToJsValue(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UpdateDrepCert.unsafeToJsValue failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJsValue = (instance: CML.UpdateDrepCert): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of UpdateDrepCert
 * 
 * @example
 * import { UpdateDrepCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* UpdateDrepCert.fromJson( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.UpdateDrepCert.from_json(json),
    catch: () => new UpdateDrepCertError({
      message: `UpdateDrepCert.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls UpdateDrepCert.fromJson without Effect wrapper
 * 
 * @example
 * import { UpdateDrepCert } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = UpdateDrepCert.unsafeFromJson( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UpdateDrepCert.unsafeFromJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromJson = (json: string) =>
  Effect.runSync(fromJson(json));

/**
 * Method drepCredential of UpdateDrepCert
 * 
 * @example
 * import { UpdateDrepCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a UpdateDrepCert instance
 * const instance = ... ;
 *   const result = yield* UpdateDrepCert.drepCredential(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const drepCredential = Effect.fn(
  (instance: CML.UpdateDrepCert): Effect.Effect<CML.Credential, UpdateDrepCertError> =>
    Effect.try({
      try: () => instance.drep_credential(),
      catch: () =>
        new UpdateDrepCertError({
          message: `UpdateDrepCert.drepCredential failed `,
        }),
    })
);

/**
 * Unsafely calls instance.drepCredential without Effect wrapper
 * 
 * @example
 * import { UpdateDrepCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a UpdateDrepCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = UpdateDrepCert.unsafeDrepCredential(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UpdateDrepCert.unsafeDrepCredential failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeDrepCredential = (instance: CML.UpdateDrepCert): CML.Credential =>
  Effect.runSync(drepCredential(instance));

/**
 * Method anchor of UpdateDrepCert
 * 
 * @example
 * import { UpdateDrepCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a UpdateDrepCert instance
 * const instance = ... ;
 *   const result = yield* UpdateDrepCert.anchor(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const anchor = Effect.fn(
  (instance: CML.UpdateDrepCert): Effect.Effect<CML.Anchor | undefined, UpdateDrepCertError> =>
    Effect.try({
      try: () => instance.anchor(),
      catch: () =>
        new UpdateDrepCertError({
          message: `UpdateDrepCert.anchor failed `,
        }),
    })
);

/**
 * Unsafely calls instance.anchor without Effect wrapper
 * 
 * @example
 * import { UpdateDrepCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a UpdateDrepCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = UpdateDrepCert.unsafeAnchor(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UpdateDrepCert.unsafeAnchor failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAnchor = (instance: CML.UpdateDrepCert): CML.Anchor | undefined =>
  Effect.runSync(anchor(instance));

/**
 * Static method _new of UpdateDrepCert
 * 
 * @example
 * import { UpdateDrepCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* UpdateDrepCert._new( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (drepCredential: CML.Credential, anchor: CML.Anchor) {
  return yield* Effect.try({
    try: () => CML.UpdateDrepCert.new(drepCredential, anchor),
    catch: () => new UpdateDrepCertError({
      message: `UpdateDrepCert._new failed with parameters: ${drepCredential} (Credential), ${anchor} (Anchor). `,
    }),
  });
});

/**
 * Unsafely calls UpdateDrepCert._new without Effect wrapper
 * 
 * @example
 * import { UpdateDrepCert } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = UpdateDrepCert.unsafe_new( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UpdateDrepCert.unsafe_new failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = (drepCredential: CML.Credential, anchor: CML.Anchor) =>
  Effect.runSync(_new(drepCredential, anchor));
