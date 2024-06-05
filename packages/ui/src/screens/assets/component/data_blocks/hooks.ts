import { useState } from 'react';
import * as R from 'ramda';
import { useLatestInvestmentListenerSubscription } from '@/graphql/types/general_types';

export const useDataBlocks = () => {
  const [state, setState] = useState<{
    assetsCurrentValue: number;
    assetsPurchaseValue: number;
    returnAmount: number;
    returnPercent: number | null;
    heldNoAssets: number;
  }>({
    assetsCurrentValue: 0,
    assetsPurchaseValue: 0,
    returnAmount: 0,
    returnPercent: 0,
    heldNoAssets: 0,
  });

  // ====================================
  // Latest Investment
  // ====================================

  useLatestInvestmentListenerSubscription({
    onSubscriptionData: (data) => {
      setState((prevState) => ({
        ...prevState,
        assetsCurrentValue: R.pathOr(
          0,
          ['portfolio_history', 0, 'assets_current_value'],
          data.subscriptionData.data
        ),
        assetsPurchaseValue: R.pathOr(
          0,
          ['portfolio_history', 0, 'assets_purchase_value'],
          data.subscriptionData.data
        ),
        returnAmount: R.pathOr(
          0,
          ['portfolio_history', 0, 'return_amount'],
          data.subscriptionData.data
        ),
        returnPercent: R.pathOr(
          0,
          ['portfolio_history', 0, 'return_percent'],
          data.subscriptionData.data
        ),
        heldNoAssets: R.pathOr(
          0,
          ['portfolio_history', 0, 'held_no_assets'],
          data.subscriptionData.data
        ),
      }));
    },
  });
  return {
    state,
  };
};
