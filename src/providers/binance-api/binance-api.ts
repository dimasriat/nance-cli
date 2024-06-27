import {
  IBinanceApiProvider,
  CheckServerTimeResponse,
  AccountInformationResponse,
} from './types';

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

  private async _getBinance<T>(path: `/${string}`): Promise<T> {
    const response = await fetch(this._getBaseUrl() + path);
    return (await response.json()) as T;
  }

  private _getBaseUrl(): string {
    return 'https://fapi.binance.com';
  }
}
