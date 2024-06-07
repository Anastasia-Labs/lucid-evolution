import { Effect, pipe, Record, Array as _Array } from "effect";
import { Address, Assets, UTxO } from "@lucid-evolution/core-types";
import {
  ERROR_MESSAGE,
  TransactionError,
  TxBuilderError,
  TxBuilderErrorCause,
  makeRunTimeError,
} from "../../Errors.js";
import { CML } from "../../core.js";
import * as UPLC from "@lucid-evolution/uplc";
import * as TxBuilder from "../TxBuilder.js";
import * as TxSignBuilder from "../../tx-sign-builder/TxSignBuilder.js";
import {
  isEqualUTxO,
  selectUTxOs,
  sortUTxOs,
  utxoToCore,
  utxoToTransactionInput,
  utxoToTransactionOutput,
} from "@lucid-evolution/utils";
import { SLOT_CONFIG_NETWORK } from "@lucid-evolution/plutus";

export type CompleteOptions = {
  coinSelection?: boolean;
  changeAddress?: Address;
  localUPLCEval?: boolean; // replaces nativeUPLC
};

export const completeTxError = (cause: TxBuilderErrorCause, message?: string) =>
  new TxBuilderError({ cause, module: "Complete", message });

export const complete = (
  config: TxBuilder.TxBuilderConfig,
  options: CompleteOptions = { coinSelection: true },
): Effect.Effect<TxSignBuilder.TxSignBuilder, TransactionError> =>
  Effect.gen(function* () {
    yield* Effect.all(config.programs, { concurrency: "unbounded" });
    //NOTE: this should not be here, validation shuold be when making the tx builder
    const wallet = yield* pipe(
      Effect.fromNullable(config.lucidConfig.wallet),
      Effect.orElseFail(() =>
        completeTxError("MissingWallet", ERROR_MESSAGE.MISSING_WALLET),
      ),
    );
    //NOTE: this should not be here, validation shuold be when making the tx builderj
    const changeAddress = yield* Effect.promise(() => wallet.address());
    //NOTE: this should not be here, validation shuold be when making the tx builderj
    const walletInputs = yield* pipe(
      Effect.tryPromise({
        try: () => wallet.getUtxos(),
        catch: (error) => completeTxError("Provider", String(error)),
      }),
    );

    // Set collateral input if there are script executions
    if (config.scripts.size > 0) {
      // TODO: add multiple input collateral based on:
      // max_collateral_inputs	3	The maximum number of collateral inputs allowed in a transaction.
      const collateralInput = yield* findCollateral(walletInputs);
      setCollateral(config, collateralInput);
      const availableInputs = _Array.differenceWith(isEqualUTxO)(
        remainingInputs,
        [collateralInput],
      );
      const inputsToAdd = options.coinSelection
        ? yield* coinSelection(config, availableInputs)
        : availableInputs;

      for (const utxo of inputsToAdd) {
        const input = CML.SingleInputBuilder.from_transaction_unspent_output(
          utxoToCore(utxo),
        ).payment_key();
        config.txBuilder.add_input(input);
      }
    } else {
      //Remove collected inputs from utxos at wallet
      const availableInputs = _Array.differenceWith(isEqualUTxO)(
        walletInputs,
        config.collectedInputs,
      );
      const inputsToAdd = options.coinSelection
        ? yield* coinSelection(config, availableInputs)
        : availableInputs;
      for (const utxo of inputsToAdd) {
        const input = CML.SingleInputBuilder.from_transaction_unspent_output(
          utxoToCore(utxo),
        ).payment_key();
        config.txBuilder.add_input(input);
      }
    }
    const txRedeemerBuilder = config.txBuilder.build_for_evaluation(
      0,
      CML.Address.from_bech32(changeAddress),
    );
    if (txRedeemerBuilder.draft_tx().witness_set().redeemers()) {
      applyUPLCEval(
        yield* evalTransaction(config, txRedeemerBuilder, walletInputs),
        config.txBuilder,
      );
    }
    config.txBuilder.add_change_if_needed(
      CML.Address.from_bech32(changeAddress),
      true,
    );
    const tx = config.txBuilder
      .build(
        CML.ChangeSelectionAlgo.Default,
        CML.Address.from_bech32(changeAddress),
      )
      .build_unchecked();

    return TxSignBuilder.makeTxSignBuilder(config.lucidConfig, tx);
  }).pipe(Effect.catchAllDefect(makeRunTimeError));

