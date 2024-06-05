export const columns: {
  key: string;
  align?: 'left' | 'center' | 'right' | 'justify' | 'inherit';
  width: number;
}[] = [
  {
    key: 'ticker',
    width: 5,
  },
  {
    key: 'fundName',
    width: 13,
  },
  {
    key: 'issuer',
    align: 'right',
    width: 10,
  },
  {
    key: 'segment',
    align: 'right',
    width: 10,
  },
  {
    key: 'heldNoShares',
    align: 'right',
    width: 6,
  },
  {
    key: 'AVGPrice',
    width: 6,
  },
  {
    key: 'invtValue',
    width: 6,
  },
  {
    key: 'lastTradePrice',
    align: 'right',
    width: 6,
  },
  {
    key: 'currentInvtValue',
    align: 'right',
    width: 7,
  },
  {
    key: 'returnAmt',
    align: 'right',
    width: 6,
  },
  {
    key: 'returnPct',
    align: 'right',
    width: 4,
  },
  {
    key: 'issuedCoins',
    align: 'right',
    width: 6,
  },
  {
    key: 'percentOfTotalSupply',
    align: 'right',
    width: 7,
  },
  {
    key: 'moreDetails',
    align: 'right',
    width: 4,
  },
];
