---
"@lucid-evolution/core-types": patch
"@lucid-evolution/provider": patch
"@lucid-evolution/wallet": patch
"@lucid-evolution/lucid": patch
"@lucid-evolution/uplc": patch
---

Transaction chaining is a feature that allows to chain multiple transactions in one block , the endpoint chain() allows to accomplish this by returning a tuple with three elements:

1. **newWalletInputs**: This includes all UTXOs that were not spent in the transaction and the new wallet UTXOs derived from the output transaction.
2. **derivedOutputs**: The derived outputs extracted from the completed transaction.
3. **tx**: The new transaction that is ready to be submitted.

```
  const [newWalletInputs, derivedOutputs, tx] = await user
    .newTx()
    .pay.ToAddressWithData(
      contractAddress,
      {
        kind: "inline",
        value: datum,
      },
      { lovelace: 10_000_000n }
    )
    .chain();

    const signed = await tx.sign.withWallet().complete();
    const txHash = await signed.submit();
```

To construct a new transaction using tx chaining, the UTXOs belonging to the wallet must be overridden. This is necessary because these UTXOs are not yet recorded on the blockchain.

```
user.overrideUTxOs(newWalletUTxOs);

```

This function updates the wallet's UTXOs to set the new ones, ensuring the next transaction chaining can be constructed correctly.
