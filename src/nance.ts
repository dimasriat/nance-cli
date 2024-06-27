import { IBinanceApiProvider } from './binance-api-provider';

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

export class Nance {
  constructor(private api: IBinanceApiProvider) {}

  public async checkServerTime(): Promise<number> {
    try {
      const checkServerTime = await this.api.checkServerTime();
      return checkServerTime.serverTime;
    } catch (error) {
      throw new Error('ERROR: CHECK_SERVER_TIME');
    }
  }

  public async getAccountState(): Promise<AccountState> {
    const accountInformation = await this.api.getAccountInformation();
    const accountState: AccountState = {
      marginAsset: 'USDT',
      marginBalance: accountInformation.totalMarginBalance,
      availableBalance: accountInformation.availableBalance,
      unrealizedProfit: accountInformation.totalCrossUnPnl,
      positions: accountInformation.positions.map((position) => ({
        symbol: position.symbol,
        entryPrice: position.entryPrice,
        markPrice: position.entryPrice,
        unrealizedProfit: position.unrealizedProfit,
        positionAmt: position.positionAmt,
        positionSide: position.positionSide,
        leverage: position.leverage,
      })),
    };
    return accountState;
  }
}
