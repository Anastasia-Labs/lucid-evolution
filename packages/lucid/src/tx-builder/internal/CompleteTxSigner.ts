import { Effect } from "effect";
import {
  signError,
  TxSignBuilderConfig,
} from "../../tx-sign-builder/MakeTxSign.js";
import { CML, makeReturn } from "../../core.js";
import { ERROR_MESSAGE, makeRunTimeError } from "../../Errors.js";
import { completeTxSign } from "../../tx-sign-builder/internal/CompleteTxSign.js";

export const completeTxSignBuilder = (config: TxSignBuilderConfig) => {
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
};
