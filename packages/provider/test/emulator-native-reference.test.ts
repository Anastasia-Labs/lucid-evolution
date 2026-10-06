import { Script } from "@lucid-evolution/core-types";
import { describe, expect, test } from "vitest";
import { validatorToAddress } from "@lucid-evolution/utils";
import { CML } from "../src/core.js";
import {
  Emulator,
  generateEmulatorAccountFromPrivateKey,
} from "../src/index.js";

/*
  A native script supplied through a script reference (rather than the
  witness set) is verified against the transaction's vkey witnesses. That
  verification once ran after the witness key list had been freed.
*/

const GENESIS_HASH = "00".repeat(32);
const SCRIPT_UTXO_HASH = "22".repeat(32);

const txInput = (txHash: string, outputIndex: number) =>
  CML.TransactionInput.new(
    CML.TransactionHash.from_hex(txHash),
    BigInt(outputIndex),
  );

const setup = (scriptSigner: "account" | "other") => {
  const account = generateEmulatorAccountFromPrivateKey({
    lovelace: 100_000_000n,
  });
  const emulator = new Emulator([account]);
  const accountKey = CML.PrivateKey.from_bech32(account.privateKey);
  const signerHash =
    scriptSigner === "account"
      ? accountKey.to_public().hash()
      : CML.PrivateKey.generate_ed25519().to_public().hash();
  const nativeScript: Script = {
    type: "Native",
    script: CML.NativeScript.new_script_pubkey(signerHash).to_cbor_hex(),
  };
  emulator.ledger[SCRIPT_UTXO_HASH + 0] = {
    utxo: {
      txHash: SCRIPT_UTXO_HASH,
      outputIndex: 0,
      address: validatorToAddress("Custom", nativeScript),
      assets: { lovelace: 10_000_000n },
      datumHash: undefined,
      datum: undefined,
      scriptRef: nativeScript,
    },
    spent: false,
  };

  // Spends the account coin and the script coin; the native script is only
  // available as the script coin's reference script.
  const inputs = CML.TransactionInputList.new();
  inputs.add(txInput(GENESIS_HASH, 0));
  inputs.add(txInput(SCRIPT_UTXO_HASH, 0));
  const outputs = CML.TransactionOutputList.new();
  outputs.add(
    CML.TransactionOutput.new(
      CML.Address.from_bech32(account.address),
      CML.Value.from_coin(109_800_000n),
    ),
  );
  const body = CML.TransactionBody.new(inputs, outputs, 200_000n);
  const witnesses = CML.TransactionWitnessSet.new();
  const vkeys = CML.VkeywitnessList.new();
  vkeys.add(CML.make_vkey_witness(CML.hash_transaction(body), accountKey));
  witnesses.set_vkeywitnesses(vkeys);
  const tx = CML.Transaction.new(body, witnesses, true).to_cbor_hex();
  return { emulator, tx };
};

describe("Emulator native scripts from script references", () => {
  test("accepts a reference native script satisfied by a vkey witness", async () => {
    const { emulator, tx } = setup("account");
    await expect(emulator.submitTx(tx)).resolves.toMatch(/^[0-9a-f]{64}$/);
    emulator.awaitBlock();
    expect(
      await emulator.getUtxosByOutRef([
        { txHash: SCRIPT_UTXO_HASH, outputIndex: 0 },
      ]),
    ).toEqual([]);
  });

  test("rejects a reference native script whose signer did not sign", async () => {
    const { emulator, tx } = setup("other");
    await expect(async () => emulator.submitTx(tx)).rejects.toThrow(
      /Invalid native script witness/,
    );
  });
});
