import {
  applyDoubleCborEncoding,
  applyParamsToScript,
  Blockfrost,
  Emulator,
  fromText,
  Lucid,
} from "@lucid-evolution/lucid";
import _ from "lodash";

async function component() {
  const element = document.createElement("div");
  const lucid = await Lucid(new Emulator([]), "Preprod");
  const helloWorldCBOR =
    "58b00100003232323232322322322232253330093232533300b3371e6eb8c008c034dd500280388008a5032330010013758601e60206020602060206020602060206020601a6ea8c008c034dd50019129998078008a50132533300d3371e6eb8c04400802c5288998018018009808800918070008a4c26caca66600e66e1d20003008375400226464a666018601c0042930b1bae300c001300937540022c6eb8004dd7000ab9a5573aaae7955cfaba157441";
  const applied = applyParamsToScript(helloWorldCBOR, [
    "deadbeef",
    fromText("Hello, World!"),
  ]);
  console.log(applied);
  const helloFlat =
    "01000032323232323223223225333006323253330083371e6eb8c008c028dd5002a4410d48656c6c6f2c20576f726c642100100114a06644646600200200644a66601c00229404c94ccc030cdc79bae301000200414a226600600600260200026eb0c02cc030c030c030c030c030c030c030c030c024dd5180098049baa002375c600260126ea80188c02c0045261365653330043370e900018029baa001132325333009300b002149858dd7180480098031baa0011653330023370e900018019baa0011323253330073009002149858dd7180380098021baa001165734aae7555cf2ab9f5742ae881";
  const helloCBORDoubleEncoded =
    "58eb58e901000032323232323223223225333006323253330083371e6eb8c008c028dd5002a4410d48656c6c6f2c20576f726c642100100114a06644646600200200644a66601c00229404c94ccc030cdc79bae301000200414a226600600600260200026eb0c02cc030c030c030c030c030c030c030c030c024dd5180098049baa002375c600260126ea80188c02c0045261365653330043370e900018029baa001132325333009300b002149858dd7180480098031baa0011653330023370e900018019baa0011323253330073009002149858dd7180380098021baa001165734aae7555cf2ab9f5742ae881";
  console.log(applyDoubleCborEncoding(helloFlat) === helloCBORDoubleEncoded);

  const api = await window.cardano["eternl"].enable();
  lucid.selectWallet.fromAPI(api);

  const rewardAddress = await lucid.wallet().rewardAddress();
  console.log("rewardAddress :>> ", rewardAddress);
  const signBuilder = await lucid
    .newTx()
    .registerStake(rewardAddress)
    .setMinFee(300000n)
    .complete();
  const signed = await signBuilder.sign.withWallet().complete();
  const txHash = await signed.submit();
  console.log("txHash :>> ", txHash);
  console.log(`🚀 Transaction submitted: ${txHash}`);
  console.log(`Confirming Transaction...`);
  await lucid.awaitTx(txHash, 40_000);

  const vote = await lucid
    .newTx()
    .delegate.VoteToDRep(rewardAddress, {
      __typename: "AlwaysAbstain",
    })
    .complete();

  const voteSigned = await vote.sign.withWallet().complete();
  const voteTxHash = await voteSigned.submit();
  console.log(`🚀 Transaction submitted: ${voteTxHash}`);
  console.log(`Confirming Transaction...`);
  await lucid.awaitTx(voteTxHash, 40_000);
  // Lodash, now imported by this script
  element.innerHTML = _.join(["Hello", "webpack"], " ");

  return element;
}

document.body.appendChild(await component());
