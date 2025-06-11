/**
 * Type definitions for configuration objects to allow flexible values
 * while maintaining structure compatibility.
 */
export type NodeConfig = {
  readonly Protocol: string;
  readonly ByronGenesisFile: string;
  readonly ShelleyGenesisFile: string;
  readonly AlonzoGenesisFile: string;
  readonly ConwayGenesisFile: string;
  readonly ApplicationName: string;
  readonly ApplicationVersion: number;
  readonly MaxKnownMajorProtocolVersion: number;
  readonly "LastKnownBlockVersion-Alt": number;
  readonly "LastKnownBlockVersion-Major": number;
  readonly "LastKnownBlockVersion-Minor": number;
  readonly TestShelleyHardForkAtEpoch: number;
  readonly TestAllegraHardForkAtEpoch: number;
  readonly TestMaryHardForkAtEpoch: number;
  readonly TestAlonzoHardForkAtEpoch: number;
  readonly TestBabbageHardForkAtEpoch: number;
  readonly TestConwayHardForkAtEpoch: number;
  readonly RequiresNetworkMagic: string;
  readonly minSeverity: string;
  readonly defaultBackends: ReadonlyArray<string>;
  readonly defaultScribes: ReadonlyArray<ReadonlyArray<string>>;
  readonly setupBackends: ReadonlyArray<string>;
  readonly setupScribes: ReadonlyArray<{
    readonly scFormat: string;
    readonly scKind: string;
    readonly scName: string;
    readonly scRotation: null;
  }>;
  readonly TurnOnLogMetrics: boolean;
  readonly TurnOnLogging: boolean;
  readonly TracingVerbosity: string;
  readonly TraceBlockFetchClient: boolean;
  readonly TraceBlockFetchDecisions: boolean;
  readonly TraceBlockFetchProtocol: boolean;
  readonly TraceBlockFetchProtocolSerialised: boolean;
  readonly TraceBlockFetchServer: boolean;
  readonly TraceChainDb: boolean;
  readonly TraceChainSyncBlockServer: boolean;
  readonly TraceChainSyncClient: boolean;
  readonly TraceChainSyncHeaderServer: boolean;
  readonly TraceChainSyncProtocol: boolean;
  readonly TraceDNSResolver: boolean;
  readonly TraceDNSSubscription: boolean;
  readonly TraceErrorPolicy: boolean;
  readonly TraceForge: boolean;
  readonly TraceHandshake: boolean;
  readonly TraceIpSubscription: boolean;
  readonly TraceLocalChainSyncProtocol: boolean;
  readonly TraceLocalErrorPolicy: boolean;
  readonly TraceLocalHandshake: boolean;
  readonly TraceLocalTxSubmissionProtocol: boolean;
  readonly TraceLocalTxSubmissionServer: boolean;
  readonly TraceMempool: boolean;
  readonly TraceMux: boolean;
  readonly TraceOptions: Record<string, unknown>;
  readonly TraceTxInbound: boolean;
  readonly TraceTxOutbound: boolean;
  readonly TraceTxSubmissionProtocol: boolean;
  readonly hasEKG: number;
  readonly hasPrometheus: ReadonlyArray<string | number>;
  readonly options: {
    readonly mapBackends: Record<string, ReadonlyArray<string>>;
    readonly mapSubtrace: Record<string, { readonly subtrace: string }>;
  };
  readonly ExperimentalHardForksEnabled: boolean;
  readonly ExperimentalProtocolsEnabled: boolean;
};

export type ByronGenesis = {
  readonly protocolConsts: {
    readonly k: number;
    readonly protocolMagic: number;
  };
  readonly startTime: number;
  readonly blockVersionData: {
    readonly scriptVersion: number;
    readonly slotDuration: string;
    readonly maxBlockSize: string;
    readonly maxHeaderSize: string;
    readonly maxTxSize: string;
    readonly maxProposalSize: string;
    readonly mpcThd: string;
    readonly heavyDelThd: string;
    readonly updateVoteThd: string;
    readonly updateProposalThd: string;
    readonly updateImplicit: string;
    readonly softforkRule: {
      readonly initThd: string;
      readonly minThd: string;
      readonly thdDecrement: string;
    };
    readonly txFeePolicy: {
      readonly summand: string;
      readonly multiplier: string;
    };
    readonly unlockStakeEpoch: string;
  };
  readonly bootStakeholders: Record<string, number>;
  readonly heavyDelegation: Record<string, unknown>;
  readonly nonAvvmBalances: Record<string, unknown>;
  readonly avvmDistr: Record<string, unknown>;
};

