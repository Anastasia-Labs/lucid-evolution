import { expect, it } from "vitest";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";
import { coreToUtxo, utxoToCore } from "../src/index.js";
import { UTxO } from "@evolution-sdk/core-types";

it("should deserialize CBOR UTXO data from the first sample", () => {
  const cmlUTXO = CML.TransactionUnspentOutput.from_cbor_hex(
    "8282582095cdc0b23b21f9f0ac5b2580b025c4bc64034ff5e9d97f8ecb51d78151a3223f18228258390115c2e6ade9b92c86a252f6fb1d2a01b2d70a6a5db943fd368bd30c6fc28ad299e38676d1647f6d8f31234c34a914d8488ff86ca2d5df70df821a00116d86a1581cffbe813449ec642880ec645af88a4df2f586b0b677c44ecf4a1ef834a145414d494c4b01",
  );
  const utxo: UTxO = {
    txHash: "95cdc0b23b21f9f0ac5b2580b025c4bc64034ff5e9d97f8ecb51d78151a3223f",
    outputIndex: 34,
    assets: {
      lovelace: 1142150n,
      ffbe813449ec642880ec645af88a4df2f586b0b677c44ecf4a1ef834414d494c4b: 1n,
    },
    address:
      "addr1qy2u9e4daxujep4z2tm0k8f2qxedwzn2tku58lfk30fscm7z3tffncuxwmgkglmd3ucjxnp54y2dsjy0lpk294wlwr0sxr75jl",
    datumHash: undefined,
    datum: undefined,
    scriptRef: undefined,
  };
  expect(coreToUtxo(cmlUTXO)).toStrictEqual(utxo);
});

it("should deserialize CBOR UTXO data from the second sample", () => {
  const cmlUTXO = CML.TransactionUnspentOutput.from_cbor_hex(
    "8282582037e57c21550383d404248c67c6611f64d2db8e33ea08d81090324b34ac44a9c600a300581d70c1fe430f19ac248a8a7ea47db106002c4327e542c3fdc60ad6481103011a00989680028201d8185821d87981581ce6849315a2984aadcd1e42d9628f6d6cc071685bef02bb52502f86c9",
  );
  const utxo: UTxO = {
    txHash: "37e57c21550383d404248c67c6611f64d2db8e33ea08d81090324b34ac44a9c6",
    outputIndex: 0,
    assets: { lovelace: 10000000n },
    address: "addr_test1wrqlusc0rxkzfz5206j8mvgxqqkyxfl9gtplm3s26eypzqcxsnfs3",
    datumHash: undefined,
    datum: "d87981581ce6849315a2984aadcd1e42d9628f6d6cc071685bef02bb52502f86c9",
    scriptRef: undefined,
  };
  expect(coreToUtxo(cmlUTXO)).toStrictEqual(utxo);
});

it("should deserialize to utxo withn datumHash", () => {
  const utxo: UTxO = {
    txHash: "f061f4e8490472008182fc922e8ecd414f2fa5005ea218202bd324fbe8746919",
    outputIndex: 0,
    address: "addr_test1wqn7wnkhny2j475ac709vg3kw6wf59f3hdl3htfpwg8xmtqtxyz6a",
    assets: { lovelace: 10000000n },
    datumHash:
      "48300c087b5dbc6198ed7cfbd5c04028360e0d9270eec318addbae8b6305a909",
    datum:
      "d8799f581c9fc430ea1f3adc20eebb813b2649e85c934ea5bc13d7b7fbe2b24e50ff",
    scriptRef: undefined,
  };
  expect(coreToUtxo(utxoToCore(utxo))).toStrictEqual({
    txHash: "f061f4e8490472008182fc922e8ecd414f2fa5005ea218202bd324fbe8746919",
    outputIndex: 0,
    assets: { lovelace: 10000000n },
    address: "addr_test1wqn7wnkhny2j475ac709vg3kw6wf59f3hdl3htfpwg8xmtqtxyz6a",
    datumHash:
      "48300c087b5dbc6198ed7cfbd5c04028360e0d9270eec318addbae8b6305a909",
    datum: undefined,
    scriptRef: undefined,
  });
});
