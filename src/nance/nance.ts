import type { IBinanceApiProvider } from '../providers/binance-api';
import { NanceGuest } from './nance.guest';
import { NanceRead } from './nance.read';
import type { AccountState, INance } from './types';

export class Nance implements INance {
  private nanceGuest: NanceGuest;
  private nanceRead: NanceRead;

  constructor(private api: IBinanceApiProvider) {
    this.nanceGuest = new NanceGuest(this);
    this.nanceRead = new NanceRead(this);
  }

  public getApi(): IBinanceApiProvider {
    return this.api;
  }

  public getNanceGuest(): NanceGuest {
    return this.nanceGuest;
  }

  public getNanceRead(): NanceRead {
    return this.nanceRead;
  }

  public async checkServerTime(): Promise<number> {
    return this.nanceGuest.checkServerTime();
  }

  public async getAccountState(): Promise<AccountState> {
    return this.nanceRead.getAccountState();
  }

  public async getCurrentAssetPrice(symbol: string): Promise<string> {
    return this.nanceRead.getCurrentAssetPrice(symbol);
  }
}
