import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type SingleHostAddr = CML.SingleHostAddr;

export class SingleHostAddrError extends Data.TaggedError("SingleHostAddrError")<{
  message?: string;
}> {}

/**
 * Method free of SingleHostAddr
 * 
 * @example
 * import { SingleHostAddr } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a SingleHostAddr instance
 * const instance = ... ;
 *   const result = yield* SingleHostAddr.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.SingleHostAddr): Effect.Effect<void, SingleHostAddrError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new SingleHostAddrError({
          message: `SingleHostAddr.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { SingleHostAddr } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a SingleHostAddr instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = SingleHostAddr.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SingleHostAddr.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.SingleHostAddr): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of SingleHostAddr
 * 
 * @example
 * import { SingleHostAddr } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a SingleHostAddr instance
 * const instance = ... ;
 *   const result = yield* SingleHostAddr.toCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.SingleHostAddr): Effect.Effect<Uint8Array, SingleHostAddrError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new SingleHostAddrError({
          message: `SingleHostAddr.toCborBytes failed SingleHostAddr is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @example
 * import { SingleHostAddr } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a SingleHostAddr instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = SingleHostAddr.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SingleHostAddr.unsafeToCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (instance: CML.SingleHostAddr): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of SingleHostAddr
 * 
 * @example
 * import { SingleHostAddr } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a SingleHostAddr instance
 * const instance = ... ;
 *   const result = yield* SingleHostAddr.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.SingleHostAddr): Effect.Effect<Uint8Array, SingleHostAddrError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new SingleHostAddrError({
          message: `SingleHostAddr.toCanonicalCborBytes failed SingleHostAddr is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @example
 * import { SingleHostAddr } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a SingleHostAddr instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = SingleHostAddr.unsafeToCanonicalCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SingleHostAddr.unsafeToCanonicalCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborBytes = (instance: CML.SingleHostAddr): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of SingleHostAddr
 * 
 * @example
 * import { SingleHostAddr } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* SingleHostAddr.fromCborBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.SingleHostAddr.from_cbor_bytes(cborBytes),
    catch: () => new SingleHostAddrError({
      message: `SingleHostAddr.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls SingleHostAddr.fromCborBytes without Effect wrapper
 * 
 * @example
 * import { SingleHostAddr } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = SingleHostAddr.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SingleHostAddr.unsafeFromCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of SingleHostAddr
 * 
 * @example
 * import { SingleHostAddr } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a SingleHostAddr instance
 * const instance = ... ;
 *   const result = yield* SingleHostAddr.toCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.SingleHostAddr): Effect.Effect<string, SingleHostAddrError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new SingleHostAddrError({
          message: `SingleHostAddr.toCborHex failed SingleHostAddr is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @example
 * import { SingleHostAddr } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a SingleHostAddr instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = SingleHostAddr.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SingleHostAddr.unsafeToCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (instance: CML.SingleHostAddr): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of SingleHostAddr
 * 
 * @example
 * import { SingleHostAddr } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a SingleHostAddr instance
 * const instance = ... ;
 *   const result = yield* SingleHostAddr.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.SingleHostAddr): Effect.Effect<string, SingleHostAddrError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new SingleHostAddrError({
          message: `SingleHostAddr.toCanonicalCborHex failed SingleHostAddr is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @example
 * import { SingleHostAddr } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a SingleHostAddr instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = SingleHostAddr.unsafeToCanonicalCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SingleHostAddr.unsafeToCanonicalCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborHex = (instance: CML.SingleHostAddr): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of SingleHostAddr
 * 
 * @example
 * import { SingleHostAddr } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* SingleHostAddr.fromCborHex( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.SingleHostAddr.from_cbor_hex(cborBytes),
    catch: () => new SingleHostAddrError({
      message: `SingleHostAddr.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls SingleHostAddr.fromCborHex without Effect wrapper
 * 
 * @example
 * import { SingleHostAddr } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = SingleHostAddr.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SingleHostAddr.unsafeFromCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of SingleHostAddr
 * 
 * @example
 * import { SingleHostAddr } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a SingleHostAddr instance
 * const instance = ... ;
 *   const result = yield* SingleHostAddr.toJson(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.SingleHostAddr): Effect.Effect<string, SingleHostAddrError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new SingleHostAddrError({
          message: `SingleHostAddr.toJson failed SingleHostAddr is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @example
 * import { SingleHostAddr } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a SingleHostAddr instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = SingleHostAddr.unsafeToJson(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SingleHostAddr.unsafeToJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJson = (instance: CML.SingleHostAddr): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of SingleHostAddr
 * 
 * @example
 * import { SingleHostAddr } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a SingleHostAddr instance
 * const instance = ... ;
 *   const result = yield* SingleHostAddr.toJsValue(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.SingleHostAddr): Effect.Effect<any, SingleHostAddrError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new SingleHostAddrError({
          message: `SingleHostAddr.toJsValue failed SingleHostAddr is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @example
 * import { SingleHostAddr } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a SingleHostAddr instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = SingleHostAddr.unsafeToJsValue(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SingleHostAddr.unsafeToJsValue failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJsValue = (instance: CML.SingleHostAddr): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of SingleHostAddr
 * 
 * @example
 * import { SingleHostAddr } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* SingleHostAddr.fromJson( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.SingleHostAddr.from_json(json),
    catch: () => new SingleHostAddrError({
      message: `SingleHostAddr.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls SingleHostAddr.fromJson without Effect wrapper
 * 
 * @example
 * import { SingleHostAddr } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = SingleHostAddr.unsafeFromJson( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SingleHostAddr.unsafeFromJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromJson = (json: string) =>
  Effect.runSync(fromJson(json));

/**
 * Method port of SingleHostAddr
 * 
 * @example
 * import { SingleHostAddr } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a SingleHostAddr instance
 * const instance = ... ;
 *   const result = yield* SingleHostAddr.port(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const port = Effect.fn(
  (instance: CML.SingleHostAddr): Effect.Effect<number | undefined, SingleHostAddrError> =>
    Effect.try({
      try: () => instance.port(),
      catch: () =>
        new SingleHostAddrError({
          message: `SingleHostAddr.port failed `,
        }),
    })
);

/**
 * Unsafely calls instance.port without Effect wrapper
 * 
 * @example
 * import { SingleHostAddr } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a SingleHostAddr instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = SingleHostAddr.unsafePort(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SingleHostAddr.unsafePort failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafePort = (instance: CML.SingleHostAddr): number | undefined =>
  Effect.runSync(port(instance));

/**
 * Method ipv4 of SingleHostAddr
 * 
 * @example
 * import { SingleHostAddr } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a SingleHostAddr instance
 * const instance = ... ;
 *   const result = yield* SingleHostAddr.ipv4(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const ipv4 = Effect.fn(
  (instance: CML.SingleHostAddr): Effect.Effect<CML.Ipv4 | undefined, SingleHostAddrError> =>
    Effect.try({
      try: () => instance.ipv4(),
      catch: () =>
        new SingleHostAddrError({
          message: `SingleHostAddr.ipv4 failed `,
        }),
    })
);

/**
 * Unsafely calls instance.ipv4 without Effect wrapper
 * 
 * @example
 * import { SingleHostAddr } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a SingleHostAddr instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = SingleHostAddr.unsafeIpv4(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SingleHostAddr.unsafeIpv4 failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeIpv4 = (instance: CML.SingleHostAddr): CML.Ipv4 | undefined =>
  Effect.runSync(ipv4(instance));

/**
 * Method ipv6 of SingleHostAddr
 * 
 * @example
 * import { SingleHostAddr } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a SingleHostAddr instance
 * const instance = ... ;
 *   const result = yield* SingleHostAddr.ipv6(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const ipv6 = Effect.fn(
  (instance: CML.SingleHostAddr): Effect.Effect<CML.Ipv6 | undefined, SingleHostAddrError> =>
    Effect.try({
      try: () => instance.ipv6(),
      catch: () =>
        new SingleHostAddrError({
          message: `SingleHostAddr.ipv6 failed `,
        }),
    })
);

/**
 * Unsafely calls instance.ipv6 without Effect wrapper
 * 
 * @example
 * import { SingleHostAddr } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a SingleHostAddr instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = SingleHostAddr.unsafeIpv6(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SingleHostAddr.unsafeIpv6 failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeIpv6 = (instance: CML.SingleHostAddr): CML.Ipv6 | undefined =>
  Effect.runSync(ipv6(instance));

/**
 * Static method _new of SingleHostAddr
 * 
 * @example
 * import { SingleHostAddr } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* SingleHostAddr._new( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (port: number, ipv4: CML.Ipv4, ipv6: CML.Ipv6) {
  return yield* Effect.try({
    try: () => CML.SingleHostAddr.new(port, ipv4, ipv6),
    catch: () => new SingleHostAddrError({
      message: `SingleHostAddr._new failed with parameters: ${port}, ${ipv4} (Ipv4), ${ipv6} (Ipv6). `,
    }),
  });
});

/**
 * Unsafely calls SingleHostAddr._new without Effect wrapper
 * 
 * @example
 * import { SingleHostAddr } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = SingleHostAddr.unsafe_new( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SingleHostAddr.unsafe_new failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = (port: number, ipv4: CML.Ipv4, ipv6: CML.Ipv6) =>
  Effect.runSync(_new(port, ipv4, ipv6));
