import { assert, describe, expect, test } from "vitest";
import { Kupmios } from "../src/index.js";
import { ProtocolParameters } from "@lucid-evolution/core-types";
import { Config, Effect, Redacted } from "effect";

describe("Kupmios", async () => {
  // // Stop devkit
  // exec("~/.yaci-devkit/bin/devkit.sh stop &");
  // console.log("Stopped devkit");
  // // Wait for a delay before starting again (if necessary)
  // console.log("waiting 10 seconds");
  // await new Promise((resolve) => setTimeout(resolve, 10000)); // 10 seconds delay
  // // Start devkit
  // exec("~/.yaci-devkit/bin/devkit.sh start create-node -o --start &");
  // console.log("Started devkit");
  // // Wait for a delay before starting again (if necessary)
  // console.log("waiting 30 seconds");
  // await new Promise((resolve) => setTimeout(resolve, 30000)); // 30 seconds delay

  const kupmios = await Effect.gen(function* () {
    const kupo = yield* Config.redacted("VITE_KUPO_KEY");
    const ogmios = yield* Config.redacted("VITE_OGMIOS_KEY");
    return new Kupmios(Redacted.value(kupo), Redacted.value(ogmios));
  }).pipe(Effect.runPromise);

  test("getProtocolParameters", async () => {
    const pp: ProtocolParameters = await kupmios.getProtocolParameters();
    assert(pp);
  });

  test("getUtxos", async () => {
    const utxos = await kupmios.getUtxos(
      "addr_test1qrngfyc452vy4twdrepdjc50d4kvqutgt0hs9w6j2qhcdjfx0gpv7rsrjtxv97rplyz3ymyaqdwqa635zrcdena94ljs0xy950",
    );
    assert(utxos);
  });

  test("awaitTx", async () => {
    const isConfirmed: boolean = await kupmios.awaitTx(
      "2a1f95a9d85bf556a3dc889831593ee963ba491ca7164d930b3af0802a9796d0",
    );
    expect(isConfirmed).toBe(true);
  });
});
