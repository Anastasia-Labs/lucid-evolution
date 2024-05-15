import { SpendingValidator } from "@lucid-evolution/core-types";
import {
  Blockfrost,
  Constr,
  Data,
  Kupmios,
  Lucid,
  applyDoubleCborEncoding,
  fromText,
  getAddressDetails,
  validatorToAddress,
} from "../src/index.js";
import { describe, expect, test } from "vitest";
import {
  Config,
  Console,
  Effect,
  Logger,
  LogLevel,
  pipe,
  Schedule,
} from "effect";

const helloCBOR =
  "58e901000032323232323223223225333006323253330083371e6eb8c008c028dd5002a4410d48656c6c6f2c20576f726c642100100114a06644646600200200644a66601c00229404c94ccc030cdc79bae301000200414a226600600600260200026eb0c02cc030c030c030c030c030c030c030c030c024dd5180098049baa002375c600260126ea80188c02c0045261365653330043370e900018029baa001132325333009300b002149858dd7180480098031baa0011653330023370e900018019baa0011323253330073009002149858dd7180380098021baa001165734aae7555cf2ab9f5742ae881";

const hello: SpendingValidator = {
  type: "PlutusV2",
  script: applyDoubleCborEncoding(helloCBOR),
};

const loadUser = Effect.gen(function* ($) {
  const [apiURL, apiKey, seed] = yield* Config.all([
    Config.string("VITE_API_URL"),
    Config.string("VITE_BLOCKFROST_KEY"),
    Config.string("VITE_SEED"),
  ]);
  const user = yield* Effect.tryPromise(() =>
    // Lucid(new Kupmios("http://localhost:1442", "ws://localhost:1337"), "Preview")
    Lucid(new Blockfrost(apiURL, apiKey), "Preprod"),
  );
  user.selectWallet.fromSeed(seed);
  // yield* pipe(
  //   Effect.promise(() => user.wallet().address()),
  //   Effect.andThen((address) => Console.log(address)),
  // );
  return user;
});
const contractAddress = validatorToAddress("Preprod", hello);

describe.concurrent("Hello", () => {
  test.sequential("DespositFunds", async () => {
    const program = Effect.gen(function* () {
      const user = yield* loadUser;
      const publicKeyHash = getAddressDetails(
        yield* Effect.promise(() => user.wallet().address()),
      ).paymentCredential?.hash;
      const datum = Data.to(new Constr(0, [publicKeyHash!]));

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
        .complete()
        .program();
      const signed = yield* signBuilder.sign.withWallet().complete().program();
      const txHash = yield* signed.submit().program();
      yield* Effect.promise(() => user.awaitTx(txHash, 20_000));
      yield* Effect.sleep("10 seconds");
      yield* Effect.logDebug(txHash);
    }).pipe(
      Effect.tapErrorCause(Console.log),
      Effect.retry(
        Schedule.compose(Schedule.exponential(20_000), Schedule.recurs(2)),
      ),
      Logger.withMinimumLogLevel(LogLevel.Debug),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test.sequential("CollectFunds", async () => {
    const program = Effect.gen(function* ($) {
      const user = yield* loadUser;
      const DatumSchema = Data.Object({
        owner: Data.Bytes(),
      });
      type DatumType = Data.Static<typeof DatumSchema>;
      const DatumType = DatumSchema as unknown as DatumType;

      const allUtxos = yield* Effect.tryPromise(() =>
        user.utxosAt(contractAddress),
      );

      const utxos = allUtxos.filter((value) => {
        if (value.datum) {
          const datum = Data.from(value.datum, DatumType);
          return (
            datum.owner ===
            "e6849315a2984aadcd1e42d9628f6d6cc071685bef02bb52502f86c9"
          );
        } else {
          return false;
        }
      });
      const addr = yield* Effect.promise(() => user.wallet().address());
      // yield* Console.log(addr);

      const redeemer = Data.to(new Constr(0, [fromText("Hello, World!")]));
      const signBuilder = yield* user
        .newTx()
        .collectFrom(utxos, redeemer)
        .attach.SpendingValidator(hello)
        .addSigner(addr)
        .complete()
        .program();
      const signed = yield* signBuilder.sign.withWallet().complete().program();
      const txHash = yield* signed.submit().program();
      yield* Effect.sleep("10 seconds");
      yield* Effect.logDebug(txHash);
    }).pipe(
      Effect.tapErrorCause(Effect.logDebug),
      Effect.retry(
        pipe(
          Schedule.compose(Schedule.exponential(20_000), Schedule.recurs(4)),
        ),
      ),
      Logger.withMinimumLogLevel(LogLevel.Debug),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });
});
