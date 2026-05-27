import {
  Effect,
  pipe,
  Record,
  Array as _Array,
  BigInt as _BigInt,
  Tuple,
  Option,
  Layer,
} from "effect";
import {
  Address,
  Assets,
  EvalRedeemer,
  EvaluationContext,
  EvaluatorAdapter,
  Provider,
  RedeemerTag,
  UTxO,
  Wallet,
} from "@lucid-evolution/core-types";
import {
  ERROR_MESSAGE,
  EvaluatorError,
  RunTimeError,
  TransactionError,
  TxBuilderError,
} from "../../Errors.js";
import { CML } from "../../core.js";
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
  utxoToTransactionInput,
  utxoToTransactionOutput,
  toCMLRedeemerTag,
} from "@lucid-evolution/utils";
import { SLOT_CONFIG_NETWORK } from "@lucid-evolution/plutus";
import { collectFromUTxO } from "./Collect.js";
import { TxConfig } from "./Service.js";
import { isError } from "effect/Predicate";
import {
  hasDelayedActions,
  makeReplayConfig,
  replayTxActions,
} from "../TxBuilder.js";
import {
  buildCanonicalRedeemerInfo,
  buildRedeemersFromCanonicalContext,
  cloneUTxOs,
  normalizeEvalUTxO,
  RedeemerBuilderCache,
  redeemerMapsEqual,
  resolveCanonicalInputs,
  resolveCanonicalReferenceInputs,
  transactionFixedPointFingerprint,
} from "./RedeemerContext.js";

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
};

type ExUnitSetter = Pick<CML.TransactionBuilder, "set_exunits">;

const TREASURY_DONATION_FEE_PADDING_BYTES = 32n;

const hasTreasuryDonation = (config: TxBuilder.TxBuilderConfig): boolean =>
  config.treasuryDonation !== undefined;

const treasuryDonationFeePadding = (
  config: TxBuilder.TxBuilderConfig,
): bigint =>
  hasTreasuryDonation(config)
    ? BigInt(config.lucidConfig.protocolParameters.minFeeA) *
      TREASURY_DONATION_FEE_PADDING_BYTES
    : 0n;

const feeWithTreasuryPadding = (
  config: TxBuilder.TxBuilderConfig,
  fee: bigint,
): bigint => fee + treasuryDonationFeePadding(config);

const balancingFee = (config: TxBuilder.TxBuilderConfig, fee: bigint): bigint =>
  feeWithTreasuryPadding(config, fee) +
  (config.treasuryDonation?.donation ?? 0n);

const makeLinearFee = (config: TxBuilder.TxBuilderConfig): CML.LinearFee => {
  const protocolParameters = config.lucidConfig.protocolParameters;
  return CML.LinearFee.new(
    BigInt(protocolParameters.minFeeA),
    BigInt(protocolParameters.minFeeB),
    BigInt(protocolParameters.minFeeRefScriptCostPerByte),
  );
};

