import { getAddressDetails } from "@evolution-sdk/utils";
import { fromHex } from "@evolution-sdk/core-utils";
import {
  Address,
  KeyHash,
  Network,
  PrivateKey,
  RewardAddress,
  UTxO,
} from "@evolution-sdk/core-types";
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

  const accountKey = rootKey
    .derive(harden(1852))
    .derive(harden(1815))
    .derive(harden(accountIndex));

  rootKey.free();

  const paymentKey = accountKey.derive(0).derive(0).to_raw_key();
  const stakeKey = accountKey.derive(2).derive(0).to_raw_key();

  const paymentKeyHash = paymentKey.to_public().hash();
  const stakeKeyHash = stakeKey.to_public().hash();

  const networkId = network === "Mainnet" ? 1 : 0;

  const address =
    addressType === "Base"
      ? CML.BaseAddress.new(
          networkId,
          CML.Credential.new_pub_key(paymentKeyHash),
          CML.Credential.new_pub_key(stakeKeyHash),
        )
          .to_address()
          .to_bech32(undefined)
      : CML.EnterpriseAddress.new(
          networkId,
          CML.Credential.new_pub_key(paymentKeyHash),
        )
          .to_address()
          .to_bech32(undefined);

  const rewardAddress =
    addressType === "Base"
      ? CML.RewardAddress.new(
          networkId,
          CML.Credential.new_pub_key(stakeKeyHash),
        )
          .to_address()
          .to_bech32(undefined)
      : null;

  return {
    address,
    rewardAddress,
    paymentKey: paymentKey.to_bech32(),
    stakeKey: addressType === "Base" ? stakeKey.to_bech32() : null,
  };
}

