import { Koios, Lucid } from "@evolution-sdk/lucid";
import { NextApiRequest, NextApiResponse } from "next";

// Initialize Lucid based on environment
async function initLucid() {
  if (process.env.NODE_ENV === "development") {
    // Use Preprod network for development
    return Lucid(new Koios("https://preprod.koios.rest/api/v1"), "Preprod");
  } else {
    // Use Mainnet for production
    return Lucid(new Koios("https://api.koios.rest/api/v1"), "Mainnet");
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Initialize Lucid based on environment
    const lucid = await initLucid();

    // Get address from request body
    const { address } = req.body;

    if (!address) {
      return res.status(400).json({ error: "Address is required" });
    }

    // Select wallet from address (no private keys on the server)
    lucid.selectWallet.fromAddress(address, []);

    // Build a simple transaction
    const tx = await lucid
      .newTx()
      .pay.ToAddress(
        "addr_test1qqr585tvlc7ylnqvz8pyqwauzrdu0mxag3m7q56grgmgu7sxu2hyfhlkwuxupa9d5085eunq2qywy7hvmvej456flknswgndm3", // Testnet Faucet Return Address
        { lovelace: 10_000_000n }, // 10 Ada = 10_000_000 lovelace
      )
      .complete();

    // Return the transaction CBOR for the client to sign and submit
    return res.status(200).json({ tx: tx.toCBOR() });
  } catch (error) {
    console.error("Error building transaction:", error);
    return res.status(500).json({
      error: "Failed to build transaction",
      details: error instanceof Error ? error.message : String(error),
    });
  }
}
