import {
  Effect,
  pipe,
  Record,
  Array as _Array,
  BigInt as _BigInt,
  Tuple,
  Option,
} from "effect";
import { Address, Assets, UTxO, Wallet } from "@lucid-evolution/core-types";
import {
  ERROR_MESSAGE,
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
  utxoToTransactionInput,
  utxoToTransactionOutput,
} from "@lucid-evolution/utils";
import { SLOT_CONFIG_NETWORK } from "@lucid-evolution/plutus";
import { collectFromUTxO } from "./Collect.js";
import { fromHex } from "@lucid-evolution/core-utils";

export type CompleteOptions = {
  coinSelection?: boolean;
  changeAddress?: Address;
  localUPLCEval?: boolean; // replaces nativeUPLC
};

export const completeTxError = (cause: unknown) =>
  new TxBuilderError({ cause: `{ Complete: ${cause} }` });

type WalletInfo = {
  wallet: Wallet;
  address: string;
  inputs: UTxO[];
};

const getWalletInfo = (
  config: TxBuilder.TxBuilderConfig,
): Effect.Effect<WalletInfo, TxBuilderError, never> =>
  Effect.gen(function* () {
    const wallet: Wallet = yield* pipe(
      Effect.fromNullable(config.lucidConfig.wallet),
      Effect.orElseFail(() => completeTxError(ERROR_MESSAGE.MISSING_WALLET)),
    );
    const address: Address = yield* Effect.promise(() => wallet.address());
    const inputs: UTxO[] = yield* pipe(
      Effect.tryPromise({
        try: () => wallet.getUtxos(),
        catch: (error) => completeTxError(error),
      }),
    );
    const walletInputs = _Array.isEmptyArray(config.walletInputs)
      ? inputs
      : config.walletInputs;

    return {
      wallet,
      address,
      inputs: walletInputs,
    };
  });

export const complete = (
  config: TxBuilder.TxBuilderConfig,
  options: CompleteOptions = { coinSelection: true, localUPLCEval: true },
) =>
  Effect.gen(function* () {
    yield* Effect.all(config.programs, { concurrency: "unbounded" });
    const walletInfo = yield* getWalletInfo(config);
    const hasScriptExecutions: Boolean = config.scripts.size > 0;
    // Set collateral input if there are script executions
    if (hasScriptExecutions) {
      const collateralInput = yield* findCollateral(
        config.lucidConfig.protocolParameters.coinsPerUtxoByte,
        walletInfo.inputs,
      );
      setCollateral(config, collateralInput, walletInfo.address);
    }
    // First round of coin selection and UPLC evaluation. The fee estimation is lacking
    // the script execution costs as they aren't available yet.
    yield* selectionAndEvaluation(config, options, walletInfo, false);
    // Second round of coin selection by including script execution costs in fee estimation.
    // UPLC evaluation need to be performed again if new inputs are selected during coin selection.
    // Because increasing the inputs can increase the script execution budgets.
    if (hasScriptExecutions)
      yield* selectionAndEvaluation(config, options, walletInfo, true);

    config.txBuilder.add_change_if_needed(
      CML.Address.from_bech32(walletInfo.address),
      true,
    );
    const tx = yield* Effect.try({
      try: () =>
        config.txBuilder
          .build(
            CML.ChangeSelectionAlgo.Default,
            CML.Address.from_bech32(walletInfo.address),
          )
          .build_unchecked(),
      catch: (error) => completeTxError(error),
    });

    const derivedInputs = deriveInputsFromTransaction(tx);

    const derivedWalletInputs = derivedInputs.filter(
      (utxo) => utxo.address === walletInfo.address,
    );
    const updatedWalletInputs = pipe(
      _Array.differenceWith(isEqualUTxO)(
        walletInfo.inputs,
        config.consumedInputs,
      ),
      (availableWalletInputs) => [
        ...derivedWalletInputs,
        ...availableWalletInputs,
      ],
    );
    return Tuple.make(
      updatedWalletInputs,
      derivedInputs,
      TxSignBuilder.makeTxSignBuilder(config.lucidConfig, tx),
    );
  }).pipe(Effect.catchAllDefect((cause) => new RunTimeError({ cause })));

