import { Data } from "@lucid-evolution/plutus";

export const PubKeyHashSchema = Data.Bytes();
export type PubKeyHashData = Data.Static<typeof PubKeyHashSchema>;
export const PubKeyHashData = PubKeyHashSchema as unknown as PubKeyHashData;

export const ScriptHashSchema = Data.Bytes();
export type ScriptHashData = Data.Static<typeof ScriptHashSchema>;
export const ScriptHashData = ScriptHashSchema as unknown as ScriptHashData;

export const DatumHashSchema = Data.Bytes();
export type DatumHashData = Data.Static<typeof DatumHashSchema>;
export const DatumHashData = DatumHashSchema as unknown as DatumHashData;

export const DatumSchema = Data.Any();
export type DatumData = Data.Static<typeof DatumSchema>;
export const DatumData = DatumSchema as unknown as DatumData;

export const RedeemerSchema = Data.Any();
export type RedeemerData = Data.Static<typeof RedeemerSchema>;
export const RedeemerData = RedeemerSchema as unknown as RedeemerData;

export const ChangedParametersSchema = Data.Any();
export type ChangedParametersData = Data.Static<typeof ChangedParametersSchema>;
export const ChangedParametersData =
  ChangedParametersSchema as unknown as ChangedParametersData;

export const TxIdSchema = Data.Bytes();
export type TxIdData = Data.Static<typeof TxIdSchema>;
export const TxIdData = TxIdSchema as unknown as TxIdData;

export const CurrencySymbolSchema = Data.Bytes();
export type CurrencySymbolData = Data.Static<typeof CurrencySymbolSchema>;
export const CurrencySymbolData =
  CurrencySymbolSchema as unknown as CurrencySymbolData;

export const TokenNameSchema = Data.Bytes();
export type TokenNameData = Data.Static<typeof TokenNameSchema>;
export const TokenNameData = TokenNameSchema as unknown as TokenNameData;

export const LovelaceSchema = Data.Integer();
export type LovelaceData = Data.Static<typeof LovelaceSchema>;
export const LovelaceData = LovelaceSchema as unknown as LovelaceData;

export const POSIXTimeSchema = Data.Integer();
export type POSIXTimeData = Data.Static<typeof POSIXTimeSchema>;
export const POSIXTimeData = POSIXTimeSchema as unknown as POSIXTimeData;

export const ClosureSchema = Data.Boolean();
export type ClosureData = Data.Static<typeof ClosureSchema>;
export const ClosureData = ClosureSchema as unknown as ClosureData;

export const RationalSchema = Data.Tuple([Data.Integer(), Data.Integer()], {
  hasConstr: true,
});
export type RationalData = Data.Static<typeof RationalSchema>;
export const RationalData = RationalSchema as unknown as RationalData;

export const ValueSchema = Data.Map(
  CurrencySymbolSchema,
  Data.Map(TokenNameSchema, Data.Integer()),
);
export type ValueData = Data.Static<typeof ValueSchema>;
export const ValueData = ValueSchema as unknown as ValueData;

export const MintValueSchema = Data.Map(
  CurrencySymbolSchema,
  Data.Map(TokenNameSchema, Data.Integer()),
);
export type MintValueData = Data.Static<typeof MintValueSchema>;
export const MintValueData = MintValueSchema as unknown as MintValueData;

export const CredentialSchema = Data.Enum([
  Data.Object({ PubKeyCredential: Data.Tuple([PubKeyHashSchema]) }),
  Data.Object({ ScriptCredential: Data.Tuple([ScriptHashSchema]) }),
]);
export type CredentialData = Data.Static<typeof CredentialSchema>;
export const CredentialData = CredentialSchema as unknown as CredentialData;

export const StakingCredentialSchema = Data.Enum([
  Data.Object({ StakingHash: Data.Tuple([CredentialSchema]) }),
  Data.Object({
    StakingPtr: Data.Tuple([Data.Integer(), Data.Integer(), Data.Integer()]),
  }),
]);
export type StakingCredentialData = Data.Static<typeof StakingCredentialSchema>;
export const StakingCredentialData =
  StakingCredentialSchema as unknown as StakingCredentialData;

export const AddressSchema = Data.Object({
  addressCredential: CredentialSchema,
  addressStakingCredential: Data.Nullable(StakingCredentialSchema),
});
export type AddressData = Data.Static<typeof AddressSchema>;
export const AddressData = AddressSchema as unknown as AddressData;

export const OutputDatumSchema = Data.Enum([
  Data.Literal("NoOutputDatum"),
  Data.Object({ OutputDatumHash: Data.Tuple([DatumHashSchema]) }),
  Data.Object({ OutputDatum: Data.Tuple([DatumSchema]) }),
]);
export type OutputDatumData = Data.Static<typeof OutputDatumSchema>;
export const OutputDatumData = OutputDatumSchema as unknown as OutputDatumData;

