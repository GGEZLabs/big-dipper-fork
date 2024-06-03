import { selector } from 'recoil';
import { mergeStateChange } from '@/utils/merge_state_change';
import { atomState } from './atom';
import { AtomKeplrWalletState } from './types';

const getKeplrWallet = ({ get }): AtomKeplrWalletState => {
  const state = get(atomState);

  return state;
};

export const writeKeplrWallet = selector({
  key: 'tryout.write.keplrWallet',
  get: getKeplrWallet,
  set: ({ get, set }, value: AtomKeplrWalletState) => {
    const prevState = get(atomState);
    const newState = mergeStateChange(prevState, value);
    set(atomState, newState);
  },
});

export const readKeplrWallet = selector({
  key: 'tryout.read.keplrWallet',
  get: getKeplrWallet,
});
