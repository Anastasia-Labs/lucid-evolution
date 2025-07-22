import {
  applyDoubleCborEncoding,
  applyParamsToScript,
  Blockfrost,
  Data,
  Emulator,
  fromText,
  Kupmios,
  Lucid,
  Script,
  sleep,
  validatorToAddress,
} from "@evolution-sdk/lucid";
import _ from "lodash";

async function component() {
  const element = document.createElement("div");
  const network = "Preprod";
  const lucid = await Lucid(
    new Blockfrost(
      "https://cardano-preprod.blockfrost.io/api/v0",
      "preprod...", // Replace with your Blockfrost API key
    ),
    network,
  );
  // const lucid = await Lucid(
  //   new Kupmios(
  //     "https://kupo...", // Kupo API URL
  //     "https://ogmios" // Ogmios API URL
  //   ),
  //   network
  // );
  const api = await window.cardano["eternl"].enable();
  lucid.selectWallet.fromAPI(api);
  const alwaysSucceedScript: Script = {
    type: "PlutusV3",
    script: applyDoubleCborEncoding(
      "588e01010029800aba2aba1aab9eaab9dab9cab9a48888896600264653001300700198039804000cc01c0092225980099b8748008c020dd500144c8cc894cc0292410968656c6c6f203838380014a260160026016601800260126ea800a2c8030600e00260086ea801e293454cc00924011856616c696461746f722072657475726e65642066616c7365001365640041",
    ),
  };
  const alwaysSucceedAddress = validatorToAddress(network, alwaysSucceedScript);
  console.log("alwaysSucceedAddress :>> ", alwaysSucceedAddress);

  // Deposit some funds to the always succeed address
  const depositTx = await lucid
    .newTx()
    .pay.ToContract(
      alwaysSucceedAddress,
      { kind: "inline", value: Data.void() },
      {
        lovelace: 10_000_000n,
      },
    )
    .complete();
  const signedTx = await depositTx.sign.withWallet().complete();
  const txHash = await signedTx.submit();
  console.log("Transaction submitted: ", txHash);
  await lucid.awaitTx(txHash, 60_000);
  await sleep(10_000);

  // Collect the UTxOs from the always succeed address
  const now = Date.now();
  const utxos = await lucid.utxosAt(alwaysSucceedAddress);
  console.log("UTxOs at always succeed address: ", utxos.length);
  const collectTx = await lucid
    .newTx()
    .collectFrom([utxos[0]], Data.void())
    .attach.SpendingValidator(alwaysSucceedScript)
    .validFrom(now - 60_000)
    .validTo(now + 3_600_000)
    .complete();
  const signedCollectTx = await collectTx.sign.withWallet().complete();
  console.log("signedCollectTx. :>> ", signedCollectTx.toCBOR());
  const collectTxHash = await signedCollectTx.submit();
  console.log("Collect transaction submitted: ", collectTxHash);
  await lucid.awaitTx(collectTxHash, 60_000);

  // Lodash, now imported by this script
  element.innerHTML = _.join(["Hello", "webpack"], " ");

  return element;
}

document.body.appendChild(await component());
