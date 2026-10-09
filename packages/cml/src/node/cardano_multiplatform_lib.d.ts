/* tslint:disable */
/* eslint-disable */

export class AddrAttributes {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    derivation_path(): HDAddressPayload | undefined;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): AddrAttributes;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): AddrAttributes;
    static new(): AddrAttributes;
    static new_bootstrap_era(hdap?: HDAddressPayload | null, protocol_magic?: ProtocolMagic | null): AddrAttributes;
    static new_single_key(pubk: Bip32PublicKey, hdap: HDAddressPayload | null | undefined, protocol_magic: ProtocolMagic): AddrAttributes;
    protocol_magic(): ProtocolMagic | undefined;
    set_derivation_path(derivation_path: HDAddressPayload): void;
    set_protocol_magic(protocol_magic: ProtocolMagic): void;
    set_stake_distribution(stake_distribution: StakeDistribution): void;
    stake_distribution(): StakeDistribution | undefined;
    /**
     *
     *             * Serialize this type to CBOR bytes.
     *             * This type does NOT support fine-tuned encoding options so this may or may not be
     *             * canonical CBOR and may or may not preserve round-trip encodings.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type does NOT support fine-tuned encoding options so this may or may not be
     *             * canonical CBOR and may or may not preserve round-trip encodings.
     *
     */
    to_cbor_hex(): string;
}

export class Address {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    static from_bech32(bech_str: string): Address;
    static from_hex(hex: string): Address;
    static from_json(json: string): Address;
    static from_raw_bytes(data: Uint8Array): Address;
    /**
     * header has 4 bits addr type discrim then 4 bits network discrim.
     * Copied from shelley.cddl:
     *
     * base address
     * bits 7-6: 00
     * bit 5: stake cred is keyhash/scripthash
     * bit 4: payment cred is keyhash/scripthash
     * bits 3-0: network id
     *
     * pointer address
     * bits 7-5: 010
     * bit 4: payment cred is keyhash/scripthash
     * bits 3-0: network id
     *
     * enterprise address
     * bits 7-5: 010
     * bit 4: payment cred is keyhash/scripthash
     * bits 3-0: network id
     *
     * reward addresses:
     * bits 7-5: 111
     * bit 4: credential is keyhash/scripthash
     * bits 3-0: network id
     *
     * byron addresses:
     * bits 7-4: 1000
     * bits 3-0: unrelated data (recall: no network ID in Byron addresses)
     */
    header(): number;
    static header_matches_kind(header: number, kind: AddressHeaderKind): boolean;
    static is_valid(bech_str: string): boolean;
    /**
     *
     *     * Note: bech32-encoded Byron addresses will also pass validation here
     *
     */
    static is_valid_bech32(bech_str: string): boolean;
    kind(): AddressKind;
    network_id(): number;
    /**
     * Note: by convention, the key inside reward addresses are considered payment credentials
     */
    payment_cred(): Credential | undefined;
    /**
     * Note: by convention, the key inside reward addresses are NOT considered staking credentials
     * Note: None is returned pointer addresses as the chain history is required to resolve its associated cred
     */
    staking_cred(): Credential | undefined;
    to_bech32(prefix?: string | null): string;
    to_hex(): string;
    to_js_value(): any;
    to_json(): string;
    to_raw_bytes(): Uint8Array;
}

export class AddressContent {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    addr_attributes(): AddrAttributes;
    addr_type(): ByronAddrType;
    address_id(): AddressId;
    /**
     * returns the byron protocol magic embedded in the address, or mainnet id if none is present
     * note: for bech32 addresses, you need to use network_id instead
     */
    byron_protocol_magic(): ProtocolMagic;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): AddressContent;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): AddressContent;
    static hash_and_create(addr_type: ByronAddrType, spending_data: SpendingData, attributes: AddrAttributes): AddressContent;
    static icarus_from_key(key: Bip32PublicKey, protocol_magic: ProtocolMagic): AddressContent;
    /**
     * Check if the Addr can be reconstructed with a specific xpub
     */
    identical_with_pubkey(xpub: Bip32PublicKey): boolean;
    network_id(): number;
    static new(address_id: AddressId, addr_attributes: AddrAttributes, addr_type: ByronAddrType): AddressContent;
    static new_redeem(pubkey: PublicKey, protocol_magic?: ProtocolMagic | null): AddressContent;
    static new_simple(xpub: Bip32PublicKey, protocol_magic?: ProtocolMagic | null): AddressContent;
    /**
     * Do we want to remove this or keep it for people who were using old Byron code?
     */
    to_address(): ByronAddress;
    /**
     *
     *             * Serialize this type to CBOR bytes.
     *             * This type does NOT support fine-tuned encoding options so this may or may not be
     *             * canonical CBOR and may or may not preserve round-trip encodings.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type does NOT support fine-tuned encoding options so this may or may not be
     *             * canonical CBOR and may or may not preserve round-trip encodings.
     *
     */
    to_cbor_hex(): string;
}

/**
 * Careful: this enum doesn't include the network ID part of the header
 * ex: base address isn't 0b0000_0000 but instead 0b0000
 * Use `header_matches_kind` if you don't want to implement the bitwise operators yourself
 */
export enum AddressHeaderKind {
    BasePaymentKeyStakeKey = 0,
    BasePaymentScriptStakeKey = 1,
    BasePaymentKeyStakeScript = 2,
    BasePaymentScriptStakeScript = 3,
    PointerKey = 4,
    PointerScript = 5,
    EnterpriseKey = 6,
    EnterpriseScript = 7,
    Byron = 8,
    RewardKey = 14,
    RewardScript = 15,
}

export class AddressId {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    static from_bech32(bech32_str: string): AddressId;
    /**
     *
     *             * Parse from a hex string of the direct raw bytes, without any CBOR structure
     *
     */
    static from_hex(input: string): AddressId;
    /**
     *
     *             * Parse from the direct raw bytes, without any CBOR structure
     *
     */
    static from_raw_bytes(bytes: Uint8Array): AddressId;
    static new(addr_type: ByronAddrType, spending_data: SpendingData, attrs: AddrAttributes): AddressId;
    to_bech32(prefix: string): string;
    /**
     *
     *             * Direct raw bytes without any CBOR structure, as a hex-encoded string
     *
     */
    to_hex(): string;
    /**
     *
     *             * Direct raw bytes without any CBOR structure
     *
     */
    to_raw_bytes(): Uint8Array;
}

export enum AddressKind {
    Base = 0,
    Ptr = 1,
    Enterprise = 2,
    Reward = 3,
    Byron = 4,
}

export class AlonzoFormatTxOut {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    address(): Address;
    amount(): Value;
    datum_hash(): DatumHash | undefined;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): AlonzoFormatTxOut;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): AlonzoFormatTxOut;
    static from_json(json: string): AlonzoFormatTxOut;
    static new(address: Address, amount: Value): AlonzoFormatTxOut;
    set_datum_hash(datum_hash: DatumHash): void;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

export class Anchor {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    anchor_doc_hash(): AnchorDocHash;
    anchor_url(): Url;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): Anchor;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): Anchor;
    static from_json(json: string): Anchor;
    static new(anchor_url: Url, anchor_doc_hash: AnchorDocHash): Anchor;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

export class AnchorDocHash {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    static from_bech32(bech32_str: string): AnchorDocHash;
    /**
     *
     *             * Parse from a hex string of the direct raw bytes, without any CBOR structure
     *
     */
    static from_hex(input: string): AnchorDocHash;
    /**
     *
     *             * Parse from the direct raw bytes, without any CBOR structure
     *
     */
    static from_raw_bytes(bytes: Uint8Array): AnchorDocHash;
    to_bech32(prefix: string): string;
    /**
     *
     *             * Direct raw bytes without any CBOR structure, as a hex-encoded string
     *
     */
    to_hex(): string;
    /**
     *
     *             * Direct raw bytes without any CBOR structure
     *
     */
    to_raw_bytes(): Uint8Array;
}

export class AssetName {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): AssetName;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): AssetName;
    /**
     *
     *             * Parse from a hex string of the direct raw bytes, without any CBOR structure
     *
     */
    static from_hex(input: string): AssetName;
    static from_json(json: string): AssetName;
    /**
     *
     *             * Parse from the direct raw bytes, without any CBOR structure
     *
     */
    static from_raw_bytes(bytes: Uint8Array): AssetName;
    /**
     *
     *     * Create an AssetName from utf8 string. 64 byte (not char!) maximum.
     *
     */
    static from_str(utf8_str: string): AssetName;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    /**
     *
     *             * Direct raw bytes without any CBOR structure, as a hex-encoded string
     *
     */
    to_hex(): string;
    to_js_value(): any;
    to_json(): string;
    /**
     *
     *             * Direct raw bytes without any CBOR structure
     *
     */
    to_raw_bytes(): Uint8Array;
    /**
     *
     *     * AssetName as a utf8 string if it's possible. Will error if the asset is not utf8
     *
     */
    to_str(): string;
}

export class AssetNameList {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    add(elem: AssetName): void;
    get(index: number): AssetName;
    len(): number;
    static new(): AssetNameList;
}

export class AuthCommitteeHotCert {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    committee_cold_credential(): Credential;
    committee_hot_credential(): Credential;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): AuthCommitteeHotCert;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): AuthCommitteeHotCert;
    static from_json(json: string): AuthCommitteeHotCert;
    static new(committee_cold_credential: Credential, committee_hot_credential: Credential): AuthCommitteeHotCert;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

export class AuxiliaryData {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Adds everything present in other to self
     * May change the era the aux data is in if necessary
     * Warning: overwrites any metadatum labels present
     * also does not check for duplicates in scripts
     */
    add(other: AuxiliaryData): void;
    /**
     * Warning: overwrites any conflicting metadatum labels present
     */
    add_metadata(other: Metadata): void;
    /**
     * Warning: does not check for duplicates and may migrate eras
     */
    add_native_scripts(scripts: NativeScriptList): void;
    /**
     * Warning: does not check for duplicates and may migrate eras
     */
    add_plutus_v1_scripts(scripts: PlutusV1ScriptList): void;
    /**
     * Warning: does not check for duplicates and may migrate eras
     */
    add_plutus_v2_scripts(scripts: PlutusV2ScriptList): void;
    as_conway(): ConwayFormatAuxData | undefined;
    as_shelley(): Metadata | undefined;
    as_shelley_ma(): ShelleyMAFormatAuxData | undefined;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): AuxiliaryData;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): AuxiliaryData;
    static from_json(json: string): AuxiliaryData;
    kind(): AuxiliaryDataKind;
    metadata(): Metadata | undefined;
    native_scripts(): NativeScriptList | undefined;
    static new(): AuxiliaryData;
    static new_conway(conway: ConwayFormatAuxData): AuxiliaryData;
    static new_shelley(shelley: Metadata): AuxiliaryData;
    static new_shelley_ma(shelley_ma: ShelleyMAFormatAuxData): AuxiliaryData;
    plutus_v1_scripts(): PlutusV1ScriptList | undefined;
    plutus_v2_scripts(): PlutusV2ScriptList | undefined;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

export class AuxiliaryDataHash {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    static from_bech32(bech32_str: string): AuxiliaryDataHash;
    /**
     *
     *             * Parse from a hex string of the direct raw bytes, without any CBOR structure
     *
     */
    static from_hex(input: string): AuxiliaryDataHash;
    /**
     *
     *             * Parse from the direct raw bytes, without any CBOR structure
     *
     */
    static from_raw_bytes(bytes: Uint8Array): AuxiliaryDataHash;
    to_bech32(prefix: string): string;
    /**
     *
     *             * Direct raw bytes without any CBOR structure, as a hex-encoded string
     *
     */
    to_hex(): string;
    /**
     *
     *             * Direct raw bytes without any CBOR structure
     *
     */
    to_raw_bytes(): Uint8Array;
}

export enum AuxiliaryDataKind {
    Shelley = 0,
    ShelleyMA = 1,
    Conway = 2,
}

export class BaseAddress {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    static from_address(address: Address): BaseAddress | undefined;
    network_id(): number;
    static new(network: number, payment: Credential, stake: Credential): BaseAddress;
    payment(): Credential;
    stake(): Credential;
    to_address(): Address;
}

export class BigInteger {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Converts to an Int
     * Returns None when the number is too big for an Int (outside +/- 64-bit unsigned)
     * Retains encoding info if the original was encoded as an Int
     */
    as_int(): Int | undefined;
    /**
     * Converts to a u64
     * Returns None if the number was negative or too big for a u64
     */
    as_u64(): bigint | undefined;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): BigInteger;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): BigInteger;
    static from_int(x: Int): BigInteger;
    static from_json(json: string): BigInteger;
    static from_str(s: string): BigInteger;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
    to_str(): string;
}

export class Bip32PrivateKey {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    chaincode(): Uint8Array;
    /**
     * derive this private key with the given index.
     *
     * # Security considerations
     *
     * * hard derivation index cannot be soft derived with the public key
     *
     * # Hard derivation vs Soft derivation
     *
     * If you pass an index below 0x80000000 then it is a soft derivation.
     * The advantage of soft derivation is that it is possible to derive the
     * public key too. I.e. derivation the private key with a soft derivation
     * index and then retrieving the associated public key is equivalent to
     * deriving the public key associated to the parent private key.
     *
     * Hard derivation index does not allow public key derivation.
     *
     * This is why deriving the private key should not fail while deriving
     * the public key may fail (if the derivation index is invalid).
     */
    derive(index: number): Bip32PrivateKey;
    /**
     * 128-byte xprv a key format in Cardano that some software still uses or requires
     * the traditional 96-byte xprv is simply encoded as
     * prv | chaincode
     * however, because some software may not know how to compute a public key from a private key,
     * the 128-byte inlines the public key in the following format
     * prv | pub | chaincode
     * so be careful if you see the term "xprv" as it could refer to either one
     * our library does not require the pub (instead we compute the pub key when needed)
     */
    static from_128_xprv(bytes: Uint8Array): Bip32PrivateKey;
    static from_bech32(bech32_str: string): Bip32PrivateKey;
    static from_bip39_entropy(entropy: Uint8Array, password: Uint8Array): Bip32PrivateKey;
    static from_raw_bytes(bytes: Uint8Array): Bip32PrivateKey;
    static generate_ed25519_bip32(): Bip32PrivateKey;
    /**
     * see from_128_xprv
     */
    to_128_xprv(): Uint8Array;
    to_bech32(): string;
    to_public(): Bip32PublicKey;
    to_raw_bytes(): Uint8Array;
    to_raw_key(): PrivateKey;
}

export class Bip32PublicKey {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    chaincode(): Uint8Array;
    /**
     * derive this public key with the given index.
     *
     * # Errors
     *
     * If the index is not a soft derivation index (< 0x80000000) then
     * calling this method will fail.
     *
     * # Security considerations
     *
     * * hard derivation index cannot be soft derived with the public key
     *
     * # Hard derivation vs Soft derivation
     *
     * If you pass an index below 0x80000000 then it is a soft derivation.
     * The advantage of soft derivation is that it is possible to derive the
     * public key too. I.e. derivation the private key with a soft derivation
     * index and then retrieving the associated public key is equivalent to
     * deriving the public key associated to the parent private key.
     *
     * Hard derivation index does not allow public key derivation.
     *
     * This is why deriving the private key should not fail while deriving
     * the public key may fail (if the derivation index is invalid).
     */
    derive(index: number): Bip32PublicKey;
    static from_bech32(bech32_str: string): Bip32PublicKey;
    static from_raw_bytes(bytes: Uint8Array): Bip32PublicKey;
    to_bech32(): string;
    to_raw_bytes(): Uint8Array;
    to_raw_key(): PublicKey;
}

export class Block {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    auxiliary_data_set(): MapTransactionIndexToAuxiliaryData;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): Block;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): Block;
    static from_json(json: string): Block;
    header(): Header;
    invalid_transactions(): Uint16Array;
    static new(header: Header, transaction_bodies: TransactionBodyList, transaction_witness_sets: TransactionWitnessSetList, auxiliary_data_set: MapTransactionIndexToAuxiliaryData, invalid_transactions: Uint16Array): Block;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
    transaction_bodies(): TransactionBodyList;
    transaction_witness_sets(): TransactionWitnessSetList;
}

export class BlockBodyHash {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    static from_bech32(bech32_str: string): BlockBodyHash;
    /**
     *
     *             * Parse from a hex string of the direct raw bytes, without any CBOR structure
     *
     */
    static from_hex(input: string): BlockBodyHash;
    /**
     *
     *             * Parse from the direct raw bytes, without any CBOR structure
     *
     */
    static from_raw_bytes(bytes: Uint8Array): BlockBodyHash;
    to_bech32(prefix: string): string;
    /**
     *
     *             * Direct raw bytes without any CBOR structure, as a hex-encoded string
     *
     */
    to_hex(): string;
    /**
     *
     *             * Direct raw bytes without any CBOR structure
     *
     */
    to_raw_bytes(): Uint8Array;
}

export class BlockHeaderHash {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    static from_bech32(bech32_str: string): BlockHeaderHash;
    /**
     *
     *             * Parse from a hex string of the direct raw bytes, without any CBOR structure
     *
     */
    static from_hex(input: string): BlockHeaderHash;
    /**
     *
     *             * Parse from the direct raw bytes, without any CBOR structure
     *
     */
    static from_raw_bytes(bytes: Uint8Array): BlockHeaderHash;
    to_bech32(prefix: string): string;
    /**
     *
     *             * Direct raw bytes without any CBOR structure, as a hex-encoded string
     *
     */
    to_hex(): string;
    /**
     *
     *             * Direct raw bytes without any CBOR structure
     *
     */
    to_raw_bytes(): Uint8Array;
}

