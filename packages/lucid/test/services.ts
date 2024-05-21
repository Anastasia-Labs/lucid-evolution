import { Config, Context, Effect, Layer } from "effect";
import {
  applyDoubleCborEncoding,
  Blockfrost,
  Lucid,
  SpendingValidator,
  validatorToAddress,
} from "../src";

const makeUser = Effect.gen(function* ($) {
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
  return {
    user,
  };
});

export class User extends Context.Tag("User")<
  User,
  Effect.Effect.Success<typeof makeUser>
>() {
  static readonly layer = Layer.effect(User, makeUser);
}

const makeHelloService = Effect.gen(function* () {
  const helloCBOR =
    "58e901000032323232323223223225333006323253330083371e6eb8c008c028dd5002a4410d48656c6c6f2c20576f726c642100100114a06644646600200200644a66601c00229404c94ccc030cdc79bae301000200414a226600600600260200026eb0c02cc030c030c030c030c030c030c030c030c024dd5180098049baa002375c600260126ea80188c02c0045261365653330043370e900018029baa001132325333009300b002149858dd7180480098031baa0011653330023370e900018019baa0011323253330073009002149858dd7180380098021baa001165734aae7555cf2ab9f5742ae881";
  const hello: SpendingValidator = {
    type: "PlutusV2",
    script: applyDoubleCborEncoding(helloCBOR),
  };
  const contractAddress = validatorToAddress("Preprod", hello);
  return {
    helloCBOR,
    hello,
    contractAddress,
  };
});

export class HelloContract extends Context.Tag("HelloContract")<
  HelloContract,
  Effect.Effect.Success<typeof makeHelloService>
>() {
  static readonly layer = Layer.effect(HelloContract, makeHelloService);
}
