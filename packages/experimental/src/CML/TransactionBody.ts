/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML TransactionBody class
 *
 * @since 2.0.0
 * @category Types
 */
export type TransactionBody = CML.TransactionBody;

/**
 * Error class for TransactionBody operations
 *
 * This error is thrown when operations on TransactionBody instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class TransactionBodyError extends Data.TaggedError(
  "TransactionBodyError",
)<{
  message?: string;
}> {}

/**
 * Method free of TransactionBody
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.TransactionBody,
) => Effect.Effect<void, TransactionBodyError> = Effect.fn(
  (instance: CML.TransactionBody) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.TransactionBody): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of TransactionBody
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (
  instance: CML.TransactionBody,
) => Effect.Effect<Uint8Array, TransactionBodyError> = Effect.fn(
  (instance: CML.TransactionBody) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.toCborBytes failed TransactionBody is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.TransactionBody): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of TransactionBody
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (
  instance: CML.TransactionBody,
) => Effect.Effect<Uint8Array, TransactionBodyError> = Effect.fn(
  (instance: CML.TransactionBody) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.toCanonicalCborBytes failed TransactionBody is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
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
  instance: CML.TransactionBody,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of TransactionBody
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.TransactionBody, TransactionBodyError> = Effect.fn(
  function* (cborBytes: Uint8Array) {
    return yield* Effect.try({
      try: () => CML.TransactionBody.from_cbor_bytes(cborBytes),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
        }),
    });
  },
);

/**
 * Unsafely calls TransactionBody.fromCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (
  cborBytes: Uint8Array,
): CML.TransactionBody => Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of TransactionBody
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (
  instance: CML.TransactionBody,
) => Effect.Effect<string, TransactionBodyError> = Effect.fn(
  (instance: CML.TransactionBody) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.toCborHex failed TransactionBody is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.TransactionBody): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of TransactionBody
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (
  instance: CML.TransactionBody,
) => Effect.Effect<string, TransactionBodyError> = Effect.fn(
  (instance: CML.TransactionBody) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.toCanonicalCborHex failed TransactionBody is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
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
  instance: CML.TransactionBody,
): string => Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of TransactionBody
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.TransactionBody, TransactionBodyError> = Effect.fn(
  function* (cborBytes: string) {
    return yield* Effect.try({
      try: () => CML.TransactionBody.from_cbor_hex(cborBytes),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    });
  },
);

/**
 * Unsafely calls TransactionBody.fromCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.TransactionBody =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of TransactionBody
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (
  instance: CML.TransactionBody,
) => Effect.Effect<string, TransactionBodyError> = Effect.fn(
  (instance: CML.TransactionBody) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.toJson failed TransactionBody is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.TransactionBody): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of TransactionBody
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (
  instance: CML.TransactionBody,
) => Effect.Effect<any, TransactionBodyError> = Effect.fn(
  (instance: CML.TransactionBody) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.toJsValue failed TransactionBody is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.TransactionBody): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of TransactionBody
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (
  json: string,
) => Effect.Effect<CML.TransactionBody, TransactionBodyError> = Effect.fn(
  function* (json: string) {
    return yield* Effect.try({
      try: () => CML.TransactionBody.from_json(json),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
        }),
    });
  },
);

/**
 * Unsafely calls TransactionBody.fromJson without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.TransactionBody =>
  Effect.runSync(fromJson(json));

/**
 * Method inputs of TransactionBody
 *
 * @since 2.0.0
 * @category Methods
 */
