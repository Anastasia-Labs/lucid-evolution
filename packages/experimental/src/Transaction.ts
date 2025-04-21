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
 * 
 * $hash28 = bytes .size 28
 * 
 * $hash32 = bytes .size 32
 * 
 * url = text .size (0 .. 128)
 * 
 * anchor = [anchor_url : url, anchor_data_hash : $hash32]
 * 
 * ;               metadata: shelley
 * ;   transaction_metadata: shelley-ma
 * ; #6.259(0 ==> metadata): alonzo onwards
 * ; 
 * auxiliary_data = metadata
 *                   / [transaction_metadata : metadata
 *                     , auxiliary_scripts : [* native_script]]
 *                   / #6.259({? 0 : metadata
 *                            , ? 1 : [* native_script]
 *                            , ? 2 : [* plutus_v1_script]
 *                            , ? 3 : [* plutus_v2_script]
 *                            , ? 4 : [* plutus_v3_script]})
 * 
 * auxiliary_data_hash = $hash32
 * 
 * ; reward_account = bytes
 * ; 
 * reward_account = h'E090000000000000000000000000000000000000000000000000000000'
 *                   / h'F0A0000000000000000000000000000000000000000000000000000000'
 * 
 * coin = uint
 * 
 * positive_coin = 1 .. 18446744073709551615
 * 
 * withdrawals = {+ reward_account => coin}
 * 
 * slot_no = uint .size 8
 * 
 * mint = multiasset<nonZeroInt64>
 * 
 * int64 = -9223372036854775808 .. 9223372036854775807
 * 
 * posInt64 = 1 .. 9223372036854775807
 * 
 * negInt64 = -9223372036854775808 .. -1
 * 
 * nonZeroInt64 = negInt64 / posInt64
 * 
 * nonnegative_interval = #6.30([uint, positive_int])
 * 
 * ex_unit_prices = [mem_price : nonnegative_interval
 *                  , step_price : nonnegative_interval]
 * 
 * ex_units = [mem : uint, steps : uint]
 * 
 * network_id = 0 / 1
 * 
 * addr_keyhash = $hash28
 * 
 * required_signers = nonempty_set<addr_keyhash>
 * 
 * ; The format for cost_models is flexible enough to allow adding
 * ; Plutus built-ins and language versions in the future.
 * ; 
 * ; Plutus v1: only 166 integers are used, but more are accepted (and ignored)
 * ; Plutus v2: only 175 integers are used, but more are accepted (and ignored)
 * ; Plutus v3: only 223 integers are used, but more are accepted (and ignored)
 * ; 
 * ; Any 8-bit unsigned number can be used as a key.
 * ; 
 * cost_models = {? 0 : [* int64]
 *               , ? 1 : [* int64]
 *               , ? 2 : [* int64]
 *               , * 3 .. 255 => [* int64]}
 * 
 * ; This is a hash of data which may affect evaluation of a script.
 * ; This data consists of:
 * ;   - The redeemers from the transaction_witness_set (the value of field 5).
 * ;   - The datums from the transaction_witness_set (the value of field 4).
 * ;   - The value in the cost_models map corresponding to the script's language
 * ;     (in field 18 of protocol_param_update.)
 * ; (In the future it may contain additional protocol parameters.)
 * ; 
 * ; Since this data does not exist in contiguous form inside a transaction, it needs
 * ; to be independently constructed by each recipient.
 * ; 
 * ; The bytestring which is hashed is the concatenation of three things:
 * ;   redeemers || datums || language views
 * ; The redeemers are exactly the data present in the transaction witness set.
 * ; Similarly for the datums, if present. If no datums are provided, the middle
 * ; field is omitted (i.e. it is the empty/null bytestring).
 * ; 
 * ; language views CDDL:
 * ; { * language => script_integrity_data }
 * ; 
 * ; This must be encoded canonically, using the same scheme as in
 * ; RFC7049 section 3.9:
 * ;  - Maps, strings, and bytestrings must use a definite-length encoding
 * ;  - Integers must be as small as possible.
 * ;  - The expressions for map length, string length, and bytestring length
 * ;    must be as short as possible.
 * ;  - The keys in the map must be sorted as follows:
 * ;     -  If two keys have different lengths, the shorter one sorts earlier.
 * ;     -  If two keys have the same length, the one with the lower value
 * ;        in (byte-wise) lexical order sorts earlier.
 * ; 
 * ; For PlutusV1 (language id 0), the language view is the following:
 * ;   - the value of cost_models map at key 0 (in other words, the script_integrity_data)
 * ;     is encoded as an indefinite length list and the result is encoded as a bytestring.
 * ;     (our apologies)
 * ;     For example, the script_integrity_data corresponding to the all zero costmodel for V1
 * ;     would be encoded as (in hex):
 * ;     58a89f00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000ff
 * ;   - the language ID tag is also encoded twice. first as a uint then as
 * ;     a bytestring. (our apologies)
 * ;     Concretely, this means that the language version for V1 is encoded as
 * ;     4100 in hex.
 * ; For PlutusV2 (language id 1), the language view is the following:
 * ;   - the value of cost_models map at key 1 is encoded as an definite length list.
 * ;     For example, the script_integrity_data corresponding to the all zero costmodel for V2
 * ;     would be encoded as (in hex):
 * ;     98af0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
 * ;   - the language ID tag is encoded as expected.
 * ;     Concretely, this means that the language version for V2 is encoded as
 * ;     01 in hex.
 * ; For PlutusV3 (language id 2), the language view is the following:
 * ;   - the value of cost_models map at key 2 is encoded as a definite length list.
 * ; 
 * ; Note that each Plutus language represented inside a transaction must have
 * ; a cost model in the cost_models protocol parameter in order to execute,
 * ; regardless of what the script integrity data is.
 * ; 
 * ; Finally, note that in the case that a transaction includes datums but does not
 * ; include the redeemers field, the script data format becomes (in hex):
 * ; [ A0 | datums | A0 ]
 * ; corresponding to a CBOR empty map and an empty map for language view.
 * ; This empty redeeemer case has changed from the previous eras, since default
 * ; representation for redeemers has been changed to a map. Also whenever redeemers are
 * ; supplied either as a map or as an array they must contain at least one element,
 * ; therefore there is no way to override this behavior by providing a custom
 * ; representation for empty redeemers.
 * ; 
 * script_data_hash = $hash32
 * 
 * ; To compute a script hash, note that you must prepend
 * ; a tag to the bytes of the script before hashing.
 * ; The tag is determined by the language.
 * ; The tags in the Conway era are:
 * ;   "\x00" for multisig scripts
 * ;   "\x01" for Plutus V1 scripts
 * ;   "\x02" for Plutus V2 scripts
 * ;   "\x03" for Plutus V3 scripts
 * ; 
 * script_hash = $hash28
 * 
 * policy_hash = script_hash
 * 
 * credential = [0, addr_keyhash // 1, script_hash]
 * 
 * committee_cold_credential = credential
 * 
 * stake_credential = credential
 * 
 * ; This will be deprecated in a future era
 * stake_registration = (0, stake_credential)
 * 
 * certificate = [stake_registration
 *                // stake_deregistration
 *                // stake_delegation
 *                // pool_registration
 *                // pool_retirement
 *                // reg_cert
 *                // unreg_cert
 *                // vote_deleg_cert
 *                // stake_vote_deleg_cert
 *                // stake_reg_deleg_cert
 *                // vote_reg_deleg_cert
 *                // stake_vote_reg_deleg_cert
 *                // auth_committee_hot_cert
 *                // resign_committee_cold_cert
 *                // reg_drep_cert
 *                // unreg_drep_cert
 *                // update_drep_cert]
 * 
 * certificates = nonempty_set<certificate>
 * 
 * epoch_interval = uint .size 4
 * 
 * epoch_no = uint .size 8
 * 
 * ; The real unit_interval is: #6.30([uint, uint])
 * ; 
 * ; A unit interval is a number in the range between 0 and 1, which
 * ; means there are two extra constraints:
 * ;   1. numerator <= denominator
 * ;   2. denominator > 0
 * ; 
 * ; The relation between numerator and denominator can be
 * ; expressed in CDDL, but we have a limitation currently
 * ; (see: https://github.com/input-output-hk/cuddle/issues/30)
 * ; which poses a problem for testing. We need to be able to
 * ; generate random valid data for testing implementation of
 * ; our encoders/decoders. Which means we cannot use the actual
 * ; definition here and we hard code the value to 1/2
 * ; 
 * unit_interval = #6.30([1, 2])
 * 
 * pool_voting_thresholds = [unit_interval
 *                          , unit_interval
 *                          , unit_interval
 *                          , unit_interval
 *                          , unit_interval]
 * 
 * drep_voting_thresholds = [unit_interval
 *                          , unit_interval
 *                          , unit_interval
 *                          , unit_interval
 *                          , unit_interval
 *                          , unit_interval
 *                          , unit_interval
 *                          , unit_interval
 *                          , unit_interval
 *                          , unit_interval]
 * 
 * major_protocol_version = 1 .. 10
 * 
 * protocol_version = [major_protocol_version, uint]
 * 
 * ;  0: minfee A
 * ;  1: minfee B
 * ;  2: max block body size
 * ;  3: max transaction size
 * ;  4: max block header size
 * ;  5: key deposit
 * ;  6: pool deposit
 * ;  7: maximum epoch
 * ;  8: n_opt: desired number of stake pools
 * ;  9: pool pledge influence
 * ; 10: expansion rate
 * ; 11: treasury growth rate
 * ; 16: min pool cost
 * ; 17: ada per utxo byte
 * ; 18: cost models for script languages
 * ; 19: execution costs
 * ; 20: max tx ex units
 * ; 21: max block ex units
 * ; 22: max value size
 * ; 23: collateral percentage
 * ; 24: max collateral inputs
 * ; 25: pool voting thresholds
 * ; 26: drep voting thresholds
 * ; 27: min committee size
 * ; 28: committee term limit
 * ; 29: governance action validity period
 * ; 30: governance action deposit
 * ; 31: drep deposit
 * ; 32: drep inactivity period
 * ; 33: minfee refscriptcoinsperbyte
 * ; 
 * protocol_param_update = {? 0 : coin
 *                         , ? 1 : coin
 *                         , ? 2 : uint .size 4
 *                         , ? 3 : uint .size 4
 *                         , ? 4 : uint .size 2
 *                         , ? 5 : coin
 *                         , ? 6 : coin
 *                         , ? 7 : epoch_interval
 *                         , ? 8 : uint .size 2
 *                         , ? 9 : nonnegative_interval
 *                         , ? 10 : unit_interval
 *                         , ? 11 : unit_interval
 *                         , ? 16 : coin
 *                         , ? 17 : coin
 *                         , ? 18 : cost_models
 *                         , ? 19 : ex_unit_prices
 *                         , ? 20 : ex_units
 *                         , ? 21 : ex_units
 *                         , ? 22 : uint .size 4
 *                         , ? 23 : uint .size 2
 *                         , ? 24 : uint .size 2
 *                         , ? 25 : pool_voting_thresholds
 *                         , ? 26 : drep_voting_thresholds
 *                         , ? 27 : uint .size 2
 *                         , ? 28 : epoch_interval
 *                         , ? 29 : epoch_interval
 *                         , ? 30 : coin
 *                         , ? 31 : coin
 *                         , ? 32 : epoch_interval
 *                         , ? 33 : nonnegative_interval}
 * 
 * parameter_change_action = (0
 *                           , gov_action_id / nil
 *                           , protocol_param_update
 *                           , policy_hash / nil)
 * 
 * gov_action = [parameter_change_action
 *               // hard_fork_initiation_action
 *               // treasury_withdrawals_action
 *               // no_confidence
 *               // update_committee
 *               // new_constitution
 *               // info_action]
 * 
 * gov_action_id = [transaction_id : $hash32, gov_action_index : uint .size 2]
 * 
 * hard_fork_initiation_action = (1, gov_action_id / nil, protocol_version)
 * 
 * treasury_withdrawals_action = (2, {* reward_account => coin}, policy_hash / nil)
 * 
 * no_confidence = (3, gov_action_id / nil)
 * 
 * update_committee = (4
 *                    , gov_action_id / nil
 *                    , set<committee_cold_credential>
 *                    , {* committee_cold_credential => epoch_no}
 *                    , unit_interval)
 * 
 * new_constitution = (5, gov_action_id / nil, constitution)
 * 
 * constitution = [anchor, script_hash / nil]
 * 
 * info_action = 6
 * 
 * vote = 0 .. 2
 * 
 * ; 0: constitutional committee hot keyhash
 * ; 1: constitutional committee hot script_hash
 * ; 2: drep keyhash
 * ; 3: drep script_hash
 * ; 4: stakingpool keyhash
 * ; 
 * voter = [0, addr_keyhash
 *          // 1, script_hash
 *          // 2, addr_keyhash
 *          // 3, script_hash
 *          // 4, addr_keyhash]
 * 
 * voting_procedure = [vote, anchor / nil]
 * 
 * voting_procedures = {+ voter => {+ gov_action_id => voting_procedure}}
 * 
 * proposal_procedure = [deposit : coin, reward_account, gov_action, anchor]
 * 
 * proposal_procedures = nonempty_set<proposal_procedure>
 * 
 * multiasset<a0> = {+ policy_id => {+ asset_name => a0}}
 * 
 * nonempty_set<a0> = #6.258([+ a0]) / [+ a0]
 * 
 * set<a0> = #6.258([* a0]) / [* a0]
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
