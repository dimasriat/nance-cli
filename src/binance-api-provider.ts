export interface IBinanceApiProvider {
  checkServerTime(): Promise<CheckServerTimeResponse>;
  getAccountInformation(): Promise<AccountInformationResponse>;
}

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

export class BinanceApiProvider implements IBinanceApiProvider {
  public async checkServerTime(): Promise<CheckServerTimeResponse> {
    const response =
      await this._getBinance<CheckServerTimeResponse>('/fapi/v1/time');
    return response;
  }

  public async getAccountInformation(): Promise<AccountInformationResponse> {
    const response =
      await this._getBinance<AccountInformationResponse>('/fapi/v2/account');
    return response;
  }

  private async _getBinance<T>(path: string): Promise<T> {
    const response = await fetch(path);
    return (await response.json()) as T;
  }
}
