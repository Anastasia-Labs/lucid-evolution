/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML ProposalProcedure class
 *
 * @since 2.0.0
 * @category Types
 */
export type ProposalProcedure = CML.ProposalProcedure;

/**
 * Error class for ProposalProcedure operations
 *
 * This error is thrown when operations on ProposalProcedure instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class ProposalProcedureError extends Data.TaggedError(
  "ProposalProcedureError",
)<{
  message?: string;
}> {}

/**
 * Method free of ProposalProcedure
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.ProposalProcedure,
) => Effect.Effect<void, ProposalProcedureError> = Effect.fn(
  (instance: CML.ProposalProcedure) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new ProposalProcedureError({
          message: `ProposalProcedure.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.ProposalProcedure): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of ProposalProcedure
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (
  instance: CML.ProposalProcedure,
) => Effect.Effect<Uint8Array, ProposalProcedureError> = Effect.fn(
  (instance: CML.ProposalProcedure) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new ProposalProcedureError({
          message: `ProposalProcedure.toCborBytes failed ProposalProcedure is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
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
  instance: CML.ProposalProcedure,
): Uint8Array => Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of ProposalProcedure
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (
  instance: CML.ProposalProcedure,
) => Effect.Effect<Uint8Array, ProposalProcedureError> = Effect.fn(
  (instance: CML.ProposalProcedure) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new ProposalProcedureError({
          message: `ProposalProcedure.toCanonicalCborBytes failed ProposalProcedure is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
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
  instance: CML.ProposalProcedure,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of ProposalProcedure
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.ProposalProcedure, ProposalProcedureError> = Effect.fn(
  function* (cborBytes: Uint8Array) {
    return yield* Effect.try({
      try: () => CML.ProposalProcedure.from_cbor_bytes(cborBytes),
      catch: () =>
        new ProposalProcedureError({
          message: `ProposalProcedure.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
        }),
    });
  },
);

/**
 * Unsafely calls ProposalProcedure.fromCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (
  cborBytes: Uint8Array,
): CML.ProposalProcedure => Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of ProposalProcedure
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (
  instance: CML.ProposalProcedure,
) => Effect.Effect<string, ProposalProcedureError> = Effect.fn(
  (instance: CML.ProposalProcedure) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new ProposalProcedureError({
          message: `ProposalProcedure.toCborHex failed ProposalProcedure is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.ProposalProcedure): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of ProposalProcedure
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (
  instance: CML.ProposalProcedure,
) => Effect.Effect<string, ProposalProcedureError> = Effect.fn(
  (instance: CML.ProposalProcedure) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new ProposalProcedureError({
          message: `ProposalProcedure.toCanonicalCborHex failed ProposalProcedure is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
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
  instance: CML.ProposalProcedure,
): string => Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of ProposalProcedure
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.ProposalProcedure, ProposalProcedureError> = Effect.fn(
  function* (cborBytes: string) {
    return yield* Effect.try({
      try: () => CML.ProposalProcedure.from_cbor_hex(cborBytes),
      catch: () =>
        new ProposalProcedureError({
          message: `ProposalProcedure.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    });
  },
);

/**
 * Unsafely calls ProposalProcedure.fromCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.ProposalProcedure =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of ProposalProcedure
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (
  instance: CML.ProposalProcedure,
) => Effect.Effect<string, ProposalProcedureError> = Effect.fn(
  (instance: CML.ProposalProcedure) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new ProposalProcedureError({
          message: `ProposalProcedure.toJson failed ProposalProcedure is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.ProposalProcedure): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of ProposalProcedure
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (
  instance: CML.ProposalProcedure,
) => Effect.Effect<any, ProposalProcedureError> = Effect.fn(
  (instance: CML.ProposalProcedure) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new ProposalProcedureError({
          message: `ProposalProcedure.toJsValue failed ProposalProcedure is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.ProposalProcedure): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of ProposalProcedure
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (
  json: string,
) => Effect.Effect<CML.ProposalProcedure, ProposalProcedureError> = Effect.fn(
  function* (json: string) {
    return yield* Effect.try({
      try: () => CML.ProposalProcedure.from_json(json),
      catch: () =>
        new ProposalProcedureError({
          message: `ProposalProcedure.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
        }),
    });
  },
);

/**
 * Unsafely calls ProposalProcedure.fromJson without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.ProposalProcedure =>
  Effect.runSync(fromJson(json));

/**
 * Method deposit of ProposalProcedure
 *
 * @since 2.0.0
 * @category Methods
 */