export const selectionAndEvaluation = (
  config: TxBuilder.TxBuilderConfig,
  options: CompleteOptions,
  walletInfo: WalletInfo,
  script_calculation: boolean,
): Effect.Effect<void, TransactionError, never> =>
  Effect.gen(function* () {
    const availableInputs = _Array.differenceWith(isEqualUTxO)(
      walletInfo.inputs,
      config.collectedInputs,
    );

    const inputsToAdd =
      options.coinSelection !== false
        ? yield* coinSelection(config, availableInputs, script_calculation)
        : [];

    // Skip UPLC evaluation for the second time if no new inputs are added
    if (_Array.isEmptyArray(inputsToAdd) && script_calculation) return;
    let estimatedFee = 0n;
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
      } else yield* completePartialPrograms(config);
    }

    // Build transaction to begin with UPLC evaluation
    const txRedeemerBuilder = yield* Effect.try({
      try: () =>
        config.txBuilder.build_for_evaluation(
          0,
          CML.Address.from_bech32(walletInfo.address),
        ),
      catch: (error) => completeTxError(error),
    });

    // TODO: fix the catch block to retain type of selectionAndEvaluation as Effect<void, TransactionError, never>
    // instead of Effect<void, TransactionError | undefined, never>
    //
    // const txRedeemerBuilder: CML.TxRedeemerBuilder = yield* Effect.try({
    //   try: () =>
    //     config.txBuilder.build_for_evaluation(
    //       0,
    //       CML.Address.from_bech32(walletInfo.address),
    //     ),
    //   catch: (error) => {
    //     // In case the "build_for_evaluation" fails due to addition of new redeemers leading to increased fees
    //     // and the selected utxo inputs being insufficient, we would need to perform coin selection again
    //     // before moving on to UPLC evaluation.
    //     if (
    //       error instanceof Error &&
    //       error.message == "UTxO Balance Insufficient"
    //     ) {
    //       Effect.runPromiseExit(
    //         selectionAndEvaluation(
    //           config,
    //           options,
    //           walletInfo,
    //           script_calculation,
    //         ),
    //       );
    //     }
    //     else
    //       return completeTxError(
    //       "NotFound",
    //       `CML Tx Redeemer Builder`,
    //     )
    //   }
    // });

    if (
      options.localUPLCEval !== false &&
      txRedeemerBuilder.draft_tx().witness_set().redeemers()
    ) {
      applyUPLCEval(
        yield* evalTransaction(config, txRedeemerBuilder, walletInfo.inputs),
        config.txBuilder,
      );
    }
  }).pipe(Effect.catchAllDefect((cause) => new RunTimeError({ cause })));

export const completePartialPrograms = (config: TxBuilder.TxBuilderConfig) =>
  Effect.gen(function* () {
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
          const program = collectFromUTxO(config, [input], false)(redeemer);
          newPrograms.push(program);
        }
      }
    }
    yield* Effect.all(newPrograms);
  });

export const applyUPLCEval = (
  uplcEval: Uint8Array[],
  txbuilder: CML.TransactionBuilder,
) => {
  const totalExUnits = { mem: 0n, steps: 0n };
  for (const bytes of uplcEval) {
    const redeemer = CML.LegacyRedeemer.from_cbor_bytes(bytes);
    const exUnits = CML.ExUnits.new(
      redeemer.ex_units().mem(),
      redeemer.ex_units().steps(),
    );
    txbuilder.set_exunits(
      CML.RedeemerWitnessKey.new(redeemer.tag(), redeemer.index()),
      exUnits,
    );
    totalExUnits.mem = totalExUnits.mem + redeemer.ex_units().mem();
    totalExUnits.steps = totalExUnits.steps + redeemer.ex_units().steps();
  }
};

