export type AccountPosition = {
  symbol: string;
  entryPrice: string;
  markPrice: string;
  unrealizedProfit: string;
  positionAmt: string;
  positionSide: string;
  leverage: string;
};

export type AccountState = {
  marginAsset: string;
  marginBalance: string;
  availableBalance: string;
  unrealizedProfit: string;
  positions: AccountPosition[];
};

export interface INance {
  checkServerTime(): Promise<number>;
  getAccountState(): Promise<AccountState>;
}
