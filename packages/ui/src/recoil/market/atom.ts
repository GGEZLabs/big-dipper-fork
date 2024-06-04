import { atom } from 'recoil';
import type { AtomState } from '@/recoil/market/types';

const initialState: AtomState = {
  price: null,
  supply: {
    value: '0',
    displayDenom: '',
    baseDenom: '',
    exponent: 0,
  },
  marketCap: null,
  inflation: 0,
  communityPool: {
    value: '0',
    displayDenom: '',
    baseDenom: '',
    exponent: 0,
  },
  apr: 0,
  votingPrice: null,
  votingSupply: {
    value: '0',
    displayDenom: '',
    baseDenom: '',
    exponent: 0,
  },
  votingMarketCap: null,
  votingInflation: 0,
  votingCommunityPool: {
    value: '0',
    displayDenom: '',
    baseDenom: '',
    exponent: 0,
  },
  votingApr: 0,
};

export const atomState = atom<AtomState>({
  key: 'market',
  default: initialState,
});
