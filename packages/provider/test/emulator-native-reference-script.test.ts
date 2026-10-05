import { Script } from "@lucid-evolution/core-types";
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

// Spends a UTxO locked by a native script that the transaction only carries
// in a reference input, so the emulator must verify the reference script.

const GENESIS_HASH = "00".repeat(32);
const SCRIPT_UTXO_HASH = "11".repeat(32);
const REFERENCE_UTXO_HASH = "22".repeat(32);

const keyHashOf = (privateKey: string): string =>
  CML.PrivateKey.from_bech32(privateKey).to_public().hash().to_hex();

const requireSignature = (keyHash: string): Script => ({
  type: "Native",
  script: CML.NativeScript.new_script_pubkey(
    CML.Ed25519KeyHash.from_hex(keyHash),
  ).to_cbor_hex(),
});

const txInput = (txHash: string, outputIndex: number) =>
  CML.TransactionInput.new(
    CML.TransactionHash.from_hex(txHash),
    BigInt(outputIndex),
  );

const setup = () => {
  const owner = generateEmulatorAccountFromPrivateKey({
    lovelace: 100_000_000n,
  });
  const other = generateEmulatorAccountFromPrivateKey({
    lovelace: 100_000_000n,
  });
  const emulator = new Emulator([owner, other], PROTOCOL_PARAMETERS_DEFAULT);
  const script = requireSignature(keyHashOf(owner.privateKey));
  emulator.ledger[SCRIPT_UTXO_HASH + 0] = {
    utxo: {
      txHash: SCRIPT_UTXO_HASH,
      outputIndex: 0,
      address: validatorToAddress("Custom", script),
      assets: { lovelace: 10_000_000n },
      datumHash: undefined,
      datum: undefined,
      scriptRef: undefined,
    },
    spent: false,
  };
  emulator.ledger[REFERENCE_UTXO_HASH + 0] = {
    utxo: {
      txHash: REFERENCE_UTXO_HASH,
      outputIndex: 0,
      address: owner.address,
      assets: { lovelace: 5_000_000n },
      datumHash: undefined,
      datum: undefined,
      scriptRef: script,
    },
    spent: false,
  };
  return { emulator, owner, other };
};

// Spends the signer's genesis UTxO (index 0 for the owner, 1 for the other
// account) and the script UTxO, reading the native script by reference.
const spendWithReferenceScript = (
  signer: { address: string; privateKey: string },
  genesisIndex: number,
): string => {
  const inputs = CML.TransactionInputList.new();
  inputs.add(txInput(GENESIS_HASH, genesisIndex));
  inputs.add(txInput(SCRIPT_UTXO_HASH, 0));
  const outputs = CML.TransactionOutputList.new();
  outputs.add(
    CML.TransactionOutput.new(
      CML.Address.from_bech32(signer.address),
      CML.Value.from_coin(109_800_000n),
    ),
  );
  const body = CML.TransactionBody.new(inputs, outputs, 200_000n);
  const referenceInputs = CML.TransactionInputList.new();
  referenceInputs.add(txInput(REFERENCE_UTXO_HASH, 0));
  body.set_reference_inputs(referenceInputs);
  const witnesses = CML.TransactionWitnessSet.new();
  const vkeys = CML.VkeywitnessList.new();
  vkeys.add(
    CML.make_vkey_witness(
      CML.hash_transaction(body),
      CML.PrivateKey.from_bech32(signer.privateKey),
    ),
  );
  witnesses.set_vkeywitnesses(vkeys);
  return CML.Transaction.new(body, witnesses, true).to_cbor_hex();
};

describe("Emulator native reference scripts", () => {
  test("accepts a spend authorized by a reference-only native script", async () => {
    const { emulator, owner } = setup();
    const txHash = await emulator.submitTx(spendWithReferenceScript(owner, 0));
    emulator.awaitBlock(1);
    expect(
      await emulator.getUtxosByOutRef([{ txHash, outputIndex: 0 }]),
    ).toHaveLength(1);
  });

  test("rejects a spend whose signer does not satisfy the reference script", async () => {
    const { emulator, other } = setup();
    // submitTx throws before it returns a promise.
    await expect(
      (async () => emulator.submitTx(spendWithReferenceScript(other, 1)))(),
    ).rejects.toThrow(/Invalid native script witness/);
  });
});
