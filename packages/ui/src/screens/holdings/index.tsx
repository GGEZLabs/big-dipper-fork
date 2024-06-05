/* eslint-disable no-unused-expressions */
/* eslint-disable eqeqeq */
import React, { useEffect } from 'react';
import { NextSeo } from 'next-seo';
import Layout from '@/components/layout';
import HoldingsList from '@/components/holdings_list';
import LoadAndExist from '@/components/load_and_exist';
import Box from '@/components/box';

import useAppTranslation from '@/hooks/useAppTranslation';
import useStyles from './styles';
import { useHoldings } from './hooks';

const Holdings = () => {
  const { t, i18n } = useAppTranslation('holdings');
  const lang = i18n.language;
  useEffect(() => {
    const element = document.getElementsByTagName('html')[0];
    lang == 'en' ? element.setAttribute('dir', 'ltr') : element.setAttribute('dir', 'rtl');
  }, [lang]);
  const { classes } = useStyles();
  const { state, loadNextPage } = useHoldings();
  const loadMoreItems = state.isNextPageLoading ? () => null : loadNextPage;
  const isItemLoaded = (index) => !state.hasNextPage || index < state.items.length;
  const itemCount = state.hasNextPage ? state.items.length + 1 : state.items.length;
  return (
    <>
      <NextSeo
        title={t('holding')}
        openGraph={{
          title: t('holding'),
        }}
      />
      <Layout navTitle={t('holding')} className={classes.root}>
        <LoadAndExist exists={state.exists} loading={state.loading}>
          <Box className={classes.box}>
            <HoldingsList
              holdings={state.items}
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

export default Holdings;