export const TxOutRefSchema = Data.Object({
  txOutRefId: TxIdSchema,
  txOutRefIdx: Data.Integer(),
});
export type TxOutRefData = Data.Static<typeof TxOutRefSchema>;
export const TxOutRefData = TxOutRefSchema as unknown as TxOutRefData;

export const TxOutSchema = Data.Object({
  txOutAddress: AddressSchema,
  txOutValue: ValueSchema,
  txOutDatum: OutputDatumSchema,
  txOutReferenceScript: Data.Nullable(ScriptHashSchema),
});
export type TxOutData = Data.Static<typeof TxOutSchema>;
export const TxOutData = TxOutSchema as unknown as TxOutData;

export const ExtendedPOSIXTimeSchema = Data.Enum([
  Data.Literal("NegInf"),
  Data.Object({ Finite: Data.Tuple([POSIXTimeSchema]) }),
  Data.Literal("PosInf"),
]);
export type ExtendedPOSIXTimeData = Data.Static<typeof ExtendedPOSIXTimeSchema>;
export const ExtendedPOSIXTimeData =
  ExtendedPOSIXTimeSchema as unknown as ExtendedPOSIXTimeData;

export const LowerBoundPOSIXTimeSchema = Data.Object({
  lowerBoundLimit: ExtendedPOSIXTimeSchema,
  lowerBoundClosed: ClosureSchema,
});
export type LowerBoundPOSIXTimeData = Data.Static<
  typeof LowerBoundPOSIXTimeSchema
>;
export const LowerBoundPOSIXTimeData =
  LowerBoundPOSIXTimeSchema as unknown as LowerBoundPOSIXTimeData;

export const UpperBoundPOSIXTimeSchema = Data.Object({
  upperBoundLimit: ExtendedPOSIXTimeSchema,
  upperBoundClosed: ClosureSchema,
});
export type UpperBoundPOSIXTimeData = Data.Static<
  typeof UpperBoundPOSIXTimeSchema
>;
export const UpperBoundPOSIXTimeData =
  UpperBoundPOSIXTimeSchema as unknown as UpperBoundPOSIXTimeData;

export const POSIXTimeRangeSchema = Data.Object({
  ivFrom: LowerBoundPOSIXTimeSchema,
  ivTo: UpperBoundPOSIXTimeSchema,
});
export type POSIXTimeRangeData = Data.Static<typeof POSIXTimeRangeSchema>;
export const POSIXTimeRangeData =
  POSIXTimeRangeSchema as unknown as POSIXTimeRangeData;

export const ColdCommitteeCredentialSchema = CredentialSchema;
export type ColdCommitteeCredentialData = Data.Static<
  typeof ColdCommitteeCredentialSchema
>;
export const ColdCommitteeCredentialData =
  ColdCommitteeCredentialSchema as unknown as ColdCommitteeCredentialData;

export const HotCommitteeCredentialSchema = CredentialSchema;
export type HotCommitteeCredentialData = Data.Static<
  typeof HotCommitteeCredentialSchema
>;
export const HotCommitteeCredentialData =
  HotCommitteeCredentialSchema as unknown as HotCommitteeCredentialData;

export const DRepCredentialSchema = CredentialSchema;
export type DRepCredentialData = Data.Static<typeof DRepCredentialSchema>;
export const DRepCredentialData =
  DRepCredentialSchema as unknown as DRepCredentialData;

export const DRepSchema = Data.Enum([
  Data.Object({ DRep: Data.Tuple([DRepCredentialSchema]) }),
  Data.Literal("DRepAlwaysAbstain"),
  Data.Literal("DRepAlwaysNoConfidence"),
]);
export type DRepData = Data.Static<typeof DRepSchema>;
export const DRepData = DRepSchema as unknown as DRepData;

export const DelegateeSchema = Data.Enum([
  Data.Object({ DelegStake: Data.Tuple([PubKeyHashSchema]) }),
  Data.Object({ DelegVote: Data.Tuple([DRepSchema]) }),
  Data.Object({ DelegStakeVote: Data.Tuple([PubKeyHashSchema, DRepSchema]) }),
]);
export type DelegateeData = Data.Static<typeof DelegateeSchema>;
export const DelegateeData = DelegateeSchema as unknown as DelegateeData;

