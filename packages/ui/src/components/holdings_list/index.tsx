/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import dynamic from 'next/dynamic';
import NoData from '@/components/no_data';
import { useScreenSize } from '@/hooks/use_screen_size';
import useStyles from './styles';
import { HoldingsListState } from './types';

const Desktop = dynamic(() => import('./components/desktop'));
const Mobile = dynamic(() => import('./components/mobile'));

const HoldingsList: React.FC<HoldingsListState> = (props) => {
  const { isDesktop } = useScreenSize();
  // setting fallback values
  const {
    hasNextPage = false,
    isNextPageLoading = false,
    loadNextPage = () => null,
    loadMoreItems = () => null,
    isItemLoaded = () => true,
    itemCount,
    holdings,
  } = props;
  const { classes } = useStyles();

  const formatProps = {
    hasNextPage,
    isNextPageLoading,
    isItemLoaded,
    loadNextPage,
    loadMoreItems,
    itemCount,
    holdings,
  };

  if (!itemCount) {
    return <NoData />;
  }

  return (
    <>
      {isDesktop ? (
        <Desktop className={classes.desktop} {...formatProps} />
      ) : (
        <Mobile className={classes.mobile} {...formatProps} />
      )}
    </>
  );
};

export default HoldingsList;
