import renderer from 'react-test-renderer';
import CreateTrade from '@/components/msg/trade/create_trade';
import { MsgCreateTrade } from '@/models';
import MockTheme from '@/tests/mocks/MockTheme';

// ==================================
// mocks
// ==================================
jest.mock('@/components/name', () => (props: JSX.IntrinsicElements['div']) => (
  <div id="Name" {...props} />
));

// ==================================
// unit tests
// ==================================
describe('screen: TransactionDetails/MsgCreateTrade', () => {
  it('matches snapshot', () => {
    const message = MsgCreateTrade.fromJson({
      category: 'trade',
      type: 'MsgCreateTrade',
      json: {
        '@type': '/ggezchain.trade.MsgCreateTrade',
        creator: 'ggez1h9pkh42m22usf9am6s8wkesj4w50cxf8yfuxru',
        tradeType: 'buy',
        coin: 'uggez',
        price: '0.000000012040',
        quantity: '83056478',
        receiverAddress: 'ggez18ag4acmwnc2uxq2m5p8ydgps7rl72pwtal46fy',
        tradeData:
          '{"TradeData":{"tradeRequestID":27,"assetHolderID":1,"assetID":1,"tradeType":"buy","tradeValue":1,"currency":"USD","exchange":"US","fundName":"Low Carbon Target ETF","issuer":"Blackrock","noShares":"1","price":"0.000000012040","quantity":"83056478","segment":"Equity: Global Low Carbon","sharePrice":"1","ticker":"CRBN","tradeFee":"1","tradeNetPrice":"2","tradeNetValue":"2"},"Brokerage":{"name":"Interactive Brokers LLC","type":"Brokerage Firm","country":"840"}}',
      },
      creator: 'GGEZ1 Foundation',
    });
    const component = renderer.create(
      <MockTheme>
        <CreateTrade message={message} />
      </MockTheme>
    );
    const tree = component?.toJSON();
    expect(tree).toMatchSnapshot();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
