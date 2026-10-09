import {
  Address,
  Network,
  Credential,
  ScriptHash,
  KeyHash,
  RewardAddress,
} from "@lucid-evolution/core-types";
import { networkToId } from "./network.js";
import { CML } from "./core.js";
import { getAddressDetails } from "./address.js";
import { toHex } from "@lucid-evolution/core-utils";
import { bech32 } from "@scure/base";

export function credentialToAddress(
  network: Network,
  paymentCredential: Credential,
  stakeCredential?: Credential,
): Address {
  if (stakeCredential) {
    return CML.BaseAddress.new(
      networkToId(network),
      paymentCredential.type === "Key"
        ? CML.Credential.new_pub_key(
            CML.Ed25519KeyHash.from_hex(paymentCredential.hash),
          )
        : CML.Credential.new_script(
            CML.ScriptHash.from_hex(paymentCredential.hash),
          ),
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
  } else {
    return CML.EnterpriseAddress.new(
      networkToId(network),
      paymentCredential.type === "Key"
        ? CML.Credential.new_pub_key(
            CML.Ed25519KeyHash.from_hex(paymentCredential.hash),
          )
        : CML.Credential.new_script(
            CML.ScriptHash.from_hex(paymentCredential.hash),
          ),
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

/**
 * Accepts CIP-105 IDs (`drep` or `drep_script` and the bare hash) and CIP-129
 * IDs (`drep`, a header byte and the hash), with the checks `@cardano-sdk/core`
 * applies, without loading that package.
 */
export const drepIDToCredential = (drepID: string): Credential => {
  let decoded: { prefix: string; words: number[] };
  try {
    decoded = bech32.decode(drepID as `${string}1${string}`, 1023);
  } catch {
    throw new Error(`Invalid DRep ID: ${drepID}`);
  }
  const { prefix, words } = decoded;
  const isValid =
    (prefix === "drep" && (words.length === 47 || words.length === 45)) ||
    (prefix === "drep_script" && words.length === 45);
  if (!isValid) throw new Error(`Invalid DRep ID: ${drepID}`);

  const payload = bech32.fromWords(words);
  if (payload.length === 28) {
    return {
      type: drepID.includes("drep_script") ? "Script" : "Key",
      hash: toHex(payload),
    };
  }
  const header = payload[0];
  if ((header & 0x20) !== 0x20) {
    throw new Error("Invalid governance credential type");
  }
  return {
    type: (header & 0x03) === 0x03 ? "Script" : "Key",
    hash: toHex(payload.subarray(1)),
  };
};
