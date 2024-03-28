import { Console, Effect } from "effect";
import { Address, OutputData } from "@lucid-evolution/core-types";
import { TxBuilderConfig } from "./types.js";
import {
  GetUTxosCoreError,
  WalletAddressError,
  makeRunTimeError,
} from "../Errors.js";
import * as CML from "@dcspark/cardano-multiplatform-lib-nodejs";
import { makeTxSignBuilder } from "../tx-sign-builder/MakeTxSign.js";
import * as UPLC from "./pkg/uplc_tx.js";
import {
  coresToUtxos,
  createCostModels,
  utxoToCore,
  utxoToTransactionInput,
  utxoToTransactionOutput,
  utxosToCores,
} from "@lucid-evolution/utils";
import { SLOT_CONFIG_NETWORK } from "@lucid-evolution/plutus";
import { promise } from "effect/Effect";
import { M } from "lucid-cardano";

export const completeTxBuilder = (
  config: TxBuilderConfig,
  options?: {
    change?: { address?: Address; outputData?: OutputData };
    coinSelection?: boolean;
    nativeUplc?: boolean;
  }
) => {
  const program = Effect.gen(function* ($) {
    const wallet = yield* $(Effect.fromNullable(config.lucidConfig.wallet));
    // if (
    //   [
    //     options?.change?.outputData?.hash,
    //     options?.change?.outputData?.asHash,
    //     options?.change?.outputData?.inline,
    //   ].filter((b) => b)
    //     .length > 1
    // ) {
    //   throw new Error(
    //     "Not allowed to set hash, asHash and inline at the same time.",
    //   );
    // }

    // let task = this.tasks.shift();
    // while (task) {
    //   await task(this);
    //   task = this.tasks.shift();
    // }
    yield* $(Effect.all(config.programs, { concurrency: "unbounded" }));

    const utxos = yield* $(
      Effect.tryPromise({
        try: () => wallet.getUtxosCore(),
        catch: (_e) => new GetUTxosCoreError(),
      })
    );
    const walletUtxos = yield* $(
      Effect.tryPromise({
        try: () => wallet.getUtxos(),
        catch: (_e) => new GetUTxosCoreError(),
      })
    );
    //NOTE: this may fail add error message
    const collateral = walletUtxos.find(
      (value) =>
        value.assets["lovelace"] > 5_000_000n &&
        Object.keys(value.assets).length === 1
    );
    config.txBuilder.add_collateral(
      CML.SingleInputBuilder.from_transaction_unspent_output(
        utxoToCore(collateral!)
      ).payment_key()
    );
    // const collateral_builder = CML.TransactionOutputBuilder.new();
    // collateral_builder.with_address(
    //   CML.Address.from_bech32(collateral!.address)
    // );
    // collateral_builder
    //   .next()
    //   .with_value(
    //     CML.Value.new(collateral!.assets["lovelace"], CML.MultiAsset.new())
    //   );
    // config.txBuilder.set_collateral_return(
    //   utxoToTransactionOutput(collateral!)
    // );
    // lucidUtxo.map((value)=> config.inputUTxOs?.push(value))

    // const changeAddress: C.Address = addressFromWithNetworkCheck(
    //   options?.change?.address || (await this.lucid.wallet.address()),
    //   this.lucid,
    // );
    const changeAddress = yield* $(
      Effect.tryPromise({
        try: () => wallet.address(),
        catch: (_e) => new WalletAddressError(),
      })
    );

    if (options?.coinSelection || options?.coinSelection === undefined) {
      for (const utxo of utxos) {
        const input =
          CML.SingleInputBuilder.from_transaction_unspent_output(
            utxo
          ).payment_key();
        config.txBuilder.add_input(input);
      }
      config.txBuilder.select_utxos(CML.CoinSelectionStrategyCIP2.LargestFirst);
      // config.txBuilder.add_inputs_from(
      //   utxos,
      //   changeAddress,
      //   Uint32Array.from([
      //     200, // weight ideal > 100 inputs
      //     1000, // weight ideal < 100 inputs
      //     1500, // weight assets if plutus
      //     800, // weight assets if not plutus
      //     800, // weight distance if not plutus
      //     5000, // weight utxos
      //   ])
      // );
    }
    // yield* $(
    //   Console.log(
    //     "gettting total output",
    //     config.txBuilder.get_total_output().to_json()
    //   )
    // );

    // this.txBuilder.balance(
    //   changeAddress,
    //   (() => {
    //     if (options?.change?.outputData?.hash) {
    //       return C.Datum.new_data_hash(
    //         C.DataHash.from_hex(
    //           options.change.outputData.hash,
    //         ),
    //       );
    //     } else if (options?.change?.outputData?.asHash) {
    //       this.txBuilder.add_plutus_data(
    //         C.PlutusData.from_bytes(fromHex(options.change.outputData.asHash)),
    //       );
    //       return C.Datum.new_data_hash(
    //         C.hash_plutus_data(
    //           C.PlutusData.from_bytes(
    //             fromHex(options.change.outputData.asHash),
    //           ),
    //         ),
    //       );
    //     } else if (options?.change?.outputData?.inline) {
    //       return C.Datum.new_data(
    //         C.Data.new(
    //           C.PlutusData.from_bytes(
    //             fromHex(options.change.outputData.inline),
    //           ),
    //         ),
    //       );
    //     } else {
    //       return undefined;
    //     }
    //   })(),
    // );

    // const utxoSet = this.inputUTxOs ??
    //   coresToUtxos(await this.lucid.wallet.getUtxosCore());
    // return new TxComplete(
    //   this.lucid,
    //   await this.txBuilder.construct(
    //     utxos,
    //     changeAddress,
    //     options?.nativeUplc === undefined ? true : options?.nativeUplc
    //   ),
    //   utxoSet
    // );
    // config.txBuilder.set_exunits()
    // config.txBuilder.set_exunits(,CML.ExUnitPrices.from_json(JSON.stringify({
    //   mem_price: {
    //     denominator: '721',
    //     numerator: '10000000',
    //   },
    //   step_price: {
    //     denominator: '577',
    //     numerator: '10000',
    //   },
    // })),
    const protocolParam = yield* $(
      Effect.promise(() => config.lucidConfig.provider.getProtocolParameters())
    );
    const slotConfig = SLOT_CONFIG_NETWORK[config.lucidConfig.network];
    // console.log("protocolParam", protocolParam);
    const costmodel = createCostModels(protocolParam.costModels);
    // config.txBuilder.add_change_if_needed(
    //   CML.Address.from_bech32(changeAddress),
    //   false
    // );
    // config.txBuilder.set_fee(config.txBuilder.min_fee(true));
    const tx_evaluation = config.txBuilder.build_for_evaluation(
      0,
      CML.Address.from_bech32(changeAddress)
    );
    if (tx_evaluation.draft_tx().witness_set().redeemers()) {
      const t = setRedeemertoZero(tx_evaluation.draft_tx());
      console.log(t?.to_json());
      const txUtxos = [...walletUtxos, ...config.inputUTxOs!];
      const ins = txUtxos.map((utxo) => utxoToTransactionInput(utxo));
      const outs = txUtxos.map((utxo) => utxoToTransactionOutput(utxo));
      const uplc_eval = UPLC.eval_phase_two_raw(
        t!.to_cbor_bytes(),
        ins.map((value) => value.to_cbor_bytes()),
        outs.map((value) => value.to_cbor_bytes()),
        costmodel.to_cbor_bytes(),
        protocolParam.maxTxExSteps,
        protocolParam.maxTxExMem,
        BigInt(slotConfig.zeroTime),
        BigInt(slotConfig.zeroSlot),
        slotConfig.slotLength
      );
      console.log(uplc_eval);
      applyUPLCEval(uplc_eval, config.txBuilder);
    }
    // console.log("min_fee",config.txBuilder.min_fee(true))
    // config.txBuilder.set_fee(config.txBuilder.min_fee(true))
    config.txBuilder.add_change_if_needed(CML.Address.from_bech32(changeAddress),true)

    const tx = config.txBuilder
      .build(
        CML.ChangeSelectionAlgo.Default,
        CML.Address.from_bech32(changeAddress)
      )
      .build_unchecked();
    // const tx = config.txBuilder
    //   .build(
    //     CML.ChangeSelectionAlgo.Default,
    //     CML.Address.from_bech32(changeAddress)
    //   )
    //   .build_unchecked();
    console.log(tx.to_json());

    return makeTxSignBuilder(config.lucidConfig, tx);
  }).pipe(Effect.catchAllDefect(makeRunTimeError));
  return {
    unsafeRun: () => Effect.runPromise(program),
    safeRun: () => Effect.runPromise(Effect.either(program)),
    program: () => program,
  };
};

