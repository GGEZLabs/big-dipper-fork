import { Window as KeplrWindow } from '@keplr-wallet/types';
import { AccountData, OfflineSigner } from '@cosmjs/proto-signing';
import { SigningStargateClient } from '@cosmjs/stargate';
import { getTestnetChainInfo } from './chainInf';
import chainConfigFile from '@/chain.json';
import { writeKeplrWallet } from '@/recoil/tryout/keplrWallet';
import { useRecoilState, SetterOrUpdater } from 'recoil';
import { AtomKeplrWalletState } from './types';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Window extends KeplrWindow {}
}
export const useTryoutKeplrAccountRecoil = () => {
  const [keplrWallet, setKeplrWallet] = useRecoilState(writeKeplrWallet) as [
    AtomKeplrWalletState,
    SetterOrUpdater<AtomKeplrWalletState>,
  ];
  const chainConfig = JSON.parse(chainConfigFile.keplr);

  const connectKeplr = async () => {
    const { keplr } = window;
    console.log('keplr :>> ', keplr);

    if (!keplr) {
      setKeplrWallet({
        keplerAdderss: '',
        balanceGGEZOneKeplr: '',
        balanceGGEZKeplr: '',
        userNameKeplr: '',
        GGEZDenom: '',
        GGEZOneDenom: '',
        installKeplrError: 'You need to install Keplr',
        addAccountKeplrError: '',
      });
    } else {
      try {
        console.log('sadadsadsadsadsasadsadsadsdasadsdafirst');
        await keplr.experimentalSuggestChain(getTestnetChainInfo());
        // Create the signing client
        const offlineSigner: OfflineSigner = window.getOfflineSigner!('ggezchain');
        const signingClient = await SigningStargateClient.connectWithSigner(
          process.env.NEXT_PUBLIC_RPC_URL,
          offlineSigner
        );
        console.log('signingClient :>> ', signingClient);
        const nameAccount = (await keplr.getKey('ggezchain')).name;
        console.log('nameAccount :>> ', nameAccount);

        // Get the address and balance of your user

        const account: AccountData = (await offlineSigner.getAccounts())[0];
        console.log('account :>> ', account);
        const accountAddress = account.address;
        console.log('accountAddress :>> ', accountAddress);
        const ggezAccountBalance = (
          await signingClient.getBalance(accountAddress, chainConfig.primaryTokenUnit)
        ).amount;
        const ggezOneAccountBalance = (
          await signingClient.getBalance(accountAddress, chainConfig.votingPowerTokenUnit)
        ).amount;

        const data = {
          keplerAdderss: accountAddress,
          balanceGGEZOneKeplr: ggezOneAccountBalance,
          balanceGGEZKeplr: ggezAccountBalance,
          userNameKeplr: nameAccount,
          GGEZDenom: chainConfig.primaryTokenUnit,
          GGEZOneDenom: chainConfig.votingPowerTokenUnit,
          installKeplrError: '',
          addAccountKeplrError: '',
        };

        setKeplrWallet(data);
      } catch (error) {
        setKeplrWallet({
          keplerAdderss: '',
          balanceGGEZOneKeplr: '',
          balanceGGEZKeplr: '',
          userNameKeplr: '',
          GGEZDenom: '',
          GGEZOneDenom: '',
          installKeplrError: '',
          addAccountKeplrError: 'Please create Keplr account',
        });
      }
    }
  };
  const disconnectKeplr = () => {
    const data = {
      keplerAdderss: '',
      balanceGGEZOneKeplr: '',
      balanceGGEZKeplr: '',
      userNameKeplr: '',
      GGEZDenom: '',
      GGEZOneDenom: '',
      installKeplrError: '',
      addAccountKeplrError: '',
    };
    setKeplrWallet(data);
  };

  return {
    connectKeplr,
    keplrWallet,
    disconnectKeplr,
    setKeplrWallet,
  };
};
