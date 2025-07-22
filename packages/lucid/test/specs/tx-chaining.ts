import { Console, Effect, pipe, Array as _Array } from "effect";
import {
  handleSignSubmitWithoutValidation,
  withLogNoRetry,
  withLogRetry,
} from "./utils.js";
import { HelloContract, User } from "./services.js";
import { getAddressDetails } from "@evolution-sdk/utils";
import { Constr, Data } from "@evolution-sdk/plutus";
import { fromText } from "@evolution-sdk/core-utils";
import { PaymentKeyHash, UTxO } from "@evolution-sdk/core-types";
import { LucidEvolution } from "../../src/evolution-sdk/index.js";
import {
  RunTimeError,
  TxBuilderError,
  TxSignerError,
  TxSubmitError,
} from "../../src/index.js";

//TODO: everything here is quite messy, it needs some clean up
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
  const publicKeyHash = yield* Effect.fromNullable(
    getAddressDetails(address).paymentCredential?.hash,
  );
  const datum = Data.to(new Constr(0, [publicKeyHash]));
  const { contractAddress, hello } = yield* HelloContract;
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
      .pay.ToAddress(address, { lovelace: 5_000_000n })
      .chainProgram();

  const collect = (user: LucidEvolution, derivedUTxOs: UTxO[]) =>
    user
      .newTx()
      .collectFrom(fetchForOwner(derivedUTxOs, publicKeyHash), redeemer)
      .attach.SpendingValidator(hello)
      .addSigner(address)
      .chainProgram();

  const programs: Effect.Effect<
    void,
    RunTimeError | TxBuilderError | TxSignerError | TxSubmitError,
    never
  >[] = [];

  const repeat = (user: LucidEvolution, counter: number) => {
    const newCounter = counter - 1;
    if (newCounter <= 0) return undefined;
    const program = Effect.gen(function* () {
      const depositResult = yield* deposit(user);
      yield* handleSignSubmitWithoutValidation(depositResult[2]);

      user.overrideUTxOs(depositResult[0]);
      const collectResult = yield* collect(user, depositResult[1]);
      yield* handleSignSubmitWithoutValidation(collectResult[2]);
      user.overrideUTxOs(collectResult[0]);
    });
    programs.push(program);

    repeat(user, newCounter);
  };
  repeat(user, 4);

  yield* Effect.all(programs);
}).pipe(withLogRetry, Effect.orDie);

export const readRefInputTwice = Effect.gen(function* () {
  const { user } = yield* User;
  const scriptAddress =
    "addr_test1wr4rcqxrusa76m068pv8xxpl65ajw2u08dk7mx3kjrjaf6gryukn2";
  const [newWalletInputs, derivedOutputs, refTx] = yield* user
    .newTx()
    .pay.ToAddressWithData(
      scriptAddress,
      { kind: "inline", value: Data.void() },
      { lovelace: 10_000_000n },
    )
    .chainProgram();

  const tx = yield* refTx.sign.withWallet().completeProgram();
  yield* tx.submitProgram();
  const refInput = derivedOutputs.find(
    (utxo) => utxo.address == scriptAddress,
  )!;

  // Referencing the output twice (directly) in the same transaction doesn't
  // work.

  user.overrideUTxOs(newWalletInputs);
  const txCompose = yield* user
    .newTx()
    .readFrom([refInput])
    .readFrom([refInput])
    .completeProgram();
  const txSign = yield* txCompose.sign.withWallet().completeProgram();
  yield* txSign.submitProgram();
});

const fetchForOwner = (utxos: UTxO[], ownerKeyHash: PaymentKeyHash) =>
  utxos.filter((value) => {
    if (value.datum) {
      const datum = Data.from(value.datum, DatumType);
      return datum.owner === ownerKeyHash;
    }
  });
