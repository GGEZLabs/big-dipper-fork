import React from 'react';
import Typography from '@mui/material/Typography';
import useAppTranslation from '@/hooks/useAppTranslation';
import useStyles from './styles';

const SingleTradeMobile: React.FC<{
  className?: string;
  ticker: React.ReactNode;
  fundName: React.ReactNode;
  type: React.ReactNode;
  heldNoShares: React.ReactNode;
  currency: React.ReactNode;
  price: React.ReactNode;
  value: React.ReactNode;
  fee: React.ReactNode;
  netValue: React.ReactNode;
  netPrice: React.ReactNode;
  issuedCoins: React.ReactNode;
  coinMintingPrice: React.ReactNode;
  time: React.ReactNode;
}> = ({
  className,
  ticker,
  fundName,
  type,
  heldNoShares,
  currency,
  price,
  value,
  fee,
  netValue,
  netPrice,
  issuedCoins,
  coinMintingPrice,
  time,
}) => {
  const { t } = useAppTranslation('trades');
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
            {t('type')}
          </Typography>
          <Typography variant="body1" className="value" component="span">
            {type}
          </Typography>
        </div>

        <div className={classes.item}>
          <Typography variant="h4" className="label" component="span">
            {t('heldNoShares')}
          </Typography>
          <Typography variant="h4" className="label" component="span">
            {heldNoShares}
          </Typography>
        </div>
      </div>
      <div className={classes.flex}>
        <div className={classes.item}>
          <Typography variant="h4" className="label" component="span">
            {t('currency')}
          </Typography>
          <Typography variant="body1" className="value" component="span">
            {currency}
          </Typography>
        </div>

        <div className={classes.item}>
          <Typography variant="h4" className="label" component="span">
            {t('price')}
          </Typography>
          <Typography variant="h4" className="label" component="span">
            {price}
          </Typography>
        </div>
      </div>
      <div className={classes.flex}>
        <div className={classes.item}>
          <Typography variant="h4" className="label" component="span">
            {t('value')}
          </Typography>
          <Typography variant="body1" className="value" component="span">
            {value}
          </Typography>
        </div>

        <div className={classes.item}>
          <Typography variant="h4" className="label" component="span">
            {t('fee')}
          </Typography>
          <Typography variant="h4" className="label" component="span">
            {fee}
          </Typography>
        </div>
      </div>
      <div className={classes.flex}>
        <div className={classes.item}>
          <Typography variant="h4" className="label" component="span">
            {t('netValue')}
          </Typography>
          <Typography variant="body1" className="value" component="span">
            {netValue}
          </Typography>
        </div>

        <div className={classes.item}>
          <Typography variant="h4" className="label" component="span">
            {t('netPrice')}
          </Typography>
          <Typography variant="h4" className="label" component="span">
            {netPrice}
          </Typography>
        </div>
      </div>
      <div className={classes.flex}>
        <div className={classes.item}>
          <Typography variant="h4" className="label" component="span">
            {t('issuedCoins')}
          </Typography>
          <Typography variant="body1" className="value" component="span">
            {issuedCoins}
          </Typography>
        </div>

        <div className={classes.item}>
          <Typography variant="h4" className="label" component="span">
            {t('coinMintingPrice')}
          </Typography>
          <Typography variant="h4" className="label" component="span">
            {coinMintingPrice}
          </Typography>
        </div>
      </div>
      <div className={classes.flex}>
        <div className={classes.item}>
          <Typography variant="h4" className="label" component="span">
            {t('time')}
          </Typography>
          <Typography variant="body1" className="value" component="span">
            {time}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default SingleTradeMobile;