export const inputs: (
  instance: CML.TransactionBody,
) => Effect.Effect<CML.TransactionInputList, TransactionBodyError> = Effect.fn(
  (instance: CML.TransactionBody) =>
    Effect.try({
      try: () => instance.inputs(),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.inputs failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.inputs without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const inputsUnsafe = (
  instance: CML.TransactionBody,
): CML.TransactionInputList => Effect.runSync(inputs(instance));

/**
 * Method outputs of TransactionBody
 *
 * @since 2.0.0
 * @category Methods
 */
export const outputs: (
  instance: CML.TransactionBody,
) => Effect.Effect<CML.TransactionOutputList, TransactionBodyError> = Effect.fn(
  (instance: CML.TransactionBody) =>
    Effect.try({
      try: () => instance.outputs(),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.outputs failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.outputs without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const outputsUnsafe = (
  instance: CML.TransactionBody,
): CML.TransactionOutputList => Effect.runSync(outputs(instance));

/**
 * Method fee of TransactionBody
 *
 * @since 2.0.0
 * @category Methods
 */
export const fee: (
  instance: CML.TransactionBody,
) => Effect.Effect<bigint, TransactionBodyError> = Effect.fn(
  (instance: CML.TransactionBody) =>
    Effect.try({
      try: () => instance.fee(),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.fee failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.fee without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const feeUnsafe = (instance: CML.TransactionBody): bigint =>
  Effect.runSync(fee(instance));

/**
 * Method setTtl of TransactionBody
 *
 * @since 2.0.0
 * @category Methods
 */
export const setTtl: (
  instance: CML.TransactionBody,
  ttl: bigint,
) => Effect.Effect<void, TransactionBodyError> = Effect.fn(
  (instance: CML.TransactionBody, ttl: bigint) =>
    Effect.try({
      try: () => instance.set_ttl(ttl),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.setTtl failed with parameters: ${ttl}. `,
        }),
    }),
);

/**
 * Unsafely calls instance.setTtl without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setTtlUnsafe = (
  instance: CML.TransactionBody,
  ttl: bigint,
): void => Effect.runSync(setTtl(instance, ttl));

/**
 * Method ttl of TransactionBody
 *
 * @since 2.0.0
 * @category Methods
 */
export const ttl: (
  instance: CML.TransactionBody,
) => Effect.Effect<bigint | undefined, TransactionBodyError> = Effect.fn(
  (instance: CML.TransactionBody) =>
    Effect.try({
      try: () => instance.ttl(),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.ttl failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.ttl without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const ttlUnsafe = (instance: CML.TransactionBody): bigint | undefined =>
  Effect.runSync(ttl(instance));

/**
 * Method setCerts of TransactionBody
 *
 * @since 2.0.0
 * @category Methods
 */
export const setCerts: (
  instance: CML.TransactionBody,
  certs: CML.CertificateList,
) => Effect.Effect<void, TransactionBodyError> = Effect.fn(
  (instance: CML.TransactionBody, certs: CML.CertificateList) =>
    Effect.try({
      try: () => instance.set_certs(certs),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.setCerts failed with parameters: ${certs} (CertificateList). `,
        }),
    }),
);

/**
 * Unsafely calls instance.setCerts without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setCertsUnsafe = (
  instance: CML.TransactionBody,
  certs: CML.CertificateList,
): void => Effect.runSync(setCerts(instance, certs));

/**
 * Method certs of TransactionBody
 *
 * @since 2.0.0
 * @category Methods
 */
export const certs: (
  instance: CML.TransactionBody,
) => Effect.Effect<CML.CertificateList | undefined, TransactionBodyError> =
  Effect.fn((instance: CML.TransactionBody) =>
    Effect.try({
      try: () => instance.certs(),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.certs failed `,
        }),
    }),
  );

/**
 * Unsafely calls instance.certs without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const certsUnsafe = (
  instance: CML.TransactionBody,
): CML.CertificateList | undefined => Effect.runSync(certs(instance));

/**
 * Method setWithdrawals of TransactionBody
 *
 * @since 2.0.0
 * @category Methods
 */
export const setWithdrawals: (
  instance: CML.TransactionBody,
  withdrawals: CML.MapRewardAccountToCoin,
) => Effect.Effect<void, TransactionBodyError> = Effect.fn(
  (instance: CML.TransactionBody, withdrawals: CML.MapRewardAccountToCoin) =>
    Effect.try({
      try: () => instance.set_withdrawals(withdrawals),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.setWithdrawals failed with parameters: ${withdrawals} (MapRewardAccountToCoin). `,
        }),
    }),
);

/**
 * Unsafely calls instance.setWithdrawals without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setWithdrawalsUnsafe = (
  instance: CML.TransactionBody,
  withdrawals: CML.MapRewardAccountToCoin,
): void => Effect.runSync(setWithdrawals(instance, withdrawals));

/**
 * Method withdrawals of TransactionBody
 *
 * @since 2.0.0
 * @category Methods
 */
export const withdrawals: (
  instance: CML.TransactionBody,
) => Effect.Effect<
  CML.MapRewardAccountToCoin | undefined,
  TransactionBodyError
> = Effect.fn((instance: CML.TransactionBody) =>
  Effect.try({
    try: () => instance.withdrawals(),
    catch: () =>
      new TransactionBodyError({
        message: `TransactionBody.withdrawals failed `,
      }),
  }),
);

/**
 * Unsafely calls instance.withdrawals without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const withdrawalsUnsafe = (
  instance: CML.TransactionBody,
): CML.MapRewardAccountToCoin | undefined =>
  Effect.runSync(withdrawals(instance));

/**
 * Method setAuxiliaryDataHash of TransactionBody
 *
 * @since 2.0.0
 * @category Methods
 */
export const setAuxiliaryDataHash: (
  instance: CML.TransactionBody,
  auxiliaryDataHash: CML.AuxiliaryDataHash,
) => Effect.Effect<void, TransactionBodyError> = Effect.fn(
  (instance: CML.TransactionBody, auxiliaryDataHash: CML.AuxiliaryDataHash) =>
    Effect.try({
      try: () => instance.set_auxiliary_data_hash(auxiliaryDataHash),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.setAuxiliaryDataHash failed with parameters: ${auxiliaryDataHash} (AuxiliaryDataHash). `,
        }),
    }),
);

/**
 * Unsafely calls instance.setAuxiliaryDataHash without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setAuxiliaryDataHashUnsafe = (
  instance: CML.TransactionBody,
  auxiliaryDataHash: CML.AuxiliaryDataHash,
): void => Effect.runSync(setAuxiliaryDataHash(instance, auxiliaryDataHash));

/**
 * Method auxiliaryDataHash of TransactionBody
 *
 * @since 2.0.0
 * @category Methods
 */
export const auxiliaryDataHash: (
  instance: CML.TransactionBody,
) => Effect.Effect<CML.AuxiliaryDataHash | undefined, TransactionBodyError> =
  Effect.fn((instance: CML.TransactionBody) =>
    Effect.try({
      try: () => instance.auxiliary_data_hash(),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.auxiliaryDataHash failed `,
        }),
    }),
  );

/**
 * Unsafely calls instance.auxiliaryDataHash without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const auxiliaryDataHashUnsafe = (
  instance: CML.TransactionBody,
): CML.AuxiliaryDataHash | undefined =>
  Effect.runSync(auxiliaryDataHash(instance));

/**
 * Method setValidityIntervalStart of TransactionBody
 *
 * @since 2.0.0
 * @category Methods
 */
export const setValidityIntervalStart: (
  instance: CML.TransactionBody,
  validityIntervalStart: bigint,
) => Effect.Effect<void, TransactionBodyError> = Effect.fn(
  (instance: CML.TransactionBody, validityIntervalStart: bigint) =>
    Effect.try({
      try: () => instance.set_validity_interval_start(validityIntervalStart),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.setValidityIntervalStart failed with parameters: ${validityIntervalStart}. `,
        }),
    }),
);

/**
 * Unsafely calls instance.setValidityIntervalStart without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setValidityIntervalStartUnsafe = (
  instance: CML.TransactionBody,
  validityIntervalStart: bigint,
): void =>
  Effect.runSync(setValidityIntervalStart(instance, validityIntervalStart));

/**
 * Method validityIntervalStart of TransactionBody
 *
 * @since 2.0.0
 * @category Methods
 */
export const validityIntervalStart: (
  instance: CML.TransactionBody,
) => Effect.Effect<bigint | undefined, TransactionBodyError> = Effect.fn(
  (instance: CML.TransactionBody) =>
    Effect.try({
      try: () => instance.validity_interval_start(),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.validityIntervalStart failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.validityIntervalStart without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const validityIntervalStartUnsafe = (
  instance: CML.TransactionBody,
): bigint | undefined => Effect.runSync(validityIntervalStart(instance));

/**
 * Method setMint of TransactionBody
 *
 * @since 2.0.0
 * @category Methods
 */
export const setMint: (
  instance: CML.TransactionBody,
  mint: CML.Mint,
) => Effect.Effect<void, TransactionBodyError> = Effect.fn(
  (instance: CML.TransactionBody, mint: CML.Mint) =>
    Effect.try({
      try: () => instance.set_mint(mint),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.setMint failed with parameters: ${mint} (Mint). `,
        }),
    }),
);

/**
 * Unsafely calls instance.setMint without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setMintUnsafe = (
  instance: CML.TransactionBody,
  mint: CML.Mint,
): void => Effect.runSync(setMint(instance, mint));

/**
 * Method mint of TransactionBody
 *
 * @since 2.0.0
 * @category Methods
 */
export const mint: (
  instance: CML.TransactionBody,
) => Effect.Effect<CML.Mint | undefined, TransactionBodyError> = Effect.fn(
  (instance: CML.TransactionBody) =>
    Effect.try({
      try: () => instance.mint(),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.mint failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.mint without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const mintUnsafe = (
  instance: CML.TransactionBody,
): CML.Mint | undefined => Effect.runSync(mint(instance));

/**
 * Method setScriptDataHash of TransactionBody
 *
 * @since 2.0.0
 * @category Methods
 */
export const setScriptDataHash: (
  instance: CML.TransactionBody,
  scriptDataHash: CML.ScriptDataHash,
) => Effect.Effect<void, TransactionBodyError> = Effect.fn(
  (instance: CML.TransactionBody, scriptDataHash: CML.ScriptDataHash) =>
    Effect.try({
      try: () => instance.set_script_data_hash(scriptDataHash),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.setScriptDataHash failed with parameters: ${scriptDataHash} (ScriptDataHash). `,
        }),
    }),
);

/**
 * Unsafely calls instance.setScriptDataHash without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setScriptDataHashUnsafe = (
  instance: CML.TransactionBody,
  scriptDataHash: CML.ScriptDataHash,
): void => Effect.runSync(setScriptDataHash(instance, scriptDataHash));

/**
 * Method scriptDataHash of TransactionBody
 *
 * @since 2.0.0
 * @category Methods
 */
export const scriptDataHash: (
  instance: CML.TransactionBody,
) => Effect.Effect<CML.ScriptDataHash | undefined, TransactionBodyError> =
  Effect.fn((instance: CML.TransactionBody) =>
    Effect.try({
      try: () => instance.script_data_hash(),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.scriptDataHash failed `,
        }),
    }),
  );

/**
 * Unsafely calls instance.scriptDataHash without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const scriptDataHashUnsafe = (
  instance: CML.TransactionBody,
): CML.ScriptDataHash | undefined => Effect.runSync(scriptDataHash(instance));

/**
 * Method setCollateralInputs of TransactionBody
 *
 * @since 2.0.0
 * @category Methods
 */
export const setCollateralInputs: (
  instance: CML.TransactionBody,
  collateralInputs: CML.TransactionInputList,
) => Effect.Effect<void, TransactionBodyError> = Effect.fn(
  (instance: CML.TransactionBody, collateralInputs: CML.TransactionInputList) =>
    Effect.try({
      try: () => instance.set_collateral_inputs(collateralInputs),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.setCollateralInputs failed with parameters: ${collateralInputs} (TransactionInputList). `,
        }),
    }),
);

/**
 * Unsafely calls instance.setCollateralInputs without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setCollateralInputsUnsafe = (
  instance: CML.TransactionBody,
  collateralInputs: CML.TransactionInputList,
): void => Effect.runSync(setCollateralInputs(instance, collateralInputs));

/**
 * Method collateralInputs of TransactionBody
 *
 * @since 2.0.0
 * @category Methods
 */
export const collateralInputs: (
  instance: CML.TransactionBody,
) => Effect.Effect<CML.TransactionInputList | undefined, TransactionBodyError> =
  Effect.fn((instance: CML.TransactionBody) =>
    Effect.try({
      try: () => instance.collateral_inputs(),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.collateralInputs failed `,
        }),
    }),
  );