export const TxCertSchema = Data.Enum([
  Data.Object({
    TxCertRegStaking: Data.Tuple([
      CredentialSchema,
      Data.Nullable(LovelaceSchema),
    ]),
  }),
  Data.Object({
    TxCertUnRegStaking: Data.Tuple([
      CredentialSchema,
      Data.Nullable(LovelaceSchema),
    ]),
  }),
  Data.Object({
    TxCertDelegStaking: Data.Tuple([CredentialSchema, DelegateeSchema]),
  }),
  Data.Object({
    TxCertRegDeleg: Data.Tuple([
      CredentialSchema,
      DelegateeSchema,
      LovelaceSchema,
    ]),
  }),
  Data.Object({
    TxCertRegDRep: Data.Tuple([DRepCredentialSchema, LovelaceSchema]),
  }),
  Data.Object({ TxCertUpdateDRep: Data.Tuple([DRepCredentialSchema]) }),
  Data.Object({
    TxCertUnRegDRep: Data.Tuple([DRepCredentialSchema, LovelaceSchema]),
  }),
  Data.Object({
    TxCertPoolRegister: Data.Tuple([PubKeyHashSchema, PubKeyHashSchema]),
  }),
  Data.Object({
    TxCertPoolRetire: Data.Tuple([PubKeyHashSchema, Data.Integer()]),
  }),
  Data.Object({
    TxCertAuthHotCommittee: Data.Tuple([
      ColdCommitteeCredentialSchema,
      HotCommitteeCredentialSchema,
    ]),
  }),
  Data.Object({
    TxCertResignColdCommittee: Data.Tuple([ColdCommitteeCredentialSchema]),
  }),
]);
export type TxCertData = Data.Static<typeof TxCertSchema>;
export const TxCertData = TxCertSchema as unknown as TxCertData;

export const VoterSchema = Data.Enum([
  Data.Object({
    CommitteeVoter: Data.Tuple([HotCommitteeCredentialSchema]),
  }),
  Data.Object({ DRepVoter: Data.Tuple([DRepCredentialSchema]) }),
  Data.Object({ StakePoolVoter: Data.Tuple([PubKeyHashSchema]) }),
]);
export type VoterData = Data.Static<typeof VoterSchema>;
export const VoterData = VoterSchema as unknown as VoterData;

export const VoteSchema = Data.Enum([
  Data.Literal("VoteNo"),
  Data.Literal("VoteYes"),
  Data.Literal("Abstain"),
]);
export type VoteData = Data.Static<typeof VoteSchema>;
export const VoteData = VoteSchema as unknown as VoteData;

export const GovernanceActionIdSchema = Data.Object({
  gaidTxId: TxIdSchema,
  gaidGovActionIx: Data.Integer(),
});
export type GovernanceActionIdData = Data.Static<
  typeof GovernanceActionIdSchema
>;
export const GovernanceActionIdData =
  GovernanceActionIdSchema as unknown as GovernanceActionIdData;

export const CommitteeSchema = Data.Object({
  committeeMembers: Data.Map(ColdCommitteeCredentialSchema, Data.Integer()),
  committeeQuorum: RationalSchema,
});
export type CommitteeData = Data.Static<typeof CommitteeSchema>;
export const CommitteeData = CommitteeSchema as unknown as CommitteeData;

export const ConstitutionSchema = Data.Object({
  constitutionScript: Data.Nullable(ScriptHashSchema),
});
export type ConstitutionData = Data.Static<typeof ConstitutionSchema>;
export const ConstitutionData =
  ConstitutionSchema as unknown as ConstitutionData;

export const ProtocolVersionSchema = Data.Object({
  pvMajor: Data.Integer(),
  pvMinor: Data.Integer(),
});
export type ProtocolVersionData = Data.Static<typeof ProtocolVersionSchema>;
export const ProtocolVersionData =
  ProtocolVersionSchema as unknown as ProtocolVersionData;

export const GovernanceActionSchema = Data.Enum([
  Data.Object({
    ParameterChange: Data.Tuple([
      Data.Nullable(GovernanceActionIdSchema),
      ChangedParametersSchema,
      Data.Nullable(ScriptHashSchema),
    ]),
  }),
  Data.Object({
    HardForkInitiation: Data.Tuple([
      Data.Nullable(GovernanceActionIdSchema),
      ProtocolVersionSchema,
    ]),
  }),
  Data.Object({
    TreasuryWithdrawals: Data.Tuple([
      Data.Map(CredentialSchema, LovelaceSchema),
      Data.Nullable(ScriptHashSchema),
    ]),
  }),
  Data.Object({
    NoConfidence: Data.Tuple([Data.Nullable(GovernanceActionIdSchema)]),
  }),
  Data.Object({
    UpdateCommittee: Data.Tuple([
      Data.Nullable(GovernanceActionIdSchema),
      Data.Array(ColdCommitteeCredentialSchema),
      Data.Map(ColdCommitteeCredentialSchema, Data.Integer()),
      RationalSchema,
    ]),
  }),
  Data.Object({
    NewConstitution: Data.Tuple([
      Data.Nullable(GovernanceActionIdSchema),
      ConstitutionSchema,
    ]),
  }),
  Data.Literal("InfoAction"),
]);
export type GovernanceActionData = Data.Static<typeof GovernanceActionSchema>;
export const GovernanceActionData =
  GovernanceActionSchema as unknown as GovernanceActionData;

