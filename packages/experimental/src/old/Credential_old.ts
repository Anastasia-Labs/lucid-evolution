import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";
import * as Network from "../Network.js";
import * as Address from "./Address_old.js";
import * as KeyHash from "./KeyHash_old.js";
import * as ScriptHash from "./ScriptHash_old.js";

export type Credential = {
  type: "Key" | "Script";
  hash: KeyHash.KeyHash | ScriptHash.ScriptHash;
};

export function toRewardAddress(
  network: Network.Network,
  stakeCredential: Credential,
): Address.RewardAddress {
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