/**
 * Unsafely calls instance.collateralInputs without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const collateralInputsUnsafe = (
  instance: CML.TransactionBody,
): CML.TransactionInputList | undefined =>
  Effect.runSync(collateralInputs(instance));

/**
 * Method setRequiredSigners of TransactionBody
 *
 * @since 2.0.0
 * @category Methods
 */
export const setRequiredSigners: (
  instance: CML.TransactionBody,
  requiredSigners: CML.Ed25519KeyHashList,
) => Effect.Effect<void, TransactionBodyError> = Effect.fn(
  (instance: CML.TransactionBody, requiredSigners: CML.Ed25519KeyHashList) =>
    Effect.try({
      try: () => instance.set_required_signers(requiredSigners),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.setRequiredSigners failed with parameters: ${requiredSigners} (Ed25519KeyHashList). `,
        }),
    }),
);

/**
 * Unsafely calls instance.setRequiredSigners without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setRequiredSignersUnsafe = (
  instance: CML.TransactionBody,
  requiredSigners: CML.Ed25519KeyHashList,
): void => Effect.runSync(setRequiredSigners(instance, requiredSigners));

/**
 * Method requiredSigners of TransactionBody
 *
 * @since 2.0.0
 * @category Methods
 */
export const requiredSigners: (
  instance: CML.TransactionBody,
) => Effect.Effect<CML.Ed25519KeyHashList | undefined, TransactionBodyError> =
  Effect.fn((instance: CML.TransactionBody) =>
    Effect.try({
      try: () => instance.required_signers(),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.requiredSigners failed `,
        }),
    }),
  );

