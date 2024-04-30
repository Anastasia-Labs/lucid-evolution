import { assert, describe, expect, test } from "vitest";
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
    Effect.gen(function* () {
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
    }).pipe(Effect.runPromise);
  });

  test("generateSeedPhrase", async () => {
    const seed = generateSeedPhrase();
    assert(seed);
    assert.equal(seed.split(" ").length, 24);
    assert.notEqual(generateSeedPhrase(), seed);
  });
});