export class BootstrapWitness {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    attributes(): AddrAttributes;
    chain_code(): Uint8Array;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): BootstrapWitness;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): BootstrapWitness;
    static from_json(json: string): BootstrapWitness;
    static new(public_key: PublicKey, signature: Ed25519Signature, chain_code: Uint8Array, attributes: AddrAttributes): BootstrapWitness;
    public_key(): PublicKey;
    signature(): Ed25519Signature;
    to_address(): AddressContent;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

export class BootstrapWitnessList {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    add(elem: BootstrapWitness): void;
    get(index: number): BootstrapWitness;
    len(): number;
    static new(): BootstrapWitnessList;
}

export enum ByronAddrType {
    PublicKey = 0,
    Script = 1,
    Redeem = 2,
}

export class ByronAddress {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    content(): AddressContent;
    crc(): Crc32;
    static from_address(addr: Address): ByronAddress | undefined;
    static from_address_content(address_content: AddressContent): ByronAddress;
    static from_base58(s: string): ByronAddress;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): ByronAddress;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): ByronAddress;
    static is_valid(s: string): boolean;
    static new(content: AddressContent, crc: Crc32): ByronAddress;
    to_address(): Address;
    to_base58(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes.
     *             * This type does NOT support fine-tuned encoding options so this may or may not be
     *             * canonical CBOR and may or may not preserve round-trip encodings.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type does NOT support fine-tuned encoding options so this may or may not be
     *             * canonical CBOR and may or may not preserve round-trip encodings.
     *
     */
    to_cbor_hex(): string;
}

export class ByronGenesisRedeem {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    address(): ByronAddress;
    static new(txid: TransactionHash, address: ByronAddress): ByronGenesisRedeem;
    txid(): TransactionHash;
}

export class ByronScript {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    static from_bech32(bech32_str: string): ByronScript;
    /**
     *
     *             * Parse from a hex string of the direct raw bytes, without any CBOR structure
     *
     */
    static from_hex(input: string): ByronScript;
    /**
     *
     *             * Parse from the direct raw bytes, without any CBOR structure
     *
     */
    static from_raw_bytes(bytes: Uint8Array): ByronScript;
    to_bech32(prefix: string): string;
    /**
     *
     *             * Direct raw bytes without any CBOR structure, as a hex-encoded string
     *
     */
    to_hex(): string;
    /**
     *
     *             * Direct raw bytes without any CBOR structure
     *
     */
    to_raw_bytes(): Uint8Array;
}

export class ByronTxOut {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    address(): ByronAddress;
    amount(): bigint;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): ByronTxOut;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): ByronTxOut;
    static new(address: ByronAddress, amount: bigint): ByronTxOut;
    /**
     *
     *             * Serialize this type to CBOR bytes.
     *             * This type does NOT support fine-tuned encoding options so this may or may not be
     *             * canonical CBOR and may or may not preserve round-trip encodings.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type does NOT support fine-tuned encoding options so this may or may not be
     *             * canonical CBOR and may or may not preserve round-trip encodings.
     *
     */
    to_cbor_hex(): string;
}

/**
 * A String that may or may not be chunked into 64-byte chunks to be able
 * to conform to Cardano TX Metadata limitations.
 * Most users should simply use CIP25ChunkableString::from_string() and CIP25ChunkableString::to_string()
 * and avoid the explicit single/chunk interface:
 * ```javascript
 * let chunkableString = CIP25.CIP25ChunkableString.from_string("this can be any length and will automatically be chunked if needed");
 * ```
 */
export class CIP25ChunkableString {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    as_chunked(): CIP25String64List | undefined;
    as_single(): CIP25String64 | undefined;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): CIP25ChunkableString;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): CIP25ChunkableString;
    static from_json(json: string): CIP25ChunkableString;
    static from_string(str: string): CIP25ChunkableString;
    kind(): ChunkableStringKind;
    static new_chunked(chunked: CIP25String64List): CIP25ChunkableString;
    static new_single(single: CIP25String64): CIP25ChunkableString;
    /**
     *
     *             * Serialize this type to CBOR bytes.
     *             * This type does NOT support fine-tuned encoding options so this may or may not be
     *             * canonical CBOR and may or may not preserve round-trip encodings.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type does NOT support fine-tuned encoding options so this may or may not be
     *             * canonical CBOR and may or may not preserve round-trip encodings.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
    to_string(): string;
}

export class CIP25FilesDetails {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): CIP25FilesDetails;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): CIP25FilesDetails;
    static from_json(json: string): CIP25FilesDetails;
    media_type(): CIP25String64;
    name(): CIP25String64;
    static new(name: CIP25String64, media_type: CIP25String64, src: CIP25ChunkableString): CIP25FilesDetails;
    src(): CIP25ChunkableString;
    /**
     *
     *             * Serialize this type to CBOR bytes.
     *             * This type does NOT support fine-tuned encoding options so this may or may not be
     *             * canonical CBOR and may or may not preserve round-trip encodings.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type does NOT support fine-tuned encoding options so this may or may not be
     *             * canonical CBOR and may or may not preserve round-trip encodings.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

export class CIP25LabelMetadata {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): CIP25LabelMetadata;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): CIP25LabelMetadata;
    static from_json(json: string): CIP25LabelMetadata;
    get(policy_id: ScriptHash, asset_name: AssetName): CIP25MetadataDetails | undefined;
    /**
     * Note that Version 1 can only support utf8 string asset names.
     * Version 2 can support any asset name.
     */
    static new(version: CIP25Version): CIP25LabelMetadata;
    /**
     * If this is version 1 and the asset name is not a utf8 asset name
     * then this will return an error.
     * This function will never return an error for version 2.
     * On success, returns the previous details that were overwritten, or None otherwise.
     */
    set(policy_id: ScriptHash, asset_name: AssetName, details: CIP25MetadataDetails): CIP25MetadataDetails | undefined;
    /**
     *
     *             * Serialize this type to CBOR bytes.
     *             * This type does NOT support fine-tuned encoding options so this may or may not be
     *             * canonical CBOR and may or may not preserve round-trip encodings.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type does NOT support fine-tuned encoding options so this may or may not be
     *             * canonical CBOR and may or may not preserve round-trip encodings.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
    version(): CIP25Version;
}

/**
 * This is the entire metadata schema for CIP-25
 * It can be parsed by passing in the CBOR bytes of the entire transaction metadata
 * or by passing in an existing Metadata struct.
 * Parsing from CBOR bytes should be marginally faster.
 */
export class CIP25Metadata {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Add to an existing metadata (could be empty) the full CIP25 metadata
     */
    add_to_metadata(metadata: Metadata): void;
    /**
     * Deserialize from CBOR bytes compatible with tx metadata
     * Does not guarantee any specific type of CBOR format and should NOT
     * be used with round-tripping. It will ignore all non-CIP25 keys.
     * Use cml_cip25::metadate crate for round-tripping metadata.
     */
    static from_cbor_bytes(data: Uint8Array): CIP25Metadata;
    static from_json(json: string): CIP25Metadata;
    /**
     * Read the CIP25 schema from a Metadata. Ignores all other data besides CIP25
     * Can fail if the Metadata does not conform to CIP25
     */
    static from_metadata(metadata: Metadata): CIP25Metadata;
    /**
     * The core details of the CIP25 spec
     */
    key_721(): CIP25LabelMetadata;
    static new(key_721: CIP25LabelMetadata): CIP25Metadata;
    /**
     * Serialize to CBOR bytes compatible with tx metadata
     * Does not guarantee any specific type of CBOR format and should NOT
     * be used with round-tripping. It will ignore all non-CIP25 keys.
     * Use cml_cip25::metadate crate for round-tripping metadata.
     */
    to_cbor_bytes(): Uint8Array;
    to_js_value(): any;
    to_json(): string;
    /**
     * Create a Metadata containing only the CIP25 schema
     */
    to_metadata(): Metadata;
}

export class CIP25MetadataDetails {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    description(): CIP25ChunkableString | undefined;
    files(): FilesDetailsList | undefined;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): CIP25MetadataDetails;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): CIP25MetadataDetails;
    static from_json(json: string): CIP25MetadataDetails;
    image(): CIP25ChunkableString;
    media_type(): CIP25String64 | undefined;
    name(): CIP25String64;
    static new(name: CIP25String64, image: CIP25ChunkableString): CIP25MetadataDetails;
    set_description(description: CIP25ChunkableString): void;
    set_files(files: FilesDetailsList): void;
    set_media_type(media_type: CIP25String64): void;
    /**
     *
     *             * Serialize this type to CBOR bytes.
     *             * This type does NOT support fine-tuned encoding options so this may or may not be
     *             * canonical CBOR and may or may not preserve round-trip encodings.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type does NOT support fine-tuned encoding options so this may or may not be
     *             * canonical CBOR and may or may not preserve round-trip encodings.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

export class CIP25MiniMetadataDetails {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    static from_json(json: string): CIP25MiniMetadataDetails;
    image(): CIP25ChunkableString | undefined;
    /**
     * loose parsing of CIP25 metadata to allow for common exceptions to the format
     * `metadatum` should represent the data where the `CIP25MetadataDetails` is in the cip25 structure
     */
    static loose_parse(metadatum: TransactionMetadatum): CIP25MiniMetadataDetails;
    name(): CIP25String64 | undefined;
    static new(): CIP25MiniMetadataDetails;
    set_image(image: CIP25ChunkableString): void;
    set_name(name: CIP25String64): void;
    to_js_value(): any;
    to_json(): string;
}

/**
 * A String of at most 64 bytes.
 * This is to conform with Cardano metadata restrictions.
 */
export class CIP25String64 {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): CIP25String64;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): CIP25String64;
    static from_json(json: string): CIP25String64;
    get(): string;
    get_str(): string;
    static new(s: string): CIP25String64;
    /**
     *
     *             * Serialize this type to CBOR bytes.
     *             * This type does NOT support fine-tuned encoding options so this may or may not be
     *             * canonical CBOR and may or may not preserve round-trip encodings.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type does NOT support fine-tuned encoding options so this may or may not be
     *             * canonical CBOR and may or may not preserve round-trip encodings.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
    to_str(): string;
}

export class CIP25String64List {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    add(elem: CIP25String64): void;
    get(index: number): CIP25String64;
    len(): number;
    static new(): CIP25String64List;
}

/**
 * Which version of the CIP25 spec to use. See CIP25 for details.
 * This will change how things are encoded but for the most part contains
 * the same information.
 */
export enum CIP25Version {
    /**
     * Initial version of CIP25 with only string (utf8) asset names allowed.
     */
    V1 = 0,
    /**
     * Second version of CIP25. Supports any type of asset names.
     */
    V2 = 1,
}

export class CIP36Delegation {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): CIP36Delegation;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): CIP36Delegation;
    static from_json(json: string): CIP36Delegation;
    static new(voting_pub_key: PublicKey, weight: number): CIP36Delegation;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
    voting_pub_key(): PublicKey;
    weight(): number;
}

export class CIP36DelegationDistribution {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    as_legacy(): PublicKey | undefined;
    as_weighted(): CIP36DelegationList | undefined;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): CIP36DelegationDistribution;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): CIP36DelegationDistribution;
    static from_json(json: string): CIP36DelegationDistribution;
    kind(): DelegationDistributionKind;
    static new_legacy(legacy: PublicKey): CIP36DelegationDistribution;
    static new_weighted(delegations: CIP36DelegationList): CIP36DelegationDistribution;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

export class CIP36DelegationList {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    add(elem: CIP36Delegation): void;
    get(index: number): CIP36Delegation;
    len(): number;
    static new(): CIP36DelegationList;
}

export class CIP36DeregistrationCbor {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    deregistration_witness(): CIP36DeregistrationWitness;
    static from_json(json: string): CIP36DeregistrationCbor;
    key_deregistration(): CIP36KeyDeregistration;
    static new(key_deregistration: CIP36KeyDeregistration, deregistration_witness: CIP36DeregistrationWitness): CIP36DeregistrationCbor;
    to_js_value(): any;
    to_json(): string;
}

export class CIP36DeregistrationWitness {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): CIP36DeregistrationWitness;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): CIP36DeregistrationWitness;
    static from_json(json: string): CIP36DeregistrationWitness;
    static new(stake_witness: Ed25519Signature): CIP36DeregistrationWitness;
    stake_witness(): Ed25519Signature;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

export class CIP36KeyDeregistration {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): CIP36KeyDeregistration;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): CIP36KeyDeregistration;
    static from_json(json: string): CIP36KeyDeregistration;
    nonce(): bigint;
    set_voting_purpose(voting_purpose: bigint): void;
    stake_credential(): PublicKey;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
    voting_purpose(): bigint;
}

export class CIP36KeyRegistration {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    delegation(): CIP36DelegationDistribution;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): CIP36KeyRegistration;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): CIP36KeyRegistration;
    static from_json(json: string): CIP36KeyRegistration;
    nonce(): bigint;
    payment_address(): Address;
    set_voting_purpose(voting_purpose: bigint): void;
    stake_credential(): PublicKey;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
    voting_purpose(): bigint;
}

export class CIP36RegistrationCbor {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    static from_json(json: string): CIP36RegistrationCbor;
    key_registration(): CIP36KeyRegistration;
    static new(key_registration: CIP36KeyRegistration, registration_witness: CIP36RegistrationWitness): CIP36RegistrationCbor;
    registration_witness(): CIP36RegistrationWitness;
    to_js_value(): any;
    to_json(): string;
}

export class CIP36RegistrationWitness {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): CIP36RegistrationWitness;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): CIP36RegistrationWitness;
    static from_json(json: string): CIP36RegistrationWitness;
    static new(stake_witness: Ed25519Signature): CIP36RegistrationWitness;
    stake_witness(): Ed25519Signature;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

/**
 * JSON <-> PlutusData conversion schemas.
 * Follows ScriptDataJsonSchema in cardano-cli defined at:
 * https://github.com/input-output-hk/cardano-node/blob/master/cardano-api/src/Cardano/Api/ScriptData.hs#L254
 *
 * All methods here have the following restrictions due to limitations on dependencies:
 * * JSON numbers above u64::MAX (positive) or below i64::MIN (negative) will throw errors
 * * Hex strings for bytes don't accept odd-length (half-byte) strings.
 *      cardano-cli seems to support these however but it seems to be different than just 0-padding
 *      on either side when tested so proceed with caution
 */
export enum CardanoNodePlutusDatumSchema {
    /**
     * ScriptDataJsonNoSchema in cardano-node.
     *
     * This is the format used by --script-data-value in cardano-cli
     * This tries to accept most JSON but does not support the full spectrum of Plutus datums.
     * From JSON:
     * * null/true/false/floats NOT supported
     * * strings starting with 0x are treated as hex bytes. All other strings are encoded as their utf8 bytes.
     * To JSON:
     * * ConstrPlutusData not supported in ANY FORM (neither keys nor values)
     * * Lists not supported in keys
     * * Maps not supported in keys
     */
    BasicConversions = 0,
    /**
     * ScriptDataJsonDetailedSchema in cardano-node.
     *
     * This is the format used by --script-data-file in cardano-cli
     * This covers almost all (only minor exceptions) Plutus datums, but the JSON must conform to a strict schema.
     * The schema specifies that ALL keys and ALL values must be contained in a JSON map with 2 cases:
     * 1. For ConstrPlutusData there must be two fields "constructor" contianing a number and "fields" containing its fields
     *    e.g. { "constructor": 2, "fields": [{"int": 2}, {"list": [{"bytes": "CAFEF00D"}]}]}
     * 2. For all other cases there must be only one field named "int", "bytes", "list" or "map"
     *    BigInteger's value is a JSON number e.g. {"int": 100}
     *    Bytes' value is a hex string representing the bytes WITHOUT any prefix e.g. {"bytes": "CAFEF00D"}
     *    Lists' value is a JSON list of its elements encoded via the same schema e.g. {"list": [{"bytes": "CAFEF00D"}]}
     *    Maps' value is a JSON list of objects, one for each key-value pair in the map, with keys "k" and "v"
     *          respectively with their values being the plutus datum encoded via this same schema
     *          e.g. {"map": [
     *              {"k": {"int": 2}, "v": {"int": 5}},
     *              {"k": {"map": [{"k": {"list": [{"int": 1}]}, "v": {"bytes": "FF03"}}]}, "v": {"list": []}}
     *          ]}
     * From JSON:
     * * null/true/false/floats NOT supported
     * * the JSON must conform to a very specific schema
     * To JSON:
     * * all Plutus datums should be fully supported outside of the integer range limitations outlined above.
     */
    DetailedSchema = 1,
}

