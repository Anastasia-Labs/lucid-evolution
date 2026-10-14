import { describe, expect, test } from "vitest";
import * as S from "effect/Schema";
import * as _Koios from "../src/internal/koios.js";

// Regression test for https://github.com/Anastasia-Labs/lucid-evolution/issues/677
//
// Koios serializes the `asset_list` of a transaction's collateral output as a
// JSON-encoded string ("[]") instead of a JSON array, unlike every other
// input/output in the same `tx_info` response. Decoding such a response with
// TxInfoSchema used to fail with a ParseError, which made `utxosByOutRef`
// throw for any outRef produced by a transaction with a collateral output.
//
// The fixture below is the verbatim `tx_info` response for preprod tx
// 5714bd67aaeb664c3d2060ac34a33b66c2f4ec82e029b526a216024d27a8eaf5,
// fetched from https://preprod.koios.rest/api/v1/tx_info.
const txInfoWithStringifiedCollateralAssets = [
  {
    tx_hash: "5714bd67aaeb664c3d2060ac34a33b66c2f4ec82e029b526a216024d27a8eaf5",
    block_hash:
      "49b1d4a2fb063fa2289529f64f63de6d61871c7b6e143f9031af3e526a6b2a4e",
    block_height: 3734816,
    epoch_no: 231,
    epoch_slot: 136180,
    absolute_slot: 98286580,
    tx_timestamp: 1753969780,
    tx_block_index: 0,
    tx_size: 2719,
    total_output: "4981630000",
    fee: "281142",
    treasury_donation: "0",
    deposit: "0",
    invalid_before: "98286452",
    invalid_after: "98287112",
    collateral_inputs: [],
    collateral_output: {
      value: "4976911142",
      tx_hash:
        "5714bd67aaeb664c3d2060ac34a33b66c2f4ec82e029b526a216024d27a8eaf5",
      tx_index: 2,
      asset_list: "[]",
      datum_hash: null,
      stake_addr:
        "stake_test1uz0psdwx99khuhtz9zc2l8kn0yzgsq5jlfm8t6rk5tfexxg2ka8ra",
      inline_datum: null,
      payment_addr: {
        cred: "c45544895d52709d88976f4f369102cda0a440cb515a69dd2ace9a80",
        bech32:
          "addr_test1qrz923yft4f8p8vgjah57d53qtx6pfzqedg456wa9t8f4qy7rq6uv2td0ewky29s470dx7gy3qpf97nkwh58dgknjvvs0mtfhv",
      },
      reference_script: null,
    },
    reference_inputs: [],
    inputs: [],
    outputs: [
      {
        value: "4951630000",
        tx_hash:
          "5714bd67aaeb664c3d2060ac34a33b66c2f4ec82e029b526a216024d27a8eaf5",
        tx_index: 1,
        asset_list: [],
        datum_hash: null,
        stake_addr:
          "stake_test1uz0psdwx99khuhtz9zc2l8kn0yzgsq5jlfm8t6rk5tfexxg2ka8ra",
        inline_datum: null,
        payment_addr: {
          cred: "c45544895d52709d88976f4f369102cda0a440cb515a69dd2ace9a80",
          bech32:
            "addr_test1qrz923yft4f8p8vgjah57d53qtx6pfzqedg456wa9t8f4qy7rq6uv2td0ewky29s470dx7gy3qpf97nkwh58dgknjvvs0mtfhv",
        },
        reference_script: null,
      },
      {
        value: "30000000",
        tx_hash:
          "5714bd67aaeb664c3d2060ac34a33b66c2f4ec82e029b526a216024d27a8eaf5",
        tx_index: 0,
        asset_list: [],
        datum_hash:
          "fd4d87699591d06df73bf834e9836e1eb148a69905a0cbf16deffe336f2c6dc8",
        stake_addr: null,
        inline_datum: { bytes: null, value: null },
        payment_addr: {
          cred: "82ae8d3c0f121dd8ad68238529e1a587351499bcdce065e19cfb65ea",
          bech32:
            "addr_test1wzp2arfupufpmk9ddq3c220p5krn29yehnwwqe0pnnakt6svnhfzc",
        },
        reference_script: null,
      },
    ],
    withdrawals: [],
    assets_minted: [],
    metadata: null,
    certificates: [],
    native_scripts: [],
    plutus_contracts: [],
    voting_procedures: [],
    proposal_procedures: [],
  },
];

describe("Koios TxInfoSchema", () => {
  test("decodes a tx_info response whose collateral output asset_list is a JSON string", () => {
    const [txInfo] = S.decodeUnknownSync(S.Array(_Koios.TxInfoSchema))(
      txInfoWithStringifiedCollateralAssets,
    );
    expect(txInfo.tx_hash).toBe(
      "5714bd67aaeb664c3d2060ac34a33b66c2f4ec82e029b526a216024d27a8eaf5",
    );
    expect(txInfo.collateral_output?.asset_list).toEqual([]);
    // The same response carries an output whose datum is a hash, which Koios
    // serializes as inline_datum { bytes: null, value: null }; that must
    // decode to no inline datum so the datum hash is used instead.
    expect(txInfo.outputs[1].inline_datum).toBeNull();
    expect(txInfo.outputs[1].datum_hash).toBe(
      "fd4d87699591d06df73bf834e9836e1eb148a69905a0cbf16deffe336f2c6dc8",
    );
  });

  test("keeps a real inline datum intact", () => {
    const response = structuredClone(txInfoWithStringifiedCollateralAssets);
    response[0].outputs[1].inline_datum = {
      bytes: "d8799f010203ff",
      value: { int: 42 },
    } as never;
    const [txInfo] = S.decodeUnknownSync(S.Array(_Koios.TxInfoSchema))(
      response,
    );
    expect(txInfo.outputs[1].inline_datum).toEqual({
      bytes: "d8799f010203ff",
      value: { int: 42 },
    });
  });

  test("decodes a non-empty stringified asset_list", () => {
    const asset = {
      policy_id: "a".repeat(56),
      asset_name: "74657374",
      fingerprint: "asset1test",
      decimals: 0,
      quantity: "1",
    };
    const response = structuredClone(txInfoWithStringifiedCollateralAssets);
    response[0].outputs[0].asset_list = JSON.stringify([asset]) as never;
    const [txInfo] = S.decodeUnknownSync(S.Array(_Koios.TxInfoSchema))(
      response,
    );
    expect(txInfo.outputs[0].asset_list).toEqual([asset]);
  });

  test("still rejects a stringified asset_list that is not valid JSON", () => {
    const response = structuredClone(txInfoWithStringifiedCollateralAssets);
    response[0].collateral_output!.asset_list = "not json" as never;
    expect(() =>
      S.decodeUnknownSync(S.Array(_Koios.TxInfoSchema))(response),
    ).toThrow();
  });
});
