export type AtomState = {
  price: number | null;
  supply: TokenUnit;
  marketCap: number | null;
  inflation: number;
  communityPool: TokenUnit;
  apr: number;
  votingPrice: number | null;
  votingSupply: TokenUnit;
  votingMarketCap: number | null;
  votingInflation: number;
  votingCommunityPool: TokenUnit;
  votingApr: number;
};