export class Certificate {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    as_auth_committee_hot_cert(): AuthCommitteeHotCert | undefined;
    as_pool_registration(): PoolRegistration | undefined;
    as_pool_retirement(): PoolRetirement | undefined;
    as_reg_cert(): RegCert | undefined;
    as_reg_drep_cert(): RegDrepCert | undefined;
    as_resign_committee_cold_cert(): ResignCommitteeColdCert | undefined;
    as_stake_delegation(): StakeDelegation | undefined;
    as_stake_deregistration(): StakeDeregistration | undefined;
    as_stake_reg_deleg_cert(): StakeRegDelegCert | undefined;
    as_stake_registration(): StakeRegistration | undefined;
    as_stake_vote_deleg_cert(): StakeVoteDelegCert | undefined;
    as_stake_vote_reg_deleg_cert(): StakeVoteRegDelegCert | undefined;
    as_unreg_cert(): UnregCert | undefined;
    as_unreg_drep_cert(): UnregDrepCert | undefined;
    as_update_drep_cert(): UpdateDrepCert | undefined;
    as_vote_deleg_cert(): VoteDelegCert | undefined;
    as_vote_reg_deleg_cert(): VoteRegDelegCert | undefined;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): Certificate;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): Certificate;
    static from_json(json: string): Certificate;
    kind(): CertificateKind;
    static new_auth_committee_hot_cert(committee_cold_credential: Credential, committee_hot_credential: Credential): Certificate;
    static new_pool_registration(pool_params: PoolParams): Certificate;
    static new_pool_retirement(pool: Ed25519KeyHash, epoch: bigint): Certificate;
    /**
     * Registers a stake credential.
     */
    static new_reg_cert(stake_credential: Credential, deposit: bigint): Certificate;
    static new_reg_drep_cert(drep_credential: Credential, deposit: bigint, anchor?: Anchor | null): Certificate;
    static new_resign_committee_cold_cert(committee_cold_credential: Credential, anchor?: Anchor | null): Certificate;
    /**
     * Delegate to a take pool only
     */
    static new_stake_delegation(stake_credential: Credential, pool: Ed25519KeyHash): Certificate;
    /**
     * Will be deprecated in the next era. Use UnregCert instead which takes an explicit deposit amount, as that can change.
     */
    static new_stake_deregistration(stake_credential: Credential): Certificate;
    /**
     * Register a stake credential and delegate to a pool in a single cert
     */
    static new_stake_reg_deleg_cert(stake_credential: Credential, pool: Ed25519KeyHash, deposit: bigint): Certificate;
    /**
     * Will be deprecated in the next era. Use RegCert instead which takes an explicit deposit amount, as that can change.
     */
    static new_stake_registration(stake_credential: Credential): Certificate;
    /**
     * Delegate to a stake pool and a DRep
     */
    static new_stake_vote_deleg_cert(stake_credential: Credential, pool: Ed25519KeyHash, d_rep: DRep): Certificate;
    /**
     * Register a stake credential and delegate to a pool and a DRep in a single cert
     */
    static new_stake_vote_reg_deleg_cert(stake_credential: Credential, pool: Ed25519KeyHash, d_rep: DRep, deposit: bigint): Certificate;
    /**
     * Unregisters a stake credential.
     */
    static new_unreg_cert(stake_credential: Credential, deposit: bigint): Certificate;
    static new_unreg_drep_cert(drep_credential: Credential, deposit: bigint): Certificate;
    static new_update_drep_cert(drep_credential: Credential, anchor?: Anchor | null): Certificate;
    /**
     * Delegate to a DRep for voting only
     */
    static new_vote_deleg_cert(stake_credential: Credential, d_rep: DRep): Certificate;
    /**
     * Register a stake credential and delegate to a DRep in a single cert
     */
    static new_vote_reg_deleg_cert(stake_credential: Credential, d_rep: DRep, deposit: bigint): Certificate;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

export class CertificateBuilderResult {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
}

export enum CertificateKind {
    StakeRegistration = 0,
    StakeDeregistration = 1,
    StakeDelegation = 2,
    PoolRegistration = 3,
    PoolRetirement = 4,
    RegCert = 5,
    UnregCert = 6,
    VoteDelegCert = 7,
    StakeVoteDelegCert = 8,
    StakeRegDelegCert = 9,
    VoteRegDelegCert = 10,
    StakeVoteRegDelegCert = 11,
    AuthCommitteeHotCert = 12,
    ResignCommitteeColdCert = 13,
    RegDrepCert = 14,
    UnregDrepCert = 15,
    UpdateDrepCert = 16,
}

export class CertificateList {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    add(elem: Certificate): void;
    get(index: number): Certificate;
    len(): number;
    static new(): CertificateList;
}

export enum ChangeSelectionAlgo {
    Default = 0,
}

export enum ChunkableStringKind {
    Single = 0,
    Chunked = 1,
}

export enum CoinSelectionStrategyCIP2 {
    /**
     * Performs CIP2's Largest First ada-only selection. Will error if outputs contain non-ADA assets.
     */
    LargestFirst = 0,
    /**
     * Performs CIP2's Random Improve ada-only selection. Will error if outputs contain non-ADA assets.
     */
    RandomImprove = 1,
    /**
     * Same as LargestFirst, but before adding ADA, will insert by largest-first for each asset type.
     */
    LargestFirstMultiAsset = 2,
    /**
     * Same as RandomImprove, but before adding ADA, will insert by random-improve for each asset type.
     */
    RandomImproveMultiAsset = 3,
}

export class CommitteeColdCredentialList {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    add(elem: Credential): void;
    get(index: number): Credential;
    len(): number;
    static new(): CommitteeColdCredentialList;
}

export class Constitution {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    anchor(): Anchor;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): Constitution;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): Constitution;
    static from_json(json: string): Constitution;
    static new(anchor: Anchor, script_hash?: ScriptHash | null): Constitution;
    script_hash(): ScriptHash | undefined;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

export class ConstrPlutusData {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    alternative(): bigint;
    fields(): PlutusDataList;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): ConstrPlutusData;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): ConstrPlutusData;
    static from_json(json: string): ConstrPlutusData;
    static new(alternative: bigint, fields: PlutusDataList): ConstrPlutusData;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

export class ConwayFormatAuxData {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): ConwayFormatAuxData;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): ConwayFormatAuxData;
    static from_json(json: string): ConwayFormatAuxData;
    metadata(): Metadata | undefined;
    native_scripts(): NativeScriptList | undefined;
    static new(): ConwayFormatAuxData;
    plutus_v1_scripts(): PlutusV1ScriptList | undefined;
    plutus_v2_scripts(): PlutusV2ScriptList | undefined;
    plutus_v3_scripts(): PlutusV3ScriptList | undefined;
    set_metadata(metadata: Metadata): void;
    set_native_scripts(native_scripts: NativeScriptList): void;
    set_plutus_v1_scripts(plutus_v1_scripts: PlutusV1ScriptList): void;
    set_plutus_v2_scripts(plutus_v2_scripts: PlutusV2ScriptList): void;
    set_plutus_v3_scripts(plutus_v3_scripts: PlutusV3ScriptList): void;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

export class ConwayFormatTxOut {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    address(): Address;
    amount(): Value;
    datum_option(): DatumOption | undefined;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): ConwayFormatTxOut;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): ConwayFormatTxOut;
    static from_json(json: string): ConwayFormatTxOut;
    static new(address: Address, amount: Value): ConwayFormatTxOut;
    script_reference(): Script | undefined;
    set_datum_option(datum_option: DatumOption): void;
    set_script_reference(script_reference: Script): void;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

export class CostModels {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): CostModels;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): CostModels;
    static from_json(json: string): CostModels;
    inner(): MapU64ToArrI64;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

export class Crc32 {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * finalize the CRC32, recovering the computed value
     */
    finalize(): number;
    /**
     * initialise a new CRC32 state
     */
    static new(): Crc32;
    /**
     * update the CRC32 with the given bytes.
     *
     * beware that the order in which you update the Crc32
     * matter
     */
    update(bytes: Uint8Array): void;
}

export class Credential {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    as_pub_key(): Ed25519KeyHash | undefined;
    as_script(): ScriptHash | undefined;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): Credential;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): Credential;
    static from_json(json: string): Credential;
    kind(): CredentialKind;
    static new_pub_key(hash: Ed25519KeyHash): Credential;
    static new_script(hash: ScriptHash): Credential;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

export enum CredentialKind {
    PubKey = 0,
    Script = 1,
}

export class DNSName {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): DNSName;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): DNSName;
    static from_json(json: string): DNSName;
    get(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

export class DRep {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    as_key(): Ed25519KeyHash | undefined;
    as_script(): ScriptHash | undefined;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): DRep;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): DRep;
    static from_json(json: string): DRep;
    kind(): DRepKind;
    static new_always_abstain(): DRep;
    static new_always_no_confidence(): DRep;
    static new_key(pool: Ed25519KeyHash): DRep;
    static new_script(script_hash: ScriptHash): DRep;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

export enum DRepKind {
    Key = 0,
    Script = 1,
    AlwaysAbstain = 2,
    AlwaysNoConfidence = 3,
}

export class DRepVotingThresholds {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    committee_no_confidence(): UnitInterval;
    committee_normal(): UnitInterval;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): DRepVotingThresholds;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): DRepVotingThresholds;
    static from_json(json: string): DRepVotingThresholds;
    hard_fork_initiation(): UnitInterval;
    motion_no_confidence(): UnitInterval;
    static new(motion_no_confidence: UnitInterval, committee_normal: UnitInterval, committee_no_confidence: UnitInterval, update_constitution: UnitInterval, hard_fork_initiation: UnitInterval, pp_network_group: UnitInterval, pp_economic_group: UnitInterval, pp_technical_group: UnitInterval, pp_governance_group: UnitInterval, treasury_withdrawal: UnitInterval): DRepVotingThresholds;
    pp_economic_group(): UnitInterval;
    pp_governance_group(): UnitInterval;
    pp_network_group(): UnitInterval;
    pp_technical_group(): UnitInterval;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
    treasury_withdrawal(): UnitInterval;
    update_constitution(): UnitInterval;
}

export class DatumHash {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    static from_bech32(bech32_str: string): DatumHash;
    /**
     *
     *             * Parse from a hex string of the direct raw bytes, without any CBOR structure
     *
     */
    static from_hex(input: string): DatumHash;
    /**
     *
     *             * Parse from the direct raw bytes, without any CBOR structure
     *
     */
    static from_raw_bytes(bytes: Uint8Array): DatumHash;
    to_bech32(prefix: string): string;
    /**
     *
     *             * Direct raw bytes without any CBOR structure, as a hex-encoded string
     *
     */
    to_hex(): string;
    /**
     *
     *             * Direct raw bytes without any CBOR structure
     *
     */
    to_raw_bytes(): Uint8Array;
}

export class DatumOption {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    as_datum(): PlutusData | undefined;
    as_hash(): DatumHash | undefined;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): DatumOption;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): DatumOption;
    static from_json(json: string): DatumOption;
    kind(): DatumOptionKind;
    static new_datum(datum: PlutusData): DatumOption;
    static new_hash(datum_hash: DatumHash): DatumOption;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

export enum DatumOptionKind {
    Hash = 0,
    Datum = 1,
}

export enum DelegationDistributionKind {
    Weighted = 0,
    Legacy = 1,
}

export class Ed25519KeyHash {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    static from_bech32(bech32_str: string): Ed25519KeyHash;
    /**
     *
     *             * Parse from a hex string of the direct raw bytes, without any CBOR structure
     *
     */
    static from_hex(input: string): Ed25519KeyHash;
    /**
     *
     *             * Parse from the direct raw bytes, without any CBOR structure
     *
     */
    static from_raw_bytes(bytes: Uint8Array): Ed25519KeyHash;
    to_bech32(prefix: string): string;
    /**
     *
     *             * Direct raw bytes without any CBOR structure, as a hex-encoded string
     *
     */
    to_hex(): string;
    /**
     *
     *             * Direct raw bytes without any CBOR structure
     *
     */
    to_raw_bytes(): Uint8Array;
}

export class Ed25519KeyHashList {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    add(elem: Ed25519KeyHash): void;
    get(index: number): Ed25519KeyHash;
    len(): number;
    static new(): Ed25519KeyHashList;
}

export class Ed25519Signature {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    static from_bech32(bech32_str: string): Ed25519Signature;
    /**
     *
     *             * Parse from a hex string of the direct raw bytes, without any CBOR structure
     *
     */
    static from_hex(input: string): Ed25519Signature;
    /**
     *
     *             * Parse from the direct raw bytes, without any CBOR structure
     *
     */
    static from_raw_bytes(bytes: Uint8Array): Ed25519Signature;
    to_bech32(): string;
    /**
     *
     *             * Direct raw bytes without any CBOR structure, as a hex-encoded string
     *
     */
    to_hex(): string;
    /**
     *
     *             * Direct raw bytes without any CBOR structure
     *
     */
    to_raw_bytes(): Uint8Array;
}

export class EnterpriseAddress {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    static from_address(address: Address): EnterpriseAddress | undefined;
    network_id(): number;
    static new(network: number, payment: Credential): EnterpriseAddress;
    payment(): Credential;
    to_address(): Address;
}

export class ExUnitPrices {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): ExUnitPrices;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): ExUnitPrices;
    static from_json(json: string): ExUnitPrices;
    mem_price(): SubCoin;
    static new(mem_price: SubCoin, step_price: SubCoin): ExUnitPrices;
    step_price(): SubCoin;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

export class ExUnits {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    checked_add(other: ExUnits): ExUnits;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): ExUnits;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): ExUnits;
    static from_json(json: string): ExUnits;
    mem(): bigint;
    static new(mem: bigint, steps: bigint): ExUnits;
    steps(): bigint;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

export class FilesDetailsList {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    add(elem: CIP25FilesDetails): void;
    get(index: number): CIP25FilesDetails;
    len(): number;
    static new(): FilesDetailsList;
}

export class GenesisDelegateHash {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    static from_bech32(bech32_str: string): GenesisDelegateHash;
    /**
     *
     *             * Parse from a hex string of the direct raw bytes, without any CBOR structure
     *
     */
    static from_hex(input: string): GenesisDelegateHash;
    /**
     *
     *             * Parse from the direct raw bytes, without any CBOR structure
     *
     */
    static from_raw_bytes(bytes: Uint8Array): GenesisDelegateHash;
    to_bech32(prefix: string): string;
    /**
     *
     *             * Direct raw bytes without any CBOR structure, as a hex-encoded string
     *
     */
    to_hex(): string;
    /**
     *
     *             * Direct raw bytes without any CBOR structure
     *
     */
    to_raw_bytes(): Uint8Array;
}

export class GenesisHash {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    static from_bech32(bech32_str: string): GenesisHash;
    /**
     *
     *             * Parse from a hex string of the direct raw bytes, without any CBOR structure
     *
     */
    static from_hex(input: string): GenesisHash;
    /**
     *
     *             * Parse from the direct raw bytes, without any CBOR structure
     *
     */
    static from_raw_bytes(bytes: Uint8Array): GenesisHash;
    to_bech32(prefix: string): string;
    /**
     *
     *             * Direct raw bytes without any CBOR structure, as a hex-encoded string
     *
     */
    to_hex(): string;
    /**
     *
     *             * Direct raw bytes without any CBOR structure
     *
     */
    to_raw_bytes(): Uint8Array;
}

export class GovAction {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    as_hard_fork_initiation_action(): HardForkInitiationAction | undefined;
    as_new_constitution(): NewConstitution | undefined;
    as_no_confidence(): NoConfidence | undefined;
    as_parameter_change_action(): ParameterChangeAction | undefined;
    as_treasury_withdrawals_action(): TreasuryWithdrawalsAction | undefined;
    as_update_committee(): UpdateCommittee | undefined;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): GovAction;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): GovAction;
    static from_json(json: string): GovAction;
    kind(): GovActionKind;
    static new_hard_fork_initiation_action(action_id: GovActionId | null | undefined, version: ProtocolVersion): GovAction;
    static new_info_action(): GovAction;
    static new_new_constitution(action_id: GovActionId | null | undefined, constitution: Constitution): GovAction;
    static new_no_confidence(action_id?: GovActionId | null): GovAction;
    static new_parameter_change_action(action_id: GovActionId | null | undefined, update: ProtocolParamUpdate, policy_hash?: ScriptHash | null): GovAction;
    static new_treasury_withdrawals_action(withdrawal: MapRewardAccountToCoin, policy_hash?: ScriptHash | null): GovAction;
    static new_update_committee(action_id: GovActionId | null | undefined, cold_credentials: CommitteeColdCredentialList, credentials: MapCommitteeColdCredentialToEpoch, unit_interval: UnitInterval): GovAction;
    script_hash(): ScriptHash | undefined;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

export class GovActionId {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): GovActionId;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): GovActionId;
    static from_json(json: string): GovActionId;
    gov_action_index(): bigint;
    static new(transaction_id: TransactionHash, gov_action_index: bigint): GovActionId;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
    transaction_id(): TransactionHash;
}

export class GovActionIdList {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    add(elem: GovActionId): void;
    get(index: number): GovActionId;
    len(): number;
    static new(): GovActionIdList;
}

export enum GovActionKind {
    ParameterChangeAction = 0,
    HardForkInitiationAction = 1,
    TreasuryWithdrawalsAction = 2,
    NoConfidence = 3,
    UpdateCommittee = 4,
    NewConstitution = 5,
    InfoAction = 6,
}

export class HDAddressPayload {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): HDAddressPayload;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): HDAddressPayload;
    get(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes.
     *             * This type does NOT support fine-tuned encoding options so this may or may not be
     *             * canonical CBOR and may or may not preserve round-trip encodings.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type does NOT support fine-tuned encoding options so this may or may not be
     *             * canonical CBOR and may or may not preserve round-trip encodings.
     *
     */
    to_cbor_hex(): string;
}

