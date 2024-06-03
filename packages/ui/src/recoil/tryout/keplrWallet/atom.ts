import { atom } from 'recoil';
import { AtomKeplrWalletState } from './types';

const initialState: AtomKeplrWalletState = {
  keplerAdderss: '',
  balanceGGEZKeplr: '',
  balanceGGEZOneKeplr: '',
  GGEZDenom: '',
  GGEZOneDenom: '',
  userNameKeplr: '',
  installKeplrError: '',
  addAccountKeplrError: '',
};

export const atomState = atom<AtomKeplrWalletState>({
  key: 'keplrWallet',
  default: initialState,
});
