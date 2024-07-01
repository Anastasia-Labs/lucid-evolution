import { Effect, pipe } from "effect";
import { StakeContract, User } from "./services";
import { Constr, Data } from "@lucid-evolution/plutus";
import { RedeemerBuilder } from "../../src";
import {
  handleSignSubmit,
  withLogRetry,
} from "./utils";

export const depositFunds = Effect.gen(function* () {
  const { user } = yield* User;
  const datum = Data.void();
  const { contractAddress } = yield* StakeContract;

  yield* pipe(
    Effect.tryPromise(() => user.utxosAt(contractAddress)),
    // Effect.andThen((utxos) => Console.log(utxos)),
  );

  let txBuilder = user.newTx();

  for (let i = 0; i < 50; i++) {
    txBuilder = txBuilder.pay.ToAddressWithData(
      contractAddress,
      {
        kind: "inline",
        value: datum,
      },
      { lovelace: 2_000_000n },
    );
  }

  const signBuilder = yield* txBuilder.completeProgram();

  return signBuilder;
}).pipe(Effect.flatMap(handleSignSubmit), withLogRetry);

export const collectFunds = Effect.gen(function* ($) {
  const { user } = yield* User;
  const { contractAddress, stake, rewardAddress } = yield* StakeContract;

  const allUtxos = yield* Effect.tryPromise(() =>
    user.utxosAt(contractAddress),
  );
  const selectedUTxOs = allUtxos.slice(0, 50);

  const rdmrBuilderSelf: RedeemerBuilder = {
    kind: "self",
    makeRedeemer: (inputIndex: bigint) => {
      return Data.to(new Constr(1, [inputIndex]));
    },
  };

  const outIndices = [0n, 1n, 2n];
  const rdmrBuilder1: RedeemerBuilder = {
    kind: "selected",
    makeRedeemer: (inputIndices: bigint[]) => {
      return Data.to(new Constr(1, [inputIndices, outIndices]));
    },
    inputs: selectedUTxOs,
  };

  let signBuilder = user
    .newTx()
    .collectFrom(selectedUTxOs, rdmrBuilderSelf)
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

  const rdmrBuilder2: RedeemerBuilder = {
    kind: "selected",
    makeRedeemer: (inputIndices: bigint[]) => {
      return Data.to(new Constr(0, [inputIndices, [0n, 0n, 0n]]));
    },
    inputs: selectedUTxOs,
  };

  const signBuilder2 = yield* signBuilder
    .withdraw(rewardAddress, 0n, rdmrBuilder2)
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
