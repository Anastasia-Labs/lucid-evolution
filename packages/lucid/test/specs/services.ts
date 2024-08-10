import { Config, Context, Effect, Layer, pipe } from "effect";
import {
  applyDoubleCborEncoding,
  Blockfrost,
  Lucid,
  Script,
  MintingPolicy,
  mintingPolicyToId,
  SpendingValidator,
  validatorToAddress,
  validatorToRewardAddress,
  Network,
  Koios,
} from "../../src/index.js";
import scripts from "./contracts/plutus.json";

export const NETWORK: Network = "Preview";

const preprod = Effect.gen(function* ($) {
  return yield* Config.all([
    Config.string("VITE_BLOCKFROST_API_URL_PREPROD"),
    Config.string("VITE_BLOCKFROST_KEY_PREPROD"),
    Config.string("VITE_WALLET_SEED"),
  ]);
});

const preview = Effect.gen(function* ($) {
  return yield* Config.all([
    Config.string("VITE_BLOCKFROST_API_URL_PREVIEW"),
    Config.string("VITE_BLOCKFROST_KEY_PREVIEW"),
    Config.string("VITE_WALLET_SEED"),
  ]);
});

export class NetworkConfig extends Context.Tag("NetworkConfig")<
  NetworkConfig,
  [string, string, string]
>() {
  static readonly layer = Layer.effect(NetworkConfig, preprod);
  static readonly layerPreview = Layer.effect(NetworkConfig, preview);
}

const makeUser = Effect.gen(function* ($) {
  const [BLOCKFROST_API_URL, BLOCKFROST_KEY, WALLET_SEED] =
    yield* NetworkConfig;
  const user = yield* Effect.tryPromise(() =>
    Lucid(new Blockfrost(BLOCKFROST_API_URL, BLOCKFROST_KEY), NETWORK),
  );
  user.selectWallet.fromSeed(WALLET_SEED);
  return {
    user,
  };
}).pipe(Effect.provide(NetworkConfig.layer));

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
  const contractAddress = validatorToAddress(NETWORK, hello);
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
      scripts.validators.find((v) => v.title === "stake.stake"),
    ),
    Effect.andThen((script) => script.compiledCode),
  );
  const stake: Script = {
    type: "PlutusV2",
    script: applyDoubleCborEncoding(stakeCBOR),
  };
  const contractAddress = validatorToAddress(NETWORK, stake);
  const rewardAddress = validatorToRewardAddress(NETWORK, stake);
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
  const contractAddress = validatorToAddress(NETWORK, mint);
  return {
    mintCBOR,
    mint,
    policyId,
    contractAddress,
  };
});

export class MintContract extends Context.Tag("MintContract")<
  MintContract,
  Effect.Effect.Success<typeof makeMintService>
>() {
  static readonly layer = Layer.effect(MintContract, makeMintService);
}
