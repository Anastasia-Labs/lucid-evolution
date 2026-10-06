import {
  Effect,
  pipe,
  Record,
  Array as _Array,
  BigInt as _BigInt,
  Tuple,
  Option,
  Layer,
  Either,
} from "effect";
import {
  Address,
  Assets,
  EvalRedeemer,
  EvaluationContext,
  EvaluatorAdapter,
  Provider,
  RedeemerTag,
  ScriptType,
  UTxO,
  Wallet,
} from "@lucid-evolution/core-types";
import {
  ERROR_MESSAGE,
  EvaluatorError,
  RunTimeError,
  TxBuilderError,
} from "../../Errors.js";
import { CML } from "../../core.js";
import { freeCML, withCMLScope } from "@lucid-evolution/core-utils";
import * as UPLC from "@lucid-evolution/uplc";
import * as TxBuilder from "../TxBuilder.js";
import * as TxSignBuilder from "../../tx-sign-builder/TxSignBuilder.js";
import {
  assetsToValue,
  coreToTxOutput,
  selectUTxOs,
  sortUTxOs,
  stringify,
  utxoToCore,
  fromCMLRedeemerTag,
  getAddressDetails,
  utxoToTransactionInput,
  utxoToTransactionOutput,
  toCMLRedeemerTag,
} from "@lucid-evolution/utils";
import { collectFromUTxO } from "./Collect.js";
import { TxConfig } from "./Service.js";
import * as GovernanceAction from "./GovernanceAction.js";
import { isError } from "effect/Predicate";
import {
  hasDelayedActions,
  makeReplayConfig,
  replayTxActions,
} from "../TxBuilder.js";
import {
  buildCanonicalRedeemerInfo,
  buildRedeemersFromCanonicalContext,
  canonicalRedeemerEntries,
  freeCanonicalRedeemerEntries,
  cloneUTxO,
  cloneUTxOs,
  normalizeEvalUTxO,
  normalizeGovernanceRedeemerIndices,
  outRefKey,
  purposeToWitnessKey,
  RedeemerBuilderCache,
  redeemerMapsEqual,
  resolveCanonicalInputs,
  resolveCanonicalReferenceInputs,
  transactionFixedPointFingerprint,
  witnessPurposeKey,
  type BuilderRedeemerKey,
} from "./RedeemerContext.js";

const MAX_EVALUATION_ATTEMPTS = 8;

export type CompleteOptions = {
  /**
   * Enable coin selection algorithm
   * @default true
   */
  coinSelection?: boolean;

  /**
   * Address to send change to
   * @default wallet.address()
   */
  changeAddress?: Address;

  /**
   * Enable local UPLC evaluation
   * @default true
   */
  localUPLCEval?: boolean;

  /**
   * Local phase-two evaluator to use when local UPLC evaluation is enabled.
   * `localUPLCEval: false` forces provider evaluation and bypasses this option.
   * @default built-in Aiken/WASM-backed evaluator
   */
  evaluator?: EvaluatorAdapter;

  /**
   * Amount to set as collateral
   * @default 5_000_000n
   */
  setCollateral?: bigint;

  /**
   * Use canonical ordering
   * @default false
   */
  canonical?: boolean;

  /**
   * Include leftover lovelace in the transaction fee if there are no additional inputs available to cover the change output address.
   * @default false
   */
  includeLeftoverLovelaceAsFee?: boolean;

  /**
   * Preset UTXOs from the wallet to include in coin selection.
   * If not provided, wallet UTXOs will be fetched by the provider.
   *
   * Note:
   * UTXOs already specified in `collectFrom` will not cause duplication
   * @default []
   */
  presetWalletInputs?: UTxO[];
};

type CoinSelectionResult = {
  selected: UTxO[];
  burnable: Assets;
};

export const completeTxError = (cause: unknown) =>
  new TxBuilderError({ cause: `{ Complete: ${cause} }` });

/**
 * The UTxOs of `utxos` whose out-ref is not in `excluded`, in their order.
 * Equivalent to `Array.differenceWith(isEqualUTxO)`, in linear time.
 */
const excludeUTxOs = (
  utxos: ReadonlyArray<UTxO>,
  excluded: Iterable<UTxO>,
): UTxO[] => {
  const keys = new Set<string>();
  for (const utxo of excluded) keys.add(outRefKey(utxo));
  return keys.size === 0
    ? [...utxos]
    : utxos.filter((utxo) => !keys.has(outRefKey(utxo)));
};

type InternalCompleteOptions = {
  bootstrapExUnits?: boolean;
  forceCanonical?: boolean;
  walletInputs?: UTxO[];
  // Fetches the wallet's collateral candidates at most once across attempts.
  walletCollateral?: Effect.Effect<UTxO[]>;
  knownRedeemerExUnits?: KnownRedeemerExUnits;
  redeemerInputFingerprint?: string;
  /**
   * Collateral to select up front, when a replay follows a failed in-place
   * top-up.
   */
  initialCollateral?: bigint;
};

/** The collateral the ledger requires for `fee`, rounded up. */
const requiredCollateral = (
  fee: bigint,
  collateralPercentage: number,
): bigint => (fee * BigInt(collateralPercentage) + 99n) / 100n;

type KnownRedeemerExUnits = Map<
  string,
  Readonly<{ mem: number; steps: number }>
>;

class RedeemerInputRefreshRequired extends TxBuilderError {
  constructor(readonly candidate: CML.Transaction) {
    super({
      cause:
        "Coin selection changed canonical inputs after the delayed redeemers were built",
    });
  }
}

/**
 * Topping the collateral up in place failed: it needed more collateral inputs
 * than allowed, or no remaining UTxO could cover it. CML cannot remove
 * collateral inputs, so the completion is replayed once with its initial
 * collateral sized to `required`, letting a fresh selection pick fewer, larger
 * inputs.
 */
class CollateralReplayRequired extends TxBuilderError {
  constructor(
    error: TxBuilderError,
    readonly required: bigint,
    readonly walletInputs: UTxO[],
    readonly walletCollateral: UTxO[],
  ) {
    super({ cause: error.cause });
  }
}

/** The internal options for the one replay a failed top-up allows. */
const collateralReplayOptions = (
  error: unknown,
  internalOptions: InternalCompleteOptions,
): InternalCompleteOptions | undefined =>
  error instanceof CollateralReplayRequired &&
  internalOptions.initialCollateral === undefined
    ? {
        ...internalOptions,
        initialCollateral: error.required,
        walletInputs: internalOptions.walletInputs ?? error.walletInputs,
        walletCollateral:
          internalOptions.walletCollateral ??
          Effect.succeed(error.walletCollateral),
      }
    : undefined;

type ExUnitSetter = Pick<CML.TransactionBuilder, "set_exunits">;

const treasuryDonationAmount = (config: TxBuilder.TxBuilderConfig): bigint =>
  config.treasuryDonation?.donation ?? 0n;

const applyTreasuryDonationToBuilder = (
  config: TxBuilder.TxBuilderConfig,
): Effect.Effect<void, TxBuilderError> =>
  Effect.try({
    try: () => {
      const treasuryDonation = config.treasuryDonation;
      if (!treasuryDonation) return;
      config.txBuilder.set_current_treasury_value(
        treasuryDonation.currentTreasuryValue,
      );
      config.txBuilder.set_donation(treasuryDonation.donation);
    },
    catch: (error) => completeTxError(error),
  });

const splitBootstrapBudget = (
  total: bigint,
  redeemerCount: number,
  index: number,
): bigint =>
  total / BigInt(redeemerCount) +
  (BigInt(index) < total % BigInt(redeemerCount) ? 1n : 0n);

export const bootstrapRedeemerExUnits = (
  redeemerCount: number,
  maxTxExMem: bigint,
  maxTxExSteps: bigint,
): CML.ExUnits[] =>
  Array.from({ length: redeemerCount }, (_, index) =>
    CML.ExUnits.new(
      splitBootstrapBudget(maxTxExMem, redeemerCount, index),
      splitBootstrapBudget(maxTxExSteps, redeemerCount, index),
    ),
  );

