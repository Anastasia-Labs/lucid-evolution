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
 * applies, without loading that package. A CIP-129 header must name a DRep
 * (`0x2_`) and a key hash (`0x22`) or script hash (`0x23`), which
 * `@cardano-sdk/core` does not check.
 *
 * @example
 * import { drepIDToCredential } from "@lucid-evolution/utils";
 *
 * drepIDToCredential("drep1y2sm9s75uhmqwxpf8f94cmt737g2rvkr6njlvpcc9yaykhq23nmjy");
 * // { type: "Key", hash: "a1b2c3d4e5f60718293a4b5c6d7e8f90a1b2c3d4e5f60718293a4b5c" }
 *
 * @since 0.1.65
 * @category Credentials
 */
export const drepIDToCredential = (drepID: string): Credential => {
  const decoded = bech32.decodeUnsafe(drepID, 1023);
  if (!decoded) throw new Error(`Invalid DRep ID: ${drepID}`);
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
  if (header !== 0x22 && header !== 0x23) {
    throw new Error(
      `Invalid DRep ID: ${drepID}, header 0x${header.toString(16).padStart(2, "0")} is neither a DRep key hash (0x22) nor a script hash (0x23)`,
    );
  }
  return {
    type: header === 0x23 ? "Script" : "Key",
    hash: toHex(payload.subarray(1)),
  };
};
