import { Address, Network , Credential, ScriptHash, KeyHash, RewardAddress} from "@anastasia-labs/core-types";
import { networkToId } from "./network.js";
import * as CML from "@dcspark/cardano-multiplatform-lib-nodejs"
import { getAddressDetails } from "./address.js";

export function credentialToAddress(
  network: Network,
  paymentCredential: Credential,
  stakeCredential?: Credential
): Address {
  if (stakeCredential) {
    return CML.BaseAddress.new(
      networkToId(network),
      paymentCredential.type === "Key"
        ? CML.Credential.new_pub_key(
            CML.Ed25519KeyHash.from_hex(paymentCredential.hash)
          )
        : CML.Credential.new_script(
            CML.ScriptHash.from_hex(paymentCredential.hash)
          ),
      stakeCredential.type === "Key"
        ? CML.Credential.new_pub_key(
            CML.Ed25519KeyHash.from_hex(stakeCredential.hash)
          )
        : CML.Credential.new_script(
            CML.ScriptHash.from_hex(stakeCredential.hash)
          )
    )
      .to_address()
      .to_bech32(undefined);
  } else {
    return CML.EnterpriseAddress.new(
      networkToId(network),
      paymentCredential.type === "Key"
        ? CML.Credential.new_pub_key(
            CML.Ed25519KeyHash.from_hex(paymentCredential.hash)
          )
        : CML.Credential.new_script(
            CML.ScriptHash.from_hex(paymentCredential.hash)
          )
    )
      .to_address()
      .to_bech32(undefined);
  }
}

export function scriptHashToCredential(scriptHash: ScriptHash): Credential {
  return {
    type: "Script",
    hash: scriptHash,
  };
}

export function keyHashToCredential(keyHash: KeyHash): Credential {
  return {
    type: "Key",
    hash: keyHash,
  };
}

export function paymentCredentialOf(address: Address): Credential {
  const { paymentCredential } = getAddressDetails(address);
  if (!paymentCredential) {
    throw new Error(
      "The specified address does not contain a payment credential.",
    );
  }
  return paymentCredential;
}

export function stakeCredentialOf(rewardAddress: RewardAddress): Credential {
  const { stakeCredential } = getAddressDetails(rewardAddress);
  if (!stakeCredential) {
    throw new Error(
      "The specified address does not contain a stake credential.",
    );
  }
  return stakeCredential;
}