import { Console, Effect, pipe, Array as _Array } from "effect";
import { handleSignSubmitWithoutValidation, withLogNoRetry } from "./utils";
import { HelloContract, User } from "./services";
import { getAddressDetails } from "@lucid-evolution/utils";
import { Constr, Data } from "@lucid-evolution/plutus";
import { fromText } from "@lucid-evolution/core-utils";
import { UTxO } from "@lucid-evolution/core-types";
import { LucidEvolution } from "../../src";

const DatumSchema = Data.Object({
  owner: Data.Bytes(),
});
type DatumType = Data.Static<typeof DatumSchema>;
const DatumType = DatumSchema as unknown as DatumType;

export const query = Effect.gen(function* () {
  const { user } = yield* User;
  const { contractAddress } = yield* HelloContract;
  yield* pipe(
    Effect.tryPromise(() => user.utxosAt(contractAddress)),
    Effect.map((utxos) =>
      utxos.filter(
        (utxo) =>
          utxo.txHash ==
          "bdb072e8e201cf215853a1d45bf14fe88476561690848b8597772e6be91c6522",
      ),
    ),
    Effect.andThen((utxos) => Console.log(utxos)),
  );
});

export const depositFundsCollect = Effect.gen(function* () {
  const { user } = yield* User;
  const address = yield* Effect.promise(() => user.wallet().address());
  const publicKeyHash = getAddressDetails(address).paymentCredential?.hash;
  const datum = Data.to(new Constr(0, [publicKeyHash!]));
  const { contractAddress, hello } = yield* HelloContract;
  const walletUTxOs = yield* Effect.promise(() => user.wallet().getUtxos());
  // yield* Console.log(walletUTxOs)
  const addr = yield* Effect.promise(() => user.wallet().address());
  const redeemer = Data.to(new Constr(0, [fromText("Hello, World!")]));
  const deposit = (user: LucidEvolution) =>
    user
      .newTx()
      .pay.ToAddressWithData(
        contractAddress,
        {
          kind: "inline",
          value: datum,
        },
        { lovelace: 10_000_000n },
      )
      .chainProgram();

  const collect = (user: LucidEvolution, derivedUTxOs: UTxO[]) =>
    user
      .newTx()
      .collectFrom(fetchOwner(derivedUTxOs), redeemer)
      .attach.SpendingValidator(hello)
      .addSigner(addr)
      .chainProgram();

  yield* pipe(
    deposit(user),
    Effect.tap((result) => handleSignSubmitWithoutValidation(result[2])),
  ).pipe(
    Effect.flatMap(([newWalletUTxOs, derivedUTxOs, tx]) => {
      user.overrideUTxOs(newWalletUTxOs);
      return collect(user, derivedUTxOs);
    }),
    Effect.tap((result) => handleSignSubmitWithoutValidation(result[2])),
    Effect.flatMap(([newWalletUTxOs, derivedUTxOs, tx]) => {
      user.overrideUTxOs(newWalletUTxOs);
      return deposit(user);
    }),
    Effect.tap((result) => handleSignSubmitWithoutValidation(result[2])),
    Effect.flatMap(([newWalletUTxOs, derivedUTxOs, tx]) => {
      user.overrideUTxOs(newWalletUTxOs);
      return collect(user, derivedUTxOs);
    }),
    Effect.tap((result) => handleSignSubmitWithoutValidation(result[2])),
    Effect.flatMap(([newWalletUTxOs, derivedUTxOs, tx]) => {
      user.overrideUTxOs(newWalletUTxOs);
      return deposit(user);
    }),
    Effect.tap((result) => handleSignSubmitWithoutValidation(result[2])),
    Effect.flatMap(([newWalletUTxOs, derivedUTxOs, tx]) => {
      user.overrideUTxOs(newWalletUTxOs);
      return collect(user, derivedUTxOs);
    }),
    Effect.tap((result) => handleSignSubmitWithoutValidation(result[2])),
    Effect.flatMap(([newWalletUTxOs, derivedUTxOs, tx]) => {
      user.overrideUTxOs(newWalletUTxOs);
      return deposit(user);
    }),
    Effect.tap((result) => handleSignSubmitWithoutValidation(result[2])),
    Effect.flatMap(([newWalletUTxOs, derivedUTxOs, tx]) => {
      user.overrideUTxOs(newWalletUTxOs);
      return collect(user, derivedUTxOs);
    }),
    Effect.tap((result) => handleSignSubmitWithoutValidation(result[2])),
    Effect.flatMap(([newWalletUTxOs, derivedUTxOs, tx]) => {
      user.overrideUTxOs(newWalletUTxOs);
      return deposit(user);
    }),
    Effect.tap((result) => handleSignSubmitWithoutValidation(result[2])),
    Effect.flatMap(([newWalletUTxOs, derivedUTxOs, tx]) => {
      user.overrideUTxOs(newWalletUTxOs);
      return collect(user, derivedUTxOs);
    }),
    Effect.tap((result) => handleSignSubmitWithoutValidation(result[2])),
  );

  // const [newWalletUTxOs, deriveUTxOs, tx1] = yield* user
  //   .newTx()
  //   .pay.ToAddressWithData(
  //     contractAddress,
  //     {
  //       kind: "inline",
  //       value: datum,
  //     },
  //     { lovelace: 10_000_000n }
  //   )
  //   .chainProgram();
  // yield* handleSignSubmitWithoutValidation(tx1);
  // // yield* Effect.log("deriveUTxOs", stringify(deriveUTxOs));

  // user.overrideUTxOs(newWalletUTxOs);
}).pipe(withLogNoRetry);

const fetchOwner = (utxos: UTxO[]) =>
  utxos.filter((value) => {
    if (!value.datum) {
      return false;
    }
    const datum = Data.from(value.datum, DatumType);
    return (
      datum.owner === "e6849315a2984aadcd1e42d9628f6d6cc071685bef02bb52502f86c9"
    );
  });
