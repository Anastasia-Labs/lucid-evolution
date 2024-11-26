import { Effect, pipe } from "effect";
import { CML } from "../../core.js";
import {
  ERROR_MESSAGE,
  RunTimeError,
  TransactionSignError,
} from "../../Errors.js";
import * as TxSignBuilder from "../TxSignBuilder.js";
import * as TxSubmitBuilder from "../../tx-submit/TxSubmit.js";
import { signError } from "./Sign.js";

export const completeTxSigner = (
  config: TxSignBuilder.TxSignBuilderConfig,
): Effect.Effect<TxSubmitBuilder.TxSigned, TransactionSignError> =>
  Effect.gen(function* () {
    yield* Effect.all(config.programs, { concurrency: "unbounded" });
    const plutus_datums = config.txComplete.witness_set().plutus_datums();
    // TODO: currently add_existing does not support add_plutus_datums
    // https://github.com/dcSpark/cardano-multiplatform-lib/pull/350/files
    config.witnessSetBuilder.add_existing(config.txComplete.witness_set());
    if (plutus_datums) {
      for (let i = 0; i < plutus_datums.len(); i++) {
        config.witnessSetBuilder.add_plutus_datum(plutus_datums.get(i));
      }
    }
    const txWitnessSet = config.witnessSetBuilder.build();
    const signedTx = CML.Transaction.new(
      config.txComplete.body(),
      txWitnessSet,
      true,
      config.txComplete.auxiliary_data(),
    );
    const wallet = yield* pipe(
      Effect.fromNullable(config.wallet),
      Effect.orElseFail(() => signError(ERROR_MESSAGE.MISSING_WALLET)),
    );
    return TxSubmitBuilder.makeSubmit(wallet, signedTx);
  }).pipe(Effect.catchAllDefect((cause) => new RunTimeError({ cause })));
