import { Effect } from "effect";
import { User } from "../service/EmulatorUser.js";
import { getAddressDetails } from "@lucid-evolution/utils";
import { HelloContract } from "../../specs/services.js";
import { Constr, Data } from "@lucid-evolution/plutus";
import { fromText } from "@lucid-evolution/core-utils";
import { UTxO } from "@lucid-evolution/core-types";

export const depositFunds = Effect.gen(function* () {
  const { user } = yield* User;
  const address = yield* Effect.promise(() => user.wallet().address());
  const { paymentCredential } = getAddressDetails(address);
  const { hash } = yield* Effect.fromNullable(paymentCredential);
  const datum = Data.to(new Constr(0, [hash]));
  const { contractAddress, hello } = yield* HelloContract;
  // The script travels on its own reference UTxO: the ledger requires a
  // transaction's reference inputs to be disjoint from its inputs, so the
  // deposit that is later spent cannot also carry the script it is read for.
  const signBuilder = yield* user
    .newTx()
    .pay.ToAddressWithData(
      contractAddress,
      {
        kind: "inline",
        value: datum,
      },
      { lovelace: 10_000_000n },
    )
    .pay.ToAddressWithData(
      contractAddress,
      {
        kind: "inline",
        value: datum,
      },
      { lovelace: 5_000_000n },
      hello,
    )
    .completeProgram();
  return signBuilder;
});

/**
 * Separates the reference UTxO carrying the script from the deposits that a
 * collection spends.
 */
export const splitContractUTxOs = (utxos: UTxO[]) => {
  const reference = utxos.find((utxo) => utxo.scriptRef !== undefined);
  if (!reference) throw new Error("Missing the Hello reference script UTxO");
  return {
    reference,
    deposits: utxos.filter((utxo) => utxo !== reference),
  };
};

export const collectFundsReadFrom = Effect.gen(function* () {
  const { user } = yield* User;
  const { contractAddress } = yield* HelloContract;
  const contractUTxO = yield* Effect.tryPromise(() =>
    user.utxosAt(contractAddress),
  );
  const userUTxO = yield* Effect.tryPromise(() => user.wallet().getUtxos());
  const address = yield* Effect.promise(() => user.wallet().address());
  const redeemer = Data.to(new Constr(0, [fromText("Hello, World!")]));
  const { reference, deposits } = splitContractUTxOs(contractUTxO);
  const tx0 = user
    .newTx()
    .collectFrom(deposits, redeemer)
    .readFrom([reference])
    .addSigner(address);
  const tx1 = user.newTx().readFrom(userUTxO);
  const signBuilder = yield* tx0.compose(tx1).completeProgram();
  return signBuilder;
});
