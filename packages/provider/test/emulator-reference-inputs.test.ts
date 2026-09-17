import { ProtocolParameters, Script } from "@lucid-evolution/core-types";
import { describe, expect, test } from "vitest";
import {
  PROTOCOL_PARAMETERS_DEFAULT,
  validatorToAddress,
} from "@lucid-evolution/utils";
import { CML } from "../src/core.js";
import {
  Emulator,
  generateEmulatorAccountFromPrivateKey,
} from "../src/index.js";

/*
  The ledger requires a transaction's reference inputs to be disjoint from
  its inputs, with the rule depending on the protocol version:
    - up to major version 8, any overlap is allowed;
    - major versions 9 and 10 reject any overlap (BabbageNonDisjointRefInputs);
    - from major version 11 the check is part of building a PlutusV3 script
      context (ReferenceInputsNotDisjointFromInputs), so only a transaction
      that runs a PlutusV3 script is rejected.
  These tests exercise every branch against the emulator's submit check.
*/

const GENESIS_HASH = "00".repeat(32);
const SCRIPT_UTXO_HASH = "11".repeat(32);

// The emulator does not evaluate scripts on submit, so the script body only
// has to deserialise; the same bytes serve as PlutusV2 and PlutusV3 scripts.
const SCRIPT_BODY = "49480100002221200101";
const plutusV2Script: Script = { type: "PlutusV2", script: SCRIPT_BODY };
const plutusV3Script: Script = { type: "PlutusV3", script: SCRIPT_BODY };

const withProtocolMajorVersion = (
  protocolMajorVersion: number | undefined,
): ProtocolParameters => ({
  ...PROTOCOL_PARAMETERS_DEFAULT,
  protocolMajorVersion,
});

const txInput = (txHash: string, outputIndex: number) =>
  CML.TransactionInput.new(
    CML.TransactionHash.from_hex(txHash),
    BigInt(outputIndex),
  );

type OutRef = { txHash: string; outputIndex: number };

const buildTx = (input: {
  spend: OutRef;
  read: OutRef[];
  payTo: string;
  amount: bigint;
  signWith?: string;
  redeemer?: boolean;
}): string => {
  const inputs = CML.TransactionInputList.new();
  inputs.add(txInput(input.spend.txHash, input.spend.outputIndex));
  const outputs = CML.TransactionOutputList.new();
  outputs.add(
    CML.TransactionOutput.new(
      CML.Address.from_bech32(input.payTo),
      CML.Value.from_coin(input.amount),
    ),
  );
  const body = CML.TransactionBody.new(inputs, outputs, 200_000n);
  if (input.read.length > 0) {
    const referenceInputs = CML.TransactionInputList.new();
    for (const ref of input.read) {
      referenceInputs.add(txInput(ref.txHash, ref.outputIndex));
    }
    body.set_reference_inputs(referenceInputs);
  }
  const witnesses = CML.TransactionWitnessSet.new();
  if (input.signWith) {
    const vkeys = CML.VkeywitnessList.new();
    vkeys.add(
      CML.make_vkey_witness(
        CML.hash_transaction(body),
        CML.PrivateKey.from_bech32(input.signWith),
      ),
    );
    witnesses.set_vkeywitnesses(vkeys);
  }
  if (input.redeemer) {
    const redeemers = CML.LegacyRedeemerList.new();
    redeemers.add(
      CML.LegacyRedeemer.new(
        CML.RedeemerTag.Spend,
        0n,
        CML.PlutusData.new_integer(CML.BigInteger.from_str("0")),
        CML.ExUnits.new(0n, 0n),
      ),
    );
    witnesses.set_redeemers(CML.Redeemers.new_arr_legacy_redeemer(redeemers));
  }
  return CML.Transaction.new(body, witnesses, true).to_cbor_hex();
};

const setup = (protocolMajorVersion: number | undefined) => {
  const account = generateEmulatorAccountFromPrivateKey({
    lovelace: 100_000_000n,
  });
  const emulator = new Emulator(
    [account],
    withProtocolMajorVersion(protocolMajorVersion),
  );
  const accountOutRef: OutRef = { txHash: GENESIS_HASH, outputIndex: 0 };
  const scriptOutRef: OutRef = { txHash: SCRIPT_UTXO_HASH, outputIndex: 0 };
  const lockAt = (script: Script) => {
    emulator.ledger[scriptOutRef.txHash + scriptOutRef.outputIndex] = {
      utxo: {
        ...scriptOutRef,
        address: validatorToAddress("Custom", script),
        assets: { lovelace: 10_000_000n },
        datumHash: undefined,
        datum: undefined,
        scriptRef: script,
      },
      spent: false,
    };
  };
  return { account, emulator, accountOutRef, scriptOutRef, lockAt };
};

const spendOwnCoinReadingItself = async (
  protocolMajorVersion: number | undefined,
) => {
  const { account, emulator, accountOutRef } = setup(protocolMajorVersion);
  const tx = buildTx({
    spend: accountOutRef,
    read: [accountOutRef],
    payTo: account.address,
    amount: 99_800_000n,
    signWith: account.privateKey,
  });
  return emulator.submitTx(tx);
};

const spendScriptCoin = async (input: {
  protocolMajorVersion: number | undefined;
  script: Script;
  readItself: boolean;
}) => {
  const { account, emulator, accountOutRef, scriptOutRef, lockAt } = setup(
    input.protocolMajorVersion,
  );
  lockAt(input.script);
  const tx = buildTx({
    spend: scriptOutRef,
    read: input.readItself ? [scriptOutRef] : [accountOutRef],
    payTo: account.address,
    amount: 9_800_000n,
    redeemer: true,
  });
  return emulator.submitTx(tx);
};

describe("Emulator reference inputs overlapping inputs", () => {
  test("protocol version 8 accepts the overlap", async () => {
    await spendOwnCoinReadingItself(8);
  });

  test("protocol version 9 rejects the overlap", async () => {
    await expect(spendOwnCoinReadingItself(9)).rejects.toThrow(
      /BabbageNonDisjointRefInputs.*0{64}#0/,
    );
  });

  test("protocol version 10 rejects the overlap", async () => {
    await expect(spendOwnCoinReadingItself(10)).rejects.toThrow(
      /BabbageNonDisjointRefInputs.*0{64}#0/,
    );
  });

  test("protocol version 11 accepts the overlap when no PlutusV3 script runs", async () => {
    await spendOwnCoinReadingItself(11);
    await spendScriptCoin({
      protocolMajorVersion: 11,
      script: plutusV2Script,
      readItself: true,
    });
  });

  test("protocol version 11 rejects the overlap when a PlutusV3 script runs", async () => {
    await expect(
      spendScriptCoin({
        protocolMajorVersion: 11,
        script: plutusV3Script,
        readItself: true,
      }),
    ).rejects.toThrow(/ReferenceInputsNotDisjointFromInputs.*1{64}#0/);
  });

  test("protocol version 11 accepts a PlutusV3 script with disjoint reference inputs", async () => {
    await spendScriptCoin({
      protocolMajorVersion: 11,
      script: plutusV3Script,
      readItself: false,
    });
  });

  test("an unset protocol version follows the current mainnet rule", async () => {
    await spendOwnCoinReadingItself(undefined);
    await expect(
      spendScriptCoin({
        protocolMajorVersion: undefined,
        script: plutusV3Script,
        readItself: true,
      }),
    ).rejects.toThrow(/ReferenceInputsNotDisjointFromInputs/);
  });
});
