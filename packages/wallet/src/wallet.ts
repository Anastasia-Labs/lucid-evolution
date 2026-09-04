import { getAddressDetails } from "@lucid-evolution/utils";
import { fromHex, withCMLScope } from "@lucid-evolution/core-utils";
import {
  Address,
  KeyHash,
  Network,
  PrivateKey,
  RewardAddress,
  UTxO,
} from "@lucid-evolution/core-types";
import { CML } from "./core.js";
import { mnemonicToEntropy } from "bip39";

export type FromSeed = {
  address: Address;
  rewardAddress: RewardAddress | null;
  paymentKey: PrivateKey;
  stakeKey: PrivateKey | null;
};

export function walletFromSeed(
  seed: string,
  options: {
    password?: string;
    addressType?: "Base" | "Enterprise";
    accountIndex?: number;
    network?: Network;
  } = {},
): FromSeed {
  //Set default options
  const {
    addressType = "Base",
    accountIndex = 0,
    network = "Mainnet",
  } = options;

  function harden(num: number): number {
    if (typeof num !== "number") throw new Error("Type number required here!");
    return 0x80000000 + num;
  }

  const entropy = mnemonicToEntropy(seed);
  const rootKey = CML.Bip32PrivateKey.from_bip39_entropy(
    fromHex(entropy),
    options?.password
      ? new TextEncoder().encode(options.password)
      : new Uint8Array(),
  );

  return withCMLScope((own) => {
    own(rootKey);
    const accountKey = own(
      own(own(rootKey.derive(harden(1852))).derive(harden(1815))).derive(
        harden(accountIndex),
      ),
    );
    const paymentKey = own(
      own(own(accountKey.derive(0)).derive(0)).to_raw_key(),
    );
    const stakeKey = own(own(own(accountKey.derive(2)).derive(0)).to_raw_key());

    const paymentKeyHash = own(own(paymentKey.to_public()).hash());
    const stakeKeyHash = own(own(stakeKey.to_public()).hash());

    const networkId = network === "Mainnet" ? 1 : 0;

    const address =
      addressType === "Base"
        ? own(
            own(
              CML.BaseAddress.new(
                networkId,
                own(CML.Credential.new_pub_key(paymentKeyHash)),
                own(CML.Credential.new_pub_key(stakeKeyHash)),
              ),
            ).to_address(),
          ).to_bech32(undefined)
        : own(
            own(
              CML.EnterpriseAddress.new(
                networkId,
                own(CML.Credential.new_pub_key(paymentKeyHash)),
              ),
            ).to_address(),
          ).to_bech32(undefined);

    const rewardAddress =
      addressType === "Base"
        ? own(
            own(
              CML.RewardAddress.new(
                networkId,
                own(CML.Credential.new_pub_key(stakeKeyHash)),
              ),
            ).to_address(),
          ).to_bech32(undefined)
        : null;

    return {
      address,
      rewardAddress,
      paymentKey: paymentKey.to_bech32(),
      stakeKey: addressType === "Base" ? stakeKey.to_bech32() : null,
    };
  });
}

