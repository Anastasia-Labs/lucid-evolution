import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type Relay = CML.Relay;

export class RelayError extends Data.TaggedError("RelayError")<{
  message?: string;
}> {}

/**
 * Method free of Relay
 *
 * @example
 * import { Relay } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Relay instance
 * const instance = ... ;
 *   const result = yield* Relay.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.Relay): Effect.Effect<void, RelayError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new RelayError({
          message: `Relay.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { Relay } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Relay instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Relay.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Relay.unsafeFree failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.Relay): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of Relay
 *
 * @example
 * import { Relay } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Relay instance
 * const instance = ... ;
 *   const result = yield* Relay.toCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.Relay): Effect.Effect<Uint8Array, RelayError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new RelayError({
          message: `Relay.toCborBytes failed Relay is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @example
 * import { Relay } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Relay instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Relay.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Relay.unsafeToCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (instance: CML.Relay): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of Relay
 *
 * @example
 * import { Relay } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Relay instance
 * const instance = ... ;
 *   const result = yield* Relay.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.Relay): Effect.Effect<Uint8Array, RelayError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new RelayError({
          message: `Relay.toCanonicalCborBytes failed Relay is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 *
 * @example
 * import { Relay } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Relay instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Relay.unsafeToCanonicalCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Relay.unsafeToCanonicalCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborBytes = (instance: CML.Relay): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of Relay
 *
 * @example
 * import { Relay } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* Relay.fromCborBytes( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.Relay.from_cbor_bytes(cborBytes),
    catch: () =>
      new RelayError({
        message: `Relay.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls Relay.fromCborBytes without Effect wrapper
 *
 * @example
 * import { Relay } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Relay.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Relay.unsafeFromCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of Relay
 *
 * @example
 * import { Relay } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Relay instance
 * const instance = ... ;
 *   const result = yield* Relay.toCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.Relay): Effect.Effect<string, RelayError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new RelayError({
          message: `Relay.toCborHex failed Relay is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @example
 * import { Relay } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Relay instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Relay.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Relay.unsafeToCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (instance: CML.Relay): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of Relay
 *
 * @example
 * import { Relay } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Relay instance
 * const instance = ... ;
 *   const result = yield* Relay.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.Relay): Effect.Effect<string, RelayError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new RelayError({
          message: `Relay.toCanonicalCborHex failed Relay is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @example
 * import { Relay } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Relay instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Relay.unsafeToCanonicalCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Relay.unsafeToCanonicalCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborHex = (instance: CML.Relay): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of Relay
 *
 * @example
 * import { Relay } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* Relay.fromCborHex( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.Relay.from_cbor_hex(cborBytes),
    catch: () =>
      new RelayError({
        message: `Relay.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls Relay.fromCborHex without Effect wrapper
 *
 * @example
 * import { Relay } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Relay.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Relay.unsafeFromCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of Relay
 *
 * @example
 * import { Relay } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Relay instance
 * const instance = ... ;
 *   const result = yield* Relay.toJson(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.Relay): Effect.Effect<string, RelayError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new RelayError({
          message: `Relay.toJson failed Relay is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @example
 * import { Relay } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Relay instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Relay.unsafeToJson(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Relay.unsafeToJson failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJson = (instance: CML.Relay): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of Relay
 *
 * @example
 * import { Relay } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Relay instance
 * const instance = ... ;
 *   const result = yield* Relay.toJsValue(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.Relay): Effect.Effect<any, RelayError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new RelayError({
          message: `Relay.toJsValue failed Relay is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @example
 * import { Relay } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Relay instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Relay.unsafeToJsValue(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Relay.unsafeToJsValue failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJsValue = (instance: CML.Relay): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of Relay
 *
 * @example
 * import { Relay } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* Relay.fromJson( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.Relay.from_json(json),
    catch: () =>
      new RelayError({
        message: `Relay.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls Relay.fromJson without Effect wrapper
 *
 * @example
 * import { Relay } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Relay.unsafeFromJson( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Relay.unsafeFromJson failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromJson = (json: string) => Effect.runSync(fromJson(json));

/**
 * Static method newSingleHostAddr of Relay
 *
 * @example
 * import { Relay } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* Relay.newSingleHostAddr( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newSingleHostAddr = Effect.fn(function* (
  port: number,
  ipv4: CML.Ipv4,
  ipv6: CML.Ipv6,
) {
  return yield* Effect.try({
    try: () => CML.Relay.new_single_host_addr(port, ipv4, ipv6),
    catch: () =>
      new RelayError({
        message: `Relay.newSingleHostAddr failed with parameters: ${port}, ${ipv4} (Ipv4), ${ipv6} (Ipv6). `,
      }),
  });
});

/**
 * Unsafely calls Relay.newSingleHostAddr without Effect wrapper
 *
 * @example
 * import { Relay } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Relay.unsafeNewSingleHostAddr( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Relay.unsafeNewSingleHostAddr failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeNewSingleHostAddr = (
  port: number,
  ipv4: CML.Ipv4,
  ipv6: CML.Ipv6,
) => Effect.runSync(newSingleHostAddr(port, ipv4, ipv6));

/**
 * Static method newSingleHostName of Relay
 *
 * @example
 * import { Relay } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* Relay.newSingleHostName( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newSingleHostName = Effect.fn(function* (
  port: number | undefined,
  dnsName: CML.DNSName,
) {
  return yield* Effect.try({
    try: () => CML.Relay.new_single_host_name(port, dnsName),
    catch: () =>
      new RelayError({
        message: `Relay.newSingleHostName failed with parameters: ${port}, ${dnsName} (DNSName). `,
      }),
  });
});

/**
 * Unsafely calls Relay.newSingleHostName without Effect wrapper
 *
 * @example
 * import { Relay } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Relay.unsafeNewSingleHostName( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Relay.unsafeNewSingleHostName failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeNewSingleHostName = (
  port: number | undefined,
  dnsName: CML.DNSName,
) => Effect.runSync(newSingleHostName(port, dnsName));

/**
 * Static method newMultiHostName of Relay
 *
 * @example
 * import { Relay } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* Relay.newMultiHostName( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newMultiHostName = Effect.fn(function* (dnsName: CML.DNSName) {
  return yield* Effect.try({
    try: () => CML.Relay.new_multi_host_name(dnsName),
    catch: () =>
      new RelayError({
        message: `Relay.newMultiHostName failed with parameters: ${dnsName} (DNSName). `,
      }),
  });
});

/**
 * Unsafely calls Relay.newMultiHostName without Effect wrapper
 *
 * @example
 * import { Relay } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Relay.unsafeNewMultiHostName( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Relay.unsafeNewMultiHostName failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeNewMultiHostName = (dnsName: CML.DNSName) =>
  Effect.runSync(newMultiHostName(dnsName));

/**
 * Method kind of Relay
 *
 * @example
 * import { Relay } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Relay instance
 * const instance = ... ;
 *   const result = yield* Relay.kind(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const kind = Effect.fn(
  (instance: CML.Relay): Effect.Effect<CML.RelayKind, RelayError> =>
    Effect.try({
      try: () => instance.kind(),
      catch: () =>
        new RelayError({
          message: `Relay.kind failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.kind without Effect wrapper
 *
 * @example
 * import { Relay } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Relay instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Relay.unsafeKind(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Relay.unsafeKind failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeKind = (instance: CML.Relay): CML.RelayKind =>
  Effect.runSync(kind(instance));

/**
 * Method asSingleHostAddr of Relay
 *
 * @example
 * import { Relay } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Relay instance
 * const instance = ... ;
 *   const result = yield* Relay.asSingleHostAddr(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const asSingleHostAddr = Effect.fn(
  (
    instance: CML.Relay,
  ): Effect.Effect<CML.SingleHostAddr | undefined, RelayError> =>
    Effect.try({
      try: () => instance.as_single_host_addr(),
      catch: () =>
        new RelayError({
          message: `Relay.asSingleHostAddr failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.asSingleHostAddr without Effect wrapper
 *
 * @example
 * import { Relay } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Relay instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Relay.unsafeAsSingleHostAddr(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Relay.unsafeAsSingleHostAddr failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAsSingleHostAddr = (
  instance: CML.Relay,
): CML.SingleHostAddr | undefined => Effect.runSync(asSingleHostAddr(instance));

/**
 * Method asSingleHostName of Relay
 *
 * @example
 * import { Relay } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Relay instance
 * const instance = ... ;
 *   const result = yield* Relay.asSingleHostName(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const asSingleHostName = Effect.fn(
  (
    instance: CML.Relay,
  ): Effect.Effect<CML.SingleHostName | undefined, RelayError> =>
    Effect.try({
      try: () => instance.as_single_host_name(),
      catch: () =>
        new RelayError({
          message: `Relay.asSingleHostName failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.asSingleHostName without Effect wrapper
 *
 * @example
 * import { Relay } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Relay instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Relay.unsafeAsSingleHostName(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Relay.unsafeAsSingleHostName failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAsSingleHostName = (
  instance: CML.Relay,
): CML.SingleHostName | undefined => Effect.runSync(asSingleHostName(instance));

/**
 * Method asMultiHostName of Relay
 *
 * @example
 * import { Relay } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Relay instance
 * const instance = ... ;
 *   const result = yield* Relay.asMultiHostName(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const asMultiHostName = Effect.fn(
  (
    instance: CML.Relay,
  ): Effect.Effect<CML.MultiHostName | undefined, RelayError> =>
    Effect.try({
      try: () => instance.as_multi_host_name(),
      catch: () =>
        new RelayError({
          message: `Relay.asMultiHostName failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.asMultiHostName without Effect wrapper
 *
 * @example
 * import { Relay } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Relay instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Relay.unsafeAsMultiHostName(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Relay.unsafeAsMultiHostName failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAsMultiHostName = (
  instance: CML.Relay,
): CML.MultiHostName | undefined => Effect.runSync(asMultiHostName(instance));
