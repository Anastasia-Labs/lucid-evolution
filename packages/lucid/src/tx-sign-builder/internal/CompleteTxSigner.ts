import { Effect, pipe } from "effect";
import { CML } from "../../core.js";
import {
  ERROR_MESSAGE,
  makeRunTimeError,
  RunTimeError,
  TransactionSignError,
} from "../../Errors.js";
import * as TxSignBuilder from "../TxSignBuilder.js";
import * as TxSubmitBuilder from "../../tx-submit/TxSubmit.js";
import { stringify } from "@lucid-evolution/utils";

export const completeTxSigner = (
  config: TxSignBuilder.TxSignBuilderConfig,
): Effect.Effect<TxSubmitBuilder.TxSigned, TransactionSignError> =>
  Effect.gen(function* () {
    yield* Effect.all(config.programs, { concurrency: "unbounded" });
    config.witnessSetBuilder.add_existing(config.txComplete.witness_set());
    const txWitnessSet = config.witnessSetBuilder.build();
    const signedTx = CML.Transaction.new(
      config.txComplete.body(),
      txWitnessSet,
      true,
      config.txComplete.auxiliary_data(),
    );
    const wallet = yield* pipe(
      Effect.fromNullable(config.lucidConfig.wallet),
      Effect.orElseFail(() =>
        TxSignBuilder.signError("MissingWallet", ERROR_MESSAGE.MISSING_WALLET),
      ),
    );
    return TxSubmitBuilder.makeSubmit(wallet, signedTx);
  }).pipe(
    Effect.catchAllDefect(
      (e) => new RunTimeError({ message: stringify(String(e)) }),
    ),
  );
