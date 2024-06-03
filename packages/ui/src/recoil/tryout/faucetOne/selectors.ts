import { selector } from 'recoil';
import { mergeStateChange } from '@/utils/merge_state_change';
import { atomState } from './atom';
import { AtomFaucetOneState } from './types';

const getFaucetOne = ({ get }): AtomFaucetOneState => {
  const state = get(atomState);

  return state;
};

export const writeFaucetOne = selector({
  key: 'tryout.write.faucetOne',
  get: getFaucetOne,
  set: ({ get, set }, value: AtomFaucetOneState) => {
    const prevState = get(atomState);
    const newState = mergeStateChange(prevState, value);
    set(atomState, newState);
  },
});

export const readFaucetOne = selector({
  key: 'tryout.read.faucetOne',
  get: getFaucetOne,
});
