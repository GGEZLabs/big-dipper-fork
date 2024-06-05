import { Trades } from '@/graphql/types/general_types';

export type HoldingsState = {
  loading: boolean;
  exists: boolean;
  hasNextPage: boolean;
  isNextPageLoading: boolean;
  items: Trades[];
};
