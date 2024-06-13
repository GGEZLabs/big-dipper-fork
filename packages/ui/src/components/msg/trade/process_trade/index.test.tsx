import renderer from 'react-test-renderer';
import ProcessTrade from '@/components/msg/trade/process_trade';
import { MsgProcessTrade } from '@/models';
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
describe('screen: TransactionDetails/MsgProcessTrade', () => {
  it('matches snapshot', () => {
    const message = MsgProcessTrade.fromJson({
      category: 'trade',
      type: 'MsgProcessTrade',
      creator: 'GGEZ1 Foundation',
    });
    const component = renderer.create(
      <MockTheme>
        <ProcessTrade message={message} />
      </MockTheme>
    );
    const tree = component?.toJSON();
    expect(tree).toMatchSnapshot();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
