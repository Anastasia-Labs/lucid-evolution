import { Effect } from "effect";
import { User } from "../service/EmulatorUser.js";
import { HelloContract } from "../../specs/services.js";
import { Constr, Data } from "@lucid-evolution/plutus";
import { fromText } from "@lucid-evolution/core-utils";

export const collectFundsWithWrongRedeemer = Effect.gen(function* () {
  const { user } = yield* User;
  const { contractAddress } = yield* HelloContract;
  const contractUTxO = yield* Effect.tryPromise(() =>
    user.utxosAt(contractAddress),
  );
  const userUTxO = yield* Effect.tryPromise(() => user.wallet().getUtxos());
  const address = yield* Effect.promise(() => user.wallet().address());
  const wrongRedeemer = Data.to(new Constr(0, [fromText("Goodbye, World!")]));
  const tx0 = user
    .newTx()
    .collectFrom(contractUTxO, wrongRedeemer)
    .readFrom(contractUTxO)
    .addSigner(address);
  const tx1 = user.newTx().readFrom(userUTxO);
  return yield* tx0.compose(tx1).completeProgram();
});
