import React from 'react';
import Layout from '@/components/layout';
import { NextSeo } from 'next-seo';
import useAppTranslation from '@/hooks/useAppTranslation';
import useStyles from './styles';

import { Tokenomics, HoldingsTable, Trades, SingleBlock, TokenPriceType } from './component';

const Assets = () => {
  const { classes } = useStyles();
  const { t } = useAppTranslation('assets');

  return (
    <>
      <NextSeo
        title={t('assets')}
        openGraph={{
          title: t('assets'),
        }}
      />
      <Layout className={classes.root} navTitle={t('assets')}>
        <SingleBlock className={classes.dataBlocks} />
        <TokenPriceType className={classes.hero} />
        <Tokenomics className={classes.boxOne} navTitle="Assets By Isuuer" />
        <Tokenomics className={classes.boxTwo} />
        <HoldingsTable className={classes.holding} />
        <Trades className={classes.investment} />
      </Layout>
    </>
  );
};

export default Assets;
