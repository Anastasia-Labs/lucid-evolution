import { isRight } from "effect/Either";
import { Blockfrost, Lucid, fromText } from "../src/mod.js";
import { nativeJSFromJson } from "../src/tx-builder/Native.js";
import { assert, expect, test } from "vitest";
import { Effect } from "effect";
import { makeLucid } from "../src/lucid-evolution/MakeLucid.js";
import {
  mintingPolicyToId,
  paymentCredentialOf,
  unixTimeToSlot,
} from "@anastasia-labs/utils";

test("test tx submit", async () => {
  const user = await makeLucid(
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
    .payToAddress(
      "addr_test1qp4cgm42esrud5njskhsr6uc28s6ljah0phsdqe7qmh3rfuyjgq5wwsca5camufxavmtnm8f6ywga3de3jkgmkwzma4sqv284l",
      { lovelace: 2_000_000n },
    )
    .payToAddressWithData(
      "addr_test1qp4cgm42esrud5njskhsr6uc28s6ljah0phsdqe7qmh3rfuyjgq5wwsca5camufxavmtnm8f6ywga3de3jkgmkwzma4sqv284l",
      {
        kind: "inline",
        value: "d87980",
      },
      { lovelace: 2_000_000n },
    )
    .mintAssets({ [policy + fromText("MyMintedToken")]: 1n })
    .validTo(Date.now() + 900000)
    .attachMintingPolicy(mint)
    .complete()
    .program();

  const signed = await tx.pipe(
    Effect.flatMap((tx) => Effect.promise(() => tx.sign().complete().unSafe())),
    //NOTE: enable if you want to submit signed tx on preprod
    // Effect.flatMap((signedTx) => Effect.promise(() => signedTx.submit()!)),
    // Effect.flatMap((txHash) => Effect.log(txHash)),
    Effect.either,
    Effect.runPromise,
  );

  assert.deepStrictEqual(isRight(signed), true);
});
