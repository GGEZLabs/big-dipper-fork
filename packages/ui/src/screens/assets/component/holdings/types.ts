import { Holding } from '@/graphql/types/general_types';

export type TransactionsListState = {
  className?: string;
  hasNextPage?: boolean;
  isNextPageLoading?: boolean;
  loadNextPage?: (any) => void;
  loadMoreItems?: (any) => void;
  isItemLoaded?: (index: number) => boolean;
  itemCount: number;
  transactions: Transactions[];
};

export type HoldingsListState = {
  className?: string;
  hasNextPage?: boolean;
  isNextPageLoading?: boolean;
  loadNextPage?: (any) => void;
  loadMoreItems?: (any) => void;
  isItemLoaded?: (index: number) => boolean;
  itemCount?: number;
  holdings: Holding[];
};
export type HoldingsState = {
  loading: boolean;
  exists: boolean;
  hasNextPage: boolean;
  isNextPageLoading: boolean;
  items: Holding[];
};
