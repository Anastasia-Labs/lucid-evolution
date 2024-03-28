import * as CML from "@dcspark/cardano-multiplatform-lib-nodejs";
import { LucidConfig } from "../lucid-evolution/LucidEvolution.js";
import { Effect } from "effect";
import { toCMLTransactionHash } from "../tx-builder/utils.js";
import { PrivateKey } from "@lucid-evolution/core-types";
import { RunTimeError, SignerError, makeRunTimeError } from "../Errors.js";
import { TxSigned, completeTxSign } from "./CompleteTxSign.js";
import { Either } from "effect/Either";
import { createCostModels } from "@lucid-evolution/utils";
import { TxComplete } from "lucid-cardano";
import {
  inputToArray,
  outputToArray,
  setRedeemertoZero,
} from "../tx-builder/CompleteTxBuilder.js";
import * as UPLC from "../tx-builder/pkg/uplc_tx.js";
import { SLOT_CONFIG_NETWORK } from "@lucid-evolution/plutus";

export type TxSignBuilderConfig = {
  txComplete: CML.Transaction;
  witnessSetBuilder: CML.TransactionWitnessSetBuilder;
  programs: Effect.Effect<void, Error, never>[];
  lucidConfig: LucidConfig;
  fee: number;
  exUnits: { cpu: number; mem: number } | null;
};

export type TxSignBuilder = {
  sign: {
    withWallet: () => TxSignBuilder;
    withPrivateKey: (privateKey: PrivateKey) => TxSignBuilder;
  };
  complete: () => {
    safeRun: () => Promise<Either<TxSigned, Error | RunTimeError>>;
    unSafeRun: () => Promise<TxSigned>;
    program: () => Effect.Effect<TxSigned, Error | RunTimeError, never>;
  };
};

