/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import {
  // useEffect,
  useState,
} from 'react';
import * as R from 'ramda';
import {
  useTradesListenerSubscription,
  TradesListenerSubscription,
} from '@/graphql/types/general_types';
// import { CronJob } from "cron";
import { TradesState } from './types';

export const useTrades = () => {
  const [state, setState] = useState<TradesState>({
    items: [],
  });

  const handleSetState = (stateChange: any) => {
    setState((prevState) => R.mergeDeepLeft(stateChange, prevState));
  };

  /// /////////////////////
  const dataArray = [
    {
      issuer: 'Mirae Asset Global Investments Co., Ltd',
      ticker: 'WNDY',
      fundName: 'Global X Wind Energy ETF',
      price: 17.14,
    },
    {
      issuer: 'Blackrock',
      ticker: 'ICLN',
      fundName: 'iShares Global Clean Energy ETF',
      price: 19.17,
    },
    {
      issuer: 'Blackrock',
      ticker: 'TUR',
      fundName: 'Shares MSCI Turkey ETF',
      price: 36.65,
    },
    {
      issuer: 'Blackrock',
      ticker: 'QAT',
      fundName: 'iShares MSCI Qatar ETF',
      price: 18.49,
    },
    {
      issuer: 'Blackrock',
      ticker: 'EWW',
      fundName: 'iShares MSCI Mexico ETF',
      price: 56.98,
    },
    {
      issuer: 'Blackrock',
      ticker: 'SHV',
      fundName: 'iShares Short Treasury Bond ETF',
      price: 110.1,
    },
    {
      issuer: 'Blackrock',
      ticker: 'IEMG',
      fundName: 'iShares Core MSCI Emerging Markets ETF',
      price: 46.99,
    },
    {
      issuer: 'Blackrock',
      ticker: 'REET',
      fundName: 'iShares Global REIT ETF',
      price: 22.38,
    },
    {
      issuer: 'Mirae Asset Global Investments Co., Ltd.',
      ticker: 'WNDY',
      fundName: 'Global X Wind Energy ETF',
      price: 17.14,
    },
    {
      issuer: 'Tidal',
      ticker: 'ENRG',
      fundName: 'SoFi Smart Energy ETF',
      price: 15.43,
    },
    {
      issuer: 'Nuveen Securities',
      ticker: 'NURE',
      fundName: 'Nuveen Short-Term REIT ETF',
      price: 29.02,
    },
    {
      issuer: 'Tidal',
      ticker: 'BOAT',
      fundName: 'SonicShares Global Shipping ET,F',
      price: 30.82,
    },
    {
      issuer: 'Tidal',
      ticker: 'CPII',
      fundName: 'Ionic Inflation Protection ETF',
      price: 19.61,
    },
    {
      issuer: 'Tidal',
      ticker: 'RISR',
      fundName: 'FolioBeyond Rising Rates ETF',
      price: 31.34,
    },
    {
      issuer: 'Tidal',
      ticker: 'SPAX',
      fundName: 'Robinson Alternative Yield Pre-Merger SPAC ETF',
      price: 21.05,
    },
    {
      issuer: 'Tidal',
      ticker: 'AZTD',
      fundName: 'Aztlan Global Stock Selection DM SMID ETF',
      price: 19.67,
    },
    {
      issuer: 'Tidal',
      ticker: 'SPUS',
      fundName: 'SP Funds S&P 500 Sharia Industry Exclusions ETF',
      price: 26.61,
    },
    {
      issuer: 'Tidal',
      ticker: 'SPSK',
      fundName: 'SP Funds Dow Jones Global Sukuk ETF',
      price: 17.72,
    },
    {
      issuer: 'Tidal',
      ticker: 'SFY',
      fundName: 'SoFi Social 50 ETF',
      price: 21.4,
    },
  ];

  const typeArray = ['Buy', 'Sell', 'Buy'];

  const generalNumber = (key, min, max) => {
    if (key == 'price') {
      return Math.random() * (max - min + 1) + min;
    }
    if (key == 'coin_minting_price') {
      return Math.random() * (max - min) + min;
    }
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const generalInvestment = (array) => {
    const object = array[Math.floor(Math.random() * array.length)];
    return object;
  };

  const object = () => {
    let data = {};
    const { issuer, ticker, fundName, price } = generalInvestment(dataArray);
    const type = generalInvestment(typeArray);
    const no_Shares =
      type == 'Buy'
        ? generalNumber('number of shares', 500, 4000)
        : -generalNumber('number of shares', 500, 4000);
    const value = no_Shares * price;
    const fee = value * 0.005;
    const net_value = type == 'Buy' ? value + fee : -(Math.abs(value) - Math.abs(fee));
    const net_price = type == 'Buy' ? price * 0.005 + price : price * 0.005 - price;
    const coin_minting_price = generalNumber('coin_minting_price', 0.01, 0.01999);
    const issued_coins = value / coin_minting_price;
    data = {
      asset_issuer: issuer,
      asset_ticker: ticker,
      fund_name: fundName,
      price,
      type,
      currency: 'USD',
      no_shares: no_Shares,
      value,
      fee,
      net_value,
      net_price,
      coin_minting_price,
      issued_coins,
    };
    return data;
  };

  // useEffect(() => {
  //   JobCron();
  // }, []);

  // const JobCron = () => {

  //   const cronJob = new CronJob("* * * * *", () => {
  //     bar();
  //   });

  //   if (!cronJob.running) {
  //     cronJob.start();
  //   }

  //   const bar = () => {

  //     object();
  //   };
  //   return cronJob ;
  // };

  /// ///////////////////

  // ================================
  // block subscription
  // ================================
  useTradesListenerSubscription({
    onData: (data) => {
      handleSetState({
        items: formatTrades(data.data.data),
      });
    },
  });

  const formatTrades = (data: TradesListenerSubscription) =>
    data.trades.map((x) => ({
      asset_ticker: x.asset_ticker,
      txs: x.fund_name,
      issued_coins: x.issued_coins,
      timestamp: x.timestamp,
      coin_minting_price: x.coin_minting_price,
      currency: x.currency,
      fee: x.fee,
      net_price: x.net_price,
      net_value: x.net_value,
      no_shares: x.no_shares,
      price: x.price,
      type: x.type,
      value: x.value,
      fund_name: x.fund_name,
    }));

  return {
    state,
  };
};
