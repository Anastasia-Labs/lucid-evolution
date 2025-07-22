import { assert, test } from "vitest";
import { buildBaseOutput } from "../src/tx-builder/internal/Pay";
import { assetsToValue } from "@evolution-sdk/utils";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";
import { Script } from "@evolution-sdk/core-types";

test("buildBaseOutput - only address", async () => {
  const output: CML.TransactionOutputAmountBuilder = buildBaseOutput(
    "addr1q98wl3hnya9l94rt58ky533deyqe9t8zz5n9su26k8e5g23yar4q0adtaax9q9g0kphpv2ws7vxqwu6ln6pqx7j29nfqsfy9mg",
  );
  const outputresult: CML.SingleOutputBuilderResult = output
    .with_value(assetsToValue({ lovelace: 10n }))
    .build();
  // CBOR Notation
  //[
  //  h'014eefc6f3274bf2d46ba1ec4a462dc90192ace2152658715ab1f3442a24e8ea07f5abef4c50150fb06e1629d0f30c07735f9e82037a4a2cd2',
  //  10,
  //]
  assert.deepEqual(
    outputresult.output().to_cbor_hex(),
    "825839014eefc6f3274bf2d46ba1ec4a462dc90192ace2152658715ab1f3442a24e8ea07f5abef4c50150fb06e1629d0f30c07735f9e82037a4a2cd20a",
  );
});

test("buildBaseOutput - only address and datum", async () => {
  const output = buildBaseOutput(
    "addr1q98wl3hnya9l94rt58ky533deyqe9t8zz5n9su26k8e5g23yar4q0adtaax9q9g0kphpv2ws7vxqwu6ln6pqx7j29nfqsfy9mg",
    { kind: "inline", value: "d8799f44deadbeefff" },
  );
  const outputresult: CML.SingleOutputBuilderResult = output
    .with_value(assetsToValue({ lovelace: 10n }))
    .build();
  // CBOR Notation
  //  {
  //    0: h'014eefc6f3274bf2d46ba1ec4a462dc90192ace2152658715ab1f3442a24e8ea07f5abef4c50150fb06e1629d0f30c07735f9e82037a4a2cd2',
  //    1: 10,
  //    2: [1, 24_0(<< 121_0([_ h'deadbeef']) >>)],
  //  }
  assert.deepEqual(
    outputresult.output().to_cbor_hex(),
    "a3005839014eefc6f3274bf2d46ba1ec4a462dc90192ace2152658715ab1f3442a24e8ea07f5abef4c50150fb06e1629d0f30c07735f9e82037a4a2cd2010a028201d81849d8799f44deadbeefff",
  );
});

test("buildBaseOutput - only address and refScript", async () => {
  const refScript: Script = {
    type: "PlutusV3",
    script: "450100002499",
  };
  const output: CML.TransactionOutputAmountBuilder = buildBaseOutput(
    "addr1q98wl3hnya9l94rt58ky533deyqe9t8zz5n9su26k8e5g23yar4q0adtaax9q9g0kphpv2ws7vxqwu6ln6pqx7j29nfqsfy9mg",
    undefined,
    refScript,
  );
  const outputresult: CML.SingleOutputBuilderResult = output
    .with_value(assetsToValue({ lovelace: 10n }))
    .build();
  // CBOR Notation
  //  {
  //    0: h'014eefc6f3274bf2d46ba1ec4a462dc90192ace2152658715ab1f3442a24e8ea07f5abef4c50150fb06e1629d0f30c07735f9e82037a4a2cd2',
  //    1: 10,
  //    3: 24_0(<<[3, h'450100002499']>>),
  //  }
  assert.deepEqual(
    outputresult.output().to_cbor_hex(),
    "a3005839014eefc6f3274bf2d46ba1ec4a462dc90192ace2152658715ab1f3442a24e8ea07f5abef4c50150fb06e1629d0f30c07735f9e82037a4a2cd2010a03d81849820346450100002499",
  );
});

test("buildBaseOutput - address, datum, refScript", async () => {
  const refScript: Script = {
    type: "PlutusV3",
    script: "450100002499",
  };
  const output: CML.TransactionOutputAmountBuilder = buildBaseOutput(
    "addr1q98wl3hnya9l94rt58ky533deyqe9t8zz5n9su26k8e5g23yar4q0adtaax9q9g0kphpv2ws7vxqwu6ln6pqx7j29nfqsfy9mg",
    { kind: "inline", value: "d8799f44deadbeefff" },
    refScript,
  );
  const outputresult: CML.SingleOutputBuilderResult = output
    .with_value(assetsToValue({ lovelace: 10n }))
    .build();
  // CBOR Notation
  // {
  //   0: h'014eefc6f3274bf2d46ba1ec4a462dc90192ace2152658715ab1f3442a24e8ea07f5abef4c50150fb06e1629d0f30c07735f9e82037a4a2cd2',
  //   1: 10,
  //   2: [1, 24_0(<<121_0([_ h'deadbeef'])>>)],
  //   3: 24_0(<<[3, h'450100002499']>>),
  // }
  assert.deepEqual(
    outputresult.output().to_cbor_hex(),
    "a4005839014eefc6f3274bf2d46ba1ec4a462dc90192ace2152658715ab1f3442a24e8ea07f5abef4c50150fb06e1629d0f30c07735f9e82037a4a2cd2010a028201d81849d8799f44deadbeefff03d81849820346450100002499",
  );
});
