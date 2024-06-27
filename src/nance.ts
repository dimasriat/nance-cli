import { IBinanceApiProvider } from './binance-api-provider';

export class Nance {
  constructor(private api: IBinanceApiProvider) {}

  public async checkServerTime(): Promise<number> {
    try {
      const checkServerTime = await this.api.checkServerTime();
      return checkServerTime.serverTime;
    } catch (error) {
      throw new Error('API error');
    }
  }
}
