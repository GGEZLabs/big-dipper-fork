/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import useAppTranslation from '@/hooks/useAppTranslation';
import Box from '@/components/box';
import { PieChart, Pie, ResponsiveContainer, Sector } from 'recharts';
import useStyles from './styles';
import { useTokenomics } from './hooks';

const Tokenomics: React.FC<{
  className?: string;
  navTitle?: string;
}> = ({ className, navTitle }) => {
  const { t } = useAppTranslation('assets');
  const { classes, cx, theme } = useStyles();
  const { segmentState, issuerState } = useTokenomics();
  const COLORS = [
    '#F56EB3',
    '#CB1C8D',
    '#7F167F',
    '#460C68',
    '#432C7A',
    '#80489C',
    '#FF8FB1',
    '#7B2869',
    '#9D3C72',
    '#C85C8E',
    '#FFBABA',
    '#0088FE',
    '#00C49F',
    '#9b0bbf',
    '#FF8042',
    '#FFBB28',
  ];

  const segmentArray = [];
  const updateSegmentvariableName = (data) => {
    data.map((x, i) => {
      const obj = {
        name: x.segment,
        value: x.percent_of_total_supply,
        fill: COLORS[i],
      };
      segmentArray.push(obj);
    });
  };

  const issuerArray = [];
  const updateIssuertvariableName = (data) => {
    data.map((x, i) => {
      const obj = {
        name: x.issuer,
        value: x.percent_of_total_supply,
        fill: COLORS[i],
      };
      issuerArray.push(obj);
    });
  };
  updateSegmentvariableName(segmentState.items);
  updateIssuertvariableName(issuerState.items);

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;

    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'middle'}
        dominantBaseline="central"
      >
        {/*  {`${(percent * 100).toFixed(0)}%`} */}
      </text>
    );
  };

  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
      name,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + outerRadius * cos;
    const sy = cy + outerRadius * sin;
    const mx = cx + outerRadius * cos;
    const my = cy + outerRadius * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
      <g>
        <text fontWeight="bold" x={cx} y={262} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        {/*   <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" /> */}
        <text
          x={cx}
          // y={cy+ (outerRadius ) * cos}
          y={135}
          dy={8}
          textAnchor="middle"
          // textAnchor={textAnchor}
          fill={theme.palette.custom.fonts.fontOne} // "#333"
        >
          {' '}
          {`(${(percent * 100).toFixed(2)}%)`}
        </text>
        {/*  <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
          {`(${(percent * 100).toFixed(2)}%)`}
        </text> */}
      </g>
    );
  };

  const [state, setState] = useState<{ activeIndex: number }>({
    activeIndex: 0,
  });

  const onPieEnter = (_, index) => {
    setState({
      activeIndex: index,
    });
  };
  return (
    <Box className={cx(className, classes.root)}>
      <Typography variant="h2" className={classes.label}>
        {navTitle == 'Assets By Isuuer' ? t('assetsByIsuuerGraph') : t('assetsBySegmentGraph')}
      </Typography>

      <div className={classes.content}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={400}>
            {/*       <Pie
           stroke="none"
          //startAngle={180}
           //endAngle={0}
           isAnimationActive={false}
            data={navTitle==t('assetsByIsuuerGraph')?issuerArray:segmentArray}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            //innerRadius={60}
            outerRadius={50}
            //paddingAngle={5}
           // outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {navTitle==t('assetsByIsuuerGraph')?issuerArray.map((entry, index) => (
              <Cell key={`cell-${index}`}
              // fill={COLORS[index % COLORS.length]}
              fill={entry.fill}
               />
            ))
            :segmentArray.map((entry, index) => (
              <Cell key={`cell-${index}`}
              // fill={COLORS[index % COLORS.length]}
              fill={entry.fill}
               />
            ))
          }
          </Pie>  */}
            <Pie
              // stroke="none"
              // startAngle={180}
              // endAngle={0}
              /* isAnimationActive={false}
            data={navTitle==t('assetsByIsuuerGraph')?issuerArray:segmentArray}
            cx="50%"
            cy="50%"
            labelLine={false}
           label={renderCustomizedLabel}
            innerRadius={100}
            outerRadius={120}
            paddingAngle={5} */
              // outerRadius={80}
              // fill="#8884d8"
              // dataKey="value"
              activeIndex={state.activeIndex}
              activeShape={renderActiveShape}
              data={navTitle == 'Assets By Isuuer' ? issuerArray : segmentArray}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={82}
              fill={theme.palette.custom.consensus.zero} // "#8884d8"
              dataKey="value"
              onMouseEnter={onPieEnter}
              paddingAngle={3}
            >
              {/* {navTitle==t('assetsByIsuuerGraph')?issuerArray.map((entry, index) => (
              <Cell key={`cell-${index}`}
              // fill={COLORS[index % COLORS.length]}
              fill={entry.fill}
               />
            ))
            :segmentArray.map((entry, index) => (
              <Cell key={`cell-${index}`}
              // fill={COLORS[index % COLORS.length]}
              fill={entry.fill}
               />
            ))
          } */}
            </Pie>

            {/*    <Tooltip
            content={(
              <CustomToolTip>
                {(x) => {
                  return (
                    <>
                      <Typography variant="caption">
                         {x.name}
                     </Typography>
                      <Typography variant="body1">
                       
                        {' '}
                        (
                        {`${x.value}%`}
                        )
                      </Typography>
                    </>
                  );
                }}
              </CustomToolTip>
            )}
          /> 
 */}
          </PieChart>
        </ResponsiveContainer>
        {/* <div className={classes.legends}>
          {
           navTitle==t('assetsByIsuuerGraph')? issuerArray.map((x) => {
              return (
                <div className="legends__item" key={x.name}>
                  <Typography variant="caption">
                   {x.name}
                  </Typography>
                </div>
              );
            }) 
            :
            segmentArray.map((x) => {
              return (
                <div className="legends__item" key={x.name}>
                  <Typography variant="caption">
                   {x.name}
                  </Typography>
                </div>
              );
            }) 
          }
        </div> */}
      </div>
    </Box>
  );
};

export default Tokenomics;
