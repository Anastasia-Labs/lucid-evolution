import { Effect } from "effect";
import { Address, OutputData, UTxO } from "@lucid-evolution/core-types";
import { TxBuilderConfig } from "./types.js";
import {
  CollateralInputNotFound,
  GetUTxosCoreError,
  WalletAddressError,
  makeRunTimeError,
} from "../Errors.js";
import * as CML from "@dcspark/cardano-multiplatform-lib-nodejs";
import { makeTxSignBuilder } from "../tx-sign-builder/MakeTxSign.js";
import * as UPLC from "./pkg/uplc_tx.js";
import {
  createCostModels,
  utxoToCore,
  utxoToTransactionInput,
  utxoToTransactionOutput,
} from "@lucid-evolution/utils";
import { SLOT_CONFIG_NETWORK } from "@lucid-evolution/plutus";
import { makeReturn } from "./utils.js";

export const completeTxBuilder = (
  config: TxBuilderConfig,
  options?: {
    change?: { address?: Address; outputData?: OutputData };
    coinSelection?: boolean;
    nativeUplc?: boolean;
  },
) => {
  const program = Effect.gen(function* ($) {
    const wallet = yield* $(Effect.fromNullable(config.lucidConfig.wallet));

    yield* $(Effect.all(config.programs, { concurrency: "unbounded" }));

    const walletCoreUtxos = yield* $(
      Effect.tryPromise({
        try: () => wallet.getUtxosCore(),
        catch: (_e) => new GetUTxosCoreError(),
      }),
    );
    const walletUtxos = yield* $(
      Effect.tryPromise({
        try: () => wallet.getUtxos(),
        catch: (_e) => new GetUTxosCoreError(),
      }),
    );
    if (config.inputUTxOs?.find((value) => value.datum)) {
      const collateralInput: UTxO = yield* $(
        Effect.fromNullable(
          walletUtxos.find(
            (value) => value.assets["lovelace"] >= 5_000_000n,
            // &&
            // Object.keys(value.assets).length === 1,
          ),
        ).pipe(Effect.mapError(() => new CollateralInputNotFound())),
      );
      const collateralInputCore = utxoToCore(collateralInput);
      const collateralOut = utxoToTransactionOutput(collateralInput);

      config.txBuilder.add_collateral(
        CML.SingleInputBuilder.from_transaction_unspent_output(
          collateralInputCore,
        ).payment_key(),
      );
      const collateralOutputBuilder =
        CML.TransactionOutputBuilder.new().with_address(
          CML.Address.from_bech32(collateralInput.address),
        );
      config.txBuilder.set_collateral_return(
        collateralOutputBuilder
          .next()
          .with_asset_and_min_required_coin(
            collateralOut.amount().multi_asset(),
            config.lucidConfig.protocolParameters.coinsPerUtxoByte,
          )
          .build()
          .output(),
      );
      if (options?.coinSelection || options?.coinSelection === undefined) {
        const filteredUtxo = walletCoreUtxos.filter(
          (value) => value.to_cbor_hex() !== collateralInputCore.to_cbor_hex(),
        );
        for (const utxo of filteredUtxo) {
          const input =
            CML.SingleInputBuilder.from_transaction_unspent_output(
              utxo,
            ).payment_key();
          config.txBuilder.add_input(input);
        }
        config.txBuilder.select_utxos(
          CML.CoinSelectionStrategyCIP2.LargestFirst,
        );
      }
    } else {
      if (options?.coinSelection || options?.coinSelection === undefined) {
        for (const utxo of walletCoreUtxos) {
          const input =
            CML.SingleInputBuilder.from_transaction_unspent_output(
              utxo,
            ).payment_key();
          config.txBuilder.add_input(input);
        }
        config.txBuilder.select_utxos(
          CML.CoinSelectionStrategyCIP2.LargestFirst,
        );
      }
    }
    const changeAddress = yield* $(
      Effect.tryPromise({
        try: () => wallet.address(),
        catch: (_e) => new WalletAddressError(),
      }),
    );

    const slotConfig = SLOT_CONFIG_NETWORK[config.lucidConfig.network];
    const costmodel = createCostModels(
      config.lucidConfig.protocolParameters.costModels,
    );
    // config.txBuilder.add_change_if_needed(
    //   CML.Address.from_bech32(changeAddress),
    //   false
    // );
    const tx_evaluation = config.txBuilder.build_for_evaluation(
      0,
      CML.Address.from_bech32(changeAddress),
    );
    if (tx_evaluation.draft_tx().witness_set().redeemers()) {
      //FIX: this returns undefined
      const txEvaluation = setRedeemerstoZero(tx_evaluation.draft_tx());
      console.log(txEvaluation?.to_json());
      const txUtxos = [...walletUtxos, ...config.inputUTxOs!];
      const ins = txUtxos.map((utxo) => utxoToTransactionInput(utxo));
      const outs = txUtxos.map((utxo) => utxoToTransactionOutput(utxo));
      //FIX:  this can fail
      const uplc_eval = UPLC.eval_phase_two_raw(
        txEvaluation!.to_cbor_bytes(),
        ins.map((value) => value.to_cbor_bytes()),
        outs.map((value) => value.to_cbor_bytes()),
        costmodel.to_cbor_bytes(),
        config.lucidConfig.protocolParameters.maxTxExSteps,
        config.lucidConfig.protocolParameters.maxTxExMem,
        BigInt(slotConfig.zeroTime),
        BigInt(slotConfig.zeroSlot),
        slotConfig.slotLength,
      );
      applyUPLCEval(uplc_eval, config.txBuilder);
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
    console.log(tx.to_json());

    return makeTxSignBuilder(config.lucidConfig, tx);
  }).pipe(Effect.catchAllDefect(makeRunTimeError));
  return makeReturn(program);
};

export const applyUPLCEval = (
  uplcEval: Uint8Array[],
  txbuilder: CML.TransactionBuilder,
) => {
  for (const uplcByte of uplcEval) {
    const redeemer = CML.Redeemer.from_cbor_bytes(uplcByte);
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
    const redeemerList = CML.RedeemerList.new();
    for (let i = 0; i < redeemers.len(); i++) {
      const redeemer = redeemers.get(i);
      const dummyRedeemer = CML.Redeemer.new(
        redeemer.tag(),
        redeemer.index(),
        redeemer.data(),
        CML.ExUnits.new(0n, 0n),
      );
      redeemerList.add(dummyRedeemer);
    }
    const dummyWitnessSet = tx.witness_set();
    dummyWitnessSet.set_redeemers(redeemerList);
    return CML.Transaction.new(
      tx.body(),
      dummyWitnessSet,
      true,
      tx.auxiliary_data(),
    );
  }
};

export const inputToArray = (inputLust: CML.TransactionInputList) => {
  const array = [];
  for (let i = 0; i < inputLust.len(); i++) {
    console.log("input", i);
    const input = inputLust.get(i);
    array.push(input.to_cbor_bytes());
  }
  return array;
};
export const outputToArray = (outputList: CML.TransactionOutputList) => {
  const array = [];
  for (let i = 0; i < outputList.len(); i++) {
    const output = outputList.get(i);
    array.push(output.to_cbor_bytes());
  }
  return array;
};
