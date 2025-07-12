import { fromHex, fromText } from "@evolution-sdk/core-utils";
import { verifyData } from "@evolution-sdk/sign_data";
import { getAddressDetails } from "@evolution-sdk/utils";
import { Effect } from "effect";
import { EmulatorInstance } from "../service/EmulatorInstance";
import { User } from "../service/EmulatorUser";

export const verifySignedMessage = Effect.gen(function* () {
  const {
    ACCOUNTS: { PRIVATE_KEY_ACCOUNTS },
  } = yield* EmulatorInstance;
  const { user } = yield* User;
  user.selectWallet.fromPrivateKey(PRIVATE_KEY_ACCOUNTS[0].privateKey);
  const message = "0";
  const messageHex = fromHex(fromText(message)).toString();
  const addr = yield* Effect.promise(() => user.wallet().address());
  const addrDetails = getAddressDetails(addr);
  const signedMessage = yield* Effect.promise(() =>
    user.wallet().signMessage(addr, messageHex),
  );
  const signatureIsValid = verifyData(
    addrDetails.address.hex,
    addrDetails.paymentCredential!.hash,
    messageHex,
    signedMessage,
  );
  return signatureIsValid;
});

export const verifyAddSignerKey = Effect.gen(function* () {
  const { user } = yield* User;
  const pubKeyHash = "c98a2f16a5800847a3c027fafc3f63a8442b92836773533d74cbf208";
  const txBuilder = user.newTx().addSignerKey(pubKeyHash);
  const balancedTx = yield* txBuilder.completeProgram({ localUPLCEval: false });
  return (
    pubKeyHash ==
    balancedTx.toTransaction().body().required_signers()?.get(0).to_hex()
  );
});
