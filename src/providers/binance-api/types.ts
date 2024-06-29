export interface IBinanceApiProvider {
  checkServerTime(): Promise<GetPostBinanceResponse<CheckServerTimeResponse>>;

  getAccountInformation(
    params: AccountInformationParams,
  ): Promise<GetPostBinanceResponse<AccountInformationResponse>>;

  getCurrentAssetPrice(
    symbol: string,
  ): Promise<GetPostBinanceResponse<TickerPrice>>;

  getBinance<T>(params: GetBinanceParams): Promise<GetPostBinanceResponse<T>>;

  postSignedBinance<D extends Object, T>(
    params: PostSignedBinanceParams<D>,
  ): Promise<GetPostBinanceResponse<T>>;
}

export type GetBinanceParams = {
  path: `/${string}`;
};

export type GetPostBinanceResponse<T = void> = {
  status: 'success' | 'error';
  code: number;
  result?: T;
  errorMsg?: string;
};

export type PostSignedBinanceParams<D extends Object> = GetBinanceParams & {
  data: D;
};

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
