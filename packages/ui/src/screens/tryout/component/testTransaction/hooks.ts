// import { readFile } from "fs/promises";
// import { promises as fs } from "fs";
// import { promises as fsPromises } from 'fs';
import { DirectSecp256k1HdWallet, OfflineDirectSigner } from '@cosmjs/proto-signing';
import { useState } from 'react';
import { toast } from 'react-toastify';
import copy from 'copy-to-clipboard';
import { SigningStargateClient } from '@cosmjs/stargate';
import { useTryoutFaucetOneRecoil } from '@/recoil/tryout/faucetOne';
import { readKeplrWallet, useTryoutKeplrAccountRecoil } from '@/recoil/tryout/keplrWallet';
import { useTryoutFaucetTwoRecoil } from '@/recoil/tryout/faucetTwo';
import { useGenerateMnemonicRecoil } from '@/recoil/tryout/createAccount';
import { useRecoilValue } from 'recoil';
import { readCreateAccount } from '@/recoil/tryout/createAccount';

export const useTestTransaction = () => {
  const [state, setState] = useState<{
    sender: string;
    receiver: string;
    amount: string;
    denom: string;
    fee: string;
    gas: string;
    transactionHash: string;
    memo: string;
  }>({
    sender: '',
    receiver: '',
    amount: '',
    denom: '',
    fee: '2000',
    gas: '200000',
    transactionHash: '',
    memo: '',
  });

  const { initFaucetOne } = useTryoutFaucetOneRecoil();
  const { initFaucetTwo } = useTryoutFaucetTwoRecoil();
  const { connectKeplr } = useTryoutKeplrAccountRecoil();
  const { initCreateAccount } = useGenerateMnemonicRecoil();

  const createAccountState = useRecoilValue(readCreateAccount);
  const keplrState = useRecoilValue(readKeplrWallet);

  const getFaucetOneSignerFromMnemonic = async (): Promise<OfflineDirectSigner> => {
    return DirectSecp256k1HdWallet.fromMnemonic(
      //(await readFile("./testnet.faucet1.mnemonic.key")).toString(),
      process.env.NEXT_PUBLIC_MENEMONIC_FAUCET_ONE,
      {
        prefix: 'ggez',
      }
    );
  };

  const getFaucetTwoSignerFromMnemonic = async (): Promise<OfflineDirectSigner> => {
    return DirectSecp256k1HdWallet.fromMnemonic(process.env.NEXT_PUBLIC_MENEMONIC_FAUCET_Two, {
      prefix: 'ggez',
    });
  };
  const getSignerFromMnemonic = async (): Promise<OfflineDirectSigner> => {
    return DirectSecp256k1HdWallet.fromMnemonic(createAccountState.accountMnemonic, {
      prefix: 'ggez',
    });
  };
  const processTransaction = async () => {
    const faucetOneSigner: OfflineDirectSigner =
      state.sender == process.env.NEXT_PUBLIC_FAUCET_ADDRESS_ONE
        ? await getFaucetOneSignerFromMnemonic()
        : state.sender == process.env.NEXT_PUBLIC_FAUCET_ADDRESS_TWO
          ? await getFaucetTwoSignerFromMnemonic()
          : await getSignerFromMnemonic();

    const signingClient = await SigningStargateClient.connectWithSigner(
      process.env.NEXT_PUBLIC_RPC_URL,
      faucetOneSigner
    );

    const result = await signingClient.signAndBroadcast(
      // the signerAddress
      state.sender,
      // the message(s)
      [
        {
          typeUrl: '/cosmos.bank.v1beta1.MsgSend',
          value: {
            fromAddress: state.sender,
            toAddress:
              state.receiver.split('_')[0] == 'keplr'
                ? state.receiver.split('_')[1]
                : state.receiver,
            amount: [{ denom: state.denom, amount: state.amount }],
          },
        },
      ],
      // the fee
      {
        amount: [{ denom: state.denom, amount: state.fee }],
        gas: state.gas,
      },
      //memo
      state.memo
    );
    if (result.transactionHash) {
      console.log(result, '.....................................................................');
      setState({
        sender: state.sender,
        receiver: state.receiver,
        amount: state.amount,
        denom: state.denom,
        fee: '2000',
        gas: '200000',
        transactionHash: result.transactionHash,
        memo: state.memo,
      });
      state.transactionHash = result.transactionHash;
      initFaucetOne();
      initFaucetTwo();
      if (keplrState.keplerAdderss) {
        connectKeplr();
      }
      initCreateAccount();
    }
  };

  return {
    state,
    processTransaction,
  };
};
export const useAddress = (t) => {
  const handleCopyToClipboard = (value: string) => {
    copy(value);
    toast(t('common:copied'));
  };

  return {
    handleCopyToClipboard,
  };
};