export const deposit: (
  instance: CML.ProposalProcedure,
) => Effect.Effect<bigint, ProposalProcedureError> = Effect.fn(
  (instance: CML.ProposalProcedure) =>
    Effect.try({
      try: () => instance.deposit(),
      catch: () =>
        new ProposalProcedureError({
          message: `ProposalProcedure.deposit failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.deposit without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const depositUnsafe = (instance: CML.ProposalProcedure): bigint =>
  Effect.runSync(deposit(instance));

/**
 * Method rewardAccount of ProposalProcedure
 *
 * @since 2.0.0
 * @category Methods
 */
export const rewardAccount: (
  instance: CML.ProposalProcedure,
) => Effect.Effect<CML.RewardAddress, ProposalProcedureError> = Effect.fn(
  (instance: CML.ProposalProcedure) =>
    Effect.try({
      try: () => instance.reward_account(),
      catch: () =>
        new ProposalProcedureError({
          message: `ProposalProcedure.rewardAccount failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.rewardAccount without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const rewardAccountUnsafe = (
  instance: CML.ProposalProcedure,
): CML.RewardAddress => Effect.runSync(rewardAccount(instance));

/**
 * Method govAction of ProposalProcedure
 *
 * @since 2.0.0
 * @category Methods
 */
export const govAction: (
  instance: CML.ProposalProcedure,
) => Effect.Effect<CML.GovAction, ProposalProcedureError> = Effect.fn(
  (instance: CML.ProposalProcedure) =>
    Effect.try({
      try: () => instance.gov_action(),
      catch: () =>
        new ProposalProcedureError({
          message: `ProposalProcedure.govAction failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.govAction without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const govActionUnsafe = (
  instance: CML.ProposalProcedure,
): CML.GovAction => Effect.runSync(govAction(instance));

/**
 * Method anchor of ProposalProcedure
 *
 * @since 2.0.0
 * @category Methods
 */
export const anchor: (
  instance: CML.ProposalProcedure,
) => Effect.Effect<CML.Anchor, ProposalProcedureError> = Effect.fn(
  (instance: CML.ProposalProcedure) =>
    Effect.try({
      try: () => instance.anchor(),
      catch: () =>
        new ProposalProcedureError({
          message: `ProposalProcedure.anchor failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.anchor without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const anchorUnsafe = (instance: CML.ProposalProcedure): CML.Anchor =>
  Effect.runSync(anchor(instance));

/**
 * Static method _new of ProposalProcedure
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (
  deposit: bigint,
  rewardAccount: CML.RewardAddress,
  govAction: CML.GovAction,
  anchor: CML.Anchor,
) => Effect.Effect<CML.ProposalProcedure, ProposalProcedureError> = Effect.fn(
  function* (
    deposit: bigint,
    rewardAccount: CML.RewardAddress,
    govAction: CML.GovAction,
    anchor: CML.Anchor,
  ) {
    return yield* Effect.try({
      try: () =>
        CML.ProposalProcedure.new(deposit, rewardAccount, govAction, anchor),
      catch: () =>
        new ProposalProcedureError({
          message: `ProposalProcedure._new failed with parameters: ${deposit}, ${rewardAccount} (RewardAddress), ${govAction} (GovAction), ${anchor} (Anchor). `,
        }),
    });
  },
);

/**
 * Unsafely calls ProposalProcedure._new without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (
  deposit: bigint,
  rewardAccount: CML.RewardAddress,
  govAction: CML.GovAction,
  anchor: CML.Anchor,
): CML.ProposalProcedure =>
  Effect.runSync(_new(deposit, rewardAccount, govAction, anchor));
