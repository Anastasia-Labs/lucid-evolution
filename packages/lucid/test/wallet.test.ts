import { assert, describe, test } from "vitest";
import {
  Blockfrost,
  generateSeedPhrase,
  Lucid,
  Maestro,
} from "../src/index.js";
import { Config, Effect } from "effect";

const loadConfig = Effect.gen(function* () {
  return yield* Config.all([
    Config.string("VITE_API_URL"),
    Config.string("VITE_BLOCKFROST_KEY"),
    Config.string("VITE_SEED"),
    Config.string("VITE_MAESTRO_KEY"),
  ]);
});

describe("Wallet", () => {
  test("switchProvider", async () => {
    const program = Effect.gen(function* () {
      const [VITE_API_URL, VITE_BLOCKFROST_KEY, VITE_SEED, VITE_MAESTRO_KEY] =
        yield* loadConfig;

      const user = yield* Effect.tryPromise(() =>
        Lucid(new Blockfrost(VITE_API_URL, VITE_BLOCKFROST_KEY), "Preprod"),
      );

      user.selectWallet.fromSeed(VITE_SEED);

      const blockfrostUTXO = yield* Effect.promise(() =>
        user.wallet().getUtxos(),
      );
      const maestro = new Maestro({
        apiKey: VITE_MAESTRO_KEY,
        network: "Preprod",
      });
      yield* Effect.tryPromise(() => user.switchProvider(maestro));
      const maestroUTXO = yield* Effect.promise(() => user.wallet().getUtxos());
      assert.deepStrictEqual(blockfrostUTXO, maestroUTXO);
    });
    await Effect.runPromise(program);
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
        Lucid(new Blockfrost(VITE_API_URL, VITE_BLOCKFROST_KEY), "Preprod"),
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
      assert.deepStrictEqual(utxos, []);
    });
    await Effect.runPromise(program);
  });
});
