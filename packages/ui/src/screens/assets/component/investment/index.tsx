/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import { TRADES } from '@/utils/go_to_page';
import NoData from '@/components/no_data';
import Box from '@/components/box';
import { useScreenSize } from '@/hooks/use_screen_size';

import useAppTranslation from '@/hooks/useAppTranslation';
import useStyles from './styles';
import { useTrades } from './hooks';

const Desktop = dynamic(() => import('./components/desktop'));
const Mobile = dynamic(() => import('./components/mobile'));

const Trades: React.FC<{
  className?: string;
}> = ({ className }) => {
  const { isDesktop } = useScreenSize();
  const { t } = useAppTranslation('assets');
  const { classes, cx } = useStyles();
  const { state } = useTrades();

  // const proposerProfiles = useProfilesRecoil(state.items.map((x) => x.proposer));
  const mergedDataWithProfiles = state.items.map((x, i) => ({
    ...x,
    // proposer: proposerProfiles[i],
  }));

  return (
    <Box className={cx(className, classes.root)}>
      <div className={classes.label}>
        <Typography variant="h2">{t('trades')}</Typography>
        <Link href={TRADES} passHref>
          {/* <Typography variant="h4" className="button" component="a"> */}
          {t('seeMore')}
          {/* </Typography> */}
        </Link>
      </div>
      {!state.items.length ? (
        <NoData />
      ) : (
        <>
          {isDesktop ? (
            <Desktop className={classes.desktop} items={state.items} />
          ) : (
            <Mobile className={classes.mobile} items={state.items} />
          )}
          <Divider className={classes.mobile} />
          <Link
            href={TRADES}
            passHref
            className={cx(classes.seeMoreFooter, classes.mobile, 'button')}
          >
            {/* <Typography
              variant="h4"
              component="a"
              className={cx(classes.seeMoreFooter, classes.mobile, 'button')}
            > */}
            {t('seeMore')}
            {/* </Typography> */}
          </Link>
        </>
      )}
    </Box>
  );
};

export default Trades;
