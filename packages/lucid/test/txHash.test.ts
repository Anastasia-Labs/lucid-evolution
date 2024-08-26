import { expect, test } from "vitest";
import { Blockfrost, Lucid } from "../src/index.js";
import { NETWORK } from "./specs/services.js";

test("test txHash", async () => {
  const projectId = process.env.VITE_BLOCKFROST_KEY_PREPROD;
  const lucid = await Lucid(
    new Blockfrost(process.env.VITE_BLOCKFROST_API_URL_PREPROD!, projectId),
    NETWORK,
  );
  const seedPhrase = process.env.VITE_WALLET_SEED!;
  lucid.selectWallet.fromSeed(seedPhrase);
  const signed2 = await lucid
    .fromTx(
      "84a500818258200d31e3060edc0422bab792b414b6920534fb61f72a24cb76c911fea67060151801018282583900bc83d1474fafc0669e360c6ef389d3874f5eff99c31f343ff2cdab0bcb68eb5507f1a2a0cb4ddb095125f0f9878568cfe2466f2969db1ed3821a0011f436a1581c2fe05358b9e7016f454c25f1e2be181759ff9150ce633e132ba51f0fa14d4d794d696e746564546f6b656e0182583900bc83d1474fafc0669e360c6ef389d3874f5eff99c31f343ff2cdab0bcb68eb5507f1a2a0cb4ddb095125f0f9878568cfe2466f2969db1ed31a01c8bf03021a0002a935031a03329c4409a1581c2fe05358b9e7016f454c25f1e2be181759ff9150ce633e132ba51f0fa14d4d794d696e746564546f6b656e01a200818258204f26d9d8185481167e5647039d4f390c8c74a5fbca1f115709a2998e93180f395840738d6fc3fbd9a35fa2aabbbddc8f4297f1b990a349450734040cc7af259ebfa250966b0d754036615f66bace4c35166d342929dcca1f451cd94c991cbcf6920101818201828200581cbc83d1474fafc0669e360c6ef389d3874f5eff99c31f343ff2cdab0b8205192710f5f6",
    )
    .sign.withWallet()
    .complete();

  expect(
    signed2.toHash() ===
      "ca41dbd2f3d485def8fe92454cc98d0163aa21abfc7287fc9766d4ce74a2ee04",
  );
});