const makeExUnitPrices = (
  config: TxBuilder.TxBuilderConfig,
): CML.ExUnitPrices => {
  const protocolParameters = config.lucidConfig.protocolParameters;
  return CML.ExUnitPrices.new(
    CML.Rational.new(
      BigInt(protocolParameters.priceMem * 100_000_000),
      100_000_000n,
    ),
    CML.Rational.new(
      BigInt(protocolParameters.priceStep * 100_000_000),
      100_000_000n,
    ),
  );
};

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
    const hasPlutusScriptExecutions: boolean = Array.from(
      config.scripts.values(),
    ).some((value) => value.type !== "Native");

    // First round of coin selection and UPLC evaluation. The fee estimation is lacking
    // the script execution costs as they aren't available yet.
    yield* selectionAndEvaluation(
      walletInputs,
      changeAddress,
      coinSelection,
      localUPLCEval,
      evaluator,
      includeLeftoverLovelaceAsFee,
      false,
      internalOptions.bootstrapExUnits === true,
    );
    // Second round of coin selection by including script execution costs in fee estimation.
    // UPLC evaluation need to be performed again if new inputs are selected during coin selection.
    // Because increasing the inputs can increase the script execution budgets.
    // Set collateral input if there are script executions
    if (hasPlutusScriptExecutions) {
      const minFee = config.txBuilder.min_fee(true);
      const refScriptFee = yield* calculateMinRefScriptFee(config);
      let estimatedFee = feeWithTreasuryPadding(config, minFee + refScriptFee);

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
      yield* selectionAndEvaluation(
        walletInputs,
        changeAddress,
        coinSelection,
        localUPLCEval,
        evaluator,
        includeLeftoverLovelaceAsFee,
        true,
        internalOptions.bootstrapExUnits === true,
      );
    }
    yield* estimateFee(config, true);
    config.txBuilder.add_change_if_needed(
      CML.Address.from_bech32(changeAddress),
      true,
    );
    const builtTransaction = yield* Effect.try({
      try: () =>
        config.txBuilder
          .build(
            CML.ChangeSelectionAlgo.Default,
            CML.Address.from_bech32(changeAddress),
          )
          .build_unchecked(),
      catch: (error) => completeTxError(error),
    });
    const transaction = yield* withTreasuryDonationFields(
      builtTransaction,
      config,
    );
    yield* assertTreasuryDonationFee(transaction, config);

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
      TxSignBuilder.makeTxSignBuilder(
        config.lucidConfig.wallet,
        canonical || internalOptions.forceCanonical
          ? CML.Transaction.from_cbor_bytes(
              transaction.to_canonical_cbor_bytes(),
            )
          : transaction,
      ),
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

    for (let attempt = 0; attempt < 8; attempt++) {
      const replayConfig = makeReplayConfig(sourceConfig);
      const result = yield* pipe(
        Effect.gen(function* () {
          yield* replayTxActions(sourceConfig.actions, currentRedeemers);
          const missingRedeemers = replayConfig.pendingRedeemers.some(
            (pending) => !currentRedeemers.has(pending.id),
          );
          return yield* completeCurrentConfig(
            { ...options, canonical: true },
            {
              forceCanonical: true,
              bootstrapExUnits: missingRedeemers,
              walletInputs: fixedWalletInputs,
            },
          );
        }),
        Effect.provide(Layer.succeed(TxConfig, { config: replayConfig })),
      );

      const tx = result[2].toTransaction();
      const allResolvedInputs = [
        ...replayConfig.walletInputs,
        ...replayConfig.collectedInputs,
        ...replayConfig.readInputs,
      ];
      const redeemerInfo = yield* buildCanonicalRedeemerInfo(
        tx,
        allResolvedInputs,
      );
      const nextRedeemers = yield* buildRedeemersFromCanonicalContext(
        redeemerInfo,
        replayConfig.pendingRedeemers,
        redeemerBuilderCache,
      );

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
      "Context-dependent redeemers did not converge after 8 attempts. Check for circular redeemer dependencies on the final transaction body, fees, or ex-units.",
    );
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

    // Skip UPLC evaluation for the second time if no new inputs are added
    let estimatedFee = 0n;
    if (_Array.isEmptyArray(inputsToAdd)) {
      if (script_calculation) {
        if (hasTreasuryDonation(config)) {
          yield* estimateFee(config, script_calculation);
        }
        return;
      }
      estimatedFee += burnable.lovelace;
    }
    if (_Array.isNonEmptyArray(inputsToAdd)) {
      for (const utxo of inputsToAdd) {
        const input = CML.SingleInputBuilder.from_transaction_unspent_output(
          utxoToCore(utxo),
        ).payment_key();
        config.txBuilder.add_input(input);
      }
      config.collectedInputs = [...config.collectedInputs, ...inputsToAdd];
      estimatedFee = yield* estimateFee(config, script_calculation);
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

    if (hasTreasuryDonation(config)) {
      yield* estimateFee(config, script_calculation);
    }

    // Build transaction to begin with UPLC evaluation
    const txRedeemerBuilder = yield* Effect.try({
      try: () =>
        config.txBuilder.build_for_evaluation(
          0,
          CML.Address.from_bech32(changeAddress),
        ),
      catch: (error) => completeTxError(error),
    });

    if (txRedeemerBuilder.draft_tx().witness_set().redeemers()) {
      if (bootstrapExUnits) {
        // Unresolved delayed redeemers prevent phase-two evaluation of the
        // draft, but fee and collateral selection still need script costs.
        applyBootstrapRedeemerExUnits(
          txRedeemerBuilder.draft_tx().witness_set().redeemers()!,
          config.txBuilder,
          config.lucidConfig.protocolParameters.maxTxExMem,
          config.lucidConfig.protocolParameters.maxTxExSteps,
        );
        return;
      }
      yield* evaluateTransaction(
        config,
        txRedeemerBuilder,
        walletInputs,
        localUPLCEval,
        evaluator,
      );
    }
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
    const redeemer = CML.LegacyRedeemer.from_cbor_bytes(bytes);
    evalRedeemers.push({
      ex_units: {
        mem: Number(redeemer.ex_units().mem()),
        steps: Number(redeemer.ex_units().steps()),
      },
      redeemer_index: Number(redeemer.index()),
      redeemer_tag: fromCMLRedeemerTag(redeemer.tag()),
    });
  }
  return evalRedeemers;
};

