import {
  IBinanceApiProvider,
  AccountInformationResponse,
} from '../providers/binance-api';
import { INance, AccountState } from '.';

export class Nance implements INance {
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
    try {
      const accountInformation = await this.api.getAccountInformation();
      return this._parseAccountState(accountInformation);
    } catch (error) {
      throw new Error('ERROR: GET_ACCOUNT_STATE');
    }
  }

  private _parseAccountState(
    accountInformation: AccountInformationResponse,
  ): AccountState {
    return {
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
  }
}
