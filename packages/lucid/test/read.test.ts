import { Blockfrost, Data, Lucid } from "../src";
import { test } from "vitest";

test.skip("", async () => {
  const blockfrostClient = new Blockfrost(
    "https://cardano-preview.blockfrost.io/api/v0",
    "previeweVx9bfztIYv2dQDNaIey78pYZa5R1cwD",
  );
  const lucid = await Lucid(blockfrostClient, "Preview");
  lucid.selectWallet.fromSeed(
    "fault emerge ignore athlete extend awful elevator version anchor print balance asset exit main lawn embrace fresh stock marine exhibit plug bulb brown own",
  );
  console.log("wallet", await lucid.wallet().getUtxos());

  const referenceUtxo = await lucid.config().provider.getUtxosByOutRef([
    {
      txHash:
        "82e7912b2e498c01cee6e29c04049854829fe43b307a8a63d36b33ca5b3df0d1",
      outputIndex: 0,
    },
  ]);
  // const utxo = await lucid.config().provider.getUtxos("addr_test1qqqgwvua0wvvfgc0z873sns9449g0hx82wtkhd9mxwwk58w7gge0mmwy7wu6j7pqm84nlpzayuuy9yakdzxfkmer5eps463l00")
  console.log("reference utxo", referenceUtxo);
  console.log(
    "consume input",
    await lucid.config().provider.getUtxosByOutRef([
      {
        txHash:
          "9edf5d6cf3b38ad118d1fae6cb1a7a7f81902d482e8f269af4466043d369aa00",
        outputIndex: 0,
      },
    ]),
  );

  try {
    const tx = await lucid
      .newTx()
      .collectFrom(
        await lucid.config().provider.getUtxosByOutRef([
          {
            txHash:
              "9edf5d6cf3b38ad118d1fae6cb1a7a7f81902d482e8f269af4466043d369aa00",
            outputIndex: 0,
          },
        ]),
        Data.void(),
      )
      .readFrom(referenceUtxo)
      .complete();
    const signed = await tx.sign.withWallet().complete();
    console.log(signed.toCBOR());
  } catch (error) {
    console.log(error.stack);
  }
});
