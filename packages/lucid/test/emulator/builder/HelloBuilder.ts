import { Effect } from "effect";
import { User } from "../service/EmulatorUser.js";
import { getAddressDetails } from "@evolution-sdk/utils";
import { HelloContract } from "../../specs/services.js";
import { Constr, Data } from "@evolution-sdk/plutus";
import { fromText } from "@evolution-sdk/core-utils";

export const depositFunds = Effect.gen(function* () {
  const { user } = yield* User;
  const address = yield* Effect.promise(() => user.wallet().address());
  const { paymentCredential } = getAddressDetails(address);
  const { hash } = yield* Effect.fromNullable(paymentCredential);
  const datum = Data.to(new Constr(0, [hash]));
  const { contractAddress, hello } = yield* HelloContract;
  const signBuilder = yield* user
    .newTx()
    .pay.ToAddressWithData(
      contractAddress,
      {
        kind: "inline",
        value: datum,
      },
      { lovelace: 10_000_000n },
      hello,
    )
    .completeProgram();
  return signBuilder;
});

export const collectFundsReadFrom = Effect.gen(function* () {
  const { user } = yield* User;
  const { contractAddress } = yield* HelloContract;
  const contractUTxO = yield* Effect.tryPromise(() =>
    user.utxosAt(contractAddress),
  );
  const userUTxO = yield* Effect.tryPromise(() => user.wallet().getUtxos());
  const address = yield* Effect.promise(() => user.wallet().address());
  const redeemer = Data.to(new Constr(0, [fromText("Hello, World!")]));
  const tx0 = user
    .newTx()
    .collectFrom(contractUTxO, redeemer)
    .readFrom(contractUTxO)
    .addSigner(address);
  const tx1 = user.newTx().readFrom(userUTxO);
  const signBuilder = yield* tx0.compose(tx1).completeProgram();
  return signBuilder;
});