const evalRedeemerKey = (evalRedeemer: EvalRedeemer): string =>
  `${evalRedeemer.redeemer_tag}:${evalRedeemer.redeemer_index}`;

export const expectedRedeemerKeySet = (redeemers: CML.Redeemers): Set<string> =>
  new Set(
    redeemerWitnessKeys(redeemers).map(
      ({ tag, index }) => `${fromCMLRedeemerTag(tag)}:${index.toString()}`,
    ),
  );

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

  for (const evalRedeemer of evalRedeemerList) {
    validateEvalRedeemer(evalRedeemer, evaluator);
    const key = evalRedeemerKey(evalRedeemer);
    if (seen.has(key)) {
      throw evaluatorError(
        `Evaluator returned duplicate result for redeemer ${key}`,
        evaluator,
      );
    }
    seen.add(key);
    if (!expectedKeys.has(key)) {
      throw evaluatorError(
        `Evaluator returned result for unexpected redeemer ${key}`,
        evaluator,
      );
    }
    const exUnits = CML.ExUnits.new(
      BigInt(evalRedeemer.ex_units.mem),
      BigInt(evalRedeemer.ex_units.steps),
    );
    updates.push({
      key: CML.RedeemerWitnessKey.new(
        toCMLRedeemerTag(evalRedeemer.redeemer_tag),
        BigInt(evalRedeemer.redeemer_index),
      ),
      exUnits,
    });
  }

  for (const expectedKey of expectedKeys) {
    if (!seen.has(expectedKey)) {
      throw evaluatorError(
        `Evaluator did not return a result for redeemer ${expectedKey}`,
        evaluator,
      );
    }
  }

  for (const { key, exUnits } of updates) {
    txbuilder.set_exunits(key, exUnits);
  }
};

export const redeemerWitnessKeys = (redeemers: CML.Redeemers) => {
  const keys: Array<{
    key: CML.RedeemerWitnessKey;
    tag: CML.RedeemerTag;
    index: bigint;
  }> = [];
  const arrLegacyRedeemer = redeemers.as_arr_legacy_redeemer();
  if (arrLegacyRedeemer) {
    for (let i = 0; i < arrLegacyRedeemer.len(); i++) {
      const redeemer = arrLegacyRedeemer.get(i);
      keys.push({
        key: CML.RedeemerWitnessKey.from_redeemer(redeemer),
        tag: redeemer.tag(),
        index: redeemer.index(),
      });
    }
  }

  const mapRedeemerKeyToRedeemerVal =
    redeemers.as_map_redeemer_key_to_redeemer_val();
  if (mapRedeemerKeyToRedeemerVal) {
    const mapKeys = mapRedeemerKeyToRedeemerVal.keys();
    for (let i = 0; i < mapKeys.len(); i++) {
      const key = mapKeys.get(i);
      keys.push({
        key: CML.RedeemerWitnessKey.new(key.tag(), key.index()),
        tag: key.tag(),
        index: key.index(),
      });
    }
  }
  return keys;
};

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
  for (const [index, { key }] of keys.entries()) {
    const exUnits = budgets[index];
    txbuilder.set_exunits(key, CML.ExUnits.new(exUnits.mem(), exUnits.steps()));
  }
};

