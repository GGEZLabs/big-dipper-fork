import { useEffect, useState } from 'react';
import { Coin, StargateClient } from '@cosmjs/stargate';
import { writeFaucetOne } from '@/recoil/tryout/faucetOne';
import { AtomFaucetOneState } from '@/recoil/tryout/faucetOne/types';
import { useRecoilState, SetterOrUpdater } from 'recoil';

export const useTryoutFaucetOneRecoil = () => {
  /* const [state, setState] = useState<{
    faucetAddressOne: string;
    faucetAddressTwo: string;
    ggezFaucetOneBalance: number;
    ggezOneFaucetOneBalance: number;
    ggezFaucetTwoBalance: number;
    ggezOneFaucetTwoBalance: number;
    ggezDenom: string;
    ggezOneDenom: string;
  }>({
    faucetAddressOne: "",
    faucetAddressTwo: "",
    ggezFaucetOneBalance: 0,
    ggezOneFaucetOneBalance: 0,
    ggezFaucetTwoBalance: 0,
    ggezOneFaucetTwoBalance: 0,
    ggezDenom: "",
    ggezOneDenom: "",
  }); */

  const [faucetOne, setFaucetOne] = useRecoilState(writeFaucetOne) as [
    AtomFaucetOneState,
    SetterOrUpdater<AtomFaucetOneState>,
  ];

  const initFaucetOne = async () =>
    updateFaucetOneBalance(await StargateClient.connect(process.env.NEXT_PUBLIC_RPC_URL));

  useEffect(() => {
    setTimeout(initFaucetOne, 500);
  }, []);

  const updateFaucetOneBalance = async (client: StargateClient) => {
    const balancesFacuetOne: readonly Coin[] = await client.getAllBalances(
      process.env.NEXT_PUBLIC_FAUCET_ADDRESS_ONE
    );

    const balanceGGEZFaucetOne: Coin = balancesFacuetOne[0];
    const balanceGGEZOneFaucetOne: Coin = balancesFacuetOne[1];

    let data = {
      addressFaucetOne: process.env.NEXT_PUBLIC_FAUCET_ADDRESS_ONE,
      balanceGGEZFaucetOne: balanceGGEZFaucetOne?.amount,
      balanceGGEZOneFaucetOne: balanceGGEZOneFaucetOne?.amount,
      GGEZDenom: balanceGGEZFaucetOne?.denom
        ? balanceGGEZFaucetOne?.denom
        : balanceGGEZOneFaucetOne?.denom == 'uggez'
          ? 'uggez1'
          : 'uggez',
      GGEZOneDenom: balanceGGEZOneFaucetOne?.denom
        ? balanceGGEZOneFaucetOne?.denom
        : balanceGGEZFaucetOne?.denom == 'uggez'
          ? 'uggez1'
          : 'uggez',
    };
    // setState(formatFacuet(data));

    //setFaucetOne(formatFacuetOne(data));
    setFaucetOne(data);
  };

  /*  const formatFacuetOne = (data) => {
    const results = { ...faucetOne };

    results.addressFaucetOne = data.addressFaucetOne;
    results.balanceGGEZFaucetOne = data.balanceGgezFaucetOne;
    results.balanceGGEZOneFaucetOne = data.balanceGgezOneFaucetOne;

    return results;
  }; */

  return {
    // state,
    faucetOne,
    initFaucetOne,
  };
};