const completeCurrentConfig = (
  options: CompleteOptions = {},
  internalOptions: InternalCompleteOptions = {},
) =>
  Effect.gen(function* () {
    const { config } = yield* TxConfig;
    const wallet: Wallet = yield* pipe(
      Effect.fromNullable(config.lucidConfig.wallet),
      Effect.orElseFail(() => completeTxError(ERROR_MESSAGE.MISSING_WALLET)),
    );
    const walletAddress: string = yield* Effect.promise(() => wallet.address());

    // Extract and set default options for the transaction configuration
    const {
      coinSelection = true,
      changeAddress = walletAddress,
      localUPLCEval = true,
      evaluator,
      setCollateral = 5_000_000n,
      canonical = false,
      includeLeftoverLovelaceAsFee = false,
      presetWalletInputs = [],
    } = options;

    const walletInputs: UTxO[] = internalOptions.walletInputs
      ? cloneUTxOs(internalOptions.walletInputs)
      : presetWalletInputs.length === 0
        ? yield* Effect.tryPromise({
            try: () => wallet.getUtxos(),
            catch: (error) => completeTxError(error),
          })
        : presetWalletInputs;
    config.walletInputs = walletInputs;

    // Execute programs sequentially
    yield* Effect.all(config.programs);
    yield* GovernanceAction.finalizeVotes();
    yield* applyTreasuryDonationToBuilder(config);
    const hasPlutusScriptExecutions: boolean = Array.from(
      config.scripts.values(),
    ).some((value) => value.type !== "Native");

    // First round of coin selection and UPLC evaluation. The fee estimation is lacking
    // the script execution costs as they aren't available yet. When the second
    // round follows, the draft is evaluated once rather than to a fixed point:
    // its ex-units only feed the fee estimate used for coin selection and
    // collateral, and the second round evaluates the final shape to a fixed
    // point.
    const finalEvaluation: EvaluationMode = {};
    let evaluatedScriptBody = yield* selectionAndEvaluation(
      walletInputs,
      changeAddress,
      coinSelection,
      localUPLCEval,
      evaluator,
      includeLeftoverLovelaceAsFee,
      false,
      internalOptions.bootstrapExUnits === true,
      internalOptions.knownRedeemerExUnits,
      internalOptions.redeemerInputFingerprint,
      { provisional: hasPlutusScriptExecutions },
    );
    // Second round of coin selection by including script execution costs in fee estimation.
    // UPLC evaluation need to be performed again if new inputs are selected during coin selection.
    // Because increasing the inputs can increase the script execution budgets.
    // Set collateral input if there are script executions
    let collateral: CollateralState | undefined;
    if (hasPlutusScriptExecutions) {
      const estimatedFee = yield* estimateFee(config, true);

      // The fee is still an estimate here. The second round tops the
      // collateral up as its fee fixed point settles the final fee. A
      // bootstrap attempt's fee covers the maximum execution budget rather
      // than the scripts' cost, so it does not size the collateral.
      const bootstrap = internalOptions.bootstrapExUnits === true;
      const estimatedCollateral = bootstrap
        ? 0n
        : requiredCollateral(
            estimatedFee,
            config.lucidConfig.protocolParameters.collateralPercentage,
          );
      const totalCollateral = [
        estimatedCollateral,
        internalOptions.initialCollateral ?? 0n,
      ].reduce((max, amount) => (amount > max ? amount : max), setCollateral);
      const walletCollateral = yield* internalOptions.walletCollateral ??
        fetchWalletCollateral(wallet, totalCollateral, presetWalletInputs);
      const collateralInput = yield* selectCollateral(
        config.lucidConfig.protocolParameters.coinsPerUtxoByte,
        config.lucidConfig.protocolParameters.maxCollateralInputs ?? 3,
        totalCollateral,
        walletCollateral,
        walletInputs,
      );
      collateral = yield* applyCollateral(totalCollateral, collateralInput, {
        minimum: setCollateral,
        walletCollateral,
        walletInputs,
        changeAddress,
      });
      if (!bootstrap) finalEvaluation.collateral = collateral;
      // A first round that found redeemers already set an explicit fee.
      finalEvaluation.explicitFee = evaluatedScriptBody;
      evaluatedScriptBody =
        (yield* selectionAndEvaluation(
          walletInputs,
          changeAddress,
          coinSelection,
          localUPLCEval,
          evaluator,
          includeLeftoverLovelaceAsFee,
          true,
          internalOptions.bootstrapExUnits === true,
          internalOptions.knownRedeemerExUnits,
          internalOptions.redeemerInputFingerprint,
          finalEvaluation,
        )) || evaluatedScriptBody;
    }
    // Without redeemers or a custom minimum fee, CML computes the fee itself;
    // a settled evaluation has already applied the effective fee.
    if (
      evaluatedScriptBody
        ? finalEvaluation.settled !== true
        : config.minFee !== undefined
    ) {
      yield* applyEffectiveFee(config, true, evaluatedScriptBody);
      // Cover the fee just applied, re-applying it while a top-up grows it.
      for (let topUps = 0; finalEvaluation.collateral; topUps++) {
        const fee = yield* estimateFee(config, true);
        if (!(yield* topUpCollateral(config, finalEvaluation.collateral, fee)))
          break;
        if (topUps >= MAX_EVALUATION_ATTEMPTS) {
          return yield* collateralConvergenceError();
        }
        yield* applyEffectiveFee(config, true, evaluatedScriptBody);
      }
    }
    withCMLScope((own) =>
      config.txBuilder.add_change_if_needed(
        own(CML.Address.from_bech32(changeAddress)),
        true,
      ),
    );
    const builtTransaction = yield* Effect.try({
      try: () =>
        withCMLScope((own) =>
          own(
            config.txBuilder.build(
              CML.ChangeSelectionAlgo.Default,
              own(CML.Address.from_bech32(changeAddress)),
            ),
          ).build_unchecked(),
        ),
      catch: (error) => completeTxError(error),
    });
    const shouldCanonicalize = canonical || internalOptions.forceCanonical;
    const transactionBeforeScriptDataHash = shouldCanonicalize
      ? CML.Transaction.from_cbor_bytes(
          builtTransaction.to_canonical_cbor_bytes(),
        )
      : builtTransaction;
    const normalizedTransaction = yield* Effect.try({
      try: () =>
        normalizeGovernanceRedeemerIndices(
          transactionBeforeScriptDataHash,
          config.governanceVoteWitnessKeys,
          config.governanceProposalWitnessIndices,
        ).transaction,
      catch: (error) => completeTxError(error),
    });
    // Normalization may return its input unchanged.
    freeCML(
      ...[builtTransaction, transactionBeforeScriptDataHash].filter(
        (tx) => tx !== normalizedTransaction,
      ),
    );
    const transaction = yield* refreshScriptDataHash(
      normalizedTransaction,
      config,
    );
    if (transaction !== normalizedTransaction) normalizedTransaction.free();

    // The fee fixed point keeps the collateral covering the fee, so this only
    // guards against a transaction the ledger would reject. A bootstrap
    // attempt's fee covers the maximum budget and only feeds the delayed
    // redeemers, so it is not checked.
    if (internalOptions.bootstrapExUnits !== true) {
      yield* checkFinalCollateral(
        transaction,
        collateral?.inputs ?? [],
        config.lucidConfig.protocolParameters.collateralPercentage,
      ).pipe(Effect.tapError(() => Effect.sync(() => transaction.free())));
    }

    const derivedInputs = deriveInputsFromTransaction(transaction);

    const derivedWalletInputs = derivedInputs.filter(
      (utxo) => utxo.address === walletAddress,
    );
    const updatedWalletInputs = pipe(
      excludeUTxOs(walletInputs, config.consumedInputs),
      (availableWalletInputs) => [
        ...derivedWalletInputs,
        ...availableWalletInputs,
      ],
    );
    return Tuple.make(
      updatedWalletInputs,
      derivedInputs,
      TxSignBuilder.makeTxSignBuilder(config.lucidConfig.wallet, transaction, {
        resolvedInputs: [
          ...config.walletInputs,
          ...config.consumedInputs,
          ...config.collectedInputs,
          ...config.readInputs,
        ],
        slotConfig: config.lucidConfig.slotConfig,
      }),
    );
  }).pipe(Effect.catchAllDefect((cause) => new RunTimeError({ cause })));

/**
 * Checks the ledger's collateral rule on a completed transaction with
 * redeemers: its collateral inputs minus the collateral return must cover
 * `collateralPercentage` of the fee, and a `total_collateral` field must equal
 * that balance.
 */
const checkFinalCollateral = (
  transaction: CML.Transaction,
  collateralInputs: ReadonlyArray<UTxO>,
  collateralPercentage: number,
): Effect.Effect<void, TxBuilderError> =>
  Effect.suspend(() => {
    const { hasRedeemers, inputKeys, fee, returned, totalCollateral } =
      withCMLScope((own) => {
        const body = own(transaction.body());
        const inputs = own(body.collateral_inputs());
        const collateralReturn = own(body.collateral_return());
        return {
          hasRedeemers:
            own(own(transaction.witness_set()).redeemers()) !== undefined,
          inputKeys: Array.from({ length: inputs?.len() ?? 0 }, (_, index) => {
            const input = own(inputs!.get(index));
            return `${own(input.transaction_id()).to_hex()}#${input.index()}`;
          }),
          fee: body.fee(),
          returned: collateralReturn
            ? own(collateralReturn.amount()).coin()
            : 0n,
          totalCollateral: body.total_collateral(),
        };
      });
    if (!hasRedeemers) return Effect.void;
    if (inputKeys.length === 0) {
      return completeTxError(
        "Transaction runs scripts but has no collateral inputs",
      );
    }
    const byKey = new Map(
      collateralInputs.map((utxo) => [outRefKey(utxo), utxo]),
    );
    let collateral = -returned;
    for (const key of inputKeys) {
      const utxo = byKey.get(key);
      if (utxo === undefined) {
        return completeTxError(`Unable to resolve collateral input ${key}`);
      }
      collateral += utxo.assets.lovelace ?? 0n;
    }
    if (totalCollateral !== undefined && totalCollateral !== collateral) {
      return completeTxError(
        `Total collateral ${totalCollateral} does not match the collateral balance ${collateral}`,
      );
    }
    const required = requiredCollateral(fee, collateralPercentage);
    return collateral < required
      ? completeTxError(
          `Final transaction requires ${required} Lovelace collateral, but only ${collateral} was selected`,
        )
      : Effect.void;
  });

const completeStaticFromActions = (
  sourceConfig: TxBuilder.TxBuilderConfig,
  options: CompleteOptions,
  internalOptions: InternalCompleteOptions,
) => {
  const attempt = (internal: InternalCompleteOptions) => {
    const replayConfig = makeReplayConfig(sourceConfig);
    return pipe(
      Effect.gen(function* () {
        yield* replayTxActions(sourceConfig.actions);
        return yield* completeCurrentConfig(options, internal);
      }),
      Effect.provide(Layer.succeed(TxConfig, { config: replayConfig })),
      // The completed transaction is copied out of the builder; nothing keeps
      // the replay's builder alive.
      Effect.ensuring(Effect.sync(() => replayConfig.txBuilder.free())),
    );
  };
  return attempt(internalOptions).pipe(
    Effect.catchAll((error) => {
      const replay = collateralReplayOptions(error, internalOptions);
      return replay ? attempt(replay) : Effect.fail(error);
    }),
  );
};

const completeDelayedFromActions = (
  sourceConfig: TxBuilder.TxBuilderConfig,
  options: CompleteOptions,
) =>
  Effect.gen(function* () {
    const wallet: Wallet = yield* pipe(
      Effect.fromNullable(sourceConfig.lucidConfig.wallet),
      Effect.orElseFail(() => completeTxError(ERROR_MESSAGE.MISSING_WALLET)),
    );
    const presetWalletInputs = options.presetWalletInputs ?? [];
    const fixedWalletInputs =
      presetWalletInputs.length === 0
        ? yield* Effect.tryPromise({
            try: () => wallet.getUtxos(),
            catch: (error) => completeTxError(error),
          })
        : presetWalletInputs;
    const walletCollateral = yield* Effect.cached(
      fetchWalletCollateral(
        wallet,
        options.setCollateral ?? 5_000_000n,
        presetWalletInputs,
      ),
    );

    let currentRedeemers = new Map<number, string>();
    const redeemerBuilderCache: RedeemerBuilderCache = new Map();
    let previousFingerprint: string | undefined;
    let redeemerInputFingerprint: string | undefined;
    let knownRedeemerExUnits: KnownRedeemerExUnits | undefined;

    // A delayed redeemer is derived from one candidate's canonical inputs, but
    // the following replay may choose a different wallet-input set when real
    // ex-units replace the maximum bootstrap budget. Evaluating that replay
    // with the previous candidate's redeemer can fail before the outer fixed
    // point gets a chance to rebuild it. Preserve the bootstrap shape for one
    // real evaluation, carry those real ex-units into subsequent replays, and
    // interrupt evaluation whenever coin selection changes canonical inputs so
    // the redeemer can first be rebuilt from that unevaluated candidate.

    // Bootstrap inputs are pinned for exactly one replay so the first real
    // evaluation uses the same input indices as the bootstrap-built redeemers.
    // Once real ex-units are known, later replays select from scratch again.
    let bootstrapWalletInputs: UTxO[] = [];
    // Set once a collateral top-up fails, for the one replay that allows.
    let initialCollateral: bigint | undefined;

    for (let attempt = 0; attempt < MAX_EVALUATION_ATTEMPTS; attempt++) {
      const replayConfig = makeReplayConfig(sourceConfig);
      let usedBootstrapExUnits = false;
      const completion = yield* pipe(
        Effect.gen(function* () {
          yield* replayTxActions(sourceConfig.actions, currentRedeemers);
          yield* addWalletInputs(replayConfig, bootstrapWalletInputs);
          const missingRedeemers = replayConfig.pendingRedeemers.some(
            (pending) => !currentRedeemers.has(pending.id),
          );
          usedBootstrapExUnits = missingRedeemers;
          return yield* completeCurrentConfig(
            { ...options, canonical: true },
            {
              forceCanonical: true,
              bootstrapExUnits: missingRedeemers,
              walletInputs: fixedWalletInputs,
              walletCollateral,
              knownRedeemerExUnits,
              redeemerInputFingerprint,
              initialCollateral,
            },
          );
        }),
        Effect.provide(Layer.succeed(TxConfig, { config: replayConfig })),
        Effect.either,
      );
      // Each attempt builds in its own TransactionBuilder; free it once the
      // attempt's transaction has been copied out or the attempt is discarded.
      const discardReplay = () => replayConfig.txBuilder.free();

      if (Either.isLeft(completion)) {
        const replay = collateralReplayOptions(completion.left, {
          initialCollateral,
        });
        if (replay) {
          initialCollateral = replay.initialCollateral;
          discardReplay();
          previousFingerprint = undefined;
          continue;
        }
        if (!(completion.left instanceof RedeemerInputRefreshRequired)) {
          discardReplay();
          return yield* Effect.fail(completion.left);
        }

        const tx = completion.left.candidate;
        const nextRedeemers = yield* buildDelayedRedeemers(
          tx,
          replayConfig,
          redeemerBuilderCache,
        );
        currentRedeemers = nextRedeemers;
        redeemerInputFingerprint = canonicalInputFingerprint(tx);
        tx.free();
        discardReplay();
        previousFingerprint = undefined;
        bootstrapWalletInputs = [];
        continue;
      }

      const result = completion.right;
      const tx = result[2].toTransaction();
      if (usedBootstrapExUnits) {
        const walletKeys = new Set(fixedWalletInputs.map(outRefKey));
        bootstrapWalletInputs = replayConfig.collectedInputs.filter((utxo) =>
          walletKeys.has(outRefKey(utxo)),
        );
      } else {
        bootstrapWalletInputs = [];
        knownRedeemerExUnits = yield* collectKnownRedeemerExUnits(
          tx,
          replayConfig,
        );
      }

      const nextRedeemers = yield* buildDelayedRedeemers(
        tx,
        replayConfig,
        redeemerBuilderCache,
      );
      redeemerInputFingerprint = canonicalInputFingerprint(tx);
      discardReplay();

      if (!redeemerMapsEqual(currentRedeemers, nextRedeemers)) {
        currentRedeemers = nextRedeemers;
        previousFingerprint = undefined;
        continue;
      }

      const fingerprint = transactionFixedPointFingerprint(tx);
      if (fingerprint === previousFingerprint) return result;
      previousFingerprint = fingerprint;
    }

    return yield* completeTxError(
      `Context-dependent redeemers did not converge after ${MAX_EVALUATION_ATTEMPTS} attempts. Check for circular redeemer dependencies on the final transaction body, fees, or ex-units.`,
    );
  });

