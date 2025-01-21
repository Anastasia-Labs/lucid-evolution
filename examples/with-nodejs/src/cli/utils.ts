import {
  Blockfrost,
  Lucid,
  LucidEvolution,
  Network,
} from "@lucid-evolution/lucid";
import dotenv from "dotenv";

dotenv.config();

export const initLucid = async (): Promise<LucidEvolution> => {
  const network = process.env.NETWORK;
  if (!network) {
    throw new Error("NETWORK is not defined.");
  }

  const blockfrostUrl = process.env.BLOCKFROST_URL;
  if (!blockfrostUrl) {
    throw new Error("BLOCKFROST_URL is not defined.");
  }

  const blockfrostProjectId = process.env.BLOCKFROST_PROJECT_ID;
  if (!blockfrostProjectId) {
    throw new Error("BLOCKFROST_PROJECT_ID is not defined.");
  }

  const lucidNetwork = (network.charAt(0).toUpperCase() +
    network.slice(1)) as Network;

  console.log("lucidNetwork :>> ", lucidNetwork);
  const lucid = await Lucid(
    new Blockfrost(blockfrostUrl, blockfrostProjectId),
    lucidNetwork
  );
  const seedPhrase = process.env.SEED_PHRASE;
  if (!seedPhrase) {
    throw new Error("seedPhrase is not defined.");
  }
  lucid.selectWallet.fromSeed(seedPhrase);
  return lucid;
};
