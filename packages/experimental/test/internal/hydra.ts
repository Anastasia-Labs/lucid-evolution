import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";
import os from "os";
import fs from "fs";
import { exec } from "child_process";
import { Node } from "../../src/Hydra.js";
import { Provider, Transaction, Wallet } from "@lucid-evolution/core-types";
import { Lucid, LucidEvolution } from "../../../lucid/src/index.js";

export type HydraConfiguration = {
  tmpdir: string;
  alicePort: number;
  bobPort: number;
  participantKeys: {
    aliceHydra: string;
    aliceNode: string;
    aliceFunds: string;
    bobHydra: string;
    bobNode: string;
    bobFunds: string;
  };
};

export type TestWallets = {
  cardano: {
    aliceNode: LucidEvolution;
    aliceFunds: LucidEvolution;
    bobNode: LucidEvolution;
    bobFunds: LucidEvolution;
  };
  hydra: {
    aliceFunds: LucidEvolution;
    bobFunds: LucidEvolution;
  };
};

export function generateRandomHydraConfiguration(): HydraConfiguration {
  const randomSuffix = Math.random().toString(36).substring(2, 10);
  return {
    tmpdir: `${os.tmpdir()}/hydra-${randomSuffix}`,
    alicePort: Math.floor(Math.random() * 10000) + 10000,
    bobPort: Math.floor(Math.random() * 10000) + 20000,
    participantKeys: {
      aliceHydra: CML.PrivateKey.generate_ed25519().to_bech32(),
      aliceNode: CML.PrivateKey.generate_ed25519().to_bech32(),
      aliceFunds: CML.PrivateKey.generate_ed25519().to_bech32(),
      bobHydra: CML.PrivateKey.generate_ed25519().to_bech32(),
      bobNode: CML.PrivateKey.generate_ed25519().to_bech32(),
      bobFunds: CML.PrivateKey.generate_ed25519().to_bech32(),
    },
  };
}

export function createHydraConfigurationFiles(config: HydraConfiguration) {
  fs.mkdirSync(config.tmpdir, { recursive: true });

  for (const participant in config.participantKeys) {
    const key =
      config.participantKeys[
        participant as keyof typeof config.participantKeys
      ];

    const privateKey = CML.PrivateKey.from_bech32(key);
    const publicKey = privateKey.to_public();

    fs.writeFileSync(
      `${config.tmpdir}/${participant}SK.json`,
      JSON.stringify({
        type: participant.endsWith("Hydra")
          ? "HydraSigningKey_ed25519"
          : "PaymentSigningKeyShelley_ed25519",
        description: "",
        cborHex: `5820${Buffer.from(privateKey.to_raw_bytes()).toString("hex")}`,
      })
    );
    fs.writeFileSync(
      `${config.tmpdir}/${participant}VK.json`,
      JSON.stringify({
        type: participant.endsWith("Hydra")
          ? "HydraVerificationKey_ed25519"
          : "PaymentVerificationKeyShelley_ed25519",
        description: "",
        cborHex: `5820${Buffer.from(publicKey.to_raw_bytes()).toString("hex")}`,
      })
    );
  }
  fs.writeFileSync(
    `${config.tmpdir}/protocol-parameters.json`,
    JSON.stringify(protocolParameters)
  );
}