export type ShelleyGenesis = {
  readonly epochLength: number;
  readonly activeSlotsCoeff: number;
  readonly slotLength: number;
  readonly securityParam: number;
  readonly genDelegs: Record<string, unknown>;
  readonly initialFunds: Record<string, number>;
  readonly maxKESEvolutions: number;
  readonly maxLovelaceSupply: number;
  readonly networkId: string;
  readonly networkMagic: number;
  readonly protocolParams: {
    readonly a0: number;
    readonly decentralisationParam: number;
    readonly eMax: number;
    readonly extraEntropy: {
      readonly tag: string;
    };
    readonly keyDeposit: number;
    readonly maxBlockBodySize: number;
    readonly maxBlockHeaderSize: number;
    readonly maxTxSize: number;
    readonly minFeeA: number;
    readonly minFeeB: number;
    readonly minPoolCost: number;
    readonly minUTxOValue: number;
    readonly nOpt: number;
    readonly poolDeposit: number;
    readonly protocolVersion: {
      readonly major: number;
      readonly minor: number;
    };
    readonly rho: number;
    readonly tau: number;
  };
  readonly slotsPerKESPeriod: number;
  readonly staking: {
    readonly pools: Record<
      string,
      {
        readonly cost: number;
        readonly margin: number;
        readonly metadata: null;
        readonly owners: ReadonlyArray<unknown>;
        readonly pledge: number;
        readonly publicKey: string;
        readonly relays: ReadonlyArray<unknown>;
        readonly rewardAccount: {
          readonly credential: {
            readonly "key hash": string;
          };
          readonly network: string;
        };
        readonly vrf: string;
      }
    >;
    readonly stake: Record<string, string>;
  };
  readonly systemStart: string;
  readonly updateQuorum: number;
};

export type AlonzoGenesis = {
  readonly lovelacePerUTxOWord: number;
  readonly executionPrices: {
    readonly prSteps: {
      readonly numerator: number;
      readonly denominator: number;
    };
    readonly prMem: {
      readonly numerator: number;
      readonly denominator: number;
    };
  };
  readonly maxTxExUnits: {
    readonly exUnitsMem: number;
    readonly exUnitsSteps: number;
  };
  readonly maxBlockExUnits: {
    readonly exUnitsMem: number;
    readonly exUnitsSteps: number;
  };
  readonly maxValueSize: number;
  readonly collateralPercentage: number;
  readonly maxCollateralInputs: number;
  readonly costModels: {
    readonly PlutusV1: ReadonlyArray<number>;
    readonly PlutusV2: ReadonlyArray<number>;
  };
};

export type ConwayGenesis = {
  readonly poolVotingThresholds: {
    readonly committeeNormal: number;
    readonly committeeNoConfidence: number;
    readonly hardForkInitiation: number;
    readonly motionNoConfidence: number;
    readonly ppSecurityGroup: number;
  };
  readonly dRepVotingThresholds: {
    readonly motionNoConfidence: number;
    readonly committeeNormal: number;
    readonly committeeNoConfidence: number;
    readonly updateToConstitution: number;
    readonly hardForkInitiation: number;
    readonly ppNetworkGroup: number;
    readonly ppEconomicGroup: number;
    readonly ppTechnicalGroup: number;
    readonly ppGovGroup: number;
    readonly treasuryWithdrawal: number;
  };
  readonly committeeMinSize: number;
  readonly committeeMaxTermLength: number;
  readonly govActionLifetime: number;
  readonly govActionDeposit: number;
  readonly dRepDeposit: number;
  readonly dRepActivity: number;
  readonly minFeeRefScriptCostPerByte: number;
  readonly plutusV3CostModel: ReadonlyArray<number>;
  readonly constitution: {
    readonly anchor: {
      readonly url: string;
      readonly dataHash: string;
    };
  };
  readonly committee: {
    readonly members: Record<string, unknown>;
    readonly threshold: number;
  };
};

