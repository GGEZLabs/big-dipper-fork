import { atom } from 'recoil';
import { AtomCreateAccountState } from './types';

const initialState: AtomCreateAccountState = {
  accountBalanceGGEZ: '',
  accountBalanceGGEZOne: '',
  accountGGEZDenom: '',
  accountGGEZOneDenom: '',
  accountMnemonic: '',
  accountAddress: '',
  accountName: '',
  accountNumber: '',
  accountPublicKey: '',
};

export const atomState = atom<AtomCreateAccountState>({
  key: 'createAccount',
  default: initialState,
});
