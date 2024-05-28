import { CML, makeReturn } from "../core.js";
import { LucidConfig } from "../lucid-evolution/LucidEvolution.js";
import { Effect } from "effect";
//TODO: move to commont utils
import { PrivateKey } from "@lucid-evolution/core-types";
import {
  TransactionSignError,
  TxSignerError,
  TxSignerErrorCause,
} from "../Errors.js";
import { TxSigned } from "./internal/CompleteTxSign.js";
import { completeTxSignBuilder } from "../tx-builder/internal/CompleteTxSigner.js";
import { Either } from "effect/Either";
import * as Sign from "./internal/Sign.js";

export const signError = (cause: TxSignerErrorCause, message?: string) =>
  new TxSignerError({ cause, module: "Sign", message });

export type TxSignBuilderConfig = {
  txComplete: CML.Transaction;
  witnessSetBuilder: CML.TransactionWitnessSetBuilder;
  programs: Effect.Effect<void, TransactionSignError, never>[];
  lucidConfig: LucidConfig;
  fee: number;
  exUnits: { cpu: number; mem: number } | null;
};

export type TxSignBuilder = {
  sign: {
    withWallet: () => TxSignBuilder;
    withPrivateKey: (privateKey: PrivateKey) => TxSignBuilder;
  };
  complete: () => Promise<TxSigned>;
  completeProgram: () => Effect.Effect<TxSigned, TransactionSignError, never>;
  completeSafe: () => Promise<Either<TxSigned, TransactionSignError>>;
};

export const makeTxSignBuilder = (
  lucidConfig: LucidConfig,
  tx: CML.Transaction,
) => {
  const redeemers = tx.witness_set().redeemers();
  const exUnits = { cpu: 0, mem: 0 };
  if (redeemers) {
    for (let i = 0; i < redeemers.as_arr_legacy_redeemer()!.len(); i++) {
      const redeemer = redeemers.as_arr_legacy_redeemer()!.get(i);
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
        const program = Sign.withWallet(config);
        config.programs.push(program);
        return txSignBuilder;
      },
      withPrivateKey: (privateKey: PrivateKey) => {
        const program = Sign.withPrivateKey(config, privateKey);
        config.programs.push(program);
        return txSignBuilder;
      },
    },
    complete: () => makeReturn(completeTxSignBuilder(config)).unsafeRun(),
    completeProgram: () => makeReturn(completeTxSignBuilder(config)).program(),
    completeSafe: () => makeReturn(completeTxSignBuilder(config)).safeRun(),
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