export const makeTxSignBuilder = (
  lucidConfig: LucidConfig,
  tx: CML.Transaction
) => {
  const redeemers = tx.witness_set().redeemers();
  const exUnits = { cpu: 0, mem: 0 };
  if (redeemers) {
    for (let i = 0; i < redeemers.len(); i++) {
      const redeemer = redeemers.get(i);
      exUnits.cpu += parseInt(redeemer.ex_units().steps().toString());
      exUnits.mem += parseInt(redeemer.ex_units().mem().toString());
    }
  }
  const config: TxSignBuilderConfig = {
    txComplete: tx,
    witnessSetBuilder: CML.TransactionWitnessSetBuilder.new(),
    programs: [],
    lucidConfig: lucidConfig,
    fee: parseInt(tx.body().fee().toString()),
    exUnits: exUnits,
  };

  const txSignBuilder: TxSignBuilder = {
    sign: {
      withWallet: () => {
        const program = Effect.gen(function* ($) {
          const wallet = yield* $(
            Effect.fromNullable(config.lucidConfig.wallet)
          );
          const witnesses = yield* $(
            Effect.tryPromise({
              try: () => wallet.signTx(config.txComplete),
              catch: (_e) => new Error(),
            })
          );
          console.log("witness", witnesses.to_json());
          config.witnessSetBuilder.add_existing(witnesses);
        });
        config.programs.push(program);
        return txSignBuilder;
      },
      withPrivateKey: (privateKey: PrivateKey) => {
        const priv = CML.PrivateKey.from_bech32(privateKey);
        const witness = CML.make_vkey_witness(
          toCMLTransactionHash(config.txComplete.body()),
          priv
        );
        config.witnessSetBuilder.add_vkey(witness);
        return txSignBuilder;
      },
    },
    complete: () => {
      const program = Effect.gen(function* ($) {
        yield* $(Effect.all(config.programs, { concurrency: "unbounded" }));
        config.witnessSetBuilder.add_existing(config.txComplete.witness_set());
        const txWitnessSet = config.witnessSetBuilder.build();
        const protocolParam = yield* $(
          Effect.promise(() =>
            config.lucidConfig.provider.getProtocolParameters()
          )
        );
        const slotConfig = SLOT_CONFIG_NETWORK[config.lucidConfig.network];
        // console.log("protocolParam", protocolParam);
        const costmodel = createCostModels(protocolParam.costModels);
        // const tx_evaluation = config.txBuilder.build_for_evaluation(
        //   0,
        //   CML.Address.from_bech32(changeAddress)
        // );
        // console.log(txWitnessSet.to_json())
        // const scriptDataHash = CML.calc_script_data_hash_from_witness(txWitnessSet, costmodel)
        // console.log("scriptDataHash",scriptDataHash)
        // config.txComplete
        //   .body()
        //   .set_script_data_hash(
        //     CML.calc_script_data_hash_from_witness(txWitnessSet, costmodel)!
        //   );
        const signedTx = CML.Transaction.new(
          config.txComplete.body(),
          txWitnessSet,
          true,
          config.txComplete.auxiliary_data()
        );
        // if (txWitnessSet.redeemers()) {
        //   const t = setRedeemertoZero(signedTx);
        //   // console.log(t?.to_json());
        //   console.log(t!.body().inputs().get(0).to_json())
        //   console.log(t!.body().inputs().get(1).to_json())
        //   console.log(t!.body().inputs().get(2).to_json())
        //   // console.log("inputToArray",inputToArray(t!.body().inputs()));
        //   // console.log("outputToArray",outputToArray(t!.body().outputs()));
        //   const uplc_eval = UPLC.eval_phase_two_raw(
        //     t!.to_cbor_bytes(),
        //     inputToArray(t!.body().inputs()),
        //     outputToArray(t!.body().outputs()),
        //     costmodel.to_cbor_bytes(),
        //     protocolParam.maxTxExSteps,
        //     protocolParam.maxTxExMem,
        //     BigInt(slotConfig.zeroTime),
        //     BigInt(slotConfig.zeroSlot),
        //     slotConfig.slotLength
        //   );
        //   console.log(uplc_eval);
        // }
        return completeTxSign(config.lucidConfig, signedTx);
      }).pipe(Effect.catchAllDefect(makeRunTimeError));
      return {
        safeRun: () => Effect.runPromise(Effect.either(program)),
        unSafeRun: () => Effect.runPromise(program),
        program: () => program,
      };
    },
  };
  return txSignBuilder;
};

// /** Add an extra signature from a private key. */

// /** Sign the transaction and return the witnesses that were just made. */
// async partialSign(): Promise<TransactionWitnesses> {
//   const witnesses = await this.lucid.wallet.signTx(this.txComplete);
//   this.witnessSetBuilder.add_existing(witnesses);
//   return witnesses.to_cbor_hex();
// }

// /**
//  * Sign the transaction and return the witnesses that were just made.
//  * Add an extra signature from a private key.
//  */
// partialSignWithPrivateKey(privateKey: PrivateKey): TransactionWitnesses {
//   const priv = CML.PrivateKey.from_bech32(privateKey);
//   const witness = CML.make_vkey_witness(
//     toCMLTransactionHash(this.txComplete.body()),
//     priv,
//   );
//   this.witnessSetBuilder.add_vkey(witness);
//   const witnesses = CML.TransactionWitnessSetBuilder.new();
//   witnesses.add_vkey(witness);
//   return witnesses.build().to_cbor_hex();
// }

// /** Sign the transaction with the given witnesses. */
// assemble(witnesses: TransactionWitnesses[]): TxComplete {
//   witnesses.forEach((witness) => {
//     const witnessParsed = CML.TransactionWitnessSet.from_cbor_hex(witness);
//     this.witnessSetBuilder.add_existing(witnessParsed);
//   });
//   return this;
// }

// /** Return the transaction in Hex encoded Cbor. */
// toString(): Transaction {
//   return this.txComplete.to_cbor_hex();
// }

// /** Return the transaction hash. */
// toHash(): TxHash {
//   return toCMLTransactionHash(this.txComplete.body()).to_hex();
// }
