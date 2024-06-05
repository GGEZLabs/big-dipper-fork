import React from 'react';
import dynamic from 'next/dynamic';
import NoData from '@/components/no_data';
import { useScreenSize } from '@/hooks/use_screen_size';
import useStyles from './styles';
import { TradesListState } from './types';

const Desktop = dynamic(() => import('./components/desktop'));
const Mobile = dynamic(() => import('./components/mobile'));

const TradesList: React.FC<TradesListState> = (props) => {
  const { isDesktop } = useScreenSize();
  // setting fallback values
  const {
    hasNextPage = false,
    isNextPageLoading = false,
    loadNextPage = () => null,
    loadMoreItems = () => null,
    isItemLoaded = () => true,
    itemCount,
    trades,
  } = props;
  const { classes } = useStyles();

  const formatProps = {
    hasNextPage,
    isNextPageLoading,
    isItemLoaded,
    loadNextPage,
    loadMoreItems,
    itemCount,
    trades,
  };

  if (!itemCount) {
    return <NoData />;
  }

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {isDesktop ? (
        <Desktop className={classes.desktop} {...formatProps} />
      ) : (
        <Mobile className={classes.mobile} {...formatProps} />
      )}
    </>
  );
};

export default TradesList;