const copyOptionalBodyFields = (
  source: CML.TransactionBody,
  target: CML.TransactionBody,
) => {
  const ttl = source.ttl();
  if (ttl !== undefined) target.set_ttl(ttl);
  const certs = source.certs();
  if (certs !== undefined) target.set_certs(certs);
  const withdrawals = source.withdrawals();
  if (withdrawals !== undefined) target.set_withdrawals(withdrawals);
  const auxiliaryDataHash = source.auxiliary_data_hash();
  if (auxiliaryDataHash !== undefined)
    target.set_auxiliary_data_hash(auxiliaryDataHash);
  const validityIntervalStart = source.validity_interval_start();
  if (validityIntervalStart !== undefined)
    target.set_validity_interval_start(validityIntervalStart);
  const mint = source.mint();
  if (mint !== undefined) target.set_mint(mint);
  const scriptDataHash = source.script_data_hash();
  if (scriptDataHash !== undefined) target.set_script_data_hash(scriptDataHash);
  const collateralInputs = source.collateral_inputs();
  if (collateralInputs !== undefined)
    target.set_collateral_inputs(collateralInputs);
  const requiredSigners = source.required_signers();
  if (requiredSigners !== undefined)
    target.set_required_signers(requiredSigners);
  const networkId = source.network_id();
  if (networkId !== undefined) target.set_network_id(networkId);
  const collateralReturn = source.collateral_return();
  if (collateralReturn !== undefined)
    target.set_collateral_return(collateralReturn);
  const totalCollateral = source.total_collateral();
  if (totalCollateral !== undefined)
    target.set_total_collateral(totalCollateral);
  const referenceInputs = source.reference_inputs();
  if (referenceInputs !== undefined)
    target.set_reference_inputs(referenceInputs);
  const votingProcedures = source.voting_procedures();
  if (votingProcedures !== undefined)
    target.set_voting_procedures(votingProcedures);
  const proposalProcedures = source.proposal_procedures();
  if (proposalProcedures !== undefined)
    target.set_proposal_procedures(proposalProcedures);
};

const withTreasuryDonationFields = (
  tx: CML.Transaction,
  config: TxBuilder.TxBuilderConfig,
): Effect.Effect<CML.Transaction, TxBuilderError> =>
  Effect.gen(function* () {
    const treasuryDonation = config.treasuryDonation;
    if (!treasuryDonation) return tx;

    const sourceBody = tx.body();
    const fee = sourceBody.fee();
    if (fee < treasuryDonation.donation) {
      yield* completeTxError(
        `Treasury donation ${treasuryDonation.donation} exceeds the transaction fee field ${fee}; unable to rebalance donation transaction.`,
      );
    }

    const targetBody = CML.TransactionBody.new(
      sourceBody.inputs(),
      sourceBody.outputs(),
      fee - treasuryDonation.donation,
    );
    copyOptionalBodyFields(sourceBody, targetBody);
    targetBody.set_current_treasury_value(
      treasuryDonation.currentTreasuryValue,
    );
    targetBody.set_donation(treasuryDonation.donation);

    return CML.Transaction.new(
      targetBody,
      tx.witness_set(),
      tx.is_valid(),
      tx.auxiliary_data(),
    );
  });

const assertTreasuryDonationFee = (
  tx: CML.Transaction,
  config: TxBuilder.TxBuilderConfig,
): Effect.Effect<void, TxBuilderError> =>
  Effect.gen(function* () {
    if (!config.treasuryDonation) return;
    const requiredFee = CML.min_fee(
      tx,
      makeLinearFee(config),
      makeExUnitPrices(config),
      BigInt(calculateTotalRefScriptSize(config)),
    );
    const actualFee = tx.body().fee();
    if (actualFee < requiredFee) {
      yield* completeTxError(
        `Treasury donation transaction fee ${actualFee} is below required minimum fee ${requiredFee}. Try setting a minimum fee of ${requiredFee} lovelaces.`,
      );
    }
  });

