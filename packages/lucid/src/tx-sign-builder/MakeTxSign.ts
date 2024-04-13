import * as CML from "@dcspark/cardano-multiplatform-lib-nodejs";
import { LucidConfig } from "../lucid-evolution/LucidEvolution.js";
import { Effect } from "effect";
import { makeReturn } from "../tx-builder/utils.js";
import { PrivateKey } from "@lucid-evolution/core-types";
import {
  NotFoundError,
  TransactionSignError,
  WalletError,
  makeRunTimeError,
} from "../Errors.js";
import { TxSigned, completeTxSign } from "./CompleteTxSign.js";
import { Either } from "effect/Either";

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
  complete: () => {
    safeRun: () => Promise<Either<TxSigned, TransactionSignError>>;
    unsafeRun: () => Promise<TxSigned>;
    program: () => Effect.Effect<TxSigned, TransactionSignError, never>;
  };
};

export const makeTxSignBuilder = (
  lucidConfig: LucidConfig,
  tx: CML.Transaction,
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
            Effect.fromNullable(config.lucidConfig.wallet),
            Effect.orElseFail(
              () => new NotFoundError({ message: "wallet must be set" }),
            ),
          );
          const witnesses = yield* $(
            Effect.tryPromise({
              try: () => wallet.signTx(config.txComplete),
              catch: (e) => new WalletError({ message: String(e) }),
            }),
          );
          // console.log("witness", witnesses.to_json());
          config.witnessSetBuilder.add_existing(witnesses);
        });
        config.programs.push(program);
        return txSignBuilder;
      },
      withPrivateKey: (privateKey: PrivateKey) => {
        const priv = CML.PrivateKey.from_bech32(privateKey);
        const witness = CML.make_vkey_witness(
          CML.hash_transaction(config.txComplete.body()),
          priv,
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
        const signedTx = CML.Transaction.new(
          config.txComplete.body(),
          txWitnessSet,
          true,
          config.txComplete.auxiliary_data(),
        );
        const wallet = yield* $(
          Effect.fromNullable(config.lucidConfig.wallet),
          Effect.orElseFail(
            () => new NotFoundError({ message: "wallet must be set" }),
          ),
        );
        return completeTxSign(wallet, signedTx);
      }).pipe(Effect.catchAllDefect(makeRunTimeError));
      return makeReturn(program);
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
