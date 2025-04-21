import { Data } from "effect";

/**
 * CDDL Specs
 * transaction = [transaction_body
 *               , transaction_witness_set
 *               , bool
 *               , auxiliary_data / nil]
 * 
 * transaction_body = {0 : set<transaction_input>
 *                    , 1 : [* transaction_output]
 *                    , 2 : coin
 *                    , ? 3 : slot_no
 *                    , ? 4 : certificates
 *                    , ? 5 : withdrawals
 *                    , ? 7 : auxiliary_data_hash
 *                    , ? 8 : slot_no
 *                    , ? 9 : mint
 *                    , ? 11 : script_data_hash
 *                    , ? 13 : nonempty_set<transaction_input>
 *                    , ? 14 : required_signers
 *                    , ? 15 : network_id
 *                    , ? 16 : transaction_output
 *                    , ? 17 : coin
 *                    , ? 18 : nonempty_set<transaction_input>
 *                    , ? 19 : voting_procedures
 *                    , ? 20 : proposal_procedures
 *                    , ? 21 : coin
 *                    , ? 22 : positive_coin}
 * 
 * transaction_index = uint .size 2
 * 
 * transaction_input = [transaction_id : $hash32, index : uint .size 2]
 * 
 * transaction_metadatum = {* transaction_metadatum => transaction_metadatum}
 *                          / [* transaction_metadatum]
 *                          / int
 *                          / bytes .size (0 .. 64)
 *                          / text .size (0 .. 64)
 * 
 * transaction_metadatum_label = uint .size 8
 * 
 * ; Both of the Alonzo and Babbage style TxOut formats are equally valid
 * ; and can be used interchangeably
 * ; 
 * transaction_output = shelley_transaction_output / babbage_transaction_output
 * 
 * transaction_witness_set = {? 0 : nonempty_set<vkeywitness>
 *                           , ? 1 : nonempty_set<native_script>
 *                           , ? 2 : nonempty_set<bootstrap_witness>
 *                           , ? 3 : nonempty_set<plutus_v1_script>
 *                           , ? 4 : nonempty_set<plutus_data>
 *                           , ? 5 : redeemers
 *                           , ? 6 : nonempty_set<plutus_v2_script>
 *                           , ? 7 : nonempty_set<plutus_v3_script>}
 */

/**
 * Error thrown when transaction operations fail
 *
 * @since 2.0.0
 * @category model
 */
export class TransactionError extends Data.TaggedError("TransactionError")<{
  message: string;
  cause?: unknown;
}> { }
