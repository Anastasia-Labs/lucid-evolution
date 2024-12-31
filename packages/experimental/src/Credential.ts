export function toRewardAddress(
  network: Network,
  stakeCredential: Credential,
): RewardAddress {
  return CML.RewardAddress.new(
    networkToId(network),
    stakeCredential.type === "Key"
      ? CML.Credential.new_pub_key(
          CML.Ed25519KeyHash.from_hex(stakeCredential.hash),
        )
      : CML.Credential.new_script(
          CML.ScriptHash.from_hex(stakeCredential.hash),
        ),
  )
    .to_address()
    .to_bech32(undefined);
}
