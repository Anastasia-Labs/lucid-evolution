import { Koios, Lucid, drepIDToCredential } from "@lucid-evolution/lucid";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const initLucid = () => {
      if (process.env.NODE_ENV === "development") {
        return Lucid(
          new Koios(
            process.env.KOIOS_API_PREPROD ||
              "https://preprod.koios.rest/api/v1",
          ),
          "Preprod",
        );
      } else {
        return Lucid(
          new Koios(
            process.env.KOIOS_API_MAINNET || "https://api.koios.rest/api/v1",
          ),
          "Mainnet",
        );
      }
    };

    try {
      const lucid = await initLucid();
      const { address } = req.body;

      if (!address) {
        return res.status(400).json({
          error: "No wallet address provided",
        });
      }

      lucid.selectWallet.fromAddress(address, []);
      const rewardAddress = await lucid.wallet().rewardAddress();

      if (!rewardAddress) {
        return res.status(400).json({
          error: "No reward address found",
        });
      }

      // Get DRep ID from environment variables based on network
      const DREP_ID =
        process.env.NODE_ENV === "development"
          ? process.env.DREP_ID_PREPROD
          : process.env.DREP_ID_MAINNET;

      if (
        !DREP_ID ||
        DREP_ID.includes("key_hash_here") ||
        DREP_ID.length < 10
      ) {
        return res.status(400).json({
          error: "DRep ID not properly configured",
        });
      }

      const drepCredential = drepIDToCredential(DREP_ID);

      const tx = await lucid
        .newTx()
        .delegate.VoteToDRep(rewardAddress, drepCredential)
        .complete();

      return res.status(200).json({ tx: tx.toCBOR() });
    } catch (error) {
      console.error("Transaction error:", error);
      return res.status(500).json({
        error:
          error instanceof Error
            ? error.message
            : "Failed to create transaction",
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