const buildDelayedRedeemers = (
  tx: CML.Transaction,
  replayConfig: TxBuilder.TxBuilderConfig,
  redeemerBuilderCache: RedeemerBuilderCache,
) =>
  Effect.gen(function* () {
    const allResolvedInputs = [
      ...replayConfig.walletInputs,
      ...replayConfig.collectedInputs,
      ...replayConfig.readInputs,
    ];
    const redeemerInfo = yield* buildCanonicalRedeemerInfo(
      tx,
      allResolvedInputs,
    );
    // The redeemer builders run to completion inside this call, so the
    // context's transaction body is not needed once it returns.
    const nextRedeemers = yield* buildRedeemersFromCanonicalContext(
      redeemerInfo,
      replayConfig.pendingRedeemers,
      redeemerBuilderCache,
    ).pipe(Effect.ensuring(Effect.sync(() => redeemerInfo.txBody.free())));
    return nextRedeemers;
  });

// Canonical encoding keeps the order of the input list, so the inputs are
// read from the body as it is.
const canonicalInputFingerprint = (tx: CML.Transaction): string =>
  withCMLScope((own) => {
    const inputs = own(own(tx.body()).inputs());
    return Array.from({ length: inputs.len() }, (_, index) =>
      own(inputs.get(index)).to_canonical_cbor_hex(),
    ).join(",");
  });

const addWalletInputs = (
  config: TxBuilder.TxBuilderConfig,
  inputs: ReadonlyArray<UTxO>,
): Effect.Effect<void, TxBuilderError> =>
  Effect.try({
    try: () => {
      const collected = new Set(config.collectedInputs.map(outRefKey));
      // A fresh array, so earlier snapshots of collectedInputs are unchanged.
      const collectedInputs = [...config.collectedInputs];
      config.collectedInputs = collectedInputs;
      for (const utxo of inputs) {
        const key = outRefKey(utxo);
        if (collected.has(key)) continue;
        withCMLScope((own) => {
          const core = own(utxoToCore(utxo));
          const builder = own(
            CML.SingleInputBuilder.from_transaction_unspent_output(core),
          );
          config.txBuilder.add_input(own(builder.payment_key()));
        });
        collected.add(key);
        collectedInputs.push(utxo);
      }
    },
    catch: (error) => completeTxError(error),
  });

const collectKnownRedeemerExUnits = (
  tx: CML.Transaction,
  config: TxBuilder.TxBuilderConfig,
): Effect.Effect<KnownRedeemerExUnits, TxBuilderError> =>
  Effect.gen(function* () {
    const allResolvedInputs = [
      ...config.walletInputs,
      ...config.collectedInputs,
      ...config.readInputs,
    ];
    const info = yield* buildCanonicalRedeemerInfo(tx, allResolvedInputs);
    const entries = withCMLScope((own) => {
      const redeemers = own(own(tx.witness_set()).redeemers());
      return redeemers ? canonicalRedeemerEntries(redeemers) : [];
    });
    const known: KnownRedeemerExUnits = new Map();
    for (let index = 0; index < info.redeemers.length; index++) {
      const purpose = info.redeemers[index];
      const entry = entries[index];
      if (!entry) continue;
      known.set(witnessPurposeKey(purposeToWitnessKey(purpose)), {
        mem: Number(entry.exUnits.mem()),
        steps: Number(entry.exUnits.steps()),
      });
    }
    freeCanonicalRedeemerEntries(entries);
    info.txBody.free();
    return known;
  });

export const complete = (options: CompleteOptions = {}) =>
  Effect.gen(function* () {
    const { config } = yield* TxConfig;
    const defaultEvaluator =
      options.localUPLCEval !== false &&
      options.evaluator == null &&
      config.lucidConfig.evaluator == null;
    // One default evaluator per completion, so its internal fee, collateral
    // and delayed-redeemer passes can reuse an identical evaluation. Custom
    // evaluators are called for every request as before.
    const completionOptions: CompleteOptions = defaultEvaluator
      ? { ...options, evaluator: makeAikenEvaluator() }
      : options;
    if (config.actions.length === 0)
      return yield* completeCurrentConfig(completionOptions);
    if (hasDelayedActions(config)) {
      return yield* completeDelayedFromActions(config, completionOptions);
    }
    return yield* completeStaticFromActions(config, completionOptions, {});
  });

type EvaluationMode = {
  /**
   * Evaluate the draft once instead of to a fixed point. Only valid when a
   * later round evaluates the final transaction to a fixed point.
   */
  provisional?: boolean;
  /** The builder already carries an explicit fee from an earlier round. */
  explicitFee?: boolean;
  /**
   * Set by the evaluation when it stops at a script-aware fixed point. The
   * builder's explicit fee is then already its effective fee, and the builder
   * is unchanged since that fee was computed.
   */
  settled?: boolean;
  /**
   * The applied collateral, topped up to cover each fee the evaluation
   * applies.
   */
  collateral?: CollateralState;
};

export const selectionAndEvaluation = (
  walletInputs: UTxO[],
  changeAddress: string,
  coinSelection: boolean,
  localUPLCEval: boolean,
  evaluator: EvaluatorAdapter | undefined,
  includeLeftoverLovelaceAsFee: boolean,
  script_calculation: boolean,
  bootstrapExUnits: boolean = false,
  knownRedeemerExUnits?: KnownRedeemerExUnits,
  redeemerInputFingerprint?: string,
  evaluationMode: EvaluationMode = {},
) =>
  Effect.gen(function* () {
    const { config } = yield* TxConfig;
    const refScriptInputs = config.readInputs.filter(
      (input) => input.scriptRef,
    );
    const availableInputs = excludeUTxOs(walletInputs, [
      ...config.collectedInputs,
      ...refScriptInputs,
    ]);

    const { selected: inputsToAdd, burnable } =
      coinSelection !== false
        ? yield* doCoinSelection(
            config,
            availableInputs,
            script_calculation,
            includeLeftoverLovelaceAsFee,
          )
        : { selected: [], burnable: { lovelace: 0n } };

    if (_Array.isNonEmptyArray(inputsToAdd)) {
      yield* addWalletInputs(config, inputsToAdd);
    }

    const appliedKnownExUnits =
      knownRedeemerExUnits !== undefined && knownRedeemerExUnits.size > 0
        ? yield* applyKnownRedeemerExUnits(
            config,
            changeAddress,
            knownRedeemerExUnits,
          )
        : false;

    if (appliedKnownExUnits && script_calculation && coinSelection !== false) {
      const remainingInputs = excludeUTxOs(walletInputs, [
        ...config.collectedInputs,
        ...refScriptInputs,
      ]);
      const { selected: additionalInputs } = yield* doCoinSelection(
        config,
        remainingInputs,
        true,
        includeLeftoverLovelaceAsFee,
      );
      if (_Array.isNonEmptyArray(additionalInputs)) {
        yield* addWalletInputs(config, additionalInputs);
      }
    }

    //NOTE: We need to keep track of all consumed inputs
    //this is just a patch, and we should find a better way to do this
    config.consumedInputs = [...config.collectedInputs];

    // Complete partial programs if present by building their redeemers and running them
    if (config.partialPrograms.size > 0) {
      // NOTE: Cannot build the redeemers twice as it would lead to duplicate addition of
      // inputs for "SPEND" redeemers. As CML currently does not allow updating redeemer of
      // an existing input.
      if (script_calculation) {
        // Only the error message needs the fee estimate.
        const estimatedFee =
          (yield* estimateFee(config, script_calculation)) +
          (_Array.isEmptyArray(inputsToAdd) ? burnable.lovelace : 0n);
        yield* completeTxError(
          `RedeemerBuilder: Coin selection had to be updated after building redeemers, possibly leading to incorrect indices. Try setting a minimum fee of ${estimatedFee} lovelaces.`,
        );
      } else yield* completePartialPrograms();
    }

    // The first pass normally exists to discover ex-units. When ex-units were
    // carried from the preceding delayed-redeemer attempt, preserve them and
    // let the script-aware second selection pass form the evaluation shape.
    if (appliedKnownExUnits && !script_calculation) return true;

    return yield* evaluateUntilStable(
      config,
      walletInputs,
      changeAddress,
      script_calculation,
      localUPLCEval,
      evaluator,
      bootstrapExUnits,
      redeemerInputFingerprint,
      evaluationMode,
    );
  }).pipe(Effect.catchAllDefect((cause) => new RunTimeError({ cause })));

//TODO: This should
export const completePartialPrograms = () =>
  Effect.gen(function* () {
    const { config } = yield* TxConfig;
    const sortedInputs = sortUTxOs(config.collectedInputs, "Canonical");
    const indicesMap: Map<string, bigint> = new Map();
    sortedInputs.forEach((value, index) => {
      indicesMap.set(value.txHash + value.outputIndex, BigInt(index));
    });
    const newPrograms = [];

    // Iterate over all the RedeemerBuilders to construct redeemers
    // and collect obtained programs
    for (const [
      redeemerBuilder,
      partialProgram,
    ] of config.partialPrograms.entries()) {
      if (redeemerBuilder.kind === "selected") {
        const inputIndices = redeemerBuilder.inputs.flatMap((value) => {
          const index = indicesMap.get(value.txHash + value.outputIndex);
          if (index !== undefined) return index;
          else return [];
        });

        if (
          _Array.isEmptyArray(inputIndices) ||
          inputIndices.length !== redeemerBuilder.inputs.length
        )
          yield* completeTxError(
            `RedeemerBuilder: Missing indices for inputs: ${stringify(redeemerBuilder.inputs)}`,
          );

        const redeemer = redeemerBuilder.makeRedeemer(inputIndices);
        const program = partialProgram(redeemer);
        newPrograms.push(program);
      } else {
        // For RedeemerBuilder of kind "self", construct a unique redeemer
        // for every UTxO and collect it's program
        const inputs: UTxO[] = yield* pipe(
          Effect.fromNullable(redeemerBuilder.inputs),
          Effect.orElseFail(() =>
            completeTxError(
              `RedeemerBuilder: Inputs for redeemer builder not founds: ${stringify(redeemerBuilder)}`,
            ),
          ),
        );

        for (const input of inputs) {
          const index = yield* pipe(
            Effect.fromNullable(
              indicesMap.get(input.txHash + input.outputIndex),
            ),
            Effect.orElseFail(() =>
              completeTxError(`Index not found for input: ${input}`),
            ),
          );

          const redeemer = redeemerBuilder.makeRedeemer(index);
          const program = collectFromUTxO([input], false)(redeemer);
          newPrograms.push(program);
        }
      }
    }
    yield* Effect.all(newPrograms);
  });

const lucidRedeemerTags: ReadonlySet<string> = new Set([
  "spend",
  "mint",
  "publish",
  "withdraw",
  "vote",
  "propose",
]);

const isLucidRedeemerTag = (tag: string): tag is RedeemerTag =>
  lucidRedeemerTags.has(tag);

const evaluatorError = (message: string, evaluator?: string, cause?: unknown) =>
  new EvaluatorError({
    evaluator,
    message,
    cause,
  });

const evaluatorName = (evaluator: EvaluatorAdapter): string =>
  evaluator.name ?? "custom";

