import chainConfig from '@/chainConfig';
import Box from '@/components/box';
import { readMarket } from '@/recoil/market';
import { useStyles } from '@/screens/account_details/components/balance/styles';
import { formatBalanceData } from '@/screens/account_details/components/balance/utils';
import { formatNumber } from '@/utils/format_token';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Big from 'big.js';
import classnames from 'classnames';
import useTranslation from 'next-translate/useTranslation';
import numeral from 'numeral';
import React from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { useRecoilValue } from 'recoil';

type Props = Parameters<typeof formatBalanceData>[0] & {
  className?: string;
  total: TokenUnit;
};

const Balance: React.FC<Props> = (props) => {
  const { t } = useTranslation('accounts');
  const { classes, theme } = useStyles();
  const market = useRecoilValue(readMarket);
  const formattedChartData = formatBalanceData(props);

  const empty = {
    key: 'empty',
    value: 2400,
    background: theme.palette.custom.charts.zero,
    display: '',
  };

  const backgrounds = [
    theme.palette.custom.charts.one,
    theme.palette.custom.charts.two,
    theme.palette.custom.charts.three,
    theme.palette.custom.charts.four,
    theme.palette.custom.charts.five,
  ];

  const formatData = formattedChartData.map((x, i) => ({
    ...x,
    value: numeral(x.value).value(),
    background: backgrounds[i],
  }));

  const notEmpty = formatData.some((x) => x.value && Big(x.value).gt(0));

  const dataCount = formatData.filter((x) => x.value && Big(x.value).gt(0)).length;
  const data = notEmpty ? formatData : [...formatData, empty];
  const totalAmount = `$${numeral(
    Big(market.price || 0)
      ?.times(props.total.value)
      .toPrecision()
  ).format('0,0.00')}`;

  // format
  const totalDisplay = formatNumber(props.total.value, props.total.exponent);

  return (
    <Box className={classnames(props.className, classes.root)}>
      <Typography variant="h2">{t('balance')}</Typography>
      <div className={classes.chartWrapper}>
        <div className={classes.chart}>
          <ResponsiveContainer width="99%">
            <PieChart>
              <Pie
                dataKey="value"
                data={data}
                isAnimationActive={false}
                innerRadius="90%"
                outerRadius="100%"
                cornerRadius={40}
                paddingAngle={dataCount > 1 ? 5 : 0}
                fill="#82ca9d"
                stroke="none"
              >
                {data.map((entry, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <Cell key={`cell-${index}`} fill={entry.background} stroke={entry.background} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className={classes.legends}>
          {data.map((x) => {
            if (x.key.toLowerCase() === 'empty') {
              return null;
            }

            return (
              <div key={x.key} className="legends__single--container">
                <div className="single__label--container">
                  <div className="legend-color" style={{ background: x.background }} />
                  <Typography variant="body1">{t(x.key)}</Typography>
                </div>
                <Typography variant="body1">{x.display}</Typography>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <Divider className={classes.divider} />
        <div className={classes.total}>
          <div className="total__single--container">
            <Typography variant="h3" className="label">
              {t('total', {
                unit: props.total.displayDenom.toUpperCase(),
              })}
            </Typography>
            <Typography variant="h3">{totalDisplay}</Typography>
          </div>
          <div className="total__secondary--container total__single--container">
            <Typography variant="body1" className="label">
              ${numeral(market.price).format('0,0.[00]', Math.floor)} /{' '}
              {(
                chainConfig().tokenUnits?.[chainConfig().primaryTokenUnit]?.display ?? ''
              ).toUpperCase()}
            </Typography>
            <Typography variant="body1">{totalAmount}</Typography>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default Balance;