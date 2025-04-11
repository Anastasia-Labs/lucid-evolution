import * as Network from "./Network.js";
import * as Script from "./Script.js";
import * as CML from "./CML/index.js";
import * as Credential from "./Credential_old.js";

/** Bech32 */
export type RewardAddress = string;

/** Bech32 */
export type Address = string;

export type AddressType =
  | "Base"
  | "Enterprise"
  | "Pointer"
  | "Reward"
  | "Byron";

export type AddressDetails = {
  type: AddressType;
  networkId: number;
  address: { bech32: Address; hex: string };
  paymentCredential?: Credential.Credential;
  stakeCredential?: Credential.Credential;
};

export function validatorToRewardAddress(
  network: Network.Network,
  validator: Script.Certificate | Script.Withdrawal,
): RewardAddress {
  const validatorHash = Script.toScriptHash(validator);
  return CML.RewardAddress._newUnsafe(
    Network.toId(network),
    CML.Credential.newScriptUnsafe(CML.ScriptHash.fromHexUnsafe(validatorHash)),
  )
    .to_address()
    .to_bech32(undefined);
}

/** Address can be in Bech32 or Hex. */
export function getAddressDetails(address: string): AddressDetails {
  // Base Address
  try {
    const parsedAddress = CML.BaseAddress.fromAddressUnsafe(
      unsafeFromHexOrBech32(address),
    )!;
    const paymentCredential: Credential.Credential =
      parsedAddress.payment().kind() === 0
        ? {
            type: "Key",
            hash: parsedAddress.payment().as_pub_key()!.to_hex(),
          }
        : {
            type: "Script",
            hash: parsedAddress.payment().as_script()!.to_hex(),
          };
    const stakeCredential: Credential.Credential =
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
    const parsedAddress = CML.EnterpriseAddress.fromAddressUnsafe(
      unsafeFromHexOrBech32(address),
    )!;
    const paymentCredential: Credential.Credential =
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
    const parsedAddress = CML.PointerAddress.fromAddressUnsafe(
      unsafeFromHexOrBech32(address),
    )!;
    const paymentCredential: Credential.Credential =
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
    const parsedAddress = CML.RewardAddress.fromAddressUnsafe(
      unsafeFromHexOrBech32(address),
    )!;
    const stakeCredential: Credential.Credential =
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
    const parsedAddress = ((address: string): CML.ByronAddress.ByronAddress => {
      try {
        return CML.ByronAddress.fromCborHexUnsafe(address);
      } catch (_e) {
        try {
          return CML.ByronAddress.fromBase58Unsafe(address);
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

export function unsafeFromHexOrBech32(address: string): CML.Address.Address {
  try {
    return CML.Address.fromHexUnsafe(address);
  } catch (_e) {
    try {
      return CML.Address.fromBech32Unsafe(address);
    } catch (_e) {
      throw new Error("Could not deserialize address.");
    }
  }
}