/**
 * Unsafely calls instance.requiredSigners without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const requiredSignersUnsafe = (
  instance: CML.TransactionBody,
): CML.Ed25519KeyHashList | undefined =>
  Effect.runSync(requiredSigners(instance));

/**
 * Method setNetworkId of TransactionBody
 *
 * @since 2.0.0
 * @category Methods
 */
export const setNetworkId: (
  instance: CML.TransactionBody,
  networkId: CML.NetworkId,
) => Effect.Effect<void, TransactionBodyError> = Effect.fn(
  (instance: CML.TransactionBody, networkId: CML.NetworkId) =>
    Effect.try({
      try: () => instance.set_network_id(networkId),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.setNetworkId failed with parameters: ${networkId} (NetworkId). `,
        }),
    }),
);

/**
 * Unsafely calls instance.setNetworkId without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setNetworkIdUnsafe = (
  instance: CML.TransactionBody,
  networkId: CML.NetworkId,
): void => Effect.runSync(setNetworkId(instance, networkId));

/**
 * Method networkId of TransactionBody
 *
 * @since 2.0.0
 * @category Methods
 */
export const networkId: (
  instance: CML.TransactionBody,
) => Effect.Effect<CML.NetworkId | undefined, TransactionBodyError> = Effect.fn(
  (instance: CML.TransactionBody) =>
    Effect.try({
      try: () => instance.network_id(),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.networkId failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.networkId without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const networkIdUnsafe = (
  instance: CML.TransactionBody,
): CML.NetworkId | undefined => Effect.runSync(networkId(instance));

/**
 * Method setCollateralReturn of TransactionBody
 *
 * @since 2.0.0
 * @category Methods
 */
export const setCollateralReturn: (
  instance: CML.TransactionBody,
  collateralReturn: CML.TransactionOutput,
) => Effect.Effect<void, TransactionBodyError> = Effect.fn(
  (instance: CML.TransactionBody, collateralReturn: CML.TransactionOutput) =>
    Effect.try({
      try: () => instance.set_collateral_return(collateralReturn),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.setCollateralReturn failed with parameters: ${collateralReturn} (TransactionOutput). `,
        }),
    }),
);

