import { makeLucid } from "../src/lucid-evolution/MakeLucid";
import { assert, test } from "vitest";
import { Blockfrost, Maestro } from "@lucid-evolution/provider";

let setupFail = false;
const maestro = new Maestro({
  apiKey: process.env.VITE_MAESTRO_KEY!,
  network: "Preprod",
});
try {
  await maestro.getProtocolParameters();
  console.log("true");
} catch (error) {
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
