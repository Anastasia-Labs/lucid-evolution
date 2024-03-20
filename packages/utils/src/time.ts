import { Network, Slot, UnixTime } from "@lucid-evolution/core-types";
import {
  SLOT_CONFIG_NETWORK,
  slotToBeginUnixTime,
  unixTimeToEnclosingSlot,
} from "@lucid-evolution/plutus";

export function unixTimeToSlot(network: Network, unixTime: UnixTime): Slot {
  return unixTimeToEnclosingSlot(unixTime, SLOT_CONFIG_NETWORK[network]);
}

export function slotToUnixTime(network: Network, slot: Slot): UnixTime {
  return slotToBeginUnixTime(slot, SLOT_CONFIG_NETWORK[network]);
}