export class HardForkInitiationAction {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    action_id(): GovActionId | undefined;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): HardForkInitiationAction;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): HardForkInitiationAction;
    static from_json(json: string): HardForkInitiationAction;
    static new(action_id: GovActionId | null | undefined, version: ProtocolVersion): HardForkInitiationAction;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
    version(): ProtocolVersion;
}

export class Header {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    body_signature(): KESSignature;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): Header;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): Header;
    static from_json(json: string): Header;
    header_body(): HeaderBody;
    static new(header_body: HeaderBody, body_signature: KESSignature): Header;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

export class HeaderBody {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    block_body_hash(): BlockBodyHash;
    block_body_size(): bigint;
    block_number(): bigint;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): HeaderBody;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): HeaderBody;
    static from_json(json: string): HeaderBody;
    issuer_vkey(): PublicKey;
    static new(block_number: bigint, slot: bigint, prev_hash: BlockHeaderHash | null | undefined, issuer_vkey: PublicKey, vrf_vkey: VRFVkey, vrf_result: VRFCert, block_body_size: bigint, block_body_hash: BlockBodyHash, operational_cert: OperationalCert, protocol_version: ProtocolVersion): HeaderBody;
    operational_cert(): OperationalCert;
    prev_hash(): BlockHeaderHash | undefined;
    protocol_version(): ProtocolVersion;
    slot(): bigint;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
    vrf_result(): VRFCert;
    vrf_vkey(): VRFVkey;
}

export class InputAggregateWitnessData {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    plutus_data(): PlutusData | undefined;
}

export class InputBuilderResult {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
}

export class Int {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    static from_cbor_bytes(cbor_bytes: Uint8Array): Int;
    static from_json(json: string): Int;
    static from_str(string: string): Int;
    static new(x: bigint): Int;
    to_cbor_bytes(): Uint8Array;
    to_json(): string;
    to_json_value(): any;
    to_str(): string;
}

export class IntList {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    add(elem: Int): void;
    get(index: number): Int;
    len(): number;
    static new(): IntList;
}

export class Ipv4 {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): Ipv4;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): Ipv4;
    static from_json(json: string): Ipv4;
    get(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

export class Ipv6 {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): Ipv6;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): Ipv6;
    static from_json(json: string): Ipv6;
    get(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

export class KESSignature {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): KESSignature;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): KESSignature;
    static from_json(json: string): KESSignature;
    get(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

export class KESVkey {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    static from_bech32(bech32_str: string): KESVkey;
    /**
     *
     *             * Parse from a hex string of the direct raw bytes, without any CBOR structure
     *
     */
    static from_hex(input: string): KESVkey;
    /**
     *
     *             * Parse from the direct raw bytes, without any CBOR structure
     *
     */
    static from_raw_bytes(bytes: Uint8Array): KESVkey;
    to_bech32(prefix: string): string;
    /**
     *
     *             * Direct raw bytes without any CBOR structure, as a hex-encoded string
     *
     */
    to_hex(): string;
    /**
     *
     *             * Direct raw bytes without any CBOR structure
     *
     */
    to_raw_bytes(): Uint8Array;
}

export enum Language {
    PlutusV1 = 0,
    PlutusV2 = 1,
    PlutusV3 = 2,
}

export class LanguageList {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    add(elem: Language): void;
    get(index: number): Language;
    len(): number;
    static new(): LanguageList;
}

export class LegacyDaedalusPrivateKey {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    chaincode(): Uint8Array;
}

export class LegacyRedeemer {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    data(): PlutusData;
    ex_units(): ExUnits;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): LegacyRedeemer;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): LegacyRedeemer;
    static from_json(json: string): LegacyRedeemer;
    index(): bigint;
    static new(tag: RedeemerTag, index: bigint, data: PlutusData, ex_units: ExUnits): LegacyRedeemer;
    tag(): RedeemerTag;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

export class LegacyRedeemerList {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    add(elem: LegacyRedeemer): void;
    get(index: number): LegacyRedeemer;
    len(): number;
    static new(): LegacyRedeemerList;
}

/**
 * Careful: although the linear fee is the same for Byron & Shelley
 * The value of the parameters and how fees are computed is not the same
 */
export class LinearFee {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * minfee_a
     */
    coefficient(): bigint;
    /**
     * minfee_b
     */
    constant(): bigint;
    /**
     *
     *     * * `coefficient` - minfee_a from protocol params
     *     * * `constant` - minfee_b from protocol params
     *     * * `ref_script_cost_per_bytes` - min_fee_ref_script_cost_per_byte from protocol params. New in Conway
     *
     */
    static new(coefficient: bigint, constant: bigint, ref_script_cost_per_byte: bigint): LinearFee;
    ref_script_cost_per_byte(): bigint;
}

export class MapAssetNameToCoin {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    get(key: AssetName): bigint | undefined;
    insert(key: AssetName, value: bigint): bigint | undefined;
    is_empty(): boolean;
    keys(): AssetNameList;
    len(): number;
    static new(): MapAssetNameToCoin;
}

export class MapAssetNameToNonZeroInt64 {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    get(key: AssetName): bigint | undefined;
    insert(key: AssetName, value: bigint): bigint | undefined;
    keys(): AssetNameList;
    len(): number;
    static new(): MapAssetNameToNonZeroInt64;
}

export class MapAssetNameToU64 {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    get(key: AssetName): bigint | undefined;
    insert(key: AssetName, value: bigint): bigint | undefined;
    keys(): AssetNameList;
    len(): number;
    static new(): MapAssetNameToU64;
}

export class MapCommitteeColdCredentialToEpoch {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    get(key: Credential): bigint | undefined;
    insert(key: Credential, value: bigint): bigint | undefined;
    keys(): CommitteeColdCredentialList;
    len(): number;
    static new(): MapCommitteeColdCredentialToEpoch;
}

export class MapGovActionIdToVotingProcedure {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    get(key: GovActionId): VotingProcedure | undefined;
    insert(key: GovActionId, value: VotingProcedure): VotingProcedure | undefined;
    keys(): GovActionIdList;
    len(): number;
    static new(): MapGovActionIdToVotingProcedure;
}

export class MapPlutusDataToPlutusData {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    get(key: PlutusData): PlutusData | undefined;
    insert(key: PlutusData, value: PlutusData): PlutusData | undefined;
    keys(): PlutusDataList;
    len(): number;
    static new(): MapPlutusDataToPlutusData;
}

export class MapRedeemerKeyToRedeemerVal {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    get(key: RedeemerKey): RedeemerVal | undefined;
    insert(key: RedeemerKey, value: RedeemerVal): RedeemerVal | undefined;
    keys(): RedeemerKeyList;
    len(): number;
    static new(): MapRedeemerKeyToRedeemerVal;
}

export class MapRewardAccountToCoin {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    get(key: RewardAddress): bigint | undefined;
    insert(key: RewardAddress, value: bigint): bigint | undefined;
    keys(): RewardAccountList;
    len(): number;
    static new(): MapRewardAccountToCoin;
}

export class MapStakeCredentialToDeltaCoin {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    get(key: Credential): Int | undefined;
    insert(key: Credential, value: Int): Int | undefined;
    keys(): StakeCredentialList;
    len(): number;
    static new(): MapStakeCredentialToDeltaCoin;
}

export class MapTransactionIndexToAuxiliaryData {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    get(key: number): AuxiliaryData | undefined;
    insert(key: number, value: AuxiliaryData): AuxiliaryData | undefined;
    keys(): Uint16Array;
    len(): number;
    static new(): MapTransactionIndexToAuxiliaryData;
}

export class MapTransactionMetadatumToTransactionMetadatum {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    get(key: TransactionMetadatum): TransactionMetadatum | undefined;
    insert(key: TransactionMetadatum, value: TransactionMetadatum): TransactionMetadatum | undefined;
    keys(): TransactionMetadatumList;
    len(): number;
    static new(): MapTransactionMetadatumToTransactionMetadatum;
}

export class MapU64ToArrI64 {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    get(key: bigint): BigInt64Array | undefined;
    insert(key: bigint, value: BigInt64Array): BigInt64Array | undefined;
    is_empty(): boolean;
    keys(): BigUint64Array;
    len(): number;
    static new(): MapU64ToArrI64;
}

export class Metadata {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Gets the Metadatum corresponding to a given label, if it exists.
     * Note: In the case of duplicate labels this only returns the first metadatum.
     * This is an extremely rare occurence on-chain but can happen.
     */
    get(label: bigint): TransactionMetadatum | undefined;
    /**
     * In the extremely unlikely situation there are duplicate labels, this gets all of a single label
     */
    get_all(label: bigint): TransactionMetadatumList | undefined;
    labels(): TransactionMetadatumLabels;
    /**
     * How many metadatum labels there are.
     */
    len(): number;
    static new(): Metadata;
    /**
     * Replaces all metadatums of a given label, if any exist.
     */
    set(key: bigint, value: TransactionMetadatum): void;
}

export enum MetadataJsonSchema {
    NoConversions = 0,
    BasicConversions = 1,
    DetailedSchema = 2,
}

export class MetadatumList {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    add(elem: TransactionMetadatum): void;
    get(index: number): TransactionMetadatum;
    len(): number;
    static new(): MetadatumList;
}

export class MetadatumMap {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Gets the Metadatum corresponding to a given key, if it exists.
     * Note: In the case of duplicate keys this only returns the first metadatum.
     * This is an extremely rare occurence (2 total on mainnet) on-chain but can happen.
     */
    get(key: TransactionMetadatum): TransactionMetadatum | undefined;
    /**
     * In the extremely unlikely situation there are duplicate keys, this gets all of a single key
     */
    get_all(key: TransactionMetadatum): TransactionMetadatumList | undefined;
    keys(): MetadatumList;
    len(): number;
    static new(): MetadatumMap;
    /**
     * Replaces all metadatums of a given key, if any exist.
     */
    set(key: TransactionMetadatum, value: TransactionMetadatum): void;
}

export class Mint {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Returns the multiasset where only negative (burning) entries are present
     */
    as_negative_multiasset(): MultiAsset;
    /**
     * Returns the multiasset where only positive (minting) entries are present
     */
    as_positive_multiasset(): MultiAsset;
    /**
     * Adds two mints together, checking value bounds.
     * Does not modify self, and instead returns the result.
     */
    checked_add(rhs: Mint): Mint;
    /**
     * Subtracts rhs from this mint.
     * This does not modify self, and instead returns the result.
     */
    checked_sub(rhs: Mint): Mint;
    /**
     * Get the value of policy_id:asset_name if it exists.
     */
    get(policy_id: ScriptHash, asset: AssetName): bigint | undefined;
    get_assets(key: ScriptHash): MapAssetNameToNonZeroInt64 | undefined;
    insert_assets(policy_id: ScriptHash, assets: MapAssetNameToNonZeroInt64): MapAssetNameToNonZeroInt64 | undefined;
    keys(): PolicyIdList;
    static new(): Mint;
    policy_count(): number;
    /**
     * Set the value of policy_id:asset_name to value.
     * Returns the previous value, or None if it didn't exist
     */
    set(policy_id: ScriptHash, asset: AssetName, value: bigint): bigint | undefined;
}

export class MintBuilderResult {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
}

export class MultiAsset {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Adds to multiassets together, checking value bounds.
     * Does not modify self, and instead returns the result.
     */
    checked_add(rhs: MultiAsset): MultiAsset;
    /**
     * Subtracts rhs from this multiasset.
     * This does not modify self, and instead returns the result.
     * If this would cause there to be fewer than 0 of a given asset
     * an error will be returned.
     * Use clamped_sub if you need to only try to remove assets when they exist
     * and ignore them when they don't.
     */
    checked_sub(rhs: MultiAsset): MultiAsset;
    /**
     * Sybtracts rhs from this multiasset.
     * If this would cause there to be 0 or fewer of a given asset
     * it will simply be removed entirely from the result.
     */
    clamped_sub(rhs: MultiAsset): MultiAsset;
    /**
     * Get the value of policy_id:asset_name if it exists.
     */
    get(policy_id: ScriptHash, asset: AssetName): bigint | undefined;
    get_assets(key: ScriptHash): MapAssetNameToCoin | undefined;
    insert_assets(policy_id: ScriptHash, assets: MapAssetNameToCoin): MapAssetNameToCoin | undefined;
    keys(): PolicyIdList;
    static new(): MultiAsset;
    policy_count(): number;
    /**
     * Set the value of policy_id:asset_name to value.
     * Returns the previous value, or None if it didn't exist
     */
    set(policy_id: ScriptHash, asset: AssetName, value: bigint): bigint | undefined;
}

export class MultiHostName {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    dns_name(): DNSName;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): MultiHostName;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): MultiHostName;
    static from_json(json: string): MultiHostName;
    /**
     * * `dns_name` - A SRV DNS record
     */
    static new(dns_name: DNSName): MultiHostName;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

export class NativeScript {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    as_script_all(): ScriptAll | undefined;
    as_script_any(): ScriptAny | undefined;
    as_script_invalid_before(): ScriptInvalidBefore | undefined;
    as_script_invalid_hereafter(): ScriptInvalidHereafter | undefined;
    as_script_n_of_k(): ScriptNOfK | undefined;
    as_script_pubkey(): ScriptPubkey | undefined;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): NativeScript;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): NativeScript;
    static from_json(json: string): NativeScript;
    /**
     * Returns an array of unique Ed25519KeyHashes
     * contained within this script recursively on any depth level.
     * The order of the keys in the result is not determined in any way.
     */
    get_required_signers(): Ed25519KeyHashList;
    hash(): ScriptHash;
    kind(): NativeScriptKind;
    static new_script_all(native_scripts: NativeScriptList): NativeScript;
    static new_script_any(native_scripts: NativeScriptList): NativeScript;
    /**
     * Timelock validity intervals are half-open intervals [a, b). This field specifies the left (included) endpoint a.
     */
    static new_script_invalid_before(before: bigint): NativeScript;
    /**
     * Timelock validity intervals are half-open intervals [a, b). This field specifies the right (excluded) endpoint b.
     */
    static new_script_invalid_hereafter(after: bigint): NativeScript;
    static new_script_n_of_k(n: bigint, native_scripts: NativeScriptList): NativeScript;
    static new_script_pubkey(ed25519_key_hash: Ed25519KeyHash): NativeScript;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
    verify(lower_bound: bigint | null | undefined, upper_bound: bigint | null | undefined, key_hashes: Ed25519KeyHashList): boolean;
}

export enum NativeScriptKind {
    ScriptPubkey = 0,
    ScriptAll = 1,
    ScriptAny = 2,
    ScriptNOfK = 3,
    ScriptInvalidBefore = 4,
    ScriptInvalidHereafter = 5,
}

export class NativeScriptList {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    add(elem: NativeScript): void;
    get(index: number): NativeScript;
    len(): number;
    static new(): NativeScriptList;
}

export class NativeScriptWitnessInfo {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * You don't know how many keys will sign, so the maximum possible case will be assumed
     */
    static assume_signature_count(): NativeScriptWitnessInfo;
    /**
     * Unsure which keys will sign, but you know the exact number to save on tx fee
     */
    static num_signatures(num: number): NativeScriptWitnessInfo;
    /**
     * This native script will be witnessed by exactly these keys
     */
    static vkeys(vkeys: Ed25519KeyHashList): NativeScriptWitnessInfo;
}

export class NetworkId {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): NetworkId;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): NetworkId;
    static from_json(json: string): NetworkId;
    static mainnet(): NetworkId;
    network(): bigint;
    static new(network: bigint): NetworkId;
    static testnet(): NetworkId;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

export class NetworkInfo {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    static mainnet(): NetworkInfo;
    network_id(): number;
    static new(network_id: number, protocol_magic: ProtocolMagic): NetworkInfo;
    static preprod(): NetworkInfo;
    static preview(): NetworkInfo;
    protocol_magic(): ProtocolMagic;
    static sancho_testnet(): NetworkInfo;
    /**
     * This is the old testnet - most likely you want to use preview()/preprod()
     */
    static testnet(): NetworkInfo;
}

export class NewConstitution {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    action_id(): GovActionId | undefined;
    constitution(): Constitution;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): NewConstitution;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): NewConstitution;
    static from_json(json: string): NewConstitution;
    static new(action_id: GovActionId | null | undefined, constitution: Constitution): NewConstitution;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

export class NoConfidence {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    action_id(): GovActionId | undefined;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): NoConfidence;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): NoConfidence;
    static from_json(json: string): NoConfidence;
    static new(action_id?: GovActionId | null): NoConfidence;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

export class Nonce {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    as_hash(): NonceHash | undefined;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): Nonce;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): Nonce;
    static from_json(json: string): Nonce;
    kind(): NonceKind;
    static new_hash(hash: NonceHash): Nonce;
    static new_identity(): Nonce;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

export class NonceHash {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    static from_bech32(bech32_str: string): NonceHash;
    /**
     *
     *             * Parse from a hex string of the direct raw bytes, without any CBOR structure
     *
     */
    static from_hex(input: string): NonceHash;
    /**
     *
     *             * Parse from the direct raw bytes, without any CBOR structure
     *
     */
    static from_raw_bytes(bytes: Uint8Array): NonceHash;
    to_bech32(prefix: string): string;
    /**
     *
     *             * Direct raw bytes without any CBOR structure, as a hex-encoded string
     *
     */
    to_hex(): string;
    /**
     *
     *             * Direct raw bytes without any CBOR structure
     *
     */
    to_raw_bytes(): Uint8Array;
}

export enum NonceKind {
    Identity = 0,
    Hash = 1,
}

