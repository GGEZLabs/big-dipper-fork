import { formatNumber } from '@/utils/format_token';

export const formatMarket = (data: {
  marketCap: number;
  communityPool: TokenUnit;
  supply: TokenUnit;
  inflation: number;
  apr: number;
  price: number;
}) => {
  const exludedItems = [null, 0];
  const marketCap = exludedItems.includes(data.marketCap)
    ? 'N/A'
    : `$${formatNumber(data.marketCap?.toString(), 2)}`;
  const price = exludedItems.includes(data.price)
    ? 'N/A'
    : `$${formatNumber(data.price?.toString(), 6)}`;

  return [
    {
      key: 'StableCoin',
      data: 'GGEZ',
    },
    {
      key: 'marketCap',
      data: marketCap,
    },
    {
      key: 'supply',
      data: `${formatNumber((Number(data.supply.value) / 1000000).toString(), 0)}`,
    },
    {
      key: 'price',
      data: price,
    },
  ];
};

export const formatVotingMarket = (data: {
  votingMarketCap: number;
  votingCommunityPool: TokenUnit;
  votingSupply: TokenUnit;
  votingInflation: number;
  votingApr: number;
  votingPrice: number;
}) => {
  const exludedItems = [null, 0];
  const votingMarketCap = exludedItems.includes(data.votingMarketCap)
    ? 'N/A'
    : `$${formatNumber(data.votingMarketCap?.toString(), 2)}`;
  const votingPrice = exludedItems.includes(data.votingPrice)
    ? 'N/A'
    : `$${formatNumber(data.votingPrice?.toString(), 6)}`;

  return [
    {
      key: 'GovernanceCoin',
      data: 'GGEZ1',
    },
    {
      key: 'marketCap',
      data: votingMarketCap,
    },
    {
      key: 'supply',
      data: `${formatNumber((Number(data.votingSupply.value) / 1000000)?.toString(), 0)}`,
    },
    {
      key: 'price',
      data: votingPrice,
    },
  ];
};
