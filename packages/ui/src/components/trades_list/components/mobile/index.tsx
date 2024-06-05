/* eslint-disable eqeqeq */
/* eslint-disable react/no-array-index-key */
/* eslint-disable arrow-body-style */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import Link from 'next/link';
import numeral from 'numeral';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import SingleTradeMobile from '@/components/single_trade_mobile';
import { TradesListState } from '../../types';
import useStyles from '../../styles';

const Mobile: React.FC<TradesListState> = ({ className, trades }) => {
  const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} placement="top" />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }));
  let cur = '';
  const { cx } = useStyles();
  const formatData = trades.map((x) => {
    const obj = {
      ticker: (
        <Link href={`https://www.etf.com/${x.asset_ticker}`} passHref>
          <Typography variant="body1" component="a" target="_blank">
            {x.currency == 'USD'
              ? (cur = '$')
              : x.currency == 'EUR'
                ? (cur = '€')
                : x.currency == 'YEN'
                  ? (cur = '¥')
                  : x.currency == 'GBP'
                    ? (cur = '£ ')
                    : x.currency == 'CNY'
                      ? (cur = 'CN¥ ')
                      : x.currency == 'CAD'
                        ? (cur = '$')
                        : x.currency == 'AUD'
                          ? (cur = '$')
                          : x.currency == 'CHF'
                            ? (cur = '₣')
                            : (cur = 'Not Found')}
            {x.asset_ticker}
          </Typography>
        </Link>
      ),
      fundName: (
        <Typography variant="body1" className="value">
          {x.fund_name}
        </Typography>
      ),
      type: (
        <Typography variant="body1" className="value">
          {x.type}
        </Typography>
      ),
      heldNoShares: (
        <Typography variant="body1" className="value">
          {numeral(x.no_shares).format('0,0')}
        </Typography>
      ),
      currency: (
        <Typography variant="body1" className="value">
          {x.currency}
        </Typography>
      ),
      price: (
        <Typography variant="body1" className="value">
          {cur + numeral(x.price).format('0,0.00')}
        </Typography>
      ),
      value: (
        <Typography variant="body1" className="value">
          {cur + numeral(x.value).format('0,0.00')}
        </Typography>
      ),
      fee: (
        <Typography variant="body1" className="value">
          {cur + numeral(x.fee).format('0,0.00')}
        </Typography>
      ),
      netValue: (
        <Typography variant="body1" className="value">
          {cur + numeral(x.net_value).format('0,0.00')}
        </Typography>
      ),
      netPrice: (
        <Typography variant="body1" className="value">
          {cur + numeral(x.net_price).format('0,0.00')}
        </Typography>
      ),
      issuedCoins: (
        <Typography variant="body1" className="value">
          {numeral(x.issued_coins / 1000000).format('0,0.00')}
        </Typography>
      ),
      coinMintingPrice: (
        <Typography variant="body1" className="value">
          {cur + numeral(x.coin_minting_price).format('0.0000')}
        </Typography>
      ),
      time: (
        <Typography variant="body1" className="value">
          {x.timestamp}
        </Typography>
      ),
    };
    return obj;
  });

  return (
    <div className={cx(className)}>
      {formatData.map((x, i) => {
        return (
          <React.Fragment key={`${x.fundName}-${i}`}>
            <SingleTradeMobile {...x} />
            {i !== formatData.length - 1 && <Divider />}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Mobile;
