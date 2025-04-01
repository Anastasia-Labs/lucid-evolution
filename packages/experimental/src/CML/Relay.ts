/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML Relay class
 *
 * @since 2.0.0
 * @category Types
 */
export type Relay = CML.Relay;

/**
 * Error class for Relay operations
 * 
 * This error is thrown when operations on Relay instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class RelayError extends Data.TaggedError("RelayError")<{
  message?: string;
}> {}

/**
 * Method free of Relay
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.Relay) => Effect.Effect<void, RelayError> = Effect.fn(
  (instance: CML.Relay) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new RelayError({
          message: `Relay.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.Relay): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of Relay
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (instance: CML.Relay) => Effect.Effect<Uint8Array, RelayError> = Effect.fn(
  (instance: CML.Relay) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new RelayError({
          message: `Relay.toCborBytes failed Relay is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.Relay): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of Relay
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (instance: CML.Relay) => Effect.Effect<Uint8Array, RelayError> = Effect.fn(
  (instance: CML.Relay) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new RelayError({
          message: `Relay.toCanonicalCborBytes failed Relay is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (instance: CML.Relay): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of Relay
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (cborBytes: Uint8Array) => Effect.Effect<CML.Relay, RelayError> = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.Relay.from_cbor_bytes(cborBytes),
    catch: () => new RelayError({
      message: `Relay.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls Relay.fromCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.Relay =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of Relay
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (instance: CML.Relay) => Effect.Effect<string, RelayError> = Effect.fn(
  (instance: CML.Relay) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new RelayError({
          message: `Relay.toCborHex failed Relay is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.Relay): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of Relay
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (instance: CML.Relay) => Effect.Effect<string, RelayError> = Effect.fn(
  (instance: CML.Relay) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new RelayError({
          message: `Relay.toCanonicalCborHex failed Relay is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.Relay): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of Relay
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (cborBytes: string) => Effect.Effect<CML.Relay, RelayError> = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.Relay.from_cbor_hex(cborBytes),
    catch: () => new RelayError({
      message: `Relay.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls Relay.fromCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.Relay =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of Relay
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (instance: CML.Relay) => Effect.Effect<string, RelayError> = Effect.fn(
  (instance: CML.Relay) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new RelayError({
          message: `Relay.toJson failed Relay is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.Relay): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of Relay
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (instance: CML.Relay) => Effect.Effect<any, RelayError> = Effect.fn(
  (instance: CML.Relay) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new RelayError({
          message: `Relay.toJsValue failed Relay is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.Relay): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of Relay
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (json: string) => Effect.Effect<CML.Relay, RelayError> = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.Relay.from_json(json),
    catch: () => new RelayError({
      message: `Relay.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls Relay.fromJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.Relay =>
  Effect.runSync(fromJson(json));

/**
 * Static method newSingleHostAddr of Relay
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newSingleHostAddr: (port: number, ipv4: CML.Ipv4, ipv6: CML.Ipv6) => Effect.Effect<CML.Relay, RelayError> = Effect.fn(function* (port: number, ipv4: CML.Ipv4, ipv6: CML.Ipv6) {
  return yield* Effect.try({
    try: () => CML.Relay.new_single_host_addr(port, ipv4, ipv6),
    catch: () => new RelayError({
      message: `Relay.newSingleHostAddr failed with parameters: ${port}, ${ipv4} (Ipv4), ${ipv6} (Ipv6). `,
    }),
  });
});

/**
 * Unsafely calls Relay.newSingleHostAddr without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newSingleHostAddrUnsafe = (port: number, ipv4: CML.Ipv4, ipv6: CML.Ipv6): CML.Relay =>
  Effect.runSync(newSingleHostAddr(port, ipv4, ipv6));

/**
 * Static method newSingleHostName of Relay
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newSingleHostName: (port: number | undefined, dnsName: CML.DNSName) => Effect.Effect<CML.Relay, RelayError> = Effect.fn(function* (port: number | undefined, dnsName: CML.DNSName) {
  return yield* Effect.try({
    try: () => CML.Relay.new_single_host_name(port, dnsName),
    catch: () => new RelayError({
      message: `Relay.newSingleHostName failed with parameters: ${port}, ${dnsName} (DNSName). `,
    }),
  });
});

/**
 * Unsafely calls Relay.newSingleHostName without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newSingleHostNameUnsafe = (port: number | undefined, dnsName: CML.DNSName): CML.Relay =>
  Effect.runSync(newSingleHostName(port, dnsName));

/**
 * Static method newMultiHostName of Relay
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newMultiHostName: (dnsName: CML.DNSName) => Effect.Effect<CML.Relay, RelayError> = Effect.fn(function* (dnsName: CML.DNSName) {
  return yield* Effect.try({
    try: () => CML.Relay.new_multi_host_name(dnsName),
    catch: () => new RelayError({
      message: `Relay.newMultiHostName failed with parameters: ${dnsName} (DNSName). `,
    }),
  });
});

/**
 * Unsafely calls Relay.newMultiHostName without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newMultiHostNameUnsafe = (dnsName: CML.DNSName): CML.Relay =>
  Effect.runSync(newMultiHostName(dnsName));

/**
 * Method kind of Relay
 * 
 * @since 2.0.0
 * @category Methods
 */