export type KesKey = {
  readonly type: string;
  readonly description: string;
  readonly cborHex: string;
};

export type OpCert = {
  readonly type: string;
  readonly description: string;
  readonly cborHex: string;
};

export type VrfSkey = {
  readonly type: string;
  readonly description: string;
  readonly cborHex: string;
};

/**
 * Configuration interface for Kupo - A fast, lightweight & configurable chain-index
 *
 * @since 2.0.0
 * @category model
 */
export interface KupoConfig {
  readonly enabled?: boolean;
  readonly image?: string;
  readonly port?: number;
  readonly logLevel?: "Debug" | "Info" | "Notice" | "Warning" | "Error";
  readonly match?: string;
  readonly deferDbIndexes?: boolean;
  readonly since?: string;
}

/**
 * Configuration interface for Ogmios - A lightweight bridge interface for Cardano
 *
 * @since 2.0.0
 * @category model
 */
export interface OgmiosConfig {
  readonly enabled?: boolean;
  readonly image?: string;
  readonly port?: number;
  readonly logLevel?: "debug" | "info" | "notice" | "warning" | "error";
}

/**
 * Configuration interface for Cardano DevNet setup.
 * All properties are optional, with sensible defaults provided.
 *
 * @since 2.0.0
 * @category model
 */
export interface DevNetConfig {
  readonly clusterName?: string;
  readonly image?: string;
  readonly ports?: {
    readonly node: number;
    readonly submit: number;
  };
  readonly networkMagic?: number;
  readonly nodeConfig?: Partial<NodeConfig>;
  readonly byronGenesis?: Partial<ByronGenesis>;
  readonly shelleyGenesis?: Partial<ShelleyGenesis>;
  readonly alonzoGenesis?: Partial<AlonzoGenesis>;
  readonly conwayGenesis?: Partial<ConwayGenesis>;
  readonly kesKey?: Partial<KesKey>;
  readonly opCert?: Partial<OpCert>;
  readonly vrfSkey?: Partial<VrfSkey>;
  readonly kupo?: KupoConfig;
  readonly ogmios?: OgmiosConfig;
}

/**
 * Default node configuration constants for Cardano DevNet.
 * These settings control the behavior of the Cardano node including
 * protocol parameters, logging, tracing, and hard fork schedules.
 *
 * @since 2.0.0
 * @category constants
 */
