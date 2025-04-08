/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML UpdateCommittee class
 *
 * @since 2.0.0
 * @category Types
 */
export type UpdateCommittee = CML.UpdateCommittee;

/**
 * Error class for UpdateCommittee operations
 *
 * This error is thrown when operations on UpdateCommittee instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class UpdateCommitteeError extends Data.TaggedError(
  "UpdateCommitteeError",
)<{
  message?: string;
}> {}

/**
 * Method free of UpdateCommittee
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.UpdateCommittee,
) => Effect.Effect<void, UpdateCommitteeError> = Effect.fn(
  (instance: CML.UpdateCommittee) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new UpdateCommitteeError({
          message: `UpdateCommittee.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.UpdateCommittee): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of UpdateCommittee
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (
  instance: CML.UpdateCommittee,
) => Effect.Effect<Uint8Array, UpdateCommitteeError> = Effect.fn(
  (instance: CML.UpdateCommittee) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new UpdateCommitteeError({
          message: `UpdateCommittee.toCborBytes failed UpdateCommittee is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.UpdateCommittee): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of UpdateCommittee
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (
  instance: CML.UpdateCommittee,
) => Effect.Effect<Uint8Array, UpdateCommitteeError> = Effect.fn(
  (instance: CML.UpdateCommittee) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new UpdateCommitteeError({
          message: `UpdateCommittee.toCanonicalCborBytes failed UpdateCommittee is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
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
  instance: CML.UpdateCommittee,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of UpdateCommittee
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.UpdateCommittee, UpdateCommitteeError> = Effect.fn(
  function* (cborBytes: Uint8Array) {
    return yield* Effect.try({
      try: () => CML.UpdateCommittee.from_cbor_bytes(cborBytes),
      catch: () =>
        new UpdateCommitteeError({
          message: `UpdateCommittee.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
        }),
    });
  },
);

/**
 * Unsafely calls UpdateCommittee.fromCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (
  cborBytes: Uint8Array,
): CML.UpdateCommittee => Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of UpdateCommittee
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (
  instance: CML.UpdateCommittee,
) => Effect.Effect<string, UpdateCommitteeError> = Effect.fn(
  (instance: CML.UpdateCommittee) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new UpdateCommitteeError({
          message: `UpdateCommittee.toCborHex failed UpdateCommittee is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.UpdateCommittee): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of UpdateCommittee
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (
  instance: CML.UpdateCommittee,
) => Effect.Effect<string, UpdateCommitteeError> = Effect.fn(
  (instance: CML.UpdateCommittee) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new UpdateCommitteeError({
          message: `UpdateCommittee.toCanonicalCborHex failed UpdateCommittee is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
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
  instance: CML.UpdateCommittee,
): string => Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of UpdateCommittee
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.UpdateCommittee, UpdateCommitteeError> = Effect.fn(
  function* (cborBytes: string) {
    return yield* Effect.try({
      try: () => CML.UpdateCommittee.from_cbor_hex(cborBytes),
      catch: () =>
        new UpdateCommitteeError({
          message: `UpdateCommittee.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    });
  },
);

/**
 * Unsafely calls UpdateCommittee.fromCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.UpdateCommittee =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of UpdateCommittee
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (
  instance: CML.UpdateCommittee,
) => Effect.Effect<string, UpdateCommitteeError> = Effect.fn(
  (instance: CML.UpdateCommittee) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new UpdateCommitteeError({
          message: `UpdateCommittee.toJson failed UpdateCommittee is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.UpdateCommittee): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of UpdateCommittee
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (
  instance: CML.UpdateCommittee,
) => Effect.Effect<any, UpdateCommitteeError> = Effect.fn(
  (instance: CML.UpdateCommittee) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new UpdateCommitteeError({
          message: `UpdateCommittee.toJsValue failed UpdateCommittee is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.UpdateCommittee): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of UpdateCommittee
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (
  json: string,
) => Effect.Effect<CML.UpdateCommittee, UpdateCommitteeError> = Effect.fn(
  function* (json: string) {
    return yield* Effect.try({
      try: () => CML.UpdateCommittee.from_json(json),
      catch: () =>
        new UpdateCommitteeError({
          message: `UpdateCommittee.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
        }),
    });
  },
);

/**
 * Unsafely calls UpdateCommittee.fromJson without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.UpdateCommittee =>
  Effect.runSync(fromJson(json));

/**
 * Method actionId of UpdateCommittee
 *
 * @since 2.0.0
 * @category Methods
 */
