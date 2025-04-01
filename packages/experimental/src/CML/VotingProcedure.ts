/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML VotingProcedure class
 *
 * @since 2.0.0
 * @category Types
 */
export type VotingProcedure = CML.VotingProcedure;

/**
 * Error class for VotingProcedure operations
 * 
 * This error is thrown when operations on VotingProcedure instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class VotingProcedureError extends Data.TaggedError("VotingProcedureError")<{
  message?: string;
}> {}

/**
 * Method free of VotingProcedure
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.VotingProcedure) => Effect.Effect<void, VotingProcedureError> = Effect.fn(
  (instance: CML.VotingProcedure) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new VotingProcedureError({
          message: `VotingProcedure.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.VotingProcedure): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of VotingProcedure
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (instance: CML.VotingProcedure) => Effect.Effect<Uint8Array, VotingProcedureError> = Effect.fn(
  (instance: CML.VotingProcedure) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new VotingProcedureError({
          message: `VotingProcedure.toCborBytes failed VotingProcedure is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.VotingProcedure): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of VotingProcedure
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (instance: CML.VotingProcedure) => Effect.Effect<Uint8Array, VotingProcedureError> = Effect.fn(
  (instance: CML.VotingProcedure) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new VotingProcedureError({
          message: `VotingProcedure.toCanonicalCborBytes failed VotingProcedure is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (instance: CML.VotingProcedure): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of VotingProcedure
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (cborBytes: Uint8Array) => Effect.Effect<CML.VotingProcedure, VotingProcedureError> = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.VotingProcedure.from_cbor_bytes(cborBytes),
    catch: () => new VotingProcedureError({
      message: `VotingProcedure.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls VotingProcedure.fromCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.VotingProcedure =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of VotingProcedure
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (instance: CML.VotingProcedure) => Effect.Effect<string, VotingProcedureError> = Effect.fn(
  (instance: CML.VotingProcedure) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new VotingProcedureError({
          message: `VotingProcedure.toCborHex failed VotingProcedure is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.VotingProcedure): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of VotingProcedure
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (instance: CML.VotingProcedure) => Effect.Effect<string, VotingProcedureError> = Effect.fn(
  (instance: CML.VotingProcedure) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new VotingProcedureError({
          message: `VotingProcedure.toCanonicalCborHex failed VotingProcedure is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.VotingProcedure): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of VotingProcedure
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (cborBytes: string) => Effect.Effect<CML.VotingProcedure, VotingProcedureError> = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.VotingProcedure.from_cbor_hex(cborBytes),
    catch: () => new VotingProcedureError({
      message: `VotingProcedure.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls VotingProcedure.fromCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.VotingProcedure =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of VotingProcedure
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (instance: CML.VotingProcedure) => Effect.Effect<string, VotingProcedureError> = Effect.fn(
  (instance: CML.VotingProcedure) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new VotingProcedureError({
          message: `VotingProcedure.toJson failed VotingProcedure is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.VotingProcedure): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of VotingProcedure
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (instance: CML.VotingProcedure) => Effect.Effect<any, VotingProcedureError> = Effect.fn(
  (instance: CML.VotingProcedure) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new VotingProcedureError({
          message: `VotingProcedure.toJsValue failed VotingProcedure is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.VotingProcedure): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of VotingProcedure
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (json: string) => Effect.Effect<CML.VotingProcedure, VotingProcedureError> = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.VotingProcedure.from_json(json),
    catch: () => new VotingProcedureError({
      message: `VotingProcedure.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls VotingProcedure.fromJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.VotingProcedure =>
  Effect.runSync(fromJson(json));

/**
 * Method vote of VotingProcedure
 * 
 * @since 2.0.0
 * @category Methods
 */
export const vote: (instance: CML.VotingProcedure) => Effect.Effect<CML.Vote, VotingProcedureError> = Effect.fn(
  (instance: CML.VotingProcedure) =>
    Effect.try({
      try: () => instance.vote(),
      catch: () =>
        new VotingProcedureError({
          message: `VotingProcedure.vote failed `,
        }),
    })
);

/**
 * Unsafely calls instance.vote without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const voteUnsafe = (instance: CML.VotingProcedure): CML.Vote =>
  Effect.runSync(vote(instance));

/**
 * Method anchor of VotingProcedure
 * 
 * @since 2.0.0
 * @category Methods
 */
export const anchor: (instance: CML.VotingProcedure) => Effect.Effect<CML.Anchor | undefined, VotingProcedureError> = Effect.fn(
  (instance: CML.VotingProcedure) =>
    Effect.try({
      try: () => instance.anchor(),
      catch: () =>
        new VotingProcedureError({
          message: `VotingProcedure.anchor failed `,
        }),
    })
);

/**
 * Unsafely calls instance.anchor without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const anchorUnsafe = (instance: CML.VotingProcedure): CML.Anchor | undefined =>
  Effect.runSync(anchor(instance));

/**
 * Static method _new of VotingProcedure
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (vote: CML.Vote, anchor: CML.Anchor) => Effect.Effect<CML.VotingProcedure, VotingProcedureError> = Effect.fn(function* (vote: CML.Vote, anchor: CML.Anchor) {
  return yield* Effect.try({
    try: () => CML.VotingProcedure.new(vote, anchor),
    catch: () => new VotingProcedureError({
      message: `VotingProcedure._new failed with parameters: ${vote} (Vote), ${anchor} (Anchor). `,
    }),
  });
});

/**
 * Unsafely calls VotingProcedure._new without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (vote: CML.Vote, anchor: CML.Anchor): CML.VotingProcedure =>
  Effect.runSync(_new(vote, anchor));
