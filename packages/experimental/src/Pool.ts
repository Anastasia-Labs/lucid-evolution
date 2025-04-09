import * as Assets from "./Assets.js";
import * as Address from "./Address_old.js";
import * as VRF from "./VRF.js";
import * as Relay from "./Relay.js";

/** Bech32 */
export type PoolId = string;

export type PoolParams = {
  poolId: PoolId;
  vrfKeyHash: VRF.VrfKeyHash;
  pledge: Assets.Lovelace;
  cost: Assets.Lovelace;
  margin: number;
  rewardAddress: Address.RewardAddress;
  owners: Array<Address.RewardAddress>;
  relays: Array<Relay.Relay>;
  metadataUrl?: string;
};