export class OperationalCert {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): OperationalCert;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): OperationalCert;
    static from_json(json: string): OperationalCert;
    hot_vkey(): KESVkey;
    kes_period(): bigint;
    static new(hot_vkey: KESVkey, sequence_number: bigint, kes_period: bigint, sigma: Ed25519Signature): OperationalCert;
    sequence_number(): bigint;
    sigma(): Ed25519Signature;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

export class ParameterChangeAction {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    action_id(): GovActionId | undefined;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): ParameterChangeAction;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): ParameterChangeAction;
    static from_json(json: string): ParameterChangeAction;
    static new(action_id: GovActionId | null | undefined, update: ProtocolParamUpdate, policy_hash?: ScriptHash | null): ParameterChangeAction;
    policy_hash(): ScriptHash | undefined;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
    update(): ProtocolParamUpdate;
}

/**
 * A partial Plutus witness
 * It contains all the information needed to witness the Plutus script execution
 * except for the redeemer tag and index
 * Note: no datum is attached because only input script types have datums
 */
export class PartialPlutusWitness {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    data(): PlutusData;
    static new(script: PlutusScriptWitness, data: PlutusData): PartialPlutusWitness;
    script(): PlutusScriptWitness;
}

export class PlutusData {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    as_bytes(): Uint8Array | undefined;
    as_constr_plutus_data(): ConstrPlutusData | undefined;
    as_integer(): BigInteger | undefined;
    as_list(): PlutusDataList | undefined;
    as_map(): PlutusMap | undefined;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): PlutusData;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): PlutusData;
    static from_json(json: string): PlutusData;
    kind(): PlutusDataKind;
    static new_bytes(bytes: Uint8Array): PlutusData;
    static new_constr_plutus_data(constr_plutus_data: ConstrPlutusData): PlutusData;
    static new_integer(big_int: BigInteger): PlutusData;
    static new_list(list: PlutusDataList): PlutusData;
    static new_map(map: PlutusMap): PlutusData;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *     *  Convert to a Datum that will serialize equivalent to cardano-node's format
     *     *
     *     *  Please VERY STRONGLY consider using PlutusData::from_cbor_bytes() instead wherever possible.
     *     * You should try to never rely on a tool encoding CBOR a certain way as there are many possible,
     *     * and just because it matches with a specific datum, doesn't mean that a different datum won't differ.
     *     * This is critical as that means the datum hash won't match.
     *     * After creation a datum (or other hashable CBOR object) should only be treated as raw CBOR bytes,
     *     * or through a type that respects its specific CBOR format e.g. CML's PlutusData::from_cbor_bytes()
     *     *
     *     *  This function is just here in case there's no possible way at all to create from CBOR bytes and
     *     * thus cold only be constructed manually and then had this function called on it.
     *     *
     *     *  This is also the format that CSL and Lucid use
     *
     */
    to_cardano_node_format(): PlutusData;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

export enum PlutusDataKind {
    ConstrPlutusData = 0,
    Map = 1,
    List = 2,
    Integer = 3,
    Bytes = 4,
}

export class PlutusDataList {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    add(elem: PlutusData): void;
    get(index: number): PlutusData;
    len(): number;
    static new(): PlutusDataList;
}

export class PlutusMap {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): PlutusMap;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): PlutusMap;
    /**
     * Gets the plutus datum corresponding to a given key, if it exists.
     * Note: In the case of duplicate keys this only returns the first datum.
     * This is an extremely rare occurence on-chain but can happen.
     */
    get(key: PlutusData): PlutusData | undefined;
    /**
     * In the extremely unlikely situation there are duplicate keys, this gets all of a single key
     */
    get_all(key: PlutusData): PlutusDataList | undefined;
    is_empty(): boolean;
    keys(): PlutusDataList;
    len(): number;
    static new(): PlutusMap;
    /**
     * Replaces all datums of a given key, if any exist.
     */
    set(key: PlutusData, value: PlutusData): void;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
}

/**
 * Version-agnostic Plutus script
 */
export class PlutusScript {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    as_v1(): PlutusV1Script | undefined;
    as_v2(): PlutusV2Script | undefined;
    as_v3(): PlutusV3Script | undefined;
    static from_v1(script: PlutusV1Script): PlutusScript;
    static from_v2(script: PlutusV2Script): PlutusScript;
    static from_v3(script: PlutusV3Script): PlutusScript;
    hash(): ScriptHash;
    version(): Language;
}

export class PlutusScriptWitness {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    hash(): ScriptHash;
    static new_ref(hash: ScriptHash): PlutusScriptWitness;
    static new_script(script: PlutusScript): PlutusScriptWitness;
}

export class PlutusV1Script {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): PlutusV1Script;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): PlutusV1Script;
    /**
     *
     *             * Parse from a hex string of the direct raw bytes, without any CBOR structure
     *
     */
    static from_hex(input: string): PlutusV1Script;
    static from_json(json: string): PlutusV1Script;
    /**
     *
     *             * Parse from the direct raw bytes, without any CBOR structure
     *
     */
    static from_raw_bytes(bytes: Uint8Array): PlutusV1Script;
    hash(): ScriptHash;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    /**
     *
     *             * Direct raw bytes without any CBOR structure, as a hex-encoded string
     *
     */
    to_hex(): string;
    to_js_value(): any;
    to_json(): string;
    /**
     *
     *             * Direct raw bytes without any CBOR structure
     *
     */
    to_raw_bytes(): Uint8Array;
}

export class PlutusV1ScriptList {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    add(elem: PlutusV1Script): void;
    get(index: number): PlutusV1Script;
    len(): number;
    static new(): PlutusV1ScriptList;
}

export class PlutusV2Script {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): PlutusV2Script;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): PlutusV2Script;
    /**
     *
     *             * Parse from a hex string of the direct raw bytes, without any CBOR structure
     *
     */
    static from_hex(input: string): PlutusV2Script;
    static from_json(json: string): PlutusV2Script;
    /**
     *
     *             * Parse from the direct raw bytes, without any CBOR structure
     *
     */
    static from_raw_bytes(bytes: Uint8Array): PlutusV2Script;
    hash(): ScriptHash;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    /**
     *
     *             * Direct raw bytes without any CBOR structure, as a hex-encoded string
     *
     */
    to_hex(): string;
    to_js_value(): any;
    to_json(): string;
    /**
     *
     *             * Direct raw bytes without any CBOR structure
     *
     */
    to_raw_bytes(): Uint8Array;
}

export class PlutusV2ScriptList {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    add(elem: PlutusV2Script): void;
    get(index: number): PlutusV2Script;
    len(): number;
    static new(): PlutusV2ScriptList;
}

export class PlutusV3Script {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): PlutusV3Script;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): PlutusV3Script;
    /**
     *
     *             * Parse from a hex string of the direct raw bytes, without any CBOR structure
     *
     */
    static from_hex(input: string): PlutusV3Script;
    static from_json(json: string): PlutusV3Script;
    /**
     *
     *             * Parse from the direct raw bytes, without any CBOR structure
     *
     */
    static from_raw_bytes(bytes: Uint8Array): PlutusV3Script;
    hash(): ScriptHash;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    /**
     *
     *             * Direct raw bytes without any CBOR structure, as a hex-encoded string
     *
     */
    to_hex(): string;
    to_js_value(): any;
    to_json(): string;
    /**
     *
     *             * Direct raw bytes without any CBOR structure
     *
     */
    to_raw_bytes(): Uint8Array;
}

export class PlutusV3ScriptList {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    add(elem: PlutusV3Script): void;
    get(index: number): PlutusV3Script;
    len(): number;
    static new(): PlutusV3ScriptList;
}

export class Pointer {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
}

export class PointerAddress {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    static from_address(address: Address): PointerAddress | undefined;
    network_id(): number;
    static new(network: number, payment: Credential, stake: Pointer): PointerAddress;
    payment(): Credential;
    stake(): Pointer;
    to_address(): Address;
}

export class PolicyIdList {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    add(elem: ScriptHash): void;
    get(index: number): ScriptHash;
    len(): number;
    static new(): PolicyIdList;
}

export class PoolMetadata {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): PoolMetadata;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): PoolMetadata;
    static from_json(json: string): PoolMetadata;
    static new(url: Url, pool_metadata_hash: PoolMetadataHash): PoolMetadata;
    pool_metadata_hash(): PoolMetadataHash;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
    url(): Url;
}

export class PoolMetadataHash {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    static from_bech32(bech32_str: string): PoolMetadataHash;
    /**
     *
     *             * Parse from a hex string of the direct raw bytes, without any CBOR structure
     *
     */
    static from_hex(input: string): PoolMetadataHash;
    /**
     *
     *             * Parse from the direct raw bytes, without any CBOR structure
     *
     */
    static from_raw_bytes(bytes: Uint8Array): PoolMetadataHash;
    to_bech32(prefix: string): string;
    /**
     *
     *             * Direct raw bytes without any CBOR structure, as a hex-encoded string
     *
     */
    to_hex(): string;
    /**
     *
     *             * Direct raw bytes without any CBOR structure
     *
     */
    to_raw_bytes(): Uint8Array;
}

export class PoolParams {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    cost(): bigint;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): PoolParams;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): PoolParams;
    static from_json(json: string): PoolParams;
    margin(): UnitInterval;
    static new(operator: Ed25519KeyHash, vrf_keyhash: VRFKeyHash, pledge: bigint, cost: bigint, margin: UnitInterval, reward_account: RewardAddress, pool_owners: Ed25519KeyHashList, relays: RelayList, pool_metadata?: PoolMetadata | null): PoolParams;
    operator(): Ed25519KeyHash;
    pledge(): bigint;
    pool_metadata(): PoolMetadata | undefined;
    pool_owners(): Ed25519KeyHashList;
    relays(): RelayList;
    reward_account(): RewardAddress;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
    vrf_keyhash(): VRFKeyHash;
}

export class PoolRegistration {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): PoolRegistration;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): PoolRegistration;
    static from_json(json: string): PoolRegistration;
    static new(pool_params: PoolParams): PoolRegistration;
    pool_params(): PoolParams;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

export class PoolRetirement {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    epoch(): bigint;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): PoolRetirement;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): PoolRetirement;
    static from_json(json: string): PoolRetirement;
    static new(pool: Ed25519KeyHash, epoch: bigint): PoolRetirement;
    pool(): Ed25519KeyHash;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

export class PoolVotingThresholds {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    committee_no_confidence(): UnitInterval;
    committee_normal(): UnitInterval;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): PoolVotingThresholds;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): PoolVotingThresholds;
    static from_json(json: string): PoolVotingThresholds;
    hard_fork_initiation(): UnitInterval;
    motion_no_confidence(): UnitInterval;
    static new(motion_no_confidence: UnitInterval, committee_normal: UnitInterval, committee_no_confidence: UnitInterval, hard_fork_initiation: UnitInterval, security_relevant_parameter_voting_threshold: UnitInterval): PoolVotingThresholds;
    security_relevant_parameter_voting_threshold(): UnitInterval;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

export class PrivateKey {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Get private key from its bech32 representation
     * ```javascript
     * PrivateKey.from_bech32(&#39;ed25519_sk1ahfetf02qwwg4dkq7mgp4a25lx5vh9920cr5wnxmpzz9906qvm8qwvlts0&#39;);
     * ```
     * For an extended 25519 key
     * ```javascript
     * PrivateKey.from_bech32(&#39;ed25519e_sk1gqwl4szuwwh6d0yk3nsqcc6xxc3fpvjlevgwvt60df59v8zd8f8prazt8ln3lmz096ux3xvhhvm3ca9wj2yctdh3pnw0szrma07rt5gl748fp&#39;);
     * ```
     */
    static from_bech32(bech32_str: string): PrivateKey;
    static from_extended_bytes(bytes: Uint8Array): PrivateKey;
    static from_normal_bytes(bytes: Uint8Array): PrivateKey;
    static generate_ed25519(): PrivateKey;
    static generate_ed25519extended(): PrivateKey;
    sign(message: Uint8Array): Ed25519Signature;
    to_bech32(): string;
    to_public(): PublicKey;
    to_raw_bytes(): Uint8Array;
}

export class ProposalBuilder {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    build(): ProposalBuilderResult;
    static new(): ProposalBuilder;
    with_native_script_proposal(proposal: ProposalProcedure, native_script: NativeScript, witness_info: NativeScriptWitnessInfo): ProposalBuilder;
    with_plutus_proposal(proposal: ProposalProcedure, partial_witness: PartialPlutusWitness, required_signers: Ed25519KeyHashList, datum: PlutusData): ProposalBuilder;
    with_plutus_proposal_inline_datum(proposal: ProposalProcedure, partial_witness: PartialPlutusWitness, required_signers: Ed25519KeyHashList): ProposalBuilder;
    with_proposal(proposal: ProposalProcedure): ProposalBuilder;
}

export class ProposalBuilderResult {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
}

export class ProposalProcedure {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    anchor(): Anchor;
    deposit(): bigint;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): ProposalProcedure;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): ProposalProcedure;
    static from_json(json: string): ProposalProcedure;
    gov_action(): GovAction;
    static new(deposit: bigint, reward_account: RewardAddress, gov_action: GovAction, anchor: Anchor): ProposalProcedure;
    reward_account(): RewardAddress;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

export class ProposalProcedureList {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    add(elem: ProposalProcedure): void;
    get(index: number): ProposalProcedure;
    len(): number;
    static new(): ProposalProcedureList;
}

export class ProtocolMagic {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    static new(pm: number): ProtocolMagic;
    to_int(): number;
}

export class ProtocolParamUpdate {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    ada_per_utxo_byte(): bigint | undefined;
    collateral_percentage(): bigint | undefined;
    committee_term_limit(): bigint | undefined;
    cost_models_for_script_languages(): CostModels | undefined;
    d_rep_deposit(): bigint | undefined;
    d_rep_inactivity_period(): bigint | undefined;
    d_rep_voting_thresholds(): DRepVotingThresholds | undefined;
    execution_costs(): ExUnitPrices | undefined;
    expansion_rate(): UnitInterval | undefined;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): ProtocolParamUpdate;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): ProtocolParamUpdate;
    static from_json(json: string): ProtocolParamUpdate;
    governance_action_deposit(): bigint | undefined;
    governance_action_validity_period(): bigint | undefined;
    key_deposit(): bigint | undefined;
    max_block_body_size(): bigint | undefined;
    max_block_ex_units(): ExUnits | undefined;
    max_block_header_size(): bigint | undefined;
    max_collateral_inputs(): bigint | undefined;
    max_transaction_size(): bigint | undefined;
    max_tx_ex_units(): ExUnits | undefined;
    max_value_size(): bigint | undefined;
    maximum_epoch(): bigint | undefined;
    min_committee_size(): bigint | undefined;
    min_fee_ref_script_cost_per_byte(): Rational | undefined;
    min_pool_cost(): bigint | undefined;
    minfee_a(): bigint | undefined;
    minfee_b(): bigint | undefined;
    n_opt(): bigint | undefined;
    static new(): ProtocolParamUpdate;
    pool_deposit(): bigint | undefined;
    pool_pledge_influence(): Rational | undefined;
    pool_voting_thresholds(): PoolVotingThresholds | undefined;
    set_ada_per_utxo_byte(ada_per_utxo_byte: bigint): void;
    set_collateral_percentage(collateral_percentage: bigint): void;
    set_committee_term_limit(committee_term_limit: bigint): void;
    set_cost_models_for_script_languages(cost_models_for_script_languages: CostModels): void;
    set_d_rep_deposit(d_rep_deposit: bigint): void;
    set_d_rep_inactivity_period(d_rep_inactivity_period: bigint): void;
    set_d_rep_voting_thresholds(d_rep_voting_thresholds: DRepVotingThresholds): void;
    set_execution_costs(execution_costs: ExUnitPrices): void;
    set_expansion_rate(expansion_rate: UnitInterval): void;
    set_governance_action_deposit(governance_action_deposit: bigint): void;
    set_governance_action_validity_period(governance_action_validity_period: bigint): void;
    set_key_deposit(key_deposit: bigint): void;
    set_max_block_body_size(max_block_body_size: bigint): void;
    set_max_block_ex_units(max_block_ex_units: ExUnits): void;
    set_max_block_header_size(max_block_header_size: bigint): void;
    set_max_collateral_inputs(max_collateral_inputs: bigint): void;
    set_max_transaction_size(max_transaction_size: bigint): void;
    set_max_tx_ex_units(max_tx_ex_units: ExUnits): void;
    set_max_value_size(max_value_size: bigint): void;
    set_maximum_epoch(maximum_epoch: bigint): void;
    set_min_committee_size(min_committee_size: bigint): void;
    set_min_fee_ref_script_cost_per_byte(min_fee_ref_script_cost_per_byte: Rational): void;
    set_min_pool_cost(min_pool_cost: bigint): void;
    set_minfee_a(minfee_a: bigint): void;
    set_minfee_b(minfee_b: bigint): void;
    set_n_opt(n_opt: bigint): void;
    set_pool_deposit(pool_deposit: bigint): void;
    set_pool_pledge_influence(pool_pledge_influence: Rational): void;
    set_pool_voting_thresholds(pool_voting_thresholds: PoolVotingThresholds): void;
    set_treasury_growth_rate(treasury_growth_rate: UnitInterval): void;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
    treasury_growth_rate(): UnitInterval | undefined;
}

