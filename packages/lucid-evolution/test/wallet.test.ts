import { assert, test } from "vitest";
import { Blockfrost, Maestro, makeLucid } from "../src/index.js";

let setupFail = false;
const maestro = new Maestro({
  apiKey: process.env.VITE_MAESTRO_KEY!,
  network: "Preprod",
});
try {
  console.log(await maestro.getProtocolParameters())
} catch (error) {
  console.log()
  setupFail = true;
}

test.skipIf(setupFail)("test wallet-provider", async () => {
  const user = await makeLucid(
    new Blockfrost(process.env.VITE_API_URL!, process.env.VITE_BLOCKFROST_KEY),
    "Preprod",
  );
  user.selectWallet.fromSeed(process.env.VITE_SEED!);

  const blockfrostUTXO = await user.wallet().getUtxos();

  await user.switchProvider(maestro);

  const maestroUTXO = await user.wallet().getUtxos();

  assert.deepStrictEqual(blockfrostUTXO, maestroUTXO);
});
