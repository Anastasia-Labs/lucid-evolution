/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML Address class
 *
 * @since 2.0.0
 * @category Types
 */
export type Address = CML.Address;

/**
 * Error class for Address operations
 *
 * This error is thrown when operations on Address instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class AddressError extends Data.TaggedError("AddressError")<{
  message?: string;
}> {}

/**
 * Method free of Address
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.Address,
) => Effect.Effect<void, AddressError> = Effect.fn((instance: CML.Address) =>
  Effect.try({
    try: () => instance.free(),
    catch: () =>
      new AddressError({
        message: `Address.free failed Hint: Check if you're calling free() more than once.`,
      }),
  }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.Address): void =>
  Effect.runSync(free(instance));

/**
 * Method toJson of Address
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (
  instance: CML.Address,
) => Effect.Effect<string, AddressError> = Effect.fn((instance: CML.Address) =>
  Effect.try({
    try: () => instance.to_json(),
    catch: () =>
      new AddressError({
        message: `Address.toJson failed Address is not valid for string conversion. Hint: Validate your JSON structure.`,
      }),
  }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.Address): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of Address
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (
  instance: CML.Address,
) => Effect.Effect<any, AddressError> = Effect.fn((instance: CML.Address) =>
  Effect.try({
    try: () => instance.to_js_value(),
    catch: () =>
      new AddressError({
        message: `Address.toJsValue failed Address is not valid for any conversion. `,
      }),
  }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.Address): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of Address
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (
  json: string,
) => Effect.Effect<CML.Address, AddressError> = Effect.fn(function* (
  json: string,
) {
  return yield* Effect.try({
    try: () => CML.Address.from_json(json),
    catch: () =>
      new AddressError({
        message: `Address.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls Address.fromJson without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.Address =>
  Effect.runSync(fromJson(json));

/**
 * Method header of Address
 *
 * @since 2.0.0
 * @category Methods
 */
export const header: (
  instance: CML.Address,
) => Effect.Effect<number, AddressError> = Effect.fn((instance: CML.Address) =>
  Effect.try({
    try: () => instance.header(),
    catch: () =>
      new AddressError({
        message: `Address.header failed `,
      }),
  }),
);

/**
 * Unsafely calls instance.header without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const headerUnsafe = (instance: CML.Address): number =>
  Effect.runSync(header(instance));

/**
 * Static method headerMatchesKind of Address
 *
 * @since 2.0.0
 * @category Constructors
 */
export const headerMatchesKind: (
  header: number,
  kind: CML.AddressHeaderKind,
) => Effect.Effect<boolean, AddressError> = Effect.fn(function* (
  header: number,
  kind: CML.AddressHeaderKind,
) {
  return yield* Effect.try({
    try: () => CML.Address.header_matches_kind(header, kind),
    catch: () =>
      new AddressError({
        message: `Address.headerMatchesKind failed with parameters: ${header}, ${kind} (AddressHeaderKind). `,
      }),
  });
});

/**
 * Unsafely calls Address.headerMatchesKind without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const headerMatchesKindUnsafe = (
  header: number,
  kind: CML.AddressHeaderKind,
): boolean => Effect.runSync(headerMatchesKind(header, kind));

/**
 * Method toBech32 of Address
 *
 * @since 2.0.0
 * @category Methods
 */
