import type { NanceConfig } from '../../config';
import type {
  IBinanceApiProvider,
  CheckServerTimeResponse,
  AccountInformationResponse,
  AccountInformationParams,
  TickerPrice,
} from './types';
import * as crypto from 'crypto';

export class BinanceApiProvider implements IBinanceApiProvider {
  constructor(private config: NanceConfig) {}

  public async checkServerTime(): Promise<CheckServerTimeResponse> {
    const response =
      await this._getBinance<CheckServerTimeResponse>('/fapi/v1/time');
    return response;
  }

  public async getAccountInformation(
    params: AccountInformationParams,
  ): Promise<AccountInformationResponse> {
    const response = await this._postSignedBinance<
      AccountInformationParams,
      AccountInformationResponse
    >('/fapi/v2/account', params);
    return response;
  }

  public async getCurrentAssetPrice(symbol: string): Promise<TickerPrice> {
    const response = await this._getBinance<TickerPrice>(
      `/fapi/v1/ticker/price?symbol=${symbol}`,
    );
    return response;
  }

  private async _getBinance<T>(path: `/${string}`): Promise<T> {
    // TODO: add proper error handling
    const response: Response = await fetch(this._getBaseUrl() + path);
    return (await response.json()) as T;
  }

  private async _postSignedBinance<D extends Object, T>(
    path: `/${string}`,
    data: D,
  ): Promise<T> {
    const dataWithSignature = this._generateDataWithSignature(data);
    const url = this._combineUrlWithQueryParams(
      this._getBaseUrl() + path,
      dataWithSignature,
    );

    console.log(url);

    // sending
    const response: Response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-MBX-APIKEY': this.config.getApiKey(),
      },
    });

    return (await response.json()) as T;
  }

  private _generateDataWithSignature<D extends Object>(
    data: D,
  ): D & { signature: string } {
    const hmac = crypto.createHmac('sha256', this.config.getSecretKey());
    hmac.update(this._convertJsonToQueryString(data));
    const signature = hmac.digest('hex');

    return {
      ...data,
      signature,
    };
  }

  private _combineUrlWithQueryParams(url: string, queryParams: Object): string {
    return `${url}?${this._convertJsonToQueryString(queryParams)}`;
  }

  private _convertJsonToQueryString(json: Object): string {
    return Object.entries(json)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
  }

  private _getBaseUrl(): string {
    return 'https://fapi.binance.com';
  }
}
