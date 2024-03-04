import { isRight } from "effect/Either";
import { Blockfrost, Lucid, fromText } from "../src/mod.js";
import { TxBuilder } from "../src/tx-builder/mod.js";
import { nativeJSFromJson } from "../src/tx-builder/Native.js";
import { assert, expect, test } from "vitest";
import { Effect } from "effect";

test("test tx submit", async () => {
  const projectId = process.env.VITE_BLOCKFROST_KEY;
  const lucid = await Lucid.new(
    new Blockfrost(process.env.VITE_API_URL!, projectId),
    "Preprod"
  );
  const seedPhrase = process.env.VITE_SEED!;
  lucid.selectWalletFromSeed(seedPhrase);
  const utxo = await lucid.wallet.getUtxos();

  const txBuilder = TxBuilder(lucid);

  const mkMintinPolicy = async (time: number) => {
    return nativeJSFromJson({
      type: "all",
      scripts: [
        {
          type: "sig",
          keyHash: lucid.utils.paymentCredentialOf(await lucid.wallet.address())
            .hash,
        },
        {
          type: "before",
          slot: lucid.utils.unixTimeToSlot(time + Date.now()),
        },
      ],
    });
  };

  const mint = await mkMintinPolicy(9_000_000);
  const policy = lucid.utils.mintingPolicyToId(mint);

  const tx = txBuilder
    .readFrom(utxo)
    .payToAddress(
      "addr_test1qp4cgm42esrud5njskhsr6uc28s6ljah0phsdqe7qmh3rfuyjgq5wwsca5camufxavmtnm8f6ywga3de3jkgmkwzma4sqv284l",
      { lovelace: 2_000_000n }
    )
    .payToAddressWithData(
      "addr_test1qp4cgm42esrud5njskhsr6uc28s6ljah0phsdqe7qmh3rfuyjgq5wwsca5camufxavmtnm8f6ywga3de3jkgmkwzma4sqv284l",
      {
        kind: "inline",
        value: "d87980",
      },
      { lovelace: 2_000_000n }
    )
    .mintAssets({ [policy + fromText("MyMintedToken")]: 1n })
    .validTo(Date.now() + 900000)
    .attachMintingPolicy(mint)
    .complete()
    .program();

  const signed = await tx.pipe(
    Effect.flatMap((tx) => Effect.promise(() => tx.sign().complete())),
    //NOTE: enable if you want to submit signed tx on preprod
    // Effect.flatMap((signedTx) => Effect.promise(() => signedTx.submit())),
    // Effect.flatMap((txHash) => Effect.log(txHash)),
    Effect.either,
    Effect.runPromise
  );

  assert.deepStrictEqual(isRight(signed), true);
});
