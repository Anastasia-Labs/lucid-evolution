import { Effect, pipe, Record, Array as _Array, Tuple } from "effect";
import { Address, Assets, UTxO, Wallet } from "@lucid-evolution/core-types";
import {
  ERROR_MESSAGE,
  RunTimeError,
  TransactionError,
  TxBuilderError,
  TxBuilderErrorCause,
} from "../../Errors.js";
import { CML } from "../../core.js";
import * as UPLC from "@lucid-evolution/uplc";
import * as TxBuilder from "../TxBuilder.js";
import * as TxSignBuilder from "../../tx-sign-builder/TxSignBuilder.js";
import {
  assetsToValue,
  coresToTxOutputs,
  coreToTxOutput,
  coreToUtxo,
  isEqualUTxO,
  selectUTxOs,
  sortUTxOs,
  stringify,
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

type WalletInfo = {
  wallet: Wallet;
  address: string;
  inputs: UTxO[];
};

const getWalletInfo = (
  config: TxBuilder.TxBuilderConfig,
): Effect.Effect<WalletInfo, TxBuilderError, never> =>
  Effect.gen(function* () {
    const wallet = yield* pipe(
      Effect.fromNullable(config.lucidConfig.wallet),
      Effect.orElseFail(() =>
        completeTxError("MissingWallet", ERROR_MESSAGE.MISSING_WALLET),
      ),
    );
    const address = yield* Effect.promise(() => wallet.address());
    const inputs = yield* pipe(
      Effect.tryPromise({
        try: () => wallet.getUtxos(),
        catch: (error) => completeTxError("Provider", String(error)),
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
  options: CompleteOptions = { coinSelection: true },
) =>
  Effect.gen(function* () {
    yield* Effect.all(config.programs, { concurrency: "unbounded" });
    const walletInfo = yield* getWalletInfo(config);

    if (config.collectedInputs.find((value) => value.datum !== undefined)) {
      const availableInputs = _Array.differenceWith(isEqualUTxO)(
        walletInfo.inputs,
        config.collectedInputs,
      );
      const collateralInput = yield* findCollateral(availableInputs);
      setCollateral(config, collateralInput, walletInfo.address);
      const inputsToAdd = options.coinSelection
        ? yield* coinSelection(config, availableInputs)
        : availableInputs;
      for (const utxo of inputsToAdd) {
        const input = CML.SingleInputBuilder.from_transaction_unspent_output(
          utxoToCore(utxo),
        ).payment_key();
        config.txBuilder.add_input(input);
      }
      //NOTE: We need to keep track of all consumed inputs
      // this is just a patch we shuold find a better way to do this
      config.consumedInputs = [...config.collectedInputs, ...inputsToAdd];
    } else {
      const availableInputs = _Array.differenceWith(isEqualUTxO)(
        walletInfo.inputs,
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
      //NOTE: We need to keep track of all consumed inputs
      // this is just a patch we shuold find a better way to do this
      config.consumedInputs = [...config.collectedInputs, ...inputsToAdd];
    }
    const txRedeemerBuilder = config.txBuilder.build_for_evaluation(
      0,
      CML.Address.from_bech32(walletInfo.address),
    );
    if (txRedeemerBuilder.draft_tx().witness_set().redeemers()) {
      applyUPLCEval(
        yield* evalTransaction(config, txRedeemerBuilder, walletInfo.inputs),
        config.txBuilder,
      );
    }
    config.txBuilder.add_change_if_needed(
      CML.Address.from_bech32(walletInfo.address),
      true,
    );
    const tx = config.txBuilder
      .build(
        CML.ChangeSelectionAlgo.Default,
        CML.Address.from_bech32(walletInfo.address),
      )
      .build_unchecked();

    const derivedUTxOs = deriveUTxOsFromTransaction(tx);

    const derivedWalletUTxOs = derivedUTxOs.filter(
      (utxo) => utxo.address === walletInfo.address,
    );
    const newWalletInputs = pipe(
      _Array.differenceWith(isEqualUTxO)(
        walletInfo.inputs,
        config.consumedInputs,
      ),
      (utxos) => [...derivedWalletUTxOs, ...utxos],
    );

    return Tuple.make(
      newWalletInputs,
      derivedUTxOs,
      TxSignBuilder.makeTxSignBuilder(config.lucidConfig, tx),
    );
  }).pipe(
    Effect.catchAllDefect(
      (e) => new RunTimeError({ message: stringify(String(e)) }),
    ),
  );

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
    collateralInputs
      .map((utxo) => utxo.assets)
      .reduce((acc, cur) =>
        Record.union(acc, cur, (self, that) => self + that),
      ),
    Record.union({ lovelace: -5_000_000n }, (self, that) => self + that),
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
  inputs: UTxO[],
): Effect.Effect<UTxO[], TxBuilderError, never> =>
  Effect.gen(function* () {
    const selected = selectUTxOs(sortUTxOs(inputs), {
      lovelace: 5_000_000n,
    });
    if (_Array.isEmptyArray(selected))
      yield* completeTxError(
        "MissingCollateral",
        `Your wallet does not have enough funds to cover the required 5 ADA collateral.`,
      );
    if (selected.length > 3)
      yield* completeTxError(
        "MissingCollateral",
        `Selected ${selected.length} inputs as collateral, but max collateral inputs is 3 to cover the 5 ADA collateral`,
      );
    return selected;
  });

const coinSelection = (
  config: TxBuilder.TxBuilderConfig,
  availableInputs: UTxO[],
): Effect.Effect<UTxO[], TxBuilderError> =>
  Effect.gen(function* () {
    // NOTE: This is a fee estimation. If the amount is not enough, it may require increasing the fee.
    const fee: Assets = { lovelace: config.txBuilder.min_fee(false) };
    const minAdaChangeAddress = {
      lovelace: calculateMinLovelace(
        config.lucidConfig.protocolParameters.coinsPerUtxoByte,
      ),
    };
    const negatedMintedAssets = Record.map(
      config.mintedAssets,
      (amount) => -amount,
    );
    const collectedAssets = _Array.isEmptyArray(config.collectedInputs)
      ? {}
      : config.collectedInputs
          .map((utxo) => utxo.assets)
          .reduce((acc, cur) =>
            Record.union(acc, cur, (self, that) => self + that),
          );
    const negatedCollectedAssets = Record.map(
      collectedAssets,
      (amount) => -amount,
    );
    const requiredAssets = pipe(
      config.totalOutputAssets,
      Record.union(negatedCollectedAssets, (self, that) => self + that),
      Record.union(negatedMintedAssets, (self, that) => self + that),
      Record.filter((amount) => amount > 0n),
      Record.union(minAdaChangeAddress, (self, that) => self + that),
      Record.union(fee, (self, that) => self + that), //NOTE:  fee  be at the end so the wallet can pay for the tx
    );
    const selected = selectUTxOs(sortUTxOs(availableInputs), requiredAssets);
    if (_Array.isEmptyArray(selected))
      yield* completeTxError(
        "NotFound",
        `Your wallet does not have enough funds to cover the required assets. ${stringify(requiredAssets)}`,
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

const calculateMinLovelace = (
  coinsPerUtxoByte: bigint,
  changeAddress?: string,
) => {
  const dummyAddress =
    "addr_test1qrngfyc452vy4twdrepdjc50d4kvqutgt0hs9w6j2qhcdjfx0gpv7rsrjtxv97rplyz3ymyaqdwqa635zrcdena94ljs0xy950";
  return CML.TransactionOutputBuilder.new()
    .with_address(
      CML.Address.from_bech32(changeAddress ? changeAddress : dummyAddress),
    )
    .next()
    .with_asset_and_min_required_coin(CML.MultiAsset.new(), coinsPerUtxoByte)
    .build()
    .output()
    .amount()
    .coin();
};

const deriveUTxOsFromTransaction = (tx: CML.Transaction) => {
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

const getConsumedInputs = (tx: CML.Transaction) => {
  const inputs = tx.body().inputs();
};