export class ProtocolVersion {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): ProtocolVersion;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): ProtocolVersion;
    static from_json(json: string): ProtocolVersion;
    major(): bigint;
    minor(): bigint;
    static new(major: bigint, minor: bigint): ProtocolVersion;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

/**
 * ED25519 key used as public key
 */
export class PublicKey {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Get public key from its bech32 representation
     * Example:
     * ```javascript
     * const pkey = PublicKey.from_bech32(&#39;ed25519_pk1dgaagyh470y66p899txcl3r0jaeaxu6yd7z2dxyk55qcycdml8gszkxze2&#39;);
     * ```
     */
    static from_bech32(bech32_str: string): PublicKey;
    static from_bytes(bytes: Uint8Array): PublicKey;
    hash(): Ed25519KeyHash;
    to_bech32(): string;
    to_raw_bytes(): Uint8Array;
    verify(data: Uint8Array, signature: Ed25519Signature): boolean;
}

export class Rational {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    denominator(): bigint;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): Rational;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): Rational;
    static from_json(json: string): Rational;
    static new(numerator: bigint, denominator: bigint): Rational;
    numerator(): bigint;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

export class RedeemerKey {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): RedeemerKey;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): RedeemerKey;
    static from_json(json: string): RedeemerKey;
    index(): bigint;
    static new(tag: RedeemerTag, index: bigint): RedeemerKey;
    tag(): RedeemerTag;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

export class RedeemerKeyList {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    add(elem: RedeemerKey): void;
    get(index: number): RedeemerKey;
    len(): number;
    static new(): RedeemerKeyList;
}

/**
 * In order to calculate the index from the sorted set, "add_*" methods in this builder
 * must be called along with the "add_*" methods in transaction builder.
 */
export class RedeemerSetBuilder {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    add_cert(result: CertificateBuilderResult): void;
    add_mint(result: MintBuilderResult): void;
    add_proposal(result: ProposalBuilderResult): void;
    add_reward(result: WithdrawalBuilderResult): void;
    add_spend(result: InputBuilderResult): void;
    add_vote(result: VoteBuilderResult): void;
    build(default_to_dummy_exunits: boolean): Redeemers;
    is_empty(): boolean;
    static new(): RedeemerSetBuilder;
    /**
     * note: will override existing value if called twice with the same key
     */
    update_ex_units(key: RedeemerWitnessKey, ex_units: ExUnits): void;
}

export enum RedeemerTag {
    Spend = 0,
    Mint = 1,
    Cert = 2,
    Reward = 3,
    Voting = 4,
    Proposing = 5,
}

export class RedeemerVal {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    data(): PlutusData;
    ex_units(): ExUnits;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): RedeemerVal;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): RedeemerVal;
    static from_json(json: string): RedeemerVal;
    static new(data: PlutusData, ex_units: ExUnits): RedeemerVal;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

export class RedeemerWitnessKey {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    static from_redeemer(redeemer: LegacyRedeemer): RedeemerWitnessKey;
    static new(tag: RedeemerTag, index: bigint): RedeemerWitnessKey;
}

export class Redeemers {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    as_arr_legacy_redeemer(): LegacyRedeemerList | undefined;
    as_map_redeemer_key_to_redeemer_val(): MapRedeemerKeyToRedeemerVal | undefined;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): Redeemers;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): Redeemers;
    static from_json(json: string): Redeemers;
    kind(): RedeemersKind;
    static new_arr_legacy_redeemer(arr_legacy_redeemer: LegacyRedeemerList): Redeemers;
    static new_map_redeemer_key_to_redeemer_val(map_redeemer_key_to_redeemer_val: MapRedeemerKeyToRedeemerVal): Redeemers;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_flat_format(): LegacyRedeemerList;
    to_js_value(): any;
    to_json(): string;
}

export enum RedeemersKind {
    ArrLegacyRedeemer = 0,
    MapRedeemerKeyToRedeemerVal = 1,
}

export class RegCert {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    deposit(): bigint;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): RegCert;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): RegCert;
    static from_json(json: string): RegCert;
    static new(stake_credential: Credential, deposit: bigint): RegCert;
    stake_credential(): Credential;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

export class RegDrepCert {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    anchor(): Anchor | undefined;
    deposit(): bigint;
    drep_credential(): Credential;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): RegDrepCert;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): RegDrepCert;
    static from_json(json: string): RegDrepCert;
    static new(drep_credential: Credential, deposit: bigint, anchor?: Anchor | null): RegDrepCert;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

export class Relay {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    as_multi_host_name(): MultiHostName | undefined;
    as_single_host_addr(): SingleHostAddr | undefined;
    as_single_host_name(): SingleHostName | undefined;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): Relay;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): Relay;
    static from_json(json: string): Relay;
    kind(): RelayKind;
    static new_multi_host_name(dns_name: DNSName): Relay;
    static new_single_host_addr(port?: number | null, ipv4?: Ipv4 | null, ipv6?: Ipv6 | null): Relay;
    static new_single_host_name(port: number | null | undefined, dns_name: DNSName): Relay;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

export enum RelayKind {
    SingleHostAddr = 0,
    SingleHostName = 1,
    MultiHostName = 2,
}

export class RelayList {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    add(elem: Relay): void;
    get(index: number): Relay;
    len(): number;
    static new(): RelayList;
}

export class RequiredWitnessSet {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    add_all(requirements: RequiredWitnessSet): void;
    add_bootstrap(address: ByronAddress): void;
    add_plutus_datum_hash(plutus_datum: DatumHash): void;
    add_redeemer_tag(redeemer: RedeemerWitnessKey): void;
    add_script_hash(script_hash: ScriptHash): void;
    add_script_ref(script_hash: ScriptHash): void;
    add_vkey_key_hash(hash: Ed25519KeyHash): void;
    static new(): RequiredWitnessSet;
    withdrawal_required_wits(address: RewardAddress): void;
}

export class ResignCommitteeColdCert {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    anchor(): Anchor | undefined;
    committee_cold_credential(): Credential;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): ResignCommitteeColdCert;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): ResignCommitteeColdCert;
    static from_json(json: string): ResignCommitteeColdCert;
    static new(committee_cold_credential: Credential, anchor?: Anchor | null): ResignCommitteeColdCert;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

export class RewardAccountList {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    add(elem: RewardAddress): void;
    get(index: number): RewardAddress;
    len(): number;
    static new(): RewardAccountList;
}

export class RewardAddress {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    static from_address(address: Address): RewardAddress | undefined;
    static from_json(json: string): RewardAddress;
    network_id(): number;
    static new(network: number, payment: Credential): RewardAddress;
    payment(): Credential;
    to_address(): Address;
    to_js_value(): any;
    to_json(): string;
}

export class Script {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    as_native(): NativeScript | undefined;
    as_plutus_v1(): PlutusV1Script | undefined;
    as_plutus_v2(): PlutusV2Script | undefined;
    as_plutus_v3(): PlutusV3Script | undefined;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): Script;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): Script;
    static from_json(json: string): Script;
    hash(): ScriptHash;
    kind(): ScriptKind;
    language(): Language | undefined;
    static new_native(script: NativeScript): Script;
    static new_plutus_v1(script: PlutusV1Script): Script;
    static new_plutus_v2(script: PlutusV2Script): Script;
    static new_plutus_v3(script: PlutusV3Script): Script;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

export class ScriptAll {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): ScriptAll;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): ScriptAll;
    static from_json(json: string): ScriptAll;
    native_scripts(): NativeScriptList;
    static new(native_scripts: NativeScriptList): ScriptAll;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

export class ScriptAny {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): ScriptAny;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): ScriptAny;
    static from_json(json: string): ScriptAny;
    native_scripts(): NativeScriptList;
    static new(native_scripts: NativeScriptList): ScriptAny;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

export class ScriptDataHash {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    static from_bech32(bech32_str: string): ScriptDataHash;
    /**
     *
     *             * Parse from a hex string of the direct raw bytes, without any CBOR structure
     *
     */
    static from_hex(input: string): ScriptDataHash;
    /**
     *
     *             * Parse from the direct raw bytes, without any CBOR structure
     *
     */
    static from_raw_bytes(bytes: Uint8Array): ScriptDataHash;
    to_bech32(prefix: string): string;
    /**
     *
     *             * Direct raw bytes without any CBOR structure, as a hex-encoded string
     *
     */
    to_hex(): string;
    /**
     *
     *             * Direct raw bytes without any CBOR structure
     *
     */
    to_raw_bytes(): Uint8Array;
}

export class ScriptHash {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    static from_bech32(bech32_str: string): ScriptHash;
    /**
     *
     *             * Parse from a hex string of the direct raw bytes, without any CBOR structure
     *
     */
    static from_hex(input: string): ScriptHash;
    /**
     *
     *             * Parse from the direct raw bytes, without any CBOR structure
     *
     */
    static from_raw_bytes(bytes: Uint8Array): ScriptHash;
    to_bech32(prefix: string): string;
    /**
     *
     *             * Direct raw bytes without any CBOR structure, as a hex-encoded string
     *
     */
    to_hex(): string;
    /**
     *
     *             * Direct raw bytes without any CBOR structure
     *
     */
    to_raw_bytes(): Uint8Array;
}

export class ScriptInvalidBefore {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    before(): bigint;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): ScriptInvalidBefore;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): ScriptInvalidBefore;
    static from_json(json: string): ScriptInvalidBefore;
    static new(before: bigint): ScriptInvalidBefore;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

export class ScriptInvalidHereafter {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    after(): bigint;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): ScriptInvalidHereafter;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): ScriptInvalidHereafter;
    static from_json(json: string): ScriptInvalidHereafter;
    static new(after: bigint): ScriptInvalidHereafter;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

export enum ScriptKind {
    Native = 0,
    PlutusV1 = 1,
    PlutusV2 = 2,
    PlutusV3 = 3,
}

export class ScriptNOfK {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): ScriptNOfK;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): ScriptNOfK;
    static from_json(json: string): ScriptNOfK;
    n(): bigint;
    native_scripts(): NativeScriptList;
    static new(n: bigint, native_scripts: NativeScriptList): ScriptNOfK;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

export class ScriptPubkey {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    ed25519_key_hash(): Ed25519KeyHash;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): ScriptPubkey;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): ScriptPubkey;
    static from_json(json: string): ScriptPubkey;
    static new(ed25519_key_hash: Ed25519KeyHash): ScriptPubkey;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

export class ShelleyMAFormatAuxData {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    auxiliary_scripts(): NativeScriptList;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): ShelleyMAFormatAuxData;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): ShelleyMAFormatAuxData;
    static from_json(json: string): ShelleyMAFormatAuxData;
    static new(transaction_metadata: Metadata, auxiliary_scripts: NativeScriptList): ShelleyMAFormatAuxData;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
    transaction_metadata(): Metadata;
}

export class SignedTxBuilder {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    add_bootstrap(bootstrap: BootstrapWitness): void;
    add_vkey(vkey: Vkeywitness): void;
    auxiliary_data(): AuxiliaryData | undefined;
    body(): TransactionBody;
    /**
     *
     *     * Builds the final transaction and checks that all witnesses are there
     *
     */
    build_checked(): Transaction;
    /**
     *
     *     * Builds the transaction without doing any witness checks.
     *     *
     *     * This can be useful if other witnesses will be added later.
     *     * e.g. CIP30 signing takes a Transaction with possible witnesses
     *     * to send to the wallet to fill in the missing ones.
     *
     */
    build_unchecked(): Transaction;
    is_valid(): boolean;
    static new_with_data(body: TransactionBody, witness_set: TransactionWitnessSetBuilder, is_valid: boolean, auxiliary_data: AuxiliaryData): SignedTxBuilder;
    static new_without_data(body: TransactionBody, witness_set: TransactionWitnessSetBuilder, is_valid: boolean): SignedTxBuilder;
    witness_set(): TransactionWitnessSetBuilder;
}

export class SingleCertificateBuilder {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Signer keys don't have to be set. You can leave it empty and then add the required witnesses later
     */
    native_script(native_script: NativeScript, witness_info: NativeScriptWitnessInfo): CertificateBuilderResult;
    static new(cert: Certificate): SingleCertificateBuilder;
    payment_key(): CertificateBuilderResult;
    plutus_script(partial_witness: PartialPlutusWitness, required_signers: Ed25519KeyHashList): CertificateBuilderResult;
    /**
     * note: particularly useful for StakeRegistration which doesn't require witnessing
     */
    skip_witness(): CertificateBuilderResult;
}

export class SingleHostAddr {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): SingleHostAddr;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): SingleHostAddr;
    static from_json(json: string): SingleHostAddr;
    ipv4(): Ipv4 | undefined;
    ipv6(): Ipv6 | undefined;
    static new(port?: number | null, ipv4?: Ipv4 | null, ipv6?: Ipv6 | null): SingleHostAddr;
    port(): number | undefined;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

export class SingleHostName {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    dns_name(): DNSName;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): SingleHostName;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): SingleHostName;
    static from_json(json: string): SingleHostName;
    /**
     * * `dns_name` - An A or AAAA DNS record
     */
    static new(port: number | null | undefined, dns_name: DNSName): SingleHostName;
    port(): number | undefined;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

export class SingleInputBuilder {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    static from_transaction_unspent_output(utxo: TransactionUnspentOutput): SingleInputBuilder;
    native_script(native_script: NativeScript, witness_info: NativeScriptWitnessInfo): InputBuilderResult;
    static new(input: TransactionInput, utxo_info: TransactionOutput): SingleInputBuilder;
    payment_key(): InputBuilderResult;
    plutus_script(partial_witness: PartialPlutusWitness, required_signers: Ed25519KeyHashList, datum: PlutusData): InputBuilderResult;
    plutus_script_inline_datum(partial_witness: PartialPlutusWitness, required_signers: Ed25519KeyHashList): InputBuilderResult;
}

export class SingleMintBuilder {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    native_script(native_script: NativeScript, witness_info: NativeScriptWitnessInfo): MintBuilderResult;
    static new(assets: MapAssetNameToNonZeroInt64): SingleMintBuilder;
    static new_single_asset(asset: AssetName, amount: bigint): SingleMintBuilder;
    plutus_script(partial_witness: PartialPlutusWitness, required_signers: Ed25519KeyHashList): MintBuilderResult;
}

export class SingleOutputBuilderResult {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    communication_datum(): PlutusData | undefined;
    static new(output: TransactionOutput): SingleOutputBuilderResult;
    output(): TransactionOutput;
}

export class SingleWithdrawalBuilder {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    native_script(native_script: NativeScript, witness_info: NativeScriptWitnessInfo): WithdrawalBuilderResult;
    static new(address: RewardAddress, amount: bigint): SingleWithdrawalBuilder;
    payment_key(): WithdrawalBuilderResult;
    plutus_script(partial_witness: PartialPlutusWitness, required_signers: Ed25519KeyHashList): WithdrawalBuilderResult;
}

export class SpendingData {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    as_spending_data_pub_key(): Bip32PublicKey | undefined;
    as_spending_data_redeem(): PublicKey | undefined;
    as_spending_data_script(): ByronScript | undefined;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): SpendingData;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): SpendingData;
    kind(): SpendingDataKind;
    static new_spending_data_pub_key(pubkey: Bip32PublicKey): SpendingData;
    static new_spending_data_redeem(redeem: PublicKey): SpendingData;
    static new_spending_data_script(script: ByronScript): SpendingData;
    /**
     *
     *             * Serialize this type to CBOR bytes.
     *             * This type does NOT support fine-tuned encoding options so this may or may not be
     *             * canonical CBOR and may or may not preserve round-trip encodings.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type does NOT support fine-tuned encoding options so this may or may not be
     *             * canonical CBOR and may or may not preserve round-trip encodings.
     *
     */
    to_cbor_hex(): string;
}

export enum SpendingDataKind {
    SpendingDataPubKey = 0,
    SpendingDataScript = 1,
    SpendingDataRedeem = 2,
}

export class StakeCredentialList {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    add(elem: Credential): void;
    get(index: number): Credential;
    len(): number;
    static new(): StakeCredentialList;
}

export class StakeDelegation {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): StakeDelegation;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): StakeDelegation;
    static from_json(json: string): StakeDelegation;
    static new(stake_credential: Credential, pool: Ed25519KeyHash): StakeDelegation;
    pool(): Ed25519KeyHash;
    stake_credential(): Credential;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

export class StakeDeregistration {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): StakeDeregistration;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): StakeDeregistration;
    static from_json(json: string): StakeDeregistration;
    static new(stake_credential: Credential): StakeDeregistration;
    stake_credential(): Credential;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

export class StakeDistribution {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    as_single_key(): StakeholderId | undefined;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): StakeDistribution;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): StakeDistribution;
    kind(): StakeDistributionKind;
    static new_bootstrap_era(): StakeDistribution;
    static new_single_key(stakeholder_id: StakeholderId): StakeDistribution;
    /**
     *
     *             * Serialize this type to CBOR bytes.
     *             * This type does NOT support fine-tuned encoding options so this may or may not be
     *             * canonical CBOR and may or may not preserve round-trip encodings.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type does NOT support fine-tuned encoding options so this may or may not be
     *             * canonical CBOR and may or may not preserve round-trip encodings.
     *
     */
    to_cbor_hex(): string;
}

export enum StakeDistributionKind {
    SingleKey = 0,
    BootstrapEra = 1,
}

export class StakeRegDelegCert {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    deposit(): bigint;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): StakeRegDelegCert;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): StakeRegDelegCert;
    static from_json(json: string): StakeRegDelegCert;
    static new(stake_credential: Credential, pool: Ed25519KeyHash, deposit: bigint): StakeRegDelegCert;
    pool(): Ed25519KeyHash;
    stake_credential(): Credential;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

