import { HoldingDocument, HoldingListenerDocument } from '@/graphql/types/general_types';
import Holdings from '@/screens/holdings';
import { mockClient } from '@/tests/mocks/mockApollo';
import MockTheme from '@/tests/mocks/MockTheme';
import wait from '@/tests/utils/wait';
import { ApolloProvider } from '@apollo/client';
import { MockedProvider } from '@apollo/client/testing';
import renderer from 'react-test-renderer';

// ==================================
// mocks
// ==================================
jest.mock('@/components/layout', () => (props: JSX.IntrinsicElements['div']) => (
  <div id="Layout" {...props} />
));
jest.mock('@/components/holdings_list', () => (props: JSX.IntrinsicElements['div']) => (
  <div id="HoldingsList" {...props} />
));
jest.mock('@/components/box', () => (props: JSX.IntrinsicElements['div']) => (
  <div id="Box" {...props} />
));
jest.mock('@/components/load_and_exist', () => (props: JSX.IntrinsicElements['div']) => (
  <div id="LoadAndExist" {...props} />
));

const mockHoldingsListenerDocument = jest.fn().mockReturnValue({
  data: {
    holding: [
      {
        asset_ticker: 'REET',
        aum: '3.08B',
        avg_price: 24.08,
        current_value: 2322,
        expense_ratio: '0.14%',
        five_yr_tr: 0,
        fund_name: 'iShares Global REIT ETF',
        held_no_shares: 100,
        id: 5,
        issued_coins: 226722180167,
        issuer: 'Blackrock',
        last_trade_price: 23.22,
        one_yr_tr: 2.03,
        percent_of_total_supply: 14.18,
        purchase_value: 2408,
        return_amount: -86,
        return_percent: -3.57,
        segment: 'Equity: Global REITs',
        three_yr_tr: 0,
        two_yr_tr: 0,
        asset_id: 5,
        currency: 'USD',
        exchange: 'US',
        country: 'USA',
        holder_type: 'Brokerage Firm',
        holder_name: 'Interactive Brokers LLC',
        holder_id: 1,
        holder_country: 'US',
        type: 'Exchnage Traded Assets',
      },
    ],
  },
});

const mockHoldingsDocument = jest.fn().mockReturnValue({
  data: {
    holding: [
      {
        asset_ticker: 'DSI',
        aum: '3.80B',
        avg_price: 77.82,
        current_value: 1616.48,
        expense_ratio: '0.25%',
        five_yr_tr: 11.55,
        fund_name: 'KLD 400 Social ETF',
        held_no_shares: 16,
        id: 4,
        issued_coins: 114008674911,
        issuer: 'Blackrock',
        last_trade_price: 101.03,
        one_yr_tr: 17.55,
        percent_of_total_supply: 2.01,
        purchase_value: 1245.12,
        return_amount: 371.36,
        return_percent: 29.83,
        segment: 'MSCI USA IMI',
        three_yr_tr: 13.5,
        two_yr_tr: 16.3,
        asset_id: 4,
        currency: 'USD',
        exchange: 'US',
        country: 'USA',
        holder_type: 'Brokerage Firm',
        holder_name: 'Interactive Brokers LLC',
        holder_id: 1,
        holder_country: 'US',
        type: 'Exchnage Traded Assets',
      },
      {
        asset_ticker: 'SUSA',
        aum: '4.02B',
        avg_price: 88.8,
        current_value: 2182.2,
        expense_ratio: '0.25%',
        five_yr_tr: 11.51,
        fund_name: 'USA ESG Select ETF',
        held_no_shares: 20,
        id: 3,
        issued_coins: 162875576037,
        issuer: 'Blackrock',
        last_trade_price: 109.11,
        one_yr_tr: 14.58,
        percent_of_total_supply: 10.46,
        purchase_value: 1776,
        return_amount: 406.2,
        return_percent: 22.87,
        segment: 'MSCI USA IMI',
        three_yr_tr: 0,
        two_yr_tr: 0,
        asset_id: 3,
        currency: 'USD',
        exchange: 'US',
        country: 'USA',
        holder_type: 'Brokerage Firm',
        holder_name: 'Interactive Brokers LLC',
        holder_id: 1,
        holder_country: 'US',
        type: 'Exchnage Traded Assets',
      },
      {
        asset_ticker: 'NURE',
        aum: '61.98M',
        avg_price: 31.93,
        current_value: 6085,
        expense_ratio: '0.35%',
        five_yr_tr: 0,
        fund_name: 'Nuveen Short-Term REIT ETF',
        held_no_shares: 200,
        id: 2,
        issued_coins: 584921292461,
        issuer: 'Nuveen Securities',
        last_trade_price: 30.425,
        one_yr_tr: -16.71,
        percent_of_total_supply: 37.61,
        purchase_value: 6386,
        return_amount: -301,
        return_percent: -4.71,
        segment: 'Equity: U.S. REITs',
        three_yr_tr: 5.18,
        two_yr_tr: 5.18,
        asset_id: 2,
        currency: 'USD',
        exchange: 'US',
        country: 'USA',
        holder_type: 'Brokerage Firm',
        holder_name: 'Interactive Brokers LLC',
        holder_id: 1,
        holder_country: 'US',
        type: 'Exchnage Traded Assets',
      },
    ],
  },
});

let component: renderer.ReactTestRenderer | undefined;

// ==================================
// unit tests
// ==================================
describe('screen: Holdings', () => {
  it('matches snapshot', async () => {
    renderer.act(() => {
      component = renderer.create(
        <ApolloProvider client={mockClient}>
          <MockedProvider
            mocks={[
              {
                request: {
                  query: HoldingListenerDocument,
                  variables: { limit: 1, offset: 0 },
                },
                result: mockHoldingsListenerDocument,
              },
              {
                request: { query: HoldingDocument, variables: { limit: 3, offset: 0 } },
                result: mockHoldingsDocument,
              },
            ]}
          >
            <MockTheme>
              <Holdings />
            </MockTheme>
          </MockedProvider>
        </ApolloProvider>
      );
    });
    await wait(renderer.act);
    const tree = component?.toJSON();
    expect(tree).toMatchSnapshot();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
