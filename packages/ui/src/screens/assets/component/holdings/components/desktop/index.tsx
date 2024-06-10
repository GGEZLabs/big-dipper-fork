/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-shadow */
import React from 'react';
import numeral from 'numeral';
import useAppTranslation from '@/hooks/useAppTranslation';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Link from 'next/link';
import useStyles from './styles';
import { columns } from './utils';
import { HoldingsListState } from '../../types';

const Desktop: React.FC<HoldingsListState> = ({ className, holdings }) => {
  const { classes, cx } = useStyles();
  const { t, i18n } = useAppTranslation('assets');
  const lang = i18n.language;
  const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} placement="top-start" />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 480,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
      padding: 10,
    },
  }));
  const formatData = holdings.map((x) => ({
    ticker: (
      <Link href={`https://www.etf.com/${x.asset_ticker}`}>
        {/* <Typography variant="body1" component="a" target="_blank"> */}
        {x.asset_ticker}
        {/* </Typography> */}
      </Link>
    ),
    fundName: x.fund_name, // <Typography variant="body1">{x.fund_name}</Typography>,
    issuer: x.issuer, // <Typography variant="body1">{x.issuer}</Typography>,
    segment: x.segment, // <Typography variant="body1">{x.segment}</Typography>,
    heldNoShares: numeral(x.held_no_shares).format('0,0'),
    //  (  <Typography variant="body1">{numeral(x.held_no_shares).format('0,0')}</Typography>),
    AVGPrice: `$${numeral(x.avg_price).format('0,0.00')}`, // <Typography variant="body1">${numeral(x.avg_price).format('0,0.00')}</Typography>,
    invtValue: `$${numeral(x.purchase_value).format('0,0.00')}`, // (<Typography variant="body1">${numeral(x.purchase_value).format('0,0.00')}</Typography>),
    lastTradePrice: `$${numeral(x.last_trade_price).format('0,0.00')}`, // (<Typography variant="body1">${numeral(x.last_trade_price).format('0,0.00')}</Typography>),
    currentInvtValue: `$${numeral(x.current_value).format('0,0.00')}`, // (<Typography variant="body1">${numeral(x.current_value).format('0,0.00')}</Typography>),
    returnAmt: `$${numeral(x.return_amount).format('0,0.00')}`, // (<Typography variant="body1">${numeral(x.return_amount).format('0,0.00')}</Typography>),
    returnPct: numeral(x.return_percent).format('0,0.00'), // (<Typography variant="body1">{numeral(x.return_percent).format('0,0.00')}</Typography>),
    issuedCoins: numeral(x.issued_coins / 1000000).format('0,0.00'),
    // (<Typography variant="body1">{numeral(x.issued_coins / 1000000).format('0,0.00')}</Typography>),
    percentOfTotalSupply: numeral(x.percent_of_total_supply).format('0,0.00'), // (<Typography variant="body1">{numeral(x.percent_of_total_supply).format('0,0.00')}</Typography>),
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
    <div className={cx(className, classes.root)}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.key}
                align={lang == 'ar' ? 'right' : 'left'}
                style={{ width: `${column.width}%` }}
              >
                {t(column.key)}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {formatData.map((row, i) => (
            <TableRow key={`row-${i}`}>
              {columns.map((column, index) => {
                const { key, align } = column;
                const item = row[key];
                return (
                  <TableCell
                    style={{ width: `${column.width}%` }}
                    align={align}
                    key={`${key}-${index}`}
                  >
                    {item}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Desktop;
