export type PortfolioPriceType = {
  time: string;
  value: number;
};

export type HeroState = {
  loading: boolean;
  exists: boolean;
  portfolioPriceHistory: PortfolioPriceType[];
};

export type AssetsIssuerGraphsType = {
  issuer: string;
  value: string;
  fill: string;
};

export type IssuerState = {
  loading: true;
  exists: true;
  items: AssetsIssuerGraphsType[];
};

export type AssetsSegmentGraphsType = {
  segment: string;
  value: string;
  fill: string;
};

export type SegmentState = {
  loading: true;
  exists: true;
  items: AssetsSegmentGraphsType[];
};