export function discoverOwnUsedTxKeyHashes(
  tx: CML.Transaction,
  ownKeyHashes: Array<KeyHash>,
  ownUtxos: Array<UTxO>,
): Array<KeyHash> {
  return withCMLScope((own) => {
    const usedKeyHashes = [];

    // key hashes from inputs
    const txBody = own(tx.body());
    const inputs = own(txBody.inputs());
    for (let i = 0; i < inputs.len(); i++) {
      const input = own(inputs.get(i));
      const txHash = own(input.transaction_id()).to_hex();
      const outputIndex = Number(input.index());
      const utxo = ownUtxos.find(
        (utxo) => utxo.txHash === txHash && utxo.outputIndex === outputIndex,
      );
      if (utxo) {
        const { paymentCredential } = getAddressDetails(utxo.address);
        usedKeyHashes.push(paymentCredential?.hash!);
      }
    }

    // key hashes from certificates
    function keyHashFromCert(txBody: CML.TransactionBody) {
      const certs = own(txBody.certs());
      if (!certs) return;
      for (let i = 0; i < certs.len(); i++) {
        const cert = own(certs.get(i));
        switch (cert.kind()) {
          case 0:
            // Key hash not needed for registration
            break;

          case 1: {
            const credential = own(
              own(cert.as_stake_deregistration())?.stake_credential(),
            );
            switch (credential?.kind()) {
              case 0:
                usedKeyHashes.push(own(credential.as_pub_key())?.to_hex());
                break;
              case 1:
                usedKeyHashes.push(own(credential.as_script())?.to_hex());
                break;
            }
            break;
          }
          case 2: {
            //TODO: Missing test
            const credential = own(
              own(cert.as_stake_delegation())?.stake_credential(),
            );
            if (credential?.kind() === 0) {
              const keyHash = own(credential.as_pub_key())?.to_hex();
              usedKeyHashes.push(keyHash);
            }

            break;
          }
          case 3: {
            //TODO: Missing test
            const poolParams = own(
              own(cert.as_pool_registration())?.pool_params(),
            )!;
            const owners = own(poolParams?.pool_owners());
            if (!owners) break;
            for (let i = 0; i < owners.len(); i++) {
              const keyHash = own(owners.get(i)).to_hex();
              usedKeyHashes.push(keyHash);
            }
            const operator = own(poolParams.operator()).to_hex();
            usedKeyHashes.push(operator);

            break;
          }

          case 4: {
            //TODO: Missing test
            const operator = own(
              own(cert.as_pool_retirement())?.pool(),
            )?.to_hex();
            usedKeyHashes.push(operator);

            break;
          }

          case 6: {
            //TODO: Missing test
            const credential = own(
              own(cert.as_unreg_cert())?.stake_credential(),
            );
            if (credential) {
              usedKeyHashes.push(own(credential.as_pub_key())?.to_hex());
            }
            break;
          }

          case 7: {
            //TODO: Missing test
            const credential = own(
              own(cert.as_vote_deleg_cert())?.stake_credential(),
            );
            if (credential) {
              usedKeyHashes.push(own(credential.as_pub_key())?.to_hex());
            }
            break;
          }

          case 8: {
            //TODO: Missing test
            const credential = own(
              own(cert.as_stake_vote_deleg_cert())?.stake_credential(),
            );
            if (credential) {
              usedKeyHashes.push(own(credential.as_pub_key())?.to_hex());
            }
            break;
          }

          case 9: {
            //TODO: Missing test
            const credential = own(
              own(cert.as_stake_reg_deleg_cert())?.stake_credential(),
            );
            if (credential) {
              usedKeyHashes.push(own(credential.as_pub_key())?.to_hex());
            }
            break;
          }

          case 10: {
            //TODO: Missing test
            const credential = own(
              own(cert.as_vote_reg_deleg_cert())?.stake_credential(),
            );
            if (credential) {
              usedKeyHashes.push(own(credential.as_pub_key())?.to_hex());
            }
            break;
          }

          case 11: {
            //TODO: Missing test
            const credential = own(
              own(cert.as_stake_vote_reg_deleg_cert())?.stake_credential(),
            );
            if (credential) {
              usedKeyHashes.push(own(credential.as_pub_key())?.to_hex());
            }
            break;
          }

          case 12: {
            //TODO: Missing test
            const credential = own(
              own(
                cert.as_auth_committee_hot_cert(),
              )?.committee_cold_credential(),
            );
            if (credential) {
              usedKeyHashes.push(own(credential.as_pub_key())?.to_hex());
            }
            break;
          }

          case 13: {
            //TODO: Missing test
            const credential = own(
              own(
                cert.as_resign_committee_cold_cert(),
              )?.committee_cold_credential(),
            );
            if (credential) {
              usedKeyHashes.push(own(credential.as_pub_key())?.to_hex());
            }
            break;
          }

          case 14: {
            //TODO: Missing test
            const credential = own(
              own(cert.as_reg_drep_cert())?.drep_credential(),
            );
            if (credential) {
              usedKeyHashes.push(own(credential.as_pub_key())?.to_hex());
            }
            break;
          }

          case 15: {
            //TODO: Missing test
            const credential = own(
              own(cert.as_unreg_drep_cert())?.drep_credential(),
            );
            if (credential) {
              usedKeyHashes.push(own(credential.as_pub_key())?.to_hex());
            }
            break;
          }

          case 16: {
            //TODO: Missing test
            const credential = own(
              own(cert.as_update_drep_cert())?.drep_credential(),
            );
            if (credential) {
              usedKeyHashes.push(own(credential.as_pub_key())?.to_hex());
            }
            break;
          }

          default:
            //TODO: Missing certificates
            break;
        }
      }
    }
    keyHashFromCert(txBody);

    // key hashes from withdrawals

    const withdrawals = own(txBody.withdrawals());
    function keyHashFromWithdrawal(withdrawals: CML.MapRewardAccountToCoin) {
      const rewardAddresses = own(withdrawals.keys());
      for (let i = 0; i < rewardAddresses.len(); i++) {
        const credential = own(own(rewardAddresses.get(i)).payment());
        switch (credential.kind()) {
          case 0:
            usedKeyHashes.push(own(credential.as_pub_key())?.to_hex());
            break;
          case 1:
            usedKeyHashes.push(own(credential.as_script())?.to_hex());
            break;
        }
      }
    }
    if (withdrawals) keyHashFromWithdrawal(withdrawals);

    // key hashes from scripts
    const scripts = own(own(tx.witness_set()).native_scripts());
    function keyHashFromScript(scripts: CML.NativeScriptList) {
      for (let i = 0; i < scripts.len(); i++) {
        const script = own(scripts.get(i));
        if (script.kind() === 0) {
          const keyHash = own(
            own(script.as_script_pubkey())?.ed25519_key_hash(),
          )?.to_hex();
          usedKeyHashes.push(keyHash);
        }
        if (script.kind() === 1) {
          keyHashFromScript(own(own(script.as_script_all())!.native_scripts()));
          return;
        }
        if (script.kind() === 2) {
          keyHashFromScript(own(own(script.as_script_any())!.native_scripts()));
          return;
        }
        if (script.kind() === 3) {
          keyHashFromScript(
            own(own(script.as_script_n_of_k())!.native_scripts()),
          );
          return;
        }
      }
    }
    if (scripts) keyHashFromScript(scripts);

    // keyHashes from required signers
    const requiredSigners = own(txBody.required_signers());
    if (requiredSigners) {
      for (let i = 0; i < requiredSigners.len(); i++) {
        usedKeyHashes.push(own(requiredSigners.get(i)).to_hex());
      }
    }

    // keyHashes from collateral
    const collateral = own(txBody.collateral_inputs());
    if (collateral) {
      for (let i = 0; i < collateral.len(); i++) {
        const input = own(collateral.get(i));
        const txHash = own(input.transaction_id()).to_hex();
        const outputIndex = Number(input.index());
        const utxo = ownUtxos.find(
          (utxo) => utxo.txHash === txHash && utxo.outputIndex === outputIndex,
        );
        if (utxo) {
          const { paymentCredential } = getAddressDetails(utxo.address);
          usedKeyHashes.push(paymentCredential?.hash!);
        }
      }
    }

    return usedKeyHashes.filter((k) => ownKeyHashes.includes(k));
  });
}
