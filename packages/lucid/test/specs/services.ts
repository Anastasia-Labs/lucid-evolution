import { Config, Context, Effect, Layer, pipe } from "effect";
import {
  applyDoubleCborEncoding,
  Blockfrost,
  Koios,
  Lucid,
  SpendingValidator,
  validatorToAddress,
} from "../../src/index.js";
import scripts from "./contracts/plutus.json";

const makeUser = Effect.gen(function* ($) {
  const [apiURL, apiKey, seed] = yield* Config.all([
    Config.string("VITE_API_URL"),
    Config.string("VITE_BLOCKFROST_KEY"),
    Config.string("VITE_SEED"),
  ]);
  const user = yield* Effect.tryPromise(
    () =>
      // Lucid(new Kupmios("http://localhost:1442", "ws://localhost:1337"), "Preview")
      Lucid(new Blockfrost(apiURL, apiKey), "Preprod"),
    // Lucid(new Koios("https://preprod.koios.rest/api/v1"),"Preprod")
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
  const helloCBOR = yield* pipe(
    Effect.fromNullable(
      scripts.validators.find((v) => v.title === "hello_world.spend"),
    ),
    Effect.andThen((script) => script.compiledCode),
  );
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
