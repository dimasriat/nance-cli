import type { NanceConfig } from '../../config';
import type {
  IBinanceApiProvider,
  CheckServerTimeResponse,
  AccountInformationResponse,
  AccountInformationParams,
  TickerPrice,
  GetBinanceParams,
  GetPostBinanceResponse,
  PostSignedBinanceParams,
} from './types';
import * as crypto from 'crypto';

export class BinanceApiProvider implements IBinanceApiProvider {
  constructor(private config: NanceConfig) {}

  public async checkServerTime(): Promise<
    GetPostBinanceResponse<CheckServerTimeResponse>
  > {
    const response = await this.getBinance<CheckServerTimeResponse>({
      path: '/fapi/v1/time',
    });
    return response;
  }

  public async getAccountInformation(
    params: AccountInformationParams,
  ): Promise<GetPostBinanceResponse<AccountInformationResponse>> {
    const response = await this.postSignedBinance<
      AccountInformationParams,
      AccountInformationResponse
    >({
      path: '/fapi/v2/account',
      data: params,
    });
    return response;
  }

  public async getCurrentAssetPrice(
    symbol: string,
  ): Promise<GetPostBinanceResponse<TickerPrice>> {
    const response = await this.getBinance<TickerPrice>({
      path: `/fapi/v1/ticker/price?symbol=${symbol}`,
    });
    return response;
  }

  public async getBinance<T>({
    path,
  }: GetBinanceParams): Promise<GetPostBinanceResponse<T>> {
    const response: Response = await fetch(this._getBaseUrl() + path);

    return this._handleResponse<T>(response);
  }

  public async postSignedBinance<D extends Object, T>({
    path,
    data,
  }: PostSignedBinanceParams<D>): Promise<GetPostBinanceResponse<T>> {
    const dataWithSignature = this._generateDataWithSignature(data);
    const url = this._combineUrlWithQueryParams(
      this._getBaseUrl() + path,
      dataWithSignature,
    );

    const response: Response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-MBX-APIKEY': this.config.getApiKey(),
      },
    });

    return this._handleResponse<T>(response);
  }

  private async _handleResponse<T>(
    response: Response,
  ): GetPostBinanceResponse<T> {
    if (!response.ok) {
      const result: GetPostBinanceResponse<T> = {
        status: 'error',
        code: response.status,
        errorMsg: response.statusText,
      };

      return result;
    }

    const json = await response.json();
    const result: GetPostBinanceResponse<T> = {
      status: 'success',
      code: response.status,
      result: json as T,
    };

    return result;
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
