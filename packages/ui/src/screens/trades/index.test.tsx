import { TradesListenerDocument, TradesDocument } from '@/graphql/types/general_types';
import Trades from '@/screens/trades';
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
jest.mock('@/components/trades_list', () => (props: JSX.IntrinsicElements['div']) => (
  <div id="TradesList" {...props} />
));
jest.mock('@/components/box', () => (props: JSX.IntrinsicElements['div']) => (
  <div id="Box" {...props} />
));
jest.mock('@/components/load_and_exist', () => (props: JSX.IntrinsicElements['div']) => (
  <div id="LoadAndExist" {...props} />
));

const mockTradesListenerDocument = jest.fn().mockReturnValue({
  data: {
    trades: [
      {
        asset_ticker: 'CRBN',
        coin_minting_price: 1.0383e-8,
        currency: 'USD',
        fee: 21.56,
        fund_name: 'Low Carbon Target ETF',
        id: 9,
        issued_coins: 415371279977,
        net_price: 144.47866666666667,
        net_value: 4334.36,
        no_shares: 30,
        price: 143.76,
        type: 'buy',
        value: 4312.799999999999,
        timestamp: '2023-09-09T12:48:40.138522',
      },
    ],
  },
});

const mockTradesDocument = jest.fn().mockReturnValue({
  data: {
    trades: [
      {
        asset_ticker: 'CRBN',
        coin_minting_price: 1.0383e-8,
        currency: 'USD',
        fee: 21.56,
        fund_name: 'Low Carbon Target ETF',
        id: 9,
        issued_coins: 415371279977,
        net_price: 144.47866666666667,
        net_value: 4334.36,
        no_shares: 30,
        price: 143.76,
        type: 'buy',
        value: 4312.799999999999,
        timestamp: '2023-09-09T12:48:40.138522',
      },
      {
        asset_ticker: 'DSI',
        coin_minting_price: 1.0498e-8,
        currency: 'USD',
        fee: -75.49,
        fund_name: 'KLD 400 Social ETF',
        id: 8,
        issued_coins: 143817870070,
        net_price: 79.2645,
        net_value: -1585.29,
        no_shares: 20,
        price: 75.49,
        type: 'sell',
        value: -1509.8,
        timestamp: '2023-09-08T12:46:23.541618',
      },
      {
        asset_ticker: 'DSI',
        coin_minting_price: 1.0498e-8,
        currency: 'USD',
        fee: 3.77,
        fund_name: 'KLD 400 Social ETF',
        id: 7,
        issued_coins: 71908935035,
        net_price: 75.86699999999999,
        net_value: 758.67,
        no_shares: 10,
        price: 75.49,
        type: 'buy',
        value: 754.9,
        timestamp: '2023-09-07T12:42:44.103875',
      },
    ],
  },
});

let component: renderer.ReactTestRenderer | undefined;

// ==================================
// unit tests
// ==================================
describe('screen: Trades', () => {
  it('matches snapshot', async () => {
    renderer.act(() => {
      component = renderer.create(
        <ApolloProvider client={mockClient}>
          <MockedProvider
            mocks={[
              {
                request: {
                  query: TradesListenerDocument,
                  variables: { limit: 1, offset: 0 },
                },
                result: mockTradesListenerDocument,
              },
              {
                request: { query: TradesDocument, variables: { limit: 3, offset: 0 } },
                result: mockTradesDocument,
              },
            ]}
          >
            <MockTheme>
              <Trades />
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
