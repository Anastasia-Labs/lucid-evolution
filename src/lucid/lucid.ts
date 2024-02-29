import * as CML from "@dcspark/cardano-multiplatform-lib-nodejs";
import { signData, verifyData } from "../misc/sign_data.js";
import { discoverOwnUsedTxKeyHashes, walletFromSeed } from "../misc/wallet.js";
import { Constr, Data } from "../plutus/data.js";
import { SLOT_CONFIG_NETWORK } from "../plutus/time.js";
import { Emulator } from "../provider/emulator.js";
import type {
  Address,
  Credential,
  Delegation,
  ExternalWallet,
  Json,
  KeyHash,
  Network,
  OutRef,
  Payload,
  PrivateKey,
  Provider,
  RewardAddress,
  SignedMessage,
  Slot,
  Transaction,
  TxHash,
  Unit,
  UTxO,
  Wallet,
  WalletApi,
} from "../types/mod.ts";
import {
  coreToUtxo,
  createCostModels,
  fromHex,
  fromUnit,
  paymentCredentialOf,
  toHex,
  toUnit,
  Utils,
  utxoToCore,
} from "../utils/mod.js";
import { Message } from "./message.js";
import { Tx } from "./tx.js";
import { TxComplete } from "./tx_complete.js";

export class Lucid {
  txBuilderConfig!: CML.TransactionBuilderConfig;
  wallet!: Wallet;
  provider!: Provider;
  network: Network = "Mainnet";
  utils!: Utils;

  static async new(provider?: Provider, network?: Network): Promise<Lucid> {
    const lucid = new this();
    if (network) lucid.network = network;
    if (provider) {
      lucid.provider = provider;
      const protocolParameters = await provider.getProtocolParameters();

      if (lucid.provider instanceof Emulator) {
        lucid.network = "Custom";
        SLOT_CONFIG_NETWORK[lucid.network] = {
          zeroTime: lucid.provider.now(),
          zeroSlot: 0,
          slotLength: 1000,
        };
      }

      const slotConfig = SLOT_CONFIG_NETWORK[lucid.network];
      lucid.txBuilderConfig = CML.TransactionBuilderConfigBuilder.new()
        .fee_algo(
          CML.LinearFee.new(
            BigInt(protocolParameters.minFeeA),
            BigInt(protocolParameters.minFeeB)
          )
        )
        .coins_per_utxo_byte(protocolParameters.coinsPerUtxoByte)
        .pool_deposit(protocolParameters.poolDeposit)
        .key_deposit(protocolParameters.keyDeposit)
        .max_value_size(protocolParameters.maxValSize)
        .max_tx_size(protocolParameters.maxTxSize)
        .ex_unit_prices(
          CML.ExUnitPrices.new(
            CML.Rational.new(
              BigInt(protocolParameters.priceMem * 100_000_000),
              100_000_000n
            ),
            CML.Rational.new(
              BigInt(protocolParameters.priceStep * 100_000_000),
              100_000_000n
            )
          )
        )
        .collateral_percentage(protocolParameters.collateralPercentage)
        .max_collateral_inputs(protocolParameters.maxCollateralInputs)
        // .max_tx_ex_units(
        //   CML.ExUnits.new(
        //     CML.BigNum.from_str(protocolParameters.maxTxExMem.toString()),
        //     CML.BigNum.from_str(protocolParameters.maxTxExSteps.toString()),
        //   ),
        // )
        // .slot_config(
        //   CML.BigNum.from_str(slotConfig.zeroTime.toString()),
        //   CML.BigNum.from_str(slotConfig.zeroSlot.toString()),
        //   slotConfig.slotLength,
        // )
        // .blockfrost(
        //   // We have Aiken now as native plutus core engine (primary), but we still support blockfrost (secondary) in case of bugs.
        //   CML.Blockfrost.new(
        //     // deno-lint-ignore no-explicit-any
        //     ((provider as any)?.url || "") + "/utils/txs/evaluate",
        //     // deno-lint-ignore no-explicit-any
        //     (provider as any)?.projectId || "",
        //   ),
        // )
        .cost_models(createCostModels(protocolParameters.costModels))
        .collateral_percentage(protocolParameters.collateralPercentage)
        .max_collateral_inputs(protocolParameters.maxCollateralInputs)
        .build();
    }
    lucid.utils = new Utils(lucid);
    return lucid;
  }

  /**
   * Switch provider and/or network.
   * If provider or network unset, no overwriting happens. Provider or network from current instance are taken then.
   */
  async switchProvider(provider?: Provider, network?: Network): Promise<Lucid> {
    if (this.network === "Custom") {
      throw new Error("Cannot switch when on custom network.");
    }
    const lucid = await Lucid.new(provider, network);
    this.txBuilderConfig = lucid.txBuilderConfig;
    this.provider = provider || this.provider;
    this.network = network || this.network;
    this.wallet = lucid.wallet;
    return this;
  }

