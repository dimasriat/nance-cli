export interface IBinanceApiProvider {
  checkServerTime(): Promise<CheckServerTimeResponse>;
}

export type CheckServerTimeResponse = {
  serverTime: number;
};

export class BinanceApiProvider implements IBinanceApiProvider {
  public async checkServerTime(): Promise<CheckServerTimeResponse> {
    const response =
      await this._getBinance<CheckServerTimeResponse>('/fapi/v1/time');
    return response;
  }

  private async _getBinance<T>(path: string): Promise<T> {
    const response = await fetch(path);
    return (await response.json()) as T;
  }
}