/**
 * Unsafely calls instance.setCollateralReturn without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setCollateralReturnUnsafe = (
  instance: CML.TransactionBody,
  collateralReturn: CML.TransactionOutput,
): void => Effect.runSync(setCollateralReturn(instance, collateralReturn));

/**
 * Method collateralReturn of TransactionBody
 *
 * @since 2.0.0
 * @category Methods
 */
export const collateralReturn: (
  instance: CML.TransactionBody,
) => Effect.Effect<CML.TransactionOutput | undefined, TransactionBodyError> =
  Effect.fn((instance: CML.TransactionBody) =>
    Effect.try({
      try: () => instance.collateral_return(),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.collateralReturn failed `,
        }),
    }),
  );

/**
 * Unsafely calls instance.collateralReturn without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const collateralReturnUnsafe = (
  instance: CML.TransactionBody,
): CML.TransactionOutput | undefined =>
  Effect.runSync(collateralReturn(instance));

/**
 * Method setTotalCollateral of TransactionBody
 *
 * @since 2.0.0
 * @category Methods
 */
export const setTotalCollateral: (
  instance: CML.TransactionBody,
  totalCollateral: bigint,
) => Effect.Effect<void, TransactionBodyError> = Effect.fn(
  (instance: CML.TransactionBody, totalCollateral: bigint) =>
    Effect.try({
      try: () => instance.set_total_collateral(totalCollateral),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.setTotalCollateral failed with parameters: ${totalCollateral}. `,
        }),
    }),
);

