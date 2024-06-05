import React from 'react';
import Typography from '@mui/material/Typography';
import useAppTranslation from '@/hooks/useAppTranslation';
import useStyles from './styles';

const SingleHoldingMobile: React.FC<{
  className?: string;
  ticker: React.ReactNode;
  fundName: React.ReactNode;
  issuer: React.ReactNode;
  segment: React.ReactNode;

  heldNoShares: React.ReactNode;
  AVGPrice: React.ReactNode;
  invtValue: React.ReactNode;
  lastTradePrice: React.ReactNode;
  currentInvtValue: React.ReactNode;
  returnAmt: React.ReactNode;
  returnPct: React.ReactNode;
  issuedCoins: React.ReactNode;
  percentOfTotalSupply: React.ReactNode;
  moreDetails: React.ReactNode;
}> = ({
  className,
  ticker,
  fundName,
  issuer,
  segment,
  heldNoShares,
  AVGPrice,
  invtValue,
  lastTradePrice,
  currentInvtValue,
  returnAmt,
  returnPct,
  issuedCoins,
  percentOfTotalSupply,
  moreDetails,
}) => {
  const { t } = useAppTranslation('holdings');
  const { classes, cx } = useStyles();

  return (
    <div className={cx(className, classes.root)}>
      <div className={classes.flex}>
        <div className={classes.item}>
          <Typography variant="h4" className="label" component="span">
            {t('ticker')}
          </Typography>
          <Typography variant="body1" className="value">
            {ticker}
          </Typography>
        </div>

        <div className={classes.item}>
          <Typography variant="h4" className="label" component="span">
            {t('fundName')}
          </Typography>
          <Typography variant="h4" className="label" component="span">
            {fundName}
          </Typography>
        </div>
      </div>

      <div className={classes.flex}>
        <div className={classes.item}>
          <Typography variant="h4" className="label" component="span">
            {t('issuer')}
          </Typography>
          <Typography variant="body1" className="value" component="span">
            {issuer}
          </Typography>
        </div>

        <div className={classes.item}>
          <Typography variant="h4" className="label" component="span">
            {t('segment')}
          </Typography>
          <Typography variant="h4" className="label" component="span">
            {segment}
          </Typography>
        </div>
      </div>
      <div className={classes.flex}>
        <div className={classes.item}>
          <Typography variant="h4" className="label" component="span">
            {t('heldNoShares')}
          </Typography>
          <Typography variant="body1" className="value" component="span">
            {heldNoShares}
          </Typography>
        </div>

        <div className={classes.item}>
          <Typography variant="h4" className="label" component="span">
            {t('AVGPrice')}
          </Typography>
          <Typography variant="h4" className="label" component="span">
            {AVGPrice}
          </Typography>
        </div>
      </div>
      <div className={classes.flex}>
        <div className={classes.item}>
          <Typography variant="h4" className="label" component="span">
            {t('invtValue')}
          </Typography>
          <Typography variant="body1" className="value" component="span">
            {invtValue}
          </Typography>
        </div>

        <div className={classes.item}>
          <Typography variant="h4" className="label" component="span">
            {t('lastTradePrice')}
          </Typography>
          <Typography variant="h4" className="label" component="span">
            {lastTradePrice}
          </Typography>
        </div>
      </div>
      <div className={classes.flex}>
        <div className={classes.item}>
          <Typography variant="h4" className="label" component="span">
            {t('currentInvtValue')}
          </Typography>
          <Typography variant="body1" className="value" component="span">
            {currentInvtValue}
          </Typography>
        </div>

        <div className={classes.item}>
          <Typography variant="h4" className="label" component="span">
            {t('returnAmt')}
          </Typography>
          <Typography variant="h4" className="label" component="span">
            {returnAmt}
          </Typography>
        </div>
      </div>
      <div className={classes.flex}>
        <div className={classes.item}>
          <Typography variant="h4" className="label" component="span">
            {t('returnPct')}
          </Typography>
          <Typography variant="body1" className="value" component="span">
            {returnPct}
          </Typography>
        </div>

        <div className={classes.item}>
          <Typography variant="h4" className="label" component="span">
            {t('issuedCoins')}
          </Typography>
          <Typography variant="h4" className="label" component="span">
            {issuedCoins}
          </Typography>
        </div>
      </div>
      <div className={classes.flex}>
        <div className={classes.item}>
          <Typography variant="h4" className="label" component="span">
            {t('percentOfTotalSupply')}
          </Typography>
          <Typography variant="body1" className="value" component="span">
            {percentOfTotalSupply}
          </Typography>
        </div>

        <div className={classes.item}>
          <Typography variant="h4" className="label" component="span">
            {t('moreDetails')}
          </Typography>
          <Typography variant="h4" className="label">
            {moreDetails}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default SingleHoldingMobile;