export const applyUPLCEval = (
  uplcEval: Uint8Array[],
  txbuilder: CML.TransactionBuilder,
) => {
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

const setCollateral = (config: TxBuilder.TxBuilderConfig, input: UTxO) => {
  config.txBuilder.add_collateral(
    CML.SingleInputBuilder.from_transaction_unspent_output(
      utxoToCore(input),
    ).payment_key(),
  );
  const collateralOutputBuilder =
    CML.TransactionOutputBuilder.new().with_address(
      CML.Address.from_bech32(input.address),
    );
  //TODO: calculate percentage
  //collateral_percent	150	The percentage of the txfee which must be provided as collateral when including non-native scripts.
  config.txBuilder.set_collateral_return(
    collateralOutputBuilder
      .next()
      .with_asset_and_min_required_coin(
        utxoToTransactionOutput(input).amount().multi_asset(),
        config.lucidConfig.protocolParameters.coinsPerUtxoByte,
      )
      .build()
      .output(),
  );
};

const findCollateral = (
  inputs: UTxO[],
): Effect.Effect<UTxO, TxBuilderError, never> =>
  pipe(
    Effect.fromNullable(
      sortUTxOs(inputs, "ascending").find(
        (value) => value.assets["lovelace"] >= 5_000_000n,
      ),
    ),
    Effect.orElseFail(() =>
      completeTxError(
        "MissingCollateral",
        "Your wallet does not have enough funds to cover the required collateral.",
      ),
    ),
  );

//coinSelection is seach inputs by largest first
const coinSelection = (
  config: TxBuilder.TxBuilderConfig,
  availableInputs: UTxO[],
): Effect.Effect<UTxO[], TxBuilderError> =>
  Effect.gen(function* () {
    // NOTE: This is a fee estimation. If the amount is not enough, it may require increasing the fee.
    const fee: Assets = { lovelace: config.txBuilder.min_fee(false) };
    // yield* Console.log("totalOutputAssets", config.totalOutputAssets);
    const requiredMinted = Record.map(config.mintedAssets, (amount) => -amount);
    // yield* Console.log("requiredMinted", requiredMinted);
    const collectedAssets = _Array.isEmptyArray(config.collectedInputs)
      ? {}
      : config.collectedInputs
          .map((utxo) => utxo.assets)
          .reduce((acc, cur) =>
            Record.union(acc, cur, (self, that) => self + that),
          );
    const collected = Record.map(collectedAssets, (amount) => -amount);
    // yield* Console.log("collected", collected);

    const requiredAssets = pipe(
      config.totalOutputAssets,
      Record.union(fee, (self, that) => self + that),
      Record.union(collected, (self, that) => self + that),
      Record.union(requiredMinted, (self, that) => self + that),
      Record.filter((amount) => amount > 0n),
    );

    // No UTxOs need to be selected if collected inputs are sufficient
    if (Record.isEmptyRecord(requiredAssets)) return [];

    // yield* Console.log("requiredAssets", requiredAssets);

    const selected = selectUTxOs(sortUTxOs(availableInputs), requiredAssets);
    if (_Array.isEmptyArray(selected))
      yield* completeTxError(
        "NotFound",
        `Your wallet does not have enough funds to cover the required assets. ${requiredAssets}`,
      );
    return selected;
  });

const evalTransaction = (
  config: TxBuilder.TxBuilderConfig,
  txRedeemerBuilder: CML.TxRedeemerBuilder,
  walletInputs: UTxO[],
): Effect.Effect<Uint8Array[], TxBuilderError> =>
  Effect.gen(function* () {
    //FIX: this returns undefined
    const txEvaluation = setRedeemerstoZero(txRedeemerBuilder.draft_tx())!;
    // console.log(txEvaluation?.to_json());
    const txUtxos = [
      ...walletInputs,
      ...config.collectedInputs,
      ...config.readInputs,
    ];
    const ins = txUtxos.map((utxo) => utxoToTransactionInput(utxo));
    const outs = txUtxos.map((utxo) => utxoToTransactionOutput(utxo));
    const slotConfig = SLOT_CONFIG_NETWORK[config.lucidConfig.network];
    const uplc_eval = yield* Effect.try({
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
        completeTxError("UPLCEval", JSON.stringify(error).replace(/\\n/g, "")),
    });
    return uplc_eval;
  });
