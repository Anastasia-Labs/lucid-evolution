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
  PROTOCOL_PARAMETERS_DEFAULT,
  Kupmios,
} from "../../src/index.js";
import scripts from "./contracts/plutus.json" assert { type: "json" };

export const NETWORK: Network = "Preprod";

const preprod = Effect.gen(function* ($) {
  const config = yield* Config.all([
    Config.string("VITE_BLOCKFROST_API_URL_PREPROD"),
    Config.string("VITE_BLOCKFROST_KEY_PREPROD"),
    Config.string("VITE_WALLET_SEED_2"),
    Config.string("VITE_KUPO_KEY"),
    Config.string("VITE_OGMIOS_KEY"),
  ]);
  return {
    BLOCKFROST_API_URL: config[0],
    BLOCKFROST_KEY: config[1],
    WALLET_SEED: config[2],
    KUPO_KEY: config[3],
    OGMIOS_KEY: config[4],
    NETWORK: "Preprod" as Network,
  };
}).pipe(Effect.orDie);

const preview = Effect.gen(function* ($) {
  const config = yield* Config.all([
    Config.string("VITE_BLOCKFROST_API_URL_PREVIEW"),
    Config.string("VITE_BLOCKFROST_KEY_PREVIEW"),
    Config.string("VITE_WALLET_SEED_2"),
  ]);
  return {
    BLOCKFROST_API_URL: config[0],
    BLOCKFROST_KEY: config[1],
    WALLET_SEED: config[2],
    NETWORK: "Preview" as Network,
    KUPO_KEY: "",
    OGMIOS_KEY: "",
  };
}).pipe(Effect.orDie);

export class NetworkConfig extends Context.Tag("NetworkConfig")<
  NetworkConfig,
  {
    BLOCKFROST_API_URL: string;
    BLOCKFROST_KEY: string;
    WALLET_SEED: string;
    NETWORK: Network;
    OGMIOS_KEY: string;
    KUPO_KEY: string;
  }
>() {
  static readonly layerPreprod = Layer.effect(NetworkConfig, preprod);
  static readonly layerPreview = Layer.effect(NetworkConfig, preview);
}

const makeUser = Effect.gen(function* ($) {
  const networkConfig = yield* NetworkConfig;
  const user = yield* Effect.tryPromise(() =>
    Lucid(
      new Kupmios(networkConfig.KUPO_KEY, networkConfig.OGMIOS_KEY),
      networkConfig.NETWORK,
      // { presetProtocolParameters: PROTOCOL_PARAMETERS_DEFAULT },
    ),
  );
  user.selectWallet.fromSeed(networkConfig.WALLET_SEED);
  yield* pipe(
    Effect.promise(() => user.wallet().address()),
    Effect.flatMap((address) => Effect.log(`Wallet : ${address}`)),
  );
  yield* pipe(
    Effect.promise(() => user.wallet().getUtxos()),
    Effect.flatMap((utxos) =>
      Effect.log(`Total Wallet UTxOs: ${utxos.length}`),
    ),
  );
  return {
    user,
  };
}).pipe(Effect.orDie);

export class User extends Context.Tag("User")<
  User,
  Effect.Effect.Success<typeof makeUser>
>() {
  static readonly layer = Layer.effect(User, makeUser);
}

const makeHelloService = Effect.gen(function* () {
  const helloCBOR = yield* pipe(
    Effect.fromNullable(
      scripts.validators.find(
        (v) => v.title === "hello_world.hello_world.spend",
      ),
    ),
    Effect.andThen((script) => script.compiledCode),
  );
  const hello: SpendingValidator = {
    type: "PlutusV3",
    script: applyDoubleCborEncoding(helloCBOR),
  };
  const contractAddress = validatorToAddress(NETWORK, hello);
  return {
    helloCBOR,
    hello,
    contractAddress,
  };
}).pipe(Effect.orDie);

export class HelloContract extends Context.Tag("HelloContract")<
  HelloContract,
  Effect.Effect.Success<typeof makeHelloService>
>() {
  static readonly layer = Layer.effect(HelloContract, makeHelloService);
}

const makeStakeService = Effect.gen(function* () {
  const networkConfig = yield* NetworkConfig;
  const stakeCBOR = yield* pipe(
    Effect.fromNullable(
      scripts.validators.find(
        (v) => v.title === "stake.stake_multivalidator.withdraw",
      ),
    ),
    Effect.andThen((script) => script.compiledCode),
  );
  const stake: Script = {
    type: "PlutusV3",
    script: applyDoubleCborEncoding(stakeCBOR),
  };
  const contractAddress = validatorToAddress(networkConfig.NETWORK, stake);
  const rewardAddress = validatorToRewardAddress(networkConfig.NETWORK, stake);
  return {
    stakeCBOR,
    stake,
    contractAddress,
    rewardAddress,
  };
}).pipe(Effect.orDie);