export const DEFAULT_NODE_CONFIG = {
  Protocol: "Cardano",
  ByronGenesisFile: "genesis-byron.json",
  ShelleyGenesisFile: "genesis-shelley.json",
  AlonzoGenesisFile: "genesis-alonzo.json",
  ConwayGenesisFile: "genesis-conway.json",
  ApplicationName: "cardano-sl",
  ApplicationVersion: 1,
  MaxKnownMajorProtocolVersion: 2,
  "LastKnownBlockVersion-Alt": 0,
  "LastKnownBlockVersion-Major": 6,
  "LastKnownBlockVersion-Minor": 0,
  TestShelleyHardForkAtEpoch: 0,
  TestAllegraHardForkAtEpoch: 0,
  TestMaryHardForkAtEpoch: 0,
  TestAlonzoHardForkAtEpoch: 0,
  TestBabbageHardForkAtEpoch: 0,
  TestConwayHardForkAtEpoch: 0,
  RequiresNetworkMagic: "RequiresNoMagic",
  minSeverity: "Info",
  defaultBackends: ["KatipBK"],
  defaultScribes: [["StdoutSK", "stdout"]],
  setupBackends: ["KatipBK"],
  setupScribes: [
    {
      scFormat: "ScJson",
      scKind: "StdoutSK",
      scName: "stdout",
      scRotation: null,
    },
  ],
  TurnOnLogMetrics: true,
  TurnOnLogging: true,
  TracingVerbosity: "NormalVerbosity",
  TraceBlockFetchClient: false,
  TraceBlockFetchDecisions: false,
  TraceBlockFetchProtocol: false,
  TraceBlockFetchProtocolSerialised: false,
  TraceBlockFetchServer: false,
  TraceChainDb: true,
  TraceChainSyncBlockServer: false,
  TraceChainSyncClient: false,
  TraceChainSyncHeaderServer: false,
  TraceChainSyncProtocol: false,
  TraceDNSResolver: false,
  TraceDNSSubscription: false,
  TraceErrorPolicy: false,
  TraceForge: true,
  TraceHandshake: false,
  TraceIpSubscription: false,
  TraceLocalChainSyncProtocol: true,
  TraceLocalErrorPolicy: false,
  TraceLocalHandshake: false,
  TraceLocalTxSubmissionProtocol: true,
  TraceLocalTxSubmissionServer: true,
  TraceMempool: true, // Enables mempool tracing including RisingEdge/FallingEdgeWith timing events
  TraceMux: false,
  TraceOptions: {},
  TraceTxInbound: false,
  TraceTxOutbound: false,
  TraceTxSubmissionProtocol: false,
  hasEKG: 12788,
  hasPrometheus: ["0.0.0.0", 12798],
  options: {
    mapBackends: {
      "cardano.node.metrics": ["EKGViewBK"],
      "cardano.node.resources": ["EKGViewBK"],
    },
    mapSubtrace: {
      "cardano.node.metrics": {
        subtrace: "Neutral",
      },
    },
  },
  ExperimentalHardForksEnabled: true,
  ExperimentalProtocolsEnabled: true,
} as const;

/**
 * Default Byron genesis configuration for Cardano DevNet.
 * Contains protocol constants and initial blockchain state for the Byron era.
 *
 * @since 2.0.0
 * @category constants
 */
export const DEFAULT_BYRON_GENESIS = {
  protocolConsts: {
    k: 2160,
    protocolMagic: 42,
  },
  startTime: Math.floor(new Date(Date.now()).getTime() / 1000),
  blockVersionData: {
    scriptVersion: 0,
    slotDuration: "250",
    maxBlockSize: "2000000",
    maxHeaderSize: "2000000",
    maxTxSize: "4096",
    maxProposalSize: "700",
    mpcThd: "20000000000000",
    heavyDelThd: "300000000000",
    updateVoteThd: "1000000000000",
    updateProposalThd: "100000000000000",
    updateImplicit: "10000",
    softforkRule: {
      initThd: "900000000000000",
      minThd: "600000000000000",
      thdDecrement: "50000000000000",
    },
    txFeePolicy: {
      summand: "155381000000000",
      multiplier: "43000000000",
    },
    unlockStakeEpoch: "18446744073709551615",
  },
  bootStakeholders: {
    "7a4519c93d7be4577dd85bd524c644e6b809e44eae0457b43128c1c7": 1,
  },
  heavyDelegation: {},
  nonAvvmBalances: {},
  avvmDistr: {},
} as const;

/**
 * Default Shelley genesis configuration for Cardano DevNet.
 * Contains protocol parameters, initial funds, staking configuration, and network settings.
 *
 * @since 2.0.0
 * @category constants
 */
