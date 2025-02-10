import { fromHex, fromText } from "@lucid-evolution/core-utils";
import { verifyData } from "@lucid-evolution/sign_data";
import { getAddressDetails } from "@lucid-evolution/utils";
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
