import {
  Credential,
  AddressDetails,
  Network,
  RewardAddress,
  CertificateValidator,
  WithdrawalValidator,
} from "@evolution-sdk/core-types";
import { CML } from "./core.js";
import { networkToId } from "./network.js";
import { validatorToScriptHash } from "./scripts.js";

export function addressFromHexOrBech32(address: string): CML.Address {
  try {
    return CML.Address.from_hex(address);
  } catch (_e) {
    try {
      return CML.Address.from_bech32(address);
    } catch (_e) {
      throw new Error("Could not deserialize address.");
    }
  }
}

export function credentialToRewardAddress(
  network: Network,
  stakeCredential: Credential,
): RewardAddress {
  return CML.RewardAddress.new(
    networkToId(network),
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

export function validatorToRewardAddress(
  network: Network,
  validator: CertificateValidator | WithdrawalValidator,
): RewardAddress {
  const validatorHash = validatorToScriptHash(validator);
  return CML.RewardAddress.new(
    networkToId(network),
    CML.Credential.new_script(CML.ScriptHash.from_hex(validatorHash)),
  )
    .to_address()
    .to_bech32(undefined);
}

/** Address can be in Bech32 or Hex. */
export function getAddressDetails(address: string): AddressDetails {
  // Base Address
  try {
    const parsedAddress = CML.BaseAddress.from_address(
      addressFromHexOrBech32(address),
    )!;
    const paymentCredential: Credential =
      parsedAddress.payment().kind() === 0
        ? {
            type: "Key",
            hash: parsedAddress.payment().as_pub_key()!.to_hex(),
          }
        : {
            type: "Script",
            hash: parsedAddress.payment().as_script()!.to_hex(),
          };
    const stakeCredential: Credential =
      parsedAddress.stake().kind() === 0
        ? {
            type: "Key",
            hash: parsedAddress.stake().as_pub_key()!.to_hex(),
          }
        : {
            type: "Script",
            hash: parsedAddress.stake().as_script()!.to_hex(),
          };
    return {
      type: "Base",
      networkId: parsedAddress.to_address().network_id(),
      address: {
        bech32: parsedAddress.to_address().to_bech32(undefined),
        hex: parsedAddress.to_address().to_hex(),
      },
      paymentCredential,
      stakeCredential,
    };
  } catch (_e) {
    /* pass */
  }

  // Enterprise Address
  try {
    const parsedAddress = CML.EnterpriseAddress.from_address(
      addressFromHexOrBech32(address),
    )!;
    const paymentCredential: Credential =
      parsedAddress.payment().kind() === 0
        ? {
            type: "Key",
            hash: parsedAddress.payment().as_pub_key()!.to_hex(),
          }
        : {
            type: "Script",
            hash: parsedAddress.payment().as_script()!.to_hex(),
          };
    return {
      type: "Enterprise",
      networkId: parsedAddress.to_address().network_id(),
      address: {
        bech32: parsedAddress.to_address().to_bech32(undefined),
        hex: parsedAddress.to_address().to_hex(),
      },
      paymentCredential,
    };
  } catch (_e) {
    /* pass */
  }

  // Pointer Address
  try {
    const parsedAddress = CML.PointerAddress.from_address(
      addressFromHexOrBech32(address),
    )!;
    const paymentCredential: Credential =
      parsedAddress?.payment().kind() === 0
        ? {
            type: "Key",
            hash: parsedAddress.payment().as_pub_key()!.to_hex(),
          }
        : {
            type: "Script",
            hash: parsedAddress.payment().as_script()!.to_hex(),
          };
    return {
      type: "Pointer",
      networkId: parsedAddress.to_address().network_id(),
      address: {
        bech32: parsedAddress.to_address().to_bech32(undefined),
        hex: parsedAddress.to_address().to_hex(),
      },
      paymentCredential,
    };
  } catch (_e) {
    /* pass */
  }

  // Reward Address
  try {
    const parsedAddress = CML.RewardAddress.from_address(
      addressFromHexOrBech32(address),
    )!;
    const stakeCredential: Credential =
      parsedAddress.payment().kind() === 0
        ? {
            type: "Key",
            hash: parsedAddress.payment().as_pub_key()!.to_hex(),
          }
        : {
            type: "Script",
            hash: parsedAddress.payment().as_script()!.to_hex(),
          };
    return {
      type: "Reward",
      networkId: parsedAddress.to_address().network_id(),
      address: {
        bech32: parsedAddress.to_address().to_bech32(undefined),
        hex: parsedAddress.to_address().to_hex(),
      },
      stakeCredential,
    };
  } catch (_e) {
    /* pass */
  }

  // Limited support for Byron addresses
  try {
    const parsedAddress = ((address: string): CML.ByronAddress => {
      try {
        return CML.ByronAddress.from_cbor_hex(address);
      } catch (_e) {
        try {
          return CML.ByronAddress.from_base58(address);
        } catch (_e) {
          throw new Error("Could not deserialize address.");
        }
      }
    })(address);

    return {
      type: "Byron",
      networkId: parsedAddress.content().network_id(),
      address: {
        bech32: "",
        hex: parsedAddress.to_address().to_hex(),
      },
    };
  } catch (_e) {
    /* pass */
  }

  throw new Error("No address type matched for: " + address);
}