export const setRedeemerstoZero = (tx: CML.Transaction): CML.Transaction => {
  const redeemers = tx.witness_set().redeemers();
  if (!redeemers) return tx;
  const arrLegacyRedeemer = redeemers.as_arr_legacy_redeemer();
  if (arrLegacyRedeemer) {
    const redeemerList = CML.LegacyRedeemerList.new();
    for (let i = 0; i < arrLegacyRedeemer.len(); i++) {
      const redeemer = arrLegacyRedeemer.get(i);
      const dummyRedeemer = CML.LegacyRedeemer.new(
        redeemer.tag(),
        redeemer.index(),
        redeemer.data(),
        CML.ExUnits.new(0n, 0n),
      );
      redeemerList.add(dummyRedeemer);
    }

    const dummyWitnessSet = tx.witness_set();
    dummyWitnessSet.set_redeemers(
      CML.Redeemers.new_arr_legacy_redeemer(redeemerList),
    );
    return CML.Transaction.new(
      tx.body(),
      dummyWitnessSet,
      true,
      tx.auxiliary_data(),
    );
  }
  const mapRedeemerKeyToRedeemerVal =
    redeemers.as_map_redeemer_key_to_redeemer_val();
  if (mapRedeemerKeyToRedeemerVal) {
    const dummyRedeemerMap = CML.MapRedeemerKeyToRedeemerVal.new();
    const keys = mapRedeemerKeyToRedeemerVal.keys();
    for (let i = 0; i < keys.len(); i++) {
      const key = keys.get(i);
      const value = mapRedeemerKeyToRedeemerVal.get(key)!;
      dummyRedeemerMap.insert(
        key,
        CML.RedeemerVal.new(value.data(), CML.ExUnits.new(0n, 0n)),
      );
    }
    const dummyWitnessSet = tx.witness_set();
    dummyWitnessSet.set_redeemers(
      CML.Redeemers.new_map_redeemer_key_to_redeemer_val(dummyRedeemerMap),
    );
    return CML.Transaction.new(
      tx.body(),
      dummyWitnessSet,
      true,
      tx.auxiliary_data(),
    );
  }
  return tx;
};

