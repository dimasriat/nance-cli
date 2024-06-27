import type { INance } from './types';

export class NanceGuest {
  constructor(private nance: INance) {}

  public async checkServerTime(): Promise<number> {
    try {
      const checkServerTime = await this.nance.getApi().checkServerTime();
      return checkServerTime.serverTime;
    } catch (error) {
      throw new Error('ERROR: CHECK_SERVER_TIME');
    }
  }
}
