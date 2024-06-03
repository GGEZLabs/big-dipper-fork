import { selector } from 'recoil';
import { mergeStateChange } from '@/utils/merge_state_change';
import { atomState } from './atom';
import { AtomFaucetTwoState } from './utils';

const getFaucetTwo = ({ get }): AtomFaucetTwoState => {
  const state = get(atomState);

  return state;
};

export const writeFaucetTwo = selector({
  key: 'tryout.write.faucetTwo',
  get: getFaucetTwo,
  set: ({ get, set }, value: AtomFaucetTwoState) => {
    const prevState = get(atomState);
    const newState = mergeStateChange(prevState, value);
    set(atomState, newState);
  },
});

export const readFaucetTwo = selector({
  key: 'tryout.read.faucetTwo',
  get: getFaucetTwo,
});