export const applyUPLCEval = (
  uplcEval: Uint8Array[],
  txbuilder: CML.TransactionBuilder
) => {
  for (const uplcByte of uplcEval) {
    const redeemer = CML.Redeemer.from_cbor_bytes(uplcByte);
    const exUnits = CML.ExUnits.new(
      redeemer.ex_units().mem(),
      redeemer.ex_units().steps()
    );
    txbuilder.set_exunits(
      CML.RedeemerWitnessKey.new(redeemer.tag(), redeemer.index()),
      exUnits
    );
  }
};

export const setRedeemertoZero = (tx: CML.Transaction) => {
  const redeemers = tx.witness_set().redeemers();
  if (redeemers) {
    const redeemerList = CML.RedeemerList.new();
    console.log("redeemers.len()", redeemers.len());
    for (let i = 0; i < redeemers.len(); i++) {
      console.log("redeemer", i);
      const redeemer = redeemers.get(i);
      const dummyRedeemer = CML.Redeemer.new(
        redeemer.tag(),
        redeemer.index(),
        redeemer.data(),
        CML.ExUnits.new(0n, 0n)
      );
      redeemerList.add(dummyRedeemer);
    }
    const dummyWitnessSet = tx.witness_set();
    dummyWitnessSet.set_redeemers(redeemerList);
    return CML.Transaction.new(
      tx.body(),
      dummyWitnessSet,
      true,
      tx.auxiliary_data()
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
// {
//   let redeemers = draftTx.witness_set().redeemers();

//   if (redeemers) {
//     let newRedeemers = C.Redeemers.new();
//     for (let i = 0; i < redeemers!.len(); i++) {
//       let redeemer = redeemers.get(i);
//       let new_redeemer = C.Redeemer.new(
//         redeemer.tag(),
//         redeemer.index(),
//         redeemer.data(),
//         C.ExUnits.new(C.BigNum.zero(), C.BigNum.zero()),
//       );
//       newRedeemers.add(new_redeemer);
//     }
//     let new_witnesses = draftTx.witness_set();
//     new_witnesses.set_redeemers(newRedeemers);
//     draftTx = C.Transaction.new(
//       draftTx.body(),
//       new_witnesses,
//       draftTx.auxiliary_data(),
//     );
//   }

// tx CML.TransactionBuilderConfigBuilder
// tx_builder
// draft_tx_evaluation
// get redeemers -> redeemer
// apply redeemer -> draft_tx set exunit zero -> new draft_tx -> UPLC.eval_phase_two_raw(new_draftx)

// let mut program: Program<Name> = if cbor {
//   let cbor_hex = std::fs::read_to_string(&script).into_diagnostic()?;

//   let raw_cbor = hex::decode(cbor_hex.trim()).into_diagnostic()?;

//   let program = Program::<FakeNamedDeBruijn>::from_cbor(&raw_cbor, &mut Vec::new())
//       .into_diagnostic()?;

//   let program: Program<NamedDeBruijn> = program.into();

//   Program::<Name>::try_from(program).into_diagnostic()?
// } else if flat {
//   let bytes = std::fs::read(&script).into_diagnostic()?;

//   let program = Program::<FakeNamedDeBruijn>::from_flat(&bytes).into_diagnostic()?;

//   let program: Program<NamedDeBruijn> = program.into();

//   Program::<Name>::try_from(program).into_diagnostic()?
// } else {
//   let code = std::fs::read_to_string(&script).into_diagnostic()?;

//   parser::program(&code).into_diagnostic()?
// };

// for arg in args {
//   let term = parser::term(&arg).into_diagnostic()?;

//   program = program.apply_term(&term)
// }

// let budget = ExBudget::default();

// let program = Program::<NamedDeBruijn>::try_from(program).into_diagnostic()?;

// let mut eval_result = program.eval(budget);

// let cost = eval_result.cost();