export class StakeRegistration {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): StakeRegistration;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): StakeRegistration;
    static from_json(json: string): StakeRegistration;
    static new(stake_credential: Credential): StakeRegistration;
    stake_credential(): Credential;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

export class StakeVoteDelegCert {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    d_rep(): DRep;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): StakeVoteDelegCert;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): StakeVoteDelegCert;
    static from_json(json: string): StakeVoteDelegCert;
    static new(stake_credential: Credential, pool: Ed25519KeyHash, d_rep: DRep): StakeVoteDelegCert;
    pool(): Ed25519KeyHash;
    stake_credential(): Credential;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

export class StakeVoteRegDelegCert {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    d_rep(): DRep;
    deposit(): bigint;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): StakeVoteRegDelegCert;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): StakeVoteRegDelegCert;
    static from_json(json: string): StakeVoteRegDelegCert;
    static new(stake_credential: Credential, pool: Ed25519KeyHash, d_rep: DRep, deposit: bigint): StakeVoteRegDelegCert;
    pool(): Ed25519KeyHash;
    stake_credential(): Credential;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

export class StakeholderId {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    static from_bech32(bech32_str: string): StakeholderId;
    /**
     *
     *             * Parse from a hex string of the direct raw bytes, without any CBOR structure
     *
     */
    static from_hex(input: string): StakeholderId;
    /**
     *
     *             * Parse from the direct raw bytes, without any CBOR structure
     *
     */
    static from_raw_bytes(bytes: Uint8Array): StakeholderId;
    static new(pubk: Bip32PublicKey): StakeholderId;
    to_bech32(prefix: string): string;
    /**
     *
     *             * Direct raw bytes without any CBOR structure, as a hex-encoded string
     *
     */
    to_hex(): string;
    /**
     *
     *             * Direct raw bytes without any CBOR structure
     *
     */
    to_raw_bytes(): Uint8Array;
}

export class SubCoin {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    denominator(): bigint;
    /**
     * Converts base 10 floats to SubCoin.
     * This is the format used by blockfrost for ex units
     * Warning: If the passed in float was not meant to be base 10
     * this might result in a slightly inaccurate fraction.
     */
    static from_base10_f32(f: number): SubCoin;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): SubCoin;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): SubCoin;
    static from_json(json: string): SubCoin;
    static new(numerator: bigint, denominator: bigint): SubCoin;
    numerator(): bigint;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

export class Transaction {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    auxiliary_data(): AuxiliaryData | undefined;
    body(): TransactionBody;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): Transaction;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): Transaction;
    static from_json(json: string): Transaction;
    is_valid(): boolean;
    static new(body: TransactionBody, witness_set: TransactionWitnessSet, is_valid: boolean, auxiliary_data?: AuxiliaryData | null): Transaction;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
    witness_set(): TransactionWitnessSet;
}

export class TransactionBody {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    auxiliary_data_hash(): AuxiliaryDataHash | undefined;
    certs(): CertificateList | undefined;
    collateral_inputs(): TransactionInputList | undefined;
    collateral_return(): TransactionOutput | undefined;
    current_treasury_value(): bigint | undefined;
    donation(): bigint | undefined;
    fee(): bigint;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): TransactionBody;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): TransactionBody;
    static from_json(json: string): TransactionBody;
    inputs(): TransactionInputList;
    mint(): Mint | undefined;
    network_id(): NetworkId | undefined;
    static new(inputs: TransactionInputList, outputs: TransactionOutputList, fee: bigint): TransactionBody;
    outputs(): TransactionOutputList;
    proposal_procedures(): ProposalProcedureList | undefined;
    reference_inputs(): TransactionInputList | undefined;
    required_signers(): Ed25519KeyHashList | undefined;
    script_data_hash(): ScriptDataHash | undefined;
    set_auxiliary_data_hash(auxiliary_data_hash: AuxiliaryDataHash): void;
    set_certs(certs: CertificateList): void;
    set_collateral_inputs(collateral_inputs: TransactionInputList): void;
    set_collateral_return(collateral_return: TransactionOutput): void;
    set_current_treasury_value(current_treasury_value: bigint): void;
    set_donation(donation: bigint): void;
    set_mint(mint: Mint): void;
    set_network_id(network_id: NetworkId): void;
    set_proposal_procedures(proposal_procedures: ProposalProcedureList): void;
    set_reference_inputs(reference_inputs: TransactionInputList): void;
    set_required_signers(required_signers: Ed25519KeyHashList): void;
    set_script_data_hash(script_data_hash: ScriptDataHash): void;
    set_total_collateral(total_collateral: bigint): void;
    set_ttl(ttl: bigint): void;
    set_validity_interval_start(validity_interval_start: bigint): void;
    set_voting_procedures(voting_procedures: VotingProcedures): void;
    set_withdrawals(withdrawals: MapRewardAccountToCoin): void;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
    total_collateral(): bigint | undefined;
    ttl(): bigint | undefined;
    validity_interval_start(): bigint | undefined;
    voting_procedures(): VotingProcedures | undefined;
    withdrawals(): MapRewardAccountToCoin | undefined;
}

export class TransactionBodyList {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    add(elem: TransactionBody): void;
    get(index: number): TransactionBody;
    len(): number;
    static new(): TransactionBodyList;
}

export class TransactionBuilder {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    add_auxiliary_data(new_aux_data: AuxiliaryData): void;
    add_cert(result: CertificateBuilderResult): void;
    /**
     * Warning: this function will mutate the /fee/ field
     * Make sure to call this function last after setting all other tx-body properties
     * Editing inputs, outputs, mint, etc. after change been calculated
     * might cause a mismatch in calculated fee versus the required fee
     */
    add_change_if_needed(address: Address, include_exunits: boolean): boolean;
    add_collateral(result: InputBuilderResult): void;
    add_input(result: InputBuilderResult): void;
    add_mint(result: MintBuilderResult): void;
    /**
     * Add explicit output via a TransactionOutput object
     */
    add_output(builder_result: SingleOutputBuilderResult): void;
    add_proposal(result: ProposalBuilderResult): void;
    /**
     * Add a reference input. Must be called BEFORE adding anything (inputs, certs, etc) that refer to this reference input.
     */
    add_reference_input(utxo: TransactionUnspentOutput): void;
    add_required_signer(hash: Ed25519KeyHash): void;
    add_utxo(result: InputBuilderResult): void;
    add_vote(result: VoteBuilderResult): void;
    add_withdrawal(result: WithdrawalBuilderResult): void;
    /**
     * Builds the transaction and moves to the next step where any real witness can be added
     * NOTE: is_valid set to true
     */
    build(algo: ChangeSelectionAlgo, change_address: Address): SignedTxBuilder;
    /**
     * Builds the transaction and moves to the next step redeemer units can be added and a draft tx can
     * be evaluated
     * NOTE: is_valid set to true
     */
    build_for_evaluation(algo: ChangeSelectionAlgo, change_address: Address): TxRedeemerBuilder;
    /**
     * calculates how much the fee would increase if you added a given output
     */
    fee_for_input(result: InputBuilderResult): bigint;
    /**
     * calculates how much the fee would increase if you added a given output
     */
    fee_for_output(builder: SingleOutputBuilderResult): bigint;
    full_size(): number;
    get_auxiliary_data(): AuxiliaryData | undefined;
    get_deposit(): bigint;
    /**
     * does not include refunds or withdrawals
     */
    get_explicit_input(): Value;
    /**
     * does not include fee
     */
    get_explicit_output(): Value;
    get_fee_if_set(): bigint | undefined;
    /**
     * withdrawals and refunds
     */
    get_implicit_input(): Value;
    /**
     * Returns a copy of the current mint state in the builder
     */
    get_mint(): Mint | undefined;
    /**
     * Return explicit input plus implicit input plus mint
     */
    get_total_input(): Value;
    /**
     * Return explicit output plus implicit output plus burn (does not consider fee directly)
     */
    get_total_output(): Value;
    get_withdrawals(): MapRewardAccountToCoin | undefined;
    /**
     * warning: sum of all parts of a transaction must equal 0. You cannot just set the fee to the min value and forget about it
     * warning: min_fee may be slightly larger than the actual minimum fee (ex: a few lovelaces)
     * this is done to simplify the library code, but can be fixed later
     */
    min_fee(script_calulation: boolean): bigint;
    network_id(): NetworkId | undefined;
    static new(cfg: TransactionBuilderConfig): TransactionBuilder;
    output_sizes(): Uint32Array;
    /**
     * This automatically selects and adds inputs from {inputs} consisting of just enough to cover
     * the outputs that have already been added.
     * This should be called after adding all certs/outputs/etc and will be an error otherwise.
     * Uses CIP2: https://github.com/cardano-foundation/CIPs/blob/master/CIP-0002/CIP-0002.md
     * Adding a change output must be called after via TransactionBuilder::add_change_if_needed()
     * This function, diverging from CIP2, takes into account fees and will attempt to add additional
     * inputs to cover the minimum fees. This does not, however, set the txbuilder's fee.
     */
    select_utxos(strategy: CoinSelectionStrategyCIP2): void;
    set_auxiliary_data(new_aux_data: AuxiliaryData): void;
    set_collateral_return(output: TransactionOutput): void;
    set_current_treasury_value(current_treasury_value: bigint): void;
    set_donation(donation: bigint): void;
    /**
     * used to override the exunit values initially provided when adding inputs
     */
    set_exunits(redeemer: RedeemerWitnessKey, ex_units: ExUnits): void;
    set_fee(fee: bigint): void;
    set_network_id(network_id: NetworkId): void;
    set_ttl(ttl: bigint): void;
    set_validity_start_interval(validity_start_interval: bigint): void;
}

export class TransactionBuilderConfig {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
}

export class TransactionBuilderConfigBuilder {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    build(): TransactionBuilderConfig;
    coins_per_utxo_byte(coins_per_utxo_byte: bigint): TransactionBuilderConfigBuilder;
    collateral_percentage(collateral_percentage: number): TransactionBuilderConfigBuilder;
    cost_models(cost_models: CostModels): TransactionBuilderConfigBuilder;
    ex_unit_prices(ex_unit_prices: ExUnitPrices): TransactionBuilderConfigBuilder;
    fee_algo(fee_algo: LinearFee): TransactionBuilderConfigBuilder;
    key_deposit(key_deposit: bigint): TransactionBuilderConfigBuilder;
    max_collateral_inputs(max_collateral_inputs: number): TransactionBuilderConfigBuilder;
    max_tx_size(max_tx_size: number): TransactionBuilderConfigBuilder;
    max_value_size(max_value_size: number): TransactionBuilderConfigBuilder;
    static new(): TransactionBuilderConfigBuilder;
    pool_deposit(pool_deposit: bigint): TransactionBuilderConfigBuilder;
    prefer_pure_change(prefer_pure_change: boolean): TransactionBuilderConfigBuilder;
}

export class TransactionHash {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    static from_bech32(bech32_str: string): TransactionHash;
    /**
     *
     *             * Parse from a hex string of the direct raw bytes, without any CBOR structure
     *
     */
    static from_hex(input: string): TransactionHash;
    /**
     *
     *             * Parse from the direct raw bytes, without any CBOR structure
     *
     */
    static from_raw_bytes(bytes: Uint8Array): TransactionHash;
    to_bech32(prefix: string): string;
    /**
     *
     *             * Direct raw bytes without any CBOR structure, as a hex-encoded string
     *
     */
    to_hex(): string;
    /**
     *
     *             * Direct raw bytes without any CBOR structure
     *
     */
    to_raw_bytes(): Uint8Array;
}

export class TransactionInput {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): TransactionInput;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): TransactionInput;
    static from_json(json: string): TransactionInput;
    index(): bigint;
    static new(transaction_id: TransactionHash, index: bigint): TransactionInput;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
    transaction_id(): TransactionHash;
}

export class TransactionInputList {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    add(elem: TransactionInput): void;
    get(index: number): TransactionInput;
    len(): number;
    static new(): TransactionInputList;
}

export class TransactionMetadatum {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    as_bytes(): Uint8Array | undefined;
    as_int(): Int | undefined;
    as_list(): MetadatumList | undefined;
    as_map(): MetadatumMap | undefined;
    as_text(): string | undefined;
    static from_cbor_bytes(cbor_bytes: Uint8Array): TransactionMetadatum;
    static from_json(json: string): TransactionMetadatum;
    kind(): TransactionMetadatumKind;
    static new_bytes(bytes: Uint8Array): TransactionMetadatum;
    static new_int(int: Int): TransactionMetadatum;
    static new_list(elements: MetadatumList): TransactionMetadatum;
    static new_map(map: MetadatumMap): TransactionMetadatum;
    static new_text(text: string): TransactionMetadatum;
    to_cbor_bytes(): Uint8Array;
    to_json(): string;
    to_json_value(): any;
}

export enum TransactionMetadatumKind {
    Map = 0,
    List = 1,
    Int = 2,
    Bytes = 3,
    Text = 4,
}

export class TransactionMetadatumLabels {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    add(elem: bigint): void;
    get(index: number): bigint;
    len(): number;
    static new(): TransactionMetadatumLabels;
}

export class TransactionMetadatumList {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    add(elem: TransactionMetadatum): void;
    get(index: number): TransactionMetadatum;
    len(): number;
    static new(): TransactionMetadatumList;
}

export class TransactionOutput {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    address(): Address;
    amount(): Value;
    as_alonzo_format_tx_out(): AlonzoFormatTxOut | undefined;
    as_conway_format_tx_out(): ConwayFormatTxOut | undefined;
    datum(): DatumOption | undefined;
    /**
     * Get the datum hash from a tx output if present as a hash.
     * Returns None if there is no datum, or the datum is inlined.
     * Use TransactionOutput::datum() for inlined datums.
     */
    datum_hash(): DatumHash | undefined;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): TransactionOutput;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): TransactionOutput;
    static from_json(json: string): TransactionOutput;
    kind(): TransactionOutputKind;
    static new(address: Address, amount: Value, datum_option?: DatumOption | null, script_reference?: Script | null): TransactionOutput;
    static new_alonzo_format_tx_out(alonzo_format_tx_out: AlonzoFormatTxOut): TransactionOutput;
    static new_conway_format_tx_out(conway_format_tx_out: ConwayFormatTxOut): TransactionOutput;
    script_ref(): Script | undefined;
    set_address(addr: Address): void;
    set_amount(amount: Value): void;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

export class TransactionOutputAmountBuilder {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    build(): SingleOutputBuilderResult;
    with_asset_and_min_required_coin(multiasset: MultiAsset, coins_per_utxo_byte: bigint): TransactionOutputAmountBuilder;
    with_value(amount: Value): TransactionOutputAmountBuilder;
}

/**
 * We introduce a builder-pattern format for creating transaction outputs
 * This is because:
 * 1. Some fields (i.e. data hash) are optional, and we can't easily expose Option<> in WASM
 * 2. Some fields like amounts have many ways it could be set (some depending on other field values being known)
 * 3. Easier to adapt as the output format gets more complicated in future Cardano releases
 */
export class TransactionOutputBuilder {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    static new(): TransactionOutputBuilder;
    next(): TransactionOutputAmountBuilder;
    with_address(address: Address): TransactionOutputBuilder;
    /**
     * A communication datum is one where the data hash is used in the tx output
     * Yet the full datum is included in the witness of the same transaction
     */
    with_communication_data(datum: PlutusData): TransactionOutputBuilder;
    with_data(datum: DatumOption): TransactionOutputBuilder;
    with_reference_script(script_ref: Script): TransactionOutputBuilder;
}

export enum TransactionOutputKind {
    AlonzoFormatTxOut = 0,
    ConwayFormatTxOut = 1,
}

export class TransactionOutputList {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    add(elem: TransactionOutput): void;
    get(index: number): TransactionOutput;
    len(): number;
    static new(): TransactionOutputList;
}

export class TransactionUnspentOutput {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): TransactionUnspentOutput;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): TransactionUnspentOutput;
    input(): TransactionInput;
    static new(input: TransactionInput, output: TransactionOutput): TransactionUnspentOutput;
    output(): TransactionOutput;
    /**
     *
     *             * Serialize this type to CBOR bytes.
     *             * This type does NOT support fine-tuned encoding options so this may or may not be
     *             * canonical CBOR and may or may not preserve round-trip encodings.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type does NOT support fine-tuned encoding options so this may or may not be
     *             * canonical CBOR and may or may not preserve round-trip encodings.
     *
     */
    to_cbor_hex(): string;
}

export class TransactionWitnessSet {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    add_all_witnesses(other: TransactionWitnessSet): void;
    bootstrap_witnesses(): BootstrapWitnessList | undefined;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): TransactionWitnessSet;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): TransactionWitnessSet;
    static from_json(json: string): TransactionWitnessSet;
    languages(): LanguageList;
    native_scripts(): NativeScriptList | undefined;
    static new(): TransactionWitnessSet;
    plutus_datums(): PlutusDataList | undefined;
    plutus_v1_scripts(): PlutusV1ScriptList | undefined;
    plutus_v2_scripts(): PlutusV2ScriptList | undefined;
    plutus_v3_scripts(): PlutusV3ScriptList | undefined;
    redeemers(): Redeemers | undefined;
    set_bootstrap_witnesses(bootstrap_witnesses: BootstrapWitnessList): void;
    set_native_scripts(native_scripts: NativeScriptList): void;
    set_plutus_datums(plutus_datums: PlutusDataList): void;
    set_plutus_v1_scripts(plutus_v1_scripts: PlutusV1ScriptList): void;
    set_plutus_v2_scripts(plutus_v2_scripts: PlutusV2ScriptList): void;
    set_plutus_v3_scripts(plutus_v3_scripts: PlutusV3ScriptList): void;
    set_redeemers(redeemers: Redeemers): void;
    set_vkeywitnesses(vkeywitnesses: VkeywitnessList): void;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
    vkeywitnesses(): VkeywitnessList | undefined;
}