  newTx(): Tx {
    return new Tx(this);
  }

  fromTx(tx: Transaction): TxComplete {
    return new TxComplete(this, CML.Transaction.from_cbor_hex(tx));
  }

  /** Signs a message. Expects the payload to be Hex encoded. */
  newMessage(address: Address | RewardAddress, payload: Payload): Message {
    return new Message(this, address, payload);
  }

  /** Verify a message. Expects the payload to be Hex encoded. */
  verifyMessage(
    address: Address | RewardAddress,
    payload: Payload,
    signedMessage: SignedMessage
  ): boolean {
    const {
      paymentCredential,
      stakeCredential,
      address: { hex: addressHex },
    } = this.utils.getAddressDetails(address);
    const keyHash = paymentCredential?.hash || stakeCredential?.hash;
    if (!keyHash) throw new Error("Not a valid address provided.");

    return verifyData(addressHex, keyHash, payload, signedMessage);
  }

  currentSlot(): Slot {
    return this.utils.unixTimeToSlot(Date.now());
  }

  utxosAt(addressOrCredential: Address | Credential): Promise<UTxO[]> {
    return this.provider.getUtxos(addressOrCredential);
  }

  utxosAtWithUnit(
    addressOrCredential: Address | Credential,
    unit: Unit
  ): Promise<UTxO[]> {
    return this.provider.getUtxosWithUnit(addressOrCredential, unit);
  }

  /** Unit needs to be an NFT (or optionally the entire supply in one UTxO). */
  utxoByUnit(unit: Unit): Promise<UTxO> {
    return this.provider.getUtxoByUnit(unit);
  }

  utxosByOutRef(outRefs: Array<OutRef>): Promise<UTxO[]> {
    return this.provider.getUtxosByOutRef(outRefs);
  }

  delegationAt(rewardAddress: RewardAddress): Promise<Delegation> {
    return this.provider.getDelegation(rewardAddress);
  }

  awaitTx(txHash: TxHash, checkInterval = 3000): Promise<boolean> {
    return this.provider.awaitTx(txHash, checkInterval);
  }

  async datumOf<T = Data>(utxo: UTxO, type?: T): Promise<T> {
    if (!utxo.datum) {
      if (!utxo.datumHash) {
        throw new Error("This UTxO does not have a datum hash.");
      }
      utxo.datum = await this.provider.getDatum(utxo.datumHash);
    }
    return Data.from<T>(utxo.datum, type);
  }

  /** Query CIP-0068 metadata for a specifc asset. */
  async metadataOf<T = Json>(unit: Unit): Promise<T> {
    const { policyId, name, label } = fromUnit(unit);
    switch (label) {
      case 222:
      case 333:
      case 444: {
        const utxo = await this.utxoByUnit(toUnit(policyId, name, 100));
        const metadata = (await this.datumOf(utxo)) as Constr<Data>;
        return Data.toJson(metadata.fields[0]);
      }
      default:
        throw new Error("No variant matched.");
    }
  }

  /**
   * Cardano Private key in bech32; not the BIP32 private key or any key that is not fully derived.
   * Only an Enteprise address (without stake credential) is derived.
   */
  selectWalletFromPrivateKey(privateKey: PrivateKey): Lucid {
    const priv = CML.PrivateKey.from_bech32(privateKey);
    const pubKeyHash = priv.to_public().hash();

    this.wallet = {
      // deno-lint-ignore require-await
      address: async (): Promise<Address> =>
        CML.EnterpriseAddress.new(
          this.network === "Mainnet" ? 1 : 0,
          CML.Credential.new_pub_key(pubKeyHash)
        )
          .to_address()
          .to_bech32(undefined),
      // deno-lint-ignore require-await
      rewardAddress: async (): Promise<RewardAddress | null> => null,
      getUtxos: async (): Promise<UTxO[]> => {
        return await this.utxosAt(
          paymentCredentialOf(await this.wallet.address())
        );
      },
      getUtxosCore: async (): Promise<Array<CML.TransactionUnspentOutput>> => {
        const utxos = await this.utxosAt(
          paymentCredentialOf(await this.wallet.address())
        );
        const coreUtxos: Array<CML.TransactionUnspentOutput> = [];
        utxos.forEach((utxo) => {
          coreUtxos.push(utxoToCore(utxo));
        });
        return coreUtxos;
      },
      // deno-lint-ignore require-await
      getDelegation: async (): Promise<Delegation> => {
        return { poolId: null, rewards: 0n };
      },
      // deno-lint-ignore require-await
      signTx: async (
        tx: CML.Transaction
      ): Promise<CML.TransactionWitnessSet> => {
        const signed = priv.sign(tx.to_cbor_bytes());
        const witness = CML.Vkeywitness.new(priv.to_public(), signed);
        const txWitnessSetBuilder = CML.TransactionWitnessSetBuilder.new();
        txWitnessSetBuilder.add_vkey(witness);
        return txWitnessSetBuilder.build();
      },
      // deno-lint-ignore require-await
      signMessage: async (
        address: Address | RewardAddress,
        payload: Payload
      ): Promise<SignedMessage> => {
        const {
          paymentCredential,
          address: { hex: hexAddress },
        } = this.utils.getAddressDetails(address);
        const keyHash = paymentCredential?.hash;

        const originalKeyHash = pubKeyHash.to_hex();

        if (!keyHash || keyHash !== originalKeyHash) {
          throw new Error(`Cannot sign message for address: ${address}.`);
        }

        return signData(hexAddress, payload, privateKey);
      },
      submitTx: async (tx: Transaction): Promise<TxHash> => {
        return await this.provider.submitTx(tx);
      },
    };
    return this;
  }

