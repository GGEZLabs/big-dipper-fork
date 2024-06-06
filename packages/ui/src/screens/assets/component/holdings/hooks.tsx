/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import * as R from 'ramda';
import {
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

  // ================================
  // tx subscription
  // ================================
  useHoldingListenerSubscription({
    variables: {
      limit: 7,
      offset: 0,
    },
    onData: (data) => {
      handleSetState({
        loading: false,
        items: formatHolding(data.data.data),
      });
    },
  });

  const formatHolding = (data: HoldingListenerSubscription) => {
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
  return {
    state,
  };
};
