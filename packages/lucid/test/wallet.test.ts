import { assert, describe, test } from "vitest";
import {
  Blockfrost,
  fromHex,
  generateSeedPhrase,
  getAddressDetails,
  Lucid,
  Maestro,
  MaestroSupportedNetworks,
} from "../src/index.js";
import { Config, Effect } from "effect";
import { CML } from "../src/core.js";

const loadConfig = Effect.gen(function* () {
  return yield* Config.all([
    Config.string("VITE_BLOCKFROST_API_URL_PREPROD"),
    Config.string("VITE_BLOCKFROST_KEY_PREPROD"),
    Config.string("VITE_WALLET_SEED_2"),
    Config.string("VITE_MAESTRO_KEY"),
  ]);
});

const NETWORK = "Preprod";

describe("Wallet", () => {
  test("switchProvider", async () => {
    const program = Effect.gen(function* () {
      const [VITE_API_URL, VITE_BLOCKFROST_KEY, VITE_SEED, VITE_MAESTRO_KEY] =
        yield* loadConfig;

      const user = yield* Effect.tryPromise(() =>
        Lucid(new Blockfrost(VITE_API_URL, VITE_BLOCKFROST_KEY), NETWORK),
      );

      user.selectWallet.fromSeed(VITE_SEED);

      const blockfrostUTXO = yield* Effect.promise(() =>
        user.wallet().getUtxos(),
      );
      const maestro = new Maestro({
        apiKey: VITE_MAESTRO_KEY,
        network: NETWORK as MaestroSupportedNetworks,
      });
      yield* Effect.tryPromise(() => user.switchProvider(maestro));
      const maestroUTXO = yield* Effect.promise(() => user.wallet().getUtxos());
      assert.deepStrictEqual(blockfrostUTXO, maestroUTXO);
    });
    try {
      await Effect.runPromise(program);
    } catch (error) {
      console.log(error);
    }
  });

  test("generateSeedPhrase", async () => {
    const seed = generateSeedPhrase();
    assert(seed);
    assert.equal(seed.split(" ").length, 24);
    assert.notEqual(generateSeedPhrase(), seed);
  });
  test("selectWallet.fromAddress", async () => {
    const program = Effect.gen(function* () {
      const [VITE_API_URL, VITE_BLOCKFROST_KEY, VITE_SEED, VITE_MAESTRO_KEY] =
        yield* loadConfig;

      const user = yield* Effect.tryPromise(() =>
        Lucid(new Blockfrost(VITE_API_URL, VITE_BLOCKFROST_KEY), NETWORK),
      );
      user.selectWallet.fromAddress(
        "addr_test1qrngfyc452vy4twdrepdjc50d4kvqutgt0hs9w6j2qhcdjfx0gpv7rsrjtxv97rplyz3ymyaqdwqa635zrcdena94ljs0xy950",
        [],
      );
      const rewardAddress = yield* Effect.promise(() =>
        user.wallet().rewardAddress(),
      );
      assert.strictEqual(
        rewardAddress,
        "stake_test1uqn85qk0pcpe9nxzlpsljpgjdjwsxhqwag6ppuxue7j6leg0huh4p",
      );
      const utxos = yield* Effect.promise(() => user.wallet().getUtxos());
      assert(utxos);
    });
    await Effect.runPromise(program);
  });

  test("selectWallet.fromPrivateKey", async () => {
    const privateKey = CML.PrivateKey.generate_ed25519().to_bech32();
    console.log("privateKey :>> ", privateKey);
    const program = Effect.gen(function* () {
      const privateKey = CML.PrivateKey.generate_ed25519().to_bech32();
      const [VITE_API_URL, VITE_BLOCKFROST_KEY] = yield* loadConfig;

      const user = yield* Effect.tryPromise(() =>
        Lucid(new Blockfrost(VITE_API_URL, VITE_BLOCKFROST_KEY), NETWORK),
      );
      user.selectWallet.fromPrivateKey(privateKey);

      const address = yield* Effect.promise(() => user.wallet().address());
      const addressDetails = getAddressDetails(address);
      const paymentCredential = addressDetails.paymentCredential;
      if (paymentCredential) {
        assert.equal(fromHex(paymentCredential.hash).length, 28);
      } else {
        assert.isNotNull(paymentCredential);
      }
    });
    await Effect.runPromise(program);
  });
});