export const actionId: (
  instance: CML.UpdateCommittee,
) => Effect.Effect<CML.GovActionId | undefined, UpdateCommitteeError> =
  Effect.fn((instance: CML.UpdateCommittee) =>
    Effect.try({
      try: () => instance.action_id(),
      catch: () =>
        new UpdateCommitteeError({
          message: `UpdateCommittee.actionId failed `,
        }),
    }),
  );

/**
 * Unsafely calls instance.actionId without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const actionIdUnsafe = (
  instance: CML.UpdateCommittee,
): CML.GovActionId | undefined => Effect.runSync(actionId(instance));

/**
 * Method coldCredentials of UpdateCommittee
 *
 * @since 2.0.0
 * @category Methods
 */
export const coldCredentials: (
  instance: CML.UpdateCommittee,
) => Effect.Effect<CML.CommitteeColdCredentialList, UpdateCommitteeError> =
  Effect.fn((instance: CML.UpdateCommittee) =>
    Effect.try({
      try: () => instance.cold_credentials(),
      catch: () =>
        new UpdateCommitteeError({
          message: `UpdateCommittee.coldCredentials failed `,
        }),
    }),
  );

/**
 * Unsafely calls instance.coldCredentials without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const coldCredentialsUnsafe = (
  instance: CML.UpdateCommittee,
): CML.CommitteeColdCredentialList => Effect.runSync(coldCredentials(instance));

/**
 * Method credentials of UpdateCommittee
 *
 * @since 2.0.0
 * @category Methods
 */
export const credentials: (
  instance: CML.UpdateCommittee,
) => Effect.Effect<
  CML.MapCommitteeColdCredentialToEpoch,
  UpdateCommitteeError
> = Effect.fn((instance: CML.UpdateCommittee) =>
  Effect.try({
    try: () => instance.credentials(),
    catch: () =>
      new UpdateCommitteeError({
        message: `UpdateCommittee.credentials failed `,
      }),
  }),
);

/**
 * Unsafely calls instance.credentials without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const credentialsUnsafe = (
  instance: CML.UpdateCommittee,
): CML.MapCommitteeColdCredentialToEpoch =>
  Effect.runSync(credentials(instance));

/**
 * Method unitInterval of UpdateCommittee
 *
 * @since 2.0.0
 * @category Methods
 */
export const unitInterval: (
  instance: CML.UpdateCommittee,
) => Effect.Effect<CML.UnitInterval, UpdateCommitteeError> = Effect.fn(
  (instance: CML.UpdateCommittee) =>
    Effect.try({
      try: () => instance.unit_interval(),
      catch: () =>
        new UpdateCommitteeError({
          message: `UpdateCommittee.unitInterval failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.unitInterval without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const unitIntervalUnsafe = (
  instance: CML.UpdateCommittee,
): CML.UnitInterval => Effect.runSync(unitInterval(instance));

/**
 * Static method _new of UpdateCommittee
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (
  actionId: CML.GovActionId | undefined,
  coldCredentials: CML.CommitteeColdCredentialList,
  credentials: CML.MapCommitteeColdCredentialToEpoch,
  unitInterval: CML.UnitInterval,
) => Effect.Effect<CML.UpdateCommittee, UpdateCommitteeError> = Effect.fn(
  function* (
    actionId: CML.GovActionId | undefined,
    coldCredentials: CML.CommitteeColdCredentialList,
    credentials: CML.MapCommitteeColdCredentialToEpoch,
    unitInterval: CML.UnitInterval,
  ) {
    return yield* Effect.try({
      try: () =>
        CML.UpdateCommittee.new(
          actionId,
          coldCredentials,
          credentials,
          unitInterval,
        ),
      catch: () =>
        new UpdateCommitteeError({
          message: `UpdateCommittee._new failed with parameters: ${actionId}, ${coldCredentials} (CommitteeColdCredentialList), ${credentials} (MapCommitteeColdCredentialToEpoch), ${unitInterval} (UnitInterval). `,
        }),
    });
  },
);

/**
 * Unsafely calls UpdateCommittee._new without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (
  actionId: CML.GovActionId | undefined,
  coldCredentials: CML.CommitteeColdCredentialList,
  credentials: CML.MapCommitteeColdCredentialToEpoch,
  unitInterval: CML.UnitInterval,
): CML.UpdateCommittee =>
  Effect.runSync(_new(actionId, coldCredentials, credentials, unitInterval));
