export type TradeType = {
  id: number;
  asset_ticker: string;
  fund_name: string;
  timestamp: string;
  type: string;
  no_shares: number;
  currency: string;
  price: string;
  value: string;
  fee: string;
  net_value: string;
  net_price: string;
  issued_coins: number;
  coin_minting_price: number;
};

export type TradesState = {
  items: TradeType[];
};

// export type ItemType = Override<TradeType>
