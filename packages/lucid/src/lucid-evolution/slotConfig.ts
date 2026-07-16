import type {
  Network,
  Provider,
  SlotConfig,
} from "@lucid-evolution/core-types";
import { SLOT_CONFIG_NETWORK } from "@lucid-evolution/plutus";
import { isEmulatorProvider } from "@lucid-evolution/provider";

const copyAndValidateSlotConfig = (slotConfig: SlotConfig): SlotConfig => {
  if (
    !Number.isSafeInteger(slotConfig.zeroTime) ||
    !Number.isSafeInteger(slotConfig.zeroSlot) ||
    slotConfig.zeroSlot < 0 ||
    !Number.isSafeInteger(slotConfig.slotLength) ||
    slotConfig.slotLength <= 0
  ) {
    throw new RangeError(
      "Invalid slotConfig: zeroTime must be a safe integer, zeroSlot must be a non-negative safe integer, and slotLength must be a positive safe integer.",
    );
  }

  return Object.freeze({ ...slotConfig });
};

export const resolveSlotConfig = (
  provider: Provider | undefined,
  network: Network | undefined,
  explicit: SlotConfig | undefined,
): SlotConfig | undefined => {
  if (explicit) return copyAndValidateSlotConfig(explicit);

  if (isEmulatorProvider(provider)) {
    return copyAndValidateSlotConfig({
      zeroTime: provider.now(),
      zeroSlot: provider.slot,
      slotLength: 1000,
    });
  }

  if (!network) return undefined;

  const staticConfig = SLOT_CONFIG_NETWORK[network];
  if (network === "Custom" && staticConfig.slotLength <= 0) {
    throw new Error(
      "Custom network slot configuration is uninitialized. Pass Lucid(..., { slotConfig }) with the network genesis mapping.",
    );
  }
  return copyAndValidateSlotConfig(staticConfig);
};