export class StakeContract extends Context.Tag("StakeContract")<
  StakeContract,
  Effect.Effect.Success<typeof makeStakeService>
>() {
  static readonly layer = Layer.effect(StakeContract, makeStakeService);
}

const makeMintService = Effect.gen(function* () {
  const networkConfig = yield* NetworkConfig;
  const mintCBOR = yield* pipe(
    Effect.fromNullable(
      scripts.validators.find(
        (v) => v.title === "mint.mint_multi_validator.mint",
      ),
    ),
    Effect.andThen((script) => script.compiledCode),
  );
  const mint: MintingPolicy = {
    type: "PlutusV3",
    script: applyDoubleCborEncoding(mintCBOR),
  };
  const policyId = mintingPolicyToId(mint);
  const contractAddress = validatorToAddress(networkConfig.NETWORK, mint);
  return {
    mintCBOR,
    mint,
    policyId,
    contractAddress,
  };
}).pipe(Effect.orDie);

export class MintContract extends Context.Tag("MintContract")<
  MintContract,
  Effect.Effect.Success<typeof makeMintService>
>() {
  static readonly layer = Layer.effect(MintContract, makeMintService);
}

const makeSimpleMintService = Effect.gen(function* () {
  const networkConfig = yield* NetworkConfig;
  const mintCBOR = yield* pipe(
    Effect.fromNullable(
      scripts.validators.find(
        (v) => v.title === "simple_mint.mint_policy.mint",
      ),
    ),
    Effect.andThen((script) => script.compiledCode),
  );
  const mint: MintingPolicy = {
    type: "PlutusV3",
    script: applyDoubleCborEncoding(mintCBOR),
  };
  const policyId = mintingPolicyToId(mint);
  const contractAddress = validatorToAddress(networkConfig.NETWORK, mint);
  return {
    mintCBOR,
    mint,
    policyId,
    contractAddress,
  };
}).pipe(Effect.orDie);

export class SimpleMintContract extends Context.Tag("SimpleMintContract")<
  SimpleMintContract,
  Effect.Effect.Success<typeof makeSimpleMintService>
>() {
  static readonly layer = Layer.effect(
    SimpleMintContract,
    makeSimpleMintService,
  );
}

const makeSimpleStakeService = Effect.gen(function* () {
  const networkConfig = yield* NetworkConfig;
  const stakeCBOR = yield* pipe(
    Effect.fromNullable(
      scripts.validators.find(
        (v) => v.title === "simple_mint.mint_policy.withdraw",
      ),
    ),
    Effect.andThen((script) => script.compiledCode),
  );
  const stake: Script = {
    type: "PlutusV3",
    script: applyDoubleCborEncoding(stakeCBOR),
  };
  const contractAddress = validatorToAddress(networkConfig.NETWORK, stake);
  const rewardAddress = validatorToRewardAddress(networkConfig.NETWORK, stake);
  return {
    stakeCBOR,
    stake,
    contractAddress,
    rewardAddress,
  };
}).pipe(Effect.orDie);

export class SimpleStakeContract extends Context.Tag("SimpleStakeContract")<
  SimpleStakeContract,
  Effect.Effect.Success<typeof makeSimpleStakeService>
>() {
  static readonly layer = Layer.effect(
    SimpleStakeContract,
    makeSimpleStakeService,
  );
}

const makeAlwaysYesDrepService = Effect.gen(function* () {
  const networkConfig = yield* NetworkConfig;
  const cbor = yield* pipe(
    Effect.fromNullable(
      scripts.validators.find(
        (v) => v.title === "always_yes_drep.always_yes.else",
      ),
    ),
    Effect.andThen((script) => script.compiledCode),
  );
  const script: Script = {
    type: "PlutusV3",
    script: applyDoubleCborEncoding(cbor),
  };
  const contractAddress = validatorToAddress(networkConfig.NETWORK, script);
  const rewardAddress = validatorToRewardAddress(networkConfig.NETWORK, script);
  return {
    cbor,
    script,
    contractAddress,
    rewardAddress,
  };
}).pipe(Effect.orDie);

export class AlwaysYesDrepContract extends Context.Tag("AlwaysYesDrepContract")<
  AlwaysYesDrepContract,
  Effect.Effect.Success<typeof makeAlwaysYesDrepService>
>() {
  static readonly layer = Layer.effect(
    AlwaysYesDrepContract,
    makeAlwaysYesDrepService,
  );
}