export const toBech32: (
  instance: CML.Address,
  prefix: string,
) => Effect.Effect<string, AddressError> = Effect.fn(
  (instance: CML.Address, prefix: string) =>
    Effect.try({
      try: () => instance.to_bech32(prefix),
      catch: () =>
        new AddressError({
          message: `Address.toBech32 failed with parameters: ${prefix}. Address is not valid for string conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toBech32 without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toBech32Unsafe = (instance: CML.Address, prefix: string): string =>
  Effect.runSync(toBech32(instance, prefix));

/**
 * Static method fromBech32 of Address
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromBech32: (
  bechStr: string,
) => Effect.Effect<CML.Address, AddressError> = Effect.fn(function* (
  bechStr: string,
) {
  return yield* Effect.try({
    try: () => CML.Address.from_bech32(bechStr),
    catch: () =>
      new AddressError({
        message: `Address.fromBech32 failed with parameters: ${bechStr}. `,
      }),
  });
});

/**
 * Unsafely calls Address.fromBech32 without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromBech32Unsafe = (bechStr: string): CML.Address =>
  Effect.runSync(fromBech32(bechStr));

/**
 * Static method isValidBech32 of Address
 *
 * @since 2.0.0
 * @category Constructors
 */
export const isValidBech32: (
  bechStr: string,
) => Effect.Effect<boolean, AddressError> = Effect.fn(function* (
  bechStr: string,
) {
  return yield* Effect.try({
    try: () => CML.Address.is_valid_bech32(bechStr),
    catch: () =>
      new AddressError({
        message: `Address.isValidBech32 failed with parameters: ${bechStr}. `,
      }),
  });
});

/**
 * Unsafely calls Address.isValidBech32 without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const isValidBech32Unsafe = (bechStr: string): boolean =>
  Effect.runSync(isValidBech32(bechStr));

/**
 * Static method isValid of Address
 *
 * @since 2.0.0
 * @category Constructors
 */
export const isValid: (
  bechStr: string,
) => Effect.Effect<boolean, AddressError> = Effect.fn(function* (
  bechStr: string,
) {
  return yield* Effect.try({
    try: () => CML.Address.is_valid(bechStr),
    catch: () =>
      new AddressError({
        message: `Address.isValid failed with parameters: ${bechStr}. `,
      }),
  });
});

/**
 * Unsafely calls Address.isValid without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const isValidUnsafe = (bechStr: string): boolean =>
  Effect.runSync(isValid(bechStr));

/**
 * Method networkId of Address
 *
 * @since 2.0.0
 * @category Methods
 */
export const networkId: (
  instance: CML.Address,
) => Effect.Effect<number, AddressError> = Effect.fn((instance: CML.Address) =>
  Effect.try({
    try: () => instance.network_id(),
    catch: () =>
      new AddressError({
        message: `Address.networkId failed `,
      }),
  }),
);

/**
 * Unsafely calls instance.networkId without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const networkIdUnsafe = (instance: CML.Address): number =>
  Effect.runSync(networkId(instance));

/**
 * Method paymentCred of Address
 *
 * @since 2.0.0
 * @category Methods
 */
export const paymentCred: (
  instance: CML.Address,
) => Effect.Effect<CML.Credential | undefined, AddressError> = Effect.fn(
  (instance: CML.Address) =>
    Effect.try({
      try: () => instance.payment_cred(),
      catch: () =>
        new AddressError({
          message: `Address.paymentCred failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.paymentCred without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const paymentCredUnsafe = (
  instance: CML.Address,
): CML.Credential | undefined => Effect.runSync(paymentCred(instance));

/**
 * Method stakingCred of Address
 *
 * @since 2.0.0
 * @category Methods
 */
export const stakingCred: (
  instance: CML.Address,
) => Effect.Effect<CML.Credential | undefined, AddressError> = Effect.fn(
  (instance: CML.Address) =>
    Effect.try({
      try: () => instance.staking_cred(),
      catch: () =>
        new AddressError({
          message: `Address.stakingCred failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.stakingCred without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const stakingCredUnsafe = (
  instance: CML.Address,
): CML.Credential | undefined => Effect.runSync(stakingCred(instance));

/**
 * Method kind of Address
 *
 * @since 2.0.0
 * @category Methods
 */
export const kind: (
  instance: CML.Address,
) => Effect.Effect<CML.AddressKind, AddressError> = Effect.fn(
  (instance: CML.Address) =>
    Effect.try({
      try: () => instance.kind(),
      catch: () =>
        new AddressError({
          message: `Address.kind failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.kind without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const kindUnsafe = (instance: CML.Address): CML.AddressKind =>
  Effect.runSync(kind(instance));

/**
 * Method toRawBytes of Address
 *
 * @since 2.0.0
 * @category Methods
 */
export const toRawBytes: (
  instance: CML.Address,
) => Effect.Effect<Uint8Array, AddressError> = Effect.fn(
  (instance: CML.Address) =>
    Effect.try({
      try: () => instance.to_raw_bytes(),
      catch: () =>
        new AddressError({
          message: `Address.toRawBytes failed Address is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toRawBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toRawBytesUnsafe = (instance: CML.Address): Uint8Array =>
  Effect.runSync(toRawBytes(instance));

/**
 * Static method fromRawBytes of Address
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromRawBytes: (
  data: Uint8Array,
) => Effect.Effect<CML.Address, AddressError> = Effect.fn(function* (
  data: Uint8Array,
) {
  return yield* Effect.try({
    try: () => CML.Address.from_raw_bytes(data),
    catch: () =>
      new AddressError({
        message: `Address.fromRawBytes failed with parameters: ${data}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls Address.fromRawBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromRawBytesUnsafe = (data: Uint8Array): CML.Address =>
  Effect.runSync(fromRawBytes(data));

/**
 * Method toHex of Address
 *
 * @since 2.0.0
 * @category Methods
 */
export const toHex: (
  instance: CML.Address,
) => Effect.Effect<string, AddressError> = Effect.fn((instance: CML.Address) =>
  Effect.try({
    try: () => instance.to_hex(),
    catch: () =>
      new AddressError({
        message: `Address.toHex failed Address is not valid for string conversion. Hint: Ensure hex string has valid characters and length.`,
      }),
  }),
);

/**
 * Unsafely calls instance.toHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toHexUnsafe = (instance: CML.Address): string =>
  Effect.runSync(toHex(instance));

/**
 * Static method fromHex of Address
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromHex: (
  hex: string,
) => Effect.Effect<CML.Address, AddressError> = Effect.fn(function* (
  hex: string,
) {
  return yield* Effect.try({
    try: () => CML.Address.from_hex(hex),
    catch: () =>
      new AddressError({
        message: `Address.fromHex failed with parameters: ${hex}. Hint: Ensure hex string has valid characters and length.`,
      }),
  });
});

/**
 * Unsafely calls Address.fromHex without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromHexUnsafe = (hex: string): CML.Address =>
  Effect.runSync(fromHex(hex));