const applyCollateral = (
  setCollateral: bigint,
  collateralInputs: UTxO[],
  changeAddress: string,
) =>
  Effect.gen(function* () {
    const { config } = yield* TxConfig;
    for (const utxo of collateralInputs) {
      const collateralInput =
        CML.SingleInputBuilder.from_transaction_unspent_output(
          utxoToCore(utxo),
        ).payment_key();
      config.txBuilder.add_collateral(collateralInput);
    }
    const returnassets = pipe(
      sumAssetsFromInputs(collateralInputs),
      Record.union({ lovelace: -setCollateral }, _BigInt.sum),
    );

    const collateralOutputBuilder =
      CML.TransactionOutputBuilder.new().with_address(
        CML.Address.from_bech32(changeAddress),
      );
    config.txBuilder.set_collateral_return(
      collateralOutputBuilder
        .next()
        .with_value(assetsToValue(returnassets))
        .build()
        .output(),
    );
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
      lovelace: yield* estimateFee(config, script_calculation),
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
 * Estimate total transaction fee and set it in CML.TransactionBuilder if required
 * @param config
 * @param script_calculation
 * @returns estimated fee
 */
const estimateFee = (
  config: TxBuilder.TxBuilderConfig,
  script_calculation: boolean,
): Effect.Effect<bigint, TxBuilderError, never> =>
  Effect.gen(function* () {
    const minFee = config.txBuilder.min_fee(script_calculation);
    const refScriptFee = yield* calculateMinRefScriptFee(config);
    let estimatedFee = minFee + refScriptFee;
    const customMinFee = config.minFee;

    estimatedFee = customMinFee
      ? customMinFee > estimatedFee
        ? customMinFee
        : estimatedFee
      : estimatedFee;

    const feeForBalancing = balancingFee(config, estimatedFee);
    if (
      (customMinFee !== undefined && customMinFee > minFee) ||
      refScriptFee > 0n ||
      hasTreasuryDonation(config)
    ) {
      config.txBuilder.set_fee(feeForBalancing);
    }

    return feeForBalancing;
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
    const ins = additionalUTxOs.map((utxo) => utxoToTransactionInput(utxo));
    const outs = additionalUTxOs.map((utxo) => utxoToTransactionOutput(utxo));
    const uplcEval = UPLC.eval_phase_two_raw(
      CML.Transaction.from_cbor_hex(tx).to_cbor_bytes(),
      ins.map((value) => value.to_cbor_bytes()),
      outs.map((value) => value.to_cbor_bytes()),
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
  slotConfig: SLOT_CONFIG_NETWORK[config.lucidConfig.network],
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
  txRedeemerBuilder: CML.TxRedeemerBuilder,
  walletInputs: UTxO[],
  localUPLCEval: boolean,
  evaluator: EvaluatorAdapter | undefined,
): Effect.Effect<void, TxBuilderError | EvaluatorError> =>
  Effect.gen(function* () {
    const adapter = resolveEvaluatorAdapter(config, localUPLCEval, evaluator);
    const name = evaluatorName(adapter);
    const txEvaluation = setRedeemerstoZero(
      yield* withTreasuryDonationFields(txRedeemerBuilder.draft_tx(), config),
    )!;
    const redeemers = txEvaluation.witness_set().redeemers();
    if (!redeemers) return;
    const expectedKeys = expectedRedeemerKeySet(redeemers);
    const txUtxos = yield* resolveEvaluationUTxOs(
      txEvaluation,
      walletInputs,
      config,
    );
    const evalRedeemers = yield* Effect.tryPromise({
      try: () =>
        adapter.evaluate({
          tx: txEvaluation.to_cbor_hex(),
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
  return CML.TransactionOutputBuilder.new()
    .with_address(
      CML.Address.from_bech32(changeAddress ? changeAddress : dummyAddress),
    )
    .next()
    .with_asset_and_min_required_coin(
      multiAssets
        ? assetsToValue(multiAssets).multi_asset()
        : CML.MultiAsset.new(),
      coinsPerUtxoByte,
    )
    .build()
    .output()
    .amount()
    .coin();
};

const calculateMinRefScriptFee = (
  config: TxBuilder.TxBuilderConfig,
): Effect.Effect<bigint, TxBuilderError, never> =>
  Effect.gen(function* () {
    let fee = 0n;
    let totalScriptSize = calculateTotalRefScriptSize(config);
    if (totalScriptSize === 0) return fee;

    const fees = [15.0, 18.0, 21.6, 25.92, 31.1, 37.32, 44.79, 53.75];

    let counter = 0;
    while (totalScriptSize > 0) {
      if (counter > fees.length - 1) {
        yield* completeTxError(
          "Total reference script size in a transaction cannot exceed 200,000 bytes.",
        );
      }

      if (totalScriptSize > 25000)
        fee = fee + BigInt(Math.ceil(25000 * fees[counter]));
      else fee = fee + BigInt(Math.ceil(totalScriptSize * fees[counter]));
      totalScriptSize = totalScriptSize - 25000;
      counter++;
    }
    return fee;
  });

const calculateTotalRefScriptSize = (
  config: TxBuilder.TxBuilderConfig,
): number => {
  let totalScriptSize = 0;
  for (const utxo of config.readInputs) {
    if (utxo.scriptRef) {
      totalScriptSize = totalScriptSize + utxo.scriptRef.script.length / 2;
    }
  }
  for (const utxo of config.collectedInputs) {
    if (utxo.scriptRef) {
      totalScriptSize = totalScriptSize + utxo.scriptRef.script.length / 2;
    }
  }
  return totalScriptSize;
};

const deriveInputsFromTransaction = (tx: CML.Transaction): UTxO[] => {
  const outputs = tx.body().outputs();
  const txHash = CML.hash_transaction(tx.body()).to_hex();
  const utxos: UTxO[] = [];
  for (let index = 0; index < outputs.len(); index++) {
    const output = outputs.get(index);
    const utxo: UTxO = {
      txHash: txHash,
      outputIndex: index,
      ...coreToTxOutput(output),
    };
    utxos.push(utxo);
  }
  return utxos;
};

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
