import { atom } from 'recoil';
import { AtomFaucetTwoState } from './utils';

const initialState: AtomFaucetTwoState = {
  addressFaucetTwo: '',
  balanceGGEZFaucetTwo: '',
  balanceGGEZOneFaucetTwo: '',
  GGEZDenom: '',
  GGEZOneDenom: '',
};

export const atomState = atom<AtomFaucetTwoState>({
  key: 'facuetTwo',
  default: initialState,
});
