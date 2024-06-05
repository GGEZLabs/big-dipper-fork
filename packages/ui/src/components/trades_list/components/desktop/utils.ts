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
    width: 15,
  },
  {
    key: 'type',
    align: 'right',
    width: 5,
  },
  {
    key: 'heldNoShares',
    align: 'right',
    width: 8,
  },
  {
    key: 'currency',
    align: 'right',
    width: 5,
  },
  {
    key: 'price',
    width: 5,
  },
  {
    key: 'value',
    width: 5,
  },
  {
    key: 'fee',
    align: 'right',
    width: 5,
  },
  {
    key: 'netValue',
    align: 'right',
    width: 7,
  },
  {
    key: 'netPrice',
    align: 'right',
    width: 5,
  },
  {
    key: 'issuedCoins',
    align: 'right',
    width: 10,
  },
  {
    key: 'coinMintingPrice',
    align: 'right',
    width: 10,
  },
  {
    key: 'time',
    align: 'right',
    width: 15,
  },
];