export const setRedeemerstoZero = (tx: CML.Transaction) => {
  const redeemers = tx.witness_set().redeemers();
  if (redeemers) {
    const redeemerList = CML.LegacyRedeemerList.new();
    for (let i = 0; i < redeemers.as_arr_legacy_redeemer()!.len(); i++) {
      const redeemer = redeemers.as_arr_legacy_redeemer()!.get(i);
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
};

const setCollateral = (
  config: TxBuilder.TxBuilderConfig,
  collateralInputs: UTxO[],
  changeAddress: string,
) => {
  for (const utxo of collateralInputs) {
    const collateralInput =
      CML.SingleInputBuilder.from_transaction_unspent_output(
        utxoToCore(utxo),
      ).payment_key();
    config.txBuilder.add_collateral(collateralInput);
  }
  const returnassets = pipe(
    sumAssetsFromInputs(collateralInputs),
    Record.union({ lovelace: -5_000_000n }, _BigInt.sum),
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
};

const findCollateral = (
  coinsPerUtxoByte: bigint,
  inputs: UTxO[],
): Effect.Effect<UTxO[], TxBuilderError, never> =>
  Effect.gen(function* () {
    // NOTE: While the required collateral is 5 ADA, there may be instances where the UTXOs encountered do not contain enough ADA to be returned to the collateral return address.
    // For example:
    // A UTXO with 5.5 ADA will result in an error message such as `BabbageOutputTooSmallUTxO`, since only 0.5 ADA would be returned to the collateral return address.
    const collateralLovelace: Assets = { lovelace: 5_000_000n };
    const error = completeTxError(
      `Your wallet does not have enough funds to cover the required 5 ADA collateral. Or it contains UTxOs with reference scripts; which
      are excluded from collateral selection.`,
    );
    const selected = yield* recursive(
      sortUTxOs(inputs),
      collateralLovelace,
      coinsPerUtxoByte,
      undefined,
      error,
    );

    if (selected.length > 3)
      yield* completeTxError(
        `Selected ${selected.length} inputs as collateral, but max collateral inputs is 3 to cover the 5 ADA collateral ${stringify(selected)}`,
      );
    return selected;
  });

const coinSelection = (
  config: TxBuilder.TxBuilderConfig,
  availableInputs: UTxO[],
  script_calculation: boolean,
): Effect.Effect<UTxO[], TxBuilderError> =>
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
    const selected = yield* recursive(
      sortUTxOs(availableInputs),
      requiredAssets,
      config.lucidConfig.protocolParameters.coinsPerUtxoByte,
      notRequiredAssets,
    );
    return selected;
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

    if (
      (customMinFee !== undefined && customMinFee > minFee) ||
      refScriptFee > 0n
    ) {
      estimatedFee = customMinFee
        ? customMinFee > estimatedFee
          ? customMinFee
          : estimatedFee
        : estimatedFee;

      config.txBuilder.set_fee(estimatedFee);
    }
    return estimatedFee;
  });

const evalTransaction = (
  config: TxBuilder.TxBuilderConfig,
  txRedeemerBuilder: CML.TxRedeemerBuilder,
  walletInputs: UTxO[],
): Effect.Effect<Uint8Array[], TxBuilderError> =>
  Effect.gen(function* () {
    //FIX: this returns undefined
    const txEvaluation = setRedeemerstoZero(txRedeemerBuilder.draft_tx())!;
    const txUtxos = [
      ...walletInputs,
      ...config.collectedInputs,
      ...config.readInputs,
    ];
    const ins = txUtxos.map((utxo) => utxoToTransactionInput(utxo));
    const outs = txUtxos.map((utxo) => utxoToTransactionOutput(utxo));
    const slotConfig = SLOT_CONFIG_NETWORK[config.lucidConfig.network];
    const uplc_eval: Uint8Array[] = yield* Effect.try({
      try: () =>
        UPLC.eval_phase_two_raw(
          txEvaluation.to_cbor_bytes(),
          ins.map((value) => value.to_cbor_bytes()),
          outs.map((value) => value.to_cbor_bytes()),
          config.lucidConfig.costModels.to_cbor_bytes(),
          config.lucidConfig.protocolParameters.maxTxExSteps,
          config.lucidConfig.protocolParameters.maxTxExMem,
          BigInt(slotConfig.zeroTime),
          BigInt(slotConfig.zeroSlot),
          slotConfig.slotLength,
        ),
      catch: (error) =>
        //TODO: improve format
        completeTxError(JSON.stringify(error).replace(/\\n/g, "")),
    });
    return uplc_eval;
  });

const calculateMinLovelace = (
  coinsPerUtxoByte: bigint,
  multiAssets?: Assets,
  changeAddress?: string,
) => {
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
    const network = config.lucidConfig.network;
    if (network === "Preview" || network === "Preprod") {
      let totalScriptSize = 0;

      config.readInputs.forEach((utxo) => {
        if (utxo.scriptRef) {
          totalScriptSize = totalScriptSize + utxo.scriptRef.script.length / 2;
        }
      });
      config.collectedInputs.forEach((utxo) => {
        if (utxo.scriptRef) {
          totalScriptSize = totalScriptSize + utxo.scriptRef.script.length / 2;
        }
      });
      if (totalScriptSize === 0) return fee;

      const fees = [15.0, 18.0, 21.6, 25.92, 31.1, 37.32, 44.79, 53.75];

      let counter = 0;
      while (totalScriptSize > 0) {
        if (counter > fees.length - 1) {
          yield* completeTxError(
            "Total reference script size in a transaction cannot exceed 200,000 bytes.",
          );
        }

        if (totalScriptSize > 25000) fee = fee + BigInt(25000 * fees[counter]);
        else fee = fee + BigInt(totalScriptSize * fees[counter]);
        totalScriptSize = totalScriptSize - 25000;
        counter++;
      }
    }
    return fee;
  });

const deriveInputsFromTransaction = (tx: CML.Transaction) => {
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
  error?: TxBuilderError,
): Effect.Effect<UTxO[], TxBuilderError> =>
  Effect.gen(function* () {
    let selected: UTxO[] = [];
    error ??= completeTxError(
      `Your wallet does not have enough funds to cover the required assets: ${stringify(requiredAssets)}
      Or it contains UTxOs with reference scripts; which are excluded from coin selection.`,
    );
    if (!Record.isEmptyRecord(requiredAssets)) {
      selected = selectUTxOs(inputs, requiredAssets);
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

      const extraSelected = selectUTxOs(remainingInputs, extraLovelace);
      if (_Array.isEmptyArray(extraSelected)) {
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
    return selected;
  });