/**
 * Unsafely calls instance.setTotalCollateral without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setTotalCollateralUnsafe = (
  instance: CML.TransactionBody,
  totalCollateral: bigint,
): void => Effect.runSync(setTotalCollateral(instance, totalCollateral));

/**
 * Method totalCollateral of TransactionBody
 *
 * @since 2.0.0
 * @category Methods
 */
export const totalCollateral: (
  instance: CML.TransactionBody,
) => Effect.Effect<bigint | undefined, TransactionBodyError> = Effect.fn(
  (instance: CML.TransactionBody) =>
    Effect.try({
      try: () => instance.total_collateral(),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.totalCollateral failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.totalCollateral without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const totalCollateralUnsafe = (
  instance: CML.TransactionBody,
): bigint | undefined => Effect.runSync(totalCollateral(instance));

/**
 * Method setReferenceInputs of TransactionBody
 *
 * @since 2.0.0
 * @category Methods
 */
export const setReferenceInputs: (
  instance: CML.TransactionBody,
  referenceInputs: CML.TransactionInputList,
) => Effect.Effect<void, TransactionBodyError> = Effect.fn(
  (instance: CML.TransactionBody, referenceInputs: CML.TransactionInputList) =>
    Effect.try({
      try: () => instance.set_reference_inputs(referenceInputs),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.setReferenceInputs failed with parameters: ${referenceInputs} (TransactionInputList). `,
        }),
    }),
);

/**
 * Unsafely calls instance.setReferenceInputs without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setReferenceInputsUnsafe = (
  instance: CML.TransactionBody,
  referenceInputs: CML.TransactionInputList,
): void => Effect.runSync(setReferenceInputs(instance, referenceInputs));

/**
 * Method referenceInputs of TransactionBody
 *
 * @since 2.0.0
 * @category Methods
 */
export const referenceInputs: (
  instance: CML.TransactionBody,
) => Effect.Effect<CML.TransactionInputList | undefined, TransactionBodyError> =
  Effect.fn((instance: CML.TransactionBody) =>
    Effect.try({
      try: () => instance.reference_inputs(),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.referenceInputs failed `,
        }),
    }),
  );

/**
 * Unsafely calls instance.referenceInputs without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const referenceInputsUnsafe = (
  instance: CML.TransactionBody,
): CML.TransactionInputList | undefined =>
  Effect.runSync(referenceInputs(instance));

/**
 * Method setVotingProcedures of TransactionBody
 *
 * @since 2.0.0
 * @category Methods
 */
export const setVotingProcedures: (
  instance: CML.TransactionBody,
  votingProcedures: CML.VotingProcedures,
) => Effect.Effect<void, TransactionBodyError> = Effect.fn(
  (instance: CML.TransactionBody, votingProcedures: CML.VotingProcedures) =>
    Effect.try({
      try: () => instance.set_voting_procedures(votingProcedures),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.setVotingProcedures failed with parameters: ${votingProcedures} (VotingProcedures). `,
        }),
    }),
);

/**
 * Unsafely calls instance.setVotingProcedures without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setVotingProceduresUnsafe = (
  instance: CML.TransactionBody,
  votingProcedures: CML.VotingProcedures,
): void => Effect.runSync(setVotingProcedures(instance, votingProcedures));

/**
 * Method votingProcedures of TransactionBody
 *
 * @since 2.0.0
 * @category Methods
 */
export const votingProcedures: (
  instance: CML.TransactionBody,
) => Effect.Effect<CML.VotingProcedures | undefined, TransactionBodyError> =
  Effect.fn((instance: CML.TransactionBody) =>
    Effect.try({
      try: () => instance.voting_procedures(),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.votingProcedures failed `,
        }),
    }),
  );

