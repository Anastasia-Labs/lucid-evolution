import { Blockfrost, Lucid } from "@lucid-evolution/lucid";

interface BuildTransactionRequest {
  senderAddress: string;
  recipientAddress: string;
  lovelaceAmount: string;
}

export async function buildTransaction(req: BuildTransactionRequest) {
  try {
    // Initialize Lucid with Blockfrost
    const lucid = await Lucid(
      new Blockfrost(
        "https://cardano-preprod.blockfrost.io/api/v0",
        process.env.REACT_APP_BLOCKFROST_API_KEY,
      ),
      "Preprod",
    );

    // Select the sender's wallet
    lucid.selectWallet.fromAddress(req.senderAddress, []);

    // Build the transaction
    const tx = await lucid
      .newTx()
      .pay.ToAddress(req.recipientAddress, {
        lovelace: BigInt(req.lovelaceAmount),
      })
      .complete();

    // Return the transaction CBOR
    return { tx: tx.toCBOR() };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to build transaction",
    );
  }
}
