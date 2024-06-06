/* eslint-disable arrow-body-style */
import { useState } from 'react';
import * as R from 'ramda';
import {
  useTradesQuery,
  useTradesListenerSubscription,
  TradesListenerSubscription,
} from '@/graphql/types/general_types';
import { HoldingsState } from './types';

export const useTrades = () => {
  const [state, setState] = useState<HoldingsState>({
    loading: true,
    exists: true,
    hasNextPage: false,
    isNextPageLoading: false,
    items: [],
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSetState = (stateChange: any) => {
    setState((prevState) => R.mergeDeepLeft(stateChange, prevState));
  };

  // This is a bandaid as it can get extremely
  // expensive if there is too much data
  /**
   * Helps remove any possible duplication
   * and sorts by height in case it bugs out
   */

  // ================================
  // tx subscription
  // ================================
  useTradesListenerSubscription({
    variables: {
      limit: 1,
      offset: 0,
    },
    onData: (data) => {
      const newItems = [...formatHoldings(data.data.data), ...state.items];

      handleSetState({
        loading: false,
        items: newItems,
      });
    },
  });
  // ================================
  // tx query
  // ================================
  const LIMIT = 51;
  const holdingsQuery = useTradesQuery({
    variables: {
      limit: LIMIT,
      offset: 1,
    },
    onError: () => {
      handleSetState({
        loading: false,
      });
    },
    onCompleted: (data) => {
      const itemsLength = data.trades.length;
      const newItems = [...state.items, ...formatHoldings(data)];
      handleSetState({
        loading: false,
        items: newItems,
        hasNextPage: itemsLength === 51,
        isNextPageLoading: false,
      });
    },
  });

  const loadNextPage = async () => {
    handleSetState({
      isNextPageLoading: true,
    });
    // refetch query
    await holdingsQuery
      .fetchMore({
        variables: {
          offset: state.items.length,
          limit: LIMIT,
        },
      })
      .then(({ data }) => {
        const itemsLength = data.trades.length;
        const newItems = [...state.items, ...formatHoldings(data)];
        // set new state
        handleSetState({
          items: newItems,
          isNextPageLoading: false,
          hasNextPage: itemsLength === 51,
        });
      });
  };

  const formatHoldings = (data: TradesListenerSubscription) => {
    const formattedData = data.trades;
    return formattedData?.map((x) => {
      return {
        id: x.id,
        asset_ticker: x.asset_ticker,
        fund_name: x.fund_name,
        type: x.type,
        no_shares: x.no_shares,
        currency: x.currency,
        price: x.price,
        value: x.value,
        fee: x.fee,
        net_value: x.net_value,
        net_price: x.net_price,
        issued_coins: x.issued_coins,
        coin_minting_price: x.coin_minting_price,
        timestamp: x.timestamp,
      };
    });
  };

  return {
    state,
    loadNextPage,
  };
};
