import {
  Credential,
  AddressDetails,
  Network,
  RewardAddress,
  CertificateValidator,
  WithdrawalValidator,
} from "@lucid-evolution/core-types";
import { CMLOwn, withCMLScope } from "@lucid-evolution/core-utils";
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
  return withCMLScope((own) => {
    const credential =
      stakeCredential.type === "Key"
        ? own(
            CML.Credential.new_pub_key(
              own(CML.Ed25519KeyHash.from_hex(stakeCredential.hash)),
            ),
          )
        : own(
            CML.Credential.new_script(
              own(CML.ScriptHash.from_hex(stakeCredential.hash)),
            ),
          );
    const rewardAddress = own(
      CML.RewardAddress.new(networkToId(network), credential),
    );
    return own(rewardAddress.to_address()).to_bech32(undefined);
  });
}

export function validatorToRewardAddress(
  network: Network,
  validator: CertificateValidator | WithdrawalValidator,
): RewardAddress {
  const validatorHash = validatorToScriptHash(validator);
  return withCMLScope((own) => {
    const credential = own(
      CML.Credential.new_script(own(CML.ScriptHash.from_hex(validatorHash))),
    );
    const rewardAddress = own(
      CML.RewardAddress.new(networkToId(network), credential),
    );
    return own(rewardAddress.to_address()).to_bech32(undefined);
  });
}

const credentialDetails = (
  credential: CML.Credential,
  own: CMLOwn,
): Credential =>
  credential.kind() === 0
    ? { type: "Key", hash: own(credential.as_pub_key()!).to_hex() }
    : { type: "Script", hash: own(credential.as_script()!).to_hex() };

const addressDetails = (
  address: CML.Address,
): AddressDetails["address"] & { networkId: number } => ({
  networkId: address.network_id(),
  bech32: address.to_bech32(undefined),
  hex: address.to_hex(),
});

/** Address can be in Bech32 or Hex. */
export function getAddressDetails(address: string): AddressDetails {
  // Base Address
  try {
    return withCMLScope((own) => {
      const parsedAddress = own(
        CML.BaseAddress.from_address(own(addressFromHexOrBech32(address))),
      )!;
      const paymentCredential = credentialDetails(
        own(parsedAddress.payment()),
        own,
      );
      const stakeCredential = credentialDetails(
        own(parsedAddress.stake()),
        own,
      );
      const { networkId, ...details } = addressDetails(
        own(parsedAddress.to_address()),
      );
      return {
        type: "Base",
        networkId,
        address: details,
        paymentCredential,
        stakeCredential,
      };
    });
  } catch (_e) {
    /* pass */
  }

  // Enterprise Address
  try {
    return withCMLScope((own) => {
      const parsedAddress = own(
        CML.EnterpriseAddress.from_address(
          own(addressFromHexOrBech32(address)),
        ),
      )!;
      const paymentCredential = credentialDetails(
        own(parsedAddress.payment()),
        own,
      );
      const { networkId, ...details } = addressDetails(
        own(parsedAddress.to_address()),
      );
      return {
        type: "Enterprise",
        networkId,
        address: details,
        paymentCredential,
      };
    });
  } catch (_e) {
    /* pass */
  }

  // Pointer Address
  try {
    return withCMLScope((own) => {
      const parsedAddress = own(
        CML.PointerAddress.from_address(own(addressFromHexOrBech32(address))),
      )!;
      const paymentCredential = credentialDetails(
        own(parsedAddress.payment()),
        own,
      );
      const { networkId, ...details } = addressDetails(
        own(parsedAddress.to_address()),
      );
      return {
        type: "Pointer",
        networkId,
        address: details,
        paymentCredential,
      };
    });
  } catch (_e) {
    /* pass */
  }

  // Reward Address
  try {
    return withCMLScope((own) => {
      const parsedAddress = own(
        CML.RewardAddress.from_address(own(addressFromHexOrBech32(address))),
      )!;
      const stakeCredential = credentialDetails(
        own(parsedAddress.payment()),
        own,
      );
      const { networkId, ...details } = addressDetails(
        own(parsedAddress.to_address()),
      );
      return { type: "Reward", networkId, address: details, stakeCredential };
    });
  } catch (_e) {
    /* pass */
  }

  // Limited support for Byron addresses
  try {
    return withCMLScope((own) => {
      const parsedAddress = own(
        ((address: string): CML.ByronAddress => {
          try {
            return CML.ByronAddress.from_cbor_hex(address);
          } catch (_e) {
            try {
              return CML.ByronAddress.from_base58(address);
            } catch (_e) {
              throw new Error("Could not deserialize address.");
            }
          }
        })(address),
      );

      return {
        type: "Byron",
        networkId: own(parsedAddress.content()).network_id(),
        address: {
          bech32: "",
          hex: own(parsedAddress.to_address()).to_hex(),
        },
      };
    });
  } catch (_e) {
    /* pass */
  }

  throw new Error("No address type matched for: " + address);
}
