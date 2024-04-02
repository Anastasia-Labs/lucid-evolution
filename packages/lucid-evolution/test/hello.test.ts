import { SpendingValidator } from "@lucid-evolution/core-types";
import {
  Blockfrost,
  Constr,
  Data,
  Lucid,
  fromText,
  getAddressDetails,
  toHex,
  validatorToAddress,
} from "../src";
import { test } from "vitest";
import { Effect } from "effect";
import { encode } from "cborg";
import { isRight } from "effect/Either";
import { applyDoubleCborEncoding, fromHex } from "lucid-cardano";
const helloCBOR =
  "58e901000032323232323223223225333006323253330083371e6eb8c008c028dd5002a4410d48656c6c6f2c20576f726c642100100114a06644646600200200644a66601c00229404c94ccc030cdc79bae301000200414a226600600600260200026eb0c02cc030c030c030c030c030c030c030c030c024dd5180098049baa002375c600260126ea80188c02c0045261365653330043370e900018029baa001132325333009300b002149858dd7180480098031baa0011653330023370e900018019baa0011323253330073009002149858dd7180380098021baa001165734aae7555cf2ab9f5742ae881";
// console.log(helloCBOR)
console.log(toHex(encode(fromHex(helloCBOR))));
console.log(applyDoubleCborEncoding(helloCBOR));

const hello: SpendingValidator = {
  type: "PlutusV2",
  script: applyDoubleCborEncoding(helloCBOR),
};
const hello2: SpendingValidator = {
  type: "PlutusV2",
  script: toHex(encode(fromHex(helloCBOR))),
};
const user = await Lucid(
  new Blockfrost(process.env.VITE_API_URL!, process.env.VITE_BLOCKFROST_KEY),
  "Preprod",
);
user.selectWallet.fromSeed(process.env.VITE_SEED!);
const contractAddress = validatorToAddress("Preprod", hello);

test.skip("", async () => {
  console.log("user utxos", await user.wallet().getUtxos());
  const publicKeyHash = getAddressDetails(await user.wallet().address())
    .paymentCredential?.hash;
  const datum = Data.to(new Constr(0, [publicKeyHash!]));

  const tx = user
    .newTx()
    .pay.ToAddressWithData(
      contractAddress,
      {
        kind: "inline",
        value: datum,
      },
      { lovelace: 10_000_000n },
    )
    .complete()
    .program();

  const txhash = await tx.pipe(
    Effect.flatMap((tx) => tx.sign.withWallet().complete().program()),
    //NOTE: enable if you want to submit signed tx on preprod
    Effect.flatMap((signedTx) => Effect.promise(() => signedTx.submit()!)),
    Effect.flatMap((txHash) => Effect.log(txHash)),
    Effect.either,
    Effect.runPromise,
  );
  // console.log(signed)
  // const txHash = await signed.submit();
  console.log(txhash);
});

test.skip("collect", async () => {
  console.log(
    getAddressDetails(await user.wallet().address()).paymentCredential?.hash,
  );
  const utxos = await user.utxosAt(contractAddress);
  console.log("contract utxos", utxos);
  console.log("user utxos", await user.wallet().getUtxos());
  const redeemer = Data.to(new Constr(0, [fromText("Hello, World!")]));
  const tx = user
    .newTx()
    .collectFrom(utxos, redeemer)
    .attach.SpendingValidator(hello)
    .addSigner(await user.wallet().address())
    // .pay.ToAddress(await user.wallet().address(), utxos[0].assets)
    .complete()
    .program();

  const txhash = await tx.pipe(
    Effect.flatMap((tx) => tx.sign.withWallet().complete().program()),
    //NOTE: enable if you want to submit signed tx on preprod
    Effect.flatMap((signedTx) => Effect.promise(() => signedTx.submit()!)),
    Effect.flatMap((txHash) => Effect.log(txHash)),
    Effect.either,
    Effect.runPromise,
  );
  // console.log(signed)
  // const txHash = await signed.submit();
  console.log(txhash);
});
