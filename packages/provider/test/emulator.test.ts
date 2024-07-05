import {
  Assets,
  Datum,
  Delegation,
  ProtocolParameters,
  TxHash,
  UTxO,
} from "@lucid-evolution/core-types";
import { assert, describe, expect, test } from "vitest";
import {
  generateSeedPhrase,
  getAddressDetails,
  mintingPolicyToId,
  scriptFromNative,
  PROTOCOL_PARAMETERS_DEFAULT,
  toUnit,
  unixTimeToSlot,
} from "@lucid-evolution/utils";
import {
  Data,
  fromText,
  Lucid,
  SLOT_CONFIG_NETWORK,
  walletFromSeed,
} from "../../lucid/src/index.js";
import { LucidEvolution } from "../../lucid/dist/index.cjs";
import { Emulator } from "../src/index.js";

async function generateAccount(assets: Assets) {
  const seedPhrase = generateSeedPhrase();
  return {
    seedPhrase,
    address: walletFromSeed(seedPhrase, {
      addressType: "Base",
      accountIndex: 0,
      network: "Custom",
    }).address,
    assets,
  };
}

let lucid: LucidEvolution;
let emulator: Emulator;
let ACCOUNT_0: any;
let ACCOUNT_1: any;

//TODO: improve test assetion
describe.sequential("Emulator", () => {
  test("Create Emulator", async () => {
    ACCOUNT_0 = await generateAccount({ lovelace: 75000000000n });
    ACCOUNT_1 = await generateAccount({ lovelace: 100000000n });
    emulator = new Emulator([ACCOUNT_0, ACCOUNT_1]);
    lucid = await Lucid(emulator, "Custom");
    lucid.selectWallet.fromSeed(ACCOUNT_0.seedPhrase);
  });

  test("Get Protocol Parameters", async () => {
    const pp: ProtocolParameters = await emulator.getProtocolParameters();
    assert.deepEqual(pp, PROTOCOL_PARAMETERS_DEFAULT);
  });

  test("Correct Start Balance", async () => {
    const utxos = await emulator.getUtxos(ACCOUNT_0.address);
    const lovelace = utxos.reduce(
      (amount: any, utxo: any) => amount + utxo.assets.lovelace,
      0n,
    );
    assert.equal(lovelace, ACCOUNT_0.assets.lovelace);
  });

  test("Paid to address", async () => {
    const recipient =
      "addr_test1qrupyvhe20s0hxcusrzlwp868c985dl8ukyr44gfvpqg4ek3vp92wfpentxz4f853t70plkp3vvkzggjxknd93v59uysvc54h7";

    const datum = Data.to(123n);
    const lovelace = 3000000n;

    const tx = await lucid
      .newTx()
      .pay.ToAddressWithData(
        recipient,
        {
          kind: "inline",
          value: datum,
        },
        { lovelace },
      )
      .complete();

    const signedTx = await tx.sign.withWallet().complete();
    const txHash = await signedTx.submit();
    await lucid.awaitTx(txHash);
    const utxos = await lucid.utxosAt(recipient);
    assert.equal(utxos.length, 1);
    assert.equal(utxos[0]?.assets.lovelace, lovelace);
    assert.equal(utxos[0]?.datum, datum);
  });
  test("Missing vkey witness", async () => {
    const recipient =
      "addr_test1wqag3rt979nep9g2wtdwu8mr4gz6m4kjdpp5zp705km8wys6t2kla";

    const lovelace = 3000000n;

    const tx = await lucid
      .newTx()
      .pay.ToAddress(recipient, { lovelace })
      .complete();

    const notSignedTx = await tx.complete();
    try {
      const txHash = await notSignedTx.submit();
      await lucid.awaitTx(txHash);
      assert(
        false,
        "The tx was never signed. The vkey witness could not exist.",
      );
    } catch (_e) {
      assert(true);
    }
  });
  test("Mint asset in slot range", async () => {
    const { paymentCredential } = getAddressDetails(ACCOUNT_0.address);

    console.log(
      'unixTimeToSlot("Custom", emulator.now() + 60000) :>> ',
      unixTimeToSlot("Custom", emulator.now() + 60000),
    );
    console.log(
      'SLOT_CONFIG_NETWORK["Custom"] :>> ',
      SLOT_CONFIG_NETWORK["Custom"],
    );
    const mintingPolicy = scriptFromNative({
      type: "all",
      scripts: [
        {
          type: "before",
          slot: unixTimeToSlot("Custom", emulator.now() + 60000),
        },
        { type: "sig", keyHash: paymentCredential?.hash! },
      ],
    });

    const policyId = mintingPolicyToId(mintingPolicy);

    async function mint(): Promise<TxHash> {
      const tx = await lucid
        .newTx()
        .mintAssets({
          [toUnit(policyId, fromText("Wow"))]: 123n,
        })
        .validTo(emulator.now() + 30000)
        .attach.MintingPolicy(mintingPolicy)
        .complete();

      const signedTx = await tx.sign.withWallet().complete();

      return signedTx.submit();
    }

    await mint();

    emulator.awaitBlock(4);

    try {
      await mint();
      assert(
        false,
        "The transactions should have failed because of exceeding slot range.",
      );
    } catch (_e) {
      assert(true);
    }
  });

  test("Reward withdrawal", async () => {
    const rewardAddress = await lucid.wallet().rewardAddress();
    const poolId = "pool1jsa3rv0dqtkv2dv2rcx349yfx6rxqyvrnvdye4ps3wxyws6q95m";
    const REWARD_AMOUNT = 100000000n;
    assert.deepEqual(await lucid.wallet().getDelegation(), {
      poolId: null,
      rewards: 0n,
    });
    emulator.distributeRewards(REWARD_AMOUNT);
    assert.deepEqual(await lucid.wallet().getDelegation(), {
      poolId: null,
      rewards: 0n,
    });
    // Registration
    await lucid.awaitTx(
      await (
        await (
          await lucid.newTx().registerStake(rewardAddress!).complete()
        ).sign
          .withWallet()
          .complete()
      ).submit(),
    );
    emulator.distributeRewards(REWARD_AMOUNT);
    assert.deepEqual(await lucid.wallet().getDelegation(), {
      poolId: null,
      rewards: 0n,
    });
    // Delegation;
    await lucid.awaitTx(
      await (
        await (
          await lucid.newTx().delegateTo(rewardAddress!, poolId).complete()
        ).sign
          .withWallet()
          .complete()
      ).submit(),
    );
    emulator.distributeRewards(REWARD_AMOUNT);
    assert.deepEqual(await lucid.wallet().getDelegation(), {
      poolId,
      rewards: REWARD_AMOUNT,
    });
    // // Deregistration
    // await lucid.awaitTx(
    //   await (
    //     await (
    //       await lucid.newTx().deRegisterStake(rewardAddress!).complete()
    //     ).sign
    //       .withWallet()
    //       .complete()
    //   ).submit()
    // );
    // assert.deepEqual(await lucid.wallet().getDelegation(), {
    //   poolId: null,
    //   rewards: REWARD_AMOUNT,
    // });
    // // Withdrawal
    // await lucid.awaitTx(
    //   await (
    //     await (
    //       await lucid.newTx().withdraw(rewardAddress!, REWARD_AMOUNT).complete()
    //     ).sign
    //       .withWallet()
    //       .complete()
    //   ).submit()
    // );
    // assert.deepEqual(await lucid.wallet().getDelegation(), {
    //   poolId: null,
    //   rewards: 0n,
    // });
  });
});
