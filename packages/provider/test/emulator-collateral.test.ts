import { Assets, Script } from "@lucid-evolution/core-types";
import { describe, expect, test } from "vitest";
import {
  assetsToValue,
  PROTOCOL_PARAMETERS_DEFAULT,
  validatorToAddress,
} from "@lucid-evolution/utils";
import { CML } from "../src/core.js";
import {
  Emulator,
  generateEmulatorAccountFromPrivateKey,
} from "../src/index.js";

/*
  The ledger's collateral rules for a transaction with redeemers (feesOK):
    - at least one collateral input (NoCollateralInputs);
    - at most maxCollateralInputs of them (TooManyCollateralInputs);
    - the collateral inputs minus the collateral return hold only ADA
      (CollateralContainsNonADA);
    - that balance covers collateralPercentage of the fee
      (InsufficientCollateral);
    - total_collateral, when present, equals that balance
      (IncorrectTotalCollateralField).
*/

const FEE = 200_000n;
// 150% of the fee.
const REQUIRED = 300_000n;
const SCRIPT_UTXO_HASH = "11".repeat(32);
const COLLATERAL_HASH = "22".repeat(32);
const SCRIPT: Script = { type: "PlutusV3", script: "49480100002221200101" };
const UNIT = "33".repeat(28) + "01";

type OutRef = { txHash: string; outputIndex: number };

const txInput = ({ txHash, outputIndex }: OutRef) =>
  CML.TransactionInput.new(
    CML.TransactionHash.from_hex(txHash),
    BigInt(outputIndex),
  );

const setup = (collateralUTxOs: Assets[]) => {
  const account = generateEmulatorAccountFromPrivateKey({
    lovelace: 100_000_000n,
  });
  const emulator = new Emulator([account], PROTOCOL_PARAMETERS_DEFAULT);
  const scriptOutRef: OutRef = { txHash: SCRIPT_UTXO_HASH, outputIndex: 0 };
  emulator.ledger[scriptOutRef.txHash + scriptOutRef.outputIndex] = {
    utxo: {
      ...scriptOutRef,
      address: validatorToAddress("Custom", SCRIPT),
      assets: { lovelace: 10_000_000n },
      datumHash: undefined,
      datum: undefined,
      scriptRef: SCRIPT,
    },
    spent: false,
  };
  const collateral = collateralUTxOs.map((assets, outputIndex) => {
    const outRef = { txHash: COLLATERAL_HASH, outputIndex };
    emulator.ledger[outRef.txHash + outRef.outputIndex] = {
      utxo: { ...outRef, address: account.address, assets },
      spent: false,
    };
    return outRef;
  });
  return { account, emulator, scriptOutRef, collateral };
};

const spendScript = async (
  fixture: ReturnType<typeof setup>,
  options: {
    collateral: OutRef[];
    collateralReturn?: Assets;
    totalCollateral?: bigint;
  },
) => {
  const { account, emulator, scriptOutRef } = fixture;
  const inputs = CML.TransactionInputList.new();
  inputs.add(txInput(scriptOutRef));
  const outputs = CML.TransactionOutputList.new();
  outputs.add(
    CML.TransactionOutput.new(
      CML.Address.from_bech32(account.address),
      CML.Value.from_coin(10_000_000n - FEE),
    ),
  );
  const body = CML.TransactionBody.new(inputs, outputs, FEE);
  if (options.collateral.length > 0) {
    const collateralInputs = CML.TransactionInputList.new();
    for (const outRef of options.collateral) {
      collateralInputs.add(txInput(outRef));
    }
    body.set_collateral_inputs(collateralInputs);
  }
  if (options.collateralReturn) {
    body.set_collateral_return(
      CML.TransactionOutput.new(
        CML.Address.from_bech32(account.address),
        assetsToValue(options.collateralReturn),
      ),
    );
  }
  if (options.totalCollateral !== undefined) {
    body.set_total_collateral(options.totalCollateral);
  }
  const witnesses = CML.TransactionWitnessSet.new();
  if (options.collateral.length > 0) {
    const vkeys = CML.VkeywitnessList.new();
    vkeys.add(
      CML.make_vkey_witness(
        CML.hash_transaction(body),
        CML.PrivateKey.from_bech32(account.privateKey),
      ),
    );
    witnesses.set_vkeywitnesses(vkeys);
  }
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
  return emulator.submitTx(
    CML.Transaction.new(body, witnesses, true).to_cbor_hex(),
  );
};

describe("Emulator collateral checks", () => {
  test("accepts collateral covering the fee exactly", async () => {
    const fixture = setup([{ lovelace: REQUIRED }]);
    await spendScript(fixture, {
      collateral: fixture.collateral,
      totalCollateral: REQUIRED,
    });
  });

  test("accepts a collateral return that leaves enough collateral", async () => {
    const fixture = setup([{ lovelace: 5_000_000n, [UNIT]: 1n }]);
    await spendScript(fixture, {
      collateral: fixture.collateral,
      collateralReturn: { lovelace: 5_000_000n - REQUIRED, [UNIT]: 1n },
      totalCollateral: REQUIRED,
    });
  });

  test("rejects a script transaction without collateral", async () => {
    const fixture = setup([]);
    await expect(spendScript(fixture, { collateral: [] })).rejects.toThrow(
      /NoCollateralInputs/,
    );
  });

  test("rejects collateral below collateralPercentage of the fee", async () => {
    const fixture = setup([{ lovelace: REQUIRED - 1n }]);
    await expect(
      spendScript(fixture, { collateral: fixture.collateral }),
    ).rejects.toThrow(
      /InsufficientCollateral: collateral balance is 299999 Lovelace, but the fee of 200000 requires 300000/,
    );
  });

  test("rejects a collateral return that leaves too little collateral", async () => {
    const fixture = setup([{ lovelace: 5_000_000n }]);
    await expect(
      spendScript(fixture, {
        collateral: fixture.collateral,
        collateralReturn: { lovelace: 5_000_000n - REQUIRED + 1n },
      }),
    ).rejects.toThrow(/InsufficientCollateral/);
  });

  test("rejects a total collateral that differs from the balance", async () => {
    const fixture = setup([{ lovelace: 5_000_000n }]);
    await expect(
      spendScript(fixture, {
        collateral: fixture.collateral,
        collateralReturn: { lovelace: 4_000_000n },
        totalCollateral: 5_000_000n,
      }),
    ).rejects.toThrow(/IncorrectTotalCollateralField/);
  });

  test("rejects collateral that keeps native assets", async () => {
    const fixture = setup([{ lovelace: 5_000_000n, [UNIT]: 1n }]);
    await expect(
      spendScript(fixture, { collateral: fixture.collateral }),
    ).rejects.toThrow(/CollateralContainsNonADA/);
  });

  test("rejects more collateral inputs than maxCollateralInputs", async () => {
    const fixture = setup(
      Array.from(
        { length: PROTOCOL_PARAMETERS_DEFAULT.maxCollateralInputs + 1 },
        () => ({ lovelace: REQUIRED }),
      ),
    );
    await expect(
      spendScript(fixture, { collateral: fixture.collateral }),
    ).rejects.toThrow(/TooManyCollateralInputs/);
  });
});
