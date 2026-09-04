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
  RedeemerPurpose,
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
  isEqualUTxO,
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
  CanonicalRedeemerInfo,
  cloneUTxOs,
  normalizeEvalUTxO,
  normalizeGovernanceRedeemerIndices,
  purposeToWitnessKey,
  proposalProcedureForRedeemerIndex,
  RedeemerBuilderCache,
  redeemerMapsEqual,
  resolveCanonicalInputs,
  resolveCanonicalReferenceInputs,
  transactionFixedPointFingerprint,
  voterForRedeemerIndex,
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

type InternalCompleteOptions = {
  bootstrapExUnits?: boolean;
  forceCanonical?: boolean;
  walletInputs?: UTxO[];
  knownRedeemerExUnits?: KnownRedeemerExUnits;
  redeemerInputFingerprint?: string;
};

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
    // the script execution costs as they aren't available yet.
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
    );
    // Second round of coin selection by including script execution costs in fee estimation.
    // UPLC evaluation need to be performed again if new inputs are selected during coin selection.
    // Because increasing the inputs can increase the script execution budgets.
    // Set collateral input if there are script executions
    if (hasPlutusScriptExecutions) {
      const estimatedFee = yield* estimateFee(config, true);

      const totalCollateral = BigInt(
        Math.ceil(
          Math.max(
            (config.lucidConfig.protocolParameters.collateralPercentage *
              Number(estimatedFee)) /
              100,
            Number(setCollateral),
          ),
        ),
      );
      const collateralInput = yield* findCollateral(
        config.lucidConfig.protocolParameters.coinsPerUtxoByte,
        totalCollateral,
        walletInputs,
      );
      yield* applyCollateral(totalCollateral, collateralInput, changeAddress);
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
        )) || evaluatedScriptBody;
    }
    yield* applyEffectiveFee(config, true, evaluatedScriptBody);
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
    freeCML(builtTransaction, transactionBeforeScriptDataHash);
    const transaction = yield* refreshScriptDataHash(
      normalizedTransaction,
      config,
    );
    if (transaction !== normalizedTransaction) normalizedTransaction.free();

    const derivedInputs = deriveInputsFromTransaction(transaction);

    const derivedWalletInputs = derivedInputs.filter(
      (utxo) => utxo.address === walletAddress,
    );
    const updatedWalletInputs = pipe(
      _Array.differenceWith(isEqualUTxO)(walletInputs, config.consumedInputs),
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

const completeStaticFromActions = (
  sourceConfig: TxBuilder.TxBuilderConfig,
  options: CompleteOptions,
) => {
  const replayConfig = makeReplayConfig(sourceConfig);
  return pipe(
    Effect.gen(function* () {
      yield* replayTxActions(sourceConfig.actions);
      return yield* completeCurrentConfig(options);
    }),
    Effect.provide(Layer.succeed(TxConfig, { config: replayConfig })),
    // The completed transaction is copied out of the builder; nothing keeps
    // the replay's builder alive.
    Effect.ensuring(Effect.sync(() => replayConfig.txBuilder.free())),
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
              knownRedeemerExUnits,
              redeemerInputFingerprint,
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
        bootstrapWalletInputs = replayConfig.collectedInputs.filter((utxo) =>
          fixedWalletInputs.some((walletInput) =>
            isEqualUTxO(walletInput, utxo),
          ),
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

const canonicalInputFingerprint = (tx: CML.Transaction): string =>
  withCMLScope((own) => {
    const canonical = own(
      CML.Transaction.from_cbor_bytes(tx.to_canonical_cbor_bytes()),
    );
    const inputs = own(own(canonical.body()).inputs());
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
      for (const utxo of inputs) {
        if (config.collectedInputs.some((input) => isEqualUTxO(input, utxo))) {
          continue;
        }
        withCMLScope((own) => {
          const core = own(utxoToCore(utxo));
          const builder = own(
            CML.SingleInputBuilder.from_transaction_unspent_output(core),
          );
          config.txBuilder.add_input(own(builder.payment_key()));
        });
        config.collectedInputs = [...config.collectedInputs, utxo];
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
    if (config.actions.length === 0)
      return yield* completeCurrentConfig(options);
    if (hasDelayedActions(config)) {
      return yield* completeDelayedFromActions(config, options);
    }
    return yield* completeStaticFromActions(config, options);
  });

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
) =>
  Effect.gen(function* () {
    const { config } = yield* TxConfig;
    const refScriptInputs = config.readInputs.filter(
      (input) => input.scriptRef,
    );
    const availableInputs = _Array.differenceWith(isEqualUTxO)(walletInputs, [
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

    let estimatedFee = yield* estimateFee(config, script_calculation);
    if (_Array.isEmptyArray(inputsToAdd)) {
      estimatedFee += burnable.lovelace;
    }
    if (_Array.isNonEmptyArray(inputsToAdd)) {
      yield* addWalletInputs(config, inputsToAdd);
      estimatedFee = yield* estimateFee(config, script_calculation);
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
      const remainingInputs = _Array.differenceWith(isEqualUTxO)(walletInputs, [
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
        estimatedFee = yield* estimateFee(config, true);
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

const voterByKey = (
  body: CML.TransactionBody,
  voterKey: string | undefined,
): CML.Voter | undefined => {
  if (!voterKey) return undefined;
  const voters = body.voting_procedures()?.keys();
  if (!voters) return undefined;
  for (let i = 0; i < voters.len(); i++) {
    const voter = voters.get(i);
    if (voter.to_canonical_cbor_hex() === voterKey) return voter;
  }
  return undefined;
};

const proposalByKey = (
  body: CML.TransactionBody,
  proposalKey: string | undefined,
): CML.ProposalProcedure | undefined => {
  if (!proposalKey) return undefined;
  const proposals = body.proposal_procedures();
  if (!proposals) return undefined;
  for (let i = 0; i < proposals.len(); i++) {
    const proposal = proposals.get(i);
    if (proposal.to_canonical_cbor_hex() === proposalKey) return proposal;
  }
  return undefined;
};

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

const scriptHashForPurpose = (
  purpose: RedeemerPurpose,
  tx: CML.Transaction,
  info: CanonicalRedeemerInfo,
): string | undefined => {
  switch (purpose.tag) {
    case "spend": {
      const input = info.inputs.find(
        (candidate) =>
          candidate.txHash === purpose.input.txHash &&
          candidate.outputIndex === purpose.input.outputIndex,
      );
      return input
        ? getAddressDetails(input.address).paymentCredential?.hash
        : undefined;
    }
    case "mint":
      return purpose.policyId;
    case "withdraw":
      return getAddressDetails(purpose.rewardAddress).stakeCredential?.hash;
    case "publish":
      return withCMLScope((own) => {
        const certificate = own(
          own(info.txBody.certs())?.get(Number(purpose.index)),
        );
        return certificate ? scriptHashFromCertificate(certificate) : undefined;
      });
    case "vote":
      return withCMLScope((own) => {
        const voter = own(
          voterByKey(info.txBody, purpose.voterKey) ??
            voterForRedeemerIndex(tx, purpose.index),
        );
        return own(voter?.script_hash())?.to_hex();
      });
    case "propose":
      return withCMLScope((own) => {
        const proposal = own(
          proposalByKey(info.txBody, purpose.proposalKey) ??
            proposalProcedureForRedeemerIndex(tx, purpose.index),
        );
        return own(own(proposal?.gov_action())?.script_hash())?.to_hex();
      });
  }
};

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

    const resolvedInputs = [
      ...config.walletInputs,
      ...config.collectedInputs,
      ...config.readInputs,
    ];
    const redeemerInfo = yield* buildCanonicalRedeemerInfo(tx, resolvedInputs);

    for (const purpose of redeemerInfo.redeemers) {
      const scriptHash = scriptHashForPurpose(purpose, tx, redeemerInfo);
      if (!scriptHash) {
        redeemerInfo.txBody.free();
        yield* completeTxError(
          `Unable to resolve script hash for ${purpose.tag}:${purpose.index} redeemer`,
        );
        continue;
      }
      const script = config.scripts.get(scriptHash);
      if (!script) {
        redeemerInfo.txBody.free();
        yield* completeTxError(
          `Unable to resolve script for ${purpose.tag} redeemer ${scriptHash}`,
        );
        continue;
      }
      const language = scriptTypeToLanguage(script.type);
      if (language !== undefined) languages.add(language);
    }
    redeemerInfo.txBody.free();

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

const applyCollateral = (
  setCollateral: bigint,
  collateralInputs: UTxO[],
  changeAddress: string,
) =>
  Effect.gen(function* () {
    const { config } = yield* TxConfig;
    for (const utxo of collateralInputs) {
      withCMLScope((own) => {
        const core = own(utxoToCore(utxo));
        const builder = own(
          CML.SingleInputBuilder.from_transaction_unspent_output(core),
        );
        config.txBuilder.add_collateral(own(builder.payment_key()));
      });
    }
    const returnassets = pipe(
      sumAssetsFromInputs(collateralInputs),
      Record.union({ lovelace: -setCollateral }, _BigInt.sum),
    );

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
  });

const findCollateral = (
  coinsPerUtxoByte: bigint,
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
    if (selected.length > 3)
      yield* completeTxError(
        `Selected ${selected.length} inputs as collateral, but max collateral inputs is 3 to cover the ${setCollateral} Lovelace collateral ${stringify(selected)}`,
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
    yield* applyEffectiveFee(config, script_calculation, forceExplicitFee);
    const candidate = yield* buildEvaluationDraft(config, changeAddress);
    const hasRedeemers = withCMLScope(
      (own) => own(own(candidate.witness_set()).redeemers()) !== undefined,
    );
    if (forceExplicitFee || !hasRedeemers) {
      return candidate;
    }
    candidate.free();
    yield* applyEffectiveFee(config, script_calculation, true);
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
    canonical.free();
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
    candidate.free();
    const transaction = normalization.transaction;
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

const evaluationFixedPointFingerprint = (tx: CML.Transaction): string => {
  const zeroed = setRedeemerstoZero(tx);
  try {
    return transactionFixedPointFingerprint(zeroed);
  } finally {
    if (zeroed !== tx) zeroed.free();
  }
};

const evaluateUntilStable = (
  config: TxBuilder.TxBuilderConfig,
  walletInputs: UTxO[],
  changeAddress: string,
  script_calculation: boolean,
  localUPLCEval: boolean,
  evaluator: EvaluatorAdapter | undefined,
  bootstrapExUnits: boolean,
  redeemerInputFingerprint?: string,
): Effect.Effect<
  boolean,
  TxBuilderError | EvaluatorError | RedeemerInputRefreshRequired
> =>
  Effect.gen(function* () {
    let previousFingerprint: string | undefined;
    let forceExplicitFee = config.minFee !== undefined;

    for (let attempt = 0; attempt < MAX_EVALUATION_ATTEMPTS; attempt++) {
      const candidate = yield* buildEvaluationCandidate(
        config,
        changeAddress,
        script_calculation,
        forceExplicitFee,
      );
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
      if (fingerprint === previousFingerprint) {
        candidate.free();
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

const makeDefaultAikenEvaluator = (): EvaluatorAdapter => ({
  name: "aiken",
  evaluate: async ({ tx, additionalUTxOs, context }) => {
    const { txBytes, inputBytes, outputBytes } = withCMLScope((own) => ({
      txBytes: own(CML.Transaction.from_cbor_hex(tx)).to_cbor_bytes(),
      inputBytes: additionalUTxOs.map((utxo) =>
        own(utxoToTransactionInput(utxo)).to_cbor_bytes(),
      ),
      outputBytes: additionalUTxOs.map((utxo) =>
        own(utxoToTransactionOutput(utxo)).to_cbor_bytes(),
      ),
    }));
    const uplcEval = UPLC.eval_phase_two_raw(
      txBytes,
      inputBytes,
      outputBytes,
      context.costModels.to_cbor_bytes(),
      context.protocolParameters.maxTxExSteps,
      context.protocolParameters.maxTxExMem,
      BigInt(context.slotConfig.zeroTime),
      BigInt(context.slotConfig.zeroSlot),
      context.slotConfig.slotLength,
    );
    return decodeLegacyRedeemers(uplcEval);
  },
});

const resolveEvaluatorAdapter = (
  config: TxBuilder.TxBuilderConfig,
  localUPLCEval: boolean,
  evaluator: EvaluatorAdapter | undefined,
): EvaluatorAdapter =>
  localUPLCEval === false
    ? makeProviderEvaluator(config.lucidConfig.provider)
    : (evaluator ??
      config.lucidConfig.evaluator ??
      makeDefaultAikenEvaluator());

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
    const txEvaluation = yield* refreshScriptDataHash(zeroed, config).pipe(
      Effect.tapError(() => Effect.sync(() => freeCML(normalized, zeroed))),
    );
    // Any of the three may be the same object; freeCML frees each one once.
    const release = () => freeCML(normalized, zeroed, txEvaluation);
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
    const txHex = txEvaluation.to_cbor_hex();
    release();
    const evalRedeemers = yield* Effect.tryPromise({
      try: () =>
        adapter.evaluate({
          tx: txHex,
          additionalUTxOs: txUtxos,
          context: makeEvaluationContext(config),
        }),
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
      remainingInputs = _Array.differenceWith(isEqualUTxO)(
        remainingInputs,
        selected,
      );

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
