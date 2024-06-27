import {
  CheckServerTimeResponse,
  IBinanceApiProvider,
} from '../../src/binance-api-provider';

export class MockBinanceApiProvider implements IBinanceApiProvider {
  private _isConnectionOk = true;

  public setConnectionOk(ok: boolean): void {
    this._isConnectionOk = ok;
  }

  public async checkServerTime(): Promise<CheckServerTimeResponse> {
    if (!this._isConnectionOk) {
      throw new Error('API error');
    }
    const mockResult: CheckServerTimeResponse = {
      serverTime: 69420,
    };

    return mockResult;
  }
}
