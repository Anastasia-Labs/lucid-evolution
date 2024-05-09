import { CML } from "../core.js";
import { LucidConfig } from "../lucid-evolution/LucidEvolution.js";
import { Effect } from "effect";
//TODO: move to commont utils
import { makeReturn } from "../core.js";
import { PrivateKey } from "@lucid-evolution/core-types";
import {
  ERROR_MESSAGE,
  TransactionSignError,
  TxSignerError,
  TxSignerErrorCause,
  makeRunTimeError,
} from "../Errors.js";
import { TxSigned, completeTxSign } from "./internal/CompleteTxSign.js";
import { Either } from "effect/Either";

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
      //TODO: move to internal
      withWallet: () => {
        const program = Effect.gen(function* ($) {
          const wallet = yield* $(
            Effect.fromNullable(config.lucidConfig.wallet),
            Effect.orElseFail(() =>
              signError("MissingWallet", ERROR_MESSAGE.MISSING_WALLET),
            ),
          );
          const witnesses = yield* $(
            Effect.tryPromise({
              try: () => wallet.signTx(config.txComplete),
              catch: (error) => signError("Signature", String(error)),
            }),
          );
          config.witnessSetBuilder.add_existing(witnesses);
        });
        config.programs.push(program);
        return txSignBuilder;
      },
      //TODO: move to internal
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
          Effect.orElseFail(() =>
            signError("MissingWallet", ERROR_MESSAGE.MISSING_WALLET),
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