export const decodeLegacyRedeemers = (
  uplcEval: Uint8Array[],
): EvalRedeemer[] => {
  const evalRedeemers: EvalRedeemer[] = [];
  for (const bytes of uplcEval) {
    withCMLScope((own) => {
      const redeemer = own(CML.LegacyRedeemer.from_cbor_bytes(bytes));
      const exUnits = own(redeemer.ex_units());
      evalRedeemers.push({
        ex_units: {
          mem: Number(exUnits.mem()),
          steps: Number(exUnits.steps()),
        },
        redeemer_index: Number(redeemer.index()),
        redeemer_tag: fromCMLRedeemerTag(redeemer.tag()),
      });
    });
  }
  return evalRedeemers;
};

const evalRedeemerKey = (evalRedeemer: EvalRedeemer): string =>
  `${evalRedeemer.redeemer_tag}:${evalRedeemer.redeemer_index}`;

export const expectedRedeemerKeySet = (
  redeemers: CML.Redeemers,
): Set<string> => {
  const keys = redeemerWitnessKeys(redeemers);
  try {
    return new Set(
      keys.map(
        ({ tag, index }) => `${fromCMLRedeemerTag(tag)}:${index.toString()}`,
      ),
    );
  } finally {
    for (const { key } of keys) key.free();
  }
};

const validateEvalRedeemer = (
  evalRedeemer: EvalRedeemer,
  evaluator?: string,
): void => {
  if (!isLucidRedeemerTag(evalRedeemer.redeemer_tag)) {
    throw evaluatorError(
      `Evaluator returned unknown redeemer tag "${evalRedeemer.redeemer_tag}"`,
      evaluator,
    );
  }
  if (
    !Number.isSafeInteger(evalRedeemer.redeemer_index) ||
    evalRedeemer.redeemer_index < 0
  ) {
    throw evaluatorError(
      `Evaluator returned invalid redeemer index ${evalRedeemer.redeemer_index}`,
      evaluator,
    );
  }
  if (
    !evalRedeemer.ex_units ||
    !Number.isSafeInteger(evalRedeemer.ex_units.mem) ||
    evalRedeemer.ex_units.mem < 0 ||
    !Number.isSafeInteger(evalRedeemer.ex_units.steps) ||
    evalRedeemer.ex_units.steps < 0
  ) {
    throw evaluatorError(
      `Evaluator returned invalid execution units for ${evalRedeemerKey(evalRedeemer)}`,
      evaluator,
    );
  }
};

export const applyEvaluationResult = (
  evalRedeemerList: EvalRedeemer[],
  txbuilder: CML.TransactionBuilder,
  expectedKeys: Set<string>,
  evaluator?: string,
  builderKeyByLedgerKey: ReadonlyMap<string, BuilderRedeemerKey> = new Map(),
): void => {
  if (expectedKeys.size > 0 && evalRedeemerList.length === 0) {
    throw evaluatorError(
      `Evaluator returned zero results for ${expectedKeys.size} redeemer(s)`,
      evaluator,
    );
  }

  const seen = new Set<string>();
  const updates: Array<{
    key: CML.RedeemerWitnessKey;
    exUnits: CML.ExUnits;
  }> = [];
  const release = () => {
    for (const { key, exUnits } of updates) {
      exUnits.free();
      key.free();
    }
  };

  for (const evalRedeemer of evalRedeemerList) {
    validateEvalRedeemer(evalRedeemer, evaluator);
    const key = evalRedeemerKey(evalRedeemer);
    if (seen.has(key)) {
      release();
      throw evaluatorError(
        `Evaluator returned duplicate result for redeemer ${key}`,
        evaluator,
      );
    }
    seen.add(key);
    if (!expectedKeys.has(key)) {
      release();
      throw evaluatorError(
        `Evaluator returned result for unexpected redeemer ${key}`,
        evaluator,
      );
    }
    const exUnits = CML.ExUnits.new(
      BigInt(evalRedeemer.ex_units.mem),
      BigInt(evalRedeemer.ex_units.steps),
    );
    const builderKey = builderKeyByLedgerKey.get(key);
    updates.push({
      key: builderKey
        ? CML.RedeemerWitnessKey.new(builderKey.tag, builderKey.index)
        : CML.RedeemerWitnessKey.new(
            toCMLRedeemerTag(evalRedeemer.redeemer_tag),
            BigInt(evalRedeemer.redeemer_index),
          ),
      exUnits,
    });
  }

  for (const expectedKey of expectedKeys) {
    if (!seen.has(expectedKey)) {
      release();
      throw evaluatorError(
        `Evaluator did not return a result for redeemer ${expectedKey}`,
        evaluator,
      );
    }
  }

  for (const { key, exUnits } of updates) {
    txbuilder.set_exunits(key, exUnits);
  }
  release();
};

/**
 * The returned `key` objects belong to the caller, which frees them once the
 * builder has consumed them.
 */
export const redeemerWitnessKeys = (redeemers: CML.Redeemers) =>
  withCMLScope((own) => {
    const keys: Array<{
      key: CML.RedeemerWitnessKey;
      tag: CML.RedeemerTag;
      index: bigint;
    }> = [];
    const arrLegacyRedeemer = own(redeemers.as_arr_legacy_redeemer());
    if (arrLegacyRedeemer) {
      for (let i = 0; i < arrLegacyRedeemer.len(); i++) {
        const redeemer = own(arrLegacyRedeemer.get(i));
        keys.push({
          key: CML.RedeemerWitnessKey.from_redeemer(redeemer),
          tag: redeemer.tag(),
          index: redeemer.index(),
        });
      }
    }

    const mapRedeemerKeyToRedeemerVal = own(
      redeemers.as_map_redeemer_key_to_redeemer_val(),
    );
    if (mapRedeemerKeyToRedeemerVal) {
      const mapKeys = own(mapRedeemerKeyToRedeemerVal.keys());
      for (let i = 0; i < mapKeys.len(); i++) {
        const key = own(mapKeys.get(i));
        keys.push({
          key: CML.RedeemerWitnessKey.new(key.tag(), key.index()),
          tag: key.tag(),
          index: key.index(),
        });
      }
    }
    return keys;
  });

export const applyBootstrapRedeemerExUnits = (
  redeemers: CML.Redeemers,
  txbuilder: ExUnitSetter,
  maxTxExMem: bigint,
  maxTxExSteps: bigint,
): void => {
  const keys = redeemerWitnessKeys(redeemers);
  const budgets = bootstrapRedeemerExUnits(
    keys.length,
    maxTxExMem,
    maxTxExSteps,
  );
  try {
    for (const [index, { key }] of keys.entries()) {
      const exUnits = budgets[index];
      txbuilder.set_exunits(key, exUnits);
    }
  } finally {
    for (const { key } of keys) key.free();
    freeCML(...budgets);
  }
};

const scriptHashFromCredential = (
  credential: CML.Credential | undefined,
): string | undefined => credential?.as_script()?.to_hex();

const scriptHashFromCertificate = (
  certificate: CML.Certificate,
): string | undefined =>
  scriptHashFromCredential(
    certificate.as_stake_registration()?.stake_credential() ??
      certificate.as_stake_deregistration()?.stake_credential() ??
      certificate.as_stake_delegation()?.stake_credential() ??
      certificate.as_reg_cert()?.stake_credential() ??
      certificate.as_unreg_cert()?.stake_credential() ??
      certificate.as_vote_deleg_cert()?.stake_credential() ??
      certificate.as_stake_vote_deleg_cert()?.stake_credential() ??
      certificate.as_stake_reg_deleg_cert()?.stake_credential() ??
      certificate.as_vote_reg_deleg_cert()?.stake_credential() ??
      certificate.as_stake_vote_reg_deleg_cert()?.stake_credential() ??
      certificate.as_auth_committee_hot_cert()?.committee_cold_credential() ??
      certificate
        .as_resign_committee_cold_cert()
        ?.committee_cold_credential() ??
      certificate.as_reg_drep_cert()?.drep_credential() ??
      certificate.as_unreg_drep_cert()?.drep_credential() ??
      certificate.as_update_drep_cert()?.drep_credential(),
  );

const scriptTypeToLanguage = (
  scriptType: ScriptType,
): CML.Language | undefined => {
  switch (scriptType) {
    case "PlutusV1":
      return CML.Language.PlutusV1;
    case "PlutusV2":
      return CML.Language.PlutusV2;
    case "PlutusV3":
      return CML.Language.PlutusV3;
    case "Native":
      return undefined;
  }
};

const languageSortOrder = (language: CML.Language): number => {
  switch (language) {
    case CML.Language.PlutusV1:
      return 0;
    case CML.Language.PlutusV2:
      return 1;
    case CML.Language.PlutusV3:
      return 2;
  }
};

type RedeemerPurposeIndex = { tag: RedeemerTag; index: bigint };

const redeemerPurposeIndices = (
  redeemers: CML.Redeemers,
): RedeemerPurposeIndex[] =>
  withCMLScope((own) => {
    const purposes: RedeemerPurposeIndex[] = [];
    const legacy = own(redeemers.as_arr_legacy_redeemer());
    if (legacy) {
      for (let i = 0; i < legacy.len(); i++) {
        const redeemer = own(legacy.get(i));
        purposes.push({
          tag: fromCMLRedeemerTag(redeemer.tag()),
          index: redeemer.index(),
        });
      }
    }
    const map = own(redeemers.as_map_redeemer_key_to_redeemer_val());
    if (map) {
      const keys = own(map.keys());
      for (let i = 0; i < keys.len(); i++) {
        const key = own(keys.get(i));
        purposes.push({
          tag: fromCMLRedeemerTag(key.tag()),
          index: key.index(),
        });
      }
    }
    return purposes;
  });

const listIndex = (index: bigint, length: number): number | undefined =>
  index >= 0n && index < BigInt(length) ? Number(index) : undefined;

const credentialHash = (credential: CML.Credential): string =>
  withCMLScope((own) =>
    (own(credential.as_script()) ?? own(credential.as_pub_key()))!.to_hex(),
  );

/**
 * The script hash run by each redeemer of `tx`, located the way the ledger
 * indexes redeemers: spend by input order, mint and withdraw by canonical map
 * key order, publish by certificate order, and vote and propose by the order
 * of the canonical body's voters and proposals. `undefined` where the
 * redeemer's purpose cannot be resolved.
 */
