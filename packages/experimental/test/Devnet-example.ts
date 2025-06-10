import {
  Address,
  Devnet,
  EnterpriseAddress,
  NetworkId,
  KeyHash,
} from "../src/index.js";
//TODO: remove this import when CML is no longer needed
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

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

const account = generateAccountForDevnet();
console.log(`Generated address: ${JSON.stringify(account)})`);

const cluster = await Devnet.Cluster.makeOrThrow({
  clusterName: "devnet-1",
  shelleyGenesis: {
    epochLength: 1000,
    initialFunds: {
      [account.hex]: 123456789, // use full address hex instead of keyhash
    },
  },
});

await Devnet.Cluster.startOrThrow(cluster);

// query tip
// 𝝺 docker exec -it cardano-devnet-1 cardano-cli query tip --testnet-magic 42

// query address utxos
// 𝝺 docker exec -it cardano-devnet-1 cardano-cli query utxo --address ${account.addressBech32} --testnet-magic 42