export const DEFAULT_SHELLEY_GENESIS = {
  epochLength: 432000,
  activeSlotsCoeff: 1.0,
  slotLength: 1,
  securityParam: 2160,
  genDelegs: {},
  initialFunds: {
    "00813c32c92aad21770ff8001de0918f598df8c06775f77f8e8839d2a0074a515f7f32bf31a4f41c7417a8136e8152bfb42f06d71b389a6896": 900000000000,
    "609783be7d3c54f11377966dfabc9284cd6c32fca1cd42ef0a4f1cc45b": 900000000000,
  },
  maxKESEvolutions: 60,
  maxLovelaceSupply: 2000000000000,
  networkId: "Testnet",
  networkMagic: 42,
  protocolParams: {
    a0: 0.0,
    decentralisationParam: 0,
    eMax: 18,
    extraEntropy: {
      tag: "NeutralNonce",
    },
    keyDeposit: 0,
    maxBlockBodySize: 65536,
    maxBlockHeaderSize: 1100,
    maxTxSize: 16384,
    minFeeA: 44,
    minFeeB: 155381,
    minPoolCost: 0,
    minUTxOValue: 0,
    nOpt: 100,
    poolDeposit: 0,
    protocolVersion: {
      major: 10,
      minor: 0,
    },
    rho: 0.1,
    tau: 0.1,
  },
  slotsPerKESPeriod: 129600,
  staking: {
    pools: {
      "8a219b698d3b6e034391ae84cee62f1d76b6fbc45ddfe4e31e0d4b60": {
        cost: 0,
        margin: 0.0,
        metadata: null,
        owners: [],
        pledge: 0,
        publicKey: "8a219b698d3b6e034391ae84cee62f1d76b6fbc45ddfe4e31e0d4b60",
        relays: [],
        rewardAccount: {
          credential: {
            "key hash":
              "b6ffb20cf821f9286802235841d4348a2c2bafd4f73092b7de6655ea",
          },
          network: "Testnet",
        },
        vrf: "fec17ed60cbf2ec5be3f061fb4de0b6ef1f20947cfbfce5fb2783d12f3f69ff5",
      },
    },
    stake: {
      "074a515f7f32bf31a4f41c7417a8136e8152bfb42f06d71b389a6896":
        "8a219b698d3b6e034391ae84cee62f1d76b6fbc45ddfe4e31e0d4b60",
    },
  },
  systemStart: new Date().toISOString(),
  updateQuorum: 2,
} as const;

/**
 * Default Alonzo genesis configuration for Cardano DevNet.
 * Contains Plutus script execution parameters, cost models, and resource limits.
 *
 * @since 2.0.0
 * @category constants
 */
export const DEFAULT_ALONZO_GENESIS = {
  lovelacePerUTxOWord: 34482,
  executionPrices: {
    prSteps: {
      numerator: 721,
      denominator: 10000000,
    },
    prMem: {
      numerator: 577,
      denominator: 10000,
    },
  },
  maxTxExUnits: {
    exUnitsMem: 10000000,
    exUnitsSteps: 10000000000,
  },
  maxBlockExUnits: {
    exUnitsMem: 50000000,
    exUnitsSteps: 40000000000,
  },
  maxValueSize: 5000,
  collateralPercentage: 150,
  maxCollateralInputs: 3,
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
  },
} as const;

/**
 * Default Conway genesis configuration for Cardano DevNet.
 * Contains governance parameters, voting thresholds, and Plutus V3 cost models.
 *
 * @since 2.0.0
 * @category constants
 */
