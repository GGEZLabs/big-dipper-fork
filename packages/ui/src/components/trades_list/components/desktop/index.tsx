/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-nested-ternary */
/* eslint-disable eqeqeq */
import React from 'react';
import numeral from 'numeral';
import useAppTranslation from '@/hooks/useAppTranslation';

import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { TradesListState } from '../../types';
import useStyles from './styles';
import { columns } from './utils';

const Desktop: React.FC<TradesListState> = ({ className, trades }) => {
  const { classes, cx } = useStyles();
  const { t, i18n } = useAppTranslation('trades');
  const lang = i18n.language;

  const getCurrencyCode = (cur: string) => {
    cur == 'USD'
      ? (cur = '$')
      : cur == 'EUR'
        ? (cur = '€')
        : cur == 'YEN'
          ? (cur = '¥')
          : cur == 'GBP'
            ? (cur = '£ ')
            : cur == 'CNY'
              ? (cur = 'CN¥ ')
              : cur == 'CAD'
                ? (cur = '$')
                : cur == 'AUD'
                  ? (cur = '$')
                  : cur == 'CHF'
                    ? (cur = '₣')
                    : (cur = 'Not Found');
    return cur;
  };
  const formatData = trades.map((x) => ({
    ticker: (
      <Link href={`https://www.etf.com/${x.asset_ticker}`} passHref>
        <Typography variant="body1" component="a" target="_blank">
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
        {getCurrencyCode(x.currency) + numeral(x.price).format('0,0.00')}
      </Typography>
    ),
    value: (
      <Typography variant="body1" className="value">
        {getCurrencyCode(x.currency) + numeral(x.value).format('0,0.00')}
      </Typography>
    ),
    fee: (
      <Typography variant="body1" className="value">
        {getCurrencyCode(x.currency) + numeral(x.fee).format('0,0.00')}
      </Typography>
    ),
    netValue: (
      <Typography variant="body1" className="value">
        {getCurrencyCode(x.currency) + numeral(x.net_value).format('0,0.00')}
      </Typography>
    ),
    netPrice: (
      <Typography variant="body1" className="value">
        {getCurrencyCode(x.currency) + numeral(x.net_price).format('0,0.00')}
      </Typography>
    ),
    issuedCoins: (
      <Typography variant="body1" className="value">
        {numeral(x.issued_coins / 1000000).format('0,0.00')}
      </Typography>
    ),
    coinMintingPrice: (
      <Typography variant="body1" className="value">
        {getCurrencyCode(x.currency) + numeral(x.coin_minting_price * 1000000).format('0.0000')}
      </Typography>
    ),
    time: (
      <Typography variant="body1" className="value">
        {x.timestamp}
      </Typography>
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
                const { key } = column;
                const item = row[key];
                return (
                  <TableCell
                    style={{ width: `${column.width}%` }}
                    align={lang == 'ar' ? 'right' : 'left'}
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
