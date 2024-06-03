import { atom } from 'recoil';

type AtomFaucetOneState = {
  addressFaucetOne: string | null;
  balanceGGEZFaucetOne: string | null;
  balanceGGEZOneFaucetOne: string | null;
  GGEZDenom: string | null;
  GGEZOneDenom: string | null;
};
const initialState: AtomFaucetOneState = {
  addressFaucetOne: '',
  balanceGGEZFaucetOne: '',
  balanceGGEZOneFaucetOne: '',
  GGEZDenom: '',
  GGEZOneDenom: '',
};
export const atomState = atom<AtomFaucetOneState>({
  key: 'faucetOne',
  default: initialState,
});
