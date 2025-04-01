/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML Voter class
 *
 * @since 2.0.0
 * @category Types
 */
export type Voter = CML.Voter;

/**
 * Error class for Voter operations
 *
 * This error is thrown when operations on Voter instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class VoterError extends Data.TaggedError("VoterError")<{
  message?: string;
}> {}

/**
 * Method free of Voter
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.Voter) => Effect.Effect<void, VoterError> =
  Effect.fn((instance: CML.Voter) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new VoterError({
          message: `Voter.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
  );

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.Voter): void =>
  Effect.runSync(free(instance));

/**
 * Method keyHash of Voter
 *
 * @since 2.0.0
 * @category Methods
 */
export const keyHash: (
  instance: CML.Voter,
) => Effect.Effect<CML.Ed25519KeyHash | undefined, VoterError> = Effect.fn(
  (instance: CML.Voter) =>
    Effect.try({
      try: () => instance.key_hash(),
      catch: () =>
        new VoterError({
          message: `Voter.keyHash failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.keyHash without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const keyHashUnsafe = (
  instance: CML.Voter,
): CML.Ed25519KeyHash | undefined => Effect.runSync(keyHash(instance));

/**
 * Method scriptHash of Voter
 *
 * @since 2.0.0
 * @category Methods
 */
export const scriptHash: (
  instance: CML.Voter,
) => Effect.Effect<CML.ScriptHash | undefined, VoterError> = Effect.fn(
  (instance: CML.Voter) =>
    Effect.try({
      try: () => instance.script_hash(),
      catch: () =>
        new VoterError({
          message: `Voter.scriptHash failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.scriptHash without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const scriptHashUnsafe = (
  instance: CML.Voter,
): CML.ScriptHash | undefined => Effect.runSync(scriptHash(instance));

/**
 * Method toCborBytes of Voter
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (
  instance: CML.Voter,
) => Effect.Effect<Uint8Array, VoterError> = Effect.fn((instance: CML.Voter) =>
  Effect.try({
    try: () => instance.to_cbor_bytes(),
    catch: () =>
      new VoterError({
        message: `Voter.toCborBytes failed Voter is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
      }),
  }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.Voter): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of Voter
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (
  instance: CML.Voter,
) => Effect.Effect<Uint8Array, VoterError> = Effect.fn((instance: CML.Voter) =>
  Effect.try({
    try: () => instance.to_canonical_cbor_bytes(),
    catch: () =>
      new VoterError({
        message: `Voter.toCanonicalCborBytes failed Voter is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
      }),
  }),
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (instance: CML.Voter): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of Voter
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.Voter, VoterError> = Effect.fn(function* (
  cborBytes: Uint8Array,
) {
  return yield* Effect.try({
    try: () => CML.Voter.from_cbor_bytes(cborBytes),
    catch: () =>
      new VoterError({
        message: `Voter.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls Voter.fromCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.Voter =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of Voter
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (
  instance: CML.Voter,
) => Effect.Effect<string, VoterError> = Effect.fn((instance: CML.Voter) =>
  Effect.try({
    try: () => instance.to_cbor_hex(),
    catch: () =>
      new VoterError({
        message: `Voter.toCborHex failed Voter is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.Voter): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of Voter
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (
  instance: CML.Voter,
) => Effect.Effect<string, VoterError> = Effect.fn((instance: CML.Voter) =>
  Effect.try({
    try: () => instance.to_canonical_cbor_hex(),
    catch: () =>
      new VoterError({
        message: `Voter.toCanonicalCborHex failed Voter is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.Voter): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of Voter
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.Voter, VoterError> = Effect.fn(function* (
  cborBytes: string,
) {
  return yield* Effect.try({
    try: () => CML.Voter.from_cbor_hex(cborBytes),
    catch: () =>
      new VoterError({
        message: `Voter.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls Voter.fromCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.Voter =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of Voter
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (
  instance: CML.Voter,
) => Effect.Effect<string, VoterError> = Effect.fn((instance: CML.Voter) =>
  Effect.try({
    try: () => instance.to_json(),
    catch: () =>
      new VoterError({
        message: `Voter.toJson failed Voter is not valid for string conversion. Hint: Validate your JSON structure.`,
      }),
  }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.Voter): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of Voter
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (
  instance: CML.Voter,
) => Effect.Effect<any, VoterError> = Effect.fn((instance: CML.Voter) =>
  Effect.try({
    try: () => instance.to_js_value(),
    catch: () =>
      new VoterError({
        message: `Voter.toJsValue failed Voter is not valid for any conversion. `,
      }),
  }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.Voter): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of Voter
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (json: string) => Effect.Effect<CML.Voter, VoterError> =
  Effect.fn(function* (json: string) {
    return yield* Effect.try({
      try: () => CML.Voter.from_json(json),
      catch: () =>
        new VoterError({
          message: `Voter.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
        }),
    });
  });

/**
 * Unsafely calls Voter.fromJson without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.Voter =>
  Effect.runSync(fromJson(json));

/**
 * Static method newConstitutionalCommitteeHotKeyHash of Voter
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newConstitutionalCommitteeHotKeyHash: (
  ed25519KeyHash: CML.Ed25519KeyHash,
) => Effect.Effect<CML.Voter, VoterError> = Effect.fn(function* (
  ed25519KeyHash: CML.Ed25519KeyHash,
) {
  return yield* Effect.try({
    try: () =>
      CML.Voter.new_constitutional_committee_hot_key_hash(ed25519KeyHash),
    catch: () =>
      new VoterError({
        message: `Voter.newConstitutionalCommitteeHotKeyHash failed with parameters: ${ed25519KeyHash} (Ed25519KeyHash). `,
      }),
  });
});

/**
 * Unsafely calls Voter.newConstitutionalCommitteeHotKeyHash without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newConstitutionalCommitteeHotKeyHashUnsafe = (
  ed25519KeyHash: CML.Ed25519KeyHash,
): CML.Voter =>
  Effect.runSync(newConstitutionalCommitteeHotKeyHash(ed25519KeyHash));

/**
 * Static method newConstitutionalCommitteeHotScriptHash of Voter
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newConstitutionalCommitteeHotScriptHash: (
  scriptHash: CML.ScriptHash,
) => Effect.Effect<CML.Voter, VoterError> = Effect.fn(function* (
  scriptHash: CML.ScriptHash,
) {
  return yield* Effect.try({
    try: () =>
      CML.Voter.new_constitutional_committee_hot_script_hash(scriptHash),
    catch: () =>
      new VoterError({
        message: `Voter.newConstitutionalCommitteeHotScriptHash failed with parameters: ${scriptHash} (ScriptHash). `,
      }),
  });
});

/**
 * Unsafely calls Voter.newConstitutionalCommitteeHotScriptHash without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newConstitutionalCommitteeHotScriptHashUnsafe = (
  scriptHash: CML.ScriptHash,
): CML.Voter =>
  Effect.runSync(newConstitutionalCommitteeHotScriptHash(scriptHash));

/**
 * Static method newDRepKeyHash of Voter
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newDRepKeyHash: (
  ed25519KeyHash: CML.Ed25519KeyHash,
) => Effect.Effect<CML.Voter, VoterError> = Effect.fn(function* (
  ed25519KeyHash: CML.Ed25519KeyHash,
) {
  return yield* Effect.try({
    try: () => CML.Voter.new_d_rep_key_hash(ed25519KeyHash),
    catch: () =>
      new VoterError({
        message: `Voter.newDRepKeyHash failed with parameters: ${ed25519KeyHash} (Ed25519KeyHash). `,
      }),
  });
});

/**
 * Unsafely calls Voter.newDRepKeyHash without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newDRepKeyHashUnsafe = (
  ed25519KeyHash: CML.Ed25519KeyHash,
): CML.Voter => Effect.runSync(newDRepKeyHash(ed25519KeyHash));

/**
 * Static method newDRepScriptHash of Voter
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newDRepScriptHash: (
  scriptHash: CML.ScriptHash,
) => Effect.Effect<CML.Voter, VoterError> = Effect.fn(function* (
  scriptHash: CML.ScriptHash,
) {
  return yield* Effect.try({
    try: () => CML.Voter.new_d_rep_script_hash(scriptHash),
    catch: () =>
      new VoterError({
        message: `Voter.newDRepScriptHash failed with parameters: ${scriptHash} (ScriptHash). `,
      }),
  });
});

/**
 * Unsafely calls Voter.newDRepScriptHash without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newDRepScriptHashUnsafe = (
  scriptHash: CML.ScriptHash,
): CML.Voter => Effect.runSync(newDRepScriptHash(scriptHash));

/**
 * Static method newStakingPoolKeyHash of Voter
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newStakingPoolKeyHash: (
  ed25519KeyHash: CML.Ed25519KeyHash,
) => Effect.Effect<CML.Voter, VoterError> = Effect.fn(function* (
  ed25519KeyHash: CML.Ed25519KeyHash,
) {
  return yield* Effect.try({
    try: () => CML.Voter.new_staking_pool_key_hash(ed25519KeyHash),
    catch: () =>
      new VoterError({
        message: `Voter.newStakingPoolKeyHash failed with parameters: ${ed25519KeyHash} (Ed25519KeyHash). `,
      }),
  });
});

/**
 * Unsafely calls Voter.newStakingPoolKeyHash without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newStakingPoolKeyHashUnsafe = (
  ed25519KeyHash: CML.Ed25519KeyHash,
): CML.Voter => Effect.runSync(newStakingPoolKeyHash(ed25519KeyHash));

/**
 * Method kind of Voter
 *
 * @since 2.0.0
 * @category Methods
 */
export const kind: (
  instance: CML.Voter,
) => Effect.Effect<CML.VoterKind, VoterError> = Effect.fn(
  (instance: CML.Voter) =>
    Effect.try({
      try: () => instance.kind(),
      catch: () =>
        new VoterError({
          message: `Voter.kind failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.kind without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const kindUnsafe = (instance: CML.Voter): CML.VoterKind =>
  Effect.runSync(kind(instance));

/**
 * Method asConstitutionalCommitteeHotKeyHash of Voter
 *
 * @since 2.0.0
 * @category Methods
 */
export const asConstitutionalCommitteeHotKeyHash: (
  instance: CML.Voter,
) => Effect.Effect<CML.Ed25519KeyHash | undefined, VoterError> = Effect.fn(
  (instance: CML.Voter) =>
    Effect.try({
      try: () => instance.as_constitutional_committee_hot_key_hash(),
      catch: () =>
        new VoterError({
          message: `Voter.asConstitutionalCommitteeHotKeyHash failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.asConstitutionalCommitteeHotKeyHash without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asConstitutionalCommitteeHotKeyHashUnsafe = (
  instance: CML.Voter,
): CML.Ed25519KeyHash | undefined =>
  Effect.runSync(asConstitutionalCommitteeHotKeyHash(instance));

/**
 * Method asConstitutionalCommitteeHotScriptHash of Voter
 *
 * @since 2.0.0
 * @category Methods
 */
export const asConstitutionalCommitteeHotScriptHash: (
  instance: CML.Voter,
) => Effect.Effect<CML.ScriptHash | undefined, VoterError> = Effect.fn(
  (instance: CML.Voter) =>
    Effect.try({
      try: () => instance.as_constitutional_committee_hot_script_hash(),
      catch: () =>
        new VoterError({
          message: `Voter.asConstitutionalCommitteeHotScriptHash failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.asConstitutionalCommitteeHotScriptHash without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asConstitutionalCommitteeHotScriptHashUnsafe = (
  instance: CML.Voter,
): CML.ScriptHash | undefined =>
  Effect.runSync(asConstitutionalCommitteeHotScriptHash(instance));

/**
 * Method asDRepKeyHash of Voter
 *
 * @since 2.0.0
 * @category Methods
 */
export const asDRepKeyHash: (
  instance: CML.Voter,
) => Effect.Effect<CML.Ed25519KeyHash | undefined, VoterError> = Effect.fn(
  (instance: CML.Voter) =>
    Effect.try({
      try: () => instance.as_d_rep_key_hash(),
      catch: () =>
        new VoterError({
          message: `Voter.asDRepKeyHash failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.asDRepKeyHash without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asDRepKeyHashUnsafe = (
  instance: CML.Voter,
): CML.Ed25519KeyHash | undefined => Effect.runSync(asDRepKeyHash(instance));

/**
 * Method asDRepScriptHash of Voter
 *
 * @since 2.0.0
 * @category Methods
 */
export const asDRepScriptHash: (
  instance: CML.Voter,
) => Effect.Effect<CML.ScriptHash | undefined, VoterError> = Effect.fn(
  (instance: CML.Voter) =>
    Effect.try({
      try: () => instance.as_d_rep_script_hash(),
      catch: () =>
        new VoterError({
          message: `Voter.asDRepScriptHash failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.asDRepScriptHash without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asDRepScriptHashUnsafe = (
  instance: CML.Voter,
): CML.ScriptHash | undefined => Effect.runSync(asDRepScriptHash(instance));

/**
 * Method asStakingPoolKeyHash of Voter
 *
 * @since 2.0.0
 * @category Methods
 */
export const asStakingPoolKeyHash: (
  instance: CML.Voter,
) => Effect.Effect<CML.Ed25519KeyHash | undefined, VoterError> = Effect.fn(
  (instance: CML.Voter) =>
    Effect.try({
      try: () => instance.as_staking_pool_key_hash(),
      catch: () =>
        new VoterError({
          message: `Voter.asStakingPoolKeyHash failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.asStakingPoolKeyHash without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asStakingPoolKeyHashUnsafe = (
  instance: CML.Voter,
): CML.Ed25519KeyHash | undefined =>
  Effect.runSync(asStakingPoolKeyHash(instance));
