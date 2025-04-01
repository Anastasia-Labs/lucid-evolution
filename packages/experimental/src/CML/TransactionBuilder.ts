/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML TransactionBuilder class
 *
 * @since 2.0.0
 * @category Types
 */
export type TransactionBuilder = CML.TransactionBuilder;

/**
 * Error class for TransactionBuilder operations
 * 
 * This error is thrown when operations on TransactionBuilder instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class TransactionBuilderError extends Data.TaggedError("TransactionBuilderError")<{
  message?: string;
}> {}

/**
 * Method free of TransactionBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.TransactionBuilder) => Effect.Effect<void, TransactionBuilderError> = Effect.fn(
  (instance: CML.TransactionBuilder) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.TransactionBuilder): void =>
  Effect.runSync(free(instance));

/**
 * Method selectUtxos of TransactionBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const selectUtxos: (instance: CML.TransactionBuilder, strategy: CML.CoinSelectionStrategyCIP2) => Effect.Effect<void, TransactionBuilderError> = Effect.fn(
  (instance: CML.TransactionBuilder, strategy: CML.CoinSelectionStrategyCIP2) =>
    Effect.try({
      try: () => instance.select_utxos(strategy),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.selectUtxos failed with parameters: ${strategy} (CoinSelectionStrategyCIP2). `,
        }),
    })
);

/**
 * Unsafely calls instance.selectUtxos without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const selectUtxosUnsafe = (instance: CML.TransactionBuilder, strategy: CML.CoinSelectionStrategyCIP2): void =>
  Effect.runSync(selectUtxos(instance, strategy));

/**
 * Method addInput of TransactionBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const addInput: (instance: CML.TransactionBuilder, result: CML.InputBuilderResult) => Effect.Effect<void, TransactionBuilderError> = Effect.fn(
  (instance: CML.TransactionBuilder, result: CML.InputBuilderResult) =>
    Effect.try({
      try: () => instance.add_input(result),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.addInput failed with parameters: ${result} (InputBuilderResult). `,
        }),
    })
);

/**
 * Unsafely calls instance.addInput without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addInputUnsafe = (instance: CML.TransactionBuilder, result: CML.InputBuilderResult): void =>
  Effect.runSync(addInput(instance, result));

/**
 * Method addUtxo of TransactionBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const addUtxo: (instance: CML.TransactionBuilder, result: CML.InputBuilderResult) => Effect.Effect<void, TransactionBuilderError> = Effect.fn(
  (instance: CML.TransactionBuilder, result: CML.InputBuilderResult) =>
    Effect.try({
      try: () => instance.add_utxo(result),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.addUtxo failed with parameters: ${result} (InputBuilderResult). `,
        }),
    })
);

/**
 * Unsafely calls instance.addUtxo without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addUtxoUnsafe = (instance: CML.TransactionBuilder, result: CML.InputBuilderResult): void =>
  Effect.runSync(addUtxo(instance, result));

/**
 * Method feeForInput of TransactionBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const feeForInput: (instance: CML.TransactionBuilder, result: CML.InputBuilderResult) => Effect.Effect<bigint, TransactionBuilderError> = Effect.fn(
  (instance: CML.TransactionBuilder, result: CML.InputBuilderResult) =>
    Effect.try({
      try: () => instance.fee_for_input(result),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.feeForInput failed with parameters: ${result} (InputBuilderResult). `,
        }),
    })
);

/**
 * Unsafely calls instance.feeForInput without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const feeForInputUnsafe = (instance: CML.TransactionBuilder, result: CML.InputBuilderResult): bigint =>
  Effect.runSync(feeForInput(instance, result));

/**
 * Method addReferenceInput of TransactionBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const addReferenceInput: (instance: CML.TransactionBuilder, utxo: CML.TransactionUnspentOutput) => Effect.Effect<void, TransactionBuilderError> = Effect.fn(
  (instance: CML.TransactionBuilder, utxo: CML.TransactionUnspentOutput) =>
    Effect.try({
      try: () => instance.add_reference_input(utxo),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.addReferenceInput failed with parameters: ${utxo} (TransactionUnspentOutput). `,
        }),
    })
);

/**
 * Unsafely calls instance.addReferenceInput without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addReferenceInputUnsafe = (instance: CML.TransactionBuilder, utxo: CML.TransactionUnspentOutput): void =>
  Effect.runSync(addReferenceInput(instance, utxo));

/**
 * Method addOutput of TransactionBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const addOutput: (instance: CML.TransactionBuilder, builderResult: CML.SingleOutputBuilderResult) => Effect.Effect<void, TransactionBuilderError> = Effect.fn(
  (instance: CML.TransactionBuilder, builderResult: CML.SingleOutputBuilderResult) =>
    Effect.try({
      try: () => instance.add_output(builderResult),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.addOutput failed with parameters: ${builderResult} (SingleOutputBuilderResult). `,
        }),
    })
);

/**
 * Unsafely calls instance.addOutput without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addOutputUnsafe = (instance: CML.TransactionBuilder, builderResult: CML.SingleOutputBuilderResult): void =>
  Effect.runSync(addOutput(instance, builderResult));

/**
 * Method feeForOutput of TransactionBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const feeForOutput: (instance: CML.TransactionBuilder, builder: CML.SingleOutputBuilderResult) => Effect.Effect<bigint, TransactionBuilderError> = Effect.fn(
  (instance: CML.TransactionBuilder, builder: CML.SingleOutputBuilderResult) =>
    Effect.try({
      try: () => instance.fee_for_output(builder),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.feeForOutput failed with parameters: ${builder} (SingleOutputBuilderResult). `,
        }),
    })
);

/**
 * Unsafely calls instance.feeForOutput without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const feeForOutputUnsafe = (instance: CML.TransactionBuilder, builder: CML.SingleOutputBuilderResult): bigint =>
  Effect.runSync(feeForOutput(instance, builder));

/**
 * Method setFee of TransactionBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setFee: (instance: CML.TransactionBuilder, fee: bigint) => Effect.Effect<void, TransactionBuilderError> = Effect.fn(
  (instance: CML.TransactionBuilder, fee: bigint) =>
    Effect.try({
      try: () => instance.set_fee(fee),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.setFee failed with parameters: ${fee}. `,
        }),
    })
);

/**
 * Unsafely calls instance.setFee without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setFeeUnsafe = (instance: CML.TransactionBuilder, fee: bigint): void =>
  Effect.runSync(setFee(instance, fee));

/**
 * Method setTtl of TransactionBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setTtl: (instance: CML.TransactionBuilder, ttl: bigint) => Effect.Effect<void, TransactionBuilderError> = Effect.fn(
  (instance: CML.TransactionBuilder, ttl: bigint) =>
    Effect.try({
      try: () => instance.set_ttl(ttl),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.setTtl failed with parameters: ${ttl}. `,
        }),
    })
);

/**
 * Unsafely calls instance.setTtl without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setTtlUnsafe = (instance: CML.TransactionBuilder, ttl: bigint): void =>
  Effect.runSync(setTtl(instance, ttl));

/**
 * Method setValidityStartInterval of TransactionBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setValidityStartInterval: (instance: CML.TransactionBuilder, validityStartInterval: bigint) => Effect.Effect<void, TransactionBuilderError> = Effect.fn(
  (instance: CML.TransactionBuilder, validityStartInterval: bigint) =>
    Effect.try({
      try: () => instance.set_validity_start_interval(validityStartInterval),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.setValidityStartInterval failed with parameters: ${validityStartInterval}. `,
        }),
    })
);

/**
 * Unsafely calls instance.setValidityStartInterval without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setValidityStartIntervalUnsafe = (instance: CML.TransactionBuilder, validityStartInterval: bigint): void =>
  Effect.runSync(setValidityStartInterval(instance, validityStartInterval));

/**
 * Method addCert of TransactionBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const addCert: (instance: CML.TransactionBuilder, result: CML.CertificateBuilderResult) => Effect.Effect<void, TransactionBuilderError> = Effect.fn(
  (instance: CML.TransactionBuilder, result: CML.CertificateBuilderResult) =>
    Effect.try({
      try: () => instance.add_cert(result),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.addCert failed with parameters: ${result} (CertificateBuilderResult). `,
        }),
    })
);

/**
 * Unsafely calls instance.addCert without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addCertUnsafe = (instance: CML.TransactionBuilder, result: CML.CertificateBuilderResult): void =>
  Effect.runSync(addCert(instance, result));

/**
 * Method addProposal of TransactionBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const addProposal: (instance: CML.TransactionBuilder, result: CML.ProposalBuilderResult) => Effect.Effect<void, TransactionBuilderError> = Effect.fn(
  (instance: CML.TransactionBuilder, result: CML.ProposalBuilderResult) =>
    Effect.try({
      try: () => instance.add_proposal(result),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.addProposal failed with parameters: ${result} (ProposalBuilderResult). `,
        }),
    })
);

/**
 * Unsafely calls instance.addProposal without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addProposalUnsafe = (instance: CML.TransactionBuilder, result: CML.ProposalBuilderResult): void =>
  Effect.runSync(addProposal(instance, result));

/**
 * Method addVote of TransactionBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const addVote: (instance: CML.TransactionBuilder, result: CML.VoteBuilderResult) => Effect.Effect<void, TransactionBuilderError> = Effect.fn(
  (instance: CML.TransactionBuilder, result: CML.VoteBuilderResult) =>
    Effect.try({
      try: () => instance.add_vote(result),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.addVote failed with parameters: ${result} (VoteBuilderResult). `,
        }),
    })
);

/**
 * Unsafely calls instance.addVote without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addVoteUnsafe = (instance: CML.TransactionBuilder, result: CML.VoteBuilderResult): void =>
  Effect.runSync(addVote(instance, result));

/**
 * Method getWithdrawals of TransactionBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const getWithdrawals: (instance: CML.TransactionBuilder) => Effect.Effect<CML.MapRewardAccountToCoin | undefined, TransactionBuilderError> = Effect.fn(
  (instance: CML.TransactionBuilder) =>
    Effect.try({
      try: () => instance.get_withdrawals(),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.getWithdrawals failed `,
        }),
    })
);

/**
 * Unsafely calls instance.getWithdrawals without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getWithdrawalsUnsafe = (instance: CML.TransactionBuilder): CML.MapRewardAccountToCoin | undefined =>
  Effect.runSync(getWithdrawals(instance));

/**
 * Method addWithdrawal of TransactionBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const addWithdrawal: (instance: CML.TransactionBuilder, result: CML.WithdrawalBuilderResult) => Effect.Effect<void, TransactionBuilderError> = Effect.fn(
  (instance: CML.TransactionBuilder, result: CML.WithdrawalBuilderResult) =>
    Effect.try({
      try: () => instance.add_withdrawal(result),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.addWithdrawal failed with parameters: ${result} (WithdrawalBuilderResult). `,
        }),
    })
);

/**
 * Unsafely calls instance.addWithdrawal without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addWithdrawalUnsafe = (instance: CML.TransactionBuilder, result: CML.WithdrawalBuilderResult): void =>
  Effect.runSync(addWithdrawal(instance, result));

/**
 * Method getAuxiliaryData of TransactionBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const getAuxiliaryData: (instance: CML.TransactionBuilder) => Effect.Effect<CML.AuxiliaryData | undefined, TransactionBuilderError> = Effect.fn(
  (instance: CML.TransactionBuilder) =>
    Effect.try({
      try: () => instance.get_auxiliary_data(),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.getAuxiliaryData failed `,
        }),
    })
);

/**
 * Unsafely calls instance.getAuxiliaryData without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getAuxiliaryDataUnsafe = (instance: CML.TransactionBuilder): CML.AuxiliaryData | undefined =>
  Effect.runSync(getAuxiliaryData(instance));

/**
 * Method setAuxiliaryData of TransactionBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setAuxiliaryData: (instance: CML.TransactionBuilder, newAuxData: CML.AuxiliaryData) => Effect.Effect<void, TransactionBuilderError> = Effect.fn(
  (instance: CML.TransactionBuilder, newAuxData: CML.AuxiliaryData) =>
    Effect.try({
      try: () => instance.set_auxiliary_data(newAuxData),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.setAuxiliaryData failed with parameters: ${newAuxData} (AuxiliaryData). `,
        }),
    })
);

/**
 * Unsafely calls instance.setAuxiliaryData without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setAuxiliaryDataUnsafe = (instance: CML.TransactionBuilder, newAuxData: CML.AuxiliaryData): void =>
  Effect.runSync(setAuxiliaryData(instance, newAuxData));

/**
 * Method addAuxiliaryData of TransactionBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const addAuxiliaryData: (instance: CML.TransactionBuilder, newAuxData: CML.AuxiliaryData) => Effect.Effect<void, TransactionBuilderError> = Effect.fn(
  (instance: CML.TransactionBuilder, newAuxData: CML.AuxiliaryData) =>
    Effect.try({
      try: () => instance.add_auxiliary_data(newAuxData),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.addAuxiliaryData failed with parameters: ${newAuxData} (AuxiliaryData). `,
        }),
    })
);

/**
 * Unsafely calls instance.addAuxiliaryData without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addAuxiliaryDataUnsafe = (instance: CML.TransactionBuilder, newAuxData: CML.AuxiliaryData): void =>
  Effect.runSync(addAuxiliaryData(instance, newAuxData));

/**
 * Method addMint of TransactionBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const addMint: (instance: CML.TransactionBuilder, result: CML.MintBuilderResult) => Effect.Effect<void, TransactionBuilderError> = Effect.fn(
  (instance: CML.TransactionBuilder, result: CML.MintBuilderResult) =>
    Effect.try({
      try: () => instance.add_mint(result),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.addMint failed with parameters: ${result} (MintBuilderResult). `,
        }),
    })
);

/**
 * Unsafely calls instance.addMint without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addMintUnsafe = (instance: CML.TransactionBuilder, result: CML.MintBuilderResult): void =>
  Effect.runSync(addMint(instance, result));

/**
 * Method getMint of TransactionBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const getMint: (instance: CML.TransactionBuilder) => Effect.Effect<CML.Mint | undefined, TransactionBuilderError> = Effect.fn(
  (instance: CML.TransactionBuilder) =>
    Effect.try({
      try: () => instance.get_mint(),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.getMint failed `,
        }),
    })
);

/**
 * Unsafely calls instance.getMint without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getMintUnsafe = (instance: CML.TransactionBuilder): CML.Mint | undefined =>
  Effect.runSync(getMint(instance));

/**
 * Static method _new of TransactionBuilder
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (cfg: CML.TransactionBuilderConfig) => Effect.Effect<CML.TransactionBuilder, TransactionBuilderError> = Effect.fn(function* (cfg: CML.TransactionBuilderConfig) {
  return yield* Effect.try({
    try: () => CML.TransactionBuilder.new(cfg),
    catch: () => new TransactionBuilderError({
      message: `TransactionBuilder._new failed with parameters: ${cfg} (TransactionBuilderConfig). `,
    }),
  });
});

/**
 * Unsafely calls TransactionBuilder._new without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (cfg: CML.TransactionBuilderConfig): CML.TransactionBuilder =>
  Effect.runSync(_new(cfg));

/**
 * Method addCollateral of TransactionBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const addCollateral: (instance: CML.TransactionBuilder, result: CML.InputBuilderResult) => Effect.Effect<void, TransactionBuilderError> = Effect.fn(
  (instance: CML.TransactionBuilder, result: CML.InputBuilderResult) =>
    Effect.try({
      try: () => instance.add_collateral(result),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.addCollateral failed with parameters: ${result} (InputBuilderResult). `,
        }),
    })
);

/**
 * Unsafely calls instance.addCollateral without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addCollateralUnsafe = (instance: CML.TransactionBuilder, result: CML.InputBuilderResult): void =>
  Effect.runSync(addCollateral(instance, result));

/**
 * Method addRequiredSigner of TransactionBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const addRequiredSigner: (instance: CML.TransactionBuilder, hash: CML.Ed25519KeyHash) => Effect.Effect<void, TransactionBuilderError> = Effect.fn(
  (instance: CML.TransactionBuilder, hash: CML.Ed25519KeyHash) =>
    Effect.try({
      try: () => instance.add_required_signer(hash),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.addRequiredSigner failed with parameters: ${hash} (Ed25519KeyHash). `,
        }),
    })
);

/**
 * Unsafely calls instance.addRequiredSigner without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addRequiredSignerUnsafe = (instance: CML.TransactionBuilder, hash: CML.Ed25519KeyHash): void =>
  Effect.runSync(addRequiredSigner(instance, hash));

/**
 * Method setNetworkId of TransactionBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setNetworkId: (instance: CML.TransactionBuilder, networkId: CML.NetworkId) => Effect.Effect<void, TransactionBuilderError> = Effect.fn(
  (instance: CML.TransactionBuilder, networkId: CML.NetworkId) =>
    Effect.try({
      try: () => instance.set_network_id(networkId),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.setNetworkId failed with parameters: ${networkId} (NetworkId). `,
        }),
    })
);

/**
 * Unsafely calls instance.setNetworkId without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setNetworkIdUnsafe = (instance: CML.TransactionBuilder, networkId: CML.NetworkId): void =>
  Effect.runSync(setNetworkId(instance, networkId));

/**
 * Method networkId of TransactionBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const networkId: (instance: CML.TransactionBuilder) => Effect.Effect<CML.NetworkId | undefined, TransactionBuilderError> = Effect.fn(
  (instance: CML.TransactionBuilder) =>
    Effect.try({
      try: () => instance.network_id(),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.networkId failed `,
        }),
    })
);

/**
 * Unsafely calls instance.networkId without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const networkIdUnsafe = (instance: CML.TransactionBuilder): CML.NetworkId | undefined =>
  Effect.runSync(networkId(instance));

/**
 * Method getExplicitInput of TransactionBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const getExplicitInput: (instance: CML.TransactionBuilder) => Effect.Effect<CML.Value, TransactionBuilderError> = Effect.fn(
  (instance: CML.TransactionBuilder) =>
    Effect.try({
      try: () => instance.get_explicit_input(),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.getExplicitInput failed `,
        }),
    })
);

/**
 * Unsafely calls instance.getExplicitInput without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getExplicitInputUnsafe = (instance: CML.TransactionBuilder): CML.Value =>
  Effect.runSync(getExplicitInput(instance));

/**
 * Method getImplicitInput of TransactionBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const getImplicitInput: (instance: CML.TransactionBuilder) => Effect.Effect<CML.Value, TransactionBuilderError> = Effect.fn(
  (instance: CML.TransactionBuilder) =>
    Effect.try({
      try: () => instance.get_implicit_input(),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.getImplicitInput failed `,
        }),
    })
);

/**
 * Unsafely calls instance.getImplicitInput without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getImplicitInputUnsafe = (instance: CML.TransactionBuilder): CML.Value =>
  Effect.runSync(getImplicitInput(instance));

/**
 * Method getTotalInput of TransactionBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const getTotalInput: (instance: CML.TransactionBuilder) => Effect.Effect<CML.Value, TransactionBuilderError> = Effect.fn(
  (instance: CML.TransactionBuilder) =>
    Effect.try({
      try: () => instance.get_total_input(),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.getTotalInput failed `,
        }),
    })
);

/**
 * Unsafely calls instance.getTotalInput without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getTotalInputUnsafe = (instance: CML.TransactionBuilder): CML.Value =>
  Effect.runSync(getTotalInput(instance));

/**
 * Method getTotalOutput of TransactionBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const getTotalOutput: (instance: CML.TransactionBuilder) => Effect.Effect<CML.Value, TransactionBuilderError> = Effect.fn(
  (instance: CML.TransactionBuilder) =>
    Effect.try({
      try: () => instance.get_total_output(),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.getTotalOutput failed `,
        }),
    })
);

/**
 * Unsafely calls instance.getTotalOutput without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getTotalOutputUnsafe = (instance: CML.TransactionBuilder): CML.Value =>
  Effect.runSync(getTotalOutput(instance));

/**
 * Method getExplicitOutput of TransactionBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const getExplicitOutput: (instance: CML.TransactionBuilder) => Effect.Effect<CML.Value, TransactionBuilderError> = Effect.fn(
  (instance: CML.TransactionBuilder) =>
    Effect.try({
      try: () => instance.get_explicit_output(),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.getExplicitOutput failed `,
        }),
    })
);

/**
 * Unsafely calls instance.getExplicitOutput without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getExplicitOutputUnsafe = (instance: CML.TransactionBuilder): CML.Value =>
  Effect.runSync(getExplicitOutput(instance));

/**
 * Method getDeposit of TransactionBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const getDeposit: (instance: CML.TransactionBuilder) => Effect.Effect<bigint, TransactionBuilderError> = Effect.fn(
  (instance: CML.TransactionBuilder) =>
    Effect.try({
      try: () => instance.get_deposit(),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.getDeposit failed `,
        }),
    })
);

/**
 * Unsafely calls instance.getDeposit without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getDepositUnsafe = (instance: CML.TransactionBuilder): bigint =>
  Effect.runSync(getDeposit(instance));

/**
 * Method getFeeIfSet of TransactionBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const getFeeIfSet: (instance: CML.TransactionBuilder) => Effect.Effect<bigint | undefined, TransactionBuilderError> = Effect.fn(
  (instance: CML.TransactionBuilder) =>
    Effect.try({
      try: () => instance.get_fee_if_set(),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.getFeeIfSet failed `,
        }),
    })
);

/**
 * Unsafely calls instance.getFeeIfSet without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getFeeIfSetUnsafe = (instance: CML.TransactionBuilder): bigint | undefined =>
  Effect.runSync(getFeeIfSet(instance));

/**
 * Method setCollateralReturn of TransactionBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setCollateralReturn: (instance: CML.TransactionBuilder, output: CML.TransactionOutput) => Effect.Effect<void, TransactionBuilderError> = Effect.fn(
  (instance: CML.TransactionBuilder, output: CML.TransactionOutput) =>
    Effect.try({
      try: () => instance.set_collateral_return(output),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.setCollateralReturn failed with parameters: ${output} (TransactionOutput). `,
        }),
    })
);

/**
 * Unsafely calls instance.setCollateralReturn without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setCollateralReturnUnsafe = (instance: CML.TransactionBuilder, output: CML.TransactionOutput): void =>
  Effect.runSync(setCollateralReturn(instance, output));

/**
 * Method fullSize of TransactionBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const fullSize: (instance: CML.TransactionBuilder) => Effect.Effect<number, TransactionBuilderError> = Effect.fn(
  (instance: CML.TransactionBuilder) =>
    Effect.try({
      try: () => instance.full_size(),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.fullSize failed `,
        }),
    })
);

/**
 * Unsafely calls instance.fullSize without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const fullSizeUnsafe = (instance: CML.TransactionBuilder): number =>
  Effect.runSync(fullSize(instance));

/**
 * Method outputSizes of TransactionBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const outputSizes: (instance: CML.TransactionBuilder) => Effect.Effect<Uint32Array, TransactionBuilderError> = Effect.fn(
  (instance: CML.TransactionBuilder) =>
    Effect.try({
      try: () => instance.output_sizes(),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.outputSizes failed `,
        }),
    })
);

/**
 * Unsafely calls instance.outputSizes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const outputSizesUnsafe = (instance: CML.TransactionBuilder): Uint32Array =>
  Effect.runSync(outputSizes(instance));

/**
 * Method buildForEvaluation of TransactionBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const buildForEvaluation: (instance: CML.TransactionBuilder, algo: CML.ChangeSelectionAlgo, changeAddress: CML.Address) => Effect.Effect<CML.TxRedeemerBuilder, TransactionBuilderError> = Effect.fn(
  (instance: CML.TransactionBuilder, algo: CML.ChangeSelectionAlgo, changeAddress: CML.Address) =>
    Effect.try({
      try: () => instance.build_for_evaluation(algo, changeAddress),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.buildForEvaluation failed with parameters: ${algo} (ChangeSelectionAlgo), ${changeAddress} (Address). `,
        }),
    })
);

/**
 * Unsafely calls instance.buildForEvaluation without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const buildForEvaluationUnsafe = (instance: CML.TransactionBuilder, algo: CML.ChangeSelectionAlgo, changeAddress: CML.Address): CML.TxRedeemerBuilder =>
  Effect.runSync(buildForEvaluation(instance, algo, changeAddress));

/**
 * Method build of TransactionBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const build: (instance: CML.TransactionBuilder, algo: CML.ChangeSelectionAlgo, changeAddress: CML.Address) => Effect.Effect<CML.SignedTxBuilder, TransactionBuilderError> = Effect.fn(
  (instance: CML.TransactionBuilder, algo: CML.ChangeSelectionAlgo, changeAddress: CML.Address) =>
    Effect.try({
      try: () => instance.build(algo, changeAddress),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.build failed with parameters: ${algo} (ChangeSelectionAlgo), ${changeAddress} (Address). `,
        }),
    })
);

/**
 * Unsafely calls instance.build without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const buildUnsafe = (instance: CML.TransactionBuilder, algo: CML.ChangeSelectionAlgo, changeAddress: CML.Address): CML.SignedTxBuilder =>
  Effect.runSync(build(instance, algo, changeAddress));

/**
 * Method setExunits of TransactionBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setExunits: (instance: CML.TransactionBuilder, redeemer: CML.RedeemerWitnessKey, exUnits: CML.ExUnits) => Effect.Effect<void, TransactionBuilderError> = Effect.fn(
  (instance: CML.TransactionBuilder, redeemer: CML.RedeemerWitnessKey, exUnits: CML.ExUnits) =>
    Effect.try({
      try: () => instance.set_exunits(redeemer, exUnits),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.setExunits failed with parameters: ${redeemer} (RedeemerWitnessKey), ${exUnits} (ExUnits). `,
        }),
    })
);

/**
 * Unsafely calls instance.setExunits without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setExunitsUnsafe = (instance: CML.TransactionBuilder, redeemer: CML.RedeemerWitnessKey, exUnits: CML.ExUnits): void =>
  Effect.runSync(setExunits(instance, redeemer, exUnits));

/**
 * Method minFee of TransactionBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const minFee: (instance: CML.TransactionBuilder, scriptCalulation: boolean) => Effect.Effect<bigint, TransactionBuilderError> = Effect.fn(
  (instance: CML.TransactionBuilder, scriptCalulation: boolean) =>
    Effect.try({
      try: () => instance.min_fee(scriptCalulation),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.minFee failed with parameters: ${scriptCalulation}. `,
        }),
    })
);

/**
 * Unsafely calls instance.minFee without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const minFeeUnsafe = (instance: CML.TransactionBuilder, scriptCalulation: boolean): bigint =>
  Effect.runSync(minFee(instance, scriptCalulation));

/**
 * Method addChangeIfNeeded of TransactionBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const addChangeIfNeeded: (instance: CML.TransactionBuilder, address: CML.Address, includeExunits: boolean) => Effect.Effect<boolean, TransactionBuilderError> = Effect.fn(
  (instance: CML.TransactionBuilder, address: CML.Address, includeExunits: boolean) =>
    Effect.try({
      try: () => instance.add_change_if_needed(address, includeExunits),
      catch: () =>
        new TransactionBuilderError({
          message: `TransactionBuilder.addChangeIfNeeded failed with parameters: ${address} (Address), ${includeExunits}. `,
        }),
    })
);

/**
 * Unsafely calls instance.addChangeIfNeeded without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addChangeIfNeededUnsafe = (instance: CML.TransactionBuilder, address: CML.Address, includeExunits: boolean): boolean =>
  Effect.runSync(addChangeIfNeeded(instance, address, includeExunits));
