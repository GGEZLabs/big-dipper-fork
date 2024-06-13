import React from 'react';
import renderer from 'react-test-renderer';
import MockTheme from '@/tests/mocks/MockTheme';
import Desktop from '.';

// ==================================
// mocks
// ==================================

// ==================================
// unit tests
// ==================================
describe('screen: Home/Transactions/Desktop', () => {
  it('matches snapshot', () => {
    const component = renderer.create(
      <MockTheme>
        <Desktop
          holdings={[
            {
              asset_ticker: 'DSI',
              aum: '3.80B',
              avg_price: 77.82,
              current_value: 1616.48,
              expense_ratio: '0.25%',
              five_yr_tr: 11.55,
              fund_name: 'KLD 400 Social ETF',
              held_no_shares: 16,
              id: '4',
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
              asset_id: '4',
              holder_type: 'Brokerage Firm',
              holder_name: 'Interactive Brokers LLC',
              holder_id: '1',
              holder_country: 'US',
            },
          ]}
        />
      </MockTheme>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
