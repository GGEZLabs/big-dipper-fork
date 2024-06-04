import Big from 'big.js';
import numeral from 'numeral';
import { SetterOrUpdater, useRecoilState } from 'recoil';
import chainConfig from '@/chainConfig';
import { MarketDataQuery, useMarketDataQuery } from '@/graphql/types/general_types';
import { writeMarket } from '@/recoil/market/selectors';
import type { AtomState } from '@/recoil/market/types';
import { formatToken } from '@/utils/format_token';
import { getDenom } from '@/utils/get_denom';

const { primaryTokenUnit, votingPowerTokenUnit, primaryCoinUnit, votingPowerCoinUnit } =
  chainConfig();

/**
 * It takes a query hook and returns a Recoil state hook
 */
export function useMarketRecoil() {
  const [market, setMarket] = useRecoilState(writeMarket) as [
    AtomState,
    SetterOrUpdater<AtomState>,
  ];

  useMarketDataQuery({
    onCompleted: (data) => {
      if (data) {
        setMarket(formatUseChainIdQuery(data));
      }
    },
  });

  /**
   * It takes in a data object and returns an object with the following properties: price, supply,
   * marketCap, inflation, communityPool, and apr
   * @param {MarketDataQuery} data - MarketDataQuery
   * @returns return {
   *     price,
   *     supply,
   *     marketCap,
   *     inflation,
   *     communityPool,
   *     apr,
   *   };
   */
  function formatUseChainIdQuery(data: MarketDataQuery): AtomState {
    let { communityPool, price, marketCap, votingCommunityPool, votingPrice, votingMarketCap } =
      market;

    if (data?.tokenPrice?.length) {
      const rewardsCoin = data?.tokenPrice.filter((x) => x.unitName === primaryCoinUnit);
      const votingCoin = data?.tokenPrice.filter((x) => x.unitName === votingPowerCoinUnit);
      price = numeral(numeral(Number(rewardsCoin[0]?.price)).format('0.[00]', Math.floor)).value();
      votingPrice = numeral(
        numeral(Number(votingCoin[0]?.price)).format('0.[00]', Math.floor)
      ).value();
      marketCap = rewardsCoin[0]?.marketCap;
      votingMarketCap = votingCoin[0]?.marketCap;
    }

    const [communityPoolCoin] = ((data?.communityPool?.[0].coins as MsgCoin[]) ?? []).filter(
      (x) => x.denom === primaryTokenUnit
    );
    const [votingCommunityPoolCoin] = ((data?.communityPool?.[0].coins as MsgCoin[]) ?? []).filter(
      (x) => x.denom === votingPowerTokenUnit
    );
    const inflation = data?.inflation?.[0]?.value ?? 0;
    const votingInflation = data?.inflation?.[1]?.value ?? 0;

    /* Getting the supply amount and formatting it. */
    const rawSupplyAmount = getDenom(data?.supply?.[0]?.coins, primaryTokenUnit).amount;
    const supply = formatToken(rawSupplyAmount, primaryTokenUnit);

    const rawVotingSupplyAmount = getDenom(data?.supply?.[0]?.coins, votingPowerTokenUnit).amount;
    const votingSupply = formatToken(rawVotingSupplyAmount, votingPowerTokenUnit);

    if (communityPoolCoin) {
      communityPool = formatToken(communityPoolCoin.amount, communityPoolCoin.denom);
    }
    if (votingCommunityPoolCoin) {
      votingCommunityPool = formatToken(
        votingCommunityPoolCoin.amount,
        votingCommunityPoolCoin.denom
      );
    }
    const bondedTokens = Big(data?.bondedTokens?.[0]?.bonded_tokens || 0);
    const communityTax = Big(data?.distributionParams?.[0]?.params?.community_tax || 0);

    /* Calculating the APR. */
    const inflationWithCommunityTax = Big(1).minus(communityTax)?.times(inflation).toPrecision(2);
    const apr = !bondedTokens.eq(0)
      ? Big(rawSupplyAmount)?.times(inflationWithCommunityTax).div(bondedTokens).toNumber()
      : 0;
    const votingApr = Big(rawSupplyAmount)
      .times(inflationWithCommunityTax)
      .div(bondedTokens)
      .toNumber();

    return {
      price,
      supply,
      marketCap,
      inflation,
      communityPool,
      apr,
      votingPrice,
      votingSupply,
      votingMarketCap,
      votingInflation,
      votingCommunityPool,
      votingApr,
    };
  }
}
