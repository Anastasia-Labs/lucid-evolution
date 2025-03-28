import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type ProposalProcedure = CML.ProposalProcedure;

export class ProposalProcedureError extends Data.TaggedError("ProposalProcedureError")<{
  message?: string;
}> {}

/**
 * Method free of ProposalProcedure
 * 
 * @example
 * import { ProposalProcedure } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProposalProcedure instance
 * const instance = ... ;
 *   const result = yield* ProposalProcedure.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.ProposalProcedure): Effect.Effect<void, ProposalProcedureError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new ProposalProcedureError({
          message: `ProposalProcedure.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { ProposalProcedure } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProposalProcedure instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProposalProcedure.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProposalProcedure.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.ProposalProcedure): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of ProposalProcedure
 * 
 * @example
 * import { ProposalProcedure } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProposalProcedure instance
 * const instance = ... ;
 *   const result = yield* ProposalProcedure.toCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.ProposalProcedure): Effect.Effect<Uint8Array, ProposalProcedureError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new ProposalProcedureError({
          message: `ProposalProcedure.toCborBytes failed ProposalProcedure is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @example
 * import { ProposalProcedure } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProposalProcedure instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProposalProcedure.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProposalProcedure.unsafeToCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (instance: CML.ProposalProcedure): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of ProposalProcedure
 * 
 * @example
 * import { ProposalProcedure } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProposalProcedure instance
 * const instance = ... ;
 *   const result = yield* ProposalProcedure.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.ProposalProcedure): Effect.Effect<Uint8Array, ProposalProcedureError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new ProposalProcedureError({
          message: `ProposalProcedure.toCanonicalCborBytes failed ProposalProcedure is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @example
 * import { ProposalProcedure } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProposalProcedure instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProposalProcedure.unsafeToCanonicalCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProposalProcedure.unsafeToCanonicalCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborBytes = (instance: CML.ProposalProcedure): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of ProposalProcedure
 * 
 * @example
 * import { ProposalProcedure } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* ProposalProcedure.fromCborBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.ProposalProcedure.from_cbor_bytes(cborBytes),
    catch: () => new ProposalProcedureError({
      message: `ProposalProcedure.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls ProposalProcedure.fromCborBytes without Effect wrapper
 * 
 * @example
 * import { ProposalProcedure } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProposalProcedure.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProposalProcedure.unsafeFromCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of ProposalProcedure
 * 
 * @example
 * import { ProposalProcedure } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProposalProcedure instance
 * const instance = ... ;
 *   const result = yield* ProposalProcedure.toCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.ProposalProcedure): Effect.Effect<string, ProposalProcedureError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new ProposalProcedureError({
          message: `ProposalProcedure.toCborHex failed ProposalProcedure is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @example
 * import { ProposalProcedure } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProposalProcedure instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProposalProcedure.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProposalProcedure.unsafeToCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (instance: CML.ProposalProcedure): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of ProposalProcedure
 * 
 * @example
 * import { ProposalProcedure } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProposalProcedure instance
 * const instance = ... ;
 *   const result = yield* ProposalProcedure.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.ProposalProcedure): Effect.Effect<string, ProposalProcedureError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new ProposalProcedureError({
          message: `ProposalProcedure.toCanonicalCborHex failed ProposalProcedure is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @example
 * import { ProposalProcedure } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProposalProcedure instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProposalProcedure.unsafeToCanonicalCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProposalProcedure.unsafeToCanonicalCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborHex = (instance: CML.ProposalProcedure): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of ProposalProcedure
 * 
 * @example
 * import { ProposalProcedure } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* ProposalProcedure.fromCborHex( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.ProposalProcedure.from_cbor_hex(cborBytes),
    catch: () => new ProposalProcedureError({
      message: `ProposalProcedure.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls ProposalProcedure.fromCborHex without Effect wrapper
 * 
 * @example
 * import { ProposalProcedure } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProposalProcedure.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProposalProcedure.unsafeFromCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of ProposalProcedure
 * 
 * @example
 * import { ProposalProcedure } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProposalProcedure instance
 * const instance = ... ;
 *   const result = yield* ProposalProcedure.toJson(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.ProposalProcedure): Effect.Effect<string, ProposalProcedureError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new ProposalProcedureError({
          message: `ProposalProcedure.toJson failed ProposalProcedure is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @example
 * import { ProposalProcedure } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProposalProcedure instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProposalProcedure.unsafeToJson(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProposalProcedure.unsafeToJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJson = (instance: CML.ProposalProcedure): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of ProposalProcedure
 * 
 * @example
 * import { ProposalProcedure } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProposalProcedure instance
 * const instance = ... ;
 *   const result = yield* ProposalProcedure.toJsValue(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.ProposalProcedure): Effect.Effect<any, ProposalProcedureError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new ProposalProcedureError({
          message: `ProposalProcedure.toJsValue failed ProposalProcedure is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @example
 * import { ProposalProcedure } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProposalProcedure instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProposalProcedure.unsafeToJsValue(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProposalProcedure.unsafeToJsValue failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJsValue = (instance: CML.ProposalProcedure): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of ProposalProcedure
 * 
 * @example
 * import { ProposalProcedure } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* ProposalProcedure.fromJson( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.ProposalProcedure.from_json(json),
    catch: () => new ProposalProcedureError({
      message: `ProposalProcedure.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls ProposalProcedure.fromJson without Effect wrapper
 * 
 * @example
 * import { ProposalProcedure } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProposalProcedure.unsafeFromJson( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProposalProcedure.unsafeFromJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromJson = (json: string) =>
  Effect.runSync(fromJson(json));

/**
 * Method deposit of ProposalProcedure
 * 
 * @example
 * import { ProposalProcedure } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProposalProcedure instance
 * const instance = ... ;
 *   const result = yield* ProposalProcedure.deposit(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const deposit = Effect.fn(
  (instance: CML.ProposalProcedure): Effect.Effect<bigint, ProposalProcedureError> =>
    Effect.try({
      try: () => instance.deposit(),
      catch: () =>
        new ProposalProcedureError({
          message: `ProposalProcedure.deposit failed `,
        }),
    })
);

/**
 * Unsafely calls instance.deposit without Effect wrapper
 * 
 * @example
 * import { ProposalProcedure } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProposalProcedure instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProposalProcedure.unsafeDeposit(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProposalProcedure.unsafeDeposit failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeDeposit = (instance: CML.ProposalProcedure): bigint =>
  Effect.runSync(deposit(instance));

/**
 * Method rewardAccount of ProposalProcedure
 * 
 * @example
 * import { ProposalProcedure } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProposalProcedure instance
 * const instance = ... ;
 *   const result = yield* ProposalProcedure.rewardAccount(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const rewardAccount = Effect.fn(
  (instance: CML.ProposalProcedure): Effect.Effect<CML.RewardAddress, ProposalProcedureError> =>
    Effect.try({
      try: () => instance.reward_account(),
      catch: () =>
        new ProposalProcedureError({
          message: `ProposalProcedure.rewardAccount failed `,
        }),
    })
);

/**
 * Unsafely calls instance.rewardAccount without Effect wrapper
 * 
 * @example
 * import { ProposalProcedure } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProposalProcedure instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProposalProcedure.unsafeRewardAccount(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProposalProcedure.unsafeRewardAccount failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeRewardAccount = (instance: CML.ProposalProcedure): CML.RewardAddress =>
  Effect.runSync(rewardAccount(instance));

/**
 * Method govAction of ProposalProcedure
 * 
 * @example
 * import { ProposalProcedure } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProposalProcedure instance
 * const instance = ... ;
 *   const result = yield* ProposalProcedure.govAction(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const govAction = Effect.fn(
  (instance: CML.ProposalProcedure): Effect.Effect<CML.GovAction, ProposalProcedureError> =>
    Effect.try({
      try: () => instance.gov_action(),
      catch: () =>
        new ProposalProcedureError({
          message: `ProposalProcedure.govAction failed `,
        }),
    })
);

/**
 * Unsafely calls instance.govAction without Effect wrapper
 * 
 * @example
 * import { ProposalProcedure } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProposalProcedure instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProposalProcedure.unsafeGovAction(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProposalProcedure.unsafeGovAction failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeGovAction = (instance: CML.ProposalProcedure): CML.GovAction =>
  Effect.runSync(govAction(instance));

/**
 * Method anchor of ProposalProcedure
 * 
 * @example
 * import { ProposalProcedure } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProposalProcedure instance
 * const instance = ... ;
 *   const result = yield* ProposalProcedure.anchor(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const anchor = Effect.fn(
  (instance: CML.ProposalProcedure): Effect.Effect<CML.Anchor, ProposalProcedureError> =>
    Effect.try({
      try: () => instance.anchor(),
      catch: () =>
        new ProposalProcedureError({
          message: `ProposalProcedure.anchor failed `,
        }),
    })
);

/**
 * Unsafely calls instance.anchor without Effect wrapper
 * 
 * @example
 * import { ProposalProcedure } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProposalProcedure instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProposalProcedure.unsafeAnchor(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProposalProcedure.unsafeAnchor failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAnchor = (instance: CML.ProposalProcedure): CML.Anchor =>
  Effect.runSync(anchor(instance));

/**
 * Static method _new of ProposalProcedure
 * 
 * @example
 * import { ProposalProcedure } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* ProposalProcedure._new( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (deposit: bigint, rewardAccount: CML.RewardAddress, govAction: CML.GovAction, anchor: CML.Anchor) {
  return yield* Effect.try({
    try: () => CML.ProposalProcedure.new(deposit, rewardAccount, govAction, anchor),
    catch: () => new ProposalProcedureError({
      message: `ProposalProcedure._new failed with parameters: ${deposit}, ${rewardAccount} (RewardAddress), ${govAction} (GovAction), ${anchor} (Anchor). `,
    }),
  });
});

/**
 * Unsafely calls ProposalProcedure._new without Effect wrapper
 * 
 * @example
 * import { ProposalProcedure } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProposalProcedure.unsafe_new( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProposalProcedure.unsafe_new failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = (deposit: bigint, rewardAccount: CML.RewardAddress, govAction: CML.GovAction, anchor: CML.Anchor) =>
  Effect.runSync(_new(deposit, rewardAccount, govAction, anchor));