const redeemerScriptHashes = (
  tx: CML.Transaction,
  resolvedInputs: ReadonlyArray<UTxO>,
): Array<RedeemerPurposeIndex & { scriptHash: string | undefined }> =>
  withCMLScope((own) => {
    const redeemers = own(own(tx.witness_set()).redeemers());
    if (!redeemers) return [];
    const body = own(tx.body());
    let canonicalBody: CML.TransactionBody | undefined;
    const canonical = () =>
      (canonicalBody ??= own(
        CML.TransactionBody.from_cbor_bytes(body.to_canonical_cbor_bytes()),
      ));
    let bodyInputs: CML.TransactionInputList | undefined;
    let addresses: Map<string, string> | undefined;
    const paymentHashes = new Map<string, string | undefined>();
    const paymentHash = (address: string): string | undefined => {
      if (!paymentHashes.has(address)) {
        paymentHashes.set(
          address,
          getAddressDetails(address).paymentCredential?.hash,
        );
      }
      return paymentHashes.get(address);
    };
    const addressOf = (key: string): string | undefined => {
      if (addresses === undefined) {
        addresses = new Map();
        for (const utxo of resolvedInputs) {
          const utxoKey = outRefKey(utxo);
          if (!addresses.has(utxoKey)) addresses.set(utxoKey, utxo.address);
        }
      }
      return addresses.get(key);
    };
    // Map keys of equal length sort canonically in byte order, which is the
    // order of their lowercase hex.
    let policyIds: string[] | undefined;
    const sortedPolicyIds = () => {
      if (policyIds === undefined) {
        const policies = own(own(body.mint())?.keys());
        policyIds = Array.from({ length: policies?.len() ?? 0 }, (_, i) =>
          own(policies!.get(i)).to_hex(),
        ).sort();
      }
      return policyIds;
    };
    let withdrawals: Array<{ key: string; hash: string }> | undefined;
    const sortedWithdrawals = () => {
      if (withdrawals === undefined) {
        const rewardAddresses = own(own(body.withdrawals())?.keys());
        withdrawals = Array.from(
          { length: rewardAddresses?.len() ?? 0 },
          (_, i) => {
            const rewardAddress = own(rewardAddresses!.get(i));
            return {
              key: own(rewardAddress.to_address()).to_hex(),
              hash: credentialHash(own(rewardAddress.payment())),
            };
          },
        ).sort((left, right) =>
          left.key < right.key ? -1 : left.key > right.key ? 1 : 0,
        );
      }
      return withdrawals;
    };

    const scriptHash = ({ tag, index }: RedeemerPurposeIndex) => {
      switch (tag) {
        case "spend": {
          const inputs = (bodyInputs ??= own(body.inputs()));
          const position = listIndex(index, inputs.len());
          if (position === undefined) return undefined;
          const input = own(inputs.get(position));
          const address = addressOf(
            `${own(input.transaction_id()).to_hex()}#${input.index()}`,
          );
          return address ? paymentHash(address) : undefined;
        }
        case "mint": {
          const policies = sortedPolicyIds();
          const position = listIndex(index, policies.length);
          return position === undefined ? undefined : policies[position];
        }
        case "withdraw": {
          const entries = sortedWithdrawals();
          const position = listIndex(index, entries.length);
          return position === undefined ? undefined : entries[position].hash;
        }
        case "publish": {
          const certs = own(body.certs());
          const position = listIndex(index, certs?.len() ?? 0);
          return position === undefined
            ? undefined
            : scriptHashFromCertificate(own(certs!.get(position)));
        }
        case "vote": {
          const voters = own(own(canonical().voting_procedures())?.keys());
          const position = listIndex(index, voters?.len() ?? 0);
          return position === undefined
            ? undefined
            : own(own(voters!.get(position)).script_hash())?.to_hex();
        }
        case "propose": {
          const proposals = own(canonical().proposal_procedures());
          const position = listIndex(index, proposals?.len() ?? 0);
          return position === undefined
            ? undefined
            : own(
                own(own(proposals!.get(position)).gov_action()).script_hash(),
              )?.to_hex();
        }
      }
    };
    return redeemerPurposeIndices(redeemers).map((purpose) => ({
      ...purpose,
      scriptHash: scriptHash(purpose),
    }));
  });

const usedPlutusLanguages = (
  tx: CML.Transaction,
  config: TxBuilder.TxBuilderConfig,
): Effect.Effect<CML.LanguageList, TxBuilderError> =>
  Effect.gen(function* () {
    const languages = withCMLScope((own) => {
      const witnessLanguages = own(own(tx.witness_set()).languages());
      const found = new Set<CML.Language>();
      for (let i = 0; i < witnessLanguages.len(); i++) {
        found.add(witnessLanguages.get(i));
      }
      return found;
    });

    const purposes = redeemerScriptHashes(tx, [
      ...config.walletInputs,
      ...config.collectedInputs,
      ...config.readInputs,
    ]);
    for (const { tag, index, scriptHash } of purposes) {
      if (!scriptHash) {
        return yield* completeTxError(
          `Unable to resolve script hash for ${tag}:${index} redeemer`,
        );
      }
      const script = config.scripts.get(scriptHash);
      if (!script) {
        return yield* completeTxError(
          `Unable to resolve script for ${tag} redeemer ${scriptHash}`,
        );
      }
      const language = scriptTypeToLanguage(script.type);
      if (language !== undefined) languages.add(language);
    }

    const result = CML.LanguageList.new();
    [...languages]
      .sort((left, right) => languageSortOrder(left) - languageSortOrder(right))
      .forEach((language) => result.add(language));
    return result;
  });

const refreshScriptDataHash = (
  tx: CML.Transaction,
  config: TxBuilder.TxBuilderConfig,
): Effect.Effect<CML.Transaction, TxBuilderError> =>
  Effect.gen(function* () {
    const witnessSet = tx.witness_set();
    const redeemers = witnessSet.redeemers();
    if (!redeemers) {
      witnessSet.free();
      return tx;
    }

    const datums = witnessSet.plutus_datums() ?? CML.PlutusDataList.new();
    const usedLangs = yield* usedPlutusLanguages(tx, config).pipe(
      Effect.tapError(() =>
        Effect.sync(() => freeCML(witnessSet, redeemers, datums)),
      ),
    );
    const scriptDataHash = yield* Effect.try({
      try: () => {
        try {
          return CML.calc_script_data_hash(
            redeemers,
            datums,
            config.lucidConfig.costModels,
            usedLangs,
          );
        } finally {
          freeCML(redeemers, datums, usedLangs);
        }
      },
      catch: (error) => {
        witnessSet.free();
        return completeTxError(error);
      },
    });
    const resolvedScriptDataHash = yield* pipe(
      Effect.fromNullable(scriptDataHash),
      Effect.orElseFail(() => {
        witnessSet.free();
        return completeTxError("Unable to calculate script data hash");
      }),
    );
    return withCMLScope((own) => {
      own(witnessSet);
      const body = own(tx.body());
      body.set_script_data_hash(own(resolvedScriptDataHash));
      // `Transaction.new` takes ownership of the auxiliary data.
      return CML.Transaction.new(
        body,
        witnessSet,
        tx.is_valid(),
        tx.auxiliary_data(),
      );
    });
  });

/**
 * Returns `tx` itself when it carries no redeemers, otherwise a new
 * transaction the caller owns.
 */
export const setRedeemerstoZero = (tx: CML.Transaction): CML.Transaction =>
  withCMLScope((own) => {
    const witnessSet = own(tx.witness_set());
    const redeemers = own(witnessSet.redeemers());
    if (!redeemers) return tx;
    const zeroExUnits = () => own(CML.ExUnits.new(0n, 0n));
    const arrLegacyRedeemer = own(redeemers.as_arr_legacy_redeemer());
    if (arrLegacyRedeemer) {
      const redeemerList = own(CML.LegacyRedeemerList.new());
      for (let i = 0; i < arrLegacyRedeemer.len(); i++) {
        const redeemer = own(arrLegacyRedeemer.get(i));
        const dummyRedeemer = own(
          CML.LegacyRedeemer.new(
            redeemer.tag(),
            redeemer.index(),
            own(redeemer.data()),
            zeroExUnits(),
          ),
        );
        redeemerList.add(dummyRedeemer);
      }
      witnessSet.set_redeemers(
        own(CML.Redeemers.new_arr_legacy_redeemer(redeemerList)),
      );
      // `Transaction.new` takes ownership of the auxiliary data.
      return CML.Transaction.new(
        own(tx.body()),
        witnessSet,
        true,
        tx.auxiliary_data(),
      );
    }
    const mapRedeemerKeyToRedeemerVal = own(
      redeemers.as_map_redeemer_key_to_redeemer_val(),
    );
    if (mapRedeemerKeyToRedeemerVal) {
      const dummyRedeemerMap = own(CML.MapRedeemerKeyToRedeemerVal.new());
      const keys = own(mapRedeemerKeyToRedeemerVal.keys());
      for (let i = 0; i < keys.len(); i++) {
        const key = own(keys.get(i));
        const value = own(mapRedeemerKeyToRedeemerVal.get(key)!);
        dummyRedeemerMap.insert(
          key,
          own(CML.RedeemerVal.new(own(value.data()), zeroExUnits())),
        );
      }
      witnessSet.set_redeemers(
        own(
          CML.Redeemers.new_map_redeemer_key_to_redeemer_val(dummyRedeemerMap),
        ),
      );
      // `Transaction.new` takes ownership of the auxiliary data.
      return CML.Transaction.new(
        own(tx.body()),
        witnessSet,
        true,
        tx.auxiliary_data(),
      );
    }
    return tx;
  });

/**
 * The collateral applied to the builder. It only grows, which bounds the fee
 * fixed point that tops it up.
 */
type CollateralState = {
  inputs: UTxO[];
  /** The collateral amount: the inputs minus the collateral return. */
  total: bigint;
  /** Whether the builder carries a collateral return. */
  hasReturn: boolean;
  /** The configured lower bound, `setCollateral`. */
  minimum: bigint;
  /** Candidates for top-ups: the wallet's preferred ones first. */
  walletCollateral: UTxO[];
  walletInputs: UTxO[];
  changeAddress: string;
};

/**
 * Sets the collateral return to what `inputs` hold beyond `total`, unless
 * nothing is left. CML replaces an earlier return, and derives
 * `total_collateral` from the inputs and the return when it builds.
 */
const setCollateralReturn = (
  config: TxBuilder.TxBuilderConfig,
  inputs: UTxO[],
  total: bigint,
  changeAddress: string,
): boolean => {
  const returnassets = pipe(
    sumAssetsFromInputs(inputs),
    Record.union({ lovelace: -total }, _BigInt.sum),
  );
  // Collateral that matches the amount exactly has nothing to return.
  if (Object.values(returnassets).every((amount) => amount === 0n)) {
    return false;
  }
  withCMLScope((own) => {
    const collateralOutputBuilder = own(
      own(CML.TransactionOutputBuilder.new()).with_address(
        own(CML.Address.from_bech32(changeAddress)),
      ),
    );
    const result = own(
      own(
        own(collateralOutputBuilder.next()).with_value(
          own(assetsToValue(returnassets)),
        ),
      ).build(),
    );
    config.txBuilder.set_collateral_return(own(result.output()));
  });
  return true;
};

const addCollateralInputs = (
  config: TxBuilder.TxBuilderConfig,
  inputs: UTxO[],
) => {
  for (const utxo of inputs) {
    withCMLScope((own) => {
      const core = own(utxoToCore(utxo));
      const builder = own(
        CML.SingleInputBuilder.from_transaction_unspent_output(core),
      );
      config.txBuilder.add_collateral(own(builder.payment_key()));
    });
  }
};

const applyCollateral = (
  totalCollateral: bigint,
  collateralInputs: UTxO[],
  context: Omit<CollateralState, "inputs" | "total" | "hasReturn">,
): Effect.Effect<CollateralState, never, TxConfig> =>
  Effect.gen(function* () {
    const { config } = yield* TxConfig;
    addCollateralInputs(config, collateralInputs);
    return {
      ...context,
      inputs: collateralInputs,
      total: totalCollateral,
      hasReturn: setCollateralReturn(
        config,
        collateralInputs,
        totalCollateral,
        context.changeAddress,
      ),
    };
  });

const collateralConvergenceError = () =>
  completeTxError(
    `Collateral did not converge with the fee after ${MAX_EVALUATION_ATTEMPTS} top-ups`,
  );

/**
 * Raises the collateral in place to cover `fee`: by shrinking the collateral
 * return when the selected inputs still leave a valid one, and otherwise by
 * adding inputs, from the wallet's collateral candidates first. Returns
 * whether the builder changed, in which case its fee needs re-estimating.
 */
