/* eslint-disable eqeqeq */
/* eslint-disable react/prop-types */
import React from 'react';
import numeral from 'numeral';
import Typography from '@mui/material/Typography';
import useAppTranslation from '@/hooks/useAppTranslation';
import { useRecoilValue } from 'recoil';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import CustomToolTip from '@/components/custom_tool_tip';
import { readDate } from '@/recoil/settings';
import dayjs, { formatDayJs } from '@/utils/dayjs';
import Box from '@/components/box';
import * as R from 'ramda';
import useStyles from './styles';
import { usePrice, useHero } from './hooks';

const TokenPrice = (props) => {
  const { classes, theme } = useStyles();
  const { t, i18n } = useAppTranslation('assets');
  const lang = i18n.language;

  const { tickPriceFormatter, formatTime } = usePrice();
  const { state } = useHero();

  const dateFormat = useRecoilValue(readDate);

  const uniqueAndSort = R.pipe(
    R.uniqBy(R.prop('time'))
    // R.sort(R.descend(R.prop('time'))),
  );
  const formatItems = state.portfolioPriceHistory.map((x) => ({
    time: formatTime(dayjs.utc(x.time), dateFormat),
    fullTime: formatDayJs(dayjs.utc(x.time), dateFormat),
    value: x.value,
  }));
  return (
    <Box className={props.className}>
      <div>
        <Typography variant="h2">{t('priceHistory')}</Typography>
        <div className={classes.chart}>
          <ResponsiveContainer width="99%">
            <AreaChart
              data={uniqueAndSort(formatItems)}
              margin={{
                top: 20,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={theme.palette.custom.primaryData.one}
                    stopOpacity={0.5}
                  />
                  <stop
                    offset="95%"
                    stopColor={theme.palette.custom.primaryData.three}
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid stroke={theme.palette.divider} />
              <XAxis
                dataKey="time"
                tickLine={false}
                // tickCount={20}
                stroke={theme.palette.custom.fonts.fontOne}
              />
              <YAxis
                tickLine={false}
                tickFormatter={tickPriceFormatter}
                orientation={lang == 'en' ? 'left' : 'right'}
                // padding={{top:20,bottom:10}}
                // minTickGap={30}
                tickMargin={lang == 'en' ? 0 : 40}
                stroke={theme.palette.custom.fonts.fontOne}
                // reversed={true}
                // tickCount={5}
                // domain={[0, 'dataMax + 1']}
                // domain={[0, 'dataMax']}
              />
              <Tooltip
                allowEscapeViewBox={{ x: false, y: true }}
                coordinate={{ x: 550, y: 550 }}
                cursor={false}
                content={
                  <CustomToolTip>
                    {(x) => (
                      <>
                        <Typography variant="caption">{x.fullTime}</Typography>
                        <Typography variant="body1">
                          ${numeral(x.value).format('0,0.0000')}
                        </Typography>
                      </>
                    )}
                  </CustomToolTip>
                }
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke={theme.palette.custom.primaryData.one}
                fillOpacity={0.3}
                fill={theme.palette.custom.primaryData.one}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Box>
  );
};

export default TokenPrice;