/**
 * Unsafely calls instance.votingProcedures without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const votingProceduresUnsafe = (
  instance: CML.TransactionBody,
): CML.VotingProcedures | undefined =>
  Effect.runSync(votingProcedures(instance));

/**
 * Method setProposalProcedures of TransactionBody
 *
 * @since 2.0.0
 * @category Methods
 */
export const setProposalProcedures: (
  instance: CML.TransactionBody,
  proposalProcedures: CML.ProposalProcedureList,
) => Effect.Effect<void, TransactionBodyError> = Effect.fn(
  (
    instance: CML.TransactionBody,
    proposalProcedures: CML.ProposalProcedureList,
  ) =>
    Effect.try({
      try: () => instance.set_proposal_procedures(proposalProcedures),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.setProposalProcedures failed with parameters: ${proposalProcedures} (ProposalProcedureList). `,
        }),
    }),
);

/**
 * Unsafely calls instance.setProposalProcedures without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setProposalProceduresUnsafe = (
  instance: CML.TransactionBody,
  proposalProcedures: CML.ProposalProcedureList,
): void => Effect.runSync(setProposalProcedures(instance, proposalProcedures));

/**
 * Method proposalProcedures of TransactionBody
 *
 * @since 2.0.0
 * @category Methods
 */
export const proposalProcedures: (
  instance: CML.TransactionBody,
) => Effect.Effect<
  CML.ProposalProcedureList | undefined,
  TransactionBodyError
> = Effect.fn((instance: CML.TransactionBody) =>
  Effect.try({
    try: () => instance.proposal_procedures(),
    catch: () =>
      new TransactionBodyError({
        message: `TransactionBody.proposalProcedures failed `,
      }),
  }),
);

/**
 * Unsafely calls instance.proposalProcedures without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const proposalProceduresUnsafe = (
  instance: CML.TransactionBody,
): CML.ProposalProcedureList | undefined =>
  Effect.runSync(proposalProcedures(instance));

/**
 * Method setCurrentTreasuryValue of TransactionBody
 *
 * @since 2.0.0
 * @category Methods
 */
export const setCurrentTreasuryValue: (
  instance: CML.TransactionBody,
  currentTreasuryValue: bigint,
) => Effect.Effect<void, TransactionBodyError> = Effect.fn(
  (instance: CML.TransactionBody, currentTreasuryValue: bigint) =>
    Effect.try({
      try: () => instance.set_current_treasury_value(currentTreasuryValue),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.setCurrentTreasuryValue failed with parameters: ${currentTreasuryValue}. `,
        }),
    }),
);