export async function startHydraNode(
  hydraScriptTxIds: string,
  config: HydraConfiguration
) {
  const controller = new AbortController();
  const { signal } = controller;

  // Create two random node folder and ports
  const tempDir = config.tmpdir;
  const node1Dir = `${tempDir}/alice-node-persistence`;
  const node2Dir = `${tempDir}/bob-node-persistence`;
  const node1Port = config.alicePort;
  const node2Port = config.bobPort;
  fs.mkdirSync(node1Dir, { recursive: true });
  fs.mkdirSync(node2Dir, { recursive: true });

  // Make hydra and cardano keys for alice and bob in the temporary directory// Start Hydra node 1
  exec(
    `hydra-node \\
            --node-id Alice --listen 127.0.0.1:${node1Port + 1000} --api-port ${node1Port} \\
            --advertise 127.0.0.1:${node1Port + 1000} \\
            --peer 127.0.0.1:${node2Port + 1000} \\
            --hydra-signing-key ${tempDir}/aliceHydraSK.json \\
            --cardano-signing-key ${tempDir}/aliceNodeSK.json \\
            --hydra-verification-key ${tempDir}/bobHydraVK.json \\
            --cardano-verification-key ${tempDir}/bobNodeVK.json \\
            --hydra-scripts-tx-id ${hydraScriptTxIds} \\
            --persistence-dir ${node1Dir} \\
            --ledger-protocol-parameters ${tempDir}/protocol-parameters.json \\
            --testnet-magic 42 \\
            --node-socket ~/.yaci-cli/local-clusters/default/node/node.sock \\
            --contestation-period 3 &`,
    { signal }
  );

  // Start Hydra node 2
  exec(
    `hydra-node \\
            --node-id Bob --listen 127.0.0.1:${node2Port + 1000} --api-port ${node2Port} \\
            --advertise 127.0.0.1:${node2Port + 1000} \\
            --peer 127.0.0.1:${node1Port + 1000}\\
            --hydra-signing-key ${tempDir}/bobHydraSK.json \\
            --cardano-signing-key ${tempDir}/bobNodeSK.json \\
            --hydra-verification-key ${tempDir}/aliceHydraVK.json \\
            --cardano-verification-key ${tempDir}/aliceNodeVK.json \\
            --hydra-scripts-tx-id ${hydraScriptTxIds} \\
            --persistence-dir ${node2Dir} \\
            --ledger-protocol-parameters ${tempDir}/protocol-parameters.json \\
            --testnet-magic 42 \\
            --node-socket ~/.yaci-cli/local-clusters/default/node/node.sock \\
            --contestation-period 3 &`,
    { signal }
  );

  // On exit remove the temporary directory
  signal.addEventListener("abort", () => {
    fs.rmSync(node1Dir, { recursive: true });
    fs.rmSync(node2Dir, { recursive: true });
  });

  // Check if the nodes are running
  const node = new Node(`ws://localhost:${node1Port}`);
  await node.connect();
  while (node.status !== "IDLE") {
    await sleep(100);
  }

  return controller;
}

export async function publishHydraScripts(faucetSk: string) {
  fs.writeFileSync(
    `${os.tmpdir()}/faucetSk.json`,
    JSON.stringify({
      type: "PaymentSigningKeyShelley_ed25519",
      description: "",
      cborHex: `5820${Buffer.from(CML.PrivateKey.from_bech32(faucetSk).to_raw_bytes()).toString("hex")}`,
    })
  );
  return new Promise<string>((resolve) =>
    exec(`hydra-node publish-scripts \\
            --testnet-magic 42 \\
            --node-socket ~/.yaci-cli/local-clusters/default/node/node.sock \\
            --cardano-signing-key ${os.tmpdir()}/faucetSk.json`).stdout!.on(
      "data",
      (data) => {
        resolve(data.trim() as string);
      }
    )
  );
}

export async function getTestWallets(
  cardanoProvider: Provider,
  hydraProvider: Provider,
  config: HydraConfiguration
): Promise<TestWallets> {
  const createLucid = async (provider: Provider, key: string) => {
    const lucid = await Lucid(provider, "Preprod");
    lucid.selectWallet.fromPrivateKey(key);
    return lucid;
  };
  return {
    cardano: {
      aliceNode: await createLucid(
        cardanoProvider,
        config.participantKeys.aliceNode
      ),
      aliceFunds: await createLucid(
        cardanoProvider,
        config.participantKeys.aliceFunds
      ),
      bobNode: await createLucid(
        cardanoProvider,
        config.participantKeys.bobNode
      ),
      bobFunds: await createLucid(
        cardanoProvider,
        config.participantKeys.bobFunds
      ),
    },
    hydra: {
      aliceFunds: await createLucid(
        hydraProvider,
        config.participantKeys.aliceFunds
      ),
      bobFunds: await createLucid(
        hydraProvider,
        config.participantKeys.bobFunds
      ),
    },
  };
}

