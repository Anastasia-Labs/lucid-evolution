import { expect, test } from "vitest";
import { Constr, Data } from "@lucid-evolution/plutus";
import {
  Emulator,
  generateEmulatorAccount,
  Lucid,
  PROTOCOL_PARAMETERS_DEFAULT,
  applyDoubleCborEncoding,
  fromText,
  mintingPolicyToId,
  validatorToRewardAddress,
} from "../src/index.js";
import { CML } from "../src/core.js";
import scripts from "./specs/contracts/plutus.json" assert { type: "json" };

test("refreshes script data hash from final redeemer witnesses", async () => {
  const account = generateEmulatorAccount({ lovelace: 75_000_000_000n });
  const emulator = new Emulator([account], PROTOCOL_PARAMETERS_DEFAULT);
  const lucid = await Lucid(emulator, "Custom");
  lucid.selectWallet.fromSeed(account.seedPhrase);

  const mint = {
    type: "PlutusV3",
    script: applyDoubleCborEncoding(
      scripts.validators.find(
        (validator) => validator.title === "simple_mint.mint_policy.mint",
      )!.compiledCode,
    ),
  } as const;
  const stake = {
    type: "PlutusV3",
    script: applyDoubleCborEncoding(
      scripts.validators.find(
        (validator) => validator.title === "simple_mint.mint_policy.withdraw",
      )!.compiledCode,
    ),
  } as const;

  const policyId = mintingPolicyToId(mint);
  const rewardAddress = validatorToRewardAddress("Custom", stake);
  const signBuilder = await lucid
    .newTx()
    .mintAssets(
      { [policyId + fromText("MintWithdraw")]: 1n },
      Data.to(new Constr(0, [1n])),
    )
    .withdraw(rewardAddress, 0n, Data.to(new Constr(0, [fromText("1")])))
    .attach.WithdrawalValidator(stake)
    .attach.MintingPolicy(mint)
    .complete();
  const tx = signBuilder.toTransaction();
  const redeemers = tx.witness_set().redeemers()!;
  const datums = tx.witness_set().plutus_datums() ?? CML.PlutusDataList.new();
  const expectedHash = CML.calc_script_data_hash(
    redeemers,
    datums,
    lucid.config().costModels,
    tx.witness_set().languages(),
  )!.to_hex();

  expect(tx.body().script_data_hash()?.to_hex()).toBe(expectedHash);
});
