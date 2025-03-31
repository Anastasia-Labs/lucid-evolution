/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML RegDrepCert class
 *
 * @since 2.0.0
 * @category Types
 */
export type RegDrepCert = CML.RegDrepCert;

/**
 * Error class for RegDrepCert operations
 * 
 * This error is thrown when operations on RegDrepCert instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class RegDrepCertError extends Data.TaggedError("RegDrepCertError")<{
  message?: string;
}> {}

/**
 * Method free of RegDrepCert
 * 
 * @example
 * import { RegDrepCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a RegDrepCert instance
 * const instance = ... ;
 *   const result = yield* RegDrepCert.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.RegDrepCert): Effect.Effect<void, RegDrepCertError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new RegDrepCertError({
          message: `RegDrepCert.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { RegDrepCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a RegDrepCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = RegDrepCert.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RegDrepCert.freeUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.RegDrepCert): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of RegDrepCert
 * 
 * @example
 * import { RegDrepCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a RegDrepCert instance
 * const instance = ... ;
 *   const result = yield* RegDrepCert.toCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.RegDrepCert): Effect.Effect<Uint8Array, RegDrepCertError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new RegDrepCertError({
          message: `RegDrepCert.toCborBytes failed RegDrepCert is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @example
 * import { RegDrepCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a RegDrepCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = RegDrepCert.toCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RegDrepCert.toCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.RegDrepCert): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of RegDrepCert
 * 
 * @example
 * import { RegDrepCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a RegDrepCert instance
 * const instance = ... ;
 *   const result = yield* RegDrepCert.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.RegDrepCert): Effect.Effect<Uint8Array, RegDrepCertError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new RegDrepCertError({
          message: `RegDrepCert.toCanonicalCborBytes failed RegDrepCert is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @example
 * import { RegDrepCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a RegDrepCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = RegDrepCert.toCanonicalCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RegDrepCert.toCanonicalCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (instance: CML.RegDrepCert): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of RegDrepCert
 * 
 * @example
 * import { RegDrepCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* RegDrepCert.fromCborBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.RegDrepCert.from_cbor_bytes(cborBytes),
    catch: () => new RegDrepCertError({
      message: `RegDrepCert.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls RegDrepCert.fromCborBytes without Effect wrapper
 * 
 * @example
 * import { RegDrepCert } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = RegDrepCert.fromCborBytesUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RegDrepCert.fromCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of RegDrepCert
 * 
 * @example
 * import { RegDrepCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a RegDrepCert instance
 * const instance = ... ;
 *   const result = yield* RegDrepCert.toCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.RegDrepCert): Effect.Effect<string, RegDrepCertError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new RegDrepCertError({
          message: `RegDrepCert.toCborHex failed RegDrepCert is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @example
 * import { RegDrepCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a RegDrepCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = RegDrepCert.toCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RegDrepCert.toCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.RegDrepCert): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of RegDrepCert
 * 
 * @example
 * import { RegDrepCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a RegDrepCert instance
 * const instance = ... ;
 *   const result = yield* RegDrepCert.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.RegDrepCert): Effect.Effect<string, RegDrepCertError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new RegDrepCertError({
          message: `RegDrepCert.toCanonicalCborHex failed RegDrepCert is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @example
 * import { RegDrepCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a RegDrepCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = RegDrepCert.toCanonicalCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RegDrepCert.toCanonicalCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.RegDrepCert): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of RegDrepCert
 * 
 * @example
 * import { RegDrepCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* RegDrepCert.fromCborHex( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.RegDrepCert.from_cbor_hex(cborBytes),
    catch: () => new RegDrepCertError({
      message: `RegDrepCert.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls RegDrepCert.fromCborHex without Effect wrapper
 * 
 * @example
 * import { RegDrepCert } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = RegDrepCert.fromCborHexUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RegDrepCert.fromCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of RegDrepCert
 * 
 * @example
 * import { RegDrepCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a RegDrepCert instance
 * const instance = ... ;
 *   const result = yield* RegDrepCert.toJson(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.RegDrepCert): Effect.Effect<string, RegDrepCertError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new RegDrepCertError({
          message: `RegDrepCert.toJson failed RegDrepCert is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @example
 * import { RegDrepCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a RegDrepCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = RegDrepCert.toJsonUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RegDrepCert.toJsonUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.RegDrepCert): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of RegDrepCert
 * 
 * @example
 * import { RegDrepCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a RegDrepCert instance
 * const instance = ... ;
 *   const result = yield* RegDrepCert.toJsValue(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.RegDrepCert): Effect.Effect<any, RegDrepCertError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new RegDrepCertError({
          message: `RegDrepCert.toJsValue failed RegDrepCert is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @example
 * import { RegDrepCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a RegDrepCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = RegDrepCert.toJsValueUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RegDrepCert.toJsValueUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.RegDrepCert): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of RegDrepCert
 * 
 * @example
 * import { RegDrepCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* RegDrepCert.fromJson( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.RegDrepCert.from_json(json),
    catch: () => new RegDrepCertError({
      message: `RegDrepCert.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls RegDrepCert.fromJson without Effect wrapper
 * 
 * @example
 * import { RegDrepCert } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = RegDrepCert.fromJsonUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RegDrepCert.fromJsonUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string) =>
  Effect.runSync(fromJson(json));

/**
 * Method drepCredential of RegDrepCert
 * 
 * @example
 * import { RegDrepCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a RegDrepCert instance
 * const instance = ... ;
 *   const result = yield* RegDrepCert.drepCredential(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const drepCredential = Effect.fn(
  (instance: CML.RegDrepCert): Effect.Effect<CML.Credential, RegDrepCertError> =>
    Effect.try({
      try: () => instance.drep_credential(),
      catch: () =>
        new RegDrepCertError({
          message: `RegDrepCert.drepCredential failed `,
        }),
    })
);

/**
 * Unsafely calls instance.drepCredential without Effect wrapper
 * 
 * @example
 * import { RegDrepCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a RegDrepCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = RegDrepCert.drepCredentialUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RegDrepCert.drepCredentialUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const drepCredentialUnsafe = (instance: CML.RegDrepCert): CML.Credential =>
  Effect.runSync(drepCredential(instance));

/**
 * Method deposit of RegDrepCert
 * 
 * @example
 * import { RegDrepCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a RegDrepCert instance
 * const instance = ... ;
 *   const result = yield* RegDrepCert.deposit(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const deposit = Effect.fn(
  (instance: CML.RegDrepCert): Effect.Effect<bigint, RegDrepCertError> =>
    Effect.try({
      try: () => instance.deposit(),
      catch: () =>
        new RegDrepCertError({
          message: `RegDrepCert.deposit failed `,
        }),
    })
);

/**
 * Unsafely calls instance.deposit without Effect wrapper
 * 
 * @example
 * import { RegDrepCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a RegDrepCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = RegDrepCert.depositUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RegDrepCert.depositUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const depositUnsafe = (instance: CML.RegDrepCert): bigint =>
  Effect.runSync(deposit(instance));

/**
 * Method anchor of RegDrepCert
 * 
 * @example
 * import { RegDrepCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a RegDrepCert instance
 * const instance = ... ;
 *   const result = yield* RegDrepCert.anchor(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const anchor = Effect.fn(
  (instance: CML.RegDrepCert): Effect.Effect<CML.Anchor | undefined, RegDrepCertError> =>
    Effect.try({
      try: () => instance.anchor(),
      catch: () =>
        new RegDrepCertError({
          message: `RegDrepCert.anchor failed `,
        }),
    })
);

/**
 * Unsafely calls instance.anchor without Effect wrapper
 * 
 * @example
 * import { RegDrepCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a RegDrepCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = RegDrepCert.anchorUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RegDrepCert.anchorUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const anchorUnsafe = (instance: CML.RegDrepCert): CML.Anchor | undefined =>
  Effect.runSync(anchor(instance));

/**
 * Static method _new of RegDrepCert
 * 
 * @example
 * import { RegDrepCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* RegDrepCert._new( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (drepCredential: CML.Credential, deposit: bigint, anchor: CML.Anchor) {
  return yield* Effect.try({
    try: () => CML.RegDrepCert.new(drepCredential, deposit, anchor),
    catch: () => new RegDrepCertError({
      message: `RegDrepCert._new failed with parameters: ${drepCredential} (Credential), ${deposit}, ${anchor} (Anchor). `,
    }),
  });
});

/**
 * Unsafely calls RegDrepCert._new without Effect wrapper
 * 
 * @example
 * import { RegDrepCert } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = RegDrepCert._newUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RegDrepCert._newUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (drepCredential: CML.Credential, deposit: bigint, anchor: CML.Anchor) =>
  Effect.runSync(_new(drepCredential, deposit, anchor));
