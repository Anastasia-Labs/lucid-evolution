import { describe, expect, test } from "vitest";
import { AddressDetails, Credential } from "@lucid-evolution/core-types";
import { CMLOwn, toHex, withCMLScope } from "@lucid-evolution/core-utils";
import { CML } from "../src/core.js";
import { addressFromHexOrBech32, getAddressDetails } from "../src/address.js";

// The implementation getAddressDetails replaced: try every address kind in
// turn and use exceptions to move on. Kept as the oracle for parity.
const oldCredentialDetails = (
  credential: CML.Credential,
  own: CMLOwn,
): Credential =>
  credential.kind() === 0
    ? { type: "Key", hash: own(credential.as_pub_key()!).to_hex() }
    : { type: "Script", hash: own(credential.as_script()!).to_hex() };

const oldAddressDetails = (address: CML.Address) => ({
  networkId: address.network_id(),
  bech32: address.to_bech32(undefined),
  hex: address.to_hex(),
});

function oldGetAddressDetails(address: string): AddressDetails {
  try {
    return withCMLScope((own) => {
      const parsedAddress = own(
        CML.BaseAddress.from_address(own(addressFromHexOrBech32(address))),
      )!;
      const paymentCredential = oldCredentialDetails(
        own(parsedAddress.payment()),
        own,
      );
      const stakeCredential = oldCredentialDetails(
        own(parsedAddress.stake()),
        own,
      );
      const { networkId, ...details } = oldAddressDetails(
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
  try {
    return withCMLScope((own) => {
      const parsedAddress = own(
        CML.EnterpriseAddress.from_address(
          own(addressFromHexOrBech32(address)),
        ),
      )!;
      const paymentCredential = oldCredentialDetails(
        own(parsedAddress.payment()),
        own,
      );
      const { networkId, ...details } = oldAddressDetails(
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
  try {
    return withCMLScope((own) => {
      const parsedAddress = own(
        CML.PointerAddress.from_address(own(addressFromHexOrBech32(address))),
      )!;
      const paymentCredential = oldCredentialDetails(
        own(parsedAddress.payment()),
        own,
      );
      const { networkId, ...details } = oldAddressDetails(
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
  try {
    return withCMLScope((own) => {
      const parsedAddress = own(
        CML.RewardAddress.from_address(own(addressFromHexOrBech32(address))),
      )!;
      const stakeCredential = oldCredentialDetails(
        own(parsedAddress.payment()),
        own,
      );
      const { networkId, ...details } = oldAddressDetails(
        own(parsedAddress.to_address()),
      );
      return { type: "Reward", networkId, address: details, stakeCredential };
    });
  } catch (_e) {
    /* pass */
  }
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

// Deterministic generator so failures reproduce.
let seed = 0x2545f491;
const nextByte = () => {
  seed ^= seed << 13;
  seed ^= seed >>> 17;
  seed ^= seed << 5;
  return (seed >>> 0) & 0xff;
};
const randomBytes = (length: number) =>
  Uint8Array.from({ length }, () => nextByte());

const varint = (value: number): number[] => {
  const bytes = [value & 0x7f];
  value = Math.floor(value / 128);
  while (value > 0) {
    bytes.unshift((value & 0x7f) | 0x80);
    value = Math.floor(value / 128);
  }
  return bytes;
};

const shelleyAddressBytes = (): Uint8Array[] => {
  const out: Uint8Array[] = [];
  for (const network of [0, 1, 2, 7, 15]) {
    for (let round = 0; round < 6; round++) {
      // Base: header types 0-3 select key/script for payment and stake.
      for (let type = 0; type <= 3; type++) {
        out.push(
          Uint8Array.from([
            (type << 4) | network,
            ...randomBytes(28),
            ...randomBytes(28),
          ]),
        );
      }
      // Pointer: header types 4-5.
      for (let type = 4; type <= 5; type++) {
        out.push(
          Uint8Array.from([
            (type << 4) | network,
            ...randomBytes(28),
            ...varint(nextByte() * 100_000),
            ...varint(nextByte()),
            ...varint(nextByte() % 4),
          ]),
        );
      }
      // Enterprise: header types 6-7.
      for (let type = 6; type <= 7; type++) {
        out.push(Uint8Array.from([(type << 4) | network, ...randomBytes(28)]));
      }
      // Reward: header types 14-15.
      for (let type = 14; type <= 15; type++) {
        out.push(Uint8Array.from([(type << 4) | network, ...randomBytes(28)]));
      }
    }
  }
  return out;
};

const byronAddresses = (): string[] =>
  withCMLScope((own) => {
    const out: string[] = [];
    for (const magic of [764824073, 1, 2, 1097911063]) {
      for (let i = 0; i < 3; i++) {
        const key = own(CML.Bip32PrivateKey.generate_ed25519_bip32());
        const content = own(
          CML.AddressContent.icarus_from_key(
            own(key.to_public()),
            own(CML.ProtocolMagic.new(magic)),
          ),
        );
        const byron = own(CML.ByronAddress.from_address_content(content));
        out.push(byron.to_base58(), byron.to_cbor_hex());
      }
    }
    return out;
  });

const allInputs = (): string[] => {
  const inputs: string[] = [];
  for (const bytes of shelleyAddressBytes()) {
    const hex = toHex(bytes);
    inputs.push(hex, hex.toUpperCase());
    withCMLScope((own) => {
      const address = own(CML.Address.from_raw_bytes(bytes));
      inputs.push(address.to_bech32(undefined));
      inputs.push(address.to_bech32("custom"));
    });
    // Truncated and extended encodings must fail (or succeed) the same way.
    inputs.push(hex.slice(0, -2), hex + "00");
  }
  inputs.push(...byronAddresses());
  inputs.push(
    "",
    "00",
    "zz",
    "not an address",
    "addr_test1",
    "stake1uyehkck0lajq8gr28t9uxnuvgcqrc6070x3k9r8048z8y5gh6ffgw",
    "addr1vx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzers66hrl8",
    "Ae2tdPwUPEZFRbyhz3cpfC2CumGzNkFBN2L42rcUc2yjQpEkxDbkPodpMAi",
    toHex(randomBytes(57)),
    toHex(randomBytes(29)),
  );
  return inputs;
};

const outcome = (run: () => AddressDetails) => {
  try {
    return { ok: true as const, value: run() };
  } catch (error) {
    return { ok: false as const, message: (error as Error).message };
  }
};

describe("getAddressDetails parity with the previous implementation", () => {
  const inputs = allInputs();

  test("every address type, encoding and network matches", () => {
    let matched = 0;
    const types = new Set<string>();
    for (const input of inputs) {
      const expected = outcome(() => oldGetAddressDetails(input));
      // Twice: the second call is served from the cache.
      expect(
        outcome(() => getAddressDetails(input)),
        input,
      ).toStrictEqual(expected);
      expect(
        outcome(() => getAddressDetails(input)),
        input,
      ).toStrictEqual(expected);
      if (expected.ok) {
        matched++;
        types.add(expected.value.type);
      }
    }
    expect(types).toEqual(
      new Set(["Base", "Enterprise", "Pointer", "Reward", "Byron"]),
    );
    expect(matched).toBeGreaterThan(500);
  });

  test("callers cannot mutate cached results", () => {
    const input = inputs.find(
      (input) => outcome(() => getAddressDetails(input)).ok,
    )!;
    const first = getAddressDetails(input);
    const snapshot = structuredClone(first);
    first.address.hex = "mutated";
    first.paymentCredential!.hash = "mutated";
    first.networkId = 99;
    expect(getAddressDetails(input)).toStrictEqual(snapshot);
  });
});
