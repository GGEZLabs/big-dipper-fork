import React, { useEffect } from 'react';
import { NextSeo } from 'next-seo';
import useAppTranslation from '@/hooks/useAppTranslation';

import Box from '@/components/box';
import Layout from '@/components/layout';
import LoadAndExist from '@/components/load_and_exist';
import TradesList from '@/components/trades_list';

import useStyles from './styles';
import { useTrades } from './hooks';

const Trades = () => {
  const { t, i18n } = useAppTranslation('trades');
  const lang = i18n.language;
  useEffect(() => {
    const element = document.getElementsByTagName('html')[0];
    // eslint-disable-next-line no-unused-expressions
    lang === 'en' ? element.setAttribute('dir', 'ltr') : element.setAttribute('dir', 'rtl');
  }, [lang]);
  const { classes } = useStyles();
  const { state, loadNextPage } = useTrades();
  const loadMoreItems = state.isNextPageLoading ? () => null : loadNextPage;
  const isItemLoaded = (index: number) => !state.hasNextPage || index < state.items.length;
  const itemCount = state.hasNextPage ? state.items.length + 1 : state.items.length;

  return (
    <>
      <NextSeo
        title={t('trades')}
        openGraph={{
          title: t('trades'),
        }}
      />
      <Layout navTitle={t('trades')} className={classes.root}>
        <LoadAndExist exists={state.exists} loading={state.loading}>
          <Box className={classes.box}>
            <TradesList
              trades={state.items}
              itemCount={itemCount}
              hasNextPage={state.hasNextPage}
              isNextPageLoading={state.isNextPageLoading}
              loadNextPage={loadNextPage}
              loadMoreItems={loadMoreItems}
              isItemLoaded={isItemLoaded}
            />
          </Box>
        </LoadAndExist>
      </Layout>
    </>
  );
};

export default Trades;
