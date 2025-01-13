import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";
import * as Network from "./Network.js";
import * as Validator from "./Validator.js";
import * as EffectCML from "./EffectCML/index.js";
import {
  AddressDetails,
  Certificate,
  RewardAddress,
  Withdrawal,
  Credential,
} from "./Type.js";

export function validatorToRewardAddress(
  network: Network.Network,
  validator: Certificate | Withdrawal,
): RewardAddress {
  const validatorHash = Validator.toScriptHash(validator);
  return CML.RewardAddress.new(
    Network.toId(network),
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
      EffectCML.Address.unsafeFromHexOrBech32(address),
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
      EffectCML.Address.unsafeFromHexOrBech32(address),
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
      EffectCML.Address.unsafeFromHexOrBech32(address),
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
      EffectCML.Address.unsafeFromHexOrBech32(address),
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
