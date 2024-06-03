import { useEffect } from 'react';
import { Coin, StargateClient } from '@cosmjs/stargate';

import { writeFaucetTwo } from '@/recoil/tryout/faucetTwo';
import { useRecoilState, SetterOrUpdater } from 'recoil';
import { AtomFaucetTwoState } from './types';
export const useTryoutFaucetTwoRecoil = () => {
  const [faucetTwo, setFaucetTwo] = useRecoilState(writeFaucetTwo) as [
    AtomFaucetTwoState,
    SetterOrUpdater<AtomFaucetTwoState>,
  ];

  const initFaucetTwo = async () =>
    updateFaucetBalance(await StargateClient.connect(process.env.NEXT_PUBLIC_RPC_URL));

  useEffect(() => {
    setTimeout(initFaucetTwo, 500);
  }, []);

  const updateFaucetBalance = async (client: StargateClient) => {
    const balancesFacuetTwo: readonly Coin[] = await client.getAllBalances(
      process.env.NEXT_PUBLIC_FAUCET_ADDRESS_TWO
    );

    const ggezFaucetTwoBalance: Coin = balancesFacuetTwo[0];
    const ggezOneFaucetTwoBalance: Coin = balancesFacuetTwo[1];

    let data = {
      addressFaucetTwo: process.env.NEXT_PUBLIC_FAUCET_ADDRESS_TWO,
      balanceGGEZFaucetTwo: ggezFaucetTwoBalance?.amount,
      balanceGGEZOneFaucetTwo: ggezOneFaucetTwoBalance?.amount,
      GGEZDenom: ggezFaucetTwoBalance?.denom
        ? ggezFaucetTwoBalance?.denom
        : ggezOneFaucetTwoBalance?.denom == 'uggez'
          ? 'uggez1'
          : 'uggez',
      GGEZOneDenom: ggezOneFaucetTwoBalance?.denom
        ? ggezOneFaucetTwoBalance?.denom
        : ggezFaucetTwoBalance?.denom == 'uggez'
          ? 'uggez1'
          : 'uggez',
    };

    setFaucetTwo(data);
  };

  return {
    faucetTwo,
    initFaucetTwo,
  };
};
