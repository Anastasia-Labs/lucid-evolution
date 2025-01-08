import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";
import * as Network from "./Network.js";
import { RewardAddress, Credential } from "./Type.js";

export function toRewardAddress(
  network: Network.Network,
  stakeCredential: Credential,
): RewardAddress {
  return CML.RewardAddress.new(
    Network.toId(network),
    stakeCredential.type === "Key"
      ? CML.Credential.new_pub_key(
          CML.Ed25519KeyHash.from_hex(stakeCredential.hash),
        )
      : CML.Credential.new_script(
          CML.ScriptHash.from_hex(stakeCredential.hash),
        ),
  )
    .to_address()
    .to_bech32(undefined);
}