export async function signCommitTransaction(
  unwitnessedTransaction: Transaction,
  lucid: LucidEvolution
) {
  const unsignedTx = CML.Transaction.from_cbor_hex(unwitnessedTransaction);

  const witnessSet = unsignedTx.witness_set();

  witnessSet.add_all_witnesses(await lucid.wallet().signTx(unsignedTx));

  const signedTx = CML.Transaction.new(
    unsignedTx.body(),
    witnessSet,
    true,
    unsignedTx.auxiliary_data()
  );

  return signedTx.to_cbor_hex() as Transaction;
}

const protocolParameters = {
  collateralPercentage: 150,
  committeeMaxTermLength: 146,
  committeeMinSize: 7,
  costModels: {
    PlutusV1: [
      100788, 420, 1, 1, 1000, 173, 0, 1, 1000, 59957, 4, 1, 11183, 32, 201305,
      8356, 4, 16000, 100, 16000, 100, 16000, 100, 16000, 100, 16000, 100,
      16000, 100, 100, 100, 16000, 100, 94375, 32, 132994, 32, 61462, 4, 72010,
      178, 0, 1, 22151, 32, 91189, 769, 4, 2, 85848, 228465, 122, 0, 1, 1, 1000,
      42921, 4, 2, 24548, 29498, 38, 1, 898148, 27279, 1, 51775, 558, 1, 39184,
      1000, 60594, 1, 141895, 32, 83150, 32, 15299, 32, 76049, 1, 13169, 4,
      22100, 10, 28999, 74, 1, 28999, 74, 1, 43285, 552, 1, 44749, 541, 1,
      33852, 32, 68246, 32, 72362, 32, 7243, 32, 7391, 32, 11546, 32, 85848,
      228465, 122, 0, 1, 1, 90434, 519, 0, 1, 74433, 32, 85848, 228465, 122, 0,
      1, 1, 85848, 228465, 122, 0, 1, 1, 270652, 22588, 4, 1457325, 64566, 4,
      20467, 1, 4, 0, 141992, 32, 100788, 420, 1, 1, 81663, 32, 59498, 32,
      20142, 32, 24588, 32, 20744, 32, 25933, 32, 24623, 32, 53384111, 14333,
      10,
    ],
    PlutusV2: [
      100788, 420, 1, 1, 1000, 173, 0, 1, 1000, 59957, 4, 1, 11183, 32, 201305,
      8356, 4, 16000, 100, 16000, 100, 16000, 100, 16000, 100, 16000, 100,
      16000, 100, 100, 100, 16000, 100, 94375, 32, 132994, 32, 61462, 4, 72010,
      178, 0, 1, 22151, 32, 91189, 769, 4, 2, 85848, 228465, 122, 0, 1, 1, 1000,
      42921, 4, 2, 24548, 29498, 38, 1, 898148, 27279, 1, 51775, 558, 1, 39184,
      1000, 60594, 1, 141895, 32, 83150, 32, 15299, 32, 76049, 1, 13169, 4,
      22100, 10, 28999, 74, 1, 28999, 74, 1, 43285, 552, 1, 44749, 541, 1,
      33852, 32, 68246, 32, 72362, 32, 7243, 32, 7391, 32, 11546, 32, 85848,
      228465, 122, 0, 1, 1, 90434, 519, 0, 1, 74433, 32, 85848, 228465, 122, 0,
      1, 1, 85848, 228465, 122, 0, 1, 1, 955506, 213312, 0, 2, 270652, 22588, 4,
      1457325, 64566, 4, 20467, 1, 4, 0, 141992, 32, 100788, 420, 1, 1, 81663,
      32, 59498, 32, 20142, 32, 24588, 32, 20744, 32, 25933, 32, 24623, 32,
      43053543, 10, 53384111, 14333, 10, 43574283, 26308, 10,
    ],
    PlutusV3: [
      100788, 420, 1, 1, 1000, 173, 0, 1, 1000, 59957, 4, 1, 11183, 32, 201305,
      8356, 4, 16000, 100, 16000, 100, 16000, 100, 16000, 100, 16000, 100,
      16000, 100, 100, 100, 16000, 100, 94375, 32, 132994, 32, 61462, 4, 72010,
      178, 0, 1, 22151, 32, 91189, 769, 4, 2, 85848, 123203, 7305, -900, 1716,
      549, 57, 85848, 0, 1, 1, 1000, 42921, 4, 2, 24548, 29498, 38, 1, 898148,
      27279, 1, 51775, 558, 1, 39184, 1000, 60594, 1, 141895, 32, 83150, 32,
      15299, 32, 76049, 1, 13169, 4, 22100, 10, 28999, 74, 1, 28999, 74, 1,
      43285, 552, 1, 44749, 541, 1, 33852, 32, 68246, 32, 72362, 32, 7243, 32,
      7391, 32, 11546, 32, 85848, 123203, 7305, -900, 1716, 549, 57, 85848, 0,
      1, 90434, 519, 0, 1, 74433, 32, 85848, 123203, 7305, -900, 1716, 549, 57,
      85848, 0, 1, 1, 85848, 123203, 7305, -900, 1716, 549, 57, 85848, 0, 1,
      955506, 213312, 0, 2, 270652, 22588, 4, 1457325, 64566, 4, 20467, 1, 4, 0,
      141992, 32, 100788, 420, 1, 1, 81663, 32, 59498, 32, 20142, 32, 24588, 32,
      20744, 32, 25933, 32, 24623, 32, 43053543, 10, 53384111, 14333, 10,
      43574283, 26308, 10, 16000, 100, 16000, 100, 962335, 18, 2780678, 6,
      442008, 1, 52538055, 3756, 18, 267929, 18, 76433006, 8868, 18, 52948122,
      18, 1995836, 36, 3227919, 12, 901022, 1, 166917843, 4307, 36, 284546, 36,
      158221314, 26549, 36, 74698472, 36, 333849714, 1, 254006273, 72, 2174038,
      72, 2261318, 64571, 4, 207616, 8310, 4, 1293828, 28716, 63, 0, 1, 1006041,
      43623, 251, 0, 1, 100181, 726, 719, 0, 1, 100181, 726, 719, 0, 1, 100181,
      726, 719, 0, 1, 107878, 680, 0, 1, 95336, 1, 281145, 18848, 0, 1, 180194,
      159, 1, 1, 158519, 8942, 0, 1, 159378, 8813, 0, 1, 107490, 3298, 1,
      106057, 655, 1, 1964219, 24520, 3,
    ],
  },
  dRepActivity: 20,
  dRepDeposit: 500000000,
  dRepVotingThresholds: {
    committeeNoConfidence: 0.6,
    committeeNormal: 0.67,
    hardForkInitiation: 0.6,
    motionNoConfidence: 0.67,
    ppEconomicGroup: 0.67,
    ppGovGroup: 0.75,
    ppNetworkGroup: 0.67,
    ppTechnicalGroup: 0.67,
    treasuryWithdrawal: 0.67,
    updateToConstitution: 0.75,
  },
  executionUnitPrices: {
    priceMemory: 0,
    priceSteps: 0,
  },
  govActionDeposit: 100000000000,
  govActionLifetime: 6,
  maxBlockBodySize: 90112,
  maxBlockExecutionUnits: {
    memory: 62000000,
    steps: 20000000000,
  },
  maxBlockHeaderSize: 1100,
  maxCollateralInputs: 3,
  maxTxExecutionUnits: {
    memory: 14000000,
    steps: 10000000000,
  },
  maxTxSize: 16384,
  maxValueSize: 5000,
  minFeeRefScriptCostPerByte: 15,
  minPoolCost: 170000000,
  monetaryExpansion: 3.0e-3,
  poolPledgeInfluence: 0.3,
  poolRetireMaxEpoch: 18,
  poolVotingThresholds: {
    committeeNoConfidence: 0.51,
    committeeNormal: 0.51,
    hardForkInitiation: 0.51,
    motionNoConfidence: 0.51,
    ppSecurityGroup: 0.51,
  },
  protocolVersion: {
    major: 10,
    minor: 0,
  },
  stakeAddressDeposit: 2000000,
  stakePoolDeposit: 500000000,
  stakePoolTargetNum: 500,
  treasuryCut: 0.2,
  txFeeFixed: 0,
  txFeePerByte: 0,
  utxoCostPerByte: 4310,
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}