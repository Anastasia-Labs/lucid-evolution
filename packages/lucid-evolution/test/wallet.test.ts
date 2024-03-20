import { makeLucid } from "../src/lucid-evolution/MakeLucid";
import { assert, test } from "vitest";
import { Blockfrost, Maestro } from "@anastasia-labs/provider";

test("test wallet-provider", async () => {
  const user = await makeLucid(
    new Blockfrost(process.env.VITE_API_URL!, process.env.VITE_BLOCKFROST_KEY),
    "Preprod",
  );

  user.selectWallet.fromSeed(process.env.VITE_SEED!);

  const blockfrostUTXO = await user.wallet().getUtxos();

  user.switchProvider(
    new Maestro({
      apiKey: process.env.VITE_MAESTRO_KEY!,
      network: "Preprod",
    }),
  );

  const maestroUTXO = await user.wallet().getUtxos();

  assert.deepStrictEqual(blockfrostUTXO, maestroUTXO);
});