export function discoverOwnUsedTxKeyHashes(
  tx: CML.Transaction,
  ownKeyHashes: Array<KeyHash>,
  ownUtxos: Array<UTxO>,
): Array<KeyHash> {
  const usedKeyHashes = [];

  // key hashes from inputs
  const inputs = tx.body().inputs();
  for (let i = 0; i < inputs.len(); i++) {
    const input = inputs.get(i);
    const txHash = input.transaction_id().to_hex();
    const outputIndex = Number(input.index());
    const utxo = ownUtxos.find(
      (utxo) => utxo.txHash === txHash && utxo.outputIndex === outputIndex,
    );
    if (utxo) {
      const { paymentCredential } = getAddressDetails(utxo.address);
      usedKeyHashes.push(paymentCredential?.hash!);
    }
  }

  const txBody = tx.body();

  // key hashes from certificates
  function keyHashFromCert(txBody: CML.TransactionBody) {
    const certs = txBody.certs();
    if (!certs) return;
    for (let i = 0; i < certs.len(); i++) {
      const cert = certs.get(i);
      switch (cert.kind()) {
        case 0:
          // Key hash not needed for registration
          break;

        case 1: {
          const credential = cert.as_stake_deregistration()?.stake_credential();
          switch (credential?.kind()) {
            case 0:
              usedKeyHashes.push(credential.as_pub_key()?.to_hex());
              break;
            case 1:
              usedKeyHashes.push(credential.as_script()?.to_hex());
              break;
          }
          break;
        }
        case 2: {
          //TODO: Missing test
          const credential = cert.as_stake_delegation()?.stake_credential();
          if (credential?.kind() === 0) {
            const keyHash = credential.as_pub_key()?.to_hex();
            usedKeyHashes.push(keyHash);
          }

          break;
        }
        case 3: {
          //TODO: Missing test
          const poolParams = cert.as_pool_registration()?.pool_params()!;
          const owners = poolParams?.pool_owners();
          if (!owners) break;
          for (let i = 0; i < owners.len(); i++) {
            const keyHash = owners.get(i).to_hex();
            usedKeyHashes.push(keyHash);
          }
          const operator = poolParams.operator().to_hex();
          usedKeyHashes.push(operator);

          break;
        }

        case 4: {
          //TODO: Missing test
          const operator = cert.as_pool_retirement()?.pool().to_hex();
          usedKeyHashes.push(operator);

          break;
        }

        case 6: {
          //TODO: Missing test
          const credential = cert.as_unreg_cert()?.stake_credential();
          if (credential) {
            usedKeyHashes.push(credential.as_pub_key()?.to_hex());
          }
          break;
        }

        case 7: {
          //TODO: Missing test
          const credential = cert.as_vote_deleg_cert()?.stake_credential();
          if (credential) {
            usedKeyHashes.push(credential.as_pub_key()?.to_hex());
          }
          break;
        }

        case 8: {
          //TODO: Missing test
          const credential = cert
            .as_stake_vote_deleg_cert()
            ?.stake_credential();
          if (credential) {
            usedKeyHashes.push(credential.as_pub_key()?.to_hex());
          }
          break;
        }

        case 9: {
          //TODO: Missing test
          const credential = cert.as_stake_reg_deleg_cert()?.stake_credential();
          if (credential) {
            usedKeyHashes.push(credential.as_pub_key()?.to_hex());
          }
          break;
        }

        case 10: {
          //TODO: Missing test
          const credential = cert.as_vote_reg_deleg_cert()?.stake_credential();
          if (credential) {
            usedKeyHashes.push(credential.as_pub_key()?.to_hex());
          }
          break;
        }

        case 11: {
          //TODO: Missing test
          const credential = cert
            .as_stake_vote_reg_deleg_cert()
            ?.stake_credential();
          if (credential) {
            usedKeyHashes.push(credential.as_pub_key()?.to_hex());
          }
          break;
        }

        case 12: {
          //TODO: Missing test
          const credential = cert
            .as_auth_committee_hot_cert()
            ?.committee_cold_credential();
          if (credential) {
            usedKeyHashes.push(credential.as_pub_key()?.to_hex());
          }
          break;
        }

        case 13: {
          //TODO: Missing test
          const credential = cert
            .as_resign_committee_cold_cert()
            ?.committee_cold_credential();
          if (credential) {
            usedKeyHashes.push(credential.as_pub_key()?.to_hex());
          }
          break;
        }

        case 14: {
          //TODO: Missing test
          const credential = cert.as_reg_drep_cert()?.drep_credential();
          if (credential) {
            usedKeyHashes.push(credential.as_pub_key()?.to_hex());
          }
          break;
        }

        case 15: {
          //TODO: Missing test
          const credential = cert.as_unreg_drep_cert()?.drep_credential();
          if (credential) {
            usedKeyHashes.push(credential.as_pub_key()?.to_hex());
          }
          break;
        }

        case 16: {
          //TODO: Missing test
          const credential = cert.as_update_drep_cert()?.drep_credential();
          if (credential) {
            usedKeyHashes.push(credential.as_pub_key()?.to_hex());
          }
          break;
        }

        default:
          //TODO: Missing certificates
          break;
      }
    }
  }
  if (txBody.certs()) keyHashFromCert(txBody);

  // key hashes from withdrawals

  const withdrawals = txBody.withdrawals();
  function keyHashFromWithdrawal(withdrawals: CML.MapRewardAccountToCoin) {
    const rewardAddresses = withdrawals.keys();
    for (let i = 0; i < rewardAddresses.len(); i++) {
      const credential = rewardAddresses.get(i).payment();
      switch (credential.kind()) {
        case 0:
          usedKeyHashes.push(credential.as_pub_key()?.to_hex());
          break;
        case 1:
          usedKeyHashes.push(credential.as_script()?.to_hex());
          break;
      }
    }
  }
  if (withdrawals) keyHashFromWithdrawal(withdrawals);

  // key hashes from scripts
  const scripts = tx.witness_set().native_scripts();
  function keyHashFromScript(scripts: CML.NativeScriptList) {
    for (let i = 0; i < scripts.len(); i++) {
      const script = scripts.get(i);
      if (script.kind() === 0) {
        const keyHash = script.as_script_pubkey()?.ed25519_key_hash().to_hex();
        usedKeyHashes.push(keyHash);
      }
      if (script.kind() === 1) {
        keyHashFromScript(script.as_script_all()!.native_scripts());
        return;
      }
      if (script.kind() === 2) {
        keyHashFromScript(script.as_script_any()!.native_scripts());
        return;
      }
      if (script.kind() === 3) {
        keyHashFromScript(script.as_script_n_of_k()!.native_scripts());
        return;
      }
    }
  }
  if (scripts) keyHashFromScript(scripts);

  // keyHashes from required signers
  const requiredSigners = txBody.required_signers();
  if (requiredSigners) {
    for (let i = 0; i < requiredSigners.len(); i++) {
      usedKeyHashes.push(requiredSigners.get(i).to_hex());
    }
  }

  // keyHashes from collateral
  const collateral = txBody.collateral_inputs();
  if (collateral) {
    for (let i = 0; i < collateral.len(); i++) {
      const input = collateral.get(i);
      const txHash = input.transaction_id().to_hex();
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
}
