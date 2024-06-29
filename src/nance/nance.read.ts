import type { INance, AccountState } from './types';
import type { AccountInformationResponse } from '../providers/binance-api';

export class NanceRead {
  constructor(private nance: INance) {}

  public async getAccountState(): Promise<AccountState> {
    try {
      const accountInformation = await this.nance
        .getApi()
        .getAccountInformation({
          timestamp: Date.now().toString(),
        });
      return this._parseAccountState(accountInformation);
    } catch (error) {
      throw new Error('ERROR: GET_ACCOUNT_STATE');
    }
  }

  public async getCurrentAssetPrice(symbol: string): Promise<string> {
    try {
      const currentAssetPrice = await this.nance
        .getApi()
        .getCurrentAssetPrice(symbol);
      return currentAssetPrice.price;
    } catch (error) {
      throw new Error('ERROR: GET_CURRENT_ASSET_PRICE');
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