  selectWallet(api: WalletApi): Lucid {
    const getAddressHex = async () => {
      const [addressHex] = await api.getUsedAddresses();
      if (addressHex) return addressHex;

      const [unusedAddressHex] = await api.getUnusedAddresses();
      return unusedAddressHex;
    };

    this.wallet = {
      address: async (): Promise<Address> =>
        CML.Address.from_hex(await getAddressHex()).to_bech32(undefined),
      rewardAddress: async (): Promise<RewardAddress | null> => {
        const [rewardAddressHex] = await api.getRewardAddresses();
        const rewardAddress = rewardAddressHex
          ? CML.RewardAddress.from_address(
              CML.Address.from_hex(rewardAddressHex)
            )!
              .to_address()
              .to_bech32(undefined)
          : null;
        return rewardAddress;
      },
      getUtxos: async (): Promise<UTxO[]> => {
        const utxos = ((await api.getUtxos()) || []).map((utxo) => {
          const parsedUtxo = CML.TransactionUnspentOutput.from_cbor_bytes(
            fromHex(utxo)
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
        const rewardAddr = await this.wallet.rewardAddress();

        return rewardAddr
          ? await this.delegationAt(rewardAddr)
          : { poolId: null, rewards: 0n };
      },
      signTx: async (
        tx: CML.Transaction
      ): Promise<CML.TransactionWitnessSet> => {
        const witnessSet = await api.signTx(toHex(tx.to_cbor_bytes()), true);
        return CML.TransactionWitnessSet.from_cbor_hex(witnessSet);
      },
      signMessage: async (
        address: Address | RewardAddress,
        payload: Payload
      ): Promise<SignedMessage> => {
        const hexAddress = toHex(
          CML.Address.from_bech32(address).to_raw_bytes()
        );
        return await api.signData(hexAddress, payload);
      },
      submitTx: async (tx: Transaction): Promise<TxHash> => {
        const txHash = await api.submitTx(tx);
        return txHash;
      },
    };
    return this;
  }

  /**
   * Emulates a wallet by constructing it with the utxos and an address.
   * If utxos are not set, utxos are fetched from the provided address.
   */
  selectWalletFrom({ address, utxos, rewardAddress }: ExternalWallet): Lucid {
    const addressDetails = this.utils.getAddressDetails(address);
    this.wallet = {
      // deno-lint-ignore require-await
      address: async (): Promise<Address> => address,
      // deno-lint-ignore require-await
      rewardAddress: async (): Promise<RewardAddress | null> => {
        const rewardAddr =
          !rewardAddress && addressDetails.stakeCredential
            ? (() => {
                if (addressDetails.stakeCredential.type === "Key") {
                  return CML.RewardAddress.new(
                    this.network === "Mainnet" ? 1 : 0,
                    CML.Credential.new_pub_key(
                      CML.Ed25519KeyHash.from_hex(
                        addressDetails.stakeCredential.hash
                      )
                    )
                  )
                    .to_address()
                    .to_bech32(undefined);
                }
                return CML.RewardAddress.new(
                  this.network === "Mainnet" ? 1 : 0,
                  CML.Credential.new_script(
                    CML.ScriptHash.from_hex(addressDetails.stakeCredential.hash)
                  )
                )
                  .to_address()
                  .to_bech32(undefined);
              })()
            : rewardAddress;
        return rewardAddr || null;
      },
      getUtxos: async (): Promise<UTxO[]> => {
        return utxos ? utxos : await this.utxosAt(paymentCredentialOf(address));
      },
      getUtxosCore: async (): Promise<Array<CML.TransactionUnspentOutput>> => {
        const coreUtxos: Array<CML.TransactionUnspentOutput> = [];
        (utxos
          ? utxos
          : await this.utxosAt(paymentCredentialOf(address))
        ).forEach((utxo) => coreUtxos.push(utxoToCore(utxo)));
        return coreUtxos;
      },
      getDelegation: async (): Promise<Delegation> => {
        const rewardAddr = await this.wallet.rewardAddress();

        return rewardAddr
          ? await this.delegationAt(rewardAddr)
          : { poolId: null, rewards: 0n };
      },
      // deno-lint-ignore require-await
      signTx: async (): Promise<CML.TransactionWitnessSet> => {
        throw new Error("Not implemented");
      },
      // deno-lint-ignore require-await
      signMessage: async (): Promise<SignedMessage> => {
        throw new Error("Not implemented");
      },
      submitTx: async (tx: Transaction): Promise<TxHash> => {
        return await this.provider.submitTx(tx);
      },
    };
    return this;
  }

  /**
   * Select wallet from a seed phrase (e.g. 15 or 24 words). You have the option to choose between a Base address (with stake credential)
   * and Enterprise address (without stake credential). You can also decide which account index to derive. By default account 0 is derived.
   */
  selectWalletFromSeed(
    seed: string,
    options?: {
      addressType?: "Base" | "Enterprise";
      accountIndex?: number;
      password?: string;
    }
  ): Lucid {
    const { address, rewardAddress, paymentKey, stakeKey } = walletFromSeed(
      seed,
      {
        addressType: options?.addressType || "Base",
        accountIndex: options?.accountIndex || 0,
        password: options?.password,
        network: this.network,
      }
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

    this.wallet = {
      // deno-lint-ignore require-await
      address: async (): Promise<Address> => address,
      // deno-lint-ignore require-await
      rewardAddress: async (): Promise<RewardAddress | null> =>
        rewardAddress || null,
      // deno-lint-ignore require-await
      getUtxos: async (): Promise<UTxO[]> =>
        this.utxosAt(paymentCredentialOf(address)),
      getUtxosCore: async (): Promise<Array<CML.TransactionUnspentOutput>> => {
        const utxos = await this.utxosAt(
          paymentCredentialOf(await this.wallet.address())
        );
        const coreUtxos: Array<CML.TransactionUnspentOutput> = [];
        utxos.forEach((utxo: UTxO) => coreUtxos.push(utxoToCore(utxo)));
        return coreUtxos;
      },
      getDelegation: async (): Promise<Delegation> => {
        const rewardAddr = await this.wallet.rewardAddress();

        return rewardAddr
          ? await this.delegationAt(rewardAddr)
          : { poolId: null, rewards: 0n };
      },
      signTx: async (
        tx: CML.Transaction
      ): Promise<CML.TransactionWitnessSet> => {
        const utxos = await this.utxosAt(address);

        const ownKeyHashes: Array<KeyHash> = [paymentKeyHash, stakeKeyHash];

        const usedKeyHashes = discoverOwnUsedTxKeyHashes(
          tx,
          ownKeyHashes,
          utxos
        );

        const txWitnessSetBuilder = CML.TransactionWitnessSetBuilder.new();
        usedKeyHashes.forEach((keyHash) => {
          const priv = CML.PrivateKey.from_bech32(privKeyHashMap[keyHash]!);
          // const signed = priv.sign(tx.to_cbor_bytes());

          const witness = CML.make_vkey_witness(
            CML.hash_transaction(tx.body()),
            priv
          );
          // const witness = CML.Vkeywitness.new(priv.to_public(),signed)
          txWitnessSetBuilder.add_vkey(witness);
        });
        return txWitnessSetBuilder.build();
      },
      // deno-lint-ignore require-await
      signMessage: async (
        address: Address | RewardAddress,
        payload: Payload
      ): Promise<SignedMessage> => {
        const {
          paymentCredential,
          stakeCredential,
          address: { hex: hexAddress },
        } = this.utils.getAddressDetails(address);

        const keyHash = paymentCredential?.hash || stakeCredential?.hash;

        const privateKey = privKeyHashMap[keyHash!];

        if (!privateKey) {
          throw new Error(`Cannot sign message for address: ${address}.`);
        }

        return signData(hexAddress, payload, privateKey);
      },
      submitTx: async (tx: Transaction): Promise<TxHash> => {
        return await this.provider.submitTx(tx);
      },
    };
    return this;
  }
}
