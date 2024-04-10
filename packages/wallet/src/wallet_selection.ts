import {
  Address,
  Delegation,
  KeyHash,
  Network,
  Payload,
  PrivateKey,
  Provider,
  RewardAddress,
  SignedMessage,
  Transaction,
  TxHash,
  UTxO,
  Wallet,
  WalletApi,
} from "@lucid-evolution/core-types";
import { fromHex, toHex } from "@lucid-evolution/core-utils";
import {
  coreToUtxo,
  getAddressDetails,
  paymentCredentialOf,
  utxoToCore,
} from "@lucid-evolution/utils";
import * as CML from "@dcspark/cardano-multiplatform-lib-nodejs";
import { signData } from "@lucid-evolution/sign_data";
import { discoverOwnUsedTxKeyHashes, walletFromSeed } from "./wallet.js";

export const makeWalletFromSeed = (
  provider: Provider,
  network: Network,
  seed: string,
  options?: {
    addressType?: "Base" | "Enterprise";
    accountIndex?: number;
    password?: string;
  },
): Wallet => {
  const { address, rewardAddress, paymentKey, stakeKey } = walletFromSeed(
    seed,
    {
      addressType: options?.addressType || "Base",
      accountIndex: options?.accountIndex || 0,
      password: options?.password,
      network: network,
    },
  );
  const paymentKeyHash = CML.PrivateKey.from_bech32(paymentKey)
    .to_public()
    .hash()
    .to_hex();
  const stakeKeyHash = stakeKey
    ? CML.PrivateKey.from_bech32(stakeKey).to_public().hash().to_hex()
    : "";

  const privKeyHashMap = {
    [paymentKeyHash]: paymentKey,
    [stakeKeyHash]: stakeKey,
  };
  return {
    address: async (): Promise<Address> => address,
    rewardAddress: async (): Promise<RewardAddress | null> =>
      rewardAddress || null,
    getUtxos: async (): Promise<UTxO[]> =>
      provider.getUtxos(paymentCredentialOf(address)),
    getUtxosCore: async (): Promise<Array<CML.TransactionUnspentOutput>> => {
      const utxos = await provider.getUtxos(paymentCredentialOf(address));
      const coreUtxos: Array<CML.TransactionUnspentOutput> = [];
      utxos.forEach((utxo: UTxO) => coreUtxos.push(utxoToCore(utxo)));
      return coreUtxos;
    },
    getDelegation: async (): Promise<Delegation> => {
      return rewardAddress
        ? await provider.getDelegation(rewardAddress)
        : { poolId: null, rewards: 0n };
    },
    signTx: async (tx: CML.Transaction): Promise<CML.TransactionWitnessSet> => {
      const utxos = await provider.getUtxos(address);

      const ownKeyHashes: Array<KeyHash> = [paymentKeyHash, stakeKeyHash];

      const usedKeyHashes = discoverOwnUsedTxKeyHashes(tx, ownKeyHashes, utxos);

      const txWitnessSetBuilder = CML.TransactionWitnessSetBuilder.new();
      usedKeyHashes.forEach((keyHash) => {
        const priv = CML.PrivateKey.from_bech32(privKeyHashMap[keyHash]!);
        //FIX: CML outputs a different txHash, returning the below error when using a time lock policy
        // Error: "transaction submit error ShelleyTxValidationError ShelleyBasedEraBabbage (ApplyTxError [UtxowFailure (FromAlonzoUtxowFail (WrappedShelleyEraFailure (InvalidWitnessesUTXOW [VKey (VerKeyEd25519DSIGN \"4f26d9d8185481167e5647039d4f390c8c74a5fbca1f115709a2998e93180f39\")])))])"
        // const txhashCML = CML.hash_transaction(CML.TransactionBody.from_cbor_hex(("a500838258200d31e3060edc0422bab792b414b6920534fb61f72a24cb76c911fea670601518008258205a4a961c2ff22b870f06f5303dcfffaaf3afdb819b12f5f0e60f0540e0e7490700825820f9178e7551be72eb512f8b1b739346c84e9cda4ef8be4feada9bfff6fe47e80000018182583900bc83d1474fafc0669e360c6ef389d3874f5eff99c31f343ff2cdab0bcb68eb5507f1a2a0cb4ddb095125f0f9878568cfe2466f2969db1ed3821a02050c95a9581c748a7026de606c27c06e4b90cb2e1844b566b89fba0d282debe4b40aa14d4d794d696e746564546f6b656e01581ca11c0e63717ac9d8d7bd50c6b29111003e765d199915a02613069641a14d4d794d696e746564546f6b656e181e581ca49d85bfbd193446051e644e7ad448682a1bc1b02d5a15f78429a1f0a14d4d794d696e746564546f6b656e0a581cc7e5e285a6ca1fdd6b8b0293b4d825a9c92ae69f8fc35ae2252a697da14d4d794d696e746564546f6b656e0a581cfed7a8ee8af612b08a05304ba434ef18f37be06f144fbc190d377942a14d4d794d696e746564546f6b656e0a581c92db8682a9e00473968130a7d3ee6d1bd331812543a8584ba739c74ca14d4d794d696e746564546f6b656e01581cd3c9b677c3e599ac2eb0a455e4d5d027d5ef860caf72b5dc27ba0e16a14d4d794d696e746564546f6b656e01581ce2085cebe2ce09d4ec0cbfe965f332941686c9288199440d45e95ff0a14d4d794d696e746564546f6b656e01581c2fce0a65bac1267022f94296e3d55fb862979b13bed38521a31cd200a14d4d794d696e746564546f6b656e01021a0002fb89031a0333a0f509a1581c2fce0a65bac1267022f94296e3d55fb862979b13bed38521a31cd200a14d4d794d696e746564546f6b656e01")))
        // console.log("txhash CML", txhashCML.to_hex())
        // const txhash = CSL.hash_transaction(CSL.TransactionBody.from_bytes(fromHex("a500838258200d31e3060edc0422bab792b414b6920534fb61f72a24cb76c911fea670601518008258205a4a961c2ff22b870f06f5303dcfffaaf3afdb819b12f5f0e60f0540e0e7490700825820f9178e7551be72eb512f8b1b739346c84e9cda4ef8be4feada9bfff6fe47e80000018182583900bc83d1474fafc0669e360c6ef389d3874f5eff99c31f343ff2cdab0bcb68eb5507f1a2a0cb4ddb095125f0f9878568cfe2466f2969db1ed3821a02050c95a9581c748a7026de606c27c06e4b90cb2e1844b566b89fba0d282debe4b40aa14d4d794d696e746564546f6b656e01581ca11c0e63717ac9d8d7bd50c6b29111003e765d199915a02613069641a14d4d794d696e746564546f6b656e181e581ca49d85bfbd193446051e644e7ad448682a1bc1b02d5a15f78429a1f0a14d4d794d696e746564546f6b656e0a581cc7e5e285a6ca1fdd6b8b0293b4d825a9c92ae69f8fc35ae2252a697da14d4d794d696e746564546f6b656e0a581cfed7a8ee8af612b08a05304ba434ef18f37be06f144fbc190d377942a14d4d794d696e746564546f6b656e0a581c92db8682a9e00473968130a7d3ee6d1bd331812543a8584ba739c74ca14d4d794d696e746564546f6b656e01581cd3c9b677c3e599ac2eb0a455e4d5d027d5ef860caf72b5dc27ba0e16a14d4d794d696e746564546f6b656e01581ce2085cebe2ce09d4ec0cbfe965f332941686c9288199440d45e95ff0a14d4d794d696e746564546f6b656e01581c2fce0a65bac1267022f94296e3d55fb862979b13bed38521a31cd200a14d4d794d696e746564546f6b656e01021a0002fb89031a0333a0f509a1581c2fce0a65bac1267022f94296e3d55fb862979b13bed38521a31cd200a14d4d794d696e746564546f6b656e01")))
        // console.log("txHash CSL", txhash.to_hex())
        // const lucidTxHash = C.hash_transaction(C.TransactionBody.from_bytes(fromHex("a500838258200d31e3060edc0422bab792b414b6920534fb61f72a24cb76c911fea670601518008258205a4a961c2ff22b870f06f5303dcfffaaf3afdb819b12f5f0e60f0540e0e7490700825820f9178e7551be72eb512f8b1b739346c84e9cda4ef8be4feada9bfff6fe47e80000018182583900bc83d1474fafc0669e360c6ef389d3874f5eff99c31f343ff2cdab0bcb68eb5507f1a2a0cb4ddb095125f0f9878568cfe2466f2969db1ed3821a02050c95a9581c748a7026de606c27c06e4b90cb2e1844b566b89fba0d282debe4b40aa14d4d794d696e746564546f6b656e01581ca11c0e63717ac9d8d7bd50c6b29111003e765d199915a02613069641a14d4d794d696e746564546f6b656e181e581ca49d85bfbd193446051e644e7ad448682a1bc1b02d5a15f78429a1f0a14d4d794d696e746564546f6b656e0a581cc7e5e285a6ca1fdd6b8b0293b4d825a9c92ae69f8fc35ae2252a697da14d4d794d696e746564546f6b656e0a581cfed7a8ee8af612b08a05304ba434ef18f37be06f144fbc190d377942a14d4d794d696e746564546f6b656e0a581c92db8682a9e00473968130a7d3ee6d1bd331812543a8584ba739c74ca14d4d794d696e746564546f6b656e01581cd3c9b677c3e599ac2eb0a455e4d5d027d5ef860caf72b5dc27ba0e16a14d4d794d696e746564546f6b656e01581ce2085cebe2ce09d4ec0cbfe965f332941686c9288199440d45e95ff0a14d4d794d696e746564546f6b656e01581c2fce0a65bac1267022f94296e3d55fb862979b13bed38521a31cd200a14d4d794d696e746564546f6b656e01021a0002fb89031a0333a0f509a1581c2fce0a65bac1267022f94296e3d55fb862979b13bed38521a31cd200a14d4d794d696e746564546f6b656e01")))
        // console.log("lucidTxHash", lucidTxHash.to_hex())

        const witness = CML.make_vkey_witness(
          CML.hash_transaction(tx.body()),
          // toCMLTransactionHash(tx.body()),
          priv,
        );
        txWitnessSetBuilder.add_vkey(witness);
      });

      return txWitnessSetBuilder.build();
    },
    signMessage: async (
      address: Address | RewardAddress,
      payload: Payload,
    ): Promise<SignedMessage> => {
      const {
        paymentCredential,
        stakeCredential,
        address: { hex: hexAddress },
      } = getAddressDetails(address);

      const keyHash = paymentCredential?.hash || stakeCredential?.hash;

      const privateKey = privKeyHashMap[keyHash!];

      if (!privateKey) {
        throw new Error(`Cannot sign message for address: ${address}.`);
      }

      return signData(hexAddress, payload, privateKey);
    },
    submitTx: async (tx: Transaction): Promise<TxHash> => {
      return await provider.submitTx(tx);
    },
  };
};

