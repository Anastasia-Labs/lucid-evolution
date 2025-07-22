import { Network, Slot, UnixTime } from "@evolution-sdk/core-types";
import {
  SLOT_CONFIG_NETWORK,
  slotToBeginUnixTime,
  unixTimeToEnclosingSlot,
} from "@evolution-sdk/plutus";

/**
 * Converts unix time to slot based on the network. For "Custom" network
 * it is advisable use `unixTimeToSlot` method from `LucidEvolution`
 * instance to avoid uninitialized `SLOT_CONFIG_NETWORK` issue. More details
 * on the issue can be found here https://github.com/no-witness-labs/evolution-sdk/pull/443
 * @param network
 * @param unixTime
 * @returns Slot
 */
export function unixTimeToSlot(network: Network, unixTime: UnixTime): Slot {
  return unixTimeToEnclosingSlot(unixTime, SLOT_CONFIG_NETWORK[network]);
}

export function slotToUnixTime(network: Network, slot: Slot): UnixTime {
  return slotToBeginUnixTime(slot, SLOT_CONFIG_NETWORK[network]);
}
