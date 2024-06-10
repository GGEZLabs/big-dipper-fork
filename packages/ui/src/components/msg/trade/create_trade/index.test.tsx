import React from 'react';
import { RecoilRoot } from 'recoil';
import renderer from 'react-test-renderer';
import { MockTheme } from '@tests/utils';
import { MsgCreateTrade } from '@models';
import SaveProfile from '.';

// ==================================
// mocks
// ==================================
jest.mock('@components', () => ({
  Name: (props) => <div id="Name" {...props} />,
}));

// ==================================
// unit tests
// ==================================
describe('screen: TransactionDetails/SaveProfile', () => {
  it('matches snapshot', () => {
    const message = new MsgCreateTrade({
      category: 'trade',
      type: 'MsgCreateTrade',
      creator: 'creator',
    });
    const component = renderer.create(
      <RecoilRoot>
        <MockTheme>
          <SaveProfile message={message} />
        </MockTheme>
      </RecoilRoot>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
