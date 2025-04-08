import { ChildProcess } from "child_process";
import { afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";
import {
  Kupmios,
  Lucid,
  makeWalletFromPrivateKey,
  Provider,
  Wallet,
} from "../../lucid/src/index.js";
import { CML } from "../../provider/src/core.js";
import { isYaciRunning, startYaci, topup } from "./internal/yaci.js";
import {
  createHydraConfigurationFiles,
  generateRandomHydraConfiguration,
  getTestWallets,
  HydraConfiguration,
  publishHydraScripts,
  signCommitTransaction,
  startHydraNode,
  TestWallets,
} from "./internal/hydra.js";
import { Hydra } from "../src/Provider/Hydra.js";
import { Node } from "../src/Hydra.js";

let yaciProcess: ChildProcess | undefined;
const faucetSk = CML.PrivateKey.generate_ed25519().to_bech32();
let cardanoProvider: Provider;
let faucetWallet: Wallet;
let hydraScriptTxIds: string;

type TestContext = {
  config: HydraConfiguration;
  abortController: AbortController;
  hydraProvider: Hydra;
  wallets: TestWallets;
};

beforeAll(async () => {
  // Start Yaci
  // Due to a problem with Yaci you'll need to run the node during 10 minutes
  // until the Conway hard fork is activated. You can run the test for the
  // first time and wait 10 minutes to rerun it.
  // It will create a folder in the tmp directory with the name yaci
  // and the config file inside it.
  if (!(await isYaciRunning(0))) {
    yaciProcess = await startYaci();
    await isYaciRunning();
  }
  cardanoProvider = new Kupmios(
    "http://localhost:1442",
    "http://localhost:1337"
  );
  faucetWallet = makeWalletFromPrivateKey(cardanoProvider, "Custom", faucetSk);

  await topup(await faucetWallet.address(), 1000000);

  hydraScriptTxIds = await publishHydraScripts(faucetSk);
}, 0);

beforeEach<TestContext>(async (meta) => {
  const lucid = await Lucid(cardanoProvider, "Preprod");
  lucid.selectWallet.fromPrivateKey(faucetSk);

  meta.config = generateRandomHydraConfiguration();
  createHydraConfigurationFiles(meta.config);
  meta.abortController = await startHydraNode(hydraScriptTxIds, meta.config);
  meta.hydraProvider = new Hydra(`ws://localhost:${meta.config.alicePort}`);

  meta.wallets = await getTestWallets(
    cardanoProvider,
    meta.hydraProvider,
    meta.config
  );

  const tx = lucid.newTx();
  for (const walletKey in meta.wallets.cardano) {
    const wallet =
      meta.wallets.cardano[
        walletKey as keyof typeof meta.wallets.cardano
      ].wallet();
    for (const adaAmount of [5, 10, 15, 20, 25, 50]) {
      tx.pay.ToAddress(await wallet.address(), {
        lovelace: BigInt(adaAmount * 1000000),
      });
    }
  }
  const txUnsigned = await tx.complete();
  const txSigned = await txUnsigned.sign.withWallet();
  const txCompleted = await txSigned.complete();
  const txHash = await txCompleted.submit();
  await lucid.awaitTx(txHash, 100);
}, 30000);

describe("Hydra manager", async () => {
  it<TestContext>("should complete the whole lifecycle", async (context) => {
    const { alicePort: node1Port, bobPort: node2Port } = context.config;
    const wallets = context.wallets;

    const node1 = new Node(`ws://localhost:${node1Port}`);
    const node2 = new Node(`ws://localhost:${node2Port}`);
    await node1.connect();
    await node2.connect();
    const providerNode1 = new Hydra(node1.getUrl(), "Custom");
    const cardanoProvider = new Kupmios(  
      "http://localhost:1442",
      "http://localhost:1337"
    );

    // Initialize the node
    await node1.initialize();
    expect(await expectNewState(node1, "INITIALIZING")).toEqual(true);

    // Commit to the head
    const firstUTxO = (await wallets.cardano.aliceFunds.wallet().getUtxos())[0];
    expect(firstUTxO).toBeDefined();

    const cardanoTxNode1 = await node1.commit([firstUTxO]);
    const signedTxNode1 = await signCommitTransaction(
      cardanoTxNode1,
      wallets.cardano.aliceFunds
    );
    const txHashNode1 = await cardanoProvider.submitTx(signedTxNode1);
    await cardanoProvider.awaitTx(txHashNode1, 100);

    const cardanoTxNode2 = await node2.commit();
    const txHashNode2 = await cardanoProvider.submitTx(cardanoTxNode2);
    await cardanoProvider.awaitTx(txHashNode2, 100);

    // Await for the head to be open
    expect(await expectNewState(node1, "OPEN")).toEqual(true);

    // Check the UTxO is inside the head
    const removeFalsyValues = (obj: Object) => {
      return Object.fromEntries(
        Object.entries(obj).filter(([_, value]) => Boolean(value))
      );
    };
    const headUTxO = (await providerNode1.getUtxos(firstUTxO.address))[0];
    expect(removeFalsyValues(headUTxO)).toEqual(removeFalsyValues(firstUTxO));

    // Close the head
    await node1.close();
    expect(await expectNewState(node1, "CLOSED")).toEqual(true);

    // Wait to fun out
    expect(await expectNewState(node1, "FANOUT_POSSIBLE")).toEqual(
      true
    );

    // Fan out funds
    await node1.fanout();
    expect(await expectNewState(node1, "FINAL")).toEqual(true);

    // Check the UTxO is inside the head
    const newUTxOs = await wallets.cardano.aliceFunds.wallet().getUtxos();
    expect(
      newUTxOs.some(
        (utxo) =>
          utxo.address === firstUTxO.address &&
          utxo.assets["lovelace"] === firstUTxO.assets["lovelace"]
      )
    ).toBeTruthy();
  });
}, 120_000);

afterEach<TestContext>(async (context) => {
  context.abortController.abort();
}, 30000);

function expectNewState(
  node: Node,
  state: string | Array<string>,
  timeout: number = 10000
): Promise<boolean> {
  return new Promise((resolve) => {
    const timeoutId = setTimeout(() => {
      resolve(false);
    }, timeout);

    const checkIntervalId = setInterval(async () => {
      const status = node.getStatus();
      if (
        status === state ||
        (Array.isArray(state) && state.includes(status))
      ) {
        clearTimeout(timeoutId);
        clearInterval(checkIntervalId);
        resolve(true);
      }
    }, 1000);
  });
}
