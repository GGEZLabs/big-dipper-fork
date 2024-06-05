import { Trades } from '@/graphql/types/general_types';

export type TradesListState = {
  className?: string;
  hasNextPage?: boolean;
  isNextPageLoading?: boolean;
  loadNextPage?: (any) => void;
  loadMoreItems?: (any) => void;
  isItemLoaded?: (index: number) => boolean;
  itemCount?: number;
  trades: Trades[];
};
