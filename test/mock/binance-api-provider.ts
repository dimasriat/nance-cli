import type {
  AccountInformationResponse,
  CheckServerTimeResponse,
  IBinanceApiProvider,
  TickerPrice,
} from '../../src/providers/binance-api';

export class MockBinanceApiProvider implements IBinanceApiProvider {
  private _isConnectionOk = true;

  private tickerPrice: Record<string, TickerPrice> = {};

  public setConnectionOk(ok: boolean): void {
    this._isConnectionOk = ok;
  }

  private _connectionErrorTest(): void {
    if (!this._isConnectionOk) {
      throw new Error(`ERROR FROM API`);
    }
  }

  public async checkServerTime(): Promise<CheckServerTimeResponse> {
    this._connectionErrorTest();
    const mockResult: CheckServerTimeResponse = {
      serverTime: 69420,
    };

    return mockResult;
  }

  public setTickerPrice(symbol: string, price: string): void {
    this.tickerPrice[symbol.toLowerCase()] = {
      symbol,
      price,
      time: 69420,
    };
  }

  public async getCurrentAssetPrice(symbol: string): Promise<TickerPrice> {
    this._connectionErrorTest();
    const mockResult = this.tickerPrice[symbol.toLowerCase()];

    return mockResult;
  }

  public async getAccountInformation(): Promise<AccountInformationResponse> {
    this._connectionErrorTest();

    const accountInformation: AccountInformationResponse = {
      feeTier: 69420,
      feeBurn: true,
      canTrade: true,
      canDeposit: true,
      canWithdraw: true,
      updateTime: 69420,
      multiAssetsMargin: true,
      tradeGroupId: 69420,
      totalInitialMargin: '1000',
      totalMaintMargin: '1000',
      totalWalletBalance: '1000',
      totalUnrealizedProfit: '0',
      totalMarginBalance: '1000',
      totalPositionInitialMargin: '1000',
      totalOpenOrderInitialMargin: '1000',
      totalCrossWalletBalance: '1000',
      totalCrossUnPnl: '0',
      availableBalance: '1000',
      maxWithdrawAmount: '1000',
      assets: [
        {
          asset: 'USDT',
          walletBalance: '1000',
          unrealizedProfit: '0',
          marginBalance: '1000',
          maintMargin: '1000',
          initialMargin: '1000',
          positionInitialMargin: '1000',
          openOrderInitialMargin: '1000',
          crossWalletBalance: '1000',
          crossUnPnl: '0',
          availableBalance: '1000',
          maxWithdrawAmount: '1000',
          marginAvailable: true,
          updateTime: 69420,
        },
      ],
      positions: [
        {
          symbol: 'BTCUSDT',
          initialMargin: '1000',
          maintMargin: '1000',
          unrealizedProfit: '0',
          positionInitialMargin: '1000',
          openOrderInitialMargin: '1000',
          leverage: '1',
          isolated: false,
          entryPrice: '1000',
          maxNotional: '1000',
          bidNotional: '1000',
          askNotional: '1000',
          positionSide: 'LONG',
          positionAmt: '1000',
          updateTime: 69420,
        },
      ],
    };

    return accountInformation;
  }
}
