import { useState } from 'react';
import * as R from 'ramda';
import { useSegmentGraphQuery, useIssuerGraphQuery } from '@/graphql/types/general_types';
import { SegmentState, IssuerState } from '../../types';

export const useTokenomics = () => {
  const [issuerState, setIssuerState] = useState<IssuerState>({
    loading: true,
    exists: true,
    items: [],
  });

  const [segmentState, setSegmentState] = useState<SegmentState>({
    loading: true,
    exists: true,
    items: [],
  });

  const handleIssuerSetState = (stateChange: any) => {
    setIssuerState((prevState) => R.mergeDeepLeft(stateChange, prevState));
  };

  const handleSegmentSetState = (stateChange: any) => {
    setSegmentState((prevState) => R.mergeDeepLeft(stateChange, prevState));
  };

  useSegmentGraphQuery({
    onCompleted: (data) => {
      handleSegmentSetState(formatAssetsSegmentGraphs(data));
    },
  });

  useIssuerGraphQuery({
    onCompleted: (data) => {
      handleIssuerSetState(formatAssetsIssuerGraphs(data));
    },
  });

  const formatAssetsSegmentGraphs = (data) => {
    const results = { ...segmentState };
    results.items = data.assets_held_assets_segment_view;
    return results;
  };
  const formatAssetsIssuerGraphs = (data) => {
    const results = { ...issuerState };
    results.items = data.assets_held_assets_issuer_view;

    return results;
  };

  return {
    issuerState,
    segmentState,
  };
};