/**
 * Cardano Private key in bech32; not the BIP32 private key or any key that is not fully derived.
 * Only an Enteprise address (without stake credential) is derived.
 */
export const makeWalletFromPrivateKey = (
  provider: Provider,
  network: Network,
  privateKey: PrivateKey,
): Wallet => {
  const priv = CML.PrivateKey.from_bech32(privateKey);
  const pubKeyHash = priv.to_public().hash();
  const address = CML.EnterpriseAddress.new(
    network === "Mainnet" ? 1 : 0,
    CML.Credential.new_pub_key(pubKeyHash),
  )
    .to_address()
    .to_bech32(undefined);

  return {
    address: async (): Promise<Address> => address,
    rewardAddress: async (): Promise<RewardAddress | null> => null,
    getUtxos: async (): Promise<UTxO[]> => {
      return await provider.getUtxos(paymentCredentialOf(address));
    },
    getUtxosCore: async (): Promise<Array<CML.TransactionUnspentOutput>> => {
      const utxos = await provider.getUtxos(paymentCredentialOf(address));
      const coreUtxos: Array<CML.TransactionUnspentOutput> = [];
      utxos.forEach((utxo) => {
        coreUtxos.push(utxoToCore(utxo));
      });
      return coreUtxos;
    },
    getDelegation: async (): Promise<Delegation> => {
      return { poolId: null, rewards: 0n };
    },
    signTx: async (tx: CML.Transaction): Promise<CML.TransactionWitnessSet> => {
      const signed = priv.sign(tx.to_cbor_bytes());
      const witness = CML.Vkeywitness.new(priv.to_public(), signed);
      const txWitnessSetBuilder = CML.TransactionWitnessSetBuilder.new();
      txWitnessSetBuilder.add_vkey(witness);
      return txWitnessSetBuilder.build();
    },
    signMessage: async (
      address: Address | RewardAddress,
      payload: Payload,
    ): Promise<SignedMessage> => {
      const {
        paymentCredential,
        address: { hex: hexAddress },
      } = getAddressDetails(address);
      const keyHash = paymentCredential?.hash;

      const originalKeyHash = pubKeyHash.to_hex();

      if (!keyHash || keyHash !== originalKeyHash) {
        throw new Error(`Cannot sign message for address: ${address}.`);
      }

      return signData(hexAddress, payload, privateKey);
    },
    submitTx: async (tx: Transaction): Promise<TxHash> => {
      return await provider.submitTx(tx);
    },
  };
};

