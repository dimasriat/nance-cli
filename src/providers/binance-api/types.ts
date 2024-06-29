export interface IBinanceApiProvider {
  checkServerTime(): Promise<CheckServerTimeResponse>;
  getAccountInformation(
    params: AccountInformationParams,
  ): Promise<AccountInformationResponse>;
  getCurrentAssetPrice(symbol: string): Promise<TickerPrice>;
}

export type AccountInformationParams = {
  timestamp: string;
  recvWindow?: string;
};

export type CheckServerTimeResponse = {
  serverTime: number;
};

export type AccountInformationResponse = {
  feeTier: number;
  feeBurn: boolean;
  canTrade: boolean;
  canDeposit: boolean;
  canWithdraw: boolean;
  updateTime: number;
  multiAssetsMargin: boolean;
  tradeGroupId: number;
  totalInitialMargin: string;
  totalMaintMargin: string;
  totalWalletBalance: string;
  totalUnrealizedProfit: string;
  totalMarginBalance: string;
  totalPositionInitialMargin: string;
  totalOpenOrderInitialMargin: string;
  totalCrossWalletBalance: string;
  totalCrossUnPnl: string;
  availableBalance: string;
  maxWithdrawAmount: string;
  assets: Asset[];
  positions: Position[];
};

export type Asset = {
  asset: string;
  walletBalance: string;
  unrealizedProfit: string;
  marginBalance: string;
  maintMargin: string;
  initialMargin: string;
  positionInitialMargin: string;
  openOrderInitialMargin: string;
  crossWalletBalance: string;
  crossUnPnl: string;
  availableBalance: string;
  maxWithdrawAmount: string;
  marginAvailable: boolean;
  updateTime: number;
};

export type Position = {
  symbol: string;
  initialMargin: string;
  maintMargin: string;
  unrealizedProfit: string;
  positionInitialMargin: string;
  openOrderInitialMargin: string;
  leverage: string;
  isolated: boolean;
  entryPrice: string;
  maxNotional: string;
  bidNotional: string;
  askNotional: string;
  positionSide: string;
  positionAmt: string;
  updateTime: number;
};

export type TickerPrice = {
  symbol: string;
  price: string;
  time: number;
};
