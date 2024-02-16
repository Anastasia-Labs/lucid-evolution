import { Effect } from "effect";
import { Blockfrost, Lucid } from "../src/mod.js";
import { TxBuilder } from "../src/tx-builder/mod.js";

const projectId = "preprodOr3zZOkFc8Sqa5sp3aa9oGTb1wxulzhy";
const lucid = await Lucid.new(
  new Blockfrost("https://cardano-preprod.blockfrost.io/api/v0", projectId),
  "Preprod"
);

const seedPhrase =
  "truck typical feature program section horn quote dial retreat lecture force cattle space tonight toss sketch hamster science oyster dream head square upper prize";
lucid.selectWalletFromSeed(seedPhrase);
// console.log(await lucid.wallet.getUtxos())
const utxo = await lucid.wallet.getUtxos();
console.log(utxo);
const t = TxBuilder(lucid);
// const mintingPolicy = (time: number) =>
//   lucid.utils.nativeScriptFromJson({
//     type: "all",
//     scripts: [
//       {
//         type: "before",
//         slot: lucid.utils.unixTimeToSlot(Date.now() + time),
//       },
//     ],
//   });
// t.attachScript({ type: "Native", script: mintingPolicy(10_000_000).script });
// t.attachScript({ type: "Native", script: mintingPolicy(20_000_000).script });
// t.attachScript({ type: "Native", script: mintingPolicy(30_000_000).script });
// t.collectFrom(utxo, "");
// const a = await Effect.runPromise(Effect.all(t.config().programs));
// console.log(a)

// console.log(t.config().txBuilder.get_total_input().to_json())
const tx = await t
  .readFrom(utxo)
  .payToAddress(
    "addr_test1qp4cgm42esrud5njskhsr6uc28s6ljah0phsdqe7qmh3rfuyjgq5wwsca5camufxavmtnm8f6ywga3de3jkgmkwzma4sqv284l",
    { lovelace: 2_000n }
  )
  .payToAddressWithData(
    "addr_test1qp4cgm42esrud5njskhsr6uc28s6ljah0phsdqe7qmh3rfuyjgq5wwsca5camufxavmtnm8f6ywga3de3jkgmkwzma4sqv284l",
    {
      kind: "inline",
      value: "d87980",
    },
    { lovelace: 2_000_000n }
  )
  .complete()
  .unsafeRun();
console.log(tx)
// console.log("txComplete", tx.txComplete.to_json());

// const signed = await tx.sign().complete()

// console.log(await signed.submit());

// const then = performance.now();
// const eff = [];
// for (let index = 0; index < 10_000; index++) {
//   eff.push(t.readFrom([]).readFrom([]).readFrom([]).complete());
// }
// await Effect.runPromise(Effect.all(eff, { concurrency: 3000 }));

// // console.log(t.readFrom([]).readFrom([]).readFrom([]).complete());
// const now = performance.now();
// console.log(now - then);

// const then1 = performance.now();
// for (let index = 0; index < 100_000; index++) {
// lucid.newTx().readFrom([]).readFrom([]).readFrom([]);
// }
// const now1 = performance.now();
// console.log(now1 - then1);
