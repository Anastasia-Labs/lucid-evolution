import { Effect, pipe } from "effect";
import { ERROR_MESSAGE, TxSignerError } from "../../Errors.js";
import * as TxSignBuilder from "../TxSignBuilder.js";
import {
  PrivateKey,
  TransactionWitnesses,
  Wallet,
} from "@evolution-sdk/core-types";
import { CML } from "../../core.js";

export const signError = (cause: unknown) => new TxSignerError({ cause });

const mkWitnessFromWallet = (
  wallet: Wallet | undefined,
  txComplete: CML.Transaction,
): Effect.Effect<CML.TransactionWitnessSet, TxSignerError, never> =>
  pipe(
    Effect.fromNullable(wallet),
    Effect.catchAll(() => signError(ERROR_MESSAGE.MISSING_WALLET)),
    Effect.tryMapPromise({
      try: (wallet) => wallet.signTx(txComplete),
      catch: (cause) => signError(cause),
    }),
  );

export const withWallet = (
  config: TxSignBuilder.TxSignBuilderConfig,
): Effect.Effect<void, TxSignerError, never> =>
  pipe(
    mkWitnessFromWallet(config.wallet, config.txComplete),
    Effect.map((witness) => config.witnessSetBuilder.add_existing(witness)),
  );

export const partialWithWallet = (
  config: TxSignBuilder.TxSignBuilderConfig,
): Effect.Effect<TransactionWitnesses, TxSignerError> =>
  pipe(
    mkWitnessFromWallet(config.wallet, config.txComplete),
    Effect.map((witness) => witness.to_cbor_hex()),
  );

const mkWitnessFromPrivateKey = (
  privateKey: PrivateKey,
  txComplete: CML.Transaction,
) =>
  pipe(
    Effect.try({
      try: () => CML.PrivateKey.from_bech32(privateKey),
      catch: signError,
    }),
    Effect.map((privateKey) =>
      CML.make_vkey_witness(
        CML.hash_transaction(txComplete.body()),
        privateKey,
      ),
    ),
  );

export const withPrivateKey = (
  config: TxSignBuilder.TxSignBuilderConfig,
  privateKey: PrivateKey,
) =>
  pipe(
    mkWitnessFromPrivateKey(privateKey, config.txComplete),
    Effect.map((witness) => config.witnessSetBuilder.add_vkey(witness)),
  );

export const partialWithPrivateKey = (
  config: TxSignBuilder.TxSignBuilderConfig,
  privateKey: PrivateKey,
) =>
  pipe(
    mkWitnessFromPrivateKey(privateKey, config.txComplete),
    Effect.map((witness) => {
      const witnessBuilder = CML.TransactionWitnessSetBuilder.new();
      witnessBuilder.add_vkey(witness);
      return witnessBuilder.build().to_cbor_hex();
    }),
  );

export const assemble = (
  config: TxSignBuilder.TxSignBuilderConfig,
  witnesses: TransactionWitnesses[],
) =>
  Effect.forEach(witnesses, (witness) =>
    pipe(
      Effect.try({
        try: () => CML.TransactionWitnessSet.from_cbor_hex(witness),
        catch: signError,
      }),
      Effect.map((witness) => config.witnessSetBuilder.add_existing(witness)),
    ),
  );
