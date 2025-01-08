import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";
export function fromHexOrBech32(address: string): CML.Address {
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
