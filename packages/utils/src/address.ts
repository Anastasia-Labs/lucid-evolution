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

const HEX_PATTERN = /^[0-9a-fA-F]*$/;

/**
 * Parses a hex or bech32 address, or returns `undefined` when it is neither.
 * Equivalent to `addressFromHexOrBech32` but skips the decoder that cannot
 * succeed, so the common bech32 case does not throw internally.
 */
const parseShelleyAddress = (address: string): CML.Address | undefined => {
  if (HEX_PATTERN.test(address)) {
    try {
      return CML.Address.from_hex(address);
    } catch (_e) {
      /* fall through to bech32, matching addressFromHexOrBech32 */
    }
  }
  try {
    return CML.Address.from_bech32(address);
  } catch (_e) {
    return undefined;
  }
};

const shelleyAddressDetails = (
  address: CML.Address,
  own: CMLOwn,
): AddressDetails | undefined => {
  switch (address.kind()) {
    case CML.AddressKind.Base: {
      const parsedAddress = own(CML.BaseAddress.from_address(address))!;
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
    }
    case CML.AddressKind.Enterprise: {
      const parsedAddress = own(CML.EnterpriseAddress.from_address(address))!;
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
    }
    case CML.AddressKind.Ptr: {
      const parsedAddress = own(CML.PointerAddress.from_address(address))!;
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
    }
    case CML.AddressKind.Reward: {
      const parsedAddress = own(CML.RewardAddress.from_address(address))!;
      const stakeCredential = credentialDetails(
        own(parsedAddress.payment()),
        own,
      );
      const { networkId, ...details } = addressDetails(
        own(parsedAddress.to_address()),
      );
      return { type: "Reward", networkId, address: details, stakeCredential };
    }
    default:
      return undefined;
  }
};

// Limited support for Byron addresses
const byronAddressDetails = (address: string): AddressDetails | undefined =>
  withCMLScope((own) => {
    const parsedAddress = own(
      ((address: string): CML.ByronAddress | undefined => {
        if (HEX_PATTERN.test(address)) {
          try {
            return CML.ByronAddress.from_cbor_hex(address);
          } catch (_e) {
            /* fall through to base58 */
          }
        }
        try {
          return CML.ByronAddress.from_base58(address);
        } catch (_e) {
          return undefined;
        }
      })(address),
    );
    if (!parsedAddress) return undefined;
    return {
      type: "Byron",
      networkId: own(parsedAddress.content()).network_id(),
      address: {
        bech32: "",
        hex: own(parsedAddress.to_address()).to_hex(),
      },
    };
  });

const parseAddressDetails = (address: string): AddressDetails => {
  try {
    const details = withCMLScope((own) => {
      const parsedAddress = own(parseShelleyAddress(address));
      return parsedAddress && shelleyAddressDetails(parsedAddress, own);
    });
    if (details) return details;
  } catch (_e) {
    /* pass */
  }

  try {
    const details = byronAddressDetails(address);
    if (details) return details;
  } catch (_e) {
    /* pass */
  }

  throw new Error("No address type matched for: " + address);
};

const ADDRESS_DETAILS_CACHE_CAPACITY = 10_000;
const addressDetailsCache = new Map<string, AddressDetails>();

const copyCredential = (credential: Credential): Credential => ({
  type: credential.type,
  hash: credential.hash,
});

/** Returns a copy so callers can never mutate a cached entry. */
const copyAddressDetails = (details: AddressDetails): AddressDetails => {
  const copy: AddressDetails = {
    type: details.type,
    networkId: details.networkId,
    address: { bech32: details.address.bech32, hex: details.address.hex },
  };
  if (details.paymentCredential) {
    copy.paymentCredential = copyCredential(details.paymentCredential);
  }
  if (details.stakeCredential) {
    copy.stakeCredential = copyCredential(details.stakeCredential);
  }
  return copy;
};

/** Address can be in Bech32 or Hex. */
export function getAddressDetails(address: string): AddressDetails {
  let details = addressDetailsCache.get(address);
  if (!details) {
    details = parseAddressDetails(address);
    if (addressDetailsCache.size >= ADDRESS_DETAILS_CACHE_CAPACITY) {
      // Evict the oldest entry; Map iterates in insertion order.
      addressDetailsCache.delete(addressDetailsCache.keys().next().value!);
    }
    addressDetailsCache.set(address, details);
  }
  return copyAddressDetails(details);
}
