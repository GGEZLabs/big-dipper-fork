import { ChainInfo } from '@keplr-wallet/types';
// The Cosmos Hub Testnet chain parameters
export const getTestnetChainInfo = (): ChainInfo => ({
  chainId: 'ggezchain',
  chainName: 'GGEZ Chain',
  chainSymbolImageUrl:
    'https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/osmosis/chain.png',
  rpc: process.env.NEXT_PUBLIC_RPC_URL,
  rest: process.env.NEXT_PUBLIC_REST_URL,
  nodeProvider: {
    name: 'main chain ',
    email: 'kafaha@ggez.com',
    website: 'https://ggez.one.com/',
  },
  bip44: {
    coinType: 118,
  },
  bech32Config: {
    bech32PrefixAccAddr: 'ggez',
    bech32PrefixAccPub: 'ggez' + 'pub',
    bech32PrefixValAddr: 'ggez' + 'valoper',
    bech32PrefixValPub: 'ggez' + 'valoperpub',
    bech32PrefixConsAddr: 'ggez' + 'valcons',
    bech32PrefixConsPub: 'ggez' + 'valconspub',
  },
  currencies: [
    {
      coinDenom: 'UGGEZ',
      coinMinimalDenom: 'uggez',
      coinDecimals: 0,
      coinGeckoId: 'STX',
    },
    {
      coinDenom: 'MGGEZ',
      coinMinimalDenom: 'mggez',
      coinDecimals: 3,
      coinGeckoId: 'STX',
    },
    {
      coinDenom: 'GGEZ',
      coinMinimalDenom: 'ggez',
      coinDecimals: 6,
      coinGeckoId: 'STX',
    },
    {
      coinDenom: 'UGGEZ1',
      coinMinimalDenom: 'uggez1',
      coinDecimals: 0,
      coinGeckoId: 'XDC',
    },
    {
      coinDenom: 'MGGEZ1',
      coinMinimalDenom: 'mggez1',
      coinDecimals: 3,
      coinGeckoId: 'XDC',
    },
    {
      coinDenom: 'GGEZ1',
      coinMinimalDenom: 'ggez1',
      coinDecimals: 6,
      coinGeckoId: 'XDC',
    },
  ],
  feeCurrencies: [
    {
      coinDenom: 'UGGEZ',
      coinMinimalDenom: 'uggez',
      coinDecimals: 0,
      coinGeckoId: 'STX',
      gasPriceStep: {
        low: 0.001,
        average: 0.0025,
        high: 0.003,
      },
    },
    {
      coinDenom: 'MGGEZ',
      coinMinimalDenom: 'mggez',
      coinDecimals: 3,
      coinGeckoId: 'STX',
      gasPriceStep: {
        low: 0.001,
        average: 0.0025,
        high: 0.003,
      },
    },
    {
      coinDenom: 'GGEZ',
      coinMinimalDenom: 'ggez',
      coinDecimals: 6,
      coinGeckoId: 'STX',
      gasPriceStep: {
        low: 0.001,
        average: 0.0025,
        high: 0.003,
      },
    },
    {
      coinDenom: 'UGGEZ1',
      coinMinimalDenom: 'uggez1',
      coinDecimals: 0,
      coinGeckoId: 'XDC',
      gasPriceStep: {
        low: 0.001,
        average: 0.0025,
        high: 0.003,
      },
    },
    {
      coinDenom: 'MGGEZ1',
      coinMinimalDenom: 'mggez1',
      coinDecimals: 3,
      coinGeckoId: 'XDC',
      gasPriceStep: {
        low: 0.001,
        average: 0.0025,
        high: 0.003,
      },
    },
    {
      coinDenom: 'GGEZ1',
      coinMinimalDenom: 'ggez1',
      coinDecimals: 6,
      coinGeckoId: 'XDC',
      gasPriceStep: {
        low: 0.001,
        average: 0.0025,
        high: 0.003,
      },
    },
  ],
  stakeCurrency: {
    coinDenom: 'UGGEZ1',
    coinMinimalDenom: 'uggez1',
    coinDecimals: 0,
    coinGeckoId: 'XDC',
  },
  coinType: 118,
  features: ['stargate'],
});
