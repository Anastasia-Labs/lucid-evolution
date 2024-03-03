import { Effect } from "effect";
import {
  Blockfrost,
  Lucid,
  ScriptType,
  fromHex,
  fromText,
  toHex,
} from "../src/mod.js";
import { TxBuilder } from "../src/tx-builder/mod.js";
import * as CML from "@dcspark/cardano-multiplatform-lib-nodejs";
import { nativeJSFromJson } from "../src/tx-builder/Native.js";

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
// console.log(utxo);
const t = TxBuilder(lucid);

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

// console.log(t.config().txBuilder.get_total_input().to_json())
const mint = await mkMintinPolicy(9_000_000);
// console.log(mint.script);
const policy = lucid.utils.mintingPolicyToId(mint);
// console.log(policy);

const tx = await t
  // .readFrom(utxo)
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
  .unsafeRun();
console.log("txHash", tx.toHash());
// console.log("txComplete", tx.txComplete.body().to_json());
// console.log("unsigned",tx.toString());

const signed = await tx.sign().complete();
// console.log(signed.txSigned.to_json())
console.log(await signed.submit());

// const unsignedTxfromLucidEvol = "84a500838258200d31e3060edc0422bab792b414b6920534fb61f72a24cb76c911fea670601518008258205a4a961c2ff22b870f06f5303dcfffaaf3afdb819b12f5f0e60f0540e0e7490700825820f9178e7551be72eb512f8b1b739346c84e9cda4ef8be4feada9bfff6fe47e80000018182583900bc83d1474fafc0669e360c6ef389d3874f5eff99c31f343ff2cdab0bcb68eb5507f1a2a0cb4ddb095125f0f9878568cfe2466f2969db1ed3821a02050c95a9581c748a7026de606c27c06e4b90cb2e1844b566b89fba0d282debe4b40aa14d4d794d696e746564546f6b656e01581ca11c0e63717ac9d8d7bd50c6b29111003e765d199915a02613069641a14d4d794d696e746564546f6b656e181e581ca49d85bfbd193446051e644e7ad448682a1bc1b02d5a15f78429a1f0a14d4d794d696e746564546f6b656e0a581cc7e5e285a6ca1fdd6b8b0293b4d825a9c92ae69f8fc35ae2252a697da14d4d794d696e746564546f6b656e0a581cfed7a8ee8af612b08a05304ba434ef18f37be06f144fbc190d377942a14d4d794d696e746564546f6b656e0a581c92db8682a9e00473968130a7d3ee6d1bd331812543a8584ba739c74ca14d4d794d696e746564546f6b656e01581cd3c9b677c3e599ac2eb0a455e4d5d027d5ef860caf72b5dc27ba0e16a14d4d794d696e746564546f6b656e01581ce2085cebe2ce09d4ec0cbfe965f332941686c9288199440d45e95ff0a14d4d794d696e746564546f6b656e01581c2fce0a65bac1267022f94296e3d55fb862979b13bed38521a31cd200a14d4d794d696e746564546f6b656e01021a0002fb89031a0333a0f509a1581c2fce0a65bac1267022f94296e3d55fb862979b13bed38521a31cd200a14d4d794d696e746564546f6b656e01a101818201828200581cbc83d1474fafc0669e360c6ef389d3874f5eff99c31f343ff2cdab0b82051a0333c099f5f6"

// const lucidevol = await lucid.fromTx(unsignedTxfromLucidEvol).sign().complete()
// console.log("signed",lucidevol.txSigned.to_json());
// const result = isEqual(fromHex(toHex(lucidevol.txSigned.to_cbor_bytes())) , lucidevol.txSigned.to_cbor_bytes())
// console.log(result)
// console.log(fromHex(toHex(lucidevol.txSigned.to_cbor_bytes())))
// console.log(fromHex(lucidevol.txSigned.to_cbor_hex()))
// console.log(await lucidevol.submit())

// This tx from lucid works
// const signed2 = await lucid.fromTx("84a500818258200d31e3060edc0422bab792b414b6920534fb61f72a24cb76c911fea67060151801018282583900bc83d1474fafc0669e360c6ef389d3874f5eff99c31f343ff2cdab0bcb68eb5507f1a2a0cb4ddb095125f0f9878568cfe2466f2969db1ed3821a0011f436a1581c2fe05358b9e7016f454c25f1e2be181759ff9150ce633e132ba51f0fa14d4d794d696e746564546f6b656e0182583900bc83d1474fafc0669e360c6ef389d3874f5eff99c31f343ff2cdab0bcb68eb5507f1a2a0cb4ddb095125f0f9878568cfe2466f2969db1ed31a01c8bf03021a0002a935031a03329c4409a1581c2fe05358b9e7016f454c25f1e2be181759ff9150ce633e132ba51f0fa14d4d794d696e746564546f6b656e01a200818258204f26d9d8185481167e5647039d4f390c8c74a5fbca1f115709a2998e93180f395840738d6fc3fbd9a35fa2aabbbddc8f4297f1b990a349450734040cc7af259ebfa250966b0d754036615f66bace4c35166d342929dcca1f451cd94c991cbcf6920101818201828200581cbc83d1474fafc0669e360c6ef389d3874f5eff99c31f343ff2cdab0b8205192710f5f6").sign().complete()
// console.log(signed2, signed2.txSigned.to_json())
// console.log("signed2", signed2.toString())
// console.log(await signed2.submit())

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

function isEqual(arr1: Uint8Array, arr2: Uint8Array): boolean {
  if (arr1.length !== arr2.length) {
    return false;
  }

  return arr1.every((value, index) => value === arr2[index]);
}