const topUpCollateral = (
  config: TxBuilder.TxBuilderConfig,
  state: CollateralState,
  fee: bigint,
): Effect.Effect<boolean, TxBuilderError> =>
  Effect.gen(function* () {
    const { collateralPercentage, coinsPerUtxoByte, maxCollateralInputs } =
      config.lucidConfig.protocolParameters;
    const feeCollateral = requiredCollateral(fee, collateralPercentage);
    const required =
      feeCollateral > state.minimum ? feeCollateral : state.minimum;
    if (required <= state.total) return false;

    const leftover = pipe(
      sumAssetsFromInputs(state.inputs),
      Record.union({ lovelace: -required }, _BigInt.sum),
    );
    const leftoverLovelace = leftover.lovelace ?? 0n;
    if (
      state.hasReturn &&
      leftoverLovelace >=
        calculateMinLovelace(coinsPerUtxoByte, leftover, state.changeAddress)
    ) {
      setCollateralReturn(config, state.inputs, required, state.changeAddress);
      state.total = required;
      return true;
    }

    // The selected inputs cannot cover it: select more, so that the inputs
    // cover `required` plus a valid collateral return.
    const requiredAssets: Assets =
      leftoverLovelace < 0n ? { lovelace: -leftoverLovelace } : {};
    const externalAssets: Assets =
      leftoverLovelace < 0n ? { ...leftover, lovelace: 0n } : leftover;
    const error = completeTxError(
      `Your wallet does not have enough funds to cover the required ${required} Lovelace collateral. Or it contains UTxOs with reference scripts; which
      are excluded from collateral selection.`,
    );
    // CML cannot remove collateral inputs, so a failure here asks for one
    // replay that selects the whole collateral up front.
    const replay = (cause: TxBuilderError) =>
      new CollateralReplayRequired(
        cause,
        required,
        state.walletInputs,
        state.walletCollateral,
      );
    const select = (candidates: UTxO[]) =>
      recursive(
        sortUTxOs(
          excludeUTxOs(candidates, state.inputs).filter(
            (utxo) => !utxo.scriptRef,
          ),
        ),
        requiredAssets,
        coinsPerUtxoByte,
        externalAssets,
        false,
        error,
      );
    const { selected } = yield* pipe(
      select(state.walletCollateral),
      Effect.orElse(() =>
        select([
          ...state.walletCollateral,
          ...excludeUTxOs(state.walletInputs, state.walletCollateral),
        ]),
      ),
      Effect.mapError(replay),
    );
    const maxInputs = maxCollateralInputs ?? 3;
    if (state.inputs.length + selected.length > maxInputs) {
      return yield* Effect.fail(
        replay(
          completeTxError(
            `Covering the required ${required} Lovelace collateral needs ${state.inputs.length + selected.length} collateral inputs, but at most ${maxInputs} are allowed`,
          ),
        ),
      );
    }
    // The selection leaves a collateral return of at least the minimum ADA,
    // so the return is always overwritten. CML cannot clear one, so a builder
    // that already has a return must not be left with a stale one.
    const inputs = [...state.inputs, ...selected];
    const hasReturn = setCollateralReturn(
      config,
      inputs,
      required,
      state.changeAddress,
    );
    if (state.hasReturn && !hasReturn) {
      return yield* completeTxError(
        `Covering the required ${required} Lovelace collateral leaves no collateral return to replace the existing one`,
      );
    }
    addCollateralInputs(config, selected);
    state.inputs = inputs;
    state.hasReturn = hasReturn;
    state.total = required;
    return true;
  });

// Collateral candidates preferred by the wallet, limited to the preset wallet
// inputs when given. A failed call yields no candidates, since collateral then
// comes from the wallet's UTxOs.
const fetchWalletCollateral = (
  wallet: Wallet,
  amount: bigint,
  presetWalletInputs: UTxO[],
): Effect.Effect<UTxO[]> => {
  const presetKeys = new Set(presetWalletInputs.map(outRefKey));
  return wallet.getCollateral === undefined
    ? Effect.succeed([])
    : pipe(
        Effect.tryPromise(() => wallet.getCollateral!(amount)),
        Effect.map((candidates) =>
          presetWalletInputs.length === 0
            ? candidates
            : candidates.filter((candidate) =>
                presetKeys.has(outRefKey(candidate)),
              ),
        ),
        Effect.orElseSucceed((): UTxO[] => []),
      );
};

// Selects collateral from the wallet's candidates when they cover it, and
// otherwise from the wallet's UTxOs. A candidate holding exactly the
// collateral in ADA is used without a collateral return, since wallets
// commonly set aside exactly 5 ADA.
const selectCollateral = (
  coinsPerUtxoByte: bigint,
  maxCollateralInputs: number,
  totalCollateral: bigint,
  walletCollateral: UTxO[],
  walletInputs: UTxO[],
): Effect.Effect<UTxO[], TxBuilderError> => {
  const fromWalletInputs = findCollateral(
    coinsPerUtxoByte,
    maxCollateralInputs,
    totalCollateral,
    walletInputs,
  );
  const exact = walletCollateral.find(
    (utxo) =>
      Object.keys(utxo.assets).length === 1 &&
      utxo.assets.lovelace === totalCollateral,
  );
  if (exact !== undefined) return Effect.succeed([exact]);
  return walletCollateral.length === 0
    ? fromWalletInputs
    : pipe(
        findCollateral(
          coinsPerUtxoByte,
          maxCollateralInputs,
          totalCollateral,
          walletCollateral,
        ),
        Effect.orElse(() => fromWalletInputs),
      );
};

const findCollateral = (
  coinsPerUtxoByte: bigint,
  maxCollateralInputs: number,
  setCollateral: bigint,
  inputs: UTxO[],
): Effect.Effect<UTxO[], TxBuilderError, never> =>
  Effect.gen(function* () {
    // NOTE: While the required collateral is 5 ADA, there may be instances where the UTXOs encountered do not contain enough ADA to be returned to the collateral return address.
    // For example:
    // A UTXO with 5.5 ADA will result in an error message such as `BabbageOutputTooSmallUTxO`, since only 0.5 ADA would be returned to the collateral return address.
    const collateralLovelace: Assets = { lovelace: setCollateral };
    const error = completeTxError(
      `Your wallet does not have enough funds to cover the required ${setCollateral} Lovelace collateral. Or it contains UTxOs with reference scripts; which
      are excluded from collateral selection.`,
    );
    const { selected } = yield* recursive(
      sortUTxOs(inputs),
      collateralLovelace,
      coinsPerUtxoByte,
      undefined,
      false,
      error,
    );
    if (selected.length > maxCollateralInputs)
      yield* completeTxError(
        `Selected ${selected.length} inputs as collateral, but max collateral inputs is ${maxCollateralInputs} to cover the ${setCollateral} Lovelace collateral ${stringify(selected)}`,
      );
    return selected;
  });

const doCoinSelection = (
  config: TxBuilder.TxBuilderConfig,
  availableInputs: UTxO[],
  script_calculation: boolean,
  includeLeftoverLovelaceAsFee: boolean,
): Effect.Effect<{ selected: UTxO[]; burnable: Assets }, TxBuilderError> =>
  Effect.gen(function* () {
    // NOTE: This is a fee estimation. If the amount is not enough, it may require increasing the fee.
    const estimatedFee: Assets = {
      lovelace:
        (yield* estimateFee(config, script_calculation)) +
        treasuryDonationAmount(config),
    };

    const negatedMintedAssets = negateAssets(config.mintedAssets);
    const negatedCollectedAssets = negateAssets(
      sumAssetsFromInputs(config.collectedInputs),
    );

    // Calculate the net change in assets (delta)
    const assetsDelta: Assets = pipe(
      config.totalOutputAssets,
      Record.union(estimatedFee, _BigInt.sum),
      Record.union(negatedCollectedAssets, _BigInt.sum),
      Record.union(negatedMintedAssets, _BigInt.sum),
    );
    // Filter and obtain only the required assets (those with a positive amount)
    let requiredAssets = pipe(
      assetsDelta,
      Record.filter((amount) => amount > 0n),
    );
    // Filter and obtain assets that are present in the inputs and mints but are not required by the outputs
    // Negate these assets to get their positive amounts
    const notRequiredAssets = pipe(
      assetsDelta,
      Record.filter((amount) => amount < 0n),
      negateAssets,
    );

    // Note: We are not done with coin selection even if "requiredAssets" is empty.
    // Because "notRequiredAssets" may not contain enough ADA to cover for minimum Ada requirement
    // when they need to be sent as change output. Hence, we allow for "recursive" to be invoked.
    return yield* recursive(
      sortUTxOs(availableInputs),
      requiredAssets,
      config.lucidConfig.protocolParameters.coinsPerUtxoByte,
      notRequiredAssets,
      includeLeftoverLovelaceAsFee,
    );
  });

/**
 * Estimate total transaction fee without mutating the CML.TransactionBuilder.
 */
const estimateFee = (
  config: TxBuilder.TxBuilderConfig,
  script_calculation: boolean,
): Effect.Effect<bigint, TxBuilderError, never> =>
  Effect.gen(function* () {
    const minFee = config.txBuilder.min_fee(script_calculation);
    const customMinFee = config.minFee;
    return customMinFee !== undefined && customMinFee > minFee
      ? customMinFee
      : minFee;
  });

const applyEffectiveFee = (
  config: TxBuilder.TxBuilderConfig,
  script_calculation: boolean,
  forceExplicitFee: boolean = false,
): Effect.Effect<bigint, TxBuilderError, never> =>
  Effect.gen(function* () {
    const effectiveFee = yield* estimateFee(config, script_calculation);
    // Keep ordinary transactions on CML's computed-fee path. When setMinFee is
    // active or scripts were evaluated, overwrite the explicit fee every pass
    // so the fee floor never gets stale.
    if (forceExplicitFee || config.minFee !== undefined)
      config.txBuilder.set_fee(effectiveFee);
    return effectiveFee;
  });

const buildEvaluationDraft = (
  config: TxBuilder.TxBuilderConfig,
  changeAddress: string,
): Effect.Effect<CML.Transaction, TxBuilderError> =>
  Effect.try({
    try: () =>
      withCMLScope((own) =>
        own(
          config.txBuilder.build_for_evaluation(
            0,
            own(CML.Address.from_bech32(changeAddress)),
          ),
        ).draft_tx(),
      ),
    catch: (error) => completeTxError(error),
  });

const buildEvaluationCandidate = (
  config: TxBuilder.TxBuilderConfig,
  changeAddress: string,
  script_calculation: boolean,
  forceExplicitFee: boolean,
): Effect.Effect<CML.Transaction, TxBuilderError> =>
  Effect.gen(function* () {
    const fee = yield* applyEffectiveFee(
      config,
      script_calculation,
      forceExplicitFee,
    );
    const candidate = yield* buildEvaluationDraft(config, changeAddress);
    const hasRedeemers = withCMLScope(
      (own) => own(own(candidate.witness_set()).redeemers()) !== undefined,
    );
    if (forceExplicitFee || !hasRedeemers) {
      return candidate;
    }
    candidate.free();
    if (config.minFee === undefined) {
      // The builder is unchanged since `fee` was computed.
      config.txBuilder.set_fee(fee);
    } else {
      yield* applyEffectiveFee(config, script_calculation, true);
    }
    return yield* buildEvaluationDraft(config, changeAddress);
  });

const prepareRedeemerContextCandidate = (
  candidate: CML.Transaction,
  config: TxBuilder.TxBuilderConfig,
): Effect.Effect<CML.Transaction, TxBuilderError> =>
  Effect.gen(function* () {
    const canonical = CML.Transaction.from_cbor_bytes(
      candidate.to_canonical_cbor_bytes(),
    );
    const normalized = yield* Effect.try({
      try: () =>
        normalizeGovernanceRedeemerIndices(
          canonical,
          config.governanceVoteWitnessKeys,
          config.governanceProposalWitnessIndices,
        ).transaction,
      catch: (error) => completeTxError(error),
    });
    if (normalized !== canonical) canonical.free();
    const refreshed = yield* refreshScriptDataHash(normalized, config);
    if (refreshed !== normalized) normalized.free();
    return refreshed;
  });

const applyKnownRedeemerExUnits = (
  config: TxBuilder.TxBuilderConfig,
  changeAddress: string,
  known: KnownRedeemerExUnits,
): Effect.Effect<boolean, TxBuilderError> =>
  Effect.gen(function* () {
    const candidate = yield* buildEvaluationCandidate(
      config,
      changeAddress,
      false,
      true,
    );
    const normalization = yield* Effect.try({
      try: () =>
        normalizeGovernanceRedeemerIndices(
          candidate,
          config.governanceVoteWitnessKeys,
          config.governanceProposalWitnessIndices,
        ),
      catch: (error) => completeTxError(error),
    });
    const transaction = normalization.transaction;
    if (transaction !== candidate) candidate.free();
    const expectedKeys = withCMLScope((own) => {
      const redeemers = own(own(transaction.witness_set()).redeemers());
      return redeemers ? expectedRedeemerKeySet(redeemers) : undefined;
    });
    if (!expectedKeys) {
      transaction.free();
      return false;
    }

    const resolvedInputs = [
      ...config.walletInputs,
      ...config.collectedInputs,
      ...config.readInputs,
    ];
    const info = yield* buildCanonicalRedeemerInfo(
      transaction,
      resolvedInputs,
    ).pipe(Effect.ensuring(Effect.sync(() => transaction.free())));
    info.txBody.free();
    const evalRedeemers: EvalRedeemer[] = [];
    for (const purpose of info.redeemers) {
      const exUnits = known.get(
        witnessPurposeKey(purposeToWitnessKey(purpose)),
      );
      if (!exUnits) return false;
      evalRedeemers.push({
        redeemer_tag: purpose.tag,
        redeemer_index: Number(purpose.index),
        ex_units: exUnits,
      });
    }

    yield* Effect.try({
      try: () =>
        applyEvaluationResult(
          evalRedeemers,
          config.txBuilder,
          expectedKeys,
          "delayed-redeemer fixed point",
          normalization.builderKeyByLedgerKey,
        ),
      catch: (error) => completeTxError(error),
    });
    return true;
  });