export const makeWalletFromAPI = (
  provider: Provider,
  api: WalletApi,
): Wallet => {
  const getAddressHex = async () => {
    const [addressHex] = await api.getUsedAddresses();
    if (addressHex) return addressHex;

    const [unusedAddressHex] = await api.getUnusedAddresses();
    return unusedAddressHex;
  };

  const getRewardAddress = async () => {
    const [rewardAddressHex] = await api.getRewardAddresses();
    const rewardAddress = rewardAddressHex
      ? CML.RewardAddress.from_address(CML.Address.from_hex(rewardAddressHex))!
          .to_address()
          .to_bech32(undefined)
      : null;
    return rewardAddress;
  };

  return {
    address: async (): Promise<Address> =>
      CML.Address.from_hex(await getAddressHex()).to_bech32(undefined),
    rewardAddress: async (): Promise<RewardAddress | null> =>
      getRewardAddress(),
    getUtxos: async (): Promise<UTxO[]> => {
      const utxos = ((await api.getUtxos()) || []).map((utxo) => {
        const parsedUtxo = CML.TransactionUnspentOutput.from_cbor_bytes(
          fromHex(utxo),
        );
        return coreToUtxo(parsedUtxo);
      });
      return utxos;
    },
    getUtxosCore: async (): Promise<Array<CML.TransactionUnspentOutput>> => {
      const utxos: Array<CML.TransactionUnspentOutput> = [];
      ((await api.getUtxos()) || []).forEach((utxo: string) => {
        utxos.push(CML.TransactionUnspentOutput.from_cbor_hex(utxo));
      });
      return utxos;
    },
    getDelegation: async (): Promise<Delegation> => {
      const rewardAddr = await getRewardAddress();
      return rewardAddr
        ? await provider.getDelegation(rewardAddr)
        : { poolId: null, rewards: 0n };
    },
    signTx: async (tx: CML.Transaction): Promise<CML.TransactionWitnessSet> => {
      const witnessSet = await api.signTx(toHex(tx.to_cbor_bytes()), true);
      return CML.TransactionWitnessSet.from_cbor_hex(witnessSet);
    },
    signMessage: async (
      address: Address | RewardAddress,
      payload: Payload,
    ): Promise<SignedMessage> => {
      const hexAddress = toHex(CML.Address.from_bech32(address).to_raw_bytes());
      return await api.signData(hexAddress, payload);
    },
    submitTx: async (tx: Transaction): Promise<TxHash> => {
      const txHash = await api.submitTx(tx);
      return txHash;
    },
  };
};
