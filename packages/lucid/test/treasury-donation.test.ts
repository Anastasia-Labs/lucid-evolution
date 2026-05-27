import { describe, expect, test } from "vitest";
import { CML, Lucid } from "../src/index.js";
import { Emulator, generateEmulatorAccount } from "../../provider/src/index.js";

describe("Treasury donation", () => {
  test("builds and submits a treasury donation transaction", async () => {
    const initialTreasury = 123_000_000n;
    const donation = 2_000_000n;
    const account = generateEmulatorAccount({ lovelace: 80_000_000n });
    const emulator = new Emulator([account], undefined, initialTreasury);
    const lucid = await Lucid(emulator, "Custom");
    lucid.selectWallet.fromSeed(account.seedPhrase);

    const signBuilder = await lucid
      .newTx()
      .donateToTreasury(donation)
      .complete();
    const body = signBuilder.toTransaction().body();

    expect(body.current_treasury_value()).toBe(initialTreasury);
    expect(body.donation()).toBe(donation);
    expect(body.fee()).toBeGreaterThan(0n);
    expect(CML.hash_transaction(body).to_hex()).toHaveLength(64);

    const signed = await signBuilder.sign.withWallet().complete();
    await signed.submit();

    expect(await emulator.getTreasury()).toBe(initialTreasury + donation);
  });
});
