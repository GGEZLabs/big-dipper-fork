import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import useAppTranslation from '@/hooks/useAppTranslation';
import { HOLDINGS } from '@/utils/go_to_page';
import NoData from '@/components/no_data';
import Box from '@/components/box';
import { useScreenSize } from '@/hooks/use_screen_size';
import useStyles from './styles';
import { useHoldings } from './hooks';

const Desktop = dynamic(() => import('./components/desktop'));
const Mobile = dynamic(() => import('./components/mobile'));

const HoldingsTable: React.FC<{
  className?: string;
}> = ({ className }) => {
  const { isDesktop } = useScreenSize();
  const { t } = useAppTranslation('assets');
  const { state } = useHoldings();
  const { classes, cx } = useStyles();
  return (
    <Box className={cx(className, classes.root)}>
      <div className={classes.label}>
        <Typography variant="h2">{t('holding')}</Typography>
        <Link href={HOLDINGS} passHref>
          <Typography variant="h4" className="button" component="a">
            {t('seeMore')}
          </Typography>
        </Link>
      </div>
      {!state.items.length ? (
        <NoData />
      ) : (
        <>
          {isDesktop ? (
            <Desktop className={classes.desktop} holdings={state.items} />
          ) : (
            <Mobile className={classes.mobile} holdings={state.items} />
          )}
          <Divider className={classes.mobile} />
          <Link href={HOLDINGS} passHref>
            <Typography
              variant="h4"
              component="a"
              className={cx(classes.seeMoreFooter, classes.mobile, 'button')}
            >
              {t('seeMore')}
            </Typography>
          </Link>
        </>
      )}
    </Box>
  );
};

export default HoldingsTable;