export const DEFAULT_CONWAY_GENESIS = {
  poolVotingThresholds: {
    committeeNormal: 0.6,
    committeeNoConfidence: 0.51,
    hardForkInitiation: 0.51,
    motionNoConfidence: 0.6,
    ppSecurityGroup: 0.6,
  },
  dRepVotingThresholds: {
    motionNoConfidence: 0.67,
    committeeNormal: 0.67,
    committeeNoConfidence: 0.6,
    updateToConstitution: 0.75,
    hardForkInitiation: 0.6,
    ppNetworkGroup: 0.67,
    ppEconomicGroup: 0.67,
    ppTechnicalGroup: 0.67,
    ppGovGroup: 0.75,
    treasuryWithdrawal: 0.67,
  },
  committeeMinSize: 0,
  committeeMaxTermLength: 73,
  govActionLifetime: 8,
  govActionDeposit: 50000000000,
  dRepDeposit: 500000000,
  dRepActivity: 20,
  minFeeRefScriptCostPerByte: 44,
  plutusV3CostModel: [
    100788, 420, 1, 1, 1000, 173, 0, 1, 1000, 59957, 4, 1, 11183, 32, 201305,
    8356, 4, 16000, 100, 16000, 100, 16000, 100, 16000, 100, 16000, 100, 16000,
    100, 100, 100, 16000, 100, 94375, 32, 132994, 32, 61462, 4, 72010, 178, 0,
    1, 22151, 32, 91189, 769, 4, 2, 85848, 123203, 7305, -900, 1716, 549, 57,
    85848, 0, 1, 1, 1000, 42921, 4, 2, 24548, 29498, 38, 1, 898148, 27279, 1,
    51775, 558, 1, 39184, 1000, 60594, 1, 141895, 32, 83150, 32, 15299, 32,
    76049, 1, 13169, 4, 22100, 10, 28999, 74, 1, 28999, 74, 1, 43285, 552, 1,
    44749, 541, 1, 33852, 32, 68246, 32, 72362, 32, 7243, 32, 7391, 32, 11546,
    32, 85848, 123203, 7305, -900, 1716, 549, 57, 85848, 0, 1, 90434, 519, 0, 1,
    74433, 32, 85848, 123203, 7305, -900, 1716, 549, 57, 85848, 0, 1, 1, 85848,
    123203, 7305, -900, 1716, 549, 57, 85848, 0, 1, 955506, 213312, 0, 2,
    270652, 22588, 4, 1457325, 64566, 4, 20467, 1, 4, 0, 141992, 32, 100788,
    420, 1, 1, 81663, 32, 59498, 32, 20142, 32, 24588, 32, 20744, 32, 25933, 32,
    24623, 32, 43053543, 10, 53384111, 14333, 10, 43574283, 26308, 10, 16000,
    100, 16000, 100, 962335, 18, 2780678, 6, 442008, 1, 52538055, 3756, 18,
    267929, 18, 76433006, 8868, 18, 52948122, 18, 1995836, 36, 3227919, 12,
    901022, 1, 166917843, 4307, 36, 284546, 36, 158221314, 26549, 36, 74698472,
    36, 333849714, 1, 254006273, 72, 2174038, 72, 2261318, 64571, 4, 207616,
    8310, 4, 1293828, 28716, 63, 0, 1, 1006041, 43623, 251, 0, 1,
  ],
  constitution: {
    anchor: {
      url: "",
      dataHash:
        "0000000000000000000000000000000000000000000000000000000000000000",
    },
  },
  committee: {
    members: {},
    threshold: 0.66,
  },
} as const;

/**
 * Default KES (Key Evolving Signature) signing key for Cardano DevNet.
 * Used for block production and stake pool operations.
 *
 * @since 2.0.0
 * @category constants
 */
export const DEFAULT_KES_KEY = {
  type: "KesSigningKey_ed25519_kes_2^6",
  description: "KES Signing Key",
  cborHex:
    "590260a199f16b11da6c7f5c1e0f1eb0b9bbe278d3d8f35bfd50d0951c2ff94d0344cd57df5f64c9bac1dd60b4482f9c636168f40737d526625a2ec82f22ec0c72de0013f86ef743a7bba0286db6ddf3d85bf8e49ddbf14d9d3b7ee22f4857c77b740948f84f2e72f6bcf91f405e34ea50a2c53fa4876b43cfce2bcfe87c06a903de8bb33d968ca7930b67d0c23f5cb2d74e422d773ba80e388de384691000d6ba8a9b4dc7d3187f76048fbef9a52b72d80d835bb76eced7c0e0cdc5b58869b73c095dffa01db4ff51765afcead565395a5ed1cf74e5f2134d61076fece21aacd080bbbfaab94125401d7bbc74eafc7e7e3a2235f59dc03d6e332e53d558493a1e22213b92c77b1328ff1b83855da704fc366bf4415490602481d1939136eeaf252c65184912a779d9d94a90e32b72c1877ef60b6d79e707ce5a762acb4bed46436efe4fe62aae50b39068cc508a09427c92791cbcbea44318529cc68d297ca24e1b73b2394c385ec63fcd85ed56eec3de48860a1ec950aad4f91cbf741dbd7bf1d3c278875bd20e31ff5372339f6aa5280ad9b8bf3514889ac44600fe57ca0b535d6dc6b0b981e079595aad186ee0be9b07e837391ab165e4ca406601c876a86e246a3f53311e21199cccc0b080f28d18f4dc6987731e10e4ade00df7c6921c5ef3022b6f49a29ba307a2c8f4bd2ba42fcfa0aad68a2f0ad31fff69a99d3471f9036d3f5817a3edfeff7fc3c14e1151d767aaa043481cfd1a6ee55e8e5d7853ecdaf9da2bb36c716beae8d706bc648a790d4697e1d044a11a49f305ab8bc64a094bd81bda7395fe6f77dd5557c39919dd9bb9cf22a87fe47408ae3ec2247007d015a5",
} as const;

