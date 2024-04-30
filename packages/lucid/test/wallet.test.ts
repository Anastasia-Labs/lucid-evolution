import { assert, describe, expect, test } from "vitest";
import {
  Blockfrost,
  generateSeedPhrase,
  Lucid,
  Maestro,
} from "../src/index.js";
import { Config, Console, Effect, pipe } from "effect";

describe("Wallet", () => {
  test("switchProvider", async () => {
    const program = Effect.gen(function* () {
      const [VITE_API_URL, VITE_BLOCKFROST_KEY, VITE_SEED, VITE_MAESTRO_KEY] =
        yield* Config.all([
          Config.string("VITE_API_URL"),
          Config.string("VITE_BLOCKFROST_KEY"),
          Config.string("VITE_SEED"),
          Config.string("VITE_MAESTRO_KEY"),
        ]);
      const user = yield* Effect.tryPromise(() =>
        Lucid(new Blockfrost(VITE_API_URL, VITE_BLOCKFROST_KEY), "Preprod")
      );
      user.selectWallet.fromSeed(VITE_SEED);

      const blockfrostUTXO = yield* Effect.promise(() =>
        user.wallet().getUtxos()
      );
      const maestro = new Maestro({
        apiKey: VITE_MAESTRO_KEY,
        network: "Preprod",
      });
      yield* Effect.tryPromise(() => user.switchProvider(maestro));
      const maestroUTXO = yield* Effect.promise(() => user.wallet().getUtxos());
      yield* pipe(
        Effect.tryPromise(() => maestro.getProtocolParameters()),
        Effect.tap(Console.log)
      );
      yield* Console.log(blockfrostUTXO);
      yield* Console.log(maestroUTXO);
    }).pipe(Effect.tapErrorCause(Console.log));
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("generateSeedPhrase", async () => {
    const seed = generateSeedPhrase();
    assert(seed);
    assert.equal(seed.split(" ").length, 24);
    assert.notEqual(generateSeedPhrase(), seed);
  });
});
