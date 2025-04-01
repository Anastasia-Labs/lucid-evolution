/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML ProtocolParamUpdate class
 *
 * @since 2.0.0
 * @category Types
 */
export type ProtocolParamUpdate = CML.ProtocolParamUpdate;

/**
 * Error class for ProtocolParamUpdate operations
 * 
 * This error is thrown when operations on ProtocolParamUpdate instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class ProtocolParamUpdateError extends Data.TaggedError("ProtocolParamUpdateError")<{
  message?: string;
}> {}

/**
 * Method free of ProtocolParamUpdate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.ProtocolParamUpdate) => Effect.Effect<void, ProtocolParamUpdateError> = Effect.fn(
  (instance: CML.ProtocolParamUpdate) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.ProtocolParamUpdate): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of ProtocolParamUpdate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (instance: CML.ProtocolParamUpdate) => Effect.Effect<Uint8Array, ProtocolParamUpdateError> = Effect.fn(
  (instance: CML.ProtocolParamUpdate) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.toCborBytes failed ProtocolParamUpdate is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.ProtocolParamUpdate): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of ProtocolParamUpdate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (instance: CML.ProtocolParamUpdate) => Effect.Effect<Uint8Array, ProtocolParamUpdateError> = Effect.fn(
  (instance: CML.ProtocolParamUpdate) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.toCanonicalCborBytes failed ProtocolParamUpdate is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (instance: CML.ProtocolParamUpdate): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of ProtocolParamUpdate
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (cborBytes: Uint8Array) => Effect.Effect<CML.ProtocolParamUpdate, ProtocolParamUpdateError> = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.ProtocolParamUpdate.from_cbor_bytes(cborBytes),
    catch: () => new ProtocolParamUpdateError({
      message: `ProtocolParamUpdate.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls ProtocolParamUpdate.fromCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.ProtocolParamUpdate =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of ProtocolParamUpdate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (instance: CML.ProtocolParamUpdate) => Effect.Effect<string, ProtocolParamUpdateError> = Effect.fn(
  (instance: CML.ProtocolParamUpdate) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.toCborHex failed ProtocolParamUpdate is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.ProtocolParamUpdate): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of ProtocolParamUpdate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (instance: CML.ProtocolParamUpdate) => Effect.Effect<string, ProtocolParamUpdateError> = Effect.fn(
  (instance: CML.ProtocolParamUpdate) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.toCanonicalCborHex failed ProtocolParamUpdate is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.ProtocolParamUpdate): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of ProtocolParamUpdate
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (cborBytes: string) => Effect.Effect<CML.ProtocolParamUpdate, ProtocolParamUpdateError> = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.ProtocolParamUpdate.from_cbor_hex(cborBytes),
    catch: () => new ProtocolParamUpdateError({
      message: `ProtocolParamUpdate.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls ProtocolParamUpdate.fromCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.ProtocolParamUpdate =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of ProtocolParamUpdate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (instance: CML.ProtocolParamUpdate) => Effect.Effect<string, ProtocolParamUpdateError> = Effect.fn(
  (instance: CML.ProtocolParamUpdate) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.toJson failed ProtocolParamUpdate is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.ProtocolParamUpdate): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of ProtocolParamUpdate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (instance: CML.ProtocolParamUpdate) => Effect.Effect<any, ProtocolParamUpdateError> = Effect.fn(
  (instance: CML.ProtocolParamUpdate) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.toJsValue failed ProtocolParamUpdate is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.ProtocolParamUpdate): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of ProtocolParamUpdate
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (json: string) => Effect.Effect<CML.ProtocolParamUpdate, ProtocolParamUpdateError> = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.ProtocolParamUpdate.from_json(json),
    catch: () => new ProtocolParamUpdateError({
      message: `ProtocolParamUpdate.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls ProtocolParamUpdate.fromJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.ProtocolParamUpdate =>
  Effect.runSync(fromJson(json));

/**
 * Method setMinfeeA of ProtocolParamUpdate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setMinfeeA: (instance: CML.ProtocolParamUpdate, minfeeA: bigint) => Effect.Effect<void, ProtocolParamUpdateError> = Effect.fn(
  (instance: CML.ProtocolParamUpdate, minfeeA: bigint) =>
    Effect.try({
      try: () => instance.set_minfee_a(minfeeA),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setMinfeeA failed with parameters: ${minfeeA}. `,
        }),
    })
);

/**
 * Unsafely calls instance.setMinfeeA without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setMinfeeAUnsafe = (instance: CML.ProtocolParamUpdate, minfeeA: bigint): void =>
  Effect.runSync(setMinfeeA(instance, minfeeA));

/**
 * Method minfeeA of ProtocolParamUpdate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const minfeeA: (instance: CML.ProtocolParamUpdate) => Effect.Effect<bigint | undefined, ProtocolParamUpdateError> = Effect.fn(
  (instance: CML.ProtocolParamUpdate) =>
    Effect.try({
      try: () => instance.minfee_a(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.minfeeA failed `,
        }),
    })
);

/**
 * Unsafely calls instance.minfeeA without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const minfeeAUnsafe = (instance: CML.ProtocolParamUpdate): bigint | undefined =>
  Effect.runSync(minfeeA(instance));

/**
 * Method setMinfeeB of ProtocolParamUpdate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setMinfeeB: (instance: CML.ProtocolParamUpdate, minfeeB: bigint) => Effect.Effect<void, ProtocolParamUpdateError> = Effect.fn(
  (instance: CML.ProtocolParamUpdate, minfeeB: bigint) =>
    Effect.try({
      try: () => instance.set_minfee_b(minfeeB),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setMinfeeB failed with parameters: ${minfeeB}. `,
        }),
    })
);

/**
 * Unsafely calls instance.setMinfeeB without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setMinfeeBUnsafe = (instance: CML.ProtocolParamUpdate, minfeeB: bigint): void =>
  Effect.runSync(setMinfeeB(instance, minfeeB));

/**
 * Method minfeeB of ProtocolParamUpdate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const minfeeB: (instance: CML.ProtocolParamUpdate) => Effect.Effect<bigint | undefined, ProtocolParamUpdateError> = Effect.fn(
  (instance: CML.ProtocolParamUpdate) =>
    Effect.try({
      try: () => instance.minfee_b(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.minfeeB failed `,
        }),
    })
);

/**
 * Unsafely calls instance.minfeeB without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const minfeeBUnsafe = (instance: CML.ProtocolParamUpdate): bigint | undefined =>
  Effect.runSync(minfeeB(instance));

/**
 * Method setMaxBlockBodySize of ProtocolParamUpdate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setMaxBlockBodySize: (instance: CML.ProtocolParamUpdate, maxBlockBodySize: bigint) => Effect.Effect<void, ProtocolParamUpdateError> = Effect.fn(
  (instance: CML.ProtocolParamUpdate, maxBlockBodySize: bigint) =>
    Effect.try({
      try: () => instance.set_max_block_body_size(maxBlockBodySize),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setMaxBlockBodySize failed with parameters: ${maxBlockBodySize}. `,
        }),
    })
);

/**
 * Unsafely calls instance.setMaxBlockBodySize without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setMaxBlockBodySizeUnsafe = (instance: CML.ProtocolParamUpdate, maxBlockBodySize: bigint): void =>
  Effect.runSync(setMaxBlockBodySize(instance, maxBlockBodySize));

/**
 * Method maxBlockBodySize of ProtocolParamUpdate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const maxBlockBodySize: (instance: CML.ProtocolParamUpdate) => Effect.Effect<bigint | undefined, ProtocolParamUpdateError> = Effect.fn(
  (instance: CML.ProtocolParamUpdate) =>
    Effect.try({
      try: () => instance.max_block_body_size(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.maxBlockBodySize failed `,
        }),
    })
);

/**
 * Unsafely calls instance.maxBlockBodySize without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const maxBlockBodySizeUnsafe = (instance: CML.ProtocolParamUpdate): bigint | undefined =>
  Effect.runSync(maxBlockBodySize(instance));

/**
 * Method setMaxTransactionSize of ProtocolParamUpdate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setMaxTransactionSize: (instance: CML.ProtocolParamUpdate, maxTransactionSize: bigint) => Effect.Effect<void, ProtocolParamUpdateError> = Effect.fn(
  (instance: CML.ProtocolParamUpdate, maxTransactionSize: bigint) =>
    Effect.try({
      try: () => instance.set_max_transaction_size(maxTransactionSize),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setMaxTransactionSize failed with parameters: ${maxTransactionSize}. `,
        }),
    })
);

/**
 * Unsafely calls instance.setMaxTransactionSize without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setMaxTransactionSizeUnsafe = (instance: CML.ProtocolParamUpdate, maxTransactionSize: bigint): void =>
  Effect.runSync(setMaxTransactionSize(instance, maxTransactionSize));

/**
 * Method maxTransactionSize of ProtocolParamUpdate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const maxTransactionSize: (instance: CML.ProtocolParamUpdate) => Effect.Effect<bigint | undefined, ProtocolParamUpdateError> = Effect.fn(
  (instance: CML.ProtocolParamUpdate) =>
    Effect.try({
      try: () => instance.max_transaction_size(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.maxTransactionSize failed `,
        }),
    })
);

/**
 * Unsafely calls instance.maxTransactionSize without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const maxTransactionSizeUnsafe = (instance: CML.ProtocolParamUpdate): bigint | undefined =>
  Effect.runSync(maxTransactionSize(instance));

/**
 * Method setMaxBlockHeaderSize of ProtocolParamUpdate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setMaxBlockHeaderSize: (instance: CML.ProtocolParamUpdate, maxBlockHeaderSize: bigint) => Effect.Effect<void, ProtocolParamUpdateError> = Effect.fn(
  (instance: CML.ProtocolParamUpdate, maxBlockHeaderSize: bigint) =>
    Effect.try({
      try: () => instance.set_max_block_header_size(maxBlockHeaderSize),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setMaxBlockHeaderSize failed with parameters: ${maxBlockHeaderSize}. `,
        }),
    })
);

/**
 * Unsafely calls instance.setMaxBlockHeaderSize without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setMaxBlockHeaderSizeUnsafe = (instance: CML.ProtocolParamUpdate, maxBlockHeaderSize: bigint): void =>
  Effect.runSync(setMaxBlockHeaderSize(instance, maxBlockHeaderSize));

/**
 * Method maxBlockHeaderSize of ProtocolParamUpdate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const maxBlockHeaderSize: (instance: CML.ProtocolParamUpdate) => Effect.Effect<bigint | undefined, ProtocolParamUpdateError> = Effect.fn(
  (instance: CML.ProtocolParamUpdate) =>
    Effect.try({
      try: () => instance.max_block_header_size(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.maxBlockHeaderSize failed `,
        }),
    })
);

/**
 * Unsafely calls instance.maxBlockHeaderSize without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const maxBlockHeaderSizeUnsafe = (instance: CML.ProtocolParamUpdate): bigint | undefined =>
  Effect.runSync(maxBlockHeaderSize(instance));

/**
 * Method setKeyDeposit of ProtocolParamUpdate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setKeyDeposit: (instance: CML.ProtocolParamUpdate, keyDeposit: bigint) => Effect.Effect<void, ProtocolParamUpdateError> = Effect.fn(
  (instance: CML.ProtocolParamUpdate, keyDeposit: bigint) =>
    Effect.try({
      try: () => instance.set_key_deposit(keyDeposit),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setKeyDeposit failed with parameters: ${keyDeposit}. `,
        }),
    })
);

/**
 * Unsafely calls instance.setKeyDeposit without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setKeyDepositUnsafe = (instance: CML.ProtocolParamUpdate, keyDeposit: bigint): void =>
  Effect.runSync(setKeyDeposit(instance, keyDeposit));

/**
 * Method keyDeposit of ProtocolParamUpdate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const keyDeposit: (instance: CML.ProtocolParamUpdate) => Effect.Effect<bigint | undefined, ProtocolParamUpdateError> = Effect.fn(
  (instance: CML.ProtocolParamUpdate) =>
    Effect.try({
      try: () => instance.key_deposit(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.keyDeposit failed `,
        }),
    })
);

/**
 * Unsafely calls instance.keyDeposit without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const keyDepositUnsafe = (instance: CML.ProtocolParamUpdate): bigint | undefined =>
  Effect.runSync(keyDeposit(instance));

/**
 * Method setPoolDeposit of ProtocolParamUpdate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setPoolDeposit: (instance: CML.ProtocolParamUpdate, poolDeposit: bigint) => Effect.Effect<void, ProtocolParamUpdateError> = Effect.fn(
  (instance: CML.ProtocolParamUpdate, poolDeposit: bigint) =>
    Effect.try({
      try: () => instance.set_pool_deposit(poolDeposit),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setPoolDeposit failed with parameters: ${poolDeposit}. `,
        }),
    })
);

/**
 * Unsafely calls instance.setPoolDeposit without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setPoolDepositUnsafe = (instance: CML.ProtocolParamUpdate, poolDeposit: bigint): void =>
  Effect.runSync(setPoolDeposit(instance, poolDeposit));

/**
 * Method poolDeposit of ProtocolParamUpdate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const poolDeposit: (instance: CML.ProtocolParamUpdate) => Effect.Effect<bigint | undefined, ProtocolParamUpdateError> = Effect.fn(
  (instance: CML.ProtocolParamUpdate) =>
    Effect.try({
      try: () => instance.pool_deposit(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.poolDeposit failed `,
        }),
    })
);

/**
 * Unsafely calls instance.poolDeposit without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const poolDepositUnsafe = (instance: CML.ProtocolParamUpdate): bigint | undefined =>
  Effect.runSync(poolDeposit(instance));

/**
 * Method setMaximumEpoch of ProtocolParamUpdate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setMaximumEpoch: (instance: CML.ProtocolParamUpdate, maximumEpoch: bigint) => Effect.Effect<void, ProtocolParamUpdateError> = Effect.fn(
  (instance: CML.ProtocolParamUpdate, maximumEpoch: bigint) =>
    Effect.try({
      try: () => instance.set_maximum_epoch(maximumEpoch),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setMaximumEpoch failed with parameters: ${maximumEpoch}. `,
        }),
    })
);

/**
 * Unsafely calls instance.setMaximumEpoch without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setMaximumEpochUnsafe = (instance: CML.ProtocolParamUpdate, maximumEpoch: bigint): void =>
  Effect.runSync(setMaximumEpoch(instance, maximumEpoch));

/**
 * Method maximumEpoch of ProtocolParamUpdate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const maximumEpoch: (instance: CML.ProtocolParamUpdate) => Effect.Effect<bigint | undefined, ProtocolParamUpdateError> = Effect.fn(
  (instance: CML.ProtocolParamUpdate) =>
    Effect.try({
      try: () => instance.maximum_epoch(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.maximumEpoch failed `,
        }),
    })
);

/**
 * Unsafely calls instance.maximumEpoch without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const maximumEpochUnsafe = (instance: CML.ProtocolParamUpdate): bigint | undefined =>
  Effect.runSync(maximumEpoch(instance));

/**
 * Method setNOpt of ProtocolParamUpdate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setNOpt: (instance: CML.ProtocolParamUpdate, nOpt: bigint) => Effect.Effect<void, ProtocolParamUpdateError> = Effect.fn(
  (instance: CML.ProtocolParamUpdate, nOpt: bigint) =>
    Effect.try({
      try: () => instance.set_n_opt(nOpt),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setNOpt failed with parameters: ${nOpt}. `,
        }),
    })
);

/**
 * Unsafely calls instance.setNOpt without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setNOptUnsafe = (instance: CML.ProtocolParamUpdate, nOpt: bigint): void =>
  Effect.runSync(setNOpt(instance, nOpt));

/**
 * Method nOpt of ProtocolParamUpdate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const nOpt: (instance: CML.ProtocolParamUpdate) => Effect.Effect<bigint | undefined, ProtocolParamUpdateError> = Effect.fn(
  (instance: CML.ProtocolParamUpdate) =>
    Effect.try({
      try: () => instance.n_opt(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.nOpt failed `,
        }),
    })
);

/**
 * Unsafely calls instance.nOpt without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const nOptUnsafe = (instance: CML.ProtocolParamUpdate): bigint | undefined =>
  Effect.runSync(nOpt(instance));

/**
 * Method setPoolPledgeInfluence of ProtocolParamUpdate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setPoolPledgeInfluence: (instance: CML.ProtocolParamUpdate, poolPledgeInfluence: CML.Rational) => Effect.Effect<void, ProtocolParamUpdateError> = Effect.fn(
  (instance: CML.ProtocolParamUpdate, poolPledgeInfluence: CML.Rational) =>
    Effect.try({
      try: () => instance.set_pool_pledge_influence(poolPledgeInfluence),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setPoolPledgeInfluence failed with parameters: ${poolPledgeInfluence} (Rational). `,
        }),
    })
);

/**
 * Unsafely calls instance.setPoolPledgeInfluence without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setPoolPledgeInfluenceUnsafe = (instance: CML.ProtocolParamUpdate, poolPledgeInfluence: CML.Rational): void =>
  Effect.runSync(setPoolPledgeInfluence(instance, poolPledgeInfluence));

/**
 * Method poolPledgeInfluence of ProtocolParamUpdate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const poolPledgeInfluence: (instance: CML.ProtocolParamUpdate) => Effect.Effect<CML.Rational | undefined, ProtocolParamUpdateError> = Effect.fn(
  (instance: CML.ProtocolParamUpdate) =>
    Effect.try({
      try: () => instance.pool_pledge_influence(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.poolPledgeInfluence failed `,
        }),
    })
);

/**
 * Unsafely calls instance.poolPledgeInfluence without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const poolPledgeInfluenceUnsafe = (instance: CML.ProtocolParamUpdate): CML.Rational | undefined =>
  Effect.runSync(poolPledgeInfluence(instance));

/**
 * Method setExpansionRate of ProtocolParamUpdate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setExpansionRate: (instance: CML.ProtocolParamUpdate, expansionRate: CML.UnitInterval) => Effect.Effect<void, ProtocolParamUpdateError> = Effect.fn(
  (instance: CML.ProtocolParamUpdate, expansionRate: CML.UnitInterval) =>
    Effect.try({
      try: () => instance.set_expansion_rate(expansionRate),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setExpansionRate failed with parameters: ${expansionRate} (UnitInterval). `,
        }),
    })
);

/**
 * Unsafely calls instance.setExpansionRate without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setExpansionRateUnsafe = (instance: CML.ProtocolParamUpdate, expansionRate: CML.UnitInterval): void =>
  Effect.runSync(setExpansionRate(instance, expansionRate));

/**
 * Method expansionRate of ProtocolParamUpdate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const expansionRate: (instance: CML.ProtocolParamUpdate) => Effect.Effect<CML.UnitInterval | undefined, ProtocolParamUpdateError> = Effect.fn(
  (instance: CML.ProtocolParamUpdate) =>
    Effect.try({
      try: () => instance.expansion_rate(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.expansionRate failed `,
        }),
    })
);

/**
 * Unsafely calls instance.expansionRate without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const expansionRateUnsafe = (instance: CML.ProtocolParamUpdate): CML.UnitInterval | undefined =>
  Effect.runSync(expansionRate(instance));

/**
 * Method setTreasuryGrowthRate of ProtocolParamUpdate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setTreasuryGrowthRate: (instance: CML.ProtocolParamUpdate, treasuryGrowthRate: CML.UnitInterval) => Effect.Effect<void, ProtocolParamUpdateError> = Effect.fn(
  (instance: CML.ProtocolParamUpdate, treasuryGrowthRate: CML.UnitInterval) =>
    Effect.try({
      try: () => instance.set_treasury_growth_rate(treasuryGrowthRate),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setTreasuryGrowthRate failed with parameters: ${treasuryGrowthRate} (UnitInterval). `,
        }),
    })
);

/**
 * Unsafely calls instance.setTreasuryGrowthRate without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setTreasuryGrowthRateUnsafe = (instance: CML.ProtocolParamUpdate, treasuryGrowthRate: CML.UnitInterval): void =>
  Effect.runSync(setTreasuryGrowthRate(instance, treasuryGrowthRate));

/**
 * Method treasuryGrowthRate of ProtocolParamUpdate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const treasuryGrowthRate: (instance: CML.ProtocolParamUpdate) => Effect.Effect<CML.UnitInterval | undefined, ProtocolParamUpdateError> = Effect.fn(
  (instance: CML.ProtocolParamUpdate) =>
    Effect.try({
      try: () => instance.treasury_growth_rate(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.treasuryGrowthRate failed `,
        }),
    })
);

/**
 * Unsafely calls instance.treasuryGrowthRate without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const treasuryGrowthRateUnsafe = (instance: CML.ProtocolParamUpdate): CML.UnitInterval | undefined =>
  Effect.runSync(treasuryGrowthRate(instance));

/**
 * Method setMinPoolCost of ProtocolParamUpdate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setMinPoolCost: (instance: CML.ProtocolParamUpdate, minPoolCost: bigint) => Effect.Effect<void, ProtocolParamUpdateError> = Effect.fn(
  (instance: CML.ProtocolParamUpdate, minPoolCost: bigint) =>
    Effect.try({
      try: () => instance.set_min_pool_cost(minPoolCost),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setMinPoolCost failed with parameters: ${minPoolCost}. `,
        }),
    })
);

/**
 * Unsafely calls instance.setMinPoolCost without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setMinPoolCostUnsafe = (instance: CML.ProtocolParamUpdate, minPoolCost: bigint): void =>
  Effect.runSync(setMinPoolCost(instance, minPoolCost));

/**
 * Method minPoolCost of ProtocolParamUpdate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const minPoolCost: (instance: CML.ProtocolParamUpdate) => Effect.Effect<bigint | undefined, ProtocolParamUpdateError> = Effect.fn(
  (instance: CML.ProtocolParamUpdate) =>
    Effect.try({
      try: () => instance.min_pool_cost(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.minPoolCost failed `,
        }),
    })
);

/**
 * Unsafely calls instance.minPoolCost without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const minPoolCostUnsafe = (instance: CML.ProtocolParamUpdate): bigint | undefined =>
  Effect.runSync(minPoolCost(instance));

/**
 * Method setAdaPerUtxoByte of ProtocolParamUpdate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setAdaPerUtxoByte: (instance: CML.ProtocolParamUpdate, adaPerUtxoByte: bigint) => Effect.Effect<void, ProtocolParamUpdateError> = Effect.fn(
  (instance: CML.ProtocolParamUpdate, adaPerUtxoByte: bigint) =>
    Effect.try({
      try: () => instance.set_ada_per_utxo_byte(adaPerUtxoByte),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setAdaPerUtxoByte failed with parameters: ${adaPerUtxoByte}. `,
        }),
    })
);

/**
 * Unsafely calls instance.setAdaPerUtxoByte without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setAdaPerUtxoByteUnsafe = (instance: CML.ProtocolParamUpdate, adaPerUtxoByte: bigint): void =>
  Effect.runSync(setAdaPerUtxoByte(instance, adaPerUtxoByte));

/**
 * Method adaPerUtxoByte of ProtocolParamUpdate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const adaPerUtxoByte: (instance: CML.ProtocolParamUpdate) => Effect.Effect<bigint | undefined, ProtocolParamUpdateError> = Effect.fn(
  (instance: CML.ProtocolParamUpdate) =>
    Effect.try({
      try: () => instance.ada_per_utxo_byte(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.adaPerUtxoByte failed `,
        }),
    })
);

/**
 * Unsafely calls instance.adaPerUtxoByte without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const adaPerUtxoByteUnsafe = (instance: CML.ProtocolParamUpdate): bigint | undefined =>
  Effect.runSync(adaPerUtxoByte(instance));

/**
 * Method setCostModelsForScriptLanguages of ProtocolParamUpdate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setCostModelsForScriptLanguages: (instance: CML.ProtocolParamUpdate, costModelsForScriptLanguages: CML.CostModels) => Effect.Effect<void, ProtocolParamUpdateError> = Effect.fn(
  (instance: CML.ProtocolParamUpdate, costModelsForScriptLanguages: CML.CostModels) =>
    Effect.try({
      try: () => instance.set_cost_models_for_script_languages(costModelsForScriptLanguages),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setCostModelsForScriptLanguages failed with parameters: ${costModelsForScriptLanguages} (CostModels). `,
        }),
    })
);

/**
 * Unsafely calls instance.setCostModelsForScriptLanguages without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setCostModelsForScriptLanguagesUnsafe = (instance: CML.ProtocolParamUpdate, costModelsForScriptLanguages: CML.CostModels): void =>
  Effect.runSync(setCostModelsForScriptLanguages(instance, costModelsForScriptLanguages));

/**
 * Method costModelsForScriptLanguages of ProtocolParamUpdate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const costModelsForScriptLanguages: (instance: CML.ProtocolParamUpdate) => Effect.Effect<CML.CostModels | undefined, ProtocolParamUpdateError> = Effect.fn(
  (instance: CML.ProtocolParamUpdate) =>
    Effect.try({
      try: () => instance.cost_models_for_script_languages(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.costModelsForScriptLanguages failed `,
        }),
    })
);

/**
 * Unsafely calls instance.costModelsForScriptLanguages without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const costModelsForScriptLanguagesUnsafe = (instance: CML.ProtocolParamUpdate): CML.CostModels | undefined =>
  Effect.runSync(costModelsForScriptLanguages(instance));

/**
 * Method setExecutionCosts of ProtocolParamUpdate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setExecutionCosts: (instance: CML.ProtocolParamUpdate, executionCosts: CML.ExUnitPrices) => Effect.Effect<void, ProtocolParamUpdateError> = Effect.fn(
  (instance: CML.ProtocolParamUpdate, executionCosts: CML.ExUnitPrices) =>
    Effect.try({
      try: () => instance.set_execution_costs(executionCosts),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setExecutionCosts failed with parameters: ${executionCosts} (ExUnitPrices). `,
        }),
    })
);

/**
 * Unsafely calls instance.setExecutionCosts without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setExecutionCostsUnsafe = (instance: CML.ProtocolParamUpdate, executionCosts: CML.ExUnitPrices): void =>
  Effect.runSync(setExecutionCosts(instance, executionCosts));

/**
 * Method executionCosts of ProtocolParamUpdate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const executionCosts: (instance: CML.ProtocolParamUpdate) => Effect.Effect<CML.ExUnitPrices | undefined, ProtocolParamUpdateError> = Effect.fn(
  (instance: CML.ProtocolParamUpdate) =>
    Effect.try({
      try: () => instance.execution_costs(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.executionCosts failed `,
        }),
    })
);

/**
 * Unsafely calls instance.executionCosts without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const executionCostsUnsafe = (instance: CML.ProtocolParamUpdate): CML.ExUnitPrices | undefined =>
  Effect.runSync(executionCosts(instance));

/**
 * Method setMaxTxExUnits of ProtocolParamUpdate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setMaxTxExUnits: (instance: CML.ProtocolParamUpdate, maxTxExUnits: CML.ExUnits) => Effect.Effect<void, ProtocolParamUpdateError> = Effect.fn(
  (instance: CML.ProtocolParamUpdate, maxTxExUnits: CML.ExUnits) =>
    Effect.try({
      try: () => instance.set_max_tx_ex_units(maxTxExUnits),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setMaxTxExUnits failed with parameters: ${maxTxExUnits} (ExUnits). `,
        }),
    })
);

/**
 * Unsafely calls instance.setMaxTxExUnits without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setMaxTxExUnitsUnsafe = (instance: CML.ProtocolParamUpdate, maxTxExUnits: CML.ExUnits): void =>
  Effect.runSync(setMaxTxExUnits(instance, maxTxExUnits));

/**
 * Method maxTxExUnits of ProtocolParamUpdate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const maxTxExUnits: (instance: CML.ProtocolParamUpdate) => Effect.Effect<CML.ExUnits | undefined, ProtocolParamUpdateError> = Effect.fn(
  (instance: CML.ProtocolParamUpdate) =>
    Effect.try({
      try: () => instance.max_tx_ex_units(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.maxTxExUnits failed `,
        }),
    })
);

/**
 * Unsafely calls instance.maxTxExUnits without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const maxTxExUnitsUnsafe = (instance: CML.ProtocolParamUpdate): CML.ExUnits | undefined =>
  Effect.runSync(maxTxExUnits(instance));

/**
 * Method setMaxBlockExUnits of ProtocolParamUpdate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setMaxBlockExUnits: (instance: CML.ProtocolParamUpdate, maxBlockExUnits: CML.ExUnits) => Effect.Effect<void, ProtocolParamUpdateError> = Effect.fn(
  (instance: CML.ProtocolParamUpdate, maxBlockExUnits: CML.ExUnits) =>
    Effect.try({
      try: () => instance.set_max_block_ex_units(maxBlockExUnits),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setMaxBlockExUnits failed with parameters: ${maxBlockExUnits} (ExUnits). `,
        }),
    })
);

/**
 * Unsafely calls instance.setMaxBlockExUnits without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setMaxBlockExUnitsUnsafe = (instance: CML.ProtocolParamUpdate, maxBlockExUnits: CML.ExUnits): void =>
  Effect.runSync(setMaxBlockExUnits(instance, maxBlockExUnits));

/**
 * Method maxBlockExUnits of ProtocolParamUpdate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const maxBlockExUnits: (instance: CML.ProtocolParamUpdate) => Effect.Effect<CML.ExUnits | undefined, ProtocolParamUpdateError> = Effect.fn(
  (instance: CML.ProtocolParamUpdate) =>
    Effect.try({
      try: () => instance.max_block_ex_units(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.maxBlockExUnits failed `,
        }),
    })
);

/**
 * Unsafely calls instance.maxBlockExUnits without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const maxBlockExUnitsUnsafe = (instance: CML.ProtocolParamUpdate): CML.ExUnits | undefined =>
  Effect.runSync(maxBlockExUnits(instance));

/**
 * Method setMaxValueSize of ProtocolParamUpdate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setMaxValueSize: (instance: CML.ProtocolParamUpdate, maxValueSize: bigint) => Effect.Effect<void, ProtocolParamUpdateError> = Effect.fn(
  (instance: CML.ProtocolParamUpdate, maxValueSize: bigint) =>
    Effect.try({
      try: () => instance.set_max_value_size(maxValueSize),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setMaxValueSize failed with parameters: ${maxValueSize}. `,
        }),
    })
);

/**
 * Unsafely calls instance.setMaxValueSize without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setMaxValueSizeUnsafe = (instance: CML.ProtocolParamUpdate, maxValueSize: bigint): void =>
  Effect.runSync(setMaxValueSize(instance, maxValueSize));

/**
 * Method maxValueSize of ProtocolParamUpdate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const maxValueSize: (instance: CML.ProtocolParamUpdate) => Effect.Effect<bigint | undefined, ProtocolParamUpdateError> = Effect.fn(
  (instance: CML.ProtocolParamUpdate) =>
    Effect.try({
      try: () => instance.max_value_size(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.maxValueSize failed `,
        }),
    })
);

/**
 * Unsafely calls instance.maxValueSize without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const maxValueSizeUnsafe = (instance: CML.ProtocolParamUpdate): bigint | undefined =>
  Effect.runSync(maxValueSize(instance));

/**
 * Method setCollateralPercentage of ProtocolParamUpdate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setCollateralPercentage: (instance: CML.ProtocolParamUpdate, collateralPercentage: bigint) => Effect.Effect<void, ProtocolParamUpdateError> = Effect.fn(
  (instance: CML.ProtocolParamUpdate, collateralPercentage: bigint) =>
    Effect.try({
      try: () => instance.set_collateral_percentage(collateralPercentage),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setCollateralPercentage failed with parameters: ${collateralPercentage}. `,
        }),
    })
);

/**
 * Unsafely calls instance.setCollateralPercentage without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setCollateralPercentageUnsafe = (instance: CML.ProtocolParamUpdate, collateralPercentage: bigint): void =>
  Effect.runSync(setCollateralPercentage(instance, collateralPercentage));

/**
 * Method collateralPercentage of ProtocolParamUpdate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const collateralPercentage: (instance: CML.ProtocolParamUpdate) => Effect.Effect<bigint | undefined, ProtocolParamUpdateError> = Effect.fn(
  (instance: CML.ProtocolParamUpdate) =>
    Effect.try({
      try: () => instance.collateral_percentage(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.collateralPercentage failed `,
        }),
    })
);

/**
 * Unsafely calls instance.collateralPercentage without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const collateralPercentageUnsafe = (instance: CML.ProtocolParamUpdate): bigint | undefined =>
  Effect.runSync(collateralPercentage(instance));

/**
 * Method setMaxCollateralInputs of ProtocolParamUpdate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setMaxCollateralInputs: (instance: CML.ProtocolParamUpdate, maxCollateralInputs: bigint) => Effect.Effect<void, ProtocolParamUpdateError> = Effect.fn(
  (instance: CML.ProtocolParamUpdate, maxCollateralInputs: bigint) =>
    Effect.try({
      try: () => instance.set_max_collateral_inputs(maxCollateralInputs),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setMaxCollateralInputs failed with parameters: ${maxCollateralInputs}. `,
        }),
    })
);

/**
 * Unsafely calls instance.setMaxCollateralInputs without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setMaxCollateralInputsUnsafe = (instance: CML.ProtocolParamUpdate, maxCollateralInputs: bigint): void =>
  Effect.runSync(setMaxCollateralInputs(instance, maxCollateralInputs));

/**
 * Method maxCollateralInputs of ProtocolParamUpdate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const maxCollateralInputs: (instance: CML.ProtocolParamUpdate) => Effect.Effect<bigint | undefined, ProtocolParamUpdateError> = Effect.fn(
  (instance: CML.ProtocolParamUpdate) =>
    Effect.try({
      try: () => instance.max_collateral_inputs(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.maxCollateralInputs failed `,
        }),
    })
);

/**
 * Unsafely calls instance.maxCollateralInputs without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const maxCollateralInputsUnsafe = (instance: CML.ProtocolParamUpdate): bigint | undefined =>
  Effect.runSync(maxCollateralInputs(instance));

/**
 * Method setPoolVotingThresholds of ProtocolParamUpdate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setPoolVotingThresholds: (instance: CML.ProtocolParamUpdate, poolVotingThresholds: CML.PoolVotingThresholds) => Effect.Effect<void, ProtocolParamUpdateError> = Effect.fn(
  (instance: CML.ProtocolParamUpdate, poolVotingThresholds: CML.PoolVotingThresholds) =>
    Effect.try({
      try: () => instance.set_pool_voting_thresholds(poolVotingThresholds),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setPoolVotingThresholds failed with parameters: ${poolVotingThresholds} (PoolVotingThresholds). `,
        }),
    })
);

/**
 * Unsafely calls instance.setPoolVotingThresholds without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setPoolVotingThresholdsUnsafe = (instance: CML.ProtocolParamUpdate, poolVotingThresholds: CML.PoolVotingThresholds): void =>
  Effect.runSync(setPoolVotingThresholds(instance, poolVotingThresholds));

/**
 * Method poolVotingThresholds of ProtocolParamUpdate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const poolVotingThresholds: (instance: CML.ProtocolParamUpdate) => Effect.Effect<CML.PoolVotingThresholds | undefined, ProtocolParamUpdateError> = Effect.fn(
  (instance: CML.ProtocolParamUpdate) =>
    Effect.try({
      try: () => instance.pool_voting_thresholds(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.poolVotingThresholds failed `,
        }),
    })
);

/**
 * Unsafely calls instance.poolVotingThresholds without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const poolVotingThresholdsUnsafe = (instance: CML.ProtocolParamUpdate): CML.PoolVotingThresholds | undefined =>
  Effect.runSync(poolVotingThresholds(instance));

/**
 * Method setDRepVotingThresholds of ProtocolParamUpdate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setDRepVotingThresholds: (instance: CML.ProtocolParamUpdate, dRepVotingThresholds: CML.DRepVotingThresholds) => Effect.Effect<void, ProtocolParamUpdateError> = Effect.fn(
  (instance: CML.ProtocolParamUpdate, dRepVotingThresholds: CML.DRepVotingThresholds) =>
    Effect.try({
      try: () => instance.set_d_rep_voting_thresholds(dRepVotingThresholds),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setDRepVotingThresholds failed with parameters: ${dRepVotingThresholds} (DRepVotingThresholds). `,
        }),
    })
);

/**
 * Unsafely calls instance.setDRepVotingThresholds without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setDRepVotingThresholdsUnsafe = (instance: CML.ProtocolParamUpdate, dRepVotingThresholds: CML.DRepVotingThresholds): void =>
  Effect.runSync(setDRepVotingThresholds(instance, dRepVotingThresholds));

/**
 * Method dRepVotingThresholds of ProtocolParamUpdate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const dRepVotingThresholds: (instance: CML.ProtocolParamUpdate) => Effect.Effect<CML.DRepVotingThresholds | undefined, ProtocolParamUpdateError> = Effect.fn(
  (instance: CML.ProtocolParamUpdate) =>
    Effect.try({
      try: () => instance.d_rep_voting_thresholds(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.dRepVotingThresholds failed `,
        }),
    })
);

/**
 * Unsafely calls instance.dRepVotingThresholds without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const dRepVotingThresholdsUnsafe = (instance: CML.ProtocolParamUpdate): CML.DRepVotingThresholds | undefined =>
  Effect.runSync(dRepVotingThresholds(instance));

/**
 * Method setMinCommitteeSize of ProtocolParamUpdate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setMinCommitteeSize: (instance: CML.ProtocolParamUpdate, minCommitteeSize: bigint) => Effect.Effect<void, ProtocolParamUpdateError> = Effect.fn(
  (instance: CML.ProtocolParamUpdate, minCommitteeSize: bigint) =>
    Effect.try({
      try: () => instance.set_min_committee_size(minCommitteeSize),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setMinCommitteeSize failed with parameters: ${minCommitteeSize}. `,
        }),
    })
);

/**
 * Unsafely calls instance.setMinCommitteeSize without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setMinCommitteeSizeUnsafe = (instance: CML.ProtocolParamUpdate, minCommitteeSize: bigint): void =>
  Effect.runSync(setMinCommitteeSize(instance, minCommitteeSize));

/**
 * Method minCommitteeSize of ProtocolParamUpdate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const minCommitteeSize: (instance: CML.ProtocolParamUpdate) => Effect.Effect<bigint | undefined, ProtocolParamUpdateError> = Effect.fn(
  (instance: CML.ProtocolParamUpdate) =>
    Effect.try({
      try: () => instance.min_committee_size(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.minCommitteeSize failed `,
        }),
    })
);

/**
 * Unsafely calls instance.minCommitteeSize without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const minCommitteeSizeUnsafe = (instance: CML.ProtocolParamUpdate): bigint | undefined =>
  Effect.runSync(minCommitteeSize(instance));

/**
 * Method setCommitteeTermLimit of ProtocolParamUpdate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setCommitteeTermLimit: (instance: CML.ProtocolParamUpdate, committeeTermLimit: bigint) => Effect.Effect<void, ProtocolParamUpdateError> = Effect.fn(
  (instance: CML.ProtocolParamUpdate, committeeTermLimit: bigint) =>
    Effect.try({
      try: () => instance.set_committee_term_limit(committeeTermLimit),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setCommitteeTermLimit failed with parameters: ${committeeTermLimit}. `,
        }),
    })
);

/**
 * Unsafely calls instance.setCommitteeTermLimit without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setCommitteeTermLimitUnsafe = (instance: CML.ProtocolParamUpdate, committeeTermLimit: bigint): void =>
  Effect.runSync(setCommitteeTermLimit(instance, committeeTermLimit));

/**
 * Method committeeTermLimit of ProtocolParamUpdate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const committeeTermLimit: (instance: CML.ProtocolParamUpdate) => Effect.Effect<bigint | undefined, ProtocolParamUpdateError> = Effect.fn(
  (instance: CML.ProtocolParamUpdate) =>
    Effect.try({
      try: () => instance.committee_term_limit(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.committeeTermLimit failed `,
        }),
    })
);

/**
 * Unsafely calls instance.committeeTermLimit without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const committeeTermLimitUnsafe = (instance: CML.ProtocolParamUpdate): bigint | undefined =>
  Effect.runSync(committeeTermLimit(instance));

/**
 * Method setGovernanceActionValidityPeriod of ProtocolParamUpdate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setGovernanceActionValidityPeriod: (instance: CML.ProtocolParamUpdate, governanceActionValidityPeriod: bigint) => Effect.Effect<void, ProtocolParamUpdateError> = Effect.fn(
  (instance: CML.ProtocolParamUpdate, governanceActionValidityPeriod: bigint) =>
    Effect.try({
      try: () => instance.set_governance_action_validity_period(governanceActionValidityPeriod),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setGovernanceActionValidityPeriod failed with parameters: ${governanceActionValidityPeriod}. `,
        }),
    })
);

/**
 * Unsafely calls instance.setGovernanceActionValidityPeriod without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setGovernanceActionValidityPeriodUnsafe = (instance: CML.ProtocolParamUpdate, governanceActionValidityPeriod: bigint): void =>
  Effect.runSync(setGovernanceActionValidityPeriod(instance, governanceActionValidityPeriod));

/**
 * Method governanceActionValidityPeriod of ProtocolParamUpdate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const governanceActionValidityPeriod: (instance: CML.ProtocolParamUpdate) => Effect.Effect<bigint | undefined, ProtocolParamUpdateError> = Effect.fn(
  (instance: CML.ProtocolParamUpdate) =>
    Effect.try({
      try: () => instance.governance_action_validity_period(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.governanceActionValidityPeriod failed `,
        }),
    })
);

/**
 * Unsafely calls instance.governanceActionValidityPeriod without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const governanceActionValidityPeriodUnsafe = (instance: CML.ProtocolParamUpdate): bigint | undefined =>
  Effect.runSync(governanceActionValidityPeriod(instance));

/**
 * Method setGovernanceActionDeposit of ProtocolParamUpdate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setGovernanceActionDeposit: (instance: CML.ProtocolParamUpdate, governanceActionDeposit: bigint) => Effect.Effect<void, ProtocolParamUpdateError> = Effect.fn(
  (instance: CML.ProtocolParamUpdate, governanceActionDeposit: bigint) =>
    Effect.try({
      try: () => instance.set_governance_action_deposit(governanceActionDeposit),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setGovernanceActionDeposit failed with parameters: ${governanceActionDeposit}. `,
        }),
    })
);

/**
 * Unsafely calls instance.setGovernanceActionDeposit without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setGovernanceActionDepositUnsafe = (instance: CML.ProtocolParamUpdate, governanceActionDeposit: bigint): void =>
  Effect.runSync(setGovernanceActionDeposit(instance, governanceActionDeposit));

/**
 * Method governanceActionDeposit of ProtocolParamUpdate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const governanceActionDeposit: (instance: CML.ProtocolParamUpdate) => Effect.Effect<bigint | undefined, ProtocolParamUpdateError> = Effect.fn(
  (instance: CML.ProtocolParamUpdate) =>
    Effect.try({
      try: () => instance.governance_action_deposit(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.governanceActionDeposit failed `,
        }),
    })
);

/**
 * Unsafely calls instance.governanceActionDeposit without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const governanceActionDepositUnsafe = (instance: CML.ProtocolParamUpdate): bigint | undefined =>
  Effect.runSync(governanceActionDeposit(instance));

/**
 * Method setDRepDeposit of ProtocolParamUpdate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setDRepDeposit: (instance: CML.ProtocolParamUpdate, dRepDeposit: bigint) => Effect.Effect<void, ProtocolParamUpdateError> = Effect.fn(
  (instance: CML.ProtocolParamUpdate, dRepDeposit: bigint) =>
    Effect.try({
      try: () => instance.set_d_rep_deposit(dRepDeposit),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setDRepDeposit failed with parameters: ${dRepDeposit}. `,
        }),
    })
);

/**
 * Unsafely calls instance.setDRepDeposit without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setDRepDepositUnsafe = (instance: CML.ProtocolParamUpdate, dRepDeposit: bigint): void =>
  Effect.runSync(setDRepDeposit(instance, dRepDeposit));

/**
 * Method dRepDeposit of ProtocolParamUpdate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const dRepDeposit: (instance: CML.ProtocolParamUpdate) => Effect.Effect<bigint | undefined, ProtocolParamUpdateError> = Effect.fn(
  (instance: CML.ProtocolParamUpdate) =>
    Effect.try({
      try: () => instance.d_rep_deposit(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.dRepDeposit failed `,
        }),
    })
);

/**
 * Unsafely calls instance.dRepDeposit without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const dRepDepositUnsafe = (instance: CML.ProtocolParamUpdate): bigint | undefined =>
  Effect.runSync(dRepDeposit(instance));

/**
 * Method setDRepInactivityPeriod of ProtocolParamUpdate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setDRepInactivityPeriod: (instance: CML.ProtocolParamUpdate, dRepInactivityPeriod: bigint) => Effect.Effect<void, ProtocolParamUpdateError> = Effect.fn(
  (instance: CML.ProtocolParamUpdate, dRepInactivityPeriod: bigint) =>
    Effect.try({
      try: () => instance.set_d_rep_inactivity_period(dRepInactivityPeriod),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setDRepInactivityPeriod failed with parameters: ${dRepInactivityPeriod}. `,
        }),
    })
);

/**
 * Unsafely calls instance.setDRepInactivityPeriod without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setDRepInactivityPeriodUnsafe = (instance: CML.ProtocolParamUpdate, dRepInactivityPeriod: bigint): void =>
  Effect.runSync(setDRepInactivityPeriod(instance, dRepInactivityPeriod));

/**
 * Method dRepInactivityPeriod of ProtocolParamUpdate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const dRepInactivityPeriod: (instance: CML.ProtocolParamUpdate) => Effect.Effect<bigint | undefined, ProtocolParamUpdateError> = Effect.fn(
  (instance: CML.ProtocolParamUpdate) =>
    Effect.try({
      try: () => instance.d_rep_inactivity_period(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.dRepInactivityPeriod failed `,
        }),
    })
);

/**
 * Unsafely calls instance.dRepInactivityPeriod without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const dRepInactivityPeriodUnsafe = (instance: CML.ProtocolParamUpdate): bigint | undefined =>
  Effect.runSync(dRepInactivityPeriod(instance));

/**
 * Method setMinFeeRefScriptCostPerByte of ProtocolParamUpdate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setMinFeeRefScriptCostPerByte: (instance: CML.ProtocolParamUpdate, minFeeRefScriptCostPerByte: CML.Rational) => Effect.Effect<void, ProtocolParamUpdateError> = Effect.fn(
  (instance: CML.ProtocolParamUpdate, minFeeRefScriptCostPerByte: CML.Rational) =>
    Effect.try({
      try: () => instance.set_min_fee_ref_script_cost_per_byte(minFeeRefScriptCostPerByte),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setMinFeeRefScriptCostPerByte failed with parameters: ${minFeeRefScriptCostPerByte} (Rational). `,
        }),
    })
);

/**
 * Unsafely calls instance.setMinFeeRefScriptCostPerByte without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setMinFeeRefScriptCostPerByteUnsafe = (instance: CML.ProtocolParamUpdate, minFeeRefScriptCostPerByte: CML.Rational): void =>
  Effect.runSync(setMinFeeRefScriptCostPerByte(instance, minFeeRefScriptCostPerByte));

/**
 * Method minFeeRefScriptCostPerByte of ProtocolParamUpdate
 * 
 * @since 2.0.0
 * @category Methods
 */
export const minFeeRefScriptCostPerByte: (instance: CML.ProtocolParamUpdate) => Effect.Effect<CML.Rational | undefined, ProtocolParamUpdateError> = Effect.fn(
  (instance: CML.ProtocolParamUpdate) =>
    Effect.try({
      try: () => instance.min_fee_ref_script_cost_per_byte(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.minFeeRefScriptCostPerByte failed `,
        }),
    })
);

/**
 * Unsafely calls instance.minFeeRefScriptCostPerByte without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const minFeeRefScriptCostPerByteUnsafe = (instance: CML.ProtocolParamUpdate): CML.Rational | undefined =>
  Effect.runSync(minFeeRefScriptCostPerByte(instance));

/**
 * Static method _new of ProtocolParamUpdate
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new: () => Effect.Effect<CML.ProtocolParamUpdate, ProtocolParamUpdateError> = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.ProtocolParamUpdate.new(),
    catch: () => new ProtocolParamUpdateError({
      message: `ProtocolParamUpdate._new failed `,
    }),
  });
});

/**
 * Unsafely calls ProtocolParamUpdate._new without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (): CML.ProtocolParamUpdate =>
  Effect.runSync(_new());