/**
 * Default node operational certificate for Cardano DevNet.
 * Certifies the stake pool's authority to produce blocks.
 *
 * @since 2.0.0
 * @category constants
 */
export const DEFAULT_OPCERT = {
  type: "NodeOperationalCertificate",
  description: "",
  cborHex:
    "828458204cd49bb05e9885142fe7af1481107995298771fd1a24e72b506a4d600ee2b3120000584089fc9e9f551b2ea873bf31643659d049152d5c8e8de86be4056370bccc5fa62dd12e3f152f1664e614763e46eaa7a17ed366b5cef19958773d1ab96941442e0b58205a3d778e76741a009e29d23093cfe046131808d34d7c864967b515e98dfc3583",
} as const;

/**
 * Default VRF (Verifiable Random Function) signing key for Cardano DevNet.
 * Used for leader election and randomness generation in the consensus protocol.
 *
 * @since 2.0.0
 * @category constants
 */
export const DEFAULT_VRF_SKEY = {
  type: "VrfSigningKey_PraosVRF",
  description: "VRF Signing Key",
  cborHex:
    "5840899795b70e9f34b737159fe21a6170568d6031e187f0cc84555c712b7c29b45cb882007593ef70f86e5c0948561a3b8e8851529a4f98975f2b24e768dda38ce2",
} as const;

/**
 * Default configuration for Kupo service
 *
 * @since 2.0.0
 * @category constants
 */
export const DEFAULT_KUPO_CONFIG: Required<KupoConfig> = {
  enabled: true,
  image: "cardanosolutions/kupo:v2.10.0",
  port: 1442,
  logLevel: "Info",
  match: "*",
  deferDbIndexes: true,
  since: "origin",
} as const;

/**
 * Default configuration for Ogmios service
 *
 * @since 2.0.0
 * @category constants
 */
export const DEFAULT_OGMIOS_CONFIG: Required<OgmiosConfig> = {
  enabled: true,
  image: "cardanosolutions/ogmios:v6.12.0",
  port: 1337,
  logLevel: "info",
} as const;

/**
 * Complete default configuration for Cardano DevNet.
 * Includes all required settings for running a local Cardano development network.
 *
 * @since 2.0.0
 * @category constants
 */
export const DEFAULT_DEVNET_CONFIG: Required<DevNetConfig> = {
  clusterName: "devnet",
  image: "ghcr.io/intersectmbo/cardano-node:10.4.1",
  ports: {
    node: 4001,
    submit: 8090,
  },
  networkMagic: 42,
  nodeConfig: DEFAULT_NODE_CONFIG,
  byronGenesis: DEFAULT_BYRON_GENESIS,
  shelleyGenesis: DEFAULT_SHELLEY_GENESIS,
  alonzoGenesis: DEFAULT_ALONZO_GENESIS,
  conwayGenesis: DEFAULT_CONWAY_GENESIS,
  kesKey: DEFAULT_KES_KEY,
  opCert: DEFAULT_OPCERT,
  vrfSkey: DEFAULT_VRF_SKEY,
  kupo: DEFAULT_KUPO_CONFIG,
  ogmios: DEFAULT_OGMIOS_CONFIG,
} as const;
