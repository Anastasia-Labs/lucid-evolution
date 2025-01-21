import { initLucid } from "./utils";

const lucid = await initLucid();

const address = await lucid.wallet().address();
console.log("address :>> ", address);
const rewardAddress = await lucid.wallet().rewardAddress();
if (!rewardAddress) {
  throw new Error("No reward address found");
}
console.log("rewardAddress :>> ", rewardAddress);

const vote = await lucid
  .newTx()
  .registerStake(rewardAddress)
  .delegate.ToPool(
    rewardAddress,
    "pool1nmfr5j5rnqndprtazre802glpc3h865sy50mxdny65kfgf3e5eh"
  )
  .delegate.VoteToDRep(rewardAddress, {
    __typename: "AlwaysAbstain",
  })
  .setMinFee(300000n)
  .complete();

const voteSigned = await vote.sign.withWallet().complete();
const voteTxHash = await voteSigned.submit();
console.log(`🚀 Transaction submitted: ${voteTxHash}`);
console.log(`Confirming Transaction...`);
await lucid.awaitTx(voteTxHash, 40_000);

const signBuilder = await lucid
  .newTx()
  .deRegisterStake(rewardAddress)
  .setMinFee(300000n)
  .complete();
const signed = await signBuilder.sign.withWallet().complete();
const txHash = await signed.submit();
console.log(`🚀 Transaction submitted: ${txHash}`);
console.log(`Confirming Transaction...`);
await lucid.awaitTx(txHash, 40_000);
