/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import * as R from 'ramda';
import {
  useHoldingQuery,
  useInsertIntoTransactionQuery,
  useHoldingListenerSubscription,
  HoldingListenerSubscription,
} from '@/graphql/types/general_types';
import { HoldingsState } from './types';

export const useHoldings = () => {
  const [state, setState] = useState<HoldingsState>({
    loading: true,
    exists: true,
    hasNextPage: false,
    isNextPageLoading: false,
    items: [],
  });

  const handleSetState = (stateChange: any) => {
    setState((prevState) => R.mergeDeepLeft(stateChange, prevState));
  };

  useHoldingListenerSubscription({
    variables: {
      limit: 1,
      offset: 0,
    },
    onSubscriptionData: (data) => {
      const newItems = [...formatHoldings(data.subscriptionData.data), ...state.items];
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
  const holdingsQuery = useHoldingQuery({
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
      const itemsLength = data.holding.length;
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
        const itemsLength = data.holding.length;
        const newItems = [...state.items, ...formatHoldings(data)];
        // set new state
        handleSetState({
          items: newItems,
          isNextPageLoading: false,
          hasNextPage: itemsLength === 51,
        });
      });
  };

  const formatHoldings = (data: HoldingListenerSubscription) => {
    const formattedData = data.holding;
    return formattedData?.map((x) => ({
      asset_ticker: x.asset_ticker,
      aum: x.aum,
      avg_price: x.avg_price,
      current_value: x.current_value,
      expense_ratio: x.expense_ratio,
      five_yr_tr: x.five_yr_tr,
      fund_name: x.fund_name,
      held_no_shares: x.held_no_shares,
      issued_coins: x.issued_coins,
      issuer: x.issuer,
      last_trade_price: x.last_trade_price,
      one_yr_tr: x.one_yr_tr,
      percent_of_total_supply: x.percent_of_total_supply,
      purchase_value: x.purchase_value,
      return_amount: x.return_amount,
      return_percent: x.return_percent,
      segment: x.segment,
      three_yr_tr: x.three_yr_tr,
      two_yr_tr: x.two_yr_tr,
      holder_name: x.holder_name,
      holder_type: x.holder_type,
      holder_country: x.holder_country,
    }));
  };

  // const formatTrades = (data: TradesListenerSubscription) => {
  //   const formattedData = data.trades;
  //   return formattedData?.map((x) => ({
  //       id: x.id,
  //       asset_ticker: x.asset_ticker,
  //       fund_name: x.fund_name,
  //       type: x.type,
  //       no_shares: x.no_shares,
  //       currency: x.currency,
  //       price: x.price,
  //       value: x.value,
  //       fee: x.fee,
  //       net_value: x.net_value,
  //       net_price: x.net_price,
  //       issued_coins: x.issued_coins,
  //       coin_minting_price: x.coin_minting_price,
  //       timestamp: x.timestamp,
  //     }));
  // };

  return {
    state,
    loadNextPage,
    useInsertIntoTransactionQuery,
  };
};