/**
 * Builder de-duplicates witnesses as they are added
 */
export class TransactionWitnessSetBuilder {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    add_bootstrap(bootstrap: BootstrapWitness): void;
    add_existing(wit_set: TransactionWitnessSet): void;
    add_plutus_datum(plutus_datum: PlutusData): void;
    add_redeemer(redeemer: LegacyRedeemer): void;
    add_required_wits(required_wits: RequiredWitnessSet): void;
    add_script(script: Script): void;
    add_vkey(vkey_witness: Vkeywitness): void;
    build(): TransactionWitnessSet;
    get_native_script(): NativeScriptList;
    get_plutus_datum(): PlutusDataList;
    get_plutus_v1_script(): PlutusV1ScriptList;
    get_plutus_v2_script(): PlutusV2ScriptList;
    get_redeemer(): LegacyRedeemerList;
    merge_fake_witness(required_wits: RequiredWitnessSet): void;
    static new(): TransactionWitnessSetBuilder;
    remaining_wits(): RequiredWitnessSet;
    try_build(): TransactionWitnessSet;
}

export class TransactionWitnessSetList {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    add(elem: TransactionWitnessSet): void;
    get(index: number): TransactionWitnessSet;
    len(): number;
    static new(): TransactionWitnessSetList;
}

export class TreasuryWithdrawalsAction {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): TreasuryWithdrawalsAction;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): TreasuryWithdrawalsAction;
    static from_json(json: string): TreasuryWithdrawalsAction;
    static new(withdrawal: MapRewardAccountToCoin, policy_hash?: ScriptHash | null): TreasuryWithdrawalsAction;
    policy_hash(): ScriptHash | undefined;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
    withdrawal(): MapRewardAccountToCoin;
}

export class TxRedeemerBuilder {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    auxiliary_data(): AuxiliaryData | undefined;
    /**
     * Builds the transaction and moves to the next step where any real witness can be added
     * NOTE: is_valid set to true
     * Will NOT require you to have set required signers & witnesses
     */
    build(): Redeemers;
    /**
     * Transaction body with a dummy values for redeemers & script_data_hash
     * Used for calculating exunits or required signers
     */
    draft_body(): TransactionBody;
    /**
     * Transaction body with a dummy values for redeemers & script_data_hash and padded with dummy witnesses
     * Used for calculating exunits
     * note: is_valid set to true
     */
    draft_tx(): Transaction;
    /**
     * used to override the exunit values initially provided when adding inputs
     */
    set_exunits(redeemer: RedeemerWitnessKey, ex_units: ExUnits): void;
}

export class UnitInterval {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    end(): bigint;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): UnitInterval;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): UnitInterval;
    static from_json(json: string): UnitInterval;
    static new(start: bigint, end: bigint): UnitInterval;
    start(): bigint;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

export class UnregCert {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    deposit(): bigint;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): UnregCert;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): UnregCert;
    static from_json(json: string): UnregCert;
    static new(stake_credential: Credential, deposit: bigint): UnregCert;
    stake_credential(): Credential;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

export class UnregDrepCert {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    deposit(): bigint;
    drep_credential(): Credential;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): UnregDrepCert;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): UnregDrepCert;
    static from_json(json: string): UnregDrepCert;
    static new(drep_credential: Credential, deposit: bigint): UnregDrepCert;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

/**
 * Redeemer without the tag of index
 * This allows builder code to return partial redeemers
 * and then later have them placed in the right context
 */
export class UntaggedRedeemer {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    static new(data: PlutusData, ex_units: ExUnits): UntaggedRedeemer;
}

export class UpdateCommittee {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    action_id(): GovActionId | undefined;
    cold_credentials(): CommitteeColdCredentialList;
    credentials(): MapCommitteeColdCredentialToEpoch;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): UpdateCommittee;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): UpdateCommittee;
    static from_json(json: string): UpdateCommittee;
    static new(action_id: GovActionId | null | undefined, cold_credentials: CommitteeColdCredentialList, credentials: MapCommitteeColdCredentialToEpoch, unit_interval: UnitInterval): UpdateCommittee;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
    unit_interval(): UnitInterval;
}

export class UpdateDrepCert {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    anchor(): Anchor | undefined;
    drep_credential(): Credential;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): UpdateDrepCert;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): UpdateDrepCert;
    static from_json(json: string): UpdateDrepCert;
    static new(drep_credential: Credential, anchor?: Anchor | null): UpdateDrepCert;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

export class Url {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): Url;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): Url;
    static from_json(json: string): Url;
    get(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

export class VRFCert {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): VRFCert;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): VRFCert;
    static from_json(json: string): VRFCert;
    static new(output: Uint8Array, proof: Uint8Array): VRFCert;
    output(): Uint8Array;
    proof(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

export class VRFKeyHash {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    static from_bech32(bech32_str: string): VRFKeyHash;
    /**
     *
     *             * Parse from a hex string of the direct raw bytes, without any CBOR structure
     *
     */
    static from_hex(input: string): VRFKeyHash;
    /**
     *
     *             * Parse from the direct raw bytes, without any CBOR structure
     *
     */
    static from_raw_bytes(bytes: Uint8Array): VRFKeyHash;
    to_bech32(prefix: string): string;
    /**
     *
     *             * Direct raw bytes without any CBOR structure, as a hex-encoded string
     *
     */
    to_hex(): string;
    /**
     *
     *             * Direct raw bytes without any CBOR structure
     *
     */
    to_raw_bytes(): Uint8Array;
}

export class VRFVkey {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    static from_bech32(bech32_str: string): VRFVkey;
    /**
     *
     *             * Parse from a hex string of the direct raw bytes, without any CBOR structure
     *
     */
    static from_hex(input: string): VRFVkey;
    /**
     *
     *             * Parse from the direct raw bytes, without any CBOR structure
     *
     */
    static from_raw_bytes(bytes: Uint8Array): VRFVkey;
    to_bech32(prefix: string): string;
    /**
     *
     *             * Direct raw bytes without any CBOR structure, as a hex-encoded string
     *
     */
    to_hex(): string;
    /**
     *
     *             * Direct raw bytes without any CBOR structure
     *
     */
    to_raw_bytes(): Uint8Array;
}

export class Value {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    checked_add(rhs: Value): Value;
    /**
     * Subtract ADA and/or assets
     * Removes an asset from the list if the result is 0 or less
     * Does not modify this object, instead the result is returned
     * None is returned if there would be integer underflow
     */
    checked_sub(rhs: Value): Value;
    clamped_sub(rhs: Value): Value;
    coin(): bigint;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): Value;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): Value;
    static from_coin(coin: bigint): Value;
    static from_json(json: string): Value;
    has_multiassets(): boolean;
    is_zero(): boolean;
    multi_asset(): MultiAsset;
    static new(coin: bigint, multiasset: MultiAsset): Value;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
    static zero(): Value;
}

export class Vkeywitness {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    ed25519_signature(): Ed25519Signature;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): Vkeywitness;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): Vkeywitness;
    static from_json(json: string): Vkeywitness;
    static new(vkey: PublicKey, ed25519_signature: Ed25519Signature): Vkeywitness;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
    vkey(): PublicKey;
}

export class VkeywitnessList {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    add(elem: Vkeywitness): void;
    get(index: number): Vkeywitness;
    len(): number;
    static new(): VkeywitnessList;
}

export enum Vote {
    No = 0,
    Yes = 1,
    Abstain = 2,
}

export class VoteBuilder {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    build(): VoteBuilderResult;
    static new(): VoteBuilder;
    with_native_script_vote(voter: Voter, gov_action_id: GovActionId, procedure: VotingProcedure, native_script: NativeScript, witness_info: NativeScriptWitnessInfo): VoteBuilder;
    with_plutus_vote(voter: Voter, gov_action_id: GovActionId, procedure: VotingProcedure, partial_witness: PartialPlutusWitness, required_signers: Ed25519KeyHashList, datum: PlutusData): VoteBuilder;
    with_plutus_vote_inline_datum(voter: Voter, gov_action_id: GovActionId, procedure: VotingProcedure, partial_witness: PartialPlutusWitness, required_signers: Ed25519KeyHashList): VoteBuilder;
    with_vote(voter: Voter, gov_action_id: GovActionId, procedure: VotingProcedure): VoteBuilder;
}

export class VoteBuilderResult {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
}

export class VoteDelegCert {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    d_rep(): DRep;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): VoteDelegCert;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): VoteDelegCert;
    static from_json(json: string): VoteDelegCert;
    static new(stake_credential: Credential, d_rep: DRep): VoteDelegCert;
    stake_credential(): Credential;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

export class VoteRegDelegCert {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    d_rep(): DRep;
    deposit(): bigint;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): VoteRegDelegCert;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): VoteRegDelegCert;
    static from_json(json: string): VoteRegDelegCert;
    static new(stake_credential: Credential, d_rep: DRep, deposit: bigint): VoteRegDelegCert;
    stake_credential(): Credential;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

export class Voter {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    as_constitutional_committee_hot_key_hash(): Ed25519KeyHash | undefined;
    as_constitutional_committee_hot_script_hash(): ScriptHash | undefined;
    as_d_rep_key_hash(): Ed25519KeyHash | undefined;
    as_d_rep_script_hash(): ScriptHash | undefined;
    as_staking_pool_key_hash(): Ed25519KeyHash | undefined;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): Voter;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): Voter;
    static from_json(json: string): Voter;
    key_hash(): Ed25519KeyHash | undefined;
    kind(): VoterKind;
    static new_constitutional_committee_hot_key_hash(ed25519_key_hash: Ed25519KeyHash): Voter;
    static new_constitutional_committee_hot_script_hash(script_hash: ScriptHash): Voter;
    static new_d_rep_key_hash(ed25519_key_hash: Ed25519KeyHash): Voter;
    static new_d_rep_script_hash(script_hash: ScriptHash): Voter;
    static new_staking_pool_key_hash(ed25519_key_hash: Ed25519KeyHash): Voter;
    script_hash(): ScriptHash | undefined;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
}

export enum VoterKind {
    ConstitutionalCommitteeHotKeyHash = 0,
    ConstitutionalCommitteeHotScriptHash = 1,
    DRepKeyHash = 2,
    DRepScriptHash = 3,
    StakingPoolKeyHash = 4,
}

export class VoterList {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    add(elem: Voter): void;
    get(index: number): Voter;
    len(): number;
    static new(): VoterList;
}

export class VotingProcedure {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    anchor(): Anchor | undefined;
    /**
     *
     *             * Create this type from CBOR bytes
     *
     */
    static from_cbor_bytes(cbor_bytes: Uint8Array): VotingProcedure;
    /**
     *
     *             * Create this type from the CBOR bytes encoded as a hex string.
     *             * This is useful for interfacing with CIP30
     *
     */
    static from_cbor_hex(cbor_bytes: string): VotingProcedure;
    static from_json(json: string): VotingProcedure;
    static new(vote: Vote, anchor?: Anchor | null): VotingProcedure;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings
     *
     */
    to_canonical_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes using canonical CBOR encodings as hex bytes
     *
     */
    to_canonical_cbor_hex(): string;
    /**
     *
     *             * Serialize this type to CBOR bytes
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_bytes(): Uint8Array;
    /**
     *
     *             * Serialize this type to CBOR bytes encoded as a hex string (useful for working with CIP30).
     *             * This type type supports encoding preservation so this will preserve round-trip CBOR formats.
     *             * If created from scratch the CBOR will be canonical.
     *
     */
    to_cbor_hex(): string;
    to_js_value(): any;
    to_json(): string;
    vote(): Vote;
}

export class VotingProcedures {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    get(key: Voter): MapGovActionIdToVotingProcedure | undefined;
    insert(key: Voter, value: MapGovActionIdToVotingProcedure): MapGovActionIdToVotingProcedure | undefined;
    keys(): VoterList;
    len(): number;
    static new(): VotingProcedures;
}

export class WithdrawalBuilderResult {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
}

/**
 * Calculates the hash for script data (with plutus scripts) if it is necessary.
 * Returns None if it was not necessary (no datums/redeemers) to include.
 *
 * Most users will not directly need this as when using the builders
 * it will be invoked for you.
 *
 * Note: This WASM binding does not work with non-standard witness set
 * encodings. If you created the witness set manually this is not an issue
 * but for constructing it from deserializing a transaction/witness then
 * please use calc_script_data_hash_from_witness()
 */
export function calc_script_data_hash(redeemers: Redeemers, datums: PlutusDataList, cost_models: CostModels, used_langs: LanguageList): ScriptDataHash | undefined;

/**
 * Calculates the hash for script data from a witness if it is necessary.
 * Returns None if it was not necessary (no datums/redeemers) to include.
 *
 * Most users will not directly need this as when using the builders
 * it will be invoked for you.
 */
export function calc_script_data_hash_from_witness(witnesses: TransactionWitnessSet, cost_models: CostModels): ScriptDataHash | undefined;

export function compute_total_ex_units(redeemers: Redeemers): ExUnits;

/**
 * decodes from chunks of bytes in a list to a byte vector if that is the metadata format, otherwise returns None
 */
export function decode_arbitrary_bytes_from_metadatum(metadata: TransactionMetadatum): Uint8Array | undefined;

/**
 * Converts Metadata to JSON according to MetadataJsonSchema
 */
export function decode_metadatum_to_json_str(metadatum: TransactionMetadatum, schema: MetadataJsonSchema): string;

export function decode_plutus_datum_to_json_str(datum: PlutusData, schema: CardanoNodePlutusDatumSchema): string;

/**
 * Decrypt using Emip3: https://github.com/Emurgo/EmIPs/blob/master/specs/emip-003.md
 */
export function emip3_decrypt_with_password(password: string, data: string): string;

/**
 * Encrypt using Emip3: https://github.com/Emurgo/EmIPs/blob/master/specs/emip-003.md
 */
export function emip3_encrypt_with_password(password: string, salt: string, nonce: string, data: string): string;

/**
 * encodes arbitrary bytes into chunks of 64 bytes (the limit for bytes) as a list to be valid Metadata
 */
export function encode_arbitrary_bytes_as_metadatum(bytes: Uint8Array): TransactionMetadatum;

/**
 * Converts JSON to Metadata according to MetadataJsonSchema
 */
export function encode_json_str_to_metadatum(json: string, schema: MetadataJsonSchema): TransactionMetadatum;

export function encode_json_str_to_plutus_datum(json: string, schema: CardanoNodePlutusDatumSchema): PlutusData;

export function genesis_txid_byron(pubkey: PublicKey, protocol_magic?: number | null): ByronGenesisRedeem;

export function genesis_txid_shelley(address: Address): TransactionHash;

export function get_deposit(txbody: TransactionBody, pool_deposit: bigint, key_deposit: bigint): bigint;

export function get_implicit_input(txbody: TransactionBody, pool_deposit: bigint, key_deposit: bigint): Value;

export function hash_auxiliary_data(auxiliary_data: AuxiliaryData): AuxiliaryDataHash;

export function hash_plutus_data(plutus_data: PlutusData): DatumHash;

/**
 * Calculates the hash for script data (no plutus scripts) if it is necessary.
 * Returns None if it was not necessary (no datums/redeemers) to include.
 *
 * Most users will not directly need this as when using the builders
 * it will be invoked for you.
 *
 * Note: This WASM binding does not work with non-standard witness set
 * encodings. If you created the witness set manually this is not an issue
 * but for constructing it from deserializing a transaction/witness then
 * please use calc_script_data_hash_from_witness()
 */
export function hash_script_data(redeemers: Redeemers, cost_models: CostModels, datums?: PlutusDataList | null): ScriptDataHash;

export function hash_transaction(tx_body: TransactionBody): TransactionHash;

export function make_daedalus_bootstrap_witness(tx_body_hash: TransactionHash, addr: ByronAddress, key: LegacyDaedalusPrivateKey): BootstrapWitness;

export function make_icarus_bootstrap_witness(tx_body_hash: TransactionHash, addr: ByronAddress, key: Bip32PrivateKey): BootstrapWitness;

export function make_vkey_witness(tx_body_hash: TransactionHash, sk: PrivateKey): Vkeywitness;

export function min_ada_required(output: TransactionOutput, coins_per_utxo_byte: bigint): bigint;

/**
 *
 * * Calculates the cost of all ref scripts
 * * * `total_ref_script_size` - Total size (original, not hashes) of all ref scripts. Duplicate scripts are counted as many times as they occur
 *
 */
export function min_fee(tx: Transaction, linear_fee: LinearFee, ex_unit_prices: ExUnitPrices, total_ref_script_size: bigint): bigint;

export function min_no_script_fee(tx: Transaction, linear_fee: LinearFee): bigint;

/**
 *
 * * Min fee for JUST the script, NOT including ref inputs
 *
 */
export function min_script_fee(tx: Transaction, ex_unit_prices: ExUnitPrices): bigint;
