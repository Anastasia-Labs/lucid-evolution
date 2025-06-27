import { Kupmios, Lucid } from "@lucid-evolution/lucid";
import {
  Address,
  Devnet,
  EnterpriseAddress,
  NetworkId,
  KeyHash,
} from "@lucid-evolution/experimental";
//TODO: remove this import when CML is no longer needed
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";
import { setTimeout } from "timers/promises";

const convertOgmiosUtxoToLucid = (ogmiosUtxo: unknown) => {
  const { transaction, index, address, value } = ogmiosUtxo as {
    transaction: { id: string };
    index: number;
    address: string;
    value: {
      ada?: { lovelace: number };
      assets?: Record<string, Record<string, number>>;
    };
  };

  // Convert Ogmios value format to Lucid format
  const assets: Record<string, bigint> = {};

  // Handle ADA (lovelace)
  if (value.ada?.lovelace) {
    assets.lovelace = BigInt(value.ada.lovelace);
  }

  // Handle native tokens if present
  if (value.assets) {
    for (const [policyId, tokens] of Object.entries(value.assets)) {
      for (const [assetName, amount] of Object.entries(tokens)) {
        const assetId = policyId + assetName;
        assets[assetId] = BigInt(amount);
      }
    }
  }

  return {
    txHash: transaction.id,
    outputIndex: index,
    address,
    assets,
  };
};

const queryUtxosWithOgmios = async (address: string) => {
  const response = await fetch("http://localhost:1337", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "queryLedgerState/utxo",
      params: {
        addresses: [address],
      },
      id: "queryUtxos",
    }),
  });

  const ogmiosResponse = await response.json();

  return ogmiosResponse.result.map(convertOgmiosUtxoToLucid);
};

const generateAccountForDevnet = () => {
  //TODO: create a PrivateKey module avoid using CML
  const privateKey = CML.PrivateKey.generate_ed25519();
  const publicKey = privateKey.to_public();
  const pubKeyHash = publicKey.hash();
  const keyhash = KeyHash.Decode.hex(pubKeyHash.to_hex());
  const addr = new EnterpriseAddress.EnterpriseAddress({
    networkId: NetworkId.NetworkId.make(0),
    paymentCredential: keyhash,
  });
  const hex = EnterpriseAddress.Encode.hex(addr);
  const address = EnterpriseAddress.Decode.hex(hex);
  const addressBech32 = Address.Encode.bech32(address);

  return {
    hex,
    keyhash,
    address,
    addressBech32,
    privateKey: privateKey.to_bech32(),
  } as const;
};

try {
  const account = generateAccountForDevnet();
  console.log("Account for Devnet:", account.hex);

  const cluster = await Devnet.Cluster.makeOrThrow({
    clusterName: "devnet-1",
    nodeConfig: {
      TraceMempool: true,
    },
    shelleyGenesis: {
      slotLength: 0.05, // 50ms
      epochLength: 1,
      initialFunds: {
        [account.hex]: 123456789, // use full address hex instead of keyhash
      },
    },
  });

  console.log(
    "🚀 Shelley Genesis => set initialFunds: ",
    account.addressBech32,
  );
  await Devnet.Cluster.startOrThrow(cluster);

  // query tip
  // 𝝺 docker exec -it cardano-devnet-1 cardano-cli query tip --testnet-magic 42

  // query address utxos
  // 𝝺 docker exec -it cardano-devnet-1 cardano-cli query utxo --address ${account.addressBech32} --testnet-magic 42

  const provider = new Kupmios(
    `http://localhost:${1442}`,
    `http://localhost:${1337}`,
  );

  /**
   * Query UTxOs using Ogmios
   * This is a workaround to override the initialFunds UTxOs in lucid so then I can create a new transaction
   * This is needed because the Kupmios provider does not support initialFunds
   */

  await setTimeout(100);
  const utxos = await queryUtxosWithOgmios(account.addressBech32);
  // console.dir(utxos, { depth: 10, colors: true });

  /**
   * Initialize Lucid with the Kupmios provider and custom network
   * I had to override the UTxOs because the Kupmios provider does not support initialFunds @link https://github.com/CardanoSolutions/kupo/issues/172
   * This is a workaround to make kupo aware of a new utxo that comes from the initialFunds
   * I create a new transaction to spend the initial funds and send it back to the same address
   * This is not needed in production, but it is needed for the devnet to work
   * This workaround should be done before using the devnet
   */
  const genesisAccount = await Lucid(provider, "Custom");
  genesisAccount.selectWallet.fromPrivateKey(account.privateKey);
  genesisAccount.overrideUTxOs(utxos);

  const txHash = await (
    await (
      await genesisAccount
        .newTx()
        .pay.ToAddress(account.addressBech32, {
          lovelace: BigInt(1000000),
        })
        .complete()
    ).sign
      .withWallet()
      .complete()
  ).submit();
  console.log("📤 Transaction submitted: ", txHash);
  console.log("⏳ Waiting for transaction to be confirmed...");
  await genesisAccount.awaitTx(txHash, 10);
  console.log("✅ Transaction confirmed!");

  // const lucid = await Lucid(provider, "Custom");
  // lucid.selectWallet.fromPrivateKey(account.privateKey);
  // console.log("UTxOs after sending 1 ADA back to the address:");
  // console.dir(await lucid.wallet().getUtxos(), { depth: 10 });

  // console.log("🧹 Removing devnet cluster...");
  await Devnet.Cluster.removeOrThrow(cluster);
  // console.log("✅ Devnet cluster removed successfully!");
} catch (error) {
  console.error("❌ An error occurred:", error);
}
