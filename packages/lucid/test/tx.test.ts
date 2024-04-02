import { isRight } from "effect/Either";
import {
  Blockfrost,
  Lucid,
  fromText,
  mintingPolicyToId,
  nativeJSFromJson,
  paymentCredentialOf,
  unixTimeToSlot,
} from "../src/index.js";
import { assert, test } from "vitest";
import { Effect } from "effect";

test.skip("test tx submit", async () => {
  const user = await Lucid(
    new Blockfrost(process.env.VITE_API_URL!, process.env.VITE_BLOCKFROST_KEY),
    "Preprod",
  );
  user.selectWallet.fromSeed(process.env.VITE_SEED!);

  const utxo = await user.wallet().getUtxos();

  const mkMintinPolicy = async (time: number) => {
    return nativeJSFromJson({
      type: "all",
      scripts: [
        {
          type: "sig",
          keyHash: paymentCredentialOf(await user.wallet().address()).hash,
        },
        {
          type: "before",
          slot: unixTimeToSlot("Preprod", time + Date.now()),
        },
      ],
    });
  };

  const mint = await mkMintinPolicy(9_000_000);
  const policy = mintingPolicyToId(mint);

  const tx = user
    .newTx()
    .readFrom(utxo)
    .pay.ToAddress(
      "addr_test1qp4cgm42esrud5njskhsr6uc28s6ljah0phsdqe7qmh3rfuyjgq5wwsca5camufxavmtnm8f6ywga3de3jkgmkwzma4sqv284l",
      { lovelace: 2_000_000n },
    )
    .pay.ToAddressWithData(
      "addr_test1qp4cgm42esrud5njskhsr6uc28s6ljah0phsdqe7qmh3rfuyjgq5wwsca5camufxavmtnm8f6ywga3de3jkgmkwzma4sqv284l",
      {
        kind: "inline",
        value: "d87980",
      },
      { lovelace: 2_000_000n },
    )
    .mintAssets({ [policy + fromText("MyMintedToken")]: 1n })
    .validTo(Date.now() + 900000)
    .attach.MintingPolicy(mint)
    .complete()
    .program();

  const signed = await tx.pipe(
    Effect.flatMap((tx) => tx.sign.withWallet().complete().program()),
    //NOTE: enable if you want to submit signed tx on preprod
    // Effect.flatMap((signedTx) => Effect.promise(() => signedTx.submit()!)),
    // Effect.flatMap((txHash) => Effect.log(txHash)),
    Effect.either,
    Effect.runPromise,
  );

  assert.deepStrictEqual(isRight(signed), true);
});