export const ProposalProcedureSchema = Data.Object({
  ppDeposit: LovelaceSchema,
  ppReturnAddr: CredentialSchema,
  ppGovernanceAction: GovernanceActionSchema,
});
export type ProposalProcedureData = Data.Static<typeof ProposalProcedureSchema>;
export const ProposalProcedureData =
  ProposalProcedureSchema as unknown as ProposalProcedureData;

export const ScriptPurposeSchema = Data.Enum([
  Data.Object({ Minting: Data.Tuple([CurrencySymbolSchema]) }),
  Data.Object({ Spending: Data.Tuple([TxOutRefSchema]) }),
  Data.Object({ Rewarding: Data.Tuple([CredentialSchema]) }),
  Data.Object({
    Certifying: Data.Tuple([Data.Integer(), TxCertSchema]),
  }),
  Data.Object({ Voting: Data.Tuple([VoterSchema]) }),
  Data.Object({
    Proposing: Data.Tuple([Data.Integer(), ProposalProcedureSchema]),
  }),
]);
export type ScriptPurposeData = Data.Static<typeof ScriptPurposeSchema>;
export const ScriptPurposeData =
  ScriptPurposeSchema as unknown as ScriptPurposeData;

export const ScriptInfoSchema = Data.Enum([
  Data.Object({ MintingScript: Data.Tuple([CurrencySymbolSchema]) }),
  Data.Object({
    SpendingScript: Data.Tuple([TxOutRefSchema, Data.Nullable(DatumSchema)]),
  }),
  Data.Object({ RewardingScript: Data.Tuple([CredentialSchema]) }),
  Data.Object({
    CertifyingScript: Data.Tuple([Data.Integer(), TxCertSchema]),
  }),
  Data.Object({ VotingScript: Data.Tuple([VoterSchema]) }),
  Data.Object({
    ProposingScript: Data.Tuple([Data.Integer(), ProposalProcedureSchema]),
  }),
]);
export type ScriptInfoData = Data.Static<typeof ScriptInfoSchema>;
export const ScriptInfoData = ScriptInfoSchema as unknown as ScriptInfoData;

export const TxInInfoSchema = Data.Object({
  txInInfoOutRef: TxOutRefSchema,
  txInInfoResolved: TxOutSchema,
});
export type TxInInfoData = Data.Static<typeof TxInInfoSchema>;
export const TxInInfoData = TxInInfoSchema as unknown as TxInInfoData;

export const TxInfoSchema = Data.Object({
  txInfoInputs: Data.Array(TxInInfoSchema),
  txInfoReferenceInputs: Data.Array(TxInInfoSchema),
  txInfoOutputs: Data.Array(TxOutSchema),
  txInfoFee: LovelaceSchema,
  txInfoMint: MintValueSchema,
  txInfoTxCerts: Data.Array(TxCertSchema),
  txInfoWdrl: Data.Map(CredentialSchema, LovelaceSchema),
  txInfoValidRange: POSIXTimeRangeSchema,
  txInfoSignatories: Data.Array(PubKeyHashSchema),
  txInfoRedeemers: Data.Map(ScriptPurposeSchema, RedeemerSchema),
  txInfoData: Data.Map(DatumHashSchema, DatumSchema),
  txInfoId: TxIdSchema,
  txInfoVotes: Data.Map(
    VoterSchema,
    Data.Map(GovernanceActionIdSchema, VoteSchema),
  ),
  txInfoProposalProcedures: Data.Array(ProposalProcedureSchema),
  txInfoCurrentTreasuryAmount: Data.Nullable(LovelaceSchema),
  txInfoTreasuryDonation: Data.Nullable(LovelaceSchema),
});
export type TxInfoData = Data.Static<typeof TxInfoSchema>;
export const TxInfoData = TxInfoSchema as unknown as TxInfoData;

export const ScriptContextSchema = Data.Object({
  scriptContextTxInfo: TxInfoSchema,
  scriptContextRedeemer: RedeemerSchema,
  scriptContextScriptInfo: ScriptInfoSchema,
});
export type ScriptContextData = Data.Static<typeof ScriptContextSchema>;
export const ScriptContextData =
  ScriptContextSchema as unknown as ScriptContextData;
