import { Config, Context, Effect, Layer, pipe } from "effect";
import {
  applyDoubleCborEncoding,
  Blockfrost,
  Koios,
  Lucid,
  Script,
  MintingPolicy,
  mintingPolicyToId,
  SpendingValidator,
  validatorToAddress,
  validatorToRewardAddress,
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

const makeStakeService = Effect.gen(function* () {
  const stakeCBOR = yield* pipe(
    Effect.fromNullable(
      scripts.validators.find((v) => v.title === "stake_validator.spend"),
    ),
    Effect.andThen((script) => script.compiledCode),
  );
  const stake: Script = {
    type: "PlutusV2",
    script: applyDoubleCborEncoding(stakeCBOR),
  };
  const contractAddress = validatorToAddress("Preprod", stake);
  const rewardAddress = validatorToRewardAddress("Preprod", stake);
  return {
    stakeCBOR,
    stake,
    contractAddress,
    rewardAddress,
  };
});

export class StakeContract extends Context.Tag("StakeContract")<
  StakeContract,
  Effect.Effect.Success<typeof makeStakeService>
>() {
  static readonly layer = Layer.effect(StakeContract, makeStakeService);
}

const makeMintService = Effect.gen(function* () {
  const mintCBOR = yield* pipe(
    Effect.fromNullable(
      scripts.validators.find((v) => v.title === "mint.mint"),
    ),
    Effect.andThen((script) => script.compiledCode),
  );
  const mint: MintingPolicy = {
    type: "PlutusV2",
    script: applyDoubleCborEncoding(mintCBOR),
  };
  const policyId = mintingPolicyToId(mint);
  const contractAddress = validatorToAddress("Preprod", mint);
  return {
    mintCBOR,
    mint,
    policyId,
    contractAddress
  };
});

export class MintContract extends Context.Tag("MintContract")<
  MintContract,
  Effect.Effect.Success<typeof makeMintService>
>() {
  static readonly layer = Layer.effect(MintContract, makeMintService);
}
