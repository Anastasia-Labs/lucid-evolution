/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML TreasuryWithdrawalsAction class
 *
 * @since 2.0.0
 * @category Types
 */
export type TreasuryWithdrawalsAction = CML.TreasuryWithdrawalsAction;

/**
 * Error class for TreasuryWithdrawalsAction operations
 * 
 * This error is thrown when operations on TreasuryWithdrawalsAction instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class TreasuryWithdrawalsActionError extends Data.TaggedError("TreasuryWithdrawalsActionError")<{
  message?: string;
}> {}

/**
 * Method free of TreasuryWithdrawalsAction
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.TreasuryWithdrawalsAction) => Effect.Effect<void, TreasuryWithdrawalsActionError> = Effect.fn(
  (instance: CML.TreasuryWithdrawalsAction) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new TreasuryWithdrawalsActionError({
          message: `TreasuryWithdrawalsAction.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.TreasuryWithdrawalsAction): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of TreasuryWithdrawalsAction
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (instance: CML.TreasuryWithdrawalsAction) => Effect.Effect<Uint8Array, TreasuryWithdrawalsActionError> = Effect.fn(
  (instance: CML.TreasuryWithdrawalsAction) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new TreasuryWithdrawalsActionError({
          message: `TreasuryWithdrawalsAction.toCborBytes failed TreasuryWithdrawalsAction is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.TreasuryWithdrawalsAction): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of TreasuryWithdrawalsAction
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (instance: CML.TreasuryWithdrawalsAction) => Effect.Effect<Uint8Array, TreasuryWithdrawalsActionError> = Effect.fn(
  (instance: CML.TreasuryWithdrawalsAction) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new TreasuryWithdrawalsActionError({
          message: `TreasuryWithdrawalsAction.toCanonicalCborBytes failed TreasuryWithdrawalsAction is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (instance: CML.TreasuryWithdrawalsAction): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of TreasuryWithdrawalsAction
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (cborBytes: Uint8Array) => Effect.Effect<CML.TreasuryWithdrawalsAction, TreasuryWithdrawalsActionError> = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.TreasuryWithdrawalsAction.from_cbor_bytes(cborBytes),
    catch: () => new TreasuryWithdrawalsActionError({
      message: `TreasuryWithdrawalsAction.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls TreasuryWithdrawalsAction.fromCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.TreasuryWithdrawalsAction =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of TreasuryWithdrawalsAction
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (instance: CML.TreasuryWithdrawalsAction) => Effect.Effect<string, TreasuryWithdrawalsActionError> = Effect.fn(
  (instance: CML.TreasuryWithdrawalsAction) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new TreasuryWithdrawalsActionError({
          message: `TreasuryWithdrawalsAction.toCborHex failed TreasuryWithdrawalsAction is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.TreasuryWithdrawalsAction): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of TreasuryWithdrawalsAction
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (instance: CML.TreasuryWithdrawalsAction) => Effect.Effect<string, TreasuryWithdrawalsActionError> = Effect.fn(
  (instance: CML.TreasuryWithdrawalsAction) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new TreasuryWithdrawalsActionError({
          message: `TreasuryWithdrawalsAction.toCanonicalCborHex failed TreasuryWithdrawalsAction is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.TreasuryWithdrawalsAction): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of TreasuryWithdrawalsAction
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (cborBytes: string) => Effect.Effect<CML.TreasuryWithdrawalsAction, TreasuryWithdrawalsActionError> = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.TreasuryWithdrawalsAction.from_cbor_hex(cborBytes),
    catch: () => new TreasuryWithdrawalsActionError({
      message: `TreasuryWithdrawalsAction.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls TreasuryWithdrawalsAction.fromCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.TreasuryWithdrawalsAction =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of TreasuryWithdrawalsAction
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (instance: CML.TreasuryWithdrawalsAction) => Effect.Effect<string, TreasuryWithdrawalsActionError> = Effect.fn(
  (instance: CML.TreasuryWithdrawalsAction) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new TreasuryWithdrawalsActionError({
          message: `TreasuryWithdrawalsAction.toJson failed TreasuryWithdrawalsAction is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.TreasuryWithdrawalsAction): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of TreasuryWithdrawalsAction
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (instance: CML.TreasuryWithdrawalsAction) => Effect.Effect<any, TreasuryWithdrawalsActionError> = Effect.fn(
  (instance: CML.TreasuryWithdrawalsAction) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new TreasuryWithdrawalsActionError({
          message: `TreasuryWithdrawalsAction.toJsValue failed TreasuryWithdrawalsAction is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.TreasuryWithdrawalsAction): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of TreasuryWithdrawalsAction
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (json: string) => Effect.Effect<CML.TreasuryWithdrawalsAction, TreasuryWithdrawalsActionError> = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.TreasuryWithdrawalsAction.from_json(json),
    catch: () => new TreasuryWithdrawalsActionError({
      message: `TreasuryWithdrawalsAction.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls TreasuryWithdrawalsAction.fromJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.TreasuryWithdrawalsAction =>
  Effect.runSync(fromJson(json));

/**
 * Method withdrawal of TreasuryWithdrawalsAction
 * 
 * @since 2.0.0
 * @category Methods
 */
