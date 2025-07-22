import { Schema } from "effect";

/**
 * Bech32 address format schema (human-readable addresses)
 * Following CIP-0019 encoding requirements
 *
 * @since 2.0.0
 * @category schemas
 */
export const PaymentAddress = Schema.String.pipe(
  Schema.pattern(/^(addr|addr_test)[1][a-z0-9]+$/i),
).pipe(Schema.brand("PaymentAddress"));

/**
 * Type representing a payment address string in bech32 format
 *
 * @since 2.0.0
 * @category model
 */
export type PaymentAddress = Schema.Schema.Type<typeof PaymentAddress>;

/**
 * Check if the given value is a valid PaymentAddress
 *
 * @example
 * import { PaymentAddress } from "@evolution-sdk/experimental";
 * import assert from "assert";
 *
 * const isValid = PaymentAddress.isPaymentAddress("addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x");
 * assert(isValid === true);
 *
 * @since 2.0.0
 * @category predicates
 */
export const isPaymentAddress = Schema.is(PaymentAddress);
