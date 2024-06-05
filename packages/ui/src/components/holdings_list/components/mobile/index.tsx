/* eslint-disable react/no-array-index-key */
/* eslint-disable no-shadow */
import React from 'react';
import Link from 'next/link';
import numeral from 'numeral';
import Typography from '@mui/material/Typography';

import Divider from '@mui/material/Divider';

import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material';
import SingleHoldingMobile from '@/components/single_holding_mobile';
import { HoldingsListState } from '../../types';
import useStyles from './styles';

const Mobile: React.FC<HoldingsListState> = ({ className, holdings }) => {
  const { classes, cx } = useStyles();

  const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} placement="top" />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 480,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }));
  const formattedData = holdings.map((x) => ({
    ticker: (
      <Link href={`https://www.etf.com/${x.asset_ticker}`} passHref>
        <Typography variant="body1" component="a" target="_blank">
          {x.asset_ticker}
        </Typography>
      </Link>
    ),
    fundName: <Typography variant="body1">{x.fund_name}</Typography>,
    issuer: <Typography variant="body1">{x.issuer}</Typography>,
    segment: <Typography variant="body1">{x.segment}</Typography>,
    heldNoShares: (
      <Typography variant="body1">{numeral(x.held_no_shares).format('0,0')}</Typography>
    ),
    AVGPrice: <Typography variant="body1">${numeral(x.avg_price).format('0,0.00')}</Typography>,
    invtValue: (
      <Typography variant="body1">${numeral(x.purchase_value).format('0,0.00')}</Typography>
    ),
    lastTradePrice: (
      <Typography variant="body1">${numeral(x.last_trade_price).format('0,0.00')}</Typography>
    ),
    currentInvtValue: (
      <Typography variant="body1">${numeral(x.current_value).format('0,0.00')}</Typography>
    ),
    returnAmt: (
      <Typography variant="body1">${numeral(x.return_amount).format('0,0.00')}</Typography>
    ),
    returnPct: (
      <Typography variant="body1">{numeral(x.return_percent).format('0,0.00')}</Typography>
    ),
    issuedCoins: (
      <Typography variant="body1">{numeral(x.issued_coins / 1000000).format('0,0.00')}</Typography>
    ),
    percentOfTotalSupply: (
      <Typography variant="body1">{numeral(x.percent_of_total_supply).format('0,0.00')}</Typography>
    ),
    moreDetails: (
      <HtmlTooltip
        title={
          <div className={classes.flex}>
            <div>
              <Typography variant="h5" color="inherit" className={classes.toolTip}>
                AUM: <b>${x.aum}</b>
              </Typography>
              <Typography variant="h5" color="inherit" className={classes.toolTip}>
                One YR TR: <b>${numeral(x.one_yr_tr).format('0.00')}</b>
              </Typography>
              <Typography variant="h5" color="inherit" className={classes.toolTip}>
                Two YR TR: <b>${numeral(x.two_yr_tr).format('0.00')}</b>
              </Typography>
              <Typography variant="h5" color="inherit" className={classes.toolTip}>
                Three YR TR: <b>${numeral(x.three_yr_tr).format('0.00')}</b>
              </Typography>
              <Typography variant="h5" color="inherit" className={classes.toolTip}>
                Five YR TR: <b>${numeral(x.five_yr_tr).format('0.00')}</b>
              </Typography>
            </div>
            <div>
              <Typography variant="h5" color="inherit" className={classes.toolTip}>
                Expense Ratio: <b>${numeral(x.expense_ratio).format('0.00')}</b>
              </Typography>
              <Typography variant="h5" color="inherit" className={classes.toolTip}>
                Holder Name: <b>{x.holder_name}</b>
              </Typography>
              <Typography variant="h5" color="inherit" className={classes.toolTip}>
                Holder Type: <b>{x.holder_type}</b>
              </Typography>
              <Typography variant="h5" color="inherit" className={classes.toolTip}>
                Holder Country: <b>{x.holder_country}</b>
              </Typography>
            </div>
          </div>
        }
      >
        <HelpOutlineIcon />
      </HtmlTooltip>
    ),
  }));

  return (
    <div className={cx(className)}>
      {formattedData.map((x, i) => (
        <React.Fragment key={`${x.fundName}-${i}`}>
          <SingleHoldingMobile {...x} />
          {i !== formattedData.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Mobile;