/**
 * Unsafely calls instance.setCurrentTreasuryValue without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setCurrentTreasuryValueUnsafe = (
  instance: CML.TransactionBody,
  currentTreasuryValue: bigint,
): void =>
  Effect.runSync(setCurrentTreasuryValue(instance, currentTreasuryValue));

/**
 * Method currentTreasuryValue of TransactionBody
 *
 * @since 2.0.0
 * @category Methods
 */
export const currentTreasuryValue: (
  instance: CML.TransactionBody,
) => Effect.Effect<bigint | undefined, TransactionBodyError> = Effect.fn(
  (instance: CML.TransactionBody) =>
    Effect.try({
      try: () => instance.current_treasury_value(),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.currentTreasuryValue failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.currentTreasuryValue without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const currentTreasuryValueUnsafe = (
  instance: CML.TransactionBody,
): bigint | undefined => Effect.runSync(currentTreasuryValue(instance));

/**
 * Method setDonation of TransactionBody
 *
 * @since 2.0.0
 * @category Methods
 */
export const setDonation: (
  instance: CML.TransactionBody,
  donation: bigint,
) => Effect.Effect<void, TransactionBodyError> = Effect.fn(
  (instance: CML.TransactionBody, donation: bigint) =>
    Effect.try({
      try: () => instance.set_donation(donation),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.setDonation failed with parameters: ${donation}. `,
        }),
    }),
);

/**
 * Unsafely calls instance.setDonation without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setDonationUnsafe = (
  instance: CML.TransactionBody,
  donation: bigint,
): void => Effect.runSync(setDonation(instance, donation));

/**
 * Method donation of TransactionBody
 *
 * @since 2.0.0
 * @category Methods
 */
export const donation: (
  instance: CML.TransactionBody,
) => Effect.Effect<bigint | undefined, TransactionBodyError> = Effect.fn(
  (instance: CML.TransactionBody) =>
    Effect.try({
      try: () => instance.donation(),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.donation failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.donation without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const donationUnsafe = (
  instance: CML.TransactionBody,
): bigint | undefined => Effect.runSync(donation(instance));

/**
 * Static method _new of TransactionBody
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (
  inputs: CML.TransactionInputList,
  outputs: CML.TransactionOutputList,
  fee: bigint,
) => Effect.Effect<CML.TransactionBody, TransactionBodyError> = Effect.fn(
  function* (
    inputs: CML.TransactionInputList,
    outputs: CML.TransactionOutputList,
    fee: bigint,
  ) {
    return yield* Effect.try({
      try: () => CML.TransactionBody.new(inputs, outputs, fee),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody._new failed with parameters: ${inputs} (TransactionInputList), ${outputs} (TransactionOutputList), ${fee}. `,
        }),
    });
  },
);

/**
 * Unsafely calls TransactionBody._new without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (
  inputs: CML.TransactionInputList,
  outputs: CML.TransactionOutputList,
  fee: bigint,
): CML.TransactionBody => Effect.runSync(_new(inputs, outputs, fee));
