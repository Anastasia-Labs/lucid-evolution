import { Console, Effect, Logger, LogLevel, pipe, Schedule } from "effect";
import { HelloContract, StakeContract, User } from "./services";
import { Constr, Data } from "@lucid-evolution/plutus";
import { getAddressDetails } from "@lucid-evolution/utils";
import { fromText } from "@lucid-evolution/core-utils";
import { TxSignBuilder } from "../../src";
import { handleSignSubmit, withLogRetry } from "./utils";

export const depositFunds = Effect.gen(function* () {
  const { user } = yield* User;
  const datum = Data.void();
  const { contractAddress } = yield* StakeContract;

  yield* pipe(
    Effect.tryPromise(() => user.utxosAt(contractAddress)),
    // Effect.andThen((utxos) => Console.log(utxos)),
  );

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
      { lovelace: 10_000_000n },
    )
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
      { lovelace: 10_000_000n },
    )
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
      { lovelace: 10_000_000n },
    )
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
      { lovelace: 10_000_000n },
    )
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
      { lovelace: 10_000_000n },
    )
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
      { lovelace: 10_000_000n },
    )
    .completeProgram();
  return signBuilder;
}).pipe(Effect.flatMap(handleSignSubmit), withLogRetry);

export const collectFunds = Effect.gen(function* ($) {
  const { user } = yield* User;
  const { contractAddress, stake, rewardAddress } = yield* StakeContract;

  const allUtxos = yield* Effect.tryPromise(() =>
    user.utxosAt(contractAddress),
  );
  const selectedUTxOs = allUtxos.slice(0, 50);

  const redeemer = Data.to(new Constr(1, [Data.void()]));
  let signBuilder = user
    .newTx()
    .collectFrom(selectedUTxOs, redeemer)
    .attach.SpendingValidator(stake);

  selectedUTxOs.forEach((utxo, index) => {
    signBuilder = signBuilder.pay.ToAddressWithData(
      contractAddress,
      {
        kind: "inline",
        value: Data.void(),
      },
      utxo.assets,
    );
  });

  const signBuilder2 = yield* signBuilder
    .withdraw(rewardAddress, 0n, Data.void())
    .attach.WithdrawalValidator(stake)
    .completeProgram();
  return signBuilder2;
}).pipe(Effect.flatMap(handleSignSubmit), withLogRetry);

export const registerStake = Effect.gen(function* ($) {
  const { user } = yield* User;
  const { rewardAddress } = yield* StakeContract;
  const signBuilder = yield* user
    .newTx()
    .registerStake(rewardAddress)
    .completeProgram();
  return signBuilder;
}).pipe(
  Effect.flatMap(handleSignSubmit),
  Effect.catchTag("TxSubmitError", (error) =>
    error.message.includes("StakeKeyAlreadyRegisteredDELEG")
      ? Effect.void
      : Effect.fail(error),
  ),
  withLogRetry,
);