export const kind: (instance: CML.Relay) => Effect.Effect<CML.RelayKind, RelayError> = Effect.fn(
  (instance: CML.Relay) =>
    Effect.try({
      try: () => instance.kind(),
      catch: () =>
        new RelayError({
          message: `Relay.kind failed `,
        }),
    })
);

/**
 * Unsafely calls instance.kind without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const kindUnsafe = (instance: CML.Relay): CML.RelayKind =>
  Effect.runSync(kind(instance));

/**
 * Method asSingleHostAddr of Relay
 * 
 * @since 2.0.0
 * @category Methods
 */
export const asSingleHostAddr: (instance: CML.Relay) => Effect.Effect<CML.SingleHostAddr | undefined, RelayError> = Effect.fn(
  (instance: CML.Relay) =>
    Effect.try({
      try: () => instance.as_single_host_addr(),
      catch: () =>
        new RelayError({
          message: `Relay.asSingleHostAddr failed `,
        }),
    })
);

/**
 * Unsafely calls instance.asSingleHostAddr without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asSingleHostAddrUnsafe = (instance: CML.Relay): CML.SingleHostAddr | undefined =>
  Effect.runSync(asSingleHostAddr(instance));

/**
 * Method asSingleHostName of Relay
 * 
 * @since 2.0.0
 * @category Methods
 */
export const asSingleHostName: (instance: CML.Relay) => Effect.Effect<CML.SingleHostName | undefined, RelayError> = Effect.fn(
  (instance: CML.Relay) =>
    Effect.try({
      try: () => instance.as_single_host_name(),
      catch: () =>
        new RelayError({
          message: `Relay.asSingleHostName failed `,
        }),
    })
);

/**
 * Unsafely calls instance.asSingleHostName without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asSingleHostNameUnsafe = (instance: CML.Relay): CML.SingleHostName | undefined =>
  Effect.runSync(asSingleHostName(instance));

/**
 * Method asMultiHostName of Relay
 * 
 * @since 2.0.0
 * @category Methods
 */
export const asMultiHostName: (instance: CML.Relay) => Effect.Effect<CML.MultiHostName | undefined, RelayError> = Effect.fn(
  (instance: CML.Relay) =>
    Effect.try({
      try: () => instance.as_multi_host_name(),
      catch: () =>
        new RelayError({
          message: `Relay.asMultiHostName failed `,
        }),
    })
);

/**
 * Unsafely calls instance.asMultiHostName without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asMultiHostNameUnsafe = (instance: CML.Relay): CML.MultiHostName | undefined =>
  Effect.runSync(asMultiHostName(instance));