/**
 * What phase-two scripts can observe of a candidate: its canonical body and
 * each redeemer's purpose and data, in canonical redeemer order. Ex-units are
 * left out, since evaluation replaces them.
 */
const evaluationFixedPointFingerprint = (tx: CML.Transaction): Uint8Array[] =>
  withCMLScope((own) => {
    const parts = [own(tx.body()).to_canonical_cbor_bytes()];
    const redeemers = own(own(tx.witness_set()).redeemers());
    if (!redeemers) return parts;
    const entries = canonicalRedeemerEntries(redeemers);
    try {
      for (const entry of entries) {
        parts.push(entry.sortKey, entry.data.to_canonical_cbor_bytes());
      }
    } finally {
      freeCanonicalRedeemerEntries(entries);
    }
    return parts;
  });

const evaluateUntilStable = (
  config: TxBuilder.TxBuilderConfig,
  walletInputs: UTxO[],
  changeAddress: string,
  script_calculation: boolean,
  localUPLCEval: boolean,
  evaluator: EvaluatorAdapter | undefined,
  bootstrapExUnits: boolean,
  redeemerInputFingerprint: string | undefined,
  mode: EvaluationMode,
): Effect.Effect<
  boolean,
  TxBuilderError | EvaluatorError | RedeemerInputRefreshRequired
> =>
  Effect.gen(function* () {
    const { provisional = false, explicitFee = false } = mode;
    let previousFingerprint: Uint8Array[] | undefined;
    let forceExplicitFee = explicitFee || config.minFee !== undefined;

    for (let attempt = 0; attempt < MAX_EVALUATION_ATTEMPTS; attempt++) {
      let candidate = yield* buildEvaluationCandidate(
        config,
        changeAddress,
        script_calculation,
        forceExplicitFee,
      );
      // Top the collateral up to cover the candidate's fee. A top-up grows
      // the body, so the fee is applied again until the collateral covers it.
      // Scripts never see collateral, so this adds no evaluation unless the
      // fee changes.
      const collateral = bootstrapExUnits ? undefined : mode.collateral;
      for (let topUps = 0; collateral !== undefined; topUps++) {
        const fee = withCMLScope((own) => own(candidate.body()).fee());
        const toppedUp = yield* topUpCollateral(config, collateral, fee).pipe(
          Effect.tapError(() => Effect.sync(() => candidate.free())),
        );
        if (!toppedUp) break;
        candidate.free();
        if (topUps >= MAX_EVALUATION_ATTEMPTS) {
          return yield* collateralConvergenceError();
        }
        candidate = yield* buildEvaluationCandidate(
          config,
          changeAddress,
          script_calculation,
          forceExplicitFee,
        );
      }
      const redeemers = withCMLScope((own) =>
        own(candidate.witness_set()).redeemers(),
      );
      if (!redeemers) {
        candidate.free();
        return false;
      }
      forceExplicitFee = true;

      if (bootstrapExUnits) {
        // Unresolved delayed redeemers prevent phase-two evaluation of the
        // draft, but fee and collateral selection still need script costs.
        applyBootstrapRedeemerExUnits(
          redeemers,
          config.txBuilder,
          config.lucidConfig.protocolParameters.maxTxExMem,
          config.lucidConfig.protocolParameters.maxTxExSteps,
        );
        freeCML(redeemers, candidate);
        return true;
      }
      redeemers.free();

      if (
        redeemerInputFingerprint !== undefined &&
        canonicalInputFingerprint(candidate) !== redeemerInputFingerprint
      ) {
        const contextCandidate = yield* prepareRedeemerContextCandidate(
          candidate,
          config,
        ).pipe(Effect.ensuring(Effect.sync(() => candidate.free())));
        return yield* Effect.fail(
          new RedeemerInputRefreshRequired(contextCandidate),
        );
      }

      // Re-evaluate only when the zero-exunit candidate changes in a way that
      // scripts can observe, such as fee or change-output drift after ex-units.
      const fingerprint = evaluationFixedPointFingerprint(candidate);
      if (
        previousFingerprint !== undefined &&
        sameByteArrays(fingerprint, previousFingerprint)
      ) {
        candidate.free();
        if (script_calculation) mode.settled = true;
        return true;
      }
      previousFingerprint = fingerprint;

      yield* evaluateTransaction(
        config,
        candidate,
        walletInputs,
        localUPLCEval,
        evaluator,
      ).pipe(Effect.ensuring(Effect.sync(() => candidate.free())));
      // A later round evaluates the final transaction to a fixed point.
      if (provisional) return true;
    }

    return yield* completeTxError(
      `Phase-two evaluation did not converge after ${MAX_EVALUATION_ATTEMPTS} attempts. Check for scripts that depend on transaction fees, change outputs, or execution-unit-driven transaction shape.`,
    );
  });

const resolveEvaluationUTxOs = (
  tx: CML.Transaction,
  walletInputs: UTxO[],
  config: TxBuilder.TxBuilderConfig,
): Effect.Effect<UTxO[], TxBuilderError> =>
  Effect.gen(function* () {
    const candidates = [
      ...walletInputs,
      ...config.collectedInputs,
      ...config.readInputs,
    ];
    const inputs = yield* resolveCanonicalInputs(tx, candidates);
    const referenceInputs = yield* resolveCanonicalReferenceInputs(
      tx,
      candidates,
    );
    return [...inputs, ...referenceInputs].map(normalizeEvalUTxO);
  });

const makeProviderEvaluator = (provider: Provider): EvaluatorAdapter => ({
  name: "provider",
  evaluate: ({ tx, additionalUTxOs }) =>
    provider.evaluateTx(tx, additionalUTxOs),
});

type AikenEvaluationRequest = {
  txBytes: Uint8Array;
  inputBytes: Uint8Array[];
  outputBytes: Uint8Array[];
  costModels: Uint8Array;
  maxSteps: bigint;
  maxMemory: bigint;
  zeroTime: bigint;
  zeroSlot: bigint;
  slotLength: number;
  protocolMajorVersion: number | undefined;
};

const sameBytes = (left: Uint8Array, right: Uint8Array): boolean => {
  if (left === right) return true;
  if (left.length !== right.length) return false;
  for (let index = 0; index < left.length; index++) {
    if (left[index] !== right[index]) return false;
  }
  return true;
};

const sameByteArrays = (
  left: ReadonlyArray<Uint8Array>,
  right: ReadonlyArray<Uint8Array>,
): boolean =>
  left.length === right.length &&
  left.every((bytes, index) => sameBytes(bytes, right[index]));

const sameAikenRequest = (
  left: AikenEvaluationRequest,
  right: AikenEvaluationRequest,
): boolean =>
  sameBytes(left.txBytes, right.txBytes) &&
  sameByteArrays(left.inputBytes, right.inputBytes) &&
  sameByteArrays(left.outputBytes, right.outputBytes) &&
  sameBytes(left.costModels, right.costModels) &&
  left.maxSteps === right.maxSteps &&
  left.maxMemory === right.maxMemory &&
  left.zeroTime === right.zeroTime &&
  left.zeroSlot === right.zeroSlot &&
  Object.is(left.slotLength, right.slotLength) &&
  Object.is(left.protocolMajorVersion, right.protocolMajorVersion);

/**
 * Whether two asset maps are equal in content and in key order. The output
 * encoding, and so the script context a script sees, follows the key order.
 */
const sameAssets = (left: Assets, right: Assets): boolean => {
  const leftUnits = Object.keys(left);
  const rightUnits = Object.keys(right);
  return (
    leftUnits.length === rightUnits.length &&
    leftUnits.every(
      (unit, index) => unit === rightUnits[index] && left[unit] === right[unit],
    )
  );
};

/** Whether two UTxOs encode to the same transaction output. */
const sameTxOutput = (left: UTxO, right: UTxO): boolean =>
  left.address === right.address &&
  (left.datumHash ?? undefined) === (right.datumHash ?? undefined) &&
  (left.datum ?? undefined) === (right.datum ?? undefined) &&
  (left.scriptRef ?? undefined)?.type ===
    (right.scriptRef ?? undefined)?.type &&
  (left.scriptRef ?? undefined)?.script ===
    (right.scriptRef ?? undefined)?.script &&
  sameAssets(left.assets, right.assets);

type EncodedUTxO = Readonly<{
  utxo: UTxO;
  input: Uint8Array;
  output: Uint8Array;
}>;

/**
 * Evaluates a transaction given as CBOR bytes, sparing the built-in evaluator
 * the hex round trip of the public `EvaluatorAdapter` contract.
 */
const evaluateTxBytes = Symbol("evaluateTxBytes");

type BytesEvaluator = (
  txBytes: Uint8Array,
  additionalUTxOs: UTxO[],
  context: EvaluationContext,
) => Promise<EvalRedeemer[]>;

type BuiltInEvaluatorAdapter = EvaluatorAdapter & {
  readonly [evaluateTxBytes]: BytesEvaluator;
};

/**
 * The subset of `@lucid-evolution/uplc` used by the Aiken evaluator.
 */
export type UPLCModule = Pick<typeof UPLC, "eval_phase_two_raw">;

/**
 * The built-in evaluator, backed by the given uplc build. It remembers its last successful request and
 * returns that result again when the next request is byte-for-byte the same
 * (transaction, resolved UTxOs, cost models, budget, slot configuration and
 * protocol version). Evaluation is deterministic, so the result is the same.
 * Failures are not remembered. It also keeps the CBOR encoding of the
 * resolved UTxOs of its latest request, since one completion evaluates the
 * same inputs repeatedly; encodings the latest request did not use are
 * dropped, so a long-lived evaluator does not grow.
 *
 * @example
 * import * as UPLCSize from "@lucid-evolution/uplc/size";
 * const lucid = await Lucid(provider, "Preprod", {
 *   evaluator: makeAikenEvaluator(UPLCSize),
 * });
 */