export const withdrawal: (instance: CML.TreasuryWithdrawalsAction) => Effect.Effect<CML.MapRewardAccountToCoin, TreasuryWithdrawalsActionError> = Effect.fn(
  (instance: CML.TreasuryWithdrawalsAction) =>
    Effect.try({
      try: () => instance.withdrawal(),
      catch: () =>
        new TreasuryWithdrawalsActionError({
          message: `TreasuryWithdrawalsAction.withdrawal failed `,
        }),
    })
);

/**
 * Unsafely calls instance.withdrawal without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const withdrawalUnsafe = (instance: CML.TreasuryWithdrawalsAction): CML.MapRewardAccountToCoin =>
  Effect.runSync(withdrawal(instance));

/**
 * Method policyHash of TreasuryWithdrawalsAction
 * 
 * @since 2.0.0
 * @category Methods
 */
export const policyHash: (instance: CML.TreasuryWithdrawalsAction) => Effect.Effect<CML.ScriptHash | undefined, TreasuryWithdrawalsActionError> = Effect.fn(
  (instance: CML.TreasuryWithdrawalsAction) =>
    Effect.try({
      try: () => instance.policy_hash(),
      catch: () =>
        new TreasuryWithdrawalsActionError({
          message: `TreasuryWithdrawalsAction.policyHash failed `,
        }),
    })
);

/**
 * Unsafely calls instance.policyHash without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const policyHashUnsafe = (instance: CML.TreasuryWithdrawalsAction): CML.ScriptHash | undefined =>
  Effect.runSync(policyHash(instance));

/**
 * Static method _new of TreasuryWithdrawalsAction
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (withdrawal: CML.MapRewardAccountToCoin, policyHash: CML.ScriptHash) => Effect.Effect<CML.TreasuryWithdrawalsAction, TreasuryWithdrawalsActionError> = Effect.fn(function* (withdrawal: CML.MapRewardAccountToCoin, policyHash: CML.ScriptHash) {
  return yield* Effect.try({
    try: () => CML.TreasuryWithdrawalsAction.new(withdrawal, policyHash),
    catch: () => new TreasuryWithdrawalsActionError({
      message: `TreasuryWithdrawalsAction._new failed with parameters: ${withdrawal} (MapRewardAccountToCoin), ${policyHash} (ScriptHash). `,
    }),
  });
});

/**
 * Unsafely calls TreasuryWithdrawalsAction._new without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (withdrawal: CML.MapRewardAccountToCoin, policyHash: CML.ScriptHash): CML.TreasuryWithdrawalsAction =>
  Effect.runSync(_new(withdrawal, policyHash));
