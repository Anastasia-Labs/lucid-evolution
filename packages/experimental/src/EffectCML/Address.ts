import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Converts a hex or bech32 encoded address string to a CML Address object
 * @since 1.0.0
 * 
 * @example
 * ```ts
 * import { Address } from "@lucid-evolution/...";
 * 
 * // Hex address
 * const hexAddress = Address.fromHexOrBech32("8200581c4bf7c2640...")
 * 
 * // Bech32 address
 * const bech32Address = Address.fromHexOrBech32("addr1...")
 * ```
 */
export function unsafeFromHexOrBech32(address: string): CML.Address {
  try {
    return CML.Address.from_hex(address);
  } catch (_e) {
    try {
      return CML.Address.from_bech32(address);
    } catch (_e) {
      throw new Error(`Could not deserialize address ${address}.`);
    }
  }
}