export const makeAikenEvaluator = (
  uplc: UPLCModule = UPLC,
): EvaluatorAdapter => {
  let previous:
    | { request: AikenEvaluationRequest; redeemers: Uint8Array[] }
    | undefined;
  let costModels: { source: CML.CostModels; bytes: Uint8Array } | undefined;
  // Encodings used by the latest request, by out-ref.
  let encodedUTxOs = new Map<string, EncodedUTxO>();

  // The cached arrays are private to this evaluator and never modified.
  const encodeUTxO = (utxo: UTxO): EncodedUTxO => {
    const key = `${utxo.txHash}#${utxo.outputIndex}`;
    const cached = encodedUTxOs.get(key);
    if (cached !== undefined && sameTxOutput(cached.utxo, utxo)) return cached;
    return withCMLScope((own) => ({
      utxo: cloneUTxO(utxo),
      input: own(utxoToTransactionInput(utxo)).to_cbor_bytes(),
      output: own(utxoToTransactionOutput(utxo)).to_cbor_bytes(),
    }));
  };

  const encodeUTxOs = (utxos: ReadonlyArray<UTxO>): EncodedUTxO[] => {
    const used = new Map<string, EncodedUTxO>();
    const encoded = utxos.map((utxo) => {
      const result = encodeUTxO(utxo);
      used.set(`${utxo.txHash}#${utxo.outputIndex}`, result);
      return result;
    });
    encodedUTxOs = used;
    return encoded;
  };

  const encodeCostModels = (source: CML.CostModels): Uint8Array => {
    if (costModels?.source !== source) {
      costModels = { source, bytes: source.to_cbor_bytes() };
    }
    return costModels.bytes;
  };

  const evaluate: BytesEvaluator = async (
    txBytes,
    additionalUTxOs,
    context,
  ) => {
    const encoded = encodeUTxOs(additionalUTxOs);
    const request: AikenEvaluationRequest = {
      txBytes,
      inputBytes: encoded.map(({ input }) => input),
      outputBytes: encoded.map(({ output }) => output),
      costModels: encodeCostModels(context.costModels),
      maxSteps: context.protocolParameters.maxTxExSteps,
      maxMemory: context.protocolParameters.maxTxExMem,
      zeroTime: BigInt(context.slotConfig.zeroTime),
      zeroSlot: BigInt(context.slotConfig.zeroSlot),
      slotLength: context.slotConfig.slotLength,
      protocolMajorVersion: context.protocolParameters.protocolMajorVersion,
    };
    if (previous && sameAikenRequest(previous.request, request)) {
      // Decode again so callers never share the remembered result.
      return decodeLegacyRedeemers(previous.redeemers);
    }
    previous = undefined;
    // A copy, so later changes to the caller's bytes cannot alter the key.
    const remembered: AikenEvaluationRequest = {
      ...request,
      txBytes: txBytes.slice(),
    };
    const uplcEval = uplc.eval_phase_two_raw(
      request.txBytes,
      request.inputBytes,
      request.outputBytes,
      request.costModels,
      request.maxSteps,
      request.maxMemory,
      request.zeroTime,
      request.zeroSlot,
      request.slotLength,
      request.protocolMajorVersion,
    );
    const result = decodeLegacyRedeemers(uplcEval);
    previous = {
      request: remembered,
      redeemers: uplcEval.map((bytes) => bytes.slice()),
    };
    return result;
  };

  const adapter: BuiltInEvaluatorAdapter = {
    name: "aiken",
    evaluate: ({ tx, additionalUTxOs, context }) =>
      evaluate(
        withCMLScope((own) =>
          own(CML.Transaction.from_cbor_hex(tx)).to_cbor_bytes(),
        ),
        additionalUTxOs,
        context,
      ),
    [evaluateTxBytes]: evaluate,
  };
  return adapter;
};

const bytesEvaluator = (
  adapter: EvaluatorAdapter,
): BytesEvaluator | undefined =>
  (adapter as Partial<BuiltInEvaluatorAdapter>)[evaluateTxBytes];

const resolveEvaluatorAdapter = (
  config: TxBuilder.TxBuilderConfig,
  localUPLCEval: boolean,
  evaluator: EvaluatorAdapter | undefined,
): EvaluatorAdapter =>
  localUPLCEval === false
    ? makeProviderEvaluator(config.lucidConfig.provider)
    : (evaluator ?? config.lucidConfig.evaluator ?? makeAikenEvaluator());

const makeEvaluationContext = (
  config: TxBuilder.TxBuilderConfig,
): EvaluationContext => ({
  network: config.lucidConfig.network,
  slotConfig: config.lucidConfig.slotConfig,
  protocolParameters: config.lucidConfig.protocolParameters,
  costModels: config.lucidConfig.costModels,
});

const evaluatorCauseMessage = (error: unknown): string => {
  if (isError(error)) return error.message;
  const serialized = JSON.stringify(error);
  return typeof serialized === "string"
    ? serialized.replace(/\\n\s*/g, " ").trim()
    : String(error);
};

const wrapEvaluatorCause = (
  error: unknown,
  evaluator: string,
): EvaluatorError =>
  error instanceof EvaluatorError
    ? error
    : evaluatorError(
        evaluatorCauseMessage(error) || "Evaluator failed",
        evaluator,
        error,
      );

const evaluateTransaction = (
  config: TxBuilder.TxBuilderConfig,
  tx: CML.Transaction,
  walletInputs: UTxO[],
  localUPLCEval: boolean,
  evaluator: EvaluatorAdapter | undefined,
): Effect.Effect<void, TxBuilderError | EvaluatorError> =>
  Effect.gen(function* () {
    const adapter = resolveEvaluatorAdapter(config, localUPLCEval, evaluator);
    const name = evaluatorName(adapter);
    const normalization = yield* Effect.try({
      try: () =>
        normalizeGovernanceRedeemerIndices(
          tx,
          config.governanceVoteWitnessKeys,
          config.governanceProposalWitnessIndices,
        ),
      catch: (error) => wrapEvaluatorCause(error, name),
    });
    const normalized = normalization.transaction;
    const zeroed = setRedeemerstoZero(normalized);
    // Each step may return its input unchanged; `tx` belongs to the caller.
    const releaseCopies = (...copies: CML.Transaction[]) =>
      freeCML(...copies.filter((copy) => copy !== tx));
    const txEvaluation = yield* refreshScriptDataHash(zeroed, config).pipe(
      Effect.tapError(() =>
        Effect.sync(() => releaseCopies(normalized, zeroed)),
      ),
    );
    const release = () => releaseCopies(normalized, zeroed, txEvaluation);
    const expectedKeys = withCMLScope((own) => {
      const redeemers = own(own(txEvaluation.witness_set()).redeemers());
      return redeemers ? expectedRedeemerKeySet(redeemers) : undefined;
    });
    if (!expectedKeys) {
      release();
      return;
    }
    const txUtxos = yield* resolveEvaluationUTxOs(
      txEvaluation,
      walletInputs,
      config,
    ).pipe(Effect.tapError(() => Effect.sync(release)));
    const context = makeEvaluationContext(config);
    const evaluateBytes = bytesEvaluator(adapter);
    let run: () => Promise<EvalRedeemer[]>;
    if (evaluateBytes) {
      const txBytes = txEvaluation.to_cbor_bytes();
      run = () => evaluateBytes(txBytes, txUtxos, context);
    } else {
      const txHex = txEvaluation.to_cbor_hex();
      run = () =>
        adapter.evaluate({ tx: txHex, additionalUTxOs: txUtxos, context });
    }
    release();
    const evalRedeemers = yield* Effect.tryPromise({
      try: run,
      catch: (error) => wrapEvaluatorCause(error, name),
    });

    yield* Effect.try({
      try: () =>
        applyEvaluationResult(
          evalRedeemers,
          config.txBuilder,
          expectedKeys,
          name,
          normalization.builderKeyByLedgerKey,
        ),
      catch: (error) => wrapEvaluatorCause(error, name),
    });
  });

const calculateMinLovelace = (
  coinsPerUtxoByte: bigint,
  multiAssets?: Assets,
  changeAddress?: string,
): bigint => {
  const dummyAddress =
    "addr_test1qrngfyc452vy4twdrepdjc50d4kvqutgt0hs9w6j2qhcdjfx0gpv7rsrjtxv97rplyz3ymyaqdwqa635zrcdena94ljs0xy950";
  return withCMLScope((own) => {
    const address = own(
      CML.Address.from_bech32(changeAddress ? changeAddress : dummyAddress),
    );
    const multiAsset = multiAssets
      ? own(own(assetsToValue(multiAssets)).multi_asset())
      : own(CML.MultiAsset.new());
    const amountBuilder = own(
      own(own(CML.TransactionOutputBuilder.new()).with_address(address)).next(),
    );
    const result = own(
      own(
        amountBuilder.with_asset_and_min_required_coin(
          multiAsset,
          coinsPerUtxoByte,
        ),
      ).build(),
    );
    return own(own(result.output()).amount()).coin();
  });
};

const deriveInputsFromTransaction = (tx: CML.Transaction): UTxO[] =>
  withCMLScope((own) => {
    const body = own(tx.body());
    const outputs = own(body.outputs());
    const txHash = own(CML.hash_transaction(body)).to_hex();
    const utxos: UTxO[] = [];
    for (let index = 0; index < outputs.len(); index++) {
      const output = own(outputs.get(index));
      const utxo: UTxO = {
        txHash: txHash,
        outputIndex: index,
        ...coreToTxOutput(output),
      };
      utxos.push(utxo);
    }
    return utxos;
  });

/**
 * Returns a new `Assets`
 *
 * Negates the amounts of all assets in the given record.
 */
const negateAssets = (assets: Assets): Assets =>
  Record.map(assets, (amount) => -amount);

/**
 * Returns a new Assets
 *
 * Sums the assets from an array of UTxO inputs.
 */
const sumAssetsFromInputs = (inputs: UTxO[]) =>
  _Array.isEmptyArray(inputs)
    ? {}
    : inputs
        .map((utxo) => utxo.assets)
        .reduce((acc, cur) => Record.union(acc, cur, _BigInt.sum));

const calculateExtraLovelace = (
  leftoverAssets: Assets,
  coinsPerUtxoByte: bigint,
): Option.Option<Assets> => {
  return pipe(leftoverAssets, (assets) => {
    const minLovelace = calculateMinLovelace(coinsPerUtxoByte, assets);
    const currentLovelace = assets["lovelace"] || 0n;
    return currentLovelace >= minLovelace
      ? Option.none()
      : Option.some({ lovelace: minLovelace - currentLovelace });
  });
};

/**
 * Performs coin selection to obtain the "requiredAssets" and then carries out
 * recursive coin selection to ensure that leftover assets (selectedAssets + externalAssets - requiredAssets)
 * have enough ADA to satisfy minimum ADA requirement for them to be sent as change output.
 * If "requiredAssets" is empty, it still checks for minimum ADA requirement of "externalAssets"
 * and does coin selection if required.
 * @param inputs
 * @param requiredAssets
 * @param coinsPerUtxoByte
 * @param externalAssets
 * @param error
 * @returns
 */
export const recursive = (
  inputs: UTxO[],
  requiredAssets: Assets,
  coinsPerUtxoByte: bigint,
  externalAssets: Assets = {},
  includeLeftoverLovelaceAsFee?: boolean,
  error?: TxBuilderError,
): Effect.Effect<CoinSelectionResult, TxBuilderError> =>
  Effect.gen(function* () {
    let selected: UTxO[] = [];
    error ??= completeTxError(
      `Your wallet does not have enough funds to cover the required assets: ${stringify(requiredAssets)}
      Or it contains UTxOs with reference scripts; which are excluded from coin selection.`,
    );
    if (!Record.isEmptyRecord(requiredAssets)) {
      selected = selectUTxOs(inputs, requiredAssets, true);
      if (_Array.isEmptyArray(selected)) yield* error;
    }

    const selectedAssets: Assets = sumAssetsFromInputs(selected);
    let availableAssets: Assets = pipe(
      selectedAssets,
      Record.union(requiredAssets, (self, that) => self - that),
      Record.union(externalAssets, _BigInt.sum),
    );

    let extraLovelace: Assets | undefined = pipe(
      calculateExtraLovelace(availableAssets, coinsPerUtxoByte),
      Option.getOrUndefined,
    );
    let remainingInputs = inputs;

    while (extraLovelace) {
      remainingInputs = excludeUTxOs(remainingInputs, selected);

      const extraSelected = selectUTxOs(remainingInputs, extraLovelace, true);
      if (_Array.isEmptyArray(extraSelected)) {
        if (includeLeftoverLovelaceAsFee)
          return { selected: [...selected], burnable: extraLovelace };
        yield* completeTxError(
          `Your wallet does not have enough funds to cover required minimum ADA for change output: ${stringify(extraLovelace)}
          Or it contains UTxOs with reference scripts; which are excluded from coin selection.`,
        );
      }
      const extraSelectedAssets: Assets = sumAssetsFromInputs(extraSelected);
      selected = [...selected, ...extraSelected];
      availableAssets = Record.union(
        availableAssets,
        extraSelectedAssets,
        _BigInt.sum,
      );

      extraLovelace = pipe(
        calculateExtraLovelace(availableAssets, coinsPerUtxoByte),
        Option.getOrUndefined,
      );
    }
    return { selected, burnable: { lovelace: 0n } };
  });
