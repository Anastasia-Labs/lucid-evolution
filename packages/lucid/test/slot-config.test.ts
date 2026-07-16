import { afterEach, describe, expect, test } from "vitest";
import {
  Emulator,
  generateEmulatorAccount,
  Lucid,
  PROTOCOL_PARAMETERS_DEFAULT,
  SLOT_CONFIG_NETWORK,
} from "../src/index.js";

const originalCustomSlotConfig = { ...SLOT_CONFIG_NETWORK.Custom };

afterEach(() => {
  SLOT_CONFIG_NETWORK.Custom = { ...originalCustomSlotConfig };
});

describe("per-instance slot configuration", () => {
  test("keeps simultaneous Custom instances isolated and immutable", async () => {
    const account = generateEmulatorAccount({ lovelace: 100_000_000n });
    const emulator = new Emulator([account], PROTOCOL_PARAMETERS_DEFAULT);
    const firstInput = { zeroTime: 1_000, zeroSlot: 10, slotLength: 100 };
    const secondInput = { zeroTime: 5_000, zeroSlot: 70, slotLength: 250 };

    const first = await Lucid(emulator, "Custom", { slotConfig: firstInput });
    const second = await Lucid(emulator, "Custom", {
      slotConfig: secondInput,
    });
    firstInput.zeroTime = 999_999;
    secondInput.zeroSlot = 999_999;

    expect(first.unixTimeToSlot(1_500)).toBe(15);
    expect(second.unixTimeToSlot(5_500)).toBe(72);
    expect(first.slotToUnixTime(15)).toBe(1_500);
    expect(second.slotToUnixTime(72)).toBe(5_500);
    expect(first.config().slotConfig).toEqual({
      zeroTime: 1_000,
      zeroSlot: 10,
      slotLength: 100,
    });
    expect(Object.isFrozen(first.config().slotConfig)).toBe(true);
    expect(SLOT_CONFIG_NETWORK.Custom).toEqual(originalCustomSlotConfig);
  });

  test("derives an Emulator mapping without mutating process-global state", async () => {
    const account = generateEmulatorAccount({ lovelace: 100_000_000n });
    const emulator = new Emulator([account], PROTOCOL_PARAMETERS_DEFAULT);
    emulator.awaitSlot(7);

    const lucid = await Lucid(emulator, "Custom");

    expect(lucid.config().slotConfig).toEqual({
      zeroTime: emulator.now(),
      zeroSlot: 7,
      slotLength: 1_000,
    });
    expect(lucid.unixTimeToSlot(emulator.now())).toBe(7);
    emulator.awaitSlot(5);
    expect(lucid.currentSlot()).toBe(12);
    expect(SLOT_CONFIG_NETWORK.Custom).toEqual(originalCustomSlotConfig);
  });

  test("fails early for an uninitialized non-Emulator Custom network", async () => {
    await expect(
      Lucid(undefined, "Custom", {
        presetProtocolParameters: PROTOCOL_PARAMETERS_DEFAULT,
      }),
    ).rejects.toThrow("Pass Lucid(..., { slotConfig })");
  });

  test("rejects mappings that cannot be translated safely", async () => {
    const account = generateEmulatorAccount({ lovelace: 100_000_000n });
    const emulator = new Emulator([account], PROTOCOL_PARAMETERS_DEFAULT);

    await expect(
      Lucid(emulator, "Custom", {
        slotConfig: { zeroTime: 0.5, zeroSlot: 0, slotLength: 1_000 },
      }),
    ).rejects.toThrow("zeroTime must be a safe integer");
    await expect(
      Lucid(emulator, "Custom", {
        slotConfig: { zeroTime: 0, zeroSlot: -1, slotLength: 1_000 },
      }),
    ).rejects.toThrow("zeroSlot must be a non-negative safe integer");
    await expect(
      Lucid(emulator, "Custom", {
        slotConfig: { zeroTime: 0, zeroSlot: 0, slotLength: Infinity },
      }),
    ).rejects.toThrow("slotLength must be a positive safe integer");
  });

  test("snapshots an initialized legacy Custom mapping at creation", async () => {
    SLOT_CONFIG_NETWORK.Custom = {
      zeroTime: 20_000,
      zeroSlot: 200,
      slotLength: 500,
    };
    const lucid = await Lucid(undefined, "Custom", {
      presetProtocolParameters: PROTOCOL_PARAMETERS_DEFAULT,
    });

    SLOT_CONFIG_NETWORK.Custom.zeroTime = 999_999;
    SLOT_CONFIG_NETWORK.Custom.zeroSlot = 999_999;

    expect(lucid.unixTimeToSlot(21_000)).toBe(202);
    expect(lucid.slotToUnixTime(202)).toBe(21_000);
    expect(lucid.config().slotConfig).toEqual({
      zeroTime: 20_000,
      zeroSlot: 200,
      slotLength: 500,
    });
  });

  test("uses the instance mapping for transaction validity intervals", async () => {
    const account = generateEmulatorAccount({ lovelace: 100_000_000n });
    const emulator = new Emulator([account], PROTOCOL_PARAMETERS_DEFAULT);
    const lucid = await Lucid(emulator, "Custom", {
      slotConfig: { zeroTime: 10_000, zeroSlot: 100, slotLength: 200 },
    });
    lucid.selectWallet.fromSeed(account.seedPhrase);

    const signBuilder = await lucid
      .newTx()
      .pay.ToAddress(account.address, { lovelace: 2_000_000n })
      .validFrom(11_000)
      .validTo(12_000)
      .complete();
    const body = signBuilder.toTransaction().body();

    expect(body.validity_interval_start()?.toString()).toBe("105");
    expect(body.ttl()?.toString()).toBe("110");
  });
});
