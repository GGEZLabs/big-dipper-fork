import { Holding } from '@/graphql/types/general_types';

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