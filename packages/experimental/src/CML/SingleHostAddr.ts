/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML SingleHostAddr class
 *
 * @since 2.0.0
 * @category Types
 */
export type SingleHostAddr = CML.SingleHostAddr;

/**
 * Error class for SingleHostAddr operations
 * 
 * This error is thrown when operations on SingleHostAddr instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class SingleHostAddrError extends Data.TaggedError("SingleHostAddrError")<{
  message?: string;
}> {}

/**
 * Method free of SingleHostAddr
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.SingleHostAddr) => Effect.Effect<void, SingleHostAddrError> = Effect.fn(
  (instance: CML.SingleHostAddr) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.SingleHostAddr): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of SingleHostAddr
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (instance: CML.SingleHostAddr) => Effect.Effect<Uint8Array, SingleHostAddrError> = Effect.fn(
  (instance: CML.SingleHostAddr) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.SingleHostAddr): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of SingleHostAddr
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (instance: CML.SingleHostAddr) => Effect.Effect<Uint8Array, SingleHostAddrError> = Effect.fn(
  (instance: CML.SingleHostAddr) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (instance: CML.SingleHostAddr): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of SingleHostAddr
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (cborBytes: Uint8Array) => Effect.Effect<CML.SingleHostAddr, SingleHostAddrError> = Effect.fn(function* (cborBytes: Uint8Array) {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.SingleHostAddr =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of SingleHostAddr
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (instance: CML.SingleHostAddr) => Effect.Effect<string, SingleHostAddrError> = Effect.fn(
  (instance: CML.SingleHostAddr) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.SingleHostAddr): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of SingleHostAddr
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (instance: CML.SingleHostAddr) => Effect.Effect<string, SingleHostAddrError> = Effect.fn(
  (instance: CML.SingleHostAddr) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.SingleHostAddr): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of SingleHostAddr
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (cborBytes: string) => Effect.Effect<CML.SingleHostAddr, SingleHostAddrError> = Effect.fn(function* (cborBytes: string) {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.SingleHostAddr =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of SingleHostAddr
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (instance: CML.SingleHostAddr) => Effect.Effect<string, SingleHostAddrError> = Effect.fn(
  (instance: CML.SingleHostAddr) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.SingleHostAddr): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of SingleHostAddr
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (instance: CML.SingleHostAddr) => Effect.Effect<any, SingleHostAddrError> = Effect.fn(
  (instance: CML.SingleHostAddr) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.SingleHostAddr): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of SingleHostAddr
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (json: string) => Effect.Effect<CML.SingleHostAddr, SingleHostAddrError> = Effect.fn(function* (json: string) {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.SingleHostAddr =>
  Effect.runSync(fromJson(json));

/**
 * Method port of SingleHostAddr
 * 
 * @since 2.0.0
 * @category Methods
 */
export const port: (instance: CML.SingleHostAddr) => Effect.Effect<number | undefined, SingleHostAddrError> = Effect.fn(
  (instance: CML.SingleHostAddr) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const portUnsafe = (instance: CML.SingleHostAddr): number | undefined =>
  Effect.runSync(port(instance));

/**
 * Method ipv4 of SingleHostAddr
 * 
 * @since 2.0.0
 * @category Methods
 */
export const ipv4: (instance: CML.SingleHostAddr) => Effect.Effect<CML.Ipv4 | undefined, SingleHostAddrError> = Effect.fn(
  (instance: CML.SingleHostAddr) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const ipv4Unsafe = (instance: CML.SingleHostAddr): CML.Ipv4 | undefined =>
  Effect.runSync(ipv4(instance));

/**
 * Method ipv6 of SingleHostAddr
 * 
 * @since 2.0.0
 * @category Methods
 */
export const ipv6: (instance: CML.SingleHostAddr) => Effect.Effect<CML.Ipv6 | undefined, SingleHostAddrError> = Effect.fn(
  (instance: CML.SingleHostAddr) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const ipv6Unsafe = (instance: CML.SingleHostAddr): CML.Ipv6 | undefined =>
  Effect.runSync(ipv6(instance));

/**
 * Static method _new of SingleHostAddr
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (port: number, ipv4: CML.Ipv4, ipv6: CML.Ipv6) => Effect.Effect<CML.SingleHostAddr, SingleHostAddrError> = Effect.fn(function* (port: number, ipv4: CML.Ipv4, ipv6: CML.Ipv6) {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (port: number, ipv4: CML.Ipv4, ipv6: CML.Ipv6): CML.SingleHostAddr =>
  Effect.runSync(_new(port, ipv4, ipv6));
