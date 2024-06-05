/* eslint-disable @typescript-eslint/no-unused-vars */
import dayjs from '@/utils/dayjs';
import numeral from 'numeral';
import { useState } from 'react';
import * as R from 'ramda';
import { usePortfolioPriceHistoryQuery } from '@/graphql/types/general_types';
import { HeroState } from '../../types';

export const usePrice = () => {
  const formatTime = (time: dayjs.Dayjs, mode: 'locale' | 'utc' = 'locale') => {
    if (mode === 'utc') {
      return time.format('MMM DD');
    }

    return time.local().format('MMM DD');
  };

  const tickPriceFormatter = (num: number) => `$${numeral(num).format('0,0.[0000]')}`;

  return {
    tickPriceFormatter,
    formatTime,
  };
};

export const useHero = () => {
  const [state, setState] = useState<HeroState>({
    loading: true,
    exists: true,
    portfolioPriceHistory: [],
  });

  const handleSetState = (stateChange: any) => {
    setState((prevState) => R.mergeDeepLeft(stateChange, prevState));
  };

  // const uniqueAndSort = R.pipe(
  //   R.uniqBy(R.prop('timestamp')),
  //   R.sort(R.descend(R.prop('timestamp'))),
  // );

  usePortfolioPriceHistoryQuery({
    variables: {
      limit: 10,
    },
    onCompleted: (data) => {
      const newState: any = {
        loading: false,
      };
      if (data.portfolioPriceHistory.length === 10) {
        newState.portfolioPriceHistory = data.portfolioPriceHistory.reverse().map((x) => ({
          time: x.timestamp,
          value: Number(x.coin_price)?.toString(),
        }));
      }
      handleSetState(newState);
    },
    onError: () => {
      handleSetState({
        loading: false,
      });
    },
  });

  return {
    state,
  };
};
