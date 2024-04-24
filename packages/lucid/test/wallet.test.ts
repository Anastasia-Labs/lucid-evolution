import { assert, test } from "vitest";
import { Blockfrost, Lucid, Maestro } from "../src/index.js";
import { generateSeedPhrase } from "../src/index.js";

let setupFail = false;
const maestro = new Maestro({
  apiKey: process.env.VITE_MAESTRO_KEY!,
  network: "Preprod",
});
try {
  const protocol = await maestro.getProtocolParameters();
  // console.log(protocol);
} catch (error) {
  console.log();
  setupFail = true;
}

test.skip("test wallet-provider", async () => {
  const user = await Lucid(
    new Blockfrost(process.env.VITE_API_URL!, process.env.VITE_BLOCKFROST_KEY),
    "Preprod",
  );
  user.selectWallet.fromSeed(process.env.VITE_SEED!);

  const blockfrostUTXO = await user.wallet().getUtxos();

  await user.switchProvider(maestro);

  const maestroUTXO = await user.wallet().getUtxos();

  assert.deepStrictEqual(blockfrostUTXO, maestroUTXO);
});

test("generateSeedPhrase", async () => {
  const seed = generateSeedPhrase();
  assert(seed);
  assert.equal(seed.split(" ").length, 24);
  assert.notEqual(generateSeedPhrase(), seed);
});
