import * as Address from "./Address.js";
import * as UTXO from "./UTXO.js";
/**
 * A wallet that can be constructed from external data e.g utxos and an address.
 * It doesn't allow you to sign transactions/messages. This needs to be handled separately.
 */
export interface ExternalWallet {
  address: Address.Address;
  utxos?: UTXO.UTxO[];
  rewardAddress?: Address.RewardAddress;
}
