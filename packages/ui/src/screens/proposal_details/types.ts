export type OverviewType = {
  title: string;
  id: number | string;
  proposer: string;
  description: string;
  status: string;
  submitTime: string;
  depositEndTime: string;
  votingStartTime: string | null;
  votingEndTime: string | null;
  content: any;
};

export type ProposalState = {
  loading: boolean;
  exists: boolean;
  overview: OverviewType;
};
