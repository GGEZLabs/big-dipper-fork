/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-nested-ternary */
/* eslint-disable eqeqeq */
import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';

import numeral from 'numeral';
import Link from 'next/link';
import useAppTranslation from '@/hooks/useAppTranslation';
import useStyles from './styles';
import { columns } from './utils';
import { TradeType } from '../../types';

const Desktop: React.FC<{
  className?: string;
  items: TradeType[];
}> = ({ className, items }) => {
  const { t, i18n } = useAppTranslation('assets');
  const lang = i18n.language;

  const { classes, cx } = useStyles();
  let cur = '';

  const formattedData = items.map((x) => {
    x.currency == 'USD'
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
                    : (cur = 'Not Found');
    return {
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
          {cur + numeral(x.coin_minting_price * 1000000).format('0.0000')}
        </Typography>
      ),
      time: (
        <Typography variant="body1" className="value">
          {x.timestamp}
        </Typography>
      ),
    };
  });

  return (
    <div className={cx(className, classes.root)}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.key} align={lang == 'ar' ? 'right' : 'left'}>
                {t(column.key)}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {formattedData.map((row, i) => (
            <TableRow key={`row-${i}`}>
              {columns.map((column, index) => {
                const { key } = column;
                const item = row[key];
                return (
                  <TableCell align={lang == 'ar' ? 'right' : 'left'} key={`${key}-${index}`}>
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
