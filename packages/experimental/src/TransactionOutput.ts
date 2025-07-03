import { Schema } from "effect";
import * as Address from "./Address.js";
import * as Value from "./Value.js";
import * as Hash32 from "./Hash32.js";

/**
 * TransactionOutput types based on Conway CDDL specification
 *
 * CDDL: transaction_output = shelley_transaction_output / babbage_transaction_output
 *
 * shelley_transaction_output = [address, amount : value, ? hash32]
 *
 * babbage_transaction_output =
 *   {0 : address, 1 : value, ? 2 : datum_option, ? 3 : script_ref}
 *
 * @since 2.0.0
 * @category model
 */

/**
 * Shelley-era transaction output format
 *
 * CDDL: shelley_transaction_output = [address, amount : value, ? hash32]
 *
 * @since 2.0.0
 * @category model
 */
export class ShelleyTransactionOutput extends Schema.TaggedClass<ShelleyTransactionOutput>()(
  "ShelleyTransactionOutput",
  {
    address: Address.Address,
    amount: Value.ValueSchema,
    datumHash: Schema.optional(Hash32.HexSchema),
  },
) {}

/**
 * Babbage-era transaction output format
 *
 * CDDL: babbage_transaction_output =
 *   {0 : address, 1 : value, ? 2 : datum_option, ? 3 : script_ref}
 *
 * @since 2.0.0
 * @category model
 */
export class BabbageTransactionOutput extends Schema.TaggedClass<BabbageTransactionOutput>()(
  "BabbageTransactionOutput",
  {
    address: Address.Address, // 0
    amount: Value.ValueSchema, // 1
    // datumOption: Schema.optional(DatumOption.DatumOption), // 2
    // scriptRef: Schema.optional(ScriptRef.ScriptRef), // 3
  },
) {}

/**
 * Union type for transaction outputs
 *
 * CDDL: transaction_output = shelley_transaction_output / babbage_transaction_output
 *
 * @since 2.0.0
 * @category schemas
 */
export const TransactionOutput = Schema.Union(
  ShelleyTransactionOutput,
  BabbageTransactionOutput,
);

export type TransactionOutput = Schema.Schema.Type<typeof TransactionOutput>;

//TODO: Implement CBORHexSchema when CBORBytesSchema is complete
