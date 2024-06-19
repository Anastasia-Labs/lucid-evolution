import { Console, Effect, Logger, LogLevel, pipe, Schedule } from "effect";
import { User } from "../specs/services.js";
import {
  applyDoubleCborEncoding,
  applyParamsToScript,
  getAddressDetails,
  validatorToAddress,
} from "@lucid-evolution/utils";
import { Constr, Data } from "@lucid-evolution/plutus";
import { fromText } from "@lucid-evolution/core-utils";
import { SpendingValidator } from "../../src/index.js";
import scripts from "./contracts/plutus.json";
import { handleSignSubmit, withLogRetry } from "./utils.js";

const DatumSchema = Data.Object({
  owner: Data.Bytes(),
});
type DatumType = Data.Static<typeof DatumSchema>;
const DatumType = DatumSchema as unknown as DatumType;

export const depositFunds = Effect.gen(function* () {
  const { user } = yield* User;
  const publicKeyHash = getAddressDetails(
    yield* Effect.promise(() => user.wallet().address()),
  ).paymentCredential?.hash;
  const datum = Data.to(new Constr(0, [publicKeyHash!]));
  // const { contractAddress } = yield* HelloContractParams;
  const helloCBOR = yield* pipe(
    Effect.fromNullable(
      scripts.validators.find((v) => v.title === "hello_world_params.spend"),
    ),
    Effect.andThen((script) => script.compiledCode),
  );
  const applied = applyParamsToScript(helloCBOR, [
    publicKeyHash!,
    fromText("Hello, World!"),
  ]);

  const hello: SpendingValidator = {
    type: "PlutusV2",
    script: applyDoubleCborEncoding(applied),
  };

  const contractAddress = validatorToAddress("Preprod", hello);

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
    .completeProgram();
  return signBuilder;
}).pipe(Effect.flatMap(handleSignSubmit), withLogRetry);

export const collectFunds = Effect.gen(function* ($) {
  const { user } = yield* User;
  const helloCBOR = yield* pipe(
    Effect.fromNullable(
      scripts.validators.find((v) => v.title === "hello_world_params.spend"),
    ),
    Effect.andThen((script) => script.compiledCode),
  );
  const publicKeyHash = getAddressDetails(
    yield* Effect.promise(() => user.wallet().address()),
  ).paymentCredential?.hash;
  const applied = applyParamsToScript(helloCBOR, [
    publicKeyHash!,
    fromText("Hello, World!"),
  ]);
  const hello: SpendingValidator = {
    type: "PlutusV2",
    script: applyDoubleCborEncoding(applied),
  };
  const contractAddress = validatorToAddress("Preprod", hello);
  const allUtxos = yield* Effect.tryPromise(() =>
    user.utxosAt(contractAddress),
  );
  const ownerUTxO = yield* Effect.fromNullable(
    allUtxos.find((utxo) => {
      if (utxo.datum) {
        const datum = Data.from(utxo.datum, DatumType);
        return datum.owner === publicKeyHash;
      }
    }),
  );

  const addr = yield* Effect.promise(() => user.wallet().address());
  const redeemer = Data.to(new Constr(0, [fromText("Hello, World!")]));
  const signBuilder = yield* user
    .newTx()
    .collectFrom([ownerUTxO], redeemer)
    .attach.SpendingValidator(hello)
    .addSigner(addr)
    .completeProgram();
  return signBuilder;
}).pipe(Effect.flatMap(handleSignSubmit), withLogRetry);
