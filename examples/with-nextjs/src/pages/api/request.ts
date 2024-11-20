import { Koios, Lucid } from "@lucid-evolution/lucid";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    // Process a POST request
    const initLucid = () => {
      if (process.env.NODE_ENV === "development") {
        return Lucid(new Koios("https://preprod.koios.rest/api/v1"), "Preprod");
      } else {
        return Lucid(new Koios("https://api.koios.rest/api/v1"), "Mainnet");
      }
    };
    const lucid = await initLucid();
    const data = req.body;

    lucid.selectWallet.fromAddress(data.address, []);
    const rewardAddress = await lucid.wallet().rewardAddress();
    const tx = await lucid
      .newTx()
      .delegateTo(
        rewardAddress!,
        process.env.NODE_ENV === "development"
          ? process.env.POOL_ID_PREPROD!
          : process.env.POOL_ID_MAINNET!,
      )
      .complete();
    res.status(200).json({ tx: tx.toCBOR() });
  } else {
    // Handle any other HTTP method
  }
}
